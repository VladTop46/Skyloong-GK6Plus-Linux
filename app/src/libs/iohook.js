const {uIOhook } = require('uiohook-napi');
const keyNames = require('../libs/keyNames');
//const keyLIVE= require('../libs/keyNames');
const {UiohookToName} = require('../libs/captureKeys')
//const keyNames=UiohookToName

let lastTime = 0;
let eventNotify;


const keyListener = ({type, keycode})=>{
    const now = new Date().getTime();
    if(lastTime){
        eventNotify('onDelay',[now-lastTime]);
    }
    lastTime = now;
    const keyName = keyNames[keycode];

    eventNotify(type == 5?'onKeyUp':'onKeyDown',[`${keyName}`]);
}


const sendkeyDown = (e) => {
    const data = { event: e, name: UiohookToName[e.keycode], time: Date.now() };
    console.log('sendKeyDown:',data);
  };
  
  // function send webContents event for keyUp
  const sendKeyUp = (e) => {
    const data = { event: e, name: UiohookToName[e.keycode], time: Date.now() };
     console.log('sendKeyUp:',data);
  };
  



const mouseListener = ({type, button}) => {
    const now = new Date().getTime();
    if(lastTime){
        eventNotify('onDelay',[now-lastTime]);
    }
    lastTime = now;
    if (type == 7) {
        eventNotify('onMouseDown', [button-1]);
    }else if (type == 8) {
        eventNotify('onMouseUp', [button-1]);
    }
}
module.exports = {
    setNotify:function(notify){
        eventNotify = notify;
    },
    /*
    left 0,right 1
    onDelay,onMouseDown,onMouseUp,onKeyDown,onKeyUp
    */
    start(){
        lastTime = 0;
        uIOhook.on('keydown', keyListener);
        uIOhook.on('keyup',  keyListener);
        uIOhook.on('keydown', sendkeyDown);
        uIOhook.on('keyup',  sendKeyUp);
       
        uIOhook.on('mousedown', mouseListener);
        uIOhook.on('mouseup', mouseListener)
        uIOhook.start();
    },
    stop(){
        uIOhook.off('keydown', keyListener);
        uIOhook.off('keyup',  keyListener);
        uIOhook.off('keydown', sendkeyDown);
        uIOhook.off('keyup',  sendKeyUp);
      
       
        uIOhook.off('mousedown', mouseListener);
        uIOhook.off('mouseup', mouseListener)
        uIOhook.stop();
        lastTime = 0;
    }

}