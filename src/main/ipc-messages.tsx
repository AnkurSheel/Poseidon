import { BrowserWindow, ipcMain } from 'electron';
import { Detail } from '../types/details';
import analytics from './analytics';
import { Database } from './shared/database';
import { UniqueConstraintError } from './shared/unique-contraint-error';

export function setupIpcMessages(mainWindow: BrowserWindow, db: Database) {
    ipcMain.on('get-monthly-totals', async () => {
        const results = await db.getMonthlyTotals();
        mainWindow.webContents.send('monthly-totals', results);
    });
    ipcMain.on('get-yearly-totals', async () => {
        const results = await db.getYearlyTotals();
        mainWindow.webContents.send('yearly-totals', results);
    });
    ipcMain.on('get-individual-details', async () => {
        const results = await db.getIndividualDetails();
        mainWindow.webContents.send('individual-details', results);
    });
    ipcMain.on('insert-record', async (event: any, data: Detail) => {
        try {
            await db.addNewRecord(data);
            mainWindow.webContents.send('insert-record-result', 'Success');
        } catch (err) {
            if (err instanceof UniqueConstraintError) {
                mainWindow.webContents.send('insert-record-result', 'UniqueConstraintError');
            } else {
                mainWindow.webContents.send('insert-record-result', 'Error');
            }
        }
    });
    ipcMain.on('get-account-names', async () => {
        const results = await db.getAccountNames();
        mainWindow.webContents.send('account-names', results);
    });
    ipcMain.on('track-page-view', async (event: any, page: string) => {
        analytics.screenView(page);
    });
}
