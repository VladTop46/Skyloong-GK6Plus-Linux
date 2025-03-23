const CMF = require('./cmfcodec');
const Macro = require('./macro');
const { getKeyCode,getKeyName} = require('./keymap');
const { crc16_ccitt } = require('./utils')
const _ = require('lodash');
const path = require('path');
const config = require('../config');
const Device = require('./device');
const Driver = require('./driver');
const CMD = require('./cmd');
const { resolve } = require('path');

const SLEEP_TO_WRITE = (time=10)=> new Promise(resolve=>setTimeout(resolve,time))

const getTimeoutFromDevice = (device)=>{
   const {probeInfo} = device;
   //console.log({probeInfo});
   //console.log('#fwid#', Number(probeInfo.FWID).toString(16));
   const fwid = Number(probeInfo.FWID).toString(16);
   if (fwid.startsWith('83') || fwid.startsWith('84')) {
     return 1;
   }
    return 10;
}
/**
 * 
 * @param {*} vlogData 
 * 
 *  BYTE byType;
    BYTE byLenght;
    BYTE byBitmap[22];
    BYTE byColor[4];
    WORD byData0;
    WORD byData1;
 */
function getVlogDataBuffer(vlogData) {
    const buffer = Buffer.alloc(32);
    buffer.writeUInt8(vlogData.byType, 0);
    buffer.writeUInt8(vlogData.byLenght, 1);
    vlogData.byBitmap.copy(buffer, 2, 0, 22);
    buffer.writeUInt8(vlogData.byColor[0], 24);
    buffer.writeUInt8(vlogData.byColor[1], 25);
    buffer.writeUInt8(vlogData.byColor[2], 26);
    buffer.writeUInt8(vlogData.byColor[3], 27);
    buffer.writeUInt16LE(vlogData.byData0 || 0, 28);
    buffer.writeUInt16LE(vlogData.byData1 || 0, 30);
    return buffer;
}
/**
 * 
 * @param {*} header 
 * typedef struct
{
    unsigned int nFrameAddress;
    unsigned int nFrameCount;
    unsigned int nLogicAddress;
    unsigned int nLogicCount;
}TLightHead,*PLightHead;
 */
function getLeHeaderBuffer(header) {
    const buffer = Buffer.alloc(16);
    buffer.writeUInt32LE(header.nFrameAddress, 0);
    buffer.writeUInt32LE(header.nFrameCount, 4);
    buffer.writeUInt32LE(header.nLogicAddress, 8);
    buffer.writeUInt32LE(header.nLogicCount, 12);
    return buffer;
}
function getMacroData(profileData) {
    const guidList = [];
    const macroFrames = [];
    const indexData = Buffer.alloc(16 * 8 * 2, 0xff);
  
    (profileData.KeySet || []).forEach(keySet => {
        if (!keySet.Task || keySet.Task.Type != 'Macro') return;
        const Guid = keySet.Task.Data.GUID;
        // if(guidList.indexOf(Guid)!=-1) return;
        const { Task: { Data: { Repeats, StopMode } }, Index } = keySet;
        const checkIndex = guidList.indexOf(Guid);
        if (checkIndex != -1) {
            indexData.writeUInt8(checkIndex, Index);
            return;
        }
        guidList.push(Guid);

        indexData.writeUInt8(guidList.length - 1, Index);
        macroFrames.push(convertMacroData(guidList.length - 1,StopMode, Repeats, Guid));
    });

    (profileData.FnKeySet || []).forEach(keySet => {
        if (!keySet.Task || keySet.Task.Type != 'Macro') return;
        const Guid = keySet.Task.Data.GUID;
        // if(guidList.indexOf(Guid)!=-1) return;
        const { Task: { Data: { Repeats, StopMode } }, Index } = keySet;
        const checkIndex = guidList.indexOf(Guid);
        if (checkIndex != -1) {
            indexData.writeUInt8(checkIndex, Index);
            return;
        }
        guidList.push(Guid);
        indexData.writeUInt8(guidList.length - 1, Index);
        macroFrames.push(convertMacroData(guidList.length - 1, StopMode,Repeats , Guid));
    });

    return Promise.all(macroFrames).then(frames => {

        // Buffer.concat()
        const macroData = frames.length == 1 ? frames[0] : Buffer.concat(frames, frames.length * 512);
        return {
            macroData,
            count: frames.length,
            index: indexData
        }
    });
}


