const fs = require('fs-extra');
const path = require('path');
const {crc16_ccitt} = require('../libs/utils');
const  CMFH_MAGIC = 0x434D4631;
const {userdata_dir} = require('../config');
const Type = {
     TYPE_INVALID:0,
     TYPE_PROFILE:1,
     TYPE_LIGHT:2,
     TYPE_STATASTIC:3,
     TYPE_APPCONF:4,
     TYPE_MACRO:5
}
const TypeName = ['_','PROFILE','LIGHT','STATASTIC','APPCONF','MACRO'];

class Header{
    constructor(info){
        this.info = info
    }

    getBuffer(){
        const buffer = Buffer.alloc(32);
        buffer.writeUInt32LE(this.info.magic,0);
        buffer.writeUInt32LE(this.info.hcrc,4);
        buffer.writeUInt32LE(this.info.time,8);
        buffer.writeUInt32LE(this.info.size,12);
        buffer.writeUInt32LE(this.info.dcrc,16);
        buffer.writeUInt8(this.info.type,20);
        buffer.write(this.info.name,24,8,'latin1');
        return buffer;
    }
    getInfo(){
        return this.info;
    }
    static parse(buffer){
        const info = {};
        info.magic = buffer.readUInt32LE(0);
        info.hcrc = buffer.readUInt32LE(4);
        info.time = buffer.readUInt32LE(8);
        info.size = buffer.readUInt32LE(12);
        info.dcrc = buffer.readUInt32LE(16);
        info.type = buffer.readUInt8(20);
        info.name = buffer.slice(24).toString('latin1');
       // console.log('parse header buffer',buffer.slice(24),info);
       // console.log('parse header name',buffer.slice(24).toString('latin1').split('\x00')[0]);
        return new Header(info);
    }
}


function getInitCRC(type,name){
    let g_nCRC = crc16_ccitt(Buffer.from(TypeName[type]));
    const nameBuffer = Buffer.alloc(8);
     nameBuffer.write(name,0,'latin1');
     return crc16_ccitt(g_nCRC,nameBuffer) ;
}

function decode(info,pData){
    let g_nCRC = getInitCRC(info.type,info.name) 
    let g_nDataCRC = 0xFFFF;
    let nLen = pData.length; 
    let index = 0;
    while(nLen > 0)
	{
		pData[index] = pData[index] ^ (g_nCRC & 0xFF);
		g_nCRC = crc16_ccitt(g_nCRC, pData.slice(index,index+1))
        g_nDataCRC = crc16_ccitt(g_nDataCRC, pData.slice(index,index+1)) 
		index++;
		nLen--;
    }
    return pData;
}

function encode({type,name,time},pData){
    const dcrc = crc16_ccitt(pData);
    let nLen = pData.length;
    const info = {
        magic:CMFH_MAGIC,
        hcrc:0,
        time:time||Math.round(new Date().getTime()/1000),
        size:nLen,
        dcrc,
        type,
        name
    };
    const hcrc = crc16_ccitt(new Header(info).getBuffer());
    info.hcrc=hcrc;
    let byData
    let index = 0;
    let g_nCRC =  getInitCRC(type,name);
    let  g_nDataCRC = 0xffff;
    while(nLen > 0)
	{
		byData = pData[index] ^ (g_nCRC & 0xFF);
		g_nCRC = crc16_ccitt(g_nCRC, pData.slice(index,index+1));
		g_nDataCRC = crc16_ccitt(g_nDataCRC, pData.slice(index,index+1));
		pData[index]  = byData;
		index++;
		nLen--;
	}
    return Buffer.concat([new Header(info).getBuffer(),pData]);
}

function decodeFile(fileName){
 return fs.pathExists(fileName).then(exists=>{
     if(!exists) return {};
     return fs.readFile(fileName).then(buffer=>{
        const header = buffer.subarray(0,32);
        const body  = buffer.subarray(32);
        const info = Header.parse(header).getInfo();
        return {
            header:info,
            body: decode(info,body).toString()
        }
      });    
 })
}
function encodeFile(fileName,info,content){
  const dirPath = path.dirname(fileName);
  return fs.ensureDir(dirPath).then(()=>{
        return fs.writeFile(fileName,encode(info,Buffer.from(content)));
  });
}

module.exports = {
    encodeFile,
    decodeFile,
    Type,
    readProfile(account,model,guid){
       return decodeFile(path.join(userdata_dir,`Account/${account}/Devices/${model}/${guid}.cmf`));
    }
}