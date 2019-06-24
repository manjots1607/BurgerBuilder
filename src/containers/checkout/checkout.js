import React,{Component} from 'react';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import BillingForm from '../../components/Orders/CheckoutSummary/BillingForm/BillingForm';

class Checkout extends Component{
    state={
        ingredients:null,
        price:null
    };
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
                <CheckoutSummary ingredients={this.state.ingredients} price={this.state.price}
                continueCheckout={this.continueHandler} cancelCheckout={this.cancelHandler} />
                <Route path={this.props.match.path + "/billing-data"} 
                    render={(props)=><BillingForm ingredients={this.state.ingredients} price={this.state.price} {...props}/> }
                 />
            </React.Fragment>    
        );
    }
};

export default Checkout;
