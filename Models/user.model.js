var mongoose = require('mongoose');
var uniqueValidator =  require('mongoose-unique-validator');
var schema =  mongoose.Schema({

    username : {type: String, index:{unique : true, required: true}},
    password : {type: String, required: true},
    active : {type: Boolean, default: true},
    locked : {type: Boolean, default: false},
    lastUpdated :{type: Date, default : Date.now}
    
});

schema.plugin(uniqueValidator);
module.exports = mongoose.model("User", schema);