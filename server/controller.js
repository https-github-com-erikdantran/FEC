const helper = require('./AtelierAPI.js')
const _ = require('underscore');


const controller = {
  // Products
  getAllProducts: (req, res) => {
    helper.getAllProducts((err, results) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).json(results);
      }
    })
  },

  getProductInfo: (req, res) => {
    // id would be fed into url of axios.get on client side
    helper.getProductInfo(req.params.product_id, (err, results) => {
      if (err) {
        console.log("failed")
      } else {
        res.status(200).json(results);
      }
    })
  },

  getProductStyles: (req, res) => {
    // id would be fed into url of axios.get on client side
    helper.getProductStyles(req.params.product_id, (err, results) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).json(results);
      }
    })
  },

  getRelatedProducts: (req, res) => {
    let final = [];
    helper.getRelatedProducts(req.params.product_id)
      .then(results => {
        noDups = _.uniq(results);
        noDups.forEach(id => final.push(helper.getRelatedProductInfoStyle(id)))
        Promise.all(final)
          .then(results => {
            res.status(200).json(results);
          })
      })
      .catch(err => {
        console.log(err)
      })
  },

  getYourOutfit: (req, res) => {
    // req.body needs to be an array of IDs
    let final = [];
    noDups = _.uniq(req.body)
    noDups.forEach(id => final.push(helper.getRelatedProductInfoStyle(id)))
    Promise.all(final)
      .then(results => {
        res.status(200).json(results);
      })
      .catch(err => {
        console.log(err)
      })
  },


  // Reviews

  getReviews: (req, res) => {
    helper.getReviews(req.body, (err, results) => {
      if (err) {
        console.log('FAILED')
        res.status(404).json(err)
      } else {
        res.status(200).json(results)
      }
    })
  },

  getReviewMetadata: (req, res) => {
    helper.getReviewMetadata(req.body, (err, results) => {
      if (err) {
        console.log('FAILED')
        res.status(404).json(err)
      } else {
        res.status(200).json(results)
      }
    })
  },

  addReview: (req, res) => {
    helper.addReview(req.body, (err, results) => {
      if (err) {
        console.log('FAILED', err)
        res.status(404).json(err)
      } else {
        res.status(200).json(results)
      }
    })
  },

  markHelpful: (req, res) => {
    helper.markHelpful(req.body.reviewId, (err, results) => {
      if (err) {
        console.log('FAILED')
        res.status(404).json(err)
      } else {
        res.status(200).json(results)
      }
    })
  },

  reportReview: (req, res) => {
    helper.reportReview(null, (err, results) => {
      if (err) {
        console.log('FAILED')
        res.status(404).json(err)
      } else {
        res.status(200).json(results)
      }
    })
  },

  //Questions and Answers
  getQuestionList: (req, res) => {
    helper.getQuestionList((err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(results);
      }
    })
  },

  getAnswerList: (req, res) => {
    helper.getAnswerList(req.params.question_id, (err, results) => {
      if (err) {

      } else {
        res.status(200).json(results);
      }
    })
  },

  postQuestion: (req, res) => {
    helper.postQuestion((err, results) => {
      if (err) {

      } else {
        res.status(201).json(results);
      }
    })
  },

  postQuestionAnswer: (req, res) => {
    helper.postQuestionAnswer(req.params.question_id, (err, results) => {
      if (err) {

      } else {
        res.status(201).json(results);
      }
    })
  },

  questionHelpful: (req, res) => {
    helper.questionHelpful(req.params.question_id, (err, results) => {
      if (err) {

      } else {
        res.status(204).json(results);
      }
    })
  },

  reportQuestion: (req, res) => {
    helper.reportQuestion(req.params.question_id, (err, results) => {
      if (err) {

      } else {
        res.status(204).json(results);
      }
    })
  },

  answerHelpful: (req, res) => {
    helper.answerHelpful(req.params.question_id, (err, results) => {
      if (err) {

      } else {
        res.status(204).json(results);
      }
    })
  },

  reportAnswer: (req, res) => {
    helper.reportAnswer(req.params.question_id, (err, results) => {
      if (err) {

      } else {
        res.status(204).json(results);
      }
    })
  },

  // {element: this.props.element, time: time, widget: this.props.module}

  addClickInteraction: (req, res) => {
    console.log(req.body)
    helper.addClickInteraction(req.body, (err, results) => {
      if (err) {
        // console.log(err)
        res.status(404).json(err)
      } else {
        res.status(201).json(results);
      }
    })
  }


}


module.exports = controller;