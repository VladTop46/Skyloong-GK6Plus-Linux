const os = require('os');
const path = require('path');
const fs = require('fs-extra');
let debug = false;
let userdata_dir = path.join(process.env.APPDATA || os.homedir(),'./GK6XPlus-CMS');
let resource_dir = path.join(__dirname,'../resources');
const debugConfigFile = path.join(userdata_dir, './debug.json');
let startPage
//startPage = 'http://localhost:8010';
if(fs.existsSync(debugConfigFile)){
    try{
        const debugConfig = fs.readJsonSync(debugConfigFile);
        debug=true;
        if(debugConfig.userdata_dir) userdata_dir = debugConfig.userdata_dir;
        if(debugConfig.resource_dir) resource_dir = debugConfig.resource_dir;
        if(debugConfig.startPage) startPage = debugConfig.startPage;
    }catch(e){

    }
}
module.exports = {
    userdata_dir,
    resource_dir,
    debug,
    startPage
}