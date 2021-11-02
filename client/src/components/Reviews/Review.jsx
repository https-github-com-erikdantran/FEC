import React from 'react';

function Review(props) {

  let percentRating = (rating) => {
    return Math.round((rating / 5) * 10) * 10 + '%';
  }
  console.log(props.review);
  return (
    <div className='review'>
      <div className="stars" style={{fontSize: '11pt'}}>
          <div className="percent" style={{width: percentRating(props.review.rating)}}>
          </div>
        </div>
      <h4>{props.review.summary}</h4>
      <p>{props.review.body}</p>
      {props.review.recommend ?
      <span><em>&#10003; I recommend this product! </em></span> :
      null
      }
    </div>
  )
}

export default Review;