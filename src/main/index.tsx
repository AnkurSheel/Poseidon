import { app, BrowserWindow, screen } from 'electron';
import * as log from 'electron-log';
import * as path from 'path';
import { performance, PerformanceObserver } from 'perf_hooks';
import * as url from 'url';
import { isDevelopment, isProduction } from '../utils';
import analytics from './analytics';
import { setupAutoUpdater } from './auto-updater';
import { setupIpcMessages } from './ipc-messages';
import { Database } from './shared/database';

performance.mark('Start');

export let mainWindow: Electron.BrowserWindow;
const db = new Database(app.getPath('userData'));

analytics.reportEvent('app', 'started');
analytics.reportEventWithValue('app', 'version', app.getVersion(), 0);
analytics.reportEventWithValue('app', 'target', process.platform, 0);
analytics.screenView('Before Start');

const obs = new PerformanceObserver((items, observer) => {
    items.getEntries().forEach(item => {
        log.info(`${item.name}: ${item.duration}`);
        analytics.timing('Application', item.name, item.duration);
    });
});

obs.observe({ entryTypes: ['measure'], buffered: true });

function createWindow(): void {
    const title = `Newt-v${app.getVersion()}`;
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    mainWindow = new BrowserWindow({
        height,
        width,
        webPreferences: {
            enableRemoteModule: isDevelopment,
            nodeIntegration: true,
        },
        title,
        show: false,
    });

    // await importJson(db);

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true,
        })
    );

    mainWindow.on('page-title-updated', evt => {
        evt.preventDefault();
    });

    mainWindow.on('close', () => {
        performance.mark('Application Stopped');
        performance.measure('Time in App', 'Render Screen', 'Application Stopped');
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        performance.mark('Render Screen');
        performance.measure('Electron Initialize', 'Start', 'Initialized');
        performance.measure('First Screen Render', 'Initialized', 'Render Screen');
        performance.measure('Total Start Time', 'Start', 'Render Screen');

        if (isProduction) {
            app.setAppUserModelId('com.ankursheel.Newt');
            setupAutoUpdater();
        }
    });
}

app.on('ready', async () => {
    performance.mark('Initialized');

    db.migrateDatabase();

    if (process.env.ENVIRONMENT === 'staging') {
        db.seedDatabase();
    }

    createWindow();
    await addExtensions();

    setupIpcMessages(mainWindow, db);
});

app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        obs.disconnect();
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

async function addExtensions() {
    if (isDevelopment) {
        try {
            const devTools = await import('electron-devtools-installer');
            const result = await devTools.default(devTools.REACT_DEVELOPER_TOOLS);
            console.log(`Added Extension`);
        } catch (err) {
            console.log('An error occurred: ', err);
        }
    }
}
