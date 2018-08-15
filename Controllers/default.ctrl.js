var logger = require('../Utilities/app.logger');

var defaultCtrl = {

    get: function(req,res){

        // res.status(200);
        logger.info({myMsg:"Hello someone has accessed your page with the details"})
        res.send("<h1>Hey there, how are you all ?</h1>");

    },

    health(req,res){
        var response = {
            status : "UP",
            Live : true
        };
        res.status(200);
        res.json(response);
    }
}

module.exports = defaultCtrl;