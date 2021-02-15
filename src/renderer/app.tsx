import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { hot } from 'react-hot-loader';
import { HashRouter as Router, Route } from 'react-router-dom';
import GoogleAnalyticsRouteTracker from './01-elements/google-analytics-route-tracker';
import { Routes } from './03-composites/routes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        '@global': {
            '.root': {
                WebkitUserSelect: 'none',
            },
        },
    })
);

const App = () => {
    useStyles(undefined);
    return (
        <div className="root">
            <Router>
                <Route component={GoogleAnalyticsRouteTracker} />
                <Routes />
            </Router>
        </div>
    );
};

export default hot(module)(App);
