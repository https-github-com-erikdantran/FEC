import React, { useState } from 'react';

function NewReviewForm(props) {
  const [ratingDescription, setRatingDescription] = useState({description: null})

  let handleStarRatingChange = function(e) {
    var value = e.target.value
    value == 1 ? setRatingDescription({description: 'Poor'})
    : value == 2 ? setRatingDescription({description: 'Fair'})
    : value == 3 ? setRatingDescription({description: 'Average'})
    : value == 4 ? setRatingDescription({description: 'Good'})
    : setRatingDescription({description: 'Great'});
  }


  let styleDisplay
  if(props.display) {
    styleDisplay = { display: 'block' }
  } else {
    styleDisplay = { display: 'none' }
  }



  return (
    <div className='review-form-outline' style={styleDisplay}>
      <div className='review-form'>
        <header>
          <h2>Write Your Review</h2>
          <h5>About the {props.name}:</h5>
          <span onClick={props.toggleFormDisplay} className='exit'>&times;</span>
          <form>
            <div className='form-rating'>
              {/* the commented code below allows the stars to be unchecked upon load, but a strange bug occurs where you have to click twice to check a star */}
              {/* <input disabled checked className='rating-input rating-input-none' name='rating' id='no-rating' value='0' type='radio'></input> */}
              <input name='rating' type='radio' value='1' className='rating-input' id='one-star-rating' onChange={handleStarRatingChange}></input>
              <label className='rating-label' htmlFor='one-star-rating'><span>&#9733;</span><span className='star-outline'>&#9734;</span></label>
              <input name='rating' type='radio' value='2' className='rating-input' id='two-star-rating' onChange={handleStarRatingChange}></input>
              <label className='rating-label' htmlFor='two-star-rating'><span>&#9733;</span><span className='star-outline'>&#9734;</span></label>
              <input name='rating' type='radio' value='3' className='rating-input' id='three-star-rating' onChange={handleStarRatingChange}></input>
              <label className='rating-label' htmlFor='three-star-rating' data-testid='three-star-rating'><span>&#9733;</span><span className='star-outline'>&#9734;</span></label>
              <input name='rating' type='radio' value='4' className='rating-input' id='four-star-rating' onChange={handleStarRatingChange}></input>
              <label className='rating-label' htmlFor='four-star-rating'><span>&#9733;</span><span className='star-outline'>&#9734;</span></label>
              <input name='rating' type='radio' value='5' className='rating-input' id='five-star-rating' onChange={handleStarRatingChange}></input>
              <label className='rating-label' htmlFor='five-star-rating'><span>&#9733;</span><span className='star-outline'>&#9734;</span></label>
              <span>{ratingDescription.description}</span>
            </div>
          </form>
        </header>
      </div>
    </div>
  );
}


export default NewReviewForm;