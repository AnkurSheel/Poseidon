import * as React from "react";
import { useEffect, useState } from "react";
import { DetailsWithConditionalRenderings } from "../../components/details";
import { Database } from "../../shared/database";
import { Totals } from "../../types/totals";
import { ChartsWithLoadingIndicator } from "../../components/chart";

export const MonthlyDetails = () => {
    const db: Database = new Database();

    const [totals, setTotals] = useState<Totals[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const result = await db.getMonthlyTotals();
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
    return (
        <div>
            <ChartsWithLoadingIndicator
                loading={isLoading}
                data={data.reverse()}
                XAxisLabel="Months"
                YAxisLabel="Amount"
            />
            <DetailsWithConditionalRenderings data={data} columns={columns} loading={isLoading} />;
        </div>
    );
};
