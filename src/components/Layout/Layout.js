import React from 'react';
import Aux from '../../hoc/Auxiallary/Auxiallary';
import Classes from './Layout.css';
import Toolbar from '../navigation/toolbar/toolbar';

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
                <Toolbar toggle={this.state.sideBarOpen} toggleSideNav={this.toggleSideNavHandler}/>
                <main className={Classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;