import React,{Component} from 'react';

class Product extends Component{
    constructor(props){
        super(props);
        this.state = {
            isAdded:false,
            isSelectItem:{},
            qty:this.props.productQuantity
        }
    }
    addToCart(name,id,category,price,image,qty){
        this.setState(
            {
                isSelectItem:{
                    name,
                    id,
                    category,
                    price,
                    image,
                    qty
                }
            },
            function(){
                this.props.addToCart(this.state.isSelectItem);
            }
        );
        this.setState(
            {
              isAdded: true
            }
        );
    }
    incrementCount(count){
        this.setState(prevState => ({
            qty:prevState.qty + count
        }))

    }
    decrementCount(count){
        if(this.state.qty <= 1){
           return this.state.qty;
        }else{
            this.setState(prevState => ({
                qty:prevState.qty + count
            }),

            );
        }
        
    }

    render(){

        let image = this.props.image;
        let category = this.props.category;
        let name = this.props.name;
        let price = this.props.price;
        let id = this.props.idProduct;
        let qty=this.state.qty;
        return(
            <div id={this.props.idProduct} className="card-section">
                <div className={"card-image"}>
                    <img src={this.props.image}/>
                </div>
                <div>
                    <button onClick={this.incrementCount.bind(this,1)}>+</button>
                    <span>{this.state.qty}</span>
                    <button onClick={this.decrementCount.bind(this,-1)}>-</button> 
                </div>
                <div className="card-content">
                    <h1>{this.props.name}</h1>
                    <p>{this.props.category}</p>
                    <span>${this.props.price}</span>
                </div>
                <div>
                <button onClick={this.addToCart.bind(this,name,id,category,price,image,qty)}>{!this.state.isAdded?'Add Cart': 'On Cart'}</button>
                </div>
            </div>
        )
    }
}
export default Product;