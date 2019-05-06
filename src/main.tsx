import { app, BrowserWindow } from "electron";
import * as log from "electron-log";
import * as path from "path";
import * as url from "url";
import { setupAutoUpdater } from "./auto-updater";
import { setupIpcMessages } from "./ipc-messages";
import { Database } from "./shared/database";
import { isDevelopment, isProduction } from "./utils";

export let mainWindow: Electron.BrowserWindow;
const db = new Database(app.getPath("userData"));

log.info("App starting...");

function createWindow(): void {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            enableRemoteModule: isDevelopment,
            nodeIntegration: true,
        },
        show: false,
    });

    // await importJson(db);

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "./index.html"),
            protocol: "file:",
            slashes: true,
        }),
    );

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    });
}

app.on("ready", async () => {
    if (isProduction) {
        setupAutoUpdater();
    }

    db.migrateDatabase();
    createWindow();
    await addExtensions();

    setupIpcMessages(mainWindow, db);
});

app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
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
