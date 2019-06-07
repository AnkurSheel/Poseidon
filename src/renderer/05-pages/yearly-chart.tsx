import React from 'react';
import { RouteComponentProps } from 'react-router';
import { ITotalsProps } from '../../types/props';
import { ChartsWithLoadingIndicator } from '../01-elements/chart';
import Content from '../01-elements/content';
import FlexContainer from '../01-elements/flex-container';
import Navigation from '../03-composites/navigation';
import withTotalsLoader from '../higher-order-components/totals-loader';

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
