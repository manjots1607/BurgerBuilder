import React from 'react';
import Classes from './Navbar.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiallary/Auxiallary';
import {NavLink} from 'react-router-dom';

const mobNavbar =(props)=>{
    const addclass=props.toggle?Classes.open:null;
    return(
        <Aux>
            {props.toggle?<Backdrop close={props.close}/>:null}
            
            <nav className={Classes.mobNav +" " + addclass}>
                <div className={Classes.close} onClick={props.close}>X</div>
                
                <div className={Classes.navItem} style={{marginTop:'20px'}} onClick={props.close}><NavLink to="/" exact activeClassName={Classes.active}>Home</NavLink></div>
                <div className={Classes.navItem} onClick={props.close}><NavLink to="/orders" activeClassName={Classes.active}>Orders</NavLink></div>
                
            </nav>
        </Aux>
    );
}

export default mobNavbar;