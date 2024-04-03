import React, { Component } from "react";
import dynamic from "next/dynamic";
import styles from "../../styles/CustomarOrder.module.css";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import MediaQuery from "react-responsive";

import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InboxIcon from "@mui/icons-material/Inbox";
import Snackbar from "@mui/material/Snackbar";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
// const ColapsibleOrders = dynamic(() => import("./ColapsibleOrders"));
const ColapsibleOrders = dynamic(() => import("./ColapsibleOrdersNew"));

import {
  updateCustomerOrder,
  orderdetails,
  orderdetailslength,
  CancelOrder,
  ViewOrderDetails,
  ConvertCODtoPrepaid,
  orderdetailsbystatus,
} from "../../redux/actions/orderAction";
import { Get_Rp_Id } from "../../redux/actions/donationActions";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { CircularProgress, IconButton, SwipeableDrawer } from "@mui/material";
import ReactGA from "react-ga";
import Link from "next/link";
import Head from "next/head";
import { NoSsr, Skeleton } from "@mui/material";
import { withSnackbar } from "notistack";
import NextBreadcrumbs from "../Breadcrumbs/NextBreadcrumbs";
const statuses = [
  {
    value: 0,
    label: "Processing",
    color: "#0070e7",
    background: "#ddebf9",
  },
  { value: 10, label: "In Transit", color: "grey", background: "#e5dede" },
  { value: 1, label: "Complete", color: "green", background: "#dcf9db" },
  { value: 3, label: "Refunded", color: "#640909", background: "#f5d4d4" },
];

const times = ["Last 30 days", "2022", "2021", "2020"];
class Order extends Component {
  state = {
    CancelprepaidmsgPopup: false,
    CancelprepaidOrderPopup: false,
    error_page: false,
    loadmore: false,
    userexist: false,
    name: "",
    email: "",
    phone: "",
    title: "",
    amount: "",
    order_no: "",
    no_of_book: "",
    book_thumb: "",
    book_price: "",
    i_date: "",
    status: "",
    orderopen: false,
    SelectedBook: [],
    count: 1,
    SelectedOrder: "",
    Token: "",
    page: 1,
    RelodPage: false,
    SelectedPageNo: 1,
    CancelOrderPopup: false,
    Cartloader: true,
    ConvertAmtResult: this.props.convertAmt,
    cancelOrderId: 0,
    ConvOrderPopup: false,
    OpenProceedPayBtn: false,
    ConvCost: 0,
    Convcount: 1,
    ConvOrderId: 0,
    ConvertBtnLoader: true,
    Order_track_popup: false,
    Order_track_popup_status: "",
    gloabalLoader: true,
    isDataAvailble: false,
    dataCommingLoader: true,
    disableCodPay: false,
    clickedId: "",
    cancelPrepaidLoader: false,
    cancelCodLoader: false,
    ActiveOrderLoader: false,
    clickIndexid: "",
    activeorderDialog: false,
    statusFilter: [],
    timeFilter: [],
    FilterValue: [],
    showFilterDialog: false,
  };
  loadmore_order = async () => {
    this.setState({ loadmore: true });
    let newpage = this.state.page + 1;
    let res = await this.props.orderdetails(newpage);
    if (res) {
      this.setState({ page: newpage, loadmore: false });
    }
  };
  orderopenModal = (Order_id) => {
    const details = `Token ${this.props.userToken}`;
    this.props.ViewOrderDetails(details, Order_id);
    this.setState({ orderopen: true });
  };
  ordercloseModal = () => {
    this.setState({ orderopen: false });
  };

  renderRedirect1(e) {
    window.location.href = "/orders";
  }

