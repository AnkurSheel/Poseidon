import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ChartsWithLoadingIndicator } from "../../components/chart";
import Content from "../../Components/content";
import FlexContainer from "../../Components/flex-container";
import Navigation from "../../components/navigation";
import withTotalsLoader from "../../higher-order-components/totals-loader";
import { ITotalsProps } from "../../types/props";

const MonthlyChart = (props: ITotalsProps & RouteComponentProps) => {
    const { location, totals, isLoading } = props;
    return (
        <FlexContainer>
            <Navigation currentPath={location.pathname} />
            <Content>
                <ChartsWithLoadingIndicator loading={isLoading} data={totals} XAxisLabel="Months" YAxisLabel="Amount" />
            </Content>
        </FlexContainer>
    );
};

export default withTotalsLoader({ sendMessage: "get-monthly-totals", recieveMessage: "monthly-totals" })(MonthlyChart);
