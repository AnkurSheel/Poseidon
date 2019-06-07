import { createStyles, withStyles } from '@material-ui/core';
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import GoogleAnalyticsRouteTracker from './01-elements/google-analytics-route-tracker';
import { Routes } from './03-composites/routes';

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
                <Route component={GoogleAnalyticsRouteTracker} />
                <Routes />
            </Router>
        </div>
    );
};

export default withStyles(styles)(App);
