import React from 'react';
import axios from 'axios';

class ProductGalleryListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }



  render() {
    let selectedStyle = this.props.selectedStyle === this.props.style.name ?
    {
      borderStyle: 'solid',
      borderColor: '#2A8387',
      borderWidth: '3px'
    } :
    {
      borderStyle: 'solid',
      borderColor: 'white',
      borderWidth: '3px'
    };
    let style = {'backgroundImage': `url(${this.props.style.photos[0].thumbnail_url})`, borderStyle: selectedStyle.borderStyle, borderColor: selectedStyle.borderColor, borderWidth: selectedStyle.borderWidth}
    if(this.props.i === 3 || this.props.i === 7) {
      return (
        <React.Fragment>
          <div  className="circle" onClick={(e) => this.props.handleClickName(e, this.props.style.photos, this.props.style.original_price, this.props.style.sale_price, this.props.style.skus, this.props.style.name)}>
            <span style={style} className="circle" role='img' aria-label='select style photos'></span>
          </div> <br/>
        </React.Fragment>
      )
    }
    return (
      <div className="circle" onClick={(e) => this.props.handleClickName(e, this.props.style.photos, this.props.style.original_price, this.props.style.sale_price, this.props.style.skus, this.props.style.name)}>
        <span style={style} className="circle" role='img' aria-label='select style photos'></span>
      </div>
    )
  }
}

export default ProductGalleryListEntry