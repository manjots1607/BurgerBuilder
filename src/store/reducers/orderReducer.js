const initState={
    orders:[],
    loading:false,
    purchased:false
};
const reducer=(state=initState,actions)=>{
    switch(actions.type){
    case 'PURCHASE_BURGER_SUCCESS' : 
        const newOrder={...actions.orderData, id:actions.orderId };
        return { ...state, loading:false, orders:state.orders.concat(newOrder), puchased:true };
    case 'PURCHASE_BURGER_FAIL':
        return{ ...state, loading:false};
    case 'INIT_PURCHASE':
        return{ ...state, purchased:false };
    case 'PUCHASE_BURGER_START':
        return{ ...state, loading:true };   
        
    case 'FETCH_ORDERS_START':
        return{ ...state, loading:true };
    case 'FETCH_ORDERS_FAIL':
        return{ ...state, loading:false };
    case 'FETCH_ORDERS_SUCCESS':
        return{ ...state, loading:false, orders:actions.orders};

    default:return{...state}
    }
};

export default reducer;