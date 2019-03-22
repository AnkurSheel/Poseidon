import * as React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Database } from "../../database/database";
import { Details } from "./Details";

interface IDetailsTableProp {}

interface IDetailsTableState {
    details: Details[];
}

export class DetailsTable extends React.Component<IDetailsTableProp, IDetailsTableState> {
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
        const data = this.state.details.map(d => {
            return {
                date: d.date.format("MMM YYYY"),
                name: d.name,
                type: d.type,
                amount: d.amount,
            };
        });

        console.log(data);
        const columns = [
            {
                Header: "Date",
                accessor: "date",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Amount",
                accessor: "amount",
            },
            {
                Header: "Type",
                accessor: "type",
            },
        ];
        return (
            <div>
                <ReactTable data={data} columns={columns} />
            </div>
        );
    }
}
