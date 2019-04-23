import { ipcRenderer } from "electron";
import React from "react";
import { useEffect, useState } from "react";
import { ChartsWithLoadingIndicator } from "../../components/chart";
import { Totals } from "../../types/totals";

export const MonthlyChart = () => {
    const [totals, setTotals] = useState<Totals[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        ipcRenderer.send("get-monthly-totals");
    }, []);

    ipcRenderer.on("monthly-totals", (event: any, data: Totals[]) => {
        setTotals(data);
        setIsLoading(false);
    });
    return <ChartsWithLoadingIndicator loading={isLoading} data={totals} XAxisLabel="Months" YAxisLabel="Amount" />;
};
