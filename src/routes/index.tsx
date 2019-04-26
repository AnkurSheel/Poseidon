import * as React from "react";
import { Route, Switch } from "react-router";
import { AddNewEntryMain } from "../containers/add-new-entry/add-new-entry-main";
import { MonthlyChart } from "../containers/charts/monthly-chart";
import { YearlyChart } from "../containers/charts/yearly-chart";
import { IndividualDetails } from "../containers/details/individual-details";
import { MonthlyDetails } from "../containers/details/monthly-details";
import { YearlyDetails } from "../containers/details/yearly-details";

export class Routes extends React.Component {
    public render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={MonthlyChart} />

                    <Route exact path="/charts" component={MonthlyChart} />
                    <Route path={"/charts/monthly"} component={MonthlyChart} />
                    <Route path={"/charts/yearly"} component={YearlyChart} />

                    <Route exact path="/tables" component={MonthlyDetails} />
                    <Route path={"/tables/yearly"} component={YearlyDetails} />
                    <Route path={"/tables/monthly"} component={MonthlyDetails} />
                    <Route path={"/tables/details"} component={IndividualDetails} />

                    <Route path="/new-entry" component={AddNewEntryMain} />
                </Switch>
            </div>
        );
    }
}
