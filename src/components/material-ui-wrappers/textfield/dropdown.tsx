import React, { ReactNode } from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { ITextFieldProps } from "./textfield";
import { isEmptyString } from "../../../utils";

interface IDropdownProps extends ITextFieldProps {
    value: string;
    dropdownClassName: string;
    items?: string[];
    children?: ReactNode;
}

export const Dropdown = (props: IDropdownProps) => {
    return (
        <TextField
            className={props.className}
            id="type"
            fullWidth
            select
            label={props.label}
            value={props.value}
            InputLabelProps={{
                shrink: true,
            }}
            SelectProps={{
                displayEmpty: true,
                autoWidth: true,
                MenuProps: {
                    classes: {
                        paper: props.dropdownClassName,
                    },
                },
            }}
            onChange={props.onChange}
            onBlur={props.onBlurValidation}
            error={!isEmptyString(props.errorText)}
            helperText={props.errorText}>
            {props.placeholder && (
                <MenuItem value="">
                    <em>{props.placeholder}</em>
                </MenuItem>
            )}
            {props.items.map(item => {
                return (
                    <MenuItem key={item} value={item}>
                        {item}
                    </MenuItem>
                );
            })}
            {props.children}
        </TextField>
    );
};
