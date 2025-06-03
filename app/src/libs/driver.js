const os = require('os');
const isWin32 = os.platform == 'win32';
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const HID = require('node-hid');
const CMD = require('./cmd');
const config = require('../config');
const CMF = require('./cmfcodec');
const g_pcmCMLEManager = require('./cmlemanager');
const scriptEngineManager = require('./scripteginemanager');
let drivers = [];
let loaded = false;
const debug = false;
const DefaultMatrix = 132;
const {shell} = require('electron');
const { resolve } = require('path');
const attributeKeys = 'Wireless,Mouse,Keyboard,CDBoot,InTime,LE,STDKeyCount,MaxMouseX,MaxMouseY,MaxMouseZ'.split(',');
const exec = require('child_process').exec
function loadDrivers() {
    if (loaded) return;
    loaded = true;
    drivers = fs.readdirSync(path.join(__dirname, '../drivers'))
        .filter(fileName => fileName.endsWith('.js'))
        .map(fileName => require(path.join(__dirname, '../drivers', fileName)));
}
class Driver {
    constructor(deviceInfo) {
        this.deviceInfo = deviceInfo;
        this.opened = false;
        this.wait = false;
        this.pending = [];
        this.callbacks = [];
        this.keydowns = [];
        this.createTime = new Date().getTime();
    }
    open(keepOpen = true) {
        if (this.device) return;

        //this.opened = true;
        if (!this.opened && keepOpen) this.opened = true;
        this.device = new HID.HID(this.deviceInfo.path);
        this._dataHandle = this._onData.bind(this);
        
        try{
         this.device.setNonBlocking(true);
        }catch(e){
            
        }
        this.device.on('data', this._dataHandle);
        this.device.on('error', function () {
           // console.log('on error');
        });
        return this;
    }
   async _onData(data) {
        if (!Buffer.isBuffer(data) || data.length < 8) {
            console.warn("⚠️ Invalid data buffer received:", data);
            return false;
        }
        console.warn("⚠️ calling _onData(data)")

        debug && console.log('#receive data#',new Date(),data);
        if(data[0]==0x0b && !this.waitModeChange){
            // console.log('#mode change#',data[1]);
            console.log('change from keyboard',data[1]);
            this.m_byModel = data[1];
            this.wait = false;
            if(data[1]!==1 && data[1]!==5) return this.close(true);
            if(data[1]==5){
              g_pcmCMLEManager.resumeLE(this.probeInfo.ModelID);
            }else{
             g_pcmCMLEManager.stopLE(this.probeInfo.ModelID);
            }
           return ;
         }
        if(data[0]==0x15 && data[1]==0x04){
            const keydowns = [];
            for(let i =8;i<24;i++){
                if(data[i]){
                    for(let j = 0 ; j < 8 ;j++){
                        if((data[i] >> j) & 0x01) keydowns.push((i-8)*8 + j);
                    }
                } 
            }
            const downEvents = keydowns.filter(k=>!this.keydowns.includes(k));
            const upEvents = this.keydowns.filter(k=>!keydowns.includes(k));
            for(let key of downEvents){
                this.onKeyReport && this.onKeyReport(key,1);
            }
            for(let key of upEvents){
                this.onKeyReport && this.onKeyReport(key,0);
            }
            this.keydowns = keydowns;
            return;
        }

        if(data[0]==0x18){
           // console.log('macro report',data);
            return;
        }
        if(data[0]==0x01 && data[0]==0x0a){
            this.close(true);
            this.wait = false;
            return;
        }
       
        
        if(this.onData) {
            if(this.onData(data)===false) return;

        }
       
         if(this.pending.length){
                (this.pending.shift())();
         }else{
             this.wait = false;
         }
    }

    getVersionName() {
        if (!this.probeInfo) return '未知版本';
        return `v${(this.probeInfo.FWVersion >> 8) & 0xff}.${this.probeInfo.FWVersion & 0xff}`;
    }

    
    probe() {

    }

