"use client"
import Dialog from "@mui/material/Dialog";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const Address = dynamic(() => import("../../../components/manage_address/Address"));
const AddUserAddress = dynamic(() => import("../../../components/manage_address/AddNewAddress"));
const Myprofile = dynamic(() => import("../../../components/profile/Myprofile"));
import { IconButton, NoSsr } from "@mui/material";
import NextBreadcrumbs from "../../../components/Breadcrumbs/NextBreadcrumbs";
import CloseIcon from "@mui/icons-material/Close";
import { connect } from "react-redux";
import { fetchUserAddress } from "../../../redux/actions/manageAddressAction";
function Page(props) {
  const [serverError, setServererror] = useState();
  const [InitialLoader, setInitialLoader] = useState(true);
  useEffect(  () => {
    const token = localStorage.getItem("user_info");
    if (!token) {
      let BackUrl = "customer/manage_address";
      window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
    } else {
      fetchApiFun();
    }
    console.log(props.getadd, "address");
  }, []);
  const  fetchApiFun = async () => {
   await props
      .fetchUserAddress()
      // .then(res => {
      //   setInitialLoader(false);
      // })
      // .catch(err => {
      //   setServererror(true);
      //   setInitialLoader(false);
      // });
      setInitialLoader(false);

  };
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <NoSsr>
        <NextBreadcrumbs />
      </NoSsr>
      <div className='mx-0 mx-lg-2 row mt-0'>
        <div className='d-none d-sm-block col-sm-4 col-lg-3 mt-3'>
          <Myprofile />
        </div>
        <div className='col-12 col-sm-8 col-lg-9'>
          {/* ***************** Calling Address Page ********************* */}
          <Address
            serverError={serverError}
            InitialLoader={InitialLoader}
            setShowDialog={setShowDialog}
            getadd={props.getadd}
          />
        </div>
        {/* ************* Form Add Address Opening ***************** */}
        <div>
          <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
            <IconButton
              aria-label='close'
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: theme => theme.palette.grey[500],
              }}
              style={{ outline: "none" }}>
              <CloseIcon
                color='#000'
                style={{ color: "#000", zIndex: 100 }}
                onClick={() => {
                  setShowDialog(false);
                }}
              />
            </IconButton>
            <AddUserAddress
              isSAddNewDialog={setShowDialog}
              afterAddingAddress={props.fetchUserAddress}
            />
          </Dialog>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = state => {
  return {
    getuserdetails: state.loginReducer.getuserdetails,
    userComponentStatus: state.loginReducer.userComponentStatus,
    SuggestionData: state.productsuggestionreducer.SuggestionData,
    PopupCart: state.cartReduc.PopupCart,
    userToken: state.accountR.token,
    getadd: state.accountR.getadd,
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
    fetchUserAddress: () => dispatch(fetchUserAddress()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Page);