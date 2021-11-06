import React from 'react';

function RatingBars(props) {

  return (
    <div className='rating-bars'>
      <div className='rating-bars-link'onClick={() => props.handleSortByRating(props.name)}>
        {props.name}
      </div>
      <div>
        <div className='bar'>
          <div className='bar-percent' style={{width: props.rating}}></div>
        </div>
      </div>
      <br/>
    </div>
  )
}

export default RatingBars;