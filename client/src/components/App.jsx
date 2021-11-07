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
      product_id: null,
      outfit: [42369, 42366],
      cart: []
    }
    this.addToCart = this.addToCart.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.handleOutfitAdd = this.handleOutfitAdd.bind(this);
  }

  componentDidMount() {
    this.getProducts()
  }

  addToCart(item) {
    this.setState({cart: item})
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

  handleOutfitAdd(command, id) {
    if (command === 'add') { this.setState([...this.state.outfit, id]); }
    if (command === 'remove') { this.setState(this.state.outfit.filter(index => id !== index)) }
  }

  render() {
    // console.log('shopping cart: ', this.state.cart)
    if (this.state.view === 'home' && this.state.products !== null) {
      return (
        this.state.products.map((product, i) => { return <ProductInfo handleProductClick={this.handleProductClick} key={i} product={product} /> })
      )
    } else if (this.state.view === 'product') {
      return (
        <ProductPage id={this.state.product_id} outfit={this.state.outfit} handleOutfitAdd={this.handleOutfitAdd} addToCart={this.addToCart}/>
      )
    } else {
      return (
        <div>
          Jackie Chan
          <img src='spiffygif_46x46.gif'/>
        </div>
      )
    }
  }
}