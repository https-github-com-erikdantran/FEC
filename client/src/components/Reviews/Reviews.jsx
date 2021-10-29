import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reviews(props) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(props.id)
  }, [])

  let getReviews = function (id) {
    let params = { params: {page: 1, count: 2, sort: 'newest', product_id: id} }
    axios.post('/api/reviews/get', params)
    .then(results => {
      console.log(results.data)
      setReviews(results.data)
    })
  }

  if (reviews.length === 0) {
    return (
      <div>
        THIS IS A REVIEW
      </div>
    )
  } else {
    return (
      <div>
        {reviews.results[0].summary}
        </div>
    )

  }

}

export default Reviews