import React, { useState } from 'react';
import CharacteristicsInput from './CharacteristicsInput.jsx';
import UploadPhotos from './UploadPhotos.jsx';
import axios from 'axios';

function NewReviewForm(props) {
  const [ratingStatus, setRatingStatus] = useState({description: null, checked: true})
  const [formErrors, setFormErrors] = useState({
    rating: null,
    summary: null,
    body: null,
    recommend: null,
    name: null,
    email: null,
    characteristics: null
  })
  let chara = props.metadata.characteristics

  let handleStarRatingChange = function(e) {
    var value = e.target.value
    value == 1 ? setRatingStatus({description: 'Poor', checked: false})
    : value == 2 ? setRatingStatus({description: 'Fair', checked: false})
    : value == 3 ? setRatingStatus({description: 'Average', checked: false})
    : value == 4 ? setRatingStatus({description: 'Good', checked: false})
    : setRatingStatus({description: 'Great', checked: false});
  }

  let styleDisplay
  if(props.display) {
    styleDisplay = { display: 'block' }
  } else {
    styleDisplay = { display: 'none' }
  }

  let handleSubmit = function(e) {
    e.preventDefault()
    if (!checkErrors(e)){
      setFormErrors({
        rating: null,
        summary: null,
        body: null,
        recommend: null,
        name: null,
        email: null,
        characteristics: null
      })

      var data = {
        product_id: parseInt(props.metadata.product_id),
        rating: parseInt(e.target.rating.value),
        summary: e.target['review-summary'].value,
        body: e.target['review-body'].value,
        recommend: e.target.recommend.value === 'true' ? true : false,
        name: e.target.nickname.value,
        email: e.target.email.value,
        photos: [e.target.img0.value],
        characteristics: {}
      }
      // the commented code below adds the characteristics but the format that they are currently in causes a posting error
      // for (var key in chara) {
      //   data.characteristics[chara[key].id] = e.target[`chara-${key}`].value
      // }
      axios.post('/api/reviews', data)
        .then(results => {
          console.log('post results:', results)
          alert('Your review has been submitted!')
        })
    }
  }

  let checkErrors = function(e) {
    var errorsArr = [null, null, null, null, null, null, null];
    var errorExists = false
    if (e.target.rating === undefined || e.target.rating.value === '0') {
      errorsArr[0] = 'Input a rating';
      errorExists = true;
    }
    if (e.target['review-summary'] === undefined || e.target['review-summary'].value.length === 0) {
      errorsArr[1] = 'Review summary missing';
      errorExists = true;
    }
    if (e.target['review-body'] === undefined || e.target['review-body'].value.length < 50) {
      errorsArr[2] = 'Review body needs to be at least 50 characters';
      errorExists = true;
    }
    if (e.target.recommend === undefined || e.target.recommend.value === '') {
      errorsArr[3] = 'Required';
      errorExists = true;
    }
    if (e.target.nickname === undefined || e.target.nickname.value.length === 0) {
      errorsArr[4] = 'Please enter a nickname';
      errorExists = true;
    }
    if (e.target.email === undefined || e.target.email.value.length === 0) {
      errorsArr[5] = 'Please enter an email';
      errorExists = true;
    } else if (!validateEmail(e.target.email.value)) {
      errorsArr[5] = 'Please enter a valid email';
      errorExists = true;
    }
    for (var key in chara) {
      if (e.target[`chara-${key}`] === undefined || e.target[`chara-${key}`].value === '') {
        errorsArr[6] = 'Please imput a rating for all characteristics';
        errorExists = true;
        break
      }
    }
    if (errorExists) {
      setFormErrors({
        rating: errorsArr[0],
        summary: errorsArr[1],
        body: errorsArr[2],
        recommend: errorsArr[3],
        name: errorsArr[4],
        email: errorsArr[5],
        characteristics: errorsArr[6]
      })
    }
    return errorExists;
  }

  let validateEmail = function(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className='review-form-outline' style={styleDisplay}>
      <div className='review-form'>
        <div>

          <header>
            <h2>Write Your Review</h2>
            <h5>About the {props.name}:</h5>
            <span onClick={props.toggleFormDisplay} className='exit'>&times;</span>
          </header>
          <hr/>
          <form onSubmit={handleSubmit}>
            <div className='form-rating'>
              {/* the commented code below allows the stars to be unchecked upon load, but a strange bug occurs where you have to click twice to check a star */}
              <input disabled checked={ratingStatus.checked} className='rating-input rating-input-none' name='rating' id='no-rating' value='0' type='radio'></input>
              <input name='rating' type='radio' value='1' className='rating-input' id='one-star-rating' onChange={handleStarRatingChange} ></input>
              <label className='rating-label' htmlFor='one-star-rating'><span>&#9733;</span><span className='star-outline'>&#9734;</span></label>
              <input name='rating' type='radio' value='2' className='rating-input' id='two-star-rating' onChange={handleStarRatingChange}></input>
              <label className='rating-label' htmlFor='two-star-rating'><span>&#9733;</span><span className='star-outline'>&#9734;</span></label>
              <input name='rating' type='radio' value='3' className='rating-input' id='three-star-rating' onChange={handleStarRatingChange}></input>
              <label className='rating-label' htmlFor='three-star-rating' data-testid='three-star-rating'><span>&#9733;</span><span className='star-outline'>&#9734;</span></label>
              <input name='rating' type='radio' value='4' className='rating-input' id='four-star-rating' onChange={handleStarRatingChange}></input>
              <label className='rating-label' htmlFor='four-star-rating'><span>&#9733;</span><span className='star-outline'>&#9734;</span></label>
              <input name='rating' type='radio' value='5' className='rating-input' id='five-star-rating' onChange={handleStarRatingChange}></input>
              <label className='rating-label' htmlFor='five-star-rating'><span>&#9733;</span><span className='star-outline'>&#9734;</span></label>
                <span className='form-error' style={{ color: "red" }}>{formErrors.rating}</span>
            </div>
                <h5>{ratingStatus.description}</h5>
            <hr/>
            <h4>Do you recommend this product?</h4>
            <div className='form-recommend'>
              <input name='recommend' type='radio' value='true' className='recommend-input' id='recommend-true' ></input>
              <label className='recommend-label' htmlFor='recommend-true'>
                <div>Yes</div>
              </label>
              <input name='recommend' type='radio' value='false' className='recommend-input' id='recommend-false'></input>
              <label className='recommend-label' htmlFor='recommend-false'>
                <div>No</div>
              </label>
              <span className='form-error' style={{ color: "red" }}>{formErrors.recommend}</span>
            </div>
            <hr/>
            <div className='form-chara'>
              {Object.keys(props.metadata.characteristics).map((characteristic, index) => <CharacteristicsInput characteristic={characteristic} key={index} />)}
              <span className='form-error' style={{ color: "red" }}>{formErrors.characteristics}</span>
            </div>
            <hr/>
            {/* <label htmlFor='review-summary'>Review Summary:</label><br/> */}
            <input type='text' id='review-summary' name='review-summary' maxLength='60' placeholder='Review summary' ></input>
            <span className='form-error' style={{ color: "red" }}>{formErrors.summary}</span><br/>
            <textarea name='review-body' placeholder='Why did you like the product or not?' maxLength='1000' minLength='50' ></textarea>
            <span className='form-error' style={{ color: "red" }}>{formErrors.body}</span><br/>
            <hr/>
            <UploadPhotos /><br/>
            <hr/>
            <input type='text' name='nickname' placeholder='Nickname' maxLength='60' ></input>
            <span className='form-error' style={{ color: "red" }}>{formErrors.name}</span><br/>
            <input type='text' name='email' placeholder='Example: jackson11@email.com' maxLength='60' ></input>
            <span className='form-error' style={{ color: "red" }}>{formErrors.email}</span><br/>
            <button data-testid={'review-submit-button'}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}


export default NewReviewForm;