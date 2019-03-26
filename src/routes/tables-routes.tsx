import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import { IndividualDetailsMain } from "../pages/individual-details/individual-details-main";
import { MonthlyDetailsMain } from "../pages/monthly-details/monthly-details-main";
import { YearlyDetailsMain } from "../pages/yearly-details/yearly-details-main";
import "./routes.scss";

interface ITablesProps extends RouteComponentProps {}

export class TableRoutes extends React.Component<ITablesProps, {}> {
    constructor(props: ITablesProps) {
        super(props);
    }

    public render() {
        const match = this.props.match;

        return (
            <div>
                <ul className="header">
                    <li>
                        <NavLink to={`${match.url}/yearly`}>Yearly Details</NavLink>
                    </li>
                    <li>
                        <NavLink to={`${match.url}/monthly`}>Monthly Details</NavLink>
                    </li>
                    <li>
                        <NavLink to={`${match.url}/details`}>Individual Details</NavLink>
                    </li>
                </ul>
                <Switch>
                    <Route exact path={`${match.path}/`} render={() => <Redirect to={`${match.path}/monthly`} />} />
                    <Route path={`${match.path}/yearly`} component={YearlyDetailsMain} />
                    <Route path={`${match.path}/monthly`} component={MonthlyDetailsMain} />
                    <Route path={`${match.path}/details`} component={IndividualDetailsMain} />
                </Switch>
            </div>
        );
    }
}
