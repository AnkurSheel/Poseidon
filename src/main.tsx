import { app, BrowserWindow, ipcMain } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import * as path from "path";
import * as url from "url";
import { importJson } from "./import-json";
import { Database } from "./shared/database";
import { UniqueConstraintError } from "./shared/unique-contraint-error";
import { Detail } from "./types/details";

let mainWindow: Electron.BrowserWindow;
const db = new Database(app.getPath("userData"));

function createWindow(): void {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            enableRemoteModule: false,
        },
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

    // if (process.env.ENVIRONMENT === "development") {
    //     installExtension(REACT_DEVELOPER_TOOLS)
    //         .then((name: string) => {
    //             console.log(`Added Extension:  ${name}`);
    //         })
    //         .catch((err: any) => {
    //             console.log("An error occurred: ", err);
    //         });
    // }
}

app.on("ready", () => {
    db.migrateDatabase();
    createWindow();

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
