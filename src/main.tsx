import { app, BrowserWindow } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import * as path from "path";
import * as url from "url";
import { Database } from "./shared/database";

let mainWindow: Electron.BrowserWindow;

function createWindow(): void {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
    });

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "./index.html"),
            protocol: "file:",
            slashes: true,
        }),
    );

    const db = new Database();
    db.migrateDatabase();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    if (process.env.ENVIRONMENT === "development") {
        installExtension(REACT_DEVELOPER_TOOLS)
            .then((name: string) => {
                console.log(`Added Extension:  ${name}`);
            })
            .catch((err: any) => {
                console.log("An error occurred: ", err);
            });
    }
}

app.on("ready", createWindow);

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
