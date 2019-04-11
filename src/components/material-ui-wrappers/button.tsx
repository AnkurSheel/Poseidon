import React, { ReactNode } from "react";
import { Button as MaterialUiButton, PropTypes } from "@material-ui/core";

interface IButtonProps {
    className: string;
    color: PropTypes.Color;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    children: ReactNode;
    type?: "submit";
}

export const Button = (props: IButtonProps) => {
    return (
        <MaterialUiButton
            className={props.className}
            variant="contained"
            color={props.color}
            onClick={props.onClick}
            type={props.type}>
            {props.children}
        </MaterialUiButton>
    );
};
