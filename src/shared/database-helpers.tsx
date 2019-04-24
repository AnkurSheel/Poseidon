import * as knex from "knex";
import { Type } from "../types/details";

export class DatabaseHelpers {
    public filterByType = (query: knex.QueryBuilder) => {
        return (type: Type) => {
            return query.where({ type: `${type.toString()}` });
        };
    };

    public filterByDate = (query: knex.QueryBuilder) => {
        return query.whereRaw("?? = ??", ["A.date", "B.date"]);
    };
}
