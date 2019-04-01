import * as React from "react";
import ReactTable from "react-table";
import { withLoading } from "./loading-hoc";
import "react-table/react-table.css";

export const Details = (props: any) => {
    return (
        <div>
            <ReactTable data={props.data} columns={props.columns} />
        </div>
    );
};

export const DetailsWithLoading = withLoading(Details);
