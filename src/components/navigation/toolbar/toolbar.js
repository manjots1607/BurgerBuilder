import React from 'react';
import Classes from './toolbar.css';
import Navbar from '../Navbar/Navbar';
import MobNavbar from '../Navbar/mobNavbar';


const toolbar=(props)=>{
    
    
    return(

        <header >
            <div className={Classes.header}>
                <div className={Classes.logo}>Logo</div>
                <div onClick={props.toggleSideNav} className={Classes.menuContainer}><div className={Classes.menu}></div></div>
                
                <Navbar />
            </div>
            <MobNavbar toggle={props.toggle} close={props.toggleSideNav} />
            
        </header>
    )
}

export default toolbar;