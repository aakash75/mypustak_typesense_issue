"use client"
import React, { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MediaQuery from "react-responsive";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import whatsapp from "../../assets/whatsapp.png";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import { ForgetPassword } from "../../redux/actions/accountAction";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CloseIcon from "@mui/icons-material/Close";
import loginimage from "../../assets/LoginImage.svg";
import logo from "../../assets/logo.svg";
import trackimage from "../../assets/trackimg.png";
import {
  CheckUserExistance,
  LoginCheck,
  setComponentStatus,
  signupCheck,
} from "../../redux/actions/loginactions";
import {
  EmailValidation,
  PasswordValidation,
  PhoneValidation,
} from "../../helper/validations";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import {
  Badge,
  Button,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Image from "next/legacy/image";
import { useSnackbar, withSnackbar } from "notistack";
import { connect } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
const LoginOtp = dynamic(() => import("./LoginOtp"));
const SignupDiv = dynamic(() => import("../logindialogdivs/SignupDiv"));
function BottomNavbar(props) {
  const [value, setValue] = useState(0);
  const [path, setpath] = useState("");
  const [showTrackDialog, setshowTrackDialog] = useState(false);
  const [showLoginDialog, setshowLoginDialog] = useState(false);
  const [toTrackid, settoTrackid] = useState("");
  const [urlPath, setUrlPath] = useState();
  let [queryString, setqueryString] = useState("");
  const [hover, setHover] = useState(false);
  const [Emailid, setEmailid] = useState("");
  const [EmailErr, setEmailErr] = useState(false);
  const [Mobile, setMobile] = useState("");
  const [MobileErr, setMobileErr] = useState(false);
  const [Password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [PasswordErr, setPasswordErr] = useState(false);
  const [Signuptoggle, setSignuptoggle] = useState(false);
  const [Logintoggle, setLogintoggle] = useState(false);
  const [checkUserLoader, setcheckUserLoader] = useState(false);
  const [signupLoader, setsignupLoader] = useState(false);
  const [loginWithOtp, setloginWithOtp] = useState(false);
  const [forgetPassword, setforgetPassword] = useState(false);
  const [forgetPasswordLoader, setforgetPasswordLoader] = useState(false);
  const [showdot, setshowdot] = useState(false);
  const [userToken, setuserToken] = useState({});
  const Router=useRouter()
  useEffect(() => {
    let pathname = window.location.pathname;
    setUrlPath(pathname);
    console.log(pathname, "locationn");
    setpath(pathname);
    let user = JSON.parse(localStorage.getItem("user_info"));
    setuserToken(user);
  }, []);

  useEffect(() => {
    let pathname = window.location.pathname;
    setUrlPath(pathname);
    console.log(pathname, "locationn");
    setpath(pathname);
    let user = JSON.parse(localStorage.getItem("user_info"));
    setuserToken(user);
  }, [path]);
  const signupftoggle = () => {
    setSignuptoggle(false);
    setforgetPassword(false);
    setloginWithOtp(false);
  };
  const handleForgetFormSubmit = e => {
    e.preventDefault();
    // this.setState({ Show_error: true })
    // const { forget_form, FormInvalid } = this.state
    // if (!FormInvalid) return
    let body = {
      email: Emailid,
    };
    setforgetPasswordLoader(true);
    props
      .ForgetPassword(body)
      .then(res => {
        setforgetPasswordLoader(false);
        let ForgetErrMsg = `A link has been sent to ${Emailid} please check, and reset your password, `;
        enqueueSnackbar(ForgetErrMsg, { variant: "success" });
      })
      .catch(err => {
        console.log(err.response);
        setforgetPasswordLoader(false);
        let ForgetErrMsg = "Mail not send.Please contact Mypustak support";
        enqueueSnackbar(ForgetErrMsg, { variant: "warning" });
      });
  };
  const trackOrder = e => {
    e.preventDefault();
    const order_id = toTrackid;
    // order_id = encryptor(order_id)
    const body = {
      data: {
        ref_id: order_id,
      },
    };
    if (order_id.length > 0) {
      if (/^\d+$/.test(order_id)) {
        props
          .GetTrackingUrl(body)
          .then(res => {
            window.open(res.data.output);
          })
          .catch(err => {
            if (err.response.data.status == 400) {
              enqueueSnackbar(err.response.data.message, {
                variant: "error",
              });
            } else {
              enqueueSnackbar(
                "We are not able to track your order currently,please try again later",
                {
                  variant: "error",
                }
              );
            }
            console.log({ err });
          });
      }
    }
  };
  const loginUser = e => {
    e.preventDefault();
    const email = Emailid;
    const password = Password;
    let body = {
      username: email,
      password: password,
    };
    setcheckUserLoader(true);
    props
      .LoginCheck(body)
      .then(res => {
        setshowLoginDialog(false);
        setcheckUserLoader(false);
        let backurl = queryString;
        if (backurl) {
          // Router.replace(backurl )
          // // Router.push(backurl)
          window.location.replace(backurl);
        } else {
          window.location.reload();
          setshowdot(true);
        }
      })
      .catch(err => {
        console.log(err.response.data.msg);
        enqueueSnackbar(err.response.data.msg, { variant: "error" });
        setcheckUserLoader(false);
      });
  };
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

  const signupuser = e => {
    e.preventDefault();
    const email_id = Emailid;
    const phone = Mobile;
    const password = Password;
    console.log(Mobile, email_id);
    setEmailErr(EmailValidation(email_id));
    setMobileErr(PhoneValidation(phone));
    setPasswordErr(PasswordValidation(password));
    const body = {
      email: email_id,
      password: password,
      mobile: phone,
      role_id: "0",
    };

    if (
      !EmailValidation(email_id) &&
      !PhoneValidation(phone) &&
      !PasswordValidation(password)
    ) {
      setsignupLoader(true);
      props
        .signupCheck(body)
        .then(res => {
          setsignupLoader(false);
          let backurl = queryString;
          if (backurl) {
            window.location.replace(backurl);
          } else {
            window.location.reload();
          }
        })
        .catch(err => {
          setsignupLoader(false);
          console.log({ err }, "12222");
          if (err == 417) {
            setsignupLoader(false);
            this.props.loginOtpToggle();
          }
        });
    }
  };
  const logoutUser = () => {
    logout()
      .then(res => {
        // window.location.href="/"
      })
      .catch(err => {
        console.log({ err });
      });
    // Router.push('/');
  };
  useEffect(() => {
    console.log(props.getuserdetails, "getuserdetails");
    const queryParams = new URLSearchParams(window.location.search);
    const dialog = queryParams.get("d");
    if (Object.keys(props.getuserdetails).length) {
      if (dialog == "track") {
        setshowTrackDialog(true);
      }
    }
  }, [props.getuserdetails]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (
    <div className='container mt-5 d-block d-sm-none d-md-none d-lg-none bg-white '>
      <nav
        style={{ position: "fixed", bottom: 0, minWidth: "100%", zIndex: 10 }}
        className='navbar navbar-expand bg-white p-0'>
        <ul
          className='navbar-nav nav-justified w-100'
          style={{ height: "3.5rem" }}>
          <li className='nav-item'>
            <Link href='#' prefetch={false} legacyBehavior>
              <Button
                onClick={() => {
                  window.open(
                    "https://api.whatsapp.com/send?phone=913341804333&text=Welcome%20to%20MyPustak%20-%20I%20need%20a%20help"
                  );
                }}
                style={{
                  textTransform: "capitalize",
                  color: "#555",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                className='nav-link  px-0 py-1'>
                <div style={{ width: "1.7rem" }}>
                  <Image
                    width={"100%"}
                    height={"100%"}
                    layout='responsive'
                    alt='whatsapp_icon'
                    src={whatsapp}
                  />
                </div>
                <span className='d-block' style={{ fontSize: "0.75rem" }}>
                  Chat
                </span>
              </Button>
            </Link>
          </li>

          <li className='nav-item'>
            <Link href='#' prefetch={false} legacyBehavior>
              <Button
                style={{
                  textTransform: "capitalize",
                  color: "#555",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                className='nav-link  px-0 py-1'>
                <span
                  onClick={() => {
                    if (props.getuserdetails.email != null) {
                      setshowTrackDialog(true);
                      return;
                    }
                    Router.push(`/?d=track`, undefined, { shallow: true });
                    enqueueSnackbar("Please login to track your order", {
                      variant: "warning",
                    });
                    setshowLoginDialog(true);
                  }}>
                  <LocationOnOutlinedIcon style={{ fontSize: "1.75rem" }} />
                </span>
                <span
                  onClick={() => {
                    setshowTrackDialog(true);
                  }}
                  className='d-block'
                  style={{ fontSize: "0.75rem" }}>
                  Track
                </span>
              </Button>
            </Link>
          </li>
          <li className='nav-item'>
            {path == "/" ? (
              <Button
                style={{
                  textTransform: "capitalize",
                  color: "#555",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                className='nav-link  px-0 py-1'
                href='/'>
                <span className=''>
                  <HomeOutlinedIcon
                    style={{ fontSize: "1.75rem", color: "#2248AE" }}
                  />
                </span>
                <span
                  className='d-block'
                  style={{
                    fontSize: "0.7rem",
                    color: "#2248AE",
                    fontWeight: 600,
                  }}>
                  Home
                </span>
              </Button>
            ) : (
              <Button
                style={{
                  textTransform: "capitalize",
                  color: "#555",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                className='nav-link  px-0 py-1'
                href='/'>
                <span className=''>
                  <HomeOutlinedIcon style={{ fontSize: "1.75rem" }} />
                </span>
                <span className='d-block' style={{ fontSize: "0.75rem" }}>
                  Home
                </span>
              </Button>
            )}
          </li>
          <li className='nav-item'>
            {/* {props.getuserdetails.email? */}
            {userToken ? (
              <Button
                href='/account'
                style={{
                  textTransform: "capitalize",
                  color: "#555",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                className='nav-link  px-0 py-1'
                // href={path == "/customer/MyProfile/MyProfile" ?'':"/customer/MyProfile/MyProfile"}
              >
                {path == "/account" ? (
                  <div>
                    <span>
                      <AccountCircleOutlinedIcon
                        style={{ color: "#2248AE", fontSize: "1.75rem" }}
                      />
                    </span>
                    <span
                      className='d-block'
                      style={{
                        fontSize: "0.7rem",
                        color: "#2248AE",
                        fontWeight: "600",
                      }}>
                      Account
                    </span>
                  </div>
                ) : (
                  <div>
                    <span>
                      <AccountCircleOutlinedIcon
                        style={{ fontSize: "1.75rem" }}
                      />
                    </span>
                    <span className='d-block' style={{ fontSize: "0.75rem" }}>
                      Account
                    </span>
                  </div>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  path == "/account" ? null : setshowLoginDialog(true);
                }}
                style={{
                  textTransform: "capitalize",
                  color: "#555",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                className='nav-link  px-0 py-1'
                // href={path == "/customer/MyProfile/MyProfile" ?'':"/customer/MyProfile/MyProfile"}
              >
                {path == "/account" ? (
                  <div>
                    <span>
                      <AccountCircleOutlinedIcon
                        style={{ color: "#2248AE", fontSize: "1.75rem" }}
                      />
                    </span>
                    <span
                      className='d-block'
                      style={{
                        fontSize: "0.7rem",
                        color: "#2248AE",
                        fontWeight: "600",
                      }}>
                      Login
                    </span>
                  </div>
                ) : (
                  <div>
                    <span>
                      <AccountCircleOutlinedIcon
                        style={{ fontSize: "1.75rem" }}
                      />
                    </span>
                    <span className='d-block' style={{ fontSize: "0.75rem" }}>
                      Login
                    </span>
                  </div>
                )}
              </Button>
            )}
          </li>
          <li className='nav-item'>
            <Button
              style={{
                textTransform: "capitalize",
                color: "#555",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              className='nav-link  px-0 py-1'
              href={
                props.getuserdetails.email != null
                  ? "/view-cart"
                  : "/account/Loginpage?ret=/view-cart"
              }>
              {path == "/view-cart" ? (
                <div>
                  <span>
                    <Badge
                      color='warning'
                      badgeContent={props.incart_check.length}>
                      <ShoppingCartOutlinedIcon
                        style={{ color: "#2248AE", fontSize: "1.75rem" }}
                      />
                    </Badge>
                  </span>
                  <span
                    className='d-block'
                    style={{
                      fontSize: "0.75rem",
                      color: "#2248AE",
                      fontWeight: "600",
                    }}>
                    Cart
                  </span>
                </div>
              ) : (
                <div>
                  <span>
                    <Badge
                      badgeContent={props.incart_check.length}
                      color='warning'>
                      <ShoppingCartOutlinedIcon
                        style={{ fontSize: "1.75rem" }}
                      />
                    </Badge>
                  </span>
                  <span className='d-block' style={{ fontSize: "0.75rem" }}>
                    Cart
                  </span>
                </div>
              )}
            </Button>
          </li>
        </ul>
      </nav>
      <style jsx>
        {`
          .nav-link {
            color: #57544e;
          }
          ,
          .navbar-nav > .active > a {
            background-color: blue;
          }
          * {
            padding: 0px;
            margin: 0px;
          }

          .Rightpart {
            background: white;
          }
          .Login_form_div {
            width: 15rem;
            padding-top: 20px;
          }
          .Login_feild {
            // width: 15rem;
            padding-top: 20px;
          }
          .other_login {
            padding-top: 10px;
          }
          .create_acount_text {
            padding: 15px;
            font-size: 0.9rem;
            // text-align: center;
          }
          .text_span {
            color: #0070e7;
            font-weight: bold;
            cursor: pointer;
          }
          .rightHead {
            font-weight: 500;
            font-family: "Roboto";
            font-size: 0.875rem;
            line-height: 16px;
            color: #484848;
            margin-bottom: 15px;
          }
          .change {
            margin-right: 2px;
            color: #2248ae;
            font-size: 0.86rem;
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
          .viewmyOrder {
            font-family: "Roboto";
            font-style: normal;
            font-weight: 400;
            font-size: 0.75rem;
            line-height: 0.875rem;
            color: #343345;
            margin-top: 30px;
          }
          .logintoview {
            font-family: "Roboto";
            font-style: normal;
            font-weight: 300;
            font-size: 10px;
            line-height: 0.75rem;
            margin-top: 2px;
            color: #eb001b;
            cursor: pointer;
          }

          .logintoview:hover {
            font-weight: 600;
          }
          .trackButton {
            width: 8.313rem;
            height: 2.25rem;
            opacity: 0.95;
            border: none;

            color: #fff;
            margin-top: 15px;
            background: linear-gradient(90deg, #2157ad 0%, #6190da 100%);
            border-radius: 2px;
          }
          .trackButton:hover {
            opacity: 1;
          }
          .trackImage {
            width: 10rem;
            animation-name: bottomin;
            animation-duration: 2000ms;
          }
          .loginImage {
            animation-name: bottomin;
            height: 12rem;
            // width:12.5rem;
            animation-duration: 2000ms;
            margin-top: 30px;
          }
          .trackdialogLeftDiv {
            min-width: 100%;
            // min-height: 16.688rem;
            display: flex;
            align-items: center;
            // padding: 5px 0;
            justify-content: space-between;
            flex-direction: column;
            background: linear-gradient(90deg, #2157ad 0%, #6190da 100%);
            // border-radius: 5px 0px 0px 5px;
          }
          .logindialogLeftDiv {
            min-width: 100%;
            // min-height: 16.988rem;
            display: flex;
            padding: 0.8rem 0.2rem;
            align-items: center;
            // padding: 5px 0;
            justify-content: space-between;
            flex-direction: column;
            background: linear-gradient(90deg, #2157ad 0%, #6190da 100%);
            // border-radius: 5px 0px 0px 5px;
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
          .trackdialogRightDiv {
            display: flex;
            flex-direction: column;
            // animation-name: in;
            margin-top: 15px;
            margin-left: 10px;
            margin-bottom: 155px;

            // animation-duration: 2000ms;
          }

          .loginDialogRightDiv {
            display: flex;
            flex-direction: column;
            // animation-name: in;
            height: 100%;
            // min-width: 18rem;
            // max-width: 18rem;
            // margin-top:15px;
            align-items: center;
            // margin-left: 45px;
            margin-top: 15px;
            margin-bottom: 105px;
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
        `}
      </style>
      <MediaQuery maxWidth={566}>
        <SwipeableDrawer
          anchor='bottom'
          onOpen={() => {}}

          onClose={() => {
            setshowTrackDialog(false);
          }}
          BackdropProps={{
            style: {
              backgroundColor: "#fff",
              opacity: "0.9",
            },
          }}
          fullScreen
          open={showTrackDialog}>
          <DialogContent
            style={{
              display: "flex",
              alignItems: "flex-start",
              padding: 0,
              overflow: "hidden",
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 8,
                width: "100%",
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
                  <span className='innerspan'>
                    Track your orders instantly!
                  </span>
                </div>
                <div className='trackImage'>
                  <Image src={trackimage} alt='' />
                </div>
              </div>
              <div className='trackdialogRightDiv'>
                <span className='rightHead'>Track Order</span>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onSubmit={trackOrder}>
                  <TextField
                    size='small'
                    sx={{ width: "18rem", fontSize: "0.4rem" }}
                    label='Enter Your Tracking Id/Order Id'
                    onChange={e => {
                      settoTrackid(e.target.value);
                    }}
                    variant='standard'
                  />
                  {/* <input placeholder=""/> */}
                  <button type='submit' className='trackButton'>
                    Track Order
                  </button>
                </form>
                <span className='viewmyOrder'>
                  View My Orders to Track your Orders
                </span>
                {props.getuserdetails.email != null ? (
                  <span
                    className='myordertoview'
                    onClick={() => {
                      Router.push("/customer/customer_order");
                      setshowTrackDialog(false);
                    }}>
                    My Orders
                  </span>
                ) : (
                  <span className='logintoview'>*Login to view my orders</span>
                )}
              </div>
            </div>
            <div>
              <IconButton
                onClick={() => {
                  setshowTrackDialog(false);
                }}
                style={{
                  position: "absolute",
                  borderRadius: 50,
                  padding: "5px",
                  top: 0,
                  right: 0,
                  zIndex: 100,
                  backgroundColor: "#000",
                  opacity: "0.75",
                }}>
                <CloseIcon fontSize='small' style={{ color: "#fff" }} />
              </IconButton>
            </div>
          </DialogContent>
        </SwipeableDrawer>
        <SwipeableDrawer
          anchor='bottom'
          onOpen={() => {}}

          BackdropProps={{
            style: {
              backgroundColor: "#fff",
              opacity: "0.9",
            },
          }}
          open={urlPath == "/account/Loginpage" ? false : showLoginDialog}
          onClose={() => {
            setshowLoginDialog(false);
          }}
          keepMounted
          aria-describedby='alert-dialog-slide-description'>
          <DialogContent
            style={{ display: "flex", padding: 0, overflow: "hidden" }}>
            <div
              style={{
                //   minWidth: "22rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 8,
                // border:"2px solid red",
                width: "100%",
              }}>
              <div className='logindialogLeftDiv '>
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
                    Login to get access to your Orders, profile and
                    Recommendations
                  </span>
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
              ) : forgetPassword ? (
                <div className='Rightpart col-lg-12 col-md-12'>
                  <div className='loginDialogRightDiv'>
                    <form
                      className='Login_form'
                      autoComplete='off'
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      onSubmit={handleForgetFormSubmit}>
                      <div
                        className='Login_feild'
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-around",
                        }}>
                        <TextField
                          // autoFocus={true}
                          InputProps={{
                            style: {
                              color: Logintoggle ? "grey" : null,
                              width: "100%",
                            },
                          }}
                          error={EmailErr}
                          size='small'
                          style={{ width: "15rem" }}
                          sx={{
                            // animation:EmailErr?'shake 0.2s ease-in-out 0s 2':null,
                            width: "15rem",
                            fontSize: "0.5rem",
                            color: "#ddd",
                          }}
                          onChange={
                            !Logintoggle
                              ? e => {
                                  setEmailid(e.target.value);
                                  setEmailErr(false);
                                }
                              : null
                          }
                          value={Emailid}
                          fullWidth
                          variant='standard'
                          required
                          helperText={EmailErr ? "Enter valid email" : null}
                        />
                        <span
                          className='change'
                          onClick={() => {
                            setLogintoggle(false);
                            setEmailid("");
                            setPassword("");
                            setforgetPassword(false);
                          }}>
                          Change?
                        </span>
                      </div>

                      <Button
                        fullWidth
                        variant='contained'
                        // color='primary'
                        style={{
                          color: "#fff",
                          marginTop: "1rem",
                          width: "9.563rem",
                          height: "2.188rem",
                          textTransform: "capitalize",
                          background:
                            "linear-gradient(90deg, #2157ad 0%, #6190da 100%)",
                        }}
                        type='submit'>
                        {forgetPasswordLoader ? (
                          <CircularProgress
                            style={{ color: "white" }}
                            size={16}
                          />
                        ) : (
                          `Continue`
                        )}
                      </Button>
                      {/* <div className='Login_feild'>
                          </div> */}
                    </form>

                    <div className='other_login'>
                      <div className='create_acount_text'>
                        <p>
                          Are you a registered user?{" "}
                          <span
                            className='text_span'
                            onClick={() => {
                              setSignuptoggle(false);
                              setforgetPassword(false);
                              setloginWithOtp(false);
                            }}>
                            Login
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : loginWithOtp ? (
                <LoginOtp
                  signupftoggle={signupftoggle}
                  setLogintoggle={setLogintoggle}
                  setEmailid={setEmailid}
                  setPassword={setPassword}
                />
              ) : (
                <div className='loginDialogRightDiv '>
                  <form
                    onSubmit={Logintoggle ? loginUser : checkuserexist}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      rowGap: "0.5rem",
                    }}>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          paddingBottom: "0.8rem",
                        }}>
                        <TextField
                          autoFocus={true}
                          // InputProps={{
                          //   style: { color: Logintoggle ? "grey" : null },
                          // }}
                          error={EmailErr}
                          size='small'
                          sx={{
                            // animation:EmailErr?'shake 0.2s ease-in-out 0s 2':null,
                            width: Logintoggle ? "18rem" : "18rem",
                            fontSize: "0.5rem",
                            color: "#ddd",
                          }}
                          label='Enter your email address '
                          onChange={
                            !Logintoggle
                              ? e => {
                                  setEmailid(e.target.value);
                                  setEmailErr(false);
                                }
                              : null
                          }
                          InputProps={{
                            tyle: { color: Logintoggle ? "grey" : null },
                            endAdornment: Logintoggle ? (
                              <InputAdornment position='start'>
                                &nbsp;&nbsp;
                                <span
                                  className='change'
                                  onClick={() => {
                                    setLogintoggle(false);
                                    setEmailid("");
                                    setPassword("");
                                  }}>
                                  Change?
                                </span>
                              </InputAdornment>
                            ) : null,
                          }}
                          value={Emailid}
                          variant='standard'
                          helperText={EmailErr ? "Enter valid email" : null}
                        />
                        {/* {Logintoggle ? (
                              <span
                                className='change'
                                onClick={() => {
                                  setLogintoggle(false);
                                  setEmailid("");
                                  setPassword("");
                                }}>
                                Change?
                              </span>
                            ) : null} */}
                      </div>

                      {Logintoggle ? (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}>
                          {" "}
                          <TextField
                            type={showPassword ? "text" : "password"}
                            error={PasswordErr}
                            size='small'
                            sx={{ width: "18rem", fontSize: "0.5rem" }}
                            label='Enter your password'
                            required
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  position='end'
                                  onClick={() => {
                                    setshowPassword(!showPassword);
                                  }}
                                  style={{ cursor: "pointer" }}>
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </InputAdornment>
                              ),
                            }}
                            onChange={e => {
                              setPassword(e.target.value);
                              setPasswordErr(false);
                            }}
                            variant='standard'
                            helperText={EmailErr ? "Enter valid email" : null}
                          />
                          {Logintoggle ? (
                            <span
                              style={{
                                fontSize: "12px",
                                color: "#2248AE",
                                cursor: "pointer",
                                alignSelf: "flex-end",
                                // textAlign: "end",
                                marginTop: "0.6rem",
                                // float: "right",
                              }}
                              onClick={() => {
                                setforgetPassword(true);
                              }}>
                              Forgot Password
                            </span>
                          ) : null}
                          {/* 
                              <TextField
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() => {
                                        setshowPassword()
                                      }}
                                      edge="end"
                                    >
                                      {showPassword ? "<VisibilityOff />" : "<Visibility />"}

                                    </IconButton>
                                  </InputAdornment>
                                }
                                type={"password"} error={PasswordErr} size="small" sx={{
                                  width: "18rem", fontSize: "0.5rem"
                                }} label="Enter your passwordss"
                                onChange={(e) => {
                                  setPassword(e.target.value)
                                  setPasswordErr(false)
                                }}
                                variant="standard" helperText={EmailErr ? "Enter valid email" : null} /> */}
                        </div>
                      ) : null}
                    </div>
                    <button type='submit' className='loginButton'>
                      {checkUserLoader ? (
                        // <i className='fa fa-circle-o-notch fa-spin' />
                        <CircularProgress
                          style={{ color: "white" }}
                          size={16}
                        />
                      ) : Logintoggle ? (
                        "Login"
                      ) : (
                        "Proceed"
                      )}
                    </button>

                    {Logintoggle ? (
                      <span
                        style={{ fontSize: "14px", color: "rgba(0,0,0,0.4)" }}>
                        or
                      </span>
                    ) : null}
                    {Logintoggle ? (
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#2248AE",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          // alert("log in with otp")
                          setloginWithOtp(true);
                        }}>
                        Login With Email OTP
                      </span>
                    ) : null}
                    <div className='loginImage'>
                      <Image src={loginimage} alt='' />
                    </div>
                  </form>
                  {/* {Logintoggle ? <span style={{ fontSize: "14px", color: "rgba(0,0,0,0.6)" }}>New to MyPustak? <span className="createAcc" onClick={() => {
                        setLogintoggle(false)
                        setSignuptoggle(true)
                        setEmailErr(false)
                        setPasswordErr(false)
                        setEmailid("")
                        setPassword("")
                      }}>Create an account</span></span> : null} */}
                </div>
              )}
            </div>
            <div>
              <IconButton
                style={{
                  position: "absolute",
                  borderRadius: 50,
                  padding: "5px",
                  top: 0,
                  right: 0,
                  zIndex: 100,
                  backgroundColor: "#000",
                  opacity: "0.75",
                }}
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
                }}>
                <CloseIcon fontSize='small' style={{ color: "#fff" }} />
              </IconButton>
            </div>
          </DialogContent>
        </SwipeableDrawer>
      </MediaQuery>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    incart_check: state.cartReduc.incart_check,
    cartDetails: state.cartReduc.MyCart,
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
    ForgetPassword: body => dispatch(ForgetPassword(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(BottomNavbar));
