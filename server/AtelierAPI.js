const config = require('../config.js');
const axios = require('axios');
const _ = require('underscore');

// URL: https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/

let options = {
  headers: {
    'Authorization': `${config.TOKEN}`
  }
}
console.log(options.headers)


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
      //console.log('results.data after get', results.data)
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
  return new Promise((resolve, reject) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}/related`, options)
      .then(results => {
        resolve(results.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports.getRelatedProductInfoStyle = (id) => {
  return new Promise((resolve, reject) => {
    let combined = {}
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}`, options)
      .then(results => {
        combined = results.data;
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${id}/styles`, options)
          .then(results => {
            combined = _.extend(combined, results.data.results[0].photos[0])
            params = { params: { 'product_id': id }, headers: options.headers }
            axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta/`, params)
              .then(results => {
                combined = _.extend(combined, results.data)
                resolve(combined)
              })
          })
      })
      .catch(err => {
        reject(err)
      })
  })
}

// Reviews
module.exports.getReviews = (params, cb) => {
  var stuff = params.params
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/?product_id=${stuff.product_id}&page=${stuff.page}&count=${stuff.count}&sort=${stuff.sort}`, options)
    .then(results => {
      cb(null, results.data)
    })
    .catch(err => {
      cb(err)
    })
}

module.exports.getReviewMetadata = (params, cb) => {
  params.headers = options.headers
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/meta/`, params)
    .then(results => {
      cb(null, results.data)
    })
    .catch(err => {
      cb(err)
    })
}

module.exports.addReview = (params, cb) => {
  params = { params: { product_id: 42366, rating: 5, summary: 'Chicken chicken chicken (chicken)...', body: '...chicken CHICKEN chicken chicken, chicken chicken. Chicken chicken chicken chicken chicken? Chicken.', recommend: true, name: 'Chicken', email: 'Chicken@chicken.chicken', photos: [], characteristics: {
    "142032": "5",
    "142033": "4",
    "142034": "3",
    "142035": "2"
} }, headers: options.headers }
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/`, null, params)
    .then(results => {
      cb(null, results.data)
    })
    .catch(err => {
      cb(err)
    })
}

module.exports.markHelpful = (reviewId, cb) => {
  reviewId = 840809;
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/${reviewId}/helpful`, null, options)
    .then(results => {
      cb(null, results.data)
    })
    .catch(err => {
      cb(err)
    })
}

module.exports.reportReview = (reviewId, cb) => {
  reviewId = 841465;
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/reviews/${reviewId}/report`, options)
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

