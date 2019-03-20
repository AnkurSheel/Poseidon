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

        const filterByType = (type: Type) => {
            return (query: knex.QueryBuilder) =>
                query.where({ type: `${Type[type]}` });
        };

        const filterByDate = () => {
            return (query: knex.QueryBuilder) =>
                query.whereRaw("?? = ??", ["A.date", "B.date"]);
        };

        const applyAssetFilter = filterByType(Type.Asset);
        const applyDebtFilter = filterByType(Type.Debt);

        const applyDateFilter = filterByDate();

        const baseQuery = (as: string) => {
            return client
                .sum("amount")
                .from("networth as B")
                .as(`${as}`);
        };

        const assetsSubquery = applyDateFilter(
            applyAssetFilter(baseQuery("assets")),
        );

        const debtsSubquery = applyDateFilter(
            applyDebtFilter(baseQuery("debts")),
        );

        const totalsSubquery = applyDateFilter(baseQuery("totals"));

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
