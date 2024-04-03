/* eslint-disable */
import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

import Link from "next/link";
import { signupCheck } from "../../redux/actions/accountAction";
import { connect } from "react-redux";
import { CircularProgress } from "@mui/material";
import { CartSession } from "../../redux/actions/cartAction";
class SignupDiv extends Component {
  state = {
    showpwd: false,
    errors: {
      signup_email: "",
      signup_mobile: "",
      signup_password: "",
    },
    signup_obj: {
      email: {
        value: "",
        valid: false,
        errormsg: "",
        validation: {
          isEmail: true,
          required: true,
        },
      },
      mobile_no: {
        value: "",
        valid: false,
        errormsgL: "",
        validation: {
          numeric: true,
          exactLenght: 10,
        },
      },
      password: {
        value: "",
        valid: false,
        errormsg: "",
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
    FormInvalid: false,
    ShowSignupErr: false,
    ErrMsg: "",
    loadingBtn: false,
    Show_error: false,
    queryString: "",
  };
  componentDidMount() {
    const signup_obj = { ...this.state.signup_obj };
    const email_obj = { ...this.state.signup_obj.email };
    const mobile_no_obj = { ...this.state.signup_obj.mobile_no };
    const password_obj = { ...this.state.signup_obj.password };
    email_obj.value = this.props.check_login_msg.email;
    email_obj.valid = true;
    password_obj.value = "";
    mobile_no_obj.value = "";
    signup_obj.email = email_obj;
    signup_obj.mobile_no = mobile_no_obj;
    signup_obj.password = password_obj;

    this.setState({ signup_obj });

    const queryString = window.location.search;

    // Parse the query string into an object
    const params = new URLSearchParams(queryString);

    // Get the value of the 'ret' parameter
    const rtl = params.get('ret');
    this.setState({ queryString: rtl });
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.SignUpErrMsg !== prevProps.SignUpErrMsg) {
      this.setState({ ErrMsg: this.props.SignUpErrMsg });
    }

    if (this.props.check_login_msg.email !== prevProps.check_login_msg.email) {
      const signup_obj = { ...this.state.signup_obj };
      const email_obj = { ...this.state.signup_obj.email };
      const mobile_no_obj = { ...this.state.signup_obj.mobile_no };
      const password_obj = { ...this.state.signup_obj.password };
      email_obj.value = this.props.check_login_msg.email;
      password_obj.value = "";
      mobile_no_obj.value = "";
      signup_obj.email = email_obj;
      signup_obj.mobile_no = mobile_no_obj;
      signup_obj.password = password_obj;

      this.setState({ signup_obj });
    }
  };
  handleClickShowPassword = () => {
    this.setState({ showpwd: !this.state.showpwd });
  };

  handleMouseDownPassword = e => {
    e.preventDefault();
  };
  signupftoggle = () => {
    this.props.signupftoggle("login");
  };
  validateEmail(email) {
    const re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }
  validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone);
  }
  onChangeHandler = e => {
    e.preventDefault();

    let name = e.target.name;
    let value = e.target.value;
    let errors = this.state.errors;

    switch (name) {
      case "signup_email":
        let email = this.validateEmail(value);
        if (email) {
          errors.signup_email = "";
        } else {
          errors.signup_email = "enter valid email";
        }
        break;
      case "signup_mobile":
        let mobile = this.validatePhone(value);
        // console.log(mobile, "1111222m")
        errors.signup_mobile = mobile ? "" : "mobile no. should be 10 digit";
        break;
      case "signup_password":
        errors.signup_password =
          value.length < 6 ? "password atleast 6 digit" : "";
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  onChangeSignupHandler = (e, obj_name) => {
    this.setState({ Show_error: false });
    const signup_obj = { ...this.state.signup_obj };
    const current_obj = { ...this.state.signup_obj[obj_name] };
    current_obj.value = e.target.value;
    const { isvalid, errormsg } = this.checkValidation(
      current_obj.value,
      current_obj.validation
    );
    current_obj.valid = isvalid;
    current_obj.errormsg = errormsg;

    signup_obj[obj_name] = current_obj;

    let FormInvalid = true;
    for (let field in signup_obj) {
      console.log(signup_obj[field].valid, "96369");
      FormInvalid = signup_obj[field].valid && FormInvalid;
    }

    this.setState({ signup_obj, FormInvalid });
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

    if (validations.minLength) {
      if (value) {
        isvalid = value.trim().length >= validations.minLength && isvalid;
        errormsg = errormsg
          ? errormsg
          : value.trim().length >= validations.minLength
          ? ""
          : `Minimum length must be more than ${validations.minLength}`;
      }
    }
    return { isvalid, errormsg };
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ Show_error: true });
    const { signup_obj, FormInvalid } = this.state;
    if (!FormInvalid) return;
    const details = {
      email: signup_obj.email.value,
      password: signup_obj.password.value,
      mobile: signup_obj.mobile_no.value,
      role_id: "0",
    };

    this.setState({
      signup_loading: true,
      // FormInvalid: false,
      loadingBtn: true,
    });
    this.props
      .signupCheck(details)
      .then(res => {
        this.props.CartSession().then((res) =>{
          this.setState({
            signup_loading: false,
            // FormInvalid: true,
            loadingBtn: false,
          });
  
          let backurl = this.state.queryString;
          if (backurl) {
            // Router.replace(backurl)
            window.location.replace(backurl);
            // window.location.href= backurl
          } else {
            window.location.reload();
          }
        })
        .catch(err => {
          console.log({ err }, "12222");
          this.setState({
            signup_loading: false,
            // FormInvalid: false,
            ShowSignupErr: true,
            loadingBtn: false,
            Show_error: false,
          });
          if (err == 417) {
            this.props.loginOtpToggle();
          }
        });
        }).catch((err) =>{
 // console.log({ res });
          this.setState({
            signup_loading: false,
            // FormInvalid: true,
            loadingBtn: false,
          });

          let backurl = this.state.queryString;
          if (backurl) {
            // Router.replace(backurl)
            window.location.replace(backurl);
            // window.location.href= backurl
          } else {
            window.location.reload();
          }
          })
          .catch(err => {
          console.log({ err }, "12222");
          this.setState({
            signup_loading: false,
            // FormInvalid: false,
            ShowSignupErr: true,
            loadingBtn: false,
            Show_error: false,
          });
          if (err == 417) {
            this.props.loginOtpToggle();
          }
          })
        
       
  };

  SignupresponseGoogleSuccess = succ_response => {
    const body = {
      email: succ_response.profileObj.email,
      password: 13,
      mobile: "",
      role_id: "0",
    };

    this.props
      .signupCheck(body)
      .then(res => {
        let backurl = this.state.queryString;
        if (backurl) {
          window.location.replace(backurl);
          // window.location.href= backurl
        } else {
          window.location.reload();
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ ShowSignupErr: true });
      });
  };

  SignupresponseGoogleFailure = fail_response => {
    console.log({ fail_response });
    this.setState({
      ShowSignupErr: true,
      ErrMsg: "Signup not possible due to some error.Contact Mypustak support",
    });
  };
  handleClose = () => {
    this.setState({ ShowSignupErr: false });
  };
  render() {
    const {
      errors,
      signup_obj,
      showpwd,
      FormInvalid,
      ShowSignupErr,
      ErrMsg,
      loadingBtn,
      Show_error,
    } = this.state;
    const { SignUpErrMsg } = this.props;
    return (
      <div className='MainLoginDiv'>
        <div className='Main_WrraperDiv row'>
          <div className='Leftpart col-lg-5 col-md-5'>
            <div className='content'>
              <div className='left_text'>
                <p className='left_heading'>Looks like you're new here!</p>
                <p>Create your account with MyPustak to get started.</p>
              </div>

              <div className='leftpart_lower'>
                <p>Existing User?</p>
                <button className='createbtn' onClick={this.signupftoggle}>
                  Login
                </button>
              </div>
            </div>
            <div className='mob_content'>
              <div className='img_logo'>
                <img
                  src={`https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo..png`}
                />
              </div>
              <div className='mob_contentText'>
                <p className='left_heading'>Looks like you're new here!</p>
                <p>Create your account with mypustak to get started</p>
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
                    error={
                      Show_error
                        ? signup_obj.email.errormsg
                          ? true
                          : false
                        : false
                    }
                    id='signup_email'
                    name='signup_email'
                    label='Enter Email'
                    onChange={e => this.onChangeSignupHandler(e, "email")}
                    // onChange={this.onChangeHandler}
                    variant='standard'
                    color='primary'
                    fullWidth
                    margin='dense'
                    // helperText={errors.signup_email}
                    helperText={Show_error ? signup_obj.email.errormsg : null}
                    value={signup_obj.email.value}
                    required
                  />
                </div>
                <div className='Login_feild'>
                  <TextField
                    variant='standard'
                    error={
                      Show_error
                        ? signup_obj.mobile_no.errormsg
                          ? true
                          : false
                        : false
                    }
                    id='signup_mobile'
                    name='signup_mobile'
                    label='Enter Mobile No'
                    onChange={e => this.onChangeSignupHandler(e, "mobile_no")}
                    color='primary'
                    fullWidth
                    margin='dense'
                    helperText={
                      Show_error ? signup_obj.mobile_no.errormsg : null
                    }
                    value={signup_obj.mobile_no.value}
                    inputProps={{ maxLength: "10" }}
                    required
                  />
                </div>
                <div className='Login_feild'>
                  <FormControl fullWidth>
                    <InputLabel
                      htmlFor='adornment-password'
                      error={
                        Show_error
                          ? signup_obj.password.errormsg.length
                            ? true
                            : false
                          : false
                      }>
                      Enter Password
                    </InputLabel>
                    <Input
                      error={
                        Show_error
                          ? signup_obj.password.errormsg.length
                            ? true
                            : false
                          : false
                      }
                      id='signup_password'
                      name='signup_Password'
                      label='Enter Password'
                      type={showpwd ? `text` : `password`}
                      // onChange={this.onChangeHandler}
                      onChange={e => this.onChangeSignupHandler(e, "password")}
                      fullWidth
                      margin='dense'
                      value={signup_obj.password.value}
                      required
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}>
                            {showpwd ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>
                      {Show_error ? signup_obj.password.errormsg : null}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className='Login_feild'>
                  <p
                    className='warning'
                    style={{
                      fontSize: "0.7rem",
                      marginBottom: "10px",
                      marginTop: "-10px",
                      color: "gray",
                    }}>
                    By clicking Signup, you agree to MyPustak's{" "}
                    <Link href='/pages/terms-conditions' legacyBehavior>
                      <a
                        href='/pages/terms-conditions'
                        style={{ textDecoration: "none" }}>
                        <span> Terms of Use </span>
                      </a>
                    </Link>
                    and
                    <Link href='/pages/privacy-policy' legacyBehavior>
                      <a
                        href='/pages/privacy-policy'
                        style={{ textDecoration: "none" }}>
                        <span> Privacy Policy</span>
                      </a>
                    </Link>
                    .
                  </p>
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    // disabled={!FormInvalid}
                    type='submit'>
                    {loadingBtn ? (
                      <CircularProgress
                        style={{ color: "white" }}
                        size='1.6rem'
                      />
                    ) : (
                      `SignUp`
                    )}
                  </Button>
                </div>
              </form>

              <div className='other_login'>
                <div className='other_options'></div>

                <div className='create_acount_text'>
                  <p>
                    Existing User?
                    <span className='text_span' onClick={this.signupftoggle}>
                      Login
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={ShowSignupErr}
            onClose={this.handleClose}
            message={`${ErrMsg}`}
            autoHideDuration={5000}
            style={{ zIndex: "50001" }}
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
            .left_heading {
              font-size: 1.3rem;
              // font-weight: bold;
            }
            .mob_content {
              display: none;
              flex-direction: column;
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
                flex-direction: column;
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
  const { SignUpErrMsg, check_login_msg } = accountR;
  return { SignUpErrMsg, check_login_msg };
};

export default connect(mapStatesToProps, { signupCheck,CartSession })(SignupDiv);
