const router = require('express').Router();
const User = require('../models/user');
const Review = require('../models/review');

// Upload a Review
router.post('/', async(req, res)=>{
     const review = new Review(req.body)
     try {
        const savedReview = await review.save();
        res.status(200).json(savedReview);
     } catch (error) {
        res.status(500).json(error)
     }
});

// Update a review
router.put('/', async(req, res)=>{
   try {
      const review = await Review.findById(req.params.id)
   if(review.userId === req.body.userId){
      await Review.updateOne({$set:req.body});
      res.status(200).json('review has been updated')
   }else{
      res.status(401).json('you can update only your review')
   }
   } catch (error) {
      res.status(500).json(error)
   }
   
});

// Like a review
router.put('/:id/like', async(req,res)=>{
   try {
      const review = Review.findById(req.params.id)
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
   
});

// get a review
router.get('/:id', async(req,res)=>{
   try {
      const review = Review.findById(req.params.id)
      res.status(200).json(review);
   } catch (error) {
      res.status(500).json(error)
      
   }
})

// get all reviews
router.get('/reviews', async(req,res)=>{
   try {
      const review = await Review.find()
      res.status(200).json(review);
   } catch (error) {
      res.status(500).json(error)
      
   }
});

// get most recent reviews
router.get('/recent', async(req,res)=>{
   try {
      const recentReviews = await Review.find().sort({createdAt: -1}).limit(5)
      res.status(200).json(recentReviews)
      } catch (error) {
      res.status(500).json(error)
   }
})


module.exports = router;