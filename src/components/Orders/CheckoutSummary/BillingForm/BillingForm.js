import React,{Component} from 'react';
import Classes from './BillingForm.css';
import Axios from '../../../../AxiosInst';
import Spinner from '../../../UI/Spinner/Spinner';
import {connect} from 'react-redux';

class BillingForm extends Component{
    state={
        billingInfo:{
            name:"",
            address:{
                hNo:"",
                streetAdd:"",
                city:"",
                country:""
            },
            mobNo:"",
            email:""
        },
        showSpinner:false
    };
    inputChangeHandler=(e)=>{
        let prevBilling={...this.state.billingInfo};
        const L =[e.target.name];
        prevBilling[L]=e.target.value;

        this.setState({
            billingInfo:prevBilling
        });
    };
    addressChangeHandler=(e)=>{
        let prevBilling={...this.state.billingInfo};
        const L =[e.target.name];
        prevBilling.address[L]=e.target.value;
        this.setState({
            billingInfo:prevBilling
        });
    }
    orderHandler=(e)=>{
        e.preventDefault();
        this.setState({
            showSpinner:true
        });
        
        
         Axios.post("/orders.json",{
            ingredients:this.props.ingredients,
            price:this.props.price,
            customer:{
                name:this.state.billingInfo.name,
                address:{
                    hNo:this.state.billingInfo.address.hNO,
                    street:this.state.billingInfo.address.streetAdd,
                    city:this.state.billingInfo.address.city,
                    zip:this.state.billingInfo.address.country
                },
                email:this.state.billingInfo.email,
                mobNo:this.state.billingInfo.mobNo
            },
            deliveryMethod:"Fastest"
        })
        .then(res=>{
            console.log(res.data);
            
            this.setState({showSpinner:false});
            this.props.history.push("/");
            
           
            
            
        })
        .catch(err=>{
            console.log(err);
            this.setState({showSpinner:false});
           
           
            
        });

    }

    render(){

        return(
            <div className={Classes.container}>
            <h2>Enter Billing information</h2>
            {this.state.showSpinner?<Spinner />:
            <form className={Classes.form} onSubmit={this.orderHandler}>
                <input type="text" name="name" placeholder="Enter your Name" className="input" value={this.state.billingInfo.name} onChange={this.inputChangeHandler} ></input>
                <input type="text" name="hNo" placeholder="Enter House/Appartment No. " value={this.state.billingInfo.address.hNo} onChange={this.addressChangeHandler} />
                <input type="text" name="streetAdd" placeholder="Enter Street Address" value={this.state.billingInfo.address.streetAdd} onChange={this.addressChangeHandler}/>
                <input type="text" name="city" placeholder="Enter city" value={this.state.billingInfo.address.city} onChange={this.addressChangeHandler} />
                <input type="text" name="country" placeholder="Enter country" value={this.state.billingInfo.address.country} onChange={this.addressChangeHandler} />
                <input type="tel" name="mobNo" placeholder="Enter mobile No" value={this.state.billingInfo.mobNo} onChange={this.inputChangeHandler} />
                <input type="email" name="email" placeholder="Enter Email" value={this.state.billingInfo.email}  onChange={this.inputChangeHandler} />
                <button >Order</button>
            </form>
            }
            </div>
        );
    }
}

const mapStateToProps=state=>({
    ingredients:state.burgIngredients,
    price:state.price
});
export default connect(mapStateToProps)(BillingForm);    