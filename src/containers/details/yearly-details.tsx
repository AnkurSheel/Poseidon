import * as React from "react";
import { useEffect, useState } from "react";
import { DetailsWithConditionalRenderings } from "../../components/details";
import { Database } from "../../shared/database";
import { Totals } from "../../types/totals";
import { ChartsWithLoadingIndicator } from "../../components/chart";

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
    return (
        <div>
            <ChartsWithLoadingIndicator
                loading={isLoading}
                data={data.reverse()}
                XAxisLabel="Years"
                YAxisLabel="Amount"
            />
            <DetailsWithConditionalRenderings data={data} columns={columns} loading={isLoading} />
        </div>
    );
};
