var jwt = require('jsonwebtoken');

module .exports = {

     authenticate: function (req,res,next) {
        var credentials = req.headers["authorization"];
        if(credentials){
            var tokens = credentials.split(" ");
            var str = tokens[1];
            var encodedString = new Buffer(str,"base64").toString();
    
            var data = encodedString.split(":");
            console.log(data);
    
            if(data[0]==="admin" && data[1]==="admin"){
                next();
            }
            else{
                res.status(401);
                res.send("Unauthorised");
            }
        }
        else{
            res.status(401);
            res.send("Unauthorised");
        }
    },

    validateToken(req,res,next){
        var authHeader = req.headers["authorization"];
        if(!authHeader) res.status(401).send("Unauthorized");
        else{
            var tokens = authHeader.split(" ");
            var authToken = tokens[1];

            var data = jwt.verify(authToken, 'secret', function(err){
                if(err){
                    res.status(401);
                    res.send("Unauthorised")
                }
                else{
                    next();
                }
            }); 
       
        }
        

    },


};