import React,{Component} from 'react';
import Product from './Product';
class Products extends Component {
    constructor(props){
        super(props);
      

    }
    // addCart(props){
    //     var itemsCart = [...this.state.cart];
    //     // if(itemsCart[index]){
    //     //     console.log()
    //     // }
    //     console.log(`items del carrito: ${itemsCart[index]}`);
    //     console.log(index);
    //     this.setState({
    //         itemsCart
    //     })
    // }
    render(){
        return(
            <div className="products-container">
                {
                    this.props.data.map(product =>  {
                        return(
                            <Product
                            key={product.id}
                            idProduct={product.id}
                            image={product.image} 
                            name={product.name}
                            category={product.category}
                            price={product.price}
                            addToCart={this.props.addToCart}
                            updateQty={this.props.updateQty}
                            productQuantity={this.props.productQuantity}
                            />  
                        )
                                    
                    })
                }
            </div>
        )
    }
}
export default Products;