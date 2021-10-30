import React from 'react';
import Review from './Review.jsx'
function ReviewList(props) {

  return (
    <div className='review-list'>
      {props.reviews.results.map((review, index) => <Review review={review} key={index} />)}
    </div>
  )
}

export default ReviewList;