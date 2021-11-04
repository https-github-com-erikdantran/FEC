import React from 'react';

function Review(props) {

  let percentRating = (rating) => {
    return Math.round((rating / 5) * 10) * 10 + '%';
  }
  let formatDate = (dateString) => {
    var options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className='review'>
      <header>
        <div className="stars" style={{fontSize: '11pt'}}>
          <div className="percent" style={{width: percentRating(props.review.rating)}}>
          </div>
        </div>
        <h4>{props.review.summary}</h4>
        <span className='review-date'>{formatDate(props.review.date)}</span>
      </header>
      <p>{props.review.body}</p>
      {props.review.recommend ?
      <span><em>&#10003; I recommend this product! </em></span> :
      null
      }
    </div>
  )
}

export default Review;