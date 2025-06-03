const fs = require('fs-extra');
const path = require('path');
const config = require('../config');
const prefixes = [config.resource_dir,config.userdata_dir];
const apiPath = path.join(__dirname, '../api');
const {readProfile} = require('../libs/cmfcodec');
const Device = require('./device');
const Driver = require('./driver');
const CMD = require('./cmd');
const {shell,dialog} = require('electron');
const CCMLEManager = require('../libs/cmlemanager');
let modeChangeLock = false; // check lock mode change, for crash fix
module.exports = function (win,eventBus) {
    win.on('close',()=>{
        Device.release();
    })
    const notify = (evt, params) => {
        //console.log('notify client',{evt,params});
        win.webContents.send(evt, typeof params=='string'?params:JSON.stringify(params));
    }
    const api = {
        CloseWnd() {
            win.close();
            return Promise.resolve(null);
        },
        MiniSizeWnd() {
          win.minimize();  
        },
        OpenDebugWnd() {
            win.webContents.openDevTools();
            return Promise.resolve(null);
        },
        ChangeMode({ ModelID, ModeIndex }) {
            console.log('change mode', { ModelID, ModeIndex });

            if (!ModelID || typeof ModelID !== 'number') {
                console.warn('⚠️ Invalid ModelID received:', ModelID);
                return Promise.resolve(false);
            }

            if (modeChangeLock) {
                console.warn('⚠️ Mode change already in progress, skipping');
                return Promise.resolve(false);
            }

            modeChangeLock = true;

            return Device.getDeviceByModelId(ModelID).then(async (device) => {
                if (!device) {
                    console.error(`❌ Device with ModelID ${ModelID} not found`);
                    return false;
                }

                try {
                    if (ModeIndex !== 5 && device.isOnline()) {
                        try {
                            Driver.stopModelLE(ModelID);
                            await device.request(CMD.ToggleKeyReport(false));
                            await new Promise(resolve => setTimeout(resolve, 300));
                        } catch (err) {
                            console.error("❌ Error in ToggleKeyReport:", err);
                        }
                    } else {
                        try {
                            await device.setOnlineMode();
                        } catch (err) {
                            console.error("❌ Error in setOnlineMode:", err);
                        }
                    }

                    const command = CMD.CHANGE_MODE(ModeIndex);
                    console.log("📤 Sending CHANGE_MODE command:", command);

                    try {
                        const result = await device.request(command);
                        console.log("✅ change mode", { mode: ModeIndex, result });
                    } catch (err) {
                        console.error("❌ Error during device.request(CHANGE_MODE):", err);
                    }

                } catch (err) {
                    console.error("❌ Unexpected error in ChangeMode:", err);
                } finally {
                    modeChangeLock = false;
                }

            }).catch((err) => {
                console.error("❌ Error resolving device by model ID:", err);
                modeChangeLock = false;
            });
        },
        OpenURL({URL}){
            shell.openExternal(URL);
        },
        OpenFileDialog(){
           return dialog.showOpenDialog(win, {
            properties: ['openFile']
           }).then(({filePaths})=>{
         //   console.log('#get file#', filePaths)
            if (/.lnk$/i.test(filePaths[0])) {
               return shell.readShortcutLink(filePaths[0]).target.replace('\\', '/')
            }
            return filePaths[0].replace('\\','/')
           });
        }
    };
    return Object.assign(api, {
        ...fs.readdirSync(apiPath).reduce((o, fileName) => {
            if (!fileName.endsWith('.js')) return o;
            return Object.assign(o, require(path.join(apiPath, fileName))({ win, prefixes, fs, notify, api,eventBus }))
        }, {})
    });
}

