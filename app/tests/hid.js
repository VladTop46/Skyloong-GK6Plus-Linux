const HID = require('node-hid')
const {VER} = require('../src/libs/cmd')
const devices = HID.devices(7847,2311)
console.log({devices})
for(let _device of devices ) {

try{
    console.log('#device',_device.path)
const device = new HID.HID(_device.path)

device.on('error',e=>{
    console.log('#device errror#',e, _device.path)
})
device.on('data',(data)=>{
    console.log('#get data#')
})
    const buffer = VER.req.toBuffer()
    const writeBuffer = Buffer.concat([Buffer.from([0x00]),buffer],buffer.length + 1)
    console.log('#write buffer#', writeBuffer)
    device.write(writeBuffer)
    console.log('#write ok#')
}catch(e){
    console.log('#write error#',e) 
}
}

setTimeout(()=>{},10000)