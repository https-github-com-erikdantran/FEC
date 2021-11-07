import React from 'react';
import RatingBars from './RatingBars.jsx';
import Characteristics from './Characteristics.jsx';

function ReviewMeta(props) {

  let getRating = function(ratings) {
    let totalScore = 0;
    let numOfScores = 0;
    for (let key in ratings) {
      numOfScores += ratings[key] * 1;
      totalScore += ratings[key] * key;
    }
    let starRatingPercents = {
      '1 stars': '0%',
      '2 stars': '0%',
      '3 stars': '0%',
      '4 stars': '0%',
      '5 stars': '0%'
    };
    for (let key in ratings) {
      starRatingPercents[key + ' stars'] = Math.round((ratings[key] / numOfScores) * 100) + '%';
    }
    let rating = Math.round(10 * totalScore / numOfScores) / 10;
    let percentRating = Math.round(( rating / 5 ) * 10) * 10 + '%';
    return {rating, percentRating, starRatingPercents}
  }

  let findRecommendPercent = function(data) {
    let total = data.false * 1 + data.true * 1;
    return Math.round((data.true / total) * 100);
  }

  let recommendPercent = findRecommendPercent(props.metadata.recommended)
  let {rating , percentRating, starRatingPercents} = getRating(props.metadata.ratings)
  return (
    <div className='review-meta'>
      <div className='num-rating'>
        {rating}
      </div>
      <div className='star-rating'>
        <div className="stars">
          <div className="percent" data-testid='stars' style={{width: percentRating}}>
          </div>
        </div>
      </div>
      <br/>
      {Object.keys(starRatingPercents).map(key => <RatingBars rating={starRatingPercents[key]} key={key} name={key} handleSortByRating={props.handleSortByRating}/>)}
      <span><em>{recommendPercent + '% of reviews recommend this product'}</em></span>
      {Object.keys(props.metadata.characteristics).map(key => <Characteristics rating={props.metadata.characteristics[key]} key={key} name={key}/>)}
    </div>
  )

}

export default ReviewMeta;