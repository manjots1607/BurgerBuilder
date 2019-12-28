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
import * as burgerBuilderActions from "../../store/actions/index";



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
        
        if(this.props.isAuthenticated){
            this.props.history.push("/checkout");
        }else{
            this.props.updateAuthPath("/checkout");
            this.props.history.push("/auth");
        }
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
   
    componentWillMount(){
        this.props.initIngredientsHandler();
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
                {this.props.ings ? <React.Fragment><Burger
                    ingredients={this.props.ings}
                />
                <BuildControls 
                    ingredients={this.props.ings} 
                    addItem={(ingName)=>this.props.onAddHandler(ingName)} 
                    removeItem={(ingName)=>this.props.onRemoveHandler(ingName)}
                    price={this.props.totalPrice}
                    purchasable={this.state.purchasable}
                    showOrder={this.showOrderHandler}
                    isAuth={this.props.isAuthenticated}
                /></React.Fragment>: null}
                {this.props.err? <h2> Hey Ingredients cant be loaded because there is error </h2>:null}
                       
            </Aux>
        )
    }
}
const mapStateToProps=state=>({
    ings:state.burgerBuilder.burgIngredients,
    totalPrice:state.burgerBuilder.price,
    err:state.burgerBuilder.error,
    isAuthenticated : state.auth.token!==null
});
const mapDispatchToProps=dispatch=>({
    onAddHandler:(ingName)=>dispatch(burgerBuilderActions.addHandler(ingName)),
    onRemoveHandler:(ingName)=>dispatch(burgerBuilderActions.removeHandler(ingName)),
    initIngredientsHandler:()=>dispatch(burgerBuilderActions.initIngredients()),
    onInitPuchase:()=>dispatch(burgerBuilderActions.initPurchase()),
    updateAuthPath:(path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path))

});



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(burgerBuilder,Axios));