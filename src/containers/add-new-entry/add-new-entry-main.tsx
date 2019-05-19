import { createStyles, Paper, Theme, withStyles, WithStyles } from "@material-ui/core";
import { blue, green, red } from "@material-ui/core/colors";
import { ipcRenderer } from "electron";
import { MaterialUiPickersDate } from "material-ui-pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Content from "../../Components/content";
import FlexContainer from "../../Components/flex-container";
import { Header } from "../../components/material-ui-wrappers/header";
import { Button, CurrencyTextField, Dropdown, MonthYearDatePicker } from "../../components/material-ui-wrappers/index";
import Navigation from "../../components/navigation";
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
        submittingHeader: { background: blue[400] },
    });

const AddNewEntryMainForm = (props: RouteComponentProps & WithStyles<typeof styles>) => {
    const { location, classes } = props;
    const [selectedAccountName, setSelectedAccountName] = useState("");
    const [selectedAccountType, setSelectedAccountType] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState<moment.Moment>(moment());
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [amountErrorText, setAmountErrorText] = useState("");
    const [accountErrorText, setAccountErrorText] = useState("");
    const [typeErrorText, setTypeErrorText] = useState("");
    const [formErrorText, setFormErrorText] = useState("");
    const [submittingText, setSubmittingText] = useState("");
    const [accountNames, setAccountNames] = useState<string[]>(["Loading"]);
    const [accountTypes, setAccountTypes] = useState<string[]>(["Loading"]);
    useEffect(() => {
        ipcRenderer.send("get-account-names");
        return () => {
            ipcRenderer.removeAllListeners("insert-record-result");
            ipcRenderer.removeAllListeners("account-names");
        };
    }, []);

    ipcRenderer.on("account-names", (event: any, data: any) => {
        const accounts = data.map((d: any) => d.name);
        const types: string[] = [];
        const map = new Map();
        for (const item of data) {
            if (!map.has(item.type)) {
                map.set(item.type, true); // set any value to Map
                types.push(item.type);
            }
        }
        setAccountNames(accounts);
        setAccountTypes(types);
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        clearText();

        if (validateForm()) {
            const record: Detail = new Detail();
            record.name = selectedAccountName;
            record.type = selectedAccountType as Type;
            record.amount = record.type === Type.Asset ? parseFloat(amount) : -parseFloat(amount);
            record.date = date.format("YYYY-MM-01");

            setSubmittingText("Submitting...");

            ipcRenderer.send("insert-record", record);
        } else {
            setFormErrorText("Please fix the highlighted errors!");
        }
    };

    ipcRenderer.on("insert-record-result", (event: any, msg: string) => {
        clearText();
        if (msg === "Success") {
            clearForm();
            setSubmitSuccess(true);
        } else if (msg === "UniqueConstraintError") {
            setFormErrorText(`A record with "${selectedAccountName}" already exists for "${date.format("MMMM YYYY")}"`);
        } else {
            setFormErrorText(`Something went wrong. Please try again later`);
        }
    });

    const clearForm = () => {
        setSelectedAccountName("");
        setDate(moment());
        setAmount("");
        setSelectedAccountType("");
        clearText();
    };

    const clearText = () => {
        setSubmitSuccess(false);
        setAmountErrorText("");
        setAccountErrorText("");
        setTypeErrorText("");
        setFormErrorText("");
        setSubmittingText("");
    };

    const validateForm = (): boolean => {
        let error = validateAmount();
        error = validateAccount() || error;
        error = validateType() || error;
        return !error;
    };

    const validateAmount = (): boolean => {
        if (parseFloat(amount) <= 0) {
            setAmountErrorText("Amount should be a positive number");
            return true;
        }
        setAmountErrorText("");
        return false;
    };

    const validateAccount = (): boolean => {
        if (isEmptyString(selectedAccountName)) {
            setAccountErrorText("Account is required");
            return true;
        }
        setAccountErrorText("");
        return false;
    };

    const validateType = (): boolean => {
        if (isEmptyString(selectedAccountType)) {
            setTypeErrorText("Type is required");
            return true;
        }
        setTypeErrorText("");
        return false;
    };

    const handleAccountSelected = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedAccountName(e.target.value);

    const handleTypeSelected = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedAccountType(e.target.value);

    const handleAmountChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // const number = Number(value);
        value ? setAmount(value) : null;
    };

    return (
        <FlexContainer>
            <Navigation currentPath={location.pathname} />
            <Content>
                <Paper className={classes.root}>
                    {!isEmptyString(formErrorText) && (
                        <Header className={`${classes.errorHeader} ${classes.header}`}>{formErrorText}</Header>
                    )}

                    {!isEmptyString(submittingText) && (
                        <Header className={`${classes.submittingHeader} ${classes.header}`}>{submittingText}</Header>
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
                            value={selectedAccountName}
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
                            value={selectedAccountType}
                            dropdownClassName={classes.selectMenu}
                            onChange={handleTypeSelected}
                            onBlurValidation={validateType}
                            errorText={typeErrorText}
                            placeholder="Select Type"
                            items={accountTypes}
                        />

                        <CurrencyTextField
                            className={classes.formControl}
                            onChange={handleAmountChanged}
                            onBlurValidation={validateAmount}
                            errorText={amountErrorText}
                            label="Amount"
                            placeholder="Please enter the amount"
                            symbol="NZD"
                            value={amount}
                        />

                        <Button className={classes.button} color="secondary" onClick={clearForm}>
                            Reset
                        </Button>

                        <Button className={classes.button} color="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                </Paper>
            </Content>
        </FlexContainer>
    );
};

export const AddNewEntryMain = withStyles(styles)(AddNewEntryMainForm);
