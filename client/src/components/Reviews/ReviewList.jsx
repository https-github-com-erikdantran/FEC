import React, { useState } from 'react';
import Review from './Review.jsx'
function ReviewList(props) {
const [display, setDisplay] = useState({num: 2})


  if(props.newReviews !== null && props.newReviews.results.length > 0) {
    props.reviews.results.push(...props.newReviews.results);
    props.newReviews.results = [];
  }

  return (
    <div className='review-list'>
      <div className='review-sort'>
        <span> Sort by </span>
        <select onChange={() => {
          setDisplay({num: 2});
          return props.handleSortChange;
          }}>
          <option value='Relevant'>Relevant</option>
          <option value='Helpful'>Helpful</option>
          <option value='Newest'>Newest</option>
        </select>
      </div>
      {props.reviews.results.map((review, index) => {
      if (index < display.num) {
        return (<Review review={review} key={index} />)
      }
      })}
      {props.reviews.results.length > display.num ?
        <button onClick={() => {
          setDisplay({num: display.num += 2});
          if(display.num >= props.reviews.results.length) {
            props.handleMoreReviews();
          }
        }}>MORE REVIEWS</button> :
        null
      }
    </div>
  )
}

export default ReviewList;