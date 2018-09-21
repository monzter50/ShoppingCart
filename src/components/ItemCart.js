import React,{Component} from 'react';

class ItemCart extends Component{
    constructor(props){
        super(props);
        this.state={
            isSelectItem:{}
        }
    }
    removeItems(id){
        this.setState({
            isSelectItem:{
                id
            }
        },
            function () {
                this.props.removeItems(this.state.isSelectItem);
            }
        )
        console.log("click");
    }
    render(){
        let id=this.props.id;
        return(
            <li className="ls-cart-items" key={this.props.id} id={this.props.id}>
                <div className="img-cart-items"><img className="" src={this.props.img} /></div>
                <div className={"content-cart"}>
                    <span className="cd-qty">qty:{this.props.qty}</span> {this.props.name}
                </div>
                <div className="cd-price">${this.props.price * this.props.qty}</div>
                <button  onClick={this.removeItems.bind(this,id)} className="cd-item-remove cd-img-replace">Remove</button>
            </li>
        )
    }
}
export default ItemCart;