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
        ChangeMode({ModelID,ModeIndex}){
            console.log('change mode',{ModelID,ModeIndex});
            Device.getDeviceByModelId(ModelID).then(async (device)=>{
                if(ModeIndex!==5){
                   if(device.isOnline()){
                    Driver.stopModelLE(ModelID);
                   await device.request(CMD.ToggleKeyReport(false));
                    await new Promise((resolve)=>setTimeout(resolve, 200));
                   }
                }else{
                    await  device.setOnlineMode(); 
                }
                device.hasChangedMode = true;
                if(!device.hasChangedMode){
                    device.hasChangedMode=true;
                    setTimeout(()=>{
                        device.request(CMD.CHANGE_MODE(ModeIndex)).then(result=>{
                            console.log('change mode',result);
                        });
                    },2500);
                }else{
                    device.request(CMD.CHANGE_MODE(ModeIndex)).then(result=>{
                        console.log('change mode',result);
                    });
               }
                
            });
          
            return Promise.resolve(true);
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

