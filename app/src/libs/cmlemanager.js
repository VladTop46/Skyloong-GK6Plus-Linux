const fs = require('fs-extra');
const { functions } = require('lodash');
const path = require('path');
const config = require('../config');
const CMLEPlayer = require('./cmleplayer');

const hashModelLEMap = new Map();
const hashKeyLEMap = new Map();
const g_LEHotkeyMap = new Map();
const g_KeyCount = new Map();
const g_LEGameEventMap = new Map();
const g_modelInfo = new Map();


let  Device = null;
function DisplayModelLE( nModelID,  pszLEFrame)
{
   
    if(Device==null) Device = require('./device');
    const device =  Device.getDevice(nModelID);
   if(device) return device.Display(pszLEFrame);
   return Promise.resolve(false);
   //console.log('getdevice',Object.keys(Device).join());
}
function OnKeyLEPlayOver(nModelID)
{
    console.log('on key over',nModelID);
    if (hashModelLEMap.has(nModelID)) {
        console.log('resume');
        setTimeout(()=>{
            hashModelLEMap.get(nModelID).ResumeLE();
        },100);
        
    }
    hashKeyLEMap.delete(nModelID);

}

function funcAddHotKey( dwHotKey)
{
	g_pcmhkCMHotKey.CMHK_AddHotKey(dwHotKey, OnLEHotKeyProcess);
}

function funcDelHotKey( dwHotKey)
{
	g_pcmhkCMHotKey.CMHK_DelHotKey(dwHotKey, OnLEHotKeyProcess);
}

class CCMLEManager {
    constructor(){
        const {resource_dir} = config;
        fs.readFile(path.join(resource_dir,'device/modellist.json'),'utf8')
        .then(pszModelInfo=>{
            CMLEPlayer.InitPlayer(pszModelInfo, DisplayModelLE);
        });
    }
    CloseModeLE(nModelID) {
        if (hashKeyLEMap.has(nModelID)){
            hashKeyLEMap.get(nModelID).Stop();
            hashKeyLEMap.delete(nModelID);
        }
        if (hashModelLEMap.has(nModelID)){
            hashModelLEMap.get(nModelID).Stop();
            hashModelLEMap.delete(nModelID);
        }
        return 0;
    }

    CMS_DisplayLE(nModelID, pszLightData, bModeLE) {
        let bSyncCtrl = false;
        /*
        for (it = hashModelLEMap.begin(); it != hashModelLEMap.end(); it++)
        {
            if(it->second->IsSyncCtrl(nModelID))
            {
                bSyncCtrl = TRUE;
                break;
            }
        }*/
        for (let player of hashKeyLEMap.values()) {
            if (player.IsSyncCtrl(nModelID)) {
                bSyncCtrl = true;
                break;
            }
        }

        if (!bSyncCtrl && pszLightData ) {
            /*
            Json::Reader jsonReader;
            Json::Value jsonData;
            jsonReader.parse(pszLightData, jsonData);*/
            const jsonData = JSON.parse(pszLightData);
            if (Array.isArray(jsonData["Canvases"])) {
                for (let i = 0; i < jsonData["Canvases"].length; i++) {
                    if (Array.isArray(jsonData["Canvases"][i]["DeviceTypes"])) {
                        for (let j = 0; j < jsonData["Canvases"][i]["DeviceTypes"].length; j++) {
                            const strLETypeID = jsonData["Canvases"][i]["DeviceTypes"][j];

                            for (let [key, value] of g_modelInfo.entries()) {
                                if (value == strLETypeID) {
                                    if (key != nModelID) this.CloseModeLE(key);
                                }
                            }

                        }
                    }
                }
            }

            if (g_LEHotkeyMap.has(nModelID)) {
                const vHotKetList = g_LEHotkeyMap.get(nModelID);
                for (let i = 0; i < vHotKetList.length; i++) {
                    if (g_KeyCount.has(vHotKetList[i])) {

                        g_KeyCount.set(vHotKetList[i], g_KeyCount.get(vHotKetList[i]) - 1);
                        if (g_KeyCount.get(vHotKetList[i]) == 0) {
                            funcDelHotKey(vHotKetList[i]);
                            g_KeyCount.delete(vHotKetList[i]);
                        }
                    }
                }
                /*
                std::map<UINT,vector<DWORD>>::iterator it;
                it=g_LEHotkeyMap.find(nModelID);
                g_LEHotkeyMap.erase(it);
                */
                g_LEHotkeyMap.delete(nModelID);
            }

            if (Array.isArray(jsonData["Canvases"])) {
                for (let i = 0; i < jsonData["Canvases"].length; i++) {
                    if (typeof jsonData["Canvases"][i]["HotKey"] == 'object' && typeof jsonData["Canvases"][i]["HotKey"]["Value"] == 'string' && jsonData["Canvases"][i]["HotKey"]["Value"]) {
                        const dwHotKey = parseInt(jsonData["Canvases"][i]["HotKey"]["Value"], 16);
                        g_LEHotkeyMap.get(nModelID).push(dwHotKey);
                        if (!g_KeyCount.has(dwHotKey)) {
                            funcAddHotKey(dwHotKey);
                        }

                        g_KeyCount.set(dwHotKey, g_KeyCount.get(dwHotKey) + 1);

                    }
                }
            }

            if (g_LEGameEventMap.has(nModelID)) {
                /*
                std::map<UINT,vector<std::string>>::iterator it;
                it = g_LEGameEventMap.find(nModelID);
                g_LEGameEventMap.erase(it);*/
                g_LEGameEventMap.delete(nModelID);
            }

            if (Array.isArray(jsonData["Canvases"])) {
                for (let i = 0; i < jsonData["Canvases"].length; i++) {
                    if (typeof jsonData["Canvases"][i]["GameEvent"] == 'object') {
                        const strGameGUID = jsonData["Canvases"][i]["GameEvent"]["GameGUID"];
                        if (!strGameGUID) {
                            let i = 0;
                            const vLEGameEvent = g_LEGameEventMap.get(nModelID);
                            for (i = 0; i < vLEGameEvent.length; i++) {
                                if (vLEGameEvent[i] == strGameGUID)
                                    break;
                            }
                            if (i == vLEGameEvent.length)
                                g_LEGameEventMap.get(nModelID).push(strGameGUID);
                        }
                    }
                }
            }

            if (bModeLE) {
                console.log('play mode le',nModelID);
                if (!hashModelLEMap.has(nModelID)) {
                    const ptr_modelLEPlayer = new CMLEPlayer(nModelID);
                    ptr_modelLEPlayer.PlayLE(pszLightData, bModeLE);
                    hashModelLEMap.set(nModelID, ptr_modelLEPlayer);
                }
                else {

                    hashModelLEMap.get(nModelID).CloseLE();
                    hashModelLEMap.get(nModelID).PlayLE(pszLightData, bModeLE);
                }
            }
            else {
                console.log('play key le',nModelID);
                if (hashModelLEMap.has(nModelID)) {
                    console.log('stop model le');
                    hashModelLEMap.get(nModelID).StopLE();
                }
                setTimeout(()=>{
                    if (!hashKeyLEMap.has(nModelID)) {

                        const ptr_keyLEPlayer = new CMLEPlayer(nModelID);
                        ptr_keyLEPlayer.SetPlayCallback(OnKeyLEPlayOver);
                        ptr_keyLEPlayer.PlayLE(pszLightData, bModeLE);
                        hashKeyLEMap.set(nModelID, ptr_keyLEPlayer);
                    }
                    else {
                        hashKeyLEMap.get(nModelID).CloseLE();
                        hashKeyLEMap.get(nModelID).SetPlayCallback(OnKeyLEPlayOver);
                        hashKeyLEMap.get(nModelID).PlayLE(pszLightData, bModeLE);
                    }
                },100);
               
            }
        }
        return 0;
    }

