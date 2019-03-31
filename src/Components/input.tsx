import * as React from "react";

export interface IInputProps {
    name: string;
    label?: string;
    type: string;
    value: string | number | string[];
    handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export const Input = (props: IInputProps) => {
    return (
        <div className="form-group">
            {props.label && (
                <label htmlFor={props.name} className="form-label">
                    {props.label}
                </label>
            )}
            <input
                className="form-control"
                id={props.name}
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
            />
        </div>
    );
};
