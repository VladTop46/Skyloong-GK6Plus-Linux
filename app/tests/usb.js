const {getDeviceList, findByIds} = require('usb')
const devices = findByIds(7847,2311)
console.log({devices: JSON.stringify(devices)})