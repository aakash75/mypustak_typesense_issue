import React, { Component } from 'react';
import Backdrop from './Backdrop';

class CustomBottomDrawer extends Component {
    state = {  }
    render() {
        let drawerClasses = 'side-drawer'
        if(this.props.show) {
          // alert("hi")
           drawerClasses = 'side-drawer open'
        }
        return (
            <div style ={{zIndex:1008}}>
            <Backdrop show={this.props.show}/>
            <div className={drawerClasses}>
            {this.props.children}
         </div>

         <style jsx>
          {`.side-drawer { 
           
            padding:0.5rem;
            height: 35vh;
            background: white;
            position: fixed;
            bottom: 0;
            right: 0;
            width: 100vw;
            z-index: 3000;
            box-shadow: 1px 0px 7px rgba(0,0,0,0.5); 
            transform: translateY(100%);
            transition: transform 0.2s ease-out;
            overflow-y:hidden;
            }
            .side-drawer.open {
            transform: translateY(0)
            }

          `}
        </style>
         </div>
        );
    }
}

export default CustomBottomDrawer;