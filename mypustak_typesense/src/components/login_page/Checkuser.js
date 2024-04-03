"use client"
import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, Button, Snackbar, CircularProgress } from "@mui/material";
import loginimage from "../../assets/LoginImage.svg";
import queryString from "query-string";
import {
  LoginCheck,
  clearLoginErr,
  check_user_existance,
} from "../../redux/actions/accountAction";
import Image from "next/legacy/image";
import styles from "../../styles/Checkuser.module.css"
class Checkuser extends Component {
  state = {
    check_userObj: {
      email_phone: {
        value: "",
        valid: false,
        errormsg: "",
        validation: {
          isEmail: true,
          required: true,
        },
      },
    },
    FormInvalid: true,
    Show_error: false,
    loadingBtn: false,
    ShowLoginErr: false,
    openForget: false,
    LoginErrMsg: "",
    url: "",
  };
  componentDidMount() {
    let params = queryString.parse(window.location.search);
    console.log(params["ret"]);
    this.setState({
      url: params["ret"],
    });
  }

  componentDidUpdate(prevProps, prevState) { }
  validateEmail(email) {
    const re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }
  validatePhone(phone) {
    const re = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    return re.test(phone);
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
            : "Enter valid email";
      }
    }
    return { isvalid, errormsg };
  };

  handleLoginInputs = (e, obj_name) => {
    const check_userObj = { ...this.state.check_userObj };
    const current_obj = { ...this.state.check_userObj[obj_name] };
    current_obj.value = e.target.value;
    const { isvalid, errormsg } = this.checkValidation(
      current_obj.value,
      current_obj.validation
    );
    current_obj.valid = isvalid;
    current_obj.errormsg = errormsg;

    check_userObj[obj_name] = current_obj;

    let FormInvalid = true;
    for (let field in check_userObj) {
      FormInvalid = check_userObj[field].valid && FormInvalid;
    }
    this.setState({ check_userObj, FormInvalid, Show_error: false });
  };

  handleCheckSubmit = e => {
    e.preventDefault();
    this.setState({ Show_error: true });
    const check_userObj = { ...this.state.check_userObj };

    let FormInvalid = true;
    for (let field in check_userObj) {
      console.log(check_userObj[field].valid, "96369");
      FormInvalid = check_userObj[field].valid && FormInvalid;
    }

    if (!FormInvalid) return;
    let body = {
      email: check_userObj.email_phone.value,
    };
    this.setState({ FormInvalid: false, loadingBtn: true });
    this.props
      .check_user_existance(body)
      .then(res => {
        if (this.props.check_login_msg.is_exist) {
          if (this.props.check_login_msg.is_google_login) {
            this.props.loginOtpToggle();
          } else {
            this.props.signupftoggle("login");
            this.props.checkuserToggle();
          }
        } else {
          this.props.signupftoggle("signup");
        }

        console.log(this.props.check_login_msg, "5659");
        this.setState({
          FormInvalid: true,
          loadingBtn: false,
          loginsucess: true,
        });
      })
      .catch(err => {
        console.log(err, "loginerr");
        this.setState({
          ShowLoginErr: true,
          FormInvalid: true,
          loadingBtn: false,
        });
      });
  };
  handleClose = () => {
    this.setState({
      ShowLoginErr: false,
      FormInvalid: false,
      loadingBtn: false,
    });
  };

  render() {
    const { check_userObj, Show_error, loadingBtn, ShowLoginErr } = this.state;
    return (
      <div className={`${styles.MainLoginDiv}`}>
        <div className='Main_WrraperDiv row p-0 m-0 '>
          <div className={`${styles.Leftpart} col-lg-5 col-md-5`}>
            <div
              className='logoDiv'
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingBottom:"0.5rem"
              }}>
              <span className={`${styles.left_heading}`}>Welcome To MyPustak</span>
              <span className={`${styles.innerText}`}>
                Login to get access to your Orders, profile and Recommendations
              </span>
            </div>
            <div className={`${styles.bannerImgWeb}`}>
              <Image
                src={loginimage}
                alt='MyPustak man making heart with hand'
              />
            </div>
          </div>

          <div className={`${styles.Rightpart} col-lg-7 col-md-7`}>
            <div className={`${styles.Login_form_div}`}>
              <form
                className='Login_form'
                autoComplete='off'
                onSubmit={this.handleCheckSubmit}>
                <div className={`${styles.Login_feild}`}>
                  <TextField
                    autoFocus
                    variant='standard'
                    id='login_email'
                    name='login_Email'
                    label='Enter Email'
                    color='primary'
                    fullWidth
                    margin='dense'
                    onChange={e => this.handleLoginInputs(e, "email_phone")}
                    value={check_userObj.email_phone.value}
                    required
                    helperText={
                      Show_error ? check_userObj.email_phone.errormsg : null
                    }
                    error={
                      Show_error
                        ? check_userObj.email_phone.errormsg
                          ? true
                          : false
                        : false
                    }
                  />
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
                    }}>
                    {loadingBtn ? (
                      <CircularProgress
                        size='1.6rem'
                        style={{ color: "#fff" }}
                      />
                    ) : (
                      `Proceed`
                    )}
                  </Button>
                </div>
              </form>

              <div className={`${styles.other_login}`}>
                <div className='other_options'></div>
              </div>
            </div>
            <div className={`${styles.bannerImgMob}`}>
              <Image
                src={loginimage}
                alt='MyPustak man making heart with hand'
              />
            </div>
          </div>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            style={{ zIndex: "50001" }}
            open={this.state.ShowLoginErr}
            onClose={this.handleClose}
            message={`${this.state.LoginErrMsg}`}
            autoHideDuration={5000}
          />
        </div>

        <style jsx>
          {`
           
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
export default connect(mapStatesToProps, {
  LoginCheck,
  clearLoginErr,
  check_user_existance,
})(Checkuser);