    close(clear) {
        this.opened = false;
        this.wait = false;
        if(clear){
            while( this.pending.length>0){
                (this.pending.shift())(true);
            }
        }
      if(_.get(this,'probeInfo.ModelID')){
       g_pcmCMLEManager.CMS_CloseModeLE(this.probeInfo.ModelID);
       scriptEngineManager.close(this.probeInfo.ModelID);
      }
       this.m_byModel=null;
       if(this.onlinePid){
           clearInterval(this.onlinePid);
           this.onlinePid = null;
       }
        if (this.device) {
            if (this._dataHandle) {
                this.device.off('data', this._dataHandle);
                this._dataHandle = null;
            }
            this.device.close();
            this.device = null;
            this.onData = null;
        }

    }

    request (cmd){
        return new Promise((resolve,reject)=>{
             const task = (skip)=>{
                if(skip) return resolve({}); 
                if(cmd.req.cmd==0x0b){
                    this.waitModeChange = true;
                    if(cmd.req.sub_cmd != 0x05){
                        if(this.onlinePid){
                            console.log('### close writeping ###');
                            clearInterval(this.onlinePid);
                            this.onlinePid = null;
                        }
                    }
                    this.m_byModel = cmd.req.sub_cmd;
                }
                if(!cmd.timeout) cmd.timeout = 5000;
               // if (cmd.timeout) {
                    const timeout = cmd.timeout;
                    delete cmd.timeout;
                    cmd.timeout = setTimeout(() => {
                       // console.log('time out ',cmd);
                        reject(new Error('time out'));
                    }, timeout);
                //}
        
                if (!cmd.res) cmd.res = function (buffer) {
                    return { ack: buffer.readUInt8(1) };
                }
                let success = true;
                try{
                this.open(this.isOnline());
                    const buffer = cmd.req.toBuffer();
    
                  //  console.log('****req:*****',buffer);
                    if (isWin32) {
                        this.device.write(Buffer.concat([Buffer.from([0x00]),buffer],buffer.length+1));
                    } else {
                        this.device.write(buffer);
                    }
                  
                   debug &&  console.log('#write data#',new Date(),buffer);
                }catch(e){
                    success=false;
                    reject(e);
                }
    
                if(success){
                    this.onData = async (data)=>{
                        if(data[0]!=cmd.req.cmd){
                            console.log('**** invalidate response ****',data);
                            return false;
                        }
                        if(cmd.req.cmd == 0x0b) this.waitModeChange=false;
                       
                        if (cmd.timeout) {
                            clearTimeout(cmd.timeout);
                            delete cmd.timeout;
                        }
                       
                        if (!this.opened)this.close();
                       // setTimeout(()=>{
                            if (!Buffer.isBuffer(data) || data.length < 8) {
                                console.warn("⚠️ Invalid data buffer received:", data);
                                return false;
                            }
                            console.warn("⚠️ calling resolve in request (cmd)")
                            resolve(cmd.res(data), data);
                       // },100);
                        
                    };
                }
             };
             if(this.wait) {
               //  console.log('#pending write task#',this.pending.length);
                 this.pending.push(task);
             }
             else {
                // console.log('write directly');
                this.wait=true;
                 task();
             }
        });
    }
    toJSON() {
        return {
            Attribute: attributeKeys.reduce((result, key, index) => {
                result[key] = this.constructor.meta[index + 4];
                return result;
            }, {}),
            ...this.probeInfo,
            Online: 1
        }
    }
    setOffLineProfile(profileData) {
        return Promise.resolve()
            .then(async () => {

            })
    }
    changePid() {
        return this.request({ ...CMD.WRITE_MAC_VID, timeout: 2000 });
    }
    isOnline(){
        return this.m_byModel == 5;
    }
    setOnlineMode(){
        this.opened=true;
        return Promise.resolve().then(async () => {
            if(this.m_byModel == 5){
                console.log('already online mode ');
                return false;
            } 
            const delayTime = new Date().getTime() - this.createTime;
            console.log('delay time',delayTime);
            if(delayTime<2000) await new Promise(resolve=>setTimeout(resolve,2000-delayTime));
            console.log('start write ping');
            await this.request(CMD.Ping);
            console.log('write ping ok.');
            await this.request(CMD.CHANGE_MODE(5));
            if(this.onlinePid) clearInterval(this.onlinePid);
            if(!this.onlinePid){
               // await this.request(CMD.Ping);
               this.onlinePid  = setInterval(async ()=>{
                   if(!this.isOnline()) return;
                   await this.request(CMD.Ping);
               },2000);
              }
              await this.request(CMD.Ping);
              await  this.request(CMD.ToggleKeyReport(true));
          
            //  await this.request(CMD.Ping);
              return true;
        });
    }
    setOnLineProfile(jsonData) {
        this.onKeyReport = async (index,isDown)=>{
            if(!this.isOnline()) return;
           const keyData = jsonData["KeySet"].find(s=>s.Index*1==index);
           if(!keyData) return;
           if(keyData.Task){
               if (keyData.Task.Type == 'OpenURL' ) {
               if(isDown){
                exec(keyData.Task.Data.AppPath)
               }
                return
               }
               scriptEngineManager.processKeyEvent(index,isDown,keyData.Task,this.probeInfo.ModelID);
           }
           if(_.get(keyData,'KeyLE.GUID') && isDown){
            const {body:strLEData} = await CMF.decodeFile(path.join(config.userdata_dir, `Account/0/LE/${_.get(keyData,'KeyLE.GUID')}.le`));
             g_pcmCMLEManager.CMS_DisplayLE(this.probeInfo.ModelID, strLEData, false);
           }
           if((keyData.DriverValue||'').startsWith('0x')) return;
           if(fs.existsSync(keyData.DriverValue) && isDown){
               shell.openExternal(`file://${keyData.DriverValue}`);
           }
        }
        return Promise.resolve().then(async () => {
            let nRet = true;
            let nKDDataLen = 512;
            const { key_col: byCol, key_row: byRow } = await this.request(CMD.MATRIX);
            if(!byCol) return true;
            console.log('matrix',byCol,byRow);
            nKDDataLen = byCol * byRow * 4;


            const byKeyDefine = Buffer.alloc(nKDDataLen, 0);
            const byKeyDefineRead = Buffer.alloc(nKDDataLen, 0xff);
            const byLecofig = Buffer.alloc(8, 0);
            let byLEEnable = 0;
            if (nRet) {

                const byGameLightKey = Buffer.alloc(16 * 8, 0xff);
                if (nRet && Array.isArray(jsonData["KeySet"])) {
                    const nKeyCount = jsonData["KeySet"].length;
                    if (nKeyCount > 128)
                        nKeyCount = 128;
                    for (let i = 0; i < nKeyCount; i++) {
                        let nIndex = jsonData["KeySet"][i]["Index"] * 1;
                        let nKeyValue = parseInt(jsonData["KeySet"][i]["DriverValue"], 16);
                       // console.log('dirver value',jsonData["KeySet"][i]["DriverValue"],nKeyValue);
                       if(isNaN(nKeyValue)){
                           console.log('app hot key',jsonData["KeySet"][i]);
                       }
                        if ((nKeyValue == 0x0A030001) || (nKeyValue == 0x0A010001))
                            byKeyDefine[nIndex * 4] = ((nKeyValue >> 0) & 0xFF) + nIndex;
                        else
                            byKeyDefine[nIndex * 4] = (nKeyValue >> 0) & 0xFF;
                        byKeyDefine[nIndex * 4 + 1] = (nKeyValue >> 8) & 0xFF;
                        byKeyDefine[nIndex * 4 + 2] = (nKeyValue >> 16) & 0xFF;
                        byKeyDefine[nIndex * 4 + 3] = (nKeyValue >> 24) & 0xFF;
                        //if (jsonData["KeySet"][i]["KeyLE"]["GUID"]) byGameLightKey[nIndex] = nIndex + 1;
                        if(_.get(jsonData,['KeySet',i,'KeyLE','GUID'])) byGameLightKey[nIndex] = nIndex + 1;
                    }

                    for (let i = 0; i < nKDDataLen; i += 56) {
                        if (i + 56 <= nKDDataLen) {
                            if (!await this.CMD_SetKeyTable(0x01, i, byKeyDefine.slice(i,i+56)))
                                nRet = false;

                        } else {
                            if (!await this.CMD_SetKeyTable(0x01, i, byKeyDefine.slice(i,nKDDataLen)))
                                nRet = false;
                        }
                        if (!nRet)
                            break;
                    }
                    for (let i = 0; i < byCol * byRow; i += 56) {
                        if (i + 56 <= byCol * byRow) {
                            if (!await this.CMD_SetKeyTable(0x03, i, byGameLightKey.slice( i,i+56)))
                                nRet = false;
                        } else {
                            if (!await his.CMD_SetKeyTable(0x03, i, byGameLightKey.slice(  i,byCol * byRow)))
                                nRet = false;
                        }
                        if (!nRet)
                            break;
                    }
                }

                if (nRet && typeof jsonData["DeviceLE"] == 'object') {
                    if (Array.isArray(jsonData["DeviceLE"]["LESet"])) {

                         /*
                        for (let i = 0; i < jsonData["DeviceLE"]["LESet"].length; i++) {
                            console.log(`key ${i}`, jsonData["DeviceLE"]["LESet"][i])
                        }*/
                        let dwColor = 0;
                        let byLEModel = 240;
                        let byLESubModel = 1;
                        let byLEDir = 0;
                        let byLESpeed = 3;
                        let byLELight = 18;
                        byLEEnable = 15;

                        byLecofig[0] = byLEModel;
                        byLecofig[1] = byLESubModel;
                        byLecofig[2] = byLELight;
                        byLecofig[3] = byLESpeed;
                        byLecofig[4] = byLEDir;
                        byLecofig[5] = Math.ceil(((dwColor >> 16) & 0xFF) / 2);
                        byLecofig[6] = Math.ceil(((dwColor >> 8) & 0xFF) / 2);
                        byLecofig[7] = Math.ceil((dwColor & 0xFF) / 2);

                        if (!await this.CMD_SetLEConfig(byLEModel, byLESubModel, byLELight, byLESpeed,
                            byLEDir, Math.ceil(((dwColor >> 16) & 0xFF) / 2), Math.ceil(((dwColor >> 8) & 0xFF) / 2), Math.ceil((dwColor & 0xFF) / 2), byLEEnable))
                            nRet = false;
                    }
                }
            }
            return nRet;
        });
    }

