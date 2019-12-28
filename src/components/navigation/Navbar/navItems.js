import React from 'react';
import Classes from './Navbar.css';
import {NavLink} from 'react-router-dom';

const funcname=(props)=>{
 
    return (
        <React.Fragment>
            <div className={props.dClass} style={props.dStyle} onClick={props.click}><NavLink to="/" exact activeClassName={Classes.active}>Home</NavLink></div>
            {props.isAuth ? <div className={props.dClass} onClick={props.click}><NavLink to="/orders" activeClassName={Classes.active}>Orders</NavLink></div> : null}
            {props.isAuth ? 
            <div className={props.dClass} onClick={props.click}><NavLink to="/logout" activeClassName={Classes.active}>Logout</NavLink></div> :
            <div className={props.dClass} onClick={props.click}><NavLink to="/auth" activeClassName={Classes.active}>Auth</NavLink></div>}
        </React.Fragment>
    )
}

export default funcname;