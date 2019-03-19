const config = require("../../knexfile.js");
const env = "development";
import * as knex from "knex";

export class Database {
    public migrateDatabase(): void {
        const client = knex(config[env]);
        client.migrate.latest(config);
    }

    public getEntries() {
        const client = knex(config[env]);
        return client
            .from("networth")
            .orderBy("date", "desc")
            .orderBy("type")
            .orderBy("name");
    }
}
