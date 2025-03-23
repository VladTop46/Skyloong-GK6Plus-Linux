const {SerialPort} = require('serialport')
const serialPort = new SerialPort({
    path: `\\\\?\\hid#vid_1ea7&pid_0907&mi_02&col04#7&65e2f90&0&0003#{4d1e55b2-f16f-11cf-88cb-001111000030}`,
    baudRate: 9600
})
serialPort.on('error',error=>{
    console.log('#on error#', error)
})
