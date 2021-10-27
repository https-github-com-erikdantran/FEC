const config = require('../config.js');
const axios = require('axios');

// URL: https://app-hrsei-api.herokuapp.com/api/fec2/:hr-la47/

let options = {
  headers: {
    'Authorization': `${config.TOKEN}`
  }
}


// Products
module.exports.getAllProducts = (cb) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products`, options)
    .then(results => {
      cb(null, results.data)
    })
    .catch(err => {
      cb(err)
    })
}

module.exports.getProductInfo = (id, cb) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}`, options)
    .then(results => {
      console.log('results.data after get', results.data)
      cb(null, results.data)
    })
    .catch(err => {
      cb(err)
    })
}

module.exports.getProductStyles = (id, cb) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}/styles`, options)
    .then(results => {
      cb(null, results.data)
    })
    .catch(err => {
      cb(err)
    })
}

module.exports.getRelatedProducts = (id, cb) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}/related`, options)
    .then(results => {
      cb(null, results.data)
    })
    .catch(err => {
      cb(err)
    })
}


// Reviews
module.exports.getReview = (id, cb) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/${id}`, options)
    .then(results => {
      cb(null, results.data)
    })
    .catch(err => {
      cb(err)
    })
}

module.exports.getReviewMeta = (id, cb) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta/${id}`, options)
    .then(results => {
      cb(null, results.data)
    })
    .catch(err => {
      cb(err)
    })
}


// Q & A
module.exports.getQuestionList = (cb) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions`, options)
    .then(results => {
      cb(null, results)
    })
    .catch(err => {
      cb(err)
    })
}

module.exports.getAnswerList = (id, cb) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${id}/answers`, options)
    .then(results => {
      cb(null, results)
    })
    .catch(err => {
      cb(err)
    })
}

module.exports.postQuestion = (cb) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions`, options)
    .then(results => {
      cb(null, results)
    })
    .catch(err => {
      cb(err)
    })
}

module.exports.postQuestionAnswer = (id, cb) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${id}/answers`, options)
    .then(results => {
      cb(null, results)
    })
    .catch(err => {
      cb(err)
    })
}

module.exports.questionHelpful = (id, cb) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${id}/helpful`, options)
    .then(results => {
      cb(null, results)
    })
    .catch(err => {
      cb(err)
    })
}

module.exports.reportQuestion = (id, cb) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/questions/${id}/report`, options)
    .then(results => {
      cb(null, results)
    })
    .catch(err => {
      cb(err)
    })
}

module.exports.answerHelpful = (id, cb) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers/${id}/helpful`, options)
    .then(results => {
      cb(null, results)
    })
    .catch(err => {
      cb(err)
    })
}

module.exports.reportAnswer = (id, cb) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/qa/answers/${id}/report`, options)
    .then(results => {
      cb(null, results)
    })
    .catch(err => {
      cb(err)
    })
}
