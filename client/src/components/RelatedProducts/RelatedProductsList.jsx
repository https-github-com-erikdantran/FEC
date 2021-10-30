import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx';

const RelatedProductsList = (props) => {
  const [related, setRelated] = useState(null);
  useEffect(() => {
    axios.get(`/api/products/${props.id}/related`)
      .then(results => { setRelated(results.data) })
  }, []);

  return (
    <div>
      <h3>Related Products</h3>
      {related ? related.map((product, i) => <RelatedProduct key={i} info={product} />) : null}
    </div>
  )
}

export default RelatedProductsList;