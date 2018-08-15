var logger = require('../Utilities/app.logger');
var Student = require('../Models/students.model');
var studSvc = require('../Services/student.svc');
var reviewSvc = require('../Services/review.svc');
class StudentCtrl{

   async getStudents(req,res){
       try{
        var pageSize = +req.params.pageSize    || 10;
        var pageIndex =  +req.params.pageIndex || 0;
        var count = await studSvc.getCount();
        var students = await studSvc.get(pageIndex,pageSize);
        for(var i =0; i <students.length; i++){
            students[i].image = req.protocol + "://" + req.get('host')+ "/" +students[i].image;
        }
        logger.info(students);
        var totalPages = Math.ceil(count/pageSize);
                    var response ={
                     
                        metadata:{ 
                            count: count,
                            pages : totalPages,
                            hasNext: (totalPages-pageIndex)>1,
                            hasPrevious: pageIndex!==0,
                        },
                        data: students
                    };

        res.status(200);
        res.json(response);
       }
       catch(err){
        logger.error(err);
        res.status(500);
        res.send("Internal server error");
       } 
    };

    async getStudentsById(req,res){
        try{
            var id = req.params.id;
             var student =  await studSvc.getById(id);
             var reviews = await reviewSvc.get(id);
            //  var response = {
            //      review : reviews,
            //      student: student,
            //  } 
            var jsonBook = student.toJSON();
            jsonBook.reviews = reviews;
            
             res.status(200);
             res.json(jsonBook);
             }
        catch(err){
            res.status(500);
            res.send(err);
        }
      
    };

    async save(req,res){

        try {
           var student = await studSvc.save(req.body);
            res.status(201);
            res.send(student);
        }
        catch(err) {
            if(hasValidationError(err)){
                res.status(500);
                res.send(err.message);
            }
            else{
                res.status(500);
                res.send(err);
            }
        }
    };
  
    delete(req,res){
        var id = req.params.id;

        Student.findByIdAndRemove(id)
                .exec()
                .then(function(){
                    res.status(204);
                    res.send();
                })
                .catch(function(){
                    res.status(500);
                    res.send("Internal Server Error");
                })
 
    };

    update(req,res){
        var id =req.params.id;
   
        Student.findByIdAndUpdate(id,
                {$set: {
                            id: req.body.id,
                            name: req.body.name,
                            age: req.body.age,
                            isStudent: req.body.isStudent,
                        }})
                        .exec()
                        .then(function(){
                            res.status(204);
                            res.send();
                        })
                        .catch(function(){
                            res.status(500);
                            res.send("Internal server error");
                        });
               
    };

    patch(req,res){
        var id =req.params.id;
        delete req.body._id; 

        Student.findById(id,{_id:0})
                .exec()
                .then(function(student){
                    if(student){
                        var jsonStudent = student.toJSON();
                        for(var key in req.body){
                            jsonStudent[key] = req.body[key];
                        }
                        Student.findByIdAndUpdate(id,jsonStudent)
                        .exec()
                        .then(function(){
                            res.status(204);
                            res.send();
                        })
                }})      
               
                    .catch(function(){
                    res.status(500);
                    res.send("Internal Server error ");
        })

    }

   
}

    function hasValidationError(err) {
        return err && err.message && err.message.indexOf("validation failed")>-1
     }
module.exports = new StudentCtrl();