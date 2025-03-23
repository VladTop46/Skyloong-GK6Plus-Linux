const ScriptEngine = require('./scriptengine');
class ScriptEngineManager {
    constructor () {
        this.scriptEngines = new Map();
    }
    setHandler(handler){
        this.handler = handler;
    }
    getKey(modelId,key){
        return `${modelId}_${key}`;
    }
    getEngine(modelId,key){
        const engineKey = this.getKey(modelId,key);
        return this.scriptEngines.get(engineKey);
    }
    startNewEngine(GUID,key,Repeats,modelId){
        console.log('start new engine',{GUID,key,Repeats,modelId});
        const engineKey = this.getKey(modelId,key);
        const scriptEngine =  new ScriptEngine(GUID,Repeats,modelId);
        this.scriptEngines.set(engineKey,scriptEngine);
        scriptEngine.start();
        scriptEngine.once('stop',()=>{
            this.scriptEngines.delete(engineKey);
        });
    }
    processKeyEvent(key,isDown,{Type,Data:{GUID,StopMode,Repeats}},modelId){
        if(Type != 'Macro') return;
        console.log('#bbb#')
        const oldEngine = this.getEngine(modelId,key);
        if(isDown){
            if(StopMode==3 && oldEngine){
                oldEngine.stop();
                return;
            }
            if(StopMode==1 && oldEngine){
                oldEngine.addPending();
                return;
            }

            if(!oldEngine){
               this.startNewEngine(GUID,key,StopMode==1?Repeats:0,modelId);
            }
             
        }else{
           if(oldEngine && StopMode==2){
               oldEngine.stop();
               return;
           }
        }
    }
    close(modelId){
      [...this.scriptEngines.keys()].filter(k=>k.startsWith(`${modelId}_`)).forEach(k=>this.scriptEngines.get(k).stop());
    }
}
module.exports = new ScriptEngineManager();