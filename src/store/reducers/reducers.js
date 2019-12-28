const ingPrice={
    salad:7,
    cheese:20,
    meat:30,
    bacon:13

}

const initstate={
    
        burgIngredients:null,
        price:20,
        error:false,
        building:false
};


const reducer=(state=initstate,action)=>{
    switch(action.type){
        case 'ADD_HANDLER': return{
            ...state,
            burgIngredients:{
                ...state.burgIngredients,
                [action.ingredientName]:state.burgIngredients[action.ingredientName]+1
            },
            price:state.price+ingPrice[action.ingredientName],
            building:true
        }
        case 'REMOVE_HANDLER': return{
            ...state,
            burgIngredients:{
                ...state.burgIngredients,
                [action.ingredientName]:state.burgIngredients[action.ingredientName]!==0?state.burgIngredients[action.ingredientName]-1:0
            },
            price:state.burgIngredients[action.ingredientName]!==0?state.price-ingPrice[action.ingredientName]:state.price,
            building:true
        }
        case 'SET_INGREDIENTS' : return{
            ...state,
            burgIngredients:action.ingredients,
            price:20,
            building:false
        }
        case 'ERROR_HANDLER': return{
            ...state,
            error:true
        }
        default: return state;
    }
};

export default reducer;
