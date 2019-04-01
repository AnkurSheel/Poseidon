import * as React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { withLoadingIndicator } from "./loading-hoc";

export const Details = (props: any) => {
    return (
        <div>
            <ReactTable data={props.data} columns={props.columns} />
        </div>
    );
};

export const DetailsWithLoadingIndicator = withLoadingIndicator(Details);
