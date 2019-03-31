import * as React from "react";

export interface IButtonProps {
    style: React.CSSProperties;
    type: string;
    title: string;
    action: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: IButtonProps) => {
    return (
        <button
            style={props.style}
            className={props.type == "primary" ? "btn btn-primary" : "btn btn-secondary"}
            onClick={props.action}>
            {props.title}
        </button>
    );
};
