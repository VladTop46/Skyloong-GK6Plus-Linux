function test(){
    return Promise.resolve().then(()=>{
        return Promise.reject(new Error('a'));
    })
}

test().catch(e=>{
    console.log('catch error 1');
    console.log({e:e.message});
    return Promise.reject(e);
}).catch(e=>{
    console.log('catch error 2');
    console.log({e:e.message});
    return Promise.reject(e);
}).then(()=>{
    console.log('ok.');
}).catch(e=>{
    console.log('catch error 3',e);
})