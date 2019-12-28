import axios from 'axios';



export const authStart=()=>({
    type:'AUTH_START'
});
export const authSuccess=(token,localId)=>({
    type:'AUTH_SUCCESS',
    token:token,
    localId:localId
});

export const logout=()=>{
   localStorage.removeItem("token"); 
   localStorage.removeItem("userID"); 
   localStorage.removeItem("expirationDate");

   return  {type:'AUTH_LOGOUT'}
};

export const authExpire=(exp)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        },exp*1000);
    }
};

export const authFail=(err)=>({
    type:'AUTH_FAIL',
    err:err
});

export const auth=(email,password,isSignUp)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        };
        let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjUuLBA7r-q0lwNk1IW9diKkvLqsE1FLw";
        if(!isSignUp){
            url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjUuLBA7r-q0lwNk1IW9diKkvLqsE1FLw";
        }

        axios.post(url,authData)
        .then(res=>{
            console.log(res.data);
            const expirationDate=new Date((new Date()).getTime() + res.data.expiresIn*1000);

            localStorage.setItem("token",res.data.idToken);
            localStorage.setItem("userID",res.data.localId);
            localStorage.setItem("expirationDate",expirationDate);

            dispatch(authSuccess(res.data.idToken,res.data.localId));
            dispatch(authExpire(res.data.expiresIn));
        })
        .catch(err=>{
            console.log(err);
            dispatch(authFail(err));
        });
    }
};


export const setAuthRedirectPath=(path)=>({
    type:'SET_AUTH_REDIRECT_PATH',
    path:path
});


export const checkAuthState=()=>{
    return dispatch=>{
        if(localStorage.getItem("token")){
            const expirationDate=new Date(localStorage.getItem("expirationDate"));
            if( expirationDate <= new Date() ){
                dispatch(logout());
            }
            else{
                dispatch(authSuccess(localStorage.getItem("token"),localStorage.getItem("userID")));

                dispatch(authExpire((expirationDate.getTime()-(new Date()).getTime())/1000));
            }
        }
    }

}