"use client";
import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import smlogo from "../../assets/mypustak_100_px.svg";
// import MediaQuery from "react-responsive";
import Image from "next/legacy/image";
import dynamic from "next/dynamic";
import {
  CLUSTERHOST,
  INSTANTSEARCHAPIKEY,
  INSTANTSEARCHSCHEMA,
  logout,
} from "../../helper/helpers";
import { useSnackbar } from "notistack";

import { InstantSearch } from "react-instantsearch";
import { Configure } from "react-instantsearch";
import DebouncedSearchBox from "./CustomSearchboxnew";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ShareLocationTwoToneIcon from "@mui/icons-material/ShareLocationTwoTone";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { GetWishlistCount } from "../../redux/actions/wishlistAction";

import Link from "next/link";
import MypustakLogo from "./MypustakLogo";
import styles from "../../styles/WLoginNavbar.module.css";
import {
  Badge,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import {
  EmailValidation,
  PasswordValidation,
  PhoneValidation,
} from "../../helper/validations";
import {
  CheckUserExistance,
  LoginCheck,
  setComponentStatus,
  signupCheck,
} from "../../redux/actions/loginactions";
import CloseIcon from "@mui/icons-material/Close";
import MediaQuery from "react-responsive";
import trackimage from "../../assets/trackimg.png";
import loginimage from "../../assets/LoginImage.svg";
import GlobalSearchBar from "./GlobalSearchBar";
import { connect } from "react-redux";
import LoginOtp from "./LoginOtp";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SignupDiv from "../logindialogdivs/SignupDiv";
import { profileComponents } from "../../helper/constant";
// import { Router } from "next/router";
import {
  getOffers,
  getOffersHomepage,
} from "../../redux/actions/offerpageAction";
import {
  check_book_incart,
  updateCartlocalStorage,
} from "../../redux/actions/cartAction";
import { fetch_wishlist_detail_otherpage } from "../../redux/actions/loginactions";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SideCategory from "../SideCategory/SideCategory";
const SideDrawer = dynamic(() => import("../SideDrawer/SideDrawer"), {
  ssr: false,
});
function NewNavbar(props) {
  const Router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let [queryString, setqueryString] = useState("");
  const [hover, setHover] = useState(false);
  const [sidemenu, setsidemenu] = useState(false);

  const [showTrackDialog, setshowTrackDialog] = useState(false);
  const [showLoginDialog, setshowLoginDialog] = useState(false);
  const [EmailErr, setEmailErr] = useState(false);
  const [urlPath, setUrlPath] = useState();

  const [toTrackid, settoTrackid] = useState("");
  const [Emailid, setEmailid] = useState("");
  const [user_info, setuser_info] = useState("");

  const [Mobile, setMobile] = useState("");
  const [MobileErr, setMobileErr] = useState(false);
  const [Password, setPassword] = useState("");
  const [PasswordErr, setPasswordErr] = useState(false);
  const [Signuptoggle, setSignuptoggle] = useState(false);
  const [Logintoggle, setLogintoggle] = useState(false);
  const [checkUserLoader, setcheckUserLoader] = useState(false);
  const [signupLoader, setsignupLoader] = useState(false);
  const [loginWithOtp, setloginWithOtp] = useState(false);
  const [forgetPassword, setforgetPassword] = useState(false);
  const [forgetPasswordLoader, setforgetPasswordLoader] = useState(false);
  const [showdot, setshowdot] = useState(false);
  const [sdraw, setsdraw] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [exactpath, setexactpath] = useState("");
  const [value, setvalue] = useState(null);
  const closeDialog = () => {
    setsidemenu(false);
  };

  const open_sidemenu = () => {
    setsidemenu(true);
  };
  const close_sidemenu = () => {
    setsidemenu(false);
  };
  const settingsdraw = (d) => {
    setsdraw(d);
  };
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      let patharr = window.location.pathname.split("/");
      console.log(patharr[1], "window.location.pathname");
      setexactpath(patharr[1]);
    }
  }, []);
  React.useEffect(() => {
    setUrlPath(window.location.pathname);
    console.log(window.location.pathname, "window.location.pathname1");
    let patharr = window.location.pathname.split("/");
    console.log(patharr[1], "window.location.pathname");
    setexactpath(patharr[1]);
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("value");
    // const dialog = queryParams.get("d");
    setvalue(name);
    console.log(searchParams.get("ret"), "Router.query");
    // let rtl = Router.query.ret;
    let rtl = searchParams.get("ret");

    setqueryString = rtl;
    // console.log(props.getOffersHomepage());
    props.getOffersHomepage();
    // props.fetch_wishlist_detail_otherpage();
    setuser_info(localStorage.getItem("user_info"));
    if (props.userComponentStatus != 2) {
      props.updateCartlocalStorage();
      if (patharr[1] != "product") {
        props.fetch_wishlist_detail_otherpage();
      }
    }
    props.setComponentStatus(1);
    if (
      patharr[1] != "product" ||
      patharr[1] != "thank-you" ||
      patharr[1] != "checkout"
    ) {
      // alert(patharr[1])
      props.check_book_incart().then((res) => {
        console.log(res, "check_book_incart");
      });
    }
  }, []);

  // enqueueSnackbar(`${res.message}`, { variant: "success" });

  const hoverStyle = {
    display: "block",

    padding: "0rem 1rem",
    paddingTop: "0.7rem",
    textDecoration: "none",
    cursor: "pointer",
  };

  const normalStyle = {
    display: "none",
    position: "absolute",
  };

  const onClick_trackbtn = () => {
    if (props.getuserdetails.email) {
      setshowTrackDialog(true);
      setshowLoginDialog(false);
    } else {
      Router.push(`?d=track`, undefined, { shallow: true });
      enqueueSnackbar(
        "Please login using your registered email id to track your order",
        {
          variant: "warning",
        }
      );
      setshowLoginDialog(true);
    }
  };

  const trackOrder = (e) => {
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
          .then((res) => {
            window.open(res.data.output);
          })
          .catch((err) => {
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
            console.log(err.response.data, "ERRR");
          });
      } else {
        enqueueSnackbar("Please enter a valid Tracking Id/Order Id", {
          variant: "warning",
        });
      }
    } else {
      enqueueSnackbar("Please enter Tracking Id/Order Id", {
        variant: "warning",
      });
    }
  };

  const checkuserexist = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(window.location.search);
    const dialog = queryParams.get("d");
    const email_id = Emailid;
    setEmailErr(EmailValidation(email_id));
    let body = {
      email: email_id,
    };
    if (!EmailValidation(email_id)) {
      setcheckUserLoader(true);
      props
        .CheckUserExistance(body)
        .then((res) => {
          if (res.response[0].is_exist) {
            setLogintoggle(true);
            setcheckUserLoader(false);
          } else {
            if (dialog == "track") {
              enqueueSnackbar("Email Id not does not exist", {
                variant: "warning",
              });
              enqueueSnackbar(
                "Please login using your email id which you have used in placing your order",
                {
                  variant: "warning",
                }
              );
            } else {
              setSignuptoggle(true);
            }
            setcheckUserLoader(false);
          }
        })
        .catch((err) => {
          console.log({ err });
          setcheckUserLoader(false);
        });
    }
  };

  const loginUser = (e) => {
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
      .then((res) => {
        setshowLoginDialog(false);
        setcheckUserLoader(false);
        let backurl = queryString;
        const getCookieArr = document.cookie.split("; ");
        let Cookie_details = getCookieArr.filter((e) => e.startsWith("I="));
        let token;
        if (Cookie_details.length) {
          let details = Cookie_details[0].replace("I=", "");

          let json_details = JSON.parse(details);
          token = json_details.access;
        }
        if (backurl) {
          props.addPresetBulkCartOnLoginAction(token);
          window.location.replace(backurl);
        } else {
          props.addPresetBulkCartOnLoginAction(token);
          window.location.reload();
          setshowdot(true);
        }
      })
      .catch((err) => {
        enqueueSnackbar(err?.response?.data?.msg, { variant: "error" });
        setcheckUserLoader(false);
      });
  };

  const logoutUser = () => {
    logout()
      .then((res) => {})
      .catch((err) => {
        console.log({ err });
      });
  };

  const ResizeBreadcrumbs_title = (titleP) => {
    let title = `${titleP}`;
    // alert(typeof title)
    if (title.length > 7) {
      return title.substr(0, 7) + "..";
    } else {
      return title;
    }
  };
  const onMouseEnter = () => {
    setHover(true);
    setshowdot(false);
    props.GetWishlistCount();
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  return (
    <div>
      {/* for Desktop */}
      {props.PopupCart ? <SideDrawer show={props.PopupCart} /> : null}

      <div className="d-none  d-sm-flex d-xl-flex text-sm min-w-full  ">
        <div
          className={`${styles.appbarcontainer} grid grid-cols-12 gap-4  px-4 py-2  w-full min-w-full`}
        >
          <div className="col-span-2 ">
            <MypustakLogo />
          </div>

          <div className="col-span-3 col-start-5 sm:col-span-1">
            <div className=" d-sm-flex">
              <GlobalSearchBar />
            </div>
          </div>

          <div className="col-start-10 col-span-3 md:col-start-10 text-white-500 sm:col-start-9 sm:col-span-4 pt-2  align-center">
            <div className=" d-none d-sm-flex d-xs-none d-md-flex justify-between">
              <div className="{`${styles.dropdon1}`}" style={{}}>
                <button
                  aria-label=""
                  // className={`${styles.icon}`}
                  className={`${styles.dropbtn2} icon`}
                  onClick={() => {
                    props.getuserdetails.email != null
                      ? null
                      : urlPath == "/account/Loginpage"
                      ? null
                      : setshowLoginDialog(true);
                    setshowTrackDialog(false);
                  }}
                  onMouseEnter={
                    props.getuserdetails.email != null ? onMouseEnter : null
                  }
                  onMouseLeave={
                    props.getuserdetails.email != null ? onMouseLeave : null
                  }
                  style={{
                    backgroundColor: "transparent",
                    color: "#fff",
                    border: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    alignItems: "center",
                    cursor: "pointer",
                    textOverflow: "ellipsis",
                    maxWidth: "7rem",
                    display: "flex",
                    // alignItems: "center",
                  }}
                >
                  {false ? (
                    <FiberManualRecordIcon style={{ fontSize: "0.75em" }} />
                  ) : null}
                  <PersonOutlineIcon />
                  {props.getuserdetails.email != null ? (
                    props.getuserdetails.name != null ? (
                      // `Hi! ${props.getuserdetails.name}`.length > 15 ? (
                      // props.getuserdetails.name.length < 10 ? (
                      true ? (
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <span>
                            Hi!{" "}
                            {ResizeBreadcrumbs_title(props.getuserdetails.name)}
                          </span>
                        </span>
                      ) : (
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <span>Hi! {props.getuserdetails.name}</span>
                        </span>
                      )
                    ) : (
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <span>Hi! Reader</span>
                      </span>
                    )
                  ) : (
                    "Login"
                  )}
                  {/* {"Login"} */}
                </button>

                {hover ? (
                  <div className={`${styles.dropdown_content} rounded-md`}>
                    {profileComponents.map((data) => (
                      <React.Fragment key={data.key}>
                        <div>
                          <div
                            className={styles.options + " pt-3 pb-2 rounded-md"}
                            style={hover ? hoverStyle : normalStyle}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            onClick={(e) => {
                              e.preventDefault();
                              onMouseLeave();
                              if (data.name == "Logout") {
                                logoutUser();
                              } else {
                                if (props.getuserdetails.email != null) {
                                  Router.push(`${data.page}`);
                                } else {
                                  enqueueSnackbar(
                                    `Please login to view ${data.name}`,
                                    {
                                      variant: "warning",
                                    }
                                  );
                                  Router.push(
                                    `/account/Loginpage?ret=${data.page}`
                                  );
                                }
                              }
                            }}
                          >
                            <React.Fragment>
                              {data.icon} {data.name}{" "}
                              {data.key == 3
                                ? `(${
                                    props.Total_wish_count
                                      ? props.Total_wish_count
                                      : 0
                                  })`
                                : null}
                            </React.Fragment>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                ) : null}
              </div>
              <span
                className={`${styles.icon}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => onClick_trackbtn()}
              >
                <LocationOnOutlinedIcon />
                Track Order
              </span>
              <span
                className="{`${styles.icon}`}"
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (props.getuserdetails.email != null) {
                    Router.push(`/view-cart`);
                  } else {
                    enqueueSnackbar("Please login to view items in cart", {
                      variant: "warning",
                    });
                    window.location.replace(
                      "/account/Loginpage?ret=/view-cart"
                    );
                  }
                }}
              >
                <Badge
                  badgeContent={props.incart_check.length}
                  // badgeContent={1}
                  color="warning"
                >
                  <ShoppingCartOutlinedIcon />
                </Badge>
                Cart
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* for mobile */}

      <div className="d-flex  d-sm-none min-w-full">
        <div className="grid grid-cols-12 bg-[#2157ad] px-4 py-1 pt-2 min-w-full">
          <div className="col-span-2">
            <IconButton
              aria-label="menuIcon"
              //  onClick={() => {
              //    props.setdrawer(true);
              //  }}
            >
              <MenuIcon style={{ color: "#fff" }} onClick={open_sidemenu} />
            </IconButton>
          </div>
          <div className="col-span-4 col-start-5 ">
            <MypustakLogo />
          </div>

          <div className="col-span-2 col-start-12 sm:col-span-1 pt-2">
            <div className=" d-sm-flex">
              <InstantSearch
                //  indexName={INSTANTSEARCHSCHEMA}
                //  searchClient={searchClient}
                searchClient=""
              >
                <DebouncedSearchBox delay={350} />
                <Configure hitsPerPage={6} />
              </InstantSearch>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------- Hover funtion ----------------------------------------------------------- */}

      {/* ------------------------------ Dialog ------------------------------------------------ */}

      <MediaQuery minWidth={577}>
        <Dialog
          BackdropProps={{
            style: {
              backgroundColor: "#fff",
              opacity: "0.9",
            },
          }}
          open={showTrackDialog}
        >
          <DialogContent
            style={{
              display: "flex",
              alignItems: "flex-start",
              padding: 0,
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", padding: 8 }}>
              <div className={`${styles.trackdialogLeftDiv}`}>
                <div
                  className="logoDiv"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "7.25rem" }}>
                    <Image
                      height={"1.5rem"}
                      layout={"responsive"}
                      width={"4.188rem"}
                      alt="MyPustak.com"
                      title="MyPustak.com"
                      src={logo}
                    />
                  </div>
                  <span className={`${styles.innerspan}`}>
                    Track your orders instantly!
                  </span>
                </div>
                <div className={`${styles.trackImage}`}>
                  <Image src={trackimage} alt="" />
                </div>
              </div>
              <div className={`${styles.trackdialogRightDiv}`}>
                <span className={`${styles.rightHead}`}>Track Order</span>
                <form onSubmit={trackOrder}>
                  <TextField
                    size="small"
                    sx={{ width: "18rem", fontSize: "0.5rem" }}
                    label="Enter Your Tracking Id/Order Id"
                    onChange={(e) => {
                      settoTrackid(e.target.value);
                    }}
                    variant="standard"
                  />
                  {/* <input placeholder=""/> */}
                  <button type="submit" className="{`${styles.trackButton}`}">
                    Track Order
                  </button>
                </form>
                <span className={`${styles.viewmyOrder}`}>
                  View My Orders to Track your Orders
                </span>
                {props.getuserdetails.email != null ? (
                  <span
                    className={`${styles.myordertoview}`}
                    onClick={() => {
                      Router.push("/customer/customer_order");
                      setshowTrackDialog(false);
                    }}
                  >
                    My Orders
                  </span>
                ) : (
                  <span className={`${styles.logintoview}`}>
                    *Login to view my orders
                  </span>
                )}
              </div>
            </div>
            <div>
              <IconButton
                onClick={() => {
                  setshowTrackDialog(false);
                }}
                style={{ padding: "5px" }}
              >
                <CloseIcon fontSize="small" style={{ color: "#000" }} />
              </IconButton>
            </div>
          </DialogContent>
        </Dialog>
      </MediaQuery>

      <MediaQuery minWidth={577}>
        <Dialog
          BackdropProps={{
            style: {
              backgroundColor: "#fff",
              opacity: "0.9",
            },
          }}
          open={urlPath == "/account/Loginpage" ? false : showLoginDialog}
          // open={true}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent
            style={{ display: "flex", padding: 0, overflow: "hidden" }}
          >
            <div
              style={{
                minWidth: "22rem",
                display: "flex",
                alignItems: "flex-start",
                padding: 8,
              }}
            >
              <div className={`${styles.trackdialogLeftDiv}`}>
                <div
                  className="logoDiv"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "7.25rem" }}>
                    <Image
                      height={"1.5rem"}
                      layout={"responsive"}
                      width={"4.188rem"}
                      alt="MyPustak.com"
                      title="MyPustak.com"
                      src={logo}
                    />
                  </div>
                  <span className={`${styles.inneHead}`}>
                    Welcome To MyPustak
                  </span>
                  <span className={`${styles.innerspan}`}>
                    Login to get access to your Orders, profile, and
                    Recommendations
                  </span>
                </div>
                <div className={`${styles.loginImage}`}>
                  <Image src={loginimage} alt="" />
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
                <div className={`${styles.Rightpart} col-lg-12 col-md-12`}>
                  <div className="{`${styles.loginDialogRightDiv}`}">
                    <form
                      className={`${styles.Login_form}`}
                      autoComplete="off"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      onSubmit={handleForgetFormSubmit}
                    >
                      <div
                        className={`${styles.Login_feild}`}
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-around",
                        }}
                      >
                        <TextField
                          autoFocus={Logintoggle ? false : true}
                          InputProps={{
                            style: {
                              color: Logintoggle ? "grey" : null,
                              width: "100%",
                            },
                          }}
                          error={EmailErr}
                          size="small"
                          style={{ width: "15rem" }}
                          sx={{
                            width: "15rem",
                            fontSize: "0.5rem",
                            color: "#ddd",
                          }}
                          onChange={
                            !Logintoggle
                              ? (e) => {
                                  setEmailid(e.target.value);
                                  setEmailErr(false);
                                }
                              : null
                          }
                          value={Emailid}
                          fullWidth
                          variant="standard"
                          required
                          helperText={EmailErr ? "Enter valid email" : null}
                        />
                        <span
                          className={`${styles.change}`}
                          onClick={() => {
                            setLogintoggle(false);
                            setEmailid("");
                            setPassword("");
                            setforgetPassword(false);
                          }}
                        >
                          Change?
                        </span>
                      </div>

                      <Button
                        fullWidth
                        variant="contained"
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
                        type="submit"
                      >
                        {forgetPasswordLoader ? (
                          <CircularProgress
                            style={{ color: "white" }}
                            size={16}
                          />
                        ) : (
                          `Continue`
                        )}
                      </Button>
                    </form>

                    <div className={`${styles.other_login}`}>
                      <div className={`${styles.create_acount_text}`}>
                        <p>
                          Are you a registered user?{" "}
                          <span
                            className={`${styles.text_span}`}
                            onClick={() => {
                              setSignuptoggle(false);
                              setforgetPassword(false);
                              setloginWithOtp(false);
                            }}
                          >
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
                <div className={`${styles.loginDialogRightDiv}`}>
                  <form
                    onSubmit={Logintoggle ? loginUser : checkuserexist}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          paddingBottom: "0.8rem",
                        }}
                      >
                        <TextField
                          autoFocus={Logintoggle ? false : true}
                          // InputProps={{
                          //   style: { color: Logintoggle ? "grey" : null },
                          // }}
                          error={EmailErr}
                          size="small"
                          sx={{
                            // animation:EmailErr?'shake 0.2s ease-in-out 0s 2':null,
                            width: Logintoggle ? "18rem" : "18rem",
                            fontSize: "0.5rem",
                            color: "#ddd",
                          }}
                          label="Enter your email address "
                          onChange={
                            !Logintoggle
                              ? (e) => {
                                  setEmailid(e.target.value);
                                  setEmailErr(false);
                                }
                              : null
                          }
                          value={Emailid}
                          variant="standard"
                          helperText={EmailErr ? "Enter valid email" : null}
                          InputProps={{
                            tyle: { color: Logintoggle ? "grey" : null },
                            endAdornment: Logintoggle ? (
                              <InputAdornment position="start">
                                &nbsp;&nbsp;
                                <span
                                  className={`${styles.change}`}
                                  onClick={() => {
                                    setLogintoggle(false);
                                    setEmailid("");
                                    setPassword("");
                                  }}
                                >
                                  Change?
                                </span>
                              </InputAdornment>
                            ) : null,
                          }}
                        />
                      </div>

                      {Logintoggle ? (
                        <>
                          {" "}
                          <TextField
                            type={showPassword ? "text" : "password"}
                            error={PasswordErr}
                            size="small"
                            sx={{ width: "18rem", fontSize: "0.5rem" }}
                            label="Enter your password"
                            required
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  onClick={() => {
                                    setshowPassword(!showPassword);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </InputAdornment>
                              ),
                            }}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setPasswordErr(false);
                            }}
                            variant="standard"
                            helperText={EmailErr ? "Enter valid email" : null}
                          />
                          {Logintoggle ? (
                            <span
                              style={{
                                fontSize: "12px",
                                color: "#2248AE",
                                cursor: "pointer",
                                textAlign: "end",
                                marginTop: "0.7rem",
                                float: "right",
                              }}
                              onClick={() => {
                                setforgetPassword(true);
                              }}
                            >
                              Forgot Password
                            </span>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                    <button type="submit" className={`${styles.loginButton}`}>
                      {checkUserLoader ? (
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
                        style={{
                          fontSize: "14px",
                          marginTop: "0.6rem",
                          color: "rgba(0,0,0,0.4)",
                        }}
                      >
                        or
                      </span>
                    ) : null}
                    {Logintoggle ? (
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#2248AE",
                          cursor: "pointer",
                          marginTop: "1rem",
                        }}
                        onClick={() => {
                          setloginWithOtp(true);
                        }}
                      >
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

                  Router.push(`?`, undefined, { shallow: true });
                }}
                style={{ padding: "5px" }}
              >
                <CloseIcon fontSize="small" style={{ color: "#000" }} />
              </IconButton>
            </div>
          </DialogContent>
        </Dialog>
      </MediaQuery>

      <SwipeableDrawer
        anchor="left"
        open={sidemenu}
        onClose={closeDialog}
        swipeAreaWidth={0}
        onOpen={() => {}}
        style={{ border: "0px solid blue", zIndex: "3000" }}
      >
        <div>
          {" "}
          <SideCategory
            sidemenu_toggle={close_sidemenu}
            closeDialog_menu={closeDialog}
          />
        </div>
      </SwipeableDrawer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    incart_check: state.cartReduc.incart_check,
    getuserdetails: state.loginReducer.getuserdetails,
    userComponentStatus: state.loginReducer.userComponentStatus,
    SuggestionData: state.productsuggestionreducer.SuggestionData,
    PopupCart: state.cartReduc.PopupCart,
    userToken: state.accountR.token,
    MyWishlist: state.cartReduc.MyWishlist,
    list_wishlist: state.cartReduc.list_wishlist,
    Total_wish_count: state.wishlistR.Total_wish_count,
    offerhomepage: state.offerpageReducer.offerhomepage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetTrackingUrl: (body) => dispatch(GetTrackingUrl(body)),
    CheckUserExistance: (body) => dispatch(CheckUserExistance(body)),
    signupCheck: (body) => dispatch(signupCheck(body)),
    LoginCheck: (body) => dispatch(LoginCheck(body)),
    fetch_wishlist_detail_otherpage: () =>
      dispatch(fetch_wishlist_detail_otherpage()),
    setComponentStatus: () => dispatch(setComponentStatus()),
    ForgetPassword: (body) => dispatch(ForgetPassword(body)),
    updateCartlocalStorage: () => dispatch(updateCartlocalStorage()),
    check_book_incart: () => dispatch(check_book_incart()),
    GetWishlistCount: () => dispatch(GetWishlistCount()),
    getOffers: () => dispatch(getOffers()),
    getOffersHomepage: () => dispatch(getOffersHomepage()),
    addPresetBulkCartOnLoginAction: (token) =>
      dispatch(addPresetBulkCartOnLoginAction(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewNavbar);
// export default NewNavbar;
