import { MenuItem, TextField } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { isEmptyString } from '../../../../utils';

interface IDropdownProps {
    dropdownClassName: string;
    items?: string[];
    children?: ReactNode;

    textfieldClassName: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onBlurValidation: () => boolean;
    errorText: string;
    label: string;
    placeholder?: string;
    value: string | number;
}

export const Dropdown = (props: IDropdownProps) => {
    return (
        <TextField
            className={props.textfieldClassName}
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
