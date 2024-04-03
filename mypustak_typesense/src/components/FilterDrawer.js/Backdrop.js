import React, { Component } from 'react';

class Backdrop extends Component {
    state = {  }
    
    
    



    render() {
        return(
            <div className="backdrop" style ={this.props.show ?{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1009,
                top: 0,
                right: 0,
                overflow:'hidden'
            }:{}} />
          )
    }
}

export default Backdrop;