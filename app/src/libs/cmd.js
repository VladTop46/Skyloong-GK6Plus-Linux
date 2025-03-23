const {crc16_ccitt} = require('./utils');
class CMD{
    constructor(cmd,sub_cmd,header,body){
        this.cmd = cmd;
        this.sub_cmd = sub_cmd;
        this.header = header||0;
        this.body = body
    }
    toBuffer(){
        let padLen = 0;
        const buffer = Buffer.alloc(64+padLen);
        buffer.fill(0);
        buffer.writeUInt8(this.cmd,0+padLen);
        buffer.writeUInt8(this.sub_cmd,1+padLen);
        buffer.writeUInt32LE(this.header,2+padLen);
       
        if(this.body){
            this.body.copy(buffer,8+padLen,0,this.body.length);
        }
       buffer.writeUInt16LE(crc16_ccitt(buffer),6+padLen); 
        return buffer;
    }
}
const create = function(){
    return new CMD(...arguments);
}
module.exports ={
    CMD,
    create,
    VER:{
       req: create(1,1),
       res:buffer=>({
            FWID:buffer.readUInt32LE(8),
            FWVersion:buffer.readUInt16LE(12)
       })
    },
    DEVICE_ID:{
        req:create(1,2),
        res:buffer=>{
            let device_id=0n;
            for(let i=0;i<6;i++) device_id |= BigInt(buffer[8+i]) << BigInt(i*8);
            return {
                DeviceID: BigInt.asUintN(64, device_id).toString(10),
            }
        }
    },
    MODEL_ID:{
        req:create(1,8),
        res:buffer=>({
            ModelID:buffer.readUInt32LE(8)
        })
    },
    MATRIX:{
        req:create(1,9),
        res:buffer=>({
            key_col: buffer.readUInt8(8),
            key_row:buffer.readUInt8(9)
        })
    },
    WRITE_MAC_VID:{
        req:create(0x41,1)
    },
    CHANGE_MODE:(mode)=>{
        return {
            req:create(0xb,mode),
            res:buffer=>({mode:buffer.readUInt8(1)})
        }
    },
    CleanData:(mode,dataType)=>{
        return {
            req:create(0x21,mode,dataType),
            res:function(buffer){
                //console.log(`clean data,mode:${mode},dataType:${dataType},buffer:`,this.req.toBuffer());
               return ({ack:buffer.readUInt8(1),buffer})
            }
        }
    },
    writeKeyData:(mode,addr,data)=>{
        const header = (data.length<<16) + addr;
        return {
            req:create(0x22,mode,header,data),
            res:function(buffer){
                return {ack:buffer.readUInt8(1),crc:buffer.readUInt16LE(6)};
            }
        }
    },
    writeFnData:(mode,addr,data)=>{
        const header = (data.length<<16) + addr;
        return {
            req:create(0x31,mode,header,data),
            res:buffer=>({ack:buffer.readUInt8(1),crc:buffer.readUInt16LE(6)})
        }
    },
    writeModeLE:(mode,addr,data)=>{
        const header = (data.length<<16) + addr;
        return {
            req:create(0x24,mode,header,data),
            res:buffer=>({ack:buffer.readUInt8(1),crc:buffer.readUInt16LE(6)})
        }
    },
    writeMacro:(mode,addr,data)=>{
       
        const header = (data.length<<16) + addr;
        return {
            req:create(0x25,mode,header,data),
            res:function(buffer){
               // console.log(`write buffer,address:${addr},buffer:`,this.req.toBuffer());
                return ({ack:buffer.readUInt8(1),crc:buffer.readUInt16LE(6)})
            }
        }
    },
    writeLightKey:(mode,addr,data)=>{
        const header = (data.length<<16) + addr;
        return {
            req:create(0x26,mode,header,data),
            res:buffer=>({ack:buffer.readUInt8(1),crc:buffer.readUInt16LE(6)})
        }
    },
    writeLightData:(mode,addr,data)=>{
        const header = (data.length<<24) + addr;
        return {
            req:create(0x27,mode,header,data),
            res:buffer=>({ack:buffer.readUInt8(1),crc:buffer.readUInt16LE(6)})
        }
    },

    setLEConfig:( byLEModel,  byLESubModel,  byLELight,  byLESpeed,  byLEDir,  byR,  byG,  byB,  bEnable)=>{
        const body = Buffer.alloc(9);
        body.writeUInt8(byLEModel,0);
        body.writeUInt8(byLESubModel,1);
        body.writeUInt8(byLELight,2);
        body.writeUInt8(byLESpeed,3);
        body.writeUInt8(byLEDir,4);
        body.writeUInt8(byR,5);
        body.writeUInt8(byG,6);
        body.writeUInt8(byB,7);
        body.writeUInt8(bEnable*1,8);
        return {
            req:create(0x17,0x01,0,body),
            res:buffer=>{
              console.log('### setLEConfig response ###',buffer );  
              return  buffer.readUInt8(1)==1 ;
            }
        }
    },
    SetLEDefine:( wAddr, BbyData)=>{
        let header = wAddr;
        header +=  ((BbyData.length <<24) & 0xff000000);
        return {
            timeout:1000,
            req:create(0x1a,0x01,header,BbyData),
            res:buffer=>{
               return buffer.readUInt8(1)==1
            }
        }
    },
    SaveLEDefine:{
            req:create(0x1a,0x02),
            res:buffer=>buffer.readUInt8(1)==1
    },
    SetKeyTable:(byTableTyte,wAddr,BbyData)=>{
        let header = wAddr;
        header +=  ((BbyData.length <<24) & 0xff000000)
        return {
            req:create(0x16,byTableTyte,header,BbyData),
            res:buffer=>buffer.readUInt8(1)==1
        }
    },
    Ping:{
        timeout:1000,
        req:create(0x0c)
    },
    ToggleKeyReport:(enabled)=>{
        return {
            req:create(0x15,0x03,0,Buffer.from([enabled?0x01:0x00])),
            res:buffer=>buffer.readUInt8(2)==1
        }
    },
    KeyEvent:(data)=>{
        return {
            req:create(0x15,0x02,0,Buffer.from(data))
        }
    },
    MouseEvent:(mouse)=>{
        return {
            req:create(0x15,0x01,0,Buffer.from([mouse]))
        }
    }


}