    CMS_CloseModeLE(nModelID) {

        this.CloseModeLE(nModelID);

        return 0;
    }


    stopLE(modelId){
        if(!hashKeyLEMap.get(modelId)) return;
        hashKeyLEMap.get(modelId).StopLE();
    }

    resumeLE(modelId){
        if(!hashKeyLEMap.get(modelId)) return;
        hashKeyLEMap.get(modelId).ResumeLE();
    }

    CMS_OnHotKeyPress(dwHotKey) {

        const dwHotKeyValue = dwHotKey & 0x0000FFFF;


        for (let [key, hotKeyList] of g_LEHotkeyMap) {
            for (let i = 0; i < hotKeyList.length; i++) {
                if (hotKeyList[i] == dwHotKeyValue) {
                    if (hashModelLEMap.has(key)) {
                        hashKeyLEMap.get(key).ProcessHotKeyPress(dwHotKey)
                    }
                }
            }
        }

        return 1;
    }

    CMS_GameList(pszGameList) {
        this.m_jsonGameList = JSON.parse(pszGameList);
        return 1;
    }

    CMS_GameEvent(pszGameEvent) {
        const jsonGameEvent = JSON.parse(pszGameEvent);
        if (typeof jsonGameEvent["GUID"] == 'string') {
            const strGameGUID = jsonGameEvent["GUID"];
            let jsonGameMetadata;
            const nGameCount = this.m_jsonGameList.length
            for (let i = 0; i < nGameCount; i++) {
                if (this.m_jsonGameList[i]["GUID"] == strGameGUID) {
                    jsonGameMetadata = this.m_jsonGameList[i]["Metadata"];
                    break;
                }
            }
            if (Array.isArray(jsonGameMetadata)) {
                const jmKeys = Object.keys(jsonGameEvent["Data"]);
                for (let key of jmKeys) {
                    const strEventName = jmKeys[key];
                    let jsonGameEventMetadata;
                    const nGameEventCount = jsonGameMetadata.length;
                    for (let i = 0; i < nGameEventCount; i++) {
                        if (jsonGameMetadata[i]["Name"] == strEventName) {
                            jsonGameEventMetadata = jsonGameMetadata[i];
                            break;
                        }
                    }
                    if (typeof jsonGameEventMetadata == 'object') {
                        if (jsonGameEventMetadata["Type"] * 1 != 1) {
                            let jsonGameState;
                            if (typeof m_jsonGameState[strGameGUID] == 'object')
                                jsonGameState = m_jsonGameState[strGameGUID];
                            jsonGameState[strEventName] = jsonGameEvent["Data"][strEventName];
                            m_jsonGameState[strGameGUID] = jsonGameState;
                        }

                        for (let [key, vLEGameEvent] of g_LEGameEventMap) {
                            for (let i = 0; i < vLEGameEvent.length; i++) {
                                if (vLEGameEvent[i] == strGameGUID) {
                                    if (hashModelLEMap.has(key)) {
                                        const jsonEventData = JSON.parse(JSON.stringify(jsonGameEventMetadata));
                                        jsonEventData["GameGUID"] = strGameGUID;
                                        jsonEventData["Value"] = jsonGameEvent["Data"][strEventName];
                                        hashModelLEMap.get(key).ProcessGameEvent(jsonEventData);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return 1;
    }
}
module.exports = new CCMLEManager();