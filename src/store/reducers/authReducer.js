

const initState={
    localId:null,
    token:null,
    loading:false,
    error:null,
    authRedirectPath:"/"
};
const authSuccess=(state,action)=>{
    return{
        ...state,
        localId:action.localId,
        token:action.token,
        loading:false
    }
};
const authFail=(state,action)=>({
    ...state,
    error:action.err.response.data.error,
    loading:false
});

const authLogout=(state,action)=>({
    ...state,
    localId:null,
    token:null
});

const authRedirect=(state,action)=>({
    ...state,
    authRedirectPath:action.path
});

const reducer=(state=initState,action)=>{
    

    switch (action.type){
        case 'AUTH_START':return{...state,loading:true,error:null};
        case 'AUTH_SUCCESS':return authSuccess(state,action);
        case 'AUTH_FAIL': return authFail(state,action);
        case 'AUTH_LOGOUT': return authLogout(state,action);
        case 'SET_AUTH_REDIRECT_PATH':return authRedirect(state,action);
        default:return state;
    }
}

export default reducer;