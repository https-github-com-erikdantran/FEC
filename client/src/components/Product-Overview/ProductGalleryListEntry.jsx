import React from 'react';
import axios from 'axios';

class ProductGalleryListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }




  render() {
    let style = {'backgroundImage': `url(${this.props.style.photos[0].thumbnail_url})`}
    if(this.props.i === 3) {
      return (
        <React.Fragment>
          <div style={style} className="circle" onClick={(e) => this.props.handleClickName(e, this.props.style.photos, this.props.style.original_price, this.props.style.sale_price, this.props.style.skus, this.props.style.name)}>
          </div> <br/>
        </React.Fragment>
      )
    }
    return (
      <div style={style} className="circle" onClick={(e) => this.props.handleClickName(e, this.props.style.photos, this.props.style.original_price, this.props.style.sale_price, this.props.style.skus, this.props.style.name)}>
      </div>
    )
  }
}

export default ProductGalleryListEntry