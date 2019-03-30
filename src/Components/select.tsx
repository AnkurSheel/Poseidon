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

export class Select extends React.Component<ISelectProps, {}> {
    constructor(props: ISelectProps) {
        super(props);
    }
    public render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name}> {this.props.title} </label>
                <select
                    className="form-control"
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.handleChange}>
                    <option key={this.props.placeholder} value="" disabled>
                        {this.props.placeholder}
                    </option>
                    {this.props.options.map(opt => {
                        return (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }
}
