import React, { Component } from "react";
// import {LoginCheck,signupCheck,showLoader,clearAll,clearLoginErr,ActivteSuccesPopup,login_backdropToggle} from '../../redux/actions/accountAction'
import {
  LoginCheck,
  signupCheck,
  showLoader,
  clearAll,
  clearLoginErr,
  ActivteSuccesPopup,
  login_backdropToggle,
} from "../../redux/actions/accountAction";

import { connect } from "react-redux";
// import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import config from "react-global-configuration";
import Aux from "../hoc/hoc";
import Modal from "../Modal/Modal";
import LoginDiv from "./LoginDiv";
import SignupDiv from "./SignupDiv";
import LoginOtpDiv from "./LoginOtpDiv";
import ForgotpwdDiv from "./ForgotpwdDiv";
import Checkuser from "./Checkuser";
import { login_signuptoggle } from "../../redux/actions/loginactions";
import { url } from "../../helper/api_url";

// const styles = theme => ({
//   root: {
//     width: "100%",
//   },
//   button: {
//     whiteSpace: "nowrap",
//     marginTop: "4px",
//     marginLeft: "6px",
//   },
//   margin: {
//     margin: "0 4px",
//   },
// });

class Login extends Component {
  static getInitialProps({ asPath }) {
    // console.log(asPath, "query1")
    return { asPath };
  }
  state = {
    checkuser: true,
    // login_signupshow: false,
    login_signupshow: true,

    loginErrmsg: "",
    showpwd: false,
    SignupPassErr: "",
    signuptoggle: false,
    loginOtpToggle: false,
    Sopen: false,
    email: "",
    password: "",
    Semail: "",
    validatepwd: "",
    openForget: false,
    captcha: "",
    Imgcaptcha: "",
    loginCliked: false,
    LoginErrMsg: this.props.ErrMsg,
    EmailErrrmsg: "",
    PassErrmsg: "",
    CaptchaErr: "",
    ForgetResponse: 0,
    CountMsg: 1,
    RedirectMobileHome: false,
    OpenForgetLoader: false,
    mobilenumber: "",
    url_pathname: "",
  };
  result = text => {
    this.setState({
      Imgcaptcha: text,
    });
  };
  componentDidMount() {
    // console.log(this.props,"aaaaaa")
    this.setState({ ForgetResponse: 0 });
    this.setState({ CountMsg: 1 });

    this.setState({ url_pathname: window.location.pathname });
  }

  componentDidUpdate(prevProps) {
    if (this.props.toggle !== prevProps.toggle && this.props.toggle == true) {
      this.setState({
        login_signupshow: true,
        loginOtpToggle: false,
        openForget: false,
        signuptoggle: false,
      });
    }
  }

  handleClickShowPassword = () => {
    this.setState({ showpwd: !this.state.showpwd });
  };

  handleMouseDownPassword = e => {
    e.preventDefault();
  };
  sopenModal = () => {
    this.setState({ Sopen: true });
  };
  scloseModal = () => {
    this.props.scloseModal();
  };
  changeShowLS = () => {
    this.props.changeShowLS();
  };

  ForgetPassword = e => {
    this.setState({ email: "", password: "" });
    // alert("h")
    if (e.key !== "Enter")
      this.setState({ openForget: !this.state.openForget });
  };
  EmailErrrmsg = "";
  CaptchaErr = "";
  CheckSubmitForgot = () => {
    // this./
    this.check();
    if (this.state.email === "") {
      // this.setState({EmailErrrmsg:'Please Fill up the Email'})
      this.EmailErrrmsg = "Please Fill up the Email";
    } else {
      // this.setState({EmailErrrmsg:''})
      this.EmailErrrmsg = "";
    }
    if (this.state.captcha !== this.state.Imgcaptcha) {
      // this.setState({CaptchaErr:"Captcha Did not match"});
      this.setState({ CaptchaErr: "Captcha Did not match" });
      // return;
      this.CaptchaErr = "Captcha Did not match";
    } else {
      this.setState({ CaptchaErr: "" });
      this.CaptchaErr = "";
      // console.log("SuccessErrBlank1")
    }
    // console.log(this.captchaEnter.value);
    if (this.CaptchaErr === "" && this.EmailErrrmsg === "") {
      this.SubmitForgot();
    }
  };
  check() {
    // console.log(this.state.Imgcaptcha, this.captchaEnter.value, this.state.Imgcaptcha === this.state.captcha)
  }

