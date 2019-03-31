import * as React from "react";

export interface ISelectProps {
    name: string;
    title: string;
    label?: string;
    value: string;
    options: string[];
    handleChange: (event: React.FormEvent<HTMLSelectElement>) => void;
    placeholder: string;
}

export const Select = (props: ISelectProps) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name}> {props.title} </label>
            <select className="form-control" name={props.name} value={props.value} onChange={props.handleChange}>
                <option key={props.placeholder} value="" disabled>
                    {props.placeholder}
                </option>
                {props.options.map(opt => {
                    return (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
