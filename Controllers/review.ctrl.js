var ReviewSvc = require('../Services/review.svc');
class ReviewCtrl {

   async save(req,res){
    try{
        
        var review = await ReviewSvc.save(req.body);
        res.status(201).json(review);
    }
    catch(err){
        res.status(500).send(err); 
    }
    }

}

module.exports = new ReviewCtrl(); 