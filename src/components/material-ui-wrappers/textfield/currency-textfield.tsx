import { InputAdornment, TextField } from '@material-ui/core';
import React from 'react';
import { isEmptyString } from '../../../utils';
import { ITextFieldProps } from './textfield';

interface ICurrencyTextFieldProps extends ITextFieldProps {
    symbol?: string;
}

export const CurrencyTextField = (props: ICurrencyTextFieldProps) => {
    const symbol = props.symbol || '$';
    const value = props.value as number;
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
            value={value > 0 && value}
        />
    );
};
