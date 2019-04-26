import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import Content from "../../Components/content";
import { DetailsWithConditionalRenderings } from "../../components/details";
import FlexContainer from "../../Components/flex-container";
import Navigation from "../../components/navigation";
import { Totals } from "../../types/totals";

export const YearlyDetails = () => {
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
        <FlexContainer>
            <Navigation />
            <Content>
                <DetailsWithConditionalRenderings data={data} columns={columns} loading={isLoading} />
            </Content>
        </FlexContainer>
    );
};
