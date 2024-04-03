import React, { Component } from "react";
import { connect } from "react-redux";

// import Aux from '../../hoc/Aux/Aux';
import Aux from "../hoc/hoc.js";

import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/icons-material/DialogActions"
import DialogContent from "@mui/material/DialogContent";

import { login_backdropToggle } from "../../redux/actions/accountAction";
import CloseIcon from "@mui/icons-material/Close";

class Modal extends Component {
  state = {
    isDesktop: true,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  componentDidMount() {
    // console.log(window.innerWidth, "width")
    if (window.innerWidth < 768) {
      // alert("in moble")
      this.setState({ isDesktop: false });
    } else {
      this.setState({ isDesktop: true });
    }
  }

  render() {
    return (
      <Aux>
        <Dialog
          open={this.props.show}
          keepMounted
          maxWidth='lg'
          fullScreen={this.state.isDesktop ? false : true}
          onClose={this.props.modalClosed}
          style={{ zIndex: "3000", padding: "0%", margin: "0%" }}>
          <DialogContent style={{ padding: "0%" }}>
            <p
              className='closeIconbtn'
              onClick={() => this.props.login_backdropToggle()}>
              <CloseIcon color='action' fontSize='large' />
            </p>
            <div className='dialogdiv'>{this.props.children}</div>
          </DialogContent>
        </Dialog>
        <style jsx>
          {`
            .closeIconbtn {
              cursor: pointer;
              position: absolute;
              right: 0%;
              top: 0%;
              z-index: 5;
            }
            .dialogdiv {
              //   background: pink;
              min-width: 56vw;
              max-width: 56vw;
              min-height: 82vh;
              //   padding:2%;
            }
            @media only screen and (max-width: 768px) {
              .dialogdiv {
                min-width: 100vw;
                max-width: 100vw;
                min-height: 100vh;
              }
            }
          `}
        </style>
      </Aux>
    );
  }
}
export default connect(null, { login_backdropToggle })(Modal);
