import React from 'react';
import Classes from './OrderSummary.css';

const ingPrice={
    salad:7,
    cheese:20,
    meat:30,
    bacon:13

};

const orderSummary=(props)=>(
    <div className={Classes.container}>
        <h3>ORDER SUMMARY</h3>
        <p>Here's your ingredient list of your tasty burger</p>
        <ul>
            <li> Basic : <strong> ₹ 20</strong></li>
            {Object.keys(props.ingredients).map((igKey)=>{
                return(<li key={igKey}> {igKey} : {props.ingredients[igKey]} X {ingPrice[igKey]} = <strong>₹{props.ingredients[igKey]*ingPrice[igKey]} </strong></li>)
            })}
            <li><strong><h4>Total Price : ₹{props.price}</h4></strong></li>
        </ul>
        <p>Do you want to continue.........</p>
        <button className={Classes.btn +" "+ Classes.success} onClick={props.continue}>CONTINUE</button>
        <button className={Classes.btn +" "+ Classes.failure} onClick={props.cancel}>CANCEL</button>
    
    </div>
)

export default orderSummary;