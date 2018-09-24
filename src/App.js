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
        totalAmount:0,
		totalAmountItem:0
	}
	this.handleAddToCart= this.handleAddToCart.bind(this);
	this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
	this.totalAmount = this.totalAmount.bind(this);
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
  saveStateToLocalStorage() {
	for (let key in this.state) {
		localStorage.setItem(key, JSON.stringify(this.state[key]));
	}
}
  hydrateStateWithLocalStorage() {
	// for all items in state
	for (let key in this.state) {
	  // if the key exists in localStorage
		if (localStorage.hasOwnProperty(key)) {
			// get the key's value from localStorage
			let value = localStorage.getItem(key);
			// parse the localStorage string and setState
			try {
				value = JSON.parse(value);
				this.setState({ [key]: value });
			} catch (e) {
				// handle empty string
				this.setState({ [key]: value });
			}
		}
	}
  }

handleAddToCart(selectedProducts){
	let cartItem = this.state.cart;
	let productID = selectedProducts.id;
	let productQty = selectedProducts.qty;
	let index = cartItem.findIndex(x => x.id === productID);
	if(cartItem[index]){
		cartItem[index].qty = cartItem[index].qty + productQty;
		this.setState({cart:cartItem});
	}else{
		cartItem.push(selectedProducts);
	}
    this.setState(prevState=>({
        itemsAdd:prevState.cart.length
    }));
    console.log(this.state.cart.length);
	this.totalAmount(this.state.cart);
	localStorage.setItem("cart", JSON.stringify(this.state.cart));
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
	this.setState(prevState=>({
        itemsAdd:prevState.cart.length
	}));
  console.log(this.state.cart.length);
	this.totalAmount(this.state.cart);
	localStorage.setItem("cart", JSON.stringify(this.state.cart));
}
totalAmount(){
	let cart = this.state.cart ;
	let sumTotal= 0;
	for(let i = 0 ; cart.length > i ; i++ ) {

		sumTotal += cart[i].price * cart[i].qty;
	}
	console.log(` ${cart}`);
	this.setState({
		totalAmount:sumTotal
	})
    // localStorage.setItem("totalAmount", JSON.stringify(this.state.totalAmount));
}

componentDidMount(){
    this.getProducts();
    this.hydrateStateWithLocalStorage();
    console.log("componentDid" + this.state.totalAmount);
    console.log(this.state.cart);
}

componentWillUnmount() {
	this.saveStateToLocalStorage();
}
    componentWillUpdate(nextProps, nextState){
        localStorage.setItem('totalAmount',nextState.totalAmount);
        console.log("WillUpdate currentLanguage "+nextState.totalAmount);
    }
render() {
    console.log(this.state.cart);
	return (
		<div className="container">
			<Header 
			itemsAdd={this.state.cart.length}
			cart={this.state.cart}
			removeItems={this.handleRemoveProduct}
			totalAmount={this.state.totalAmount}
			/>

			<Products 
			data={this.state.data}
			addToCart={this.handleAddToCart}
			productQuantity={this.state.quantity}
			/>
		</div>
	);
  }
}

export default App;
