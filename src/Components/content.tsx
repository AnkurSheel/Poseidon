import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";
import React, { ReactNode } from "react";

interface IMainContentProps {
    children: ReactNode;
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    });

const Content = (props: IMainContentProps) => {
    const div = ({ classes }: WithStyles<typeof styles>) => <main className={classes.root}>{props.children}</main>;
    const Styled = withStyles(styles)(div);
    return <Styled>{props.children}</Styled>;
};

export default Content;
