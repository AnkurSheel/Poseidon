import * as log from "electron-log";
import { autoUpdater } from "electron-updater";

export const setupAutoUpdater = () => {
    autoUpdater.checkForUpdates();

    autoUpdater.logger = log;
    log.transports.file.level = "info";

    autoUpdater.on("checking-for-update", () => {
        log.info("Checking for update...");
    });

    autoUpdater.on("update-available", () => {
        log.info("Update available.");
    });

    autoUpdater.on("update-not-available", () => {
        log.info("Update not available.");
    });

    autoUpdater.on("error", err => {
        log.info("Error in auto-updater. " + err);
    });

    autoUpdater.on("download-progress", progressObj => {
        let log_message = "Download speed: " + progressObj.bytesPerSecond;
        log_message = log_message + " - Downloaded " + progressObj.percent + "%";
        log_message = log_message + " (" + progressObj.transferred + "/" + progressObj.total + ")";
        log.info(log_message);
    });

    autoUpdater.on("update-downloaded", () => {
        log.info("Update downloaded");
    });
};
