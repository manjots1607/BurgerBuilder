import React,{Component} from 'react';
import Classes from './auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class Auth extends Component {
    state={
        authInfo:{
            email:"",
            password:""
        },
        isSignUp:true
    };
    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath!=="/"){
            this.props.updateRedirectPath();
        }
    }

    onSwitchForm=()=>{
        this.setState({
            isSignUp:!this.state.isSignUp
        });
    };
    authHandler=(e)=>{
        e.preventDefault();
        this.props.onAuth(this.state.authInfo.email,this.state.authInfo.password,this.state.isSignUp);
    }
    inputChangeHandler=(e)=>{
        let prevAuthInfo={...this.state.authInfo};
        const L =[e.target.name];
        prevAuthInfo[L]=e.target.value;

        this.setState({
            authInfo:prevAuthInfo
        });
    };

    render(){

       

        return(
            <div className={Classes.container}>
                {this.props.isAuthenticated?<Redirect to={this.props.authRedirectPath} />:null}
                <h2>Sign Up</h2>
                <form onSubmit={this.authHandler} className={Classes.form}>
                <input type="email" name="email" placeholder="Enter email" value={this.state.authInfo.email}  onChange={this.inputChangeHandler} />
                <input type="password" name="password" placeholder="Enter Password" value={this.state.authInfo.password}  onChange={this.inputChangeHandler} />
                    <button> Submit </button>
                    <br/>
                    {this.props.loading?<Spinner/>:null}
                    {this.props.error?<p> {this.props.error.message} </p>:null}
                </form>
                <button className={Classes.danger} onClick={this.onSwitchForm}> Switch To {this.state.isSignUp? "SignIn": "SignUp" }  </button>

                
            </div>
        );
    }

}

const mapStateToProps=state=>({
    error:state.auth.error,
    loading:state.auth.loading,
    isAuthenticated:state.auth.token!==null,
    building:state.burgerBuilder.building,
    authRedirectPath:state.auth.authRedirectPath
})

const mapDispatchToProps=dispatch=>({
    onAuth:(email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp)),
    updateRedirectPath:()=>dispatch(actions.setAuthRedirectPath("/"))
});


export default connect(mapStateToProps,mapDispatchToProps)( Auth);