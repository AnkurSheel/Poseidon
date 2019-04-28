import React from "react";
import { ChartsWithLoadingIndicator } from "../../components/chart";
import Content from "../../Components/content";
import FlexContainer from "../../Components/flex-container";
import Navigation from "../../components/navigation";
import withTotalsLoader from "../../higher-order-components/totals-loader";
import { ITotalsProps } from "../../types/props";

const YearlyChart = ({ totals, isLoading }: ITotalsProps) => {
    return (
        <FlexContainer>
            <Navigation />
            <Content>
                <ChartsWithLoadingIndicator loading={isLoading} data={totals} XAxisLabel="Years" YAxisLabel="Amount" />;
            </Content>
        </FlexContainer>
    );
};

export default withTotalsLoader({ sendMessage: "get-yearly-totals", recieveMessage: "yearly-totals" })(YearlyChart);
