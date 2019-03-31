import * as React from "react";
import { Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
import { Database } from "../../shared/database";
import { Totals } from "../../types/totals";

interface IMonthlyChartMainProps {}

interface IMonthlyChartMainState {
    totals: Totals[];
}

export class MonthlyChartMain extends React.Component<IMonthlyChartMainProps, IMonthlyChartMainState> {
    private db: Database;

    constructor(props: IMonthlyChartMainProps) {
        super(props);
        this.state = { totals: null };
        this.db = new Database();
    }

    public async componentDidMount() {
        const totals: Totals[] = await this.db.getMonthlyTotals();
        this.setState({ totals });
    }

    public render() {
        if (!this.state.totals) {
            return <div>No data</div>;
        }

        const data = this.state.totals
            .map(t => {
                return {
                    name: t.date.format("MMM YYYY"),
                    total: t.total,
                    asset: t.asset,
                    debt: -t.debt,
                };
            })
            .reverse();
        return (
            <ComposedChart width={750} height={450} data={data} margin={{ top: 10, right: 10, left: 20, bottom: 10 }}>
                <XAxis
                    dataKey="name"
                    label={{
                        value: "Months",
                        position: "insideBottom",
                        offset: 0,
                    }}
                />
                <YAxis
                    label={{
                        value: "Amount",
                        position: "insideLeft",
                        offset: 0,
                        angle: -90,
                    }}
                />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" stroke="#000000" strokeOpacity={0.1} vertical={false} />
                <Bar dataKey="debt" fill="#ff0000" barSize={20} />
                <Bar dataKey="asset" fill="#82ca9d" barSize={10} />
                <Line type="monotone" dataKey="total" name="Net Worth" stroke="#8884d8" />
            </ComposedChart>
        );
    }
}
