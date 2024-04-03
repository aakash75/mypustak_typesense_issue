/* eslint-disable */
"use client"
import React, { Component } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { withSnackbar } from "notistack";
import InboxIcon from "@mui/icons-material/Inbox";
import { getOffers } from "../../redux/actions/offerpageAction";
import NextBreadcrumbs from "../../components/Breadcrumbs/NextBreadcrumbs";
import { NoSsr } from "@mui/material";
import { connect } from "react-redux";
import { getSeoData } from "../../redux/actions/seodataAction";
import { Skeleton } from "@mui/material";
import styles from "../../styles/OfferPage.module.css";
class CouponPage extends Component {
  state = {
    open: false,
    OfferData: [],
    initialLoader: true,
    serverError: false,
  };

  createData = (code, discount, condition1, condition2, terms) => {
    return { code, discount, condition1, condition2, terms };
  };
  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

 async componentDidMount() {
    // alert("mount")
    // this.props.getSeoData('/offerpage')
    window.scrollTo(0, 0)

   await this.props.getOffers()
    // .then(()=>{
    //   // alert("done")
    // }).catch((err)=>{
    //   console.log(err,"==========");
    //   // alert("err")
    // })
    // .then(res => {

    //   })
    //   .catch(err => {
    //     this.setState({ initialLoader: false, serverError: true });
    //   });
        this.setState({ initialLoader: false, serverError: false });

  }
  componentDidUpdate(prevProps) {
    // this.props.getOffers();
  }

  copyCodeToClipboard = () => {
    const el = this.textArea;
    el.select();
    document.execCommand("copy");
    this.setState({ open: true });
    this.props.enqueueSnackbar(`Promo Code Copied`, { variant: "success" });
  };

  copyCodeToClipboard2 = () => {
    const el = this.textArea2;
    el.select();
    document.execCommand("copy");
    this.setState({ open: true });
    this.props.enqueueSnackbar(`Promo Code Copied`, { variant: "success" });
  };
  backdropClickHandler = () => {
    this.props.CartopenModal();
  };

