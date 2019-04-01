import { delay } from "bluebird";
import * as React from "react";
import { useEffect, useState } from "react";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
import { Loading } from "../../components/loading";
import { Database } from "../../shared/database";
import { Totals } from "../../types/totals";

export const MonthlyChartMain = () => {
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

    if (isLoading) {
        return <Loading />;
    }

    const data = totals
        .map(t => {
            return {
                name: t.date.format("MMM YYYY"),
                total: t.total,
                asset: t.asset,
                debt: -t.debt,
            };
        })
        .reverse();
    return (
        <ComposedChart width={750} height={450} data={data} margin={{ top: 10, right: 10, left: 20, bottom: 10 }}>
            <XAxis
                dataKey="name"
                label={{
                    value: "Months",
                    position: "insideBottom",
                    offset: 0,
                }}
            />
            <YAxis
                label={{
                    value: "Amount",
                    position: "insideLeft",
                    offset: 0,
                    angle: -90,
                }}
            />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" stroke="#000000" strokeOpacity={0.1} vertical={false} />
            <Bar dataKey="debt" fill="#ff0000" barSize={20} />
            <Bar dataKey="asset" fill="#82ca9d" barSize={10} />
            <Line type="monotone" dataKey="total" name="Net Worth" stroke="#8884d8" />
        </ComposedChart>
    );
};
