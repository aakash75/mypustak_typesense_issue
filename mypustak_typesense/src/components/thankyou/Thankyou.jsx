import Image from "next/legacy/image";
import React, { useState } from "react";
import gift from "../../assets/thankYouTopIcon.svg";
import mypustakcoin from "../../assets/mypustakcoin.png";
import targetIcon from "../../assets/targetIcon.svg";
import { Button, CircularProgress, Skeleton } from "@mui/material";
import delivery_truck from "../../assets/delivery_truck.png";
import order_details from "../../assets/order_details.png";
import OrderedBooks from "../ordered_books/OrderedBooks";
import { Get_Rp_Id } from "../../redux/actions/donationActions";
import { getShippingAddressInfo } from "../../redux/actions/BackendorderAction";
import {
  orderDetailsById,
  ViewOrderDetails,
  ConvertCODtoPrepaid,
} from "../../redux/actions/orderAction";
import { connect } from "react-redux";
import { useEffect } from "react";
import Head from "next/head";
import Snackbar from "@mui/material/Snackbar";
import Link from "next/link";
import DeliveryDate from "../ordered_books/DeliveryDate";
import MediaQuery from "react-responsive";

function Thankyou(props) {
  const [showPaymentErr, setshowPaymentErr] = useState(false);
  const [showPaymentMsg, setshowPaymentMsg] = useState("");
  const [paynowLoader, setPaynowLoader] = useState(false);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const order_id = queryParams.get("id");
    let Token = localStorage.getItem("user");
    props.ViewOrderDetails(order_id);
    props.getShippingAddressInfo(order_id, Token);
    props.orderDetailsById({ orderid: order_id });
    initializeRazorpay();
  }, []);

  const initializeRazorpay = () => {
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
  const handleCodPay = (order) => {
    setPaynowLoader(true);
    const prepaid_order_amount = (order.amount - 50) * 100;
    const SendDataRzpzy = {
      data: {
        ref_id: order.order_id,
        amount: prepaid_order_amount,
      },
    };
    props
      .Get_Rp_Id(SendDataRzpzy)
      .then((res) => {
        setPaynowLoader(false);
        RazorpayPayment({
          OrderDetails: order,
          rzp_order_amount: prepaid_order_amount,
        });
      })
      .catch((err) => {
        // alert("err")
        setPaynowLoader(false);
        setshowPaymentErr(true);
        setshowPaymentMsg(
          "Order Payment Failure Due To Some Error.Please Contact Mypustak Support."
        );
      });
  };

  const handleSnackBarClose = () => {
    setshowPaymentErr(false);
  };

  const RazorpayPayment = ({ OrderDetails, rzp_order_amount }) => {
    alert("RazorpayPayment");
    // console.log({ OrderDetails, rzp_order_amount});

    // ***********************RAZORPAY PART********************************
    const options = {
      // key: "rzp_live_pvrJGzjDkVei3G", //Paste your API key here before clicking on the Pay Button.
      // "key": "rzp_test_jxY6Dww4U2KiSA",
      key: "rzp_live_cNDMU35KKMCp6t", //Paste your API key here before clicking on the Pay Button.

      amount: rzp_order_amount,
      name: `Mypustak.com`,
      description: `Converting COD order to prepaid`,
      "Order Id": `${props.razorpay_id}`, //Razorpay Order id
      currency: "INR",

      handler: (response) => {
        const razorpay_payment_id = response.razorpay_payment_id;
        let set_payusing = "razorpay";

        const body = {
          order_id: OrderDetails.order_id,
          payment_id: razorpay_payment_id,
          payment_url: "https://razorpay.com/",
          amount: rzp_order_amount / 100,
          payusing: "razorpay",
          cod_charge: 0,
        };
        props
          .ConvertCODtoPrepaid({ body })
          .then((res) => {
            // alert("")
            setshowPaymentErr(true);
            setshowPaymentMsg(
              "Order Payment Successful.It is Converted To Prepaid Order."
            );
            setTimeout(() => window.location.reload(), 3000);
          })
          .catch((err) => {
            setshowPaymentErr(true);
            setshowPaymentMsg(
              "Order Payment Failure Due To Some Error.Please Contact Mypustak Support."
            );
          });
      },

      modal: {
        ondismiss: () => {},
      },

      prefill: {
        contact: `${props.getuserdetails.phone}`,
        email: `${props.UserEmail}`,
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
    <div className="m-2 pt-1 ">
      <Head>
        <script
          type="text/javascript"
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        />
        <script>
          window.dataLayer = window.dataLayer || []; function gtag()
          {window.dataLayer.push({
            order_value: order_value,
            order_id: this.state.order_id,
            email: this.state.email,
            phoneno: this.state.phoneno,
          })}
          ;
        </script>
      </Head>
      <div className=" topMainDiv row bh-white border border-gray p-0 m-0 bg-white shadow-sm d-flex justify-content-between">
        <div className="TopleftDiv d-flex py-1  align-items-center">
          <div className=" px-2 " style={{ marginTop: "-0.7rem" }}>
            <Image width={80} height={80} src={gift} alt="" />
          </div>
          {Object.keys(props.OrderDetails).length ? (
            <div className=" ">
              <h4 style={{ color: "#2157ad" }} className="PlaceOrderTitle ">
                <b className="orderdiv d-flex  align-items-center">
                  Order placed for ₹{" "}
                  {props.OrderDetails.amount -
                    props.OrderDetails.book_coins_amt}{" "}
                  {props.OrderDetails.book_coins_amt ? (
                    <>
                      <span className="ml-2">{"+"} </span>
                      <span>
                        <span className="bookcoinIcon ml-2">
                          <Image
                            alt="mypustak icon"
                            height={20}
                            width={20}
                            src={mypustakcoin}
                          />
                        </span>{" "}
                        <span>
                          {" "}
                          {props.OrderDetails.book_coins_amt} Book Coins{" "}
                        </span>
                      </span>
                    </>
                  ) : null}
                </b>
              </h4>
              <p
                className="PlaceOrderpara boredr"
                style={{ color: "black", display: "flex" }}
              >
                <div>
                  Your {props.singleOrderDetailsValue.length}{" "}
                  {props.singleOrderDetailsValue.length == 1
                    ? "itemss"
                    : "itemssss"}
                  will be &nbsp;{" "}
                </div>
                <DeliveryDate pincode={props.shippingAddress.pincode} />
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
        <div className="TopRightDiv   d-flex justify-content-center  align-items-center  ">
          {Object.keys(props.OrderDetails).length ? (
            <p className=" esilitrackdiv d-flex align-items-center">
              {/* <MyLocationIcon className='mr-3' /> */}
              <div className="d-flex align-items-center">
                <Image height={25} width={25} src={targetIcon} alt="" />
                &nbsp;&nbsp;
                <span className="easitruckTitle">
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
                    className="trackorder btn text-primary  border border-primary ml-2"
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
        <div className="deliveryAddress col-lg-6  col-md-6 col-sm-6 col-xs-6  pl-md-0 pr-md-2 pr-0 pl-0 pl-sm-0 pr-sm-2 ">
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
              <p className="mb-0 deliveryTitle m-xs-5">Delivery Address</p>
            </div>
            <hr className=" mx-auto my-1" />
            {Object.keys(props.shippingAddress).length ? (
              <div>
                {console.log(Object.keys(props.shippingAddress).length, "LL")}
                <p className="mb-1">
                  <>{props.shippingAddress.rec_name}</>
                </p>
                <p className="p mb-1" style={{ fontSize: "0.8rem" }}>
                  {props.shippingAddress.address},{props.shippingAddress.city},
                  {props.shippingAddress.state},{props.shippingAddress.pincode}
                </p>
                <p className="mb-1">
                  <span>
                    <span style={{ fontSize: "0.9rem" }}>Contact Number :</span>{" "}
                    <span className="p" style={{ fontSize: "0.9rem" }}>
                      {props.shippingAddress.phone}
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
                    <span className="p" style={{ fontSize: "0.9rem" }}></span>
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
              <p className="mb-0 orderTitle">Order Details</p>
            </div>
            <hr className=" mx-auto my-1" />
            {Object.keys(props.OrderDetails).length ? (
              <div>
                <div style={{ fontSize: "0.9rem" }}>
                  <span>
                    <>Order ID : &nbsp;</>
                    <span className="p">{props.OrderDetails.order_id}</span>
                  </span>
                  <span className="p">
                    <DeliveryDate pincode={props.shippingAddress.pincode} />
                  </span>
                  <div className="paynowparent d-flex justify-content-between ">
                    <div>
                      <span>
                        <>Mode of payment : &nbsp;</>
                        <b className="" style={{ color: "#098041" }}>
                          {props.OrderDetails.payusing == "cod"
                            ? "Cash On Delivery"
                            : "Prepaid"}
                        </b>
                        <br />
                      </span>
                      <br />
                    </div>
                    {(props.OrderDetails.payusing === "cod" &&
                      props.OrderDetails.status == "0") ||
                    (props.OrderDetails.payusing === "cod" &&
                      props.OrderDetails.status == 0) ? (
                      <div className="paynowdiv">
                        <p className="paynowContent">Pay Now And Save ₹ 50</p>
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
                                handleCodPay(props.OrderDetails);
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
                                handleCodPay(props.OrderDetails);
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
                        <p className="paynowContent">
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
        ordered_books={props.singleOrderDetailsValue}
        order_detail={props.OrderDetails}
        orderid={props.OrderDetails.order_id}
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
      <style jsx>
        {`
          .paynowContent {
            color: green;
            margin-bottom: 0px;
            font-size: 0.65rem;
          }
          .paynowdiv {
            margin-top: -1rem;
            display: flex;
            justify-content: end;
            flex-direction: column;
            align-items: flex-end;
            // border:2px solid red;
          }
          .bookcoinIcon {
            // border:1px solid red
          }
          .deliveryTitle {
            font-style: normal;
            font-weight: 600;
            font-size: 0.9rem;
            line-height: 1rem;
            color: #2258ae;
          }
          .orderTitle {
            font-style: normal;
            font-weight: 600;
            font-size: 0.9rem;
            line-height: 1rem;
            color: #2258ae;
          }
          .PlaceOrderpara {
            font-size: 0.9rem;
          }
          .PlaceOrderTitle {
            font-style: normal;
            font-weight: 500;
            font-size: 1rem;
            line-height: 1.1rem;
            color: #000000;
            display: flex;
          }
          .easitruckTitle {
            font-style: normal;
            font-weight: 400;
            font-size: 0.9rem;
            line-height: 1rem;
            color: #000000;
          }
          .TopleftDiv {
            width: 60%;
            align-items: center;
          }
          .TopRightDiv {
            width: 40%;
          }
          @media only screen and (max-width: 850px) {
            .topMainDiv {
              flex-direction: column;
            }
            .TopleftDiv {
              width: 100%;
              justify-content: center;
            }
            .TopRightDiv {
              width: 100%;
            }
          }
          @media only screen and (max-width: 1120px) {
            .esilitrackdiv {
              flex-direction: column;
            }
          }
          @media only screen and (max-width: 575px) {
            .deliveryAddress {
              margin-bottom: 1.2rem;
            }
          }
          @media only screen and (max-width: 470px) {
            .PlaceOrderpara {
              flex-direction: column;
              font-size: 0.8rem;
            }
            .orderdiv {
              flex-direction: column;
              // margin-bottom: 2rem;
            }
            .TopleftDiv {
              align-items: start;
            }
          }
          @media only screen and (max-width: 1120px) and (min-width: 850px) {
            .trackorder {
              width: 15rem;
            }
          }
          @media only screen and (max-width: 992px) {
            .paynowparent {
              flex-direction: column;
            }
            .paynowdiv {
              align-items: center;
            }
          }
        `}
      </style>
    </div>
  );
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
    // userDetails: state.userdetailsR.getuserdetails,
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

const mapDispatchToProps = (dispatch) => {
  return {
    getShippingAddressInfo: (orderid, token) =>
      dispatch(getShippingAddressInfo(orderid, token)),
    ViewOrderDetails: (orderid) => dispatch(ViewOrderDetails(orderid)),
    orderDetailsById: (orderid) => dispatch(orderDetailsById(orderid)),
    Get_Rp_Id: (SendDataRzpzy) => dispatch(Get_Rp_Id(SendDataRzpzy)),
    ConvertCODtoPrepaid: (body) => dispatch(ConvertCODtoPrepaid(body)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thankyou);
