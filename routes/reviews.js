const express = require('express');
const router = express.Router({
    mergeParams: true
});
const {
    validateReview,
    isLoggedIn,
    isAuthor,
    isReviewAuthor
} = require('../middleware');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const Review = require('../models/review');
const catchAsync = require('../utils/catchAsync');




router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;