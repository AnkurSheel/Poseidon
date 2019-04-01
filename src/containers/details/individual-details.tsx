import * as React from "react";
import { useEffect, useState } from "react";
import { DetailsWithLoadingIndicator } from "../../components/details";
import { Database } from "../../shared/database";
import { Details } from "../../types/details";

export const IndividualDetails = () => {
    const db: Database = new Database();

    const [details, setDetails] = useState<Details[]>([]);
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
            date: d.date.format("MMM YYYY"),
            name: d.name,
            type: d.type,
            amount: d.amount,
        };
    });

    const columns = [
        {
            Header: "Date",
            accessor: "date",
        },
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Amount",
            accessor: "amount",
        },
        {
            Header: "Type",
            accessor: "type",
        },
    ];
    return <DetailsWithLoadingIndicator data={data} columns={columns} loading={isLoading} />;
};
