const path = require('path');
const fs = require('fs-extra');
const {decodeFile,encodeFile,Type} = require('../libs/cmfcodec');
const  {dialog} = require('electron');

module.exports = ({win,prefixes})=>{
    
    return {
        ReadLE({AccoutID,GUID}){
            const lePath = path.join(prefixes[1],`Account/${AccoutID}/LE/${GUID}.le`);
            return fs.pathExists(lePath).then(exists=>{
                return exists?decodeFile(lePath).then(({body})=>body):null;
            });
            //return decodeFile(lePath).then(({body})=>body);
        },
        WriteLE({AccoutID,Data,GUID}){
            const lePath = path.join(prefixes[1],`Account/${AccoutID}/LE/${GUID}.le`);
            return encodeFile(lePath,{type:Type.TYPE_LIGHT,name:'light'},Data);
        },
        ImportLightfile(){
          return  dialog.showOpenDialog(win,{
              title:'导入灯效文件',
              filters:[{name:'灯效文件',extensions:['le']}]
            }).then(({filePaths})=>{
              if(filePaths && filePaths.length){
               return decodeFile(filePaths[0]).then(({body})=>body).then(result=>{
                   const Name = path.basename(filePaths[0],'.le');
                  // console.log('import result',result);
                  result = JSON.stringify({...JSON.parse(result),Name});
                   return result;
               })
              }
              return false;
           });        
        },
        ExportLightfile({JsonLightfile}){
           return dialog.showSaveDialog(win,{
               title:'保存灯效文件',
               filters:[{name:'灯效文件',extensions:['le']}],

            }).then(({filePath})=>{
                if(filePath)   return encodeFile(filePath, {type: Type.TYPE_LIGHT, name: 'light'}, JsonLightfile);
                return false;
            });
        },
        DeleteLE({AccoutID,GUID}){
            const lePath = path.join(prefixes[1],`Account/${AccoutID}/LE/${GUID}.le`);
            if (fs.existsSync(lePath)) fs.unlink(lePath)
        }
            
    }
}