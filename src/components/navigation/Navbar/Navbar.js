import React from 'react';
import Classes from './Navbar.css';

import NavItems from './navItems';

const navbar=(props)=>{
    return (
        <nav className={Classes.nav} >
            
           <NavItems isAuth={props.isAuthenticated} />

        </nav>
    )
}

export default navbar;