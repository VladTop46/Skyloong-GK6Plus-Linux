const buffer = Buffer.alloc(8);

buffer.write('123',0);
console.log(buffer.slice(0,buffer.indexOf('\0')).toString('latin1'));


