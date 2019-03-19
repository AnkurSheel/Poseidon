import * as React from "react";
import { Details } from "../../renderer/Details";
import "./table.scss";

interface IProp {
    details: Details[];
    className: string;
}

export class Table extends React.Component<IProp, {}> {
    constructor(props: IProp) {
        super(props);
    }
    public render() {
        if (!this.props.details) {
            return "";
        }
        return (
            <table className={this.props.className}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.details.map(d => (
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
