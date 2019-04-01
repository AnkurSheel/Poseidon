import * as React from "react";
import { useEffect, useState } from "react";
import { ChartsWithLoading } from "../../components/chart";
import { Database } from "../../shared/database";
import { Totals } from "../../types/totals";

export const YearlyChartMain = () => {
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
                name: t.date.format("YYYY"),
                total: t.total,
                asset: t.asset,
                debt: -t.debt,
            };
        })
        .reverse();

    return <ChartsWithLoading loading={isLoading} data={data} XAxisLabel="Years" YAxisLabel="Amount" />;
};
