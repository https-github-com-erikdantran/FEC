import React from 'react';
import axios from 'axios';
import Carousel from 'react-grid-carousel';
import ProductInfo from './Product-Overview/ProductInfo.jsx';
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
      outfits: [{
        "id": 42369,
        "campus": "hr-lax",
        "name": "Slacker's Slacks",
        "slogan": "Comfortable for everything, or nothing",
        "description": "I'll tell you how great they are after I nap for a bit.",
        "category": "Pants",
        "default_price": "65.00",
        "created_at": "2021-08-13T14:39:39.968Z",
        "updated_at": "2021-08-13T14:39:39.968Z",
        "features": [{ "feature": "Fabric", "value": "99% Cotton 1% Elastic" }, { "feature": "Cut", "value": "Loose" }],
        "thumbnail_url": "https://images.unsplash.com/photo-1554260570-9140fd3b7614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        "url": "https://images.unsplash.com/photo-1554260570-9140fd3b7614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        "product_id": "42369",
        "ratings": { "2": "1", "3": "1", "4": "1", "5": "2" },
        "recommended": { "false": "2", "true": "3" },
        "characteristics": { "Fit": { "id": 142041, "value": "3.5000000000000000" }, "Length": { "id": 142042, "value": "3.5000000000000000" }, "Comfort": { "id": 142043, "value": "3.5000000000000000" }, "Quality": { "id": 142044, "value": "3.5000000000000000" } }
      }],
      cart: [
        {
          id: 42670,
          name: 'Camo Onesie',
          style: 'Forest Green & Black',
          price: 140.00,
          quantity: 1,
          size: 'M'
        },
        {
          id: 42670,
          name: 'Camo Onesie',
          style: 'Forest Green & Black',
          price: 100.99,
          quantity: 2,
          size: 'L'
        }
      ]
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
            {this.state.productCarouselInfo ? this.state.productCarouselInfo.map((product, i) => <Carousel.Item key={i}><RelatedProduct info={product} productChange={this.handleProductClick} /> </Carousel.Item>) : null}
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
            <ProductPage id={this.state.product_id} outfit={this.state.outfit} handleOutfitChange={this.handleOutfitChange} addToCart={this.addToCart} productChange={this.handleProductClick} />
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