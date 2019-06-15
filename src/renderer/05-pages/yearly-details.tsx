import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { DetailsWithConditionalRenderings } from '../01-elements/details';
import Layout from '../04-layout';
import useTotalsLoader from '../hooks/use-totals-loader';

const YearlyDetails = (props: RouteComponentProps) => {
    const { location } = props;
    const { totals, isLoading } = useTotalsLoader({
        sendMessage: 'get-yearly-totals',
        recieveMessage: 'yearly-totals',
    });

    const data = totals.map(t => {
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

export default YearlyDetails;
