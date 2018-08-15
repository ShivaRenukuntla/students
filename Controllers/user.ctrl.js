var userSvc = require('../Services/user.svc');
var cryptoSvc = require('../Services/crypto.svc');
// var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
class UserCtrl {

   async register(req,res){
       try{
        req.body.password = cryptoSvc.hashPwd(req.body.password);
        await userSvc.register(req.body); 
        res.status(201);
        res.send("Successfully registered");
       }
        catch(err){
            
           if(emailExists(err)) 
            {
                    res.status(409);
                    res.send("email id already exists");
            }
            else{
                    res.status(500);
                    res.send("Internal server error");
                }
        }
    
    };
    
    async login(req,res){
     
    var user =  await userSvc.getByEmailId(req.body.username);
    try{
        if(!user){
            res.status(401);
            res.send("Wrong user name or password");
        }
          else{
          // var result = bcrypt.compareSync(req.body.password, user.password);
                  var result = cryptoSvc.comparePwd(req.body.password, user.password);
                  if(!result){
                      res.status(401);
                      res.send("Wrong username or password");
                   }
                  else{
                          if(!user.active){
                          res.status(401);
                          res.send("User account inactive");
                      }
                  else if(user.locked){
                                          res.status(401);
                                          res.send("User account is locked. Contact support team"); 
                                       }
                      else{
                              var token = userSvc.generateToken(req.body.username);
                              var response = {
                              username: req.body.username,
                              token : token,
                           };
                          res.status(200).json(response);
              // res.send("login successful");
              }
          }
        }
      }
    catch(err){
        res.status(500);
        res.send("Internal Server error");
    }
    }  
}

function emailExists(err){
    return err && err.message && err.message.indexOf("User validation failed")>-1;
}

module.exports = new UserCtrl();