import { createStyles, Theme } from "@material-ui/core";
import { ipcRenderer } from "electron";
import React, { useEffect, useState } from "react";
import Content from "../../Components/content";
import { DetailsWithConditionalRenderings } from "../../components/details";
import FlexContainer from "../../Components/flex-container";
import Navigation from "../../components/navigation";
import { Detail } from "../../types/details";

const styles = (theme: Theme) =>
    createStyles({
        root: {},
    });

export const IndividualDetails = () => {
    const [details, setDetails] = useState<Detail[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        ipcRenderer.send("get-individual-details");
        return () => {
            ipcRenderer.removeAllListeners("individual-details");
        };
    }, []);

    ipcRenderer.on("individual-details", (event: any, data: Detail[]) => {
        setDetails(data);
        setIsLoading(false);
    });

    const data = details.map(d => {
        return {
            date: d.date,
            name: d.name,
            type: d.type,
            amount: d.amount,
        };
    });

    const columns = [
        {
            name: "Date",
        },
        {
            name: "Name",
        },
        {
            name: "Amount",
        },
        {
            name: "Type",
        },
    ];

    return (
        <FlexContainer>
            <Navigation />
            <Content>
                <DetailsWithConditionalRenderings data={data} columns={columns} loading={isLoading} />;
            </Content>
        </FlexContainer>
    );
};
