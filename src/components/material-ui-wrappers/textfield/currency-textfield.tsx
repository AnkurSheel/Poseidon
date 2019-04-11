import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import { ITextFieldProps } from "./textfield";
import { isEmptyString } from "../../../utils";

interface ICurrencyTextFieldProps extends ITextFieldProps {
    symbol?: string;
}

export const CurrencyTextField = (props: ICurrencyTextFieldProps) => {
    const symbol = props.symbol || "$";
    return (
        <TextField
            className={props.className}
            fullWidth
            label={props.label}
            type="Number"
            InputProps={{
                startAdornment: <InputAdornment position="start">{symbol}</InputAdornment>,
            }}
            onChange={props.onChange}
            onBlur={props.onBlurValidation}
            placeholder={props.placeholder}
            error={!isEmptyString(props.errorText)}
            helperText={props.errorText}
        />
    );
};
