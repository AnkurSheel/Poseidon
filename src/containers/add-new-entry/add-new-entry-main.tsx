import { createStyles, Paper, Theme, withStyles, WithStyles } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { MaterialUiPickersDate } from "material-ui-pickers";
import moment from "moment";
import React, { useState } from "react";
import { Header } from "../../components/material-ui-wrappers/header";
import { Button, CurrencyTextField, Dropdown, MonthYearDatePicker } from "../../components/material-ui-wrappers/index";
import { Database } from "../../shared/database";
import { Detail, Type } from "../../types/details";
import { isEmptyString } from "../../utils";

const styles = ({ spacing }: Theme) =>
    createStyles({
        root: {
            margin: spacing.unit,
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
        selectMenu: {
            padding: spacing.unit * 2,
            maxHeight: "50%",
        },
        header: {
            textAlign: "center",
        },
        errorHeader: { background: red[400] },
        successHeader: { background: green[400] },
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
            let db = new Database();
            let record: Detail = new Detail();
            record.name = accountName;
            record.type = type as Type;
            record.amount = amount;
            record.date = date.format("YYYY-MM-DD");

            const success = await db.addNewRecord(record);
            if (success) {
                setSubmitSuccess(success);
            } else {
                setHasError(true);
            }
        }
    };

    const clearForm = () => {
        setAccountName("");
        setDate(moment());
        setAmount(0);
        setType("");
        setSubmitSuccess(false);
        setAmountErrorText("");
        setAccountErrorText("");
        setTypeErrorText("");
        setHasError(false);
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

    const handleAccountSelected = (e: React.ChangeEvent<HTMLSelectElement>) => setAccountName(e.target.value);

    const handleTypeSelected = (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value);

    const handleAmountChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        value ? setAmount(parseInt(value)) : null;
    };

    return (
        <Paper className={classes.root}>
            {hasError && (
                <Header className={`${classes.errorHeader} ${classes.header}`}>
                    Please fix the highlighted errors!
                </Header>
            )}

            {submitSuccess && (
                <Header className={`${classes.successHeader} ${classes.header}`}>
                    The form was successfully submitted!
                </Header>
            )}

            <form onSubmit={handleSubmit} noValidate={true} autoComplete="off" className={classes.root}>
                <MonthYearDatePicker
                    className={classes.formControl}
                    value={date}
                    label="Select Date"
                    onChange={(d: MaterialUiPickersDate) => setDate(moment(d).startOf("month"))}
                />

                <Dropdown
                    className={classes.formControl}
                    label="Account Name"
                    value={accountName}
                    dropdownClassName={classes.selectMenu}
                    onChange={handleAccountSelected}
                    onBlurValidation={validateAccount}
                    errorText={accountErrorText}
                    placeholder="Select Account Name"
                    items={accountNames}
                />

                <Dropdown
                    className={classes.formControl}
                    label="Account Type"
                    value={type}
                    dropdownClassName={classes.selectMenu}
                    onChange={handleTypeSelected}
                    onBlurValidation={validateType}
                    errorText={typeErrorText}
                    placeholder="Select Type"
                    items={typeOptions}
                />

                <CurrencyTextField
                    className={classes.formControl}
                    onChange={handleAmountChanged}
                    onBlurValidation={validateAmount}
                    errorText={amountErrorText}
                    label="Amount"
                    placeholder="Please enter the amount"
                    symbol="NZD"
                />

                <Button className={classes.button} color="secondary" onClick={clearForm}>
                    Reset
                </Button>

                <Button className={classes.button} color="primary" type="submit">
                    Submit
                </Button>
            </form>
        </Paper>
    );
};

export const AddNewEntryMain = withStyles(styles)(AddNewEntryMainForm);
