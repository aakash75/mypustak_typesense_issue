import React from 'react';
// import './backdrop.css';

const Backdrop = props =>(
    props.show ?  <div className="backdrop" onClick={props.click}/>:null
)

export default Backdrop;