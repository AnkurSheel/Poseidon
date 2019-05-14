const config = require("../../knexfile.js");

import knex from "knex";
import moment from "moment";
import { Detail, Type } from "../types/details";
import { Totals } from "../types/totals";
import { DatabaseHelpers } from "./database-helpers";
import { UniqueConstraintError } from "./unique-contraint-error";

export class Database {
    public dbHelper: DatabaseHelpers;
    private client: knex;

    constructor(appDataPath: string) {
        this.dbHelper = new DatabaseHelpers();
        const currentConfig = config[process.env.ENVIRONMENT];
        currentConfig.connection.filename = `${appDataPath}/${currentConfig.connection.filename}`;
        this.client = knex(currentConfig);
    }

    public migrateDatabase(): void {
        this.client.migrate.latest(config);
        // this.client.migrate.rollback(config);
    }

    public seedDatabase() {
        this.client.seed.run();
    }

    public async getIndividualDetails(): Promise<Detail[]> {
        const entries = await this.client
            .from("networth")
            .orderBy("date", "desc")
            .orderBy("type")
            .orderBy("name");

        return entries.map(
            (e: any): Detail => {
                return {
                    id: e.id,
                    name: e.name,
                    date: moment(e.date, "YYYY-MM").format("MMM YYYY"),
                    amount: e.amount.toFixed(2),
                    type: e.type,
                };
            },
        );
    }

    public async getMonthlyTotals(): Promise<Totals[]> {
        const baseQuery = (alias: string) => {
            return this.client
                .sum("amount")
                .from("networth as B")
                .as(`${alias}`);
        };

        const assetsSubquery = this.dbHelper.filterByDate(this.dbHelper.filterByType(baseQuery("assets"))(Type.Asset));

        const debtsSubquery = this.dbHelper.filterByDate(this.dbHelper.filterByType(baseQuery("debts"))(Type.Debt));

        const totalsSubquery = this.dbHelper.filterByDate(baseQuery("totals"));

        const assets = await this.client
            .select("date", assetsSubquery, debtsSubquery, totalsSubquery)
            .from("networth as A")
            .groupBy("date")
            .orderBy("date", "desc");

        let i: number = 0;
        return assets.map(
            (e: any): Totals => {
                return {
                    id: i++,
                    date: moment(e.date, "YYYY-MM").format("MMM YYYY"),
                    asset: e.assets ? e.assets.toFixed(2) : 0,
                    debt: e.debts ? -e.debts.toFixed(2) : 0,
                    total: e.totals.toFixed(2),
                };
            },
        );
    }

    public async getYearlyTotals(): Promise<Totals[]> {
        const baseQuery = (alias: string) => {
            return this.client
                .sum("amount")
                .from("networth as B")
                .as(`${alias}`);
        };

        const assetsSubquery = this.dbHelper.filterByDate(this.dbHelper.filterByType(baseQuery("assets"))(Type.Asset));

        const debtsSubquery = this.dbHelper.filterByDate(this.dbHelper.filterByType(baseQuery("debts"))(Type.Debt));

        const totalsSubquery = this.dbHelper.filterByDate(baseQuery("totals"));

        const assets = await this.client
            .select(
                "date",
                this.client.raw("strftime('%Y',??) as year", "A.date"),
                this.client.raw("max(strftime('%m', ??)) as maxMonth", "A.date"),
                assetsSubquery,
                debtsSubquery,
                totalsSubquery,
            )
            .from("networth as A")
            .groupBy("year")
            .orderBy("year", "desc");

        let i: number = 0;
        return assets.map(
            (e: any): Totals => {
                return {
                    id: i++,
                    date: e.year,
                    asset: e.assets ? e.assets.toFixed(2) : 0,
                    debt: e.debts ? -e.debts.toFixed(2) : 0,
                    total: e.totals.toFixed(2),
                };
            },
        );
    }

    public async addNewRecord(record: Detail): Promise<void> {
        try {
            await this.client.table("networth").insert(record);
        } catch (err) {
            if (err.errno == 19) {
                throw new UniqueConstraintError("The record already exists");
            }
            throw err;
        }
    }

    public async clearTable(): Promise<void> {
        await this.client.table("networth").del();
    }
    public async getAccountNames(): Promise<string[]> {
        return await this.client
            .select("name", "type")
            .from("accounts")
            .orderBy(["type", "name"]);
    }
}
