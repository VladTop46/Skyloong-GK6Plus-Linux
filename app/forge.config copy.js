const fs = require('fs');
const  packagerConfig = JSON.parse( fs.readFileSync('package.json','utf-8'));
let testVer=false;
 //testVer = '1.0.0.26'
const config = {
    "packagerConfig": {
      "icon": "./logoMac.icns",
      "appBundleId":"com.jikedingzhi.GK6xPlus",
    },
    "makers": [
      {
        "name": "@electron-forge/maker-dmg",
        "config": {
          "name":`GK6+ Mac App-${packagerConfig.version}`,  
          "icon": "./logoMac.icns"
        }
      }
    ]
  }
  
  const signConfig = {
    "osxSign": {
      "identity": "Apple Distribution: Dongguan Jizhi Electronic Technology Co., Ltd. (5K232MU6LY)",
      "hardenedRuntime": true,
      "gatekeeperAssess": false,
      "entitlements": "entitlements.plist",
      "entitlements-inherit": "entitlements.plist"
    },
    "osxNotarize": {
      "tool":"notarytool",
      "appleId": "mirdoriss@gmail.com",
      "appleIdPassword": "oigh-axax-yses-ipqn",
      "teamId": "5K232MU6LY"
    }
  };
if(!testVer){
  config.packagerConfig={...config.packagerConfig,...signConfig};
}else{
  // config.packagerConfig={...config.packagerConfig};
  config.makers[0].config.name += `测试-${testVer}`;
  config.packagerConfig.name=`${packagerConfig.productName}-测试${testVer}`
}


  module.exports = config;