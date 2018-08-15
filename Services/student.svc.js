var Student = require('../Models/students.model');

class StudentService{

getCount(){
        return Student.countDocuments().exec();
}

get(pageIndex,pageSize){

  return Student.find({},{__v:0})
            .skip(pageIndex*pageSize)
            .limit(pageSize)
            .sort('-lastUpdated')
            .exec()    
}


getById(id){
   return  Student.findById(id,{__v:0, _id:0})
    .exec()
}

save(data){
    var student = new Student(data);
    return student.save();
}
    

}

module.exports = new StudentService();