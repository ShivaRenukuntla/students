var mongoose = require('mongoose');

module.exports = mongoose.model("Review", {
    studId : {type: String, required: true},
    ranking : {type: Number, required: true},
    branch : {type: String},
    message : {type: String,},
    lastUpdated :{type: Date, default: Date.now}
});