import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import OtpInput from "react18-input-otp";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { CircularProgress } from "@mui/material";

import {
  RequestOtp,
  verifyOtp,
  LoginCheck,
  addPresetBulkCartOnLoginAction
} from "../../redux/actions/accountAction";
import { connect } from "react-redux";

class LoginOtpDiv extends Component {
  state = {
    is_otp_fun: false,
    showpwd: false,
    otp_sent: false,
    open_snackbar: false,
    inputotpValue: "",
    otpLignObj: {
      email: {
        value: "",
        valid: false,
        errormsg: "",
        validation: {
          isEmail: true,
          required: true,
        },
      },
      otp: {
        value: "",
        valid: false,
        errormsg: "",
        validation: {
          numeric: true,
          exactLenght: 6,
        },
      },
    },
    otpMsg: "",
    requestOtp: false,
    disableConfirmOtp: false,
    loadingBtn: false,
    resend_loader: false,
    Show_error: false,
    queryString: "",
    LoginErrMsg: "",
    ShowLoginErr: false,
  };
  componentDidMount() {
    const otpLignObj = { ...this.state.otpLignObj };
    const email_obj = { ...this.state.otpLignObj.email };
    const otp_obj = { ...this.state.otpLignObj.otp };
    email_obj.value = this.props.check_login_msg.email;
    otp_obj.value = "";
    otpLignObj.email = email_obj;
    otpLignObj.otp = otp_obj;
    this.setState({ otpLignObj, requestOtp: true });
    if (email_obj.value.length) {
      this.setState({ is_otp_fun: true });
    }
    // this.OTP_sent_fun()
    const queryString = window.location.search;

    // Parse the query string into an object
    const params = new URLSearchParams(queryString);

    // Get the value of the 'ret' parameter
    const rtl = params.get('ret');
    this.setState({ queryString: rtl });

    if (this.props.check_login_msg.is_google_login) {
      this.setState({
        ShowLoginErr: true,
        LoginErrMsg:
          "You are login with Google, Please use Google Login Or Use OTP for Login",
      });
    }
  }

  componentDidUpdate(prevProps, prevState) { }

  handleClickShowPassword = () => {
    this.setState({ showpwd: !this.state.showpwd });
  };

  handleClose = () => {
    this.setState({
      open_snackbar: false,
      ShowLoginErr: false,
      LoginErrMsg: "",
    });
  };
  handleMouseDownPassword = e => {
    e.preventDefault();
  };

