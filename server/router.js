let router = require('express').Router();
const controller = require('./controller.js');

// Product Endpoints
router.get('/products', controller.getAllProducts)

router.get('/products/:product_id', controller.getProductInfo)

router.get('/products/:product_id/styles', controller.getProductStyles)

router.get('/products/:product_id/related', controller.getRelatedProducts)

// Reviews
router.get('/reviews', controller.getReviews)
router.post('/reviews', controller.addReview)

router.get('/reviews/meta', controller.getReviewMetadata)

router.post('/reviews/helpful', controller.markHelpful)

router.put('/reviews/report', controller.reportReview)

// Q & A
router.get('/qa/questions', controller.getQuestionList)

router.get('/qa/questions/:question_id/answers', controller.getAnswerList)




module.exports = router;