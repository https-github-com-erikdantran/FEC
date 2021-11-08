import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InfoPopUp from './InfoPopUp.jsx';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import CircleIcon from '@mui/icons-material/Circle';

const RelatedProduct = (props) => {

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

  let { rating, percentRating } = getRating(props.info.ratings)


  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const handleRemove = (e) => {
    props.remove(props.info.id)
  }

  return (
    <>
      <Typography component="div">
        <div className="single-related" aria-describedby={id} variant="contained">
          <div className="carousel-container">
            <img className="thumbnail" style={{ 'backgroundImage': `url(${props.info.url}` }}></img>
            {props.carousel === "related" ? <StarOutlineIcon aria-label="comparison" className="icon" onClick={handleClick} sx={{ "color": "white" }} /> : <HighlightOffIcon aria-label="remove" className="icon" onClick={handleRemove} sx={{ "fill": "white" }} />}
          </div>
          <div className="related-info">
            <p className="related-category">{props.info.category}</p>
            <div className="related-name"><b>{props.info.name}</b></div>
            <p className="related-price">${props.info.default_price}</p>
            <div className="stars" style={{ "fontSize": "10pt" }}>
              <div className="percent" style={{ width: percentRating }}></div>
            </div>
          </div>
        </div>
      </Typography>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <InfoPopUp info={props.info} current={props.current} />
      </Popover>
    </>
  )
}

export default RelatedProduct;