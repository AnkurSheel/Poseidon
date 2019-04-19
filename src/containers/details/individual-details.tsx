import { createStyles, Theme } from "@material-ui/core";
import { ipcRenderer } from "electron";
import React from "react";
import { useEffect, useState } from "react";
import { DetailsWithConditionalRenderings } from "../../components/details";
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

    return <DetailsWithConditionalRenderings data={data} columns={columns} loading={isLoading} />;
};
