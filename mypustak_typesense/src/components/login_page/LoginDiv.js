import React, { Component } from "react";
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
import Image from "next/legacy/image";
import { useSearchParams } from 'next/navigation'
import loginimage from "../../assets/LoginImage.svg";
import { LoginCheck, clearLoginErr, addPresetBulkCartOnLoginAction } from "../../redux/actions/accountAction";
import { connect } from "react-redux";
import { CircularProgress } from "@mui/material";
import styles from "../../styles/LoginDiv.module.css"

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
    adding_cart: false,
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
    const urlParams = new URLSearchParams(queryString);
    const rtl = urlParams.get('ret');
   
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
          if (backurl == "/view-cart") {
            this.setState({ adding_cart: true })
            const getCookieArr = document.cookie.split("; ");
            let Cookie_details = getCookieArr.filter(e => e.startsWith("I="));
            let token;
            if (Cookie_details.length) {
              let details = Cookie_details[0].replace("I=", "");
              let json_details = JSON.parse(details);
              token = json_details.access;
            }
            this.props.addPresetBulkCartOnLoginAction(token).then((res) => {
              // this.setState({ adding_cart: false })
              window.location.replace(backurl)
            }).catch((err) => {
              // this.setState({ adding_cart: false })
              window.location.replace(backurl)
            })

          } else {
            window.location.replace(backurl);
          }
          //   Router.replace(backurl);
          //   window.location.load(backurl);

          //   Router.push(backurl);
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
      <div>
        {this.state.adding_cart ?
          <center><div style={{ marginTop: "2rem" }}>
            <CircularProgress />
            <h5>Hold on, your item is on its way to the cart ...</h5>
          </div></center>
          :

          <div className={`${styles.MainLoginDiv}`}>
            <div className='Main_WrraperDiv row m-0 p-0 '>
              <div className={`${styles.Leftpart} col-lg-5 col-md-5`}>
                <div
                  className='logoDiv'
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingBottom: "0.5rem",
                  }}>
                  <span className={`${styles.left_heading}`}>Welcome Back!</span>
                  <span className={`${styles.innerText}`}>
                    Get access to your Orders, profile and Recommendations
                  </span>
                </div>
                <div className={`${styles.bannerImgWeb}`}>
                  <Image src={loginimage} alt='' />
                </div>
              </div>

              <div className={`${styles.Rightpart} col-lg-7 col-md-7`}>
                <div className={`${styles.Login_form_div}`}>
                  <form
                    className='Login_form'
                    autoComplete='off'
                    onSubmit={this.handleLoginSubmit}>
                    <div className={`${styles.Login_feild}`}>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{ marginLeft: "-0.9rem", marginTop: "0.6rem" }}
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
                                className={`${styles.chnageText}`}
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

                    <div className={`${styles.Login_feild}`}>
                      <FormControl required fullWidth>
                        <InputLabel
                          htmlFor='adornment-password'
                          // style={{ marginTop: "0.5rem", marginBottom: "0.3rem" }}
                          style={{ margin: "0.5rem", marginLeft: "-0.9rem" }}
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
                          {login_obj.password.errormsg}
                        </FormHelperText>

                        <p
                          className={`${styles.forgetPasswort}`}
                          onClick={() => this.props.toggleForgetPassword()}>
                          Forgot Password?
                        </p>
                      </FormControl>
                    </div>
                    <div className={`${styles.Login_feild}`}>
                      <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        style={{
                          background:
                            "linear-gradient(90deg, #2157ad 0%, #6190da 100%)",
                          color: "#fff",
                          textTransform: "capitalize",
                          witdh: "8rem",
                          height: "2.5rem",
                        }}
                        onClick={this.handleLoginSubmit}>
                        {loadingBtn ? (
                          <CircularProgress
                            size='1.6rem'
                            style={{ color: "#fff" }}
                          />
                        ) : (
                          `Login`
                        )}
                      </Button>
                    </div>
                  </form>

                  <div className={`${styles.other_login}`}>
                    <span
                      style={{
                        textAlign: "center",
                        color: "gray",
                        fontSize: "0.9rem",
                      }}>
                      OR
                    </span>
                    <div
                      style={{ paddingBottom: "0.5rem" }}
                      className='other_options'>
                      <Button
                        fullWidth
                        variant='outlined'
                        color='primary'
                        style={{ textTransform: "capitalize" }}
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
              />
            </div>

            <style jsx>
              {`
           
            
          `}
            </style>
          </div>}
      </div>
    );
  }
}
const mapStatesToProps = ({ accountR }) => {
  const { ErrMsg, check_login_msg } = accountR;
  return { ErrMsg, check_login_msg };
};
export default connect(mapStatesToProps, { LoginCheck, clearLoginErr, addPresetBulkCartOnLoginAction })(
  LoginDiv
);
