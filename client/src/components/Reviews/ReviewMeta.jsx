import React from 'react';

function ReviewMeta(props) {

  let getRating = function(ratings) {
    let totalScore = 0;
    let numOfScores = 0;
    for (let key in ratings) {
      numOfScores += ratings[key] * 1;
      totalScore += ratings[key] * key;
    }
    let rating = Math.round(10 * totalScore / numOfScores) / 10;
    let percentRating = ( rating / 5 ) * 100 + '%'
    return {rating, percentRating}
  }


  let {rating , percentRating} = getRating(props.metadata.ratings)

  return (
    <div className='review-meta'>
      {rating}
      <div className="stars">
        <div className="percent" style={{width: percentRating}}>
        </div>
      </div>
    </div>
  )

}

export default ReviewMeta;