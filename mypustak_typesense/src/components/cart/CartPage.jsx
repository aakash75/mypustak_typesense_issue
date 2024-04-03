 /* eslint-disable */
 "use client"
import React, { Component } from "react";
import { connect } from "react-redux";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Head from "next/head";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { withSnackbar } from "notistack";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

import styless from "../../styles/Product.module.css";
import styles from "../../styles/CartPage.module.css";
import SkeletonCart from "../../components/skeleton/SkeletonCart";  
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Snackbar,
  Skeleton,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { animateScroll as scroll } from "react-scroll";
import {
  AddressDialog,
  CartopenModal,
  AddPriceCart,
  RemoveCart,
  UpdateCartItem,
  AddToCart,
  OrderDetails,
  SetOrderId,
  walletRazorpay,
  RedirectWalletToCart,
  RemoveToBeAddedToCart,
  CartSession,
  SaveLater,
  removeFromCartLogout,
  ShowRzPayErr,
  orderUpdateSucc,
  OutOfStock,
  DeductCashback,
  offeredbook,
  orderOfferBook,
  couponApply,
  redeemCouponAction,
  resetCoupon,
  updatePaymentIdOrder,
  walletOrder,
  UpdateCart,
  ResetOutStockList,
  fetching_Wishlist,
  Adding_Wishlist,
  Adding_Wishlist_fromcart,
  check_payment_id,
  check_success,
  offerbook_applied,
  cartpagelength,
  check_book_incart,
  fetch_min_order_value,
} from "../../redux/actions/cartAction";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Getaddress,
  SetSelectedAddressBlank,
  login_backdropToggle,
  get_razorpay_key,
} from "../../redux/actions/accountAction";
import {
  Getwalletd,
  SetWallet,
  Get_CashFree_Signature_Wallet,
} from "../../redux/actions/walletAction";
import Popup from "reactjs-popup";
import { Get_Rp_Id } from "../../redux/actions/donationActions";
import MediaQuery from "react-responsive";
import ReactGA from "react-ga";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { AuthInstance, url } from "../../helper/api_url";
import Image from "next/legacy/image";
import CustomLoaderBorder from "../CustomLoader/CustomLoaderBorder";
import { GetWishlistCount } from "../../redux/actions/wishlistAction";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
const MIN_PREPAID_ORDER_VALUE = 100;
const COD_CHARGE = 50;
const MIN_COD_ORDER_VALUE = 150;

class Cart extends Component {
  constructor(props) {
    super(props);
    this.paymentdiv = React.createRef();
  }
  state = {
    confirm_offerbook: false,
    razorpay_key: "",
    mobile_paymode: true,
    payment_detailDiv: true,
    applyOfferSnackbar: false,
    open: false,
    updateQuantityDialog:false,
    updatediscount_percent:null,
    couponDiv: false,
    coupon: "",
    offerDiv: false,
    getItChecked: false,
    offerBookPopup: false,
    coinPopup: false,
    open: false,
    opendeliveydrawer: false,
    SideeDrawerOpen: false,
    openDelivery: false,
    totalShipping: 0,
    below: 70,
    above: 50,
    paytype: "prepaid",
    minordervalue: "",
    OpenProceedPayBtn: false,
    COUNT: 1,
    OpenLoader: false,
    GotOThankYou: false,
    Cartloader: true,
    OpenConfirmcod: false,
    AddressCOUNT: 1,
    WalletSelected: false,
    walletDed: 1,
    afterConfirmLoader: false,
    isButtonDisabled: false,
    Paypalbtn: "proceedToPayBtn",
    CartBtnLoader: false,
    DisableProccedTopay: true,
    ShowClickedWallerCod: false,
    openLayer: false,
    offerType: "",
    codOrderCount: 1,
    offerLoading: false,
    OfferCartId: 0,
    applyBookcoinsSelected: false,
    del_cart_err: false,
    del_cart_loader: false,
    offerbookloader: false,
    razorpay_order_id: "",
    confirmOrder: false,
    placingOrder: false,
    UserAmount: 0,
    generatingOrderId: false,
    showUsedWallet: 0,
    prepaid3rd_partySelected: "Razorpay",
    other_payMethod: "",
    WaitPlacingOrder: false,
    reduceAmtUsingCoupon: 0,
    ShowOrderCreationErr: false,
    showWishlist_Msg: false,
    isWalletNeg: false,
    applycouponLoader: false,
    openRemoveOutStockDialog: false,
    updadtingQty: false,
    WalletSelectedInitaly: false,
    removingCartId: "",
    openDelelteBookDialog: false,
    openDelelteSaveLaterDialog: false,
    deleteBookinv: "",
    deleteCartid: "",
    tempCart: "",
    alertwishlist_dialog: false,
    alertwishlist_savelater_dialog: false,
    cashback_amt_used: 0,
    groupedArray: [],
    groupedArrayTotalAmount: 0,
    openChangeOfferDilag: false,
    discount_percent: "",
    cashback_percent: "",
    offertype: "",
    cart_book_price: "",
    cart_book: {},
    serverError: false,
    initialLoader: true,
    SkeletonLoader: false,
    cartLength: [],
    saveLaterLoader: false,
    btnClickedId: "",
    moveToWishlistLoader: false,
    moveToCartLoader: false,
    min_order_qty:null,
    qty_group_by:null,
    toupdateBookInv:null,
    toupdateCartId:null,
    quantity_to_add:null,
    updateqtyLoader:false,
    cod_charge:'',
    min_prepaid_order_value:"",
    min_cod_order_value:"",
  };

  RedirectLoginPage = () => {
    let BackUrl = "view-cart";
    // localStorage.setItem('BackUrl', BackUrl);
    window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    
    this.props.fetch_min_order_value()?.then(res => {
      console.log(res[0].cod_charge,res[0].minium_order_value,"min_order_value");
      this.setState({
        cod_charge:res[0].cod_charge,
        min_prepaid_order_value:res[0].minium_order_value,
        min_cod_order_value:res[0].minium_order_value+res[0].cod_charge
      })
      
    })

    if (
      this.props.userComponentStatus == 1 ||
      this.props.userComponentStatus == 0
    ) {
      this.setState({ SkeletonLoader: false, initialLoader: false });
      const getCookieArr = document.cookie.split("; ");
      let Cookie_details = getCookieArr.filter(e => e.startsWith("I="));
      if (Cookie_details.length == 0) {
        this.RedirectLoginPage();
      }
    }

    if (this.props.userComponentStatus == 2) {
      const getCookieArr = document.cookie.split("; ");
      this.setState({ getItChecked: this.props.is_offerbook_applied });
      let Cookie_details = getCookieArr.filter(e => e.startsWith("I="));
      let token;
      if (Cookie_details.length) {
        let details = Cookie_details[0].replace("I=", "");

        let json_details = JSON.parse(details);
        token = json_details.access;
      }
      console.log(token, "====================apiurl");
      console.log(
        "this.props.userComponentStatus",
        this.props.userComponentStatus
      );
      console.log(document.cookie.split("; "));
      // this.props.Getaddress();
      this.MIN_ORDER_MSG_DIV();
      // this.props.SetWallet("");
      if (this.props.walletbalance <= 0) {
        this.setState({ WalletSelected: false });
      }
      this.props
        .cartpagelength()
        .then(res => {
          this.cartLengthHand(res, token);
        })
        .catch(() => {});

      let groupedArray = this.groupBy(this.props.cartDetails, "vendorid");

      this.setState({
        groupedArray: groupedArray,
      });
      // localStorage.removeItem("BackUrl")
    } else if (this.props.userComponentStatus == 1) {
      let BackUrl = "view-cart";

      // check length of cart items

      if (this.props.ItemsInCart.length) {
        // localStorage.setItem("BackUrl", BackUrl)
       window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
      }
    }
    try {
      let localstorage_order_details = localStorage.getItem("order_details");

      if (localstorage_order_details) {
        localStorage.removeItem("order_details");
      }
    } catch (error) {}
    ReactGA.pageview(window.location.pathname + window.location.search);

    this.setState({ AddressCOUNT: 1, GotOThankYou: false });
    this.props.SetOrderId();
    this.setState({ token: localStorage.getItem("user") });

    this.props.SetSelectedAddressBlank();
    let user = JSON.parse(localStorage.getItem("user_info"));

    const getCookieArr = document.cookie.split("; ");
    let Cookie_details = getCookieArr.filter(e => e.startsWith("I="));
    let newtoken;
    if (Cookie_details.length) {
      let details = Cookie_details[0].replace("I=", "");

      let json_details = JSON.parse(details);
      newtoken = json_details.access;
    }
    this.props.CartSession(newtoken)   
    .then(res => {
				console.log("mount cart session")
      this.setState({
        initialLoader: false,
        serverError: false,
        SkeletonLoader: false,
      });
      this.props.check_book_incart()
      // alert("res update")
      this.props.SaveLater();
    })
    .catch(err => {
      this.setState({
        initialLoader: false,
        serverError: true,
        SkeletonLoader: false,
      });
    })
    this.props.offeredbook({ id: user.id }).then(res => {
      if (res.data) {
        if (res.data.data[0]) {
          // alert("hi");
          this.setState({ getItChecked: this.props.is_offerbook_applied });
        }
      }
    });

    let get_token = 0;
    try {
      get_token = localStorage.getItem("user");
    } catch (error) {}

    if (this.props.walletbalance) {
      try {
        let user_wallet_balance = Number(this.props.walletbalance);
        if (user_wallet_balance < 0) {
          this.setState({ isWalletNeg: true });
        }
      } catch (error) {}
    }
  }

  componentDidUpdate(prevProps) {
    //  alert(this.props.userDetails.email)
    if (this.props.userComponentStatus !== prevProps.userComponentStatus) {
      if (this.props.userComponentStatus == 2) {
        // localStorage.removeItem("BackUrl")
        this.props.SetWallet("");
        let user = JSON.parse(localStorage.getItem("user_info"));
        // console.log(user,"1256", user.id)
        let groupedArray = this.groupBy(this.props.cartDetails, "vendorid");

        this.setState({
          groupedArray: groupedArray,
        });
      } else if (this.props.userComponentStatus == 1) {
        let BackUrl = "view-cart";
        if (this.props.ItemsInCart !== 0) {
          // localStorage.setItem("BackUrl", BackUrl)
         window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
        }
      }
    }
    if (prevProps.userDetails !== this.props.userDetails) {
      this.props.Getwalletd();
      this.props.Getaddress();

      this.props
        .CartSession()
        .then(res => {
					console.log("did update cart session")
          this.setState({
            initialLoader: false,
            serverError: false,
            SkeletonLoader: false,
          });
          // alert("res update")
          this.props.SaveLater();
        })
        .catch(err => {
          this.setState({
            initialLoader: false,
            serverError: true,
            SkeletonLoader: false,
          });
          console.log("+++++++++++++++++++++");
        });
    }
    if (this.props.walletbalance !== prevProps.walletbalance) {
      if (this.props.walletbalance <= 0) {
        this.setState({ WalletSelected: false });
      }
    }
    if (prevProps.is_coupon_valid !== this.props.is_coupon_valid) {
      if (this.props.is_coupon_valid == 0) {
        this.setState({ redcuceAmtUsingCoupon: 0 });
        this.props.resetCoupon();
      }
    }

    if (prevProps.cartDetails !== this.props.cartDetails) {
      this.setState({ reduceAmtUsingCoupon: 0, coupon: "" });
      this.props.resetCoupon();
      this.MIN_ORDER_MSG_DIV();
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.cartDetails !== this.props.cartDetails) {
      if (nextProps.is_offerbook_applied !== this.props.is_offerbook_applied) {
        this.setState({ getItChecked: this.props.is_offerbook_applied });
      }
      this.MIN_ORDER_MSG_DIV();
      let user = JSON.parse(localStorage.getItem("user_info"));
    }

    if (
      nextProps.SelectedAddress !== this.props.SelectedAddress &&
      nextProps.SelectedAddress.length !== 0
    ) {
      let ordervalue = 0;
      this.props.cartDetails.map(book => {
        ordervalue = ordervalue + book.bookShippingCost;
      });

      // console.log(ordervalue, 'che');
      let user = JSON.parse(localStorage.getItem("user_info"));

      this.props.offeredbook({ id: user.id });
    }

    if (
      nextProps.OrderId !== this.props.OrderId &&
      this.state.getItChecked == true
    ) {
      const token = `Token ${this.props.userToken}`;
      const orderid = nextProps.OrderId;
      const id = nextProps.offerBook.id;
      // alert("getoffer")
      this.props.orderOfferBook({ token, orderid, id });
    }

    if (nextProps.ItemsInCart === 0 && this.state.AddressCOUNT === 1) {
      // alert("removed")
      this.props.SetSelectedAddressBlank();
      this.setState({ AddressCOUNT: 2 });
      if (this.props.walletbalance < 0) {
        this.setState({ WalletSelected: false });
      }
    }
    if (nextProps.walletbalance != this.props.walletbalance) {
      if (nextProps.walletbalance <= 0) {
        this.setState({ WalletSelected: false });
      }
    }
    if (nextProps.OutOfStockBooks !== this.props.OutOfStockBooks) {
      if (nextProps.OutOfStockBooks.length !== 0) {
        // window.scrollTo(0,0)
        this.setState({ CartBtnLoader: false, Cartloader: false });

        window.setTimeout(() => {
          this.setState({ OpenProceedPayBtn: false });
        }, 3000);
      }
    }
    if (this.props.SelectedAddress !== nextProps.SelectedAddress) {
      if (nextProps.SelectedAddress.length !== 0)
        this.setState({ DisableProccedTopay: false });
    }
    if (this.props.ItemsInCart !== nextProps.ItemsInCart) {
      if (nextProps.ItemsInCart == 0) {
        this.setState({ DisableProccedTopay: true });
      } else {
      }
    }
    if (nextProps.cartDetails != this.props.cartDetails) {
      // ----------------------Get all Out of stock Books and show then in the front-end---------------------
      // console.log('In');

      let AllBooksData = nextProps.cartDetails;
      let getAllOutOfStockBook_Inv = [];

      AllBooksData.map(books => {
        getAllOutOfStockBook_Inv.push(books.bookInvId);
      });
      if (this.props.userComponentStatus == 2) {
        if (getAllOutOfStockBook_Inv.length) {
          const BookInvdata = {
            book_inv: getAllOutOfStockBook_Inv,
          };
          // this.props.OutOfStock("", BookInvdata);
        }
      }
      // }
      this.setState({ offerLoading: false });

      this.calculateCartDeatils(0);
    }

    if (nextProps.userToken !== this.props.userToken) {
      const token_data = nextProps.userToken;
      // this.props.CartSession(token_data);
    }

    if (this.props.RAZORPAY !== nextProps.RAZORPAY) {
      //  alert(nextProps.RAZORPAY)
      this.setState({ razorpay_order_id: nextProps.RAZORPAY });
    }

    if (this.props.OrderId !== nextProps.OrderId) {
    }

    if (nextProps.walletbalance !== this.props.walletbalance) {
      try {
        let user_wallet_balance = Number(nextProps.walletbalance);
        if (user_wallet_balance < 0) {
          this.setState({ isWalletNeg: true });
        }
      } catch (error) {}
    }
  }

  OpenAddressSide = () => {
    // alert("Open")
    this.setState({ opendeliveydrawer: !this.state.opendeliveydrawer });
    // this.props.CartopenModal()
  };
  handleExpansionChange_paymode = () => {
    let mobile_paymode = !this.state.mobile_paymode;
    this.setState({ mobile_paymode: mobile_paymode });
    if (mobile_paymode) {
      this.setState({ paytype: "prepaid" });
    } else {
      this.setState({ paytype: "cod" });
    }
  };

  goToDiv = divname => {
    // let scrollToY = 0;
    let scrollToY = this.paymentdiv.current.offsetTop;

    window.scrollTo(0, document.body.scrollHeight) - 50;
  };

  handleClose = () => {
    this.setState({
      open: false,
      applyOfferSnackbar: false,
      ShowOrderCreationErr: false,
      showWishlist_Msg: false,
    });
  };
  openUpdateDialog = async (bookInvId, Cart_id,value,book_id) => {
    console.log(Cart_id,"cartIdId");
    let result = await fetch(
      `${url}/api/v2/notebook/fetch_notebook/${book_id}`
      );
      let response = await result.json();
      
      this.setState({
        updatediscount_percent:response.data,
        updateQuantityDialog:true,
        min_order_qty:response.data.min_order_qty,
        qty_group_by:response.data.qty_group_by,
        toupdateBookInv:bookInvId,
        toupdateCartId:Cart_id,
        quantity_to_add:value
      })
  }
  updateNoteBookQuantity = async () => {
    // let result = await fetch(
    //   `${url}/api/v2/notebook/fetch_notebook/${book_id}`
    // );
    // let response = await result.json();
    this.setState({
      updateqtyLoader:true
    })
    if(this.state.quantity_to_add<this.state.min_order_qty){
      this.props.enqueueSnackbar(`Minimum Order Qunatity can not be lest than ${this.state.min_order_qty}`, {
        variant: "error",
      });
      this.setState({
        updateqtyLoader:false,
      })
      return
    }
    let discount_percent = 0
      this.state.updatediscount_percent.qty_discount.map(discount => {
        if(this.state.quantity_to_add>=discount.min_qty && this.state.quantity_to_add<=discount.max_qty){
          discount_percent=discount.discount_percent
        }
      })
      console.log(this.state.updatediscount_percent,"logogo",discount_percent);
      let discountedPrice = this.state.updatediscount_percent.mrp*(discount_percent/100)
      // alert(discountedPrice)
    const data = { qty: this.state.quantity_to_add,discount_per:discount_percent };
    let res = await this.props.UpdateCartItem(this.state.toupdateCartId, this.state.toupdateBookInv, data);
    console.log(res,"res Update");
    if(res){
      this.props.CartSession().then(res => {
        this.setState({
          updateqtyLoader:false,
          updateQuantityDialog:false,
        })
      })
    }
  }
  RemoveFromCart = async (bookInvId, Cart_id) => {
    this.setState({
      del_cart_loader: true,
      removingCartId: Cart_id,
      offerbookloader: true,
    });

    const data = { is_deleted: "Y" };

    let res = await this.props.RemoveCart(Cart_id, bookInvId, data);
    if (res) {
      this.setState({
        del_cart_loader: false,
        openDelelteBookDialog: false,
        openDelelteSaveLaterDialog: false,
      });
      this.props.CartSession();
      this.props.check_book_incart()
      // this.props.SaveLater();
      let user = JSON.parse(localStorage.getItem("user_info"));
      this.props.offeredbook({ id: user.id }).then(res => {
        this.setState({
          offerbookloader: false,
        });
      });
    } else {
      this.setState({
        del_cart_err: true,
        del_cart_loader: false,
        openDelelteBookDialog: false,
        openDelelteSaveLaterDialog: false,
      });
    }
  };


  RemoveFromSaveLater = async (bookInvId, Cart_id) => {
    this.setState({
      del_cart_loader: true,
      removingCartId: Cart_id,
      offerbookloader: true,
    });

    const data = { is_deleted: "Y" };

    let res = await this.props.RemoveCart(Cart_id, bookInvId, data);
    if (res) {
      this.setState({
        del_cart_loader: false,
        openDelelteBookDialog: false,
        openDelelteSaveLaterDialog: false,
      });
      // this.props.CartSession();
      this.props.SaveLater();
      let user = JSON.parse(localStorage.getItem("user_info"));
      this.props.offeredbook({ id: user.id }).then(res => {
        this.setState({
          offerbookloader: false,
        });
      });
    } else {
      this.setState({
        del_cart_err: true,
        del_cart_loader: false,
        openDelelteBookDialog: false,
        openDelelteSaveLaterDialog: false,
      });
    }
  };

  onOfferChanged = (e, offer, cart) => {
    this.setState({ offerLoading: true, OfferCartId: cart.Cart_id });
    let discount_price = 0;
    let cashback_price = 0;
    let offerType = "";
    // e.preventDefault();
    // console.log(e.target.name, e.target.value, e.target.checked, cart, 'onOfferChanged');
    if (offer !== cart.offertype) {
      if (offer == "discount") {
        discount_price = this.DicountedPrice(
          Math.round(cart.bookPrice),
          cart.discount_per
        );
        cashback_price = 0;

        offerType = "discount";
      } else if (offer == "cashback") {
        discount_price = 0;
        cashback_price = this.CashbackPrice(
          Math.round(cart.bookPrice),
          cart.cashback_per
        );
        offerType = "cashback";
      } else {
      }
      this.setState({ [offerType]: offer });
    } else {
      this.setState({ [offerType]: "" });
      offerType = "";
    }

    const sendCartSession = {
      offertype: offerType,
      cashbackedPrice: cashback_price,
      discountedPrice: discount_price,
      cashback_per: cart.cashback_per,
      discount_per: cart.discount_per,
      "content-type": "application/json",
    };

    AuthInstance.patch(
      `${url}/common/updateCart/${cart.Cart_id}/`,
      sendCartSession
    )
      .then(res => {
        // console.log(res.status, sendCartSession, 'cartSession');

        const token = `Token ${localStorage.getItem("user")}`;
        this.setState({
          offertype: offerType,
        });
        this.props.CartSession();
      })
      .catch(err => {
        console.log(err);
        // console.log(sendCartSession);
      });
  };
  MoveToWishlistAlert = cart => {
    // this.props.GetWishlistCount();
    this.setState({ tempCart: cart, alertwishlist_dialog: true });
  };

  MoveToSaveLaterWishlistAlert = cart => {
    // this.props.GetWishlistCount();
    this.setState({ tempCart: cart, alertwishlist_savelater_dialog: true });
  };

  MoveToWishlist = () => {
    let cart = this.state.tempCart;
    console.log(cart, "55588");
    this.setState({
      alertwishlist_dialog: false,
      moveToWishlistLoader: true,
      btnClickedId: cart.bookId,
      offerbookloader: true,
      alertwishlist_savelater_dialog: false,
    });
    let user = JSON.parse(localStorage.getItem("user_info"));
    let user_id = user.id;
    let current_date = Math.floor(Date.now() / 1000);
    const MyWishlist = {
      book_id: cart.bookId,
      user_id: user_id,
      selected_condition: null,
      book_inv_id: cart.bookInvId,
      book_thumb: cart.bookThumb,
      i_date: current_date,
      is_move_incart: 0,
      is_deleted: 0,
      qty: cart.bookInvId.toString().indexOf("KOL") > -1?cart.bookQty:1,
      cashbacked_price: cart.offertype =='cashback'?parseInt(parseInt(cart.bookShippingCost) - (parseInt(cart.bookShippingCost)*(parseInt(cart.cashback_per)/100))):0,
      discounted_price: cart.offertype =='discount'?parseInt(parseInt(cart.bookShippingCost) - (parseInt(cart.bookShippingCost)*(parseInt(cart.discount_per)/100))):0,
      discount_per:cart.discount_per,
      offertype: cart.offertype,
      user_pay: 0,
    };
    this.props.Adding_Wishlist_fromcart(MyWishlist).then(res => {
      // this.props.GetWishlistCount();
      this.setState({
        showWishlist_Msg: true,
        tempCart: "",
        moveToWishlistLoader: false,
        btnClickedId: "",
      });
      this.RemoveFromCart(cart.bookInvId, cart.Cart_id);
      let user = JSON.parse(localStorage.getItem("user_info"));
      this.props.offeredbook({ id: user.id }).then(res => {
        this.setState({
          offerbookloader: false,
        });
      });
      this.props.check_book_incart()
    });
  };
  OpenAddressSide = () => {
    this.props.AddressDialog();
  };

  DicountedPrice = (price, discount_per) => {
    let discountedPrice = price - (price * discount_per) / 100;
    return Math.round(discountedPrice);
  };

  CashbackPrice = (price, cashback_per) => {
    let cashbackedPrice = price - (price * cashback_per) / 100;

    // this.setState({discountedPrice:discountedPrice})
    return Math.round(cashbackedPrice);
  };

  SetBtnValue = (apiValue, passedvalue) => {
    // console.log(apiValue.offertype,apiValue,passedvalue,"SetBtnValue");

    if (apiValue.offertype === passedvalue) {
      return `Applied`;
    } else {
      return `Apply`;
    }
  };
  CashbackCheckbox = ShipCost => {
    // alert("hi")
    if (this.getBookQty().oldQty && ShipCost > this.state.min_prepaid_order_value) {
      if (!this.state.applyBookcoinsSelected) {
        this.setState({ applyBookcoinsSelected: true });
        let currentMycart = this.props.cartDetails;
        currentMycart.map((book, index) => {});
        // console.log(currentMycart, 'CashbackCheckbox', this.props.cashback);
      } else {
        this.setState({ applyBookcoinsSelected: false });

        // console.log(e.target.checked, 'checked 2');
        if (!this.state.applyBookcoinsSelected) {
          this.setState({ coinPopup: false, applyBookcoinsSelected: false });
          return;
        }
      }
    } else {
      this.setState({ applyBookcoinsSelected: false });

      if (!this.state.applyBookcoinsSelected) {
        this.setState({ coinPopup: true, applyBookcoinsSelected: false });
      }
    }
  };

  backdropClickHandler = () => {
    //  alert("false")
    this.setState({ opendeliveydrawer: !this.state.opendeliveydrawer });
  };

  YouSave = () => {
    let totalSave = 0;
    this.props.cartDetails.map(book => {
      if (book.offertype == "discount") {
        totalSave =
          totalSave +
          (book.bookPrice -
            this.DicountedPrice(book.bookPrice, book.discount_per));
      }
    });
    return totalSave;
  };
  YouEarned = () => {
    let totalSave = 0;
    this.props.cartDetails.map(book => {
      if (book.offertype == "cashback") {
        totalSave =
          totalSave +
          (book.bookPrice -
            this.CashbackPrice(book.bookPrice, book.cashback_per));
      }
    });
    return totalSave;
  };

  getBookQty = () => {
    let data = {
      newQty: 0,
      oldQty: 0,
      notebookQty: 0,
      totalQty: 0,
    };
    this.props.cartDetails.map(book => {
      if (book.bookInvId.toString().indexOf("KOL") > -1){
        // this.props.cartDetails.bookQty
        data.notebookQty = book.bookQty
      }
      else if (book.bookInvId.toString().indexOf("NB") > -1) {
        data.newQty = data.newQty + 1;
      } else {
        data.oldQty = data.oldQty + 1;
      }
      data.totalQty = data.totalQty + 1;
    });
    return {
      newQty: data.newQty,
      oldQty: data.oldQty,
      notebookQty: data.notebookQty,
      totalQty: data.totalQty,
    };
  };

  openulr = url => {
    window.open(url);
  };
  removeOfferbookHandeler = (e, total) => {
    e.preventDefault();
    this.getItNow(total);
    localStorage.setItem("offerbook", false);
    // alert(`${total}`)
    this.setState({ openOfferBookDialog: false });
   window.location.replace(`/checkout`);
  };

  proceedtoCheckout = e => {
    e.preventDefault();
    // alert("proceedtoCheckout");
    let getAllOutOfStockBook_Inv = [];
    let AllBooksData = this.props.cartDetails
    AllBooksData.map(books => {
      // console.log(books.bookInvId);
      getAllOutOfStockBook_Inv.push(books.bookInvId);
    });
    if (getAllOutOfStockBook_Inv.length) {
      const BookInvdata = {
        book_inv: getAllOutOfStockBook_Inv,
      };
      this.props.OutOfStock("", BookInvdata);
    }
    if (this.props.OutOfStockBooks.length) {
      // alert('out stock')
      this.setState({
        openRemoveOutStockDialog: true,
      });
      return;
    }
    // alert(this.props.offerBook.length);
    if (this.props.offerBook.length !== 0) {
      // alert("offer book");
      if (this.state.getItChecked) {
        this.setState({
          openOfferBookDialog: true,
        });
        return;
      } else {
        e.preventDefault();
       window.location.replace(`/checkout`);
      }
    } else {
      e.preventDefault();
      window.location.replace(`/checkout`);
    }
  };

  getItNow = TotalPayment => {
    let ordervalue = Math.round(TotalPayment);
    const token = `Token ${this.props.userToken}`;
    let user = JSON.parse(localStorage.getItem("user_info"));

    this.props.offeredbook({ id: user.id });
    this.setState({
      getItChecked: !this.state.getItChecked,
      offerBookPopup: false,
      applyOfferSnackbar: true,
    });
    localStorage.setItem("offerbook", !this.state.getItChecked);
    this.props.offerbook_applied(!this.state.getItChecked);
    // }
  };

  closeoffer = () => {
    this.setState({
      offerBookPopup: false,
      getItChecked: false,
      confirm_offerbook: true,
    });

    scroll.scrollTo(400);
  };

  HandleOnChangeApplycoupon = e => {
    e.preventDefault();
    this.setState({ coupon: e.target.value });

    const token = `Token ${localStorage.getItem("user")}`;
    const userid = `${this.props.userDetails.id}`;
    // console.log(userid, 'UID');
    if (6 <= e.target.value.length && e.target.value.length <= 10) {
      this.setState({ applycouponLoader: true });
      this.props
        .couponApply({
          token: token,
          coupon: e.target.value,
          userid: userid,
        })
        .then(res => {
          this.setState({ applycouponLoader: false });
        })
        .catch(err => {
          this.setState({ applycouponLoader: false });
        });
    } else {
      this.props.resetCoupon();
      this.setState({ reduceAmtUsingCoupon: 0 });
    }
  };

  displayCoupon = () => {
    this.setState({ couponDiv: true });
  };

  handleRemoveCartErrClose = () => {
    this.setState({ del_cart_err: false });
  };

