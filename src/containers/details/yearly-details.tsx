import * as React from "react";
import { useEffect, useState } from "react";
import { DetailsWithLoadingIndicator } from "../../components/details";
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
            date: t.date.format("YYYY"),
            asset: t.asset,
            debt: t.debt,
            total: t.total,
        };
    });

    const columns = [
        {
            Header: "Date",
            accessor: "date",
        },
        {
            Header: "Asset",
            accessor: "asset",
        },
        {
            Header: "Debt",
            accessor: "debt",
        },
        {
            Header: "Net Worth",
            accessor: "total",
        },
    ];
    return <DetailsWithLoadingIndicator data={data} columns={columns} loading={isLoading} />;
};
