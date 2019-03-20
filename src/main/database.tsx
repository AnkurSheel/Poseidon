const config = require("../../knexfile.js");
const env = "development";
import * as knex from "knex";
import * as moment from "moment";
import { Details, Type } from "../Components/detailsTable/Details";
import { Totals } from "../Components/totalsTable/totals";

export class Database {
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
                    amount: e.amount,
                    type: e.type,
                };
            },
        );
    }

    public async getTotals(): Promise<Totals[]> {
        const client = knex(config[env]);

        const assetsSubquery = client
            .sum("amount")
            .from("networth as B")
            .where({ type: "Asset" })
            .whereRaw("?? = ??", ["A.date", "B.date"])
            .as("assets");

        const debtsSubquery = client
            .sum("amount")
            .from("networth as B")
            .where({ type: "Debt" })
            .whereRaw("?? = ??", ["A.date", "B.date"])
            .as("debts");

        const totalsSubquery = client
            .sum("amount")
            .from("networth as B")
            .whereRaw("?? = ??", ["A.date", "B.date"])
            .as("totals");

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
                    asset: e.assets,
                    debt: e.debts,
                    total: e.totals,
                };
            },
        );
    }
}
