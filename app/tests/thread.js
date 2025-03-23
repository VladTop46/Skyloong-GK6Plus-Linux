function sleep(t){
    return new Promise((resolve)=>{
        setTimeout(resolve,t);
    })
}
async function run(){
   // while(true){
        for(let i =0;i<1000;i++){
        await sleep(500);
        console.log('from run')
        }
   // }
}
run();
setInterval(()=>{
    console.log('from interval');
},1000);