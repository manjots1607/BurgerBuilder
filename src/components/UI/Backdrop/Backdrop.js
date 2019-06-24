import React from 'react';
import Classes from './Backdrop.css'
const backdrop=(props)=>(
    <div className={Classes.backdrop} onClick={props.close}>
    </div>
)

export default backdrop;