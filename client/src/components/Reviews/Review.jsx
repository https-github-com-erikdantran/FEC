import React from 'react';

function Review(props) {


  return (
    <div className='review'>
      {props.review.summary}
    </div>
  )
}

export default Review;