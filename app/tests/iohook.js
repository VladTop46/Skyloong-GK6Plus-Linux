const {uIOhook, UiohookKey } = require('uiohook-napi');
const fs = require('fs')
const keyMap = Object.fromEntries(Object.entries(UiohookKey).map(([key,value])=>[value,key]))
fs.writeFileSync('keyNames.json',JSON.stringify(keyMap,'\t'))
console.log(keyMap)
uIOhook.on('input',({type,keycode})=>{
    console.log('#input event#', e)
})
uIOhook.start();