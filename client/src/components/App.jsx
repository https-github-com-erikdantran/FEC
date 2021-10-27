import React from 'react';
import axios from 'axios';
import ProductInfo from './Product-Overview/ProductInfo.jsx';
import ProductPage from './Product-Overview/ProductPage.jsx';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      view: 'home',
      product_id: null
    }

    this.handleProductClick = this.handleProductClick.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts() {
    axios.get('/api/products')
      .then(results => {
        this.setState({
          products: results.data
        })
      })
  }

  handleProductClick(id) {
    this.setState({
      view: 'product',
      product_id: id
    })
  }


  render() {


    if (this.state.view === 'home' && this.state.products !== null) {
      return (
        this.state.products.map((product, i) => { return <ProductInfo handleProductClick={this.handleProductClick} key={i} product={product} /> })
      )
    } else if (this.state.view === 'product') {
      return (
        <ProductPage id={this.state.product_id} />
      )
    } else {
      return (
        <div>
          <img src='spiffygif_46x46.gif'/>
        </div>
      )
    }
  }
}