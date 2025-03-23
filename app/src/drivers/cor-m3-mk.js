
const Driver = require('../libs/driver');
const path = require('path');
const fse = require('fs-extra');
const CMD = require('../libs/cmd');
const config = require('../config');
const { reject } = require('lodash');
console.log('#model path',path.join(config.resource_dir,'device/modellist.json'))
const models = fse.readJsonSync(path.join(config.resource_dir,'device/modellist.json'));
class CORM3 extends Driver{
    static meta = [0x1EA7,0x0907,0xFF00,0x0050,0,0,1,0,1,1,4,127,127,127];
    static name = 'COR-M3机械键盘';
    probe(){
        if(this.probeInfo) return  Promise.resolve(this.probeInfo);
        return Promise.resolve().then(async()=>{
            try{
               this.open();
            }catch(e){
                return Promise.reject(e);
            }
            try{
               let  {FWID,FWVersion} = await this.request({...CMD.VER,timeout:1000});
               console.log('#FWID#',FWID)
               if( !models.find(m=>parseInt(m.FWID,16)==FWID)){
                return reject(new Error('invalid device'));
               } 
               let  {DeviceID} = await this.request(CMD.DEVICE_ID);
               let  {ModelID} = await this.request(CMD.MODEL_ID);
               this.probeInfo = {
                  FWID,FWVersion,DeviceID,ModelID
               };
               this.close();
               }catch(e){
                  return Promise.reject(e);
               }
               
               return this.probeInfo;
        });
    }
}
module.exports = CORM3;
//module.exports = new Driver([0x1EA7,0x0907,0xFF00,0x0050,0,0,1,0,1,1,4,127,127,127],'COR-M3机械键盘');