  RazorpayPayment = ({
    prepaidOrderDetails,
    passTorzpay,
    thirdParty_order_id,
  }) => {
    // alert(this.state.razorpay_order_id)

    // ***********************RAZORPAY PART********************************
    const options = {
      // key: "rzp_live_pvrJGzjDkVei3G", //Paste your API key here before clicking on the Pay Button.
      // "key": "rzp_test_jxY6Dww4U2KiSA",
      key: "rzp_live_cNDMU35KKMCp6t", //Paste your API key here before clicking on the Pay Button.

      amount: passTorzpay,
      // amount: 1,

      name: `Mypustak.com`,
      description: `Total No of Books ${prepaidOrderDetails.data.no_of_book}`,
      order_id: thirdParty_order_id,
      currency: "INR",
      prefill: {
        // "method":"card,netbanking,wallet,emi,upi",
        contact: `${this.props.Selectedphone_no}`,
        email: `${this.props.UserEmail}`,
      },

      notes: {
        "Order Id": thirdParty_order_id, //"order_id": "your_order_id", // Our Order id
      },
      theme: {
        color: "#2248ae",
        emi_mode: true,
      },

      handler: response => {
        this.setState({
          showPWait: true,
          generatingOrderId: true,
          WaitPlacingOrder: true,
          confirmOrder: true,
        });
        const razorpay_payment_id = response.razorpay_payment_id;
        let AllbookId = [];
        let AllbookInvId = [];
        let AllrackNo = [];
        let AllQty = [];

        this.props.cartDetails.map((book, index) => {
          AllbookId.push(`${book.bookId}`);
          AllbookInvId.push(book.bookInvId);
          AllrackNo.push(book.bookRackNo);
          AllQty.push(book.bookQty);
          //  index;
        });
        // console.log(AllbookId);

        let set_payusing = "razorpay";
        if (this.props.cashback) {
          set_payusing = "razorpay + cashback";
          if (this.state.WalletSelected && this.state.applyBookcoinsSelected) {
            set_payusing = "razorpay + cashback + wallet + BookCoins";
          } else if (this.state.WalletSelected) {
            set_payusing = "razorpay + cashback + wallet";
          } else if (this.state.applyBookcoinsSelected) {
            set_payusing = "razorpay + cashback + BookCoins";
          } else {
          }
        } else if (
          this.state.WalletSelected &&
          this.state.applyBookcoinsSelected
        ) {
          set_payusing = "razorpay + wallet + BookCoins";
        } else {
          if (this.state.WalletSelected) {
            set_payusing = "razorpay + wallet";
          } else if (this.state.applyBookcoinsSelected) {
            set_payusing = "razorpay + BookCoins";
          } else {
          }
        }

        const SendData = {
          // {"payment_id":"12","payment_url":"www.test.com"}
          OrderId: this.props.OrderId,
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
          user_id: `${this.props.UserId}`,
          user_email: `${this.props.UserEmail}`,
          transaction_id: `PaidBookCoins${Math.round(
            prepaidOrderDetails.data.bookcoins_used
          )}_${this.props.OrderId}`,
          deposit: 0,
          deducted_bookcoins: prepaidOrderDetails.data.bookcoins_used,
          added_bookcoins: 0,
          withdrawl: 0,
          payvia: "BookCoins",
          time: `${dateTime}`,
          comment: `Paid Using BookCoins For Order ${this.props.OrderId}`,
          added_by: `${this.props.UserEmail}`,
          order_id: this.props.OrderId,
          deducted_cashback: 0,
          added_cashback: 0,
        };
        this.props
          .updatePaymentIdOrder({ body: SendData, token: "" })
          .then(res => {
            this.props.check_success(this.props.OrderId);
            if (this.props.cashback) {
              this.MakeCashbackAfterRazorpyPayment({
                prepaidOrderDetails,
                token: "",
              });
            } else if (this.state.WalletSelected) {
              const SendDataWallet = {
                user_id: `${this.props.UserId}`,
                user_email: `${this.props.UserEmail}`,
                transaction_id: `PaidFromWallet${Math.round(
                  this.props.walletbalance
                )}_${this.props.OrderId}`,
                deposit: 0,
                deducted_bookcoins: 0,
                added_bookcoins: 0,
                withdrawl: Math.round(this.props.walletbalance),
                payvia: "wallet",
                time: `${dateTime}`,
                comment: `Paid From Wallet For Order ${this.props.OrderId}`,
                added_by: `${this.props.UserEmail}`,
                order_id: this.props.OrderId,
                deducted_cashback: 0,
                added_cashback: 0,
              };
              this.props
                .walletOrder({ body: SendDataWallet, token: "" })
                .then(res => {
                  if (this.state.applyBookcoinsSelected) {
                    this.props
                      .walletOrder({ body: SendDataBookCoins, token: "" })
                      .then(res => {
                        this.RedirectToThankyou();
                      })
                      .catch(err => {
                        this.triggerErrorMsg();
                      });
                  } else {
                    this.RedirectToThankyou();
                  }
                })
                .catch(err => {
                  this.triggerErrorMsg();
                });
            } else {
              if (this.state.applyBookcoinsSelected) {
                this.props
                  .walletOrder({ body: SendDataBookCoins, token: "" })
                  .then(res => {
                    this.RedirectToThankyou();
                  })
                  .catch(err => {
                    this.triggerErrorMsg();
                  });
              } else {
                this.RedirectToThankyou();
              }
            }
          })
          .catch(err => {
            console.log({ err });
            this.triggerErrorMsg();
          });

        if (razorpay_payment_id.length === 0) {
          this.props.ShowRzPayErr();
        }
      },

      modal: {
        ondismiss: () => {
          // console.log(‘Checkout form closed’);
          this.setState({ confirmOrder: false });
          // this.tiggerCheck(this.state.razorpay_order_id);
        },
      },
    };

    this.rzp1 = new window.Razorpay(options);
    this.rzp1.open();

    this.rzp1.on("payment.failed", response => {
      console.log({ response });
    });
  };

  tiggerCheck = () => {
    const body = {
      order_id: this.props.OrderId,
      pay_using: this.state.prepaid3rd_partySelected,
    };
    this.props
      .check_payment_id(body)
      .then(res => {
        console.log({ res });
        if (res.captured)
          this.update_after_payment_verification(
            body.pay_using,
            res.payment_id
          );
      })
      .catch(error => {
        console.log({ error });
      });
  };

