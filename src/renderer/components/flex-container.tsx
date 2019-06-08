import { Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { ReactNode } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
    })
);

interface IFlexContainerProps {
    children: ReactNode;
}

const FlexContainer = (props: IFlexContainerProps) => {
    const classes = useStyles(props);
    return <main className={classes.root}>{props.children}</main>;
};

export default FlexContainer;