function getLightData(profileData) {
    const guidList = [];
    let jsonLightData;
    let indexData = Buffer.alloc(16 * 8, 0xff);
    if (profileData.ModeLE && typeof profileData.ModeLE.GUID == 'string' && Array.isArray(profileData.KeySet)) {
        if (profileData.ModeLE.GUID) {
            guidList.push({
                GUID: profileData.ModeLE.GUID,
                LEConfigs: _.get(profileData, ['ModeLE', 'Params', 'LEConfigs'])
            });
        } else {
            guidList.push({
                GUID: 'invailed'
            });
            jsonLightData = profileData.ModeLE.LEData;
        }
        profileData.KeySet.forEach(keySet => {
            const temp = {};
            if (keySet.KeyLE && keySet.KeyLE.GUID) {
                temp.GUID = keySet.KeyLE.GUID;
                temp.LEConfigs = _.get(keySet, ['KeyLE', 'Params', 'LEConfig']);
                const checkIndex = guidList.findIndex(obj => _.isEqual(obj, temp));
                if (checkIndex != -1) {
                    indexData.writeUInt8(checkIndex, keySet.Index * 1);
                    return;
                }
                guidList.push(temp);
                indexData.writeUInt8(guidList.length - 1, keySet.Index * 1);

            }
        });
    } else if (Array.isArray(profileData.DriverLE)) {
        profileData.DriverLE.forEach(({ GUID, LEConfigs }) => {
            if (GUID) {
                const temp = {
                    GUID,
                    LEConfigs
                };
                const checkIndex = guidList.findIndex(obj => _.isEqual(obj, temp));
                if (checkIndex != -1) return;
                guidList.push(temp);
            }
        });
    }
    return covertLightData(guidList, jsonLightData).then(lightData => ({ lightData, indexData }));
}

