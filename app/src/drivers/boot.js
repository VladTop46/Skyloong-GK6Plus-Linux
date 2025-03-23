
const Driver = require('../libs/driver');
class CDBoot extends Driver{
    static meta = [0x1EA7,0x0905,0x0000,0x0000,0,0,0,1,0,0, 0,0,0,0];
    static name = 'CDBoot';
}
module.exports = CDBoot;