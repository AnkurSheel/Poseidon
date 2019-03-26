import * as React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Database } from "../../shared/database";
import { Totals } from "../../types/totals";

interface IYearlyDetailsMainProps {}

interface IYearlyDetailsMainState {
    totals: Totals[];
}

export class YearlyDetailsMain extends React.Component<IYearlyDetailsMainProps, IYearlyDetailsMainState> {
    private db: Database;

    constructor(props: IYearlyDetailsMainProps) {
        super(props);
        this.state = { totals: null };
        this.db = new Database();
    }

    public async componentDidMount() {
        const totals: Totals[] = await this.db.getYearlyTotals();
        console.log(totals);
        this.setState({ totals });
    }

    public render() {
        if (!this.state.totals) {
            return <div>No data</div>;
        }
        const data = this.state.totals.map(t => {
            return {
                date: t.date.format("YYYY"),
                asset: t.asset,
                debt: t.debt,
                total: t.total,
            };
        });

        const columns = [
            {
                Header: "Date",
                accessor: "date",
            },
            {
                Header: "Asset",
                accessor: "asset",
            },
            {
                Header: "Debt",
                accessor: "debt",
            },
            {
                Header: "Net Worth",
                accessor: "total",
            },
        ];
        return (
            <div>
                <ReactTable data={data} columns={columns} />
            </div>
        );
    }
}