  SubmitForgot = e => {
    e.preventDefault();

    this.setState({ OpenForgetLoader: true, loginErrmsg: "" });
    // console.log("SuccessErrBlank2", this.state.Semail)

    // alert("1")
    const passdata = {
      email: this.state.Semail,
      "content-type": "multipart/form-data",
      boundary: "----WebKitFormBoundary7MA4YWxkTrZu0gW",
    };
    axios
      .post(`${url}/core/forgot_password/`, passdata)
      .then(res => {
        // console.log(res.status)
        this.setState({ ForgetResponse: "ok" });
        this.setState({ OpenForgetLoader: false });
      })
      .catch(err => {
        console.log(err.response.status, "SuccessErrBlank3");
        this.setState({ ForgetResponse: "Err" });
      });
  };
  onChange = e => {
    this.setState({ PassErrmsg: "", EmailErrrmsg: "" });
    this.setState({ [e.target.name]: e.target.value });
    if (this.state.email === "") {
    }
  };
  Login = e => {
    e.preventDefault();
    //  alert("S")
    if (this.state.email === "") {
      this.setState({
        EmailErrrmsg: "Please Fill up the Email",
        loginErrmsg: "",
      });
    } else {
      this.setState({ EmailErrrmsg: "", loginErrmsg: "" });
    }
    if (this.state.password === "") {
      this.setState({
        PassErrmsg: "Please Fill up the password",
        loginErrmsg: "",
      });
    } else {
      this.setState({ PassErrmsg: "", loginErrmsg: "" });
    }

    const { email, password } = this.state;
    const details = {
      email,
      password,
    };
    if (
      this.state.EmailErrrmsg === "" &&
      this.state.PassErrmsg === "" &&
      this.state.email !== "" &&
      this.state.password !== ""
    ) {
      // alert("p")
      this.props.showLoader();

      this.setState({ loading: true });
      this.props.LoginCheck(details);
    }
  };

  toggleForgetPassword = () => {
    //  alert("t")
    this.setState({
      openForget: !this.state.openForget,
      loginErrmsg: "",
      login_signupshow: false,
    });
  };

  signupftoggle = type => {
    this.setState({
      loginOtpToggle: false,
      openForget: false,
      login_signupshow: true,
    });
    if (type == "login") {
      this.setState({ signuptoggle: false });
    } else {
      this.setState({ signuptoggle: true });
    }
  };
  loginOtpToggle = () => {
    // alert("loginOtpToggle")
    this.setState({
      loginOtpToggle: !this.state.loginOtpToggle,
      login_signupshow: false,
      // signupftoggle: false,
    });
  };

  checkuserToggle = () => {
    this.setState({
      checkuser: !this.state.checkuser,
    });
  };

  checkDialog = () => {
    if (
      this.state.url_pathname == `/view-cart` ||
      this.state.url_pathname == `/customer/customer_accoun` ||
      this.state.url_pathname == `/customer/customer_orde` ||
      this.state.url_pathname == `/mypustak-wallt` ||
      this.state.url_pathname == `/customer/Myprofil` ||
      this.state.url_pathname == `/customer/manage_addres` ||
      this.state.utl_pathname == `/wallet/passbook/`
    ) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    return (
      <div>
        <Aux>
          <Modal
            isModal={this.checkDialog}
            show={
              (this.state.url_pathname == `/view-carts` ||
                this.state.url_pathname == `/customer/customer_account` ||
                this.state.url_pathname == `/customer/customer_orde` ||
                this.state.url_pathname == `/mypustak-walle` ||
                this.state.url_pathname == `/customer/Myprofil` ||
                this.state.url_pathname == `/customer/manage_addres` ||
                this.state.utl_pathname == `/wallet/passboo/`) &&
              this.props.userToken == null
                ? true
                : this.props.toggle
            }>
            <div>
              {this.state.loginOtpToggle && (
                <LoginOtpDiv
                  loginOtpToggle={this.loginOtpToggle}
                  signupftoggle={this.signupftoggle}
                  toggleForgetPassword={this.toggleForgetPassword}
                />
              )}

              {this.state.openForget ? (
                <ForgotpwdDiv
                  toggleForgetPassword={this.toggleForgetPassword}
                  signupftoggle={this.signupftoggle}
                  loginOtpToggle={this.loginOtpToggle}
                />
              ) : null}

              {this.state.login_signupshow ? (
                <div>
                  {this.state.signuptoggle ? (
                    <SignupDiv
                      toggleForgetPassword={this.toggleForgetPassword}
                      signupftoggle={this.signupftoggle}
                      loginOtpToggle={this.loginOtpToggle}
                      checkuserToggle={this.checkuserToggle}
                    />
                  ) : (
                    <div>
                      {this.state.checkuser ? (
                        <div>
                          <Checkuser
                            toggleForgetPassword={this.toggleForgetPassword}
                            signupftoggle={this.signupftoggle}
                            loginOtpToggle={this.loginOtpToggle}
                            checkuserToggle={this.checkuserToggle}
                          />
                        </div>
                      ) : (
                        <LoginDiv
                          signupftoggle={this.signupftoggle}
                          loginOtpToggle={this.loginOtpToggle}
                          toggleForgetPassword={this.toggleForgetPassword}
                          checkuserToggle={this.checkuserToggle}
                        />
                      )}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </Modal>
        </Aux>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ErrMsg: state.accountR.ErrMsg,
  loader: state.accountR.loading,
  userToken: state.accountR.token,
  SignUpErrMsg: state.accountR.SignUpErrMsg,
  signuptoggle: state.LoginReducer.signuptoggle,

  // SerLoginDat.state.acGetLoginData,
});

export default connect(mapStateToProps, {
  LoginCheck,
  clearAll,
  showLoader,
  signupCheck,
  clearLoginErr,
  ActivteSuccesPopup,
  login_backdropToggle,
  login_signuptoggle,
})(Login);
