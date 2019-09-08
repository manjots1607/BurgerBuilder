import React,{Component} from 'react';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import BillingForm from '../../components/Orders/CheckoutSummary/BillingForm/BillingForm';
import {connect } from 'react-redux';

class Checkout extends Component{
    
    componentWillMount(){
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        for(let param of query.entries()){
            if(param[0]==="price"){
                this.setState({price:param[1]});
            }else{

                ingredients[param[0]]=+param[1];
            }
        }
        this.setState({
            ingredients:ingredients
        });
    }
    continueHandler=()=>{
        this.props.history.push("/checkout/billing-data");
    };
    cancelHandler=()=>{
        this.props.history.goBack();
    };
    render(){
        return(
            <React.Fragment>
                <CheckoutSummary ingredients={this.props.ings} price={this.props.price}
                continueCheckout={this.continueHandler} cancelCheckout={this.cancelHandler} />
                <Route path={this.props.match.path + "/billing-data"} 
                    component={BillingForm}
                 />
            </React.Fragment>    
        );
    }
};

const mapStateToProps=state=>({
    ings:state.burgIngredients,
    price:state.price
});

export default connect(mapStateToProps)(Checkout);
