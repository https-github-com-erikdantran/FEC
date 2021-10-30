import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx';
import Carousel from 'react-grid-carousel';

const RelatedProductsList = (props) => {
  const [related, setRelated] = useState(null);
  useEffect(() => {
    axios.get(`/api/products/${props.id}/related`)
      .then(results => { setRelated(results.data) })
  }, []);

  return (
    <div >
      <h3 className="related-list">Related Products</h3>
      <div className="related-carousel">
        <Carousel cols={4} rows={1} gap={14} loop >
          {related ? related.map((product, i) => <Carousel.Item key={i}> <img width="100%" src={product.thumbnail_url} /> <RelatedProduct info={product} /> </Carousel.Item>) : null}
        </Carousel>
      </div>
    </div>
  )
}

export default RelatedProductsList;