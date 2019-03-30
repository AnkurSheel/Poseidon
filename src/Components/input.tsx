import * as React from "react";

export interface IInputProps {
    name: string;
    label?: string;
    type: string;
    value: string | number | string[];
    handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export class Input extends React.Component<IInputProps, {}> {
    constructor(props: IInputProps) {
        super(props);
    }
    public render() {
        return (
            <div className="form-group">
                {this.props.label && (
                    <label htmlFor={this.props.name} className="form-label">
                        {this.props.label}
                    </label>
                )}
                <input
                    className="form-control"
                    id={this.props.name}
                    name={this.props.name}
                    type={this.props.type}
                    value={this.props.value}
                    onChange={this.props.handleChange}
                    placeholder={this.props.placeholder}
                />
            </div>
        );
    }
}
