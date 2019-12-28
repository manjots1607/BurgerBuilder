import React, { Component} from 'react';
import Axios from '../../AxiosInst';

import Order from './Order/Order.js';
import {connect} from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    
    componentDidMount() {
        
       this.props.onFetchOrders(this.props.token,this.props.userID);
        
    }
    render() {
        var output=this.props.loading ? <Spinner /> : 
            <div style={{margin:'55px auto 50px auto', textAlign:'center',width:'80%'}}>
                <h1>Hey There are your Orders </h1>
                {this.props.orders.map(ord => {
                    console.log(ord.ingredients);
                    return (<Order ingredients={ord.ingredients} price={ord.price} key={ord.id} />)
                })};
        
            </div>;

        return output;
    }
}

const mapStateToProps = state=>({
    orders: state.order.orders,
    loading:state.order.loading,
    token:state.auth.token,
    userID:state.auth.localId
});
const mapDispatchToProps = dispatch=>({
    onFetchOrders:(token,userId)=>dispatch(actions.fetchOrders(token,userId))
});

export default connect(mapStateToProps,mapDispatchToProps)( withErrorHandler(Orders,Axios));