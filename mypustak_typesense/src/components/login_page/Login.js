/* eslint-disable */
import Image from "next/legacy/image";
import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import loginimage from "../../assets/LoginImage.svg";
import { TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  EmailValidation,
} from "../../helper/validations";
import {
  CheckUserExistance,
  LoginCheck,
  setComponentStatus,
  signupCheck,
} from "../../redux/actions/loginactions";
import { connect } from "react-redux";

function Login(props) {
  const [Signuptoggle, setSignuptoggle] = useState(false);
  const [Logintoggle, setLogintoggle] = useState(false);
  const [Emailid, setEmailid] = useState("");
  const [EmailErr, setEmailErr] = useState(false);
  const [checkUserLoader, setcheckUserLoader] = useState(false);
  const [showLoginDialog, setshowLoginDialog] = useState(false);
  const checkuserexist = e => {
    e.preventDefault();
    const email_id = Emailid;
    setEmailErr(EmailValidation(email_id));
    let body = {
      email: email_id,
    };
    if (!EmailValidation(email_id)) {
      setcheckUserLoader(true);
      props
        .CheckUserExistance(body)
        .then(res => {
          if (res.response[0].is_exist) {
            setLogintoggle(true);
            setcheckUserLoader(false);
          } else {
            setSignuptoggle(true);
            setcheckUserLoader(false);
          }
        })
        .catch(err => {
          console.log({ err });
          setcheckUserLoader(false);
        });
    }
  };

  return (
    <div
      className='d-flex justify-content-center align-items-center'
      BackdropProps={{
        style: {
          backgroundColor: "#fff",
          opacity: "0.9",
        },
      }}
      open={showLoginDialog}
      keepMounted
      aria-describedby='alert-dialog-slide-description'>
      <div style={{ display: "flex", padding: 0, overflow: "hidden" }}>
        <div
          style={{
            minWidth: "22rem",
            display: "flex",
            alignItems: "flex-start",
            padding: 8,
          }}>
          <div className='trackdialogLeftDiv'>
            <div
              className='logoDiv'
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <div style={{ width: "7.25rem" }}>
                <Image
                  height={"1.5rem"}
                  layout={"responsive"}
                  width={"4.188rem"}
                  alt='MyPustak.com'
                  src={logo}
                />
              </div>
              <span className='inneHead'>Welcome To MyPustak</span>
              <span className='innerspan'>
                Login to get access to your Orders, profile and Recommendations
              </span>
            </div>
            <div className='loginImage'>
              <Image src={loginimage} alt='' />
            </div>
          </div>
          {Signuptoggle ? (
            <SignupDiv
              signupuser={signupuser}
              signupLoader={signupLoader}
              EmailErr={EmailErr}
              setEmailid={setEmailid}
              setEmailErr={setEmailErr}
              Emailid={Emailid}
              setMobile={setMobile}
              setPassword={setPassword}
              setMobileErr={setMobileErr}
              setPasswordErr={setPasswordErr}
              MobileErr={MobileErr}
              PasswordErr={PasswordErr}
              setSignuptoggle={setSignuptoggle}
              setLogintoggle={setLogintoggle}
            />
          ) : (
            <div className='loginDialogRightDiv'>
              <form
                onSubmit={Logintoggle ? loginUser : checkuserexist}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <div>
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <TextField
                      autoFocus={true}
                      InputProps={{
                        style: { color: Logintoggle ? "grey" : null },
                      }}
                      error={EmailErr}
                      size='small'
                      sx={{
                        // animation:EmailErr?'shake 0.2s ease-in-out 0s 2':null,
                        width: Logintoggle ? "15rem" : "18rem",
                        fontSize: "0.5rem",
                        color: "#ddd",
                      }}
                      label='Enter your email address login'
                      onChange={
                        !Logintoggle
                          ? e => {
                            setEmailid(e.target.value);
                            setEmailErr(false);
                          }
                          : null
                      }
                      value={Emailid}
                      variant='standard'
                      helperText={EmailErr ? "Enter valid email" : null}
                    />
                    {Logintoggle ? (
                      <span
                        className='change'
                        onClick={() => {
                          setLogintoggle(false);
                          setEmailid("");
                          setPassword("");
                        }}>
                        Change?
                      </span>
                    ) : null}
                  </div>
                  {Logintoggle ? (
                    <TextField
                      type={"password"}
                      error={PasswordErr}
                      size='small'
                      sx={{
                        width: "18rem",
                        fontSize: "0.5rem",
                      }}
                      label='Enter your password'
                      onChange={e => {
                        setPassword(e.target.value);
                        setPasswordErr(false);
                      }}
                      variant='standard'
                      helperText={EmailErr ? "Enter valid email" : null}
                    />
                  ) : null}
                </div>
                <button type='submit' className='loginButton'>
                  {checkUserLoader ? (
                    <i className='fa fa-circle-o-notch fa-spin' />
                  ) : Logintoggle ? (
                    "Login"
                  ) : (
                    "Proceed"
                  )}
                </button>

                {Logintoggle ? (
                  <span style={{ fontSize: "14px", color: "rgba(0,0,0,0.4)" }}>
                    or
                  </span>
                ) : null}
                {Logintoggle ? (
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#2248AE",
                      cursor: "pointer",
                    }}>
                    Login With Email OTP
                  </span>
                ) : null}
              </form>
            </div>
          )}
        </div>
        <div>
          <IconButton
            onClick={() => {
              setshowLoginDialog(false);
              setEmailErr(false);
              setPasswordErr(false);
              setMobileErr(false);
              setLogintoggle(false);
              setSignuptoggle(false);
              setEmailid("");
              setPassword("");
              setMobile("");
            }}
            style={{ padding: "5px" }}>
            <CloseIcon fontSize='small' style={{ color: "#000" }} />
          </IconButton>
        </div>
        <style jsx>
          {`
            * {
              padding: 0px;
              margin: 0px;
            }

            .rightHead {
              font-weight: 500;
              font-family: "Roboto";
              font-size: 0.875rem;
              line-height: 16px;
              color: #484848;
              margin-bottom: 20px;
            }
            .change {
              margin-right: 2px;
              color: #2248ae;
              cursor: pointer;
              opacity: 0.98;
            }
            .change:hover {
              opacity: 1;
            }
            .createAcc {
              cursor: pointer;
              font-weight: 600;
            }
            .createAcc:hover {
              color: #2248ae;
            }
            .innerspan {
              font-family: "Roboto";
              font-weight: 500;
              text-align: center;
              font-size: 13px;
              line-height: 1rem;
              color: #fff;
              margin-top: 7px;
            }

            .loginImage {
              animation-name: bottomin;
              animation-duration: 2000ms;
              margin-top: 40px;
            }
            .trackdialogLeftDiv {
              min-width: 13.625rem;
              min-height: 19.688rem;
              display: flex;
              align-items: center;
              padding: 5px 0;
              justify-content: space-between;
              flex-direction: column;
              background: linear-gradient(90deg, #2157ad 0%, #6190da 100%);
              border-radius: 5px 0px 0px 5px;
            }
            .fa {
              margin-right: 5px;
            }
            .loginButton {
              width: 9.563rem;
              height: 2.188rem;
              border: none;
              color: #fff;
              margin-top: 15px;
              background: linear-gradient(90deg, #2157ad 0%, #6190da 100%);
              border-radius: 2px;
            }

            .loginDialogRightDiv {
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

            .inneHead {
              color: #ffffff;
              margin-top: 23px;
              text-align: center;
              font-weight: 600;
              font-size: 16px;
              line-height: 19px;
            }
            .midDiv {
              display: flex;
              align-items: center;
              margin: 0 15px;
            }

            .icon:hover {
              transform: scale(1.05);
            }
            .endDiv {
              display: flex;
              justify-content: space-between;
              color: #fff;
              font-family: "Roboto";
              font-style: normal;
              font-weight: 500;
              font-size: 0.875rem;
            }

            .mainNavDiv {
              display: grid;
              grid-auto-flow: column;
              grid-template-columns: 1fr 8fr 3fr;
              align-items: center;
              padding: 0 50px 0rem 50px;
              background: linear-gradient(90deg, #2157ad 0%, #427bd4 100%),
                #ffffff;

              max-width: 100vw;
              max-height: 3.5rem;
            }

            input:focus {
              outline: none;
            }

            @keyframes bottomin {
              0% {
                transform: translateY(1000px);
                opacity: 0;
              }
              10% {
                opacity: 0;
              }
              40% {
                transform: translateY(-40px);
                opacity: 1;
              }
              80%,
              100% {
                transform: translateX(0px);
              }
            }
            @keyframes in {
              0% {
                transform: translateX(1000px);

                opacity: 0;
              }
              10% {
                opacity: 0;
              }
              40% {
                transform: translateX(-40px);
                opacity: 1;
              }
              80%,
              100% {
                transform: translateX(0px);
              }
            }
            @media screen and (min-width: 920px) {
              .icon {
                padding-right: 10px;
              }
            }
            input::placeholder {
              font-size: 0.8rem;
              padding: 0.5rem;
            }

            @media (min-width: 768px) and (max-width: 960px) {
            }
            @media screen and (max-width: 920px) {
              .endDiv {
                font-size: 0.75rem;
              }
              .mainNavDiv {
                padding: 0 20px;
              }

              .midDiv {
                margin: 0 15px;
              }
              .icon {
                padding-right: 5px;
              }
            }

            @media screen and (max-width: 780px) {
              .endDiv {
                font-size: 6px;
                margin-right: 5px;
              }
              .icon {
                padding-right: 5px;
              }
              .mainNavDiv {
                padding: 0 10px;
              }

              .midDiv {
                margin: 0 10px;
              }
            }
            @media screen and (max-width: 600px) {
              .midDiv {
                margin: 0 10px;
              }
              .endDiv {
                display: none;
              }
            }

            @media screen and (max-width: 500px) {
              .midDiv {
                display: none;
              }
              .endDiv {
                display: none;
              }
              .mainNavDiv {
                top: 0;
                display: flex;
                justify-content: center;
                padding: 5px 0;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    getuserdetails: state.loginReducer.getuserdetails,
    userComponentStatus: state.loginReducer.userComponentStatus,
    SuggestionData: state.productsuggestionreducer.SuggestionData,
    PopupCart: state.cartReduc.PopupCart,
    userToken: state.accountR.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    GetTrackingUrl: body => dispatch(GetTrackingUrl(body)),
    CheckUserExistance: body => dispatch(CheckUserExistance(body)),
    signupCheck: body => dispatch(signupCheck(body)),
    LoginCheck: body => dispatch(LoginCheck(body)),
    fetch_wishlist_detail_otherpage: () =>
      dispatch(fetch_wishlist_detail_otherpage()),
    setComponentStatus: () => dispatch(setComponentStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
