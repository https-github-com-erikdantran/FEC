// import axios from 'axios';

// const starRatings = (id) => {

//   let getReviewmetadata = async function(id) {
//     return axios.post('/api/reviews/meta/', {params: {product_id: id}})
//     .then(results => results.data)
//   }

//   let getRating = function(ratings) {
//     let totalScore = 0;
//     let numOfScores = 0;
//     for (let key in ratings) {
//       numOfScores += ratings[key] * 1;
//       totalScore += ratings[key] * key;
//     }
//     let starRatingPercents = {
//       '1 stars': '0%',
//       '2 stars': '0%',
//       '3 stars': '0%',
//       '4 stars': '0%',
//       '5 stars': '0%'
//     };
//     for (let key in ratings) {
//       starRatingPercents[key + ' stars'] = Math.round((ratings[key] / numOfScores) * 100) + '%';
//     }
//     let rating = Math.round(10 * totalScore / numOfScores) / 10;
//     let percentRating = Math.round(( rating / 5 ) * 10) * 10 + '%';
//     return {rating, percentRating, starRatingPercents}
//   }

//   const processedMetaData = '';

//   getReviewMetadata(id)
//   .then(results => {
//     processedMetaData = getRating(results.ratings)
//   })

//   console.log(processedMetaData)
//   return processedMetaData
// }


// export default starRatings;