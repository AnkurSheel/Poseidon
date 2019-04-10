import * as React from "react";
import { useEffect, useState } from "react";
import { ChartsWithLoadingIndicator } from "../../components/chart";
import { Database } from "../../shared/database";
import { Totals } from "../../types/totals";

export const YearlyChart = () => {
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

    const data = totals
        .map(t => {
            return {
                name: t.date,
                total: t.total,
                asset: t.asset,
                debt: -t.debt,
            };
        })
        .reverse();

    return <ChartsWithLoadingIndicator loading={isLoading} data={data} XAxisLabel="Years" YAxisLabel="Amount" />;
};