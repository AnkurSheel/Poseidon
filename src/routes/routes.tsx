import * as React from "react";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import { DetailsTable } from "../Components/detailsTable/detailsTable";
import { MonthlyTable } from "../Components/monthlyTable/monthlyTable";

export class Routes extends React.Component {
    public render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/">Total Details</Link>
                    </li>
                    <li>
                        <Link to="/details">Individual Details</Link>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/" component={MonthlyTable} />
                    <Route path="/details" component={DetailsTable} />
                </Switch>
            </div>
        );
    }

    // private async getTotals() {
    //     const assets: any = await this.db.getTotals(Type.Asset);
    //     console.log(assets);
    //     const debts: any = await this.db.getTotals(Type.Debt);
    //     console.log(debts);
    // }
}
