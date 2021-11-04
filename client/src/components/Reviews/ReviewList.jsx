import React, { useState } from 'react';
import Review from './Review.jsx';
import NewReviewForm from './NewReviewForm.jsx';

function ReviewList(props) {
  const [display, setDisplay] = useState({num: 2})
  const [formDisplay, setFormDisplay] = useState({display: false})

  let toggleFormDisplay = function() {
    setFormDisplay({display: !formDisplay.display})
  }

  let twoFuncs = function (e) {
    props.handleSortChange(e)
    setDisplay({num: 2});
  }

  if(props.newReviews !== null && props.newReviews.results.length > 0) {
    props.reviews.results.push(...props.newReviews.results);
    props.newReviews.results = [];
  }

  return (
    <div className='review-list'>
      <div className='review-sort'>
        <span> Sort by </span>
        <select onChange={twoFuncs}>
          <option value='relevant'>Relevant</option>
          <option value='helpful'>Helpful</option>
          <option value='newest'>Newest</option>
        </select>
        <button onClick={toggleFormDisplay}>Submit a Review</button>
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
      <NewReviewForm toggleFormDisplay={toggleFormDisplay} display={formDisplay.display} name={props.name}/>
    </div>
  )
}

export default ReviewList;