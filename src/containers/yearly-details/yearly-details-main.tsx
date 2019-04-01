import * as React from "react";
import { useEffect, useState } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Database } from "../../shared/database";
import { Totals } from "../../types/totals";

export const YearlyDetailsMain = () => {
    const db: Database = new Database();
    const [totals, setTotals] = useState<Totals[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await db.getYearlyTotals();

            setTotals(result);
        };
        fetchData();
    }, []);

    if (!totals) {
        return <div>No data</div>;
    }
    const data = totals.map(t => {
        return {
            date: t.date.format("YYYY"),
            asset: t.asset,
            debt: t.debt,
            total: t.total,
        };
    });

    const columns = [
        {
            Header: "Date",
            accessor: "date",
        },
        {
            Header: "Asset",
            accessor: "asset",
        },
        {
            Header: "Debt",
            accessor: "debt",
        },
        {
            Header: "Net Worth",
            accessor: "total",
        },
    ];
    return (
        <div>
            <ReactTable data={data} columns={columns} />
        </div>
    );
};
