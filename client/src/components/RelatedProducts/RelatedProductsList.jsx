import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProduct from './RelatedProduct.jsx';
import Carousel from 'react-grid-carousel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import ClickTracker from '../ClickTracker.jsx';

const RelatedProductsList = (props) => {
  const [related, setRelated] = useState(null);
  useEffect(() => {
    axios.get(`/api/products/${props.id}/related`)
      .then(results => { setRelated(results.data) })
  }, []);


  const [outfitInfo, setOutfitInfo] = useState(null)
  useEffect(() => {
    axios.post('api/products/outfit', props.outfit)
      .then(results => {
        setOutfitInfo(results.data)
      })
  }, [])

  const handleAddClick = (e) => {
    let saved = false;
    outfitInfo.forEach(item => { if (item.id === props.current.id) { saved = true } })
    if (!saved) {
      props.setOutfit('add', props.current.id)
      axios.post('api/products/outfit', [props.current.id])
        .then(results => { setOutfitInfo([...outfitInfo, results.data[0]]) })
    } else {
      alert('This item is already in your outfits')
    }
  }

  const handleRemoveClick = (id) => {
    // removes from top level app outfits state
    props.setOutfit('remove', id);
    // removes from current page outfitsInfo
    setOutfitInfo(outfitInfo.filter(info => info.id !== id))
  }


  return (
    <div className="related-products">
      <Typography component="div"><h3 className="related-list">Related Products</h3></Typography>
      <ClickTracker element="related-carousel" module="related-products">
        <div className="related-carousel">
          <Carousel cols={4} rows={1} gap={5} >
            {related ? related.map((product, i) => <Carousel.Item key={i}><RelatedProduct carousel={"related"} info={product} current={props.current} /> </Carousel.Item>) : null}
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
                <Typography component="div">
                  Add to your Outfits
                </Typography>
                <ClickTracker eventName="addOutfits">
                <div>
                  <Button variant="contained" aria-label="addToOutfit" onClick={handleAddClick}><AddIcon aria-label="addToOutfit" /></Button>
                </div>
                </ClickTracker >
              </div>
            </Carousel.Item>
            {outfitInfo ? outfitInfo.map((product, i) => <Carousel.Item key={i}><RelatedProduct carousel={"outfits"} info={product} current={props.current} remove={handleRemoveClick} /> </Carousel.Item>) : null}
          </Carousel>
        </div>
      </ClickTracker >
    </div>
  )
}

export default RelatedProductsList;