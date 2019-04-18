import * as React from "react";
import { useEffect, useState } from "react";
import { DetailsWithConditionalRenderings } from "../../components/details";
import { Database } from "../../shared/database";
import { Detail } from "../../types/details";
import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
    createStyles({
        root: {},
    });

export const IndividualDetails = () => {
    const db: Database = new Database();

    const [details, setDetails] = useState<Detail[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const result = await db.getIndividualDetails();
            setDetails(result);

            setIsLoading(false);
        };
        fetchData();
    }, []);

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
