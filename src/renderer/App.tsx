import { ipcRenderer } from "electron";
import * as moment from "moment";
import * as React from "react";
import { Table } from "../Components/Table/Table";
import { Database } from "../main/database";
import { Details, Type } from "../types/Details";

export interface IState {
    details: Details[];
}
export class App extends React.Component<{}, IState> {
    private db: Database;

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = { details: null };
        this.db = new Database();
    }
    public async componentDidMount() {
        const details: Details[] = await this.db.getIndividualDetails();
        await this.getTotals();

        this.setState({ details });
    }
    public render() {
        return (
            <div>
                <Table details={this.state.details} className="m-table" />
            </div>
        );
    }
    private async getTotals() {
        const assets: any = await this.db.getTotals(Type.Asset);
        console.log(assets);
        const debts: any = await this.db.getTotals(Type.Debt);
        console.log(debts);
    }
}
