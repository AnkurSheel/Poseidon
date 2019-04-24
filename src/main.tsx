import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import { Database } from "./shared/database";
import { UniqueConstraintError } from "./shared/unique-contraint-error";
import { Detail } from "./types/details";

let mainWindow: Electron.BrowserWindow;
const db = new Database(app.getPath("userData"));
const isDevelopment = process.env.ENVIRONMENT === "development";

function createWindow(): void {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            enableRemoteModule: isDevelopment,
        },
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

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", async () => {
    db.migrateDatabase();
    createWindow();
    await addExtensions();

    ipcMain.on("get-monthly-totals", async () => {
        const results = await db.getMonthlyTotals();
        mainWindow.webContents.send("monthly-totals", results);
    });

    ipcMain.on("get-yearly-totals", async () => {
        const results = await db.getYearlyTotals();
        mainWindow.webContents.send("yearly-totals", results);
    });

    ipcMain.on("get-individual-details", async () => {
        const results = await db.getIndividualDetails();
        mainWindow.webContents.send("individual-details", results);
    });

    ipcMain.on("insert-record", async (event: any, data: Detail) => {
        try {
            await db.addNewRecord(data);
            mainWindow.webContents.send("insert-record-result", "Success");
        } catch (err) {
            if (err instanceof UniqueConstraintError) {
                mainWindow.webContents.send("insert-record-result", "UniqueConstraintError");
            } else {
                mainWindow.webContents.send("insert-record-result", "Error");
            }
        }
    });
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
            let result = await devTools.default(devTools.REACT_DEVELOPER_TOOLS);
            console.log(`Added Extension`);
        } catch (err) {
            console.log("An error occurred: ", err);
        }
    }
}
