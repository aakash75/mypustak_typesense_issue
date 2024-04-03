import React, { useState } from "react";
// import logo from "../../assets/logo.svg";
import smlogo from "../../assets/mypustak_100_px.svg";
import MediaQuery from "react-responsive";
import Image from "next/legacy/image";
import dynamic from "next/dynamic";
import styles from "../../styles/CheckoutNavbar.module.css"
import { connect } from "react-redux";
import { GetTrackingUrl } from "../../redux/actions/trackingurlaction";
import {
  CheckUserExistance,
  LoginCheck,
  setComponentStatus,
  signupCheck,
} from "../../redux/actions/loginactions";
const SideDrawer = dynamic(() => import("../SideDrawer/SideDrawer"), {
  ssr: false,
});
import { fetch_wishlist_detail_otherpage } from "../../redux/actions/loginactions";
import { useSnackbar } from "notistack";
import { ForgetPassword } from "../../redux/actions/accountAction";
import { withSnackbar } from "notistack";
import { useRouter } from "next/navigation";

function CheckoutNavbar(props) {
  const [value, setvalue] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [urlPath, setUrlPath] = useState();
  const router = useRouter()
  React.useEffect(() => {
    setUrlPath(window.location.pathname);
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("value");
    setvalue(name);
    // let rtl = Router.query.ret;
    let rtl = queryParams.get("ret");
    setqueryString = rtl;
    if (props.userComponentStatus != 2) {
    }
    props.setComponentStatus(1);
  }, []);


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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();



  return (
    <React.Fragment>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
        >
          {props.PopupCart ? <SideDrawer show={props.PopupCart} /> : null}
          <div className={`${styles.mainNavDiv}`}>
            <div
              style={{
                minWidth: "6.625rem",
                maxWidth: "6.625rem",
                marginLeft:"3rem",
                cursor: "pointer",
              }}>
              <MediaQuery minWidth={577}>
                <div
                  className=''
                  style={{
                    margin: "5px 0",
                    cursor: "pointer",
                    // border: "1px solid black",
                    padding: "1px 4px",
                    background: "white",
                    borderRadius: "30px",
                  }}>
                  <Image
                    alt='MyPustak.com'
                    src={smlogo}
                    onClick={() => {
                      window.location.replace("/");
                    }}
                  />
                </div>
              </MediaQuery>
            </div>
            <div className='d-flex justify-content-center'>
              <MediaQuery maxWidth={576}>
                <div
                  className=''
                  style={{
                    margin: "5px 0",
                    minWidth: "6.625rem",
                    maxWidth: "6.625rem",
                    cursor: "pointer",
                    border: "1px solid white",
                    padding: "1px 4px",
                    background: "white",
                    borderRadius: "30px",
                    // border:"1px solid black"
                  }}>
                  <Image
                    alt='MyPustak.com'
                    src={smlogo}
                    onClick={() => {
                      window.location.replace("/");
                    }}
                  />
                </div>
              </MediaQuery>
            </div>
            <div className=''></div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          * {
            padding: 0px;
            margin: 0px;
          }
          input:focus {
            outline: none;
          }
          input::placeholder {
            font-size: 0.8rem;
            padding: 0.5rem;
          }
        `}
      </style>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
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
)(withSnackbar(CheckoutNavbar));
