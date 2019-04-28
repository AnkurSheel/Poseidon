import React from "react";
import Content from "../../Components/content";
import { DetailsWithConditionalRenderings } from "../../components/details";
import FlexContainer from "../../Components/flex-container";
import Navigation from "../../components/navigation";
import withTotalsLoader from "../../higher-order-components/totals-loader";
import { ITotalsProps } from "../../types/props";

const MonthlyDetails = ({ totals, isLoading }: ITotalsProps) => {
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
            name: "Date",
        },
        {
            name: "Asset",
        },
        {
            name: "Debt",
        },
        {
            name: "Net Worth",
        },
    ];
    return (
        <FlexContainer>
            <Navigation />
            <Content>
                <DetailsWithConditionalRenderings data={data} columns={columns} loading={isLoading} />
            </Content>
        </FlexContainer>
    );
};

export default withTotalsLoader({ sendMessage: "get-monthly-totals", recieveMessage: "monthly-totals" })(
    MonthlyDetails,
);
