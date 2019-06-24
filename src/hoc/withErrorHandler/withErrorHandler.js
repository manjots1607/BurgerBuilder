import React,{Component} from 'react';
import Aux from '../Auxiallary/Auxiallary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler=(WrappedComponent,axios)=>{

    return class extends Component{
        state={ 
            err:null
        };
        
        componentWillMount(){
            this.reqInterceptors=axios.interceptors.request.use(req=>{
                this.setState({err:null});
                return req;
            });
            this.resInterceptors=axios.interceptors.response.use(null,err=>{
                this.setState({err:err});
            })
        };
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }
        showHandler=()=>{
            this.setState({err:null});
        };
        render(){
            return(
                <Aux>
                    {this.state.err?
                        <Modal  close={this.showHandler}>
                            {this.state.err.message}
                        </Modal>
                        :null
                    }
                    <WrappedComponent {...this.props} />
                </Aux>

            );
        }

    }
};
export default withErrorHandler;