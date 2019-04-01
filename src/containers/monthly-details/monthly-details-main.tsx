import * as React from "react";
import { useEffect, useState } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Loading } from "../../components/loading";
import { Database } from "../../shared/database";
import { Totals } from "../../types/totals";

export const MonthlyDetailsMain = () => {
    const db: Database = new Database();

    const [totals, setTotals] = useState<Totals[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const result = await db.getMonthlyTotals();
            setTotals(result);

            setIsLoading(false);
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <Loading />;
    }
    const data = totals.map(t => {
        return {
            date: t.date.format("MMM YYYY"),
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
