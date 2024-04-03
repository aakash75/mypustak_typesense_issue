
"use client"
import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import smlogo from "../../assets/mypustak_100_px.svg";
import dynamic from "next/dynamic";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MediaQuery from "react-responsive";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ShareLocationTwoToneIcon from "@mui/icons-material/ShareLocationTwoTone";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import Image from "next/legacy/image";
import Link from "next/link";
import styles from "../../styles/WLoginNavbar.module.css"


import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import trackimage from "../../assets/trackimg.png";
import loginimage from "../../assets/LoginImage.svg";
import CloseIcon from "@mui/icons-material/Close";
import { connect } from "react-redux";
import { GetTrackingUrl } from "../../redux/actions/trackingurlaction";
import {
  CheckUserExistance,
  LoginCheck,
  setComponentStatus,
  signupCheck,
} from "../../redux/actions/loginactions";
import {
  check_book_incart,
  updateCartlocalStorage,
} from "../../redux/actions/cartAction";
import {
  EmailValidation,
  PasswordValidation,
  PhoneValidation,
} from "../../helper/validations";
const SignupDiv = dynamic(() => import("../logindialogdivs/SignupDiv"));
import { Visibility, VisibilityOff } from "@mui/icons-material";
const SideDrawer = dynamic(() => import("../SideDrawer/SideDrawer"), {
  ssr: false,
});
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { InstantSearch } from "react-instantsearch";
import { Configure } from "react-instantsearch";
import { fetch_wishlist_detail_otherpage } from "../../redux/actions/loginactions";
import { GetWishlistCount } from "../../redux/actions/wishlistAction";
import {
  CLUSTERHOST,
  INSTANTSEARCHAPIKEY,
  INSTANTSEARCHSCHEMA,
  logout,
} from "../../helper/helpers";
import { useSnackbar } from "notistack";
import {
  ForgetPassword,
  addPresetBulkCartOnLoginAction,
} from "../../redux/actions/accountAction";
import { CircularProgress } from "@mui/material";
import { withSnackbar } from "notistack";
const LoginOtp = dynamic(() => import("./LoginOtp"));
import CustomSortBy from "../instantsearchcustomcomponents/SortBy";
import SideCategory from "../SideCategory/SideCategory";
const PageHeader = dynamic(() => import("../pageHeader/PageHeader"), {
  ssr: false,
});
import {
  getOffers,
  getOffersHomepage,
} from "../../redux/actions/offerpageAction";
// import DebouncedSearchBox from "./CustomSearchBoxClass";
import DebouncedSearchBox from "./CustomSearchboxnew";

// import CompleteSearchbox from "./CompleteSearchbox";
const profileComponents = [
  {
    key: 1,
    name: " My Profile",
    icon: <PersonOutlineIcon style={{ color: "#356dc4" }} />,
    href: "",
    page: "/customer/Myprofile",
  },
  {
    key: 2,
    name: "My Orders",
    icon: <InventoryOutlinedIcon style={{ color: "#356dc4" }} />,
    href: "",
    page: "/customer/customer_order",
  },
  {
    key: 3,
    name: " My Wishlist",
    icon: <ListOutlinedIcon style={{ color: "#356dc4" }} />,
    href: "",
    page: "/customer/wishlist",
  },
  {
    key: 4,
    name: "Manage Address",
    icon: <ShareLocationTwoToneIcon style={{ color: "#356dc4" }} />,
    href: "",
    page: "/customer/manage_address",
  },
  {
    key: 5,
    name: "My Donations",
    icon: <VolunteerActivismOutlinedIcon style={{ color: "#356dc4" }} />,
    href: "",
    page: "/donor/donor_donation_request",
  },
  {
    key: 6,
    name: "My Wallet",
    icon: <AccountBalanceWalletOutlinedIcon style={{ color: "#356dc4" }} />,

    href: "",
    page: "/mypustak-wallet",
  },
  {
    key: 7,
    name: "My Passbook",
    icon: <ReceiptLongOutlinedIcon style={{ color: "#356dc4" }} />,
    href: "",
    page: "/wallet/passbook",
  },
  {
    key: 8,
    name: "Logout",
    icon: <PowerSettingsNewOutlinedIcon style={{ color: "red" }} />,
    href: "",
  },
];


