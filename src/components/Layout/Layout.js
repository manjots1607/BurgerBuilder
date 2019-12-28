import React from 'react';
import Aux from '../../hoc/Auxiallary/Auxiallary';
import Classes from './Layout.css';
import Toolbar from '../navigation/toolbar/toolbar';
import {connect} from 'react-redux';

class Layout extends React.Component {
    state={
        sideBarOpen:false
    }
    toggleSideNavHandler=()=>{
        this.setState({
            sideBarOpen:!this.state.sideBarOpen
        });
    }
    render() {
        return (
            <Aux>
                <Toolbar toggle={this.state.sideBarOpen} isAuth={this.props.isAuthenticated} toggleSideNav={this.toggleSideNavHandler}/>
                <main className={Classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps=State=>({
    isAuthenticated:State.auth.token!==null
});


export default connect(mapStateToProps)(Layout);