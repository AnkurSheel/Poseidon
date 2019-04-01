import * as React from "react";
import { useEffect, useState } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Database } from "../../shared/database";
import { Details } from "../../types/details";

export const IndividualDetailsMain = () => {
    const db: Database = new Database();
    const [details, setDetails] = useState<Details[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await db.getIndividualDetails();

            setDetails(result);
        };
        fetchData();
    }, []);

    if (!details) {
        return <div>No data</div>;
    }
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
    return (
        <div>
            <ReactTable data={data} columns={columns} />
        </div>
    );
};
