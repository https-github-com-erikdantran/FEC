import React from 'react';
import axios from 'axios';
import Reviews from '../Reviews/Reviews.jsx';
import RelatedProducts from '../RelatedProducts/RelatedProducts.jsx';

class ProductPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      productInfo: null
    }

    this.getProductInfo = this.getProductInfo.bind(this);
  }

  componentDidMount() {
    // place your on load requests here
    this.getProductInfo(this.props.id);
  }

  getProductInfo(id) {
    axios.get(`/api/products/${id}`)
      .then(results => {
        this.setState({
          productInfo: results.data
        })
      })

  }

  render() {
    return (
      <div>
        product page
        {/* Main Product Info */}


        {/* Related Products */}
        <RelatedProducts id={this.props.id}/>


        {/* Q&A */}


        {/* Reviews */}
        <Reviews />

      </div>
    )
  }
}

export default ProductPage;