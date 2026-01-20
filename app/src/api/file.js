const path = require('path');
const {error} = require('../libs/utils');
module.exports = ({fs,prefixes,eventBus})=>{
    
    return {
        ReadFile({Type,Path}) {
            const fileName = path.join(prefixes[Type],Path);
           // console.log('#get file#', fileName, Type)
            if(!fs.existsSync(fileName)){
                console.log('#file not found#', fileName)
                // Для profile_online файлов возвращаем null вместо ошибки
                if(Path.includes('profile_online_')){
                    return Promise.resolve(null);
                }
                return Promise.resolve({__error:true,code:0,message:`file not found:${fileName}`});
            }
            return fs.readFile(fileName)
            .then(buffer=>{
                if(buffer[0]==0xEF && buffer[1]==0xBB && buffer[2]==0xBF){
                    return buffer.slice(3);
                }
                return buffer;
            })
            .then(buffer=>buffer.toString('utf8'));
        },
        WriteFile({Type,Path,Data}){
            const fileName = path.join(prefixes[Type],Path);
            if (fileName.endsWith('AppConfig.json')) {
                eventBus.emit('config-changed', Data)
            }
           // console.log('write file',fileName,Path);
            return fs.ensureDir(path.dirname(fileName))
                    .then(()=>fs.writeFile(fileName,Data)).then(()=>({fileName}));
        },
        CopyFile({SrcPath,DestPath}){
          //  console.log('copy file',SrcPath,DestPath);
            if(!fs.existsSync(path.join(prefixes[0],SrcPath))){
               // console.log('copy file fail');
                return Promise.resolve({__error:true,code:0,message:'source file not found'}); 
            } 
           return fs.copy(path.join(prefixes[0],SrcPath),path.join(prefixes[1],DestPath)).then(()=>({result:1}))
        }
    }
}