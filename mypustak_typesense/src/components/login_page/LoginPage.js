"use client"
import React, { Component } from "react";
import { LoginCheck, showLoader } from "../../redux/actions/accountAction";
import { connect } from "react-redux";
// import { withStyles } from "@material-ui/core/styles"
import axios from "axios";
import config from "react-global-configuration";
import dynamic from "next/dynamic";
const LoginDiv = dynamic(() => import("./LoginDiv"), { ssr: false });
const SignupDiv = dynamic(() => import("./SignupDiv"), { ssr: false });
const LoginOtpDiv = dynamic(() => import("./LoginOtpDiv"), { ssr: false });
const ForgotpwdDiv = dynamic(() => import("./ForgotpwdDiv"), { ssr: false });
import Checkuser from "./Checkuser";
import styles from "../../styles/LoginDiv.module.css";
class LoginPage extends Component {
  static getInitialProps({ asPath }) {
    return { asPath };
  }
  state = {
    checkuser: true,
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
    if (this.props.userComponentStatus == 2 ) {
      // alert("already login ")
      window.location.replace("/");
    } else {
      this.setState({ ForgetResponse: 0 });
      this.setState({ CountMsg: 1 });
      this.setState({ url_pathname: window.location.pathname });
    }
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
    if (e.key !== "Enter")
      this.setState({ openForget: !this.state.openForget });
  };
  EmailErrrmsg = "";
  CaptchaErr = "";
  CheckSubmitForgot = () => {
    this.check();
    if (this.state.email === "") {
      this.EmailErrrmsg = "Please Fill up the Email";
    } else {
      this.EmailErrrmsg = "";
    }
    if (this.state.captcha !== this.state.Imgcaptcha) {
      this.setState({ CaptchaErr: "Captcha Did not match" });
      this.CaptchaErr = "Captcha Did not match";
    } else {
      this.setState({ CaptchaErr: "" });
      this.CaptchaErr = "";
    }
    if (this.CaptchaErr === "" && this.EmailErrrmsg === "") {
      this.SubmitForgot();
    }
  };
  check() {}
  SubmitForgot = e => {
    e.preventDefault();
    this.setState({ OpenForgetLoader: true, loginErrmsg: "" });
    const passdata = {
      email: this.state.Semail,
      "content-type": "multipart/form-data",
      boundary: "----WebKitFormBoundary7MA4YWxkTrZu0gW",
    };
    axios
      .post(`${config.get("apiDomain")}/core/forgot_password/`, passdata)
      .then(res => {
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
      this.props.showLoader();

      this.setState({ loading: true });
      this.props.LoginCheck(details);
    }
  };

  toggleForgetPassword = () => {
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
    this.setState({
      loginOtpToggle: !this.state.loginOtpToggle,
      login_signupshow: false,
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
      this.state.url_pathname == `/wallet/passbook/`
    ) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    return (
      <div className='d-flex align-items-center justify-content-center'>
        <div className={`${styles.mainDiv}`}>
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
        <style jsx>{``}</style>
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
  userComponentStatus: state.accountR.userComponentStatus,


  // SerLoginDat.state.acGetLoginData,
});

export default connect(mapStateToProps, {
  LoginCheck,
  // clearAll,
  showLoader,
})(LoginPage);
