import * as React from "react";
import { useEffect, useState } from "react";
import { ChartsWithLoadingIndicator } from "../../components/chart";
import { DetailsWithConditionalRenderings } from "../../components/details";
import { Database } from "../../shared/database";
import { Totals } from "../../types/totals";

export const YearlyDetails = () => {
    const db: Database = new Database();
    const [totals, setTotals] = useState<Totals[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const result = await db.getYearlyTotals();
            setTotals(result);

            setIsLoading(false);
        };
        fetchData();
    }, []);

    const data = totals.map(t => {
        return {
            date: t.date,
            asset: t.asset,
            debt: t.debt,
            total: t.total,
        };
    });

    const columns = [
        {
            name: "Date",
        },
        {
            name: "Asset",
        },
        {
            name: "Debt",
        },
        {
            name: "Net Worth",
        },
    ];
    return <DetailsWithConditionalRenderings data={data} columns={columns} loading={isLoading} />;
};
