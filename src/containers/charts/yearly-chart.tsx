import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import { ChartsWithLoadingIndicator } from "../../components/chart";
import Content from "../../Components/content";
import FlexContainer from "../../Components/flex-container";
import Navigation from "../../components/navigation";
import { Totals } from "../../types/totals";

export const YearlyChart = () => {
    const [totals, setTotals] = useState<Totals[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        ipcRenderer.send("get-yearly-totals");
        return () => {
            ipcRenderer.removeAllListeners("yearly-totals");
        };
    }, []);

    ipcRenderer.on("yearly-totals", (event: any, data: Totals[]) => {
        setTotals(data);
        setIsLoading(false);
    });

    return (
        <FlexContainer>
            <Navigation />
            <Content>
                <ChartsWithLoadingIndicator loading={isLoading} data={totals} XAxisLabel="Years" YAxisLabel="Amount" />;
            </Content>
        </FlexContainer>
    );
};
