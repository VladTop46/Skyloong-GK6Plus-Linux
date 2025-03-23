let modify = 0;
const setBit=function(byteVal,bitNum,val){
    if(val){
        byteVal = byteVal|(1<<bitNum);
        
    }else{
        byteVal = byteVal & (~(1<<bitNum))
    }
    return byteVal;
}

setBit(0,1);
setBit(1,1);
setBit(0,0);
console.log(modify);