const User = require('../models/user');
const Review = require('../models/review');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verify')

// upload a review
exports.upload = async (req, res) =>{
    const review = new Review(req.body)
    try {
       const savedReview = await review.save();
       res.status(200).json(savedReview);
    } catch (error) {
       res.status(500).json(error)
    }

}

// fetch a review 
exports.fetch = async (req, res) =>{
    try {
        const review = await Review.find().limit(7);
        res.status(200).json(review);
     } catch (error) {
        res.status(500).json(error)
        
     }
}
//   fetch updated reviews
exports.fetch_updated = async (req, res) =>{
    try {
        const recentReviews = await Review.find().sort({createdAt: -1}).limit(5)
        res.status(200).json(recentReviews)
        } catch (error) {
        res.status(501).json(error)
     }
}
//  fetch popular reviews
exports.fetch_popular = async (req, res) =>{
    try {
        const mostReviews = await Review.find().sort({"likes": -1}).limit(5)
        res.status(200).json(mostReviews);
        } catch (error) {
        res.status(501).json(error)
     }

}
//  update a review
exports.update = async (req, res) =>{
    try {
        const review = await Review.findById(req.params.id)
     if(review.userId === req.body.userId){
      await review.updateOne({$set:req.body}); 
      res.status(200).json("yes good");
     }else{
        res.status(401).json('you can update only your review')
     }
     
    
     } catch (error) {
        res.status(500).json(error)
     }
}
// fetch a single review
exports.fetch_single = async (req, res) =>{
    try {
        const review = await Review.findById(req.params.id)
        res.status(200).json(review);
     } catch (error) {
        res.status(500).json(error)
        
     }    
}
//  like/dislike a review
exports.like = async (req, res) =>{
    try {
        const review = await Review.findById(req.params.id)
        if(!review.likes.includes(req.body.userId)){
           await review.updateOne({$push: {likes: req.body.userId}});
           res.status(200).json('sucessfully liked')
        }else{
           await review.updateOne({$pull: {likes: req.body.userId}})
           res.status(200).json('sucessfully disliked')
        }
     } catch (error) {
        res.status(500).json(error)
     }
     
}

// get reviews in a location
exports.fetch_location = async (req, res) =>{
    try {
        const location = req.body.location
        const reviews = await Review.find({"location" : location }).limit(4)
       res.status(200).json(reviews)
        
    } catch (error) {
        res.status(500).json(error)
    }
}
