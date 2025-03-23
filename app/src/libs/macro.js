const {userdata_dir} = require('../config');
const path = require('path');
const fs = require('fs-extra');
const {decodeFile,encodeFile,Type:CMFType} = require('./cmfcodec');
const getMacroPatch = function(AccoutID,GUID){
    return path.join(userdata_dir,`Account/${AccoutID}/Macro/${GUID}.cms`);
}
function stringToJson(content){
        const result = {TaskList:[]};
    let  state = '';
    content.split(/[\r\n]+/).forEach(line=>{
       if(!line) return; 
       const match = line.match(/\s*\[(.+)\]\s*/);
       if(match) state = match[1];
       else{
          // console.log(mode,line);
          if(state=='General'){
              const kv = line.split('=');
              if(kv[0]=='Name') result['MacroName'] = kv[1];
              if(kv[0]=='ScriptID') result['GUID'] = kv[1];
          }

          if(state=='Script'){
             // const [taskName,taskValue] = line.split(' ');
              //if(!result.TaskList) result.TaskList = [];
              const tempArray = line.split(' ');
              if (tempArray.length == 1) {
                //result.TaskList.push({taskName,taskValue:taskValue||''});
                result.TaskList.push({taskName: line,taskValue: ''});
              } else {
                result.TaskList.push({taskName: tempArray[0],taskValue: tempArray.slice(1).join(' ')});
              }
          }
       }
    });
    
    return result;
}

function jsonToString(json){
        return [
        '[General]',
        `Name=${json.MacroName}`,
        `ScriptID=${json.GUID}`,
        'Repeats=1',
        'StopMode=1',
        '',
        '[Script]',
        ...json.TaskList.map(({taskName,taskValue})=>taskValue?`${taskName} ${taskValue}`:taskName)
    ].join('\n');
}

module.exports = {
    readMacro:function(AccoutID,GUID){
        return decodeFile(getMacroPatch(AccoutID,GUID)).then((result)=>{
            return result;
        })
    },
    writeMacro:function(AccoutID,GUID,Data){
        console.log('write macro ',{AccoutID,GUID,Data});
        const macroData = jsonToString(JSON.parse(Data));
                return encodeFile(getMacroPatch(AccoutID,GUID),{type:CMFType.TYPE_MACRO,name:'MACRO'},macroData);
    },
    deleteMacro:function(AccoutID,GUID){
       const macroPath =   getMacroPatch(AccoutID,GUID);
       if(fs.existsSync(macroPath)) fs.unlink(macroPath); 
    },
    stringToJson,
    jsonToString
}