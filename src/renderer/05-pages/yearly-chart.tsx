import React from 'react';
import { RouteComponentProps } from 'react-router';
import { ChartsWithLoadingIndicator } from '../01-elements/chart';
import Content from '../01-elements/content';
import FlexContainer from '../01-elements/flex-container';
import Navigation from '../03-composites/navigation';
import useTotalsLoader from '../hooks/use-totals-loader';

const YearlyChart = (props: RouteComponentProps) => {
    const { location } = props;
    const { totals, isLoading } = useTotalsLoader({
        sendMessage: 'get-yearly-totals',
        recieveMessage: 'yearly-totals',
    });
    return (
        <FlexContainer>
            <Navigation currentPath={location.pathname} />
            <Content>
                <ChartsWithLoadingIndicator loading={isLoading} data={totals} XAxisLabel="Years" YAxisLabel="Amount" />;
            </Content>
        </FlexContainer>
    );
};

export default YearlyChart;
