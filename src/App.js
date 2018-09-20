import React, { Component } from 'react';
import Products from './components/Products';
import Header from './components/Header';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      data:[],
      cart:[],
      quantity: 1,
      itemsAdd:0
    }
    this.updateQty = this.updateQty.bind(this);
    this.handleAddToCart= this.handleAddToCart.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
  }
  getProducts = () =>{
   let URL ="https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";
    fetch(URL)
    .then(result =>{
      return result.json()
    })
    .then(data =>{
      this.setState({
        data:data
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }

  handleAddToCart(selectedProducts){
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let productQty = selectedProducts.qty;
    let productName= selectedProducts.name;
    let index = cartItem.findIndex(x => x.id === productID);
    if(cartItem[index]){
      cartItem[index].qty = cartItem[index].qty + productQty;
      this.setState({cart:cartItem});
    }else{
      cartItem.push(selectedProducts);
    }

    for(let i=0 ; cartItem.length > i ; i++){
      console.log(`producto:${i}-${cartItem[i].name}- qty: ${cartItem[i].qty}`);
    }
    this.setState({itemsAdd:cartItem.length});
    console.log(`id: ${productID} name: ${productName}`);
  }

  updateQty(qty){
    console.log(qty);
  }

  handleRemoveProduct(selectedProducts){
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let index = cartItem.findIndex(x => x.id === productID);
    if(cartItem[index]){
      cartItem.splice(index,1);
      this.setState({cart:cartItem});
    }else{
      return this.state.cart;
    }
    console.log(`id: ${productID}`);
    for(let i=0 ; cartItem.length > i ; i++){
      console.log(`producto:${i}-${cartItem[i].id}`);
    }
    this.setState({itemsAdd:cartItem.length});

  }
  componentWillMount() {
    this.getProducts();
  }
  render() {
    return (
      <div className="container">

        <Header 
        itemsAdd={this.state.itemsAdd}  
        cart={this.state.cart}
        removeItems={this.handleRemoveProduct}/>

        <Products 
        data={this.state.data}
        addToCart={this.handleAddToCart}
        updateQty={this.updateQty}
        productQuantity={this.state.quantity}
        />
      
      </div>
    );
  }
}

export default App;
