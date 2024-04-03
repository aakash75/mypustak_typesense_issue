"use client"
import React, { Component } from "react";
import styles from "../../../../styles/CustomarOrderDetails.module.css";
import dynamic from "next/dynamic";
import Dialog from "@mui/material/Dialog";
import MediaQuery from "react-responsive";
import NextBreadcrumbs from "../../../../components/Breadcrumbs/NextBreadcrumbs";
import DialogContent from "@mui/material/DialogContent";
import StarIcon from "@mui/icons-material/Star";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
const Update_shipAddress = dynamic(() =>
  import("../../../../components/customer_order/Update_shipAddress")
);
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {
  getShippingAddressInfo,
  removeBookFromOrderAction,
  restoreRemoveBookFromOrderAction,
} from "../../../../redux/actions/BackendorderAction";
import { GetTrackingUrl } from "../../../../redux/actions/getTrackingUrlAction";
import {
  ViewOrderDetails,
  orderDetailsById,
  updateDeliveryAddress,
} from "../../../../redux/actions/orderAction";
import { connect } from "react-redux";
import { Editaddress, Getaddress } from "../../../../redux/actions/accountAction";
import ReactGA from "react-ga";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ContactsIcon from "@mui/icons-material/Contacts";
import { withSnackbar } from "notistack";
const OrderTrackingDailog = dynamic(() =>
  import("../../../../components/customer_order/OrderTrackingDailog")
);
import Head from "next/head";
const Stepper = dynamic(() => import("../../../../components/Stepper/Stepper"));
import Button from "@mui/material/Button";
import {
  Paper,
  Skeleton,
  NoSsr,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import { StrikethroughS } from "@mui/icons-material";
// import AddNewAddress from "../../../components/manage_address/AddNewAddress";
const AddNewAddress = dynamic(() =>
  import("../../../../components/manage_address/AddNewAddress")
);
// import DeliveryDate from "../../../components/ordered_books/DeliveryDate";
const DeliveryDate = dynamic(
  () => import("../../../../components/ordered_books/DeliveryDate"),
  {
    ssr: false,
  }
);
// const stepsArray = ["Order Placed", "Cancelled", "sdfiuhoi"];
const vendorOrder = [
  {
    author: "NA",
    book_id: 1549034,
    book_inv_id: "309656",
    cashbackedPrice: 0,
    deiveryCost: 0,
    discountedPrice: 0,
    mrp: 500,
    new_price: 208,
    publication: "disha publication",
    qty: 1,
    racks: "KOL/104/5/422",
    slug: "TARGET-VITEEE-2021-PAST-14-YEARS-2019-2006-SOLVED-PAPERS-+10-MOCK-TESTS-10E",
    thumb: "medium/cropped_KOL329146.jpg",
    title:
      "TARGET VITEEE 2021 PAST 14 YEARS 2019-2006 SOLVED PAPERS +10 MOCK TESTS 10/E",
    vendor_id: 0,
    vendor_name: "Mypustak",
  },
  {
    author: "testb",
    book_id: 1524816,
    book_inv_id: "NB1524816",
    cashbackedPrice: 0,
    deiveryCost: 75,
    discountedPrice: 0,
    mrp: 200,
    new_price: 15,
    publication: "test",
    qty: 1,
    racks: "",
    slug: "test-akash-clone-book",
    thumb: "27_jjj123456_t1.jpg",
    title: "test AKASH clone book",
    vendor_id: 27,
  },
];
class Page extends Component {
  state = {
    shipping_handlng: "",
    notebook_price: "",
    flat_off: "",
    new_book_mrp: "",
    Editaddressopen: false,
    currentOrder_detail: [],
    order_id: "",
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
    stepsArray: [],
    currentStep: 1,
    groupedArray: [],
    emptyState: "",
    isAddressShow: false,
    isOrderDataShow: false,
    isBookDataShow: false,
    orgOrderId: "",
    openRemoveDialog: false,
    removeBookData: {},
    removeBookLoader: false,
    addBookLoader: false,
    addbookLoaderBookId: "",
    selectedAddress: {},
    is_add_new_address: false,
    windowScreen: "",
    updateDeliveryAddressLoader: false,
  };

  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    if (localStorage.getItem("user") === null) {
      this.setState({ userexist: true });
    }
    window.scrollTo(0, 0);
    this.setState({ count: 1 });
    this.setState({
      CancelOrderPopup: false,
      cancelOrderId: 0,
      emptyState: "k",
    });
    if (typeof window !== "undefined") {
      // Access window-related features here
      this.setState({ windowScreen: window.screen.width });
    }
    const token = `Token ${localStorage.getItem("user")}`;
    let Token = localStorage.getItem("user");
    const  query  = window.location.search
    // console.log(query, "9988899")
    let orderId = window.location.pathname.split("/")[3];
    // alert(`${orderId} mount`)
    this.setState({ orgOrderId: orderId });
    this.props.ViewOrderDetails(orderId);

    this.props
      .getShippingAddressInfo(orderId)
      .then((res) => {
        this.setState({ isAddressShow: true });
      })
      .catch((err) => {
        this.setState({ isAddressShow: false });
      });
    this.setState({ order_id: query.order_id });
    this.props
      .orderDetailsById({ orderid: orderId })
      .then((res) => {
        console.log(res.status, "orderDetailsById");
        this.setState({ status: res.status, isOrderDataShow: true });
        this.renderstepsArray(res.status);
        this.setcurrentstate(res.status);
      })
      .catch((err) => {
        console.log({ err }, "orderDetailsById");
        this.setState({ isOrderDataShow: false });
      });
    let groupedArray = this.groupBy(
      this.props.singleOrderDetailsValue,
      "vendor_name"
    );
    this.setState({
      groupedArray: groupedArray,
    });
    this.props.Getaddress();
  }

  componentDidUpdate(prevProps, prevState) {
    let singleOrderDetailsValue = this.props.singleOrderDetailsValue;
    let groupedArray = this.groupBy(singleOrderDetailsValue, "vendor_name");
    const query  = window.location.search;
    let x;
    let shipping_cost = 0;
    let New_book_price = 0;
    let offer_cashback = 0;
    let each_offer_cashback = 0;
    let each_offer_flatoff = 0;
    let offer_flatoff = 0;
    let delivery_cost;
    let notebool_cost = 0;

    if (
      prevProps.singleOrderDetailsValue !== this.props.singleOrderDetailsValue
    ) {
      this.setState({
        groupedArray: groupedArray,
      });
      // console.log(singleOrderDetailsValue, "555")
      for (const item of Object.entries(singleOrderDetailsValue)) {
        let booktype = item[1][`book_inv_id`];
        let n = booktype.search("NB");
        let notebook = booktype.search("KOL");
        console.log(notebook, "booktype", item[1]);
        if (notebook > -1) {
          if (!item[1].is_book_removed) {
            notebool_cost = notebool_cost + item[1][`new_price`];
          }
        } else if (n < 0) {
          if (!item[1].is_book_removed) {
            shipping_cost = shipping_cost + item[1][`new_price`];
          }
        } else {
          if (!item[1].is_book_removed) {
            New_book_price = New_book_price + item[1][`mrp`];
          }
          let cashback = item[1][`cashbackedPrice`];
          let discount = item[1][`discountedPrice`];
          let mrp = item[1][`mrp`];
          if (cashback) {
            let cashback_amount = mrp - cashback;
            offer_cashback = offer_cashback + cashback_amount;
          } else if (discount) {
            let flatoff = mrp - discount;
            offer_flatoff = offer_flatoff + flatoff;
          }
        }
        this.setState({
          shipping_handlng: shipping_cost,
          new_book_mrp: New_book_price,
          notebook_price: notebool_cost,
          flat_off: offer_flatoff,
        });
      }
    }

    if (prevState.emptyState !== this.state.emptyState) {
      let orderId = window.location.pathname.split("/")[3];
      // alert(`${orderId} update`)
      this.props
        .ViewOrderDetails(orderId)
        .then((res) => {
          this.setState({ isBookDataShow: true });
        })
        .catch((err) => {
          this.setState({ isBookDataShow: false });
        });
      this.props
        .orderDetailsById({ orderid: orderId })
        .then((res) => {
          console.log(res.status, "orderDetailsById");
          this.setState({
            status: res.status,
            emptyState: "k",
            isOrderDataShow: true,
          });
          this.renderstepsArray(res.status);
          this.setcurrentstate(res.status);
        })
        .catch((err) => {
          console.log({ err }, "orderDetailsById");
          this.setState({ isOrderDataShow: false });
        });
    }
  }

  closeDialog = () => {
    this.setState({
      Editaddressopen: false,
      is_add_new_address: false,
      selectedAddress: {},
    });
  };
  ordercloseModal = () => {
    this.setState({ Order_track_popup: false });
  };
  openEditAddress = () => {
    this.setState({ Editaddressopen: true });
    this.props.Editaddress(this.props.shippingAddress);
  };
  refreshAdress = () => {
    this.props.getShippingAddressInfo(this.props.shippingAddress.order_id, "");
  };

  GetTrack = (order_id) => {
    const body = {
      data: {
        ref_id: order_id,
      },
    };
    this.props
      .GetTrackingUrl(body)
      .then((res) => {
        window.open(res.data.output);
      })
      .catch((err) => {
        this.setState({
          Order_track_popup: true,
          Order_track_popup_status: err.response.data.message,
        });
      });
  };

  setcurrentstate = (order_status) => {
    if (order_status == 0 || order_status == 23) {
      this.setState({ currentStep: 1 });
    } else if (order_status == 1) {
      this.setState({ currentStep: 6 });
    } else if (order_status == 2) {
      this.setState({ currentStep: 2 });
    } else if (order_status == 3) {
      this.setState({ currentStep: 2 });
    } else if (order_status == 4) {
      this.setState({ currentStep: 2 });
    } else if (order_status == 5) {
      this.setState({ currentStep: 2 });
    } else if (order_status == 6 || order_status == 7) {
      this.setState({ currentStep: 3 });
    } else if (order_status == 8) {
      this.setState({ currentStep: 3 });
    } else if (order_status == 10) {
      this.setState({ currentStep: 4 });
    } else if (order_status == 11) {
      this.setState({ currentStep: 6 });
    } else if (order_status == 13) {
      this.setState({ currentStep: 6 });
    } else if (order_status == 14) {
      this.setState({ currentStep: 7 });
    } else if (order_status == 16) {
      this.setState({ currentStep: 2 });
    } else if (order_status == 17) {
      this.setState({ currentStep: 2 });
    } else if (order_status == 21) {
      this.setState({ currentStep: 2 });
    } else if (order_status == 9) {
      this.setState({ currentStep: 2 });
    }
  };

  renderstepsArray = (order_status) => {
    let stepsArray = [];
    // alert(order_status);
    if (order_status == 0 || order_status == 23) {
      stepsArray = [
        "Order Placed",
        "Confirmed",
        "Ready To Ship",
        "In Transit",
        "Delivered",
      ];
      this.setState({ stepsArray });
    }
    if (order_status == 2 || order_status == 21) {
      stepsArray = ["Order Placed", "Canceled"];
      this.setState({ stepsArray });

      return stepsArray;
    } else if (order_status == 3) {
      stepsArray = ["Order Placed", "Refunded"];
      this.setState({ stepsArray });

      return stepsArray;
    } else if (order_status == 9) {
      stepsArray = ["Order Placed", "Merge"];
      this.setState({ stepsArray });

      return stepsArray;
    } else if (order_status == 4) {
      stepsArray = ["Order Placed", "Failed"];
      this.setState({ stepsArray });

      return stepsArray;
    } else if (
      order_status == 11 ||
      order_status == 13 ||
      order_status == 14 ||
      order_status == 17
    ) {
      stepsArray = [
        "Order Placed",
        "Confirmed",
        "Ready To Ship",
        "Delivered",
        "RTO",
        "RTO-Recived",
        "RTO Completed",
      ];
      this.setState({ stepsArray });
      return stepsArray;
    } else if (order_status == 8) {
      stepsArray = ["Order Placed", "Confirmed", "Hold"];
      this.setState({ stepsArray });

      return stepsArray;
    } else if (order_status == 16) {
      stepsArray = ["Order Placed", "Cancellation Request", "Cancelled"];
      this.setState({ stepsArray });

      return stepsArray;
    }
    stepsArray = [
      "Order Placed",
      "Confirmed",
      "Ready To Ship",
      "In Transit",
      "Delivered",
    ];
    this.setState({ stepsArray });

    return stepsArray;
  };

  showMinBalanceMsg = (shipping_handlng, order_details) => {
    if (shipping_handlng < 100) {
      if (order_details.payusing == "cod" && order_details.amount == 150) {
        return `*Minimum Order Charge is Rs. 150`;
      } else if (
        order_details.payusing != "cod" &&
        order_details.amount == 100
      ) {
        return `*Minimum Order Charge is Rs. 100`;
      } else {
        return ``;
      }
    }
    // console.log({order_details});
  };
  groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  }
  openContactUsPage = (orderId, bookId, title) => {
    window.location.replace(
      `/contact-us?orderId=${orderId}&&bookId=${bookId ? bookId : ""}&&title=${
        title ? title : ""
      } `
    );
  };
  closeRemoveDialog = () => {
    this.setState({
      openRemoveDialog: false,
      removeBookData: {},
      removeBookLoader: false,
    });
  };
  removeBookHand = () => {
    let bookdata = this.state.removeBookData;
    let orderID = this.props.shippingAddress?.order_id;
    if (orderID) {
      this.setState({ removeBookLoader: true });
      this.props
        .removeBookFromOrderAction(orderID, bookdata.book_id)
        .then((res) => {
          this.props.ViewOrderDetails(orderID);
          this.props.orderDetailsById({ orderid: orderID });
          this.props.getShippingAddressInfo(orderID);
          this.setState({
            removeBookLoader: false,
            removeBookData: {},
            openRemoveDialog: false,
          });
        })
        .catch((err) => {
          console.log(err, "err......");
          this.setState({ removeBookLoader: false });
        });
      // this.setState({openRemoveDialog:false,removeBookData:{}})
    } else {
      alert("else");
    }
  };
  addRemovedBook = (order) => {
    let orderID = this.props.shippingAddress?.order_id;
    let bookId = order.book_id;
    console.log(order, "123");
    this.setState({ addBookLoader: true, addbookLoaderBookId: bookId });
    this.props
      .restoreRemoveBookFromOrderAction(orderID, bookId)
      .then((res) => {
        this.props.ViewOrderDetails(orderID);
        this.props.orderDetailsById({ orderid: orderID });
        this.props.getShippingAddressInfo(orderID);
        this.setState({ addBookLoader: false, addbookLoaderBookId: "" });
      })
      .catch((err) => {
        console.log(err, "err......");
        this.setState({ addBookLoader: false, addbookLoaderBookId: "" });
      });
  };
  updateShippingCharge = () => {
    let shipping_cost = 0;
    let New_book_price = 0;
    let offer_cashback = 0;
    let offer_flatoff = 0;
    let notebool_cost = 0;
    for (const item of Object.entries(this.props.singleOrderDetailsValue)) {
      let booktype = item[1][`book_inv_id`];
      let n = booktype.search("NB");
      let notebook = booktype.search("KOL");
      console.log(notebook, "booktype", item[1]);
      if (notebook > -1) {
        if (!item[1].is_book_removed) {
          notebool_cost = notebool_cost + item[1][`new_price`];
        }
      } else if (n < 0) {
        if (!item[1].is_book_removed) {
          shipping_cost = shipping_cost + item[1][`new_price`];
        }
      } else {
        if (!item[1].is_book_removed) {
          New_book_price = New_book_price + item[1][`mrp`];
        }
        let cashback = item[1][`cashbackedPrice`];
        let discount = item[1][`discountedPrice`];
        let mrp = item[1][`mrp`];
        if (cashback) {
          let cashback_amount = mrp - cashback;
          offer_cashback = offer_cashback + cashback_amount;
        } else if (discount) {
          let flatoff = mrp - discount;
          offer_flatoff = offer_flatoff + flatoff;
        }
      }
      this.setState({
        shipping_handlng: shipping_cost,
        new_book_mrp: New_book_price,
        notebook_price: notebool_cost,
        flat_off: offer_flatoff,
      });
    }
  };
  setSelectedAddress = (add) => {
    this.setState({ selectedAddress: add });
  };
  afterAddAddressHand = () => {
    this.props.Getaddress();
    this.setState({
      selectedAddress: {},
      is_add_new_address: false,
    });
  };
  updateDeliveryAddress = () => {
    this.setState({ updateDeliveryAddressLoader: true });
    let body = {
      address_id: this.state.selectedAddress.address_id,
    };
    this.props
      .updateDeliveryAddress(this.state.orgOrderId, body)
      .then((res) => {
        this.setState({ updateDeliveryAddressLoader: false });
        this.props.getShippingAddressInfo(this.state.orgOrderId);
        this.props.enqueueSnackbar(`Delivery Address Updated`, {
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          variant: "success",
          persist: false,
        });
        this.closeDialog();
      })
      .catch(() => {
        this.setState({ updateDeliveryAddressLoader: false });
        this.props.enqueueSnackbar(
          `Something Wrorng , Please Refresh The Page`,
          {
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "warning",
            persist: false,
          }
        );
      });
  };
  render() {
    const { shippingAddress } = this.props;
    const { selectedAddress } = this.state;
    const {
      id,
      order_id,
      i_date,
      rec_name,
      email,
      phone,
      address,
      landmark,
      pincode,
      city,
      state,
      country,
      courier_name,
      awb,
    } = shippingAddress;
    const { getorderdetails, singleOrderDetailsValue, OrderDetails } =
      this.props;
    console.log(
      singleOrderDetailsValue,
      "singleOrderDetailsValue",
      OrderDetails
    );
    let groupedArray2 = Object.entries(this.state.groupedArray);
    const { stepsArray, currentStep, status } = this.state;
    if (this.props.convertAmt.length !== 0) {
    }
    if (this.props.RAZORPAY !== 0 && this.state.Convcount == 1) {
      this.setState({ Cartloader: false, Convcount: 2 });
    }
    const uploadProfileError = (e) => {
      e.target.src = "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
    };
    return (
      <div>
        <div>
          <Head>
            <script
              type="text/javascript"
              src="https://checkout.razorpay.com/v1/checkout.js"
              async
            ></script>
          </Head>
          <NoSsr>
            <NextBreadcrumbs />
          </NoSsr>
          <div>
          </div>
          {this.state.userexist !== null ? (
            <div className={`${styles.maindiv_order}`}>
              {/* upper part */}
              <div className={`${styles.Shipping_add_div}`}>
                <div className={`${styles.Shipping_add} row m-1`}>
                  <div
                    className={`${styles.Shipping_add_col} col-lg-4 col-md-4  col-sm-6`}
                  >
                    {this.state.isAddressShow ? (
                      <>
                        <p style={{ fontWeight: "bold" }}>Delivery Address</p>
                        <div className={`${styles.display_add}`}>
                          <p className={`${styles.racName}`}>{rec_name}</p>
                          <div className={`${styles.add_section}`}>
                            {address}
                            <p className="text-capitalize">
                              {" "}
                              {city} (
                              <span className="text-capitalize">{state}</span>
                              ),pin-{pincode}{" "}
                            </p>
                          </div>
                          <p style={{ padding: "5px 0%" }}>
                            <b>Contact Number</b> {phone}
                          </p>
                          <p></p>
                          {status == 0 ? (
                            <Button
                              variant="outlined"
                              size="small"
                              color="primary"
                              style={{
                                fontSize: "0.8rem",
                                marginTop: "0.5rem",
                              }}
                              onClick={this.openEditAddress}
                            >
                              <EditIcon style={{ fontSize: "1.1rem" }} /> Edit
                              address
                            </Button>
                          ) : null}
                        </div>
                      </>
                    ) : (
                      <>
                        <p>
                          <Skeleton />
                        </p>
                        <div className={`${styles.display_add}`}>
                          <p
                            style={{
                              padding: "5px 0%",
                            }}
                          >
                            <Skeleton animation="wave" />
                          </p>
                          <div className={`${styles.add_section}`}>
                            <Skeleton animation="wave" />
                            <p>
                              {" "}
                              <Skeleton animation="wave" />{" "}
                            </p>
                            <p>
                              {" "}
                              <Skeleton animation="wave" />
                            </p>
                            <p>
                              <Skeleton animation="wave" />
                            </p>{" "}
                          </div>
                          <p style={{ fontWeight: "bold", padding: "5px 0%" }}>
                            <Skeleton animation="wave" />
                          </p>
                          <p>
                            <Skeleton animation="wave" />
                          </p>
                          <div
                            style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}
                          >
                            <Skeleton
                              animation="wave"
                              height={"3rem"}
                              width={"8rem"}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div
                    className={`${styles.Shipping_add_col2} col-lg-4 col-md-4  col-sm-6`}
                  >
                    {this.state.isAddressShow ? (
                      <>
                        <p style={{ fontWeight: "bold" }}> Contact Us</p>
                        <a
                          style={{ textDecoration: "none", cursor: "pointer" }}
                          href={`/contact-us`}
                        >
                          Email : support@mypustak.com
                        </a>
                        <p>Call or Whatsapp : 033-41804333</p>
                        <p
                          onClick={() => {
                            this.openContactUsPage(this.state.orgOrderId);
                          }}
                          style={{
                            color: "#2258AE",
                            fontWeight: "500",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            padding: "0.1rem",
                          }}
                        >
                          Need Help
                          <HelpCenterIcon />
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          {" "}
                          <Skeleton
                            animation="wave"
                            width={"7rem"}
                            height={"2rem"}
                          />
                        </p>
                        <p>
                          <Skeleton animation="wave" />
                        </p>
                        <p>
                          <Skeleton animation="wave" />
                        </p>
                      </>
                    )}
                  </div>
                  <div
                    className={`${styles.price_breakup} col-lg-4 col-md-4 col-sm-12`}
                  >
                    {this.state.isOrderDataShow ? (
                      <>
                        <p className={`${styles.textBold}`}>Price Details</p>
                        <table>
                          <tbody>
                            {this.state.shipping_handlng ? (
                              <tr>
                                <td className={`${styles.table_td_1}`}>
                                  Shipping & Handling Charges{" "} &nbsp;
                                </td>
                                <td className={`${styles.table_td_2}`}>
                                  &#8377; {this.state.shipping_handlng}
                                </td>
                              </tr>
                            ) : null}
                            {this.state.new_book_mrp ? (
                              <tr>
                                <td className={`${styles.table_td_1}`}>
                                  New Book MRP
                                </td>
                                <td className={`${styles.table_td_2}`}>
                                  &#8377; {this.state.new_book_mrp}
                                </td>
                              </tr>
                            ) : null}

                            {this.state.notebook_price ? (
                              <tr>
                                <td className={`${styles.table_td_1}`}>
                                  Notebook Price{" "}
                                </td>
                                <td className={`${styles.table_td_2}`}>
                                  &#8377; {this.state.notebook_price}
                                </td>
                              </tr>
                            ) : null}
                            {OrderDetails.cod_charge ? (
                              <tr>
                                <td className={`${styles.table_td_1}`}>
                                  Cash Collection Charges
                                </td>
                                <td className={`${styles.table_td_2}`}>
                                  &#8377; {OrderDetails.cod_charge}
                                </td>
                              </tr>
                            ) : null}
                            {OrderDetails.delivery_charge_newbooks ? (
                              <tr>
                                <td className={`${styles.table_td_1}`}>
                                  Delivery Charges
                                </td>
                                <td className={`${styles.table_td_2}`}>
                                  &#8377;{" "}
                                  {OrderDetails.delivery_charge_newbooks}
                                </td>
                              </tr>
                            ) : null}
                            {this.state.flat_off ? (
                              <tr>
                                <td className={`${styles.table_td_1}`}>
                                  Offer Flat Discount
                                </td>
                                <td className={`${styles.table_td_2}`}>
                                  - &#8377; {this.state.flat_off}
                                </td>
                              </tr>
                            ) : null}

                            {OrderDetails.coupon_type == 2 ? (
                              <tr style={{ fontWeight: "bold" }}>
                                <td className={`${styles.table_td_1}`}>
                                  Coupon Applied{" "}
                                  <span>({OrderDetails.coupon_id})</span>
                                </td>
                                <td className={`${styles.table_td_2}`}>
                                  - &#8377;{OrderDetails.coupon_amount}
                                </td>
                              </tr>
                            ) : null}
                            {OrderDetails.amount ? (
                              <tr className={`${styles.textBold}`}>
                                <td className={`${styles.table_td_1}`}>
                                  Total Amount
                                </td>
                                <td className={`${styles.table_td_2}`}>
                                  &#8377;{OrderDetails.amount}
                                </td>
                              </tr>
                            ) : null}
                            <span
                              style={{
                                color: "red",
                                fontSize: "0.85rem",
                                opacity: "0.7",
                              }}
                            >
                              {this.showMinBalanceMsg(
                                this.state.shipping_handlng,
                                OrderDetails
                              )}
                            </span>
                            {OrderDetails.book_coins_amt ? (
                              <tr>
                                <td className={`${styles.table_td_1}`}>
                                  Earn Book Coins Of Worth
                                  {OrderDetails.book_coins_status == 1 ? (
                                    <p style={{ fontSize: "0.7rem" }}>
                                      (Will be credited after delivery)
                                    </p>
                                  ) : null}
                                </td>
                                <td className={`${styles.table_td_2}`}>
                                  &#8377;{OrderDetails.book_coins_amt}
                                </td>
                              </tr>
                            ) : null}
                            {status == 3 ? (
                              <div style={{ marginTop: "0.5rem" }}>
                                <p style={{ fontWeight: "bold" }}>
                                  {" "}
                                  Refund Status
                                </p>
                                <p>
                                  Refund Amount: ₹{OrderDetails.refund_amount}
                                </p>
                                <p>
                                  Refund Method:{" "}
                                  {OrderDetails.refund_method == "wallet"
                                    ? "Wallet"
                                    : "Source Account"}
                                </p>
                                <p>Refund ID: {OrderDetails.refund_id}</p>
                              </div>
                            ) : null}

                            {OrderDetails.coupon_type == 1 ? (
                              <tr>
                                <td className={`${styles.table_td_1}`}>
                                  Coupon Applied{" "}
                                  <span>({OrderDetails.coupon_id})</span>
                                  <p style={{ fontSize: "0.7rem" }}>
                                    (Will be credited after shipped )
                                  </p>
                                </td>
                                <td className={`${styles.table_td_2}`}>
                                  &#8377;{OrderDetails.coupon_amount}
                                </td>
                              </tr>
                            ) : null}
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <>
                        <p>
                          <Skeleton
                            animation="wave"
                            height={"2rem"}
                            width={"30%"}
                          />
                          <Skeleton
                            animation="wave"
                            height={"2rem"}
                            width={"80%"}
                          />
                          <Skeleton
                            animation="wave"
                            height={"2rem"}
                            width={"60%"}
                          />
                          <Skeleton
                            animation="wave"
                            height={"2rem"}
                            width={"80%"}
                          />
                          <Skeleton
                            animation="wave"
                            height={"2rem"}
                            width={"80%"}
                          />
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* lower part */}
              <div className="lowerpart_orderdiv">
                {this.state.isBookDataShow ? (
                  <>
                    {groupedArray2.length
                      ? groupedArray2.map((cartitem, index) => {
                          return (
                            <div key={index}>
                              <div className={`${styles.secondContentDiv}`}>
                                <div
                                  className={`${styles.stepper_container_horizontal} ${styles.stepper_horizontalshow}`}
                                >
                                  <Stepper
                                    steps={stepsArray}
                                    direction="horizontal"
                                    currentStep={currentStep}
                                  />

                                  {status == 2 ||
                                  status == 4 ||
                                  status == 3 ||
                                  status == 21 ? null : status == 9 ? (
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      size="small"
                                      style={{
                                        margin: "1%",
                                        marginLeft: "45%",
                                        outline: "none",
                                        textTransform: "capitalize",
                                      }}
                                      onClick={() => {
                                        window.location.replace(
                                          `/customer/customer_order/${OrderDetails.parent_mergeid}`
                                        );
                                      }}
                                    >
                                      Track More
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      size="small"
                                      style={{
                                        margin: "1%",
                                        marginLeft: "45%",
                                        outline: "none",
                                        textTransform: "capitalize",
                                      }}
                                      onClick={() => this.GetTrack(order_id)}
                                    >
                                      Track More
                                    </Button>
                                  )}
                                </div>
                                <div
                                  className={`${styles.stepper_container_vertical} ${styles.stepper_verticalshow}`}
                                >
                                  <Stepper
                                    steps={stepsArray}
                                    direction="vertical"
                                    currentStep={currentStep}
                                  />

                                  {status == 2 ||
                                  status == 3 ||
                                  status == 4 ||
                                  status == 21 ? null : (
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      size="small"
                                      style={{
                                        margin: "1%",
                                        outline: "none",
                                      }}
                                      onClick={() => this.GetTrack(order_id)}
                                    >
                                      Track More
                                    </Button>
                                  )}
                                </div>
                                <p className={`${styles.shipDirectlyTag}`}>
                                  {status == 2 || status == 3 || status == 4
                                    ? null
                                    : `Ships Directly From ${cartitem[0]}`}
                                </p>
                                {cartitem[1].map((order) => {
                                  return (
                                    <Paper
                                      key={order.bookInvId}
                                      elevation={
                                        order.is_book_removed == 1 ? 0 : 0
                                      }
                                      style={{ position: "relative" }}
                                    >
                                      <div
                                        className={`${styles.singleorder_detail} row m-1 `}
                                        style={{ margin: "0.3rem" }}
                                      >
                                        {/* mobile view */}
                                        <MediaQuery maxWidth={576}>
                                          <div
                                            style={{
                                              opacity:
                                                order.is_book_removed == 1
                                                  ? 0.5
                                                  : 1,
                                              position: "relative",
                                            }}
                                            className={`${styles.singleorder_bookimg}   col-lg-4 col-md-4 col-sm-4 col-4`}
                                          >
                                            <img
                                              src={`https://d1f2zer3rm8sjv.cloudfront.net/${order.thumb}`}
                                              onError={(e) =>
                                                uploadProfileError(e)
                                              }
                                              alt="book image"
                                            />
                                            {order.is_book_removed == 1 ? (
                                              <div
                                                style={{
                                                  display: true
                                                    ? "block"
                                                    : "none",
                                                  background: "#f0d2d2",
                                                  position: "absolute",
                                                  bottom: "0",
                                                  textAlign: "center",
                                                  fontWeight: "500",
                                                  fontSize: "0.75rem",
                                                  padding: "0.1rem",
                                                  color: "red",
                                                  border: "0.5px solid red",
                                                  width: "56%",
                                                }}
                                              >
                                                Removed
                                              </div>
                                            ) : null}
                                          </div>
                                          <div className="singleorder_bookdata col-lg-8 col-md-8 col-sm-8 col-8 ">
                                            <div
                                              style={{
                                                opacity:
                                                  order.is_book_removed == 1
                                                    ? 0.5
                                                    : 1,
                                              }}
                                            >
                                              <p
                                                style={{
                                                  fontWeight: "bold",
                                                  textTransform: "capitalize",
                                                }}
                                              >
                                                {order.title}
                                              </p>
                                              {order.book_inv_id
                                                .toString()
                                                .indexOf("KOL") > -1 ? (
                                                <p id="OrderPrice">
                                                  Notebook Price: &#8377;
                                                  {Math.round(order.new_price)}
                                                </p>
                                              ) : order.book_inv_id
                                                  .toString()
                                                  .indexOf("NB") > -1 ? (
                                                <p id="OrderPrice">
                                                  Book Price: &#8377;
                                                  {Math.round(order.new_price)}
                                                </p>
                                              ) : (
                                                <p id="OrderPrice">
                                                  {" "}
                                                  Book Price:
                                                  <span>{Math.round(order.mrp)}</span>
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                      color: "green",
                                                    }}
                                                  >
                                                    free
                                                  </span>
                                                </p>
                                              )}
                                              <div
                                                className={`${styles.ribbn}`}
                                              >
                                                {order.book_inv_id
                                                  .toString()
                                                  .indexOf("KOL") >
                                                -1 ? null : (
                                                  <span
                                                    className={
                                                      order.book_inv_id
                                                        .toString()
                                                        .indexOf("NB") > -1
                                                        ? `${styles.ribbnSpanNew}`
                                                        : `${styles.ribbnspan}`
                                                    }
                                                  >
                                                    {order.book_inv_id
                                                      .toString()
                                                      .indexOf("NB") > -1
                                                      ? `New Book`
                                                      : `Used Book`}
                                                  </span>
                                                )}
                                              </div>
                                              {this.state.status == 1 &&
                                              order.is_book_removed != 1 ? (
                                                <Button
                                                  onClick={() => {
                                                      window.location.replace(
                                                      `/write-review?${order.book_id}`
                                                    );
                                                  }}
                                                  style={{
                                                    textTransform: "capitalize",
                                                    marginTop: "0.5rem",
                                                  }}
                                                  size="small"
                                                  variant="outlined"
                                                >
                                                  <span
                                                    style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      gap: "0.5rem",
                                                    }}
                                                  >
                                                    {/* {this.state.save_review_loader?<CircularProgress style={{marginRight:"1rem"}} size={18}/>:null} */}
                                                    <StarIcon fontSize="small" />{" "}
                                                    Rate Product
                                                  </span>
                                                </Button>
                                              ) : null}
                                              {this.state.status == 1 &&
                                              order.is_book_removed != 1 ? (
                                                <div>
                                                  <p
                                                    onClick={() => {
                                                      this.openContactUsPage(
                                                        this.state.orgOrderId,
                                                        order.book_id,
                                                        order.title
                                                      );
                                                    }}
                                                    style={{
                                                      color: "#2258AE",
                                                      fontWeight: "500",
                                                      cursor: "pointer",
                                                      fontSize: "0.9rem",
                                                      padding: "0.4rem",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    Need Help
                                                    <HelpCenterIcon />
                                                  </p>
                                                </div>
                                              ) : null}
                                              {this.props.OrderDetails
                                                .payusing == "cod" &&
                                              status == 0 &&
                                              order.is_book_removed == 0 &&
                                              cartitem[1].filter((book) => {
                                                return (
                                                  book.is_book_removed == 0
                                                );
                                              }).length > 1 ? (
                                                <div>
                                                  <Button
                                                    style={{
                                                      textTransform:
                                                        "capitalize",
                                                      paddingLeft: "0px",
                                                      fontSize: "0.8rem",
                                                    }}
                                                    onClick={() => {
                                                      this.setState({
                                                        openRemoveDialog: true,
                                                        removeBookData: order,
                                                      });
                                                    }}
                                                    variant="text"
                                                  >
                                                    Remove This Book
                                                  </Button>
                                                </div>
                                              ) : null}
                                            </div>
                                            {this.props.OrderDetails.payusing ==
                                              "cod" &&
                                            status == 0 &&
                                            order.is_book_removed == 1 ? (
                                              <div>
                                                {this.state.addBookLoader &&
                                                this.state
                                                  .addbookLoaderBookId ==
                                                  order.book_id ? (
                                                  <Button
                                                    style={{
                                                      textTransform:
                                                        "capitalize",
                                                      padding: "2px",
                                                      fontSize: "0.8em",
                                                      minWidth: "7.7rem",
                                                    }}
                                                    variant="text"
                                                  >
                                                    <CircularProgress
                                                      size={16}
                                                    />
                                                  </Button>
                                                ) : (
                                                  <Button
                                                    style={{
                                                      textTransform:
                                                        "capitalize",
                                                      padding: "1px",
                                                      fontSize: "0.8em",
                                                    }}
                                                    onClick={() => {
                                                      this.addRemovedBook(
                                                        order
                                                      );
                                                    }}
                                                    variant="text"
                                                  >
                                                    Add This Book Again
                                                  </Button>
                                                )}
                                                <p
                                                  style={{
                                                    color: "red",
                                                    fontSize: "0.63rem",
                                                    paddingTop: "0.1rem",
                                                  }}
                                                >
                                                  This Book Is Remove From The
                                                  Order
                                                </p>
                                              </div>
                                            ) : null}
                                          </div>

                                          <div
                                            style={{
                                              paddingLeft: "2.4rem",
                                              borderTop: "0.1rem solid gray",
                                              padding: "0.3rem",
                                              marginTop: "0.5rem",
                                              opacity:
                                                order.is_book_removed == 1
                                                  ? 0.5
                                                  : 1,
                                            }}
                                            className=" col-12"
                                          >
                                            {order.book_inv_id
                                              .toString()
                                              .indexOf("KOL") > -1 ? (
                                              <p id="OrderPrice">
                                                Notebook Price: &#8377;
                                                {Math.round(order.new_price)}
                                              </p>
                                            ) : order.book_inv_id
                                                .toString()
                                                .indexOf("NB") > -1 ? null : (
                                              <p id="OrderPrice">
                                                Shipping & Handling charges:
                                                &#8377;
                                                {Math.round(order.new_price)}
                                              </p>
                                            )}
                                            {/* {true ? ( */}
                                            {order.cashbackedPrice ? (
                                              <div>
                                                Earn Book Coins &nbsp;{" "}
                                                <img
                                                  src={`https://d239pyg5al708u.cloudfront.net/uploads/icons/bookcoin.png`}
                                                  style={{ width: "1.5rem" }}
                                                  alt="book coin"
                                                />
                                                &nbsp;{" "}
                                                {order.new_price -
                                                  order.cashbackedPrice}
                                              </div>
                                            ) : null}
                                            <div style={{ padding: "0px" }}>
                                              <DeliveryDate
                                                pincode={pincode}
                                                booked_date={
                                                  this.props.OrderDetails
                                                    .courier_booked_i_date
                                                    ? this.props.OrderDetails
                                                        .courier_booked_i_date
                                                    : this.props.OrderDetails
                                                        .i_date
                                                }
                                              />
                                            </div>

                                            {/* {order.refund_status == 2 ? (
                                              // {true ? (

                                              <div
                                                style={{
                                                  margin: "1rem 0rem",
                                                  fontWeight: "bold",
                                                  color: "red",
                                                }}>
                                                Refund Raised
                                              </div>
                                            ) : null} */}
                                            <div
                                              style={{ marginTop: "0.5rem" }}
                                            >
                                              {order.refund_status &&
                                              order.refund_amount &&
                                              order.refund_method ? (
                                                <span
                                                  style={{
                                                    padding: "0.3rem",
                                                    color: "black",
                                                    textAlign: "center",
                                                    marginBottom: "0.2rem",
                                                    marginTop: "1rem",
                                                    background: "#d9f3d5",
                                                    borderRadius: "0.2rem",
                                                    fontSize: "0.8rem",
                                                  }}
                                                >
                                                  {`₹${
                                                    order.refund_amount
                                                  } Has Been ${
                                                    order.refund_status == 1
                                                      ? "Refund Raised"
                                                      : "Refunded"
                                                  } To Your ${
                                                    order.refund_method ==
                                                    "Wallet"
                                                      ? "Wallet"
                                                      : order.refund_method ==
                                                        "Bank"
                                                      ? "Bank"
                                                      : "Source Account"
                                                  }${
                                                    order.refund_id
                                                      ? ` With Reference Id ${order.refund_id}`
                                                      : ""
                                                  }`}
                                                </span>
                                              ) : null}
                                            </div>
                                          </div>
                                        </MediaQuery>
                                        {/* web View */}
                                        <MediaQuery minWidth={577}>
                                          <div
                                            className={`${styles.singleorder_bookimg}  col-lg-4 col-md-4 col-sm-4 col-4`}
                                          >
                                            <div
                                              style={{
                                                height: "100%",
                                                opacity:
                                                  order.is_book_removed == 1
                                                    ? 0.5
                                                    : 1,
                                                position: "relative",
                                              }}
                                            >
                                              <img
                                                src={`https://d1f2zer3rm8sjv.cloudfront.net/${order.thumb}`}
                                                style={{ height: "100%" }}
                                                onError={(e) =>
                                                  uploadProfileError(e)
                                                }
                                                alt="book image"
                                              />
                                              {order.is_book_removed == 1 ? (
                                                <div
                                                  style={{
                                                    display: true
                                                      ? "block"
                                                      : "none",
                                                    background: "#f0d2d2",
                                                    position: "absolute",
                                                    bottom: "0",
                                                    textAlign: "center",
                                                    fontWeight: "700",
                                                    fontSize: "0.9rem",
                                                    padding: "0.2rem",
                                                    color: "red",
                                                    border: "1px solid red",
                                                    width: "100%",
                                                  }}
                                                >
                                                  Removed
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "flex-start",
                                            }}
                                            className="singleorder_bookdata col-lg-8 col-md-8 col-sm-8 col-8 "
                                          >
                                            <div style={{ flex: 8 }}>
                                              <div
                                                style={{
                                                  opacity:
                                                    order.is_book_removed == 1
                                                      ? 0.4
                                                      : 1,
                                                }}
                                              >
                                                <p
                                                  className={`${styles.textBold} ${styles.textCapitalize}`}
                                                >
                                                  {order.title}
                                                </p>
                                                {order.book_inv_id
                                                  .toString()
                                                  .indexOf("KOL") > -1 ? (
                                                  <p id="OrderPrice">
                                                    Notebook Price: &#8377;
                                                    {Math.round(
                                                      order.new_price
                                                    )}
                                                  </p>
                                                ) : order.book_inv_id
                                                    .toString()
                                                    .indexOf("NB") > -1 ? (
                                                  <p id="OrderPrice">
                                                    Book Price: &#8377;
                                                    {Math.round(
                                                      order.new_price
                                                    )}
                                                  </p>
                                                ) : (
                                                  <p id="OrderPrice">
                                                    {" "}
                                                    Book Price:
                                                    <strike>{Math.round(order.mrp)}</strike>
                                                    <span
                                                      style={{
                                                        fontWeight: "bold",
                                                        color: "green",
                                                      }}
                                                    >
                                                     &nbsp;  free
                                                    </span>
                                                  </p>
                                                )}
                                                {order.book_inv_id
                                                  .toString()
                                                  .indexOf("KOL") > -1 ? (
                                                  <div>
                                                    <p id="OrderPrice">
                                                      Free Delivery
                                                    </p>
                                                    <p>Quantity:{order.qty}</p>
                                                  </div>
                                                ) : order.book_inv_id
                                                    .toString()
                                                    .indexOf("KOL") > -1 ? (
                                                  <p id="OrderPrice">
                                                    Notebook Price: &#8377;
                                                    {Math.round(
                                                      order.new_price
                                                    )}
                                                  </p>
                                                ) : order.book_inv_id
                                                    .toString()
                                                    .indexOf("NB") >
                                                  -1 ? null : (
                                                  <p id="OrderPrice">
                                                    Shipping & Handling charges:
                                                    &#8377;
                                                    {Math.round(
                                                      order.new_price
                                                    )}
                                                  </p>
                                                )}

                                                {order.cod_charge ?
                                                <p>
                                                  Cash collection charges : &nbsp;  &#8377;{parseInt(order.cod_charge) - parseInt(order.cod_discount)}
                                                </p>:null}
                                                
                                                {order.cashbackedPrice ? (
                                                  <div>
                                                    Earn Book Coins &nbsp;{" "}
                                                    <img
                                                      src={`https://d239pyg5al708u.cloudfront.net/uploads/icons/bookcoin.png`}
                                                      style={{ width: "2rem" }}
                                                      alt="book coin"
                                                    />
                                                    &nbsp;{" "}
                                                    {order.new_price -
                                                      order.cashbackedPrice}
                                                  </div>
                                                ) : null}
                                                <div>
                                                  <DeliveryDate
                                                    pincode={pincode}
                                                    booked_date={
                                                      this.props.OrderDetails
                                                        .courier_booked_i_date
                                                        ? this.props
                                                            .OrderDetails
                                                            .courier_booked_i_date
                                                        : this.props
                                                            .OrderDetails.i_date
                                                    }
                                                  />
                                                </div>
                                                {order.book_inv_id
                                                  .toString()
                                                  .indexOf("KOL") >
                                                -1 ? null : (
                                                  <div
                                                    className={`${styles.ribbn}`}
                                                  >
                                                    <span
                                                      className={
                                                        order.book_inv_id
                                                          .toString()
                                                          .indexOf("NB") > -1
                                                          ? `${styles.ribbnSpanNew}`
                                                          : `${styles.ribbnspan}`
                                                      }
                                                    >
                                                      {order.book_inv_id
                                                        .toString()
                                                        .indexOf("NB") > -1
                                                        ? `New Book`
                                                        : `Used Book`}
                                                    </span>
                                                  </div>
                                                )}
                                                {this.props.OrderDetails
                                                  .payusing == "cod" &&
                                                status == 0 &&
                                                order.is_book_removed == 0 &&
                                                cartitem[1].filter((book) => {
                                                  return (
                                                    book.is_book_removed == 0
                                                  );
                                                }).length > 1 ? (
                                                  <div>
                                                    <Button
                                                      style={{
                                                        textTransform:
                                                          "capitalize",
                                                        paddingLeft: "0px",
                                                        fontSize: "0.8rem",
                                                        padding: "0.1rem",
                                                        paddingTop: "0.3rem",
                                                      }}
                                                      onClick={() => {
                                                        this.setState({
                                                          openRemoveDialog: true,
                                                          removeBookData: order,
                                                        });
                                                      }}
                                                      variant="text"
                                                    >
                                                      Remove This Book
                                                    </Button>
                                                  </div>
                                                ) : null}
                                                <div
                                                  style={{
                                                    marginTop: "0.8rem",
                                                  }}
                                                >
                                                  {order.refund_status &&
                                                  order.refund_amount &&
                                                  order.refund_method ? (
                                                    <span
                                                      style={{
                                                        padding: "0.3rem",
                                                        color: "black",
                                                        textAlign: "center",
                                                        marginBottom: "0.2rem",
                                                        marginTop: "1rem",
                                                        background: "#d9f3d5",
                                                        borderRadius: "0.2rem",
                                                      }}
                                                    >
                                                      {`₹${
                                                        order.refund_amount
                                                      } Has Been ${
                                                        order.refund_status == 1
                                                          ? "Refund Raised"
                                                          : "Refunded"
                                                      } To Your ${
                                                        order.refund_method ==
                                                        "Wallet"
                                                          ? "Wallet"
                                                          : order.refund_method ==
                                                            "Bank"
                                                          ? "Bank"
                                                          : "Source Account"
                                                      }${
                                                        order.refund_id
                                                          ? ` With Reference Id ${order.refund_id}`
                                                          : ""
                                                      }`}
                                                    </span>
                                                  ) : null}
                                                </div>
                                              </div>
                                              <div>
                                                {status == 0 &&
                                                order.is_book_removed == 1 ? (
                                                  <div>
                                                    {this.state.addBookLoader &&
                                                    this.state
                                                      .addbookLoaderBookId ==
                                                      order.book_id ? (
                                                      <Button
                                                        style={{
                                                          textTransform:
                                                            "capitalize",
                                                          padding: "2px",
                                                          fontSize: "0.8em",
                                                          minWidth: "7.7rem",
                                                        }}
                                                        variant="text"
                                                      >
                                                        <CircularProgress
                                                          size={16}
                                                        />
                                                      </Button>
                                                    ) : (
                                                      <Button
                                                        style={{
                                                          textTransform:
                                                            "capitalize",
                                                          padding: "1px",
                                                          fontSize: "0.85em",
                                                        }}
                                                        onClick={() => {
                                                          this.addRemovedBook(
                                                            order
                                                          );
                                                        }}
                                                        variant="text"
                                                      >
                                                        Add This Book Again
                                                      </Button>
                                                    )}
                                                    <p
                                                      style={{
                                                        color: "red",
                                                        fontSize: "0.63rem",
                                                        paddingTop: "0.1rem",
                                                      }}
                                                    >
                                                      This Book Is Remove From
                                                      The Order
                                                    </p>
                                                  </div>
                                                ) : null}
                                              </div>
                                            </div>
                                            <div style={{}}>
                                              {this.state.status == 1 &&
                                              order.is_book_removed != 1 ? (
                                                <Button
                                                  onClick={() => {
                                                      window.location.replace(
                                                      `/write-review?${order.book_id}`
                                                    );
                                                  }}
                                                  style={{
                                                    textTransform: "capitalize",
                                                  }}
                                                  variant="outlined"
                                                >
                                                  <span
                                                    style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      gap: "0.5rem",
                                                    }}
                                                  >
                                                    {/* {this.state.save_review_loader?<CircularProgress style={{marginRight:"1rem"}} size={18}/>:null} */}
                                                    <StarIcon /> Rate Product
                                                  </span>
                                                </Button>
                                              ) : null}
                                              {this.state.status == 1 &&
                                              order.is_book_removed != 1 ? (
                                                <div>
                                                  {console.log(
                                                    order,
                                                    "order......................."
                                                  )}
                                                  <p
                                                    onClick={() => {
                                                      this.openContactUsPage(
                                                        this.state.orgOrderId,
                                                        order.book_id,
                                                        order.title
                                                      );
                                                    }}
                                                    style={{
                                                      color: "#2258AE",
                                                      fontWeight: "500",
                                                      cursor: "pointer",
                                                      fontSize: "0.9rem",
                                                      padding: "0.4rem",
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    Need Help <HelpCenterIcon />{" "}
                                                  </p>
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        </MediaQuery>
                                        {/* {order.is_book_removed==1 ?
                                      <div style={{display:true?"block":"none" ,background: "#f0d2d2",position: "absolute",bottom: "12px",textAlign: "center",fontWeight: "700",fontSize: "1.1rem",padding: "0.2rem",color: "red"}} >Removed</div>
                                      :null} */}
                                      </div>
                                    </Paper>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </>
                ) : (
                  <>
                    <center>
                      <Skeleton
                        animation="wave"
                        height={"30vh"}
                        width={"70vw"}
                      />
                      <Skeleton
                        animation="wave"
                        height={"40vh"}
                        width={"70vw"}
                      />
                    </center>
                  </>
                )}
              </div>
              {/* End of lower part */}
            </div>
          ) : (
            <React.Fragment>
              <div
                style={{
                  marginTop: "10%",
                  textAlign: "center",
                  paddingBottom: "20%",
                }}
              >
                <h1>Please Login </h1>
              </div>
            </React.Fragment>
          )}
        </div>

        <OrderTrackingDailog
          message={this.state.Order_track_popup_status}
          show={this.state.Order_track_popup}
          handlecloseDialog={this.ordercloseModal}
        />
        {/* Edit Dialog */}
        <Dialog
          open={this.state.Editaddressopen}
          // onClose={this.closeDialog}
          aria-labelledby="form-dialog-title"
          scroll={"paper"}
          style={{ zIndex: "3000" }}
          maxWidth="90vw"
          fullScreen={this.state.windowScreen < 600 ? true : false}
        >
          <DialogTitle>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                outline: "none",
              }}
            >
              <div>Change Delivery Address</div>
              <div style={{ position: "absolute", top: 0, right: 0 }}>
                <IconButton onClick={this.closeDialog}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
          </DialogTitle>
          <DialogContent style={{ overflowX: "hidden" }}>
            {/* <Update_shipAddress
              uaddress={this.props.shippingAddress}
              CloseEditAddress={this.closeDialog}
              refreshAddress={this.refreshAdress}
            /> */}
            {this.state.is_add_new_address ? (
              <div
                style={{
                  width: this.state.windowScreen < 600 ? "100vw" : "50vw",
                }}
              >
                <AddNewAddress
                  // afterAddingAddress={this.afterAddAddressHand()}
                  isSAddNewDialog={this.afterAddAddressHand}
                />
              </div>
            ) : (
              <div
                style={{
                  width: this.state.windowScreen < 600 ? "100vw" : "50vw",
                }}
              >
                {this.props.getadd.length ? (
                  this.props.getadd
                    .sort(function (a, b) {
                      return b.address_id - a.address_id;
                    })
                    .map((data) => (
                      <div
                        key={data.address_id}
                        className="row py-1 pt-2 border-bottom border-lightgray align-items-center cursor-pointer"
                        style={
                          selectedAddress
                            ? selectedAddress.address_id == data.address_id
                              ? {
                                  background: "#eef3ff",
                                  minHeight: "5rem",
                                  cursor: "pointer",
                                }
                              : {
                                  minHeight: "5rem",
                                  cursor: "pointer",
                                }
                            : {
                                minHeight: "5rem",
                                cursor: "pointer",
                              }
                        }
                        onClick={() => this.setSelectedAddress(data)}
                      >
                        <div className="col-12 col-sm-12 row">
                          <div className="d-flex col-9 col-md-10 col-lg-10">
                            <div>
                              <input
                                className="form-check-input "
                                type="radio"
                                name=""
                                id=""
                                style={{ marginRight: "0.5rem" }}
                                // checked={true}
                                checked={
                                  selectedAddress
                                    ? selectedAddress.address_id ==
                                      data.address_id
                                      ? true
                                      : false
                                    : true
                                }
                              />
                            </div>

                            <div>
                              <span className={`d-flex align-items-start`}>
                                <span>{data.rec_name}</span>
                                &nbsp;
                                <span style={{ fontSize: "0.8rem" }}>
                                  ({data.phone_no})
                                </span>
                                {/* {selectedAddress ? (
                                selectedAddress.address_id ==
                                data.address_id ? (
                                  <CheckCircleOutlineOutlinedIcon
                                    style={{ color: "green" }}
                                  />
                                ) : null
                              ) : null} */}
                              </span>
                              <span
                                className={` p`}
                                style={{ fontSize: "0.8rem" }}
                              >
                                {data.address}
                              </span>
                              <br />
                              <span
                                className={`p`}
                                style={{ fontSize: "0.8rem" }}
                              >
                                {data.city_name} ({data.state_name}){" "}
                                {data.pincode}
                              </span>
                              {selectedAddress ? (
                                selectedAddress.address_id ==
                                data.address_id ? (
                                  <div className="text-center mt-3"></div>
                                ) : null
                              ) : null}
                            </div>
                          </div>
                          {/* <div className="col-1"></div> */}
                          <div className="col-2">
                            <Button
                              // onClick={() => {
                              //   editAddressHand(data);
                              // }}
                              style={{ textTransform: "capitalize" }}
                              variant="outlined"
                              size="small"
                              disabled={true}
                              color="primary"
                            >
                              {data.title == "Home" ? (
                                <>
                                  <HomeIcon
                                    fontSize="small"
                                    className="text-primary"
                                    style={{ opacity: "0.7" }}
                                  />
                                  Home
                                </>
                              ) : data.title == "Office" ? (
                                <>
                                  <BusinessIcon
                                    fontSize="small"
                                    className="text-primary"
                                    style={{ opacity: "0.7" }}
                                  />
                                  Office
                                </>
                              ) : (
                                <>Others</>
                              )}
                              {/* <EditIcon fontSize="small" className="text-primary" />{" "} */}
                            </Button>
                          </div>
                        </div>
                        {selectedAddress ? (
                          selectedAddress.address_id == data.address_id ? (
                            <div className="" style={{ marginLeft: "1.3rem" }}>
                              {this.state.updateDeliveryAddressLoader ? (
                                <Button
                                  style={{
                                    textTransform: "capitalize",
                                    minWidth: "6rem",
                                  }}
                                  variant="contained"
                                  size="small"
                                  color="primary"
                                  onClick={() => {
                                    // this.updateDeliveryAddress();
                                  }}
                                >
                                  <CircularProgress
                                    size={25}
                                    color="secondary"
                                    style={{ color: "white" }}
                                  />
                                </Button>
                              ) : (
                                <Button
                                  style={{
                                    textTransform: "capitalize",
                                    minWidth: "6rem",
                                  }}
                                  variant="contained"
                                  size="small"
                                  color="primary"
                                  onClick={() => {
                                    this.updateDeliveryAddress();
                                  }}
                                >
                                  Deliver Here
                                </Button>
                              )}
                            </div>
                          ) : null
                        ) : null}
                      </div>
                    ))
                ) : (
                  <div style={{ textAlign: "center", margin: "2rem 0rem" }}>
                    <div>
                      <ContactsIcon
                        style={{ fontSize: "3rem", margin: "1rem 0rem" }}
                      />
                    </div>
                    <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      No Addresses found in your account!
                    </div>
                    <div style={{ fontSize: "0.8rem" }}>
                      Add a delivery address.
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
          {this.state.is_add_new_address ? null : (
            <DialogActions>
              <Button
                style={{ textTransform: "capitalize" }}
                variant="contained"
                size="small"
                color="primary"
                onClick={() => {
                  this.setState({ is_add_new_address: true });
                }}
              >
                Add New Address
              </Button>
            </DialogActions>
          )}
        </Dialog>
        {/* Remove book */}
        <Dialog
          open={this.state.openRemoveDialog}
          onClose={this.closeRemoveDialog}
        >
          <DialogTitle style={{ color: "orangered" }}>Alert</DialogTitle>
          {console.log(this.state.removeBookData, "123")}
          <DialogContent>
            Do You Really Want To Remove{" "}
            <b>{this.state.removeBookData.title}</b> Book{" "}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeRemoveDialog}>No</Button>
            {this.state.removeBookLoader ? (
              <Button>
                <CircularProgress size={19} color="primary" />
              </Button>
            ) : (
              <Button onClick={this.removeBookHand}>Yes</Button>
            )}
          </DialogActions>
        </Dialog>

        <style jsx>{``}</style>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getorderdetails: state.orderdetailsR.getorderdetails,
  singleOrderDetailsValue: state.orderdetailsR.singleOrderDetails,
  convertAmt: state.orderdetailsR.convertOrderState,
  shippingAddress: state.orderBR.shippingAddress,
  OrderDetails: state.orderdetailsR.OrderDetails,
  getadd: state.accountR.getadd,
});
export default connect(mapStateToProps, {
  ViewOrderDetails,
  getShippingAddressInfo,
  orderDetailsById,
  Editaddress,
  GetTrackingUrl,
  Getaddress,
  removeBookFromOrderAction,
  restoreRemoveBookFromOrderAction,
  updateDeliveryAddress,
})(withSnackbar(Page));
