var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var middlewares = require('./middlewares');
var trueLog  = require('true-log');
var fs = require('fs');
var defaultRouter = require('./Routers/default.router');
var studentsRouter = require('./Routers/students.router');
var userRouter = require('./Routers/user.router');
var reviewRouter = require('./Routers/review.router');

var port = process.env.PORT || 80;

app.listen(port,function(){
    console.log("I am running the server on ", port);
})

try{
    mongoose.connect("mongodb://admin:admin123@ds123012.mlab.com:23012/studentsdb",{ useNewUrlParser: true }, function(){
        console.log("I am running the Db on 27017");
    })
}
catch(err){
    console.log("Unable to connect to MongoDb");
}



var ws = fs.createWriteStream("logs/request.log", {flags: 'a'});
app.use(trueLog({level: 'full', stream : ws}));


app.use(bodyParser.json());
app.use(express.static("uploads"));
app.use('/', defaultRouter);
app.use('/api/users',userRouter);
// // app.use(middlewares.authenticate);  
// app.use(middlewares.validateToken);
app.use('/students',studentsRouter);
app.use('/reviews',reviewRouter );