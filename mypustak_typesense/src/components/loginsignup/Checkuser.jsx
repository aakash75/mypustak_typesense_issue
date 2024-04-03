import React, { Component } from "react";

import { connect } from "react-redux";
import { TextField, Button, Snackbar, CircularProgress } from "@mui/material";
import queryString from "query-string";
import {
  LoginCheck,
  clearLoginErr,
  check_user_existance,
} from "../../redux/actions/accountAction";

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

  componentDidUpdate(prevProps, prevState) {}
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
      <div className='MainLoginDiv'>
        <div className='Main_WrraperDiv row'>
          <div className='Leftpart col-lg-5 col-md-5'>
            <div className='content'>
              <div className='left_text'>
                <p className='left_heading'>Welcome To MyPustak</p>
                <p className='left_heading'>Login</p>
                {this.state.url == "/donate-books/DonationForm" ? (
                  <p>
                    Get access to Fill book Donation form,Donation Dashboard,
                    Profile and Recommendation
                  </p>
                ) : (
                  <p>Get access to your Orders, profile and Recommendations</p>
                )}
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
                <p className='left_heading'>Welcome To MyPustak</p>

                <p>Get access to your Orders, profile and Recommendations</p>
              </div>
            </div>
          </div>

          <div className='Rightpart col-lg-7 col-md-7'>
            <div className='Login_form_div'>
              <form
                className='Login_form'
                autoComplete='off'
                onSubmit={this.handleCheckSubmit}>
                <div className='Login_feild'>
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

                <div className='Login_feild'>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'>
                    {loadingBtn ? (
                      <CircularProgress size='1.6rem' />
                    ) : (
                      `Proceed`
                    )}
                  </Button>
                </div>
              </form>

              <div className='other_login'>
                <div className='other_options'></div>
              </div>
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

          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={ShowLoginErr}
            style={{ zIndex: "4000" }}
            autoHideDuration={3000}
            onClose={this.handleClose}></Snackbar>
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

export default connect(mapStatesToProps, {
  LoginCheck,
  clearLoginErr,
  check_user_existance,
})(Checkuser);