  sentotp = e => {
    e.preventDefault();
    this.setState({ otp_sent: true, open_snackbar: true });
  };
  inputOtp = otp => {
    this.setState({ inputotpValue: otp });
  };
  validateEmail(email) {
    const re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  checkValidation = (value, validations) => {
    let isvalid = true,
      errormsg;

    if (validations.required) {
      if (value) {
        isvalid = value.trim() !== "" && isvalid;
        errormsg = errormsg
          ? errormsg
          : value.trim() !== ""
            ? ""
            : "This is mandatory field";
      }
    }
    if (validations.isEmail) {
      if (value) {
        isvalid = this.validateEmail(value.trim()) && isvalid;
        errormsg = errormsg
          ? errormsg
          : this.validateEmail(value.trim())
            ? ""
            : "Enter proper email";
      }
    }

    if (validations.numeric) {
      if (value) {
        isvalid = !isNaN(value.trim()) && isvalid;
        errormsg = errormsg
          ? errormsg
          : !isNaN(value.trim())
            ? ""
            : `Must be numeric`;
      }
    }
    if (validations.exactLenght) {
      if (value) {
        isvalid = value.trim().length === validations.exactLenght && isvalid;
        errormsg = errormsg
          ? errormsg
          : value.trim().length === validations.exactLenght
            ? ""
            : `Length must be  ${validations.exactLenght}`;
      }
    }

    return { isvalid, errormsg };
  };

  handelInputChanage = (e, fieldName) => {
    const otpLignObj = { ...this.state.otpLignObj };
    const currentObj = otpLignObj[fieldName];
    if (fieldName != "otp") {
      currentObj.value = e.target.value;
      if (this.state.otp_sent) {
        this.setState({ otp_sent: false });
        otpLignObj.otp.value = 0;
      }
    }
    if (fieldName == "otp") {
      currentObj.value = e;
    }

    const { isvalid, errormsg } = this.checkValidation(
      currentObj.value,
      currentObj.validation
    );
    currentObj.valid = isvalid;
    currentObj.errormsg = errormsg;
    let requestOtp = otpLignObj.email.valid;
    let disableConfirmOtp = otpLignObj.otp.valid;
    otpLignObj[fieldName] = currentObj;
    this.setState({ otpLignObj, requestOtp, disableConfirmOtp });
  };

  handleSubmit = e => {
    e.preventDefault();
    // alert('o')
    this.setState({ Show_error: false });
    const email = this.state.otpLignObj.email.value;
    const { requestOtp, disableConfirmOtp } = this.state;
    if (this.state.otp_sent) {
      if (!disableConfirmOtp) return;

      let otp_input = this.state.otpLignObj.otp.value;
      this.setState({ loadingBtn: true });
      const body = {
        email,
        otp: otp_input,
        valid_till: this.props.otp_valid_upto,
      };
      this.props
        .verifyOtp(body)
        .then(res => {
          // this.sentotp(e)
          this.setState({ loadingBtn: false });

          let backurl = this.state.queryString;
          const getCookieArr = document.cookie.split("; ");
          let Cookie_details = getCookieArr.filter((e) => e.startsWith("I="));
          let token;
          if (Cookie_details.length) {
            let details = Cookie_details[0].replace("I=", "");

            let json_details = JSON.parse(details);
            token = json_details.access;
          }
          if (backurl) {
            this.props.addPresetBulkCartOnLoginAction(token)
            window.location.replace(backurl);
          } else {
            this.props.addPresetBulkCartOnLoginAction(token)
            window.location.reload();

          }
        })
        .catch(err => {
          console.log({ err });
          this.setState({
            otpMsg: err.response.data.msg,
            open_snackbar: true,
            loadingBtn: false,
          });
        });
    } else {
      if (!requestOtp) return;
      this.setState({ requestOtp: false, loadingBtn: true });
      const body = {
        email,
        send_to_phone: 0,
      };

      this.props
        .RequestOtp(body)
        .then(res => {
          this.sentotp(e);
          this.setState({
            otpMsg: "OTP Sent Successfully, Please Check Your Registered Email",
            loadingBtn: false,
            requestOtp: true,
          });
        })
        .catch(err => {
          console.log({ err });
          this.setState({
            otpMsg: "OTP was not send.Please contact Mypustak support",
            open_snackbar: true,
            requestOtp: true,
            loadingBtn: false,
          });
        });
    }
  };

  resendCode = () => {
    this.setState({ resend_loader: true });
    const email = this.state.otpLignObj.email.value;
    this.setState({ requestOtp: false, disableConfirmOtp: false });
    const body = {
      email,
      send_to_phone: 0,
    };

    this.props
      .RequestOtp(body)
      .then(res => {
        // this.sentotp()
        this.setState({
          resend_loader: false,
          otpMsg: "OTP Sent Successfully, Please Check Your Registered Email",
          otp_sent: true,
          open_snackbar: true,
          disableConfirmOtp: true,
        });
      })
      .catch(err => {
        console.log({ err });
        this.setState({
          otpMsg: "OTP was not send.Please contact Mypustak support",
          open_snackbar: true,
          requestOtp: true,
          disableConfirmOtp: true,
        });
      });
  };

  OTP_sent_fun = () => {
    const email_obj = this.state.otpLignObj.email;
    const email = email_obj.value;
    const { requestOtp, disableConfirmOtp, is_otp_fun } = this.state;
    console.log(email, this.state.otpLignObj, "8596");
    if (email.length) {
      if (!is_otp_fun) return;
      this.setState({ requestOtp: false, loadingBtn: true, is_otp_fun: false });
      const body = {
        email,
        send_to_phone: 0,
      };

      this.props
        .RequestOtp(body)
        .then(res => {
          this.setState({ otp_sent: true, open_snackbar: true });
          this.setState({
            otpMsg: "OTP Sent Successfully, Please Check Your Registered Email",
            loadingBtn: false,
            requestOtp: true,
          });
        })
        .catch(err => {
          // alert("err")
          console.log({ err }, "error_log");
          this.setState({
            otpMsg: "OTP was not send.Please contact Mypustak support",
            open_snackbar: true,
            requestOtp: true,
            loadingBtn: false,
          });
        });
    }
  };

  SigninresponseGoogleSuccess = succ_response => {
    const body = {
      username: succ_response.profileObj.email,
      password: 13,
    };
    this.setState({ FormInvalid: false, loadingBtn: true });

    this.props
      .LoginCheck(body)
      .then(res => {
        // console.log({ res });
        this.setState({ FormInvalid: true, loadingBtn: false });
        let backurl = this.state.queryString;
        if (backurl) {
          // Router.replace(backurl)
          window.location.replace(backurl);
        }
      })
      .catch(err => {
        console.log(err, "fail");
        this.setState({
          ShowLoginErr: true,
          FormInvalid: true,
          loadingBtn: false,
        });
      });
  };

  SigninresponseGoogleFailure = fail_response => {
    if (fail_response.error) {
      if (fail_response.error !== "popup_closed_by_user") {
        this.setState({
          ShowLoginErr: true,
          LoginErrMsg:
            "Login failure due to some error.Contact Mypustak support",
        });
      }
    }
  };

  render() {
    const {
      otpLignObj,
      otp_sent,
      otpMsg,
      requestOtp,
      disableConfirmOtp,
      loadingBtn,
      Show_error,
    } = this.state;
    return (
      <div className='MainLoginDiv'>
        <div className='Main_WrraperDiv row'>
          <div className='Rightpart col-lg-12 col-md-12'>
            <div className='Login_form_div'>
              <form
                className='Login_form'
                autoComplete='off'
                onSubmit={this.handleSubmit}>
                <div
                  className='Login_feild'
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-around",
                  }}>
                  <TextField
                    variant='standard'
                    id='otp_email'
                    name='otp_email'
                    label='Enter Email'
                    style={{ width: "15rem", marginLeft: "0.5rem" }}
                    InputProps={{
                      style: { color: "grey" },
                    }}
                    margin='dense'
                    value={otpLignObj.email.value}
                    helperText={Show_error ? otpLignObj.email.errormsg : null}
                    error={
                      Show_error
                        ? otpLignObj.email.errormsg.length
                          ? true
                          : false
                        : false
                    }
                    required
                    disabled
                  />
                  <span
                    className='change'
                    onClick={() => {
                      this.props.setLogintoggle(false);
                      this.props.signupftoggle("login");
                      this.props.setEmailid("");
                      this.props.setPassword("");
                    }}>
                    Change?
                  </span>
                </div>
                {otp_sent && (
                  <div className='Login_feild'>
                    Enter OTP
                    <OtpInput
                      onChange={otp => this.handelInputChanage(otp, "otp")}
                      numInputs={6}
                      value={otpLignObj.otp.value}
                      separator={<span>&nbsp;</span>}
                      containerStyle={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                      inputStyle={{ width: "30px", height: "30px" }}
                    />
                  </div>
                )}

                <div className='Login_feild'>
                  {otp_sent ? (
                    <Button
                      fullWidth
                      variant='contained'
                      style={{
                        color: "#fff",
                        width: "9.563rem",
                        height: "2.188rem",
                        textTransform: "capitalize",
                        background:
                          "linear-gradient(90deg, #2157ad 0%, #6190da 100%)",
                      }}
                      type={otp_sent ? "submit" : "button"}>
                      {loadingBtn ? (
                        <CircularProgress
                          style={{ color: "white" }}
                          size='16'
                          thickness={5}
                        />
                      ) : (
                        `confirm`
                      )}
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant='contained'
                      // color="primary"
                      size='small'
                      style={{
                        color: "#fff",
                        fontSize: "0.85rem",
                        width: "9.563rem",
                        height: "2.188rem",
                        textTransform: "capitalize",
                        background:
                          "linear-gradient(90deg, #2157ad 0%, #6190da 100%)",
                      }}
                      // onClick={this.sentotp}
                      type={otp_sent ? "button" : "submit"}
                    // disabled={!requestOtp}
                    >
                      {loadingBtn ? (
                        <CircularProgress
                          style={{ color: "white" }}
                          size={15}
                          thickness={5}
                        />
                      ) : (
                        `send OTP`
                      )}
                    </Button>
                  )}
                </div>
              </form>

              <div className='other_login'>
                {otp_sent ? (
                  <div className='create_acount_text'>
                    <p>
                      Not received your code?{" "}
                      <span
                        className='text_span'
                        onClick={() => this.resendCode()}>
                        {this.state.resend_loader ? (
                          <CircularProgress size={16} thickness={5} />
                        ) : (
                          "Resend Code"
                        )}
                      </span>
                    </p>
                  </div>
                ) : null}

                <div className='create_acount_text'>
                  <p>
                    Existing User?
                    <span
                      className='text_span'
                      onClick={() => this.props.signupftoggle("login")}>
                      Login
                    </span>
                  </p>
                </div>

                {this.props.check_login_msg.is_google_login ? (
                  <p
                    style={{
                      textAlign: "center",
                      color: "gray",
                      fontSize: "0.9rem",
                      margin: "0px",
                    }}>
                    OR
                  </p>
                ) : null}
                {/* {this.props.check_login_msg.is_google_login ? (
                  <div className='create_acount_text'>
                    <GoogleLogin
                      theme='Light'
                      onSuccess={res => this.SigninresponseGoogleSuccess(res)}
                      onFailure={err => this.SigninresponseGoogleFailure(err)}
                      buttonText='Continue With Google'
                      style={{
                        width: "10rem",
                        border: "1px solid lightgray",
                        boxShadow: "0px",
                      }}
                      fetchBasicProfile='true'
                      clientId='1069312884662-fiaaip0hrbjd2kc6sqf2ebudokp4u1a7.apps.googleusercontent.com'
                      cookiePolicy={"single_host_origin"}
                    />
                  </div>
                ) : null} */}
              </div>
            </div>
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          style={{ zIndex: "50001" }}
          open={this.state.open_snackbar}
          autoHideDuration={5000}
          onClose={this.handleClose}
          message={`${otpMsg}`}
        />

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          style={{ zIndex: "50001" }}
          open={this.state.ShowLoginErr}
          onClose={this.handleClose}
          message={`${this.state.LoginErrMsg}`}
          autoHideDuration={5000}
        />

        <style jsx>
          {`
            .MainLoginDiv {
              background: linear-gradient(270deg, #81dbfb 0%, #0067c5 100%);
              // width: 22rem;
            }
            .change {
              margin-right: 12px;
              color: #2248ae;
              font-size: 0.88rem;
              cursor: pointer;
              opacity: 0.95;
            }
            .change:hover {
              opacity: 1;
              // font-weight:600;
            }
            .row {
              margin: 0%;
              padding: 0%;
            }
            .Leftpart {
              padding: 40px 10px;
              color: white;
              min-height: 82vh;
            }
            .mob_content {
              display: none;
              flex-direction: column;
            }
            .left_heading {
              font-size: 1.3rem;
              // font-weight: bold;
            }
            .leftpart_lower {
              margin-top: 100px;
              text-align: center;
            }
            .leftpart_lower p {
              padding: 0px;
              margin: 1px;
              font-size: 0.9rem;
            }
            .createbtn {
              border: 0px solid white;
              color: #0070e7;
              background: white;
              padding: 1% 3%;
              border-radius: 5px;
              outline: none;
            }
            .Rightpart {
              background: white;
            }
            .Login_form {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .Login_form_div {
              display: flex;
              flex-direction: column;
              // animation-name: in;
              height: 100%;
              min-width: 18rem;
              max-width: 18rem;
              // margin-top:15px;
              align-items: center;
              margin-left: 45px;
              margin-top: 25px;
              // justify-content:space-between;
              // animation-duration: 2000ms;
            }
            .Login_feild {
              padding-top: 10px;
            }
            .other_login {
              padding-top: 10px;
              text-align: center;
            }
            .create_acount_text {
              padding: 10px;
              font-size: 0.9rem;
              text-align: center;
            }
            .text_span {
              color: #0070e7;
              font-weight: bold;
              cursor: pointer;
            }
            @media only screen and (max-width: 768px) {
              .Leftpart {
                padding: 20px 33px;
                padding-bottom: 0px;
              }
              .content {
                display: none;
              }
              .mob_content {
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .img_logo img {
                width: 20vw;
                // border:1px solid black;
              }
              .mob_contentText {
                // font-size:1.5rem;
                text-align: center;
                font-weight: bold;
                padding-top: 10px;
              }
              .left_heading {
                font-size: 1.5rem;
                // font-weight: bold;
                padding: 0px;
                margin: 0px;
              }
              .left_heading p {
                margin: 0px;
              }
              .Leftpart {
                min-height: 5vh;
              }
              .Rightpart {
                // border-radius: 20px 20px 0px 0px;
                height: 100%;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

const mapDispatchToProps = ({ accountR }) => {
  const { otp_valid_upto, check_login_msg } = accountR;
  return { otp_valid_upto, check_login_msg };
};
export default connect(mapDispatchToProps, {
  RequestOtp,
  verifyOtp,
  LoginCheck,
  addPresetBulkCartOnLoginAction,
})(LoginOtpDiv);