function covertLightData(guidList, jsonLightData) {
    return Promise.resolve().then(async () => {
        const headers = [];
        const lightDatas = [];
        let nFrameAddress = 512;
        for (let i = 0; i < guidList.length; i++) {
            const temp = {};
            const curGuid = guidList[i].GUID;
            const curLEConfigs = guidList[i].LEConfigs;
            let tempJsonData = {};

            if (curGuid != 'invailed') {
                const { body: strProfileData } = await CMF.decodeFile(path.join(config.userdata_dir, `Account/0/LE/${curGuid}.le`));

                try {
                    tempJsonData = JSON.parse(strProfileData);
                } catch (e) {
                    continue;
                }

                if (curLEConfigs && tempJsonData["LEConfigs"].length == curLEConfigs.length) {
                    for (let j = 0; j < tempJsonData["LEConfigs"].length; j++) {
                        tempJsonData["LEConfigs"][j]["Color"] = curLEConfigs[j]["Color"];
                    }
                }
            } else {
                tempJsonData["Data"] = jsonLightData;
                const tHeadData = {}
                tHeadData.nLogicAddress = 0;
                tHeadData.nLogicCount = 0;
                tHeadData.nFrameCount = 1;
                tHeadData.nFrameAddress = nFrameAddress;
                const ptrFrameData = Buffer.alloc(176 * 4 + 4, 0);
                ptrFrameData.writeUInt16LE(0, i * 26 + 0);
                const nLen = 176 * 4;
                ptrFrameData[i * 26 + 2] = (nLen >> 0) & 0xFF;
                ptrFrameData[i * 26 + 3] = (nLen >> 8) & 0xFF;
                for (let it in tempJsonData["Data"]) {
                    const nKey = parseInt(it, 10);
                   
                    if (nKey >= 176)
                        continue;
                    const nKeyValue = parseInt(tempJsonData["Data"][nKey], 16);
                    ptrFrameData[4 + nKey * 4] = (nKeyValue >> 16) & 0xFF;
                    ptrFrameData[4 + nKey * 4 + 1] = (nKeyValue >> 8) & 0xFF;
                    ptrFrameData[4 + nKey * 4 + 2] = (nKeyValue >> 0) & 0xFF;
                    ptrFrameData[4 + nKey * 4 + 3] = 100;
                }
                headers.push(tHeadData);
                const nDataLength = 176 * 4 + 4;
                const ptrCurData = Buffer.alloc(nDataLength, 0);
                ptrFrameData.copy(ptrCurData, 0, 0, nDataLength);
                lightDatas.push(ptrCurData);
                nFrameAddress += nDataLength;
                continue;
            }




            const tHeadData = {}
            tHeadData.nFrameAddress = nFrameAddress;
            const jsonData = JSON.parse(JSON.stringify(tempJsonData));
            jsonData["Frames"] = [];
            for (let i = 0; i < tempJsonData["Frames"].length; i++) {
                let nCountFrames = 1;
                if (Number.isInteger(tempJsonData["Frames"][i]["Count"]))
                    nCountFrames = tempJsonData["Frames"][i]["Count"];
                for (let j = 0; j < nCountFrames; j++)
                    jsonData["Frames"].push(tempJsonData["Frames"][i]);
            }
            tHeadData.nFrameCount = jsonData["Frames"].length;
            const ptrFrameData = Buffer.alloc(tHeadData.nFrameCount * 26, 0);

            for (let i = 0; i < jsonData["Frames"].length; i++) {
                ptrFrameData[i * 26 + 0] = 3;
                ptrFrameData[i * 26 + 2] = 22;

                for (it in jsonData["Frames"][i]["Data"]) {
                    const nKey = parseInt(it, 10);
                    if (nKey >= 176)
                        continue;
                    ptrFrameData[i * 26 + 4 + Math.floor(nKey / 8)] |= (1 << (nKey % 8));
                }
            }
            tHeadData.nLogicAddress = nFrameAddress + 26 * jsonData["Frames"].length;
            tHeadData.nLogicCount = jsonData["LEConfigs"].length;

            let vLogicData = [];
            for (let i = 0; i < jsonData["LEConfigs"].length; i++) {
                const tLogicData = {
                    byColor: new Array(4)
                };
                tLogicData.byLenght = 32;
                const byBitmap = Buffer.alloc(22, 0);
                for (let j = 0; j < jsonData["LEConfigs"][i]["Keys"].length; j++) {
                    const nLogicIndex = jsonData["LEConfigs"][i]["Keys"][j] * 1;
                    byBitmap[Math.floor(nLogicIndex / 8)] |= (1 << (nLogicIndex % 8));
                }
                //	memcpy(tLogicData.byBitmap, byBitmap, 22);
                tLogicData.byBitmap = byBitmap;
                const nKeyValue = parseInt(jsonData["LEConfigs"][i]["Color"], 16);
                tLogicData.byColor[2] = (nKeyValue >> 0) & 0xFF;
                tLogicData.byColor[1] = (nKeyValue >> 8) & 0xFF;
                tLogicData.byColor[0] = (nKeyValue >> 16) & 0xFF;
                tLogicData.byColor[3] = 0;

                if (jsonData["LEConfigs"][i]["Type"] * 1 == 0) {
                    tLogicData.byType = 0;
                }
                else if (jsonData["LEConfigs"][i]["Type"] * 1 == 1) {
                    tLogicData.byType = 1;
                    tLogicData.byData0 = Math.floor(360 / (jsonData["LEConfigs"][i]["Count"] * 1))
                }
                else if (jsonData["LEConfigs"][i]["Type"] * 1 == 2) {
                    tLogicData.byType = 2;
                    tLogicData.byData1 = jsonData["LEConfigs"][i]["StayCount"] * 1;
                    tLogicData.byData0 = Math.floor(100 / (jsonData["LEConfigs"][i]["Count"] * 1));
                }
                vLogicData.push(tLogicData);
            }
            nFrameAddress = tHeadData.nLogicAddress + 32 * jsonData["LEConfigs"].length;
            headers.push(tHeadData);

            const nDataLength = tHeadData.nFrameCount * 26 + vLogicData.length * 32;
            const ptrCurData = Buffer.alloc(nDataLength, 0);
            ptrFrameData.copy(ptrCurData, 0, 0, tHeadData.nFrameCount * 26);
            for (let i = 0; i < vLogicData.length; i++) {
                //memcpy(ptrCurData + tHeadData.nFrameCount * 26 + i * 32, &(vLogicData[i]), 32);
                getVlogDataBuffer(vLogicData[i]).copy(ptrCurData, tHeadData.nFrameCount * 26 + i * 32, 0, 32)
            }
            vLogicData = [];

            lightDatas.push(ptrCurData);
        }
        let lightData = null;
        let nDataLength
        if (headers.length == 0) {
            return lightData;
        }
        else {
            let nTotalSize = 128 * 1024 - 512;
            let nLightCount = 0;
            for (let i = 0; i < lightDatas.length; i++) {
                if (nTotalSize - lightDatas[i].length < 0) {
                    return lightData;
                }
                else {
                    nTotalSize -= lightDatas[i].length;
                    nLightCount++;
                }
            }

            if (nLightCount == 0) {
                nDataLength = 0;
            }
            else {
                lightData = Buffer.alloc(128 * 1024 - nTotalSize, 0xff);
                nDataLength = 128 * 1024 - nTotalSize;
                let nAddress = 512;
                for (let i = 0; i < nLightCount; i++) {
                    //memcpy(lightData+nAddress, vLightData[i].first, vLightData[i].second);
                    lightDatas[i].copy(lightData, nAddress, 0, lightDatas[i].length);
                    nAddress += lightDatas[i].length;
                }
                for (let i = 0; i < headers.length; i++) {
                    getLeHeaderBuffer(headers[i]).copy(lightData, i * 16, 0, 16);
                }
            }
            return lightData;
        }
    });




}

