const keylogger = require('osx-keylogger');
let i =0;
keylogger.listenRaw((...args)=>{
    console.log('key event',i++,args);
})

//console.log(keylogger.listenRaw);gssgergewrhwrh