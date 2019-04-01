import * as moment from "moment";
import * as React from "react";
import { useState } from "react";
import { Button } from "../../Components/button";
import { Input } from "../../Components/input";
import { Select } from "../../Components/select";

export const AddNewEntryMain = () => {
    const typeOptions = ["Asset", "Debt"];

    const accountNames = [
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
    const buttonStyles = {
        margin: "10px 10px 10px 10px",
    };
    const [accountName, setAccountName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`${date} ${accountName} ${type} ${amount}`);
    };
    const clearForm = () => {
        setAccountName("");
        setDate("");
        setAmount(0);
        setType("");
    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            <Input
                label="Date"
                value={date}
                type="text"
                name="date"
                placeholder="Mar 2019"
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
            />
            <Select
                title="Account"
                name="name"
                options={accountNames}
                value={accountName}
                placeholder={"Select Account"}
                handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAccountName(e.target.value)}
            />
            <Select
                title="Type"
                name="type"
                options={typeOptions}
                value={type}
                placeholder={"Select Type"}
                handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
            />
            <Input
                label="Amount"
                value={amount}
                type="number"
                name="amount"
                placeholder="0"
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    value ? setAmount(parseInt(value)) : null;
                }}
            />
            <Button isPrimary={true} type={"submit"} title={"Submit"} style={buttonStyles} />
            <Button isPrimary={false} action={clearForm} type={"secondary"} title={"Clear"} style={buttonStyles} />
        </form>
    );
};
