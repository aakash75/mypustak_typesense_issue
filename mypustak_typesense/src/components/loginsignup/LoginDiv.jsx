import React, { Component } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { LoginCheck, clearLoginErr } from "../../redux/actions/accountAction";
import { connect } from "react-redux";
import { CircularProgress } from "@mui/material";

class LoginDiv extends Component {
  state = {
    showpwd: false,
    openForget: false,
    login_obj: {
      email_phone: {
        value: "",
        valid: true,
        errormsg: "",
        disabled: true,
        validation: {
          isEmail: true,
          required: true,
        },
      },
      password: {
        value: "",
        valid: false,
        errormsg: "",
        validation: {
          required: true,
        },
      },
    },
    FormInvalid: true,
    ShowLoginErr: false,
    LoginErrMsg: "",
    loadingBtn: false,
    loginsucess: false,
    Show_error: false,
    queryString: "",
  };

  componentDidMount() {
    const login_obj = { ...this.state.login_obj };
    const email_obj = { ...this.state.login_obj.email_phone };
    const password_obj = { ...this.state.login_obj.password };
    email_obj.value = this.props.check_login_msg.email;
    password_obj.value = "";
    login_obj.email_phone = email_obj;
    login_obj.password = password_obj;
    this.setState({ login_obj });

    const queryString = window.location.search;

    // Parse the query string into an object
    const params = new URLSearchParams(queryString);

    // Get the value of the 'ret' parameter
    const rtl = params.get('ret');
    this.setState({ queryString: rtl });
    this.props.clearLoginErr();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.ErrMsg !== prevProps.ErrMsg ||
      this.state.LoginErrMsg != prevState.LoginErrMsg
    ) {
      this.setState({ LoginErrMsg: this.props.ErrMsg });
    }
    if (this.props.check_login_msg.email !== prevProps.check_login_msg.email) {
      const login_obj = { ...this.state.login_obj };
      const email_obj = { ...this.state.login_obj.email_phone };
      const password_obj = { ...this.state.login_obj.password };
      email_obj.value = this.props.check_login_msg.email;
      password_obj.value = "";
      login_obj.email_phone = email_obj;
      login_obj.password = password_obj;
      this.setState({ login_obj });
    }
  };
  handleClickShowPassword = () => {
    this.setState({ showpwd: !this.state.showpwd });
  };

  validateEmail(email) {
    const re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }
  validatePhone(phone) {
    const re = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    return re.test(phone);
  }

  handleLoginInputs = (e, obj_name) => {
    const login_obj = { ...this.state.login_obj };
    const current_obj = { ...this.state.login_obj[obj_name] };

    // console.log(login_obj[obj_name]);
    current_obj.value = e.target.value;
    const { isvalid, errormsg } = this.checkValidation(
      current_obj.value,
      current_obj.validation
    );
    current_obj.valid = isvalid;
    current_obj.errormsg = errormsg;

    login_obj[obj_name] = current_obj;

    let FormInvalid = true;
    for (let field in login_obj) {
      FormInvalid = login_obj[field].valid && FormInvalid;
    }
    // console.log({FormInvalid});

    this.setState({ login_obj, FormInvalid, Show_error: false });
  };

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
          : "Enter valid email";
      }
    }
    return { isvalid, errormsg };
  };
  handleLoginSubmit = e => {
    this.setState({ Show_error: true });
    e.preventDefault();
    const { login_obj, FormInvalid } = this.state;

    if (!FormInvalid) return;
    let body = {
      username: login_obj.email_phone.value,
      password: login_obj.password.value,
    };
    this.setState({ FormInvalid: false, loadingBtn: true });
    this.props
      .LoginCheck(body)
      .then(res => {
        // console.log("loging")
        this.setState({
          FormInvalid: true,
          loadingBtn: false,
          loginsucess: true,
        });
        let backurl = this.state.queryString;
        if (backurl) {
          // Router.replace(backurl )
          // // Router.push(backurl)
          window.location.replace(backurl);
        } else {
          window.location.reload();
        }
      })
      .catch(err => {
        this.setState({
          ShowLoginErr: true,
          FormInvalid: true,
          loadingBtn: false,
        });
      });
  };

  handleClose = () => {
    this.setState({ ShowLoginErr: false });
  };

  SigninresponseGoogleSuccess = succ_response => {
    console.log(succ_response.profileObj, "google");
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
          // Router.replace(backurl )
          // // Router.push(backurl)
          window.location.replace(backurl);
        } else {
          window.location.reload();
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          ShowLoginErr: true,
          FormInvalid: true,
          loadingBtn: false,
        });
      });
  };

  SigninresponseGoogleFailure = fail_response => {
    console.log({ fail_response });
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

  back_checkuser = () => {
    this.props.signupftoggle("login");
    this.props.checkuserToggle();
  };

  render() {
    const {
      login_obj,
      showpwd,
      ShowLoginErr,
      LoginErrMsg,
      loadingBtn,
      Show_error,
    } = this.state;

    return (
      <div className='MainLoginDiv'>
        <div className='Main_WrraperDiv row'>
          <div className='Leftpart col-lg-5 col-md-5'>
            <div className='content'>
              <div className='left_text'>
                <p className='left_heading'>Welcome Back!</p>
                <p>Get access to your Orders, profile and Recommendations</p>
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
                <p className='left_heading'>Welcome Back!</p>
                <p>Get access to your Orders, profile and Recommendations</p>
              </div>
            </div>
          </div>

          <div className='Rightpart col-lg-7 col-md-7'>
            <div className='Login_form_div'>
              <form
                className='Login_form'
                autoComplete='off'
                onSubmit={this.handleLoginSubmit}>
                <div className='Login_feild'>
                  <FormControl fullWidth>
                    <InputLabel
                      htmlFor='adornment-password'
                      error={
                        Show_error
                          ? login_obj.email_phone.errormsg
                            ? true
                            : false
                          : false
                      }>
                      Enter Email
                    </InputLabel>
                    <Input
                      id='login_email'
                      name='login_Email'
                      label='Enter Email'
                      color='primary'
                      fullWidth
                      margin='dense'
                      style={{ color: "gray" }}
                      onChange={e => this.handleLoginInputs(e, "email_phone")}
                      value={login_obj.email_phone.value}
                      readOnly={login_obj.email_phone.disabled}
                      type='text'
                      error={
                        Show_error
                          ? login_obj.email_phone.errormsg
                            ? true
                            : false
                          : false
                      }
                      required
                      endAdornment={
                        <InputAdornment position='end'>
                          <div
                            style={{
                              color: "#007bff",
                              fontWeight: "bold",
                              fontSize: "0.9rem",
                              cursor: "pointer",
                            }}
                            onClick={this.back_checkuser}>
                            Change?
                          </div>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>
                      {Show_error ? login_obj.email_phone.errormsg : null}
                    </FormHelperText>
                  </FormControl>
                </div>

                <div className='Login_feild'>
                  <FormControl fullWidth>
                    <InputLabel
                      htmlFor='adornment-password'
                      error={
                        Show_error
                          ? login_obj.password.errormsg.length
                            ? true
                            : false
                          : false
                      }>
                      Enter Password
                    </InputLabel>
                    <Input
                      id='login_password'
                      name='login_Password'
                      label='Enter Password'
                      fullWidth
                      margin='dense'
                      value={login_obj.password.value}
                      onChange={e => this.handleLoginInputs(e, "password")}
                      type={showpwd ? `text` : `password`}
                      error={
                        Show_error
                          ? login_obj.password.errormsg.length
                            ? true
                            : false
                          : false
                      }
                      required
                    />
                    <FormHelperText>
                      {login_obj.password.errormsg}
                    </FormHelperText>

                    <p
                      style={{ textAlign: "right", cursor: "pointer" }}
                      onClick={() => this.props.toggleForgetPassword()}>
                      Forgot Password?
                    </p>
                  </FormControl>
                </div>
                <div className='Login_feild'>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={this.handleLoginSubmit}>
                    {loadingBtn ? <CircularProgress size='1.6rem' /> : `Login`}
                  </Button>
                </div>
              </form>

              <div className='other_login'>
                <p
                  style={{
                    textAlign: "center",
                    color: "gray",
                    fontSize: "0.9rem",
                  }}>
                  OR
                </p>
                <div className='other_options'>
                  <Button
                    fullWidth
                    variant='outlined'
                    color='primary'
                    onClick={() => this.props.loginOtpToggle()}>
                    Login With Email OTP
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            style={{ zIndex: "50001" }}
            open={ShowLoginErr}
            onClose={this.handleClose}
            message={`${this.state.LoginErrMsg}`}
            autoHideDuration={5000}
            // key={vertical + horizontal}
          />
        </div>

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
const mapStatesToProps = ({ accountR }) => {
  const { ErrMsg, check_login_msg } = accountR;
  return { ErrMsg, check_login_msg };
};
export default connect(mapStatesToProps, { LoginCheck, clearLoginErr })(
  LoginDiv
);
