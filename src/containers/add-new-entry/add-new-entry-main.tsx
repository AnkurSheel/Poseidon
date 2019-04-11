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
    FormHelperText,
    Paper,
    Theme,
} from "@material-ui/core";

const styles = ({ spacing }: Theme) =>
    createStyles({
        root: {
            margin: spacing.unit * 3,
        },
        formControl: {
            marginTop: spacing.unit * 2,
            marginRight: spacing.unit * 3,
        },
        button: {
            marginTop: spacing.unit * 3,
            marginRight: spacing.unit * 3,
            marginBottom: spacing.unit * 3,
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
    const [amountErrorText, setAmountErrorText] = useState("");
    const [accountErrorText, setAccountErrorText] = useState("");
    const [typeErrorText, setTypeErrorText] = useState("");
    const [hasError, setHasError] = useState(false);

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
        let error = validateAmount();
        error = validateAccount() || error;
        error = validateType() || error;
        setHasError(error);
        return !error;
    };

    const validateAmount = (): boolean => {
        if (amount <= 0) {
            setAmountErrorText("Amount should be a positive number");
            return true;
        }
        setAmountErrorText("");
        return false;
    };

    const validateAccount = (): boolean => {
        if (isEmptyString(accountName)) {
            setAccountErrorText("Account is required");
            return true;
        }
        setAccountErrorText("");
        return false;
    };

    const validateType = (): boolean => {
        if (isEmptyString(type)) {
            setTypeErrorText("Type is required");
            return true;
        }
        setTypeErrorText("");
        return false;
    };

    const isEmptyString = (text: string): boolean => {
        return text === "" ? true : false;
    };

    const submitForm = async (): Promise<boolean> => {
        return true;
    };

    const handleAccountSelected = (e: React.ChangeEvent<HTMLSelectElement>) => setAccountName(e.target.value);

    const handleTypeSelected = (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value);

    return (
        <Paper className={classes.root}>
            <form onSubmit={handleSubmit} noValidate={true} autoComplete="off" className={classes.root}>
                {submitSuccess && (
                    <div className="alert alert-info" role="alert">
                        The form was successfully submitted!
                    </div>
                )}
                {hasError && (
                    <div className="alert alert-danger" role="alert">
                        Please fix the highlighted errors!
                    </div>
                )}
                <FormControl fullWidth className={classes.formControl}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
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
                <FormControl fullWidth className={classes.formControl} error={!isEmptyString(accountErrorText)}>
                    <InputLabel shrink>Account</InputLabel>
                    <Select value={accountName} name="account" onChange={handleAccountSelected} displayEmpty autoWidth>
                        <MenuItem value="">
                            <em>Select Account</em>
                        </MenuItem>
                        {accountNames.map(a => (
                            <MenuItem key={a} value={a}>
                                {a}
                            </MenuItem>
                        ))}
                    </Select>
                    {accountErrorText && <FormHelperText>{accountErrorText}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth className={classes.formControl} error={!isEmptyString(typeErrorText)}>
                    <InputLabel shrink>Type</InputLabel>
                    <Select value={type} name="type" onChange={handleTypeSelected} displayEmpty autoWidth>
                        <MenuItem value="">
                            <em>Select Type</em>
                        </MenuItem>
                        {typeOptions.map(t => {
                            return (
                                <MenuItem key={t} value={t}>
                                    {t}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    {typeErrorText && <FormHelperText>{typeErrorText}</FormHelperText>}
                </FormControl>
                <TextField
                    className={classes.formControl}
                    id="amount"
                    fullWidth
                    label="Amount"
                    type="Number"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        value ? setAmount(parseInt(value)) : null;
                    }}
                    onBlur={() => {
                        validateAmount();
                    }}
                    placeholder={"Please enter the amount"}
                    error={!isEmptyString(amountErrorText)}
                    helperText={amountErrorText}
                />
                <Button
                    className={classes.button}
                    type="reset"
                    variant="contained"
                    color="secondary"
                    onClick={clearForm}>
                    Reset
                </Button>
                <Button className={classes.button} type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Paper>
    );
};

export const AddNewEntryMain = withStyles(styles)(AddNewEntryMainForm);
