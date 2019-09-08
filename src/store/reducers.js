const ingPrice={
    salad:7,
    cheese:20,
    meat:30,
    bacon:13

}

const initstate={
    
        burgIngredients:{
            salad:0,
            cheese:0,
            meat:0,
            bacon:0
        },
        price:20
};


const reducer=(state=initstate,action)=>{
    switch(action.type){
        case 'ADD_HANDLER': return{
            ...state,
            burgIngredients:{
                ...state.burgIngredients,
                [action.ingredientName]:state.burgIngredients[action.ingredientName]+1
            },
            price:state.price+ingPrice[action.ingredientName]
        }
        case 'REMOVE_HANDLER': return{
            ...state,
            burgIngredients:{
                ...state.burgIngredients,
                [action.ingredientName]:state.burgIngredients[action.ingredientName]!==0?state.burgIngredients[action.ingredientName]-1:0
            },
            price:state.burgIngredients[action.ingredientName]!==0?state.price-ingPrice[action.ingredientName]:state.price
        }
        default: return state;
    }
};

export default reducer;
