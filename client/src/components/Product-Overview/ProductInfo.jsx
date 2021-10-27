import React from 'react';
import axios from 'axios';

export default class ProductInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }



  render() {
    return (
      <div onClick={() => this.props.handleProductClick(this.props.product.id)}>
        {this.props.product.name}
      </div>
    )
  }



}