import React,{Component} from 'react';
import Aux from '../../hoc/Auxiallary/Auxiallary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Axios from '../../AxiosInst';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const ingPrice={
    salad:7,
    cheese:20,
    meat:30,
    bacon:13

}
class burgerBuilder extends Component{
    state={
        burgIngredients:{
            salad:0,
            cheese:0,
            meat:0,
            bacon:0
        },
        price:20,
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
        const queryParams=[];
        queryParams.push("price="+this.state.price);
        for (let i in this.state.burgIngredients){
            queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.burgIngredients[i]));
        }
        
        const queryString=queryParams.join('&');
        
        this.props.history.push({
            pathname:"/checkout",
            search:'?'+queryString
        });
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
    onAddHandler=(ingName)=>{
        let updatedburgIngredients={...this.state.burgIngredients};
        updatedburgIngredients[ingName]=this.state.burgIngredients[ingName] +1 ;
        const updatedPrice=this.state.price+ingPrice[ingName]; 
        this.setState({
            burgIngredients:updatedburgIngredients,
            price:updatedPrice,
        });
        this.orderPurchasable(updatedburgIngredients);
    }
    onRemoveHandler=(ingName)=>{
        let updatedburgIngredients={...this.state.burgIngredients};
        if(this.state.burgIngredients[ingName]!==0){
            updatedburgIngredients[ingName]=this.state.burgIngredients[ingName] -1 ;
            const updatedPrice=this.state.price-ingPrice[ingName]; 
            this.setState({
                burgIngredients:updatedburgIngredients,
                price:updatedPrice
            });
            this.orderPurchasable(updatedburgIngredients);
        }
        else{
            alert("It's already 0!!!");
        }

        
    }

    render(){
        return(
            <Aux>
                {this.state.showOrder ? 
                    <Modal close={this.hideOrderHandler}>
                        {this.state.showSpinner?<Spinner />:
                        <OrderSummary ingredients={this.state.burgIngredients} price={this.state.price} continue={this.continueHandler} cancel={this.hideOrderHandler}/>
                        }
                            
                    </Modal>: 
                    null
                }
                
                <Burger
                    ingredients={this.state.burgIngredients}
                />
                <BuildControls 
                    ingredients={this.state.burgIngredients} 
                    addItem={(ingName)=>this.onAddHandler(ingName)} 
                    removeItem={(ingName)=>this.onRemoveHandler(ingName)}
                    price={this.state.price}
                    purchasable={this.state.purchasable}
                    showOrder={this.showOrderHandler}
                />
                
            </Aux>
        )
    }
}


export default withErrorHandler(burgerBuilder,Axios);