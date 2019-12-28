import React from 'react';
import Classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls=(props)=>{
    let btnClassTxt=Classes.orderBtn;
    if(props.purchasable){
        btnClassTxt=btnClassTxt+" "+Classes.active;
    }
    return (
        
        <div className={Classes.Content}>
            <div className={Classes.price}>Price: <span>₹ {props.price}</span> </div>
            {Object.keys(props.ingredients).map((ing)=>{
                return(
                <BuildControl 
                    name={ing} qty={props.ingredients[ing]} key={ing} 
                    add={(ingName)=>props.addItem(ingName) } 
                    minus={(ingName)=>props.removeItem(ingName) }
                />
                )
            })
            }
            <div className={Classes.orderDiv}>
        <button className={btnClassTxt} disabled={!props.purchasable} onClick={props.showOrder}>{props.isAuth ? "ORDER" :"Sign In To Order" }</button>
            </div>
        </div>
        
    )
}

export default buildControls;