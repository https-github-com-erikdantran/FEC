import React from 'react';
import axios from 'axios';
import Carousel from 'react-grid-carousel';
import ProductPage from './Product-Overview/ProductPage.jsx';
import RelatedProduct from './RelatedProducts/RelatedProduct.jsx';
import NavBar from './NavBar.jsx';
import CartContext from './CartContext.jsx';
import OutfitContext from './OutfitContext.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      productCarouselInfo: [],
      view: 'home',
      product_id: null,
      outfits: [],
      cart: []
    }

    this.addToCart = this.addToCart.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.handleOutfitChange = this.handleOutfitChange.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
  }

  componentDidMount() {
    this.getProducts()
  }

  addToCart(item) {
    this.setState({ cart: [...this.state.cart, item] })
    alert('Added to Cart!')
  }

  getProducts() {
    axios.get('/api/products')
      .then(results => {
        this.setState({
          products: results.data
        })
        let IDs = [];
        results.data.forEach(product => IDs.push(product.id))
        axios.post('/api/products/outfit', IDs)
          .then(results => {
            this.setState({
              productCarouselInfo: results.data
            })
          })
      })
  }

  handleHomeClick() {
    this.setState({
      view: 'home',
      product_id: null
    })
  }

  handleProductClick(id) {
    this.setState({
      view: 'product',
      product_id: id
    })
  }

  handleOutfitChange(command, id) {
    if (command === 'add') {
      this.setState({ outfits: [...this.state.outfits, id] });
    } else if (command === 'remove') {
      this.setState({ outfits: this.state.outfits.filter(index => id !== index.id) })
    }
  }

  render() {
    if (this.state.view === 'home' && this.state.productCarouselInfo.length > 0) {
      return (
        <>
          <CartContext.Provider value={this.state.cart}>
            <NavBar home={this.handleHomeClick} />
          </CartContext.Provider>
          <h2>Fall 2021 Collection</h2>
          <Carousel cols={4} rows={2} gap={5} style={{ 'margin-top': '50px' }}>
            {this.state.productCarouselInfo ? this.state.productCarouselInfo.map((product, i) => <Carousel.Item key={i}><RelatedProduct className="app-carousel-product" info={product} productChange={this.handleProductClick} /> </Carousel.Item>) : null}
          </Carousel>
        </>
      )
    } else if (this.state.view === 'product') {
      return (
        <>
          <CartContext.Provider value={this.state.cart}>
            <NavBar home={this.handleHomeClick} />
          </CartContext.Provider>
          <OutfitContext.Provider value={this.state.outfits}>
            <ProductPage id={this.state.product_id} handleOutfitChange={this.handleOutfitChange} addToCart={this.addToCart} productChange={this.handleProductClick} />
          </OutfitContext.Provider>
        </>
      )
    } else {
      return (
        <div className='jackie-chan'>
          <img src='spiffygif_46x46.gif' />
        </div>
      )
    }
  }
}