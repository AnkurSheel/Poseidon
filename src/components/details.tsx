import * as React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ComponentEnhancer, compose } from "recompose";
import { withLoadingIndicator } from "../higher-order-components/loading-hoc";
import { withNullCheck } from "../higher-order-components/null-check-hoc";

const nullCheckFn = (props: any) => !props.data || props.data.length == 0;

export const Details = (props: any) => (
    <div>
        <ReactTable
            data={props.data}
            columns={props.columns.map((c: any) => ({
                Header: c.Header,
                accessor: c.accessor,
                style: {
                    color: "white",
                },
                headerStyle: {
                    color: "white",
                },
            }))}
        />
    </div>
);

export const DetailsWithLoadingIndicator = withLoadingIndicator(Details);

export const withConditionalRenderings: ComponentEnhancer<any, any> = compose(
    withLoadingIndicator,
    withNullCheck(nullCheckFn)
);

export const DetailsWithConditionalRenderings = withConditionalRenderings(Details);