function convertMacroData(index, breakType, byLoopTimes, guid) {
    return Macro.readMacro(0, guid).then(({ body }) => {
        const macroData = Macro.stringToJson(body);
        macroData.TaskList.push({taskName:'Delay',taskValue:'5'});

        console.log('### task list###', JSON.stringify(macroData.TaskList));
        const macroQueue = macroData.TaskList.map(({ taskName, taskValue }) => {
            const item = {};
            if (taskValue == '') {
                item.byType = 0x02;
                if (/Down/.test(taskName)) {
                    item.byStatus = 0x01;
                } else if (/Up/.test(taskName)) {
                    item.byStatus = 0x02;
                }
                if (/Left/.test(taskName)) {
                    item.byData0 = 0x01;
                } else if (/Right/.test(taskName)) {
                    item.byData0 = 0x02;
                }

            } else {
                if (taskName == 'Delay') {
                    item.byType = 0x03;
                    const delaytime = parseInt(taskValue, 10);
                    item.byData1 = Math.floor(delaytime / 256);
                    item.byData0 = delaytime % 256;
                } else {
                    item.byType = 0x01;
                    if (taskName == 'KeyDown') {
                        item.byStatus = 0x01;
                    }
                    else if (taskName == 'KeyUp') {
                        item.byStatus = 0x02;
                    }
                    if (taskValue == '"Left Shift"') {
                        item.byData1 = 0x02;
                    }
                    else if (taskValue == '"Right Shift"') {
                        item.byData1 = 0x20;
                    }
                    else if (taskValue == '"Left Ctrl"') {
                        item.byData1 = 0x01;
                    }
                    else if (taskValue == '"Right Ctrl"') {
                        item.byData1 = 0x10;
                    }
                    else if (taskValue == '"Left Alt"') {
                        item.byData1 = 0x04;
                    }
                    else if (taskValue == '"Right Alt"') {
                        item.byData1 = 0x40;
                    }
                    else if (taskValue == '"Left Win"') {
                        item.byData1 = 0x08;
                    }
                    else if (taskValue == '"Right Win"') {
                        item.byData1 = 0x80;
                    }
                    else {

                        item.byData0 = getKeyCode(taskValue);
                    }
                }
            }
            return item;
        });
        return macroQueue
    }).then(macroQueue => {
        console.log({macroQueue});
        const frameData = Buffer.alloc(512, 0);
        /**
         * typedef struct  {
                WORD wdTAG;
                WORD wdCheckSum;
                BYTE byLength;
                BYTE byIndex;
                BYTE byBreakType;
                BYTE byLoopTimes;
        }TMacroHead,*PMacroHead;
        */
        macroQueue.forEach((item, index) => {
            ['byData0', 'byData1', 'byStatus', 'byType'].forEach((field, i) => {
                if (item[field]) {
                    frameData.writeUInt8(item[field], 8 + 4 * index + i);
                }
            });
        });
        frameData.writeUInt16LE(0x55AA, 0);
        frameData.writeUInt16LE(crc16_ccitt(frameData.slice(8,8+macroQueue.length*4)), 2);
        frameData.writeUInt8(macroQueue.length, 4);
        frameData.writeUInt8(index, 5);
        frameData.writeUInt8(breakType, 6);
        frameData.writeUInt8(byLoopTimes, 7);
        return frameData;
    });


}

