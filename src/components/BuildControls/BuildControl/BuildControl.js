import React from 'react';
import Classes from './BuildControl.css';

const buildControl=(props)=>{

    return (
        <div className={Classes.buildControl}>
            <div className={Classes.name}>{props.name}</div>
            <div className={Classes.Add}> <button onClick={()=>props.add(props.name)}>+</button> </div>
            <div className={Classes.qty}>{props.qty}</div>
            <div className={Classes.Minus}><button onClick={()=>props.minus(props.name)}>-</button></div>
        </div>
    )
}

export default buildControl;