import React from 'react';
import axios from 'axios';
import Carousel from 'react-grid-carousel';
import ProductInfo from './Product-Overview/ProductInfo.jsx';
import ProductPage from './Product-Overview/ProductPage.jsx';
import RelatedProduct from './RelatedProducts/RelatedProduct.jsx';
import NavBar from './NavBar.jsx';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      productCarouselInfo: [],
      view: 'home',
      product_id: null,
      outfit: [42369, 42366],
      cart: []
    }
    // var cartItemEntry = {
    //   Style: styleName,
    //   Size: size,
    //   Quantity: initialQuantity
    // }
    this.addToCart = this.addToCart.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.handleOutfitAdd = this.handleOutfitAdd.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
  }

  componentDidMount() {
    this.getProducts()
  }

  // this would delete the current cart instead of add I think
  addToCart(item) {
    this.setState({ cart: item })
  }

  getProducts() {
    axios.get('/api/products')
      .then(results => {
        this.setState({
          products: results.data
        })
        let IDs = [];
        results.data.forEach(product => IDs.push(product.id))
        console.log(IDs)
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
    console.log('id', id)
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
    if (this.state.view === 'home' && this.state.productCarouselInfo.length > 0) {
      return (
        <>
          <NavBar home={this.handleHomeClick}/>
          <h2 className="products">Fall 2021 Collection X Hack Reactor</h2>
          <Carousel cols={4} rows={2} gap={5} style={{ 'margin-top': '50px' }}>
            {this.state.productCarouselInfo ? this.state.productCarouselInfo.map((product, i) => <Carousel.Item key={i}><RelatedProduct info={product} productChange={this.handleProductClick} /> </Carousel.Item>) : null}
          </Carousel>
        </>
      )
    } else if (this.state.view === 'product') {
      return (
        <>
          <NavBar home={this.handleHomeClick}/>
          <ProductPage id={this.state.product_id} outfit={this.state.outfit} handleOutfitAdd={this.handleOutfitAdd} addToCart={this.addToCart} productChange={this.handleProductClick} />
        </>
        // remove the porduct Change prop later since it doesnt work when passed down
      )
    } else {
      return (
        <div>
          Jackie Chan
          <img src='spiffygif_46x46.gif' />
        </div>
      )
    }
  }
}