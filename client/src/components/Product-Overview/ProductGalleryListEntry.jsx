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
      <div onClick={(e) => this.props.handleClickName(e, this.props.style.photos)}>
        {this.props.style.name}
      </div>
    )
  }
}

export default ProductGalleryListEntry