  update_after_payment_verification = (payusing, payment_id) => {
    this.setState({
      showPWait: true,
      generatingOrderId: true,
      WaitPlacingOrder: true,
      confirmOrder: true,
    });
    let AllbookId = [];
    let AllbookInvId = [];
    let AllrackNo = [];
    let AllQty = [];

    this.props.cartDetails.map((book, index) => {
      AllbookId.push(`${book.bookId}`);
      AllbookInvId.push(book.bookInvId);
      AllrackNo.push(book.bookRackNo);
      AllQty.push(book.bookQty);
      //  index;
    });
    // console.log(AllbookId);

    let set_payusing, payment_url;
    if (payusing == "Razorpay") {
      set_payusing = "razorpay";
      payment_url = "https://razorpay.com/";
      if (this.state.WalletSelected && this.state.applyBookcoinsSelected) {
        set_payusing = "razorpay + wallet + BookCoins";
      } else {
        if (this.state.WalletSelected) {
          set_payusing = "razorpay + wallet";
        } else if (this.state.applyBookcoinsSelected) {
          set_payusing = "razorpay + BookCoins";
        } else {
        }
      }
    } else {
      set_payusing = "cashfree";
      payment_url = "https://cashfree.com/";

      if (this.state.WalletSelected && this.state.applyBookcoinsSelected) {
        set_payusing = "cashfree + wallet + BookCoins";
      } else {
        if (this.state.WalletSelected) {
          set_payusing = "cashfree + wallet";
        } else if (this.state.applyBookcoinsSelected) {
          set_payusing = "cashfree + BookCoins";
        } else {
        }
      }
    }

    const SendData = {
      OrderId: this.props.OrderId,
      payment_id,
      payment_url,
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
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;
    const SendDataBookCoins = {
      user_id: `${this.props.UserId}`,
      user_email: `${this.props.UserEmail}`,
      transaction_id: `PaidBookCoins${Math.round(
        prepaidOrderDetails.data.bookcoins_used
      )}_${this.props.OrderId}`,
      deposit: 0,
      deducted_bookcoins: prepaidOrderDetails.data.bookcoins_used,
      added_bookcoins: 0,
      withdrawl: 0,
      payvia: "BookCoins",
      time: `${dateTime}`,
      comment: `Paid Using BookCoins For Order ${this.props.OrderId}`,
      added_by: `${this.props.UserEmail}`,
      order_id: this.props.OrderId,
      deducted_cashback: 0,
      added_cashback: 0,
    };

    this.props
      .updatePaymentIdOrder({ body: SendData, token: "" })
      .then(res => {
        if (this.state.WalletSelected) {
          const SendDataWallet = {
            user_id: `${this.props.UserId}`,
            user_email: `${this.props.UserEmail}`,
            transaction_id: `PaidFromWallet${Math.round(
              this.props.walletbalance
            )}_${this.props.OrderId}`,
            deposit: 0,
            deducted_bookcoins: 0,
            added_bookcoins: 0,
            withdrawl: Math.round(this.props.walletbalance),
            payvia: "wallet",
            time: `${dateTime}`,
            comment: `Paid From Wallet For Order ${this.props.OrderId}`,
            added_by: `${this.props.UserEmail}`,
            order_id: this.props.OrderId,
            deducted_cashback: 0,
            added_cashback: 0,
          };
          this.props
            .walletOrder({ body: SendDataWallet, token: "" })
            .then(res => {
              if (this.state.applyBookcoinsSelected) {
                this.props
                  .walletOrder({ body: SendDataBookCoins, token: "" })
                  .then(res => {
                    this.RedirectToThankyou();
                  })
                  .catch(err => {
                    this.triggerErrorMsg();
                  });
              } else {
                this.RedirectToThankyou();
              }
            })
            .catch(err => {
              this.triggerErrorMsg();
            });
        } else {
          if (this.state.applyBookcoinsSelected) {
            this.props
              .walletOrder({ body: SendDataBookCoins, token: "" })
              .then(res => {
                this.RedirectToThankyou();
              })
              .catch(err => {
                this.triggerErrorMsg();
              });
          } else {
            this.RedirectToThankyou();
          }
        }
      })
      .catch(err => {
        this.triggerErrorMsg();
      });
  };

  changeproductQty = (type, product) => {
    if (!type.length) return;
    let current_qty = product.bookQty;
    if (type == "inc") {
      current_qty = current_qty + 1;
    } else if (type == "dec" && current_qty > 1) {
      current_qty = current_qty - 1;
    } else {
      // alert('')
      return;
    }
    let currentProduct = product;
    currentProduct.bookQty = current_qty;
    currentProduct.bookShippingCost = Math.round(
      currentProduct.bookPrice * current_qty
    );
    this.setState({ updadtingQty: true });
    const sendCartSession = {
      Cart_id: currentProduct.Cart_id,
      qty: currentProduct.bookQty,
    };
    this.props
      .UpdateCart(sendCartSession)
      .then(res => {
        // this.props.UpdateAlreadyAddedProduct(currentProduct);
        this.props.CartSession();
        this.setState({ updadtingQty: false });
      })
      .catch(err => {
        this.setState({ updadtingQty: false });
      });
  };

  cashfreePayment = ({ prepaidOrderDetails, passToCashfree, cashfreeRes }) => {
    this.setState({ showPWait: true, generatingOrderId: true });

    let data = {};
    data.orderId = this.props.OrderId;
    data.orderAmount = passToCashfree;
    data.customerName = this.props.UserEmail;
    data.customerPhone = this.props.Selectedphone_no;
    data.customerEmail = this.props.UserEmail;
    data.returnUrl = "";
    // data.notifyUrl = "http://127.0.0.1:8000/common/cashfree/";
    data.notifyUrl = `https://data.mypustak.com/api/v1/post/get_razorpayid/cashfree_verification`;
    data.appId = "1409353af95c0865ee8aaab46d539041"; // PROD 264572037bbcd2407554141f175462 TEST 833005ef95eda971610224230338
    data.paymentToken = cashfreeRes.signature;
    let callback = async event => {
      let eventName = event.name;
      switch (eventName) {
        case "PAYMENT_REQUEST":
          let response = event.response;
          this.setState({ showPWait: true, generatingOrderId: true });
          break;
        case "PAYMENT_RESPONSE":
          let payment_response = event.response;
          // console.log({ payment_response }, 'response');
          if (payment_response.txStatus == "SUCCESS") {
            this.setState({
              WaitPlacingOrder: true,
              confirmOrder: true,
            });
            var AllbookId = [];
            var AllbookInvId = [];
            var AllrackNo = [];
            var AllQty = [];

            this.props.cartDetails.map((book, index) => {
              AllbookId.push(`${book.bookId}`);
              AllbookInvId.push(book.bookInvId);
              AllrackNo.push(book.bookRackNo);
              AllQty.push(book.bookQty);
              //  index;
            });
            // console.log(AllbookId);
            let set_payusing = "cashfree";
            if (this.props.cashback) {
              set_payusing = "cashfree + cashback";

              if (
                this.state.WalletSelected &&
                this.state.applyBookcoinsSelected
              ) {
                set_payusing = "cashfree + cashback + wallet + BookCoins";
              } else if (this.state.WalletSelected) {
                set_payusing = "cashfree + cashback + wallet";
              } else if (this.state.applyBookcoinsSelected) {
                set_payusing = "cashfree + cashback + BookCoins";
              } else {
                console.log("Cashfree Not in Accounts");
              }
            } else if (
              this.state.WalletSelected &&
              this.state.applyBookcoinsSelected
            ) {
              set_payusing = "cashfree + wallet + BookCoins";
            } else {
              if (this.state.WalletSelected) {
                set_payusing = "cashfree + wallet";
              } else if (this.state.applyBookcoinsSelected) {
                set_payusing = "cashfree + BookCoins";
              } else {
              }
            }

            const SendData = {
              // {"payment_id":"12","payment_url":"www.test.com"}
              OrderId: this.props.OrderId,
              payment_id: payment_response.referenceId,
              payment_url: "https://cashfree.com/",
              book_id: AllbookId,
              book_inv_id: AllbookInvId,
              rack_no: AllrackNo,
              qty: AllQty,
              payusing: set_payusing,
            };
            const token = `Token ${this.props.userToken}`;

            var today = new Date();
            var date =
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate();
            var time =
              today.getHours() +
              ":" +
              today.getMinutes() +
              ":" +
              today.getSeconds();
            var dateTime = date + " " + time;

            let walletBody = {
              user_id: `${this.props.userDetails.id}`,
              user_email: `${this.props.UserEmail}`,
              transaction_id: `PaidFromWallet${prepaidOrderDetails.data.wallet_used}_${this.props.OrderId}`,
              deposit: 0,
              withdrawl: prepaidOrderDetails.data.wallet_used,
              payvia: "wallet",
              time: `${dateTime}`,
              comment: `Paid From Wallet For Order ${this.props.OrderId}`,
              deducted_bookcoins: 0,
              added_bookcoins: 0,
              added_by: `${this.props.UserEmail}`,
              order_id: this.props.OrderId,
              deducted_cashback: 0,
              added_cashback: 0,
            };

            let BookCoinsBody = {
              user_id: `${this.props.userDetails.id}`,
              user_email: `${this.props.UserEmail}`,
              transaction_id: `PaidBookCoins${Math.round(
                prepaidOrderDetails.data.bookcoins_used
              )}_${this.props.OrderId}`,
              deposit: 0,
              withdrawl: 0,
              payvia: "BookCoins",
              time: `${dateTime}`,
              comment: `Paid From BookCoins For Order ${this.props.OrderId}`,
              deducted_bookcoins: prepaidOrderDetails.data.bookcoins_used,
              added_bookcoins: 0,
              added_by: `${this.props.UserEmail}`,
              order_id: this.props.OrderId,
              deducted_cashback: 0,
              added_cashback: 0,
            };

            this.props
              .updatePaymentIdOrder({
                body: SendData,
                token,
              })
              .then(res => {
                if (this.state.WalletSelected) {
                  this.props
                    .walletOrder({
                      body: walletBody,
                      token,
                    })
                    .then(res => {
                      if (this.state.applyBookcoinsSelected) {
                        this.props
                          .walletOrder({
                            body: BookCoinsBody,
                            token,
                          })
                          .then(res => {
                            this.RedirectToThankyou();
                          })
                          .catch(err => {
                            this.triggerErrorMsg();
                          });
                      } else {
                        this.RedirectToThankyou();
                      }
                    })
                    .catch(err => {
                      this.triggerErrorMsg();
                    });
                } else {
                  if (this.state.applyBookcoinsSelected) {
                    this.props
                      .walletOrder({
                        body: BookCoinsBody,
                        token,
                      })
                      .then(res => {
                        this.RedirectToThankyou();
                      })
                      .catch(err => {
                        this.triggerErrorMsg();
                      });
                  } else {
                    this.RedirectToThankyou();
                  }
                }
              })
              .catch(err => {
                this.triggerErrorMsg();
              });
          }
          if (payment_response.txStatus == "FAILED") {
            this.setState({ showPWait: true, generatingOrderId: false });
            this.tiggerCheck("");
          }
          if (payment_response.txStatus == "CANCELLED") {
            this.setState({
              showPWait: true,
              generatingOrderId: false,
              confirmOrder: false,
            });
          }
          break;
        default:
        // console.log(event.message);
      }
    };
    const CashFree = window.CashFree;
    let config = {};
    config.layout = { view: "popup", width: "650" };
    config.mode = "PROD"; //use PROD when you go live
    let response = CashFree.init(config);
    // console.log({ response });

    if (response.status == "OK") {
      // console.log('okk----');
      let response = CashFree.makePayment(data, callback);
    }
  };

  Trigger3rdParty = async (
    { prepaidOrderDetails, thirdParty_order_id },
    wallet_3rd_party = 0
  ) => {
    let passTorzpay = Math.round(prepaidOrderDetails.data.amount) * 100;
    let passToCashfree = Math.round(prepaidOrderDetails.data.amount);

    if (wallet_3rd_party) {
      passTorzpay =
        (prepaidOrderDetails.data.amount -
          Number(prepaidOrderDetails.data.wallet_used)) *
        100;

      passToCashfree =
        prepaidOrderDetails.data.amount -
        Number(prepaidOrderDetails.data.wallet_used);
    }
    const SendDataRzpzy = {
      data: {
        ref_id: this.props.OrderId,
        amount: passTorzpay,
      },
    };
    if (this.state.prepaid3rd_partySelected == "Razorpay") {
      this.setState({ confirmOrder: false });
      this.props.get_razorpay_key().then(res => {
        // alert(res.result);
        this.setState({ razorpay_key: res.result });
      });
      this.RazorpayPayment({
        prepaidOrderDetails,
        passTorzpay,
        thirdParty_order_id,
      });
      this.setState({ generatingOrderId: false });
      // }
    }

    if (this.state.prepaid3rd_partySelected == "Cashfree") {
      const token = localStorage.getItem("user");
      // let timeStamp = Math.floor(Date.now() / 1000);
      let WalletOrderId = this.props.OrderId;
      let order_amount = passToCashfree;
      let body = {
        orderId: WalletOrderId,
        orderAmount: order_amount,
        return_url: "",
        user_phone: this.props.Selectedphone_no,
        user_email: this.props.UserEmail,
      };
      let cashfreeRes = await this.props.Get_CashFree_Signature_Wallet({
        token,
        body,
      });

      // let rzpayRes = await this.props.Get_Rp_Id(SendDataRzpzy);

      this.setState({ confirmOrder: false });
      this.cashfreePayment({
        prepaidOrderDetails,
        passToCashfree,
        cashfreeRes,
      });
      // this.setState({ generatingOrderId: false })
    }
  };

  updateOrderPaymentid = async prepaidOrderDetails => {
    const SendData = {
      // {"payment_id":"12","payment_url":"www.test.com"}
      OrderId: this.props.OrderId,
      payment_url: "prepaid",
      book_id: prepaidOrderDetails.data.book_id,
      book_inv_id: prepaidOrderDetails.data.book_inv_id,
      rack_no: prepaidOrderDetails.data.rack_no,
      qty: prepaidOrderDetails.data.qty,
    };
    let updateRes = await this.props.updatePaymentIdOrder({
      body: SendData,
      token,
    });
    // console.log('res');

    if (updateRes) {
    }
  };

  Confirmation_of_order = () => {
    this.calculateCartDeatils(this.state.paytype);

    if (this.props.SelectedAddress.length == 0) {
      this.OpenAddressSide();
      scroll.scrollToTop({ duration: 500 });
      return;
    }
  };

  // For Makeing Payment main Function For All Payments
  MakePayment = () => {
    this.calculateCartDeatils(this.state.paytype);
    if (this.props.SelectedAddress.length == 0) {
      this.OpenAddressSide();
      scroll.scrollToTop({ duration: 500 });
      return;
    }
    this.setState({ confirmOrder: true });
    // this.setState({WaitPlacingOrder:true})

    const token = `Token ${this.props.userToken}`;

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
    // let all_books_price = 0;
    let cod_charge = 0;
    let total_cod_amount = 0;
    let ShowpepaidBookCoinsCanBeUsed = 0;
    let booksAndDeliverPrice = 0;
    // let oldBookPrice = 0;
    // let newBookPrice = 0;

    this.props.cartDetails.map((book, index) => {
      AllbookId.push(`${book.bookId}`);
      AllbookInvId.push(book.bookInvId);
      AllrackNo.push(book.bookRackNo);
      AllQty.push(book.bookQty);
      AllBookPrice.push(book.bookPrice);
      AllDeliveryCost.push(book.delivery_cost);
      AllDiscountper.push(book.discount_per);
      AllCashbackper.push(book.cashback_per);
      AllDiscountedPrice.push(book.discount);
      AllCashbackedPrice.push(book.cashback);
      AllShippingCost.push(book.bookShippingCost);
      AllOffers.push(book.offertype);
      AllBook_Thumb.push(book.bookThumb);
    });

    const { all_books_price, oldBookPrice, newBookPrice, newBookDeliveryCost } =
      this.fetchcalculatedAllBookPrice();
    booksAndDeliverPrice = all_books_price + newBookDeliveryCost;
    // console.log({ newBookPrice, oldBookPrice ,booksAndDeliverPrice}, 'book type price');
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
    } = this.props.SelectedAddress;
    let OrderPayload = {
      data: {
        no_of_book: this.props.ItemsInCart,
        billing_add_id: this.props.AddresId,
        shipping_add_id: this.props.AddresId,
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
        net_amount: this.renderAmtUsed().actual_book_charges,
      },
    };

    if (this.state.reduceAmtUsingCoupon) {
      booksAndDeliverPrice =
        booksAndDeliverPrice - this.state.reduceAmtUsingCoupon;
    }

    // console.log({ booksAndDeliverPrice });
    // return
    if (this.state.paytype == "cod") {
      if (
        this.state.cod_charge + all_books_price + newBookDeliveryCost >=
        this.state.min_cod_order_value
      ) {
        cod_charge = this.state.cod_charge;
        total_cod_amount = cod_charge + all_books_price + newBookDeliveryCost;
      } else {
        cod_charge = this.state.cod_charge;
        total_cod_amount = this.state.min_cod_order_value;
      }

      OrderPayload.data.payusing = this.state.paytype;
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

      this.props.AddPriceCart(cartData);
      this.setState({
        UserAmount: OrderPayload.data.amount,
        generatingOrderId: true,
        confirmOrder: true,
        WaitPlacingOrder: true,
      });

      this.MakeCodPayment({ codOrderDetails: OrderPayload, token: token });
    } else {
      // for Prepaid Payments
      // booksAndDeliverPrice = this.renderAmtUsed().netPayAmt
      if (all_books_price < this.state.min_prepaid_order_value) {
        booksAndDeliverPrice = this.state.min_prepaid_order_value + newBookDeliveryCost;
        // console.log("[PR]")
      }

      if (
        this.state.paytype == "prepaid" &&
        !this.state.WalletSelected &&
        !this.props.cashback
      ) {
        ShowpepaidBookCoinsCanBeUsed = this.calculateBookCoinsUsed(
          booksAndDeliverPrice,
          newBookPrice,
          oldBookPrice
        );
        let payment_payusing = this.state.paytype;
        if (this.state.prepaid3rd_partySelected == "Razorpay") {
          payment_payusing = "prepaid_R";
        }
        if (this.state.prepaid3rd_partySelected == "Cashfree") {
          payment_payusing = "prepaid_C";
        }
        OrderPayload.data.payusing = payment_payusing;
        OrderPayload.data.amount =
          booksAndDeliverPrice - ShowpepaidBookCoinsCanBeUsed;
        OrderPayload.data.third_party_amt =
          booksAndDeliverPrice - ShowpepaidBookCoinsCanBeUsed;
        OrderPayload.data.cod_charge = cod_charge;
        OrderPayload.data.deliveryCost = AllDeliveryCost;
        OrderPayload.data.cashBackper = AllCashbackper;
        OrderPayload.data.discountper = AllDiscountper;
        OrderPayload.data.discountedPrice = AllDiscountedPrice;
        OrderPayload.data.cashbackedPrice = AllCashbackedPrice;
        OrderPayload.data.userPay = AllShippingCost;
        OrderPayload.data.bookcoins_used = ShowpepaidBookCoinsCanBeUsed;
        OrderPayload.data.coupon_id = this.props.couponResult.coupon_code;
        OrderPayload.data.coupon_type = this.props.couponResult.coupon_type;
        OrderPayload.data.coupon_amount = this.props.redeemcoupon;
        OrderPayload.data.cashback_used = this.props.cashback;

        // OrderPayload.data.AmtAftercashback_used =
        this.setState({
          UserAmount: booksAndDeliverPrice - ShowpepaidBookCoinsCanBeUsed,
          generatingOrderId: true,
        });
        console.log({ OrderPayload });

        // Api Call third party gateway
        this.Make3rdPartyPayment({
          prepaidOrderDetails: OrderPayload,
          token: token,
        });
      } else if (
        this.state.paytype == "prepaid" &&
        this.state.WalletSelected &&
        !this.props.cashback
      ) {
        // For  Api Call third party gateway + Mypustak Wallet
        ShowpepaidBookCoinsCanBeUsed = this.calculateBookCoinsUsed(
          booksAndDeliverPrice,
          newBookPrice,
          oldBookPrice
        );
        let payment_payusing = this.state.paytype;
        if (this.state.prepaid3rd_partySelected == "Razorpay") {
          payment_payusing = "prepaid_R";
        }
        if (this.state.prepaid3rd_partySelected == "Cashfree") {
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
        OrderPayload.data.coupon_id = this.props.couponResult.coupon_code;
        OrderPayload.data.coupon_type = this.props.couponResult.coupon_type;
        OrderPayload.data.coupon_amount = this.props.redeemcoupon;
        OrderPayload.data.cashback_used = this.props.cashback;

        // console.log({ OrderPayload });

        let user_only_wallet =
          this.props.walletbalance <
          booksAndDeliverPrice - ShowpepaidBookCoinsCanBeUsed
            ? 0
            : 1;

        let booksPriceWithBookCoins =
          booksAndDeliverPrice - ShowpepaidBookCoinsCanBeUsed;
        OrderPayload.data.wallet_used = this.fetchDeductedWalletAmt(
          booksPriceWithBookCoins
        );
        OrderPayload.data.third_party_amt =
          booksAndDeliverPrice - ShowpepaidBookCoinsCanBeUsed;
        if (user_only_wallet) {
          // console.log('[process]only wallet');
          OrderPayload.data.payusing = "wallet";
          if (ShowpepaidBookCoinsCanBeUsed) {
            OrderPayload.data.payusing = "wallet+BookCoins";
          }
          this.setState({ generatingOrderId: true });
          this.MakeWalletPayment({
            prepaidOrderDetails: OrderPayload,
            token: token,
          });
        } else {
          // console.log('[process]wallet + 3rd');
          this.setState({ generatingOrderId: true });

          this.MakeWallet_3rdPartyPayment({
            prepaidOrderDetails: OrderPayload,
            token: token,
          });
        }
      } else if (this.state.paytype == "prepaid" && this.props.cashback) {
        // For  Api Call third party gateway + Mypustak Cashback
        ShowpepaidBookCoinsCanBeUsed = this.calculateBookCoinsUsed(
          booksAndDeliverPrice,
          newBookPrice,
          oldBookPrice
        );
        OrderPayload.data.payusing = "";
        OrderPayload.data.amount =
          booksAndDeliverPrice -
          ShowpepaidBookCoinsCanBeUsed -
          this.props.cashback;
        OrderPayload.data.cod_charge = cod_charge;
        OrderPayload.data.deliveryCost = AllDeliveryCost;
        OrderPayload.data.cashBackper = AllCashbackper;
        OrderPayload.data.discountper = AllDiscountper;
        OrderPayload.data.discountedPrice = AllDiscountedPrice;
        OrderPayload.data.cashbackedPrice = AllCashbackedPrice;
        OrderPayload.data.userPay = AllShippingCost;
        OrderPayload.data.bookcoins_used = ShowpepaidBookCoinsCanBeUsed;
        OrderPayload.data.coupon_id = this.props.couponResult.coupon_code;
        OrderPayload.data.coupon_type = this.props.couponResult.coupon_type;
        OrderPayload.data.coupon_amount = this.props.redeemcoupon;
        OrderPayload.data.cashback_used = this.props.cashback;

        // console.log({ OrderPayload });
        OrderPayload.data.wallet_used = this.renderAmtUsed().deductWalletAmt;

        let user_only_cashback_wallet =
          this.props.cashback <
          booksAndDeliverPrice -
            ShowpepaidBookCoinsCanBeUsed -
            OrderPayload.data.wallet_used
            ? 0
            : 1;

        let booksPriceWithBookCoins =
          booksAndDeliverPrice - ShowpepaidBookCoinsCanBeUsed;
        OrderPayload.data.third_party_amt =
          booksAndDeliverPrice -
          ShowpepaidBookCoinsCanBeUsed -
          OrderPayload.data.wallet_used;

        // this.props.walletbalance < all_books_price - ShowpepaidBookCoinsCanBeUsed
        // 	? this.props.walletbalance
        // 	: all_books_price - ShowpepaidBookCoinsCanBeUsed;

        if (user_only_cashback_wallet) {
          // console.log('[process]only wallet');
          OrderPayload.data.payusing = "cashback";
          if (OrderPayload.data.wallet_used) {
            OrderPayload.data.payusing = "wallet+cashback";
          }

          if (ShowpepaidBookCoinsCanBeUsed && OrderPayload.data.wallet_used) {
            OrderPayload.data.payusing = "wallet+cashback+bookcoins";
          }
          this.setState({ generatingOrderId: true });
          this.MakeCashbackPayment({
            prepaidOrderDetails: OrderPayload,
            token: token,
          });
        } else {
          if (this.state.prepaid3rd_partySelected == "Razorpay") {
            OrderPayload.data.payusing = "prepaid_R";
          }
          if (this.state.prepaid3rd_partySelected == "Cashfree") {
            OrderPayload.data.payusing = "prepaid_C";
          }
          // console.log('[process]wallet + 3rd');
          this.setState({ generatingOrderId: true });

          this.MakeWallet_3rdPartyPayment({
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
      this.props.AddPriceCart(cartData);
    }
  };

  // End of MakePayment()

  // for Cod Payments
  MakeCodPayment = async ({ codOrderDetails, token }) => {
    // alert(this.state.paytype)
    console.log({ codOrderDetails }, "only Cod 1");

    let res = await this.props.OrderDetails(codOrderDetails, token);
    if (res) {
      const SendData = {
        // {"payment_id":"12","payment_url":"www.test.com"}
        OrderId: this.props.OrderId,
        payment_url: "cod",
        book_id: codOrderDetails.data.book_id,
        book_inv_id: codOrderDetails.data.book_inv_id,
        rack_no: codOrderDetails.data.rack_no,
        qty: codOrderDetails.data.qty,
        payment_id: this.props.OrderId,
      };

      // For Updating OrderDetail
      this.props
        .updatePaymentIdOrder({
          body: SendData,
          token,
        })
        .then(res => {
          this.RedirectToThankyou();
        })
        .catch(err => {
          this.triggerErrorMsg();
        });
    } else {
      let Err_msg = "Sorry Your Order Was Not Placed ";
      if (this.props.OutOfStockBooks.length) {
        Err_msg = Err_msg + "Please Remove The Out Of Stock Books";
        this.setState({ openRemoveOutStockDialog: true });
      }
      this.setState({
        OrderErrMsg: Err_msg,
        ShowOrderCreationErr: true,
        confirmOrder: false,
        generatingOrderId: false,
        WaitPlacingOrder: false,
      });
    }
  };

  // for third Party Api
  Make3rdPartyPayment = async ({ prepaidOrderDetails, token }) => {
    // alert(this.state.generatingOrderId)
    console.log({ prepaidOrderDetails }, "[process]only Prepaid 3 rd part 2");
    let res = await this.props.OrderDetails(prepaidOrderDetails, token);
    // console.log({res})
    if (res) {
      // this.setState({razorpay_order_id:res.genrated_id})
      this.Trigger3rdParty({
        prepaidOrderDetails,
        thirdParty_order_id: res.genrated_id,
      });
    } else {
      let Err_msg = "Sorry Your Order Was Not Placed ";
      if (this.props.OutOfStockBooks.length) {
        Err_msg = Err_msg + "Please Remove The Out Of Stock Books";
        this.setState({ openRemoveOutStockDialog: true });
      }
      this.setState({
        OrderErrMsg: Err_msg,
        ShowOrderCreationErr: true,
        confirmOrder: false,
        generatingOrderId: false,
      });
    }
  };
  // for third Party Api + wallet
  MakeWallet_3rdPartyPayment = async ({ prepaidOrderDetails, token }) => {
    let res = await this.props.OrderDetails(prepaidOrderDetails, token);
    if (res) {
      this.Trigger3rdParty({ prepaidOrderDetails }, 1);
    } else {
      let Err_msg = "Sorry Your Order Was Not Placed ";
      if (this.props.OutOfStockBooks.length) {
        Err_msg = Err_msg + "Please Remove The Out Of Stock Books";
        this.setState({ openRemoveOutStockDialog: true });
      }
      this.setState({
        OrderErrMsg: Err_msg,
        ShowOrderCreationErr: true,
        confirmOrder: false,
        generatingOrderId: false,
      });
    }
  };

  // for Only Wallet Payment
  MakeWalletPayment = async ({ prepaidOrderDetails, token }) => {
    // alert(this.state.paytype)
    this.setState({
      WaitPlacingOrder: true,
      confirmOrder: true,
    });
    // console.log({ prepaidOrderDetails }, 'only prepaid wallet 4');

    let res = await this.props.OrderDetails(prepaidOrderDetails, token);
    if (res) {
      // alert(this.props.OrderId)

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
        user_id: `${this.props.userDetails.id}`,
        user_email: `${this.props.UserEmail}`,
        transaction_id: `PaidFromWallet${prepaidOrderDetails.data.wallet_used}_${this.props.OrderId}`,
        deposit: 0,
        withdrawl: prepaidOrderDetails.data.wallet_used,
        payvia: "wallet",
        time: `${dateTime}`,
        comment: `Paid From Wallet For Order ${this.props.OrderId}`,
        deducted_bookcoins: 0,
        added_bookcoins: 0,
        added_by: `${this.props.UserEmail}`,
        order_id: this.props.OrderId,
        deducted_cashback: 0,
        added_cashback: 0,
      };

      this.props
        .walletOrder({ body: walletBody, token })
        .then(res => {
          let BookCoinsBody = {
            user_id: `${this.props.userDetails.id}`,
            user_email: `${this.props.UserEmail}`,
            transaction_id: `PaidBookCoins${Math.round(
              prepaidOrderDetails.data.bookcoins_used
            )}_${this.props.OrderId}`,
            deposit: 0,
            withdrawl: 0,
            payvia: "BookCoins",
            time: `${dateTime}`,
            comment: `Paid From BookCoins For Order ${this.props.OrderId}`,
            deducted_bookcoins: prepaidOrderDetails.data.bookcoins_used,
            added_bookcoins: 0,
            added_by: `${this.props.UserEmail}`,
            order_id: this.props.OrderId,
            deducted_cashback: 0,
            added_cashback: 0,
          };

          const SendData = {
            OrderId: this.props.OrderId,
            payment_url: "prepaid",
            book_id: prepaidOrderDetails.data.book_id,
            book_inv_id: prepaidOrderDetails.data.book_inv_id,
            rack_no: prepaidOrderDetails.data.rack_no,
            qty: prepaidOrderDetails.data.qty,
            payusing: this.state.applyBookcoinsSelected
              ? "wallet +BookCoins"
              : "wallet",
            payment_id: this.props.OrderId,
          };

          if (this.state.applyBookcoinsSelected) {
            this.props
              .walletOrder({
                body: BookCoinsBody,
                token,
              })
              .then(res => {
                this.props
                  .updatePaymentIdOrder({
                    body: SendData,
                    token,
                  })
                  .then(res => {
                    this.RedirectToThankyou();
                  })
                  .catch(err => {
                    this.triggerErrorMsg();
                  });
              })
              .catch(err => {
                this.triggerErrorMsg();
              });
          } else {
            // For Updating OrderDetail
            this.props
              .updatePaymentIdOrder({
                body: SendData,
                token,
              })
              .then(res => {
                this.RedirectToThankyou();
              })
              .catch(err => {
                this.triggerErrorMsg();
              });
          }
        })
        .catch(err => {
          let Err_msg = "Sorry Your Order Was Not Placed ";
          this.setState({
            OrderErrMsg: Err_msg,
            ShowOrderCreationErr: true,
            confirmOrder: false,
            generatingOrderId: false,
          });
        });
    } else {
      let Err_msg = "Sorry Your Order Was Not Placed ";
      if (this.props.OutOfStockBooks.length) {
        Err_msg = Err_msg + "Please Remove The Out Of Stock Books";
        this.setState({ openRemoveOutStockDialog: true });
      }
      this.setState({
        OrderErrMsg: Err_msg,
        ShowOrderCreationErr: true,
        confirmOrder: false,
        generatingOrderId: false,
      });
    }
  };

  // for Only Cashback Payment
  MakeCashbackPayment = async ({ prepaidOrderDetails, token }) => {
    // alert(this.state.paytype)
    this.setState({
      WaitPlacingOrder: true,
      confirmOrder: true,
    });
    // console.log({ prepaidOrderDetails }, 'only prepaid wallet 4');

    let res = await this.props.OrderDetails(prepaidOrderDetails, token);
    if (res) {
      // alert(this.props.OrderId)
      // return
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
        user_id: `${this.props.userDetails.id}`,
        user_email: `${this.props.UserEmail}`,
        transaction_id: `PaidFromCashback${prepaidOrderDetails.data.cashback_used}_${this.props.OrderId}`,
        deposit: 0,
        withdrawl: 0,
        payvia: "cashback",
        time: `${dateTime}`,
        comment: `Paid From Wallet For Order ${this.props.OrderId}`,
        deducted_bookcoins: 0,
        added_bookcoins: 0,
        added_by: `${this.props.UserEmail}`,
        order_id: this.props.OrderId,
        deducted_cashback: prepaidOrderDetails.data.cashback_used,
        added_cashback: 0,
      };

      const walletBody = {
        user_id: `${this.props.userDetails.id}`,
        user_email: `${this.props.UserEmail}`,
        transaction_id: `PaidFromWallet${prepaidOrderDetails.data.wallet_used}_${this.props.OrderId}`,
        deposit: 0,
        withdrawl: prepaidOrderDetails.data.wallet_used,
        payvia: "wallet",
        time: `${dateTime}`,
        comment: `Paid From Wallet For Order ${this.props.OrderId}`,
        deducted_bookcoins: 0,
        added_bookcoins: 0,
        added_by: `${this.props.UserEmail}`,
        order_id: this.props.OrderId,
        deducted_cashback: 0,
        added_cashback: 0,
      };

      this.props
        .walletOrder({ body: cashbackBody, token })
        .then(res => {
          let BookCoinsBody = {
            user_id: `${this.props.userDetails.id}`,
            user_email: `${this.props.UserEmail}`,
            transaction_id: `PaidBookCoins${Math.round(
              prepaidOrderDetails.data.bookcoins_used
            )}_${this.props.OrderId}`,
            deposit: 0,
            withdrawl: 0,
            payvia: "BookCoins",
            time: `${dateTime}`,
            comment: `Paid From BookCoins For Order ${this.props.OrderId}`,
            deducted_bookcoins: prepaidOrderDetails.data.bookcoins_used,
            added_bookcoins: 0,
            added_by: `${this.props.UserEmail}`,
            order_id: this.props.OrderId,
            deducted_cashback: 0,
            added_cashback: 0,
          };

          const SendData = {
            OrderId: this.props.OrderId,
            payment_url: "prepaid",
            book_id: prepaidOrderDetails.data.book_id,
            book_inv_id: prepaidOrderDetails.data.book_inv_id,
            rack_no: prepaidOrderDetails.data.rack_no,
            qty: prepaidOrderDetails.data.qty,
            payusing: prepaidOrderDetails.data.payusing,
            payment_id: this.props.OrderId,
          };

          if (prepaidOrderDetails.data.wallet_used) {
            this.props
              .walletOrder({
                body: walletBody,
                token,
              })
              .then(res => {
                if (this.state.applyBookcoinsSelected) {
                  this.props
                    .walletOrder({
                      body: BookCoinsBody,
                      token,
                    })
                    .then(res => {
                      this.props
                        .updatePaymentIdOrder({
                          body: SendData,
                          token,
                        })
                        .then(res => {
                          this.RedirectToThankyou();
                        })
                        .catch(err => {
                          this.triggerErrorMsg();
                        });
                    })
                    .catch(err => {
                      this.triggerErrorMsg();
                    });
                } else {
                  // For Updating OrderDetail
                  this.props
                    .updatePaymentIdOrder({
                      body: SendData,
                      token,
                    })
                    .then(res => {
                      this.RedirectToThankyou();
                    })
                    .catch(err => {
                      this.triggerErrorMsg();
                    });
                }
              })
              .catch(err => {
                this.triggerErrorMsg();
              });
          } else {
            if (this.state.applyBookcoinsSelected) {
              this.props
                .walletOrder({
                  body: BookCoinsBody,
                  token,
                })
                .then(res => {
                  this.props
                    .updatePaymentIdOrder({
                      body: SendData,
                      token,
                    })
                    .then(res => {
                      this.RedirectToThankyou();
                    })
                    .catch(err => {
                      this.triggerErrorMsg();
                    });
                })
                .catch(err => {
                  this.triggerErrorMsg();
                });
            } else {
              this.props
                .updatePaymentIdOrder({
                  body: SendData,
                  token,
                })
                .then(res => {
                  this.RedirectToThankyou();
                })
                .catch(err => {
                  this.triggerErrorMsg();
                });
            }
          }
        })
        .catch(err => {
          let Err_msg = "Sorry Your Order Was Not Placed ";
          this.setState({
            OrderErrMsg: Err_msg,
            ShowOrderCreationErr: true,
            confirmOrder: false,
            generatingOrderId: false,
          });
        });
    } else {
      let Err_msg = "Sorry Your Order Was Not Placed ";
      if (this.props.OutOfStockBooks.length) {
        Err_msg = Err_msg + "Please Remove The Out Of Stock Books";
        this.setState({ openRemoveOutStockDialog: true });
      }
      this.setState({
        OrderErrMsg: Err_msg,
        ShowOrderCreationErr: true,
        confirmOrder: false,
        generatingOrderId: false,
      });
    }
  };

  MakeCashbackAfterRazorpyPayment = async ({ prepaidOrderDetails, token }) => {
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
      user_id: `${this.props.userDetails.id}`,
      user_email: `${this.props.UserEmail}`,
      transaction_id: `PaidFromCashback${prepaidOrderDetails.data.cashback_used}_${this.props.OrderId}`,
      deposit: 0,
      withdrawl: 0,
      payvia: "cashback",
      time: `${dateTime}`,
      comment: `Paid From Wallet For Order ${this.props.OrderId}`,
      deducted_bookcoins: 0,
      added_bookcoins: 0,
      added_by: `${this.props.UserEmail}`,
      order_id: this.props.OrderId,
      deducted_cashback: prepaidOrderDetails.data.cashback_used,
      added_cashback: 0,
    };

    const walletBody = {
      user_id: `${this.props.userDetails.id}`,
      user_email: `${this.props.UserEmail}`,
      transaction_id: `PaidFromWallet${prepaidOrderDetails.data.wallet_used}_${this.props.OrderId}`,
      deposit: 0,
      withdrawl: prepaidOrderDetails.data.wallet_used,
      payvia: "wallet",
      time: `${dateTime}`,
      comment: `Paid From Wallet For Order ${this.props.OrderId}`,
      deducted_bookcoins: 0,
      added_bookcoins: 0,
      added_by: `${this.props.UserEmail}`,
      order_id: this.props.OrderId,
      deducted_cashback: 0,
      added_cashback: 0,
    };

    this.props
      .walletOrder({ body: cashbackBody, token })
      .then(res => {
        let BookCoinsBody = {
          user_id: `${this.props.userDetails.id}`,
          user_email: `${this.props.UserEmail}`,
          transaction_id: `PaidBookCoins${Math.round(
            prepaidOrderDetails.data.bookcoins_used
          )}_${this.props.OrderId}`,
          deposit: 0,
          withdrawl: 0,
          payvia: "BookCoins",
          time: `${dateTime}`,
          comment: `Paid From BookCoins For Order ${this.props.OrderId}`,
          deducted_bookcoins: prepaidOrderDetails.data.bookcoins_used,
          added_bookcoins: 0,
          added_by: `${this.props.UserEmail}`,
          order_id: this.props.OrderId,
          deducted_cashback: 0,
          added_cashback: 0,
        };

        const SendData = {
          OrderId: this.props.OrderId,
          payment_url: "prepaid",
          book_id: prepaidOrderDetails.data.book_id,
          book_inv_id: prepaidOrderDetails.data.book_inv_id,
          rack_no: prepaidOrderDetails.data.rack_no,
          qty: prepaidOrderDetails.data.qty,
          payusing: prepaidOrderDetails.data.payusing,
          payment_id: this.props.OrderId,
        };

        if (prepaidOrderDetails.data.wallet_used) {
          this.props
            .walletOrder({
              body: walletBody,
              token,
            })
            .then(res => {
              if (this.state.applyBookcoinsSelected) {
                this.props
                  .walletOrder({
                    body: BookCoinsBody,
                    token,
                  })
                  .then(res => {
                    this.RedirectToThankyou();
                  })
                  .catch(err => {
                    this.triggerErrorMsg();
                  });
              } else {
                // For Updating OrderDetail

                this.RedirectToThankyou();
              }
            })
            .catch(err => {
              this.triggerErrorMsg();
            });
        } else {
          if (this.state.applyBookcoinsSelected) {
            this.props
              .walletOrder({
                body: BookCoinsBody,
                token,
              })
              .then(res => {
                this.RedirectToThankyou();
              })
              .catch(err => {
                this.triggerErrorMsg();
              });
          } else {
            this.RedirectToThankyou();
          }
        }
      })
      .catch(err => {
        let Err_msg = "Sorry Your Order Was Not Placed ";
        this.setState({
          OrderErrMsg: Err_msg,
          ShowOrderCreationErr: true,
          confirmOrder: false,
          generatingOrderId: false,
        });
      });
  };
  okOfferbookHandeler = e => {
    e.preventDefault();
    localStorage.setItem("offerbook", true);
    this.setState({ openOfferBookDialog: false });
   window.location.replace(`/checkout`);
  };

  RedirectToThankyou = () => {
    // if (this.state.GotOThankYou) {
    localStorage.setItem("UserOrderId", this.props.OrderId);
    let order_details = {
      order: this.props.cartPriceDetails,
      user_id: this.props.userDetails.id,
      phone_no: this.props.SelectedAddress.phone_no,
      order_id: this.props.OrderId,
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
      orderId: this.props.OrderId,
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

      email: `${this.props.userDetails.email}`,
    };

    try {
      localStorage.setItem("order_details", JSON.stringify(order_details));
    } catch (error) {
      // console.log({ error });
    }
    window.location.replace("view-cart/thank-you");
  };

  triggerErrorMsg = () => {
    let Err_msg = "Sorry Your Order Was Not Placed ";
    this.setState({
      OrderErrMsg: Err_msg,
      ShowOrderCreationErr: true,
      confirmOrder: false,
      generatingOrderId: false,
    });
  };

  handleDialogClose = () => {
    if (!this.state.generatingOrderId) {
      this.setState({ confirmOrder: false, generatingOrderId: false });
    }
  };

  handleChangepaytype = (e, paytypevalue) => {
    // alert(paytypevalue)
    if (!this.state.generatingOrderId) {
      this.setState({ paytype: paytypevalue });
      if (paytypevalue === "cod") {
        this.setState({
          WalletSelected: false,
          Paypalbtn: "NoproceedToPayBtn",
          coupon: "",
        });
      } else {
        if (this.state.WalletSelectedInitaly) {
          this.setState({ WalletSelected: true });
        }
        this.setState({ Paypalbtn: "proceedToPayBtn" });
      }

      this.calculateCartDeatils(paytypevalue);
      this.props.resetCoupon();
      this.setState({ reduceAmtUsingCoupon: 0 });
    }
  };

  calculateCartDeatils = paymentType => {
    if (!paymentType) {
      paymentType = this.state.paytype;
    }
    let cartBooks = this.props.cartDetails;
    // paymentType = this.state.paytype
    let booksAndDeliveryPrice = 0;
    let deductWalletAmt = 0;
    let ShowpepaidBookCoinsCanBeUsed = 0;
    let finalPay = 0;
    let netPayAmt = 0;

    const { all_books_price, oldBookPrice, newBookPrice, newBookDeliveryCost } =
      this.fetchcalculatedAllBookPrice();

    booksAndDeliveryPrice = all_books_price + newBookDeliveryCost;

    if (paymentType != "cod") {
      if (
        this.state.reduceAmtUsingCoupon &&
        booksAndDeliveryPrice > this.props.couponResult.amount_upto
      ) {
        booksAndDeliveryPrice =
          all_books_price - this.state.reduceAmtUsingCoupon;
      }
    }

    if (paymentType == "cod") {
      if (booksAndDeliveryPrice > this.state.min_cod_order_value) {
        booksAndDeliveryPrice = all_books_price + this.state.cod_charge;
      } else {
        booksAndDeliveryPrice = this.state.min_cod_order_value;
      }
      deductWalletAmt = 0;
    } else {
      if (all_books_price < this.state.min_prepaid_order_value) {
        booksAndDeliveryPrice = this.state.min_prepaid_order_value;
      }

      if (this.state.WalletSelected) {
        deductWalletAmt = this.fetchDeductedWalletAmt(booksAndDeliveryPrice);
      }

      if (this.state.applyBookcoinsSelected) {
        //cashback/mypustakbookcoins is applid above the min prepaid value
        if (booksAndDeliveryPrice > this.state.min_prepaid_order_value) {
          ShowpepaidBookCoinsCanBeUsed = this.calculateBookCoinsUsed(
            booksAndDeliveryPrice,
            newBookPrice,
            oldBookPrice
          );
        }
      }

      if (this.state.WalletSelected && this.state.applyBookcoinsSelected) {
        if (booksAndDeliveryPrice > this.state.min_prepaid_order_value) {
          ShowpepaidBookCoinsCanBeUsed = this.calculateBookCoinsUsed(
            booksAndDeliveryPrice,
            newBookPrice,
            oldBookPrice
          );
          // console.log({ ShowpepaidBookCoinsCanBeUsed });
          let price_after_book_coin =
            booksAndDeliveryPrice - ShowpepaidBookCoinsCanBeUsed;
          deductWalletAmt = this.fetchDeductedWalletAmt(price_after_book_coin);
        } else {
          deductWalletAmt = this.fetchDeductedWalletAmt(booksAndDeliveryPrice);
        }
      }
    }

    if (deductWalletAmt) {
      let wallet = "wallet";
      this.setState({ other_payMethod: wallet });
    }

    if (ShowpepaidBookCoinsCanBeUsed) {
      let bookCoins = "Book Coins";
      this.setState({ other_payMethod: bookCoins });
    }

    if (deductWalletAmt && ShowpepaidBookCoinsCanBeUsed) {
      let payUsing = "wallet & BookCoins";
      this.setState({ other_payMethod: payUsing });
    }

    if (paymentType != "cod") {
    } else {
      if (booksAndDeliveryPrice < this.state.min_cod_order_value) {
        netPayAmt = this.state.min_cod_order_value;
      }
    }
    finalPay =
      booksAndDeliveryPrice -
      (Number(ShowpepaidBookCoinsCanBeUsed) + Number(deductWalletAmt));
    this.setState({ UserAmount: finalPay, showUsedWallet: deductWalletAmt });

    // all_books_price = all_books_price + book.bookShippingCost

    return { UserAmount: finalPay, showUsedWallet: deductWalletAmt };
  };

  calculateBookCoinsUsed = (all_books_price, newBookPrice, oldBookPrice) => {
    // console.log('In calculateBookCoinsUsed', all_books_price, newBookPrice, oldBookPrice);

    let useBookCoins = 0;
    let bookCoinsUserHave = this.props.bookcoins;
    let bookCoinsCanBeUsed = 0;
    if (!bookCoinsUserHave || !this.state.applyBookcoinsSelected) {
      // console.log('calculateBookCoinsUsed return 1');
      return 0;
    }
    if (newBookPrice) {
      if (all_books_price > this.state.min_prepaid_order_value && oldBookPrice) {
        if (newBookPrice > this.state.min_prepaid_order_value) {
          bookCoinsCanBeUsed = oldBookPrice;
          // console.log('calculateBookCoinsUsed new 1');
        } else {
          bookCoinsCanBeUsed =
            oldBookPrice - (this.state.min_prepaid_order_value - newBookPrice);
          // console.log('calculateBookCoinsUsed new 2');
        }
      } else {
        // console.log(' calculateBookCoinsUsed price');
      }
    } else {
      // console.log('Old book calculateBookCoinsUsed ');

      if (oldBookPrice > this.state.min_prepaid_order_value) {
        bookCoinsCanBeUsed = oldBookPrice - this.state.min_prepaid_order_value;
        // console.log('calculateBookCoinsUsed old 1');
        // return useBookCoins
      }
    }
    if (bookCoinsUserHave >= bookCoinsCanBeUsed) {
      useBookCoins = bookCoinsCanBeUsed;
    } else {
      useBookCoins = bookCoinsUserHave;
    }

    // console.log('calculateBookCoinsUsed ', useBookCoins, bookCoinsCanBeUsed, oldBookPrice);
    if (useBookCoins < 1) {
      this.setState({ applyBookcoinsSelected: false });
    }
    return useBookCoins;
  };

  fetchcalculatedAllBookPrice = () => {
    let cartBooks = this.props.cartDetails;
    let newBookPrice = 0,
      total_new_book_wt = 0,
      oldBookPrice = 0,
      vendor_delivery_cost = 0,
      noteBookPrice = 0,
      offer_book_cost = 0;
    // const all_books_price
    for (let index in cartBooks) {
      // console.log(cartBooks[index].bookInvId, "tttt");
      if (cartBooks[index].bookInvId.toString().indexOf("KOL")> -1) {
        noteBookPrice = noteBookPrice + cartBooks[index].bookShippingCost;
      }
      if (cartBooks[index].bookInvId.toString().indexOf("NB") == -1 && cartBooks[index].bookInvId.toString().indexOf("KOL") == -1) {
        oldBookPrice = oldBookPrice + cartBooks[index].bookShippingCost;
      }
      if (cartBooks[index].bookInvId.toString().indexOf("NB") > -1) {
        // New book
        // alert("hh");
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
    if (this.state.getItChecked) {
      if (this.props.offerBook) {
        offer_book_cost = Math.round(
          parseInt(this.props.offerBook.shipping_handling_charge) -
          parseInt(this.props.offerBook.shipping_handling_charge) *
          (parseInt(this.props.offerBook.offer_discount) / 100)
        );
      }
    }
    if (isNaN(offer_book_cost)) {
      offer_book_cost = 0;
    }
    const all_books_price = oldBookPrice + newBookPrice + offer_book_cost + noteBookPrice;
    // console.log({total_new_book_wt});

    const newBookDeliveryCost = this.getPriceAsPerWt(
      total_new_book_wt,
      vendor_delivery_cost
    );

    const mypustak_delivery_cost = this.getPriceAsPerWt(total_new_book_wt, 0);
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

  getPriceAsPerWt = (calculated_new_book_wt_kg, vendor_delivery_cost) => {
    let TotalDeliveryCost = 0;
    TotalDeliveryCost = TotalDeliveryCost + vendor_delivery_cost;
    if (calculated_new_book_wt_kg || vendor_delivery_cost) {
      if (0 < calculated_new_book_wt_kg && calculated_new_book_wt_kg <= 0.5) {
        TotalDeliveryCost = TotalDeliveryCost + 40;
        // console.log('calculated_new_book_wt_kg', 40);
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
        TotalDeliveryCost = TotalDeliveryCost + 120;
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

  fetchDeductedWalletAmt = booksPrice => {
    if (!booksPrice) return 0;
    return this.props.walletbalance <= booksPrice
      ? this.props.walletbalance
      : booksPrice;
  };

  renderAmtUsed = () => {
    // let cartBooks = this.props.cartDetails;
    let paymentType = this.state.paytype;
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
    } = this.fetchcalculatedAllBookPrice();
    booksAndDeliveryPrice = all_books_price;

    const total_order_value = newBookDeliveryCost+all_books_price
    let min_order_charge_apply =  this.state.min_prepaid_order_value - total_order_value
  
    if(min_order_charge_apply <0){
      min_order_charge_apply = 0
    }
    if (paymentType == "cod") {
      // booksAndDeliveryPrice =
      //   all_books_price + this.state.cod_charge + newBookDeliveryCost;
       booksAndDeliveryPrice =
       all_books_price + cod_charge_api + newBookDeliveryCost+min_order_charge_apply;
      deductWalletAmt = 0;
      netPayAmt = booksAndDeliveryPrice;
      codCharge = this.state.cod_charge;
      actual_book_charges = booksAndDeliveryPrice;
    } else {
      booksAndDeliveryPrice = booksAndDeliveryPrice + newBookDeliveryCost;
      if (all_books_price < this.state.min_prepaid_order_value) {
        booksAndDeliveryPrice = all_books_price  + newBookDeliveryCost+min_order_charge_apply;
      }
      actual_book_charges = booksAndDeliveryPrice;
      console.log(booksAndDeliveryPrice , "booksAndDeliveryPrice 3139")

      if (this.props.cashback) {
        if (this.props.cashback > booksAndDeliveryPrice) {
          cashback_amt_used = booksAndDeliveryPrice;

          booksAndDeliveryPrice = 0;
        } else {
          cashback_amt_used = this.props.cashback;

          booksAndDeliveryPrice = booksAndDeliveryPrice - this.props.cashback;
        }
      }

      if (
        this.state.reduceAmtUsingCoupon &&
        booksAndDeliveryPrice > this.props.couponResult.amount_upto
      ) {
        booksAndDeliveryPrice =
          booksAndDeliveryPrice - Number(this.state.reduceAmtUsingCoupon);
      }

      if (this.state.WalletSelected) {
        deductWalletAmt = this.fetchDeductedWalletAmt(booksAndDeliveryPrice);
      }
      if (this.state.applyBookcoinsSelected) {
        if (booksAndDeliveryPrice > this.state.min_prepaid_order_value) {
          ShowpepaidBookCoinsCanBeUsed = this.calculateBookCoinsUsed(
            booksAndDeliveryPrice,
            newBookPrice,
            oldBookPrice,
            noteBookPrice
          );
          netPayAmt =
            booksAndDeliveryPrice - Number(ShowpepaidBookCoinsCanBeUsed);
      console.log({netPayAmt},'renderAmtUsed_tess',booksAndDeliveryPrice,Number(ShowpepaidBookCoinsCanBeUsed) , Number(deductWalletAmt));
        
          }

      }

      if (this.state.WalletSelected && this.state.applyBookcoinsSelected) {
        if (booksAndDeliveryPrice > this.state.min_prepaid_order_value) {
          ShowpepaidBookCoinsCanBeUsed = this.calculateBookCoinsUsed(
            booksAndDeliveryPrice,
            newBookPrice,
            oldBookPrice,
            noteBookPrice,
            noteBookPrice,
          );
          // console.log({ ShowpepaidBookCoinsCanBeUsed });
          let price_after_book_coin =
            booksAndDeliveryPrice - ShowpepaidBookCoinsCanBeUsed;
          deductWalletAmt = this.fetchDeductedWalletAmt(price_after_book_coin);
        } else {
          deductWalletAmt = this.fetchDeductedWalletAmt(booksAndDeliveryPrice);
        }
      }
      netPayAmt =
        booksAndDeliveryPrice -
        (Number(ShowpepaidBookCoinsCanBeUsed) + Number(deductWalletAmt));
      // console.log({netPayAmt},'renderAmtUsed_test',booksAndDeliveryPrice,Number(ShowpepaidBookCoinsCanBeUsed) , Number(deductWalletAmt));
    }
    // booksAndDeliveryPrice = booksAndDeliveryPrice + newBookDeliveryCost
    total_amt = Math.round(booksAndDeliveryPrice);
    if (paymentType != "cod") {
      // }
    } else {
      if (booksAndDeliveryPrice < this.state.min_cod_order_value) {
        netPayAmt = this.state.min_cod_order_value;
        // console.log('renderAmtUsed', 'Min cod');
      }
    }
    if (this.state.applyBookcoinsSelected && ShowpepaidBookCoinsCanBeUsed < 1) {
      this.setState({ applyBookcoinsSelected: false });
    }
    total_customer_value = total_amt -this.props.cashback
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
      total_order_value:total_customer_value
    };
  };

  WalletOnChange = async e => {
    if (!this.state.generatingOrderId) {
      if (Number(this.props.walletbalance) > 0) {
        if (this.state.paytype === "cod") {
          this.setState({ WalletSelected: false });
        } else {
          // console.log(e.target.checked);
          this.setState({ WalletSelected: !this.state.WalletSelected });
        }
      } else {
        this.setState({ WalletSelected: false });
      }
      this.calculateCartDeatils(this.state.paytype);
    }
  };

  handlepayment3rd_partySelect = e => {
    // alert(e.target.value)
    if (!this.state.generatingOrderId) {
      if (e.target.value == "Razorpay") {
        this.setState({ prepaid3rd_partySelected: "Razorpay" });
      } else if (e.target.value == "Cashfree") {
        this.setState({ prepaid3rd_partySelected: "Cashfree" });
      }
    }
  };

  handleOnclickCouponbtn = () => {
    if (this.props.appliedcoupon) return;
    let couponAmount, redeemPercent, redeemAmount;
    const { total_amt } = this.renderAmtUsed();
    // console.log(this.props.couponResult, 'cc', total_amt);

    if (this.props.couponResult.min_value > Math.round(total_amt)) {
      this.setState({ open: true });
      // console.log('cc', this.props.couponResult.min_value);
    } else {
      if (this.props.couponResult.type == 2) {
        //  alert("hii")
        couponAmount = this.props.couponResult.type_value;
        redeemAmount = Math.round((Math.round(total_amt) * couponAmount) / 100);

        if (redeemAmount > this.props.couponResult.amount_upto) {
          redeemAmount = Math.round(this.props.couponResult.amount_upto);
        }
        if (this.props.couponResult.coupon_type == 2) {
          // coupon_type == 1 handeled below
          this.setState({ reduceAmtUsingCoupon: redeemAmount });
        }
      } else {
        redeemAmount = this.props.couponResult.type_value;
        //  redeemAmount  = Math.round(ShipCost) - couponAmount
        // console.log(Math.round(redeemAmount), 'cc');

        if (this.props.couponResult.coupon_type == 2) {
          // coupon_type == 1 handeled below
          this.setState({ reduceAmtUsingCoupon: redeemAmount });
        }
      }
      // For coupon_type == 1
      this.props.redeemCouponAction({ couponamount: Math.round(redeemAmount) });
    }
  };

  hnadleOnClickPayemnt = () => {
    if (this.props.SelectedAddress.length == 0) {
      this.OpenAddressSide();
      return;
    }

    if (this.props.OutOfStockBooks.length) {
      // alert('out stock')
      this.setState({ openRemoveOutStockDialog: true });
      return;
    }
    if (this.state.WalletSelected) {
      this.setState({ WalletSelectedInitaly: true });
    } else {
      this.setState({ WalletSelectedInitaly: false });
    }
    this.setState({ payment_detailDiv: false });
  };

  RenderCouponResponse = () => {
    if (this.state.coupon.length <= 5 && this.state.coupon) {
      return "invalid coupon";
    } else if (this.props.couponResponse) {
      return this.props.couponResponse;
    } else {
      return null;
    }
  };

  closeOutstockDialog = () => {
    this.setState({ openRemoveOutStockDialog: false });
  };

  removeAllOutstockBooks = async () => {
    const { cartDetails, OutOfStockBooks } = this.props;
    const data = { is_deleted: "Y" };

    let response = await Promise.all(
      cartDetails.map(cart => {
        if (OutOfStockBooks.includes(cart.bookInvId)) {
          this.setState({ del_cart_loader: true });
          let res = this.props.RemoveCart(cart.Cart_id, cart.bookInvId, data);
          if (res) {
            this.setState({ del_cart_loader: false });
          } else {
            this.setState({ del_cart_err: true, del_cart_loader: false });
          }
          return res;
        }
      })
    );

    if (response) {
      // alert('deleted')
      this.props.ResetOutStockList();

      this.closeOutstockDialog();
      let user = JSON.parse(localStorage.getItem("user_info"));

      this.props.CartSession().then(res => {
        let user = JSON.parse(localStorage.getItem("user_info"));

        this.props.offeredbook({ id: user.id });
        // alert(this.props.ItemsInCart);
        if (this.props.ItemsInCart != 0) {
         window.location.replace("/checkout");
        }
      });
    } else {
      // console.log();
      // show message on cart removal error
    }
  };

  isMaskPresentMask = () => {
    let MaskInvID = "NB1441502";
    let count = 0,
      mask = 0,
      book_and_mask = 0,
      book = 0;
    this.props.cartDetails.map(book => {
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

  handlepayment3rd_partySelectDiv = party_type => {
    if (!this.state.generatingOrderId) {
      this.setState({ prepaid3rd_partySelected: party_type });
    }
  };

  RemoveBookCoinError = () => {
    // alert("true");
    this.setState(prevState => {
      return { coinPopup: false, applyBookcoinsSelected: false };
    });
  };

  ConfirmRemoveFromCart = (bookInv, CartId) => {
    this.setState({
      openDelelteBookDialog: true,
      deleteBookinv: bookInv,
      deleteCartid: CartId,
    });
  };

  ConfirmRemoveFromSaveLater = (bookInv, CartId) => {
    this.setState({
      deleteBookinv: bookInv,
      deleteCartid: CartId,
      openDelelteSaveLaterDialog: true,
    });
  };

  closeDelelteBookDialog = () => {
    if (!this.state.del_cart_loader) {
      this.setState({
        openDelelteBookDialog: false,
        openDelelteSaveLaterDialog: false,
      });
    }
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

  MIN_ORDER_MSG_DIV = () => {
    // return <p> ok ok ok</p>
    const paymentType = this.state.paytype;
    let minorderValue = 0;
    if (paymentType == "cod") {
      if (
        this.fetchcalculatedAllBookPrice().all_books_price < this.state.min_cod_order_value
      ) {
        minorderValue = this.state.min_cod_order_value;
      }
    } else {
      if (
        this.fetchcalculatedAllBookPrice().all_books_price <
        this.state.min_prepaid_order_value
      ) {
        minorderValue = this.state.min_prepaid_order_value;
      }
    }

    let min_order_charge = minorderValue - this.fetchcalculatedAllBookPrice().all_books_price -this.fetchcalculatedAllBookPrice().newBookDeliveryCost
    if (paymentType == "cod"){
      if(min_order_charge >0){
        min_order_charge = min_order_charge -50
      }
    }
    if(min_order_charge <0){
      min_order_charge = 0
    }
    // setminordervalue(minorderValue);
    // setmin_order_charge(min_order_charge)
    // console.log(min_order_charge,this.fetchcalculatedAllBookPrice().all_books_price , "min_order_charge");
    this.setState({
      minordervalue: minorderValue,
      min_order_charge:5
    });
  };
  cartLengthHand = (data, token) => {
    // alert(data.items.length)
    if (data.cart_length) {
      this.setState({
        initialLoader: false,
        SkeletonLoader: true,
        cartLength: data.items,
      });
      this.props
        .CartSession(token)
        .then(res => {
          this.setState({
            initialLoader: false,
            serverError: false,
            SkeletonLoader: false,
          });
        })
        .catch(err => {
          this.setState({
            initialLoader: false,
            serverError: true,
            SkeletonLoader: false,
          });
        });
      this.props.SaveLater(token);
    } else {
      this.setState({ initialLoader: false, SkeletonLoader: false });
      this.props.SaveLater(token);
    }
  };
  RedirectToNewTab = (slug, book_id,book_inv) => {
    if(book_inv.toString()
    .indexOf("KOL") > -1){
      let url = `/mypustak-notebook?${book_id}`;
      window.open(url)
    }
    else{
      let Slug = slug.replace("/", "");
      let url = `/product/${Slug}-?${book_id}`;
      window.open(url)
    }
  };
  saveLaterhand = async cart => {
    this.setState({
      saveLaterLoader: true,
      btnClickedId: cart.bookId,
      offerbookloader: true,
    });
    const data = {
      save_later: "1",
    };
    let res = await this.props.RemoveCart(cart.Cart_id, cart.bookInvId, data);
    if (res) {
      this.props.enqueueSnackbar(`${cart.bookName} has been Saved For Later.`, {
        variant: "success",
      });
      this.props
        .CartSession()
        .then(res => {
          this.setState({ saveLaterLoader: false });
        })
        .catch(err => {
          this.setState({ saveLaterLoader: false });
        });
        this.props.SaveLater();
        this.props.check_book_incart()
      let user = JSON.parse(localStorage.getItem("user_info"));
      this.props.offeredbook({ id: user.id }).then(res => {
        this.setState({
          offerbookloader: false,
        });
      });
      window.scrollTo(0, 0);
    }
  };
  movetoCarthand = async cart => {
    this.setState({
      moveToCartLoader: true,
      btnClickedId: cart.bookId,
      offerbookloader: true,
    });
    const data = {
      save_later: "0",
    };
    let res = await this.props.RemoveCart(cart.Cart_id, cart.bookInvId, data);
    if (res) {
      this.props.enqueueSnackbar("Moved to Cart", { variant: "success" });
      // this.setState({
      //   SkeletonLoader:true,
      // })
      this.props.CartSession();

      this.props
        .SaveLater()
        .then(res => {
          this.setState({ moveToCartLoader: false, btnClickedId: "" });
        })
        .catch(err => {
          this.setState({ moveToCartLoader: false, btnClickedId: "" });
        });
      this.props.check_book_incart()
      let user = JSON.parse(localStorage.getItem("user_info"));

      this.props.offeredbook({ id: user.id }).then(res => {
        this.setState({
          offerbookloader: false,
        });
      });
      window.scrollTo(0, 0);
    }
  };
  render() {
    let Screenwidth = screen.width;
    let groupedArrayTotalAmount = 0;
    console.log(this.props.cartDetails,"cartDetailscartDetailscartDetails");
    let toatlarray = this.groupBy(this.props.cartDetails, "bookPrice");
    let groupedArray = this.groupBy(this.props.cartDetails, "vendorid");
    let groupedArray2 = Object.entries(groupedArray);
    let sum = 0;
    Object.entries(toatlarray).map(total => {
      sum = sum + parseInt(total[0]);
    });
    console.log(this.props.cartDetails, "3535 render cartDetails");
    const {
      classes,
      cartDetails,
      bookcoins,
      SelectedAddress,
      OutOfStockBooks,
    } = this.props;
    const {
      offerLoading,
      OfferCartId,
      placingOrder,
      confirmOrder,
      UserAmount,
      generatingOrderId,
      prepaid3rd_partySelected,
      other_payMethod,
      paytype,
      WaitPlacingOrder,
      OrderErrMsg,
      ShowOrderCreationErr,
      applycouponLoader,
      openRemoveOutStockDialog,
      updadtingQty,
      removingCartId,
      reduceAmtUsingCoupon,
      openDelelteBookDialog,
      openDelelteSaveLaterDialog,
      deleteBookinv,
      deleteCartid,
      del_cart_loader,
    } = this.state;

    if (this.state.GotOThankYou) {
      localStorage.setItem("UserOrderId", this.props.OrderId);

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
        AllbookName.push(`${book.bookName}`);
        AllbookShippingCost.push(book.bookShippingCost);
        AllrackNo.push(book.bookRackNo);
        AllThumb.push(book.bookThumb);
        booksData.push({
          src: `https://d1f2zer3rm8sjv.cloudfront.net/${book.bookThumb}`,
          book_name: `${book.bookName}`,
          book_qty: 1,
          book_price: book.bookShippingCost,
        });
      });
      const Data = {
        orderId: this.props.OrderId,
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

        email: `${this.props.userDetails.email}`,
      };
      let order_details = {
        order: this.props.cartPriceDetails,
        user_id: this.props.userDetails.id,
        phone_no: this.props.SelectedAddress.phone_no,
        order_id: this.props.OrderId,
      };
      try {
        localStorage.setItem("order_details", JSON.stringify(order_details));
      } catch (error) {
        console.log({ error });
      }
      // Router.push('/cartThanks','view-cart/thank-you', { shallow: true })
    }

    const ResizeTitle = title => {
      if (title.length > 60) {
        return title.substr(0, 60) + "...";
      } else {
        return title;
      }
    };

    const Vendor_wise_Amount = cart => {
      console.log(cart[1], "");
      let key_v = 0;
      cart[1].map(gr => {
        if (cart[0] == 0) {
          key_v = key_v + gr.bookShippingCost;
        } else {
          console.log(gr.bookPrice);
          // key_v = key_v + gr.bookPrice;
          key_v = key_v + gr.bookShippingCost;
        }
      });
      return key_v;
    };
    const Vendor_wise_delivery_cost = cart => {
      console.log(cart[1], "");
      let key_v = 0;
      cart[1].map(gr => {
        console.log(gr.delivery_cost);
        key_v = key_v + gr.delivery_cost;
      });
      return key_v;
    };

    const TotalPrice = price => {
      groupedArrayTotalAmount: groupedArrayTotalAmount + price;
      return Math.round(price);
    };

    return (
      // End Of Main div
      <React.Fragment>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, shrink-to-fit=no'
          />
          <title>
            {" "}
            Books Online India, Buy Online Book In India –mypustak.com
          </title>
          <meta
            name='og:title'
            property='og:title'
            content='Books Online India, Buy Online Book In India –mypustak.com'
          />
          <meta
            name='og:description'
            property='og:description'
            content='  Books are the hub of knowledge. Get the books online in India with us. We aimed to aid (help) the needy one with education and knowledge.'
          />
          <meta
            name='og:image'
            property='og:image'
            content='https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png'
          />
          <script
            type='text/javascript'
            src='https://checkout.razorpay.com/v1/checkout.js'
          />

          <script
            src='https://www.cashfree.com/assets/cashfree.sdk.v1.2.js'
            type='text/javascript'
          />
        </Head>
        {
          // Checking Initial Loader
          this.state.initialLoader ? (
            <div style={{ margin: "12rem 0rem" }}>
              <CustomLoaderBorder size='60px' />
              <MediaQuery maxWidth={567}>
                <div>
                  <div className=''>
                    <div
                      className=''
                      style={{
                        padding: "0rem 1rem",
                        background: "whitesmoke",
                        position: "fixed",
                        bottom: "0rem",
                        left: "0",
                        zIndex: "1050",
                        width: "100vw",
                        height: "5rem",
                      }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}></div>
                    </div>
                  </div>
                </div>
              </MediaQuery>
            </div>
          ) : // Checking skeleton Loader
          // true ? (
          this.state.SkeletonLoader ? (
            <div className={`${styles.skeletonContainer}`}>
              <MediaQuery minWidth={568}>
              <div className=' ' style={{ display: "flex" }}>
                <div
                  className={`${styles.cartLeft}col-12 col-sm-8 col-xl-8 col-lg-8 px-0  `}
                  style={{ marginRight: "1rem" }}>
                  <div>
                    {this.props.offerBook.length !== 0 ? (
                      <div
                        className={`${styles.offerbook}`}
                        style={{ maxHeight: "10rem" }}>
                        <div id='bookimg' className={`${styles.bookimg}  `} >
                          <Skeleton
                            variant='rectangular'
                            animation='wave'
                            style={{ width: "5rem", height: "5.5rem" }}
                          />
                        </div>
                        <div
                          id='Btitle'
                          style={{ width: "100%", padding: "0.2rem" }}>
                          <div
                            id='offer'
                            className={`${styles.offer} `}
                          >
                            {" "}
                            <Skeleton
                              variant='rectangular'
                              animation='wave'
                              style={{ width: "50%" }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}>
                            <div >
                                <Skeleton
                                  variant='rectangular'
                                  animation='wave'
                                  style={{
                                    width: "60%",
                                    marginTop: "0.5rem",
                                  }}
                                />
                              <Skeleton
                                variant='rectangular'
                                animation='wave'
                                style={{ width: "40%", marginTop: "0.5rem" }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginTop: "0.3rem",
                                  justifyContent:"space-between"
                                  
                                }}>
                                  <Skeleton
                                    variant='rectangular'
                                    animation='wave'
                                    style={{ width: "10rem" }}
                                  />
                              </div>
                              <br />
              
                            </div>
                          </div>
                          <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center"}}>  
                               <p> <Skeleton
                                    variant='rectangular'
                                    animation='wave'
                                    style={{
                                      width:"8rem",
                                      height: "2rem",
                                      marginTop:"-1.3rem"
                                    }}
                                  /></p>
                                </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div >
                    <div className='bg-heading mb-3 p-2  text-white d-flex justify-content-between'>
                      <div className='d-flex  justify-content-center align-items-center'>
                        <span className='px-3'>My Cart</span>
                      </div>
                    </div>
                    <div className={` ${styles.cartDetails}  `}>
                      <SkeletonCart />
                      <SkeletonCart />
                      <SkeletonCart />
                    </div>
                  </div>
                </div>

                {/* End Of Left Part */}
                <div className={`${styles.priceDetails} cart_right col-12 col-sm-4 col-lg-4 col-xl-4  `}>
                  <div className={`${styles.cart_right_inner} bg-white `}>
                    <div
                      className=' shadow mb-4 p-2 p-sm-4 '
                      style={{ minHeight: "14rem" }}>
                      <table className='table table-borderless  '>
                        <Skeleton animation='wave' style={{}} />
                        <Skeleton animation='wave' />
                        <Skeleton animation='wave' />
                        <Skeleton animation='wave' style={{ height: "3rem" }} />
                      </table>
                    </div>
                    <center>
                    <Skeleton
                      animation='wave'
                      style={{
                        height: "6rem",
                        width: "100%",
                        marginTop: "-1.5rem",
                      }}
                    />
                  </center>
                  </div>
                
                </div>
              </div>
              </MediaQuery>
              <MediaQuery maxWidth={567}>
                <div className='col-12 col-sm-12 col-lg-12 px-0  '>
                  {/* ------------------------------offer bookfor mobile -------------------------------- */}
                  {this.props.offerBook.length !== 0 ? (
                    <div
                      className={`${styles.offerbook}`}
                      style={{
                        marginTop: "1rem",
                        paddingTop: "0.5rem",
                      }}>
                      <div id='bookimg' className= {`${styles.bookimg} col-2`}>
                        <Skeleton
                          animation={"wave"}
                          variant='rectangular'
                          style={{ height: "6rem", width: "100%" }}
                        />
                      </div>
                      <div className='col-9'>
                        <div id='Btitle' style={{ marginLeft: "0.5rem" }}>
                          <div
                            id='offer'
                            className={`${styles.offer}`}
                            style={{
                              color: "green",
                              fontWeight: "bold",
                            }}>
                            <Skeleton
                              animation={"wave"}
                              variant='text'
                              style={{ height: "2rem", width: "80%" }}
                            />
                          </div>

                          {/* <a href ="https://www.mypustak.com/product/NARAYANA-JUNIOR-COLLEGES-JR-INTER-JEE-ADVANCED-CHEMISTRY-PACK-OF-4-BOOKS"> */}
                          <p id='offerText' className='mb-2'>
                            <span style={{ color: "#000" }}>
                              {" "}
                              <Skeleton
                                animation={"wave"}
                                variant='text'
                                style={{ width: "95%" }}
                              />
                            </span>
                            <span style={{ color: "#555" }}>
                              <Skeleton
                                animation={"wave"}
                                variant='text'
                                style={{ width: "30%" }}
                              />
                            </span>{" "}
                            <span style={{ color: "#555" }}>
                              <Skeleton
                                animation={"wave"}
                                variant='text'
                                style={{ width: "50%" }}
                              />
                            </span>
                          </p>
                          <p
                            style={{
                              paddingLeft: "40%",
                              color: " #000",
                              fontWeight: "bold",
                              marginBottom: "0.5rem",
                            }}>
                            <Skeleton
                              animation={"wave"}
                              variant='text'
                              style={{ height: "2rem", width: "5rem" }}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div>
                    {/* --------------End of mobile offer book------------- */}
                    <div
                      className='bg-heading p-2 shadow text-white d-flex justify-content-between'
                      style={{ border: "2px solid " }}>
                      <div className='d-flex justify-content-center align-items-center'>
                        <span className='px-3'>My Cart</span>
                      </div>
                    </div>

                    <div className={` ${styles.cartDetails}`}>
                      {[1, 2, 3].map(cartitem => {
                        return (
                          <div key={cartitem.cart_id}>
                            <div
                              className={` ${styles.cart_list_data}`}
                              id='cartBookdataD'>
                              <div
                                className='row '
                                style={{
                                  margin: "0",
                                  // marginRight: "0.2rem",

                                  padding: "0",
                                }}>
                                {false ? null : (
                                  <div
                                    style={{
                                      // border: "1px solid red",

                                      marginTop: "0.4rem",
                                      // width: "8.313rem",
                                      // height: "8.838rem",
                                    }}
                                    className={`${styles.imagediv} col-2 col-sm-2 col-lg-2`}>
                                    <Skeleton
                                      animation='wave'
                                      variant='rectangular'
                                      style={{
                                        height: "5rem",
                                        width: "4rem",
                                        marginLeft: "1rem",
                                        marginRight: "1rem",
                                      }}
                                    />
                                  </div>
                                )}

                                <div className='col-10 col-sm-10 col-lg-10 '>
                                  <Skeleton
                                    animation='wave'
                                    style={{
                                      width: "70%",
                                      height: "2.1rem",
                                      marginLeft: "2.5rem",
                                    }}
                                  />

                                  <p
                                    className='p'
                                    style={{
                                      fontSize: "0.9rem",
                                      marginBottom: "0.5rem",
                                      maxWidth: "50vw",
                                    }}>
                                    <Skeleton
                                      animation='wave'
                                      style={{ marginLeft: "2.5rem" }}
                                    />
                                    <Skeleton
                                      animation='wave'
                                      style={{
                                        marginTop: "-0.5rem",
                                        marginLeft: "2.5rem",
                                      }}
                                    />
                                  </p>
                                </div>
                                <div>
                                  <div
                                    style={{
                                      // display: "flex",
                                      alignItems: "center",
                                    }}
                                    id='Bookinfo2'>
                                    <div className='d-flex align-items-center'>
                                      <div className='d-lg-block mt-0 mr-2'>
                                        <Skeleton
                                          animation='wave'
                                          style={{
                                            width: "6rem",
                                            height: "3.5rem",
                                          }}
                                        />
                                      </div>
                                      <div className='d-lg-block mt-0'>
                                        <Skeleton
                                          animation='wave'
                                          style={{
                                            width: "6rem",
                                            height: "3.5rem",
                                            marginLeft: "1rem",
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        marginTop: "0.3rem",
                                      }}
                                      id='offerdiv'></div>
                                  </div>
                                  <div></div>
                                </div>
                              </div>
                              {/* end of leftdetail */}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    className='cart_right col-12 col-sm-12 col-lg-12 shadow'
                    style={{ padding: "0", margin: "0" }}>
                    <div
                      style={{
                        margin: "0",
                        padding: "0",
                        // marginBottom: "2rem",
                      }}>
                      <div className='bg-white m-2 pb-4'>
                        <table
                          className='table table-borderless '
                          id='paymentdiv'
                          ref={this.paymentdiv}>
                          <tbody
                            style={{
                              color: "#737373",
                              fontSize: "0.84rem",
                            }}>
                            <tr>
                              <td className='p-1 p-sm-auto'>
                                <Skeleton animation='wave' />
                              </td>
                              <td className='p-1 p-sm-auto'>
                                <span id='ShippingPricediv'>
                                  <span
                                    id='donbook'
                                    style={{ textAlign: "justify" }}>
                                    <Skeleton animation='wave' />
                                  </span>
                                </span>
                              </td>
                            </tr>

                            <tr style={{ fontSize: "0.97rem" }}>
                              <td className='text-success p-1 p-sm-auto'>
                                <Skeleton
                                  animation='wave'
                                  style={{ height: "2.5rem" }}
                                />
                              </td>
                              <td
                                className='p-1 p-sm-auto text-nowrap'
                                style={{}}>
                                <b text-success id='Totalpricediv'>
                                  <Skeleton
                                    animation='wave'
                                    style={{ height: "2.5rem", width: "50%" }}
                                  />
                                </b>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className=''>
                      <div
                        className='border shadow'
                        style={{
                          padding: "0rem 1rem",
                          background: "#fff",
                          position: "fixed",
                          bottom: "0rem",
                          left: "0",
                          zIndex: "1050",
                          width: "100vw",
                        }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}>
                          <Skeleton
                            style={{ height: "3.9rem", width: "6rem" }}
                          />
                          <Skeleton
                            style={{ height: "6rem", width: "15.7rem" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </MediaQuery>
            </div>
          ) : (
            <div style={{ marginBottom: "1rem" }}>
              {/* <MainHeader /> */}
              {this.props.userToken ? (
                this.props.ItemsInCart == 0 && this.props.SaveLaterData == 0 ? (
                  <p
                    className={`${styles.emptyCartDiv}`}>
                    <p>
                      <ShoppingCartIcon style={{ fontSize: "100px" }} />
                    </p>
                    Your cart is empty
                    <p>
                      <Link href='/' legacyBehavior>
                        <Link href='/' legacyBehavior>
                          <Button variant='contained' color='primary'>
                            Shop Now
                          </Button>
                        </Link>
                      </Link>
                    </p>
                  </p>
                ) : this.props.ItemsInCart == 0 &&
                  this.props.SaveLaterData != 0 ? (
                  <div>
                    <p
                      style={{
                        fontSize: "30px",
                        margin: "2%",
                        textAlign: "center",
                      }}>
                      <p>
                        <ShoppingCartIcon style={{ fontSize: "100px" }} />
                      </p>
                      Your cart is empty
                      <p>
                        <Link href='/' legacyBehavior>
                          <Link href='/' legacyBehavior>
                            <Button variant='contained' color='primary'>
                              Shop Now
                            </Button>
                          </Link>
                        </Link>
                      </p>
                    </p>
                    <div className='mx-0 mx-lg-3 '>
                      {this.props.SaveLaterData.length ? (
                        <div className='bg-heading p-2 shadow text-white d-flex justify-content-between'>
                          <div className='d-flex justify-content-center align-items-center'>
                            <span className='px-3'>
                              Save Later ({this.props.SaveLaterData.length})
                            </span>

                            {/* <Image src={assured} width={100} height={25} className="" alt='assured_img' /> */}
                          </div>
                          <div
                            className='text-center'
                            onClick={() => {
                              setShow(false);
                            }}>
                            {/* <KeyboardArrowDownIcon /> */}
                          </div>
                        </div>
                      ) : null}
                      {/* ================================Save Later Div ===================== */}
                      <MediaQuery minWidth={568}>
                        <div className={` ${styles.cartDetails}`}>
                          {this.props.SaveLaterData.length
                            ? this.props.SaveLaterData.map(cart => {
                                return (
                                  <div
                                    className='mx-0 px-4  py-3  mt-1 bg-white border border-gray '
                                    id='cartBookdataD'
                                    style={{ marginTop: "-18px" }}
                                    key={cart.bookInvId}>
                                    <div className='row '>
                                      {false ? null : (
                                        <div
                                          style={{
                                            marginTop: "0.4rem",
                                            width: "6.313rem",
                                            height: "5.838rem",
                                          }}
                                          className='col-2 col-sm-2 col-lg-2'>
                                          <img
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                            }}
                                            src={`https://d1f2zer3rm8sjv.cloudfront.net/${cart.bookThumb}`}
                                            id='cartbookimg'
                                            onError={e => {
                                              e.target.onerror = null;
                                              e.target.src =
                                                "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                                              // "https://d1f2zer3rm8sjv.cloudfront.net/medium/book_default.jpeg"
                                            }}
                                          />
                                        </div>
                                      )}
                                      <div className='col-10 col-sm-10 col-md-10 col-lg-10'>
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            justifyContent: "space-between",
                                          }}>
                                          <div>
                                            <div>
                                              <p
                                                className={`${styles.cartBookTitle}`}
                                                onClick={() => {
                                                  this.RedirectToNewTab(
                                                    cart.bookSlug,
                                                    cart.bookId,
                                                    cart.bookInvId
                                                  );
                                                }}
                                                style={{
                                              
                                                }}>
                                                {ResizeTitle(cart.bookName)}
                                              </p>
                                            </div>
                                            <div
                                              className='d-block p d-flex justify-content-between '
                                              style={{ fontSize: "0.8rem" }}>
                                              {cart.bookInvId
                                                .toString()
                                                .indexOf("NB") > -1 ? (
                                                <span id='cartBookShippingS'>
                                                  Price: &#8377;
                                                  {Math.round(
                                                    cart.bookShippingCost
                                                  )}
                                                </span>
                                              ) : (
                                                <div id='orgmrp'>
                                                  <p
                                                    style={{ margin: 0 }}
                                                    id='cartBookpriceS'>
                                                    MRP: &#8377;
                                                    <span
                                                      id='cartBookPrice'
                                                      style={
                                                        cart.bookInvId
                                                          .toString()
                                                          .indexOf("NB") > -1
                                                          ? null
                                                          : {
                                                              textDecoration:
                                                                "line-through",
                                                            }
                                                      }>
                                                      {TotalPrice(
                                                        cart.bookPrice
                                                      )}
                                                    </span>
                                                    {cart.bookInvId
                                                      .toString()
                                                      .indexOf("NB") >
                                                    -1 ? null : (
                                                      <span id='cartFree'>
                                                        (Free)
                                                      </span>
                                                    )}
                                                  </p>
                                                  {
                                                    cart.bookInvId
                                                    .toString()
                                                    .indexOf("KOL") > -1?(
                                                      <React.Fragment>
                                                      {cart.delivery_cost ? (
                                                        <div style={{display:"flex",flexDirection:"column"}}>
                                                          <span> Free Delivery</span>
                                                          <span>Quantity:{cart.bookQty}</span>
                                                        </div>
                                                      ) : null}
                                                    </React.Fragment>
                                                    ):
                                                    cart.bookInvId
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
                                                      <span id='cartBookShippingS'>
                                                        Shipping & Handling
                                                        charges &nbsp; &#8377;
                                                        {Math.round(
                                                          cart.bookShippingCost
                                                        )}
                                                      </span>
                                                      <br />
                                                      {/* <span id="CartchargeslineS">Charges</span> */}
                                                      <span id='cartBkShipChargeS'>
                                                        {/* &#8377;{Math.round(cart.bookShippingCost)} */}
                                                        {cart.bookCond
                                                          ? `Book Condition : ${cart.bookCond}`
                                                          : null}
                                                      </span>
                                                    </React.Fragment>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                            <div id='Bookinfo1'>
                                              {this.props.OutOfStockBooks.includes(
                                                cart.bookInvId
                                              ) ? (
                                                <p
                                                  className='p'
                                                  style={{
                                                    margin: 0,
                                                    fontSize: "0.8rem",
                                                  }}>
                                                  Book Is Out Of Stock,Please
                                                  Remove .
                                                </p>
                                              ) : Math.round(
                                                  cart.bookShippingCost
                                                ) == 0 ? (
                                                <p
                                                  className='p'
                                                  style={{ margin: 0 }}>
                                                  Book Is Out of Stock,Please
                                                  Remove .
                                                </p>
                                              ) : null}

                                              {cart.bookInvId
                                                .toString()
                                                .indexOf("NB") > -1 &&
                                              cart.offertype ? (
                                                <p
                                                  id='yousaved'
                                                  style={{
                                                    color: "green",
                                                    fontSize: "0.8rem",
                                                  }}>
                                                  {cart.offertype ==
                                                  "cashback" ? (
                                                    <React.Fragment>
                                                      You Earned &#8377;{" "}
                                                      {Math.round(
                                                        cart.bookPrice
                                                      ) -
                                                        this.CashbackPrice(
                                                          cart.bookPrice,
                                                          cart.cashback_per
                                                        )}
                                                      <span
                                                        style={{
                                                          color: "gray",
                                                          fontSize: "12px",
                                                          marginLeft: "5px",
                                                        }}>
                                                        (BookCoins of Worth{" "}
                                                        {cart.cashback_per}% of{" "}
                                                        {cart.bookPrice})
                                                      </span>
                                                    </React.Fragment>
                                                  ) : (
                                                    <React.Fragment>
                                                      You Saved &#8377;
                                                      {Math.round(
                                                        cart.bookPrice
                                                      ) -
                                                        this.DicountedPrice(
                                                          cart.bookPrice,
                                                          cart.discount_per
                                                        )}{" "}
                                                      (Flat {cart.discount_per}%
                                                      off)
                                                    </React.Fragment>
                                                  )}
                                                </p>
                                              ) : null}
                                            </div>
                                          </div>
                                          <Button

                                            variant='outlined'
                                            size='small'
                                            style={{
                                              textTransform: "capitalize",
                                              // position: "absolute",
                                              right: 0,
                                              color: "#2248AE",
                                            }}
                                            
                                            data-pid = {cart.bookId}
                                            onClick={() =>
                                              this.ConfirmRemoveFromCart(
                                                cart.bookInvId,
                                                cart.Cart_id
                                              )
                                            }>
                                            <DeleteIcon
                                              fontSize='small'
                                              style={{ color: "#2248AE" }}
                                            />
                                            Remove
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                    {/* end of leftdetail */}
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                      id='Bookinfo2'>
                                      <div
                                        style={{ marginRight: "0.5rem" }}
                                        className='d-flex align-items-center'>
                                        <div className='d-lg-block mt-2'>
                                          {this.state.moveToCartLoader &&
                                          this.state.btnClickedId ==
                                            cart.bookId ? (
                                            <Button
                                              variant='outlined'
                                              size='small'
                                              style={{
                                                minWidth: "6.4rem",
                                                color: "#2248AE",
                                                textTransform: "capitalize",
                                                marginRight: "0.5rem",
                                              }}
                                              className='mr-2 mb-2'>
                                              <CircularProgress size={20} />
                                            </Button>
                                          ) : (
                                            <Button
                                              variant='outlined'
                                              size='small'
                                              style={{
                                                minWidth: "6.4rem",
                                                color: "#2248AE",
                                                textTransform: "capitalize",
                                                marginRight: "0.5rem",
                                              }}
                                              className='mr-2 mb-2'
                                              data-pid = {cart.bookId}
                                              onClick={() => {
                                                this.movetoCarthand(cart);
                                              }}>
                                              Move to Cart
                                            </Button>
                                          )}
                                        </div>
                                        <div className='d-lg-block mt-2'>
                                          {cart.bookInvId
                                            .toString()
                                            .indexOf("NB") > -1 ? (
                                            <>
                                              {this.state
                                                .moveToWishlistLoader &&
                                              this.state.btnClickedId ==
                                                cart.bookId ? (
                                                <Button
                                                  variant='outlined'
                                                  size='small'
                                                  style={{
                                                    minWidth: "9.1rem",
                                                    color: "#2248AE",
                                                    textTransform: "capitalize",
                                                  }}
                                                  className='mr-2 mb-2'>
                                                  <CircularProgress size={20} />
                                                </Button>
                                              ) : (
                                                <Button
                                                  variant='outlined'
                                                  size='small'
                                                  style={{
                                                    minWidth: "9.1rem",
                                                    color: "#2248AE",
                                                    textTransform: "capitalize",
                                                  }}
                                                  className='mr-2 mb-2'
                                                  onClick={() =>
                                                    this.MoveToWishlistAlert(
                                                      cart
                                                    )
                                                  }>
                                                  <FavoriteBorderOutlinedIcon fontSize='small' />{" "}
                                                  Move to Wishlist
                                                </Button>
                                              )}
                                            </>
                                          ) : (
                                            <React.Fragment>
                                              {this.state
                                                .moveToWishlistLoader &&
                                              this.state.btnClickedId ==
                                                cart.bookId ? (
                                                <Button
                                                  variant='outlined'
                                                  size='small'
                                                  style={{
                                                    minWidth: "9.1rem",
                                                    color: "#2248AE",
                                                    textTransform: "capitalize",
                                                  }}
                                                  className='mr-2 mb-2'>
                                                  <CircularProgress size={20} />
                                                </Button>
                                              ) : (
                                                <Button
                                                  variant='outlined'
                                                  size='small'
                                                  style={{
                                                    minWidth: "9.1rem",
                                                    color: "#2248AE",
                                                    textTransform: "capitalize",
                                                  }}
                                                  className='mr-2 mb-2'
                                                  onClick={() =>
                                                    this.MoveToWishlistAlert(
                                                      cart
                                                    )
                                                  }>
                                                  <FavoriteBorderOutlinedIcon fontSize='small' />{" "}
                                                  Move to Wishlist
                                                </Button>
                                              )}
                                              <br />
                                              {/* <span id="CartchargeslineS">Charges</span> */}
                                              <span id='cartBkShipChargeS'>
                                                {/* &#8377;{Math.round(cart.bookShippingCost)} */}
                                              </span>
                                            </React.Fragment>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            : null}
                        </div>
                      </MediaQuery>

                      <MediaQuery maxWidth={567}>
                        <div className={` ${styles.cartDetails} mb-5`}>
                          {this.props.SaveLaterData.length
                            ? this.props.SaveLaterData.map(cart => {
                                return (
                                  <div
                                    className={` ${styles.cart_list_data}`}
                                    id='cartBookdataD'
                                    key={cart.bookInvId}>
                                    <div
                                      className='row '
                                      style={{
                                        margin: "0",
                                        // marginRight: "0.2rem",

                                        padding: "0",
                                      }}>
                                      {false ? null : (
                                        <div
                                          style={{
                                            // border: "1px solid red",

                                            marginTop: "0.4rem",
                                            // width: "8.313rem",
                                            // height: "8.838rem",
                                          }}
                                          className={`${styles.imagediv} col-2 col-sm-2 col-lg-2`}>
                                          <img
                                            style={{
                                              width: "10vw",

                                              //   height: "100%",
                                            }}
                                            src={`https://d1f2zer3rm8sjv.cloudfront.net/${cart.bookThumb}`}
                                            id='cartbookimg'
                                            onError={e => {
                                              e.target.onerror = null;
                                              e.target.src =
                                                "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                                              // "https://d1f2zer3rm8sjv.cloudfront.net/medium/book_default.jpeg"
                                            }}
                                          />
                                        </div>
                                      )}

                                      <div className='col-10 col-sm-10 col-lg-10 '>
                                        <Button
                                          variant='outlined'
                                          size='small'
                                          style={{
                                            textTransform: "capitalize",
                                            position: "absolute",
                                            right: "1rem",
                                            color: "#2248AE",
                                          }}
                                          data-pid = {cart.bookId}
                                          onClick={() =>
                                            this.ConfirmRemoveFromCart(
                                              cart.bookInvId,
                                              cart.Cart_id
                                            )
                                          }>
                                          <DeleteIcon
                                            fontSize='small'
                                            style={{
                                              color: "#2248AE",
                                            }}
                                          />
                                          Remove
                                        </Button>
                                        <p
                                          className='p'
                                          style={{
                                            fontSize: "0.9rem",
                                            marginBottom: "0.5rem",
                                            maxWidth: "50vw",
                                          }}>
                                          {ResizeTitle(cart.bookName)}
                                        </p>
                                        <div
                                          className='d-block p d-flex justify-content-between '
                                          style={{
                                            fontSize: "0.8rem",
                                          }}>
                                          {cart.bookInvId
                                            .toString()
                                            .indexOf("NB") > -1 ? (
                                            <span id='cartBookShippingS'>
                                              Price: &#8377;
                                              {Math.round(
                                                cart.bookShippingCost
                                              )}
                                            </span>
                                          ) : (
                                            <div id='orgmrp'>
                                              <p
                                                style={{
                                                  margin: 0,
                                                }}
                                                id='cartBookpriceS'>
                                                MRP: &#8377;
                                                <span
                                                  id='cartBookPrice'
                                                  style={
                                                    cart.bookInvId
                                                      .toString()
                                                      .indexOf("NB") > -1
                                                      ? null
                                                      : {
                                                          textDecoration:
                                                            "line-through",
                                                        }
                                                  }>
                                                  {TotalPrice(cart.bookPrice)}
                                                </span>
                                                {cart.bookInvId
                                                  .toString()
                                                  .indexOf("NB") > -1 ? null : (
                                                  <span id='cartFree'>
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
                                                  <span id='cartBookShippingS'>
                                                    Shipping & Handling charges
                                                    &nbsp; &#8377;
                                                    {Math.round(
                                                      cart.bookShippingCost
                                                    )}
                                                  </span>
                                                  <br />
                                                  {/* <span id="CartchargeslineS">Charges</span> */}
                                                  <span id='cartBkShipChargeS'>
                                                    {/* &#8377;{Math.round(cart.bookShippingCost)} */}
                                                  </span>
                                                </React.Fragment>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                        <div id='Bookinfo1'>
                                          {this.props.OutOfStockBooks.includes(
                                            cart.bookInvId
                                          ) ? (
                                            <p
                                              className='p '
                                              style={{
                                                margin: 0,
                                                fontSize: "0.8rem",
                                                color: "red",
                                                fontWeight: "bold",
                                              }}>
                                              Out Of Stock,Please Remove It
                                            </p>
                                          ) : Math.round(
                                              cart.bookShippingCost
                                            ) == 0 ? (
                                            <p
                                              className='p'
                                              style={{ margin: 0 }}>
                                              Out Of Stock,Please Remove It
                                            </p>
                                          ) : null}

                                          {cart.bookInvId
                                            .toString()
                                            .indexOf("NB") > -1 &&
                                          cart.offertype ? (
                                            <p
                                              id='yousaved'
                                              style={{
                                                color: "green",
                                                fontSize: "0.8rem",
                                              }}>
                                              {cart.offertype == "cashback" ? (
                                                <React.Fragment>
                                                  You Earned &#8377;{" "}
                                                  {Math.round(cart.bookPrice) -
                                                    this.CashbackPrice(
                                                      cart.bookPrice,
                                                      cart.cashback_per
                                                    )}
                                                  <span
                                                    style={{
                                                      color: "gray",
                                                      fontSize: "12px",
                                                      marginLeft: "5px",
                                                    }}>
                                                    (BookCoins of Worth{" "}
                                                    {cart.cashback_per}% of{" "}
                                                    {cart.bookPrice})
                                                  </span>
                                                </React.Fragment>
                                              ) : (
                                                <React.Fragment>
                                                  You Saved &#8377;
                                                  {Math.round(cart.bookPrice) -
                                                    this.DicountedPrice(
                                                      cart.bookPrice,
                                                      cart.discount_per
                                                    )}{" "}
                                                  (Flat {cart.discount_per}%
                                                  off)
                                                </React.Fragment>
                                              )}
                                            </p>
                                          ) : null}
                                        </div>
                                      </div>
                                      <div>
                                        <div
                                          style={{
                                            // display: "flex",
                                            alignItems: "center",
                                          }}
                                          id='Bookinfo2'>
                                          <div className='d-flex align-items-center'>
                                            <div className='d-lg-block mt-2'>
                                              {this.state.moveToCartLoader &&
                                              this.state.btnClickedId ==
                                                cart.bookId ? (
                                                <Button
                                                  variant='outlined'
                                                  size='small'
                                                  style={{
                                                    color: "#2248AE",
                                                    minWidth: "6.4rem",
                                                    textTransform: "capitalize",
                                                    marginRight: "0.5rem",
                                                  }}
                                                  className='mr-2 mb-2'>
                                                  <CircularProgress size={20} />
                                                </Button>
                                              ) : (
                                                <Button
                                                  variant='outlined'
                                                  size='small'
                                                  style={{
                                                    color: "#2248AE",
                                                    minWidth: "6.4rem",
                                                    textTransform: "capitalize",
                                                    marginRight: "0.5rem",
                                                  }}
                                                  className='mr-2 mb-2'
                                                  data-pid = {cart.bookId}
                                                  onClick={() => {
                                                    this.movetoCarthand(cart);
                                                  }}>
                                                  Move to Cart
                                                </Button>
                                              )}
                                            </div>
                                            <div className='d-lg-block mt-2'>
                                              {cart.bookInvId
                                                .toString()
                                                .indexOf("NB") > -1 ? (
                                                <>
                                                  {this.state
                                                    .moveToWishlistLoader &&
                                                  this.state.btnClickedId ==
                                                    cart.bookId ? (
                                                    <Button
                                                      variant='outlined'
                                                      size='small'
                                                      style={{
                                                        minWidth: "9.1rem",
                                                        color: "#2248AE",
                                                        textTransform:
                                                          "capitalize",
                                                      }}
                                                      className='mr-2 mb-2'>
                                                      <CircularProgress
                                                        size={20}
                                                      />
                                                    </Button>
                                                  ) : (
                                                    <Button
                                                      variant='outlined'
                                                      size='small'
                                                      style={{
                                                        minWidth: "9.1rem",
                                                        color: "#2248AE",
                                                        textTransform:
                                                          "capitalize",
                                                      }}
                                                      className='mr-2 mb-2'
                                                      onClick={() =>
                                                        this.MoveToWishlistAlert(
                                                          cart
                                                        )
                                                      }>
                                                      <FavoriteBorderOutlinedIcon fontSize='small' />{" "}
                                                      Move to Wishlist
                                                    </Button>
                                                  )}
                                                </>
                                              ) : (
                                                <React.Fragment>
                                                  {this.state
                                                    .moveToWishlistLoader &&
                                                  this.state.btnClickedId ==
                                                    cart.bookId ? (
                                                    <Button
                                                      variant='outlined'
                                                      size='small'
                                                      style={{
                                                        minWidth: "9.1rem",
                                                        color: "#2248AE",
                                                        textTransform:
                                                          "capitalize",
                                                      }}
                                                      className='mr-2 mb-2'>
                                                      <CircularProgress
                                                        size={20}
                                                      />
                                                    </Button>
                                                  ) : (
                                                    <Button
                                                      variant='outlined'
                                                      size='small'
                                                      style={{
                                                        color: "#2248AE",
                                                        textTransform:
                                                          "capitalize",
                                                      }}
                                                      className='mr-2 mb-2'
                                                      onClick={() =>
                                                        this.MoveToWishlistAlert(
                                                          cart
                                                        )
                                                      }>
                                                      <FavoriteBorderOutlinedIcon fontSize='small' />{" "}
                                                      Move to Wishlist
                                                    </Button>
                                                  )}
                                                  <br />
                                                  {/* <span id="CartchargeslineS">Charges</span> */}
                                                  <span id='cartBkShipChargeS'>
                                                    {/* &#8377;{Math.round(cart.bookShippingCost)} */}
                                                  </span>
                                                </React.Fragment>
                                              )}
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              marginTop: "0.3rem",
                                            }}
                                            id='offerdiv'>
                                            {cart.bookInvId
                                              .toString()
                                              .indexOf("NB") > -1 &&
                                            cart.bookInvId != "NB1441502" ? (
                                              <div>
                                                <Button
                                                  size='small'
                                                  className='mr-2'
                                                  variant={
                                                    // cart.offertype ==
                                                    // "discount"
                                                    //   ? "contained"
                                                    //   : "outlined"
                                                    "outlined"
                                                  }
                                                  style={{
                                                    // color:
                                                    //   cart.offertype ==
                                                    //   "discount"
                                                    //     ? "#fff"
                                                    //     : "green",
                                                    // backgroundColor:
                                                    //   cart.offertype ==
                                                    //   "discount"
                                                    //     ? "green"
                                                    //     : null,
                                                    textTransform: "capitalize",
                                                    marginRight: "0.5rem",
                                                  }}
                                                  onClick={e =>
                                                    this.onOfferChanged(
                                                      e,
                                                      "discount",
                                                      cart
                                                    )
                                                  }
                                                  name='offerType'
                                                  value='discount'
                                                  disabled={offerLoading}>
                                                  <span
                                                    style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                    }}>
                                                    {offerLoading &&
                                                    OfferCartId ===
                                                      cart.Cart_id ? (
                                                      <CircularProgress
                                                        size={16}
                                                      />
                                                    ) : (
                                                      <input
                                                        checked={
                                                          cart.offertype ==
                                                          "discount"
                                                        }
                                                        style={{
                                                          marginRight: "0.3rem",
                                                        }}
                                                        type={"radio"}
                                                      />
                                                    )}
                                                    Flat {cart.discount_per}
                                                    %off
                                                  </span>
                                                </Button>

                                                <Button
                                                  size='small'
                                                  variant={
                                                    // cart.offertype ==
                                                    // "cashback"
                                                    //   ? "contained"
                                                    //   : "outlined"
                                                    "outlined"
                                                  }
                                                  style={{
                                                    // color:
                                                    //   cart.offertype ==
                                                    //   "cashback"
                                                    //     ? "#fff"
                                                    //     : "green",
                                                    // backgroundColor:
                                                    //   cart.offertype ==
                                                    //   "cashback"
                                                    //     ? "green"
                                                    //     : null,
                                                    textTransform: "capitalize",
                                                  }}
                                                  onClick={e =>
                                                    this.onOfferChanged(
                                                      e,
                                                      "cashback",
                                                      cart
                                                    )
                                                  }
                                                  disabled={offerLoading}>
                                                  <span
                                                    style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                    }}>
                                                    {offerLoading &&
                                                    OfferCartId ===
                                                      cart.Cart_id ? (
                                                      <CircularProgress
                                                        size={16}
                                                        style={{ color: "#fff" }}
                                                      />
                                                    ) : (
                                                      <input
                                                        checked={
                                                          cart.offertype ==
                                                          "cashback"
                                                        }
                                                        style={{
                                                          marginRight: "0.3rem",
                                                        }}
                                                        type={"radio"}
                                                      />
                                                    )}
                                                    ₹
                                                    {Math.round(
                                                      cart.bookPrice
                                                    ) -
                                                      this.CashbackPrice(
                                                        cart.bookPrice,
                                                        cart.cashback_per
                                                      )}{" "}
                                                    worth Bookcoins
                                                  </span>
                                                </Button>

                                                {/* End of popup mediaQuery */}
                                              </div>
                                            ) : null}
                                          </div>
                                        </div>
                                        <div></div>
                                      </div>
                                    </div>
                                    {/* end of leftdetail */}
                                  </div>
                                );
                              })
                            : null}
                        </div>
                      </MediaQuery>
                      {/* =========================== Save Later Div Comment =========================================== */}

                      {/* =========================== End Save Later =========================================== */}
                    </div>
                  </div>
                ) : (
                  <React.Fragment>
                    <div
                      className=' m-sm-2 m-lg-5 '
                      style={{ display: "flex", maxWidth: "100%" }}>
                      <div
                        className={`${styles.cartLeft} col-12 col-sm-8 col-lg-8 px-0`}
                        style={{ marginRight: "1rem" }}>
                        <div>
                          {/*--------------------- Offer Book Div Started -------------------- */}

                          <div>
                            {this.props.offerBook.length !== 0 ? (
                              this.state.offerbookloader ? (
                                <div
                                  className={`${styles.offerbook}`}
                                  style={{
                                    minHeight: "8.8rem",
                                    backgroundColor: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}>
                                  <center
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}>
                                    <CircularProgress size={35} />
                                  </center>
                                </div>
                              ) : (
                                <div className={`${styles.offerbook}`}>
                                  <div id='bookimg ' className={`${styles.bookimg}`}>
                                    <Image
                                      src={`https://d1f2zer3rm8sjv.cloudfront.net/${this.props.offerBook.thumb}`}
                                      alt='offer book'
                                      height={130}
                                      width={100}
                                    />
                                  </div>
                                  <div
                                    id='Btitle'
                                    style={{
                                      width: "100%",
                                      padding: "0.2rem",
                                    }}>
                                    <div
                                      id='offer'
                                      className={`${styles.offer}`}
                                      style={{
                                        color: "#ff723b",
                                        fontWeight: "bold",
                                      }}>
                                      {" "}
                                      Win this Book{" "}
                                      <b>at Special Offered Price</b>{" "}
                                    </div>

                                    {/* <a href ="https://www.mypustak.com/product/NARAYANA-JUNIOR-COLLEGES-JR-INTER-JEE-ADVANCED-CHEMISTRY-PACK-OF-4-BOOKS"> */}
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        // border: "1px solid lightgray",
                                      }}>
                                      <div id='offerText'>
                                        <span
                                          style={{
                                            textTransform: "capitalize",
                                            cursor: "pointer",
                                          }}
                                          className={`${styles.offerbooktitle}`}
                                          onClick={() =>
                                            this.openulr(
                                              `https://www.mypustak.com/product/${this.props.offerBook.slug}?${this.props.offerBook.book_id}`
                                            )
                                          }>
                                          {" "}
                                          {this.props.offerBook.title > 30
                                            ? this.props.offerBook.title
                                                .replace(
                                                  /(\w)(\w*)/g,
                                                  (_, firstChar, rest) =>
                                                    firstChar.toUpperCase() +
                                                    rest.toLowerCase()
                                                )
                                                .substring(0, 30)
                                                .concat("...")
                                            : this.props.offerBook.title.replace(
                                                /(\w)(\w*)/g,
                                                (_, firstChar, rest) =>
                                                  firstChar.toUpperCase() +
                                                  rest.toLowerCase()
                                              )}
                                        </span>
                                        <br />
                                        <span style={{ color: "#555" }}>
                                          Shipping & handling Charges:
                                        </span>{" "}
                                        &#8377;
                                        <s>
                                          {this.props.offerBook.book_value}
                                        </s>{" "}
                                        &nbsp;&#8377;
                                        {
                                          this.props.offerBook
                                            .shipping_handling_charge
                                        }
                                        <br />
                                        <span style={{ color: "#555" }}>
                                          {" "}
                                          Special Offer :{" "}
                                        </span>
                                        <s>
                                          &#8377;
                                          {
                                            this.props.offerBook
                                              .shipping_handling_charge
                                          }
                                        </s>{" "}
                                        &nbsp;
                                        <span
                                          style={{
                                            color: "#000",
                                            fontWeight: "bold",
                                          }}>
                                          {" "}
                                          &#8377;{" "}
                                          {Math.round(
                                            parseInt(
                                              this.props.offerBook
                                                .shipping_handling_charge
                                            ) -
                                              parseInt(
                                                this.props.offerBook
                                                  .shipping_handling_charge
                                              ) *
                                                (parseInt(
                                                  this.props.offerBook
                                                    .offer_discount
                                                ) /
                                                  100)
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        marginRight: "2rem",
                                        float: "right",
                                      }}>
                                      <p
                                        style={{
                                          // paddingLeft: "40%",
                                          marginBottom: "0px",
                                          color: " #000",
                                          fontWeight: "bold",
                                          fontSize: "20px",
                                        }}>
                                        <input
                                          type='checkbox'
                                          style={{
                                            width: "20px",
                                            height: "18px",
                                          }}
                                          value='Wallet'
                                          id='CartWalletCheckBox'
                                          label='Get it Now Free'
                                          onClick={() =>
                                            {this.MIN_ORDER_MSG_DIV()
                                            this.getItNow(
                                              this.renderAmtUsed().total_amt
                                            )}
                                          }
                                          checked={this.state.getItChecked}
                                        />{" "}
                                        Get it Now
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )
                            ) : null}
                          </div>
                          {/*--------------------- offer Book Div End -------------------------  */}
                          <div className='bg-heading mb-3 p-2 shadow text-white d-flex justify-content-between'>
                            <div className='d-flex  justify-content-center align-items-center'>
                              <span className='px-3'>
                                My Cart ({this.getBookQty().notebookQty+this.getBookQty().newQty+this.getBookQty().oldQty})
                              </span>

                              {/* <Image src={assured} width={100} height={25} className="" alt='assured_img' /> */}
                            </div>
                            <div
                              className='text-center'
                              onClick={() => {
                                setShow(false);
                              }}>
                              {/* <KeyboardArrowDownIcon /> */}
                            </div>
                          </div>

                          <div className={` ${styles.cartDetails}`}>
                            {groupedArray2.length
                              ? groupedArray2.map(cartitem => {
                                  {
                                    console.log(cartitem, "CART");
                                  }
                                  return (
                                    <div key={cartitem.cart_id}>
                                      {cartitem[1]
                                        .sort(function (a, b) {
                                          return b.Cart_id - a.Cart_id;
                                        })
                                        .map(cart => {
                                          return (
                                            <div
                                              className='mx-0 px-3  py-3  mt-1 bg-white '
                                              id='cartBookdataD'
                                              style={{ marginTop: "-18px" }}
                                              key={cart.bookInvId}>
                                              <div className='row'>
                                                {false ? null : (
                                                  <div
                                                    style={{
                                                      marginTop: "0.4rem",
                                                      width: "6.313rem",
                                                      height: "5.838rem",
                                                    }}
                                                    className='col-2 col-sm-2 col-md-2 col-lg-2'>
                                                    <img
                                                      style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        // border: "1px solid red",
                                                      }}
                                                      src={`https://d1f2zer3rm8sjv.cloudfront.net/${cart.bookThumb}`}
                                                      id='cartbookimg'
                                                      onError={e => {
                                                        e.target.onerror = null;
                                                        e.target.src =
                                                          "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                                                      }}
                                                    />
                                                  </div>
                                                )}
                                                <div
                                                  className='col-9 col-sm-8 col-md-9 col-lg-10 '
                                                  style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                  }}>
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      alignItems: "flex-start",
                                                      justifyContent:
                                                        "space-between",
                                                    }}>
                                                    <div>
                                                      <p
                                                        className={`${styles.cartBookTitle}`}
                                                        onClick={() => {
                                                          this.RedirectToNewTab(
                                                            cart.bookSlug,
                                                            cart.bookId,
                                                            cart.bookInvId
                                                          );
                                                        }}
                                                        style={{
                                                        }}>
                                                        {ResizeTitle(
                                                          cart.bookName
                                                        )}
                                                      </p>
                                                      <div
                                                        className='d-block p d-flex justify-content-between '
                                                        style={{
                                                          fontSize: "0.8rem",
                                                        }}>
                                                        {cart.bookInvId
                                                          .toString()
                                                          .indexOf("NB") >
                                                        -1 ? (
                                                          <span id='cartBookShippingS'>
                                                            Price: &#8377;
                                                           <span style ={{textDecoration:"line-through"}}> {cart.bookPrice}</span> 
                                                           &nbsp; &#8377;{Math.round(
                                                              cart.bookShippingCost
                                                            )}
                                                          </span>
                                                        ) : (
                                                          <div id='orgmrp'>
                                                            <p
                                                              style={{
                                                                margin: 0,
                                                              }}
                                                              id='cartBookpriceS'>
                                                              MRP: &#8377;
                                                              <span
                                                                id='cartBookPrice'
                                                                style={
                                                                  cart.bookInvId
                                                                    .toString()
                                                                    .indexOf(
                                                                      "NB"
                                                                    ) > -1
                                                                    ? null
                                                                    : {
                                                                        textDecoration:
                                                                          "line-through",
                                                                      }
                                                                }>
                                                                {TotalPrice(
                                                                  cart.bookPrice
                                                                )}
                                                              </span>
                                                              {cart.bookInvId
                                                                .toString()
                                                                .indexOf("KOL") >
                                                              -1 ?
                                                                <span className="text-success">
                                                                {" "}&#8377;
                                                                  {Math.round(
                                                                    cart.bookShippingCost
                                                                  )}{" "}({cart.discount_per}% Off)
                                                                </span>:
                                                                cart.bookInvId
                                                                .toString()
                                                                .indexOf("NB") >
                                                              -1 ? null : (
                                                                <span id='cartFree'>
                                                                  (Free)
                                                                </span>
                                                                
                                                              )}
                                                            </p>
                                                            {cart.bookInvId
                                                              .toString()
                                                              .indexOf("KOL") >
                                                            -1 ?
                                                            (
                                                              <React.Fragment>
                                                                  <div style={{display:"flex",flexDirection:"column"}}>
                                                                    <span>Free Delivery</span>
                                                                    <div style={{display:"flex",alignItems:"center"}}>
                                                                      <span>Quantity</span>:
                                                                      <div style={{marginLeft:"0.25rem",display:"flex",alignItems:"center"}}>
                                                                        <span className="px-2" style={{}}>{cart.bookQty}</span>
                                                                        <Button variant="outlined" style={{textTransform:"capitalize"}} size="small" onClick={() => {
                                                                          this.openUpdateDialog(cart.bookInvId,cart.Cart_id,cart.bookQty,cart.bookId)
                                                                        }}>Update Quantity</Button>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                              </React.Fragment>
                                                            ):
                                                              cart.bookInvId
                                                              .toString()
                                                              .indexOf("NB") >
                                                            -1 ? (
                                                              <React.Fragment>
                                                                {cart.delivery_cost ? (
                                                                  <div>
                                                                    Delivery
                                                                    Cost :{" "}
                                                                    {
                                                                      cart.delivery_cost
                                                                    }
                                                                  </div>
                                                                ) : null}
                                                              </React.Fragment>
                                                            ) : (
                                                              <React.Fragment>
                                                                <span id='cartBookShippingS'>
                                                                  Shipping &
                                                                  Handling
                                                                  charges &nbsp;
                                                                  &#8377;
                                                                  {Math.round(
                                                                    cart.bookShippingCost
                                                                  )}
                                                                </span>
                                                                <br />
                                                                <span id='cartBkShipChargeS'>
                                                                  {cart.bookCond
                                                                    ? `Book Condition : ${cart.bookCond}`
                                                                    : null}
                                                                </span>
                                                              </React.Fragment>
                                                            )}
                                                          </div>
                                                        )}
                                                      </div>
                                                      <div id='Bookinfo1'>
                                                        {this.props.OutOfStockBooks.includes(
                                                          cart.bookInvId
                                                        ) ? (
                                                          <p
                                                            className='p'
                                                            style={{
                                                              margin: 0,
                                                              fontSize:
                                                                "0.8rem",
                                                              color: "red",
                                                              fontWeight:
                                                                "bold",
                                                            }}>
                                                            Out Of Stock,Please
                                                            Remove It
                                                          </p>
                                                        ) : Math.round(
                                                            cart.bookShippingCost
                                                          ) == 0 ? (
                                                          <p
                                                            className='p'
                                                            style={{
                                                              margin: 0,
                                                              color: "red",
                                                              fontWeight:
                                                                "bold",
                                                            }}>
                                                            Book Is Out of
                                                            Stock,Please Remove
                                                            It From From The
                                                            Cart.
                                                          </p>
                                                        ) : null}

                                                        {cart.bookInvId
                                                          .toString()
                                                          .indexOf("NB") > -1 &&
                                                        cart.offertype ? (
                                                          <p
                                                            id='yousaved'
                                                            style={{
                                                              color: "green",
                                                              fontSize:
                                                                "0.8rem",
                                                            }}>
                                                            {cart.offertype ==
                                                            "cashback" ? (
                                                              <React.Fragment>
                                                                You Earned
                                                                &#8377;{" "}
                                                                {Math.round(
                                                                  cart.bookPrice
                                                                ) -
                                                                  this.CashbackPrice(
                                                                    cart.bookPrice,
                                                                    cart.cashback_per
                                                                  )}
                                                                <span
                                                                  style={{
                                                                    color:
                                                                      "gray",
                                                                    fontSize:
                                                                      "12px",
                                                                    marginLeft:
                                                                      "5px",
                                                                  }}>
                                                                  (BookCoins of
                                                                  Worth{" "}
                                                                  {
                                                                    cart.cashback_per
                                                                  }
                                                                  % of{" "}
                                                                  {
                                                                    cart.bookPrice
                                                                  }
                                                                  )
                                                                </span>
                                                              </React.Fragment>
                                                            ) : (
                                                              <React.Fragment>
                                                                You Saved
                                                                &#8377;
                                                                {Math.round(
                                                                  cart.bookPrice
                                                                ) -
                                                                  this.DicountedPrice(
                                                                    cart.bookPrice,
                                                                    cart.discount_per
                                                                  )}{" "}
                                                                (Flat{" "}
                                                                {
                                                                  cart.discount_per
                                                                }
                                                                % off)
                                                              </React.Fragment>
                                                            )}
                                                          </p>
                                                        ) : null}
                                                      </div>
                                                    </div>
                                                    <Button
                                                      variant='outlined'
                                                      size='small'
                                                      style={{
                                                        textTransform:
                                                          "capitalize",
                                                        color: "#2248AE",
                                                      }}
                                                      data-pid = {cart.bookId}
                                                      onClick={() =>
                                                        this.ConfirmRemoveFromCart(
                                                          cart.bookInvId,
                                                          cart.Cart_id
                                                        )
                                                      }>
                                                      <DeleteIcon
                                                        fontSize='small'
                                                        style={{
                                                          color: "#2248AE",
                                                        }}
                                                      />
                                                      Remove
                                                    </Button>
                                                  </div>
                                                </div>
                                              </div>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  flexWrap: "wrap",
                                                }}
                                                id='Bookinfo2'>
                                                <div
                                                  className='d-flex align-items-center'
                                                  style={{
                                                    marginRight: "0.5rem",
                                                  }}>
                                                  {false ?null:
                                                  <div className=' d-lg-block mt-2'>
                                                    {this.state
                                                      .saveLaterLoader &&
                                                    this.state.btnClickedId ==
                                                      cart.bookId ? (
                                                      <Button
                                                        variant='outlined'
                                                        size='small'
                                                        style={{
                                                          minWidth: "5.3rem",
                                                          color: "#2248AE",
                                                          marginRight: "0.5rem",
                                                          textTransform:
                                                            "capitalize",
                                                        }}
                                                        className='mr-2 mb-2'>
                                                        <CircularProgress
                                                          size={20}
                                                        />
                                                      </Button>
                                                    ) : (
                                                      <Button
                                                        variant='outlined'
                                                        size='small'
                                                        style={{
                                                          minWidth: "5.3rem",
                                                          color: "#2248AE",
                                                          marginRight: "0.5rem",
                                                          textTransform:
                                                            "capitalize",
                                                        }}
                                                        className='mr-2 mb-2'
                                                        data-pid = {cart.bookId}
                                                        onClick={() => {
                                                          this.saveLaterhand(
                                                            cart
                                                          );
                                                        }}>
                                                        Save later
                                                      </Button>
                                                    )}
                                                  </div>
                                                  }
                                                  {
                                                    false? null:
                                                  <div className='d-none d-sm-block d-md-block d-lg-block mt-2'>
                                                    {cart.bookInvId
                                                      .toString()
                                                      .indexOf("NB") > -1 ? (
                                                      <>
                                                        {this.state
                                                          .moveToWishlistLoader &&
                                                        this.state
                                                          .btnClickedId ==
                                                          cart.bookId ? (
                                                          <Button
                                                            variant='outlined'
                                                            size='small'
                                                            style={{
                                                              minWidth:
                                                                "9.1rem",
                                                              color: "#2248AE",
                                                              textTransform:
                                                                "capitalize",
                                                            }}
                                                            className='mr-2 mb-2'>
                                                            <CircularProgress
                                                              size={20}
                                                            />
                                                          </Button>
                                                        ) : (
                                                          <Button
                                                            variant='outlined'
                                                            size='small'
                                                            style={{
                                                              minWidth:
                                                                "9.1rem",
                                                              color: "#2248AE",
                                                              textTransform:
                                                                "capitalize",
                                                            }}
                                                            className='mr-2 mb-2'
                                                            onClick={() =>
                                                              this.MoveToWishlistAlert(
                                                                cart
                                                              )
                                                            }>
                                                            <FavoriteBorderOutlinedIcon fontSize='small' />{" "}
                                                            Move to Wishlist
                                                          </Button>
                                                        )}
                                                      </>
                                                    ) : (
                                                      <React.Fragment>
                                                        {this.state
                                                          .moveToWishlistLoader &&
                                                        this.state
                                                          .btnClickedId ==
                                                          cart.bookId ? (
                                                          <Button
                                                            variant='outlined'
                                                            size='small'
                                                            style={{
                                                              minWidth:
                                                                "9.1rem",
                                                              color: "#2248AE",
                                                              textTransform:
                                                                "capitalize",
                                                            }}
                                                            className='mr-2 mb-2'>
                                                            <CircularProgress
                                                              size={20}
                                                            />
                                                          </Button>
                                                        ) : (
                                                          <Button
                                                            variant='outlined'
                                                            size='small'
                                                            style={{
                                                              minWidth:
                                                                "9.1rem",
                                                              color: "#2248AE",
                                                              textTransform:
                                                                "capitalize",
                                                            }}
                                                            className='mr-2 mb-2'
                                                            onClick={() =>
                                                              this.MoveToWishlistAlert(
                                                                cart
                                                              )
                                                            }>
                                                            <FavoriteBorderOutlinedIcon fontSize='small' />{" "}
                                                            Move to Wishlist
                                                          </Button>
                                                        )}
                                                        <br />
                                                        <span id='cartBkShipChargeS'></span>
                                                      </React.Fragment>
                                                    )}
                                                  </div>
                                                  }
                                                </div>
                                                <div style={{}} id='offerdiv'>
                                                  {cart.bookInvId
                                                    .toString()
                                                    .indexOf("NB") > -1 &&
                                                  cart.bookInvId !=
                                                    "NB1441502" ? (
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                      }}>
                                                      <Button
                                                        size='small'
                                                        variant={"outlined"}
                                                        style={{
                                                          marginRight: "0.5rem",
                                                          backgroundColor:
                                                            "#fff",
                                                          textTransform:
                                                            "capitalize",
                                                        }}
                                                        onClick={e =>
                                                          this.onOfferChanged(
                                                            e,
                                                            "discount",
                                                            cart
                                                          )
                                                        }
                                                        name='offerType'
                                                        value='discount'
                                                        disabled={offerLoading}>
                                                        <span
                                                          style={{
                                                            display: "flex",
                                                            alignItems:
                                                              "center",
                                                          }}>
                                                          {offerLoading &&
                                                          OfferCartId ===
                                                            cart.Cart_id ? (
                                                            <CircularProgress
                                                              style={{
                                                                marginRight:
                                                                  "0.3rem",
                                                              }}
                                                              size={16}
                                                            />
                                                          ) : (
                                                            <input
                                                              checked={
                                                                cart.offertype ==
                                                                "discount"
                                                              }
                                                              style={{
                                                                marginRight:
                                                                  "0.3rem",
                                                              }}
                                                              type={"radio"}
                                                            />
                                                          )}
                                                          Flat{" "}
                                                          {cart.discount_per}
                                                          %off
                                                        </span>
                                                      </Button>

                                                      <Button
                                                        size='small'
                                                        variant={"outlined"}
                                                        style={{
                                                          textTransform:
                                                            "capitalize",
                                                        }}
                                                        onClick={e =>
                                                          this.onOfferChanged(
                                                            e,
                                                            "cashback",
                                                            cart
                                                          )
                                                        }
                                                        disabled={offerLoading}>
                                                        <span
                                                          style={{
                                                            display: "flex",
                                                            alignItems:
                                                              "center",
                                                          }}>
                                                          {offerLoading &&
                                                          OfferCartId ===
                                                            cart.Cart_id ? (
                                                            <CircularProgress
                                                              style={{
                                                                marginRight:
                                                                  "0.3rem",
                                                                  color:"#fff"
                                                              }}
                                                              size={16}
                                                              
                                                            />
                                                          ) : (
                                                            <input
                                                              checked={
                                                                cart.offertype ==
                                                                "cashback"
                                                              }
                                                              style={{
                                                                marginRight:
                                                                  "0.3rem",
                                                              }}
                                                              type={"radio"}
                                                            />
                                                          )}
                                                          ₹
                                                          {Math.round(
                                                            cart.bookPrice
                                                          ) -
                                                            this.CashbackPrice(
                                                              cart.bookPrice,
                                                              cart.cashback_per
                                                            )}{" "}
                                                          worth Bookcoins
                                                        </span>
                                                      </Button>

                                                      {/* End of popup mediaQuery */}
                                                    </div>
                                                  ) : null}
                                                </div>
                                              </div>
                                              {/* end of leftdetail */}
                                            </div>
                                          );
                                        })}
                                      <div
                                        style={{
                                          fontWeight: "500",
                                          fontSize: "14px",
                                          padding: "15px",
                                          textAlign: "right",
                                          marginRight: "14px",
                                          marginTop: "-40px",
                                        }}>
                                        {cartitem[0] == 1 ? (
                                          Vendor_wise_delivery_cost(cartitem) !=
                                          0 ? (
                                            <p style={{ marginTop: "0px" }}>
                                              Total Delivery Charge: ₹
                                              {Vendor_wise_delivery_cost(
                                                cartitem
                                              )}
                                            </p>
                                          ) : cartitem[0] ==
                                            0 ? null : Vendor_wise_delivery_cost(
                                              cartitem
                                            ) != 0 ? (
                                            <p>
                                              Total Delivery Charge: ₹
                                              {Vendor_wise_delivery_cost(
                                                cartitem
                                              )}
                                            </p>
                                          ) : null
                                        ) : null}
                                      </div>
                                    </div>
                                  );
                                })
                              : null}

                            <div className= {`${styles.cartLeft_proceed} p-2 shadow bg-white border `}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}>
                                <div
                                  className='fw-bold '
                                  style={{ marginLeft: "0.5rem" }}>
                                  {" "}
                                  &#8377; &nbsp;
                                  {this.props.ItemsInCart !== 0
                                    ? this.renderAmtUsed().total_amt
                                    : 0}{" "}
                                  &nbsp;{" "}
                                </div>
                                <div className='' style={{}}>
                                  <Button
                                    
                                    className='w-80 py-1 text-white shadow'
                                    onClick={e => this.proceedtoCheckout(e)}
                                    style={{
                                      // backgroundColor: "#098041",
                                      outline: "none",
                                      backgroundColor: "#f35631",
                                      textTransform: "capitalize",
                                    }}>
                                    Proceed To Checkout <ArrowForwardIcon />
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/*  */}
                          </div>
                        </div>

                        {/* -----------------------------Save Later div started ------------------------------------------*/}
                        <div
                          style={{
                            // border: "1px solid lightgray",
                            marginTop: "1rem",
                          }}>
                          {this.props.SaveLaterData.length ? (
                            <div className='bg-heading p-2 bg-white text-white d-flex justify-content-between'>
                              <div className='d-flex justify-content-center align-items-center'>
                                <span className='px-3'>
                                  Save Later ({this.props.SaveLaterData.length})
                                </span>

                                {/* <Image src={assured} width={100} height={25} className="" alt='assured_img' /> */}
                              </div>
                              <div
                                className='text-center'
                                onClick={() => {
                                  setShow(false);
                                }}>
                                {/* <KeyboardArrowDownIcon /> */}
                              </div>
                            </div>
                          ) : null}

                          <div className={` ${styles.cartDetails}`}>
                            {this.props.SaveLaterData.length
                              ? this.props.SaveLaterData.map(cart => {
                                  return (
                                    <div
                                      className='mx-0 px-4  py-3  mt-1 bg-white border border-gray '
                                      id='cartBookdataD'
                                      style={{ marginTop: "-18px" }}
                                      key={cart.bookInvId}>
                                      <div className='row '>
                                        {false ? null : (
                                          <div
                                            style={{
                                              marginTop: "0.4rem",
                                              width: "6.313rem",
                                              height: "5.838rem",
                                            }}
                                            className='col-2 col-sm-2 col-lg-2'>
                                            <img
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                              }}
                                              src={`https://d1f2zer3rm8sjv.cloudfront.net/${cart.bookThumb}`}
                                              id='cartbookimg'
                                              onError={e => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                  "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                                                // "https://d1f2zer3rm8sjv.cloudfront.net/medium/book_default.jpeg"
                                              }}
                                            />
                                          </div>
                                        )}
                                        <div className='col-10 col-sm-10 col-md-10 col-lg-10'>
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "flex-start",
                                              justifyContent: "space-between",
                                            }}>
                                            <div>
                                              <div>
                                                <p
                                                  className={`${styles.cartBookTitle}`}
                                                  onClick={() => {
                                                    this.RedirectToNewTab(
                                                      cart.bookSlug,
                                                      cart.bookId,
                                                      cart.bookInvId
                                                    );
                                                  }}
                                                  style={{
                                                  
                                                  }}>
                                                  {ResizeTitle(cart.bookName)}
                                                </p>
                                              </div>
                                              <div
                                                className='d-block p d-flex justify-content-between '
                                                style={{ fontSize: "0.8rem" }}>
                                                {cart.bookInvId
                                                  .toString()
                                                  .indexOf("NB") > -1 ? (
                                                  <span id='cartBookShippingS'>
                                                    Price: &#8377;
                                                    {Math.round(
                                                      cart.bookShippingCost
                                                    )}
                                                  </span>
                                                ) : (
                                                  <div id='orgmrp'>
                                                    <p
                                                      style={{ margin: 0 }}
                                                      id='cartBookpriceS'>
                                                      MRP: &#8377;
                                                      <span
                                                        id='cartBookPrice'
                                                        style={
                                                          cart.bookInvId
                                                            .toString()
                                                            .indexOf("NB") > -1
                                                            ? null
                                                            : {
                                                                textDecoration:
                                                                  "line-through",
                                                              }
                                                        }>
                                                        {TotalPrice(
                                                          cart.bookPrice
                                                        )}
                                                      </span>
                                                      {cart.bookInvId
                                                        .toString()
                                                        .indexOf("NB") >
                                                      -1 ? null : (
                                                        <span id='cartFree'>
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
                                                        <span id='cartBookShippingS'>
                                                          Shipping & Handling
                                                          charges &nbsp; &#8377;
                                                          {Math.round(
                                                            cart.bookShippingCost
                                                          )}
                                                        </span>
                                                        <br />
                                                        {/* <span id="CartchargeslineS">Charges</span> */}
                                                        <span id='cartBkShipChargeS'>
                                                          {/* &#8377;{Math.round(cart.bookShippingCost)} */}
                                                          {cart.bookCond
                                                            ? `Book Condition : ${cart.bookCond}`
                                                            : null}
                                                        </span>
                                                      </React.Fragment>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                              <div id='Bookinfo1'>
                                                {this.props.OutOfStockBooks.includes(
                                                  cart.bookInvId
                                                ) ? (
                                                  <p
                                                    className='p'
                                                    style={{
                                                      margin: 0,
                                                      fontSize: "0.8rem",
                                                    }}>
                                                    Book Is Out Of Stock,Please
                                                    Remove .
                                                  </p>
                                                ) : Math.round(
                                                    cart.bookShippingCost
                                                  ) == 0 ? (
                                                  <p
                                                    className='p'
                                                    style={{ margin: 0 }}>
                                                    Book Is Out of Stock,Please
                                                    Remove .
                                                  </p>
                                                ) : null}

                                                {cart.bookInvId
                                                  .toString()
                                                  .indexOf("NB") > -1 &&
                                                cart.offertype ? (
                                                  <p
                                                    id='yousaved'
                                                    style={{
                                                      color: "green",
                                                      fontSize: "0.8rem",
                                                    }}>
                                                    {cart.offertype ==
                                                    "cashback" ? (
                                                      <React.Fragment>
                                                        You Earned &#8377;{" "}
                                                        {Math.round(
                                                          cart.bookPrice
                                                        ) -
                                                          this.CashbackPrice(
                                                            cart.bookPrice,
                                                            cart.cashback_per
                                                          )}
                                                        <span
                                                          style={{
                                                            color: "gray",
                                                            fontSize: "12px",
                                                            marginLeft: "5px",
                                                          }}>
                                                          (BookCoins of Worth{" "}
                                                          {cart.cashback_per}%
                                                          of {cart.bookPrice})
                                                        </span>
                                                      </React.Fragment>
                                                    ) : (
                                                      <React.Fragment>
                                                        You Saved &#8377;
                                                        {Math.round(
                                                          cart.bookPrice
                                                        ) -
                                                          this.DicountedPrice(
                                                            cart.bookPrice,
                                                            cart.discount_per
                                                          )}{" "}
                                                        (Flat{" "}
                                                        {cart.discount_per}%
                                                        off)
                                                      </React.Fragment>
                                                    )}
                                                  </p>
                                                ) : null}
                                              </div>
                                            </div>
                                            <Button
                                              variant='outlined'
                                              size='small'
                                              style={{
                                                textTransform: "capitalize",
                                                // position: "absolute",
                                                right: 0,
                                                color: "#2248AE",
                                              }}
                                              data-pid = {cart.bookId}
                                              onClick={() =>
                                                this.ConfirmRemoveFromSaveLater(
                                                  cart.bookInvId,
                                                  cart.Cart_id
                                                )
                                              }>
                                              <DeleteIcon
                                                fontSize='small'
                                                style={{ color: "#2248AE" }}
                                              />
                                              Remove
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                      {/* end of leftdetail */}
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                        id='Bookinfo2'>
                                        <div
                                          style={{ marginRight: "0.5rem" }}
                                          className='d-flex align-items-center'>
                                          <div className='d-lg-block mt-2'>
                                            {this.state.moveToCartLoader &&
                                            this.state.btnClickedId ==
                                              cart.bookId ? (
                                              <Button
                                                variant='outlined'
                                                size='small'
                                                style={{
                                                  minWidth: "6.4rem",
                                                  color: "#2248AE",
                                                  textTransform: "capitalize",
                                                  marginRight: "0.5rem",
                                                }}
                                                className='mr-2 mb-2'>
                                                <CircularProgress size={20} />
                                              </Button>
                                            ) : (
                                              <Button
                                                variant='outlined'
                                                size='small'
                                                style={{
                                                  minWidth: "6.4rem",
                                                  color: "#2248AE",
                                                  textTransform: "capitalize",
                                                  marginRight: "0.5rem",
                                                }}
                                                className='mr-2 mb-2'
                                                data-pid = {cart.bookId}
                                                onClick={() => {
                                                  this.movetoCarthand(cart);
                                                }}>
                                                Move to Cart
                                              </Button>
                                            )}
                                          </div>
                                          <div className='d-lg-block mt-2'>
                                            {cart.bookInvId
                                              .toString()
                                              .indexOf("NB") > -1 ? (
                                              <>
                                                {this.state
                                                  .moveToWishlistLoader &&
                                                this.state.btnClickedId ==
                                                  cart.bookId ? (
                                                  <Button
                                                    variant='outlined'
                                                    size='small'
                                                    style={{
                                                      minWidth: "9.1rem",
                                                      color: "#2248AE",
                                                      textTransform:
                                                        "capitalize",
                                                    }}
                                                    className='mr-2 mb-2'>
                                                    <CircularProgress
                                                      size={20}
                                                    />
                                                  </Button>
                                                ) : (
                                                  <Button
                                                    variant='outlined'
                                                    size='small'
                                                    style={{
                                                      minWidth: "9.1rem",
                                                      color: "#2248AE",
                                                      textTransform:
                                                        "capitalize",
                                                    }}
                                                    className='mr-2 mb-2'
                                                    onClick={() =>
                                                      this.MoveToWishlistAlert(
                                                        cart
                                                      )
                                                    }>
                                                    <FavoriteBorderOutlinedIcon fontSize='small' />{" "}
                                                    Move to Wishlist
                                                  </Button>
                                                )}
                                              </>
                                            ) : (
                                              <React.Fragment>
                                                {this.state
                                                  .moveToWishlistLoader &&
                                                this.state.btnClickedId ==
                                                  cart.bookId ? (
                                                  <Button
                                                    variant='outlined'
                                                    size='small'
                                                    style={{
                                                      minWidth: "9.1rem",
                                                      color: "#2248AE",
                                                      textTransform:
                                                        "capitalize",
                                                    }}
                                                    className='mr-2 mb-2'>
                                                    <CircularProgress
                                                      size={20}
                                                    />
                                                  </Button>
                                                ) : (
                                                  <Button
                                                    variant='outlined'
                                                    size='small'
                                                    style={{
                                                      minWidth: "9.1rem",
                                                      color: "#2248AE",
                                                      textTransform:
                                                        "capitalize",
                                                    }}
                                                    className='mr-2 mb-2'
                                                    onClick={() =>
                                                      this.MoveToSaveLaterWishlistAlert(
                                                        cart
                                                      )
                                                    }>
                                                    <FavoriteBorderOutlinedIcon fontSize='small' />{" "}
                                                    Move to Wishlist
                                                  </Button>
                                                )}
                                                <br />
                                                {/* <span id="CartchargeslineS">Charges</span> */}
                                                <span id='cartBkShipChargeS'>
                                                  {/* &#8377;{Math.round(cart.bookShippingCost)} */}
                                                </span>
                                              </React.Fragment>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                          </div>
                        </div>
                        {/*------------------------------ Save Later div  Ended --------------------------------------*/}
                      </div>
                      <MediaQuery maxWidth={567}>
                        <div className='col-12 col-sm-12 col-lg-12 px-0 '>
                          <div>
                            <div>
                              {/* ------------------------------offer bookfor mobile -------------------------------- */}
                              {this.props.offerBook.length !== 0 ? (
                                this.state.offerbookloader ? (
                                  <div
                                    className={`${styles.offerbook}`}
                                    style={{
                                      marginTop: "1rem",
                                      paddingTop: "0.5rem",
                                      minHeight: "9.8rem",
                                      backgroundColor: "#fff",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}>
                                    <center
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                      }}>
                                      <CircularProgress size={35} />
                                    </center>
                                  </div>
                                ) : (
                                  <div
                                    className={`${styles.offerbook}`}
                                    style={{
                                      marginTop: "1rem",
                                      paddingTop: "0.5rem",
                                    }}>
                                    <div id='bookimg' className={`${styles.bookimg} col-2`}>
                                      <Image
                                        src={`https://d1f2zer3rm8sjv.cloudfront.net/${this.props.offerBook.thumb}`}
                                        alt='offerbook'
                                        height={250}
                                        width={190}
                                      />
                                    </div>
                                    <div className='col-9'>
                                      <div
                                        id='Btitle'
                                        style={{ marginLeft: "0.5rem" }}>
                                        <div
                                          id='offer'
                                          className={`${styles.offer}`}
                                          style={{
                                            color: "green",
                                            fontWeight: "bold",
                                          }}>
                                          {" "}
                                          Win this Book{" "}
                                          <b> at Special Offered Price</b>{" "}
                                        </div>

                                        <p id='offerText' className='mb-2'>
                                          <span
                                            style={{ color: "#000" }}
                                            onClick={() =>
                                              this.openulr(
                                                `https://www.mypustak.com/product/${this.props.offerBook.slug}?${this.props.offerBook.book_id}`
                                              )
                                            }>
                                            {" "}
                                            {this.props.offerBook.title > 30
                                              ? this.props.offerBook.title
                                                  .replace(
                                                    /(\w)(\w*)/g,
                                                    (_, firstChar, rest) =>
                                                      firstChar.toUpperCase() +
                                                      rest.toLowerCase()
                                                  )
                                                  .substring(0, 30)
                                                  .concat("...")
                                              : this.props.offerBook.title.replace(
                                                  /(\w)(\w*)/g,
                                                  (_, firstChar, rest) =>
                                                    firstChar.toUpperCase() +
                                                    rest.toLowerCase()
                                                )}
                                          </span>
                                          <br />
                                          <span style={{ color: "#555" }}>
                                            Shipping & handling Charges:
                                          </span>{" "}
                                          &#8377;
                                          <s>
                                            {this.props.offerBook.book_value}
                                          </s>{" "}
                                          &nbsp;&#8377;
                                          {
                                            this.props.offerBook
                                              .shipping_handling_charge
                                          }
                                          <br />
                                          <span style={{ color: "#555" }}>
                                            Special Offer :{" "}
                                          </span>
                                          <s>
                                            &#8377;
                                            {
                                              this.props.offerBook
                                                .shipping_handling_charge
                                            }
                                          </s>{" "}
                                          &nbsp;
                                          <span
                                            style={{
                                              color: "#000",
                                              fontWeight: "bold",
                                              fontSize: "0.8rem",
                                            }}>
                                            {" "}
                                            &#8377;
                                            {Math.round(
                                              parseInt(
                                                this.props.offerBook
                                                  .shipping_handling_charge
                                              ) -
                                                parseInt(
                                                  this.props.offerBook
                                                    .shipping_handling_charge
                                                ) *
                                                  (parseInt(
                                                    this.props.offerBook
                                                      .offer_discount
                                                  ) /
                                                    100)
                                            )}
                                          </span>
                                        </p>

                                        <p
                                          style={{
                                            paddingLeft: "40%",
                                            color: " #000",
                                            fontWeight: "bold",
                                            marginBottom: "0.5rem",
                                          }}>
                                          <input
                                            type='checkbox'
                                            style={{ width: "20px" }}
                                            value='Wallet'
                                            id='CartWalletCheckBox'
                                            label='Get it Now'
                                            onClick={() =>
                                              this.getItNow(
                                                this.renderAmtUsed().total_amt
                                              )
                                            }
                                            checked={this.state.getItChecked}
                                          />{" "}
                                          Get it Now
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )
                              ) : null}
                            </div>
                            {/* --------------End of mobile offer book------------- */}
                            <div className='bg-heading p-2 shadow text-white d-flex justify-content-between'>
                              <div className='d-flex justify-content-center align-items-center'>
                                <span className='px-3'>
                                  My Cart ({this.getBookQty().notebookQty+this.getBookQty().newQty+this.getBookQty().oldQty})
                                </span>
                              </div>
                              <div
                                className='text-center'
                                onClick={() => {
                                  setShow(false);
                                }}></div>
                            </div>
                            <div className={` ${styles.cartDetails}`}>
                              {groupedArray2.length
                                ? groupedArray2.map(cartitem => {
                                    {
                                      console.log(cartitem, "CART");
                                    }
                                    return (
                                      <div
                                        key={cartitem.cart_id}
                                        style={
                                          {
                                          }
                                        }>
                                        {cartitem[1]
                                          .sort(function (a, b) {
                                            return b.Cart_id - a.Cart_id;
                                          })
                                          .map(cart => {
                                            return (
                                              <div
                                                className={` ${styles.cart_list_data}`}
                                                id='cartBookdataD'
                                                key={cart.bookInvId}>
                                                <div
                                                  className='row '
                                                  style={{
                                                    margin: "0",
                                                    // marginRight: "0.2rem",

                                                    padding: "0",
                                                  }}>
                                                  {false ? null : (
                                                    <div
                                                      style={{
                                                        marginTop: "0.4rem",
                                                      }}
                                                      className={`${styles.imagediv} col-2 col-sm-2 col-lg-2`}>
                                                      <img
                                                        style={{
                                                          width: "10vw",
                                                        }}
                                                        src={`https://d1f2zer3rm8sjv.cloudfront.net/${cart.bookThumb}`}
                                                        id='cartbookimg'
                                                        onError={e => {
                                                          e.target.onerror =
                                                            null;
                                                          e.target.src =
                                                            "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                                                          // "https://d1f2zer3rm8sjv.cloudfront.net/medium/book_default.jpeg"
                                                        }}
                                                      />
                                                    </div>
                                                  )}

                                                  <div className='col-10 col-sm-10 col-lg-10 '>
                                                    <Button
                                                      variant='outlined'
                                                      size='small'
                                                      style={{
                                                        textTransform:
                                                          "capitalize",
                                                        position: "absolute",
                                                        right: "1rem",
                                                        color: "#2248AE",
                                                      }}
                                                      data-pid = {cart.bookId}
                                                      onClick={() =>
                                                        this.ConfirmRemoveFromCart(
                                                          cart.bookInvId,
                                                          cart.Cart_id
                                                        )
                                                      }>
                                                      <DeleteIcon
                                                        fontSize='small'
                                                        style={{
                                                          color: "#2248AE",
                                                        }}
                                                      />
                                                      Remove
                                                    </Button>
                                                    <p
                                                      className='p'
                                                      style={{
                                                        fontSize: "0.9rem",
                                                        marginBottom: "0.5rem",
                                                        maxWidth: "50vw",
                                                      }}>
                                                      {ResizeTitle(
                                                        cart.bookName
                                                      )}
                                                    </p>
                                                    <div
                                                      className='d-block p d-flex justify-content-between '
                                                      style={{
                                                        fontSize: "0.8rem",
                                                      }}>
                                                      {cart.bookInvId
                                                        .toString()
                                                        .indexOf("NB") > -1 ? (
                                                        <span id='cartBookShippingS'>
                                                          Price: &#8377;
                                                          <span style ={{textDecoration:"line-through"}}> {cart.bookPrice}</span> 
                                                           &nbsp; &#8377;{Math.round(
                                                              cart.bookShippingCost
                                                            )}
                                                        </span>
                                                      ) : (
                                                        <div id='orgmrp'>
                                                          <p
                                                            style={{
                                                              margin: 0,
                                                            }}
                                                            id='cartBookpriceS'>
                                                            MRP: &#8377;
                                                            <span
                                                              id='cartBookPrice'
                                                              style={
                                                                cart.bookInvId
                                                                  .toString()
                                                                  .indexOf(
                                                                    "NB"
                                                                  ) > -1
                                                                  ? null
                                                                  : {
                                                                      textDecoration:
                                                                        "line-through",
                                                                    }
                                                              }>
                                                              {TotalPrice(
                                                                cart.bookPrice
                                                              )}
                                                            </span>
                                                            {cart.bookInvId
                                                                .toString()
                                                                .indexOf("KOL") >
                                                              -1 ?
                                                                <span className="text-success">
                                                                {" "}&#8377;
                                                                  {Math.round(
                                                                    cart.bookShippingCost
                                                                  )}{" "}({cart.discount_per}% Off)
                                                                </span>:
                                                              cart.bookInvId
                                                              .toString()
                                                              .indexOf("NB") >
                                                            -1 ? null : (
                                                              <span id='cartFree'>
                                                                (Free)
                                                              </span>
                                                            )}
                                                          </p>
                                                          {cart.bookInvId
                                                              .toString()
                                                              .indexOf("KOL") >
                                                            -1 ?(
                                                              <React.Fragment>
                                                                  <div style={{display:"flex",flexDirection:"column"}}>
                                                                    <span>Free Delivery</span>
                                                                    <div style={{display:"flex",alignItems:"center"}}>
                                                                      <span>Quantity</span>:
                                                                      <div style={{marginLeft:"0.25rem",display:"flex",alignItems:"center"}}>
                                                                        <span className="px-2" style={{}}>{cart.bookQty}</span>
                                                                        <Button variant="outlined" style={{textTransform:"capitalize"}} size="small" onClick={() => {
                                                                          this.openUpdateDialog(cart.bookInvId,cart.Cart_id,cart.bookQty,cart.bookId)
                                                                        }}>Update Quantity</Button>
                                                                        
                                                                        {/* <div className={styless.bulkArrowDiv}>
                                                                        <IconButton 
                                                                        onClick={() => {
                                                                        
                                                                          this.openUpdateDialog(cart.bookInvId, cart.Cart_id,cart.bookQty,"plus",cart.bookId)
                                                                          // this.setState({
                                                                          //   quantity_to_add:this.state.quantity_to_add+this.props.note_book_details.qty_group_by
                                                                          // })
                                                                        }}
                                                                        style={{borderBottom:"1px solid #2258ae",borderRadius:0,padding:"1px"}}>
                                                                        <KeyboardArrowUp fontSize="small" />


                                                                        </IconButton>
                                                                        <IconButton 
                                                                        onClick={() => {
                                                                          this.openUpdateDialog(cart.bookInvId, cart.Cart_id,cart.bookQty,"minus",cart.bookId)
                                                                        }}
                                                                        style={{borderRadius:0,padding:"1px"}}>
                                                                          <KeyboardArrowDown fontSize="small"/>
                                                                        </IconButton>
                                                                        </div> */}
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                              </React.Fragment>
                                                            ):
                                                            cart.bookInvId
                                                            .toString()
                                                            .indexOf("NB") >
                                                          -1 ? (
                                                            <React.Fragment>
                                                              {cart.delivery_cost ? (
                                                                <div>
                                                                  Delivery Cost
                                                                  :{" "}
                                                                  {
                                                                    cart.delivery_cost
                                                                  }
                                                                </div>
                                                              ) : null}
                                                            </React.Fragment>
                                                          ) : (
                                                            <React.Fragment>
                                                              <span id='cartBookShippingS'>
                                                                Shipping &
                                                                Handling charges
                                                                &nbsp; &#8377;
                                                                {Math.round(
                                                                  cart.bookShippingCost
                                                                )}
                                                              </span>
                                                              <br />
                                                              {/* <span id="CartchargeslineS">Charges</span> */}
                                                              <span id='cartBkShipChargeS'>
                                                                {/* &#8377;{Math.round(cart.bookShippingCost)} */}
                                                              </span>
                                                            </React.Fragment>
                                                          )}
                                                        </div>
                                                      )}
                                                    </div>
                                                    <div id='Bookinfo1'>
                                                      {this.props.OutOfStockBooks.includes(
                                                        cart.bookInvId
                                                      ) ? (
                                                        <p
                                                          className='p '
                                                          style={{
                                                            margin: 0,
                                                            fontSize: "0.8rem",
                                                            color: "red",
                                                            fontWeight: "bold",
                                                          }}>
                                                          Out Of Stock,Please
                                                          Remove It
                                                        </p>
                                                      ) : Math.round(
                                                          cart.bookShippingCost
                                                        ) == 0 ? (
                                                        <p
                                                          className='p'
                                                          style={{ margin: 0 }}>
                                                          Out Of Stock,Please
                                                          Remove It
                                                        </p>
                                                      ) : null}

                                                      {cart.bookInvId
                                                        .toString()
                                                        .indexOf("NB") > -1 &&
                                                      cart.offertype ? (
                                                        <p
                                                          id='yousaved'
                                                          style={{
                                                            color: "green",
                                                            fontSize: "0.8rem",
                                                          }}>
                                                          {cart.offertype ==
                                                          "cashback" ? (
                                                            <React.Fragment>
                                                              You Earned &#8377;{" "}
                                                              {Math.round(
                                                                cart.bookPrice
                                                              ) -
                                                                this.CashbackPrice(
                                                                  cart.bookPrice,
                                                                  cart.cashback_per
                                                                )}
                                                              <span
                                                                style={{
                                                                  color: "gray",
                                                                  fontSize:
                                                                    "12px",
                                                                  marginLeft:
                                                                    "5px",
                                                                }}>
                                                                (BookCoins of
                                                                Worth{" "}
                                                                {
                                                                  cart.cashback_per
                                                                }
                                                                % of{" "}
                                                                {cart.bookPrice}
                                                                )
                                                              </span>
                                                            </React.Fragment>
                                                          ) : (
                                                            <React.Fragment>
                                                              You Saved &#8377;
                                                              {Math.round(
                                                                cart.bookPrice
                                                              ) -
                                                                this.DicountedPrice(
                                                                  cart.bookPrice,
                                                                  cart.discount_per
                                                                )}{" "}
                                                              (Flat{" "}
                                                              {
                                                                cart.discount_per
                                                              }
                                                              % off)
                                                            </React.Fragment>
                                                          )}
                                                        </p>
                                                      ) : null}
                                                    </div>
                                                  </div>
                                                  <div>
                                                    <div
                                                      style={{
                                                        // display: "flex",
                                                        alignItems: "center",
                                                      }}
                                                      id='Bookinfo2'>
                                                      <div className='d-flex align-items-center'>
                                                      {false?null:

                                                        <div className='d-lg-block mt-2'>
                                                          {this.state
                                                            .saveLaterLoader &&
                                                          this.state
                                                            .btnClickedId ==
                                                            cart.bookId ? (
                                                            <Button
                                                              variant='outlined'
                                                              size='small'
                                                              style={{
                                                                minWidth:
                                                                  "5.3rem",
                                                                color:
                                                                  "#2248AE",
                                                                marginRight:
                                                                  "0.5rem",
                                                                textTransform:
                                                                  "capitalize",
                                                              }}
                                                              className='mr-2 mb-2'>
                                                              <CircularProgress
                                                                size={20}
                                                              />
                                                            </Button>
                                                          ) : (
                                                            <Button
                                                              variant='outlined'
                                                              size='small'
                                                              style={{
                                                                minWidth:
                                                                  "5.3rem",
                                                                color:
                                                                  "#2248AE",
                                                                textTransform:
                                                                  "capitalize",
                                                                marginRight:
                                                                  "0.5rem",
                                                              }}
                                                              className='mr-2 mb-2'
                                                              data-pid = {cart.bookId}
                                                              onClick={() => {
                                                                this.saveLaterhand(
                                                                  cart
                                                                );
                                                              }}>
                                                              Save later
                                                            </Button>
                                                          )}
                                                        </div>
                                                    }
                                                    {false?null
                                                    :
                                                        <div className='d-lg-block mt-2'>
                                                          {cart.bookInvId
                                                            .toString()
                                                            .indexOf("NB") >
                                                          -1 ? (
                                                            <>
                                                              {this.state
                                                                .moveToWishlistLoader &&
                                                              this.state
                                                                .btnClickedId ==
                                                                cart.bookId ? (
                                                                <Button
                                                                  variant='outlined'
                                                                  size='small'
                                                                  style={{
                                                                    minWidth:
                                                                      "9.1rem",
                                                                    color:
                                                                      "#2248AE",
                                                                    textTransform:
                                                                      "capitalize",
                                                                  }}
                                                                  className='mr-2 mb-2'>
                                                                  <CircularProgress
                                                                    size={20}
                                                                  />
                                                                </Button>
                                                              ) : (
                                                                <Button
                                                                  variant='outlined'
                                                                  size='small'
                                                                  style={{
                                                                    minWidth:
                                                                      "9.1rem",
                                                                    color:
                                                                      "#2248AE",
                                                                    textTransform:
                                                                      "capitalize",
                                                                  }}
                                                                  className='mr-2 mb-2'
                                                                  onClick={() =>
                                                                    this.MoveToWishlistAlert(
                                                                      cart
                                                                    )
                                                                  }>
                                                                  <FavoriteBorderOutlinedIcon fontSize='small' />{" "}
                                                                  Move to
                                                                  Wishlist
                                                                </Button>
                                                              )}
                                                            </>
                                                          ) : (
                                                            <React.Fragment>
                                                              {this.state
                                                                .moveToWishlistLoader &&
                                                              this.state
                                                                .btnClickedId ==
                                                                cart.bookId ? (
                                                                <Button
                                                                  variant='outlined'
                                                                  size='small'
                                                                  style={{
                                                                    minWidth:
                                                                      "9.1rem",
                                                                    color:
                                                                      "#2248AE",
                                                                    textTransform:
                                                                      "capitalize",
                                                                  }}
                                                                  className='mr-2 mb-2'>
                                                                  <CircularProgress
                                                                    size={20}
                                                                  />
                                                                </Button>
                                                              ) : (
                                                                <Button
                                                                  variant='outlined'
                                                                  size='small'
                                                                  style={{
                                                                    color:
                                                                      "#2248AE",
                                                                    textTransform:
                                                                      "capitalize",
                                                                  }}
                                                                  className='mr-2 mb-2'
                                                                  onClick={() =>
                                                                    this.MoveToWishlistAlert(
                                                                      cart
                                                                    )
                                                                  }>
                                                                  <FavoriteBorderOutlinedIcon fontSize='small' />{" "}
                                                                  Move to
                                                                  Wishlist
                                                                </Button>
                                                              )}
                                                              <br />
                                                              <span id='cartBkShipChargeS'></span>
                                                            </React.Fragment>
                                                          )}
                                                        </div>
                                                    }
                                                      </div>
                                                      <div
                                                        style={{
                                                          marginTop: "0.3rem",
                                                        }}
                                                        id='offerdiv'>
                                                        {cart.bookInvId
                                                          .toString()
                                                          .indexOf("NB") > -1 &&
                                                        cart.bookInvId !=
                                                          "NB1441502" ? (
                                                          <div>
                                                            <Button
                                                              size='small'
                                                              className='mr-2'
                                                              variant={
                                                                "outlined"
                                                              }
                                                              style={{
                                                                textTransform:
                                                                  "capitalize",
                                                                marginRight:
                                                                  "0.5rem",
                                                              }}
                                                              onClick={e =>
                                                                this.onOfferChanged(
                                                                  e,
                                                                  "discount",
                                                                  cart
                                                                )
                                                              }
                                                              name='offerType'
                                                              value='discount'
                                                              disabled={
                                                                offerLoading
                                                              }>
                                                              <span
                                                                style={{
                                                                  display:
                                                                    "flex",
                                                                  alignItems:
                                                                    "center",
                                                                }}>
                                                                {offerLoading &&
                                                                OfferCartId ===
                                                                  cart.Cart_id ? (
                                                                  <CircularProgress
                                                                    size={16}
                                                                  />
                                                                ) : (
                                                                  <input
                                                                    checked={
                                                                      cart.offertype ==
                                                                      "discount"
                                                                    }
                                                                    style={{
                                                                      marginRight:
                                                                        "0.3rem",
                                                                    }}
                                                                    type={
                                                                      "radio"
                                                                    }
                                                                  />
                                                                )}
                                                                Flat{" "}
                                                                {
                                                                  cart.discount_per
                                                                }
                                                                %off
                                                              </span>
                                                            </Button>

                                                            <Button
                                                              size='small'
                                                              variant={
                                                                "outlined"
                                                              }
                                                              style={{
                                                                textTransform:
                                                                  "capitalize",
                                                              }}
                                                              onClick={e =>
                                                                this.onOfferChanged(
                                                                  e,
                                                                  "cashback",
                                                                  cart
                                                                )
                                                              }
                                                              disabled={
                                                                offerLoading
                                                              }>
                                                              <span
                                                                style={{
                                                                  display:
                                                                    "flex",
                                                                  alignItems:
                                                                    "center",
                                                                }}>
                                                                {offerLoading &&
                                                                OfferCartId ===
                                                                  cart.Cart_id ? (
                                                                  <CircularProgress
                                                                    size={16}
                                                                    style={{ color: "#fff" }}
                                                                  />
                                                                ) : (
                                                                  <input
                                                                    checked={
                                                                      cart.offertype ==
                                                                      "cashback"
                                                                    }
                                                                    style={{
                                                                      marginRight:
                                                                        "0.3rem",
                                                                    }}
                                                                    type={
                                                                      "radio"
                                                                    }
                                                                  />
                                                                )}
                                                                ₹
                                                                {Math.round(
                                                                  cart.bookPrice
                                                                ) -
                                                                  this.CashbackPrice(
                                                                    cart.bookPrice,
                                                                    cart.cashback_per
                                                                  )}{" "}
                                                                worth Bookcoins
                                                              </span>
                                                            </Button>

                                                            {/* End of popup mediaQuery */}
                                                          </div>
                                                        ) : null}
                                                      </div>
                                                    </div>
                                                    <div></div>
                                                  </div>
                                                </div>
                                                {/* end of leftdetail */}
                                              </div>
                                            );
                                          })}
                                        <div
                                          style={{
                                            background: "white",
                                            display: "flex",
                                            justifyContent: "end",
                                            // marginTop: "0.8rem",
                                          }}>
                                          <div
                                            style={{
                                              padding: "0.3rem",
                                            }}>
                                            {cartitem[0] == 1 ? (
                                              Vendor_wise_delivery_cost(
                                                cartitem
                                              ) != 0 ? (
                                                <p style={{ marginTop: "0px" }}>
                                                  Total Delivery Charge: ₹
                                                  {Vendor_wise_delivery_cost(
                                                    cartitem
                                                  )}
                                                </p>
                                              ) : cartitem[0] ==
                                                0 ? null : Vendor_wise_delivery_cost(
                                                  cartitem
                                                ) != 0 ? (
                                                <p>
                                                  Total Delivery Charge: ₹
                                                  {Vendor_wise_delivery_cost(
                                                    cartitem
                                                  )}
                                                </p>
                                              ) : null
                                            ) : null}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })
                                : null}
                            </div>
                          </div>
                          <div
                            className='cart_right col-12 col-sm-12 col-lg-12 shadow'
                            style={{ padding: "0", margin: "0" }}>
                            <div
                              style={{
                                margin: "0",
                                padding: "0",
                                // marginBottom: "2rem",
                              }}>
                              <div className='bg-white m-2 pb-4'>
                                <table
                                  className='table table-borderless '
                                  id='paymentdiv'
                                  ref={this.paymentdiv}>
                                  <tbody
                                    style={{
                                      color: "#737373",
                                      fontSize: "0.84rem",
                                    }}>
                                    {this.getBookQty().newQty == 0 ? null : (
                                      <tr>
                                        {this.isMaskPresentMask().mask == 1 ? (
                                          <td className='p-1 p-sm-auto'>
                                            Product Price
                                          </td>
                                        ) : (
                                          <td className='p-1 p-sm-auto'>
                                            New Book Price
                                          </td>
                                        )}
                                        <td className='p-1 p-sm-auto'>
                                          <span id='BookPricediv'>
                                            {" "}
                                            &#8377;
                                            {Math.round(
                                              this.renderAmtUsed().newBookPrice
                                            )}
                                          </span>
                                          <span id='newbookqyt'>
                                            (
                                            {this.isMaskPresentMask()
                                              .book_and_mask == 1
                                              ? this.getBookQty().newQty - 1
                                              : this.getBookQty().newQty}{" "}
                                            {this.isMaskPresentMask().mask == 1
                                              ? this.isMaskPresentMask()
                                                  .book_and_mask == 1
                                                ? `Book and mask`
                                                : ` Set mask`
                                              : this.getBookQty().newQty == 1?`Book`:` Books`}
                                            )
                                          </span>
                                        </td>
                                      </tr>
                                    )}
                                    {this.getBookQty().newQty == 0 ? null : (
                                      <tr>
                                        <td className='p-1 p-sm-auto'>
                                          New Book Delivery Charges
                                        </td>
                                        <td className='p-1 p-sm-auto'>
                                          <span id='DeliveryPricediv'>
                                            {" "}
                                            &#8377;
                                            {Math.round(
                                              this.renderAmtUsed()
                                                .newBookDeliveryCost
                                            )}
                                          </span>
                                        </td>
                                      </tr>
                                    )}
                                    {this.getBookQty().oldQty>0?
                                    <tr>
                                      <td className='p-1 p-sm-auto'>
                                      Shipping & Handling ( Used Books )
                                      </td>
                                      <td className='p-1 p-sm-auto'>
                                        <span id='ShippingPricediv'>
                                          {" "}
                                          &#8377;
                                          {Math.round(
                                            this.renderAmtUsed().oldBookPrice
                                          )}
                                          <span
                                            id='donbook'
                                            style={{ textAlign: "justify" }}>
                                            &nbsp;(
                                            {this.getBookQty().oldQty}&nbsp;
                                            {this.getBookQty().oldQty == 1
                                              ? "Book"
                                              : "Books"}
                                            )
                                          </span>
                                        </span>
                                      </td>
                                    </tr>:null
                                    }

                                    {this.getBookQty().notebookQty>0?
                                <tr>
                                  <td className='p-1 p-sm-auto'>
                                    Notebook Price (Incl. all taxes)
                                  </td>
                                  <td className='p-1 p-sm-auto'>
                                    <span id='ShippingPricediv'>
                                      {" "}
                                      &#8377;
                                      {Math.round(
                                        this.renderAmtUsed().noteBookPrice
                                      )}
                                      <span id='donbook'>
                                        &nbsp;(
                                        {this.getBookQty().notebookQty}{" "}
                                        {this.getBookQty().notebookQty == 1
                                          ? "Item"
                                          : "Items"}{" "}
                                        )
                                      </span>
                                    </span>
                                  </td>
                                </tr>:null
                                }

                                    {this.renderAmtUsed().offer_book_cost ? (
                                      <tr>
                                        <td className='p-1 p-sm-auto'>
                                          Offered Book
                                        </td>
                                        <td className='p-1 p-sm-auto'>
                                          <span id='ShippingPricediv'>
                                            {" "}
                                            &#8377;
                                            {
                                              this.renderAmtUsed()
                                                .offer_book_cost
                                            }
                                          </span>
                                        </td>
                                      </tr>
                                    ) : null}
                                     {this.state.min_prepaid_order_value - this.fetchcalculatedAllBookPrice().all_books_price-this.fetchcalculatedAllBookPrice().newBookDeliveryCost>0?
                              <tr>
                                  <td className='p-1 p-sm-auto'>
                                    Minimum order value difference
                                  </td>
                                  <td
                                    className='p-1 p-sm-auto text-nowrap'
                                    style={{}}>
                                    
                                      
                                      &#8377;
                                      {this.state.min_prepaid_order_value - this.fetchcalculatedAllBookPrice().all_books_price -this.fetchcalculatedAllBookPrice().newBookDeliveryCost}
                                
                                  </td>
                                </tr>:null}
                                    <tr style={{ fontSize: "0.97rem" }}>
                                      <td className='text-success p-1 p-sm-auto'>
                                        <b>Total Amount</b>
                                      </td>
                                      <td
                                        className='p-1 p-sm-auto text-nowrap'
                                        style={{}}>
                                        <b text-success id='Totalpricediv'>
                                          &#8377;
                                          {this.props.ItemsInCart !== 0
                                            ? this.renderAmtUsed().total_order_value
                                            : 0}
                                        </b>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            {/* End of Final paymentdiv */}
                          </div>

                          <div
                            className='border shadow'
                            style={{
                              padding: "0.8rem 0.8rem",
                              background: "#fff",
                              position: "fixed",
                              // bottom: "3.4rem",
                              bottom: "0",
                              left: "0",
                              zIndex: "1050",
                              width: "100vw",
                            }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}>
                              <div
                                className='fw-bold d-flex align-items-center'
                                style={{ marginLeft: "0.15rem" }}>
                                &#8377; &nbsp;
                                {this.props.ItemsInCart !== 0
                                  ? this.renderAmtUsed().total_amt
                                  : 0}{" "}
                                <InfoIcon
                                  style={{ color: "gray" }}
                                  onClick={() => this.goToDiv("paymentdiv")}
                                />
                              </div>
                              <Button
                              
                                className=' text-white p-3 mb-1 fw-bold'
                                onClick={e => this.proceedtoCheckout(e)}
                                style={{
                                  minWidth: "16rem",
                                  maxWidth: "16rem",
                                  backgroundColor: "#f35631",
                                  // backgroundColor: "#098041",
                                  textTransform: "capitalize",
                                  outline: "none",
                                }}>
                                Proceed To Checkout <ArrowForwardIcon />
                              </Button>
                            </div>
                          </div>
                          <div>
                            {this.props.SaveLaterData.length ? (
                              <div className='bg-heading p-2 bg-white text-white d-flex justify-content-between'>
                                <div className='d-flex justify-content-center align-items-center'>
                                  <span className='px-3'>
                                    Save Later (
                                    {this.props.SaveLaterData.length})
                                  </span>

                                  {/* <Image src={assured} width={100} height={25} className="" alt='assured_img' /> */}
                                </div>
                                <div
                                  className='text-center'
                                  onClick={() => {
                                    setShow(false);
                                  }}>
                                  {/* <KeyboardArrowDownIcon /> */}
                                </div>
                              </div>
                            ) : null}
                            {/* =========================Save Later For Mobile====================== */}
                            <div className={`${styles.cartDetails}  mb-5`}>
                              {this.props.SaveLaterData.length
                                ? this.props.SaveLaterData.map(cart => {
                                    return (
                                      <div
                                        className={` ${styles.cart_list_data}`}
                                        id='cartBookdataD'
                                        key={cart.bookInvId}>
                                        <div
                                          className='row '
                                          style={{
                                            margin: "0",
                                            // marginRight: "0.2rem",

                                            padding: "0",
                                          }}>
                                          {false ? null : (
                                            <div
                                              style={{
                                                // border: "1px solid red",

                                                marginTop: "0.4rem",
                                                // width: "8.313rem",
                                                // height: "8.838rem",
                                              }}
                                              className={`${styles.imagediv} col-2 col-sm-2 col-lg-2`}>
                                              <img
                                                style={{
                                                  width: "10vw",

                                                  //   height: "100%",
                                                }}
                                                src={`https://d1f2zer3rm8sjv.cloudfront.net/${cart.bookThumb}`}
                                                id='cartbookimg'
                                                onError={e => {
                                                  e.target.onerror = null;
                                                  e.target.src =
                                                    "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                                                  // "https://d1f2zer3rm8sjv.cloudfront.net/medium/book_default.jpeg"
                                                }}
                                              />
                                            </div>
                                          )}

                                          <div className='col-10 col-sm-10 col-lg-10 '>
                                            <Button
                                              variant='outlined'
                                              size='small'
                                              style={{
                                                textTransform: "capitalize",
                                                position: "absolute",
                                                right: "1rem",
                                                color: "#2248AE",
                                              }}
                                              data-pid = {cart.bookId}
                                              onClick={() =>
                                                this.ConfirmRemoveFromSaveLater(
                                                  cart.bookInvId,
                                                  cart.Cart_id
                                                )
                                              }>
                                              <DeleteIcon
                                                fontSize='small'
                                                style={{
                                                  color: "#2248AE",
                                                }}
                                              />
                                              Remove
                                            </Button>
                                            <p
                                              className='p'
                                              style={{
                                                fontSize: "0.9rem",
                                                marginBottom: "0.5rem",
                                                maxWidth: "50vw",
                                              }}>
                                              {ResizeTitle(cart.bookName)}
                                            </p>
                                            <div
                                              className='d-block p d-flex justify-content-between '
                                              style={{
                                                fontSize: "0.8rem",
                                              }}>
                                              {cart.bookInvId
                                                .toString()
                                                .indexOf("NB") > -1 ? (
                                                <span id='cartBookShippingS'>
                                                  Price: &#8377;
                                                  {Math.round(
                                                    cart.bookShippingCost
                                                  )}
                                                </span>
                                              ) : (
                                                <div id='orgmrp'>
                                                  <p
                                                    style={{
                                                      margin: 0,
                                                    }}
                                                    id='cartBookpriceS'>
                                                    MRP: &#8377;
                                                    <span
                                                      id='cartBookPrice'
                                                      style={
                                                        cart.bookInvId
                                                          .toString()
                                                          .indexOf("NB") > -1
                                                          ? null
                                                          : {
                                                              textDecoration:
                                                                "line-through",
                                                            }
                                                      }>
                                                      {TotalPrice(
                                                        cart.bookPrice
                                                      )}
                                                    </span>
                                                    {cart.bookInvId
                                                      .toString()
                                                      .indexOf("NB") >
                                                    -1 ? null : (
                                                      <span id='cartFree'>
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
                                                      <span id='cartBookShippingS'>
                                                        Shipping & Handling
                                                        charges &nbsp; &#8377;
                                                        {Math.round(
                                                          cart.bookShippingCost
                                                        )}
                                                      </span>
                                                      <br />
                                                      {/* <span id="CartchargeslineS">Charges</span> */}
                                                      <span id='cartBkShipChargeS'>
                                                        {/* &#8377;{Math.round(cart.bookShippingCost)} */}
                                                      </span>
                                                    </React.Fragment>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                            <div id='Bookinfo1'>
                                              {this.props.OutOfStockBooks.includes(
                                                cart.bookInvId
                                              ) ? (
                                                <p
                                                  className='p '
                                                  style={{
                                                    margin: 0,
                                                    fontSize: "0.8rem",
                                                    color: "red",
                                                    fontWeight: "bold",
                                                  }}>
                                                  Out Of Stock,Please Remove It
                                                </p>
                                              ) : Math.round(
                                                  cart.bookShippingCost
                                                ) == 0 ? (
                                                <p
                                                  className='p'
                                                  style={{ margin: 0 }}>
                                                  Out Of Stock,Please Remove It
                                                </p>
                                              ) : null}

                                              {cart.bookInvId
                                                .toString()
                                                .indexOf("NB") > -1 &&
                                              cart.offertype ? (
                                                <p
                                                  id='yousaved'
                                                  style={{
                                                    color: "green",
                                                    fontSize: "0.8rem",
                                                  }}>
                                                  {cart.offertype ==
                                                  "cashback" ? (
                                                    <React.Fragment>
                                                      You Earned &#8377;{" "}
                                                      {Math.round(
                                                        cart.bookPrice
                                                      ) -
                                                        this.CashbackPrice(
                                                          cart.bookPrice,
                                                          cart.cashback_per
                                                        )}
                                                      <span
                                                        style={{
                                                          color: "gray",
                                                          fontSize: "12px",
                                                          marginLeft: "5px",
                                                        }}>
                                                        (BookCoins of Worth{" "}
                                                        {cart.cashback_per}% of{" "}
                                                        {cart.bookPrice})
                                                      </span>
                                                    </React.Fragment>
                                                  ) : (
                                                    <React.Fragment>
                                                      You Saved &#8377;
                                                      {Math.round(
                                                        cart.bookPrice
                                                      ) -
                                                        this.DicountedPrice(
                                                          cart.bookPrice,
                                                          cart.discount_per
                                                        )}{" "}
                                                      (Flat {cart.discount_per}%
                                                      off)
                                                    </React.Fragment>
                                                  )}
                                                </p>
                                              ) : null}
                                            </div>
                                          </div>
                                          <div>
                                            <div
                                              style={{
                                                // display: "flex",
                                                alignItems: "center",
                                              }}
                                              id='Bookinfo2'>
                                              <div className='d-flex align-items-center'>
                                                <div className='d-lg-block mt-2'>
                                                  {this.state
                                                    .moveToCartLoader &&
                                                  this.state.btnClickedId ==
                                                    cart.bookId ? (
                                                    <Button
                                                      variant='outlined'
                                                      size='small'
                                                      style={{
                                                        color: "#2248AE",
                                                        minWidth: "6.4rem",
                                                        textTransform:
                                                          "capitalize",
                                                        marginRight: "0.5rem",
                                                      }}
                                                      className='mr-2 mb-2'>
                                                      <CircularProgress
                                                        size={20}
                                                      />
                                                    </Button>
                                                  ) : (
                                                    <Button
                                                      variant='outlined'
                                                      size='small'
                                                      style={{
                                                        color: "#2248AE",
                                                        minWidth: "6.4rem",
                                                        textTransform:
                                                          "capitalize",
                                                        marginRight: "0.5rem",
                                                      }}
                                                      className='mr-2 mb-2'
                                                      data-pid = {cart.bookId}
                                                      onClick={() => {
                                                        this.movetoCarthand(
                                                          cart
                                                        );
                                                      }}>
                                                      Move to Cart
                                                    </Button>
                                                  )}
                                                </div>
                                                <div className='d-lg-block mt-2'>
                                                  {cart.bookInvId
                                                    .toString()
                                                    .indexOf("NB") > -1 ? (
                                                    <>
                                                      {this.state
                                                        .moveToWishlistLoader &&
                                                      this.state.btnClickedId ==
                                                        cart.bookId ? (
                                                        <Button
                                                          variant='outlined'
                                                          size='small'
                                                          style={{
                                                            minWidth: "9.1rem",
                                                            color: "#2248AE",
                                                            textTransform:
                                                              "capitalize",
                                                          }}
                                                          className='mr-2 mb-2'>
                                                          <CircularProgress
                                                            size={20}
                                                          />
                                                        </Button>
                                                      ) : (
                                                        <Button
                                                          variant='outlined'
                                                          size='small'
                                                          style={{
                                                            minWidth: "9.1rem",
                                                            color: "#2248AE",
                                                            textTransform:
                                                              "capitalize",
                                                          }}
                                                          className='mr-2 mb-2'
                                                          onClick={() =>
                                                            this.MoveToWishlistAlert(
                                                              cart
                                                            )
                                                          }>
                                                          <FavoriteBorderOutlinedIcon fontSize='small' />{" "}
                                                          Move to Wishlist
                                                        </Button>
                                                      )}
                                                    </>
                                                  ) : (
                                                    <React.Fragment>
                                                      {this.state
                                                        .moveToWishlistLoader &&
                                                      this.state.btnClickedId ==
                                                        cart.bookId ? (
                                                        <Button
                                                          variant='outlined'
                                                          size='small'
                                                          style={{
                                                            minWidth: "9.1rem",
                                                            color: "#2248AE",
                                                            textTransform:
                                                              "capitalize",
                                                          }}
                                                          className='mr-2 mb-2'>
                                                          <CircularProgress
                                                            size={20}
                                                          />
                                                        </Button>
                                                      ) : (
                                                        <Button
                                                          variant='outlined'
                                                          size='small'
                                                          style={{
                                                            color: "#2248AE",
                                                            textTransform:
                                                              "capitalize",
                                                          }}
                                                          className='mr-2 mb-2'
                                                          onClick={() =>
                                                            this.MoveToSaveLaterWishlistAlert(
                                                              cart
                                                            )
                                                          }>
                                                          <FavoriteBorderOutlinedIcon fontSize='small' />{" "}
                                                          Move to Wishlist
                                                        </Button>
                                                      )}
                                                      <br />
                                                      {/* <span id="CartchargeslineS">Charges</span> */}
                                                      <span id='cartBkShipChargeS'>
                                                        {/* &#8377;{Math.round(cart.bookShippingCost)} */}
                                                      </span>
                                                    </React.Fragment>
                                                  )}
                                                </div>
                                              </div>
                                              <div
                                                style={{
                                                  marginTop: "0.3rem",
                                                }}
                                                id='offerdiv'>
                                                {cart.bookInvId
                                                  .toString()
                                                  .indexOf("NB") > -1 &&
                                                cart.bookInvId !=
                                                  "NB1441502" ? (
                                                  <div>
                                                    <Button
                                                      size='small'
                                                      className='mr-2'
                                                      variant={"outlined"}
                                                      style={{
                                                        textTransform:
                                                          "capitalize",
                                                        marginRight: "0.5rem",
                                                      }}
                                                      onClick={e =>
                                                        this.onOfferChanged(
                                                          e,
                                                          "discount",
                                                          cart
                                                        )
                                                      }
                                                      name='offerType'
                                                      value='discount'
                                                      disabled={offerLoading}>
                                                      <span
                                                        style={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                        }}>
                                                        {offerLoading &&
                                                        OfferCartId ===
                                                          cart.Cart_id ? (
                                                          <CircularProgress
                                                            size={16}
                                                          />
                                                        ) : (
                                                          <input
                                                            checked={
                                                              cart.offertype ==
                                                              "discount"
                                                            }
                                                            style={{
                                                              marginRight:
                                                                "0.3rem",
                                                            }}
                                                            type={"radio"}
                                                          />
                                                        )}
                                                        Flat {cart.discount_per}
                                                        %off
                                                      </span>
                                                    </Button>

                                                    <Button
                                                      size='small'
                                                      variant={"outlined"}
                                                      style={{
                                                        textTransform:
                                                          "capitalize",
                                                      }}
                                                      onClick={e =>
                                                        this.onOfferChanged(
                                                          e,
                                                          "cashback",
                                                          cart
                                                        )
                                                      }
                                                      disabled={offerLoading}>
                                                      <span
                                                        style={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                        }}>
                                                        {offerLoading &&
                                                        OfferCartId ===
                                                          cart.Cart_id ? (
                                                          <CircularProgress
                                                            size={16}
                                                            style={{ color: "#fff" }}
                                                          />
                                                        ) : (
                                                          <input
                                                            checked={
                                                              cart.offertype ==
                                                              "cashback"
                                                            }
                                                            style={{
                                                              marginRight:
                                                                "0.3rem",
                                                            }}
                                                            type={"radio"}
                                                          />
                                                        )}
                                                        ₹
                                                        {Math.round(
                                                          cart.bookPrice
                                                        ) -
                                                          this.CashbackPrice(
                                                            cart.bookPrice,
                                                            cart.cashback_per
                                                          )}{" "}
                                                        worth Bookcoins
                                                      </span>
                                                    </Button>

                                                    {/* End of popup mediaQuery */}
                                                  </div>
                                                ) : null}
                                              </div>
                                            </div>
                                            <div></div>
                                          </div>
                                        </div>
                                        {/* end of leftdetail */}
                                      </div>
                                    );
                                  })
                                : null}
                            </div>
                          </div>
                        </div>
                      </MediaQuery>
                      {/* End Of Left Part */}
                      <div className={` ${styles.priceDetails} cart_right col-12 col-sm-4 col-lg-4 `}>
                        <div className={`${styles.cart_right_inner} bg-white `}>
                          {this.state.minordervalue ? (
                            <div className='d-flex text-danger opacity-75'>
                              <div>
                                <WarningAmberIcon small />
                              </div>
                              &nbsp;
                              <div
                                style={{
                                  fontSize: "0.8rem",
                                  lineHeight: "0.9rem",
                                }}>
                                <span>
                                  Minimum order value should be Rs.{" "}
                                  {`${this.state.minordervalue}`}, Please add
                                  more Books else proceed to pay Rs.
                                  {`${this.state.minordervalue}`} and place your
                                  order
                                </span>
                              </div>
                            </div>
                          ) : null}
                          <div
                            className='bg-white mb-4 p-2 p-sm-4'
                            style={{ minHeight: "13rem" }}>
                            <table className='table table-borderless '>
                              <tbody
                                style={{
                                  color: "#737373",
                                  fontSize: "0.84rem",
                                }}>
                                {this.getBookQty().newQty == 0 ? null : (
                                  <tr>
                                    {this.isMaskPresentMask().mask == 1 ? (
                                      <td className='p-1 p-sm-auto'>
                                        Product Price
                                      </td>
                                    ) : (
                                      <td className='p-1 p-sm-auto'>
                                        New Book Price
                                      </td>
                                    )}
                                    <td className='p-1 p-sm-auto'>
                                      <span id='BookPricediv'>
                                        {" "}
                                        &#8377;
                                        {Math.round(
                                          this.renderAmtUsed().newBookPrice
                                        )}
                                      </span>
                                      <span id='newbookqyt'>
                                        (
                                        {this.isMaskPresentMask()
                                          .book_and_mask == 1
                                          ? this.getBookQty().newQty - 1
                                          : this.getBookQty().newQty}{" "}
                                        {this.isMaskPresentMask().mask == 1
                                          ? this.isMaskPresentMask()
                                              .book_and_mask == 1
                                            ? `Book and mask`
                                            : ` Set mask`
                                          :this.getBookQty().newQty == 1?`Book`: `Books`}
                                        )
                                      </span>
                                    </td>
                                  </tr>
                                )}
                                {this.getBookQty().newQty == 0 ? null : (
                                  <tr>
                                    <td className='p-1 p-sm-auto'>
                                      New Book Delivery Charges
                                    </td>
                                    <td className='p-1 p-sm-auto'>
                                      <span id='DeliveryPricediv'>
                                        {" "}
                                        &#8377;
                                        {Math.round(
                                          this.renderAmtUsed()
                                            .newBookDeliveryCost
                                        )}
                                      </span>
                                    </td>
                                  </tr>
                                )}
                                {this.getBookQty().oldQty>0?
                                <tr>
                                  <td className='p-1 p-sm-auto'>
                                  Shipping & Handling ( Used Books )
                                  </td>
                                  <td className='p-1 p-sm-auto'>
                                    <span id='ShippingPricediv'>
                                      {" "}
                                      &#8377;
                                      {Math.round(
                                        this.renderAmtUsed().oldBookPrice
                                      )}
                                      <span id='donbook'>
                                        &nbsp;(
                                        {this.getBookQty().oldQty}{" "}
                                        {this.getBookQty().oldQty == 1
                                          ? "Book"
                                          : "Books"}{" "}
                                        )
                                      </span>
                                    </span>
                                  </td>
                                </tr>:null
                                }

                                {this.getBookQty().notebookQty>0?
                                <tr>
                                  <td className='p-1 p-sm-auto'>
                                    Notebook Price (Incl. all taxes)
                                  </td>
                                  <td className='p-1 p-sm-auto'>
                                    <span id='ShippingPricediv'>
                                      {" "}
                                      &#8377;
                                      {Math.round(
                                        this.renderAmtUsed().noteBookPrice
                                      )}
                                      <span id='donbook'>
                                        &nbsp;(
                                        {this.getBookQty().notebookQty}{" "}
                                        {this.getBookQty().notebookQty == 1
                                          ? "Item"
                                          : "Items"}{" "}
                                        )
                                      </span>
                                    </span>
                                  </td>
                                </tr>:null
                                }

                                {this.renderAmtUsed().offer_book_cost ? (
                                  <tr>
                                    <td className='p-1 p-sm-auto'>
                                      Offered Book
                                    </td>
                                    <td className='p-1 p-sm-auto'>
                                      <span id='ShippingPricediv'>
                                        {" "}
                                        &#8377;
                                        {this.renderAmtUsed().offer_book_cost}
                                      </span>
                                    </td>
                                  </tr>
                                ) : null}

                             {this.state.min_prepaid_order_value - this.fetchcalculatedAllBookPrice().all_books_price-this.fetchcalculatedAllBookPrice().newBookDeliveryCost>0?
                              <tr>
                                  <td className='p-1 p-sm-auto'>
                                    Minimum order value difference
                                  </td>
                                  <td
                                    className='p-1 p-sm-auto text-nowrap'
                                    style={{}}>
                                    
                                      
                                      &#8377;
                                      {this.state.min_prepaid_order_value - this.fetchcalculatedAllBookPrice().all_books_price-this.fetchcalculatedAllBookPrice().newBookDeliveryCost}
                                
                                  </td>
                                </tr>:null}
                                <tr style={{ fontSize: "0.97rem" }}>
                                  <td className='text-success p-1 p-sm-auto'>
                                    <b>Total Amount</b>
                                  </td>
                                  <td
                                    className='p-1 p-sm-auto text-nowrap'
                                    style={{}}>
                                    <b
                                      className='text-success'
                                      id='Totalpricediv'>
                                      &#8377;
                                      {this.props.ItemsInCart !== 0
                                        ? this.renderAmtUsed().total_order_value
                                        : 0}
                                    </b>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div></div>
                          <Button
                          
                            className='w-100 py-3 text-white shadow'
                            onClick={e => this.proceedtoCheckout(e)}
                            variant='contained'
                            color='warning'
                            style={{
                              backgroundColor: "#f35631",
                              textTransform: "capitalize",
                              outline: "none",
                            }}>
                            Proceed to Checkout <ArrowForwardIcon />
                          </Button>
                        </div>

                        {/* End of Final paymentdiv */}
                      </div>

                      {/* end of right part */}
                    </div>
                  </React.Fragment>
                )
              ) : (
                <React.Fragment>
                  <div
                    style={{
                      marginTop: "10%",
                      textAlign: "center",
                      padding: "5rem",
                    }}>
                    <div>
                      <div>
                        <ShoppingCartIcon style={{ fontSize: "100px" }} />
                      </div>
                      Missing Cart items?
                      <div style={{ padding: "1rem 0rem" }}>
                        Login to see the items you added previously
                      </div>
                    </div>

                    <Button
                      variant='contained'
                      color='primary'
                      onClick={this.RedirectLoginPage}>
                      Login
                    </Button>
                  </div>
                </React.Fragment>
              )}
              <MediaQuery minWidth={769}>
                <Popup
                  open={this.state.offerBookPopup}
                  onClose={() => this.setState({ offerBookPopup: false })}
                  contentStyle={{
                    width: "30vw",
                    borderRadius: "5px",
                    padding: "1%",
                  }}>
                  <React.Fragment>
                    <p>
                      Add Few more books in your cart to make order value
                      &#8377; {this.props.offerBook.compare_price} and get this
                      book absolutely <b>FREE</b> <br />
                      (Your order value should be &#8377;{" "}
                      {this.props.offerBook.compare_price} or above)
                    </p>
                    <center>
                      {" "}
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={this.closeoffer}>
                        No, I don't Want
                      </Button>{" "}
                    </center>
                    <p
                      onClick={this.closeoffer}
                      style={{
                        textAlign: "center",
                        cursor: "pointer",
                        paddingTop: "1%",
                        color: "blue",
                        fontWeight: "bold",
                      }}>
                      YES, I WANT{" "}
                    </p>
                  </React.Fragment>
                </Popup>
              </MediaQuery>

              <MediaQuery maxWidth={768}>
                <Popup
                  open={this.state.offerBookPopup}
                  onClose={() => this.setState({ offerBookPopup: false })}
                  contentStyle={{
                    width: "80vw",
                    borderRadius: "5px",
                    padding: "1%",
                  }}>
                  <React.Fragment>
                    <p>
                      Add Few more book in your cart and get this book
                      absolutely <b>FREE</b> <br />
                      (Your order value should be &#8377;{" "}
                      {this.props.offerBook.compare_price} or above)
                    </p>
                    <center>
                      {" "}
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={this.closeoffer}>
                        No, I don't Want
                      </Button>{" "}
                    </center>
                  </React.Fragment>
                </Popup>
              </MediaQuery>
              <div>
                {/*                                       Dialog for cod Confirm Box */}
                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                    zIndex: "5001",
                  }}
                  open={this.state.open}
                  autoHideDuration={3000}
                  onClose={this.handleClose}
                  ContentProps={{
                    "aria-describedby": "message-id",
                  }}
                  message={
                    <span id='message-id'>
                      {" "}
                      Minimum order value should be &#8377;{" "}
                      {this.props.couponResult.min_value}
                    </span>
                  }
                />

                <Snackbar
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  style={{ color: "red", zIndex: "50001" }}
                  variant='success'
                  open={this.state.applyOfferSnackbar}
                  autoHideDuration={3000}
                  onClose={this.handleClose}
                  ContentProps={{
                    "aria-describedby": "message-id",
                  }}
                  message={
                    <span id='message-id'>
                      {" "}
                      {this.state.getItChecked
                        ? `Congratulations! You Got a Book at Offered Price`
                        : `Removed Offered Book From Cart.`}
                    </span>
                  }
                />

                <Snackbar
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={this.state.del_cart_err}
                  // autoHideDuration={4000}
                  onClose={this.handleRemoveCartErrClose}
                  message='Please Refresh The Page.If You Are Getting This Message Repetitively Contact Mypustak Support'
                />

                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                    // zIndex:'5001'
                  }}
                  open={ShowOrderCreationErr}
                  autoHideDuration={3000}
                  onClose={this.handleClose}
                  ContentProps={{
                    "aria-describedby": "message-id",
                  }}
                  message={<span id='message-id'> {OrderErrMsg}</span>}
                />
                <Snackbar
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={this.state.showWishlist_Msg}
                  autoHideDuration={4000}
                  onClose={this.handleClose}
                  message={
                    <div style={{ textAlign: "center" }}>
                      <CheckCircleIcon
                        style={{ color: "#2cb742", marginRight: "0.2rem" }}
                      />
                      {this.props.wishlist_msg}{" "}
                    </div>
                  }
                />

        <Dialog
          open={this.state.updateQuantityDialog}
          // closeOnDocumentClick
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          onClose={() => this.setState({ updateQuantityDialog: false })}>
          <DialogTitle>
            Update Notebook Quantity
            <IconButton
              onClick={() => {
                this.setState({ updateQuantityDialog: false,
                });
              }}
              style={{ position: "absolute", right: 0, top: 0 }}>
              <CloseIcon fontSize='small' />
            </IconButton>
          </DialogTitle>
          <DialogContent>
          <div className={styless.bulkMainDiv}>
          <div className={styless.bulkDiv}>
            <div className={styless.BulkQuantity}>
              <span>{this.state.quantity_to_add}</span>
            </div>
            <div className={styless.bulkArrowDiv}>
            <IconButton 
            onClick={() => {
              this.setState({
                quantity_to_add:this.state.quantity_to_add+this.state.qty_group_by
              })
            }}
            style={{borderBottom:"1px solid #2258ae",borderRadius:0,padding:"2px"}}>
            <KeyboardArrowUp />


            </IconButton>
            <IconButton 
            disabled={this.state.quantity_to_add<=this.state.min_order_qty}
            onClick={() => {
              
              this.setState({
                quantity_to_add:this.state.quantity_to_add-this.state.qty_group_by
              })
            }}
            style={{borderRadius:0,padding:"2px"}}>
              <KeyboardArrowDown/>
            </IconButton>
            </div>
          </div>
          <div style={{flex:8}}>
          <span style={{fontSize:"0.8rem"}}>
             <InfoIcon color='#fff'/> Multiples of {this.state.qty_group_by}
          </span>
          </div>
          </div>
            
          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              fullWidth
              disabled={this.state.updateqtyLoader}
              style={{textTransform:"capitalize",height:"2.5rem"}}
              onClick={() => {
                this.updateNoteBookQuantity()
              }}

            >
            {this.state.updateqtyLoader?<CircularProgress size={16}
                                                            />:
            "Contine"}
              
            </Button>
          </DialogActions>
        </Dialog>
                <Dialog
                  open={openRemoveOutStockDialog}
                  onClose={this.closeOutstockDialog}
                  scroll={"paper"}
                  size='lg'
                  fullWidth>
                  <DialogTitle style={{ textAlign: "center" }}>
                    Out Of Stock Books
                  </DialogTitle>
                  <DialogContent>
                    {cartDetails.map(cart =>
                      OutOfStockBooks.includes(cart.bookInvId) ? (
                        <div
                          className='remove_outstock_div'
                          style={{
                            border: "1px solid lightgray",
                            display: "flex",
                          }}>
                          <img
                            alt='cart book '
                            style={{ width: "4rem", height: "5rem" }}
                            src={`https://d1f2zer3rm8sjv.cloudfront.net/${cart.bookThumb}`}
                            id='cartbookimg'
                            onError={e => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://d1f2zer3rm8sjv.cloudfront.net/medium/book_default.jpeg";
                            }}
                          />
                          <div style={{ fontSize: "0.9rem", padding: "1rem" }}>
                            {ResizeTitle(cart.bookName)}
                          </div>
                          <hr />
                        </div>
                      ) : null
                    )}

                    <DialogActions>
                      <Button
                        onClick={this.closeOutstockDialog}
                        style={{ textTransform: "capitalize" }}
                        variant='outlined'>
                        Cancel
                      </Button>
                      <Button
                        variant='outlined'
                        style={{ textTransform: "capitalize" }}
                        onClick={this.removeAllOutstockBooks}>
                        Remove Outstock Books
                      </Button>
                    </DialogActions>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={openDelelteBookDialog}
                  onClose={this.closeDelelteBookDialog}
                  aria-labelledby='form-dialog-title'
                  scroll={"body"}
                  size='sm'
                  style={{ zIndex: "5001" }}>
                  <DialogTitle id='form-dialog-title'>
                    {"Are you sure you want to remove item from cart ?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogActions
                      style={{ justifyContent: "center", fontWeight: "bold" }}>
                      <Button
                        style={{ textTransform: "capitalize" }}
                        onClick={() => this.closeDelelteBookDialog()}
                        variant='outlined'
                        color='primary'>
                        No
                      </Button>
                      <Button
                        style={{
                          textTransform: "capitalize",
                          minWidth: "6rem",
                        }}
                        disabled={del_cart_loader}
                        onClick={() =>
                          this.RemoveFromCart(deleteBookinv, deleteCartid)
                        }
                        variant='contained'
                        color='primary'>
                        {del_cart_loader ? `Removing` : `Yes`}
                      </Button>
                    </DialogActions>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={openDelelteSaveLaterDialog}
                  onClose={this.closeDelelteBookDialog}
                  aria-labelledby='form-dialog-title'
                  scroll={"body"}
                  size='sm'
                  style={{ zIndex: "5001" }}>
                  <DialogTitle id='form-dialog-title'>
                    {"Are you sure you want to remove item from saved later ?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogActions
                      style={{ justifyContent: "center", fontWeight: "bold" }}>
                      <Button
                        style={{ textTransform: "capitalize" }}
                        onClick={() => this.closeDelelteBookDialog()}
                        variant='outlined'
                        color='primary'>
                        No
                      </Button>
                      <Button
                        style={{
                          textTransform: "capitalize",
                          minWidth: "6rem",
                        }}
                        disabled={del_cart_loader}
                        onClick={() =>
                          this.RemoveFromSaveLater(deleteBookinv, deleteCartid)
                        }
                        variant='contained'
                        color='primary'>
                        {del_cart_loader ? `Removing` : `Yes`}
                      </Button>
                    </DialogActions>
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={this.state.openChangeOfferDilag}
                  onClose={() => {
                    this.setState({
                      openChangeOfferDilag: false,
                    });
                  }}
                  aria-labelledby='form-dialog-title'
                  scroll={"body"}
                  size='sm'
                  style={{ zIndex: "5001" }}>
                  <DialogTitle id='form-dialog-title'>
                    {"Select Offer"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogActions
                      style={{ justifyContent: "center", fontWeight: "bold" }}>
                      <button
                        style={{ margin: "0rem 0.2rem" }}
                        className={
                          this.state.offertype === "discount"
                            ? `${styless.contained_btn}`
                            : `${styless.outlined_btn} `
                        }
                        onClick={e =>
                          this.onOfferChanged(
                            e,
                            "cashback",
                            this.state.cart_book
                          )
                        }
                        name='offerType'
                        value='discount'>
                        <div>
                          <div>
                            <span>
                              Flat {this.state.discount_percent}% off !{" "}
                            </span>
                          </div>
                          <div className='subtext_cond'>{/* InStock */}</div>
                        </div>
                      </button>

                      {this.state.cashback_percent ? (
                        <button
                          style={{ margin: "0rem 0.2rem" }}
                          className={
                            this.state.offertype === "cashback"
                              ? `${styless.contained_btn}`
                              : `${styless.outlined_btn} `
                          }
                          onClick={e =>
                            this.onOfferChanged(
                              e,
                              "cashback",
                              this.state.cart_book
                            )
                          }
                          name='offerType'
                          value='cashback'>
                          <div>
                            {offerLoading &&
                            OfferCartId === this.state.cart_book.Cart_id ? (
                              <CircularProgress size={24} />
                            ) : (
                              this.SetBtnValue(this.state.cart_book, "cashback")
                            )}
                            <div>
                              <span>
                                Earn BookCoins of worth ₹
                                {Math.round(
                                  this.state.cart_book_price -
                                    this.CashbackPrice(
                                      this.state.cart_book_price,
                                      this.state.cashback_percent
                                    )
                                )}
                                !{" "}
                              </span>
                            </div>
                            <div className='subtext_cond'>{/* InStock */}</div>
                          </div>
                        </button>
                      ) : null}
                    </DialogActions>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={this.state.alertwishlist_dialog}
                  onClose={() => this.setState({ alertwishlist_dialog: false })}
                  aria-labelledby='form-dialog-title'
                  scroll={"body"}
                  size='sm'
                  style={{ zIndex: "5001" }}>
                  <DialogTitle id='form-dialog-title'>
                    {
                      "Are you sure you want to move item from cart to wishlist ?"
                    }
                  </DialogTitle>
                  <DialogContent>
                    <DialogActions
                      style={{ justifyContent: "center", fontWeight: "bold" }}>
                      <Button
                        style={{}}
                        onClick={() =>
                          this.setState({ alertwishlist_dialog: false })
                        }
                        variant='outlined'
                        color='primary'>
                        No
                      </Button>
                      <Button
                        style={{}}
                        disabled={del_cart_loader}
                        
                        onClick={() => this.MoveToWishlist()}
                        variant='contained'
                        color='primary'>
                        Yes
                      </Button>
                    </DialogActions>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={this.state.alertwishlist_savelater_dialog}
                  onClose={() =>
                    this.setState({ alertwishlist_savelater_dialog: false })
                  }
                  aria-labelledby='form-dialog-title'
                  scroll={"body"}
                  size='sm'
                  style={{ zIndex: "5001" }}>
                  <DialogTitle id='form-dialog-title'>
                    {
                      "Are you sure you want to move this book from saved for later to wishlist ?"
                    }
                  </DialogTitle>
                  <DialogContent>
                    <DialogActions
                      style={{ justifyContent: "center", fontWeight: "bold" }}>
                      <Button
                        style={{}}
                        onClick={() =>
                          this.setState({
                            alertwishlist_savelater_dialog: false,
                          })
                        }
                        variant='outlined'
                        color='primary'>
                        No
                      </Button>
                      <Button
                        style={{}}
                        disabled={del_cart_loader}
                        onClick={() => this.MoveToWishlist()}
                        variant='contained'
                        color='primary'>
                        Yes
                      </Button>
                    </DialogActions>
                  </DialogContent>
                </Dialog>

                <Dialog open={this.state.openOfferBookDialog}>
                  <DialogContent>
                    {this.props.offerBook.length !== 0 ? (
                      <div id='offerbook' className='d-flex'>
                        <div id='bookimg' className= {`${styles.bookimg} col-4`}>
                          <img
                            src={`https://d1f2zer3rm8sjv.cloudfront.net/${this.props.offerBook.thumb}`}
                            style={{
                              width: "4.3rem",
                              height: "6rem",
                              margin: "0.4rem",
                            }}
                          />
                        </div>
                        <div id='Btitle' className='col-lg-8'>
                          <p
                            id='offer'
                            className={`${styles.offerBookDialogTotle} ${styles.offer}`}
                            style={{}}>
                            {" "}
                            Win this Book <b>at Special Offered Price</b>{" "}
                          </p>

                          <p id='offerText' className={`${styles.offerBookDialogSubTotle}`}>
                            <span
                              style={{ color: "#007bff" }}
                              onClick={() =>
                                this.openulr(
                                  `https://www.mypustak.com/product/${this.props.offerBook.slug}?${this.props.offerBook.book_id}`
                                )
                              }>
                              {" "}
                              {this.props.offerBook.title > 30
                                ? this.props.offerBook.title
                                    .replace(
                                      /(\w)(\w*)/g,
                                      (_, firstChar, rest) =>
                                        firstChar.toUpperCase() +
                                        rest.toLowerCase()
                                    )
                                    .substring(0, 30)
                                    .concat("...")
                                : this.props.offerBook.title.replace(
                                    /(\w)(\w*)/g,
                                    (_, firstChar, rest) =>
                                      firstChar.toUpperCase() +
                                      rest.toLowerCase()
                                  )}
                            </span>
                            <br />
                            Shipping & handling Charges: &#8377;
                            <s>{this.props.offerBook.book_value}</s>{" "}
                            &nbsp;&#8377;
                            {this.props.offerBook.shipping_handling_charge}
                            <br />
                            <b> Special Offer : </b>
                            <s>
                              &#8377;
                              {this.props.offerBook.shipping_handling_charge}
                            </s>{" "}
                            &nbsp;
                            <span
                              style={{
                                color: "#007bff",
                                fontWeight: "bold",
                              }}>
                              {" "}
                              &#8377;{" "}
                              {Math.round(
                                parseInt(
                                  this.props.offerBook.shipping_handling_charge
                                ) -
                                  parseInt(
                                    this.props.offerBook
                                      .shipping_handling_charge
                                  ) *
                                    (parseInt(
                                      this.props.offerBook.offer_discount
                                    ) /
                                      100)
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant='outlined'
                      style={{ textTransform: "capitalize" }}
                      onClick={e =>
                        this.removeOfferbookHandeler(
                          e,
                          this.renderAmtUsed().total_amt
                        )
                      }>
                      No , I don't Want this book
                    </Button>
                    <Button
                      color='primary'
                      variant='contained'
                      style={{ textTransform: "capitalize" }}
                      onClick={e => this.okOfferbookHandeler(e)}>
                      Yes , I want this book
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          )
        }
        {/* <style jsx>
          {`
            
          `}
        </style> */}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  cartDetails: state.cartReduc.MyCart,
  SaveLaterData: state.cartReduc.SaveLaterData,
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
  userId: state.userdetailsR.getuserdetails.id,
  userDetails: state.userdetailsR.getuserdetails,
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
  is_offerbook_applied: state.cartReduc.is_offerbook_applied,
});

export default connect(mapStateToProps, {
  Getaddress,
  AddPriceCart,
  RemoveCart,
  UpdateCartItem,
  OrderDetails,
  RedirectWalletToCart,
  SetWallet,
  RemoveToBeAddedToCart,
  removeFromCartLogout,
  orderUpdateSucc,
  CartSession,
  SaveLater,
  Get_Rp_Id,
  SetOrderId,
  SetSelectedAddressBlank,
  Getwalletd,
  walletRazorpay,
  ShowRzPayErr,
  OutOfStock,
  AddToCart,
  login_backdropToggle,
  CartopenModal,
  // cancelOrder,
  DeductCashback,
  offeredbook,
  orderOfferBook,
  couponApply,
  redeemCouponAction,
  resetCoupon,
  updatePaymentIdOrder,
  walletOrder,
  Get_CashFree_Signature_Wallet,
  AddressDialog,
  UpdateCart,
  ResetOutStockList,
  fetching_Wishlist,
  Adding_Wishlist,
  Adding_Wishlist_fromcart,
  check_payment_id,
  check_success,
  get_razorpay_key,
  offerbook_applied,
  // cancelOrder
  cartpagelength,
  GetWishlistCount,
  check_book_incart,
  fetch_min_order_value,
})(withSnackbar(Cart));
