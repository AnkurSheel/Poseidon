import * as React from "react";
import { Database } from "../../main/database";
import "../table.scss";
import { Totals } from "./totals";

interface ITotalTableProp {}

interface ITotalTableState {
    totals: Totals[];
}

export class TotalsTable extends React.Component<
    ITotalTableProp,
    ITotalTableState
> {
    private db: Database;

    constructor(props: ITotalTableProp) {
        super(props);
        this.state = { totals: null };
        this.db = new Database();
    }

    public async componentDidMount() {
        const totals: Totals[] = await this.db.getTotals();
        this.setState({ totals });
    }

    public render() {
        if (!this.state.totals) {
            return <div>No data</div>;
        }
        return (
            <table className="m-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Asset</th>
                        <th>Debt</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.totals.map(d => (
                        <tr key={d.id}>
                            <td>{d.date.format("MMM YYYY")}</td>
                            <td>{d.asset}</td>
                            <td>{d.debt}</td>
                            <td>{d.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}
