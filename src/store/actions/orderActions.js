import Axios from "../../AxiosInst";

export const purchaseBurgerSuccess=(id,orderData)=>{
  return {
    type:'PURCHASE_BURGER_SUCCESS',
    orderId:id,
    orderData:orderData
  }   
};

export const purchaseBurgerFail=(err)=>{
    return {
        type:'PURCHASE_BURGER_FAIL',
        err:err
    }
};
export const purchaseBurgerStart=()=>({
    
        type:'PUCHASE_BURGER_START'
    
});

export const initPurchase=()=>({
    type:'INIT_PURCHASE'
});

export const purchaseBurger=(orderData,token)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        Axios.post("/orders.json?auth="+token,orderData)
        .then(res=>{
            console.log(res.data);
            dispatch(purchaseBurgerSuccess(res.data.name,orderData));
           
        })
        .catch(err=>{
            console.log(err);
            dispatch(purchaseBurgerFail(err));
        });
    }
}


export const fetchOrdersStart=()=>({
    type:'FETCH_ORDERS_START'
});
export const fetchOrdersFail=(err)=>({
    type:'FETCH_ORDERS_FAIL',
    err:err
});
export const fetchOrdersSuccess=(orders)=>({
    type:'FETCH_ORDERS_SUCCESS',
    orders:orders
});
export const fetchOrders=(token,userId)=>{
    return dispatch=>{
        dispatch(fetchOrdersStart());
        const tempOrders = [];
        const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        Axios.get("/orders.json"+queryParams)
            .then(res => {
                for (let id in res.data) {
                    let tempOrder = {};

                    tempOrder = { ...res.data[id] };
                    tempOrder.id = id;

                    tempOrders.push(tempOrder);
                }
                dispatch(fetchOrdersSuccess(tempOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    }
}