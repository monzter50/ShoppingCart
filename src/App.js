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
	itemsAdd:0,
	totalAmount:0,
	totalAmountItem:0
    }
    this.updateQty = this.updateQty.bind(this);
    this.handleAddToCart= this.handleAddToCart.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.totalAmount = this.totalAmount.bind(this);
//     this.totalAmountItem = this.totalAmountItem.bind(this);
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
	this.totalAmount(this.state.cart);
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
	this.totalAmount(this.state.cart);
}
totalAmount(){
	let cart = this.state.cart;
	let sumTotal=0;
	for(let i = 0 ; cart.length > i ; i++ ) {
		sumTotal += cart[i].price * cart[i].qty;
	}
	this.setState({
		totalAmount:sumTotal
	})
	console.log(`suma total: $ ${this.state.totalAmount}`);
}
// totalAmountItem(){
// 	let cart = this.state.cart;
// 	let sumTotal=0;
// 	let index = cart.findIndex(x => x.id === productID);
// 	for(let i = 0 ; cart.length > i ; i++ ) {
// 		sumTotal = cart[i].price * cart[i].qty;
// 	}
// 	this.setState({
// 		totalAmountItem:sumTotal
// 	})
// }
componentWillMount() {
	this.getProducts();
}
render() {
	return (
		<div className="container">
			<Header 
			itemsAdd={this.state.itemsAdd}  
			cart={this.state.cart}
			removeItems={this.handleRemoveProduct}
			totalAmount={this.state.totalAmount}
			/>

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