    CMD_SetKeyTable(type,addr,data){
        //return Promise.resolve(true);
        return this.request(CMD.SetKeyTable(type,addr,data));
        
    }

    CMD_SetLEConfig(byLEModel, byLESubModel, byLELight, byLESpeed, byLEDir, byR, byG, byB, bEnable) {
        console.log('write driver light', { byLEModel, byLESubModel, byLELight, byLESpeed, byLEDir, byR, byG, byB, bEnable });
        return this.request(CMD.setLEConfig(byLEModel, byLESubModel, byLELight, byLESpeed, byLEDir, byR, byG, byB, bEnable))
    }

    Display(pszDisplay) {
        return Promise.resolve().then(async () => {
            if (this.m_byModel != 5) return 0;
            let nRet = 1;
            const jsonData = pszDisplay;
            if (jsonData) {
                const byLEData = Buffer.alloc(DefaultMatrix * 4, 0x00);

                if (typeof jsonData["Data"] == 'object') {
                    const mem = Object.keys(jsonData["Data"]);
                    for (let key of mem) {
                        let nKey = parseInt(key, 10);
                        if (nKey >= DefaultMatrix)
                            continue;
                        let nKeyValue = parseInt(jsonData["Data"][key], 16);
                        byLEData[nKey * 4 + 2] = (nKeyValue >> 0) & 0xFF;
                        byLEData[nKey * 4 + 1] = (nKeyValue >> 8) & 0xFF;
                        byLEData[nKey * 4] = (nKeyValue >> 16) & 0xFF;
                        byLEData[nKey * 4 + 3] = 100;
                    }
                }

                if (typeof jsonData["default"] == 'string') {
                    for (let i = 0; i < DefaultMatrix; i++) {
                        if (byLEData[i * 4 + 3] == 0) {
                            if (typeof jsonData["default"] == 'string') {
                                let nKeyValue = parseInt(jsonData["default"], 16);
                                byLEData[i * 4 + 2] = (nKeyValue >> 0) & 0xFF;
                                byLEData[i * 4 + 1] = (nKeyValue >> 8) & 0xFF;
                                byLEData[i * 4] = (nKeyValue >> 16) & 0xFF;
                                byLEData[i * 4 + 3] = 100;
                            }
                        }
                    }
                }
                let t = 0;
                for (let n = 0; n < DefaultMatrix * 4; n += 56) {
                    if (n + 56 <= DefaultMatrix * 4) {
                      // const t = new Date().getTime();
                        try{
                        if (this.m_byModel != 5||! await this.request(CMD.SetLEDefine(n, byLEData.slice(n, 56 + n)))){
                            nRet = 0;
                        }
                        }catch(e){
                            nRet = 0;
                        }
                       // console.log('write packet time',new Date().getTime()-t);
                        

                    } else {
                        try{
                        if (this.m_byModel != 5 || ! await this.request(CMD.SetLEDefine(n, byLEData.slice(n, DefaultMatrix * 4)))){
                            nRet = 0;
                        }
                       }catch(e){
                           nRet = 0;
                       }
                    }
                    
                    if (nRet == 0)
                        break;
                }
                try{
                if ( this.m_byModel != 5 || !await this.request(CMD.SaveLEDefine))
                    nRet = 0;
                }catch(e){
                    nRet = 0;
                }
            }
            this.busy = false;
            return nRet;
        });
    }

