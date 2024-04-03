import React, { Component } from "react";
import Backdrop from "../FilterDrawer.js/Backdrop";

class CustomDrawer extends Component {
  state = {};
  render() {
    let drawerClasses = "side-drawer";
    if (this.props.show) {
      drawerClasses = "side-drawer open";
    }
    return (
      <div style={{ zIndex: 1008 }}>
        <Backdrop show={this.props.show} />
        <div className={drawerClasses}>{this.props.children}</div>

        <style jsx>
          {`
            .side-drawer {
              //   padding: 0.5rem;
              height: 100vh;
              background: white;
              position: fixed;
              top: 0;
              right: 0;
              width: 100vw;
              z-index: 3000;
              box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
              transform: translateX(100%);
              transition: transform 0.3s ease-out;
              // overflow-y:scroll;
            }
            .side-drawer.open {
              transform: translateX(0);
            }
          `}
        </style>
      </div>
    );
  }
}

export default CustomDrawer;
