import React, { Component } from 'react';
import Axios from '../../AxiosInst';
import Order from './Order/Order.js';

class Orders extends Component {
    state = {
        orders: []
    }
    componentDidMount() {
        const tempOrders = [];
        Axios.get("/orders.json")
            .then(res => {
                for (let id in res.data) {
                    let tempOrder = {};

                    tempOrder = { ...res.data[id] };
                    tempOrder.id = id;

                    tempOrders.push(tempOrder);
                }
                this.setState({ orders: tempOrders });
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        

        return (
            <div style={{margin:'55px auto 50px auto', textAlign:'center',width:'80%'}}>
                <h1>Hey There are your Orders </h1>
                {this.state.orders.map(ord => {
                    console.log(ord.ingredients);
                    return (<Order ingredients={ord.ingredients} price={ord.price} key={ord.id} />)
                })}
                
            </div>


        );
    }
}
export default Orders;