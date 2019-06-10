import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ChartsWithLoadingIndicator } from '../01-elements/chart';
import Layout from '../04-layout';
import useTotalsLoader from '../hooks/use-totals-loader';

const MonthlyChart = (props: RouteComponentProps) => {
    const { location } = props;
    const { totals, isLoading } = useTotalsLoader({
        sendMessage: 'get-monthly-totals',
        recieveMessage: 'monthly-totals',
    });
    return (
        <Layout currentPath={location.pathname}>
            <ChartsWithLoadingIndicator loading={isLoading} data={totals} XAxisLabel="Months" YAxisLabel="Amount" />
        </Layout>
    );
};

export default MonthlyChart;