function writeDeviceConfig(device, jsonData) {
    console.log('ready to  write profile######');
    return Promise.resolve()
        .then(async () => {
           // device.open();
           try{
            const { key_col:byCol, key_row:byRow } = await device.request(CMD.MATRIX);
            const { macroData: pMacroData, count: nMacroCount, index: pMacroIndex } = await getMacroData(jsonData);
            const { indexData: pKeyIndex, lightData: pLightData } = await getLightData(jsonData);
             
            const byKeyDefine = Buffer.alloc(byCol * byRow * 4, 0xFF);
            const byFnKeyDefine = Buffer.alloc(byCol * byRow * 4, 0xFF);
            const byModel = jsonData.ModeIndex * 1;
            if (Array.isArray(jsonData.KeySet)) {
                let nKeyCount = jsonData.KeySet.length;
                if (nKeyCount > 128) nKeyCount = 128;
                for (let i = 0; i < nKeyCount; i++) {
                    const nIndex = jsonData["KeySet"][i]["Index"] * 1;
                    const nKeyValue = parseInt(jsonData.KeySet[i].DriverValue, 16);
                    //console.log('#### nKeyValue ###',nKeyValue);
                    if (nKeyValue == 0x0A010001) {
                      //  console.log('### maro index ###', nIndex,pMacroIndex[nIndex]);
                        byKeyDefine[nIndex * 4] = pMacroIndex[nIndex];
                    } else {
                        byKeyDefine[nIndex * 4] = (nKeyValue >> 0) & 0xFF;
                    }
                    byKeyDefine[nIndex * 4 + 1] = (nKeyValue >> 8) & 0xFF;
                    byKeyDefine[nIndex * 4 + 2] = (nKeyValue >> 16) & 0xFF;
                    byKeyDefine[nIndex * 4 + 3] = (nKeyValue >> 24) & 0xFF;
                }
                await device.request(CMD.CleanData(byModel, 0x01));
                //console.log('### write byKeyDefine',byKeyDefine.length);
                for (let i = 0; i < byKeyDefine.length; i += 56) {
                    if (i + 56 <= byKeyDefine.length) {
                      const {ack} =   await device.request(CMD.writeKeyData(byModel, i, byKeyDefine.slice(i, i + 56)));
                     // console.log('writeKeyData 1',ack);
                    } else {
                      const {ack} =  await device.request(CMD.writeKeyData(byModel, i, byKeyDefine.slice(i)));
                      //console.log('writeKeyData 2',ack);
                    }

                    await SLEEP_TO_WRITE(getTimeoutFromDevice(device));

                }
            }

            if (Array.isArray(jsonData.FnKeySet)) {
                let nKeyCount = jsonData.FnKeySet.length;
                if (nKeyCount > 128)
                    nKeyCount = 128;
                for (let i = 0; i < nKeyCount; i++) {
                    let nIndex = jsonData["FnKeySet"][i]["Index"] * 1;
                    let nKeyValue = parseInt(jsonData["FnKeySet"][i]["DriverValue"], 16);
                    if (nKeyValue == 0x0A010001)
                        byFnKeyDefine[nIndex * 4] = pMacroIndex[256 + nIndex];
                    else
                        byFnKeyDefine[nIndex * 4] = (nKeyValue >> 0) & 0xFF;
                    byFnKeyDefine[nIndex * 4 + 1] = (nKeyValue >> 8) & 0xFF;
                    byFnKeyDefine[nIndex * 4 + 2] = (nKeyValue >> 16) & 0xFF;
                    byFnKeyDefine[nIndex * 4 + 3] = (nKeyValue >> 24) & 0xFF;
                }
                await device.request(CMD.CleanData(byModel, 0x07));

                console.log('#byFnKeyDefine length',byFnKeyDefine.length)
               // console.log('### write fnKey defined',byFnKeyDefine);
                for (let i = 0; i < byFnKeyDefine.length; i += 56) {
                    if ((i + 56) <= byFnKeyDefine.length) {

                     const {ack} =  await device.request(CMD.writeFnData(byModel, i, byFnKeyDefine.subarray(i, i + 56)));
                        console.log('write FnKeyDefine data 1',ack);
                    } else {

                      const {ack} =  await device.request(CMD.writeFnData(byModel, i, byFnKeyDefine.subarray(i)));
                      console.log('write FnKeyDefine data 2',ack);
                    }

                    await SLEEP_TO_WRITE(getTimeoutFromDevice(device));

                }
            }
            if (typeof jsonData["LEData"] == 'object') {
                const byLEDataCfg = Buffer.alloc(176 * 4, 0);
                for (it in jsonData["LEData"]) {
                    let nKey = parseInt(it, 10);
                    if (nKey >= 176)
                        continue;
                    let nKeyValue = parseInt(jsonData["LEData"][nKey], 16);
                    byLEDataCfg[nKey * 4 + 2] = (nKeyValue >> 0) & 0xFF;
                    byLEDataCfg[nKey * 4 + 1] = (nKeyValue >> 8) & 0xFF;
                    byLEDataCfg[nKey * 4] = (nKeyValue >> 16) & 0xFF;
                    byLEDataCfg[nKey * 4 + 3] = 100;
                }
                await device.request(CMD.CleanData(byModel, 0x03));
                for (let n = 0; n < 176 * 4; n += 56) {
                    if (n + 56 <= 176 * 4) {
                     const {ack} =   await device.request(CMD.writeModeLE(byModel, n, byLEDataCfg.slice(n, n + 56)));
                    } else {
                      const {ack} =  await device.request(CMD.writeModeLE(byModel, n, byLEDataCfg.slice(n)));
                    }
                    await SLEEP_TO_WRITE(getTimeoutFromDevice(device));
                }
            }

            const wMacroLen = nMacroCount * 512;
            await device.request(CMD.CleanData(byModel, 0x04));
            
            if (pMacroData) {
                for (let i = 0; i < wMacroLen; i += 56) {
                    if (i + 56 <= wMacroLen) {
                     const {ack} = await device.request(CMD.writeMacro(byModel, i, pMacroData.slice(i, i + 56)));
                      //console.log('writeMacro 1',ack);
                    } else {
                     const {ack} =  await device.request(CMD.writeMacro(byModel, i, pMacroData.slice(i)));
                     //console.log('writeMacro 2',ack);
                    }
                   await SLEEP_TO_WRITE(getTimeoutFromDevice(device));
                }
            }
            


            await device.request(CMD.CleanData(byModel, 0x05));
            //console.log('writeLightKey data',pKeyIndex);
            if (pKeyIndex) {
                for (let i = 0; i < byCol * byRow; i += 56) {
                    if (i + 56 <= byCol * byRow) {
                      const {ack} = await device.request(CMD.writeLightKey(byModel, i, pKeyIndex.slice(i, i + 56)));
                    } else {
                      const {ack} =  await device.request(CMD.writeLightKey(byModel, i, pKeyIndex.slice(i)));
                    }

                }
                await SLEEP_TO_WRITE(getTimeoutFromDevice(device));
            }
            await device.request(CMD.CleanData(byModel, 0x06));
           // console.log('writeLightData',pLightData)
            if (pLightData) {
                for (let i = 0; i < pLightData.length; i += 56) {
                    if (i + 56 <= pLightData.length) {
                      const  lightData = pLightData.slice(i, i + 56);  
                       await device.request(CMD.writeLightData(byModel, i, lightData));
                    } else {
                      await device.request(CMD.writeLightData(byModel, i, pLightData.slice(i)));
                    }
                    await SLEEP_TO_WRITE(getTimeoutFromDevice(device));
                }
            }
            if (byModel != 1) {
                await device.request(CMD.CHANGE_MODE(byModel * 1));
            }
        }catch(e){
            console.log('write profile error',e);
        }
        });
}

