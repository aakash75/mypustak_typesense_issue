import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import dynamic from "next/dynamic";
const LoginDiv = dynamic(() => import("./LoginDiv"));
import { CircularProgress } from "@mui/material";
import { ForgetPassword } from "../../redux/actions/accountAction";
import Snackbar from "@mui/material/Snackbar";
import Image from "next/legacy/image";
import loginimage from "../../assets/LoginImage.svg";
import { connect } from "react-redux";
import styles from "../../styles/ResetPassword.module.css"
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
  }

  handleClickShowPassword = () => {
    this.setState({ showpwd: !this.state.showpwd });
  };

  handleMouseDownPassword = e => {
    e.preventDefault();
  };
  signupftoggle = () => {
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
    this.setState({ Show_error: true, loadingBtn: true });
    const { forget_form, FormInvalid } = this.state;
    let body = {
      email: forget_form.email.value,
    };
    this.setState({ FormInvalid: false, loadingBtn: true });
    this.props
      .ForgetPassword(body)
      .then(res => {
        let ForgetErrMsg = `A link has been sent to ${forget_form.email.value} reset your password, please check.`;
        this.setState({
          FormInvalid: true,
          loadingBtn: false,
          ShowForgetErr: true,
          ForgetErrMsg,
        });
      })
      .catch(err => {
        console.log(err.response);
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
      <div className={`${styles.MainLoginDiv}`}>
        {this.state.openForget ? (
          <LoginDiv />
        ) : (
          <div className='Main_WrraperDiv row p-0 m-0'>
            <div className={`${styles.Leftpart} col-lg-5 col-md-5`}>
              <div className={`${styles.content}`}>
                <div className='left_text'>
                  <p className={`${styles.left_heading}`}>Recover your password</p>
                  <p>Check your mail</p>
                </div>
                <div className={`${styles.bannerImg}`}>
                  <Image src={loginimage} alt='' />
                </div>
                <div className={`${styles.leftpart_lower}`}>
                  <p>Are you already registerd?</p>
                  <button
                    className={`${styles.createbtn}`}
                    onClick={() => this.props.signupftoggle("login")}>
                    Login
                  </button>
                </div>
              </div>
              <div className={`${styles.mob_content}`}>
                <div className={`${styles.img_logo}`}>
                  <img
                    src={`https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo..png`} alt=""
                  />
                </div>
                <div className={`${styles.mob_contentText}`}>
                  <p className={`${styles.left_heading}`}>Recover your password</p>
                  <p>Check your mail</p>
                </div>
              </div>
            </div>
            <div className={`${styles.Rightpart} col-lg-7 col-md-7`}>
              <div className={`${styles.Login_form_div}`}>
                <form
                  className='Login_form'
                  autoComplete='off'
                  onSubmit={this.handleForgetFormSubmit}>
                  <div className={`${styles.Login_feild}`}>
                    <TextField
                      id='forgot_email'
                      name='forgot_email'
                      label='Enter Registered Email'
                      color='primary'
                      fullWidth
                      margin='dense'
                      variant="standard"
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

                  <div className={`${styles.Login_feild}`}>
                    <Button
                      fullWidth
                      variant='contained'
                      type='submit'
                      style={{
                        background:
                          "linear-gradient(90deg, #2157ad 0%, #6190da 100%)",
                        color: "#fff",
                        textTransform: "capitalize",
                      }}>
                      {loadingBtn ? (
                        <CircularProgress color="inherit" size='1.6rem' />
                      ) : (
                        `Continue`
                      )}
                    </Button>
                  </div>
                </form>
                <div className={`${styles.other_login}`}>
                  <div className={`${styles.create_acount_text}`}>
                    <p>
                      Are you registerd?{" "}
                      <span
                        className={`${styles.text_span}`}
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
