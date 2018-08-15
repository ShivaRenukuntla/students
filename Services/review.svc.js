var Review = require('../Models/reviews.model');


class ReviewSvc{

    save(data){
        var review = new Review(data);
        return review.save();
    }

    get(id){
        return Review.find({studId: id},{__v:0 , _id:0}).exec();
    }

}

module.exports = new ReviewSvc();  