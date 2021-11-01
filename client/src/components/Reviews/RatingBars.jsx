import React from 'react';

function RatingBars(props) {


  return (
    <div className='rating-bars'>
      <div>
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