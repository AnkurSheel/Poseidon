const config = require("../../knexfile.js");
const env = "development";
import * as knex from "knex";
import * as moment from "moment";
import { Details, Type } from "../Components/detailsTable/Details";

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
                    date: moment(e.date, "YYYY-MM-DD"),
                    amount: e.amount,
                    type: e.type,
                };
            },
        );
    }

    public getTotals(type: Type): any {
        const client = knex(config[env]);
        return client
            .from("networth")
            .select("date")
            .groupBy("date")
            .sum("amount")
            .where({ type: Type[type] })
            .orderBy("date", "desc");
    }
}
