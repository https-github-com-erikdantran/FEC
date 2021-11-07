import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewMeta from './ReviewMeta.jsx';
import ReviewList from './ReviewList.jsx';

function Reviews(props) {
  const [allReviewData, setAllReviewData] = useState({reviews: null, metadata: null});
  const [filters, setFilters] = useState({sort: 'relevant', page: 1, newReviews: null})
  const [sortedReviewData, setSortedReviewData] = useState({results: null})

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
  }, [])

  let getReviews = async function(id, sort, page) {
    let params = { params: {page: page, count: 50, sort: sort, product_id: id} }
    return axios.post('/api/reviews/get', params)
      .then(results => results.data)
  }

  let getReviewmetadata = async function(id) {
    return axios.post('/api/reviews/meta', {params: {product_id: id}})
    .then(results => results.data)
  }

  let handleSortChange = function(e) {
    setSortedReviewData({results: null})
    setFilters({sort: e.target.value, page: 1, newReviews: null})
    getReviews(props.id, e.target.value, 1)
      .then(reviews => setAllReviewData({reviews: reviews, metadata: allReviewData.metadata}))
  }

  let handleMoreReviews = function() {
    var nextPage = filters.page + 1
    getReviews(props.id, filters.sort, nextPage)
      .then(reviews => setFilters({sort: filters.sort, page: nextPage, newReviews: reviews}))
  }

  let handleSortByRating = function(rating) {
    var num = rating.slice(0,1)
    var sortedArr = allReviewData.reviews.results.filter(review => {
      if (review.rating == num) {
        return true;
      } else {
        return false;
      }
    })
    setSortedReviewData({results: sortedArr})
  }

  if (allReviewData.reviews === null) {
    return (
      <div>
        <img src='spiffygif_46x46.gif' />
      </div>
    )
  } else {
    return (
      <div className='review-section' id='reviews'>
        <ReviewMeta metadata={allReviewData.metadata} handleSortByRating={handleSortByRating}/>
        <ReviewList reviews={allReviewData.reviews} handleSortChange={handleSortChange} handleMoreReviews={handleMoreReviews} newReviews={filters.newReviews} name={props.name} metadata={allReviewData.metadata} sortedResults={sortedReviewData.results}/>
      </div>
    )
  }

}

export default Reviews