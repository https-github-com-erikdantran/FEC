import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewMeta from './ReviewMeta.jsx';
import ReviewList from './ReviewList.jsx';

function Reviews(props) {
  const [allReviewData, setAllReviewData] = useState({reviews: [], metadata: null});
  const [filters, setFilters] = useState({sort: 'Relevant', page: 1})
  useEffect(() => {
    getReviews(props.id, filters.sort, filters.page)
      .then(reviews => {
        if (allReviewData.metadata !== null) {
          setAllReviewData({ reviews , metadata: allReviewData.metadata })
        } else {
          getReviewmetadata(props.id)
            .then(metadata => {
              setAllReviewData({ reviews , metadata })
            })
        }
      })
  }, [filters])

  let getReviews = async function(id, sort, page) {
    let params = { params: {page: page, count: 4, sort: sort, product_id: id} }
    return axios.post('/api/reviews/get', params)
      .then(results => results.data)
  }

  let getReviewmetadata = async function(id) {
    return axios.post('/api/reviews/meta', {params: {product_id: id}})
    .then(results => results.data)
  }

  let handleSortChange = function(e) {
    setFilters({sort: e.target.value, page: 1})
  }

  let handleMoreReviews = function() {
    console.log('yee haw')
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
        <ReviewList reviews={allReviewData.reviews} handleSortChange={handleSortChange} handleMoreReviews={handleMoreReviews} />
      </div>
    )
  }

}

export default Reviews