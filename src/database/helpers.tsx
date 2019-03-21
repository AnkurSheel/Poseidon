import * as knex from "knex";
import { Type } from "../Components/detailsTable/Details";

export class DatabaseHelpers {
    public filterByType = (query: knex.QueryBuilder, type: Type) => {
        return query.where({ type: `${Type[type]}` });
    }

    public filterByDate = (query: knex.QueryBuilder) => {
        return query.whereRaw("?? = ??", ["A.date", "B.date"]);
    }
}
