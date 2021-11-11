import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx';
import Carousel from 'react-grid-carousel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import ClickTracker from '../ClickTracker.jsx';
import OutfitContext from '../OutfitContext.jsx';

const RelatedProductsList = (props) => {
  const [related, setRelated] = useState(null);
  // this needs to run every time since every product has different related products
  useEffect(() => {
    axios.get(`/api/products/${props.id}/related`)
      .then(results => { setRelated(results.data) })
  }, []);

  const outfits = useContext(OutfitContext);

  // only runs on add outfit click so also needed
  const handleAddClick = (e) => {
    let saved = false;
    outfits.forEach(item => { if (item.id === props.current.id) { saved = true } })
    if (!saved) {
      axios.post('api/products/outfit', [props.current.id])
        .then(results => {
          props.setOutfit('add', results.data[0])
        })
    } else {
      alert('This item is already in your outfits')
    }
  }

  const handleRemoveClick = (id) => {
    props.setOutfit('remove', id);
  }


  return (
    <div className="related-products">
      <Typography component="div"><h3 className="related-list">Related Products</h3></Typography>
      <ClickTracker element="related-carousel" module="related-products">
        <div className="related-carousel">
          <Carousel cols={4} rows={1} gap={5} >
            {related ? related.map((product, i) => <Carousel.Item key={i}><RelatedProduct carousel={"related"} info={product} current={props.current} productChange={props.productChange} /> </Carousel.Item>) : null}
          </Carousel>
        </div>
      </ClickTracker>

      {/* If plus is clicked, add this product ID to outfit IDs array and add this product info into carousel */}
      <Typography component="div"><h3 className="related-list">Your Outfit</h3></Typography>
      <ClickTracker element="outfits-carousel" module="related-products">
        <div className="related-carousel">
          <Carousel cols={4} rows={1} gap={5} >
            <Carousel.Item>
              <div className="outfit-add" >
                <Typography component="div" style={{ marginBottom: '12px', color: '#1976D2', fontWeight: '400' }}>
                  Add to your outfits
                </Typography>
                <ClickTracker eventName="addOutfits">
                  <div>
                    <Button variant="contained" aria-label="addToOutfit" onClick={handleAddClick}><AddIcon aria-label="addToOutfit" /></Button>
                  </div>
                </ClickTracker >
              </div>
            </Carousel.Item>
            {outfits ? outfits.map((product, i) => <Carousel.Item key={i}><RelatedProduct carousel={"outfits"} info={product} current={props.current} remove={handleRemoveClick} productChange={props.productChange} /> </Carousel.Item>) : null}
          </Carousel>
        </div>
      </ClickTracker >
    </div>
  )
}

export default RelatedProductsList;