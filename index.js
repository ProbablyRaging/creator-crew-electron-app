const { app, BrowserWindow } = require('electron');
const path = require('path');
const ipc = require("electron").ipcMain;
const ejse = require('ejs-electron');

require('electron-reloader')(module);

if (require('electron-squirrel-startup')) {
    app.quit();
}

ejse.data('user', 'jim')

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        frame: false,
        backgroundColor: '#fff',
        webPreferences: {
            preload: path.join(__dirname, 'src/scripts/preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadFile(path.join(__dirname, 'src/views/index.ejs'));
};

app.disableHardwareAcceleration();

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Handle minimize button
ipc.on("toggle-minimize-window", function (event) {
    mainWindow.minimize();
});

// Handle restore button
ipc.on("toggle-restore-window", function (event, args) {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
        event.sender.send('response', 'unmaximized');
    } else {
        mainWindow.maximize();
        event.sender.send('response', 'maximized');
    }
});

// Handle close button
ipc.on("toggle-close-window", function (event) {
    mainWindow.close();
});