import React, { useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import bookcoinimg from "../../assets/bookcoin.jpg";
import styles from "../../styles/CheckoutPage.module.css";
import Head from "next/head";
import dynamic from "next/dynamic";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import TabContext from "@mui/lab/TabContext";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CloseIcon from "@mui/icons-material/Close";
import TabPanel from "@mui/lab/TabPanel";
import EditIcon from "@mui/icons-material/Edit";
import { connect } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Router from "next/router";
import Paper from "@mui/material/Paper";
import ContactsIcon from "@mui/icons-material/Contacts";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
// import {Tooltip} from "react-bootstrap/Tooltip";
import {
  Editaddress,
  EdituserAddressAction,
  get_razorpay_key,
} from "../../redux/actions/accountAction";
import { updateCustomerOrder } from "../../redux/actions/orderAction";

import { SetWallet } from "../../redux/actions/walletAction";
import razorpaylogo from "../../assets/razorpay.svg";
import cashfreelogo from "../../assets/cashfree.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";
import AddIcon from "@mui/icons-material/Add";
import MediaQuery from "react-responsive";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { Getaddress } from "../../redux/actions/accountAction";
const EditAddress = dynamic(() => import("../manage_address/EditAddress"));
const AddUserAddress = dynamic(() => import("../manage_address/AddNewAddress"));
import { fetchUserAddress } from "../../redux/actions/manageAddressAction";
import {
  Getwalletd,
  Get_CashFree_Signature_Wallet,
} from "../../redux/actions/walletAction";
import {
  AddPriceCart,
  check_success,
  OrderDetails,
  OutOfStock,
  updatePaymentIdOrder,
  walletOrder,
  RemoveCart,
  couponApply,
  resetCoupon,
  redeemCouponAction,
  offerbook_applied,
  CartSession,
  SaveLater,
  offeredbook,
  apply_couponcode,
  orderOfferBook,
  ResetOutStockList,
  cod_verify_payment,
  razorpay_verify_payment,
  check_book_incart,
  wallet_verify_payment,
  fetch_min_order_value,
  fetch_freebie_data,
} from "../../redux/actions/cartAction";
import { getOffers } from "../../redux/actions/offerpageAction";
import HelpIcon from "@mui/icons-material/Help";
import Freebies from "../Freebies/Freebies";
import { getDiscountPercentage } from "../../helper/helpers";

const MIN_PREPAID_ORDER_VALUE = 120;
const COD_CHARGE = 50;
const MIN_COD_ORDER_VALUE = 150;

function Checkoutpage(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [CouponAnimation, setCouponAnimation] = useState(false);
  const CouponRef = useRef(null);
  let parentref = useRef();

  const ScrolltoCoupon = () => {
    setTimeout(() => {
      setCouponAnimation(true);
    }, 400);
    setTimeout(() => {
      setCouponAnimation(false);
    }, 1400);

    CouponRef.current.scrollIntoView();
  };
  const [cashfree_pgdialog, setCashfree_pgdialog] = React.useState(false);
  const [reduceAmtUsingCoupon, setreduceAmtUsingCoupon] = React.useState(0);
  const [value, setValue] = React.useState("1");
  const [isActive, setIsActive] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState("");
  const [orderSummary, setOrderSummary] = React.useState(2);
  const [showEditDialog, setshowEditDialog] = React.useState(false);
  const [editData, seteditData] = React.useState({});
  const [showDialog, setShowDialog] = React.useState(false);
  const [WalletSelected, setWalletSelected] = React.useState(true);
  const [applyBookcoinsSelected, setapplyBookcoinsSelected] =
    React.useState(false);
  const [offerLoading, setofferLoading] = React.useState(false);
  const [paymentType, setpaymentType] = React.useState("prepaid");
  const [prepaid3rd_partySelected, setprepaid3rd_partySelected] =
    useState("Razorpay");
  const [generatingOrderId, setgeneratingOrderId] = useState(false);
  const [other_payMethod, setother_payMethod] = useState("");
  const [UserAmount, setUserAmount] = useState(0);
  const [showUsedWallet, setshowUsedWallet] = useState(0);
  const [openRemoveOutStockDialog, setopenRemoveOutStockDialog] =
    useState(false);
  const [razorpay_key, setrazorpay_key] = useState("");
  const [mobile_paymode, setmobile_paymode] = useState(true);
  const [payment_detailDiv, setpayment_detailDiv] = useState(true);
  const [applyOfferSnackbar, setapplyOfferSnackbar] = useState(false);
  const [open, setopen] = useState(false);
  const [couponDiv, setcouponDiv] = useState(false);
  const [coupon, setcoupon] = useState("");
  const [applycouponLoader, setapplycouponLoader] = useState(false);
  const [offerDiv, setofferDiv] = useState(false);
  const [getItChecked, setgetItChecked] = useState(false);
  const [offerBookPopup, setofferBookPopup] = useState(false);
  const [coinPopup, setcoinPopup] = useState(false);
  const [totalShipping, settotalShipping] = useState(0);
  const [below, setbelow] = useState(70);
  const [above, setabove] = useState(50);
  const [OpenProceedPayBtn, setOpenProceedPayBtn] = useState(0);
  const [COUNT, setCOUNT] = useState(1);
  const [OpenLoader, setOpenLoader] = useState(false);
  const [GotOThankYou, setGotOThankYou] = useState(false);
  const [Cartloader, setCartloader] = useState(true);
  const [AddAddressHover, setAddAddressHover] = useState(false);
  const [OpenConfirmcod, setOpenConfirmcod] = useState(true);
  const [AddressCount, setAddressCount] = useState(1);
  const [Paypalbtn, setPaypalbtn] = useState("proceedToPayBtn");
  const [DisableProccedTopay, setDisableProccedTopay] = useState(true);
  const [deleteBookinv, setdeleteBookinv] = useState("");
  const [deleteCartid, setdeleteCartid] = useState("");
  const [openDelelteBookDialog, setopenDelelteBookDialog] = useState(false);
  const [confirmOrder, setconfirmOrder] = useState(false);
  const [CartOrderId, setCartOrderId] = useState(0);
  const [offerbookloader, setofferbookloader] = useState(false);
  const [toPayOrderID, settoPayOrderID] = useState("");
  const [ShowOrderCreationErr, setShowOrderCreationErr] = useState(false);
  const [OrderErrMsg, setOrderErrMsg] = useState("");
  const [OrderId, setOrderId] = useState("");
  const [WaitPlacingOrder, setWaitPlacingOrder] = useState(false);
  const [del_cart_loader, setdel_cart_loader] = useState(false);
  const [offer_del_cart_loader, setoffer_del_cart_loader] = useState(false);
  const [removingCartId, setremovingCartId] = useState("");
  const [del_cart_err, setdel_cart_err] = useState(false);
  const [minordervalue, setminordervalue] = useState("");
  const [min_order_charge, setmin_order_charge] = useState(0);

  const [AllAdd, setAllAdd] = useState(3);
  const [ShowmoreAddress, setShowmoreAddress] = useState(false);
  const [isviewCoupon, setisviewCoupon] = useState(false);
  const [couponloader, setcouponloader] = useState(false);
  const [tabvalue, settabvalue] = useState("");
  const [prepaidcashfreeissue, setprepaidcashfreeissue] = useState("");
  const [offerbookremove, setofferbookremove] = useState(false);
  const [payment_loader, setpayment_loader] = useState(false);
  const [payment_loader_message, setpayment_loader_message] = useState("");
  const [payment_method, setpayment_method] = useState("");
  const [prepaid_payment_method, setprepaid_payment_method] = useState("");
  const [cod_paymentloader, setcod_paymentloader] = useState(false);

  const MIN_ORDER_MSG_DIV = (min_prepaid, min_cod) => {
    // return <p> ok ok ok</p>
    // alert(min_prepaid ,min_cod )
    let cod_min = min_cod_order_value == "" ? min_cod : min_cod_order_value;
    let prepaid_min =
      min_prepaid_order_value == "" ? min_prepaid : min_prepaid_order_value;
    const payment_type = paymentType;
    let minorderValue = 0;

    if (payment_type == "cod") {
      if (fetchcalculatedAllBookPrice().all_books_price < cod_min) {
        minorderValue = cod_min;
      }
    } else {
      if (fetchcalculatedAllBookPrice().all_books_price < prepaid_min) {
        minorderValue = prepaid_min;
      }
    }
    let min_order_charge =
      minorderValue -
      fetchcalculatedAllBookPrice().all_books_price -
      fetchcalculatedAllBookPrice().newBookDeliveryCost;
    if (payment_type == "cod") {
      if (min_order_charge > 0) {
        min_order_charge = min_order_charge - 50;
      }
    }
    if (min_order_charge < 0) {
      min_order_charge = 0;
    }

    // console.log(
    //   min_order_charge,
    //   renderAmtUsed().offer_book_cost,
    //   "fetchcalculatedAllBookPrice().all_books_price",
    //   fetchcalculatedAllBookPrice().all_books_price
    // );
    setminordervalue(minorderValue);
    setmin_order_charge(min_order_charge);
  };
  const [cod_charge_api, setcod_charge_api] = useState("");
  const [min_prepaid_order_value, setmin_prepaid_order_value] = useState("");
  const [min_cod_order_value, setmin_cod_order_value] = useState("");
  React.useEffect(() => {
    props
      .fetch_min_order_value()
      .then((res) => {
        setcod_charge_api(res[0].cod_charge);
        setmin_prepaid_order_value(res[0].minium_order_value);
        setmin_cod_order_value(res[0].minium_order_value + res[0].cod_charge);
        let min_cod_order = res[0].minium_order_value + res[0].cod_charge;
        MIN_ORDER_MSG_DIV(res[0].minium_order_value, min_cod_order);
      })
      .catch((err) => { });

    props.CartSession();
    let tabv;
    let pay;
    const tabvv = window.location.search.split("&");
    tabvv.map((t) => {
      // console.log(t.split("="), "tabvtabv");
      if (t.split("=")[0] == "?tabvalue") {
        tabv = t.split("=")[1];
      } else {
        pay = t.split("=")[1];
        setprepaidcashfreeissue(pay);
      }
    });
    // console.log(tabv, pay, "tabvtabv");
    let user = JSON.parse(localStorage.getItem("user_info"));
    let is_applied_offerbook = localStorage.getItem("offerbook");
    // console.log(
    //   localStorage.getItem("offerbook") == "true",
    //   "localStorage.getItem('offerbook')==true"
    // );
    if (localStorage.getItem("offerbook") == "true") {
      props.offeredbook({ id: user.id });
      props.offerbook_applied(is_applied_offerbook);
    }
    if (pay) {
      if (
        pay == "cfp" ||
        pay == "cfpw" ||
        pay == "cfpp" ||
        pay == "cfpwp" ||
        pay == "cfppw"
      ) {
        setprepaid3rd_partySelected("Cashfree");
      }
      if (pay == "rzp") {
        setprepaid3rd_partySelected("Razorpay");
      }
    }
    if (tabv) {
      if (tabv == "1") {
        setValue("1");
      }
      if (tabv == "2") {
        setValue("2");
      }
      if (tabv == "3") {
        setValue("3");
      }
    }
    // else{
    //   setValue("1")
    // }

    get_address_fun();
    // props.SetWallet();

    let AllBooksData = props.cartDetails;
    // console.log(AllBooksData, 'AllBooksData');
    let getAllOutOfStockBook_Inv = [];
    AllBooksData.map((books) => {
      // console.log(books.bookInvId);
      getAllOutOfStockBook_Inv.push(books.bookInvId);
    });

    if (getAllOutOfStockBook_Inv.length) {
      const BookInvdata = {
        book_inv: getAllOutOfStockBook_Inv,
      };
      props.OutOfStock("", BookInvdata);
    }

    setgetItChecked(props.is_offerbook_applied);
    initializeRazorpay()
    initializeCashfree()
  }, []);
  useEffect(() => {
    let tabv;
    let pay;
    const tabvv = window.location.search.split("&");
    tabvv.map((t) => {
      // console.log(t.split("="), "tabvtabv");
      if (t.split("=")[0] == "?tabvalue") {
        tabv = t.split("=")[1];
      } else {
        pay = t.split("=")[1];
        setprepaidcashfreeissue(pay);
      }
    });
    if (prepaid3rd_partySelected == "Cashfree" && pay == "cfp") {
    }
  }, [prepaid3rd_partySelected]);


  useEffect(() => {
    if (props.OutOfStockBooks.length) {
      setopenRemoveOutStockDialog(true)
    }
  }, [props.OutOfStockBooks])

  useEffect(() => {
    // MIN_ORDER_MSG_DIV();
    props
      .fetch_min_order_value()
      .then((res) => {
        setcod_charge_api(res[0].cod_charge);
        setmin_prepaid_order_value(res[0].minium_order_value);
        setmin_cod_order_value(res[0].minium_order_value + res[0].cod_charge);
        let min_cod_order = res[0].minium_order_value + res[0].cod_charge;
        MIN_ORDER_MSG_DIV(res[0].minium_order_value, min_cod_order);
      })
      .catch((err) => { });
  }, [paymentType]);

  // useEffect(() => {
  //   MIN_ORDER_MSG_DIV();
  // }, []);

  useEffect(() => {
    // MIN_ORDER_MSG_DIV();
    props
      .fetch_min_order_value()
      .then((res) => {
        setcod_charge_api(res[0].cod_charge);
        setmin_prepaid_order_value(res[0].minium_order_value);
        setmin_cod_order_value(res[0].minium_order_value + res[0].cod_charge);
        let min_cod_order = res[0].minium_order_value + res[0].cod_charge;
        MIN_ORDER_MSG_DIV(res[0].minium_order_value, min_cod_order);
      })
      .catch((err) => { });
  }, [props.ItemsInCart]);

  useEffect(() => {
    // MIN_ORDER_MSG_DIV();
    props
      .fetch_min_order_value()
      .then((res) => {
        setcod_charge_api(res[0].cod_charge);
        setmin_prepaid_order_value(res[0].minium_order_value);
        setmin_cod_order_value(res[0].minium_order_value + res[0].cod_charge);
        let min_cod_order = res[0].minium_order_value + res[0].cod_charge;
        MIN_ORDER_MSG_DIV(res[0].minium_order_value, min_cod_order);
      })
      .catch((err) => { });
  }, [value]);

  React.useEffect(() => {
    setCartOrderId(props.OrderId);
    let o_id = props.OrderId;
    // console.log(o_id);
  }, [props.OrderId]);

  useEffect(() => { }, [WalletSelected]);

  React.useEffect(() => {
    let AllBooksData = props.cartDetails;
    // console.log(props.cartDetails, "props.cartDetails");
    // console.log(AllBooksData, 'AllBooksData');
    let getAllOutOfStockBook_Inv = [];
    AllBooksData.map((books) => {
      getAllOutOfStockBook_Inv.push(books.bookInvId);
    });

    if (props.userComponentStatus == 2) {
    }
    if (getAllOutOfStockBook_Inv.length) {
      const BookInvdata = {
        book_inv: getAllOutOfStockBook_Inv,
      };
    }
    calculateCartDeatils(0);
  }, [props.cartDetails]);

  React.useEffect(() => {
    setSelectedAddress(
      props.primary_address
        ? props.primary_address
        : props.getadd[0]
          ? props.getadd[0]
          : null
    );
  }, [props.getadd]);
  React.useEffect(() => { }, [props.getuserdetails]);

  React.useEffect(() => {
    window.scroll(0, 0);

    if (value == "3") {
      props.SetWallet();
    }
    let AllBooksData = props.cartDetails;
    let getAllOutOfStockBook_Inv = [];
    AllBooksData.map((books) => {
      getAllOutOfStockBook_Inv.push(books.bookInvId);
    });

    if (props.userComponentStatus == 2) {
    }
    if (getAllOutOfStockBook_Inv.length) {
      const BookInvdata = {
        book_inv: getAllOutOfStockBook_Inv,
      };
      if (value == 2 || value == 3) {
        props.OutOfStock("", BookInvdata);
        let body = {
          cart_value: renderAmtUsed().total_order_value,
        };
        props
          .fetch_freebie_data(body)
          .then((res) => { })
          .catch((err) => { });
      }
    }
  }, [value]);

  const ResizeTitle = (title) => {
    if (title.length > 60) {
      return title.substr(0, 60) + "...";
    } else {
      return title;
    }
  };

  const check_outofstock_book = () => {
    try {

      let AllBooksData = props.cartDetails;
      // console.log(AllBooksData, 'AllBooksData');
      let getAllOutOfStockBook_Inv = [];
      AllBooksData.map((books) => {
        // console.log(books.bookInvId);
        getAllOutOfStockBook_Inv.push(books.bookInvId);
      });

      if (getAllOutOfStockBook_Inv.length) {
        const BookInvdata = {
          book_inv: getAllOutOfStockBook_Inv,
        };
        props.OutOfStock("", BookInvdata);
      }
      return true
    }
    catch (err) {
      console.log(err)
      return true

    }
  };



  const final_check_outofstock_book = () => {

    return new Promise((resolve, reject) => {
      let AllBooksData = props.cartDetails;
      // console.log(AllBooksData, 'AllBooksData');
      let getAllOutOfStockBook_Inv = [];
      AllBooksData.map((books) => {
        // console.log(books.bookInvId);
        getAllOutOfStockBook_Inv.push(books.bookInvId);
      });

      if (getAllOutOfStockBook_Inv.length) {
        const BookInvdata = {
          book_inv: getAllOutOfStockBook_Inv,
        };
        props.OutOfStock("", BookInvdata).then((res) => {
          // resolve(true)
          // alert("508")
          console.log(res.data.bookOutOstack, "res508888")
          if (res.data.bookOutOstack.length > 0) {
            return
          }
          else {

            NewMakepayment();
          }

        }).catch((err) => {
          console.log(err)
          // resolve(true)
          NewMakepayment();


        })

      }
      else {
        // resolve(true)
        NewMakepayment();


      }

    })



  };
  const ConfirmRemoveFromCart = (bookInv, CartId) => {
    setdeleteBookinv(bookInv);
    setdeleteCartid(CartId);
    setopenDelelteBookDialog(true);
  };

  const closeDelelteBookDialog = () => {
    if (!del_cart_loader) {
      setopenDelelteBookDialog(false);
    }
  };

  const RemoveFromCart = async (bookInvId, Cart_id) => {
    setdel_cart_loader(true);
    setremovingCartId(Cart_id);
    setofferbookloader(true);

    const data = { is_deleted: "Y" };

    let res = await props.RemoveCart(Cart_id, bookInvId, data);
    if (res) {
      props.CartSession().then((res) => {
        let user = JSON.parse(localStorage.getItem("user_info"));

        props.offeredbook({ id: user.id }).then((res) => {
          setofferbookloader(false);
        });
        if (props.ItemsInCart - 1 == 0) {
          window.location.replace("/view-cart");
        }
        // alert("hiii");
        apply_coupon_autochange();
      });

      setdel_cart_loader(false);
      setopenDelelteBookDialog(false);
    } else {
      setdel_cart_err(true);
      del_cart_loader(false);
      setopenDelelteBookDialog(false);
    }
  };

  const removeAllOutstockBooks = async () => {
    const { cartDetails, OutOfStockBooks } = props;
    const data = { is_deleted: "Y" };

    let response = await Promise.all(
      cartDetails.map((cart) => {
        if (OutOfStockBooks.toString().includes(cart.bookInvId)) {
          setdel_cart_loader(true);
          let res = props.RemoveCart(cart.Cart_id, cart.bookInvId, data);
          if (res) {
            setdel_cart_loader(false);
          } else {
            setdel_cart_err(false);
            setdel_cart_loader(false);
          }
          return res;
        }
      })
    );

    if (response) {
      // alert('deleted')
      props.ResetOutStockList();
      // closeOutstockDialog();
      setopenRemoveOutStockDialog(false);
    } else {
    }
  };
  const get_address_fun = async () => {
    if (props.getadd.length <= 0) {
      let res_data = await props.Getaddress();
      // console.log(res_data, "res_data");
      if (res_data) {
        // console.log(
        //   props.selectedAddress,
        //   "     props.primary_address",
        //   props.primary_address
        // );
        setSelectedAddress(
          props.primary_address
            ? props.primary_address
            : props.getadd[0]
              ? props.getadd[0]
              : null
        );
      }
    }
  };

  const apply_coupon_autochange = () => {
    let { total_amt } = renderAmtUsed();
    total_amt = Number(reduceAmtUsingCoupon) + total_amt;
    const token = `Token ${localStorage.getItem("user")}`;
    const userid = `${props.userDetails.id}`;
    props
      .couponApply({
        token: token,
        coupon: props.couponResult.coupon_code,
        userid: userid,
      })
      .then((res) => {
        setapplycouponLoader(false);
      })
      .catch((err) => {
        setapplycouponLoader(false);
      });

    let couponAmount, redeemPercent, redeemAmount;
    if (props.couponResult.min_value > Math.round(total_amt)) {
      setopen(true);
      redeemAmount = 0;
      setreduceAmtUsingCoupon(redeemAmount);
    } else {
      if (props.couponResult.type == 2) {
        couponAmount = props.couponResult.type_value;
        redeemAmount = Math.round((Math.round(total_amt) * couponAmount) / 100);

        if (redeemAmount > props.couponResult.amount_upto) {
          redeemAmount = Math.round(props.couponResult.amount_upto);
        }

        if (props.couponResult.coupon_type == 2) {
          setreduceAmtUsingCoupon(redeemAmount);
          props.apply_couponcode(redeemAmount);
        }
      } else {
        redeemAmount = props.couponResult.type_value;
        if (props.couponResult.coupon_type == 2) {
          setreduceAmtUsingCoupon(redeemAmount);
          props.apply_couponcode(redeemAmount);
        }
      }
      // alert(Math.round(redeemAmount))
      props.redeemCouponAction({ couponamount: Math.round(redeemAmount) });
    }

    return redeemAmount;
    /* The code is using the `Math.round()` function to round the value of the variable
    `redeemAmount` to the nearest integer and then displaying the rounded value in an alert dialog
    box. */
  };

  const handleOnclickCouponbtn = () => {
    // alert("hi" + props.appliedcoupon);
    if (props.appliedcoupon) return;
    let couponAmount, redeemPercent, redeemAmount;
    const { total_amt } = renderAmtUsed();
    if (props.couponResult.min_value > Math.round(total_amt)) {
      setopen(true);
    } else {
      if (props.couponResult.type == 2) {
        couponAmount = props.couponResult.type_value;
        redeemAmount = Math.round((Math.round(total_amt) * couponAmount) / 100);

        if (redeemAmount > props.couponResult.amount_upto) {
          redeemAmount = Math.round(props.couponResult.amount_upto);
        }

        if (props.couponResult.coupon_type == 2) {
          setreduceAmtUsingCoupon(redeemAmount);
          props.apply_couponcode(redeemAmount);
        }
      } else {
        redeemAmount = props.couponResult.type_value;

        if (props.couponResult.coupon_type == 2) {
          setreduceAmtUsingCoupon(redeemAmount);
          props.apply_couponcode(redeemAmount);
        }
      }
      props.redeemCouponAction({ couponamount: Math.round(redeemAmount) });
    }
  };
  const HandleOnChangeApplycoupon = (e) => {
    e.preventDefault();

    setcoupon(e.target.value.toUpperCase());
    const token = `Token ${localStorage.getItem("user")}`;
    const userid = `${props.userDetails.id}`;
    if (6 <= e.target.value.length && e.target.value.length <= 10) {
      setapplycouponLoader(true);
      props
        .couponApply({
          token: token,
          coupon: e.target.value,
          userid: userid,
        })
        .then((res) => {
          setapplycouponLoader(false);
        })
        .catch((err) => {
          setapplycouponLoader(false);
        });
    } else {
      props.resetCoupon();
      setreduceAmtUsingCoupon(0);
    }
  };
  const address_selected_tab = async () => {
    if (selectedAddress) {
      if (selectedAddress.is_primary == "Y") {
        setValue("2");
        Router.push(`?tabvalue=2`, undefined, { shallow: true });
      } else {
        const address = {
          data: {
            address_id: selectedAddress.address_id,
            title: selectedAddress.title,
            rec_name: selectedAddress.rec_name,
            address: selectedAddress.address,
            landmark: selectedAddress.landmark,
            phone_no: selectedAddress.phone_no,
            alt_phone_no: selectedAddress.alt_phone_no,
            pincode: selectedAddress.pincode,
            city_name: selectedAddress.city_name,
            state_name: selectedAddress.state_name,
            country_name: "IND",
            is_primary: "Y",
          },
        };
        const token = `Token ${props.userToken}`;
        let res = await props.EdituserAddressAction(token, address);
        if (res) {
          props.Getaddress("");
          setValue("2");
          Router.push(`?tabvalue=2`, undefined, { shallow: true });
        }
      }
    } else {
      if (props.getadd.length != 0) {
        enqueueSnackbar("Please Select a address", {
          variant: "warning",
        });
      }
      setShowDialog(true);
    }
  };

  const copyCoupons = (value) => {
    setcoupon(value);
    props.resetCoupon();
    setreduceAmtUsingCoupon(0);
    const token = `Token ${localStorage.getItem("user")}`;
    const userid = `${props.userDetails.id}`;

    if (6 <= value.length && value.length <= 10) {
      setapplycouponLoader(true);
      props
        .couponApply({
          token: token,
          coupon: value,
          userid: userid,
        })
        .then((res) => {
          setapplycouponLoader(false);
        })
        .catch((err) => {
          setapplycouponLoader(false);
        });
    } else {
      props.resetCoupon();
      setreduceAmtUsingCoupon(0);
    }
    setisviewCoupon(false);
  };

  const RenderCouponResponse = () => {
    if (coupon.length <= 5 && coupon) {
      return "invalid coupon";
    } else if (props.couponResponse) {
      return props.couponResponse;
    } else {
      return null;
    }
  };

  const handlepayment3rd_partySelectDiv = (party_type) => {
    if (!generatingOrderId) {
      if (party_type == "Cashfree") {
        // Router.replace("?tabvalue=3&pay=cfp", undefined, { shallow: true });
      }
      setprepaid3rd_partySelected(party_type);
    }
  };

  const Click_savelater = async (cart) => {
    const data = {
      save_later: "1",
    };
    setofferbookloader(true);
    let res = await props.RemoveCart(cart.Cart_id, cart.bookInvId, data);
    if (res) {
      enqueueSnackbar(`${cart.bookName} has been Saved For Later.`, {
        variant: "success",
      });
      props.SaveLater();

      props.CartSession().then((res) => {
        let user = JSON.parse(localStorage.getItem("user_info"));

        props.offeredbook({ id: user.id }).then((res) => {
          setofferbookloader(false);
        });
        if (props.ItemsInCart - 1 == 0) {
          window.location.replace("/view-cart");
        }

        window.scrollTo(0, 0);
      });
    }
  };
  const calculateBookCoinsUsed = (
    all_books_price,
    newBookPrice,
    oldBookPrice
  ) => {
    let useBookCoins = 0;
    let bookCoinsUserHave = props.bookcoins;
    let bookCoinsCanBeUsed = 0;
    if (!bookCoinsUserHave || !applyBookcoinsSelected) {
      return 0;
    }
    if (newBookPrice) {
      if (all_books_price > min_prepaid_order_value && oldBookPrice) {
        if (newBookPrice > min_prepaid_order_value) {
          bookCoinsCanBeUsed = oldBookPrice;
        } else {
          bookCoinsCanBeUsed =
            oldBookPrice - (min_prepaid_order_value - newBookPrice);
        }
      } else {
      }
    } else {
      if (oldBookPrice > min_prepaid_order_value) {
        bookCoinsCanBeUsed = oldBookPrice - min_prepaid_order_value;
      }
    }
    if (bookCoinsUserHave >= bookCoinsCanBeUsed) {
      useBookCoins = bookCoinsCanBeUsed;
    } else {
      useBookCoins = bookCoinsUserHave;
    }
    if (useBookCoins < 1) {
      setapplyBookcoinsSelected(false);
    }
    return useBookCoins;
  };
  const Make3rdPartyPayment = async ({ prepaidOrderDetails, token }) => {
    let res = await props.OrderDetails(prepaidOrderDetails, token);
    // console.log("327==", res);

    if (res) {
      let place_order_id = res.order_id;
      setOrderId(place_order_id);
      if (renderAmtUsed().offer_book_cost) {
        const token = `Token ${props.userToken}`;
        const orderid = place_order_id;
        const id = props.offerBook.id;
        // alert("getoffer")

        // props.orderOfferBook({ token, orderid, id });
      }
      Trigger3rdParty(
        {
          prepaidOrderDetails,
          thirdParty_order_id: res.genrated_id,
        },
        1,
        res
      );
    } else {
      Router.push("/");
      let Err_msg = "Sorry Your Order Was Not Placed ";
      if (props.OutOfStockBooks.length) {
        Err_msg = Err_msg + "Please Remove The Out Of Stock Books";
        setopenRemoveOutStockDialog(true);
      }
      setconfirmOrder(false);
      setShowOrderCreationErr(true);
      setOrderErrMsg(Err_msg);
      setgeneratingOrderId(false);
    }
  };

  const Trigger3rdParty = async (
    { prepaidOrderDetails, thirdParty_order_id },
    wallet_3rd_party = 0,
    res
  ) => {
    let passTorzpay = Math.round(prepaidOrderDetails.data.amount) * 100;
    let passToCashfree = Math.round(prepaidOrderDetails.data.amount);
    if (wallet_3rd_party) {
      if (prepaidOrderDetails.data.wallet_used) {
        passTorzpay =
          (prepaidOrderDetails.data.amount -
            Number(prepaidOrderDetails.data.wallet_used)) *
          100;

        passToCashfree =
          prepaidOrderDetails.data.amount -
          Number(prepaidOrderDetails.data.wallet_used);
      }
    }
    const SendDataRzpzy = {
      data: {
        ref_id: props.OrderId,
        amount: passTorzpay,
      },
    };
    if (prepaid3rd_partySelected == "Razorpay") {
      props
        .get_razorpay_key()
        .then((res) => {
          setrazorpay_key(res.result);
        })
        .catch((err) => {
          // console.log(err, "rzpaykey");
        });
      RazorpayPayment(
        {
          prepaidOrderDetails,
          passTorzpay,
          thirdParty_order_id,
        },
        res
      );
      setgeneratingOrderId(false);
      // }
    }

    if (prepaid3rd_partySelected == "Cashfree") {
      const token = localStorage.getItem("user");
      let WalletOrderId = res.order_id;
      let order_amount = passToCashfree;
      let body = {
        orderId: res.order_id,
        orderAmount: order_amount,
        return_url: "",
        user_phone: props.Selectedphone_no,
        user_email: props.UserEmail,
      };
      let cashfreeRes = await props.Get_CashFree_Signature_Wallet({
        token,
        body,
      });
      // console.log(cashfreeRes);
      cashfreePayment(
        {
          prepaidOrderDetails,
          passToCashfree,
          cashfreeRes,
        },
        res
      );
    }
  };

  const RazorpayPayment = (
    { prepaidOrderDetails, passTorzpay, thirdParty_order_id },
    res
  ) => {
    const topayorder_id = res.order_id;
    // ***********************RAZORPAY PART********************************
    const options = {
      // key: "rzp_live_pvrJGzjDkVei3G", //Paste your API key here before clicking on the Pay Button.
      // "key": "rzp_test_jxY6Dww4U2KiSA",
      key: "rzp_live_cNDMU35KKMCp6t", //Paste your API key here before clicking on the Pay Button.

      amount: passTorzpay,
      // amount: 100,
      name: `Mypustak.com`,
      description: `Total No of Books ${prepaidOrderDetails.data.no_of_book}`,
      "Order Id": `${topayorder_id}`, //Razorpay Order id
      currency: "INR",
      prefill: {
        contact: `${props.Selectedphone_no}`,
        email: `${props.UserEmail}`,
      },

      notes: {
        "Order Id": topayorder_id, //"order_id": "your_order_id", // Our Order id
      },
      theme: {
        color: "#2248ae",
        emi_mode: true,
      },

      handler: (response) => {
        setgeneratingOrderId(true);
        setconfirmOrder(true);
        setWaitPlacingOrder(true);

        const razorpay_payment_id = response.razorpay_payment_id;
        let AllbookId = [];
        let AllbookInvId = [];
        let AllrackNo = [];
        let AllQty = [];

        props.cartDetails.map((book, index) => {
          AllbookId.push(`${book.bookId}`);
          AllbookInvId.push(book.bookInvId);
          AllrackNo.push(book.bookRackNo);
          AllQty.push(book.bookQty);
        });

        let set_payusing = "razorpay";
        if (props.cashback) {
          set_payusing = "razorpay + cashback";
          if (WalletSelected && applyBookcoinsSelected) {
            set_payusing = "razorpay + cashback + wallet + BookCoins";
          } else if (WalletSelected && props.walletbalance != 0) {
            set_payusing = "razorpay + cashback + wallet";
          } else if (applyBookcoinsSelected && props.bookcoins > 0) {
            set_payusing = "razorpay + cashback + BookCoins";
          } else {
          }
        } else if (WalletSelected && applyBookcoinsSelected) {
          set_payusing = "razorpay + wallet + BookCoins";
        } else {
          if (WalletSelected && props.walletbalance > 0) {
            set_payusing = "razorpay + wallet";
          } else if (applyBookcoinsSelected && props.bookcoins > 0) {
            set_payusing = "razorpay + BookCoins";
          } else {
          }
        }

        const SendData = {
          OrderId: topayorder_id,
          payment_id: razorpay_payment_id,
          payment_url: "https://razorpay.com/",
          book_id: AllbookId,
          book_inv_id: AllbookInvId,
          rack_no: AllrackNo,
          qty: AllQty,
          payusing: set_payusing,
        };

        let today = new Date();
        let date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        let time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        let dateTime = date + " " + time;
        const SendDataBookCoins = {
          user_id: `${props.UserId}`,
          user_email: `${props.UserEmail}`,
          transaction_id: `PaidBookCoins${Math.round(
            prepaidOrderDetails.data.bookcoins_used
          )}_${topayorder_id}`,
          deposit: 0,
          deducted_bookcoins: prepaidOrderDetails.data.bookcoins_used,
          added_bookcoins: 0,
          withdrawl: 0,
          payvia: "BookCoins",
          time: `${dateTime}`,
          comment: `Paid Using BookCoins For Order ${topayorder_id}`,
          added_by: `${props.UserEmail}`,
          order_id: topayorder_id,
          deducted_cashback: 0,
          added_cashback: 0,
        };
        props
          .updatePaymentIdOrder({ body: SendData, token: "" })
          .then((res) => {
            props.check_success(topayorder_id);
            if (props.cashback) {
              MakeCashbackAfterRazorpyPayment({
                prepaidOrderDetails,
                token: "",
              });
            } else if (WalletSelected && props.walletbalance != 0) {
              const SendDataWallet = {
                user_id: `${props.UserId}`,
                user_email: `${props.UserEmail}`,
                transaction_id: `PaidFromWallet${Math.round(
                  props.walletbalance
                )}_${topayorder_id}`,
                deposit: 0,
                deducted_bookcoins: 0,
                added_bookcoins: 0,
                withdrawl: Math.round(props.walletbalance),
                payvia: "wallet",
                time: `${dateTime}`,
                comment: `Paid From Wallet For Order ${topayorder_id}`,
                added_by: `${props.UserEmail}`,
                order_id: topayorder_id,
                deducted_cashback: 0,
                added_cashback: 0,
              };
              props
                .walletOrder({ body: SendDataWallet, token: "" })
                .then((res) => {
                  if (applyBookcoinsSelected && props.bookcoins > 0) {
                    props
                      .walletOrder({ body: SendDataBookCoins, token: "" })
                      .then((res) => {
                        RedirectToThankyou(topayorder_id);
                      })
                      .catch((err) => {
                        // console.log(err);
                        triggerErrorMsg();
                      });
                  } else {
                    RedirectToThankyou(topayorder_id);
                  }
                })
                .catch((err) => {
                  // console.log(err);

                  triggerErrorMsg();
                });
            } else {
              if (applyBookcoinsSelected) {
                // alert("bookcoin");
                props
                  .walletOrder({ body: SendDataBookCoins, token: "" })
                  .then((res) => {
                    RedirectToThankyou(topayorder_id);
                  })
                  .catch((err) => {
                    // console.log(err);

                    triggerErrorMsg();
                  });
              } else {
                RedirectToThankyou(topayorder_id);
              }
            }
          })
          .catch((err) => {
            // console.log({ err });
            triggerErrorMsg();
          });

        if (razorpay_payment_id.length === 0) {
          props.ShowRzPayErr();
        }
      },

      modal: {
        ondismiss: () => {
          setconfirmOrder(false);
        },
      },
    };

    let rzp1 = new window.Razorpay(options);
    rzp1.open();

    rzp1.on("payment.failed", (response) => {
      // console.log({ response });
    });
  };

  const cashfreePayment = (
    { prepaidOrderDetails, passToCashfree, cashfreeRes },
    res
  ) => {
    setCashfree_pgdialog(true);
    // console.log(cashfreeRes, "cashfreee");
    // console.log(cashfreeRes["signature"]["order_amount"], "cashfree");
    setgeneratingOrderId(true);
    // const topayorder_id = prepaidOrderDetails.data.order_id;
    let data = {};
    try {
      data.orderId = cashfreeRes["signature"]["order_id"];
      data.orderAmount = cashfreeRes["signature"]["order_amount"];
      data.customerName = props.UserEmail;
      data.customerPhone = props.Selectedphone_no;
      data.customerEmail = props.UserEmail;
      data.returnUrl = "";
      data.notifyUrl = `https://data.mypustak.com/api/v1/post/get_razorpayid/cashfree_verification`;
      data.appId = "1409353af95c0865ee8aaab46d539041"; // PROD 264572037bbcd2407554141f175462 TEST 833005ef95eda971610224230338

      // data.appId = "264572037bbcd2407554141f175462"; // PROD 264572037bbcd2407554141f175462 TEST 833005ef95eda971610224230338
      // appId="264572037bbcd2407554141f175462" # PROD 264572037bbcd2407554141f175462 TEST 833005ef95eda971610224230338
      // secretKey="be8f4792f30b1270c5786bcab289ffa5a6ac0e51" # PROD be8f4792f30b1270c5786bcab289ffa5a6ac0e51 TEST
      data.paymentToken = cashfreeRes.signature;

      const paymentSessionId = cashfreeRes["signature"]["payment_session_id"];

      const cashfree = new Cashfree(paymentSessionId);
      setWaitPlacingOrder(false);
      setconfirmOrder(false);
      // alert("1073 cashfree")
      cashfree.redirect();
      let parent = parentref.current;
    } catch (err) {
      // console.log(err, "error1080");
    }
  };
  const MakeWallet_3rdPartyPayment = async ({ prepaidOrderDetails, token }) => {
    let res = await props.OrderDetails(prepaidOrderDetails, token);
    if (res) {
      let place_order_id = res.order_id;
      setOrderId(place_order_id);
      if (renderAmtUsed().offer_book_cost) {
        const token = `Token ${props.userToken}`;
        const orderid = place_order_id;
        const id = props.offerBook.id;
        // props.orderOfferBook({ token, orderid, id });
      }
      Trigger3rdParty({ prepaidOrderDetails }, 1, res);
    } else {
      let Err_msg = "Sorry Your Order Was Not Placed ";
      if (props.OutOfStockBooks && props.OutOfStockBooks.length) {
        Err_msg = Err_msg + "Please Remove The Out Of Stock Books";
        setopenRemoveOutStockDialog(true);
      }

      setconfirmOrder(false);
      setShowOrderCreationErr(true);
      setOrderErrMsg(Err_msg);
      setgeneratingOrderId(false);
    }
  };

  const MakeWalletPayment = async ({ prepaidOrderDetails, token }) => {
    setWaitPlacingOrder(true);
    setconfirmOrder(true);
    let res = await props.OrderDetails(prepaidOrderDetails, token);
    if (res) {
      let place_order_id = res.order_id;
      setOrderId(place_order_id);
      if (renderAmtUsed().offer_book_cost) {
        const token = `Token ${props.userToken}`;
        const orderid = place_order_id;
        const id = props.offerBook.id;
        // props.orderOfferBook({ token, orderid, id });
      }
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + " " + time;

      let walletBody = {
        user_id: `${props.userDetails.id}`,
        user_email: `${props.UserEmail}`,
        transaction_id: `PaidFromWallet${prepaidOrderDetails.data.wallet_used}_${place_order_id}`,
        deposit: 0,
        withdrawl: prepaidOrderDetails.data.wallet_used,
        payvia: "wallet",
        time: `${dateTime}`,
        comment: `Paid From Wallet For Order ${place_order_id}`,
        deducted_bookcoins: 0,
        added_bookcoins: 0,
        added_by: `${props.UserEmail}`,
        order_id: place_order_id,

        deducted_cashback: 0,
        added_cashback: 0,
      };
      props
        .walletOrder({ body: walletBody, token })
        .then((res) => {
          let BookCoinsBody = {
            user_id: `${props.userDetails.id}`,
            user_email: `${props.UserEmail}`,
            transaction_id: `PaidBookCoins${Math.round(
              prepaidOrderDetails.data.bookcoins_used
            )}_${place_order_id}`,
            deposit: 0,
            withdrawl: 0,
            payvia: "BookCoins",
            time: `${dateTime}`,
            comment: `Paid From BookCoins For Order ${place_order_id}`,
            deducted_bookcoins: prepaidOrderDetails.data.bookcoins_used,
            added_bookcoins: 0,
            added_by: `${props.UserEmail}`,
            // order_id: props.OrderId,
            order_id: place_order_id,

            deducted_cashback: 0,
            added_cashback: 0,
          };

          const SendData = {
            OrderId: place_order_id,
            payment_url: "prepaid",
            book_id: prepaidOrderDetails.data.book_id,
            book_inv_id: prepaidOrderDetails.data.book_inv_id,
            rack_no: prepaidOrderDetails.data.rack_no,
            qty: prepaidOrderDetails.data.qty,
            payusing: applyBookcoinsSelected ? "wallet +BookCoins" : "wallet",
            // payment_id: props.OrderId,
            payment_id: place_order_id,
          };

          if (applyBookcoinsSelected) {
            props
              .walletOrder({
                body: BookCoinsBody,
                token,
              })
              .then((res) => {
                props
                  .updatePaymentIdOrder({
                    body: SendData,
                    token,
                  })
                  .then((res) => {
                    // alert("thankupage --- 1144");
                    RedirectToThankyou(place_order_id);
                  })
                  .catch((err) => {
                    // console.log(err);

                    triggerErrorMsg();
                  });
              })
              .catch((err) => {
                console.log(err);

                triggerErrorMsg();
              });
          } else {
            props
              .updatePaymentIdOrder({
                body: SendData,
                token,
              })
              .then((res) => {
                RedirectToThankyou(place_order_id);
              })
              .catch((err) => {
                // console.log(err);

                triggerErrorMsg();
              });
          }
        })
        .catch((err) => {
          // console.log(err);
          let Err_msg = "Sorry Your Order Was Not Placed ";
          setconfirmOrder(false);

          setShowOrderCreationErr(true);
          setOrderErrMsg(Err_msg);
          setgeneratingOrderId(false);
        });
    } else {
      let Err_msg = "Sorry Your Order Was Not Placed ";
      if (props.OutOfStockBooks.length) {
        Err_msg = Err_msg + "Please Remove The Out Of Stock Books";
        setopenRemoveOutStockDialog(true);
      }

      setconfirmOrder(false);
      setShowOrderCreationErr(true);
      setOrderErrMsg(Err_msg);
      setgeneratingOrderId(false);
    }
  };

  // for Only Cashback Payment
  const MakeCashbackPayment = async ({ prepaidOrderDetails, token }) => {
    setWaitPlacingOrder(true);
    setconfirmOrder(true);
    let res = await props.OrderDetails(prepaidOrderDetails, token);
    if (res) {
      let place_order_id = res.order_id;
      setOrderId(place_order_id);
      if (renderAmtUsed().offer_book_cost) {
        const token = `Token ${props.userToken}`;
        const orderid = place_order_id;
        const id = props.offerBook.id;
        // props.orderOfferBook({ token, orderid, id });
      }
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + " " + time;

      const cashbackBody = {
        user_id: `${props.userDetails.id}`,
        user_email: `${props.UserEmail}`,
        transaction_id: `PaidFromCashback${prepaidOrderDetails.data.cashback_used}_${place_order_id}`,
        deposit: 0,
        withdrawl: 0,
        payvia: "cashback",
        time: `${dateTime}`,
        comment: `Paid From Wallet For Order ${place_order_id}`,
        deducted_bookcoins: 0,
        added_bookcoins: 0,
        added_by: `${props.UserEmail}`,
        order_id: place_order_id,

        deducted_cashback: prepaidOrderDetails.data.cashback_used,
        added_cashback: 0,
      };

      const walletBody = {
        user_id: `${props.userDetails.id}`,
        user_email: `${props.UserEmail}`,
        transaction_id: `PaidFromWallet${prepaidOrderDetails.data.wallet_used}_${place_order_id}`,
        deposit: 0,
        withdrawl: prepaidOrderDetails.data.wallet_used,
        payvia: "wallet",
        time: `${dateTime}`,
        comment: `Paid From Wallet For Order ${place_order_id}`,
        deducted_bookcoins: 0,
        added_bookcoins: 0,
        added_by: `${props.UserEmail}`,
        order_id: place_order_id,
        deducted_cashback: 0,
        added_cashback: 0,
      };

      props
        .walletOrder({ body: cashbackBody, token })
        .then((res) => {
          let BookCoinsBody = {
            user_id: `${props.userDetails.id}`,
            user_email: `${props.UserEmail}`,
            transaction_id: `PaidBookCoins${Math.round(
              prepaidOrderDetails.data.bookcoins_used
            )}_${place_order_id}`,
            deposit: 0,
            withdrawl: 0,
            payvia: "BookCoins",
            time: `${dateTime}`,
            comment: `Paid From BookCoins For Order ${place_order_id}`,
            deducted_bookcoins: prepaidOrderDetails.data.bookcoins_used,
            added_bookcoins: 0,
            added_by: `${props.UserEmail}`,
            order_id: place_order_id,
            deducted_cashback: 0,
            added_cashback: 0,
          };

          const SendData = {
            OrderId: place_order_id,
            payment_url: "prepaid",
            book_id: prepaidOrderDetails.data.book_id,
            book_inv_id: prepaidOrderDetails.data.book_inv_id,
            rack_no: prepaidOrderDetails.data.rack_no,
            qty: prepaidOrderDetails.data.qty,
            payusing: prepaidOrderDetails.data.payusing,
            payment_id: place_order_id,
          };

          if (prepaidOrderDetails.data.wallet_used) {
            props
              .walletOrder({
                body: walletBody,
                token,
              })
              .then((res) => {
                if (applyBookcoinsSelected) {
                  props
                    .walletOrder({
                      body: BookCoinsBody,
                      token,
                    })
                    .then((res) => {
                      props
                        .updatePaymentIdOrder({
                          body: SendData,
                          token,
                        })
                        .then((res) => {
                          RedirectToThankyou(place_order_id);
                        })
                        .catch((err) => {
                          // console.log(err);

                          triggerErrorMsg();
                        });
                    })
                    .catch((err) => {
                      console.log(err);

                      triggerErrorMsg();
                    });
                } else {
                  // For Updating OrderDetail
                  props
                    .updatePaymentIdOrder({
                      body: SendData,
                      token,
                    })
                    .then((res) => {
                      RedirectToThankyou(place_order_id);
                    })
                    .catch((err) => {
                      // console.log(err);

                      triggerErrorMsg();
                    });
                }
              })
              .catch((err) => {
                // console.log(err);

                triggerErrorMsg();
              });
          } else {
            if (applyBookcoinsSelected) {
              props
                .walletOrder({
                  body: BookCoinsBody,
                  token,
                })
                .then((res) => {
                  props
                    .updatePaymentIdOrder({
                      body: SendData,
                      token,
                    })
                    .then((res) => {
                      RedirectToThankyou(place_order_id);
                    })
                    .catch((err) => {
                      // console.log(err);

                      triggerErrorMsg();
                    });
                })
                .catch((err) => {
                  console.log(err);

                  triggerErrorMsg();
                });
            } else {
              props
                .updatePaymentIdOrder({
                  body: SendData,
                  token,
                })
                .then((res) => {
                  RedirectToThankyou(place_order_id);
                })
                .catch((err) => {
                  // console.log(err);

                  triggerErrorMsg();
                });
            }
          }
        })
        .catch((err) => {
          let Err_msg = "Sorry Your Order Was Not Placed ";
          setconfirmOrder(false);
          setShowOrderCreationErr(true);
          setOrderErrMsg(Err_msg);
          setgeneratingOrderId(false);
        });
    } else {
      let Err_msg = "Sorry Your Order Was Not Placed ";
      if (props.OutOfStockBooks.length) {
        Err_msg = Err_msg + "Please Remove The Out Of Stock Books";
        // setState({ openRemoveOutStockDialog: true });
        setopenRemoveOutStockDialog(true);
      }
      setconfirmOrder(false);
      setShowOrderCreationErr(true);
      setOrderErrMsg(Err_msg);
      setgeneratingOrderId(false);
    }
  };

  const MakeCashbackAfterRazorpyPayment = async ({
    prepaidOrderDetails,
    token,
  }) => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    const cashbackBody = {
      user_id: `${props.userDetails.id}`,
      user_email: `${props.UserEmail}`,
      transaction_id: `PaidFromCashback${prepaidOrderDetails.data.cashback_used}_${props.OrderId}`,
      deposit: 0,
      withdrawl: 0,
      payvia: "cashback",
      time: `${dateTime}`,
      comment: `Paid From Wallet For Order ${props.OrderId}`,
      deducted_bookcoins: 0,
      added_bookcoins: 0,
      added_by: `${props.UserEmail}`,
      order_id: props.OrderId,
      deducted_cashback: prepaidOrderDetails.data.cashback_used,
      added_cashback: 0,
    };

    const walletBody = {
      user_id: `${props.userDetails.id}`,
      user_email: `${props.UserEmail}`,
      transaction_id: `PaidFromWallet${prepaidOrderDetails.data.wallet_used}_${props.OrderId}`,
      deposit: 0,
      withdrawl: prepaidOrderDetails.data.wallet_used,
      payvia: "wallet",
      time: `${dateTime}`,
      comment: `Paid From Wallet For Order ${props.OrderId}`,
      deducted_bookcoins: 0,
      added_bookcoins: 0,
      added_by: `${props.UserEmail}`,
      order_id: props.OrderId,
      deducted_cashback: 0,
      added_cashback: 0,
    };

    props
      .walletOrder({ body: cashbackBody, token })
      .then((res) => {
        let BookCoinsBody = {
          user_id: `${props.userDetails.id}`,
          user_email: `${props.UserEmail}`,
          transaction_id: `PaidBookCoins${Math.round(
            prepaidOrderDetails.data.bookcoins_used
          )}_${props.OrderId}`,
          deposit: 0,
          withdrawl: 0,
          payvia: "BookCoins",
          time: `${dateTime}`,
          comment: `Paid From BookCoins For Order ${props.OrderId}`,
          deducted_bookcoins: prepaidOrderDetails.data.bookcoins_used,
          added_bookcoins: 0,
          added_by: `${props.UserEmail}`,
          order_id: props.OrderId,
          deducted_cashback: 0,
          added_cashback: 0,
        };

        const SendData = {
          OrderId: props.OrderId,
          payment_url: "prepaid",
          book_id: prepaidOrderDetails.data.book_id,
          book_inv_id: prepaidOrderDetails.data.book_inv_id,
          rack_no: prepaidOrderDetails.data.rack_no,
          qty: prepaidOrderDetails.data.qty,
          payusing: prepaidOrderDetails.data.payusing,
          payment_id: props.OrderId,
        };

        if (prepaidOrderDetails.data.wallet_used) {
          props
            .walletOrder({
              body: walletBody,
              token,
            })
            .then((res) => {
              if (applyBookcoinsSelected) {
                props
                  .walletOrder({
                    body: BookCoinsBody,
                    token,
                  })
                  .then((res) => {
                    RedirectToThankyou();
                  })
                  .catch((err) => {
                    // console.log(err);

                    triggerErrorMsg();
                  });
              } else {
                // For Updating OrderDetail

                RedirectToThankyou();
              }
            })
            .catch((err) => {
              // console.log(err);

              triggerErrorMsg();
            });
        } else {
          if (applyBookcoinsSelected) {
            props
              .walletOrder({
                body: BookCoinsBody,
                token,
              })
              .then((res) => {
                RedirectToThankyou();
              })
              .catch((err) => {
                // console.log(err);

                triggerErrorMsg();
              });
          } else {
            RedirectToThankyou();
          }
        }
      })
      .catch((err) => {
        let Err_msg = "Sorry Your Order Was Not Placed ";
        setconfirmOrder(false);
        setShowOrderCreationErr(true);
        setOrderErrMsg(Err_msg);
        setgeneratingOrderId(false);
      });
  };

  const MakePayment = () => {
    props.SetWallet();
    calculateCartDeatils(paymentType);
    if (props.SelectedAddress == 0) {
      return;
    }
    setconfirmOrder(true);
    const token = `Token ${props.userToken}`;

    let AllbookId = [];
    let AllbookInvId = [];
    let AllrackNo = [];
    let AllQty = [];
    let AllBookPrice = [];
    let AllDeliveryCost = [];
    let AllDiscountper = [];
    let AllCashbackper = [];
    let AllDiscountedPrice = [];
    let AllCashbackedPrice = [];
    let AllShippingCost = [];
    let AllOffers = [];
    let AllBook_Thumb = [];
    let cod_charge = 0;
    let total_cod_amount = 0;
    let ShowpepaidBookCoinsCanBeUsed = 0;
    let booksAndDeliverPrice = 0;
    props.cartDetails.map((book, index) => {
      // console.log(book, "1645");
      AllbookId.push(`${book.bookId}`);
      AllbookInvId.push(book.bookInvId);
      AllrackNo.push(book.bookRackNo);
      AllQty.push(book.bookQty);
      AllBookPrice.push(book.bookPrice);
      AllDeliveryCost.push(book.delivery_cost);
      if (book.discount_per) {
        AllDiscountper.push(book.discount_per);
      } else {
        AllDiscountper.push(0);
      }
      if (book.cashback_per) {
        AllCashbackper.push(book.cashback_per);
      } else {
        AllCashbackper.push(0);
      }
      if (book.discount) {
        AllDiscountedPrice.push(book.discount);
      } else {
        AllDiscountedPrice.push(0);
      }
      if (book.cashback) {
        AllCashbackedPrice.push(book.cashback);
      } else {
        AllCashbackedPrice.push(0);
      }
      AllShippingCost.push(book.bookShippingCost);
      AllOffers.push(book.offertype);
      AllBook_Thumb.push(book.bookThumb);
    });

    const { all_books_price, oldBookPrice, newBookPrice, newBookDeliveryCost } =
      fetchcalculatedAllBookPrice();
    booksAndDeliverPrice = all_books_price + newBookDeliveryCost;
    const {
      phone_no,
      pincode,
      address,
      city_name,
      landmark,
      state_name,
      country_name,
      is_address_verified,
      rec_name,
    } = props.SelectedAddress;

    let OrderPayload = {
      data: {
        // no_of_book: props.ItemsInCart,
        no_of_book:
          getBookQty().oldQty + getBookQty().newQty + getBookQty().notebookQty,

        billing_add_id: props.AddresId,
        shipping_add_id: props.AddresId,
        qty: AllQty,
        book_id: AllbookId,
        book_inv_id: AllbookInvId,
        rack_no: AllrackNo,
        bookPrice: AllBookPrice,
        offertype: AllOffers,
        book_thumb: AllBook_Thumb,
        rec_name,
        pincode,
        address,
        landmark,
        city_name,
        country_name,
        state_name,
        is_address_verified,
        phone_no,
        delivery_charge_newbooks: newBookDeliveryCost,
        net_amount: renderAmtUsed().actual_book_charges,
      },
    };

    if (reduceAmtUsingCoupon) {
      booksAndDeliverPrice = booksAndDeliverPrice - reduceAmtUsingCoupon;
    }
    if (paymentType == "cod") {
      if (
        cod_charge_api + all_books_price + newBookDeliveryCost >=
        min_cod_order_value
      ) {
        cod_charge = cod_charge_api;
        total_cod_amount = cod_charge + all_books_price + newBookDeliveryCost;
      } else {
        cod_charge = cod_charge_api;
        total_cod_amount = min_cod_order_value;
      }

      OrderPayload.data.payusing = paymentType;
      OrderPayload.data.amount = total_cod_amount;
      OrderPayload.data.cod_charge = cod_charge;
      OrderPayload.data.deliveryCost = AllDeliveryCost;
      OrderPayload.data.cashBackper = AllCashbackper;
      OrderPayload.data.discountper = AllDiscountper;
      OrderPayload.data.discountedPrice = AllDiscountedPrice;
      OrderPayload.data.cashbackedPrice = AllCashbackedPrice;
      OrderPayload.data.userPay = AllShippingCost;
      OrderPayload.data.bookcoins_used = ShowpepaidBookCoinsCanBeUsed;
      OrderPayload.data.third_party_amt = 0;

      const cartData = {
        bookShippingCost: booksAndDeliverPrice,
        totalPayment: OrderPayload.data.amount,
        CashCollection: cod_charge,
        paytype: "cod",
      };

      props.AddPriceCart(cartData);
      setUserAmount(OrderPayload.data.amount);
      setgeneratingOrderId(true);
      setWaitPlacingOrder(true);
      setconfirmOrder(true);
      // console.log(OrderPayload, "OrderPayloadCOD");
      MakeCodPayment({ codOrderDetails: OrderPayload, token: token });
    } else {
      if (all_books_price < min_prepaid_order_value) {
        booksAndDeliverPrice = min_prepaid_order_value + newBookDeliveryCost;
      }

      if (paymentType == "prepaid" && !WalletSelected && !props.cashback) {
        ShowpepaidBookCoinsCanBeUsed = calculateBookCoinsUsed(
          booksAndDeliverPrice,
          newBookPrice,
          oldBookPrice
        );
        let payment_payusing = paymentType;
        if (prepaid3rd_partySelected == "Razorpay") {
          payment_payusing = "prepaid_R";
        }
        if (prepaid3rd_partySelected == "Cashfree") {
          payment_payusing = "prepaid_C";
        }
        OrderPayload.data.payusing = payment_payusing;
        OrderPayload.data.amount =
          booksAndDeliverPrice - ShowpepaidBookCoinsCanBeUsed;
        if (props.cashback > 0) {
          OrderPayload.data.third_party_amt =
            booksAndDeliverPrice -
            ShowpepaidBookCoinsCanBeUsed -
            props.cashback;
        } else {
          OrderPayload.data.third_party_amt =
            booksAndDeliverPrice - ShowpepaidBookCoinsCanBeUsed;
        }
        OrderPayload.data.cod_charge = cod_charge;
        OrderPayload.data.deliveryCost = AllDeliveryCost;
        OrderPayload.data.cashBackper = AllCashbackper;
        OrderPayload.data.discountper = AllDiscountper;
        OrderPayload.data.discountedPrice = AllDiscountedPrice;
        OrderPayload.data.cashbackedPrice = AllCashbackedPrice;
        OrderPayload.data.userPay = AllShippingCost;
        OrderPayload.data.bookcoins_used = ShowpepaidBookCoinsCanBeUsed;
        OrderPayload.data.coupon_id = props.couponResult.coupon_code;
        OrderPayload.data.coupon_type = props.couponResult.coupon_type;
        OrderPayload.data.coupon_amount = props.redeemcoupon;
        OrderPayload.data.cashback_used = props.cashback;
        setUserAmount(booksAndDeliverPrice - ShowpepaidBookCoinsCanBeUsed);
        setgeneratingOrderId(true);
        Make3rdPartyPayment({
          prepaidOrderDetails: OrderPayload,
          token: token,
        });
      } else if (
        paymentType == "prepaid" &&
        WalletSelected &&
        !props.cashback
      ) {
        // For  Api Call third party gateway + Mypustak Wallet
        ShowpepaidBookCoinsCanBeUsed = calculateBookCoinsUsed(
          booksAndDeliverPrice,
          newBookPrice,
          oldBookPrice
        );
        let payment_payusing = paymentType;
        if (prepaid3rd_partySelected == "Razorpay") {
          payment_payusing = "prepaid_R";
        }
        if (prepaid3rd_partySelected == "Cashfree") {
          payment_payusing = "prepaid_C";
        }
        OrderPayload.data.payusing = payment_payusing;
        OrderPayload.data.amount =
          booksAndDeliverPrice - ShowpepaidBookCoinsCanBeUsed;
        OrderPayload.data.cod_charge = cod_charge;
        OrderPayload.data.deliveryCost = AllDeliveryCost;
        OrderPayload.data.cashBackper = AllCashbackper;
        OrderPayload.data.discountper = AllDiscountper;
        OrderPayload.data.discountedPrice = AllDiscountedPrice;
        OrderPayload.data.cashbackedPrice = AllCashbackedPrice;
        OrderPayload.data.userPay = AllShippingCost;
        OrderPayload.data.bookcoins_used = ShowpepaidBookCoinsCanBeUsed;
        OrderPayload.data.coupon_id = props.couponResult.coupon_code;
        OrderPayload.data.coupon_type = props.couponResult.coupon_type;
        OrderPayload.data.coupon_amount = props.redeemcoupon;
        OrderPayload.data.cashback_used = props.cashback;
        let user_only_wallet =
          props.walletbalance <
            booksAndDeliverPrice - ShowpepaidBookCoinsCanBeUsed
            ? 0
            : 1;

        let booksPriceWithBookCoins =
          booksAndDeliverPrice - ShowpepaidBookCoinsCanBeUsed;
        OrderPayload.data.wallet_used = fetchDeductedWalletAmt(
          booksPriceWithBookCoins
        );
        if (props.cashback > 0) {
          OrderPayload.data.third_party_amt =
            booksAndDeliverPrice -
            ShowpepaidBookCoinsCanBeUsed -
            props.cashback -
            OrderPayload.data.wallet_used;
        } else {
          OrderPayload.data.third_party_amt =
            booksAndDeliverPrice -
            ShowpepaidBookCoinsCanBeUsed -
            OrderPayload.data.wallet_used;
        }
        if (user_only_wallet) {
          // console.log('[process]only wallet');
          OrderPayload.data.payusing = "wallet";
          // alert(ShowpepaidBookCoinsCanBeUsed + "--1852");
          if (ShowpepaidBookCoinsCanBeUsed) {
            OrderPayload.data.payusing = "wallet+BookCoins";
          }
          setgeneratingOrderId(true);
          MakeWalletPayment({
            prepaidOrderDetails: OrderPayload,
            token: token,
          });
        } else {
          setgeneratingOrderId(true);
          MakeWallet_3rdPartyPayment({
            prepaidOrderDetails: OrderPayload,
            token: token,
          });
        }
      } else if (paymentType == "prepaid" && props.cashback) {
        ShowpepaidBookCoinsCanBeUsed = calculateBookCoinsUsed(
          booksAndDeliverPrice,
          newBookPrice,
          oldBookPrice
        );
        OrderPayload.data.payusing = "";
        OrderPayload.data.amount =
          booksAndDeliverPrice - ShowpepaidBookCoinsCanBeUsed - props.cashback;
        OrderPayload.data.cod_charge = cod_charge;
        OrderPayload.data.deliveryCost = AllDeliveryCost;
        OrderPayload.data.cashBackper = AllCashbackper;
        OrderPayload.data.discountper = AllDiscountper;
        OrderPayload.data.discountedPrice = AllDiscountedPrice;
        OrderPayload.data.cashbackedPrice = AllCashbackedPrice;
        OrderPayload.data.userPay = AllShippingCost;
        OrderPayload.data.bookcoins_used = ShowpepaidBookCoinsCanBeUsed;
        OrderPayload.data.coupon_id = props.couponResult.coupon_code;
        OrderPayload.data.coupon_type = props.couponResult.coupon_type;
        OrderPayload.data.coupon_amount = props.redeemcoupon;
        OrderPayload.data.cashback_used = props.cashback;
        OrderPayload.data.wallet_used = renderAmtUsed().deductWalletAmt;
        let user_only_cashback_wallet =
          booksAndDeliverPrice -
            ShowpepaidBookCoinsCanBeUsed -
            OrderPayload.data.wallet_used -
            props.cashback
            ? 0
            : 1;
        let booksPriceWithBookCoins =
          booksAndDeliverPrice - ShowpepaidBookCoinsCanBeUsed;

        if (props.cashback > 0) {
          OrderPayload.data.third_party_amt =
            booksAndDeliverPrice -
            ShowpepaidBookCoinsCanBeUsed -
            OrderPayload.data.wallet_used -
            props.cashback;
        } else {
          OrderPayload.data.third_party_amt =
            booksAndDeliverPrice -
            ShowpepaidBookCoinsCanBeUsed -
            OrderPayload.data.wallet_used;
        }
        if (user_only_cashback_wallet) {
          OrderPayload.data.payusing = "cashback";
          if (parseInt(OrderPayload.data.wallet_used)) {
            OrderPayload.data.payusing = "wallet+cashback";
          }

          if (
            ShowpepaidBookCoinsCanBeUsed &&
            int(OrderPayload.data.wallet_used)
          ) {
            OrderPayload.data.payusing = "wallet+cashback+bookcoins";
          }
          setgeneratingOrderId(true);
          MakeCashbackPayment({
            prepaidOrderDetails: OrderPayload,
            token: token,
          });
        } else {
          if (prepaid3rd_partySelected == "Razorpay") {
            OrderPayload.data.payusing = "prepaid_R";
          }
          if (prepaid3rd_partySelected == "Cashfree") {
            OrderPayload.data.payusing = "prepaid_C";
          }
          setgeneratingOrderId(true);
          MakeWallet_3rdPartyPayment({
            prepaidOrderDetails: OrderPayload,
            token: token,
          });
        }
      }
      // Saving Cart data in Reducer
      const cartData = {
        bookShippingCost: all_books_price,
        totalPayment: OrderPayload.data.amount,
        CashCollection: cod_charge,
        paytype: "prepaid",
      };
      props.AddPriceCart(cartData);
    }
  };

  // End of payment function
  const MakeCodPayment = async ({ codOrderDetails, token }) => {
    // alert("MAke COD")
    let resp = await props.OrderDetails(codOrderDetails, token);
    // console.log(resp, "ORDER DETAILS");
    if (resp) {
      let place_order_id = resp.order_id;
      setOrderId(place_order_id);
      if (renderAmtUsed().offer_book_cost) {
        const token = `Token ${props.userToken}`;
        const orderid = place_order_id;
        const id = props.offerBook.id;
        // let offer_book = await props.orderOfferBook({ token, orderid, id });

        if (true) {
          const SendData = {
            OrderId: resp.order_id,
            payment_url: "cod",
            book_id: codOrderDetails.data.book_id,
            book_inv_id: codOrderDetails.data.book_inv_id,
            rack_no: codOrderDetails.data.rack_no,
            qty: codOrderDetails.data.qty,
            payment_id: resp.order_id,
          };
          // console.log(SendData, "SENDDATA");
          // For Updating OrderDetail
          props
            .updatePaymentIdOrder({
              body: SendData,
              token,
            })
            .then((res) => {
              RedirectToThankyou(resp.order_id);
            })
            .catch((err) => {
              // console.log(err);
              triggerErrorMsg();
            });
        }
      } else {
        const SendData = {
          OrderId: resp.order_id,
          payment_url: "cod",
          book_id: codOrderDetails.data.book_id,
          book_inv_id: codOrderDetails.data.book_inv_id,
          rack_no: codOrderDetails.data.rack_no,
          qty: codOrderDetails.data.qty,
          payment_id: resp.order_id,
        };
        // console.log(SendData, "SENDDATA");
        // For Updating OrderDetail
        props
          .updatePaymentIdOrder({
            body: SendData,
            token,
          })
          .then((res) => {
            RedirectToThankyou(resp.order_id);
          })
          .catch((err) => {
            // console.log(err);
            triggerErrorMsg();
          });
      }
    } else {
      let Err_msg = "Sorry Your Order Was Not Placed ";
      if (props.OutOfStockBooks.length) {
        Err_msg = Err_msg + "Please Remove The Out Of Stock Books";
        // this.setState({ openRemoveOutStockDialog: true });
        setopenRemoveOutStockDialog(true);
      }
      setconfirmOrder(false);
      setShowOrderCreationErr(true);
      setOrderErrMsg(Err_msg);
      setgeneratingOrderId(false);
      setWaitPlacingOrder(false);
    }
  };
  const triggerErrorMsg = () => {
    let Err_msg = "Sorry Your Order Was Not Placed ";

    setconfirmOrder(false);
    setgeneratingOrderId(false);
    enqueueSnackbar(Err_msg, {
      variant: "warning",
    });
  };

  const RedirectToThankyou = (order_id) => {
    localStorage.setItem("UserOrderId", order_id);
    let order_details = {
      order: props.cartPriceDetails,
      user_id: props.userDetails.id,
      phone_no: props.SelectedAddress.phone_no,
      order_id: order_id,
      ordervalue: renderAmtUsed().netPayAmt,
    };

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
    props.cartDetails.map((book, index) => {
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
    // alert("o")
    const Data = {
      orderId: order_id,
      transaction_Id: props.cartPriceDetails.transaction_id,
      paymentId: props.cartPriceDetails.transaction_id,
      payVia: props.cartPriceDetails.paytype,
      orderDate: today,
      thumb: AllThumb.toString(),
      bookName: AllbookName,
      author: "",
      rackNo: AllrackNo,
      price: AllbookShippingCost,
      wallet: props.cartPriceDetails.wallet,
      totalPayment: props.cartPriceDetails.TotalPayment,
      phoneNo: props.SelectedAddress.phone_no,
      pincode: props.SelectedAddress.pincode,
      userAddress: props.SelectedAddress.address,
      landmark: props.SelectedAddress.landmark,
      state: props.SelectedAddress.state_name,
      city: props.SelectedAddress.city_name,
      recname: props.SelectedAddress.rec_name,
      noofbook: props.ItemsInCart,
      allBooks: AllBooks,
      booksData: booksData,
      email: `${props.userDetails.email}`,
    };

    try {
      // alert(props.cartPriceDetails.TotalPayment, "total amount");
      localStorage.setItem("order_details", JSON.stringify(order_details));
    } catch (error) {
      // console.log({ error });
    }

    window.location.replace(`thank-you?id=${order_id}`);
  };
  const calculateCartDeatils = (paymentType) => {
    if (!paymentType) {
      paymentType = paymentType;
    }
    let cartBooks = props.cartDetails;
    let booksAndDeliveryPrice = 0;
    let deductWalletAmt = 0;
    let ShowpepaidBookCoinsCanBeUsed = 0;
    let finalPay = 0;
    let netPayAmt = 0;

    const { all_books_price, oldBookPrice, newBookPrice, newBookDeliveryCost } =
      fetchcalculatedAllBookPrice();

    booksAndDeliveryPrice = all_books_price + newBookDeliveryCost;

    if (paymentType != "cod") {
      // if (
      //   reduceAmtUsingCoupon &&
      //   booksAndDeliveryPrice > props.couponResult.amount_upto
      // ) 
      if (
        reduceAmtUsingCoupon
      ) {
        booksAndDeliveryPrice = all_books_price - reduceAmtUsingCoupon;
      }
    }

    if (paymentType == "cod") {
      if (booksAndDeliveryPrice > min_cod_order_value) {
        booksAndDeliveryPrice = all_books_price + cod_charge_api;
      } else {
        booksAndDeliveryPrice = min_cod_order_value;
      }
      deductWalletAmt = 0;
    } else {
      if (all_books_price < min_prepaid_order_value) {
        booksAndDeliveryPrice = min_prepaid_order_value;
      }

      if (WalletSelected) {
        deductWalletAmt = fetchDeductedWalletAmt(booksAndDeliveryPrice);
      }

      if (applyBookcoinsSelected) {
        if (booksAndDeliveryPrice > min_prepaid_order_value) {
          ShowpepaidBookCoinsCanBeUsed = calculateBookCoinsUsed(
            booksAndDeliveryPrice,
            newBookPrice,
            oldBookPrice
          );
        }
      }

      if (WalletSelected && applyBookcoinsSelected) {
        if (booksAndDeliveryPrice > min_prepaid_order_value) {
          ShowpepaidBookCoinsCanBeUsed = calculateBookCoinsUsed(
            booksAndDeliveryPrice,
            newBookPrice,
            oldBookPrice
          );
          let price_after_book_coin =
            booksAndDeliveryPrice - ShowpepaidBookCoinsCanBeUsed;
          deductWalletAmt = fetchDeductedWalletAmt(price_after_book_coin);
        } else {
          deductWalletAmt = fetchDeductedWalletAmt(booksAndDeliveryPrice);
        }
      }
    }
    if (deductWalletAmt) {
      let wallet = "wallet";
      setother_payMethod(wallet);
    }

    if (ShowpepaidBookCoinsCanBeUsed) {
      let bookCoins = "Book Coins";
      setother_payMethod(bookCoins);
    }

    if (deductWalletAmt && ShowpepaidBookCoinsCanBeUsed) {
      let payUsing = "wallet & BookCoins";
      setother_payMethod(payUsing);
    }

    if (paymentType != "cod") {
    } else {
      if (booksAndDeliveryPrice < min_cod_order_value) {
        netPayAmt = min_cod_order_value;
      }
    }
    finalPay =
      booksAndDeliveryPrice -
      (Number(ShowpepaidBookCoinsCanBeUsed) + Number(deductWalletAmt));
    setUserAmount(finalPay);
    setshowUsedWallet(deductWalletAmt);
    return { UserAmount: finalPay, showUsedWallet: deductWalletAmt };
  };

  const CashbackPrice = (price, cashback_per) => {
    let cashbackedPrice = price - (price * cashback_per) / 100;
    return Math.round(cashbackedPrice);
  };
  const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  };

  let groupedArrayTotalAmount = 0;
  let toatlarray = groupBy(props.cartDetails, "bookPrice");
  let groupedArray = groupBy(props.cartDetails, "vendorid");
  let groupedArray2 = Object.entries(groupedArray);

  const DicountedPrice = (price, discount_per) => {
    let discountedPrice = price - (price * discount_per) / 100;
    return Math.round(discountedPrice);
  };

  const Vendor_wise_delivery_cost = (cart) => {
    // console.log(cart[1], "");
    let key_v = 0;
    cart[1].map((gr) => {
      // console.log(gr.delivery_cost);
      key_v = key_v + gr.delivery_cost;
    });
    return key_v;
  };

  const fetchDeductedWalletAmt = (booksPrice) => {
    if (!booksPrice) return 0;

    return props.walletbalance <= booksPrice ? props.walletbalance : booksPrice;
  };

  // const handleClick = () => {
  //   setIsActive(current => !current);
  // };

  const TotalPrice = (price) => {
    groupedArrayTotalAmount: groupedArrayTotalAmount + price;
    return Math.round(price);
  };

  const bookcoinCheckbox = (ShipCost) => {
    if (paymentType == "cod") {
      setapplyBookcoinsSelected(false);
      setcoinPopup(true);
      enqueueSnackbar(
        "Bookcoin can only be applied in Prepaid payment method",
        {
          variant: "warning",
        }
      );
    } else {
      if (getBookQty().oldQty && ShipCost > min_prepaid_order_value) {
        if (!applyBookcoinsSelected) {
          setapplyBookcoinsSelected(true);
          let currentMycart = props.cartDetails;
          currentMycart.map((book, index) => { });
        } else {
          setapplyBookcoinsSelected(false);
          if (applyBookcoinsSelected) {
            setapplyBookcoinsSelected(false);
            return;
          }
        }
      } else {
        setapplyBookcoinsSelected(false);
        if (!applyBookcoinsSelected) {
          setapplyBookcoinsSelected(false);
          setcoinPopup(true);
          enqueueSnackbar("Bookcoin can only be applied for used books", {
            variant: "warning",
          });
        }
      }
    }
  };

  const getBookQty = () => {
    let data = {
      newQty: 0,
      oldQty: 0,
      notebookQty: 0,
      totalQty: 0,
    };
    props.cartDetails.map((book) => {
      if (book.bookInvId.toString().indexOf("KOL") > -1) {
        data.notebookQty = book.bookQty;
      } else if (book.bookInvId.toString().indexOf("NB") > -1) {
        data.newQty = data.newQty + 1;
      } else {
        data.oldQty = data.oldQty + 1;
      }
      data.totalQty = data.totalQty + 1;
    });
    return {
      newQty: data.newQty,
      oldQty: data.oldQty,
      totalQty: data.totalQty,
      notebookQty: data.notebookQty,
    };
  };

  const isMaskPresentMask = () => {
    let MaskInvID = "NB1441502";
    let count = 0,
      mask = 0,
      book_and_mask = 0,
      book = 0;
    props.cartDetails.map((book) => {
      if (book.bookInvId != MaskInvID) {
        if (book.bookInvId.toString().indexOf("NB") > -1) {
          count = 2;
          book = 1;
        }
      }

      if (
        book.bookInvId == MaskInvID &&
        book.bookInvId.toString().indexOf("NB") > -1
      ) {
        mask = mask + 1;
      }
    });

    if (count > 0 && mask > 0) {
      book_and_mask = 1;
    }

    return { count, mask, book_and_mask };
  };

  const fetchcalculatedAllBookPrice = () => {
    let cartBooks = props.cartDetails;
    let newBookPrice = 0,
      total_new_book_wt = 0,
      oldBookPrice = 0,
      noteBookPrice = 0,
      vendor_delivery_cost = 0,
      offer_book_cost = 0;
    for (let index in cartBooks) {
      if (cartBooks[index].bookInvId.toString().indexOf("KOL") > -1) {
        noteBookPrice = noteBookPrice + cartBooks[index].bookShippingCost;
      }
      if (
        cartBooks[index].bookInvId.toString().indexOf("NB") == -1 &&
        cartBooks[index].bookInvId.toString().indexOf("KOL") == -1
      ) {
        oldBookPrice = oldBookPrice + cartBooks[index].bookShippingCost;
      }
      if (cartBooks[index].bookInvId.toString().indexOf("NB") > -1) {
        // New book
        newBookPrice = newBookPrice + cartBooks[index].bookShippingCost;
        if (cartBooks[index].vendorid == 1) {
          if (
            cartBooks[index].seller_id > 0 &&
            cartBooks[index].delivery_type == 2
          ) {
            vendor_delivery_cost =
              vendor_delivery_cost + parseFloat(cartBooks[index].delivery_cost);
          } else if (
            cartBooks[index].seller_id > 0 &&
            cartBooks[index].delivery_type == 1
          ) {
            vendor_delivery_cost = vendor_delivery_cost + 0;
          } else {
            total_new_book_wt =
              total_new_book_wt + parseFloat(cartBooks[index].weight);
          }
        } else {
          vendor_delivery_cost =
            vendor_delivery_cost + parseInt(cartBooks[index].delivery_cost);
        }
      }
    }
    if (getItChecked) {
      if (props.offerBook) {
        offer_book_cost = Math.round(
          parseInt(props.offerBook.shipping_handling_charge) -
          parseInt(props.offerBook.shipping_handling_charge) *
          (parseInt(props.offerBook.offer_discount) / 100)
        );
      }
    }
    if (isNaN(offer_book_cost)) {
      offer_book_cost = 0;
    }
    const all_books_price =
      oldBookPrice + newBookPrice + offer_book_cost + noteBookPrice;

    const newBookDeliveryCost = getPriceAsPerWt(
      total_new_book_wt,
      vendor_delivery_cost
    );

    const mypustak_delivery_cost = getPriceAsPerWt(total_new_book_wt, 0);
    return {
      all_books_price,
      oldBookPrice,
      newBookPrice,
      newBookDeliveryCost,
      mypustak_delivery_cost,
      offer_book_cost,
      noteBookPrice,
    };
  };

  const getPriceAsPerWt = (calculated_new_book_wt_kg, vendor_delivery_cost) => {
    let TotalDeliveryCost = 0;
    TotalDeliveryCost = TotalDeliveryCost + vendor_delivery_cost;
    if (calculated_new_book_wt_kg || vendor_delivery_cost) {
      if (0 < calculated_new_book_wt_kg && calculated_new_book_wt_kg <= 0.5) {
        TotalDeliveryCost = TotalDeliveryCost + 40;
      } else if (
        0.5 < calculated_new_book_wt_kg &&
        calculated_new_book_wt_kg <= 1.0
      ) {
        TotalDeliveryCost = TotalDeliveryCost + 80;
        // console.log('calculated_new_book_wt_kg', 80);
      } else if (
        1.0 < calculated_new_book_wt_kg &&
        calculated_new_book_wt_kg <= 1.5
      ) {
        TotalDeliveryCost = TotalDeliveryCost + 100;
        // console.log('calculated_new_book_wt_kg', 120);
      } else if (
        1.5 < calculated_new_book_wt_kg &&
        calculated_new_book_wt_kg <= 2.0
      ) {
        TotalDeliveryCost = TotalDeliveryCost + 160;
        // console.log('calculated_new_book_wt_kg', 160);
      } else if (
        2.0 < calculated_new_book_wt_kg &&
        calculated_new_book_wt_kg <= 2.5
      ) {
        TotalDeliveryCost = TotalDeliveryCost + 200;
        // console.log('calculated_new_book_wt_kg', 200);
      } else if (
        2.5 < calculated_new_book_wt_kg &&
        calculated_new_book_wt_kg <= 3.0
      ) {
        TotalDeliveryCost = TotalDeliveryCost + 240;
        // console.log('calculated_new_book_wt_kg', 240);
      } else if (
        3.0 < calculated_new_book_wt_kg &&
        calculated_new_book_wt_kg <= 3.5
      ) {
        TotalDeliveryCost = TotalDeliveryCost + 280;
        // console.log('calculated_new_book_wt_kg', 240);
      } else if (
        3.5 < calculated_new_book_wt_kg &&
        calculated_new_book_wt_kg <= 4.0
      ) {
        TotalDeliveryCost = TotalDeliveryCost + 320;
        // console.log('calculated_new_book_wt_kg', 320);
      } else if (
        4.0 < calculated_new_book_wt_kg &&
        calculated_new_book_wt_kg <= 4.5
      ) {
        TotalDeliveryCost = TotalDeliveryCost + 360;
        // console.log('calculated_new_book_wt_kg', 360);
      } else if (
        4.5 < calculated_new_book_wt_kg &&
        calculated_new_book_wt_kg <= 5.0
      ) {
        TotalDeliveryCost = TotalDeliveryCost + 400;
        // console.log('calculated_new_book_wt_kg', 400);
      } else if (calculated_new_book_wt_kg > 5.0) {
        TotalDeliveryCost = 400;
        // console.log('calculated_new_book_wt_kg >', 400);
      }
      return TotalDeliveryCost;
    } else if (vendor_delivery_cost && calculated_new_book_wt_kg == 0) {
      // return TotalDeliveryCost;
      return TotalDeliveryCost + vendor_delivery_cost;
    } else {
      return 0;
    }
  };
  const editAddressHand = (editData) => {
    setshowEditDialog(true);
    seteditData(editData);
    props.Editaddress(editData);
  };
  const renderAmtUsed = () => {
    // let cartBooks = this.props.cartDetails;
    let payType = paymentType;
    let deductWalletAmt = 0,
      ShowpepaidBookCoinsCanBeUsed = 0,
      codCharge = 0,
      netPayAmt = 0, // final price user need to pay after apppling differnt charges on respection payemt method
      total_amt = 0,
      booksAndDeliveryPrice = 0,
      actual_book_charges = 0,
      cashback_amt_used = 0, // final price user need to pay
      total_customer_value = 0;

    const {
      all_books_price,
      oldBookPrice,
      newBookPrice,
      newBookDeliveryCost,
      mypustak_delivery_cost,
      offer_book_cost,
      noteBookPrice,
    } = fetchcalculatedAllBookPrice();
    booksAndDeliveryPrice = all_books_price;

    let total_order_value = newBookDeliveryCost + all_books_price;
    let min_order_charge_apply = min_prepaid_order_value - total_order_value;

    if (min_order_charge_apply < 0) {
      min_order_charge_apply = 0;
    }
    if (payType == "cod") {
      booksAndDeliveryPrice =
        all_books_price +
        cod_charge_api +
        newBookDeliveryCost +
        min_order_charge_apply;
      deductWalletAmt = 0;
      netPayAmt = booksAndDeliveryPrice;
      codCharge = cod_charge_api;
      actual_book_charges = booksAndDeliveryPrice;
    } else {
      // booksAndDeliveryPrice = booksAndDeliveryPrice + newBookDeliveryCost;
      booksAndDeliveryPrice =
        all_books_price + newBookDeliveryCost + min_order_charge_apply;
      if (all_books_price < min_prepaid_order_value) {
        // if (booksAndDeliveryPrice < min_prepaid_order_value) {
        // console.log(
        //   min_prepaid_order_value,
        //   min_order_charge_apply,
        //   "min_prepaid_order_value",
        //   newBookDeliveryCost,
        //   all_books_price
        // );
        booksAndDeliveryPrice = min_order_charge_apply + total_order_value;
        // booksAndDeliveryPrice = min_prepaid_order_value - newBookDeliveryCost;
      }
      actual_book_charges = booksAndDeliveryPrice;

      if (props.cashback) {
        if (props.cashback > booksAndDeliveryPrice) {
          cashback_amt_used = booksAndDeliveryPrice;

          booksAndDeliveryPrice = 0;
        } else {
          cashback_amt_used = props.cashback;

          booksAndDeliveryPrice = booksAndDeliveryPrice - props.cashback;
        }
      }

      // if (
      //   reduceAmtUsingCoupon &&
      //   booksAndDeliveryPrice > props.couponResult.amount_upto
      // ) 
      // console.log(booksAndDeliveryPrice, props.couponResult.amount_upto, "valueeeeeeeeeeee123", reduceAmtUsingCoupon)
      if (
        reduceAmtUsingCoupon
      ) {
        // FOR CHECKING PRICE WHEN THERE IS COUPON APPLIED
        booksAndDeliveryPrice = booksAndDeliveryPrice - Number(reduceAmtUsingCoupon);
        total_amt = Math.round(booksAndDeliveryPrice) + newBookDeliveryCost;


        // console.log(Number(this.state.reduceAmtUsingCoupon),'renderAmtUsed',booksAndDeliveryPrice);
      }

      if (WalletSelected) {
        deductWalletAmt = fetchDeductedWalletAmt(booksAndDeliveryPrice);
      }
      if (applyBookcoinsSelected) {
        if (booksAndDeliveryPrice > min_prepaid_order_value) {
          ShowpepaidBookCoinsCanBeUsed = calculateBookCoinsUsed(
            booksAndDeliveryPrice,
            newBookPrice,
            oldBookPrice,
            noteBookPrice
          );
          netPayAmt =
            booksAndDeliveryPrice - Number(ShowpepaidBookCoinsCanBeUsed);
        }
      }

      if (WalletSelected && applyBookcoinsSelected) {
        // FOR CHECKING PRICE WHEN THERE IS MYPUSTKBOOKCOIN/CASHBACK

        if (booksAndDeliveryPrice > min_prepaid_order_value) {
          ShowpepaidBookCoinsCanBeUsed = calculateBookCoinsUsed(
            booksAndDeliveryPrice,
            newBookPrice,
            oldBookPrice,
            noteBookPrice
          );
          let price_after_book_coin =
            booksAndDeliveryPrice - ShowpepaidBookCoinsCanBeUsed;
          deductWalletAmt = fetchDeductedWalletAmt(price_after_book_coin);
        } else {
          deductWalletAmt = fetchDeductedWalletAmt(booksAndDeliveryPrice);
        }
      }
      netPayAmt =
        booksAndDeliveryPrice -
        (Number(ShowpepaidBookCoinsCanBeUsed) + Number(deductWalletAmt));
      // console.log(
      //   { netPayAmt },
      //   "renderAmtUsed_test",
      //   booksAndDeliveryPrice,
      //   Number(ShowpepaidBookCoinsCanBeUsed),
      //   Number(deductWalletAmt)
      // );
    }
    // booksAndDeliveryPrice = booksAndDeliveryPrice + newBookDeliveryCost
    if (payType == "cod") {
      total_amt = Math.round(booksAndDeliveryPrice);
    } else {
      total_amt =
        Math.round(booksAndDeliveryPrice)
    }
    if (payType != "cod") {
      // }
    } else {
      if (booksAndDeliveryPrice < min_cod_order_value) {
        // console.log(min_cod_order_value, "min_cod_order_value2700", netPayAmt);

        netPayAmt = min_cod_order_value;
      }
    }
    if (applyBookcoinsSelected && ShowpepaidBookCoinsCanBeUsed < 1) {
      setapplyBookcoinsSelected(false);
    }

    // console.log(min_cod_order_value, "min_cod_order_value", netPayAmt);
    if (payType != "cod") {

      total_customer_value = total_amt + props.cashback + parseInt(reduceAmtUsingCoupon);
    }
    else {
      total_customer_value = total_amt
    }
    // if (
    //   reduceAmtUsingCoupon
    // ) {
    //   netPayAmt = Math.round(netPayAmt) - parseInt(reduceAmtUsingCoupon)
    // }
    return {
      total_amt: total_amt,
      oldBookPrice,
      codCharge,
      newBookPrice,
      deductWalletAmt,
      netPayAmt: Math.round(netPayAmt),
      newBookDeliveryCost,
      mypustak_delivery_cost,
      ShowpepaidBookCoinsCanBeUsed,
      actual_book_charges,
      cashback_amt_used,
      offer_book_cost,
      noteBookPrice,
      total_order_value: total_customer_value,
    };
  };

  const onselect_wallet = () => {
    if (props.walletbalance < 0) {
      setWalletSelected(false);
      enqueueSnackbar("Please recharge your wallet", {
        variant: "warning",
      });
      return;
    }
    if (paymentType == "cod") {
      setWalletSelected(false);
      enqueueSnackbar(
        "Wallet balance cannot be used in cash on delivery order",
        {
          variant: "warning",
        }
      );
    } else {
      setWalletSelected(!WalletSelected);
    }
  };
  const redirect_wallet = (amt) => {
    Router.push(`/mypustak-wallet?amt=${renderAmtUsed().netPayAmt}`);
  };
  // ------------------------------ New Make Payment Handler 01-04-2023---------------------------------

  const CreateOrderPayloadNew = () => {
    let AllbookId = [];
    let AllbookInvId = [];
    let AllrackNo = [];
    let AllQty = [];
    let AllBookPrice = [];
    let AllDeliveryCost = [];
    let AllDiscountper = [];
    let AllCashbackper = [];
    let AllDiscountedPrice = [];
    let AllCashbackedPrice = [];
    let AllShippingCost = [];
    let AllOffers = [];
    let AllBook_Thumb = [];
    let AllBookConditionId = [];
    let cod_charge = 0;
    let total_cod_amount = 0;
    let ShowpepaidBookCoinsCanBeUsed = 0;
    let booksAndDeliverPrice = 0;
    console.log(props.cartDetails, "props.cartDetails OrderPayload");
    props.cartDetails.map((book, index) => {
      // console.log(book, "OrderPayload");
      AllbookId.push(`${book.bookId}`);
      AllbookInvId.push(book.bookInvId);
      AllrackNo.push(book.bookRackNo);
      AllQty.push(book.bookQty);
      AllBookPrice.push(book.bookPrice);
      AllDeliveryCost.push(book.delivery_cost);
      AllDiscountper.push(book.discount_per);
      AllCashbackper.push(book.cashback_per);
      AllDiscountedPrice.push(book.discount == null ? 0 : book.discount);
      AllCashbackedPrice.push(book.cashback == null ? 0 : book.cashback);
      AllShippingCost.push(book.bookShippingCost);
      AllOffers.push(book.offertype);
      AllBook_Thumb.push(book.bookThumb);
      AllBookConditionId.push(book.condition_id);
    });

    if (renderAmtUsed().offer_book_cost) {
      // console.log(props.offerBook.thumb);
      AllbookId.push(`${props.offerBook.book_id}`);
      AllbookInvId.push(props.offerBook.book_inv_id);
      AllrackNo.push(props.offerBook.bookRackNo);
      AllQty.push(1);
      AllBookPrice.push(props.offerBook.book_value);
      AllDeliveryCost.push(0);
      AllDiscountper.push(0);
      AllCashbackper.push(0);
      AllDiscountedPrice.push(0);
      AllCashbackedPrice.push(0);
      AllShippingCost.push(props.offerBook.user_pay);
      AllOffers.push(0);
      AllBook_Thumb.push(props.offerBook.thumb);
    }

    if (props.freebie_data?.min_cart_value) {
      if (
        props.freebie_data.min_cart_value <= renderAmtUsed().total_order_value
      ) {
        // console.log(props.freebie_data);
        const book_invt_id = "freebie" + props.freebie_data.id;
        AllbookId.push(`${props.freebie_data.id}`);
        AllbookInvId.push(book_invt_id);
        AllrackNo.push("KOL/400/01");
        AllQty.push(1);
        AllBookPrice.push(props.freebie_data.mrp);
        AllDeliveryCost.push(0);
        AllDiscountper.push(0);
        AllCashbackper.push(0);
        AllDiscountedPrice.push(0);
        AllCashbackedPrice.push(0);
        AllShippingCost.push(props.freebie_data.freebies_amt);
        AllOffers.push(0);
        AllBook_Thumb.push(props.freebie_data.thumb);
      }
    }

    const { all_books_price, oldBookPrice, newBookPrice, newBookDeliveryCost } =
      fetchcalculatedAllBookPrice();

    const {
      phone_no,
      pincode,
      address,
      city_name,
      landmark,
      state_name,
      country_name,
      is_address_verified,
      rec_name,
    } = props.SelectedAddress;

    let OrderPayload = {
      data: {
        // no_of_book: props.ItemsInCart,
        no_of_book:
          getBookQty().oldQty + getBookQty().newQty + getBookQty().notebookQty,
        billing_add_id: props.AddresId,
        shipping_add_id: props.AddresId,
        qty: AllQty,
        book_id: AllbookId,
        book_inv_id: AllbookInvId,
        rack_no: AllrackNo,
        bookPrice: AllBookPrice,
        offertype: AllOffers,
        book_thumb: AllBook_Thumb,
        rec_name,
        pincode,
        address,
        landmark,
        city_name,
        country_name,
        state_name,
        is_address_verified,
        phone_no,
        delivery_charge_newbooks: newBookDeliveryCost,
        net_amount: renderAmtUsed().actual_book_charges,
        deliveryCost: AllDeliveryCost,
        cashBackper: AllCashbackper,
        discountper: AllDiscountper,
        discountedPrice: AllDiscountedPrice,
        cashbackedPrice: AllCashbackedPrice,
        userPay: AllShippingCost,
        bookcoins_used: ShowpepaidBookCoinsCanBeUsed,
        cod_charge: cod_charge,
        payusing: "",
        min_order_charge: min_order_charge,
        condition_ids: AllBookConditionId
      },
    };
    console.log(OrderPayload, "OrderPayload");

    return OrderPayload;
  };
  // This function Return Bookcoin wallet Value if used appied it return Applied Value
  const GetOtherPaymentValue = () => {
    const { all_books_price, oldBookPrice, newBookPrice, newBookDeliveryCost } =
      fetchcalculatedAllBookPrice();
    let wallet_used = 0;
    let bookcoin_used = 0;
    if (props.walletbalance > 0) {
      if (WalletSelected) {
        wallet_used = renderAmtUsed().deductWalletAmt;
      }
    }
    if (props.bookcoins > 0) {
      if (applyBookcoinsSelected) {
        bookcoin_used = calculateBookCoinsUsed(
          all_books_price,
          newBookPrice,
          oldBookPrice
        );
      }
    }
    return { wallet_used, bookcoin_used };
  };


  const verify_cart = () => {

  }

  const NewMakepayment = async () => {
    // alert(props.OutOfStockBooks.length)
    if (parseInt(props.OutOfStockBooks.length)) {
      return
    }
    if (props.ItemsInCart == 0) {

      enqueueSnackbar("Cart is empty", {
        variant: "error",
      });
      return
    }

    if (openRemoveOutStockDialog) {

      return
    }


    setpayment_loader(true);

    MIN_ORDER_MSG_DIV(min_prepaid_order_value, min_cod_order_value);
    setpayment_loader_message("Please Wait,We Are Creating Your Order...");

    let cod_charge = 0;
    let total_cod_amount = 0;
    let prepaid_payment_method = prepaid3rd_partySelected.toLowerCase();
    // alert(prepaid_payment_method)
    const { all_books_price, oldBookPrice, newBookPrice, newBookDeliveryCost } =
      fetchcalculatedAllBookPrice();
    let booksAndDeliverPrice = all_books_price + newBookDeliveryCost;
    let CreateOrderPayload = CreateOrderPayloadNew();
    // console.log(CreateOrderPayload);
    if (paymentType == "prepaid") {
      if (all_books_price < min_prepaid_order_value) {
        booksAndDeliverPrice = min_prepaid_order_value + newBookDeliveryCost;
      }
      CreateOrderPayload.data.amount = invoice_amount().invoice_amount_value;
      CreateOrderPayload.data.cod_charge = cod_charge;
      CreateOrderPayload.data.third_party_amt = invoice_amount().gateway_amount;
      CreateOrderPayload.data.gateway_amt = invoice_amount().gateway_amount;
      CreateOrderPayload.data.wallet_used = GetOtherPaymentValue().wallet_used;
      CreateOrderPayload.data.bookcoins_used =
        GetOtherPaymentValue().bookcoin_used;
      CreateOrderPayload.data.coupon_id = props.couponResult.coupon_code;
      CreateOrderPayload.data.coupon_type = props.couponResult.coupon_type;
      CreateOrderPayload.data.coupon_amount = props.redeemcoupon;
      if (parseInt(props.cashback) > 0) {
        CreateOrderPayload.data.cashback_used = props.cashback;
      }

      if (invoice_amount().gateway_amount > 0) {
        if (prepaid_payment_method == "razorpay") {
          CreateOrderPayload.data.payusing = "prepaid_R";
        } else if (prepaid_payment_method == "cashfree") {
          CreateOrderPayload.data.payusing = "prepaid_C";
        }
      } else {
        CreateOrderPayload.data.payusing = "wallet";
      }
      // alert("Order created 2908")
      // console.log(CreateOrderPayload , "CreateOrderPayload2909")
      // return
      CreatePrepaidPayOrder({ PrepaidOrderPayload: CreateOrderPayload });

      const cartData = {
        bookShippingCost: all_books_price,
        totalPayment: CreateOrderPayload.data.amount,
        CashCollection: cod_charge,
        paytype: "prepaid",
      };
      props.AddPriceCart(cartData);
    } else if (paymentType == "cod") {
      if (props.OutOfStockBooks.length) {
        return
      }

      setcod_paymentloader(true);
      if (
        cod_charge_api + all_books_price + newBookDeliveryCost >=
        min_cod_order_value
      ) {
        cod_charge = cod_charge_api;
        total_cod_amount = cod_charge + all_books_price + newBookDeliveryCost;
      } else {
        cod_charge = cod_charge_api;
        total_cod_amount = min_cod_order_value;
      }
      CreateOrderPayload.data.payusing = paymentType;
      CreateOrderPayload.data.amount = total_cod_amount;
      CreateOrderPayload.data.cod_charge = cod_charge;
      CreateOrderPayload.data.third_party_amt = 0;
      // console.log(CreateOrderPayload, "in COD");
      const cartData = {
        bookShippingCost: booksAndDeliverPrice,
        totalPayment: CreateOrderPayload.data.amount,
        CashCollection: cod_charge,
        paytype: "cod",
      };
      // console.log(cartData, "cartData");
      props.AddPriceCart(cartData);
      CreateCODOrder({ CodOrderPayload: CreateOrderPayload });
    }
  };

  const CreateCODOrder = async ({ CodOrderPayload }) => {
    // console.log("in CreateCODOrder");
    let created_order_data = await props.OrderDetails(CodOrderPayload);
    // console.log(created_order_data, "created_order_data");
    if (created_order_data) {
      // this.setState({
      //     payment_loader_message: "Validating your Cash On Delivery Order"
      // })

      setpayment_loader_message("Please Wait,We Are Updating Your Order...");
      // console.log(created_order_data, "created_order_data");
      if (renderAmtUsed().offer_book_cost) {
        const token = `Token ${props.userToken}`;
        const orderid = created_order_data.order_id;
        const id = props.offerBook.id;
        // let orderofferbook = await props.orderOfferBook({ token, orderid, id });
        //  alert("done")
        //  console.log(orderofferbook ,"orderofferbook")
        if (true) {
          const SendData = { OrderId: created_order_data.order_id };
          props
            .cod_verify_payment(SendData)
            .then((res) => {
              // alert("DOne")
              props.CartSession();
              props.check_book_incart();
              NavigateToThankyou(created_order_data.order_id);
              // console.log(res);
            })
            .catch((err) => {
              setcod_paymentloader(false);

              setpayment_loader(false);
              setpayment_loader_message("");
              check_outofstock_book();
              // console.log(err, "COD Error");
            });
        }
      } else {
        const SendData = { OrderId: created_order_data.order_id };
        props
          .cod_verify_payment(SendData)
          .then((res) => {
            // alert("DOne")
            props.CartSession();
            props.check_book_incart();
            NavigateToThankyou(created_order_data.order_id);
            // console.log(res);
          })
          .catch((err) => {
            setcod_paymentloader(false);

            setpayment_loader(false);
            setpayment_loader_message("");
            check_outofstock_book();
            // console.log(err, "COD Error");
          });
      }
    }
  };

  const invoice_amount = () => {
    const { all_books_price, oldBookPrice, newBookPrice, newBookDeliveryCost } =
      fetchcalculatedAllBookPrice();
    const total_order_value = newBookDeliveryCost + all_books_price;
    let min_order_charge_apply = min_prepaid_order_value - total_order_value;

    if (min_order_charge_apply < 0) {
      min_order_charge_apply = 0;
    }
    // let booksAndDeliverPrice = all_books_price + newBookDeliveryCost;
    let booksAndDeliverPrice =
      all_books_price + newBookDeliveryCost + min_order_charge_apply;
    // console.log(
    //   booksAndDeliverPrice,
    //   "cosy",
    //   min_order_charge_apply,
    //   all_books_price
    // );
    // If coupon Apply
    if (reduceAmtUsingCoupon) {
      booksAndDeliverPrice = booksAndDeliverPrice - reduceAmtUsingCoupon;
    }
    let invoice_amount_value;
    // if cod payment mode
    if (paymentType == "cod") {
      if (cod_charge_api + booksAndDeliverPrice >= min_cod_order_value) {
        cod_charge = cod_charge_api;
        total_cod_amount = cod_charge + booksAndDeliverPrice;
        invoice_amount_value = total_cod_amount;
      } else {
        cod_charge = cod_charge_api;
        total_cod_amount = min_cod_order_value;
        invoice_amount_value = total_cod_amount;
      }
    } else {
      if (all_books_price < min_prepaid_order_value) {
        // booksAndDeliverPrice = min_prepaid_order_value + newBookDeliveryCost;
        booksAndDeliverPrice = booksAndDeliverPrice;
      }
      let cashback_used = 0;
      if (props.cashback > 0) {
        cashback_used = props.cashback;
      }

      let bookcoin_used = GetOtherPaymentValue().bookcoin_used;

      invoice_amount_value =
        parseInt(booksAndDeliverPrice) -
        parseInt(cashback_used) -
        parseInt(bookcoin_used);
    }
    let wallet_used = GetOtherPaymentValue().wallet_used;
    let gateway_amount = invoice_amount_value - parseInt(wallet_used);
    return { invoice_amount_value, gateway_amount };
  };

  const CreatePrepaidPayOrder = async ({ PrepaidOrderPayload }) => {
    // console.log("in CreatePrepaidPayOrder");
    props
      .OrderDetails(PrepaidOrderPayload)
      .then(async (created_order_data) => {
        // console.log(created_order_data, "created_order_data");
        // this.setState({
        //     payment_loader_message: "Validating your Cash On Delivery Order"
        // })
        setpayment_loader_message("process your Prepaid Order");
        // console.log(PrepaidOrderPayload, "PrepaidOrderPayload");
        if (true) {
          const token = `Token ${props.userToken}`;
          const orderid = created_order_data.order_id;
          const id = props.offerBook.id;
          // let order_offerbook = await props.orderOfferBook({
          //   token,
          //   orderid,
          //   id,
          // });
          //  /if offer book available
          if (true) {
            const SendData = { OrderId: created_order_data.order_id };
            // call Razorpay gateway
            // console.log(created_order_data);
            // alert(PrepaidOrderPayload.data.payusing)
            if (props.OutOfStockBooks.length) {
              return
            }

            if (PrepaidOrderPayload.data.payusing == "prepaid_R") {
              OpenRazorpayGateway({
                PrepaidOrderPayload,
                gateway_data: created_order_data,
              });
            } else if (PrepaidOrderPayload.data.payusing == "prepaid_C") {
              // console.log(PrepaidOrderPayload , "xashhhhh")
              // alert(PrepaidOrderPayload.data.gateway_amt + " cashhh")

              const token = localStorage.getItem("user");
              let order_amount = PrepaidOrderPayload.data.gateway_amt;
              let body = {
                orderId: created_order_data.order_id,
                orderAmount: order_amount,
                return_url: "",
                user_phone: props.Selectedphone_no,
                user_email: props.UserEmail,
              };
              let cashfreeRes = props
                .Get_CashFree_Signature_Wallet({
                  token,
                  body,
                })
                .then((cashfreeRes) => {
                  // alert("2912")
                  let passToCashfree = console.log(cashfreeRes, "cashfreeRes");
                  cashfreePayment({
                    PrepaidOrderPayload,
                    passToCashfree,
                    cashfreeRes,
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            } else if (PrepaidOrderPayload.data.payusing == "wallet") {
              // alert("wallet gateway")
              OpenMypustakWallet({
                PrepaidOrderPayload,
                gateway_data: created_order_data,
              });
            }
          }
          // if offer book not available
          else {
            const SendData = { OrderId: created_order_data.order_id };
            // call Razorpay gateway
            console.log(created_order_data);
            // alert(PrepaidOrderPayload.data.payusing)

            if (PrepaidOrderPayload.data.payusing == "prepaid_R") {
              OpenRazorpayGateway({
                PrepaidOrderPayload,
                gateway_data: created_order_data,
              });
            } else if (PrepaidOrderPayload.data.payusing == "prepaid_C") {
              // console.log(PrepaidOrderPayload , "xashhhhh")
              // alert(PrepaidOrderPayload.data.gateway_amt + " cashhh")

              const token = localStorage.getItem("user");
              let order_amount = PrepaidOrderPayload.data.gateway_amt;
              let body = {
                orderId: created_order_data.order_id,
                orderAmount: order_amount,
                return_url: "",
                user_phone: props.Selectedphone_no,
                user_email: props.UserEmail,
              };
              let cashfreeRes = props
                .Get_CashFree_Signature_Wallet({
                  token,
                  body,
                })
                .then((cashfreeRes) => {
                  // alert("2912")
                  let passToCashfree = console.log(cashfreeRes, "cashfreeRes");
                  cashfreePayment({
                    PrepaidOrderPayload,
                    passToCashfree,
                    cashfreeRes,
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            } else if (PrepaidOrderPayload.data.payusing == "wallet") {
              // alert("wallet gateway")
              OpenMypustakWallet({
                PrepaidOrderPayload,
                gateway_data: created_order_data,
              });
            }
          }
        }
      })
      .catch((err) => {
        // console.error(err)
        // console.log("error2824", err);
        // this.setState({
        //     payment_loader:false,
        //     payment_loader_message: ""
        // })
        setpayment_loader(false);
        setpayment_loader_message("");
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      });
  };

  const OpenRazorpayGateway = ({ PrepaidOrderPayload, gateway_data }) => {
    // console.log(PrepaidOrderPayload, "PrepaidOrderPayload", gateway_data);
    setpayment_loader(true);
    setpayment_loader_message("Please Wait,We Are Updating Your Order...");
    if (!gateway_data.genrated_id) {
      let error = "Technical Error ! Please contact customer support";
      // alert("Technical Error ! Please contact customer support")

      enqueueSnackbar(error, {
        variant: "error",
      });
      setpayment_loader(false);
      setpayment_loader_message("");
      return;
    }
    const options = {
      // key: "rzp_live_pvrJGzjDkVei3G", //Paste your API key here before clicking on the Pay Button.
      // "key": "rzp_test_jxY6Dww4U2KiSA",
      // key: "rzp_test_jxY6Dww4U2KiSA", //Paste your API key here before clicking on the Pay Button.
      key: "rzp_live_cNDMU35KKMCp6t",
      amount: parseInt(PrepaidOrderPayload.data.gateway_amt) * 100,
      // amount: 100,
      name: `Mypustak.com`,
      description: `Total No of Books ${PrepaidOrderPayload.data.no_of_book}`,
      "Order Id": `${gateway_data.genrated_id}`, //Razorpay Order id
      currency: "INR",
      prefill: {
        contact: `${props.Selectedphone_no}`,
        email: `${props.UserEmail}`,
      },

      notes: {
        "Order Id": `${gateway_data.order_id}`, //"order_id": "your_order_id", // Our Order id
      },
      theme: {
        color: "#2248ae",
        emi_mode: false,
      },
      handler: (response) => {
        // console.log(response, "errorgatewate");

        let SendData = {
          order_id: gateway_data.order_id,
          payment_id: response.razorpay_payment_id,
        };

        props
          .razorpay_verify_payment(SendData)
          .then((res) => {
            // console.log(res, "verify response  106");
            props.CartSession();
            props.check_book_incart();
            NavigateToThankyou(gateway_data.order_id);
          })
          .catch((err) => {
            // console.log(err, "razorpay verify error 109");
            let error_msg = err.msg;
            let order = {
              order_id: gateway_data.order_id,
              error_msg: error_msg,
            };
            props.CartSession();
            props.check_book_incart();
            props.updateCustomerOrder(order);
            let message =
              "If any money was debited from your account, it will be updated or refunded your order soon.";
            enqueueSnackbar(message, {
              variant: "error",
            });
            setpayment_loader(false);
            setpayment_loader_message("");
          });
      },
      modal: {
        ondismiss: () => {
          // console.log("dismiss");
          let error_msg = "razorpay dialog closed by customer";
          let order = { order_id: gateway_data.order_id, error_msg: error_msg };
          props.CartSession();
          props.check_book_incart();
          props.updateCustomerOrder(order);
          setpayment_loader(false);
          setpayment_loader_message("");
        },
      },
    };
    let rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", (response) => {
      // console.log( response ,"error2878");

      let error_msg = response.error.description;
      let order = { order_id: gateway_data.order_id, error_msg: error_msg };
      props.updateCustomerOrder(order);
      enqueueSnackbar(error_msg, {
        variant: "error",
      });
      props.CartSession();
      props.check_book_incart();
      setpayment_loader(false);
      setpayment_loader_message("");
    });
  };

  const OpenMypustakWallet = ({ PrepaidOrderPayload, gateway_data }) => {
    setpayment_loader(true);
    setpayment_loader_message("Please Wait,We Are Updating Your Order...");
    let SendData = {
      order_id: gateway_data.order_id,
      payment_id: gateway_data.order_id,
    };

    props
      .wallet_verify_payment(SendData)
      .then((res) => {
        props.CartSession();
        props.check_book_incart();
        setpayment_loader(false);
        setpayment_loader_message("");
        check_outofstock_book();
        NavigateToThankyou(gateway_data.order_id);

        // console.log(res);
      })
      .catch((err) => {
        // console.log(err);

        setpayment_loader(false);
        setpayment_loader_message("");
        props.CartSession();
        props.check_book_incart();
      });
  };

  const NavigateToThankyou = (order_id) => {
    window.location.replace(`thank-you?id=${order_id}`);
  };

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


  const initializeCashfree = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://sdk.cashfree.com/js/ui/2.0.0/cashfree.prod.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  return (
    <div
      className="mx-md-2 mx-lg-5 mt-lg-4 row"
      style={{ margin: "0", padding: 0 }}
    >
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>
          {" "}
          Books Online India, Buy Online Book In India –mypustak.com
        </title>
        <meta
          name="og:title"
          property="og:title"
          content="Books Online India, Buy Online Book In India –mypustak.com"
        />
        <meta
          name="og:description"
          property="og:description"
          content="  Books are the hub of knowledge. Get the books online in India with us. We aimed to aid (help) the needy one with education and knowledge."
        />
        <meta
          name="og:image"
          property="og:image"
          content="https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png"
        />
        <script
          type="text/javascript"
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        />

        <script
          src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.prod.js"
          async
        ></script>
      </Head>
      <div
        style={{
          typography: "body1",
          padding: "0",
          margin: "0px",
        }}
        className="col-lg-8 g-0 "
      >
        <TabContext value={value}>
          <div className="">
            <div className={`${styles.freebieOfferDivUpper}`}>
              {props.freebie_data.min_cart_value <= renderAmtUsed().total_order_value ? null :
                <Freebies cartvalue={renderAmtUsed().total_order_value} />}
            </div>
            <TabPanel value="1" className="p-0 row " style={{ margin: "1px" }}>
              <div
                className={`d-flex justify-content-between align-items-center mb-2 p-2 ${styles.titlediv}  `}
              >
                <div className="d-flex align-items-center">
                  {" "}
                  <span className={`${styles.stepbadge} `}> 1 </span>Delivery
                  Address
                </div>
                <div>
                  <Button
                    onClick={() => setShowDialog(true)}
                    variant="outlined"
                    size="Small"
                    className={`${styles.addNewAddressBtn}`}
                  >
                    <AddIcon fontSize="small" />
                    Add New Address
                  </Button>
                </div>
              </div>
              <div className="shadow bg-white">
                {props.getadd.length == 0 ? (
                  props.getadd.length == 0 && props.fetching_address_loader ? (
                    <center>
                      <CircularProgress />
                    </center>
                  ) : (
                    <div className={`text-center m-4`}>
                      <div>
                        <ContactsIcon
                          style={{ fontSize: "3rem" }}
                          className={`m-2`}
                        />
                      </div>
                      <div className={` ${styles.font12} font-weight-bold `}>
                        No Addresses found in your account!
                      </div>
                      <div
                        onClick={() => setShowDialog(true)}
                        className={`${styles.font08}`}
                      >
                        <span style={{ color: "#2258ae", cursor: "pointer" }}>
                          Add a delivery address.
                        </span>
                      </div>
                    </div>
                  )
                ) : null}

                {props.getadd
                  .sort(function (a, b) {
                    return b.address_id - a.address_id;
                  })
                  .slice(0, AllAdd)
                  .map((data) => (
                    <div
                      key={data.address_id}
                      className="row py-1 pt-2 border-bottom border-lightgray align-items-center "
                      style={
                        selectedAddress
                          ? selectedAddress.address_id == data.address_id
                            ? {
                              background: "#eef3ff",
                              minHeight: "5rem",
                            }
                            : {
                              minHeight: "5rem",
                            }
                          : {
                            minHeight: "5rem",
                          }
                      }
                      onClick={() => setSelectedAddress(data)}
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
                              checked={
                                selectedAddress
                                  ? selectedAddress.address_id ==
                                    data.address_id
                                    ? true
                                    : false
                                  : null
                              }
                            />
                          </div>

                          <div>
                            <span className={`d-flex align-items-start`}>
                              <span>{data.rec_name}</span>
                              &nbsp;
                              <span className={`${styles.font08}`}>
                                ({data.phone_no})
                              </span>
                              {selectedAddress ? (
                                selectedAddress.address_id ==
                                  data.address_id ? (
                                  <CheckCircleOutlineOutlinedIcon
                                    style={{ color: "green" }}
                                  />
                                ) : null
                              ) : null}
                            </span>
                            <span className={`${styles.font08} p`}>
                              {data.address}
                            </span>
                            <br />
                            <span className={`${styles.font08} p`}>
                              {data.city_name} ({data.state_name}){" "}
                              {data.pincode}
                            </span>
                            {selectedAddress ? (
                              selectedAddress.address_id == data.address_id ? (
                                <div className="text-center mt-3"></div>
                              ) : null
                            ) : null}
                          </div>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-1">
                          <Button
                            onClick={() => {
                              editAddressHand(data);
                            }}
                            variant="outlined"
                            size="small"
                            className={`${styles.editAddressBtn}`}
                          >
                            <EditIcon
                              fontSize="small"
                              className="text-primary"
                            />{" "}
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                {props.getadd.length <= 3 ? null : ShowmoreAddress == false ? (
                  <div
                    onClick={() => {
                      setAllAdd(props.getadd.length);
                      setShowmoreAddress(true);
                    }}
                    className={`${styles.veiwalladd} py-2 pl-3`}
                  >
                    <span className={`${styles.veiwAlladdText}`}>
                      View All Address &nbsp; ({props.getadd.length - 3})
                    </span>
                    <ExpandMoreIcon />
                  </div>
                ) : null}
              </div>
              {/* --------------------------------------tab 1 order summary div------------------------- */}
              <div className="p-0 mt-2">
                <div className="shadow bg-white p-2">
                  <div className="d-flex align-items-center justify-content-between ">
                    <div className="d-flex align-items-center ">
                      {" "}
                      <span className={`${styles.stepbadge} ${styles.colored}`}>
                        {" "}
                        2{" "}
                      </span>
                      Order Summary
                    </div>
                    <div>
                      <div
                        style={{
                          cursor: renderAmtUsed().offer_book_cost
                            ? "help"
                            : null,
                        }}
                        title={
                          renderAmtUsed().offer_book_cost ? "Offer Book" : null
                        }
                      >
                        {" "}
                        &#8377;{renderAmtUsed().total_amt} (for{" "}
                        {getBookQty().oldQty +
                          getBookQty().newQty +
                          getBookQty().notebookQty}
                        {
                          <span>
                            {renderAmtUsed().offer_book_cost ? "+1" : null}
                          </span>
                        }{" "}
                        {getBookQty().oldQty +
                          getBookQty().newQty +
                          getBookQty().notebookQty ==
                          1
                          ? `item`
                          : `items`}{" "}
                        ){" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shadow bg-white p-2 mt-2">
                  <div className="d-flex align-items-center justify-content-between ">
                    <div
                      className={`${styles.payment_div_option} d-flex align-items-center`}
                    >
                      {" "}
                      <span className={`${styles.stepbadge} ${styles.colored}`}>
                        {" "}
                        3{" "}
                      </span>
                      Payment Options
                    </div>
                    <div>
                      <div className={`${styles.payment_hint}`}>
                        Debit card / Credit card / UPI / Cash On Delivery
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* --------------------------------------tab 1 End order summary div------------------------- */}
            </TabPanel>
            <TabPanel value="2" className="p-0 ">
              <div className="shadow p-0">
                <div className="bg-white p-3">
                  <div className="d-flex align-items-center font-weight-bold">
                    <span className={`${styles.stepbadge} ${styles.colored}`}>
                      {" "}
                      1
                    </span>
                    Delivery Address
                    <CheckCircleOutlineOutlinedIcon
                      fontSize="small"
                      className="text-success m-1"
                    />
                  </div>
                  {selectedAddress ? (
                    <div className="row mr-1 justify-content-between">
                      <div className="col-12 row ">
                        <div
                          className="col-9 col-md-9 col-lg-10 "
                          style={{ marginLeft: "1.1rem" }}
                        >
                          <span className={`${styles.font08}`}>
                            <b>{selectedAddress.rec_name}</b>
                          </span>
                          &nbsp;&nbsp;&nbsp;
                          <span className={`${styles.font08}`}>
                            ({selectedAddress.phone_no})
                          </span>
                          <br />
                          <span className={`${styles.font08}`}>
                            {selectedAddress.address},
                            {selectedAddress.city_name},
                            {selectedAddress.state_name},
                            {selectedAddress.pincode}
                          </span>
                        </div>
                        <div className={`${styles.delivery_btn} ml-5 col-1`}>
                          <Button
                            onClick={() => {
                              setValue("1");
                              // Router.push(`?tabvalue=1`, undefined, {
                              //   shallow: true,
                              // });
                            }}
                            size="small"
                            variant="outlined"
                            className={`${styles.changeAddressBtn}`}
                          >
                            Change
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div
                className={`${styles.orderSummeryDiv}cart-left px-0 shadow `}
              >
                <div
                  className={`d-flex shadow justify-content-between align-items-center mt-2 mb-2 p-2 ${styles.titlediv} `}
                >
                  <div className="d-flex align-items-center">
                    {" "}
                    <span className={`${styles.stepbadge} `}> 2 </span>Order
                    Summary
                  </div>
                </div>
                <div className="cart-details  ">
                  {/* <div>
                    <Freebies cartvalue={renderAmtUsed().total_order_value} />
                  </div> */}
                  {/* Freebie Books------------------- */}
                  {props.freebie_data.min_cart_value <= renderAmtUsed().total_order_value ?
                    <div
                      className={` ${styles.bookDetailsOfferDiv} mx-0 px-lg-4 px-md-4 px-sm-4  py-lg-1 bg-white  mt-1  `}
                      id="cartBookdataD"
                    >
                      <div className="row p-0 m-0 ">
                        {false ? null : (
                          <div
                            className={`${styles.bookOfferImageDiv}   col-3 col-sm-2  col-md-2 col-lg-2`}
                          >
                            <MediaQuery minWidth={576}>
                              <div style={{ height: "7rem", width: "6rem" }}>
                                <Image
                                  objectFit="contain"
                                  alt={"Freebie "}
                                  title={'Freebie'}
                                  src={`https://d1f2zer3rm8sjv.cloudfront.net/${props.freebie_data.thumb}`}
                                  id="cartbookimg"
                                  // height={100}
                                  // width={80}
                                  height={0}
                                  width={0}
                                  blurDataURL={`https://d1f2zer3rm8sjv.cloudfront.net/${props.freebie_data.thumb}`}
                                  sizes="100vw"
                                  priority={true}
                                  placeholder="blur"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                                  }}
                                />
                              </div>
                            </MediaQuery>
                            <MediaQuery maxWidth={576}>
                              <div style={{ height: "5.5rem", width: "4.5rem" }}>

                                <Image
                                  src={`https://d1f2zer3rm8sjv.cloudfront.net/${props.freebie_data.thumb}`}
                                  id="cartbookimg"
                                  // height={100}
                                  // width={80}
                                  objectFit="contain"
                                  alt={"Freebie "}
                                  title={'Freebie'}
                                  height={0}
                                  width={0}
                                  blurDataURL={`https://d1f2zer3rm8sjv.cloudfront.net/${props.freebie_data.thumb}`}
                                  sizes="100vw"
                                  priority={true}
                                  placeholder="blur"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                                  }}
                                />
                              </div>

                            </MediaQuery>
                          </div>
                        )}
                        {/* end of leftdetail */}
                        <div className="col-9 col-sm-9 col-lg-10 mt-1  d-flex justify-content-between align-items-start ">
                          <div style={{ maxWidth: "85%" }}>
                            <p className={`${styles.book_title} `}>
                              {props.freebie_data.product_name?.length > 60
                                ? props.freebie_data.product_name
                                  .replace(
                                    /(\w)(\w*)/g,
                                    (_, firstChar, rest) =>
                                      firstChar.toUpperCase() +
                                      rest.toLowerCase()
                                  )
                                  .substring(0, 60)
                                  .concat("...")
                                : props.freebie_data.product_name}
                              &nbsp;
                              <span
                                className={`${styles.font08} text-success d-flex  align-items-center`}
                              >
                                <CheckCircleOutlineOutlinedIcon fontSize="small" />{" "}
                                Freebie
                              </span>
                            </p>
                            <div
                              className={`${styles.font08} d-block p d-lg-flex justify-content-between `}
                            >
                              <div id="orgmrp">
                                <p className="m-0" id="cartBookpriceS">
                                  MRP: &#8377;
                                  <span
                                    id="cartBookPrice"
                                    style={false
                                      ? null
                                      : {
                                        textDecoration: "line-through",
                                      }
                                    }
                                  >
                                    {
                                      props.freebie_data
                                        .mrp
                                    }
                                  </span>
                                </p>

                              </div>

                            </div>
                            <div id="Bookinfo1"></div>
                            <div className="d-flex align-items-center"></div>
                          </div>

                          {/* <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setofferbookremove(true);
                          }}
                          style={{ textTransform: "capitalize" }}
                          className={`${styles.removeOrderBookBtn}`}
                        >
                          <DeleteIcon
                            fontSize="small"
                            className="text-primary"
                          />
                          <span className={`${styles.font08}`}>Remove</span>
                        </Button> */}
                        </div>
                      </div>
                    </div> : null}

                  {/* Offer Book Dive------------------------ */}
                  {renderAmtUsed().offer_book_cost ? (
                    offerbookloader ? (
                      <div
                        className={`${styles.orderBookLoaderDiv} d-flex justify-content-center align-items-center `}
                      >
                        <center
                          className={`d-flex flex-column align-items-center`}
                        >
                          <CircularProgress size={35} />
                          <i className={styles.font08}>
                            Loading a new offer book for you...
                          </i>
                        </center>
                      </div>
                    ) : (
                      <div
                        className={` ${styles.bookDetailsOfferDiv} mx-0 px-lg-4 px-md-4 px-sm-4  py-lg-1 bg-white  mt-1  `}
                        id="cartBookdataD"
                      >
                        <div className="row p-0 m-0 ">
                          {false ? null : (
                            <div
                              className={`${styles.bookOfferImageDiv} col-3 col-sm-2  col-md-2 col-lg-2`}
                            >
                              <MediaQuery minWidth={576}>
                                <div style={{ height: "7rem", width: "6rem" }}>
                                  <Image
                                    src={`https://d1f2zer3rm8sjv.cloudfront.net/${props.offerBook.thumb}`}
                                    id="cartbookimg"
                                    // height={100}
                                    // width={80}
                                    objectFit="contain"
                                    alt={"Offer Book "}
                                    title={'Offer Book'}
                                    height={0}
                                    width={0}
                                    blurDataURL={`https://d1f2zer3rm8sjv.cloudfront.net/${props.offerBook.thumb}`}
                                    sizes="100vw"
                                    priority={true}
                                    placeholder="blur"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                                    }}
                                  />
                                </div>
                              </MediaQuery>
                              <MediaQuery maxWidth={576}>
                                <div style={{ height: "5.5rem", width: "4.5rem" }}>
                                  <Image
                                    // alt=""
                                    src={`https://d1f2zer3rm8sjv.cloudfront.net/${props.offerBook.thumb}`}
                                    id="cartbookimg"
                                    // height={100}
                                    // width={80}
                                    objectFit="contain"
                                    alt={"Offer Book "}
                                    title={'Offer Book'}
                                    height={0}
                                    width={0}
                                    blurDataURL={`https://d1f2zer3rm8sjv.cloudfront.net/${props.offerBook.thumb}`}
                                    sizes="100vw"
                                    priority={true}
                                    placeholder="blur"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                                    }}
                                  />
                                </div>
                              </MediaQuery>
                            </div>
                          )}
                          {/* end of leftdetail */}
                          <div className="col-9 col-sm-9 col-lg-10 mt-1  d-flex justify-content-between align-items-start ">
                            <div style={{ maxWidth: "85%" }}>
                              <p className={`${styles.book_title} `}>
                                {props.offerBook.title?.length > 60
                                  ? props.offerBook.title
                                    .replace(
                                      /(\w)(\w*)/g,
                                      (_, firstChar, rest) =>
                                        firstChar.toUpperCase() +
                                        rest.toLowerCase()
                                    )
                                    .substring(0, 60)
                                    .concat("...")
                                  : props.offerBook.title}
                                &nbsp;
                                <span
                                  className={`${styles.font08} text-success d-flex  align-items-center`}
                                >
                                  <CheckCircleOutlineOutlinedIcon fontSize="small" />{" "}
                                  Offer Book
                                </span>
                              </p>
                              <div
                                className={`${styles.font08} d-block p d-lg-flex justify-content-between `}
                              >
                                {props.offerBook.book_inv_id
                                  .toString()
                                  .indexOf("NB") > -1 ? (
                                  <span id="cartBookShippingS">
                                    Price: &#8377;
                                    {/* {Math.round(cart.bookShippingCost)} */}
                                    {renderAmtUsed().offer_book_cost}
                                  </span>
                                ) : (
                                  <div id="orgmrp">
                                    <p className="m-0" id="cartBookpriceS">
                                      MRP: &#8377;
                                      <span
                                        id="cartBookPrice"
                                        style={
                                          props.offerBook.book_inv_id
                                            .toString()
                                            .indexOf("NB") > -1
                                            ? null
                                            : {
                                              textDecoration: "line-through",
                                            }
                                        }
                                      >
                                        {
                                          props.offerBook
                                            .shipping_handling_charge
                                        }
                                      </span>
                                      {props.offerBook.book_inv_id
                                        .toString()
                                        .indexOf("NB") > -1 ? null : (
                                        <span
                                          id="cartFree"
                                          className="text-success"
                                        >
                                          &nbsp; &#8377;
                                          {renderAmtUsed().offer_book_cost}
                                        </span>
                                      )}
                                    </p>
                                    {props.offerBook.book_inv_id
                                      .toString()
                                      .indexOf("NB") > -1 ? (
                                      <React.Fragment></React.Fragment>
                                    ) : (
                                      <React.Fragment>
                                        <br />
                                        <span id="cartBkShipChargeS"></span>
                                      </React.Fragment>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div id="Bookinfo1"></div>
                              <div className="d-flex align-items-center"></div>
                            </div>

                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => {
                                setofferbookremove(true);
                              }}
                              style={{ textTransform: "capitalize" }}
                              className={`${styles.removeOrderBookBtn}`}
                            >
                              <DeleteIcon
                                fontSize="small"
                                className="text-primary"
                              />
                              <span className={`${styles.font08}`}>Remove</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  ) : null}

                  {groupedArray2.length ? (
                    groupedArray2.map((cartitem) => {
                      return (
                        <div key={cartitem.cart_id}>
                          {/* /***********Only Applicable for Multi Vendor Sellers *****************/}
                          {cartitem[1].map((cart) => {
                            return (
                              <div
                                className={` ${styles.bookDetailsOfferDiv} mx-0 px-lg-4 px-md-4 px-sm-4  py-lg-1 bg-white  mt-1  `}
                                id="cartBookdataD"
                                key={cart.bookInvId}
                              >
                                <div className="row p-0 m-0  ">
                                  {false ? null : (
                                    <div
                                      className={`${styles.bookOfferImageDiv}  col-3 col-sm-2 col-md-2 col-lg-2 `}
                                    >
                                      <MediaQuery minWidth={576}>
                                        <div style={{ height: "7rem", width: "6rem" }}>
                                          <Image
                                            // alt=""
                                            src={`https://d1f2zer3rm8sjv.cloudfront.net/${cart.bookThumb}`}
                                            id="cartbookimg"
                                            // height={100}
                                            // width={80}
                                            objectFit="contain"
                                            alt={cart.bookName}
                                            title={cart.bookName}
                                            height={0}
                                            width={0}
                                            blurDataURL={`https://d1f2zer3rm8sjv.cloudfront.net/${cart.bookThumb}`}
                                            sizes="100vw"
                                            priority={true}
                                            placeholder="blur"
                                            onError={(e) => {
                                              e.target.onerror = null;
                                              e.target.src =
                                                "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                                            }}
                                          />
                                        </div>
                                      </MediaQuery>
                                      <MediaQuery maxWidth={576}>
                                        <div style={{ height: "6rem", width: "5rem" }}>
                                          <Image
                                            // alt=""
                                            src={`https://d1f2zer3rm8sjv.cloudfront.net/${cart.bookThumb}`}
                                            id="cartbookimg"
                                            // height={100}
                                            // width={80}
                                            objectFit="contain"
                                            alt={cart.bookName}
                                            title={cart.bookName}
                                            height={0}
                                            width={0}
                                            blurDataURL={`https://d1f2zer3rm8sjv.cloudfront.net/${cart.bookThumb}`}
                                            sizes="100vw"
                                            priority={true}
                                            placeholder="blur"
                                            onError={(e) => {
                                              e.target.onerror = null;
                                              e.target.src =
                                                "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                                            }}
                                          />
                                        </div>
                                      </MediaQuery>
                                    </div>
                                  )}

                                  <div className="col-9 col-sm-9 col-lg-10 mt-1 d-flex justify-content-between align-items-start  ">
                                    <div style={{ maxWidth: "85%" }}>
                                      <p className={`${styles.book_title} `}>
                                        {cart.bookName.length > 60
                                          ? cart.bookName
                                            .replace(
                                              /(\w)(\w*)/g,
                                              (_, firstChar, rest) =>
                                                firstChar.toUpperCase() +
                                                rest.toLowerCase()
                                            )
                                            .substring(0, 60)
                                            .concat("...")
                                          : cart.bookName}
                                      </p>
                                      {props.OutOfStockBooks.includes(
                                        cart.bookInvId
                                      ) ? (
                                        <p
                                          className="p "
                                          style={{
                                            margin: 0,
                                            fontSize: "0.8rem",
                                            color: "red",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Out Of Stock,Please Remove It
                                        </p>) : null}
                                      <div
                                        className={`${styles.font08} d-block p d-lg-flex justify-content-between `}
                                      >
                                        {cart.bookInvId
                                          .toString()
                                          .indexOf("KOL") > -1 ? (
                                          <div>
                                            {" "}
                                            <span className="">
                                              Price: &#8377;
                                              {Math.round(
                                                cart.bookShippingCost
                                              )}{" "}
                                              ({cart.discount_per}% Off)
                                            </span>
                                            <div className="">
                                              MRP: &#8377;
                                              {Math.round(cart.bookPrice)}
                                            </div>{" "}
                                          </div>
                                        ) : cart.bookInvId
                                          .toString()
                                          .indexOf("NB") > -1 ? (
                                          <div>
                                            <span id="cartBookShippingS">
                                              Price: &#8377;
                                              <span
                                                style={{
                                                  textDecoration:
                                                    "line-through",
                                                }}
                                              >
                                                {" "}
                                                {cart.bookPrice}
                                              </span>
                                              &nbsp; &#8377;
                                              {Math.round(
                                                cart.bookShippingCost
                                              )}
                                            </span>
                                            {/* <div id='cartBookShippingS'>
                                                MRP: &#8377;
                                                {Math.round(cart.bookPrice)}
                                              </div> */}
                                          </div>
                                        ) : cart.bookInvId
                                          .toString()
                                          .indexOf("IB") > -1 ? (
                                          <div>
                                            <span id="cartBookShippingS">
                                              Price: &#8377;
                                              {Math.round(
                                                cart.bookShippingCost
                                              )}
                                            </span>
                                            &nbsp;&nbsp;
                                            <span style={{}}>
                                              <s>{cart.bookPrice}</s>
                                              <span className="text-success">
                                                &nbsp; (
                                                {
                                                  getDiscountPercentage(
                                                    Math.round(
                                                      cart.bookShippingCost
                                                    ),
                                                    cart.bookPrice
                                                  ).percentage
                                                }%
                                                Off)
                                              </span>
                                            </span>
                                          </div>
                                        ) : (
                                          <div id="orgmrp">
                                            <p
                                              className="m-0"
                                              id="cartBookpriceS"
                                            >
                                              MRP: &#8377;
                                              <span
                                                id="cartBookPrice"
                                                style={
                                                  cart.bookInvId
                                                    .toString()
                                                    .indexOf("NB") > -1
                                                    ? null
                                                    : {
                                                      textDecoration:
                                                        "line-through",
                                                    }
                                                }
                                              >
                                                {TotalPrice(cart.bookPrice)}
                                              </span>
                                              {cart.bookInvId
                                                .toString()
                                                .indexOf("KOL") >
                                                -1 ? null : cart.bookInvId
                                                  .toString()
                                                  .indexOf("NB") > -1 ? null : (
                                                <span id="cartFree">
                                                  (Free)
                                                </span>
                                              )}
                                            </p>
                                            {cart.bookInvId
                                              .toString()
                                              .indexOf("NB") > -1 ? (
                                              <React.Fragment>
                                                {cart.delivery_cost ? (
                                                  <div>
                                                    Delivery Cost :{" "}
                                                    {cart.delivery_cost}
                                                  </div>
                                                ) : null}
                                              </React.Fragment>
                                            ) : (
                                              <React.Fragment>
                                                <span id="cartBookShippingS">
                                                  Shipping & Handling charges
                                                  &nbsp; &#8377;
                                                  {Math.round(
                                                    cart.bookShippingCost
                                                  )}
                                                </span>
                                                <br />
                                                <span id="cartBkShipChargeS"></span>
                                              </React.Fragment>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                      <div id="Bookinfo1">
                                        {cart.bookInvId
                                          .toString()
                                          .indexOf("NB") > -1 &&
                                          cart.offertype ? (
                                          <p
                                            id="yousaved"
                                            className={`${styles.font08} text-success`}
                                          >
                                            {cart.offertype == "cashback" ? (
                                              <React.Fragment>
                                                You Earned &#8377;{" "}
                                                {Math.round(cart.bookPrice) -
                                                  CashbackPrice(
                                                    cart.bookPrice,
                                                    cart.cashback_per
                                                  )}
                                                <span
                                                  className={`${styles.bookCoinText} `}
                                                >
                                                  (BookCoins of Worth{ }
                                                  {cart.cashback_per}% of{" "}
                                                  {cart.bookPrice})
                                                </span>
                                              </React.Fragment>
                                            ) : (
                                              <React.Fragment>
                                                You Saved &#8377;
                                                {Math.round(cart.bookPrice) -
                                                  DicountedPrice(
                                                    cart.bookPrice,
                                                    cart.discount_per
                                                  )}{" "}
                                                (Flat {cart.discount_per}% Off)
                                              </React.Fragment>
                                            )}
                                          </p>
                                        ) : null}
                                      </div>
                                      <div className="d-flex align-items-center">
                                        {cart.bookInvId
                                          .toString()
                                          .indexOf("KOL") > -1 ? null : (
                                          <div className="d-lg-block mt-2">
                                            <Button
                                              variant="outlined"
                                              size="small"
                                              className="mr-2 mb-2 text-primary text-capitalize"
                                              onClick={() =>
                                                Click_savelater(cart)
                                              }
                                            >
                                              Save later
                                            </Button>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      onClick={() =>
                                        ConfirmRemoveFromCart(
                                          cart.bookInvId,
                                          cart.Cart_id
                                        )
                                      }
                                      style={{ textTransform: "capitalize" }}
                                      className={`${styles.removeOrderBookBtn}`}
                                    >
                                      <DeleteIcon
                                        fontSize="small"
                                        className="text-primary"
                                      />
                                      <span className={`${styles.font08}`}>
                                        Remove
                                      </span>
                                    </Button>
                                  </div>
                                  {/* end of leftdetail */}
                                </div>
                              </div>
                            );
                          })}
                          <div
                            className={`${styles.booktotal_cost}`}
                            style={{}}
                          >
                            {cartitem[0] == 1 ? (
                              Vendor_wise_delivery_cost(cartitem) != 0 ? (
                                <p className="mt-0">
                                  Total Delivery Charge: ₹
                                  {Vendor_wise_delivery_cost(cartitem)}
                                </p>
                              ) : cartitem[0] ==
                                0 ? null : Vendor_wise_delivery_cost(
                                  cartitem
                                ) != 0 ? (
                                <p>
                                  Total Delivery Charge: ₹
                                  {Vendor_wise_delivery_cost(cartitem)}
                                </p>
                              ) : null
                            ) : null}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>Data not found</div>
                  )}
                </div>
              </div>
              <div className="shadow bg-white p-2 my-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div
                    className={`${styles.payment_div_option} d-flex align-items-center`}
                  >
                    {" "}
                    <span className={`${styles.stepbadge} ${styles.colored}`}>
                      {" "}
                      3{" "}
                    </span>
                    Payment Options
                  </div>
                  <div>
                    <div className={`${styles.font08} text-secondary`}>
                      Debit card / Credit card / UPI / Cash On Delivery
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel value="3" className={`p-0 ${styles.tabPanel3}  `} style={{ margin: "1px" }}>
              <div className={`${styles.tabPanel3Div} shadow`}>
                <div className={`${styles.tab3AddressDiv}`}>
                  <div className="d-flex align-items-center">
                    <span className={`${styles.stepbadge} ${styles.colored}`}>
                      {" "}
                      1{" "}
                    </span>
                    Delivery Address
                    <CheckCircleOutlineOutlinedIcon
                      fontSize="small"
                      className="text-success mx-1"
                    />
                  </div>
                  {selectedAddress ? (
                    <div className={` ${styles.tab3AddressDetailsDiv} row`}>
                      <div className="col-12 row  justify-content-between">
                        <div
                          className={` ${styles.tab3AddressDetails} col-9 col-md-9 col-lg-11`}
                        >
                          <span className={`${styles.font08}`}>
                            <span>{selectedAddress.rec_name}</span>
                          </span>
                          &nbsp;
                          <span className={`${styles.font08} p`}>
                            ({selectedAddress.phone_no})
                          </span>
                          <br />
                          <span className={`${styles.font08} p`}>
                            {selectedAddress.address},
                            {selectedAddress.city_name},
                            {selectedAddress.state_name},
                            {selectedAddress.pincode}
                          </span>
                        </div>
                        <div className={`${styles.delivery_btn}  col-1`}>
                          <Button
                            onClick={() => {
                              setValue("1");
                              // Router.push(`?tabvalue=1`, undefined, {
                              //   shallow: true,
                              // });
                            }}
                            size="small"
                            variant="outlined"
                            className={`${styles.tab3ChangeAddressBtn}`}
                          >
                            Change
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={`${styles.tabPanel3Div} shadow`}>
                <div
                  className={`${styles.tab3AddressDiv} d-flex align-items-center justify-content-between`}
                >
                  <div className="d-flex align-items-center">
                    <span className={`${styles.stepbadge} ${styles.colored}`}>
                      {" "}
                      2{" "}
                    </span>
                    <span>
                      Order Summary &nbsp;
                      <span
                        className={`${styles.font08}`}
                        style={{
                          cursor: renderAmtUsed().offer_book_cost
                            ? "help"
                            : null,
                        }}
                        title={
                          renderAmtUsed().offer_book_cost ? "Offer Book" : null
                        }
                      >
                        (
                        {getBookQty().newQty +
                          getBookQty().oldQty +
                          getBookQty().notebookQty}
                        {renderAmtUsed().offer_book_cost ? "+1" : null}{" "}
                        {getBookQty().newQty +
                          getBookQty().oldQty +
                          getBookQty().notebookQty >
                          1
                          ? "items"
                          : "item"}
                        )
                      </span>
                    </span>
                    <CheckCircleOutlineOutlinedIcon
                      fontSize="small"
                      className="text-success mx-2"
                    />
                  </div>
                  <div>
                    <Button
                      onClick={() => {
                        setValue("2");
                        // Router.push(`?tabvalue=2`, undefined, {
                        //   shallow: true,
                        // });
                      }}
                      size="small"
                      variant="outlined"
                      className={`${styles.tab3ChangeOrderBtn}`}
                    >
                      Change
                    </Button>
                  </div>
                </div>
              </div>
              <div className="shadow">
                <div
                  className={`d-flex shadow justify-content-between align-items-center mb-2 p-2 ${styles.titlediv} `}
                >
                  <div className="d-flex align-items-center">
                    {" "}
                    <span className={`${styles.stepbadge}`}> 3 </span>Payment
                    Option
                  </div>
                </div>
                <div className="bg-white">
                  {props.bookcoins > 0 ? (
                    <div className={`${styles.paymentOption} row mb-1`}>
                      <div className={`${styles.pay_option} d-flex`}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={() => {
                            bookcoinCheckbox(renderAmtUsed().total_amt);
                          }}
                          value=""
                          id=""
                          checked={applyBookcoinsSelected}
                        />
                        <div className="d-flex mx-2">
                          <div>
                            <span>
                              <Image
                                width={26}
                                height={26}
                                src={bookcoinimg}
                                className={`${styles.bookCoinsImage}`}
                                alt=""
                              />
                            </span>
                          </div>
                          <div>
                            <span className={`${styles.bookcoin_text}`}>
                              You have Bookcoin worth : ₹ {props.bookcoins}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div
                    className={` ${styles.tab3WalletContainer} row g-0  border  `}
                  >
                    <div className={`${styles.pay_option} col-7 `}>
                      <div className="d-flex ">
                        <div>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={() => {
                              props.walletbalance <= 0
                                ? enqueueSnackbar(
                                  "Please recharge your wallet",
                                  {
                                    variant: "warning",
                                  }
                                )
                                : onselect_wallet();
                            }}
                            value=""
                            id=""
                            checked={
                              props.walletbalance <= 0 ? false : WalletSelected
                            }
                          />
                        </div>
                        <div
                          className="d-flex"
                          style={{ marginLeft: "0.5rem" }}
                        >
                          <AccountBalanceWalletOutlinedIcon className="text-primary" />
                          <div style={{}} className={`${styles.balance_text}`}>
                            <span>Wallet Balance </span>
                            <div className={`${styles.balance_subtext}`}>
                              Balance: ₹{" "}
                              {props.walletbalance <= 0
                                ? "Zero"
                                : props.walletbalance}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 col-5">
                      <Button
                        fullWidth
                        type="submit"
                        variant="outlined"
                        className={` ${styles.tab3RechargeWalletBtn} w-80`}
                        onClick={() =>
                          redirect_wallet(renderAmtUsed().netPayAmt)
                        }
                      >
                        Recharge Wallet
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Prepaid Options */}
                <div
                  onClick={() => {
                    setpaymentType("prepaid");
                  }}
                  className={`${styles.choose_option} d-flex mb-2`}
                  style={{
                    alignItems: "flex-start",
                    marginRight: "0px",
                    marginLeft: "0px",
                    height: "6rem",
                    cursor: "pointer",
                    backgroundColor:
                      paymentType == "prepaid" ? "#2258ae1a" : null,
                  }}
                >
                  <div>
                    <input
                      onClick={() => {
                        setpaymentType("prepaid");
                      }}
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      checked={paymentType == "prepaid" ? true : false}
                    />
                  </div>

                  <div style={{ display: "flex" }}>
                    <div style={{ marginLeft: "0.4rem" }}>
                      <WalletOutlinedIcon className="text-primary" />
                    </div>

                    <div style={{ marginLeft: "0.5rem" }}>
                      <span
                        style={{
                          marginBottom: "8px",
                          fontWeight: paymentType == "cod" ? "normal" : "bold",
                        }}
                      >
                        Prepaid{" "}
                        <span
                          className={`${styles.tab3DebitText} prepaid_subtext`}
                        >
                          {" "}
                          (Debit card/Credit card/Netbanking/ UPI)
                        </span>
                      </span>
                      <div className="d-flex align-items-center">
                        <div
                          className={`border each_button ${prepaid3rd_partySelected == "Razorpay"
                            ? "each_button_active"
                            : null
                            }`}
                          onClick={() =>
                            handlepayment3rd_partySelectDiv("Razorpay")
                          }
                        >
                          <label
                            style={{
                              border:
                                prepaid3rd_partySelected == "Razorpay"
                                  ? "2px solid #2248AE"
                                  : "2px solid lightgray",
                              minWidth: "7.5rem",
                              padding: "8px",
                              cursor: "pointer",
                              backgroundColor: "#fff",
                            }}
                            id={
                              prepaid3rd_partySelected == "Razorpay"
                                ? "precoduntick"
                                : "precod"
                            }
                          >
                            <Image
                              src={razorpaylogo}
                              height={18}
                              width={100}
                              alt="razorpay"
                            />
                          </label>
                        </div>
                        <div
                          className={`each_button ${prepaid3rd_partySelected == "Cashfree"
                            ? "each_button_active"
                            : null
                            }`}
                          onClick={() => {
                            handlepayment3rd_partySelectDiv("Cashfree");
                          }}
                        >
                          <label
                            style={{
                              marginLeft: "0.5rem",
                              border:
                                prepaid3rd_partySelected == "Cashfree"
                                  ? "2px solid #2248AE"
                                  : "2px solid lightgray",
                              padding: "5px 8px",
                              minWidth: "7.5rem",
                              cursor: "pointer",

                              backgroundColor: "#fff",
                            }}
                            id={
                              prepaid3rd_partySelected == "Razorpay"
                                ? "precoduntick"
                                : "precod"
                            }
                          >
                            <Image
                              src={cashfreelogo}
                              height={24}
                              width={100}
                              alt="cashfree"
                            />
                          </label>

                          <div
                            style={
                              {
                                // textAlign: "center",
                                // fontSize: "0.6rem",
                                // marginLeft: "-6px",
                              }
                            }
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* cod options */}

                <div
                  onClick={() => {
                    setpaymentType("cod");
                    setWalletSelected(false);
                  }}
                  className={`${styles.choose_option} d-flex mb-2`}
                  style={{
                    alignItems: "flex-start",
                    marginRight: "1px",
                    marginLeft: "1px",
                    height: "6rem",
                    cursor: "pointer",
                    backgroundColor: paymentType == "cod" ? "#2258ae1a" : null,
                  }}
                >
                  <div className="d-flex  ">
                    <div>
                      <input
                        onClick={() => {
                          setpaymentType("cod");
                          setWalletSelected(false);
                        }}
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        checked={paymentType == "cod" ? true : false}
                      />
                    </div>
                    <div style={{ marginLeft: "0.4rem" }}>
                      <PaymentsIcon className="text-primary" />
                    </div>
                  </div>
                  <div className="">
                    <div className="col-lg-6 col-sm-6 col-md-12">
                      <span
                        style={{
                          marginLeft: "0.5rem",
                          minWidth: "5rem",
                          fontWeight: paymentType == "cod" ? "bold" : "normal",
                        }}
                      >
                        Cash on Delivery
                      </span>
                    </div>
                    <div>
                      <p
                        className={`${styles.font08} mx-2 text-secondary lh-1 opacity-75`}
                      >
                        An extra charge of <b>₹50</b> is applicable for COD
                        orders as cash collection charge
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </TabPanel>
          </div>
        </TabContext>
      </div>
      <div className="cart_right d-none d-lg-block col-12 col-sm-6 col-lg-4   ">
        {value != 3 ? null : (
          <div
            className="coupondiv border border-1 bg-white mt-4"
            style={{ minHeight: "8rem" }}
          >
            <div className="text-bold couponApplyText border-bottom py-2">
              Coupons & Offers (if any)
            </div>

            <div
              className="d-flex px-2  rounded"
              style={{ alignItems: "baseline" }}
            >
              <TextField
                id="applycoupon"
                label="Enter PromoCode  "
                error={
                  coupon.length <= 5 && coupon
                    ? true
                    : coupon.length == 6
                      ? props.couponResponse
                        ? true
                        : false
                      : false
                }
                InputLabelProps={{
                  style: { fontSize: 13 },
                }}
                size="small"
                value={coupon}
                type="text"
                name="PincodeCheck"
                onChange={HandleOnChangeApplycoupon}
                inputProps={{
                  maxLength: 10,
                  style: {
                    padding: 5,
                  },
                }}
                margin="dense"
                style={{
                  width: "10rem",
                  marginRight: "0.5rem",

                  textTransform: "capitalize",
                }}
              />

              <Button
                variant="contained"
                disabled={RenderCouponResponse() ? true : false}
                onClick={handleOnclickCouponbtn}
                className={`${styles.cuoponApplyBtn}`}
              >
                Apply
              </Button>
              <Button
                className={`${styles.BtnCouponView}`}
                size="small"
                onClick={() => {
                  setcouponloader(true);
                  props.getOffers().then((res) => {
                    setcouponloader(false);
                  });
                  setisviewCoupon(true);
                }}
              >
                View Coupons
              </Button>
            </div>
            <div className={`px-2 ${styles.font08} `}>
              {true ? (
                <div>
                  {coupon.length > 3 ? (
                    <div>
                      {props.couponResponse ? (
                        RenderCouponResponse()
                      ) : (
                        <div style={{ color: "red" }}>
                          {RenderCouponResponse()}
                        </div>
                      )}{" "}
                    </div>
                  ) : null}
                  {props.couponResult.order_pay_type == 0 || props.couponResult.order_pay_type == 2 ? paymentType == "prepaid" ?
                    props.couponR && props.appliedcoupon ? (
                      <div>
                        <div className={`${styles.applyCouponSuccesMsg}`}>
                          <b>
                            {props.couponResult.description
                              ? "MyPustak-Coupon Applied Successfully"
                              : null}
                          </b>
                        </div>
                        <div className={`${styles.applyCouponSuccesDes}`}>
                          {props.couponResult.description}
                        </div>
                      </div>
                    ) : null : props.couponR && props.appliedcoupon ?
                      <div style={{ color: "#f35631", paddingTop: "0.2rem", fontWeight: "bold" }}> Coupon code only applied on Prepaid order </div> : null : null}
                </div>
              ) : null}
            </div>
          </div>
        )}
        <div
          style={{
            position: "sticky",
            top: 60,
          }}
        >
          <div
            className={
              value == 3
                ? " my-4 p-2 p-sm-4 border bg-white "
                : " mb-4 p-2 p-sm-4 border bg-white "
            }
            style={{ minHeight: "16rem" }}
          >
            <table className="table table-borderless ">
              <tbody style={{ color: "#737373", fontSize: "0.84rem" }}>
                {getBookQty().newQty == 0 ? null : (
                  <tr style={{}}>
                    {isMaskPresentMask().mask == 1 ? (
                      <td className="p-1 p-sm-auto">Product Price</td>
                    ) : (
                      <td className="p-1 p-sm-auto">New Book Price</td>
                    )}
                    <td className="p-1 p-sm-auto">
                      <span id="BookPricediv">
                        {" "}
                        &#8377;
                        {Math.round(renderAmtUsed().newBookPrice)}
                      </span>
                      <span id="newbookqyt">
                        (
                        {isMaskPresentMask().book_and_mask == 1
                          ? getBookQty().newQty - 1
                          : getBookQty().newQty}
                        {getBookQty().newQty == 1 ? `Book` : `Books`})
                      </span>
                    </td>
                  </tr>
                )}
                {getBookQty().newQty == 0 ? null : (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto">New Book Delivery Charges</td>
                    <td className="p-1 p-sm-auto">
                      <span id="DeliveryPricediv">
                        {" "}
                        &#8377;
                        {Math.round(renderAmtUsed().newBookDeliveryCost)}
                      </span>
                    </td>
                  </tr>
                )}

                {Math.round(renderAmtUsed().oldBookPrice) == 0 ? (
                  <tr></tr>
                ) : (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto"   >
                      Shipping & Handling ( Used Books )
                    </td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        &#8377;
                        {Math.round(renderAmtUsed().oldBookPrice)}&nbsp;
                      </span>
                      ({getBookQty().oldQty}&nbsp;
                      {getBookQty().oldQty == 1 ? "Book" : "Books"})
                    </td>
                  </tr>
                )}

                {Math.round(renderAmtUsed().noteBookPrice) == 0 ? (
                  <tr></tr>
                ) : (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto">
                      Notebook Price (Incl. all taxes)
                    </td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        &#8377;
                        {Math.round(renderAmtUsed().noteBookPrice)}&nbsp; (
                        {getBookQty().notebookQty}{" "}
                        {getBookQty().notebookQty == 1 ? "Item" : "Items"})
                      </span>
                    </td>
                  </tr>
                )}
                {paymentType == "cod" ? (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto  ">
                      Cash Collection Charge
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            <span className={`${styles.font08} `}>
                              It is an extra charge applicable on every CASH ON
                              DELIVERY Order applied by our delivery partner for
                              collecting cash for the shipment value.We request
                              you to select prepaid methods to avoid these extra
                              charges .
                            </span>
                          </Tooltip>
                        }
                      >
                        <span className="d-inline-block ">
                          <span id="QuestionMark">
                            <HelpIcon
                              style={{
                                height: "26px",
                                fontSize: "1rem",
                                cursor: "pointer",
                                color: "gray",
                              }}
                            />
                          </span>
                        </span>
                      </OverlayTrigger>
                    </td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        &#8377;
                        {Math.round(50)}
                      </span>
                    </td>
                  </tr>
                ) : null}

                {renderAmtUsed().offer_book_cost ? (
                  <tr>
                    <td className="p-1 p-sm-auto">Offered Book</td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        &#8377;
                        {renderAmtUsed().offer_book_cost}
                      </span>
                    </td>
                  </tr>
                ) : null}
                {min_order_charge ? (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto">
                      Minimum order value difference
                    </td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        &#8377;
                        {min_order_charge}
                      </span>
                    </td>
                  </tr>
                ) : null}

                {
                  // renderAmtUsed().total_amt ==
                  renderAmtUsed().total_order_value ==
                    renderAmtUsed().netPayAmt ? null : (
                    <tr
                      style={{
                        borderTop: "1px solid #ddd",
                        fontSize: "0.98rem",
                      }}
                    >
                      <td
                        className="text p-1 p-sm-auto"
                        style={{ color: "gray" }}
                      >
                        <b>Total Amount</b>
                      </td>
                      <td className="p-1 p-sm-auto text-nowrap" style={{}}>
                        <span id="Totalpricediv">
                          &#8377;
                          {props.ItemsInCart !== 0
                            ? renderAmtUsed().total_order_value
                            : //  renderAmtUsed().total_amt
                            0}
                        </span>
                      </td>
                    </tr>
                  )
                }
                {renderAmtUsed().deductWalletAmt == 0 ? null : (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto" style={{ color: "green" }}>
                      Wallet Applied!
                    </td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        - &#8377; {renderAmtUsed().deductWalletAmt}
                      </span>
                    </td>
                  </tr>
                )}

                {reduceAmtUsingCoupon ? (
                  paymentType == "cod" ? null : (
                    <tr style={{}}>
                      <td className="p-1 p-sm-auto text-success">
                        Coupon Applied!
                      </td>
                      <td className="p-1 p-sm-auto">
                        <span id="ShippingPricediv">
                          {" "}
                          - &#8377; {reduceAmtUsingCoupon}
                        </span>
                      </td>
                    </tr>
                  )
                ) : null}
                {props.cashback == 0 || paymentType == "cod" ? null : (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto text-success">
                      Cashback Applied!
                    </td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        - &#8377; {props.cashback}
                      </span>
                    </td>
                  </tr>
                )}

                {renderAmtUsed().ShowpepaidBookCoinsCanBeUsed == 0 ||
                  paymentType == "cod" ? null : (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto text-success">
                      Bookcoins Applied!
                    </td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        - &#8377; {renderAmtUsed().ShowpepaidBookCoinsCanBeUsed}
                      </span>
                    </td>
                  </tr>
                )}

                <tr
                  style={{ borderTop: "1px solid #ddd", fontSize: "0.98rem" }}
                >
                  <td className="text-success p-1 p-sm-auto">
                    <b>Total Payable</b>
                  </td>
                  <td className="p-1 p-sm-auto text-nowrap" style={{}}>
                    <b id="Totalpricediv" className="text-success">
                      &#8377;
                      {props.ItemsInCart !== 0 ? renderAmtUsed().netPayAmt : 0}

                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex text-danger opacity-75">
              {minordervalue && min_order_charge > 0 ? (
                <div>
                  <WarningAmberIcon
                    small
                    className={`${styles.minOrderValueIcon}`}
                  />
                </div>
              ) : null}

              {minordervalue > 0 && min_order_charge > 0 ? (
                <div className={`${styles.minOrderValueText}`}>
                  <span>
                    Minimum order value should be Rs. {`${minordervalue}`}{" "}
                    ,Please add more Books else proceed to pay Rs.
                    {`${minordervalue}`}
                    and place your order
                  </span>
                </div>
              ) : null}
            </div>
          </div>
          <Button
            className="w-100 py-3 mb-3 text-white shadow"
            disabled={confirmOrder || !renderAmtUsed().total_amt}
            onClick={async (e) => {
              e.preventDefault();
              let AllBooksData = props.cartDetails;
              let getAllOutOfStockBook_Inv = [];
              AllBooksData.map((books) => {
                getAllOutOfStockBook_Inv.push(books.bookInvId);
              });
              if (getAllOutOfStockBook_Inv.length) {
                const BookInvdata = {
                  book_inv: getAllOutOfStockBook_Inv,
                };
                let res = await props.OutOfStock("", BookInvdata);
              }
              if (value == 1) {
                if (props.OutOfStockBooks.length) {
                  check_outofstock_book()
                  setopenRemoveOutStockDialog(true);
                  return;
                } else {
                  address_selected_tab();
                  return;
                }
              } else if (value == 2) {
                if (props.OutOfStockBooks.length) {
                  check_outofstock_book()
                  setopenRemoveOutStockDialog(true);
                  return;
                } else {
                  check_outofstock_book()
                  setValue("3");
                  // Router.push(`?tabvalue=3`, undefined, { shallow: true });
                  return
                }
              } else {
                if (props.OutOfStockBooks.length) {
                  check_outofstock_book()
                  setopenRemoveOutStockDialog(true);
                  return;
                } else {
                  final_check_outofstock_book()
                  // final_check_outofstock_book().then((res) => {
                  //   NewMakepayment();
                  // })
                }

              }
            }}
            style={{
              textTransform: "capitalize",
              outline: "none",
              backgroundColor: "#f35631",
            }}
          >
            <span style={{ color: "#fff", fontSize: "1.05rem" }}>
              {value == 1
                ? props.getadd.length == 0
                  ? "Add Address"
                  : "Deliver Here"
                : value == 2
                  ? "Proceed to payment options"
                  : paymentType == "cod"
                    ? "Confirm Order"
                    : "Pay Now "}
            </span>
            <ArrowForwardIcon />
          </Button>
          <p className={`${styles.font08} text-secondary text-center `}>
            <VerifiedUserIcon fontSize="small" className="text-success" /> Safe
            And Secure Payment 100% Authentic And Quality Assured Books.
          </p>
        </div>
      </div>

      <div
        style={{ marginTop: "1rem", marginBottom: "22%" }}
        className="cart_right d-lg-none d-md-block col-12 "
      >
        <div>
          <div className="d-flex text-danger opacity-75">
            {minordervalue && min_order_charge > 0 ? (
              <div>
                <WarningAmberIcon
                  small
                  className={`${styles.minOrderValueIcon}`}
                // style={{
                //   fontSize: "0.8rem",
                //   lineHeight: "0.9rem",
                //   marginTop: "1rem",
                //   marginBottom: "1rem",
                // }}
                />
              </div>
            ) : null}
            {minordervalue > 0 && min_order_charge > 0 ? (
              <div
                className={`${styles.minOrderValueText}`}
              // style={{
              //   fontSize: "0.8rem",
              //   lineHeight: "0.9rem",
              //   marginTop: "1rem",
              //   marginBottom: "1rem",
              // }}
              >
                &nbsp;
                <span>
                  Minimum order value should be Rs. {`${minordervalue}`},Please
                  add more Books else proceed to pay Rs.{`${minordervalue}`}
                  and place your order
                </span>
              </div>
            ) : null}
          </div>

          <div
            className={`shadow  p-2 p-sm-4 bg-white ${styles.web_payment}  `}
          >
            <table className="table table-borderless ">
              <tbody style={{ color: "#737373", fontSize: "0.84rem" }}>
                {getBookQty().newQty == 0 ? null : (
                  <tr style={{}}>
                    {isMaskPresentMask().mask == 1 ? (
                      <td className="p-1 p-sm-auto">Product Price</td>
                    ) : (
                      <td className="p-1 p-sm-auto">New Book Price</td>
                    )}
                    <td className="p-1 p-sm-auto">
                      <span id="BookPricediv">
                        {" "}
                        &#8377;
                        {Math.round(renderAmtUsed().newBookPrice)}
                      </span>
                      <span id="newbookqyt">
                        (
                        {isMaskPresentMask().book_and_mask == 1
                          ? getBookQty().newQty - 1
                          : getBookQty().newQty}
                        {isMaskPresentMask().mask == 1
                          ? isMaskPresentMask().book_and_mask == 1
                            ? `Book and mask`
                            : ` Set mask`
                          : `Books`}
                        )
                      </span>
                    </td>
                  </tr>
                )}
                {getBookQty().newQty == 0 ? null : (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto">New Book Delivery Charges</td>
                    <td className="p-1 p-sm-auto">
                      <span id="DeliveryPricediv">
                        {" "}
                        &#8377;
                        {Math.round(renderAmtUsed().newBookDeliveryCost)}
                      </span>
                    </td>
                  </tr>
                )}

                {Math.round(renderAmtUsed().oldBookPrice) == 0 ? (
                  <tr></tr>
                ) : (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto" >
                      Shipping & Handling ( Used Books )
                    </td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        &#8377;
                        {Math.round(renderAmtUsed().oldBookPrice)}&nbsp;
                      </span>
                      ({getBookQty().oldQty}&nbsp;
                      {getBookQty().oldQty == 1 ? "Book" : "Books"})
                    </td>
                  </tr>
                )}

                {Math.round(renderAmtUsed().noteBookPrice) == 0 ? (
                  <tr></tr>
                ) : (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto">Notebook Price</td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        &#8377;
                        {Math.round(renderAmtUsed().noteBookPrice)}&nbsp;
                      </span>
                      ({getBookQty().notebookQty}{" "}
                      {getBookQty().notebookQty == 1 ? "Item" : "Items"})
                    </td>
                  </tr>
                )}

                {paymentType == "cod" ? (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto">
                      Cash Collection Charge
                      <OverlayTrigger
                        placement="bottom"
                        overlay={
                          <Tooltip id="tooltip-disabled">
                            <p className={`${styles.font08}`}>
                              It is an extra charge applicable on every CASH ON
                              DELIVERY Order applied by our delivery partner for
                              collecting cash for the shipment value.We request
                              you to select prepaid methods to avoid these extra
                              charges .
                            </p>
                          </Tooltip>
                        }
                      >
                        <span className="d-inline-block">
                          <span id="QuestionMark">
                            <HelpIcon
                              style={{
                                height: "26px",
                                fontSize: "1rem",
                                cursor: "pointer",
                                color: "gray",
                              }}
                            />
                          </span>
                        </span>
                      </OverlayTrigger>
                    </td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        &#8377;
                        {Math.round(50)}
                      </span>
                    </td>
                  </tr>
                ) : null}

                {renderAmtUsed().offer_book_cost ? (
                  <tr>
                    <td className="p-1 p-sm-auto">Offered Book</td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        &#8377;
                        {renderAmtUsed().offer_book_cost}
                      </span>
                    </td>
                  </tr>
                ) : null}
                {min_order_charge ? (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto">
                      Minimum order value difference
                    </td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        &#8377;
                        {min_order_charge}
                      </span>
                    </td>
                  </tr>
                ) : null}

                {
                  // renderAmtUsed().total_amt ==
                  renderAmtUsed().total_order_value ==
                    renderAmtUsed().netPayAmt ? null : (
                    <tr
                      style={{
                        borderTop: "1px solid #ddd",
                        fontSize: "0.98rem",
                      }}
                    >
                      <td
                        className="text p-1 p-sm-auto"
                        style={{ color: "gray" }}
                      >
                        <b>Total Amount</b>
                      </td>
                      <td className="p-1 p-sm-auto text-nowrap" style={{}}>
                        <span id="Totalpricediv">
                          &#8377;
                          {props.ItemsInCart !== 0
                            ? renderAmtUsed().total_order_value
                            : // renderAmtUsed().total_amt
                            0}
                        </span>
                      </td>
                    </tr>
                  )
                }
                {renderAmtUsed().deductWalletAmt == 0 ? null : (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto" style={{ color: "green" }}>
                      Wallet Applied!
                    </td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        - &#8377; {renderAmtUsed().deductWalletAmt}
                      </span>
                    </td>
                  </tr>
                )}

                {reduceAmtUsingCoupon ? (
                  paymentType == "cod" ? null : (
                    <tr style={{}}>
                      <td className="p-1 p-sm-auto" style={{ color: "green" }}>
                        Coupon Applied!
                      </td>
                      <td className="p-1 p-sm-auto">
                        <span id="ShippingPricediv">
                          {" "}
                          - &#8377; {reduceAmtUsingCoupon}
                        </span>
                      </td>
                    </tr>
                  )
                ) : null}
                {props.cashback == 0 || paymentType == "cod" ? null : (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto" style={{ color: "green" }}>
                      Cashback Applied!
                    </td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        - &#8377; {props.cashback}
                      </span>
                    </td>
                  </tr>
                )}

                {renderAmtUsed().ShowpepaidBookCoinsCanBeUsed == 0 ||
                  paymentType == "cod" ? null : (
                  <tr style={{}}>
                    <td className="p-1 p-sm-auto" style={{ color: "green" }}>
                      Bookcoins Applied!
                    </td>
                    <td className="p-1 p-sm-auto">
                      <span id="ShippingPricediv">
                        {" "}
                        - &#8377; {renderAmtUsed().ShowpepaidBookCoinsCanBeUsed}
                      </span>
                    </td>
                  </tr>
                )}

                <tr
                  style={{ borderTop: "1px solid #ddd", fontSize: "0.98rem" }}
                >
                  <td className="text-success p-1 p-sm-auto">
                    <b>Total Payable</b>
                  </td>
                  <td className="p-1 p-sm-auto text-nowrap" style={{}}>
                    <b id="Totalpricediv" className="text-success">
                      &#8377;
                      {props.ItemsInCart !== 0 ? renderAmtUsed().netPayAmt : 0}
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={`${styles.deliverHerehide}`}>
            <Button
              className="w-100 py-3 mb-3 text-white shadow "
              disabled={confirmOrder || !renderAmtUsed().total_amt}
              onClick={async (e) => {
                e.preventDefault();

                if (value == 1) {
                  address_selected_tab();
                } else if (value == 2) {
                  if (props.OutOfStockBooks.length) {
                    setopenRemoveOutStockDialog(true);
                    return;
                  }
                  setValue("3");
                  // Router.push(`?tabvalue=3`, undefined, { shallow: true });
                } else {
                  // MakePayment();
                  final_check_outofstock_book()

                  // final_check_outofstock_book().then((res) => {
                  //   NewMakepayment();
                  // })
                  // NewMakepayment();
                  // Makepayment_placeorder();
                }
              }}
              style={{
                outline: "none",
                backgroundColor: " #f35631",
                textTransform: "capitalize",
              }}
            >
              {value == 1
                ? props.getadd.length == 0
                  ? "Add Address"
                  : "Deliver Here"
                : value == 2
                  ? "Proceed to payment options"
                  : paymentType == "cod"
                    ? "Confirm Order"
                    : "Pay Now"}
              <ArrowForwardIcon />
            </Button>
          </div>
          <p
            className="text-secondary mt-3 "
            style={{
              lineHeight: "0.5rem",
              fontSize: "0.55rem",
              textAlign: "center",
              // marginBottom: "6rem"
            }}
          >
            <VerifiedUserIcon fontSize="small" style={{ color: "#098041" }} />{" "}
            Safe And Secure Payment Payment 100% Authentic And Quality Assured
            Books.
          </p>
          <div
            style={{
              borderTopLeftRadius: value == 3 ? null : "10px",
              borderTopRightRadius: value == 3 ? null : "10px",
            }}
            className={`${styles.mobilefixed} shadow`}
          >
            <div
              onClick={ScrolltoCoupon}
              className="p-2 apply_coupons text-success"
              style={{
                display: value == 3 ? "flex" : "none",
                alignItems: "center",
                fontWeight: "600",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                fontSize: "0.88rem",
              }}
            >
              Apply Coupons <ArrowForwardIcon style={{ fontSize: "1.1rem" }} />
            </div>
            <div className={`${styles.freebieOfferDiv}`}>
              {props.freebie_data.min_cart_value <= renderAmtUsed().total_order_value ? null :
                <Freebies cartvalue={renderAmtUsed().total_order_value} />}
            </div>
            <div
              style={{ alignItems: "center" }}
              className={`${styles.mobile_paymentbtn} border-top`}
            >
              <div>
                <b id="Totalpricediv" className="text-success">
                  &#8377;
                  {props.ItemsInCart !== 0 ? renderAmtUsed().netPayAmt : 0}
                </b>
              </div>
              <Button
                className="text-white p-3 mb-1 fw-bold "
                disabled={confirmOrder || !renderAmtUsed().total_amt}
                onClick={async (e) => {
                  e.preventDefault();

                  if (value == 1) {
                    address_selected_tab();
                  } else if (value == 2) {
                    if (props.OutOfStockBooks.length) {
                      setopenRemoveOutStockDialog(true);
                      return;
                    }
                    setValue("3");
                    // Router.push(`?tabvalue=3`, undefined, { shallow: true });
                  } else {
                    // MakePayment();
                    // NewMakepayment();
                    final_check_outofstock_book()

                    // final_check_outofstock_book().then((res) => {
                    //   NewMakepayment();
                    // })
                  }
                }}
                style={{
                  outline: "none",
                  minWidth: "16rem",
                  maxWidth: "16rem",
                  textTransform: "capitalize",
                  backgroundColor: "#f35631",
                }}
              >
                {value == 1
                  ? props.getadd.length == 0
                    ? "Add Address"
                    : "Deliver Here"
                  : value == 2
                    ? "Proceed to payment options"
                    : paymentType == "cod"
                      ? "Confirm Order"
                      : "Pay Now"}
                <ArrowForwardIcon />
              </Button>
            </div>
          </div>

          <div ref={CouponRef} className={`${styles.mobile_coupons}`}>
            {value == 3 ? (
              <div className="coupondiv border border-1 bg-white mb-5">
                <div className="text-bold couponApplyText border-bottom py-2">
                  Coupons & Offers (if any)
                </div>

                <div className="d-flex px-2  rounded">
                  <TextField
                    id="applycoupon"
                    label="Enter PromoCode"
                    error={
                      coupon.length <= 5 && coupon
                        ? true
                        : coupon.length == 6
                          ? props.couponResponse
                            ? true
                            : false
                          : false
                    }
                    InputLabelProps={{
                      style: { fontSize: 13 },
                    }}
                    value={coupon}
                    type="text"
                    name="PincodeCheck"
                    onChange={HandleOnChangeApplycoupon}
                    inputProps={{ maxLength: 10, padding: "0.5rem" }}
                    // variant="outlined"
                    margin="dense"
                    size="small"
                    style={{
                      width: "10rem",
                      marginRight: "0.5rem",
                      textTransform: "capitalize",
                    }}
                  />

                  <Button
                    variant="contained"
                    disabled={RenderCouponResponse() ? true : false}
                    onClick={handleOnclickCouponbtn}
                    style={{
                      textTransform: "capitalize",
                      // height: "2rem",
                      alignItems: "center",
                      marginTop: "0.5rem",
                      marginBottom: "0.3rem",
                    }}
                  >
                    Apply
                  </Button>

                  <Button
                    className={`${styles.BtnCouponView}`}
                    style={{
                      textTransform: "capitalize",
                      marginLeft: "0.5rem",
                      fontSize: "0.8rem",
                      padding: "0px",
                    }}
                    onClick={() => {
                      setcouponloader(true);
                      props.getOffers().then((res) => {
                        setcouponloader(false);
                      });
                      setisviewCoupon(true);
                    }}
                  >
                    View Coupons
                  </Button>
                </div>
                <div style={{ fontSize: "0.8rem", paddingLeft: "1rem" }}>
                  {coupon.length > 3 ? RenderCouponResponse() : null}
                  {props.couponR && props.appliedcoupon ? (
                    <div>
                      <div
                        style={{
                          marginTop: "0px",
                          marginLeft: "0%",
                          color: "green",
                          fontWeight: "bold",
                          fontSize: "12px",
                        }}
                      >
                        <b>MyPustak-Coupon Applied Successfully</b>
                      </div>
                      <div
                        style={{
                          textTransform: "capitalize",
                          marginLeft: "0.5rem",
                          fontSize: "0.8rem",
                          padding: "0px",
                        }}
                        onClick={() => {
                          setcouponloader(true);
                          props.getOffers().then((res) => {
                            setcouponloader(false);
                          });
                          setisviewCoupon(true);
                        }}
                      >
                        {props.couponResult.description}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Dialog open={showEditDialog} onClose={() => setshowEditDialog(false)}>
        <IconButton
          aria-label="close"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon
            color="#000"
            style={{ color: "#000", zIndex: 100 }}
            onClick={() => {
              setshowEditDialog(false);
            }}
          />
        </IconButton>
        <EditAddress CloseEditAddress={setshowEditDialog} uaddress={editData} />
      </Dialog>

      <Dialog
        open={showDialog}
      // onClose={() => setShowDialog(false)}
      >
        <IconButton
          aria-label="close"
          style={{ outline: "none" }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon
            color="#000"
            style={{ color: "#000", zIndex: 100 }}
            onClick={() => {
              setShowDialog(false);
            }}
          />
        </IconButton>
        <AddUserAddress
          isSAddNewDialog={setShowDialog}
          fetchUserAddress={props.fetchUserAddress}
        />
      </Dialog>

      <Backdrop
        open={payment_loader}
        style={
          cod_paymentloader
            ? {
              zIndex: "10010",
              color: "#007bff",
              background: "white",
              width: "100%",
            }
            : { zIndex: "1", color: "white" }
        }
      >
        <DialogContent id="simple-dialog-title">
          <p style={{ textAlign: "center" }}>
            <CircularProgress
              size={30}
              style={payment_loader ? { color: "#007bff" } : { color: "blue" }}
            />
          </p>

          {payment_loader ? (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  fontSize: "1.2rem",
                  textAlign: "center",
                }}
              >
                {payment_loader_message}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                {" "}
                Please Do not close the window or refresh...{" "}
              </div>
            </div>
          ) : (
            ``
          )}
        </DialogContent>
      </Backdrop>

      {/* -------------------------------Cashfree payment Dialog--------------------------------- */}

      <Dialog
        open={false}
        onClose={() => {
          setWaitPlacingOrder(false);
          setconfirmOrder(false);
          setCashfree_pgdialog(false);
        }}
        scroll={"body"}
        maxWidth="xl"
      >
        <DialogContent style={{ padding: "0px", margin: "0px" }}>
          <div
            style={{
              // padding: "2rem",
              minWidth: "60vw",
            }}
          >
            <div className={`${styles.closeDialogIcon} `}>
              <CloseIcon
                onclick={() => {
                  // alert("hi");
                  setWaitPlacingOrder(false);
                  setconfirmOrder(false);
                  setCashfree_pgdialog(false);
                }}
              />
            </div>

            <div
              className="dropin-parent"
              id="drop_in_container"
              ref={parentref}
            >
              Your component will come here
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openRemoveOutStockDialog}
        onClose={() => setopenRemoveOutStockDialog(false)}
        scroll={"paper"}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          Out Of Stock Books
        </DialogTitle>
        <DialogContent>
          {props.cartDetails.map((cart) =>
            props.OutOfStockBooks &&
              props.OutOfStockBooks.toString().includes(cart.bookInvId) ? (
              <div
                className="remove_outstock_div d-flex border m-1 p-2"
                key={cart.bookInvId}
              >
                <div style={{ width: "4rem", height: "5rem" }}>
                  {/* <img
                  style={{ width: "4rem", height: "5rem" }}
                  src={`https://d1f2zer3rm8sjv.cloudfront.net/${cart.bookThumb}`}
                  id="cartbookimg"
                  alt="book image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://d1f2zer3rm8sjv.cloudfront.net/medium/book_default.jpeg";
                  }}
                /> */}
                  <Image
                    objectFit="contain"
                    sizes="100vw"
                    priority={true}
                    placeholder="blur"
                    blurDataURL={`https://d1f2zer3rm8sjv.cloudfront.net/${cart.bookThumb}`}
                    alt={cart.bookName}
                    title={cart.bookName}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://d1f2zer3rm8sjv.cloudfront.net/medium/book_default.jpeg";
                    }}
                    src={`https://d1f2zer3rm8sjv.cloudfront.net/${cart.bookThumb}`}
                    id="cartbookimg"
                    height={0}
                    width={0}
                  />
                </div>
                <div style={{ fontSize: "0.9rem", padding: "1rem" }}>
                  {ResizeTitle(cart.bookName)}
                </div>
                <hr />
              </div>
            ) : null
          )}

          <DialogActions>
            <Button
              onClick={() => setopenRemoveOutStockDialog(false)}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button variant="outlined" onClick={removeAllOutstockBooks}>
              Remove Outstock
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog open={isviewCoupon} onClose={() => setisviewCoupon(false)}>
        <DialogTitle>Coupons</DialogTitle>
        <DialogContent>
          {couponloader ? (
            <center>
              <CircularProgress
                style={{ marginTop: "2rem", fontSize: "1rem" }}
              />
            </center>
          ) : (
            <div style={{}}>
              {props.offerpageReducer[0] ? (
                props.offerpageReducer[0].map((offer, index) =>
                  offer.is_active == 1 ? (
                    <Paper
                      key={index}
                      variant="outlined"
                      square
                      elevation={0}
                      className=""
                      onClick={() => {
                        // copyCoupons(offer.coupon_code);
                      }}
                      style={{
                        padding: "0.5rem",
                        // cursor: "pointer",
                        minWidth: "20vw",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {offer.coupon_for == 2 ? null : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  copyCoupons(offer.coupon_code);
                                }}
                              >
                                <strong style={{ color: "green" }}>
                                  {offer.coupon_code}
                                </strong>
                              </span>

                              <FileCopyIcon
                                color="primary"
                                size="small"
                                style={{
                                  fontSize: "1.2rem",
                                  marginLeft: "0.5rem",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    offer.coupon_code
                                  );
                                }}
                              />
                              <span
                                style={{ fontSize: "0.8rem", color: "#2248ae" }}
                              >
                                copy coupon{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div
                        style={{
                          // width: "15vw",
                          wordWrap: "break-word",
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                        }}
                      >
                        {offer.coupon_title + " , " + offer.order_type}
                      </div>
                      <div style={{ fontSize: "0.8rem" }}>
                        {" "}
                        {offer.conditions.split(",").map((condition, index) => {
                          return (
                            <ul
                              key={index}
                              style={{
                                marginBottom: 0,
                                paddingBottom: 0,
                              }}
                            >
                              <li className="Termlist">{condition}</li>
                            </ul>
                          );
                        })}
                      </div>

                      <div>
                        <center></center>
                      </div>
                    </Paper>
                  ) : null
                )
              ) : (
                <p>Currently Coupons Not Available</p>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setisviewCoupon(false)}>
            close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelelteBookDialog}
        onClose={closeDelelteBookDialog}
        aria-labelledby="form-dialog-title"
        scroll={"body"}
        size="sm"
        style={{ zIndex: "5001" }}
      >
        <DialogTitle id="form-dialog-title">
          {"Are you sure you want to remove item from cart ?"}
        </DialogTitle>
        <DialogContent>
          <DialogActions
            style={{ justifyContent: "center", fontWeight: "bold" }}
          >
            <Button
              style={{}}
              disabled={del_cart_loader}
              variant="outlined"
              onClick={() => RemoveFromCart(deleteBookinv, deleteCartid)}
              color="primary"
            >
              {del_cart_loader ? `Removing` : `Yes`}
            </Button>
            <Button
              style={{}}
              onClick={() => closeDelelteBookDialog()}
              variant="contained"
              color="primary"
            >
              No
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Dialog
        open={offerbookremove}
        onClose={() => {
          setofferbookremove(false);
        }}
        aria-labelledby="form-dialog-title"
        scroll={"body"}
        size="sm"
        style={{ zIndex: "5001" }}
      >
        <DialogTitle id="form-dialog-title">
          {"Are you sure you want to remove item from cart ?"}
        </DialogTitle>
        <DialogContent>
          <DialogActions
            style={{ justifyContent: "center", fontWeight: "bold" }}
          >
            <Button
              style={{}}
              disabled={offer_del_cart_loader}
              variant="outlined"
              onClick={() => {
                setoffer_del_cart_loader(true);
                localStorage.setItem("offerbook", false);
                window.location.reload();
                props.offerbook_applied(false).then((res) => {
                  setoffer_del_cart_loader(false);
                });
              }}
              color="primary"
            >
              {offer_del_cart_loader ? `Removing` : `Yes`}
            </Button>
            <Button
              style={{}}
              onClick={() => {
                setofferbookremove(false);
              }}
              variant="contained"
              color="primary"
            >
              No
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <style jsx>
        {`
          input[type="radio"] {
            width: 20px;
            height: 20px;
          }
          .couponApplyText {
            font-weight: 700;
            margin-top: 0.3rem;
            margin-left: 0.3rem;
            animation: ${CouponAnimation
            ? "horizontal-shaking 0.35s infinite"
            : null};
          }
          @media screen and (max-width: 567px) {
          }
          @keyframes horizontal-shaking {
            0% {
              transform: translateX(0);
            }
            25% {
              transform: translateX(5px);
            }
            50% {
              transform: translateX(-5px);
            }
            75% {
              transform: translateX(5px);
            }
            100% {
              transform: translateX(0);
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
    // OrderId: state.cartReduc.OrderId,
    RAZORPAY: state.donationR.rp_id,
    getadd: state.accountR.getadd,
    primary_address: state.accountR.primary_address,
    fetching_address_loader: state.accountR.fetching_address_loader,
    PopupCart: state.cartReduc.PopupCart,
    walletbalance: state.walletR.walletbalance,
    UserEmail: state.userdetailsR.getuserdetails.email,
    RzPayErr: state.cartReduc.RzPayErr,
    OutOfStockBooks: state.cartReduc.OutOfStockBooks,
    bookcoins: state.walletR.bookcoins,
    UserId: state.userdetailsR.getuserdetails.id,
    userDetails: state.userdetailsR.getuserdetails,
    //   getuserdetails: state.userdetailsR.getuserdetails,

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
    offerpageReducer: state.offerpageReducer.offers,
    is_offerbook_applied: state.cartReduc.is_offerbook_applied,
    coupon_code_amt: state.cartReduc.coupon_code_amt,
    incart_check: state.cartReduc.incart_check,
    freebie_data: state.cartReduc.freebie_data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    EdituserAddressAction: (token, address) =>
      dispatch(EdituserAddressAction(token, address)),
    updatePaymentIdOrder: ({ body, token }) =>
      dispatch(updatePaymentIdOrder({ body, token })),
    Get_CashFree_Signature_Wallet: ({ token, body }) =>
      dispatch(Get_CashFree_Signature_Wallet({ token, body })),
    Getaddress: () => dispatch(Getaddress()),
    Editaddress: (data) => dispatch(Editaddress(data)),
    fetchUserAddress: () => dispatch(fetchUserAddress()),
    Getwalletd: () => dispatch(Getwalletd()),
    CartSession: () => dispatch(CartSession()),
    SaveLater: () => dispatch(SaveLater()),
    ResetOutStockList: () => dispatch(ResetOutStockList()),
    AddPriceCart: (cartData) => dispatch(AddPriceCart(cartData)),
    OrderDetails: (orderdetails, token) =>
      dispatch(OrderDetails(orderdetails, token)),
    OutOfStock: (token, data) => dispatch(OutOfStock(token, data)),
    get_razorpay_key: () => dispatch(get_razorpay_key()),
    check_success: (orderid) => dispatch(check_success(orderid)),
    getOffers: () => dispatch(getOffers()),
    walletOrder: ({ body, token }) => dispatch(walletOrder({ body, token })),

    SetWallet: () => dispatch(SetWallet("")),
    RemoveCart: (Cart_id, bookInvId, data) =>
      dispatch(RemoveCart(Cart_id, bookInvId, data)),
    resetCoupon: () => dispatch(resetCoupon()),
    couponApply: ({ token, coupon, userid }) =>
      dispatch(couponApply({ token, coupon, userid })),
    redeemCouponAction: ({ couponamount }) =>
      dispatch(redeemCouponAction({ couponamount })),

    offerbook_applied: (is_offer_applied) =>
      dispatch(offerbook_applied(is_offer_applied)),
    offeredbook: ({ id }) => dispatch(offeredbook({ id })),
    apply_couponcode: (amount) => dispatch(apply_couponcode(amount)),
    orderOfferBook: ({ token, orderid, id }) =>
      dispatch(orderOfferBook({ token, orderid, id })),
    cod_verify_payment: (body) => dispatch(cod_verify_payment(body)),
    razorpay_verify_payment: (body) => dispatch(razorpay_verify_payment(body)),
    check_book_incart: () => dispatch(check_book_incart()),

    updateCustomerOrder: (body) => dispatch(updateCustomerOrder(body)),
    wallet_verify_payment: (body) => dispatch(wallet_verify_payment(body)),
    fetch_min_order_value: () => dispatch(fetch_min_order_value()),
    fetch_freebie_data: (body) => dispatch(fetch_freebie_data(body)),
  };
};

{
  /* <div className="col-1">
{selectedAddress ? selectedAddress.address_id == data.address_id ?
  <CheckCircleOutlineOutlinedIcon style={{ color: "green" }} />
  : null : null}
</div> in line number ---- 3459 */
}

// style={{ paddingLeft: "2rem" }} in line number 3714
export default connect(mapStateToProps, mapDispatchToProps)(Checkoutpage);
