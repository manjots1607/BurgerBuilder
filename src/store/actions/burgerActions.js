import Axios from '../../AxiosInst';

export const addHandler=(ingName)=>({
    type:'ADD_HANDLER',
    ingredientName:ingName
});
export const removeHandler=(ingName)=>({
    type:'REMOVE_HANDLER',
    ingredientName:ingName
});

export const setIngredients =(ingredients)=>({
    type:'SET_INGREDIENTS',
    ingredients:ingredients
});
export const errorHandler = ()=>({
    type:'ERROR_HANDLER'
    
});
export const initIngredients=()=>{
    return dispatch=>{
          Axios.get("/ingredients.json")
          .then( res=>{
            console.log(res.data);  
            dispatch(setIngredients(res.data));
          })
          .catch(err=>{
              dispatch(errorHandler());
          });
    }
}

