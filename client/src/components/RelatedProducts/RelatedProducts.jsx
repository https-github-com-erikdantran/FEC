import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RelatedProducts = (props) => {
  const [related, setRelated] = useState(null);
  useEffect(() => {
    axios.get(`/api/products/${props.id}/related`)
      .then(results => { setRelated(results.data) })
  }, []);

  return (
    <div>
      Related Products
    </div>
  )
}

export default RelatedProducts;