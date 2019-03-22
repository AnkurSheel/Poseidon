import * as React from "react";
import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import { IndividualDetailsMain } from "../pages/individual-details/individual-details-main";
import { MonthlyChartMain } from "../pages/monthly-chart/monthly-chart-main";
import { MonthlyDetailsMain } from "../pages/monthly-details/monthly-details-main";
import "./routes.scss";

export class Routes extends React.Component {
    public render() {
        return (
            <div>
                <ul className="header">
                    <li>
                        <NavLink exact to="/">
                            Charts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/monthly">Monthly Details</NavLink>
                    </li>
                    <li>
                        <NavLink to="/details">Individual Details</NavLink>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/" component={MonthlyChartMain} />
                    <Route path="/monthly" component={MonthlyDetailsMain} />
                    <Route path="/details" component={IndividualDetailsMain} />
                </Switch>
            </div>
        );
    }
}
