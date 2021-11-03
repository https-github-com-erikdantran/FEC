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

  // adds IDs of current product into outfits array and gets info for new added product to display
  const handleAddClick = (e) => {
    props.setOutfit(props.current.id)
    // doesn't handle dupes
    axios.post('api/products/outfit', [props.current.id])
      .then(results => { setOutfitInfo([...outfitInfo, results.data[0]]) })
  }

  const [outfitInfo, setOutfitInfo] = useState(null)
  useEffect(() => {
    axios.post('api/products/outfit', props.outfit)
      .then(results => { setOutfitInfo(results.data) })
  }, [])


  return (
    <div>
      <h3 className="related-list">Related Products</h3>
      <div className="related-carousel">
        <Carousel cols={4} rows={1} gap={5} >
          {related ? related.map((product, i) => <Carousel.Item key={i}><RelatedProduct info={product} current={props.current} /> </Carousel.Item>) : null}
        </Carousel>
      </div>

      {/* If plus is clicked, add this product ID to outfit IDs array and add this product info into carousel */}
      <h3 className="related-list" onClick={handleAddClick}>Your Outfit</h3>
      <div className="your-outfit">
        <Carousel cols={4} rows={1} gap={5} >
          <Carousel.Item><button onClick={handleAddClick}>+</button></Carousel.Item>
          {outfitInfo ? outfitInfo.map((product, i) => <Carousel.Item key={i}><RelatedProduct info={product} current={props.current} /> </Carousel.Item>) : null}
        </Carousel>
      </div>
    </div>
  )
}

export default RelatedProductsList;