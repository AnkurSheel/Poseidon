import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import * as React from 'react';
import { ComponentEnhancer, compose } from 'recompose';
import { withLoadingIndicator } from '../higher-order-components/loading-hoc';
import { withNullCheck } from '../higher-order-components/null-check-hoc';

const nullCheckFn = (props: any) => !props.data || props.data.length == 0;

export const Details = (props: any) => {
    const renderRow = (_row: any) => {
        return (
            <TableRow key={_row.id}>
                {Object.keys(_row).map((key: any, idx: number) => {
                    return <TableCell key={`${_row[key]}-${idx}`}>{_row[key]}</TableCell>;
                })}
            </TableRow>
        );
    };

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        {props.columns.map((c: any, idx: number) => (
                            <TableCell key={`${c.name}-${idx}`}>{c.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>{props.data.map(renderRow)}</TableBody>
            </Table>
        </Paper>
    );
};

export const DetailsWithLoadingIndicator = withLoadingIndicator(Details);

export const withConditionalRenderings: ComponentEnhancer<any, any> = compose(
    withLoadingIndicator,
    withNullCheck(nullCheckFn)
);

export const DetailsWithConditionalRenderings = withConditionalRenderings(Details);
