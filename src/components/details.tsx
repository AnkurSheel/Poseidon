import * as React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { compose } from "recompose";
import { withLoadingIndicator } from "../higher-order-components/loading-hoc";
import { withNullCheck } from "../higher-order-components/null-check-hoc";

export const Details = (props: any) => {
    return (
        <div>
            <ReactTable data={props.data} columns={props.columns} />
        </div>
    );
};

export const DetailsWithLoadingIndicator = withLoadingIndicator(Details);

const nullCheckFn = () => {
    return (props: any) => !props.data;
};

export const withConditionalRenderings = compose(
    withLoadingIndicator,
    withNullCheck(nullCheckFn),
);

export const DetailsWithConditionalRenderings = withConditionalRenderings(Details);
