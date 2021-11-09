import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClickTracker from '../ClickTracker.jsx';

function Review(props) {

  const [helpfulness, setHelpfulness] = useState({ num: props.review.helpfulness, hasRated: false})

  useEffect(() => {
    setHelpfulness({num: props.review.helpfulness, hasRated: false})
  }, [props.review])

  let percentRating = (rating) => {
    return Math.round((rating / 5) * 10) * 10 + '%';
  }
  let formatDate = (dateString) => {
    var options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  let handleHelpful = () => {
    if (!helpfulness.hasRated) {
      axios.put('/api/reviews/helpful', {reviewId: props.review.review_id})
      .then(results => {
        setHelpfulness({num: helpfulness.num + 1, hasRated: true})
      })
    }
  }

  //console.log(props.review)
  return (

      <div className='review'>
        <header>
          <div className="stars" style={{fontSize: '11pt'}}>
            <div className="percent" style={{width: percentRating(props.review.rating)}}>
            </div>
          </div>
          <h4>{props.review.summary}</h4>
          <span className='review-info'>{props.review.reviewer_name},&nbsp;&nbsp;{formatDate(props.review.date)}</span>
        </header>
        <p>{props.review.body}</p>
        {props.review.recommend ?
        <span><em>&#10003; I recommend this product! </em></span> :
        null
        }
        <ClickTracker eventName='Helpful' module='reviews' element='helpfulness'>

        <div>Helpful? <span onClick={handleHelpful}>{!helpfulness.hasRated ? 'Yes' : 'Yes ✓'}</span>({helpfulness.num})</div>
        </ClickTracker>
      </div>

    )
}

export default Review;