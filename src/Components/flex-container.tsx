import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import React, { ReactNode } from "react";

const styles = (theme: any) =>
    createStyles({
        root: {
            display: "flex",
        },
    });

interface IFlexContainerProps {
    children: ReactNode;
}

const FlexContainer = (props: IFlexContainerProps) => {
    const div = ({ classes }: WithStyles<typeof styles>) => <main className={classes.root}>{props.children}</main>;
    const Styled = withStyles(styles)(div);
    return <Styled>{props.children}</Styled>;
};

export default FlexContainer;
