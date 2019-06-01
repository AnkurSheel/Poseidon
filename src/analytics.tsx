import { app } from 'electron';
import * as log from 'electron-log';
import { JSONStorage } from 'node-localstorage';
import { Visitor, VisitorOptions } from 'universal-analytics';
import uuid from 'uuid';

const nodeStorage = new JSONStorage(app.getPath('userData'));
const userId = nodeStorage.getItem('userid') || uuid();
nodeStorage.setItem('userid', userId);
const trackingID = process.env.GOOGLE_ANALYTICS;
const options: VisitorOptions = {
    tid: trackingID,
    cid: userId,
    uid: userId,
};
const user = new Visitor(options);
user.set('ds', 'app');

const timing = (category: string, action: string, duration: number) => {
    user.timing(category, action, parseInt(duration.toString()), (err: Error, count: number) => {
        if (err) {
            log.error('timing error', err, count);
        }
    });
};

const reportEvent = (category: string, action: string) => {
    user.event(category, action, (err: Error, count: number) => {
        if (err) {
            log.error('reportEvent Error', err, count);
        }
    });
};

const reportEventWithValue = (category: string, action: string, label: string, value: number) => {
    user.event(category, action, label, parseInt(value.toString()), (err: Error, count: number) => {
        if (err) {
            log.error('reportEventWithValue Error', err, count);
        }
    });
};

const screenView = (screenName: string) => {
    user.screenview(screenName, 'Newt', app.getVersion()).send();
};

const analytics = {};
export default Object.assign(analytics, {
    timing: timing,
    reportEvent: reportEvent,
    reportEventWithValue: reportEventWithValue,
    screenView: screenView,
});
