import { ipcRenderer } from "electron";
import React from "react";
import { useEffect, useState } from "react";
import { DetailsWithConditionalRenderings } from "../../components/details";
import { Totals } from "../../types/totals";

export const MonthlyDetails = () => {
    const [totals, setTotals] = useState<Totals[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        ipcRenderer.send("get-monthly-totals");
        return () => {
            ipcRenderer.removeAllListeners("monthly-totals");
        };
    }, []);

    ipcRenderer.on("monthly-totals", (event: any, data: Totals[]) => {
        setTotals(data);
        setIsLoading(false);
    });

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
