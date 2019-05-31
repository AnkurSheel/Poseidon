import { ipcRenderer } from 'electron';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import usePrevious from '../hooks/use-previous';

const GoogleAnalyticsRouteTracker = (props: RouteComponentProps) => {
    const { location } = props;
    const { pathname, search } = location;

    // Get the previous value (was passed into hook on last render)
    const prevLocation = usePrevious(location);

    const isDifferentPathName = !prevLocation || pathname !== prevLocation.pathname;
    const isDifferentSearch = prevLocation && search !== prevLocation.search;

    if (isDifferentPathName || isDifferentSearch) {
        const page = pathname + search;
        ipcRenderer.send('track-page-view', page);
    }
    return <></>;
};

export default GoogleAnalyticsRouteTracker;
