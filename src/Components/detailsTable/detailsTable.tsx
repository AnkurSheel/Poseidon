import * as React from "react";
import { Database } from "../../main/database";
import { Details, Type } from "./Details";
import "./detailsTable.scss";

interface IDetailsTableProp {}

interface IDetailsTableState {
    details: Details[];
}

export class DetailsTable extends React.Component<
    IDetailsTableProp,
    IDetailsTableState
> {
    private db: Database;

    constructor(props: IDetailsTableProp) {
        super(props);
        this.state = { details: null };
        this.db = new Database();
    }

    public async componentDidMount() {
        const details: Details[] = await this.db.getIndividualDetails();
        this.setState({ details });
    }

    public render() {
        if (!this.state.details) {
            return <div>No data</div>;
        }
        return (
            <table className="m-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.details.map(d => (
                        <tr key={d.id}>
                            <td>{d.date.format("MMM YYYY")}</td>
                            <td>{d.name}</td>
                            <td>{d.amount}</td>
                            <td>{d.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}
