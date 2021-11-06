import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import ProductGalleryListEntry from './ProductGalleryListEntry.jsx';
import "react-image-gallery/styles/css/image-gallery.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const ProductGallery = (props) => {
  const [productGallery, setProductGallery] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [stylePrice, setStylePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [size, setSize] = useState('');
  const [sizeSelection, setSizeSelection] = useState([]);
  const [sizeLoaded, setSizeLoaded] = useState(false);
  const [quantity, setQuantity] = useState('')
  const [outOfStock, setOutOfStock] = useState(false)
  const [selectQuantityList, setSelectQuantityList] = useState([])
  const [initialQuantity, setInitialQuantity] = useState('1')



  useEffect(() => {
    axios.get(`/api/products/${props.id}/styles`)
      .then(results => {
        setProductGallery(results.data);
        console.log('product results: ', results)
        const skuSize = Object.values(results.data.results[0].skus)
        console.log('skuSize: ', skuSize)
        if (props.id === 42367) {
          if (skuSize[0].size === null) {
            setOutOfStock(true)
          }
          setSizeSelection(skuSize)
          setImageList(sunglassImage)
          setStylePrice(results.data.results[0].original_price)
        } else {
          setSizeSelection(skuSize)
          const imageListEntry = photoMapping(results.data.results[0].photos)
          setImageList(imageListEntry)
          setStylePrice(results.data.results[0].original_price)
        }
      })

    axios.get(`/api/products/${props.id}`)
      .then(results => {
        console.log('product overview results: ', results)
      })
  }, []);

  const photoMapping = (photoList) => {
    const imageListEntry = [];
    photoList.map(item => {
      const singleImage = {original: item.url, thumbnail: item.thumbnail_url}
      imageListEntry.push(singleImage)
    })
    return imageListEntry
  }



  const handleClickName = (e, imageList, stylePrice, salePrice, skus) => {
    e.preventDefault();
    if (props.id === 42367) {
      setSizeSelection(Object.values(skus))
      setStylePrice(stylePrice)
      setSalePrice(salePrice)
      setImageList(sunglassImage)
    } else {
      setSizeSelection(Object.values(skus))
      setStylePrice(stylePrice)
      setSalePrice(salePrice)
      const imageListEntry = photoMapping(imageList)
      setImageList(imageListEntry)
      }
  }

  const sunglassImage = [{
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/'
  }]

  const handleSizeChange = (e) => {
    console.log('e.target: ', e.target.value)
    if (e.target.value === null) {
      setInitialQuantity('1')
      setSize('')
      setOutOfStock(true)
    } else {
      setInitialQuantity('1')
      setSize(e.target.value)
      console.log(e.target.value)
      setSizeLoaded(true)
    }
  }


  const onClick = (quantity) => {
    const menuItemQuantity = [];
    for (var i = 1; i <= quantity; i++) {
      if (i <= 15) {
        menuItemQuantity.push(<MenuItem value={i} key={i}>{i.toString()}</MenuItem>);
      } else {
        break;
      }
    }
    setSelectQuantityList(menuItemQuantity)
  }

  const handleQuantityChange = (e) => {
    setInitialQuantity(e.target.value)
  }

  // console.log('this is size: ', size)

  return (
    <div>
      <div>
        reviews
      </div>
      <div>
        {props.productInfo.category}
      </div>
      <div>
        {props.productInfo.name}
      </div>
      <div>
        {salePrice ? '$' + salePrice + ' ' + '$' + stylePrice : '$' + stylePrice}
      </div>
      <div>
        <h4>Select Style</h4>
        <ul>
          {(productGallery.results || []).map((style, key) => {
            return <ProductGalleryListEntry key={style.style_id} style={style} handleClickName={handleClickName}/>
          })}
        </ul>
        <div>
          {productGallery ? <ImageGallery items={imageList} /> : null}
        </div>
      </div>
      {outOfStock === true && <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">OUT OF STOCK</InputLabel>
            <Select defaultValue="">
            </Select>
          </FormControl>
        </Box>
      </div>}
      <div>
        {outOfStock === false && <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Size</InputLabel>
              <Select
                data-testid='testSize'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={size}
                label="Size"
                onChange={handleSizeChange}
                 >
                {sizeSelection.map((item, index) => {
                  return (
                    <MenuItem onClick={() => onClick(item.quantity)} value={item.size} key={index} >
                      {item.size}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
         </div>}
      </div>
      {sizeLoaded === false && outOfStock === false && <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">-</InputLabel>
            <Select defaultValue="">
            </Select>
          </FormControl>
        </Box>
      </div>}
      {sizeLoaded === true && outOfStock === false && <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
              data-testid='testQuantity'
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={initialQuantity}
              label="quantity"
              onChange={handleQuantityChange}
              defaultValue={quantity}
              >
              {selectQuantityList.map(item => {
                return item
              })}
            </Select>
          </FormControl>
        </Box>
      </div>}
      <div>
        add to bag
      </div>
      <div>
        favorite
      </div>
      <div>
      {props.productInfo.description}
      </div>
    </div>
  )
}

export default ProductGallery;

// let getRating = function (ratings) {
//   let totalScore = 0;
//   let numOfScores = 0;
//   for (let key in ratings) {
//     numOfScores += ratings[key] * 1;
//     totalScore += ratings[key] * key;
//   }
//   let rating = Math.round(10 * totalScore / numOfScores) / 10;
//   let percentRating = (rating / 5) * 100 + '%'
//   return { rating, percentRating }
// }

//run getmetadatareview call and set results to a var and put var in getRating() fn
// let { rating, percentRating } = getRating(props.info.ratings)

// <div className="stars" style={{"fontSize": "10pt"}}>
//               <div className="percent" style={{ width: percentRating }}></div>
//             </div>