import React, { Component } from "react";
import TextField from "@mui/material/TextField";
// import OtpInput from "react-otp-input";
import OtpInput from "react18-input-otp";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { CircularProgress } from "@mui/material";
import {
  RequestOtp,
  verifyOtp,
  LoginCheck,
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.otpLignObj !== prevState.otpLignObj) {
      if (this.state.is_otp_fun) {
        this.OTP_sent_fun();
      }
    }
    if (this.props.check_login_msg.email !== prevProps.check_login_msg.email) {
    }
  }

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
          this.setState({ loadingBtn: false });

          let backurl = this.state.queryString;
          if (backurl) {
            window.location.replace(backurl);
          } else {
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
    // alert("otpfun")
    const email_obj = this.state.otpLignObj.email;
    const email = email_obj.value;
    const { requestOtp, disableConfirmOtp, is_otp_fun } = this.state;
    // alert(email)
    console.log(email, this.state.otpLignObj, "8596");
    if (email.length) {
      // alert(requestOtp)
      if (!is_otp_fun) return;
      this.setState({ requestOtp: false, loadingBtn: true, is_otp_fun: false });
      const body = {
        email,
        send_to_phone: 0,
      };

      this.props
        .RequestOtp(body)
        .then(res => {
          // this.sentotp(e)
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
          <div className='Leftpart col-lg-5 col-md-5'>
            <div className='content'>
              <div className='left_text'>
                <p className='left_heading'>Login with OTP!</p>
                <p>Create your account with mypustak</p>
              </div>

              <div className='leftpart_lower'>
                <p>Existing User?</p>

                <button
                  className='createbtn'
                  onClick={() => this.props.signupftoggle("login")}>
                  Login
                </button>
              </div>
            </div>
            <div className='mob_content'>
              <div className='img_logo'>
                <img
                  alt=''
                  src={`https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo..png`}
                />
              </div>
              <div className='mob_contentText'>
                <p className='left_heading'>Login with OTP!</p>
                {/* <p>Get access to your Orders, profile and Recommendations</p> */}
              </div>
            </div>
          </div>

          <div className='Rightpart col-lg-7 col-md-7'>
            <div className='Login_form_div'>
              <form
                className='Login_form'
                autoComplete='off'
                onSubmit={this.handleSubmit}>
                <div className='Login_feild'>
                  <TextField
                    variant='standard'
                    id='otp_email'
                    name='otp_email'
                    label='Enter Email'
                    color='primary'
                    fullWidth
                    margin='dense'
                    onChange={e => this.handelInputChanage(e, "email")}
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
                  />
                </div>
                {otp_sent && (
                  <div className='Login_feild'>
                    Enter OTP
                    <OtpInput
                      // onChange={(otp) => this.inputOtp(otp)}
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
                      color='primary'
                      type={otp_sent ? "submit" : "button"}>
                      {loadingBtn ? (
                        <CircularProgress
                          style={{ color: "white" }}
                          size='1.6rem'
                        />
                      ) : (
                        `confirm`
                      )}
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant='contained'
                      color='primary'
                      type={otp_sent ? "button" : "submit"}>
                      {loadingBtn ? (
                        <CircularProgress
                          style={{ color: "white" }}
                          size='1.6rem'
                        />
                      ) : (
                        `sent OTP`
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
                          <CircularProgress size='1.5rem' />
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
                {this.props.check_login_msg.is_google_login ? (
                  <div className='create_acount_text'></div>
                ) : null}
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
          autoHideDuration={3000}
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
            .Login_form_div {
              padding: 0px 4%;
              padding-bottom: 0%;
              margin-top: 1rem;
            }
            .Login_feild {
              padding-top: 20px;
            }
            .other_login {
              padding-top: 10px;
              text-align: center;
            }
            .create_acount_text {
              padding: 15px;
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
                border-radius: 20px 20px 0px 0px;
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
})(LoginOtpDiv);
