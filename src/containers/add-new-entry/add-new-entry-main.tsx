import * as moment from "moment";
import * as React from "react";
import { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider, MaterialUiPickersDate } from "material-ui-pickers";
import DateFnsUtils from "@date-io/moment";
import Button from "@material-ui/core/Button";
import {
    TextField,
    InputAdornment,
    FormControl,
    createStyles,
    Select,
    MenuItem,
    InputLabel,
    withStyles,
    WithStyles,
} from "@material-ui/core";

const styles = () =>
    createStyles({
        FormControl: {
            width: 500,
        },
        Button: {
            margin: 20,
        },
    });

const AddNewEntryMainForm = ({ classes }: WithStyles<typeof styles>) => {
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
    const [accountName, setAccountName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<moment.Moment>(moment());
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (validateForm()) {
            const submitSuccess: boolean = await submitForm();
            setSubmitSuccess(submitSuccess);
        }
    };

    const clearForm = () => {
        setAccountName("");
        setDate(moment());
        setAmount(0);
        setType("");
    };

    const validateForm = (): boolean => {
        return true;
    };

    const submitForm = async (): Promise<boolean> => {
        console.log(`${date} ${accountName} ${type} ${amount}`);
        return true;
    };

    const handleAccountSelected = (e: React.ChangeEvent<HTMLSelectElement>) => setAccountName(e.target.value);

    const handleTypeSelected = (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value);

    return (
        <form onSubmit={handleSubmit} noValidate={true} autoComplete="off">
            <div className="container">
                {submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        The form was successfully submitted!
                    </div>
                )}
                <FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            className={classes.FormControl}
                            label="Select Date"
                            views={["year", "month"]}
                            value={date}
                            onChange={(d: MaterialUiPickersDate) => setDate(moment(d).startOf("month"))}
                            onMonthChange={setDate}
                            showTodayButton={true}
                            todayLabel={"Current Month"}
                            disableFuture
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>
                <br />
                <br />
                <FormControl>
                    <InputLabel>Select Account</InputLabel>
                    <Select
                        className={classes.FormControl}
                        value={accountName}
                        name="account"
                        onChange={handleAccountSelected}>
                        {accountNames.map(a => (
                            <MenuItem key={a} value={a}>
                                {a}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <br />
                <FormControl>
                    <InputLabel>Select Type</InputLabel>
                    <Select
                        className={classes.FormControl}
                        value={type}
                        name="type"
                        onChange={handleTypeSelected}
                        autoWidth>
                        {typeOptions.map(t => {
                            return (
                                <MenuItem key={t} value={t}>
                                    {t}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <br />
                <br />
                <TextField
                    id="amount"
                    className={classes.FormControl}
                    variant="outlined"
                    label="Amount"
                    type="Number"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        value ? setAmount(parseInt(value)) : null;
                    }}
                    placeholder={"Please enter the amount"}
                />
                <br />
                <Button className={classes.Button} type="submit" variant="contained" color="primary">
                    Submit
                </Button>
                <Button className={classes.Button} type="reset" variant="contained" color="default" onClick={clearForm}>
                    Reset
                </Button>
            </div>
        </form>
    );
};

export const AddNewEntryMain = withStyles(styles)(AddNewEntryMainForm);