  render() {
    console.log(this.props.offerpageReducer[0], "offerReducer");
    const card = [
      this.createData(
        "PNEW20",
        "20%",
        "On Prepaid Order",
        "Valid Only For New User",
        [
          "Only Valid for first time user",
          "Minimum Cart Value should be ₹100",
          "Maximum Cash back is ₹50",
          "Cashback is credited only in MyPustak Wallet",
          "Cashback Will be credited once your order will be shipped",
        ]
      ),
      this.createData(
        "POFF20",
        "30%",
        "On Prepaid Order",
        "Valid Only For New User",
        [
          "Only Valid for first time user",
          "Minimum Cart Value should be ₹100",
          "Maximum Cash back is ₹50",
          "Cashback is credited only in MyPustak Wallet",
          "Cashback Will be credited once your order will be shipped",
        ]
      ),

      this.createData(
        "MYOR20",
        "15%",
        "On COD Order",
        "Valid Only For New User",
        [
          "Only Valid for first time user",
          "Minimum Cart Value should be ₹100",
          "Maximum Cash back is ₹50",
          "Cashback is credited only in MyPustak Wallet",
          "Cashback Will be credited once your order will be shipped",
        ]
      ),
      this.createData(
        "MYOR20",
        "25%",
        "On COD Order",
        "Valid Only For New User",
        [
          "Only Valid for first time user",
          "Minimum Cart Value should be ₹100",
          "Maximum Cash back is ₹50",
          "Cashback is credited only in MyPustak Wallet",
          "Cashback Will be credited once your order will be shipped",
        ]
      ),
    ];
    return (
      // <Layout>
      <div>
        <NoSsr>
          <NextBreadcrumbs />
        </NoSsr>
        <div>
          {/* <Navbarhoc> */}
          <div
            style={{
              height: "100%",
            }}>
            <React.Fragment>
              {this.state.serverError ? (
                <>
                  <div style={{ textAlign: "center", padding: "2rem 0rem" }}>
                    <InboxIcon style={{ fontSize: "5rem" }} />

                    <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                      {" "}
                      Something Went Wrong!
                    </div>
                    <div style={{ fontSize: "0.9rem" }}>
                      {" "}
                      Seems to be network issue, Try Again
                    </div>

                    <div>
                      <Button
                        variant='contained'
                        color='primary'
                        style={{ width: "9rem", margin: "1rem 0rem" }}
                        onClick={this.reload}>
                        {" "}
                        Reload
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{}}>
                  <div className={`${styles.couponT}`}>
                    <Paper
                      style={{
                        alignItems: "center",
                        margin: "1%",
                        padding: "1%",
                      }}>
                      <h2>
                        <p
                          style={{
                            color: "#366ec6",
                            textAlign: "center",
                          }}>
                          Deal, Promos And Sales!
                        </p>
                      </h2>
                      <Divider />
                      <p>
                        When you get books from{" "}
                        <a
                          href='/'
                          title='MyPustak.com'
                          style={{ textDecoration: "none" }}>
                          MyPustak.com
                        </a>
                        , you can save more with these coupon codes! We have an
                        incredible variety of books to choose from. From
                        children's books to college textbooks, we have you
                        covered in whatever you need. So check out our sales and
                        promos below for huge savings!
                      </p>
                    </Paper>
                  </div>
                  <h2>
                    <p className={`${styles.mypustakCoupons}`}>
                      MyPustak Coupons
                    </p>
                  </h2>
                  {this.state.initialLoader ? (
                    <>
                      <div>
                        <center>
                          <Skeleton height={"8.5rem"} width={"20%"} />
                          <Skeleton
                            height={"19rem"}
                            width={"50%"}
                            style={{ marginTop: "-6rem" }}
                          />
                        </center>
                      </div>
                    </>
                  ) : (
                    <div
                      className='row  justify-content-center'
                      style={{ margin: "0px" }}>
                      {this.props.offerpageReducer[0]
                        ? this.props.offerpageReducer[0].map(offer =>
                          offer.is_active == 1 ? (
                            <div
                              className={`${styles.coupon_wrapper}  col-lg-6 col-lg-offset-3`}>
                              <div className={`${styles.couponCode}`}   >
                                {offer.coupon_for == 2 ?
                                  <span style={{ fontWeight: "bold", color: "rgb(36, 77, 162)" }}>Wallet Recharge</span>
                                  : <textarea
                                    ref={textarea2 =>
                                      (this.textArea2 = textarea2)
                                    }
                                    value={offer.coupon_code}
                                    readOnly
                                    rows='1'
                                    cols='10'
                                    className={`${styles.couponTextfield}`}
                                  />}
                                {offer.coupon_for == 2 ? null : <Tooltip
                                  title='copy promocode'
                                  placement='bottom'>
                                  <Button
                                    onClick={() =>
                                      this.copyCodeToClipboard2()
                                    }
                                    style={{}}>
                                    <ContentCopyIcon />
                                  </Button>
                                </Tooltip>}
                              </div>
                              <div className={`${styles.newCoupon_maindiv} `}>
                                <div
                                  className={`${styles.coupon_content} ${styles.main}`}>
                                  <div className={`${styles.offer_title} `}>
                                    {offer.discount_type == 1
                                      ? "Flat ₹"
                                      : null}
                                    {offer.discount_value}
                                    {offer.discount_type == 2
                                      ? "%"
                                      : null}{" "}
                                    {offer.coupon_type == 1 ? "Cashback" : "OFF"}
                                  </div>
                                  <div className='offer_apply'>
                                    {offer.order_type}
                                  </div>
                                  <div className={`${styles.validity} `}>
                                    {" "}
                                    {offer.valid_user}
                                  </div>
                                </div>

                                <div
                                  className={`${styles.coupon_content} ${styles.backward}`}>
                                  Terms & Conditions
                                  <Divider />
                                  {offer.conditions
                                    .split(",")
                                    .map(condition => {
                                      return (
                                        <ul
                                          style={{
                                            marginBottom: 0,
                                            paddingBottom: 0,
                                          }}>
                                          <li
                                            className={`${styles.Termlist} `}>
                                            {condition}
                                          </li>
                                        </ul>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          ) : null
                        )
                        : null}
                    </div>
                  )}
                </div>
              )}
            </React.Fragment>
          </div>

          <style jsx>{``}</style>
        </div>
      </div>
      // </Layout>
    );
  }
}

const mapStateToProps = state => ({
  PopupCart: state.cartReduc.PopupCart,
  SeoData: state.seodata.seodata,
  offerpageReducer: state.offerpageReducer.offers,
  LoginBackdrop: state.accountR.LoginBackdrop,
});
export default connect(mapStateToProps, { getSeoData, getOffers })(
  withSnackbar(CouponPage)
);
