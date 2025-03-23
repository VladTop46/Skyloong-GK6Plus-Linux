const EventEmitter = require('events').EventEmitter;
const Macro = require('./macro');

const KeyMap = require('./keymap');
const CMD = require('./cmd');
//const MODIFIED_KEYS = [0xE0,0xE1,0xE2,0xE3,0xE4,0xE5,0xE6,0xE7]
const setBit=function(byteVal,bitNum,val){
    if(val){
        byteVal = byteVal|(1<<bitNum);
        
    }else{
        byteVal = byteVal & (~(1<<bitNum))
    }
    return byteVal;
}
class KeyState {
    constructor(){
        this.downKeys = [];
        this.modified = 0;
    }
    KeyDown(key){
        console.log('key down',key)
        const keyCode  = KeyMap.getKeyCode(key);
        const modifiesDelta = keyCode - 0xE0;
                if(modifiesDelta>=0 && modifiesDelta <= 7){
            this.modified = setBit(this.modified,modifiesDelta,true);
            return;
        }
        if(this.downKeys.includes(keyCode)) return ;
        if(this.downKeys.length>4) this.downKeys.shift();
        this.downKeys.push(keyCode);
    }
    KeyUp(key){
        console.log('key up',key)
        const keyCode  = KeyMap.getKeyCode(key);
        const modifiesDelta = keyCode - 0xE0;
        if(modifiesDelta>=0 && modifiesDelta <= 7){
            this.modified = setBit(this.modified,modifiesDelta,false);
            return;
        }
        this.downKeys = this.downKeys.filter(code=>code!=keyCode);
    }
    getState(){
       return [this.modified].concat(this.downKeys);
    }
}

class ScriptEngine extends EventEmitter {
    constructor(guid,repeats,modelId){
        super();
        this.guid = guid;
        this.repeats = repeats;
        this.pending = 0;
        this.modelId = modelId;
        this.keyState = new KeyState();
        this.mouseKey = 0;

    }
     eventHandle(type){
        const device = require('./device').getDevice(this.modelId);
        if(!device) return Promise.resolve(null);
        if(type=='key'){
           return device.request(CMD.KeyEvent(this.keyState.getState()));
        }else{
           return device.request(CMD.MouseEvent(this.mouseKey));
        }
    }
   async start(){
        console.log('start script');
        this.emit('start');
        const {TaskList}  = Macro.stringToJson( (await Macro.readMacro(0,this.guid)).body);
     
        for(let i = 0 ;this.repeats==0 || i < this.repeats ; i ++ ){
            for(let {taskName,taskValue} of TaskList){
                if(taskName=='Delay')  await new Promise((resolve)=>{setTimeout(resolve,taskValue*1)});
                else{
                    
                    switch(taskName){
                        case 'KeyDown':
                        case 'KeyUp'  :
                           this.keyState[taskName](taskValue);
                         await this.eventHandle('key',this.keyState.getState());
                         break;
                        case 'LeftDown' :
                        case 'LeftUp'   :
                            this.mouseKey = setBit(this.mouseKey,0,taskName=='LeftDown');
                          await  this.eventHandle('mouse',this.mouseKey);
                        break;
                        case 'RightDown':
                        case 'RightUp'  :
                            this.mouseKey = setBit(this.mouseKey,1,taskName=='RightDown');
                          await  this.eventHandle('mouseEvent',this.mouseKey);
                        break;    
                           
                    }
                }
            }
            if(this.stopped) break;
            if(this.pending && this.repeats>0 && i==(this.repeats-1)){
                i=-1;
                this.pending--;
            }
        }
        this.stop();
       
    }
    stop(){
        if(this.stopped) return;
        this.stopped = true;
        this.emit('stop');
    }
    addPending(){
        this.pending++;
    }
    getStopMode(){
        return this.stopMode;
    }
}

module.exports = ScriptEngine;
