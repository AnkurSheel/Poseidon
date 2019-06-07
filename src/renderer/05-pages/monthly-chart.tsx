import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ITotalsProps } from '../../types/props';
import { ChartsWithLoadingIndicator } from '../01-elements/chart';
import Layout from '../04-layout';
import withTotalsLoader from '../higher-order-components/totals-loader';

const MonthlyChart = (props: ITotalsProps & RouteComponentProps) => {
    const { location, totals, isLoading } = props;
    return (
        <Layout currentPath={location.pathname}>
            <ChartsWithLoadingIndicator loading={isLoading} data={totals} XAxisLabel="Months" YAxisLabel="Amount" />
        </Layout>
    );
};

export default withTotalsLoader({ sendMessage: 'get-monthly-totals', recieveMessage: 'monthly-totals' })(MonthlyChart);
