import React, { useState } from 'react';
import Review from './Review.jsx'
function ReviewList(props) {

  return (
    <div className='review-list'>
      <div className='review-sort'>
        <span> Sort by </span>
        <select onChange={props.handleSortChange}>
          <option value='Relevant'>Relevant</option>
          <option value='Helpful'>Helpful</option>
          <option value='Newest'>Newest</option>
        </select>
      </div>
      {props.reviews.results.map((review, index) => <Review review={review} key={index} />)}
      <button onClick={props.handleMoreReviews}>MORE REVIEWS</button>
    </div>
  )
}

export default ReviewList;