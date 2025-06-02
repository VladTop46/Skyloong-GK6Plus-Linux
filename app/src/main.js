
const config = require('./config');
const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
const EventEmitter = require('events').EventEmitter;
const eventBus = new EventEmitter();
const { platform } = require('os');
const { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage } = require('electron');
// debug
process.on('uncaughtException', (err) => {
  console.error('💥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Promise Rejection:', reason);
});
// end debug
if (!config.debug) {
  Menu.setApplicationMenu(false);
}
fs.writeFileSync(path.join(app.getPath('userData'), '.inited'), '1')
const SDK = require('./libs/sdk');
let sdk;
let win;
let isGoingToQuit = false;

const isMac = platform() === 'darwin';

async function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 800,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      devTools: !!config.debug,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // debug
  console.log("Creating SDK");
  try {
    sdk = SDK(win, eventBus);
  } catch (e) {
    console.error("❌ Failed to create SDK:", e);
  }
  // end debug
  await win.loadURL(config.startPage || `file://${path.join(__dirname, '../ui/index.html')}`);

  if (config.debug) {
    win.webContents.openDevTools();
  }

  if (!isMac) {
    win.on('close', (ev) => {
      if (isGoingToQuit) return;
      ev.preventDefault()
      win.hide()
    })
  }
}

ipcMain.handle('callFunc', async (event, params) => {
  try {
    const { funcname, ...rest } = JSON.parse(params);
    if (!sdk[funcname]) {
      throw new Error(`function name ${funcname} is not support,${params}`);
    } else {
      let result = await sdk[funcname](rest);
      if (funcname == 'WriteProfile') {
        console.log('WriteProfile result', result);
      }
      if (!result) return;
      if (typeof result != 'string') result = JSON.stringify(result);
      return result;
    }
  } catch (e) {
    console.log('handle error', e);
    return { __error: true, code: 1, message: e.message };
  }
});

if (isMac) {

  app.whenReady().then(async () => {
    await createWindow();
  });
   
  app.on('window-all-closed', () => {
    console.log('#all window closed#')
    app.exit(0);
  });
  return 
}

const appPath = app.getPath('exe');
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (win) {
      if (!win.isVisible()) {
        win.show()
      } else if (win.isMinimized()) {
        win.restore()
      }
      win.focus()
    }
  });
  const userConfigFile = path.join(config.userdata_dir, 'AppConfig.json')
  const getUserConfig = async () => {
    let userConfig = {
    }
    if (fs.existsSync(userConfigFile)) {
      const content = await fsExtra.readFile(userConfigFile)
      userConfig = JSON.parse(content.toString('utf8'))
    }
    return userConfig
  }
  app.whenReady().then(async () => {
    const iconPath = path.join(__dirname, '../static/tray-light-active@2x.png')
    const tray = new Tray(nativeImage.createFromPath(iconPath))
    const localLang = app.getLocale() == 'zh-CN' ? 'zh' : 'en'
    const setdContextMenu = async (lang) => {
      let { Language } = await getUserConfig()
      Language = lang || Language || localLang
      const contextMenu = Menu.buildFromTemplate([
        {
          label: Language == 'zh' ? '开机启动' : 'Auto Start',
          type: 'checkbox',
          checked: app.getLoginItemSettings({
            args: ['--', '--openAsHidden'],
            path: appPath
          }).openAtLogin,
          click: (event) => {
            const { openAtLogin } = app.getLoginItemSettings({
              args: ['--', '--openAsHidden'],
              path: appPath
            })

            app.setLoginItemSettings({
              openAtLogin: !openAtLogin,
              args: ['--', '--openAsHidden'],
              path: appPath
            })
          }
        },
        {
          type: 'separator'
        },
        {
          label: Language == 'zh' ? '退出' : 'Quit',
          click: () => {
            isGoingToQuit = true;
            console.log('quit');
            app.quit();
          }
        }
      ])

      tray.setContextMenu(contextMenu)
    }
    eventBus.on('config-changed', (data) => {
      const { Language } = JSON.parse(data)
      if (Language) {
        setdContextMenu(Language)
      }
    })
    setdContextMenu()
    await createWindow()
    tray.on('click', () => {
      win.show()
    })
    if (process.argv.indexOf('--openAsHidden') < 0) {
      win.show()
    }
  })
}