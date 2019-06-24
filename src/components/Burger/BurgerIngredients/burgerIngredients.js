import React from 'react';
import ingClasses from './BurgerIngredient.css';
import PropTypes from 'prop-types';

const burgerIngredient=(props)=>{
    let ingredient=null;
    switch(props.type){
        case 'breadBottom':
            ingredient=(
                <div className={ingClasses.BreadBottom}></div>
            );
            break;
        case 'breadTop':
                ingredient=(
                    <div className={ingClasses.BreadTop}>
                        <div className={ingClasses.Seeds1}></div>
                        <div className={ingClasses.Seeds2}></div>
                    </div>
                );
                break;
        case 'meat':
                ingredient=(
                    <div className={ingClasses.Meat}></div>
                );
                break;
        case 'bacon':
                ingredient=(
                    <div className={ingClasses.Bacon}></div>
                );
                break;
        case 'cheese':
                ingredient=(
                    <div className={ingClasses.Cheese}></div>
                );
                break;
        case 'salad':
                ingredient=(
                    <div className={ingClasses.Salad}></div>
                );
                break;
        default:
                ingredient=null;


    }
    return(ingredient);
}

burgerIngredient.propTypes={
    type:PropTypes.string.isRequired
};
export default burgerIngredient;