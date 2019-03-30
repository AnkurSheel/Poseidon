import * as moment from "moment";
import * as React from "react";
import { Button } from "../../Components/button";
import { Input } from "../../Components/input";
import { Select } from "../../Components/select";

interface IAddNewEntryMainProp {}

interface IAddNewEntryMainState {
    name: string;
    type: string;
    amount: number;
    date: string;
}

export class AddNewEntryMain extends React.Component<IAddNewEntryMainProp, IAddNewEntryMainState> {
    private readonly typeOptions = ["Asset", "Debt"];

    private readonly accountNames = [
        "Joint Checking Account",
        "Joint Savings Account",
        "Westpac Checking Account",
        "Emergency Account",
        "Gunjans Online Account",
        "Home Deposit Account",
        "Fixed Deposit 1",
        "Fixed Deposit 2",
        "Fixed Deposit 3",
        "Ankurs KiwiSaver",
        "Gunjans KiwiSaver",
        "Bonus Bonds",
        "Shares",
        "ANZ Credit Card",
        "Amex Credit Card",
    ];
    private readonly buttonStyles = {
        margin: "10px 10px 10px 10px",
    };

    constructor(props: IAddNewEntryMainProp) {
        super(props);
        this.state = { name: "", type: "", amount: 0, date: "" };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleAccountSelected = this.handleAccountSelected.bind(this);
        this.handleTypeSelected = this.handleTypeSelected.bind(this);
        this.handleAmountChanged = this.handleAmountChanged.bind(this);
    }

    public render() {
        return (
            <form className="container" onSubmit={this.handleFormSubmit}>
                <Input
                    label="Date"
                    value={this.state.date}
                    type="text"
                    name="date"
                    placeholder="Mar 2019"
                    handleChange={this.handleDateChange}
                />
                <Select
                    title="Account"
                    name="name"
                    options={this.accountNames}
                    value={this.state.name}
                    placeholder={"Select Account"}
                    handleChange={this.handleAccountSelected}
                />
                <Select
                    title="Type"
                    name="type"
                    options={this.typeOptions}
                    value={this.state.type}
                    placeholder={"Select Type"}
                    handleChange={this.handleTypeSelected}
                />
                <Input
                    label="Amount"
                    value={this.state.amount}
                    type="number"
                    name="amount"
                    placeholder="0"
                    handleChange={this.handleAmountChanged}
                />
                <Button action={this.handleFormSubmit} type={"primary"} title={"Submit"} style={this.buttonStyles} />
                <Button action={this.handleClearForm} type={"secondary"} title={"Clear"} style={this.buttonStyles} />
            </form>
        );
    }
    private handleAccountSelected(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        this.setState({
            name: value,
        });
    }

    private handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        this.setState({
            date: value,
        });
    }

    private handleTypeSelected(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;
        this.setState({
            type: value,
        });
    }

    private handleAmountChanged(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        this.setState({
            amount: value && parseInt(value),
        });
    }
    private handleClearForm() {
        this.setState({
            name: "",
            type: "",
            amount: 0,
            date: "",
        });
    }

    private handleFormSubmit(e: any) {
        e.preventDefault();
        console.log(this.state);
    }
}
