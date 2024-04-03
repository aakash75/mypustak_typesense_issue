"use client";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "../../styles/OrderThankYou.module.css";
import React, { Component } from "react";
import Script from "next/script";
import Image from "next/legacy/image";
import gift from "../../assets/thankYouTopIcon.svg";
import mypustakcoin from "../../assets/mypustakcoin.png";
import targetIcon from "../../assets/targetIcon.svg";
import { Button, CircularProgress, Skeleton } from "@mui/material";
import delivery_truck from "../../assets/delivery_truck.png";
import order_details from "../../assets/order_details.png";
import OrderedBooks from "../ordered_books/OrderedBooks";
import { Get_Rp_Id } from "../../redux/actions/donationActions";
import ReactGA from "react-ga";
import {
  getShippingAddressInfo_groupno,
  getShippingAddressInfo,
  ResendMail,
} from "../../redux/actions/BackendorderAction";
import {
  orderDetailsById,
  orderDetailsBygrpId,
  ViewOrderDetails,
  ConvertCODtoPrepaid,
  ViewOrderDetails_groupid,
} from "../../redux/actions/orderAction";
import { connect } from "react-redux";
import { showConfettiAction } from "../../redux/actions/walletAction";
import Snackbar from "@mui/material/Snackbar";
import Link from "next/link";
const DeliveryDate = dynamic(() => import("../ordered_books/DeliveryDate"));
import CustomConfetti from "../Confetti/CustomConfetti";
import MediaQuery from "react-responsive";
// import { AddNewUnbxdSearch, UpdateUnbxdSearch } from "../../redux/actions/unboxAction";
export class Thankyous2 extends Component {
  state = {
    showPaymentErr: false,
    showPaymentMsg: "",
    paynowLoader: false,
    order_id: "",
    order_value: "",
    email: "",
    phoneno: "",
    unbxd_payload: [],
    todayDate: new Date(),
  };

  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);
    const order_id = queryParams.get("id");
    let Token = localStorage.getItem("user");
    this.props
      .ViewOrderDetails_groupid(order_id)
      .then((res) => {
        // console.log(res,"unbxd48")
        let res_data = res.data.output;

        console.log(res_data, "unbxd_data");

        let payload = [];
        res_data.forEach((element) => {
          let obj = {
            pid: `${element.book_id}`,
            qty: `${element.qty}`,
            price: `${element.new_price}`,
          };
          payload.push(obj);
        });

        // function fireUnbxdOrder() {
        //   setTimeout(function () {
        //     if (window.Unbxd) {
        //       Unbxd.trackMultiple("order", payload)
        //     } else {
        //       console.log("Unbxd is not defined")
        //     }

        //   }, 1500);
        // }

        // fireUnbxdOrder();
        // if (window.Unbxd && typeof window.Unbxd.track === 'function') {
        //   console.log(payload , "payloadunbxd_data")
        //   window.Unbxd.trackMultiple('order', payload);
        // } else {
        //   console.error('unbxdAnalytics.js is not loaded!');
        // }

        // console.log(payload , "unbxd_payload")
        // this.setState({unbxd_payload:payload})
      })
      .catch((err) => {
        console.log(err);
      });
    this.props.getShippingAddressInfo_groupno(order_id, Token);
    this.props.orderDetailsBygrpId({ orderid: order_id }).then((res) => {
      let userinfo = JSON.parse(localStorage.getItem("user_info"));
      this.setState({
        order_id: order_id,
        order_value: res.amount,
        phoneno: this.props.SelectedAddress.phone_no,
        email: userinfo.email,
      });
      this.props.showConfettiAction();
    });

    sessionStorage.clear();
    localStorage.removeItem("items");
    this.props.ResendMail({ orderid: order_id });
    // this.props.AddNewUnbxdSearch()
    // this.props.UpdateUnbxdSearch()
    let loaclstorage_orderDetails = JSON.parse(
      localStorage.getItem("order_details")
    );

    if (true) {
      localStorage.setItem("UserOrderId", order_id);
      var AllbookName = [];
      var BookData = [];
      var AllrackNo = [];
      var AllThumb = [];
      var AllbookShippingCost = [];
      let booksData = [];

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      today = dd + "/" + mm + "/" + yyyy;
      var AllBooks = "";
      this.props.cartDetails.map((book, index) => {
        AllBooks += `Book Name is ${book.bookName}`;
        AllBooks += `Book Cost is ${book.bookShippingCost}`;
        AllBooks += `Book Rack no is ${book.bookRackNo}.`;

        // AllBooks.push(arrayBook)
        AllbookName.push(`${book.bookName}`);
        AllbookShippingCost.push(book.bookShippingCost);
        AllrackNo.push(book.bookRackNo);
        AllThumb.push(book.bookThumb);
        //  index;
        booksData.push({
          src: `https://d1f2zer3rm8sjv.cloudfront.net/${book.bookThumb}`,
          book_name: `${book.bookName}`,
          book_qty: 1,
          book_price: book.bookShippingCost,
        });
      });
      const Data = {
        orderId: order_id,
        transaction_Id: this.props.cartPriceDetails.transaction_id,
        paymentId: this.props.cartPriceDetails.transaction_id,
        payVia: this.props.cartPriceDetails.paytype,
        orderDate: today,
        thumb: AllThumb.toString(),
        bookName: AllbookName,
        author: "",
        rackNo: AllrackNo,
        price: AllbookShippingCost,
        wallet: this.props.cartPriceDetails.wallet,
        totalPayment: this.props.cartPriceDetails.TotalPayment,
        phoneNo: this.props.SelectedAddress.phone_no,
        pincode: this.props.SelectedAddress.pincode,
        userAddress: this.props.SelectedAddress.address,
        landmark: this.props.SelectedAddress.landmark,
        state: this.props.SelectedAddress.state_name,
        city: this.props.SelectedAddress.city_name,
        recname: this.props.SelectedAddress.rec_name,
        noofbook: this.props.ItemsInCart,
        allBooks: AllBooks,
        booksData: booksData,

        email: `${this.props.UserEmail}`,
      };

      ReactGA.plugin.execute("ec", "setAction", "purchase", {
        id: Data.transaction_Id,
        affiliation: Data.bookName,
        revenue: this.props.cartPriceDetails.TotalPayment,
        payVia: Data.payVia,
      });
      ReactGA.plugin.execute("ec", "send");
      ReactGA.pageview("/confirmation");
      ReactGA.plugin.execute("ec", "clear");

      sessionStorage.clear();
    }

    this.initializeRazorpay();
  }

  initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  render() {
    const { showPaymentErr, showPaymentMsg, paynowLoader } = this.state;

    const handleCodPay = (order) => {
      this.setState({ paynowLoader: true });
      const prepaid_order_amount = (order.amount - 50) * 100;
      const SendDataRzpzy = {
        data: {
          ref_id: order.order_id,
          amount: prepaid_order_amount,
        },
      };
      this.props
        .Get_Rp_Id(SendDataRzpzy)
        .then((res) => {
          this.setState({ paynowLoader: false });
          RazorpayPayment({
            OrderDetails: order,
            rzp_order_amount: prepaid_order_amount,
          });
        })
        .catch((err) => {
          this.setState({ paynowLoader: false, showPaymentErr: true });
          this.setState({
            showPaymentErr: true,
            paymentErrMsg:
              "Order Payment Failure Due To Some Error.Please Contact Mypustak Support.",
            disableCodPay: false,
          });
        });
    };

    const handleSnackBarClose = () => {
      this.setState({ showPaymentErr: false });
    };

    const RazorpayPayment = ({ OrderDetails, rzp_order_amount }) => {
      // ***********************RAZORPAY PART********************************
      const options = {
        // key: "rzp_live_pvrJGzjDkVei3G", //Paste your API key here before clicking on the Pay Button.
        // "key": "rzp_test_jxY6Dww4U2KiSA",
        key: "rzp_live_cNDMU35KKMCp6t", //Paste your API key here before clicking on the Pay Button.

        amount: rzp_order_amount,
        // amount:100,
        name: `Mypustak.com`,
        description: `Converting COD order to prepaid`,
        "Order Id": `${this.props.razorpay_id}`, //Razorpay Order id
        currency: "INR",

        handler: (response) => {
          // console.log({ response });
          const razorpay_payment_id = response.razorpay_payment_id;
          // const razorpay_order_id=response.razorpay_order_id;
          // const razorpay_signature=response.razorpay_signature

          let set_payusing = "razorpay";

          const body = {
            order_id: OrderDetails.order_id,
            payment_id: razorpay_payment_id,
            payment_url: "https://razorpay.com/",
            amount: rzp_order_amount / 100,
            payusing: "razorpay",
            cod_charge: 0,
          };
          this.props
            .ConvertCODtoPrepaid({ body })
            .then((res) => {
              this.setState({
                showPaymentErr: true,
                showPaymentMsg:
                  "Order Payment Successful.It is Converted To Prepaid Order",
                disableCodPay: false,
              });
              // this.props.orderdetails(this.state.page)
              setTimeout(() => window.location.reload(), 3000);
            })
            .catch((err) => {
              this.setState({
                showPaymentErr: true,
                showPaymentMsg:
                  "Order Payment Failure Due To Some Error.Please Contact Mypustak Support.",
                disableCodPay: false,
              });
            });
        },

        modal: {
          ondismiss: () => {
            this.setState({ disableCodPay: false });
          },
        },

        prefill: {
          contact: `${this.props.getuserdetails.phone}`,
          email: `${this.props.UserEmail}`,
        },

        notes: {
          "Order Id": OrderDetails.order_id, // Our Order id
        },
        theme: {
          color: "#1c92d2",
          emi_mode: true,
        },
      };
      let rzp1 = new window.Razorpay(options);
      rzp1.open();
    };
    return (
      <div>
        <CustomConfetti />
        <Head>
          <script
            type="text/javascript"
            src="https://checkout.razorpay.com/v1/checkout.js"
            async
          />

          <meta
            name="og:title"
            property="og:title"
            content="Books Online India, Buy Online Book In India –mypustak.com| Thank you"
          />
          <meta
            name="og:description"
            property="og:description"
            content=" Books Online India, Buy Online Book In India –mypustak.com| Thank you"
          />
        </Head>
        <Script id="google-analytics" strategy="afterInteractive">
          window.dataLayer = window.dataLayer || []; function gtag()
          {window.dataLayer.push({
            order_value: this.state.order_value,
            order_id: this.state.order_id,
            email: this.state.email,
            phoneno: this.state.phoneno,
          })}
          ;
        </Script>

        {/* <Script type="text/javascript"  strategy='afterInteractive'>
          var payload = this.state.unbxd_payload
          if(Unbxd && typeof Unbxd.track === 'function') {
            Unbxd.trackMultiple('order', this.state.unbxd_payload)
          } else {
            console.error('unbxdAnalytics.js is not loaded!')
          }
        </Script> */}
        <div className="m-2 pt-1 ">
          <div
            className={`  ${styles.topMainDiv} row bh-white border border-gray p-0 m-0 bg-white shadow-sm d-flex justify-content-between`}
          >
            <div
              className={` ${styles.TopleftDiv} d-flex py-1  align-items-center`}
            >
              <div className=" px-2 " style={{ marginTop: "-0.7rem" }}>
                <Image width={80} height={80} src={gift} alt="" />
              </div>
              {Object.keys(this.props.OrderDetails).length ? (
                <div className=" ">
                  <h4
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      marginTop: "0.5rem",
                      color: "#2157ad",
                      flexDirection: "column",
                      display: "flex",
                    }}
                    className={`${styles.PlaceOrderTitle}`}
                  >
                    <b
                      style={{ marginBottom: "-0.5rem" }}
                      className={`${styles.orderdiv} d-flex align-items-center`}
                    >
                      Order placed for ₹{" "}
                      {this.props.OrderDetails.amount -
                        this.props.OrderDetails.bookcoins_used}{" "}
                      {this.props.OrderDetails.bookcoins_used ? (
                        <>
                          <span className="ml-2">{"+"} </span>
                          <span>
                            <span className={` ${styles.bookcoinIcon}  ml-2`}>
                              <Image
                                alt="mypustak icon"
                                height={20}
                                width={20}
                                src={mypustakcoin}
                              />
                            </span>{" "}
                            <span>
                              {" "}
                              {this.props.OrderDetails.bookcoins_used} Book
                              Coins{" "}
                            </span>
                          </span>
                        </>
                      ) : null}
                    </b>
                    <br />
                    {this.props.OrderDetails.book_coins_amt ? (
                      <b
                        style={{
                          display: "flex",
                          color: "#333",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Image
                          alt="mypustak icon"
                          height={30}
                          width={30}
                          src={mypustakcoin}
                        />
                        You will earn {this.props.OrderDetails.book_coins_amt}{" "}
                        BookCoins on this order
                      </b>
                    ) : null}
                  </h4>
                  <p
                    className={`${styles.PlaceOrderpara} d-flex text-dark boredr`}
                  >
                    <div>
                      Your {this.props.singleOrderDetailsValue.length}{" "}
                      {this.props.singleOrderDetailsValue.length == 1
                        ? "item"
                        : "items"}{" "}
                      will be &nbsp;{" "}
                    </div>
                    <DeliveryDate
                      pincode={this.props.shippingAddress.pincode}
                      booked_date={parseInt(
                        this.state.todayDate.getTime() / 1000
                      )}
                    />
                  </p>
                </div>
              ) : (
                <div className="d-flex align-items-center ml-4">
                  <Skeleton
                    animation="wave"
                    style={{ height: "5rem", width: "22rem" }}
                  />
                </div>
              )}
            </div>
            <div
              className={` ${styles.TopRightDiv}   d-flex justify-content-center  align-items-center  `}
            >
              {Object.keys(this.props.OrderDetails).length ? (
                <p
                  className={`${styles.esilitrackdiv} d-flex align-items-center`}
                >
                  <div className="d-flex align-items-center">
                    <Image height={25} width={25} src={targetIcon} alt="" />
                    &nbsp;&nbsp;
                    <span className={`${styles.easitruckTitle}`}>
                      Easily track all your MyPustak orders!
                    </span>
                  </div>
                  <Link
                    href={`/customer/customer_order`}
                    as={`/customer/customer_order`}
                    legacyBehavior
                  >
                    <a style={{ marginLeft: "0.5rem" }}>
                      <span
                        className={`${styles.trackorder} btn text-primary  border border-primary ml-2`}
                        variant="outlined"
                        onClick={() => {}}
                        type="submit"
                      >
                        My Orders
                      </span>
                    </a>
                  </Link>
                </p>
              ) : (
                <Skeleton
                  animation="wave"
                  style={{ height: "5rem", width: "18rem" }}
                />
              )}
            </div>
          </div>
          <div
            className="row d-flex justify-content-between  "
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            <div
              className={`${styles.deliveryAddress} col-lg-6  col-md-6 col-sm-6 col-xs-6  pl-md-0 pr-md-2 pr-0 pl-0 pl-sm-0 pr-sm-2 `}
            >
              <div className=" bg-white border border-2 shadow-sm px-md-5 px-lg-5 px-4 h-100">
                <div className="d-flex justify-content-center pt-2">
                  <div className="">
                    <Image
                      height={22}
                      width={25}
                      alt="delivery track"
                      src={delivery_truck}
                    />
                    &nbsp;&nbsp;
                  </div>
                  <p className={`mb-0 ${styles.deliveryTitle}  m-xs-5`}>
                    Delivery Address
                  </p>
                </div>
                <hr className=" mx-auto my-1" />
                {Object.keys(this.props.shippingAddress).length ? (
                  <div>
                    <p className="mb-1">
                      <>{this.props.shippingAddress.rec_name}</>
                    </p>
                    <p className="p mb-1" style={{ fontSize: "0.8rem" }}>
                      {this.props.shippingAddress.address},
                      {this.props.shippingAddress.city},
                      {this.props.shippingAddress.state},
                      {this.props.shippingAddress.pincode}
                    </p>
                    <p className="mb-1">
                      <span>
                        <span style={{ fontSize: "0.9rem" }}>
                          Contact Number :
                        </span>{" "}
                        <span className="p" style={{ fontSize: "0.9rem" }}>
                          {this.props.shippingAddress.phone}
                        </span>
                      </span>
                      <br />
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>
                      <b>
                        <Skeleton
                          animation="wave"
                          style={{
                            height: "3rem",
                            marginBottom: "-1rem",
                            width: "50%",
                          }}
                        />
                      </b>
                    </p>
                    <p className="p" style={{ fontSize: "0.8rem" }}>
                      <Skeleton
                        animation="wave"
                        style={{ marginBottom: "-1rem" }}
                      />
                    </p>
                    <p>
                      <span>
                        <b>
                          <Skeleton
                            animation="wave"
                            style={{ height: "3rem", marginBottom: "-2rem" }}
                          />
                        </b>{" "}
                        <span
                          className="p"
                          style={{ fontSize: "0.9rem" }}
                        ></span>
                      </span>
                      <br />
                      <span className="p" style={{ fontSize: "0.8rem" }}>
                        {" "}
                        <Skeleton animation="wave" />
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6  col-md-6 col-sm-6 col-xs-6 pl-md-2 pr-md-0 pl-0 pr-0  pl-sm-2 pr-sm-0">
              <div className=" border bg-white border-2 shadow-sm px-sm-3 px-4 h-100">
                <div className="d-flex justify-content-center pt-2">
                  <div>
                    <Image
                      alt="details "
                      height={22}
                      width={25}
                      src={order_details}
                    />
                    &nbsp;&nbsp;
                  </div>
                  <p className={`mb-0 ${styles.orderTitle}`}>Order Details</p>
                </div>
                <hr className=" mx-auto my-1" />
                {Object.keys(this.props.OrderDetails).length ? (
                  <div>
                    <div style={{ fontSize: "0.9rem" }}>
                      <span>
                        <>Order ref. : &nbsp;</>
                        <span className="p">
                          {this.props.OrderDetails.order_no}
                        </span>
                      </span>
                      <span className="p">
                        <DeliveryDate
                          pincode={this.props.shippingAddress.pincode}
                          booked_date={parseInt(
                            this.state.todayDate.getTime() / 1000
                          )}
                        />
                      </span>
                      <div
                        className={`${styles.paynowparent} d-flex justify-content-between `}
                      >
                        <div>
                          <span>
                            <>Mode of payment : &nbsp;</>
                            <b className="" style={{ color: "#098041" }}>
                              {this.props.OrderDetails.payusing == "cod"
                                ? "Cash On Delivery"
                                : "Prepaid"}
                            </b>
                            <br />
                          </span>
                          <br />
                        </div>
                        {(this.props.OrderDetails.payusing === "cod" &&
                          this.props.OrderDetails.status == "0") ||
                        (this.props.OrderDetails.payusing === "cod" &&
                          this.props.OrderDetails.status == 0) ? (
                          <div className={`${styles.paynowdiv}`}>
                            <p className={`${styles.paynowContent}`}>
                              Pay Now And Save ₹ 50
                            </p>
                            <MediaQuery minWidth={993}>
                              {paynowLoader ? (
                                <Button
                                  className="px-3"
                                  style={{
                                    backgroundColor: "#098041",
                                    color: "white",
                                    minWidth: "6rem",
                                    height: "2.2rem",
                                  }}
                                >
                                  <CircularProgress
                                    size={18}
                                    style={{ color: "white" }}
                                  />
                                </Button>
                              ) : (
                                <Button
                                  className="px-3"
                                  onClick={() => {
                                    handleCodPay(this.props.OrderDetails);
                                  }}
                                  style={{
                                    backgroundColor: "#098041",
                                    color: "white",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  Pay Now
                                </Button>
                              )}
                            </MediaQuery>
                            <MediaQuery maxWidth={992}>
                              {paynowLoader ? (
                                <Button
                                  className="px-3"
                                  fullWidth
                                  style={{
                                    backgroundColor: "#098041",
                                    color: "white",
                                    minWidth: "6rem",
                                    height: "2.2rem",
                                  }}
                                >
                                  <CircularProgress
                                    size={30}
                                    style={{ color: "white" }}
                                  />
                                </Button>
                              ) : (
                                <Button
                                  className="px-3"
                                  onClick={() => {
                                    handleCodPay(this.props.OrderDetails);
                                  }}
                                  fullWidth
                                  style={{
                                    backgroundColor: "#098041",
                                    color: "white",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  Pay Now
                                </Button>
                              )}
                            </MediaQuery>
                            <p className={`${styles.paynowContent}`}>
                              Convert Cash on Delivery To Prepaid
                            </p>
                          </div>
                        ) : null}
                      </div>
                      <br />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: "0.9rem" }}>
                      <p>
                        <Skeleton
                          animation="wave"
                          style={{ width: "60%", height: "2rem" }}
                        />
                      </p>

                      <div
                        className="d-flex justify-content-between"
                        style={{ marginTop: "-1rem" }}
                      >
                        <Skeleton
                          animation="wave"
                          style={{ width: "43%", height: "4rem" }}
                        />
                        <Skeleton
                          animation="wave"
                          style={{ width: "43%", height: "4rem" }}
                        />
                      </div>
                      <div
                        className="d-flex justify-content-between"
                        style={{ marginTop: "-0.6rem" }}
                      >
                        <Skeleton
                          animation="wave"
                          style={{ width: "40%", height: "1rem" }}
                        />
                        <Skeleton
                          animation="wave"
                          style={{ width: "40%", height: "1rem" }}
                        />
                      </div>
                      <br />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <OrderedBooks
            ordered_books={this.props.singleOrderDetailsValue}
            order_detail={this.props.OrderDetails}
            orderid={this.props.OrderDetails.order_id}
          />

          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={showPaymentErr}
            autoHideDuration={3000}
            message={showPaymentMsg}
            onClose={handleSnackBarClose}
          />
          <style jsx>{``}</style>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cartDetails: state.cartReduc.MyCart,
    userToken: state.accountR.token,
    ItemsInCart: state.cartReduc.cartLength,
    SelectedAddress: state.accountR.selectedAddress,
    CartPrice: state.cartReduc.CartPrice,
    AddresId: state.cartReduc.AddresId,
    TotalPrice: state.cartReduc.TotalPrice,
    OrderId: state.cartReduc.OrderId,
    RAZORPAY: state.donationR.rp_id,
    getadd: state.accountR.getadd,
    PopupCart: state.cartReduc.PopupCart,
    walletbalance: state.walletR.walletbalance,
    UserEmail: state.userdetailsR.getuserdetails.email,
    RzPayErr: state.cartReduc.RzPayErr,
    OutOfStockBooks: state.cartReduc.OutOfStockBooks,
    bookcoins: state.walletR.bookcoins,
    UserId: state.userdetailsR.getuserdetails.id,
    getuserdetails: state.userdetailsR.getuserdetails,
    offerBook: state.cartReduc.offerBook,
    couponR: state.cartReduc.couponR,
    couponResult: state.cartReduc.couponResult,
    couponResponse: state.cartReduc.couponResponse,
    redeemcoupon: state.cartReduc.redeemcoupon,
    appliedcoupon: state.cartReduc.appliedcoupon,
    cartPriceDetails: state.cartReduc.CartPrice,
    Selectedphone_no: state.accountR.selectedAddress.phone_no,
    userComponentStatus: state.accountR.userComponentStatus,
    is_coupon_valid: state.cartReduc.is_coupon_valid,
    MyWishlist: state.cartReduc.MyWishlist,
    wishlist_msg: state.cartReduc.wishlist_msg,
    cashback: state.walletR.cashback,
    shippingAddress: state.orderBR.shippingAddress,
    getorderdetails: state.orderdetailsR.getorderdetails,
    OrderDetails: state.orderdetailsR.OrderDetails,
    singleOrderDetailsValue: state.orderdetailsR.singleOrderDetails,
    razorpay_id: state.donationR.rp_id,
  };
};

export default connect(mapStateToProps, {
  getShippingAddressInfo_groupno,
  getShippingAddressInfo,
  ViewOrderDetails,
  orderDetailsBygrpId,
  Get_Rp_Id,
  ConvertCODtoPrepaid,
  ResendMail,
  // AddNewUnbxdSearch,
  // UpdateUnbxdSearch,
  showConfettiAction,
  ViewOrderDetails_groupid,
})(Thankyous2);
