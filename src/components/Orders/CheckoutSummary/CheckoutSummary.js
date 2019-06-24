import React from 'react';
import Burger from '../../Burger/Burger';
import Classes from './CheckoutSummary.css';
import Classes2 from '../../OrderSummary/OrderSummary.css';
const CheckoutSummary=(props)=>{
    return(
        <div className={Classes.container}>
            <h1>Checkout</h1>
            <i><h3>Here's  how your tasty Burger Looks</h3></i>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <h4>TOTAL PRICE:- ₹<b>{props.price}</b></h4>
            <button className={Classes2.btn +" "+ Classes2.success} onClick={props.continueCheckout}>CONTINUE</button>
            <button className={Classes2.btn +" "+ Classes2.failure} onClick={props.cancelCheckout}>CANCEL</button>
        </div>
    );
};

export default CheckoutSummary;