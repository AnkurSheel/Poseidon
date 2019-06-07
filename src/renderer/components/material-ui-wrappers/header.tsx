import { AppBar, Typography } from '@material-ui/core';
import React, { ReactNode } from 'react';

interface IHeaderProps {
    className: string;

    children: ReactNode;
}
export const Header = (props: IHeaderProps) => {
    return (
        <AppBar position="static" className={props.className}>
            <Typography variant="h6" color="inherit">
                {props.children}
            </Typography>
        </AppBar>
    );
};