function applyConfig(AccoutID, ModelID, GUID) {
    return Device.listDevices().then(devices=>{
      return devices.find(d=>d.probeInfo.ModelID*1 == ModelID*1);
    }).then(device=>{
        if(!device) return true;
        return CMF.readProfile(AccoutID, ModelID, GUID).then(async ({ body }) => {
            let  profileData = null;
              try{
               profileData = JSON.parse(body);
              }catch(e){
                  return true;
              }

              console.log('execute profile',profileData.ModeIndex);
              
              if(profileData.ModeIndex==0){
                  return ApplyProfile(AccoutID, ModelID, GUID)
              }
              Driver.stopModelLE(ModelID);
              Driver.stopKeyMacro(ModelID);
              return writeDeviceConfig(device,profileData);
          });
       /*
       if(device.applyTask) device.applyTask.cancel();
       return new Promise(async (resolve)=>{
          device.applyTask = {
              start:function(){
                this.tid = setTimeout(()=>{
                    this.execute();
                    this.tid = null;
                },500);
              },
              cancel:function(){
                  if(!this.tid) return;
                  console.log('### cancel pret ask#####');
                  clearTimeout(this.tid);
                  this.execute(true);
              },
              execute:async function(skip){
                  device.applyTask = null;
                  if(skip) return resolve(true);
                  const result = await CMF.readProfile(AccoutID, ModelID, GUID).then(async ({ body }) => {
                    let  profileData = null;
                      try{
                       profileData = JSON.parse(body);
                      }catch(e){
                          return true;
                      }

                      console.log('execute profile',profileData.ModeIndex);
                      
                      if(profileData.ModeIndex==0){
                          return ApplyProfile(AccoutID, ModelID, GUID)
                      }
                      Driver.stopModelLE(ModelID);
                      return writeDeviceConfig(device,profileData);
                  });
    
    
                  resolve(result);
              }
          }
          device.applyTask.start();
        });*/
    });

}

