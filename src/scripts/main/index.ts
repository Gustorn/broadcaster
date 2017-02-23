import {app, BrowserWindow} from "electron";
import ConfigStore from "../stores/config";
import {init as initIpc} from "./ipc";
import {init as initDev} from "./dev";

export let window: Electron.BrowserWindow | null;

const dev = process.env.NODE_ENV != "production";
const config = new ConfigStore();
config.initSync();
initApp();

function initApp()
{
	app.on("ready", ready);

	app.commandLine.appendSwitch("ignore-gpu-blacklist");

	if (!config.hardwareAcceleration) app.disableHardwareAcceleration();
	if (!config.smoothScrolling) app.commandLine.appendSwitch("disable-smooth-scrolling");
}

async function ready()
{
	// init development if in dev mode
	if (dev) await initDev();

	initIpc();

	createWindow();
	app.on("window-all-closed", () => app.quit());
}

function createWindow()
{
	window = new BrowserWindow({
		width: 800,
		height: 600,
		// hidden by default to wait for event
		show: false
	});
	window.loadURL(dev
		? "http://localhost:3000"
		: `file://${__dirname}/../../index.html`);

	// once window is ready, show it
	window.on("ready-to-show", () => window && window.show());
	window.on("closed", () => window = null);
}
