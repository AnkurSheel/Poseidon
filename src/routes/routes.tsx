import * as React from "react";
import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import { DetailsTable } from "../Components/detailsTable/detailsTable";
import { MonthlyTable } from "../Components/monthlyTable/monthlyTable";
import "./routes.scss";

export class Routes extends React.Component {
    public render() {
        return (
            <div>
                <ul className="header">
                    <li>
                        <NavLink exact to="/">
                            Total Details
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/details">Individual Details</NavLink>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/" component={MonthlyTable} />
                    <Route path="/details" component={DetailsTable} />
                </Switch>
            </div>
        );
    }
}
