import React,{Component} from 'react';
import Aux from '../../hoc/Auxiallary/Auxiallary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Axios from '../../AxiosInst';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';



class burgerBuilder extends Component{
    state={
        
        purchasable:false,
        showOrder:false,
        showSpinner:false
    }
    continueHandler=()=>{
        // this.setState({showSpinner:true});
        // Axios.post("/orders",{
        //     ingredients:this.state.burgIngredients,
        //     price:this.state.price,
        //     customer:{
        //         name:"Manjot",
        //         address:{
        //             hNo:"5464",
        //             street:"nodsamd",
        //             city:"Amritsar",
        //             zip:"143001"
        //         },
        //         email:"manjotsinghsad@dowj.com"
        //     },
        //     deliveryMethod:"Fastest"
        // })
        // .then(res=>{
        //     console.log(res.data);
            
        //     this.setState({showSpinner:false, showOrder:false});
           
            
            
        // })
        // .catch(err=>{
        //     console.log(err);
           
        //     this.setState({showSpinner:false, showOrder:false});
            
        // });
        
        
        this.props.history.push("/checkout");
    }
    showOrderHandler=()=>{
        this.setState({
            showOrder:true
        })
    }
    hideOrderHandler=()=>{
        this.setState({
            showOrder:false
        })
    }
    componentDidUpdate(prevProps){
        if(this.props.ings!==prevProps.ings){

            this.orderPurchasable(this.props.ings);
        }
    }
    orderPurchasable=(bIng)=>{
        let sum=Object.keys(bIng).map((ig)=>{
            return bIng[ig];
            }).reduce((acc,next)=>{
                return acc+next;
            },0);
        if(sum>0){
            this.setState({
                purchasable:true
            });
        }else{
            this.setState({
                purchasable:false
            });
        }
    }
    

    render(){
        return(
            <Aux>
                {this.state.showOrder ? 
                    <Modal close={this.hideOrderHandler}>
                        {this.state.showSpinner?<Spinner />:
                        <OrderSummary ingredients={this.props.ings} price={this.props.totalPrice} continue={this.continueHandler} cancel={this.hideOrderHandler}/>
                        }
                            
                    </Modal>: 
                    null
                }
                
                <Burger
                    ingredients={this.props.ings}
                />
                <BuildControls 
                    ingredients={this.props.ings} 
                    addItem={(ingName)=>this.props.onAddHandler(ingName)} 
                    removeItem={(ingName)=>this.props.onRemoveHandler(ingName)}
                    price={this.props.totalPrice}
                    purchasable={this.state.purchasable}
                    showOrder={this.showOrderHandler}
                />
                
            </Aux>
        )
    }
}
const mapStateToProps=state=>({
    ings:state.burgIngredients,
    totalPrice:state.price
});
const mapDispatchToProps=dispatch=>({
    onAddHandler:(ingName)=>dispatch({type:'ADD_HANDLER',ingredientName:ingName}),
    onRemoveHandler:(ingName)=>dispatch({type:'REMOVE_HANDLER',ingredientName:ingName})
});



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(burgerBuilder,Axios));