const { truncate } = require('lodash');
const Device = require('../libs/device');
module.exports = ({notify})=>{
   Device.setNotify(notify);
    return {
        GetDeviceList(){
            Device.listDevices().then((devices)=>{
                setTimeout(function(){
                    notify('onDeviceListChanged',devices.map(device=>device.toJSON()));
                },1000);
               
            });
        },
        QueryFirmwareUpdateInfo({ ModelID }) {
           
            Device.getDeviceByModelId(ModelID).then((device)=>{
              
                if(device){
                    console.log('version name',device.getVersionName());
                     notify('onUpdateFirmwareMessage',{FWVersion:device.getVersionName(),type:1});
                }
            });
        },
        changePid({ModelID}){
           return Device.getDeviceByModelId(ModelID).then((device)=>{
                console.log({deviceInfo:device.probeInfo});
                if(device){
                   return device.changePid().then(({ack})=>{
                      if(ack) return {success:true};
                      return {error:'setting failure'}
                   });
                }else{
                    return {error:'device not found'}
                }
            });
        }

    }
}