import * as React from "react";

export interface IButtonProps {
    style: React.CSSProperties;
    isPrimary: boolean;
    type: string;
    title: string;
    action?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: IButtonProps) => {
    return (
        <button
            style={props.style}
            className={props.isPrimary ? "btn btn-primary" : "btn btn-secondary"}
            type={props.type}
            onClick={props.action}>
            {props.title}
        </button>
    );
};