function ApplyProfile( AccoutID,  ModelID,  strProfileGUID)
{
    return CMF.readProfile(AccoutID, ModelID, strProfileGUID).then(async ({ body })=>{
        const  strProfile = body;
        const jsonProfile = JSON.parse(strProfile);
        //console.log({keysets : JSON.stringify(jsonProfile.KeySet)});
        try{
            await  Device.getDevice(ModelID).setOnlineMode();         
            await  Device.getDevice(ModelID).setOnLineProfile(jsonProfile);
            Driver.stopModelLE(ModelID);
            await Driver.StartModelLE(ModelID, jsonProfile);
        }catch(e){
            console.log('apply profile error',e);
        }        
    });
}


module.exports = {
    getMacroData,
    getLightData,
    applyConfig
}

/**
 * testing
 */
if (!module.parent) {
   // CMF.readProfile(0, '656801853', '7C8D0A4E-6F9F-4332-BE12-6DB97025658B').then(({ body }) => {
        //console.log({body});

      //  const profileData = JSON.parse(body);

        // console.log({ModeLEprofileData.ModeLE});
        /*
        getLightData(profileData).then(lightData=>{
            console.log(lightData);
        })*/
        /*
        profileData.KeySet.forEach(keySet=>{
            //console.log({keySet});
            if(keySet.Task){
                console.log('####Task#####',keySet.Task);
                convertMacroData(0,0,0,'B1E0AA01-AEE9-4a66-86BD-D48FDDD9D7FF');
            }
        });*/
        //console.log({keyKets:profileData.KeySet});

        //const profileData = JSON.parse(body);
        //  getMacroData(profileData);
        //console.log(profileData.ModeIndex);

   // });

   applyConfig( 0, '656801853', 'F87E0D34-E09C-4d7f-9C30-0085DB061408').then(()=>{
       console.log('completed');
   }).catch(err=>{
       console.log('apply config err',err);
   });
}