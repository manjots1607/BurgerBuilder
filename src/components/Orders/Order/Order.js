import React from 'react';
import Classes from './Order.css';

const Order=(props)=>{
    console.log(props.ingredients);
    const bIng=Object.keys(props.ingredients).map(igKey=>{
        return (
        <div key={igKey} className={Classes.ing}>{igKey}({props.ingredients[igKey]}) </div>  
        );
    })
    return(
        <div className={Classes.ordContainer}>
            <div className={Classes.detail}>
                <div>
                    <u><strong>Ingredients:-</strong></u> {bIng}
                </div>
                <div>
                    <u><strong>Price:-</strong></u> <div className={Classes.ing}><strong>{props.price}</strong></div>
                </div>

            </div>
            
        </div>
    );
 
}

export default Order;