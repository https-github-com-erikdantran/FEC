//react, axios, and component imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductGalleryListEntry from './ProductGalleryListEntry.jsx';
//imagegallery library imports
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import styles from '../../../dist/styles.css'
//react mui select button imports
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//share feature icon import
import { SocialIcon } from 'react-social-icons';


const ProductGallery = (props) => {
  const [productGallery, setProductGallery] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [styleName, setStyleName] = useState('');
  const [stylePrice, setStylePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [size, setSize] = useState('');
  const [sizeSelection, setSizeSelection] = useState([]);
  const [sizeLoaded, setSizeLoaded] = useState(false);
  const [quantity, setQuantity] = useState('')
  const [outOfStock, setOutOfStock] = useState(false)
  const [selectQuantityList, setSelectQuantityList] = useState([])
  const [initialQuantity, setInitialQuantity] = useState(1)
  const [metadata, setMetadata] = useState({metadata: null})
  const [openSizeSelection, setOpenSizeSelection] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    axios.get(`/api/products/${props.id}/styles`)
      .then(results => {
        setProductGallery(results.data);
        //console.log('product results: ', results)
        const skuSize = Object.values(results.data.results[0].skus)
        //console.log('skuSize: ', skuSize)
        if (props.id === 42367) {
          if (skuSize[0].size === null) {
            setOutOfStock(true)
          }
          setSizeSelection(skuSize)
          setImageList(sunglassImage)
          setStylePrice(results.data.results[0].original_price)
        } else {
          setStyleName(results.data.results[0].name)
          setSizeSelection(skuSize)
          const imageListEntry = photoMapping(results.data.results[0].photos)
          setImageList(imageListEntry)
          setStylePrice(results.data.results[0].original_price)
        }
      })

    // axios.get(`/api/products/${props.id}`)
    //   .then(results => {
    //     console.log('product overview results: ', results)
    //   })

    axios.post('/api/reviews/meta/', {params: {product_id: props.id}})
      .then(results => setMetadata({metadata: results.data}))



  }, []);

  const photoMapping = (photoList) => {
    const imageListEntry = [];
    photoList.map(item => {
      const singleImage = {original: item.url, thumbnail: item.thumbnail_url}
      imageListEntry.push(singleImage)
    })
    return imageListEntry
  }



  const handleClickName = (e, imageList, stylePrice, salePrice, skus, styleName) => {
    e.preventDefault();
    if (props.id === 42367) {
      setStyleName(styleName)
      setSizeSelection(Object.values(skus))
      setStylePrice(stylePrice)
      setSalePrice(salePrice)
      setImageList(sunglassImage)
    } else {
      setStyleName(styleName)
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
    //console.log('e.target: ', e.target.value)
    if (e.target.value === null) {
      setSize('')
      setOutOfStock(true)
    } else {
      setOpenSizeSelection(false);
      setInitialQuantity(1)
      setSize(e.target.value)
      //console.log(e.target.value)
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
    setQuantity(e.target.value)
  }


  //console.log('this is metadata: ', metadata.metadata)
  let getRating = function (ratings) {
    let totalScore = 0;
    let numOfScores = 0;
    for (let key in ratings) {
      numOfScores += ratings[key] * 1;
      totalScore += ratings[key] * key;
    }
    let rating = Math.round(10 * totalScore / numOfScores) / 10;
    let percentRating = (rating / 5) * 100 + '%'
    return { rating, percentRating }
  }


  let starWidth = { width: '0%' };
  if (metadata.metadata !== null) {
    let { rating, percentRating } = getRating(metadata.metadata.ratings)
    starWidth = { width: percentRating };
  }

  const handleClose = () => {
    setOpenSizeSelection(false);
  }
  const handleOpen = () => {
    setOpenSizeSelection(true);
  }


  const handleAddToCart = () => {
    // console.log('size: ', size)
    // console.log('quantity: ', initialQuantity)
    // console.log('style name: ', styleName)
    var cartItemEntry = {
      Style: styleName,
      Size: size,
      Quantity: initialQuantity
    }
    cartItems.push(cartItemEntry)
    return props.addToCart(cartItems)
  }

  // console.log('this is size: ', size)
  // let imageGallery = useRef();
  const myImageRef = React.createRef();

  const fullscreen = () => {
    if (isFullscreen === true) {
      setIsFullscreen(false)
      //myImageRef.current.exitFullScreen()
    } else {
      setIsFullscreen(true)
      myImageRef.current.fullScreen()
    }
  }



return (
  <div className='Main-Display'>

    <div className="Image-Gallery">
      <div>
        {productGallery ? <ImageGallery  ref={myImageRef} showBullets={true} onClick={fullscreen} useBrowserFullscreen={false} infinite={false} showPlayButton={false} thumbnailPosition='left' items={imageList} /> : null}
      </div>
    </div>

    <div className="Product-Detail">
      <div className="starsAboveCategory">
        {metadata.metadata !== null && <div className="stars" style={{"fontSize": "10pt"}}>
          <div className="percent" style={starWidth}></div>
        </div>
        }
      </div>
      <span className='reviews-link'>
      &nbsp;<a href='#reviews'>Read all reviews</a>
      </span><br/>
      <div className='product-name'>
        <span><em>{props.productInfo.category}</em></span>
        <h1>{props.productInfo.name}</h1>
      </div>
        {salePrice ? <div><span style={{color: "red"}}> ${salePrice}</span> <strike>${stylePrice}</strike></div> : <span> ${stylePrice}</span>}
      <h4>Select Style</h4>
      <ul>
        {(productGallery.results || []).map((style, key) => {
          return <ProductGalleryListEntry key={style.style_id} style={style} handleClickName={handleClickName}/>
        })}
      </ul>
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

                open={openSizeSelection}
                onClose={handleClose}
                onOpen={handleOpen}

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
      {outOfStock === false && !size && <button onClick={handleOpen} >
        Add to Cart +
      </button>}
      {outOfStock === false && size && <button onClick={handleAddToCart} >
        Add to Cart +
      </button>}
      <div>
        <SocialIcon url="https://facebook.com/" target="_blank"/>
        <SocialIcon url="https://twitter.com/" target="_blank"/>
        <SocialIcon url="https://pinterest.com/" target="_blank"/>
      </div>
    </div>

    <div className="Description">
      <div>
        {props.productInfo.description}
      </div>
    </div>

  </div>
  )



  // return (
  //   <div>
  //     <span>
  //       <a href='#reviews'>Read all reviews</a>
  //     </span>
  //     <div className="starsAboveCategory">
  //     {metadata.metadata !== null && <div className="stars" style={{"fontSize": "10pt"}}>
  //       <div className="percent" style={starWidth}></div>
  //     </div>
  //     }
  //     </div>
  //     <div>
  //       {props.productInfo.category}
  //     </div>
  //     <div>
  //       {props.productInfo.name}
  //     </div>
  //     <div>
  //       {salePrice ? '$' + salePrice + ' ' + '$' + stylePrice : '$' + stylePrice}
  //     </div>
  //     <div>
  //       <h4>Select Style</h4>
  //       <ul>
  //         {(productGallery.results || []).map((style, key) => {
  //           return <ProductGalleryListEntry key={style.style_id} style={style} handleClickName={handleClickName}/>
  //         })}
  //       </ul>
  //       <div>
  //         {productGallery ? <ImageGallery ref={myImageRef} onClick={fullscreen} useBrowserFullscreen={false} infinite={false} showPlayButton={false} thumbnailPosition='left' items={imageList} /> : null}
  //       </div>
  //     </div>
  //     {outOfStock === true && <div>
  //       <Box sx={{ minWidth: 120 }}>
  //         <FormControl fullWidth>
  //           <InputLabel id="demo-simple-select-label">OUT OF STOCK</InputLabel>
  //           <Select defaultValue="">
  //           </Select>
  //         </FormControl>
  //       </Box>
  //     </div>}
  //     <div>
  //       {outOfStock === false && <div>
  //         <Box sx={{ minWidth: 120 }}>
  //           <FormControl fullWidth>
  //             <InputLabel id="demo-simple-select-label">Select Size</InputLabel>
  //             <Select
  //               data-testid='testSize'
  //               labelId="demo-simple-select-label"
  //               id="demo-simple-select"
  //               value={size}
  //               label="Size"

  //               open={openSizeSelection}
  //               onClose={handleClose}
  //               onOpen={handleOpen}

  //               onChange={handleSizeChange}
  //                >
  //               {sizeSelection.map((item, index) => {
  //                 return (
  //                   <MenuItem onClick={() => onClick(item.quantity)} value={item.size} key={index} >
  //                     {item.size}
  //                   </MenuItem>
  //                 )
  //               })}
  //             </Select>
  //           </FormControl>
  //         </Box>
  //        </div>}
  //     </div>
  //     {sizeLoaded === false && outOfStock === false && <div>
  //       <Box sx={{ minWidth: 120 }}>
  //         <FormControl fullWidth>
  //           <InputLabel id="demo-simple-select-label">-</InputLabel>
  //           <Select defaultValue="">
  //           </Select>
  //         </FormControl>
  //       </Box>
  //     </div>}
  //     {sizeLoaded === true && outOfStock === false && <div>
  //       <Box sx={{ minWidth: 120 }}>
  //         <FormControl fullWidth>
  //           <InputLabel id="demo-simple-select-label"></InputLabel>
  //           <Select
  //             data-testid='testQuantity'
  //             labelId="demo-simple-select-label"
  //             id="demo-simple-select"
  //             value={initialQuantity}
  //             label="quantity"
  //             onChange={handleQuantityChange}
  //             defaultValue={quantity}
  //             >
  //             {selectQuantityList.map(item => {
  //               return item
  //             })}
  //           </Select>
  //         </FormControl>
  //       </Box>
  //     </div>}
  //     {outOfStock === false && !size && <button onClick={handleOpen} >
  //       Add to Cart +
  //     </button>}
  //     {outOfStock === false && size && <button onClick={handleAddToCart} >
  //       Add to Cart +
  //     </button>}
  //     <div>
  //       <SocialIcon url="https://facebook.com/" target="_blank"/>
  //       <SocialIcon url="https://twitter.com/" target="_blank"/>
  //       <SocialIcon url="https://pinterest.com/" target="_blank"/>
  //     </div>
  //     <div>
  //     {props.productInfo.description}
  //     </div>
  //   </div>
  // )
}


export default ProductGallery;

