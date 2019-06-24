import React from 'react';
import BurgerIngredient from './BurgerIngredients/burgerIngredients';
import Classes from './Burger.css';

const burger= (props)=>{
    let burgIngredients=Object.keys(props.ingredients)
    .map(igKey=>{
        
        return [...Array(props.ingredients[igKey])]
        .map((_,i) =>{
            return(              
                <BurgerIngredient   
                    type={igKey}    
                    key={igKey+i}   
                />                   
            );
        });
        
    })
    .reduce((arr,el)=>{
        return (arr.concat(el));
    },[]);
   
    
    if(burgIngredients.length===0){
        burgIngredients=<p>Start adding ingredients</p>;
    }
    return(
        
    <div className={Classes.burger} >
        <BurgerIngredient type="breadTop" key="sddfsd" />
        {burgIngredients}
        <BurgerIngredient type="breadBottom" key="dfwfsd" />
    </div>
    );
}

export default burger;