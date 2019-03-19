import * as React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { DetailsTable } from "../Components/detailsTable/detailsTable";

export class Routes extends React.Component {
    public render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/">Table</Link>
                    </li>
                </ul>
                <Route path="/" component={DetailsTable} />
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
