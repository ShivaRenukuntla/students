var bcrypt = require('bcrypt');

class CryptoSvc{

    hashPwd(password){
        return bcrypt.hashSync(password,2);
    }

    comparePwd(plainText, hashedPwd){
        return bcrypt.compareSync(plainText,hashedPwd);
    }
}
module.exports = new CryptoSvc();