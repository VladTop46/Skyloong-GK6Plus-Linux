const {ipcRenderer, contextBridge} = require('electron');
const { v4: uuidv4 } = require('uuid');
window.LeData=null;
const notifyHandlers = {};
contextBridge.exposeInMainWorld('onFunc',(evt,callback)=>{
    // console.log('onFunc',evt);
     if(!notifyHandlers[evt]){
         notifyHandlers[evt] = {};
         ipcRenderer.on(evt,(_,params)=>{
           //  console.log(`onFunc ${evt} notify `,params);
             if(['onDelay','onKeyDown','onKeyUp','onMouseDown','onMouseUp'].includes(evt)) params = JSON.parse(params);
            try{
             notifyHandlers[evt].handler(params);
            }catch(e){
                console.log('#error#',{evt,params,e})
            }
            // callback(params);
         });
     }
     notifyHandlers[evt].handler = callback;
     
 })


ipcRenderer.on('IOEvent',(_,params)=>{
    console.log('IOEvent',params);
});
contextBridge.exposeInMainWorld('callFunc',({request,onFailure,onSuccess})=>{
    ipcRenderer.invoke('callFunc',request).then((result)=>{ 
      //  console.log('# get result #',request,result);
        if(!result){
            return onSuccess && onSuccess();
        }
        if(request.funcname=='WriteProfile'){
          //  console.log('write response',result);
        }
        let json ;
        try{
             if(typeof result == 'string'){
              json = JSON.parse(result);
             }
        }catch(e){
          // console.log('#####',request,e);
            //return onFailure(1,e.message);
        }
        if(!json) return onSuccess && onSuccess(result);
        if(json && json.__error){
            return   onFailure(json.code,{message:json.message});
        } 
         onSuccess && onSuccess(result);
    }).catch(e=>{
        //console.log(e);
        onFailure && onFailure(1,`internal error:${e.message},request:${request}`);
    });
})
contextBridge.exposeInMainWorld('CMSDesktop', {
    startDrag:function(){}
})

contextBridge.exposeInMainWorld('getGuid', ()=>{
    const id =  uuidv4();
   // console.log('get uuid',id,arguments);
    return id;
 })

 contextBridge.exposeInMainWorld('debug', false)
 contextBridge.exposeInMainWorld('isMacOS', true)