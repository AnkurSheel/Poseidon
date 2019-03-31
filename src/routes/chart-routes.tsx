import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import { MonthlyChartMain } from "../containers/monthly-chart/monthly-chart-main";
import { YearlyChartMain } from "../containers/yearly-chart/yearly-chart-main";
import "./routes.scss";

interface IChartProps extends RouteComponentProps {}

export class ChartRoutes extends React.Component<IChartProps, {}> {
    constructor(props: IChartProps) {
        super(props);
    }

    public render() {
        const match = this.props.match;

        return (
            <div>
                <ul className="header">
                    <li>
                        <NavLink to={`${match.url}/monthly`}>Monthly Charts</NavLink>
                    </li>
                    <li>
                        <NavLink to={`${match.url}/yearly`}>Yearly Charts</NavLink>
                    </li>
                </ul>
                <Switch>
                    <Route exact path={`${match.path}/`} render={() => <Redirect to={`${match.path}/monthly`} />} />
                    <Route path={`${match.path}/monthly`} component={MonthlyChartMain} />
                    <Route path={`${match.path}/yearly`} component={YearlyChartMain} />
                </Switch>
            </div>
        );
    }
}
