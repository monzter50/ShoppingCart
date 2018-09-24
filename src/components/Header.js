import  React,{Component} from 'react';
import ItemCart from './ItemCart';
import './Header.css';
class Header extends Component{
    constructor(props){
        super(props);
       this.state = {
           total:this.props.totalAmount,
           toggle:false
       }
     this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState(prevState=>({
                toggle:!prevState.toggle
            })
        );
    }

    render(){
        return(
            <header className="main-header" >
            <div id="main-nav" className="main-nav">
                <a to={'/'} className={"navbar-brand "}>Navbar</a>
               
            </div>
            <nav id="navbar" className={"navbar "}>
                <ul className="navbar-nav">
                    <li className="navigation-item"><a className="navigation-link" onClick={this.handleClick} >Cart <span>{this.props.itemsAdd}</span> </a></li>
                   
                </ul>
            </nav>
            <div id="cd-shadow-layer"></div>

            <div id="cd-cart" className={this.state.toggle?"show":""}>
                <h2>Cart</h2>
                <div className="card-content">
                    <ul className="cd-cart-items">
                        {
                            this.props.cart.map(itemsCart =>{
                                return(
                                    <ItemCart
                                        key={itemsCart.id}
                                        id={itemsCart.id}
                                        img={itemsCart.img}
                                        qty={itemsCart.qty}
                                        name={itemsCart.name}
                                        price={itemsCart.price}
                                        removeItems={this.props.removeItems}
                                    />    
                                )
                            })
                        
                        }
                        
                    </ul> 
                    
                    <div className="cd-cart-total">
                    {/* {   this.props.totalAmount <= 0 ? <p>Nothing...</p>: */
                        <p>Total <span>{this.props.totalAmount}</span></p>
                    }
                        
                    </div> 

                    <a href="#0" className="checkout-btn">Checkout</a>

                    <p className="cd-go-to-cart"><a href="#0">Go to cart page</a></p>
                    </div>
            </div> 
        </header>
        )
    }
}
export default Header;  