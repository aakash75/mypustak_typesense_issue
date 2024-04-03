import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginDiv from "./LoginDiv";
import { CircularProgress } from "@mui/material";
import { ForgetPassword } from "../../redux/actions/accountAction";
import Snackbar from "@mui/material/Snackbar";
import { connect } from "react-redux";
class ForgotpwdDiv extends Component {
  state = {
    showpwd: false,
    openForget: false,
    FormInvalid: false,
    loadingBtn: false,
    ShowForgetErr: false,
    forget_form: {
      email: {
        value: "",
        valid: false,
        errormsg: "",
        validation: {
          isEmail: true,
          required: true,
        },
      },
    },
    Show_error: false,
  };

  componentDidMount() {
    const forget_form = { ...this.state.forget_form };
    const email_obj = { ...this.state.forget_form.email };
    email_obj.value = this.props.check_login_msg.email;
    forget_form.email = email_obj;
    this.setState({ forget_form });
    if (email_obj.value.length) {
      let body = {
        email: email_obj.value,
      };
      this.props
        .ForgetPassword(body)
        .then(res => {
          let ForgetErrMsg = `A link has been sent to ${email_obj.value}o reset your password, please check.`;
          this.setState({
            FormInvalid: true,
            loadingBtn: false,
            ShowForgetErr: true,
            ForgetErrMsg,
          });
        })
        .catch(err => {
          console.log(err.response);
          let ForgetErrMsg;
          this.setState({
            ShowForgetErr: true,
            FormInvalid: true,
            loadingBtn: false,
            ForgetErrMsg: "Mail not send.Please contact Mypustak support",
          });
        });
    }
  }

  handleClickShowPassword = () => {
    this.setState({ showpwd: !this.state.showpwd });
  };

  handleMouseDownPassword = e => {
    e.preventDefault();
  };
  signupftoggle = () => {
    // this.props.signupftoggle()
    this.setState({ openForget: !this.state.openForget });
  };
  toggleForgetPassword = () => {
    //  alert("t")
    this.setState({ openForget: !this.state.openForget, loginErrmsg: "" });
  };

  handleFormInputs = (e, obj_name) => {
    const forget_form = { ...this.state.forget_form };
    const current_obj = { ...this.state.forget_form[obj_name] };
    current_obj.value = e.target.value;
    const { isvalid, errormsg } = this.checkValidation(
      current_obj.value,
      current_obj.validation
    );
    current_obj.valid = isvalid;
    current_obj.errormsg = errormsg;

    forget_form[obj_name] = current_obj;

    let FormInvalid = true;
    for (let field in forget_form) {
      FormInvalid = forget_form[field].valid && FormInvalid;
    }
    // console.log({FormInvalid});

    this.setState({ forget_form, FormInvalid });
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
          : "Enter valid email";
      }
    }
    return { isvalid, errormsg };
  };

  handleForgetFormSubmit = e => {
    e.preventDefault();
    this.setState({ Show_error: true });
    const { forget_form, FormInvalid } = this.state;
    if (!FormInvalid) return;
    let body = {
      email: forget_form.email.value,
    };
    this.setState({ FormInvalid: false, loadingBtn: true });
    this.props
      .ForgetPassword(body)
      .then(res => {
        let ForgetErrMsg = `A link has been sent to ${forget_form.email.value}o reset your password, please check.`;
        this.setState({
          FormInvalid: true,
          loadingBtn: false,
          ShowForgetErr: true,
          ForgetErrMsg,
        });
      })
      .catch(err => {
        console.log(err.response);
        let ForgetErrMsg;
        this.setState({
          ShowForgetErr: true,
          FormInvalid: true,
          loadingBtn: false,
          ForgetErrMsg: "Mail not send.Please contact Mypustak support",
        });
      });
  };

  handleClose = () => {
    this.setState({ ShowForgetErr: false });
  };
  render() {
    const { loadingBtn, forget_form, ShowForgetErr, ForgetErrMsg, Show_error } =
      this.state;

    return (
      <div className='MainLoginDiv'>
        {this.state.openForget ? (
          <LoginDiv />
        ) : (
          <div className='Main_WrraperDiv row'>
            <div className='Leftpart col-lg-5 col-md-5'>
              <div className='content'>
                <div className='left_text'>
                  <p className='left_heading'>Recover your password</p>
                  <p>Check your mail</p>
                </div>

                <div className='leftpart_lower'>
                  <p>Are you already registerd?</p>
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
                  <p className='left_heading'>Recover your password</p>
                  <p>Check your mail</p>
                </div>
              </div>
            </div>

            <div className='Rightpart col-lg-7 col-md-7'>
              <div className='Login_form_div'>
                <form
                  className='Login_form'
                  autoComplete='off'
                  onSubmit={this.handleForgetFormSubmit}>
                  <div className='Login_feild'>
                    <TextField
                    variant="standard"
                      id='forgot_email'
                      name='forgot_email'
                      label='Enter Registered Email'
                      color='primary'
                      fullWidth
                      margin='dense'
                      required
                      onChange={e => this.handleFormInputs(e, "email")}
                      value={forget_form.email.value}
                      helperText={
                        Show_error ? forget_form.email.errormsg : null
                      }
                      error={
                        Show_error
                          ? forget_form.email.errormsg.length
                            ? true
                            : false
                          : false
                      }
                    />
                  </div>

                  <div className='Login_feild'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='primary'
                      type='submit'>
                      {loadingBtn ? (
                        <CircularProgress style={{ color: "white" }} size='1.6rem' />
                      ) : (
                        `Continue`
                      )}
                    </Button>
                  </div>
                </form>

                <div className='other_login'>
                  <div className='create_acount_text'>
                    <p>
                      Are you registerd?{" "}
                      <span
                        className='text_span'
                        onClick={() => this.props.signupftoggle("login")}>
                        Login
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={ShowForgetErr}
              onClose={this.handleClose}
              message={`${ForgetErrMsg}`}
              autoHideDuration={5000}
            />
          </div>
        )}

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
              padding: 40px 33px;
              color: white;
              min-height: 82vh;
            }
            .left_heading {
              font-size: 1.3rem;
              font-weight: bold;
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
            }
            .Login_feild {
              padding-top: 20px;
            }
            .other_login {
              padding-top: 10px;
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
                font-weight: bold;
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

export default connect(mapDispatchToProps, { ForgetPassword })(ForgotpwdDiv);
