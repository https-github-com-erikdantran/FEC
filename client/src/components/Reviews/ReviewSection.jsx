import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewMeta from './ReviewMeta.jsx';
import ReviewList from './ReviewList.jsx';

function Reviews(props) {
  const [allReviewData, setAllReviewData] = useState({reviews: [], metadata: {}});

  useEffect(() => {
    getReviews(props.id)
      .then(reviews => {
        getReviewmetadata(props.id)
          .then(metadata => {
            setAllReviewData({ reviews , metadata })
          })
      })
  }, [])

  let getReviews = async function(id) {
    let params = { params: {page: 1, count: 2, sort: 'newest', product_id: id} }
    return axios.post('/api/reviews/get', params)
      .then(results => results.data)
  }

  let getReviewmetadata = async function(id) {
    return axios.post('/api/reviews/meta', {params: {product_id: id}})
    .then(results => results.data)
  }

  if (allReviewData.reviews.length === 0) {
    return (
      <div>
        <img src='spiffygif_46x46.gif' />
      </div>
    )
  } else {
    return (
      <div className='review-section'>
        <ReviewMeta metadata={allReviewData.metadata}/>
        <ReviewList reviews={allReviewData.reviews}/>
      </div>
    )

  }

}

export default Reviews