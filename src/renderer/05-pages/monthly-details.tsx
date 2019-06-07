import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ITotalsProps } from '../../types/props';
import { DetailsWithConditionalRenderings } from '../01-elements/details';
import Layout from '../04-layout';
import withTotalsLoader from '../higher-order-components/totals-loader';

const MonthlyDetails = (props: ITotalsProps & RouteComponentProps) => {
    const { location, totals, isLoading } = props;

    const data = totals.map((t: any) => {
        return {
            date: t.date,
            asset: t.asset,
            debt: t.debt,
            total: t.total,
        };
    });

    const columns = [
        {
            name: 'Date',
        },
        {
            name: 'Asset',
        },
        {
            name: 'Debt',
        },
        {
            name: 'Net Worth',
        },
    ];
    return (
        <Layout currentPath={location.pathname}>
            <DetailsWithConditionalRenderings data={data} columns={columns} loading={isLoading} />
        </Layout>
    );
};

export default withTotalsLoader({ sendMessage: 'get-monthly-totals', recieveMessage: 'monthly-totals' })(
    MonthlyDetails
);
