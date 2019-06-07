import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { ReactNode } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    })
);

interface IMainContentProps {
    children: ReactNode;
}

const Content = (props: IMainContentProps) => {
    const classes = useStyles(props);
    return <main className={classes.root}>{props.children}</main>;
};

export default Content;