  componentDidMount() {
    const token = localStorage.getItem("user_info");
    if (!token) {
      let BackUrl = "/customer/customer_order";
      window.location.replace(`/account/Loginpage?ret=${BackUrl}`);
    }

    ReactGA.pageview(window.location.pathname + window.location.search);

    window.scrollTo(0, 0);
    this.setState({ count: 1 });
    this.setState({ CancelOrderPopup: false, cancelOrderId: 0 });
    this.props
      .orderdetailslength()
      .then((res) => {
        this.setState({ isDataAvailble: res.length ? true : false });
        this.setState({ gloabalLoader: false });

        if (res.length) {
          this.props
            .orderdetails(this.state.page)
            .then((ress) => {
              this.setState({ dataCommingLoader: false });
            })
            .catch((errr) => {
              this.setState({ error_page: true });
            });
        }
      })
      .catch((err) => {
        this.setState({
          error_page: true,
          gloabalLoader: false,
          isDataAvailble: false,
        });
      });
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
  componentDidUpdate(prevProps, prevState) {
    if (this.props.userComponentStatus !== prevProps.userComponentStatus) {
      if (this.props.userComponentStatus == 1) {
        let BackUrl = "customer/customer_order";
        window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
      } else if (this.props.userComponentStatus == 2) {
      }
    }
    if (this.state.FilterValue !== prevState.FilterValue) {
      console.log(this.state.FilterValue, "FIlterValue");
      let body = {
        FilterStatus: this.state.FilterValue,
      };
      this.props
        .orderdetails(this.state.page, null, body)
        .then((ress) => {
          this.setState({ dataCommingLoader: false });
        })
        .catch((errr) => {
          this.setState({ error_page: true });
        });
    }
  }

  closeModal = () => this.setState({ Order_track_popup: false });

  closeDialog = () => {
    this.setState({ CancelOrderPopup: false, CancelprepaidOrderPopup: false });
  };
  CancelOrder = (orderid, indexId) => {
    this.setState({
      CancelOrderPopup: true,
      clickedId: orderid,
      clickIndexid: indexId,
    });
    this.setState({ cancelOrderId: orderid });
  };

  CancelprepaidOrder = (orderid, indexID) => {
    this.setState({
      CancelprepaidOrderPopup: true,
      clickedId: orderid,
      clickIndexid: indexID,
    });
    this.setState({ cancelOrderId: orderid });
  };

  reprocess_order = (order_id, indexID, closeActiveDialog) => {
    this.setState({ ActiveOrderLoader: true, clickIndexid: indexID });
    const Data = {
      order_id: order_id,
      status: 0,
    };
    // const token = `Token ${this.props.userToken}`
    let newPage = parseInt(indexID / 10) + 1;
    this.props
      .updateCustomerOrder(Data, "")
      .then((res) => {
        this.props
          .orderdetails(newPage, indexID)
          .then((ress) => {
            this.setState({
              ActiveOrderLoader: false,
              activeorderDialog: false,
            });
            this.props.enqueueSnackbar("Order Confirmed succesfully.", {
              variant: "Success",
            });
          })
          .catch((errr) => {
            this.setState({ ActiveOrderLoader: false });
          });
      })
      .catch((err) => {
        this.setState({ ActiveOrderLoader: false, activeorderDialog: false });
      });
  };
  handleCodPay = (order) => {
    this.setState({ disableCodPay: true, clickedId: order.order_id });
    const prepaid_order_amount = (order.amount - 50) * 100;
    const SendDataRzpzy = {
      data: {
        ref_id: order.order_id,
        amount: prepaid_order_amount,
      },
    };

    console.log(SendDataRzpzy, "SendDataRzpzy");
    this.props
      .Get_Rp_Id(SendDataRzpzy)
      .then((res) => {
        // console.log({ res });

        this.RazorpayPayment({
          OrderDetails: order,
          rzp_order_amount: prepaid_order_amount,
        });
      })
      .catch((err) => {
        this.setState({
          showPaymentErr: true,
          paymentErrMsg:
            "Order Payment Failure Due To Some Error.Please Contact Mypustak Support.",
          disableCodPay: false,
        });
      });
  };

  handleSnackBarClose = () => {
    this.setState({ showPaymentErr: false });
  };

  RazorpayPayment = ({ OrderDetails, rzp_order_amount }) => {
    // console.log({ OrderDetails, rzp_order_amount});

    // ***********************RAZORPAY PART********************************
    const options = {
      // key: "rzp_live_pvrJGzjDkVei3G", //Paste your API key here before clicking on the Pay Button.
      // "key": "rzp_test_jxY6Dww4U2KiSA",
      key: "rzp_live_cNDMU35KKMCp6t", //Paste your API key here before clicking on the Pay Button.
      amount: rzp_order_amount,
      name: `Mypustak.com`,
      description: `Converting COD order to prepaid`,
      "Order Id": `${this.props.razorpay_id}`, //Razorpay Order id
      currency: "INR",

      handler: (response) => {
        // console.log({ response });
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

        this.props
          .ConvertCODtoPrepaid({ body })
          .then((res) => {
            this.setState({
              showPaymentErr: true,
              paymentErrMsg:
                "Order Payment Successful.It is Converted To Prepaid Order",
              disableCodPay: false,
            });
            // this.props.orderdetails(this.state.page)
            setTimeout(() => window.location.reload(), 3000);
          })
          .catch((err) => {
            this.setState({
              showPaymentErr: true,
              paymentErrMsg:
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

    this.rzp1 = new window.Razorpay(options);
    this.rzp1.open();
  };
  ConfirmCancelOrder = () => {
    this.setState({ cancelCodLoader: true });
    const Data = {
      data: {
        order_id: this.state.cancelOrderId,
      },
    };
    // const token = `Token ${this.props.userToken}`
    let newPage = parseInt(this.state.clickIndexid / 10) + 1;
    // alert(token)
    this.props
      .CancelOrder(Data)
      .then((res) => {
        this.props
          .orderdetails(newPage, this.state.clickIndexid)
          .then((ress) => {
            this.setState({ cancelCodLoader: false, CancelOrderPopup: false });
            this.props.enqueueSnackbar("Order Cancelled Successfully.", {
              variant: "Success",
            });
          })
          .catch((errr) => {});
      })
      .catch((err) => {
        this.setState({
          CancelOrderPopup: false,
          showPaymentErr: true,
          cancelCodLoader: false,
          paymentErrMsg:
            "Your Order was not cancelled.Please contact Mypustak support",
        });
      });
  };

  ConfirmCancelPrepaidOrder = () => {
    this.setState({ cancelPrepaidLoader: true });
    const Data = {
      order_id: this.state.cancelOrderId,
      status: 16,
    };
    // const token = `Token ${this.props.userToken}`
    this.props
      .updateCustomerOrder(Data)
      .then((res) => {
        let newPage = parseInt(this.state.clickIndexid / 10) + 1;
        this.props
          .orderdetails(newPage, this.state.clickIndexid)
          .then((ress) => {
            this.setState({
              CancelprepaidOrderPopup: false,
              CancelprepaidmsgPopup: true,
              cancelPrepaidLoader: false,
            });
          })
          .catch((errr) => {
            this.setState({
              CancelprepaidOrderPopup: false,
              CancelprepaidmsgPopup: true,
              cancelPrepaidLoader: false,
            });
          });
      })
      .catch((err) => {
        this.setState({
          CancelprepaidOrderPopup: false,
          showPaymentErr: true,
          cancelPrepaidLoader: false,
          paymentErrMsg:
            "Your Order was not cancelled.Please contact Mypustak support",
        });
      });
  };
  reload = () => {
    window.location.reload();
  };
  Re_process_orderDialog = (orderid, index) => {
    this.setState({
      activeorderDialog: true,
      clickedId: orderid,
      clickIndexid: index,
    });
  };
  closeActiveDialog = () => {
    this.setState({ activeorderDialog: false });
  };
  addstatusFilter = (filter) => {
    let tempStatus = this.state.statusFilter;
    if (!tempStatus.includes(filter)) {
      tempStatus.push(filter);
    }
    this.setState({
      statusFilter: tempStatus,
    });
  };

  addFilterValue = (filter) => {
    this.setState({
      dataCommingLoader: true,
    });
    let tempStatus = this.state.FilterValue;
    if (!tempStatus.includes(filter)) {
      tempStatus.push(filter);
    }
    let body = {
      FilterStatus: tempStatus,
    };

    this.props
      .orderdetailsbystatus(this.state.page, null, body)
      .then((ress) => {
        this.setState({ isDataAvailble: ress.length ? true : false });
        this.setState({ dataCommingLoader: false });
      })
      .catch((errr) => {
        this.setState({ error_page: true });
      });
    this.setState({
      FilterValue: tempStatus,
    });
  };

  removeStatusFilter = (filter) => {
    let tempStatus = this.state.statusFilter;
    let index = tempStatus.indexOf(filter);
    tempStatus.splice(index, 1);
    this.setState({
      statusFilter: tempStatus,
    });
  };
  addtimeFilter = (filter) => {
    let tempStatus = this.state.timeFilter;
    tempStatus.push(filter);
    this.setState({
      timeFilter: tempStatus,
    });
  };
  removetimeFilter = (filter) => {
    let tempStatus = this.state.timeFilter;
    let index = tempStatus.indexOf(filter);
    tempStatus.splice(index, 1);
    this.setState({
      timeFilter: tempStatus,
    });
  };
  removeFilterValue = (filter) => {
    this.setState({
      dataCommingLoader: true,
    });
    let tempStatus = this.state.FilterValue;
    let index = tempStatus.indexOf(filter);
    tempStatus.splice(index, 1);
    let body = {
      FilterStatus: tempStatus,
    };
    if (tempStatus.length == 0) {
      this.props
        .orderdetails(this.state.page)
        .then((ress) => {
          this.setState({ isDataAvailble: ress.length ? true : false });
          this.setState({ dataCommingLoader: false });
        })
        .catch((errr) => {
          this.setState({ error_page: true });
        });
    } else {
      this.props
        .orderdetailsbystatus(this.state.page, null, body)
        .then((ress) => {
          this.setState({ isDataAvailble: ress.length ? true : false });
          this.setState({ dataCommingLoader: false });
        })
        .catch((errr) => {
          this.setState({ error_page: true });
        });
    }
    this.setState({
      FilterValue: tempStatus,
    });
  };
  render() {
    const { getorderdetails, LoadingUserOrder, NomoreUserOrderData } =
      this.props;
    const { disableCodPay, showPaymentErr, paymentErrMsg } = this.state;
    var SelectedBook = [];
    if (this.props.RAZORPAY !== 0 && this.state.Convcount == 1) {
      this.setState({ Cartloader: false, Convcount: 2 });
    }

    // ORDER STATUS :: 0- processing, 1- complete, 2- cancel, 3- refund, 4- fail, 5- shipping, 6- shippment booked, 7- ready to ship
    return (
      <div>
        <Head>
          <script
            type="text/javascript"
            src="https://checkout.razorpay.com/v1/checkout.js"
            async
          />
        </Head>
        <NoSsr>
          <NextBreadcrumbs />
        </NoSsr>
        {this.state.gloabalLoader ? (
          <div className={`${styles.u_o_loader}`}>
            <CircularProgress
              color="primary"
              size={60}
              style={{ marginTop: "10rem" }}
            />
          </div>
        ) : this.state.error_page ? (
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
                variant="contained"
                color="primary"
                style={{ width: "9rem", margin: "1rem 0rem" }}
                onClick={this.reload}
              >
                {" "}
                Reload
              </Button>
            </div>
          </div>
        ) : (
          <div className={`${styles.maindiv_order}`}>
            <MediaQuery minWidth={577}>
              <div className={styles.filterDiv}>
                <h5
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    fontSize: "1.1rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <FilterAltIcon />
                  Filters
                </h5>
                <div>
                  {this.state.statusFilter.map((status, index) => (
                    <div key={index} className={styles.appliedFilterDiv}>
                      <span className={styles.appliedFilter}>
                        <CloseIcon
                          onClick={() => {
                            this.removeStatusFilter(status);
                            let statusVlaue = statuses.filter((s) => {
                              return s.label == status;
                            });
                            console.log(statusVlaue, "statusVlaue");
                            this.removeFilterValue(statusVlaue[0].value);
                          }}
                          style={{ fontSize: "1rem" }}
                        />{" "}
                        {status}
                      </span>
                    </div>
                  ))}
                  {this.state.timeFilter.map((status, index) => (
                    <div key={index} className={styles.appliedFilterDiv}>
                      <span className={styles.appliedFilter}>
                        <CloseIcon
                          onClick={() => {
                            this.removetimeFilter(status);
                          }}
                          style={{ fontSize: "1rem" }}
                        />{" "}
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <span className={styles.Filterhead}>Order Status</span>
                  <div className={styles.FilterOptions}>
                    {statuses.map((s, index) => (
                      <div key={index} className={styles.FiltereachDiv}>
                        <input
                          type="checkbox"
                          checked={this.state.statusFilter.includes(s.label)}
                          onChange={() => {
                            if (this.state.FilterValue.includes(s.value)) {
                              this.removeStatusFilter(s.label);
                              this.removeFilterValue(s.value);
                            } else {
                              this.addstatusFilter(s.label);
                              this.addFilterValue(s.value);
                            }
                          }}
                        />
                        <span
                          style={{
                            fontWeight: this.state.statusFilter.includes(
                              s.label
                            )
                              ? "bold"
                              : null,
                          }}
                          className={styles.Filtereach}
                        >
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* <div>
                            <span className={styles.Filterhead}>Order Time</span>
                            <div className={styles.FilterOptions}>
                            {times.map(s => (
                              <div className={styles.FiltereachDiv}>
                              <input type="checkbox"
                              checked={this.state.timeFilter.includes(s)}
                              onChange={() => {
                                this.addtimeFilter(s)
                              }}
                              /><span className={styles.Filtereach}>{s}</span>
                              </div>
                              ))}
                            </div>
                          </div> */}
              </div>
            </MediaQuery>
            <MediaQuery maxWidth={576}>
              <div
                className="shadow"
                style={{
                  backgroundColor: "#fff",
                  position: "fixed",
                  bottom: 75,
                  padding: "0.5rem",
                  right: 10,
                  zIndex: 5,
                  borderRadius: "50px",
                }}
              >
                <IconButton
                  onClick={() => {
                    this.setState({
                      showFilterDialog: true,
                    });
                  }}
                >
                  <FilterAltIcon style={{ color: "#000" }} />
                </IconButton>
              </div>
            </MediaQuery>
            <div style={{ flex: 10 }}>
              {this.state.isDataAvailble ? (
                <div>
                  {!this.state.dataCommingLoader ? (
                    getorderdetails.length ? (
                      <div className={`${styles.order_div}`}>
                        <div style={{ flex: 10 }}>
                          {/* <div className={`${styles.inputDiv}`}>
                          <input placeholder="Search yor orders here" className={styles.OrderSearch}/>
                        </div> */}
                          {getorderdetails.map((order, index) => {
                            return (
                              <div key={index}>
                                <ColapsibleOrders
                                  data={order}
                                  indexID={index}
                                  handleCodPay={this.handleCodPay}
                                  CancelOrder={this.CancelOrder}
                                  CancelprepaidOrder={this.CancelprepaidOrder}
                                  disableCodPay={this.state.disableCodPay}
                                  Re_process_order={this.reprocess_order}
                                  ActiveOrderLoader={
                                    this.state.ActiveOrderLoader
                                  }
                                  clickedId={this.state.clickedId}
                                  Re_process_orderDialog={
                                    this.Re_process_orderDialog
                                  }
                                  closeActiveDialog={this.closeActiveDialog}
                                  activeorderDialog={
                                    this.state.activeorderDialog
                                  }
                                />
                              </div>
                            );
                          })}
                          <div style={{ margin: "1%", textAlign: "center" }}>
                            {NomoreUserOrderData ? null : (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={this.loadmore_order}
                                style={{
                                  textAlign: "center",
                                  outline: "none",
                                  width: "8rem",
                                  marginBottom: "2.5rem",
                                }}
                              >
                                {this.state.loadmore ? (
                                  <CircularProgress
                                    style={{ color: "white" }}
                                    size="1.6rem"
                                  />
                                ) : (
                                  `Load More`
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={`${styles.order_div}`}>
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          height={"7rem"}
                          style={{ margin: "1rem" }}
                        />
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          height={"7rem"}
                          style={{ margin: "1rem" }}
                        />
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          height={"7rem"}
                          style={{ margin: "1rem" }}
                        />
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          height={"7rem"}
                          style={{ margin: "1rem" }}
                        />
                      </div>
                    )
                  ) : (
                    <div className={`${styles.order_div}`}>
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={"7rem"}
                        style={{ margin: "1rem" }}
                      />
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={"7rem"}
                        style={{ margin: "1rem" }}
                      />
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={"7rem"}
                        style={{ margin: "1rem" }}
                      />
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={"7rem"}
                        style={{ margin: "1rem" }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem 0rem" }}>
                  <InboxIcon style={{ fontSize: "5rem" }} />

                  <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                    {" "}
                    You Have No Order
                  </div>

                  <div>
                    <Link href="/" legacyBehavior>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ width: "9rem", margin: "1rem 0rem" }}
                      >
                        {" "}
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <Dialog
          open={this.state.CancelOrderPopup}
          onClose={this.closeDialog}
          aria-labelledby="form-dialog-title"
          size="sm"
        >
          <DialogTitle id="form-dialog-title">
            <p style={{ fontSize: "0.9rem" }}>
              {"Are you sure? you want to cancel this order."}
            </p>
            <p style={{ fontSize: "1rem" }}>
              You can contact us on call/whatsapp hepline @ 033-41804333 for any
              query related to this order{" "}
            </p>
          </DialogTitle>
          <DialogContent>
            <div
              id="dialogmsg"
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "0% 2%",
              }}
            >
              <Button
                style={{ textTransform: "capitalize" }}
                variant="outlined"
                color="primary"
                onClick={() => this.closeDialog()}
              >
                No,I want this order
              </Button>
              {this.state.cancelCodLoader ? (
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={() => this.ConfirmCancelPrepaidOrder()}
                  style={{ marginLeft: "2%", minWidth: "11rem" }}
                >
                  <CircularProgress size={25} style={{ color: "white" }} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.ConfirmCancelOrder()}
                  style={{ marginLeft: "2%", textTransform: "capitalize" }}
                >
                  Yes, cancel this order
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Prepaid cancil */}
        <Dialog
          // open={true}
          open={this.state.CancelprepaidOrderPopup}
          onClose={this.closeDialog}
          aria-labelledby="form-dialog-title"
          size="sm"
        >
          <DialogTitle id="form-dialog-title">
            <p style={{ fontSize: "0.9rem" }}>
              {"Are you sure? you want to cancel this order."}
            </p>
            <p style={{ fontSize: "1rem" }}>
              You can contact us on call/whatsapp hepline @ 033-41804333 for any
              query related to this order{" "}
            </p>
          </DialogTitle>
          <DialogContent>
            <div
              id="dialogmsg"
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "0% 2%",
                textTransform: "capitalize",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                style={{ textTransform: "capitalize" }}
                onClick={() => this.closeDialog()}
              >
                No,I want this order
              </Button>
              {this.state.cancelPrepaidLoader ? (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "2%", minWidth: "11rem" }}
                >
                  <CircularProgress size={25} style={{ color: "white" }} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.ConfirmCancelPrepaidOrder()}
                  style={{ marginLeft: "2%", textTransform: "capitalize" }}
                >
                  Yes, cancel this order
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
        {/* prepaid cancel Massage */}
        <Dialog
          open={this.state.CancelprepaidmsgPopup}
          onClose={() => this.setState({ CancelprepaidmsgPopup: false })}
          aria-labelledby="form-dialog-title"
          size="sm"
        >
          <DialogTitle id="form-dialog-title">
            <p style={{ fontSize: "0.9rem" }}>
              We received your cancellation request
            </p>
            <p style={{ fontSize: "1rem", textTransform: "capitalize" }}>
              Our support team will contact you within 48 working hours to
              confirm your order cancellation and raising refund as needed .
            </p>
          </DialogTitle>
          <DialogContent>
            <div
              id="dialogmsg"
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "0% 2%",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.setState({ CancelprepaidmsgPopup: false })}
                style={{ marginLeft: "2%" }}
              >
                ok
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        {/* Active Order */}
        <Dialog
          // open={true}
          open={this.state.activeorderDialog}
          onClose={() => this.setState({ activeorderDialog: false })}
          aria-labelledby="form-dialog-title"
          size="sm"
        >
          <DialogTitle id="form-dialog-title">
            <p style={{ fontSize: "0.9rem" }}>
              Earlier We received your cancellation request for this order.{" "}
            </p>

            <p style={{ fontSize: "1rem" }}>
              By making this order active , you want us to ship this order
              immediately .
            </p>
            <div
              id="dialogmsg"
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => this.setState({ activeorderDialog: false })}
                style={{ textTransform: "capitalize" }}
              >
                Keep it for cancellation
              </Button>
              {this.state.ActiveOrderLoader ? (
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    marginLeft: "2%",
                    textTransform: "capitalize",
                    minWidth: "9rem",
                  }}
                >
                  <CircularProgress size={20} style={{ color: "white" }} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    this.reprocess_order(
                      this.state.clickedId,
                      this.state.clickIndexid
                    )
                  }
                  style={{ marginLeft: "2%", textTransform: "capitalize" }}
                >
                  Confirm to ship
                </Button>
              )}
            </div>
          </DialogTitle>
          <DialogContent></DialogContent>
        </Dialog>

        <SwipeableDrawer
          anchor="bottom"
          onClose={() => {
            this.setState({
              showFilterDialog: true,
            });
          }}
          BackdropProps={{
            style: {
              backgroundColor: "#fff",
              opacity: "0.9",
            },
          }}
          fullScreen
          open={this.state.showFilterDialog}
        >
          <DialogContent
            style={{
              display: "flex",
              alignItems: "flex-start",
              padding: 0,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                padding: 8,
                width: "100%",
              }}
            >
              <div style={{ paddingBottom: "1rem" }} className="">
                <h5
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    fontSize: "1.1rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <FilterAltIcon />
                  Filters
                </h5>
                <div>
                  {this.state.statusFilter.map((status, index) => (
                    <div key={index} className={styles.appliedFilterDiv}>
                      <span className={styles.appliedFilter}>
                        <CloseIcon
                          onClick={() => {
                            this.removeStatusFilter(status);
                            let statusVlaue = statuses.filter((s) => {
                              return s.label == status;
                            });
                            console.log(statusVlaue, "statusVlaue");
                            this.removeFilterValue(statusVlaue[0].value);
                          }}
                          style={{ fontSize: "1rem" }}
                        />{" "}
                        {status}
                      </span>
                    </div>
                  ))}
                  {this.state.timeFilter.map((status, index) => (
                    <div key={index} className={styles.appliedFilterDiv}>
                      <span className={styles.appliedFilter}>
                        <CloseIcon
                          onClick={() => {
                            this.removetimeFilter(status);
                          }}
                          style={{ fontSize: "1rem" }}
                        />{" "}
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <span className={styles.Filterhead}>Order Status</span>
                  <div className={styles.FilterOptions}>
                    {statuses.map((s, index) => (
                      <div key={index} className={styles.FiltereachDiv}>
                        <input
                          type="checkbox"
                          checked={this.state.statusFilter.includes(s.label)}
                          onChange={() => {
                            if (this.state.FilterValue.includes(s.value)) {
                              this.removeStatusFilter(s.label);
                              this.removeFilterValue(s.value);
                            } else {
                              this.addstatusFilter(s.label);
                              this.addFilterValue(s.value);
                            }
                          }}
                        />
                        <span
                          style={{
                            fontWeight: this.state.statusFilter.includes(
                              s.label
                            )
                              ? "bold"
                              : null,
                          }}
                          className={styles.Filtereach}
                        >
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    style={{ textTransform: "capitalize", marginTop: "0.5rem" }}
                    onClick={() => {
                      this.setState({
                        showFilterDialog: false,
                      });
                    }}
                    variant="contained"
                    fullWidth
                    disabled={this.state.FilterValue.length == 0 ? true : false}
                  >
                    Apply
                  </Button>
                </div>

                {/* <div>
                            <span className={styles.Filterhead}>Order Time</span>
                            <div className={styles.FilterOptions}>
                            {times.map(s => (
                              <div className={styles.FiltereachDiv}>
                              <input type="checkbox"
                              checked={this.state.timeFilter.includes(s)}
                              onChange={() => {
                                this.addtimeFilter(s)
                              }}
                              /><span className={styles.Filtereach}>{s}</span>
                              </div>
                              ))}
                            </div>
                          </div> */}
              </div>
            </div>
            <div>
              <IconButton
                onClick={() => {
                  this.setState({
                    showFilterDialog: false,
                  });
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
                }}
              >
                <CloseIcon fontSize="small" style={{ color: "#fff" }} />
              </IconButton>
            </div>
          </DialogContent>
        </SwipeableDrawer>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={showPaymentErr}
          autoHideDuration={3000}
          message={paymentErrMsg}
          onClose={this.handleSnackBarClose}
        />
        <style jsx>{``}</style>
        {/* </Layout> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getorderdetails: state.orderdetailsR.getorderdetails,
  convertAmt: state.orderdetailsR.convertOrderState,
  getuserdetails: state.userdetailsR.getuserdetails,
  userToken: state.accountR.token,
  razorpay_id: state.donationR.rp_id,
  userComponentStatus: state.accountR.userComponentStatus,
  LoadingUserOrder: state.orderdetailsR.LoadingUserOrder,
  NomoreUserOrderData: state.orderdetailsR.NomoreUserOrderData,
  ErrMsg: state.orderdetailsR.ErrMsg,
  UserEmail: state.userdetailsR.getuserdetails.email,
});
export default connect(mapStateToProps, {
  orderdetailslength,
  orderdetails,
  CancelOrder,
  ViewOrderDetails,
  Get_Rp_Id,
  ConvertCODtoPrepaid,
  updateCustomerOrder,
  orderdetailsbystatus,
})(withSnackbar(Order));
