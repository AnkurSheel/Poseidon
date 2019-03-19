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
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = { details: null };
    }
    public async componentDidMount() {
        await this.fetchEntries();
    }
    public render() {
        return (
            <div>
                <Table details={this.state.details} className="m-table" />
            </div>
        );
    }
    private async fetchEntries() {
        const db = new Database();
        const entries: any = await db.getEntries();
        let i: number = 0;
        const details: Details[] = entries.map(
            (e: any): Details => {
                return {
                    id: i++,
                    name: e.name,
                    date: moment(e.date, "YYYY-MM-DD"),
                    amount: e.amount,
                    type: e.type,
                };
            },
        );
        this.setState({ details });
    }
}
