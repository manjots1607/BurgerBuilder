import React from 'react';
import Classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiallary/Auxiallary';

const modal=(props)=>(
    <Aux>
        <Backdrop close={props.close}/>
        <div className={Classes.modal}>
            <button onClick={props.close} className={Classes.close}><strong>X</strong></button>
            {props.children}
        </div>
    </Aux>
)

export default modal;