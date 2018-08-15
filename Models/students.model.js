var mongoose = require('mongoose');

function validateAge(age){
    return age>20;
}

var model = mongoose.model("Student",{
    id: {type:Number, required:[true, "Id is Mandatory"] },
    name: {type: String, required:[true, "Name is Mandatory"], minlength :[4,"Name should have atleast 4 letters"]},
    age: {type: Number, required:[true, "Age is Mandatory"], validate:{validator: validateAge}},
    image:{type: String},
    isStudent: {type: Boolean, default: true},
    lastUpdated :{type: Date, default: Date.now}
});

module.exports = model;
 