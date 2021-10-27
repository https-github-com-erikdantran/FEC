let router = require('express').Router();
const controller = require('./controller.js');

// Product Endpoints
router.get('/products', controller.getAllProducts)

router.get('/products/:product_id', controller.getProductInfo)

router.get('/products/:product_id/styles', controller.getProductStyles)

router.get('/products/:product_id/related', controller.getRelatedProducts)

// Reviews


// Q & A
router.get('/qa/questions', controller.getQuestionList)

router.get('/qa/questions/:question_id/answers', controller.getAnswerList)




module.exports = router;