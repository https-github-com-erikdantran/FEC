let router = require('express').Router();
const controller = require('./controller.js');

// Product Endpoints
router.get('/products', controller.getAllProducts)

router.get('/products/:product_id', controller.getProductInfo)

router.get('/products/:product_id/styles', controller.getProductStyles)

router.get('/products/:product_id/related', controller.getRelatedProducts)

router.post('/products/outfit', controller.getYourOutfit)

// Reviews
router.post('/reviews/get', controller.getReviews)
router.post('/reviews', controller.addReview)

router.post('/reviews/meta', controller.getReviewMetadata)

router.put('/reviews/helpful', controller.markHelpful)

router.put('/reviews/report', controller.reportReview)

// Q & A
router.get('/qa/questions', controller.getQuestionList)

router.get('/qa/questions/:question_id/answers', controller.getAnswerList)

// Interactions

router.post('/user/interaction', controller.addClickInteraction)


module.exports = router;