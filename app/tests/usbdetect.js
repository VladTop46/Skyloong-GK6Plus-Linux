const monitor = require('node-usb-detection');
monitor.add((device)=>{
    console.log('device added',{device});
});
monitor.remove((device)=>{
    console.log('device removed',{device});
});