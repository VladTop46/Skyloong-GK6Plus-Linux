const HID = require('node-hid');
const Driver = require('./driver');
const usbDetect = require('usb-detection');
let pending = null;
let allDevices = null;
let eventNotify = null;
let monitorRun = false;

module.exports = {
    processNewDevices (newDevices){
       return Promise.resolve().then(async()=>{
            let validDevices = newDevices.reduce((result, deviceInfo) => {
                if(allDevices.find(d=>d.deviceInfo.path==deviceInfo.path)) return result;
                console.log('#probe path#',deviceInfo.path) 
                const HIDDriver = Driver.probe(deviceInfo);
                if (HIDDriver) result.push(new HIDDriver(deviceInfo));
                return result;
            }, []); 
            console.log('#validDevices#',validDevices)
            if(validDevices.length==0) return 0;

            for(let device of validDevices){
                try{
                    await device.probe();
                   }catch(e){
                       const {vendorId,productId,usagePage,usage} = device.deviceInfo;
                       try{
                       eventNotify('IOEvent',{
                           event:'probe',
                           error:e.message,
                       vendorId,productId,usagePage,usage
                       })
                       device.close();
                       device.removed=true;
                       }catch(e){
                           console.log('##### error herer %%%%%');
                       }
                   }
            }
            
            validDevices = validDevices.filter(d=>{
                if(  !d.removed && d.probeInfo && d.probeInfo.FWID) return true;
                d.close();
                return false;
             });
             if(validDevices.length==0) return 0;
             validDevices.forEach(d=>allDevices.unshift(d));
             console.log('validDevices.length',validDevices.length);
             return validDevices.length;
        });
    },
    listDevices() {
        return Promise.resolve().then(async () => {
            if (pending) {
                return new Promise((resolve, reject) => {
                    pending.push(resolve);
                })
            }
            if (allDevices) return Promise.resolve(allDevices);
            allDevices = [];
            pending = [];
            let devices = HID.devices().filter(device=>device.path && !device.path.endsWith('\\kbd'));
            await this.processNewDevices(devices);
            process.nextTick(() => {
                while (pending.length > 0) {
                    pending.shift()(allDevices);
                }
                pending = null;
            });
            if (!monitorRun) {
                console.log('#usb monitor#')
                monitorRun=true;
                usbDetect.on('add', ({vendorId, productId})=>{
                    setTimeout(async()=>{
                        console.log('device add ', vendorId, productId);
                        const newDevices = HID.devices(vendorId, productId);
                        if(newDevices.length==0) return;
                        const newCount = await this.processNewDevices(newDevices);
                        console.log({newCount});
                        if(newCount) eventNotify('onDeviceListChanged', allDevices.map(device => device.toJSON()));
                    },500);
                });
                usbDetect.on('remove', ({vendorId, productId, ...rest})=>{
                    console.log('keyboard remove',{vendorId, productId,rest});
                    const device_paths =  HID.devices().map(d=>d.path);
                    const removeDevices  = allDevices.filter(({deviceInfo:{path}})=>!device_paths.includes(path));
                    if(removeDevices.length>0){
                    for(let device of removeDevices){
                         const index = allDevices.indexOf(device);
                         allDevices.splice(index,1);
                         device.close();
                     }
                     eventNotify('onDeviceListChanged', allDevices.map(device => device.toJSON()));
                    }
                });
                usbDetect.startMonitoring();
            
            }
            eventNotify('IOEvent',{
                event:'listDevice',
                allDevices
            });
            return allDevices;
        });

    },
    getDeviceByModelId(modelId) {
        return this.listDevices().then(devices => devices.find(device => device.toJSON().ModelID == modelId));
    },
    getDevice(modelID){
        if(allDevices==null) return null;
        return allDevices.find(d=>d.probeInfo.ModelID==modelID);
    },
    initModel(modelId) {
           console.log('initModel',modelId);
    },
    setNotify(notify) {
        eventNotify = notify;
    },
    release(){
        if(allDevices){
            allDevices.forEach(d=>d.close(true));
        }
        usbDetect.stopMonitoring();
    }
}
