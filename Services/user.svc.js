var User = require('../Models/user.model');
var jwt = require('jsonwebtoken');
class UserSvc{

    register(data){
        var user = new User(data);
        return user.save(); 
    }


    getByEmailId(username){

        return User.findOne({username: username}).exec();
    }

    generateToken(username){
        return jwt.sign({username: username}, 'secret',{expiresIn: '1h'});
    }
}

module.exports = new UserSvc();

