import * as React from "react";
import { Redirect, Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import { AddNewEntryMain } from "../containers/add-new-entry/add-new-entry-main";
import { ChartRoutes } from "./chart-routes";
import "./routes.scss";
import { TableRoutes } from "./tables-routes";

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
                        <NavLink to="/tables">Tables</NavLink>
                    </li>
                    <li>
                        <NavLink to="/new-entry">Add New Entry</NavLink>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/charts" />} />
                    <Route path="/charts" component={ChartRoutes} />
                    <Route path="/tables" component={TableRoutes} />
                    <Route path="/new-entry" component={AddNewEntryMain} />
                </Switch>
            </div>
        );
    }
}
