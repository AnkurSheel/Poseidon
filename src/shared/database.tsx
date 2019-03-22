const config = require("../../knexfile.js");
const env = "development";
import * as knex from "knex";
import * as moment from "moment";
import { Details, Type } from "../types/details";
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

    public async getIndividualDetails(): Promise<Details[]> {
        const client = knex(config[env]);
        const entries = await client
            .from("networth")
            .orderBy("date", "desc")
            .orderBy("type")
            .orderBy("name");

        let i: number = 0;
        return entries.map(
            (e: any): Details => {
                return {
                    id: i++,
                    name: e.name,
                    date: moment(e.date, "YYYY-MM"),
                    amount: e.amount.toFixed(2),
                    type: e.type,
                };
            },
        );
    }

    public async getTotals(): Promise<Totals[]> {
        const client = knex(config[env]);

        const baseQuery = (alias: string) => {
            return client
                .sum("amount")
                .from("networth as B")
                .as(`${alias}`);
        };

        const assetsSubquery = this.dbHelper.filterByDate(this.dbHelper.filterByType(baseQuery("assets"), Type.Asset));

        const debtsSubquery = this.dbHelper.filterByDate(this.dbHelper.filterByType(baseQuery("debts"), Type.Debt));

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
                    date: moment(e.date, "YYYY-MM"),
                    asset: e.assets ? e.assets.toFixed(2) : 0,
                    debt: e.debts ? e.debts.toFixed(2) : 0,
                    total: e.totals.toFixed(2),
                };
            },
        );
    }
}
