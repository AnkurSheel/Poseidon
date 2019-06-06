import React from 'react';
import { RouteComponentProps } from 'react-router';
import { ITotalsProps } from '../../../types/props';
import { ChartsWithLoadingIndicator } from '../../components/chart';
import Content from '../../Components/content';
import FlexContainer from '../../Components/flex-container';
import Navigation from '../../components/navigation';
import withTotalsLoader from '../../higher-order-components/totals-loader';

const YearlyChart = (props: ITotalsProps & RouteComponentProps) => {
    const { location, totals, isLoading } = props;
    return (
        <FlexContainer>
            <Navigation currentPath={location.pathname} />
            <Content>
                <ChartsWithLoadingIndicator loading={isLoading} data={totals} XAxisLabel="Years" YAxisLabel="Amount" />;
            </Content>
        </FlexContainer>
    );
};

export default withTotalsLoader({ sendMessage: 'get-yearly-totals', recieveMessage: 'yearly-totals' })(YearlyChart);
