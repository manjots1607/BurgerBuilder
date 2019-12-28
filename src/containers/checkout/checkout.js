import React,{Component} from 'react';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
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
        var summary=(<Redirect to="/" />);
        var redirectAfterPurchase= this.props.purchased ? <Redirect to="/"/> : null;
        if(this.props.ings){
            summary= (
            <React.Fragment>
                {redirectAfterPurchase}
                <CheckoutSummary ingredients={this.props.ings} price={this.props.price}
                continueCheckout={this.continueHandler} cancelCheckout={this.cancelHandler} />
                <Route path={this.props.match.path + "/billing-data"} 
                    component={BillingForm}
                 />
            </React.Fragment>  );
        }
        return summary;
    }
};

const mapStateToProps=state=>({
    ings:state.burgerBuilder.burgIngredients,
    price:state.burgerBuilder.price,
    purchased:state.order.puchased
});

export default connect(mapStateToProps)(Checkout);