function LoginSection(props) {
  const router = useRouter();
  const params = useParams()
  const pathname = usePathname()
  const [showNavBar, setShowNavBar] = useState(true)
  const searchParams = useSearchParams()
  const [sidemenu, setsidemenu] = useState(false);
  const [value, setvalue] = useState(null);
  const [showPassword, setshowPassword] = useState(false);
  const [urlPath, setUrlPath] = useState();
  const [user_info, setuser_info] = useState("");
  const [exactpath, setexactpath] = useState("");

  const closeDialog = () => {
    setsidemenu(false);
  };

  const open_sidemenu = () => {
    setsidemenu(true);
  };
  const close_sidemenu = () => {
    setsidemenu(false);
  };
  useEffect(() => {
      if (typeof window !== "undefined") {

      let patharr = window.location.pathname.split("/");
      console.log(patharr[1], "window.location.pathname");
      setexactpath(patharr[1]);
    }
    }, [window.location.pathname]);

  useEffect(() => {

    setUrlPath(window.location.pathname);
    console.log(window.location.pathname, "window.location.pathname1");
    let patharr = window.location.pathname.split("/");
    console.log(patharr[1], "window.location.pathname");
    setexactpath(patharr[1]);
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("value");
    // const dialog = queryParams.get("d");
    setvalue(name);






    const search = searchParams.get('ret')
    setqueryString = search;
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
  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("value");
    if (name !== value) {
      setvalue(name);
    }
  }, [value]);

  useEffect(() => {
    const show = pathname.split("/").includes("pages")
    const checkout = pathname.split("/").includes("checkout")
    if (show || checkout) {
      setShowNavBar(false)
    }
  }, [])

  let [queryString, setqueryString] = useState("");
  const [hover, setHover] = useState(false);
  const [showTrackDialog, setshowTrackDialog] = useState(false);
  const [showLoginDialog, setshowLoginDialog] = useState(false);
  const [toTrackid, settoTrackid] = useState("");
  const [Emailid, setEmailid] = useState("");
  const [EmailErr, setEmailErr] = useState(false);
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
  const settingsdraw = (d) => {
    setsdraw(d);
  };
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

  const onMouseEnter = () => {
    setHover(true);
    setshowdot(false);
    props.GetWishlistCount();
  };

  const onMouseLeave = () => {
    setHover(false);
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
        console.log(err.response.data.msg);
        enqueueSnackbar(err.response.data.msg, { variant: "error" });
        setcheckUserLoader(false);
      });
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
        ?.then((res) => {
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

  const signupuser = (e) => {
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
        .then((res) => {
          setsignupLoader(false);
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
            props
              .addPresetBulkCartOnLoginAction(token)
              .then((res) => {
                // window.location.reload();
                // this.setState({ adding_cart: false });
              })
              .catch((err) => {
                console.log(err, 123456);
                // window.location.reload();
                // this.setState({ adding_cart: false });
              });
            // Router.replace(backurl);
            window.location.replace(backurl);
          } else {
            props
              .addPresetBulkCartOnLoginAction(token)
              .then((res) => {
                // window.location.reload();
                // this.setState({ adding_cart: false });
              })
              .catch((err) => {
                console.log(err, 123456);
                // window.location.reload();
                // this.setState({ adding_cart: false });
              });
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err, "123456");
          setsignupLoader(false);
          if (err == 417) {
            setsignupLoader(false);
            props.loginOtpToggle();
          }
        });
    }
  };
  const logoutUser = () => {
    logout()
      .then((res) => { })
      .catch((err) => {
        console.log({ err });
      });
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

  const handleForgetFormSubmit = (e) => {
    e.preventDefault();
    let body = {
      email: Emailid,
    };
    setforgetPasswordLoader(true);
    props
      .ForgetPassword(body)
      .then((res) => {
        setforgetPasswordLoader(false);
        let ForgetErrMsg = `A link has been sent to ${Emailid} please check, and reset your password, `;
        enqueueSnackbar(ForgetErrMsg, { variant: "success" });
      })
      .catch((err) => {
        console.log(err.response);
        setforgetPasswordLoader(false);
        let ForgetErrMsg = "Mail not send.Please contact Mypustak support";
        enqueueSnackbar(ForgetErrMsg, { variant: "warning" });
      });
  };
  const handleFormSubmit = () => {
    setforgetPassword(true);
    let body = {
      email: Emailid,
    };
    props
      .ForgetPassword(body)
      .then((res) => {
        let ForgetErrMsg = `A link has been sent to ${Emailid}o reset your password, please check.`;
        enqueueSnackbar(ForgetErrMsg, { variant: "success" });
      })
      .catch((err) => {
        console.log(err.response);
        let ForgetErrMsg = "Mail not send.Please contact Mypustak support";
        enqueueSnackbar(ForgetErrMsg, { variant: "warning" });
      });
  };
  const signupftoggle = () => {
    setSignuptoggle(false);
    setforgetPassword(false);
    setloginWithOtp(false);
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
  return (
    <React.Fragment>
      {
        showNavBar && <div >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
            // className="combinedDiv"
            >
              {/* cart drawert*/}
              {props.PopupCart ? <SideDrawer show={props.PopupCart} /> : null}

              <div className="mainNavDiv">
                {/* for desktop */}
             

                {/* for mobile */}
                {/* <MediaQuery maxWidth={576}>
                  <div className="">
                    <IconButton
                      aria-label="menuIcon"
                      onClick={() => {
                        props.setdrawer(true);
                      }}
                    >
                      <MenuIcon style={{ color: "#fff" }} onClick={open_sidemenu} />
                    </IconButton>
                  </div>
                </MediaQuery> */}

                {/* for desktop */}
                <MediaQuery minWidth={577}>
               
                </MediaQuery>
                {/* for mobile */}
                <MediaQuery maxWidth={576}>
                  <div className="d-block  d-lg-none d-flex justify-content-center">
                    {urlPath == "/search" ? (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "100%", width: "90%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            borderRadius: "50%",
                            padding: "3px 3px",
                            // minWidth: "1.75rem",
                            // maxWidth: "1.75rem",
                            cursor: "pointer",
                            maxHeight: "fit-content",
                          }}
                        >
                          <Image
                            alt="MyPustak.com"
                            height={25}
                            width={25}
                            src="https://d239pyg5al708u.cloudfront.net/uploads/icons/mypustak_logo.svg"
                            onClick={() => {
                              // Router.push("/");
                              window.location.assign("/");
                            }}
                          />
                        </div>

                        <span
                          type={"text"}
                          onClick={() => {
                            setsdraw(true);
                          }}
                          style={{
                            width: "100%",
                            marginLeft: "0.5rem",
                            background: "transparent",
                            color: "#fff",
                          }}
                          size="small"
                        >
                          {value?.length > 22
                            ? value.substring(0, 22).concat("...")
                            : value}
                        </span>
                      </div>
                    ) : urlPath == "/" ||
                      urlPath == "/view-cart" ||
                      exactpath == "product" ||
                      exactpath == "donate-books" ||
                      exactpath == "author" ||
                      exactpath == "publication" ||
                      exactpath == "customer" ||
                      exactpath == "forpassreset" ? (
                      <div
                        className="d-flex justify-content-center"
                        style={{
                          marginTop: "5px",
                          // minWidth: "6.625rem",
                          // maxWidth: "6.625rem",
                          cursor: "pointer",

                          border: "1px solid white",
                          padding: "2px 4px",
                          background: "white",
                          borderRadius: "20px",
                        }}
                      >
                        <Image
                          alt="MyPustak.com"
                          src={smlogo}
                          onClick={() => {
                            // Router.replace("/");
                            window.location.replace("/");
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "100%", width: "90%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            borderRadius: "50%",
                            padding: "3px 3px",
                            // minWidth: "1.75rem",
                            // maxWidth: "1.75rem",
                            cursor: "pointer",
                            maxHeight: "fit-content",
                          }}
                        >
                          <Image
                            alt="MyPustak.com"
                            height={25}
                            width={25}
                            src="https://d239pyg5al708u.cloudfront.net/uploads/icons/mypustak_logo.svg"
                            onClick={() => {
                              window.location.assign("/");
                            }}
                          />
                        </div>

                        <span
                          type={"text"}
                          onClick={() => {
                            setsdraw(true);
                          }}
                          style={{
                            width: "100%",
                            marginLeft: "0.5rem",
                            background: "transparent",
                            color: "#fff",
                          }}
                          size="small"
                        >
                          <PageHeader />
                        </span>
                      </div>
                    )}
                  </div>
                </MediaQuery>
                {/* for desktop */}
                <MediaQuery minWidth={577}>
                  <div className="endDiv d-none d-sm-flex">
                    <div className="dropdown" style={{}}>
                      <button
                        aria-label="dropdown"
                        className="dropbtn py-3 icon"
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
                          alignItems: "center",
                        }}
                      >
                        {showdot ? (
                          <FiberManualRecordIcon style={{ fontSize: "0.75em" }} />
                        ) : null}
                        <PersonOutlineIcon />
                        {props.getuserdetails.email != null ? (
                          props.getuserdetails.name != null ? (
                            // `Hi! ${props.getuserdetails.name}`.length > 15 ? (
                            // props.getuserdetails.name.length < 10 ? (
                            true ? (
                              <span
                                style={{ display: "flex", alignItems: "center" }}
                              >
                                <span>
                                  Hi!{" "}
                                  {ResizeBreadcrumbs_title(
                                    props.getuserdetails.name
                                  )}
                                </span>
                              </span>
                            ) : (
                              <span
                                style={{ display: "flex", alignItems: "center" }}
                              >
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
                      </button>

                      {hover ? (
                        <div className="dropdown-content">
                          {profileComponents.map((data) => (
                            <React.Fragment key={data.key}>
                              <Link href={""} prefetch={false} legacyBehavior>
                                <span
                                  className={styles.options + " pt-3 pb-2 rounded"}
                                  style={hover ? hoverStyle : normalStyle}
                                  onMouseEnter={onMouseEnter}
                                  onMouseLeave={onMouseLeave}
                                  href={""}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onMouseLeave();
                                    if (data.name == "Logout") {
                                      logoutUser();
                                    } else {
                                      if (props.getuserdetails.email != null) {
                                        // Router.push(`${data.page}`); 
                                        router.push(`${data.page}`);
                                      } else {
                                        enqueueSnackbar(
                                          `Please login to view ${data.name}`,
                                          {
                                            variant: "warning",
                                          }
                                        );
                                        router.push(
                                          `/account/Loginpage?ret=${data.page}`
                                        );
                                      }
                                    }
                                  }}
                                  // legacyBehavior
                                  >
                                  <React.Fragment>
                                    {/* {
                                  console.log(data.name,data,"32322")
                               } */}
                                    {data.icon}

                                    {" "}
                                    {data.name}{" "}


                                    {data.key == 3
                                      ? `(${props.Total_wish_count
                                        ? props.Total_wish_count
                                        : 0
                                      })`
                                      : null}
                                  </React.Fragment>
                                </span>
                              </Link>
                            </React.Fragment>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <span
                      className="icon"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (props.getuserdetails.email) {
                          setshowTrackDialog(true);
                          setshowLoginDialog(false);
                        } else {
                          router.push(`?d=track`, undefined, { shallow: true });
                          enqueueSnackbar(
                            "Please login using your registered email id to track your order",
                            {
                              variant: "warning",
                            }
                          );
                          setshowLoginDialog(true);
                        }
                      }}
                    >
                      <LocationOnOutlinedIcon />
                      Track Order
                    </span>
                    <span
                      className="icon"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (props.getuserdetails.email != null) {
                          router.push(`/view-cart`);
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
                        color="warning"
                      >
                        <ShoppingCartOutlinedIcon />
                      </Badge>
                      Cart
                    </span>
                  </div>
                </MediaQuery>
                {/* for mobile */}
                <MediaQuery maxWidth={576}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <InstantSearch
                      indexName={INSTANTSEARCHSCHEMA}
                      searchClient={searchClient}
                    >
                      <DebouncedSearchBox sdraw={sdraw} delay={350} />
        

                      <Configure hitsPerPage={5} />
                      <div style={{ display: "none" }}>
                        <CustomSortBy
                          defaultRefinement={`${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc`}
                          items={[
                            {
                              value: `${INSTANTSEARCHSCHEMA}/sort/iDate:desc`,
                              label: "Newest First",
                            },
                            {
                              value: `${INSTANTSEARCHSCHEMA}/sort/iDate:asc`,
                              label: "Oldest First",
                            },
                            {
                              value: `${INSTANTSEARCHSCHEMA}/sort/price:asc`,
                              label: "Price -- Low to High",
                            },
                            {
                              value: `${INSTANTSEARCHSCHEMA}/sort/price:desc`,
                              label: "Price -- High to Low",
                            },
                          ]}
                        />
                      </div>
                    </InstantSearch>
                  </div>
                  {exactpath == "product" || exactpath == "notebook" ? (
                    <div
                      style={{ marginRight: "0.8rem" }}
                      onClick={() => {
                        window.location.assign("/view-cart");
                      }}
                    >
                      <Badge
                        badgeContent={props.incart_check.length}
                        color="warning"
                      >
                        <ShoppingCartOutlinedIcon style={{ color: "#fff" }} />
                      </Badge>
                    </div>
                  ) : null}
                </MediaQuery>
              </div>
            </div>
          </div>
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
                  <div className="trackdialogLeftDiv">
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
                      <span className="innerspan">
                        Track your orders instantly!
                      </span>
                    </div>
                    <div className="trackImage">
                      <Image src={trackimage} alt="" />
                    </div>
                  </div>
                  <div className="trackdialogRightDiv">
                    <span className="rightHead">Track Order</span>
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
                      <button type="submit" className="trackButton">
                        Track Order
                      </button>
                    </form>
                    <span className="viewmyOrder">
                      View My Orders to Track your Orders
                    </span>
                    {props.getuserdetails.email != null ? (
                      <span
                        className="myordertoview"
                        onClick={() => {
                          router.push("/customer/customer_order");
                          setshowTrackDialog(false);
                        }}
                      >
                        My Orders
                      </span>
                    ) : (
                      <span className="logintoview">*Login to view my orders</span>
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
                  <div className="trackdialogLeftDiv">
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
                      <span className="inneHead">Welcome To MyPustak</span>
                      <span className="innerspan">
                        Login to get access to your Orders, profile, and
                        Recommendations
                      </span>
                    </div>
                    <div className="loginImage">
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
                    <div className="Rightpart col-lg-12 col-md-12">
                      <div className="loginDialogRightDiv">
                        <form
                          className="Login_form"
                          autoComplete="off"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                          onSubmit={handleForgetFormSubmit}
                        >
                          <div
                            className="Login_feild"
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
                              className="change"
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

                        <div className="other_login">
                          <div className="create_acount_text">
                            <div>
                              Are you a registered user?{" "}
                              <span
                                className="text_span"
                                onClick={() => {
                                  setSignuptoggle(false);
                                  setforgetPassword(false);
                                  setloginWithOtp(false);
                                }}
                              >
                                Login
                              </span>
                            </div>
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
                    <div className="loginDialogRightDiv">
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
                        
                              error={EmailErr}
                              size="small"
                              sx={{
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
                                      className="change"
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
                        <button type="submit" className="loginButton">
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

                      router.push(`?`, undefined, { shallow: true });
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
            onOpen={() => { }}
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
      }

      <style jsx>
        {`
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
            margin-bottom: 20px;
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
          .myordertoview {
            font-family: "Roboto";
            font-style: normal;
            font-weight: 300;
            font-size: 10px;
            line-height: 0.75rem;
            margin-top: 2px;
            color: #2248ae;
            cursor: pointer;
          }
          .myordertoview:hover {
            font-weight: 600;
          }
          .logintoview:hover {
            font-weight: 600;
          }
          .offerHead {
            // text-align: center;
            // position: fixed;
            // top: 0;
            // width: 100%;
            font-size: 0.8rem;
            background: #5199e4;
            color: white;
            padding: 0.3rem 2rem;
            z-index: 500;
            display: flex;
            align-items: center;
            justify-content: center;
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
            animation-name: bottomin;
            animation-duration: 2000ms;
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

          .loginButton {
            width: 9.563rem;
            height: 2.188rem;
            border: none;
            color: #fff;
            margin-top: 1.2rem;
            background: linear-gradient(90deg, #2157ad 0%, #6190da 100%);
            border-radius: 2px;
          }
          .trackdialogRightDiv {
            display: flex;
            flex-direction: column;
            // animation-name: in;
            margin-top: 15px;
            margin-left: 35px;
            // animation-duration: 2000ms;
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
            margin: 0 11vw;
          }
          .dropdown-content {
            z-index: 100;
            // border-radius: 6px;
            position: absolute;
            background-color: white;
            min-width: 15rem;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            padding-bottom: 1rem;
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
            // background-color:#2258ae;

            max-width: 100vw;
            min-height: 3.5rem;
            max-height: 3.5rem;
            background: linear-gradient(90deg, #2157ad 0%, #427bd4 100%),
              #ffffff;
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

          @media screen and (max-width: 992px) {
            .endDiv {
              font-size: 0.75rem;
            }
            .mainNavDiv {
              padding: 0 20px;
              grid-template-columns: 1fr 6fr 4fr;
            }

            .midDiv {
              margin: 0 15px;
            }
            .icon {
              padding-right: 5px;
            }
          }
          .offerHead {
            text-align: center;
            font-size: 0.8rem;
            background: #5199e4;
            color: white;
            padding: 0.3rem 1rem;
            top: 0;
            // position: fixed;
            // width: 100%;
            z-index: 500;
            justify-content: center;
          }

          @media screen and (max-width: 768px) {
            .Rightpart {
              border-radius: 20px 20px 0px 0px;
              height: 100%;
            }
            .endDiv {
              font-size: 0.65rem;
              margin-right: 5px;
            }
            .icon {
              padding-right: 5px;
            }
            .mainNavDiv {
              padding: 0 10px;
              grid-template-columns: 1fr 5fr 6fr;
            }

            .midDiv {
              margin: 0 10px;
            }
          }
          @media screen and (max-width: 576px) {
            .mainNavDiv {
              padding: 0 10px;
              grid-template-columns: 1fr 9fr 2fr;
              background: #2258ae;
            }
          }

          // @media screen and (max-width: 500px) {
          //   .midDiv {
          //     display: none;
          //   }
          //   .endDiv {
          //     display: none;
          //   }
          //   .mainNavDiv {
          //     top: 0;
          //     display: flex;
          //     justify-content: center;
          //     padding: 5px 0;
          //   }
          // }
        `}
      </style>
    </React.Fragment>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(LoginSection));

