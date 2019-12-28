import React, {Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/burgerBuilder/burgerBuilder';
import Checkout from './containers/checkout/checkout';
import {Route,Switch,Redirect} from 'react-router-dom';
import Orders from './components/Orders/Orders';
import Auth from  './containers/auth/auth';
import Logout from  './containers/auth/logout/logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';



class App extends Component{
  componentDidMount(){
    this.props.checkAuth();
  }

  render(){
    let routes=(
      <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
      </Switch>
      );
    if(this.props.isAuthenticated){
      routes=(
        <Switch>
          <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div >
        <Layout>
          
         {routes}
          
        </Layout>
      </div>
    );
  }
}

const mapStateToProps=state=>({
  isAuthenticated: state.auth.token!==null 
});

const mapDispatchToProps=dispatch=>({
  checkAuth: ()=>dispatch(actions.checkAuthState())
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
