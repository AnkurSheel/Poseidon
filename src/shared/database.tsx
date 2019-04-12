const config = require("../../knexfile.js");
const env = "development";
import knex from "knex";
import moment from "moment";
import { Detail, Type } from "../types/details";
import { Totals } from "../types/totals";
import { DatabaseHelpers } from "./database-helpers";

export class Database {
    public dbHelper: DatabaseHelpers;
    constructor() {
        this.dbHelper = new DatabaseHelpers();
    }

    public migrateDatabase(): void {
        const client = knex(config[env]);
        client.migrate.latest(config);
    }

    public async getIndividualDetails(): Promise<Detail[]> {
        const client = knex(config[env]);
        const entries = await client
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
            }
        );
    }

    public async getMonthlyTotals(): Promise<Totals[]> {
        const client = knex(config[env]);

        const baseQuery = (alias: string) => {
            return client
                .sum("amount")
                .from("networth as B")
                .as(`${alias}`);
        };

        const assetsSubquery = this.dbHelper.filterByDate(this.dbHelper.filterByType(baseQuery("assets"))(Type.Asset));

        const debtsSubquery = this.dbHelper.filterByDate(this.dbHelper.filterByType(baseQuery("debts"))(Type.Debt));

        const totalsSubquery = this.dbHelper.filterByDate(baseQuery("totals"));

        const assets = await client
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
            }
        );
    }

    public async getYearlyTotals(): Promise<Totals[]> {
        const client = knex(config[env]);

        const baseQuery = (alias: string) => {
            return client
                .sum("amount")
                .from("networth as B")
                .as(`${alias}`);
        };

        const assetsSubquery = this.dbHelper.filterByYear(this.dbHelper.filterByType(baseQuery("assets"))(Type.Asset));

        const debtsSubquery = this.dbHelper.filterByYear(this.dbHelper.filterByType(baseQuery("debts"))(Type.Debt));

        const totalsSubquery = this.dbHelper.filterByYear(baseQuery("totals"));

        const assets = await client
            .select(client.raw("strftime('%Y',??) as year", "A.date"), assetsSubquery, debtsSubquery, totalsSubquery)
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
            }
        );
    }
}
