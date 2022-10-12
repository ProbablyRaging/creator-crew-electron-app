const electron = require("electron");
const ipc = electron.ipcRenderer;

// Minimize
const minimize = document.getElementById("min-button");
minimize.addEventListener("click", function () {
    ipc.send("toggle-minimize-window");
});

// Resize
const toggleRestoreMin = document.getElementById("restore-button");
toggleRestoreMin.addEventListener("click", function () {
    ipc.send("toggle-restore-window");
});

const toggleRestoreMax = document.getElementById("max-button");
toggleRestoreMax.addEventListener("click", function () {
    ipc.send("toggle-restore-window");
});

ipc.on("response", function (event, args) {
    if (args === 'maximized') {
        toggleRestoreMax.style.display = 'none';
        toggleRestoreMin.style.display = 'flex';
    }
    if (args === 'unmaximized') {
        toggleRestoreMax.style.display = 'flex';
        toggleRestoreMin.style.display = 'none';
    }
});

// Close
const close = document.getElementById("close-button");
close.addEventListener("click", function () {
    ipc.send("toggle-close-window");
});