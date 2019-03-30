import * as React from "react";

export interface IButtonProps {
    style: React.CSSProperties;
    type: string;
    title: string;
    action: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export class Button extends React.Component<IButtonProps, {}> {
    constructor(props: IButtonProps) {
        super(props);
    }
    public render() {
        return (
            <button
                style={this.props.style}
                className={this.props.type == "primary" ? "btn btn-primary" : "btn btn-secondary"}
                onClick={this.props.action}>
                {this.props.title}
            </button>
        );
    }
}
