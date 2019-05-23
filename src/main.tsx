import { app, BrowserWindow, screen } from "electron";
import * as log from "electron-log";
import * as path from "path";
import { performance, PerformanceObserver } from "perf_hooks";
import * as url from "url";
import { setupAutoUpdater } from "./auto-updater";
import { setupIpcMessages } from "./ipc-messages";
import { Database } from "./shared/database";
import { isDevelopment, isProduction } from "./utils";

performance.mark("Start");

const obs = new PerformanceObserver((items, observer) => {
    items.getEntries().forEach(item => {
        log.warn(`${item.name}: ${item.duration}`);
    });
});

obs.observe({ entryTypes: ["measure"] });

export let mainWindow: Electron.BrowserWindow;
const db = new Database(app.getPath("userData"));

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
            pathname: path.join(__dirname, "./index.html"),
            protocol: "file:",
            slashes: true,
        })
    );

    mainWindow.on("page-title-updated", evt => {
        evt.preventDefault();
    });

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
        performance.mark("Ready to show");
        performance.measure("Ready to show", "Application Ready", "Ready to show");
        performance.measure("Start to show", "Start", "Ready to show");
    });
}

app.on("ready", async () => {
    performance.mark("Application Ready");
    performance.measure("Start to ready", "Start", "Application Ready");

    if (isProduction) {
        app.setAppUserModelId("com.ankursheel.Newt");
        setupAutoUpdater();
    }

    db.migrateDatabase();

    if (process.env.ENVIRONMENT === "staging") {
        db.seedDatabase();
    }

    createWindow();
    await addExtensions();

    setupIpcMessages(mainWindow, db);
});

app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        obs.disconnect();
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

async function addExtensions() {
    if (isDevelopment) {
        try {
            const devTools = await import("electron-devtools-installer");
            const result = await devTools.default(devTools.REACT_DEVELOPER_TOOLS);
            console.log(`Added Extension`);
        } catch (err) {
            console.log("An error occurred: ", err);
        }
    }
}
