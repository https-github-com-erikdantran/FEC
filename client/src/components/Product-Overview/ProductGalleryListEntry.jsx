import React from 'react';
import axios from 'axios';

class ProductGalleryListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }




  render() {
    //console.log('this props style name', this.props.style.name)
    return (
      <div>
        <div onClick={(e) => this.props.handleClickName(e, this.props.style.photos, this.props.style.original_price, this.props.style.sale_price, this.props.style.skus)}>
          <div>
            {this.props.style.name}
          </div>
        </div>
      </div>
    )
  }
}

export default ProductGalleryListEntry