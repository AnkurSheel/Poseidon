import { Notification } from "electron";
import * as log from "electron-log";
import { autoUpdater, UpdateInfo } from "electron-updater";

export const setupAutoUpdater = () => {
    autoUpdater.checkForUpdates();

    autoUpdater.logger = log;
    log.transports.file.level = "info";

    autoUpdater.on("checking-for-update", () => {
        log.info("Checking for update...");
    });

    autoUpdater.on("update-available", (updateInfo: UpdateInfo) => {
        log.info("Update available.");

        let myNotification = new Notification({
            title: "Update Available",
            body: `${updateInfo.releaseName} is available and is being downloaded while you work.`,
        });

        myNotification.show();
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

    autoUpdater.on("update-downloaded", (updateInfo: UpdateInfo) => {
        log.info("Update downloaded");
        let myNotification = new Notification({
            title: "Update Downloaded",
            body: `${updateInfo.releaseName} has been downloaded and will be installed after you quit.`,
        });

        myNotification.show();
    });
};
