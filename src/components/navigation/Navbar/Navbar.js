import React from 'react';
import Classes from './Navbar.css';
import{NavLink} from 'react-router-dom';
const navbar=(props)=>{
    return (
        <nav className={Classes.nav} >
            
            <div><NavLink to="/" exact activeClassName={Classes.active}>Home</NavLink></div>
            <div><NavLink to="/orders" activeClassName={Classes.active}>Orders</NavLink></div>

        </nav>
    )
}

export default navbar;