    static probe(deviceInfo) {
        loadDrivers();
        return drivers.find(driver => _.isEqual('vendorId,productId'.split(',').map(k => deviceInfo[k]), driver.meta.slice(0, 2)))
    }

    static StartModelLE( nModelID, jsonProfile)
    {
        return Promise.resolve()
        .then(async()=>{
        const   strLightGuid = jsonProfile["ModeLE"]["GUID"];
        if(!strLightGuid)
        {
           const LEData = {
               Frames:[
                   {
                       Data:jsonProfile["ModeLE"]["LEData"]
                   }
               ]
           };
           g_pcmCMLEManager.CMS_DisplayLE(nModelID,JSON.stringify(LEData),true);
            return;
        }
       const {body:strLEData} = await CMF.decodeFile(path.join(config.userdata_dir, `Account/0/LE/${strLightGuid}.le`));
       
        if(Array.isArray(_.get(jsonProfile,["ModeLE","Params","LEConfigs"])))
        {
            
            const   tempJsonData  = JSON.parse(strLEData);
       
           const  logicparam = jsonProfile["ModeLE"]["Params"]["LEConfigs"];
            if(tempJsonData["LEConfigs"].length==logicparam.length)
            {
                for(let i = 0;i<tempJsonData["LEConfigs"].length;i++)
                {
                    tempJsonData["LEConfigs"][i]["Color"] = logicparam[i]["Color"];
                }
            }
            g_pcmCMLEManager.CMS_DisplayLE(nModelID,JSON.stringify( tempJsonData), true);
        }
        else
            g_pcmCMLEManager.CMS_DisplayLE(nModelID, strLEData, true);
        });
    }

    static stopModelLE(nModelID){
        g_pcmCMLEManager.CMS_CloseModeLE(nModelID);
    }
    static stopKeyMacro(modelId){
        scriptEngineManager.close(modelId);
    }

}

module.exports = Driver;

/**
 * testing
 */
if (!module.parent) {
    const Device = require('./device');
    const Profile = require('./profile');
    const CMF = require('./cmfcodec');
    Device.listDevices().then(async devices => {
        // const device = devices[0];
        // const { body: profileContent } = await CMF.readProfile(0, '656801853', '7C8D0A4E-6F9F-4332-BE12-6DB97025658B');
        console.log({ info: devices[0] });
    });
}
