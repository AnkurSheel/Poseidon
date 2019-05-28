import { createStyles, withStyles } from '@material-ui/core';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Routes } from '../routes';

const styles = () =>
    createStyles({
        '@global': {
            '.root': {
                WebkitUserSelect: 'none',
            },
        },
    });

const App = (props: any) => {
    const { classes } = props;

    return (
        <div className="root">
            <Router>
                <Routes />
            </Router>
        </div>
    );
};

export default withStyles(styles)(App);
