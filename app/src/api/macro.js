
const fs = require('fs-extra');
const path = require('path');
const Macro = require('../libs/macro');
const iohook = require('../libs/iohook');
const  {dialog} = require('electron');
const {decodeFile,encodeFile,Type} = require('../libs/cmfcodec');
const { result } = require('lodash');
let started = false;
module.exports = ({win,notify})=>{
    iohook.setNotify(notify,win);
    win.on("close",()=>{
        if(started){
            iohook.stop();
        }
    });
    return {
        ReadMacrofile({AccoutID,GUID}){
           return Macro.readMacro(AccoutID,GUID).then(({body})=>Macro.stringToJson(body));
        },
        WriteMacrofile({AccoutID,GUID,Data}){
            return Macro.writeMacro(AccoutID,GUID,Data);
        },
        StartRecord(){
            started=true;
            iohook.start();
        },
        StopRecord(){
            iohook.stop();
            started=false;
        },
        SetRecordBtn(){
    
        },
        ExportMacrofile({JsonMacrofile}){
            return dialog.showSaveDialog(win,{
                title:'导出宏文件',
                filters:[{name:'宏文件',extensions:['cms']}]
            }).then(({filePath})=>{
                if(filePath)  return encodeFile(filePath,{type:Type.TYPE_MACRO,name:'MACRO'},Macro.jsonToString(JSON.parse(JsonMacrofile))); 
                return {__error:true,code:1,message:'取消'};
            });
            
        },
        ImportMacrofile(){
            return  dialog.showOpenDialog(win,{
                title:'导入宏文件',
                filters:[{name:'宏文件',extensions:['cms']}]
            }).then(
                ({filePaths})=>{
                    if(filePaths && filePaths.length){
                     return decodeFile(filePaths[0]).then(({body})=>Macro.stringToJson(body)).then(result=>{
                        const MacroName =  path.basename(filePaths[0],'.cms');
                        result.MacroName = MacroName;
                        return result;
                     });
                    }
                    return {__error:true,code:1,message:'取消'};
                 }
            );
        },
        DeleteMacrofile({AccoutID,GUID}){
           return Macro.deleteMacro(AccoutID,GUID);
        }
        
    }
}
/** testing */
if(!module.parent){
    module.exports({win:{}}).ReadMacrofile({AccoutID:0,GUID:'FFE79BDB-FCBA-4faa-94F8-BC6FA58F6804'}).then(content=>{
        console.log(jsonToString(content));
    })
}