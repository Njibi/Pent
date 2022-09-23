const router = require('express').Router();
const {verifyToken,  verifyTokenAndAdmin} = require('../middleware/verify')
const reviewController = require('../controllers/reviewControllers');
// Upload a Review
router.post('/', verifyToken, reviewController.upload);


// get all reviews
router.get('/', reviewController.fetch);

// get most recent reviews
router.get('/recent',reviewController.fetch_updated );

// get most liked reviews
router.get('/most', reviewController.fetch_popular);

// fecth reviews in your location
router.get('/location',reviewController.fetch_location );

// Update a review
router.put('/:id', verifyToken, reviewController.update);

// get a review
router.get('/:id',reviewController.fetch_single );

// Like a review // mark a hrlp hlpful
router.put('/:id/like',verifyToken, reviewController.like);



module.exports = router;