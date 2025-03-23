const path = require('path');
const fs = require('fs-extra');
const {encodeFile,decodeFile,Type:CMFTye} = require('../libs/cmfcodec');
const { resolve } = require('path');
const { result, random, zip } = require('lodash');
const execSync = require('child_process').execSync;
const Profile = require('../libs/profile');
const { write } = require('fs');
const {dialog} = require('electron');
const AdmZip = require("adm-zip");
const { error } = require('console');
let applying = false;
module.exports = ({win,prefixes,notify})=>{
    const pendingTask = [];
    let busy = false;
    function GetProfileList({AccoutID,ModelID}){
      
        const profileDir = path.join(prefixes[1],`Account/${AccoutID}/Devices/${ModelID}`);
        return new Promise(async(resolve,reject)=>{
            const fileExists = await fs.pathExists(profileDir);
            if(!fileExists) return resolve([]);
            const files = (await fs.readdir(profileDir)).filter(f=>f.endsWith('.cmf'));
            let result = [];
            for(let i = 0; i < files.length ; i++){
                const filePath = path.join(profileDir,files[i]);
                const {header:{dcrc:CRC},body} = await decodeFile(filePath);
                const {Active,Name,GUID,ModeIndex,Application,Game} = JSON.parse(body);
                result.push({
                    Name,
                    Active,
                    ModeIndex,
                    GUID,
                    CRC,
                    Application,
                    Game,
                    filePath
                });
    
            }
            result = result.sort((a,b)=>{
                if(a.ModeIndex===0) return 1;
                if(b.ModeIndex===0) return -1;
                return a.ModeIndex-b.ModeIndex
            });
           // console.log('## get profile list ##',result);
            resolve(result);
        });
    }
    function removeProfile(AccoutID,ModelID,ModelIndex){
        return GetProfileList({AccoutID,ModelID}).then(results=>{return results.filter(result=>result.ModeIndex==ModelIndex)})
        .then(profiles=>{
            return Promise.all(profiles.map(({filePath})=>fs.unlink(filePath)))
        });
    }
   function WriteProfile({AccoutID,ModelID,Data,GUID,pendingCallback}){
       if(!Data){
          console.log('no data',AccoutID,ModelID,GUID); 
          return Promise.resolve({result:1});
       } 
      // console.log('write profile data',Data);
        if(busy){
             //const promise = new Promise();
             let callback;
             const promise = new Promise((resolve)=>{
                callback=resolve;
             });
             pendingTask.push({AccoutID,ModelID,Data,GUID,pendingCallback:callback});
            return promise;
        }   
        busy=true;
        const {ModeIndex} = JSON.parse(Data);
        console.log('write profile data',ModeIndex);

        const fileName = path.join(prefixes[1],`Account/${AccoutID}/Devices/${ModelID}/${GUID}.cmf`);
       if(ModeIndex*1 === 0){
           return fs.ensureDir(path.dirname(fileName)) 
           .then(()=>{
               return encodeFile(fileName,{name:'PROFILE',type:CMFTye.TYPE_PROFILE},Data).then(()=>({result:1})).then(()=>{
                  busy=false;
                  if(pendingTask.length>0) WriteProfile(pendingTask.shift());
                  if(pendingCallback) pendingCallback({result:1});
                  else return {result:1};
               });
           });
       }
       return removeProfile(AccoutID,ModelID,ModeIndex*1).then(()=>{
          return fs.ensureDir(path.dirname(fileName)) 
          .then(()=>{
              return encodeFile(fileName,{name:'PROFILE',type:CMFTye.TYPE_PROFILE},Data).then(()=>({result:1})).then(()=>{
                 busy=false;
                 if(pendingTask.length>0) WriteProfile(pendingTask.shift());
                 if(pendingCallback) pendingCallback({result:1});
                 else return {result:1};
              });
          });
       });
        
    }
    

    
    return {
        WriteProfile
       ,
        ReadProfile({AccoutID,ModelID,GUID}){
            const fileName = path.join(prefixes[1],`Account/${AccoutID}/Devices/${ModelID}/${GUID}.cmf`);
           return fs.pathExists(fileName).then(exists=>{
                if(!exists) return null;
                return decodeFile(fileName).then((result)=>{
                    return result.body;
                });
            });
             
        },
        GetProfileList
        ,
        DeleteProfile({AccoutID,ModelID,GUID}){
           const profilePath =  `Account/${AccoutID}/Devices/${ModelID}/${GUID}.cmf`;
          fs.pathExists(profilePath).then(exists=>{
             if(exists) return fs.unlink(profilePath)
          }).then(()=>({result:1}));
           
        },
        ApplyConfig({AccoutID,ModelID,GUID}) {
            console.log('try apply profile',AccoutID,ModelID,GUID);
            /*
            console.log('ApplyConfig', {AccoutID,ModelID,GUID});
            (async()=>{
                const {body} = await readProfile(AccoutID,ModelID,GUID);
                setTimeout(()=>{
                    notify('onApplyResult',{result:1});
                },1000);
            })();
            */
           /*
           if(applying){
            notify('onApplyResult',{result:1});
            return Promise.resolve('{}');
           } 
           applying=true;*/
            Profile.applyConfig(AccoutID,ModelID,GUID).then(()=>{
               applying=false;
                console.log('apply completed');
                notify('onApplyResult',{result:1});
                return true;
            }).catch(e=>{
                console.log('write aaaa===',e);
            });
            return Promise.resolve('{}');
        },
        async exportUserProfiles({AccoutID, ModelID}) {
            const profileDir = path.join(prefixes[1],`Account/${AccoutID}/Devices/${ModelID}`)
            const zip = new AdmZip()
            const {filePath} = await dialog.showSaveDialog(win,{
                title:'导出配置',
                filters:[{name:'配置',extensions:['gpr']}]
            })

            if (!filePath) {
                return {success: false, canceled: true}
            }
            
            zip.addLocalFolder(profileDir)
            try {
                await zip.writeZipPromise(filePath, {overwrite: true})
            }catch (e) {
                return {success: false, error: error.message}
            }
            return {success: true}

            //console.log('#export user profiles#')
        },
        async importUserProfiles({AccoutID, ModelID}) {
            const profileDir = path.join(prefixes[1],`Account/${AccoutID}/Devices/${ModelID}`)
            const {filePaths} = await dialog.showOpenDialog(win,{
                title:'导入配置',
                filters:[{name:'配置文件',extensions:['gpr']}]
            })
           
            if (filePaths && filePaths.length) {
                filePath = filePaths[0]
                let movedTo = ''
                if (fs.existsSync(profileDir)) {
                    movedTo = `${profileDir}_moved_${new Date().getTime()}`
                    fs.moveSync(profileDir, movedTo)
                   
                }
                fs.mkdirSync(profileDir, {recursive: true})
                try {
                    const zip = new AdmZip(filePath)
                    zip.extractAllTo(profileDir)
                    if (movedTo) {
                        await fs.rm(movedTo,{recursive:true,force:true})
                    }
                    return GetProfileList ({AccoutID, ModelID})
                }catch (e) {
                    fs.moveSync(movedTo, profileDir)
                    return {
                        sucess: false
                    }
                }
            }

        },     
        async cleanRedundancy({AccoutID}) {
            const profileDir = path.join(prefixes[1],`Account/${AccoutID}`)
            try{
                fs.rmdirSync(profileDir, { recursive: true, force: true })
            }catch(e){
                return {
                    success: false
                }
            }
            return {
                success: true
            }
        }
    }
}