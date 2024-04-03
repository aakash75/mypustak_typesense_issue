/* eslint-disable */
"use client"
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { Component } from "react";
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { connect } from "react-redux";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ErrorIcon from "@mui/icons-material/Error";
import MediaQuery from "react-responsive";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { getBook } from "../../../redux/actions/getBookDetailsAction";
import styles from "../../../styles/Product.module.css";
import Image from "next/legacy/image";
import moment from "moment";
import Person2Icon from '@mui/icons-material/Person2';
import CloseIcon from "@mui/icons-material/Close";
import { AuthInstance } from "../../../helper/api_url";
import sendicon from "../../../assets/sendicon.png";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import assured from "../../../assets/assured.svg";
import usedbook_img from "../../../assets/usedbook.svg";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Popup from "reactjs-popup";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "reactjs-popup/dist/index.css";
import { withSnackbar } from "notistack";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import HelpIcon from "@mui/icons-material/Help";
import Tooltip from "@mui/material/Tooltip";
import { CircularProgress } from "@mui/material";
import {
  AddToCart,
  CartopenModal,
  CartSession,
  ToBeAddedToCart,
  AddToCartLogin,
  getEstDeliveryDate,
  Adding_Wishlist,
  Update_wishlist,
  check_book_incart,
} from "../../../redux/actions/cartAction";
import {
  userdetails,
  login_backdropToggle,
} from "../../../redux/actions/accountAction";
import { setNewPricing, get_instock_book, get_book_review_product, check_if_ordered, save_question, get_question_product } from "../../../redux/actions/productAction";
import { fetch_wishlist_detail_otherpage } from "../../../redux/actions/accountAction";
import { GetWishlistCount } from "../../../redux/actions/wishlistAction";
import { updateBookImage } from "../../../redux/actions/updateBookImgAction";
import { url } from "../../../helper/api_url";
import { sendBookNotification } from "../../../redux/actions/bookNotifyAction";
import { getBooksSuggestionsByPage } from "../../../redux/actions/productsuggestionaction";
import { EmailValidation } from "../../../helper/validations";
import { encryptor } from "../../../helper/crypto";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { ThumbsUpDown } from "@mui/icons-material";
import RatingGraph from "../../../components/userReview/RatingGraph";
import ScrollButton from "../../../components/Backdrop/ScrollButton"
import { NoSsr } from '@mui/base';
import ReturnPolicy from "../../../components/return_policy/ReturnPolicy";
import ReturnPolicyDialog from "../../../components/return_policy/ReturnPolicyDialog";
// import ImageMagnify from "../../components/productPage/ImageMagnify";
import ReactImageMagnify from 'react-image-magnify';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Recommended from "../../../components/homepage/Recommended";
import { parse } from 'cookie';
const NextBreadcrumbs = dynamic(
  () => import("../../../components/Breadcrumbs/NextBreadcrumbs"),
  { ssr: false }
);
const SatisfactionBanner = dynamic(
  () => import("../../../components/satisfactionBanner/SatisfactionBanner"),
  { ssr: false }
);
const BookSuggestionSearch = dynamic(
  () => import("../../../components/booksuggestion/BookSuggestionSearch"),
  { ssr: false }
);


class Page extends Component {
  state = {
    multiple_add_loader: false,
    questionSuccess: false,
    saveLoader: false,
    inputQuestion: "",
    available_books: [],
    multiplebook_dialog: false,
    multiplebook_loader: false,
    total_instock_qty: 0,
    already_incart: false,
    sticky_div: "product_img_normal",
    AddingWishlist_loader: false,
    showWishlist: false,
    show_delivery_code: false,
    toggle_product_slider: true,
    bookType: "usedbook",
    activeSmilar: "similar_book",
    activeauthor: "",
    is_booktype_show: false,
    parent_cate: "",
    sub_cate: "",
    parent_urlpath: "",
    sub_urlpath: "",
    productUrl: "www.mypustak.com" + this.props.asPath,
    multipleAuthor: [],
    readmore: false,
    instock: false,
    productData: true,
    SelectCond:
      this.props.selectedConditon?.qty && this.props.newbook_condition?.length > 0
        ? this.props.SelectCond
        : this.props.newbook_condition?.length > 0
          ? this.props.newbook_condition
          : this.props.SelectCond,
    GotoCart: false,
    AlreadyinCartMsg: "",
    notifyopen: false,
    PincodeCheck: "",
    status: "",
    user_id: "",
    WishlistMsg: "",
    AddedToCart_Msg: "",
    sendEmail: "",
    redirectWrongUrl: false,
    SideDrawerOpen: true,
    conditionLength: 0,
    offertype: "discount",
    discountedPrice: 0,
    AlreadyinCartMsgNewBook: "",
    book_is_in_stock: false,
    Notifydata: "",
    Add_cartLoader: false,
    Buy_cartLoader: false,
    Show_Error_msg: false,
    book_qty_obj: {},
    book_conditions_obj: this.props.condition_obj,
    selectedConditon: this.props.selectedConditon,
    defaultImgSrc: this.props.defaultImgSrc,
    defaultErrImg: "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png",
    ErrorOccuredBookImg: false,
    enteredPincode: "",
    pinodeErrMsg: "",
    est_day_str: "",
    error_msg: "",
    show_est_day_loader: false,
    study_material_barcode: "",
    openStudyMaterialDialog: false,
    newBookAddtoCart: false,
    no_of_conditions: 0,
    wishlist_msg: "",
    wishlistid: "",
    openwhyfreeinfo: false,
    openQuestionDialog: false,
    onerror: false,
    addtocarthover: false,
    buynowhover: false,
    incartbooks: [],
    imagesData: [
      {
        id: 1,
        url: `https://d1f2zer3rm8sjv.cloudfront.net/${this.props.book.image}`,
      },
      this.props.book.front_image ?
        {
          id: 2,
          url: `https://d239pyg5al708u.cloudfront.net/uploads/books/medium/front_image/${this.props.book.front_image}`,
        } : null,
      this.props.book.back_image ? {
        id: 3,
        url: `https://d239pyg5al708u.cloudfront.net/uploads/books/medium/back_image/${this.props.book.back_image}`,
      } : null,
    ],
    mainImagSrc: {
      id: 1,
      url: `https://d1f2zer3rm8sjv.cloudfront.net/${this.props.book.image}`,
    },
    falseImgDiv: false,
    error_url_object: {},
    searchLoader: false,
    suggestionData: [],
    wishlistLoader: false,
    review_order_id: "",
    review_data: [],
    review_counts: {},
    question_data: [],
    question_data_counts: 0,
    question_loader: true,
    openRefundReturnDialog: false,
    openImageDialog: false,
    allImagesForMobileDialog: [],
    // for video 
    video_popup:false,
    video_img:"",

  };
  componentDidMount() {
    
    this.prevUrl = window.location.href;
    window.scrollTo(0, 0);
    this.handleBackButtonPress()
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener('popstate', this.handleBackButtonPress);
    if (this.props.nodata) {
    } else {
      const productLeftImgThumb = document.querySelector('.product_Left_imgthumb');
      console.log("789654321", productLeftImgThumb)

      const { thumb } = this.props.book;
      this.setState({
        ErrorOccuredBookImg: false,
        AlreadyinCartMsgNewBook: "",
      });
      const bookConditions = this.props.bookCondition;
      let old_book_length = Object.getOwnPropertyNames(
        this.props.bookCondition
      ).length;
      let new_book_length = Object.getOwnPropertyNames(
        this.props.new_book_data
      ).length;
      console.log(new_book_length, old_book_length, "lengths");
      if (old_book_length == 0 && new_book_length) {
        this.setState({ selectedConditon: this.props.new_book_data });
      }
      const parent_cate = this.props.book.category_arr[1];
      const sub_cate = this.props.book.category_arr[2];
      const sub_urlpath = `/category/${this.props.book.category_arr[0]}/${parent_cate}/${sub_cate}`;
      const parent_urlpath = `/category/${this.props.book.category_arr[0]}/${parent_cate}`;
      this.setState({
        parent_cate: parent_cate,
        sub_cate: sub_cate,
        parent_urlpath: parent_urlpath,
        sub_urlpath: sub_urlpath,
      });
      if (new_book_length && old_book_length) {
        this.setState({ bookType: "usedbook", is_booktype_show: true });
      } else if (old_book_length) {
        this.setState({ bookType: "usedbook", is_booktype_show: false });
      } else if (new_book_length) {
        this.setState({ bookType: "newbook", is_booktype_show: false });
      }
      const conditionKeys = Object.keys(bookConditions);
      if (!conditionKeys.includes("is_soldout")) {
      } else {
      }

      if (this.props.userComponentStatus == 2) {
        const user_data = JSON.parse(localStorage.getItem("user_info"));
        this.setState(state => {
          return { enteredPincode: user_data.pincode };
        });
        if (user_data && String(user_data.pincode).length == 6) {
          const pincode = user_data.pincode;
          const wt = this.props.book.weight;
          this.setState({ show_est_day_loader: true });
          this.ApiEstimate_delivery(pincode, wt);
        }
      }
      this.setState({ show_delivery_code: true });
      this.fetchSimilarBooks();
      this.fetchSimilarBooks();
      const user_data = JSON.parse(localStorage.getItem("user_info"));
      console.log(user_data, "check_if_ordered");
      // this.props.check_if_ordered(user_data.id,this.props.book.book_id).then(res => {
      //   console.log(res.data,"check_if_ordered in slug");
      //   this.setState({
      //     review_order_id:res.data,
      //   })
      // })
      this.props.get_book_review_product(this.props.book.book_id, 0).then(res => {
        console.log(res, "get_book_review_product");
        this.setState({
          review_data: res.data,
          review_counts: res.counts
        })
      })
      console.log(this.props.review_by_book, "this.props.review_by_book");
      this.props.get_question_product(this.props.book.book_id, 0, 5).then(res => {
        this.setState({
          question_data: res.data,
          question_loader: false,
          question_data_counts: res.total_count
        })
      })
        .catch(err => {
          this.setState({
            question_loader: false,
          })
        })
      this.props.list_wishlist.map(data => {
        if (data.book_id == this.props.book.book_id) {
          console.log(data.book_id, "858585", this.props.book.book_id);
          this.setState({
            showWishlist: true,
            wishlistid: data.wishlist_id,
          });
        }
      });
      if (this.props.getuserdetails.email != null) {
        this.props.check_book_incart().then(res => {
          console.log(res.cartData, "check_book_incart");
          this.setState({
            incartbooks: res.cartData
          })
          res.cartData.map(cart =>
            `${cart.bookInvId}` === `${this.state.selectedConditon.book_inv_id}`
              ? this.setState({ already_incart: true })
              : this.setState({ already_incart: false })
          );
        }).catch(err => {
          console.log(err, "check_book_incart");
        })
      }
      else {
        if (this.props.incart_check) {
          this.props.incart_check.map(cart => {
            console.log(this.state.selectedConditon.book_inv_id, cart.bookInvId, "this.props.incart_check");
            if (cart.bookInvId == this.state.selectedConditon.book_inv_id) {
              this.setState({
                already_incart: true
              })
            }
            else {
              this.setState({
                already_incart: false
              })
            }
          })
          // this.props.incart_check.map((cart) =>{
          //   `${cart.book_inv_id}` === `${this.state.selectedConditon.book_inv_id}`
          //     ? this.setState({ already_incart: true })
          //     : this.setState({ already_incart: false })
          // }
          // );
        }
      }
      // if (this.props.FromMycart) {
      //   this.props.FromMycart.map(cart =>
      //     `${cart.bookInvId}` === `${this.state.selectedConditon.book_inv_id}`
      //       ? this.setState({ already_incart: true })
      //       : this.setState({ already_incart: false })
      //   );
      // }
    }

  }
  componentDidUpdate(prevProps, prevState) {
    window.addEventListener('popstate', this.handleBackButtonPress);
    if (prevProps.list_wishlist !== this.props.list_wishlist) {
      this.props.list_wishlist.map(data => {
        if (data.book_id == this.props.book.book_id) {
          this.setState({
            showWishlist: true,
            wishlistid: data.wishlist_id,
          });
        }
      });
    }
    if (prevProps.bookCondition !== this.props.bookCondition) {
      const conditionKeys = Object.keys(this.props.bookCondition);
      if (!conditionKeys.includes("is_soldout")) {
        this.setBookConditionToState(this.props.bookCondition);
      } else {
      }
    }
    if (this.props.incart_check !== prevProps.incart_check) {
      if (this.props.incart_check) {
        // console.log(this.props.incart_check,"this.props.incart_check");
        this.props.incart_check.map(cart => {
          console.log(this.state.selectedConditon.book_inv_id, cart.bookInvId, "this.props.incart_check");
          if (cart.bookInvId == this.state.selectedConditon.book_inv_id) {
            this.setState({
              already_incart: true,
            });
          } else {
            this.setState({
              already_incart: false,
            });
          }
        });
        // this.props.incart_check.map((cart) =>{
        //   `${cart.book_inv_id}` === `${this.state.selectedConditon.book_inv_id}`
        //     ? this.setState({ already_incart: true })
        //     : this.setState({ already_incart: false })
        // }
        // );
      }
    }

    if (this.props.userComponentStatus !== prevProps.userComponentStatus) {
      if (this.props.userComponentStatus == 2) {
        const user_data = JSON.parse(localStorage.getItem("user_info"));
        // this.props.incart_check.map(cart =>
        //   `${cart.book_inv_id}` ===
        //     `${this.props.selectedConditon.newbook_inv_id}`
        //     ? this.setState({
        //       offertype: cart.offertype,
        //     })
        //     : null
        // );
        this.props.incart_check.map(cart => {
          if (cart.bookInvId == this.state.selectedConditon.book_inv_id) {
            this.setState({
              offertype: cart.offertype,
            });
          }
        });
        if (user_data) {
          this.setState(state => {
            return { enteredPincode: user_data.pincode };
          });

          if (String(user_data.pincode).length == 6) {
            const pincode = user_data.pincode;
            const wt = this.props.book.weight;
            this.setState({ show_est_day_loader: true });
            this.ApiEstimate_delivery(pincode, wt);
          }
        }
      }
    }
  }
  fetchSimilarBooks = async () => {
    this.setState({
      searchLoader: true,
    });
    let res = await this.props.getBooksSuggestionsByPage("PRODUCT", 1);
    if (res) {
      res.data.data.map(r => {
        this.state.suggestionData.push(r);
      });
      this.setState({
        searchLoader: false,
      });
    } else {
      this.setState({
        searchLoader: false,
      });
    }
  };
  notifyopenModal = e => {
    e.preventDefault();
    const email = this.state.sendEmail;

    if (EmailValidation(email)) {
      this.setState({
        Notifydata: "Enter valid email",
      });
      return;
    }
    const passdata = {
      email: email,
      slug: `${this.props.book.slug}`,
    };
    const body = { body: encryptor(passdata) };
    this.props
      .sendBookNotification(body)
      .then(res => {
        this.setState({
          Notifydata: res.message,
          notifyopen: false,
        });
        this.props.enqueueSnackbar(res.message, { variant: "success" });
      })
      .catch(err => {
        this.setState({
          Notifydata: err.response.data.message,
          notifyopen: false,
        });
        this.props.enqueueSnackbar(err.response.data.message, {
          variant: "warning",
        });
      });
  };

  notifycloseModal = () => {
    this.setState({ notifyopen: false });
  };

  Notify = e => {
    const email = this.props.getuserdetails.email;
    e.preventDefault();
    if (!email) {
      this.setState({ notifyopen: true });
      return;
    }
    if (EmailValidation(email)) {
      this.setState({
        Notifydata: "Enter valid email",
      });
      return;
    }
    const passdata = {
      email: email,
      slug: `${this.props.book.slug}`,
    };
    const body = { body: encryptor(passdata) };
    this.props
      .sendBookNotification(body)
      .then(res => {
        this.setState({
          Notifydata: res.message,
        });
      })
      .catch(err => {
        this.setState({
          Notifydata: err.response.data.message,
        });
      });
  };
  changeDataBottom = () => {
    this.setState({ productData: !this.state.productData });
  };
  changeBookType = booktype => {
    this.setState({
      bookType: booktype,
      mainImagSrc:
        booktype == "newbook"
          ? `https://d1f2zer3rm8sjv.cloudfront.net/${this.props.new_book_data.image}`
          : `https://d1f2zer3rm8sjv.cloudfront.net/${this.props.selectedConditon.image}`,
    });
  };

  onChangedCondition = (e, change_cond) => {
    if (change_cond.charAt(change_cond.length - 1) == "N") {
      console.log(this.props.new_book_data, "this.props.new_book_data");
      this.setState({
        bookType: "newbook",
        SelectCond: change_cond,
        mainImagSrc: {
          url: `https://d1f2zer3rm8sjv.cloudfront.net/${this.props.new_book_data.image}`,
        },
      });
    } else {
      this.setState({
        change_cond: change_cond,
        SelectCond: change_cond,
        bookType: "usedbook",
      });
      const conditions = this.state.book_conditions_obj;
      this.setState({
        selectedConditon: conditions[change_cond],
        defaultImgSrc: conditions[change_cond].image,
        mainImagSrc: {
          url: conditions[change_cond].image,
        },
      });
    }
    if (!this.state.ErrorOccuredBookImg) {
      this.setState({
        defaultErrImg: `https://d1f2zer3rm8sjv.cloudfront.net/${this.props.book.thumb}`,
      });
    }
  };

  backdropClickHandler = () => {
    this.props.CartopenModal();
  };
  onOfferChanged = (e, checkvalue) => {
    const { selectedConditon } = this.props;
    var msgg = "";
    let discount_price = 0;
    let cashback_price = 0;
    let cart_id = "";

    this.props.incart_check.map(cart =>
      `${cart.bookInvId}` === `${selectedConditon.newbook_inv_id}`
        ? ((msgg = "already in cart"), (cart_id = cart.Cart_id))
        : null
    );
    console.log(this.props.incart_check, "this.props.FromMycart");
    if (this.state.offertype == checkvalue) {
      this.setState({ offertype: "" });
    } else {
      this.setState({ offertype: checkvalue });
      if (checkvalue == "discount") {
        discount_price = this.DicountedPrice(Math.round(selectedConditon.MRP));
        cashback_price = 0;
      } else if (checkvalue == "cashback") {
        discount_price = 0;
        cashback_price = this.CashbackPrice(Math.round(selectedConditon.price));
      }
      if (msgg == "already in cart") {
        const sendCartSession = {
          cashbackedPrice: cashback_price,
          discountedPrice: discount_price,
          cashback_per: selectedConditon.cashback_percent
            ? selectedConditon.cashback_percent
            : 0,
          discount_per: selectedConditon.discount_percent
            ? selectedConditon.discount_percent
            : 0,
          offertype: checkvalue,
          "content-type": "application/json",
        };
        AuthInstance.patch(
          `${url}/common/updateCart/${cart_id}/`,
          sendCartSession
        )
          .then(res => {
            const token = `Token ${localStorage.getItem("user")}`;
            this.props.CartSession();
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  Add_to_Wishlist = e => {
    e.preventDefault();
    this.setState({ wishlistLoader: true });
    const selectedCondition = this.state.SelectCond;
    const { book, getuserdetails } = this.props;
    const { defaultImgSrc } = this.state;
    const book_thumb = defaultImgSrc.replace(
      "https://d1f2zer3rm8sjv.cloudfront.net/",
      ""
    );
    const selectedBookConditionDetails =
      this.state.book_conditions_obj[selectedCondition];
    const { book_inv_id, rack_no, shipping } = selectedBookConditionDetails;
    let current_date = Math.floor(Date.now() / 1000);
    const MyWishlist = {
      book_id: book.book_id,
      user_id: this.props.getuserdetails.id,
      selected_condition: selectedCondition,
      book_inv_id: book.book_inv_id ? book.book_inv_id : book.newbook_inv_id ? book.newbook_inv_id : "",
      book_thumb: book_thumb
        ? book_thumb != "null"
          ? book_thumb
          : book.thumb
        : book.thumb,
      i_date: current_date,
      is_move_incart: 0,
      is_deleted: 0,
      qty: 1,
      cashbacked_price: 0,
      discounted_price: 0,
      offertype: null,
      user_pay: 0,
    };

    if (this.props.userComponentStatus == 2) {
      if (this.state.showWishlist) {
        const data = {
          wishlist_id: this.state.wishlistid,
          is_deleted: 1,
        };
        const body = data;
        this.props
          .Update_wishlist({ body: body })
          .then(res => {
            this.props.enqueueSnackbar(
              "Successfully Removed From Your Wishlist",
              { variant: "success" }
            );
            this.props.GetWishlistCount();
            this.setState({
              showWishlist: false,
              wishlistLoader: false,
            });
          })
          .catch(err => {
            this.props.enqueueSnackbar("Book removing failed", {
              variant: "error",
              wishlistLoader: false,
            });
          });
        return;
      }
      this.setState({ AddingWishlist_loader: true });
      this.props
        .Adding_Wishlist(MyWishlist)
        .then(res => {
          this.props.enqueueSnackbar(
            <div>
              <span>Successfully Removed From Your Wishlist &nbsp;&nbsp;</span>
              <Link
                href='/customer/wishlist'
                prefetch={false}
                style={{ textDecoration: "none" }}
                legacyBehavior>

                <Button
                  variant='outlined'
                  size='small'
                  style={{
                    color: "white",
                    border: "2px solid white",
                    outline: "none",
                  }}>
                  <span className='viewList'> View Wishlist </span>
                </Button>

              </Link>
            </div>,
            { variant: "success" }
          );
          this.props.fetch_wishlist_detail_otherpage();
          this.props.GetWishlistCount();
          this.setState({
            showWishlist: true,
            AddingWishlist_loader: false,
            wishlist_msg: this.props.wishlist_msg,
            wishlistLoader: false,
          });
        })
        .catch(err => {
          this.props.enqueueSnackbar("Book not added to Wishlist", {
            variant: "error",
          });
          this.setState({ wishlistLoader: false });
        });
    } else {
      this.setState({
        AddingWishlist_loader: false,
        wishlistLoader: false,
        wishlist_msg: "Please Login For Wishlisting a book",
      });
      this.props.enqueueSnackbar("Please Login For Wishlisting a book", {
        variant: "warning",
      });
      this.props.login_backdropToggle();
    }
  };

  Add_to_NewBook_Wishlish = e => {
    e.preventDefault();
    const selectedCondition = this.state.SelectCond;
    const { book, getuserdetails } = this.props;
    const { defaultImgSrc } = this.state;
    const book_thumb = defaultImgSrc.replace(
      "https://d1f2zer3rm8sjv.cloudfront.net/",
      ""
    );
    const selectedBookConditionDetails =
      this.state.book_conditions_obj[selectedCondition];
    let discount_price = 0;
    let cashback_price = 0;
    let current_date = Math.floor(Date.now() / 1000);

    if (this.state.offertype == "discount") {
      discount_price = this.DicountedPrice(Math.round(book.price));
      cashback_price = 0;
    } else if (this.state.offertype == "cashback") {
      discount_price = 0;
      cashback_price = this.CashbackPrice(Math.round(book.price));
    } else {
    }
    const MyWishlist = {
      book_id: book.book_id,
      user_id: getuserdetails.id,
      selected_condition: null,
      book_inv_id: book.newbook_inv_id,
      book_thumb: book_thumb
        ? book_thumb != "null"
          ? book_thumb
          : book.thumb
        : book.thumb,
      i_date: current_date,
      is_move_incart: 0,
      is_deleted: 0,
      qty: 1,
      cashbacked_price: cashback_price,
      discounted_price: discount_price,
      cashback_per: this.state.selectedConditon.cashback_percent,
      discount_per: this.state.selectedConditon.discount_percent,
      offertype: this.state.offertype.length > 1 ? this.state.offertype : null,
      user_pay: 0,
    };
    if (this.props.userComponentStatus == 2) {
      this.setState({ AddingWishlist_loader: true });
      this.props.Adding_Wishlist(MyWishlist).then(res => {
        this.setState({
          showWishlist: true,
          AddingWishlist_loader: false,
          wishlist_msg: this.props.wishlist_msg,
        });
      });
    } else {
      this.setState({
        showWishlist: true,
        AddingWishlist_loader: false,
        wishlist_msg: "Please Login For Wishlisting a book",
      });
    }
  };
  AddNewBookToCart = e => {
    e.preventDefault();
    const { new_book_data } = this.props;
    console.log(
      new_book_data,
      "selectedConditonselectedConditonselectedConditonselectedConditon"
    );
    var msgg = "";
    let discount_price = 0;
    let cashback_price = 0;
    let cart_id = "";

    this.props.incart_check.map(cart =>
      `${cart.bookInvId}` === `${new_book_data.newbook_inv_id}`
        ? ((msgg = "already in cart"), (cart_id = cart.Cart_id))
        : null
    );
    if (this.state.offertype == "discount") {
      discount_price = this.DicountedPrice(Math.round(new_book_data.price));
      cashback_price = 0;
    } else if (this.state.offertype == "cashback") {
      discount_price = 0;
      cashback_price = this.CashbackPrice(Math.round(new_book_data.price));
    } else {
    }
    if (msgg.length) {
      const sendCartSession = {
        cashbackedPrice: cashback_price,
        discountedPrice: discount_price,
        cashback_per: new_book_data.cashback_percent
          ? new_book_data.cashback_percent
          : 0,
        discount_per: new_book_data.discount_percent
          ? new_book_data.discount_percent
          : 0,
        offertype:
          this.state.offertype.length > 1 ? this.state.offertype : null,
        "content-type": "application/json",
      };
      AuthInstance.patch(
        `${url}/common/updateCart/${cart_id}/`,
        sendCartSession
      )
        .then(res => {
          console.log(res.status, sendCartSession, "cartSession");

          const token = `Token ${localStorage.getItem("user")}`;
          this.props.CartSession();
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (msgg === "") {
      this.setState({ newBookAddtoCart: true });
      const MyCart = {
        bookId: new_book_data.book_id,
        bookName: new_book_data.title,
        bookSlug: new_book_data.slug,

        bookPrice: Math.round(new_book_data.price),
        bookShippingCost: this.state.offertype
          ? this.state.offertype == "discount"
            ? discount_price
            : Math.round(new_book_data.price)
          : Math.round(new_book_data.price),
        bookThumb: new_book_data.image,
        bookQty: 1,

        bookOffer: this.state.offertype,
        bookInvId: new_book_data.newbook_inv_id,
        discount_price: discount_price,
        cashback_price: cashback_price,
        discount_per: new_book_data.discount_percent
          ? new_book_data.discount_percent
          : 0,
        cashback_per: new_book_data.cashback_percent
          ? new_book_data.cashback_percent
          : 0,
        delivery_cost: new_book_data.shipping,
        cashbackedPrice: cashback_price,
        discountedPrice: discount_price,
        offertype:
          this.state.offertype.length > 1 ? this.state.offertype : null,
      };
      const sendCartSession = {
        book_id: new_book_data.book_id,
        book_inv_id: new_book_data.newbook_inv_id,
        cashbackedPrice: cashback_price,
        discountedPrice: discount_price,
        cashback_per: new_book_data.cashback_percent
          ? new_book_data.cashback_percent
          : 0,
        discount_per: new_book_data.discount_percent
          ? new_book_data.discount_percent
          : 0,
        offertype:
          this.state.offertype.length > 1 ? this.state.offertype : null,
        "content-type": "application/json",
      };
      //  Add to Cart Session
      const cartSession_body = { cs: encryptor(sendCartSession) };

      if (this.props.userComponentStatus == 2) {
        this.setState({ Add_cartLoader: true });
        this.props
          .AddToCartLogin({ sendCartSession })
          .then(res => {
            this.props.CartopenModal();

            this.props.userdetails();
            this.setState({ Add_cartLoader: false });
          })
          .catch(err => {
            console.log(err);
            this.props.AddToCart(MyCart);
            this.setState({
              Add_cartLoader: false,
              Show_Error_msg: true,
              error_msg:
                "Book Not Added To Cart Due To Some Error .Please Refresh The Page.",
            });
          });
        //  Refreshing Cart after response
      } else {
        this.props.AddToCart(MyCart);
        this.props.ToBeAddedToCart({
          book_id: new_book_data.book_id,
          book_inv_id: new_book_data.newbook_inv_id,
          cashbackedPrice: cashback_price,
          discountedPrice: discount_price,
          cashback_per: this.state.new_book_data.cashback_percent
            ? this.state.new_book_data.cashback_percent
            : 0,
          discount_per: this.state.new_book_data.discount_percent
            ? this.state.new_book_data.discount_percent
            : 0,
          offertype:
            this.state.offertype.length > 1 ? this.state.offertype : null,
        });
        this.props.CartopenModal();
      }
    } else {
      this.setState({ AlreadyinCartMsgNewBook: "Already In cart" });

      this.props.CartopenModal();
    }
  };

  goToCart = () => {
    this.props.CartopenModal();
  };

  buynow_newbook = e => {
    e.preventDefault();
    const { selectedConditon } = this.props;
    var msgg = "";
    let discount_price = 0;
    let cashback_price = 0;
    let cart_id = "";

    this.props.incart_check.map(cart =>
      `${cart.bookInvId}` === `${selectedConditon.newbook_inv_id}`
        ? ((msgg = "already in cart"), (cart_id = cart.Cart_id))
        : null
    );
    console.log(
      this.props.incart_check,
      "this.props.FromMycart---------------"
    );
    if (this.state.offertype == "discount") {
      discount_price = this.DicountedPrice(Math.round(selectedConditon.price));
      cashback_price = 0;
    } else if (this.state.offertype == "cashback") {
      discount_price = 0;
      cashback_price = this.CashbackPrice(Math.round(selectedConditon.price));
    } else {
    }
    if (msgg.length) {
      const sendCartSession = {
        cashbackedPrice: cashback_price,
        discountedPrice: discount_price,
        cashback_per: selectedConditon.cashback_percent
          ? selectedConditon.cashback_percent
          : 0,
        discount_per: selectedConditon.discount_percent
          ? selectedConditon.discount_percent
          : 0,
        offertype:
          this.state.offertype.length > 1 ? this.state.offertype : null,
        "content-type": "application/json",
      };
      console.log(sendCartSession, "cartSession");

      AuthInstance.patch(
        `${url}/common/updateCart/${cart_id}/`,
        sendCartSession
      )
        .then(res => {
          console.log(res.status, sendCartSession, "cartSession");

          const token = `Token ${localStorage.getItem("user")}`;
          this.props.CartSession();
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (msgg === "") {
      // alert("if");
      this.setState({ newBookAddtoCart: true });
      const MyCart = {
        bookId: selectedConditon.book_id,
        bookName: selectedConditon.title,
        bookSlug: selectedConditon.slug,

        bookPrice: Math.round(selectedConditon.price),
        bookShippingCost: this.state.offertype
          ? this.state.offertype == "discount"
            ? discount_price
            : Math.round(selectedConditon.price)
          : Math.round(selectedConditon.price),
        bookThumb: selectedConditon.image,
        bookQty: 1,

        bookOffer: this.state.offertype,
        bookInvId: selectedConditon.newbook_inv_id,
        discount_price: discount_price,
        cashback_price: cashback_price,
        discount_per: selectedConditon.discount_percent
          ? selectedConditon.discount_percent
          : 0,
        cashback_per: selectedConditon.cashback_percent
          ? selectedConditon.cashback_percent
          : 0,
        delivery_cost: selectedConditon.shipping,
        cashbackedPrice: cashback_price,
        discountedPrice: discount_price,
        offertype:
          this.state.offertype.length > 1 ? this.state.offertype : null,
      };

      const sendCartSession = {
        book_id: selectedConditon.book_id,
        book_inv_id: selectedConditon.newbook_inv_id,
        cashbackedPrice: cashback_price,
        discountedPrice: discount_price,
        cashback_per: selectedConditon.cashback_percent
          ? selectedConditon.cashback_percent
          : 0,
        discount_per: selectedConditon.discount_percent
          ? selectedConditon.discount_percent
          : 0,
        offertype:
          this.state.offertype.length > 1 ? this.state.offertype : null,
        "content-type": "application/json",
      };
      //  Add to Cart Session
      const cartSession_body = { cs: encryptor(sendCartSession) };
      if (this.props.userComponentStatus == 2) {
        this.setState({ Buy_cartLoader: true });
        this.props
          .AddToCartLogin({ sendCartSession })
          .then(res => {
            this.RefreshCart();
            window.location.replace("/view-cart");

            this.props.userdetails();
            this.setState({ Buy_cartLoader: false });
          })
          .catch(err => {
            console.log(err);
            this.props.AddToCart(MyCart);
            this.setState({
              Buy_cartLoader: false,
              Show_Error_msg: true,
              error_msg:
                "Book Not Added To Cart Due To Some Error .Please Refresh The Page.",
            });
            // console.log(sendCartSession)
          });
        //  Refreshing Cart after response
      } else {
        this.props.AddToCart(MyCart);
        this.props.ToBeAddedToCart({
          book_id: selectedConditon.book_id,
          book_inv_id: selectedConditon.newbook_inv_id,
          cashbackedPrice: cashback_price,
          discountedPrice: discount_price,
          cashback_per: this.state.selectedConditon.cashback_percent
            ? this.state.selectedConditon.cashback_percent
            : 0,
          discount_per: this.state.selectedConditon.discount_percent
            ? this.state.selectedConditon.discount_percent
            : 0,
          offertype:
            this.state.offertype.length > 1 ? this.state.offertype : null,
        });
        // this.props.CartopenModal();
        window.location.replace("/view-cart");
      }
    } else {
      this.setState({ AlreadyinCartMsgNewBook: "Already In cart" });
      // this.props.CartopenModal();
      window.location.replace("/view-cart");
    }
  };
  DicountedPrice = price => {
    let discountedPrice =
      price - (price * this.props.new_book_data.discount_percent) / 100;
    return Math.round(discountedPrice);
  };

  CashbackPrice = price => {
    let cashbackedPrice =
      price - (price * this.props.new_book_data.cashback_percent) / 100;
    return Math.round(cashbackedPrice);
  };
  TotalBookCost = (mrp, shipping) => {
    if (this.state.offertype !== "") {
      if (this.state.offertype === "discount") {
        return this.DicountedPrice(mrp) + shipping;
      } else {
        return mrp + shipping;
      }
    } else {
      return mrp + shipping;
    }
  };

  ResizeBreadcrumbs_title = title => {
    if (title.length > 30) {
      return title.substr(0, 30) + "...";
    } else {
      return title;
    }
  };
  readmorebtn = () => {
    this.setState({ readmore: true });
  };
  ResizeDescription = bottomDatta => {
    if (this.state.readmore) {
      return bottomDatta;
    } else {
      if (bottomDatta) {
        if (bottomDatta.length > 500) {
          return bottomDatta.substr(0, 500) + "...";
        } else {
          return bottomDatta;
        }
      }
    }
  };

  RefreshCart = async () => {
    const token = localStorage.getItem("user");
    const details = `Token ${token}`;
    let res = await this.props.CartSession();
    // console.log(res, "res")
    if (res) {
      this.setState({ Add_cartLoader: false });
      return true;
    } else {
      this.setState({
        Add_cartLoader: false,
        Show_Error_msg: true,
        error_msg:
          "Please Refresh The Page.If You Are Getting This Message Repetitively Contact Mypustak Support",
      });

      return false;
    }
  };
  handleClose = () => {
    this.setState({
      show_Error: false,
      openStudyMaterialDialog: false,
      showWishlist: false,
    });
  };
  updateBookImage = book_id => {
    this.props.updateBookImage(book_id);
  };
  calculateBookDetails = () => {
    const bookdetails = this.props.book;
    const bookConditionDetails = this.props.bookCondition;
    const selectedBookCondition = this.state.SelectCond;
    // console.log(this.props.book, "book");
    // console.log(this.props.bookCondition, "bookCondition");
    // console.log(this.state.SelectCond, "SelectConddd");


    let bookDeatils = {
      price: 0,
    };
    let makeAPIReq = false;
    // this.setStateQtyToshow(this.props.bookCondition)


    let final_qty = 0
    console.log(this.props.bookCondition, "this.props.bookCondition")
    Object.keys(this.props.bookCondition).map(condition => {
      let qty = this.props.bookCondition[condition].total_qty;
      // qty_obj[[condition]] = qty;
      final_qty = qty - 1
    });
    console.warn(final_qty, "qty_obj")
    const conditionKeys = Object.keys(bookConditionDetails);
    if (!conditionKeys.includes("is_soldout")) {
      if (selectedBookCondition == "VeryGood") {
        if (!bookConditionDetails.VeryGood) {
          return "";
        }
        if (bookConditionDetails.VeryGood.price_is_updated == "N") {
          const VGbookInventroy = bookConditionDetails.VeryGood;
          const VgBookres = this.updateVeryGoodBookPrice(
            bookdetails,
            VGbookInventroy,
            makeAPIReq
          );
          bookDeatils.price = Math.round(VgBookres);
          return bookDeatils;
        }
        bookDeatils.price = Math.round(bookConditionDetails.VeryGood.shipping);
        return bookDeatils;
      }

      if (selectedBookCondition == "AverageButInReadableCondition") {
        if (!bookConditionDetails.AverageButInReadableCondition) {
          return "";
        }
        if (
          bookConditionDetails.AverageButInReadableCondition.price_is_updated ==
          "N"
        ) {
          const ABRbookInventroy =
            bookConditionDetails.AverageButInReadableCondition;
          const ABRBookres = this.updateAvgBRCondBookPrice(
            bookdetails,
            ABRbookInventroy,
            makeAPIReq
          );
          bookDeatils.price = Math.round(ABRBookres);
          return bookDeatils;
        }
        bookDeatils.price = Math.round(
          bookConditionDetails.AverageButInReadableCondition.shipping
        );
        return bookDeatils;
      }

      if (selectedBookCondition == "AlmostNew") {
        if (!bookConditionDetails.AlmostNew) {
          return "";
        }
        if (bookConditionDetails.AlmostNew.price_is_updated == "N") {
          const ANbookInventroy = bookConditionDetails.AlmostNew;
          const ANBookres = this.updateAlmostNewBookPrice(
            bookdetails,
            ANbookInventroy,
            makeAPIReq
          );
          bookDeatils.price = Math.round(ANBookres);
          return bookDeatils;
        }
        bookDeatils.price = Math.round(bookConditionDetails.AlmostNew.shipping);
        return bookDeatils;
      }
      if (selectedBookCondition == "BrandNew") {
        if (!bookConditionDetails.BrandNew) {
          return "";
        }
        if (bookConditionDetails.BrandNew.price_is_updated == "N") {
          const BNbookInventroy = bookConditionDetails.BrandNew;
          const BNBookres = this.updateBrandNewBookPrice(
            bookdetails,
            BNbookInventroy,
            makeAPIReq
          );
          bookDeatils.price = Math.round(BNBookres);
          return bookDeatils;
        }
        bookDeatils.price = Math.round(bookConditionDetails.BrandNew.shipping);
        return bookDeatils;
      }
    }
    return bookDeatils;
  };

  setStateQtyToshow = bookConditions => {
    let qty_obj = {};
    let qty;
    let final_qty = 0

    Object.keys(bookConditions).map(condition => {
      qty = bookConditions[condition].total_qty;
      qty_obj[[condition]] = qty;
      final_qty = qty - 1
    });
    console.warn(final_qty, "qty_obj")
    this.setState({ book_qty_obj: qty_obj });
  };
  setBookConditionToState = bookConditions => {
    // const bookConditions = this.props.bookCondition;
    const bookdetails = this.props.book;
    let condition_obj = this.props.condition_obj; //book_inv_id rack_no back_image front_image crop_img
    const AvailableConditions = Object.keys(bookConditions);
    let bookInventory;
    AvailableConditions.map(condition => {
      bookInventory = bookConditions[condition];

      const { barcode, is_study_material } = bookInventory;

      if (is_study_material) {
        this.setState({ study_material_barcode: barcode });
      }
      if (condition == "VeryGood" && bookInventory.price_is_updated == "N") {
        const verygoodRes = this.updateVeryGoodBookPrice(
          bookdetails,
          bookInventory
        );
        condition_obj["VeryGood"]["shipping"] = verygoodRes;
      }

      if (condition == "AlmostNew" && bookInventory.price_is_updated == "N") {
        const AlmNewRes = this.updateAlmostNewBookPrice(
          bookdetails,
          bookInventory
        );
        condition_obj["AlmostNew"]["shipping"] = AlmNewRes;
      }

      if (
        condition == "AverageButInReadableCondition" &&
        bookInventory.price_is_updated == "N"
      ) {
        const ABRRes = this.updateAvgBRCondBookPrice(
          bookdetails,
          bookInventory
        );
        condition_obj["AverageButInReadableCondition"]["shipping"] = ABRRes;
      }

      if (condition == "BrandNew" && bookInventory.price_is_updated == "N") {
        const BrandNewRes = this.updateBrandNewBookPrice(
          bookdetails,
          bookInventory
        );
        condition_obj["BrandNew"]["shipping"] = BrandNewRes;
      }
    });
    this.setState({
      book_conditions_obj: condition_obj,
      no_of_conditions: Object.keys(condition_obj).length,
    });
  };

  addPercentToPrice = (value, percent) => {
    return value + (value * percent) / 100;
  };
  updateVeryGoodBookPrice = (book, inventroy, makeAPIReq = true) => {
    // let book = this.props.book;
    console.log(book, inventroy, "updateVeryGoodBookPrice");
    var VGCalBookPrice = Number(inventroy.MRP);
    var VGCalBookWt = Number(inventroy.weight);
    var VGCalBookCond = "VeryGood";
    var VGCalbookInvId = inventroy.book_inv_id;
    var VGNewPriceingModel = 0;

    var VGColAPrice = Number(VGCalBookWt * 197.5); //Col A 148125 47.4

    var VGColBPrice = Number((41 * VGCalBookPrice) / 100); //Col B 247.5  66

    var VGColCprice = 0;

    if (VGCalBookWt < 0.95) {
      // console.log("in less than  0.95");
      VGColCprice = Number(VGCalBookWt * 150); // Col C -1 33.6
    } else if (VGCalBookWt >= 0.95) {
      // console.log("in Greater than 0.95");    // Col C -2 135
      VGCalBookWt * 100 > 140
        ? (VGColCprice = Number(VGCalBookWt * 100))
        : (VGColCprice = 140);
    }

    var VGColDprice = 0;
    if (VGColBPrice < VGColCprice) {
      VGColDprice = VGColCprice;
    } else {
      //  Col D -1 247.5 66
      VGColDprice = VGColBPrice;
    } //  Col D -1

    // var VGColEPrice = VGCalBookWt*300   // Col E
    var VGColEPrice = 0;
    if (1 <= VGCalBookPrice && VGCalBookPrice <= 100) {
      VGColEPrice = (VGCalBookPrice * 48) / 100;
      // console.log("in Range 48",VGCalBookPrice);
    } else if (101 <= VGCalBookPrice && VGCalBookPrice <= 200) {
      VGColEPrice = (VGCalBookPrice * 45) / 100;
      // console.log("in Range 45");
    } else if (201 <= VGCalBookPrice && VGCalBookPrice <= 300) {
      VGColEPrice = (VGCalBookPrice * 40) / 100;
      // console.log("in Range 40");
    } else if (301 <= VGCalBookPrice && VGCalBookPrice <= 500) {
      VGColEPrice = (VGCalBookPrice * 35) / 100;
      // console.log("in Range 35");
    } else if (501 <= VGCalBookPrice && VGCalBookPrice <= 1000) {
      VGColEPrice = (VGCalBookPrice * 28) / 100;
      // console.log("in Range 28"); // 210
    } else if (1001 <= VGCalBookPrice && VGCalBookPrice <= 2000) {
      VGColEPrice = (VGCalBookPrice * 28) / 100;
      // console.log("in Range 28 1001-2000");
    } else if (2001 <= VGCalBookPrice && VGCalBookPrice <= 5000) {
      VGColEPrice = (VGCalBookPrice * 20) / 100;
      // console.log("in Range 20");
    } else if (VGCalBookPrice >= 5001) {
      VGColEPrice = (VGCalBookPrice * 15) / 100;
    } else {
      // console.log("in Range else");
    }

    var VGColFPrice = 0;
    if (VGColDprice < VGColEPrice) {
      VGColFPrice = VGColEPrice; // Co90l F = E 247
      VGNewPriceingModel = VGColFPrice;
    } else {
      VGColFPrice = VGColDprice; // Col F = D
      VGNewPriceingModel = VGColFPrice;
    }

    var VGWt400 = VGCalBookWt * 480;
    if (VGColFPrice > VGWt400) {
      VGColFPrice = VGWt400;
      VGNewPriceingModel = VGColFPrice;
    } else {
      // VGColFPrice = VGColFPrice
      VGNewPriceingModel = VGColFPrice;
    }
    // VGNewPriceingModel = this.addPercentToPrice(VGNewPriceingModel, 5)
    let added_rs_three = 3;
    VGNewPriceingModel = VGNewPriceingModel + added_rs_three;
    const VGsendData = {
      data: {
        book_inv_id: VGCalbookInvId,
        colA: VGColAPrice,
        colB: VGColBPrice,
        colC: VGColCprice,
        colD: VGColDprice,
        colE: VGColEPrice,
        colF: VGColFPrice,
        weight: VGCalBookWt,
        mrp: VGCalBookPrice,
        condition: "VeryGood",
        new_price: Math.round(VGNewPriceingModel),
      },
    };
    if (inventroy.price_is_updated == "N" && makeAPIReq) {
      this.props.setNewPricing(VGsendData);
    }

    return Math.round(VGNewPriceingModel);
  };
  updateAlmostNewBookPrice = (book, inventroy, makeAPIReq = true) => {
    var ANCalBookPrice = Number(inventroy.MRP);
    var ANCalBookWt = Number(inventroy.weight);
    var ANCalBookCond = "AlmostNew";
    var ANCalbookInvId = inventroy.book_inv_id;
    var ANNewPriceingModel = 0;

    var ANColAPrice = Number(ANCalBookWt * 197.5);

    var ANColBPrice = Number((44 * ANCalBookPrice) / 100);

    var ANColCprice = 0;

    if (ANCalBookWt < 0.95) {
      // console.log("in less than  0.95");
      ANColCprice = Number(ANCalBookWt * 150);
    } else if (ANCalBookWt >= 0.95) {
      // console.log("in Greater than 0.95");
      ANCalBookWt * 100 > 140
        ? (ANColCprice = Number(ANCalBookWt * 100))
        : (ANColCprice = 140);
    }

    var ANColDprice = 0;
    if (ANColBPrice < ANColCprice) {
      ANColDprice = ANColCprice;
    } else {
      ANColDprice = ANColBPrice;
    }
    // var ANColEPrice = ANCalBookWt*300
    var ANColEPrice = 0;
    if (1 <= ANCalBookPrice && ANCalBookPrice <= 100) {
      ANColEPrice = (ANCalBookPrice * 48) / 100;
      // console.log("in Range 48");
    } else if (101 <= ANCalBookPrice && ANCalBookPrice <= 200) {
      ANColEPrice = (ANCalBookPrice * 45) / 100;
      // console.log("in Range 45");
    } else if (201 <= ANCalBookPrice && ANCalBookPrice <= 300) {
      ANColEPrice = (ANCalBookPrice * 40) / 100;
      // console.log("in Range 40");
    } else if (301 <= ANCalBookPrice && ANCalBookPrice <= 500) {
      ANColEPrice = (ANCalBookPrice * 35) / 100;
      // console.log("in Range 35");
    } else if (501 <= ANCalBookPrice && ANCalBookPrice <= 1000) {
      ANColEPrice = (ANCalBookPrice * 28) / 100;
      // console.log("in Range 28 -2");
    } else if (1001 <= ANCalBookPrice && ANCalBookPrice <= 2000) {
      ANColEPrice = (ANCalBookPrice * 28) / 100;
      // console.log("in Range 28");
    } else if (2001 <= ANCalBookPrice && ANCalBookPrice <= 5000) {
      ANColEPrice = (ANCalBookPrice * 20) / 100;
      // console.log("in Range 20");
    } else if (ANCalBookPrice >= 5001) {
      ANColEPrice = (ANCalBookPrice * 15) / 100;
      // console.log("in Range >= 15");
    } else {
      // console.log('in Range else');
    }

    var ANColFPrice = 0;
    if (ANColDprice < ANColEPrice) {
      ANColFPrice = ANColEPrice; // Col F = E
      ANNewPriceingModel = ANColFPrice;
    } else {
      ANColFPrice = ANColDprice; // Col F = D
      ANNewPriceingModel = ANColFPrice;
    }

    var ANWt400 = ANCalBookWt * 480;
    if (ANColFPrice > ANWt400) {
      ANColFPrice = ANWt400;
      ANNewPriceingModel = ANColFPrice;
    } else {
      // ANColFPrice = ANColFPrice
      ANNewPriceingModel = ANColFPrice;
    }
    // ANNewPriceingModel = this.addPercentToPrice(ANNewPriceingModel,5)
    let added_rs_three = 3;
    ANNewPriceingModel = ANNewPriceingModel + added_rs_three;

    const ANsendData = {
      data: {
        book_inv_id: ANCalbookInvId,
        colA: ANColAPrice,
        colB: ANColBPrice,
        colC: ANColCprice,
        colD: ANColDprice,
        colE: ANColEPrice,
        colF: ANColFPrice,
        weight: ANCalBookWt,
        mrp: ANCalBookPrice,
        condition: "AlmostNew",
        new_price: Math.round(ANNewPriceingModel),
      },
    };
    // console.log(ANsendData,"ANsendData");
    if (inventroy.price_is_updated == "N" && makeAPIReq) {
      this.props.setNewPricing(ANsendData);
    }
    return Math.round(ANNewPriceingModel);
  };
  updateAvgBRCondBookPrice = (book, inventroy, makeAPIReq = true) => {
    var ARCalBookPrice = Number(inventroy.MRP);
    var ARCalBookWt = Number(inventroy.weight);
    var ARCalBookCond = "AverageButInReadableCondition";
    var ARCalbookInvId = inventroy.book_inv_id;
    var ARNewPriceingModel = 0;

    var ARColAPrice = Number(ARCalBookWt * 197.5);

    var ARColBPrice = Number((28 * ARCalBookPrice) / 100);

    var ARColCprice = 0;

    if (ARCalBookWt < 0.95) {
      // console.log("in less than  0.95");
      ARColCprice = Number(ARCalBookWt * 150);
    } else if (ARCalBookWt >= 0.95) {
      // console.log("in Greater than 0.95");
      ARCalBookWt * 100 > 140
        ? (ARColCprice = Number(ARCalBookWt * 100))
        : (ARColCprice = 140);
    }
    var ARColDprice = 0;
    if (ARColBPrice < ARColCprice) {
      ARColDprice = ARColCprice;
    } else {
      ARColDprice = ARColBPrice;
    }
    // var ARColEPrice = ARCalBookWt*300
    var ARColEPrice = 0;
    if (1 <= ARCalBookPrice && ARCalBookPrice <= 100) {
      ARColEPrice = (ARCalBookPrice * 48) / 100;
      // console.log();
    } else if (101 <= ARCalBookPrice && ARCalBookPrice <= 200) {
      ARColEPrice = (ARCalBookPrice * 45) / 100;
      // console.log("in Range 45");
    } else if (201 <= ARCalBookPrice && ARCalBookPrice <= 300) {
      ARColEPrice = (ARCalBookPrice * 40) / 100;
      // console.log("in Range 40");
    } else if (301 <= ARCalBookPrice && ARCalBookPrice <= 500) {
      ARColEPrice = (ARCalBookPrice * 35) / 100;
      // console.log("in Range 35");
    } else if (501 <= ARCalBookPrice && ARCalBookPrice <= 1000) {
      ARColEPrice = (ARCalBookPrice * 28) / 100;
      // console.log("in Range 28");
    } else if (1001 <= ARCalBookPrice && ARCalBookPrice <= 2000) {
      ARColEPrice = (ARCalBookPrice * 28) / 100;
      // console.log("in Range 28 -2 ");
    } else if (2001 <= ARCalBookPrice && ARCalBookPrice <= 5000) {
      ARColEPrice = (ARCalBookPrice * 20) / 100;
      // console.log("in Range 20");
    } else if (ARCalBookPrice >= 5001) {
      ARColEPrice = (ARCalBookPrice * 15) / 100;
      // console.log("in Range 15");
    } else {
      // console.log('in Range else');
    }
    var ARColFPrice = 0;
    if (ARColDprice < ARColEPrice) {
      ARColFPrice = ARColEPrice; // Col F = E
      ARNewPriceingModel = ARColFPrice;
    } else {
      ARColFPrice = ARColDprice; // Col F = D
      ARNewPriceingModel = ARColFPrice;
    }
    var ARWt400 = ARCalBookWt * 480;
    if (ARColFPrice > ARWt400) {
      ARColFPrice = ARWt400;
      ARNewPriceingModel = ARColFPrice;
    } else {
      // ARColFPrice = ARColFPrice
      ARNewPriceingModel = ARColFPrice;
    }
    let added_rs_three = 3;
    ARNewPriceingModel = ARNewPriceingModel + added_rs_three;
    const ARsendData = {
      data: {
        book_inv_id: ARCalbookInvId,
        colA: ARColAPrice,
        colB: ARColBPrice,
        colC: ARColCprice,
        colD: ARColDprice,
        colE: ARColEPrice,
        colF: ARColFPrice,
        weight: ARCalBookWt,
        mrp: ARCalBookPrice,
        condition: "AverageButInReadableCondition",
        new_price: Math.round(ARNewPriceingModel),
      },
    };
    // console.log(ARsendData,"ARsendData");
    if (inventroy.price_is_updated == "N" && makeAPIReq) {
      this.props.setNewPricing(ARsendData);
    }
    return Math.round(ARNewPriceingModel);
  };

  updateBrandNewBookPrice = (book, inventroy, makeAPIReq = true) => {
    var BDCalBookPrice = Number(inventroy.MRP);
    var BDCalBookWt = Number(inventroy.weight);
    var BDCalBookCond = "BrandNew";
    var BDCalbookInvId = inventroy.book_inv_id;
    var BDNewPriceingModel = 0;
    var BDColAPrice = Number(BDCalBookWt * 197.5); //47.4
    var BDColBPrice = Number((45 * BDCalBookPrice) / 100); // 88
    var BDColCprice = 0;
    if (BDCalBookWt < 0.95) {
      BDColCprice = Number(BDCalBookWt * 150); //
    } else if (BDCalBookWt >= 0.95) {
      BDCalBookWt * 100 > 140
        ? (BDColCprice = Number(BDCalBookWt * 100))
        : (BDColCprice = 140);
    }
    var BDColDprice = 0;
    if (BDColBPrice < BDColCprice) {
      BDColDprice = BDColCprice;
    } else {
      BDColDprice = BDColBPrice;
    }
    // var BDColEPrice = BDCalBookWt*300
    var BDColEPrice = 0;
    if (1 <= BDCalBookPrice && BDCalBookPrice <= 100) {
      BDColEPrice = (BDCalBookPrice * 48) / 100;
      // console.log("in Range 48");
    } else if (101 <= BDCalBookPrice && BDCalBookPrice <= 200) {
      BDColEPrice = (BDCalBookPrice * 45) / 100;
      // console.log("in Range 45");
    } else if (201 <= BDCalBookPrice && BDCalBookPrice <= 300) {
      BDColEPrice = (BDCalBookPrice * 40) / 100;
      // console.log("in Range 40");
    } else if (301 <= BDCalBookPrice && BDCalBookPrice <= 500) {
      BDColEPrice = (BDCalBookPrice * 35) / 100;
      // console.log("in Range 35");
    } else if (501 <= BDCalBookPrice && BDCalBookPrice <= 1000) {
      BDColEPrice = (BDCalBookPrice * 28) / 100;
      // console.log("in Range 28");
    } else if (1001 <= BDCalBookPrice && BDCalBookPrice <= 2000) {
      BDColEPrice = (BDCalBookPrice * 28) / 100;
      // console.log("in Range 28 -2");
    } else if (2001 <= BDCalBookPrice && BDCalBookPrice <= 5000) {
      BDColEPrice = (BDCalBookPrice * 20) / 100;
      // console.log("in Range 20");
    } else if (BDCalBookPrice >= 5001) {
      BDColEPrice = (BDCalBookPrice * 15) / 100;
      // console.log("in Range 15");
    } else {
      // console.log("in Range else");
    }
    var BDColFPrice = 0;
    if (BDColDprice < BDColEPrice) {
      BDColFPrice = BDColEPrice; // Col F = E
      BDNewPriceingModel = BDColFPrice;
    } else {
      BDColFPrice = BDColDprice; // Col F = D
      BDNewPriceingModel = BDColFPrice;
    }
    var BDWt400 = BDCalBookWt * 480;
    if (BDColFPrice > BDWt400) {
      BDColFPrice = BDWt400;
      BDNewPriceingModel = BDColFPrice;
    } else {
      // BDColFPrice = BDColFPrice
      BDNewPriceingModel = BDColFPrice;
    }
    // BDNewPriceingModel = this.addPercentToPrice(BDNewPriceingModel,5)
    let added_rs_three = 3;
    BDNewPriceingModel = BDNewPriceingModel + added_rs_three;
    const BDsendData = {
      data: {
        book_inv_id: BDCalbookInvId,
        colA: BDColAPrice,
        colB: BDColBPrice,
        colC: BDColCprice,
        colD: BDColDprice,
        colE: BDColEPrice,
        colF: BDColFPrice,
        weight: BDCalBookWt,
        mrp: BDCalBookPrice,
        condition: "BrandNew",
        new_price: Math.round(BDNewPriceingModel),
      },
    };
    // console.log(BDsendData, 'BDsendData');
    if (inventroy.price_is_updated == "N" && makeAPIReq) {
      this.props.setNewPricing(BDsendData);
    }

    return Math.round(BDNewPriceingModel);
  };
  cartbtn_text = () => {
    let msg = "Add to Cart";
    const selectedCondition = this.state.SelectCond;
    const selectedBookConditionDetails =
      this.state.book_conditions_obj[selectedCondition];

    let book_inv_id = selectedBookConditionDetails
      ? selectedBookConditionDetails.book_inv_id
      : this.props.new_book_data.newbook_inv_id;

    console.log(this.props.incart_check, "msgg");
    this.props.incart_check.map(cart => {
      if (cart.bookInvId == book_inv_id) {
        msg = "Go To Cart";
      }
    });
    return msg;
  };
  AddOldBookToCart = e => {
    const { getuserdetails } = this.props;
    const selectedCondition = this.state.SelectCond;
    const { defaultImgSrc } = this.state;
    // const selectedCondition = "VeryGood"
    // console.log({defaultImgSrc:defaultImgSrc.replace('https://d1f2zer3rm8sjv.cloudfront.net/','')});
    const book_thumb = defaultImgSrc.replace(
      "https://d1f2zer3rm8sjv.cloudfront.net/",
      ""
    );
    const selectedBookConditionDetails =
      this.state.book_conditions_obj[selectedCondition];
    const { shipping, book_id, title, MRP, image } =
      selectedBookConditionDetails;
    //     selectedBookConditionDetails;
    this.setState({ Add_cartLoader: true });
    const book = this.props.book;
    var msgg = "";
    let book_inv_id = selectedBookConditionDetails.book_inv_id
      ? selectedBookConditionDetails.book_inv_id
      : selectedBookConditionDetails.newbook_inv_id;
    let rack_no = selectedBookConditionDetails.rack_no
      ? selectedBookConditionDetails.rack_no
      : "";
    this.props.incart_check.map(cart =>
      cart.bookInvId === book_inv_id ? (msgg = "already in cart") : null
    );

    const MyCart = {
      bookId: book_id,
      bookName: title,
      bookSlug: this.state.bookSlug,
      bookPrice: Math.round(MRP),
      bookShippingCost: Math.round(shipping),
      bookThumb: book_thumb
        ? book_thumb != "null"
          ? book_thumb
          : image
        : image,
      bookQty: 1,
      bookDonor: "",
      bookQty: 1,
      bookCond: selectedCondition,
      bookRackNo: rack_no,
      bookInvId: book_inv_id,
      delivery_cost: 0,
      cashbackedPrice: 0,
      discountedPrice: 0,
      cashback_per: 0,
      discount_per: 0,
      offertype: null,
      discount: 0,
      cashback: 0,
      book_thumb: book_thumb,

      // bookDonner
    };
    const sendCartSession = {
      book_id: book.book_id,
      book_inv_id: book_inv_id,
      cashbackedPrice: 0,
      discountedPrice: 0,
      cashback_per: 0,
      discount_per: 0,
      offertype: null,
      book_thumb: book_thumb ? book_thumb : book.thumb,
    };
    if (msgg === "") {
      if (this.props.userComponentStatus == 2) {
        // if (true) {
        this.props
          .AddToCartLogin({ sendCartSession })
          .then(res => {
            this.setState({ Add_cartLoader: false });
            // this.RefreshCart();

            this.props.CartopenModal();
          })
          .catch(err => {
            console.log({ err });
            this.props.CartopenModal();
            // this.props.AddToCart(MyCart);
            this.setState({
              Add_cartLoader: false,
              Show_Error_msg: true,
              error_msg:
                "Book Not Added To Cart Due To Some Error .Please Refresh The Page.",
            });
          });
      } else {
        this.props.AddToCart(MyCart);
        this.props.ToBeAddedToCart({
          book_id: book.book_id,
          book_inv_id: book_inv_id,
          cashbackedPrice: 0,
          discountedPrice: 0,
          cashback_per: 0,
          discount_per: 0,
          offertype: null,
        });
        this.props.CartopenModal();
        this.setState({ Add_cartLoader: false });
      }
    } else {
      // alert("Already Added")
      this.setState({
        AlreadyinCartMsgNewBook: "Already In cart",
        Add_cartLoader: false,
      });

      this.props.CartopenModal();
      // setTimeout(()=>{ this.setState({AlreadyinCartMsgNewBook:""})},3000)
    }
  };

  buynow = e => {
    e.preventDefault();
    const { getuserdetails } = this.props;
    const selectedCondition = this.state.SelectCond;
    const { defaultImgSrc } = this.state;
    // const selectedCondition = "VeryGood"
    const book_thumb = defaultImgSrc.replace(
      "https://d1f2zer3rm8sjv.cloudfront.net/",
      ""
    );
    const selectedBookConditionDetails =
      this.state.book_conditions_obj[selectedCondition];
    // return;
    const { book_inv_id, rack_no, shipping, book_id, title, MRP, image } =
      selectedBookConditionDetails;
    this.setState({ Buy_cartLoader: true });
    const book = this.props.book;
    var msgg = "";

    this.props.incart_check.map(cart =>
      `${cart.bookInvId}` === `${book_inv_id}`
        ? (msgg = "already in cart")
        : null
    );
    const MyCart = {
      bookId: book_id,
      bookName: title,
      bookSlug: this.state.bookSlug,
      bookPrice: Math.round(MRP),
      bookShippingCost: Math.round(shipping),
      // bookShippingCost:Math.round(SHIPPING),
      bookThumb: book_thumb
        ? book_thumb != "null"
          ? book_thumb
          : image
        : image,
      bookQty: 1,
      bookDonor: "",
      bookQty: 1,
      bookCond: selectedCondition,
      bookRackNo: rack_no,
      bookInvId: book_inv_id,
      delivery_cost: 0,
      cashbackedPrice: 0,
      discountedPrice: 0,
      cashback_per: 0,
      discount_per: 0,
      offertype: null,
      discount: 0,
      cashback: 0,
      book_thumb: book_thumb,
    };
    const sendCartSession = {
      book_id: book.book_id,
      book_inv_id: book_inv_id,
      cashbackedPrice: 0,
      discountedPrice: 0,
      cashback_per: 0,
      discount_per: 0,
      offertype: null,
      book_thumb: book_thumb ? book_thumb : book.thumb,
    };
    if (msgg === "") {
      // if (this.props.userComponentStatus == 2) {
      if (true) {
        this.props
          .AddToCartLogin({ sendCartSession })
          .then(res => {
            this.setState({ Buy_cartLoader: false });
            window.location.replace("/view-cart");
          })
          .catch(err => {
            console.log({ err });
            // this.props.CartopenModal();
            // this.props.AddToCart(MyCart);
            this.setState({
              Add_cartLoader: false,
              Show_Error_msg: true,
              error_msg:
                "Book Not Added To Cart Due To Some Error .Please Refresh The Page.",
            });
          });
      } else {
        this.props.AddToCart(MyCart);
        this.props.ToBeAddedToCart({
          book_id: book.book_id,
          book_inv_id: book_inv_id,
          cashbackedPrice: 0,
          discountedPrice: 0,
          cashback_per: 0,
          discount_per: 0,
          offertype: null,
        });
        this.props.CartopenModal();
        this.setState({ Buy_cartLoader: false });
      }
    } else {
      // alert("Already Added")
      this.setState({
        AlreadyinCartMsgNewBook: "Already In cart",
        Buy_cartLoader: false,
      });

      window.location.replace("/view-cart");
      // setTimeout(()=>{ this.setState({AlreadyinCartMsgNewBook:""})},3000)
    }
  };
  imgErr = object => {
    this.setState({ falseImgDiv: true, error_url_object: object });
  };
  getEstDeliveryDate = e => {
    const value = e.target.value.trim();
    let errormsg = !isNaN(value) ? "" : `Must be numeric`;
    this.setState({ enteredPincode: e.target.value, pinodeErrMsg: errormsg });
    if (errormsg.length) return;
    if (value.length == 6) {
      const wt = this.props.book.weight;
      const pincode = value;
      this.setState({ show_est_day_loader: true });
      this.ApiEstimate_delivery(pincode, wt, true);
    }
    // }
  };
  ApiEstimate_delivery = (pincode, wt, replace_pincode = false) => {
    console.log(pincode, wt, replace_pincode, "api1");
    const local_est_date = localStorage.getItem("est_pincodes");
    let est_day_str = "";
    if (local_est_date) {
      const local_est_date_data = JSON.parse(local_est_date);
      const local_est_pincode = local_est_date_data.pincode;
      if (local_est_pincode && !replace_pincode) {
        est_day_str = `${moment()
          .add(local_est_date_data.edd, "d")
          .format("DD MMM")} - ${moment()
            .add(local_est_date_data.edd + 3, "d")
            .format("DD MMM")}`;
        this.setState({ est_day_str, show_est_day_loader: false });
        this.setState(state => {
          return { enteredPincode: local_est_date_data.pincode };
        });

        return;
      }
      this.setState({ est_day_str, show_est_day_loader: false });
    } else {
      this.setState({ est_day_str, show_est_day_loader: false });
      // console.log('NO est pincode');
      this.setEstimateDeliverydate(pincode, wt, true);
      return;
    }

    this.setEstimateDeliverydate(pincode, wt, replace_pincode);
  };

  setEstimateDeliverydate = (pincode, wt, replace_pincode) => {
    this.props
      .getEstDeliveryDate({ pincode, wt })
      .then(res => {
        console.log(res, "RESRESRES");
        if (res.estimated_delivery_days) {
          if (replace_pincode) {
            let est_day_str = `${moment()
              .add(res.estimated_delivery_days, "d")
              .format("DD MMM")} - ${moment()
                .add(Number(res.estimated_delivery_days) + 3, "d")
                .format("DD MMM")}`;
            this.setState({ est_day_str, show_est_day_loader: false });
            // this.setState({ est_day_str, show_est_day_loader: false });
            const pincode_details = JSON.stringify({
              pincode: pincode,
              edd: Number(res.estimated_delivery_days),
            });
            localStorage.setItem("est_pincodes", pincode_details);
          }
        } else {
          this.setState({ est_day_str: "", show_est_day_loader: false });
        }
      })
      .catch(err => {
        // console.log({ err });
        // alert("wrong")
        this.setState({
          est_day_str: "",
          Show_Error_msg: true,
          error_msg: err.showErr
            ? err.msg
            : "Error occured while fetching estimated delivery time",
          show_est_day_loader: false,
        });
      });
  };
  handleScroll = () => {
    let scroll = window.scrollY;
    if (scroll < 38) {
      this.setState({ sticky_div: "product_img_normal" });
    } else {
      this.setState({ sticky_div: "product_img_sticky" });
    }
  };

  onChangedNotifyMail = e => {
    this.setState({ [e.target.name]: e.target.value, Notifydata: "" });
  };

  getStudymaterialImages = () => {
    this.setState({ openStudyMaterialDialog: true });
    const body = {
      barcode: this.state.study_material_barcode,
    };
    this.props
      .getStudyMaterialImage(body)
      .then(res => { })
      .catch(err => {
        console.log({ err });
        this.setState({
          show_Error: true,
          show_error_msg: "Error occcured during loading images",
          openStudyMaterialDialog: false,
        });
      });
  };

  smimgErr = e => {
    e.target.onerror = null;
    e.target.src = "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
    return e;
  };

  get_instocks_book = (book_id) => {
    // alert("get_instocks_book")
    this.setState({ multiplebook_dialog: true, multiplebook_loader: true })
    this.props.get_instock_book(book_id).then((res) => {
      console.log(res, "instock")
      this.setState({ multiplebook_loader: false, available_books: res })

      console.log(res)
    }).catch((err) => {
      console.log(err)
      this.setState({ multiplebook_loader: false })

    })
  }

  multiplecartbtn_text = (book_inv_id) => {
    let msg = "Add to Cart";
    console.log(book_inv_id, "book_inv_id")



    // console.log(this.props.incart_check, "msgg");
    this.props.incart_check.map(cart => {
      if (cart.bookInvId == book_inv_id) {
        msg = "Already To Cart";
      }
    });
    return msg;
  };

  check_book_incart = (book_inv_id) => {

    let is_present = false;
    console.log(book_inv_id, "book_inv_id")



    // console.log(this.props.incart_check, "msgg");
    this.props.incart_check.map(cart => {
      if (cart.bookInvId == book_inv_id) {
        is_present = true;
      }
    });
    return is_present;
  }
  addmultiple_tocart = (book_to_cart) => {
    // alert("old books");
    // e.preventDefault();
    // console.log(e.target.SelectCond.value);
    this.setState({ multiple_add_loader: book_to_cart.book_inv_id })
    console.log(book_to_cart, "COND");
    // setAdd_cartLoader(true);
    // setaddtocartloading(true);
    const { getuserdetails } = this.props;

    if (this.check_book_incart(book_to_cart.book_inv_id)) {
      this.props.enqueueSnackbar('Already in Cart', { variant: "warning" });
      this.setState({ multiple_add_loader: null })

      return true
    }
    const book = this.props.book;
    var msgg = "";

    this.props.FromMycart.map(cart =>
      // (`${cart.bookInvId}`===`${BOOK_INV_ID}`)?  msgg="already in cart": null
      `${cart.bookInvId}` === `${book_to_cart.book_inv_id}`
        ? (msgg = "already in cart")
        : null
    );

    const MyCart = {
      bookId: book_to_cart.book_id,
      bookName: book_to_cart.title,
      bookSlug: book_to_cart.slug,
      bookPrice: Math.round(book_to_cart.MRP),
      bookShippingCost: Math.round(book_to_cart.shipping),
      // bookShippingCost:Math.round(SHIPPING),
      bookThumb: book_to_cart.image
        ? book_to_cart.image != "null"
          ? book_to_cart.image
          : book_to_cart.image
        : book_to_cart.image,
      bookQty: 1,
      bookDonor: "",
      bookQty: 1,
      bookCond: book_to_cart.book_condition,
      bookRackNo: book_to_cart.rack_no,
      bookInvId: book_to_cart.book_inv_id,
      delivery_cost: 0,
      cashbackedPrice: 0,
      discountedPrice: 0,
      cashback_per: 0,
      discount_per: 0,
      offertype: null,
      discount: 0,
      cashback: 0,
      book_thumb: book_to_cart.image,

      // bookDonner
    };


    // setMyCart(MyCart);

    const sendCartSession = {
      book_id: book_to_cart.book_id,
      book_inv_id: book_to_cart.book_inv_id,
      cashbackedPrice: 0,
      discountedPrice: 0,
      cashback_per: 0,
      discount_per: 0,
      offertype: null,
      book_thumb: book_to_cart.image,
    };

    if (msgg === "") {
      if (this.props.userComponentStatus == 2) {
        this.props
          .AddToCartLogin({ sendCartSession })
          .then(res => {
            setopen(true);
            this.setState({ multiple_add_loader: null })


            // RefreshCart();
            // setaddtocartloading(false);
            // setAdd_cartLoader(false);
            // setAddedtoCart(false);
          })
          .catch(err => {
            console.log({ err });
            this.setState({ multiple_add_loader: null })



            // setAdd_cartLoader(false);
            // setaddtocartloading(false);
          });
      } else {
        this.props.AddToCart(MyCart);
        this.props.ToBeAddedToCart({
          book_id: book_to_cart.book_id,
          book_inv_id: book_to_cart.book_inv_id,
          cashbackedPrice: 0,
          discountedPrice: 0,
          cashback_per: 0,
          discount_per: 0,
          offertype: null,
        });
        this.setState({ multiple_add_loader: null })

        // thisprops.CartopenModal();

      }
    }

  };
  submitQuestion = () => {
    if (this.props.userComponentStatus == 2) {
      this.setState({
        saveLoader: true
      })
      let body = {
        book_id: this.props.book.book_id,
        user_id: this.props.getuserdetails.id,
        question: this.state.inputQuestion,
      }
      this.props.save_question(body).then(res => {
        this.setState({
          questionSuccess: true,
          saveLoader: false,
        })
      })
        .catch(err => {
          console.log(err, "save question err");
          this.setState({
            saveLoader: false,
          })
        })
    }
    else {
      this.props.enqueueSnackbar("Please login to post a question", {
        variant: "warning",
      });
    }
  }
  handleRefundPolicy = () => {
    this.setState({ openRefundReturnDialog: true })
  }
  closeHandleRefundPolicy = () => {
    this.setState({ openRefundReturnDialog: false })
  }
  closeImageDialog = () => {
    const currentURL = window.location.href;

    // Remove the "full-image" query parameter
    this.setState({ openImageDialog: false, allImagesForMobileDialog: [] })
    const updatedURL = currentURL.replace(/&full-image/g, '');
    window.history.pushState({}, '', updatedURL);
    this.setState({ openImageDialog: false, allImagesForMobileDialog: [] })
  }
  handleImages = () => {
    let allImages = []
    if (this.state.imagesData.length) {
      this.state.imagesData.map((img) => {
        if (img && img.url) {
          allImages.push(img.url)
        }
      })
    }
    if (this.props.new_book_data && this.props.new_book_data.vendor_image && this.props.new_book_data.vendor_image.length) {
      this.props.new_book_data.vendor_image.map((img) => {
        allImages.push(img)
      })
    }
    let Url = window.location.href + "&full-image"
    console.log(this.state.mainImagSrc.url, "3269")
    allImages.unshift(this.state.mainImagSrc.url);
    const uniqueUrls = [...new Set(allImages)];
    window.history.pushState({}, '', Url);
    this.setState({ openImageDialog: true, allImagesForMobileDialog: uniqueUrls })
  }
  handleBackButtonPress = () => {
    if (window.location.search.includes('&full-image')) {
      let allImages = []
      if (this.state.imagesData.length) {
        this.state.imagesData.map((img) => {
          if (img && img.url) {
            allImages.push(img.url)
          }
        })
      }
      if (this.props.new_book_data && this.props.new_book_data.vendor_image && this.props.new_book_data.vendor_image.length) {
        this.props.new_book_data.vendor_image.map((img) => {
          allImages.push(img)
        })
      }
      let Url = window.location.href + "&full-image"
      console.log(this.state.mainImagSrc.url, "3269")
      allImages.unshift(this.state.mainImagSrc.url);
      const uniqueUrls = [...new Set(allImages)];
      // window.history.pushState({}, '', Url);
      this.setState({ openImageDialog: true, allImagesForMobileDialog: uniqueUrls })
    } else {
      this.setState({ openImageDialog: false, allImagesForMobileDialog: [] })
    }
  };
  render() {
    const { book } = this.props;
    const { } = this.state;
    console.log(book_qty_obj, "------------------------------------------book_qty_objbook_qty_obj");
    let GetPoductData = "";
    var bottomDatta = GetPoductData;
    if (this.state.productData === true) {
      var bottomDatta = GetPoductData;
    } else {
      var bottomDatta = GetPoductReview;
    }
    try {
      GetPoductData = book.book_desc;
    } catch (error) { }
    this.props
      .sendBookNotification(body)
      .then(res => {
        this.setState({
          Notifydata: res.message,
        });
      })
      .catch(err => {
        this.setState({
          Notifydata: err.response.data.message,
        });
      });
  }

  setImgsrc = srcobj => {
    this.setState({ mainImagSrc: srcobj });
  };
  setvendorImgsrc = (srcobj, index) => {

    let imgobj = {
      id: index,
      url: srcobj
    }
    this.setState({ mainImagSrc: imgobj });
  };

  render() {
    const { book } = this.props;
    const {
      book_conditions_obj,
      selectedConditon,
      enteredPincode,
      pinodeErrMsg,
      est_day_str,
      show_est_day_loader,
    } = this.state;
    let GetPoductData = "";
    console.log(this.state.book_qty_obj, "book_qty_objbook_qty_obj")
    var bottomDatta = GetPoductData;
    if (this.state.productData === true) {
      var bottomDatta = GetPoductData;
    } else {
      var bottomDatta = GetPoductReview;
    }
    try {
      GetPoductData = book.book_desc;
    } catch (error) { }
    const { parent_cate } = this.state;
    const {
      binding,
      book_desc,
      rack_no,
      no_of_pages,
      publication,
      publication_date,
      slug,
      title,
      language,
      price,
      edition,
      isbn,
      MRP,
    } = this.props.response.books_details;
    return this.props.nodata ? (
      <center>
        <ErrorIcon
          style={{ fontSize: "9rem", marginTop: "2rem" }}
          color='error'
        />
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.7rem",
          }}>
          Sorry! This book is currently not available :(
        </span>
        <span style={{ fontSize: "1.25rem" }}>
          Please go to{" "}
          <Button
            variant='outlined'
            style={{ textTransform: "capitalize" }}
            onClick={() => {
              window.location.replace("/");
            }}>
            Home
          </Button>
        </span>
      </center>
    ) : (
      <React.Fragment>
        <Head>
          <title> {book.title}</title>
          <meta name="description" content={
            "Buy " +
            this.props.book.title +
            `. From mypustak.com. Quality Assured books, Free of Cost. In Good Condition in ` +
            this.props.book.language +
            ` Language. Published by ` +
            this.props.book.publication +
            `. Written by ` +
            this.props.book.author
          } />
          <meta
            name='Description'
            property='og:description'
            content={
              "Buy " +
              this.props.book.title +
              `. From mypustak.com. Quality Assured books, Free of Cost. In Good Condition in ` +
              this.props.book.language +
              ` Language. Published by ` +
              this.props.book.publication +
              `. Written by ` +
              this.props.book.author
            }
          />
          <meta name='og_title' property='og:title' content={book.title} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={this.props.og_url} />
          <meta
            property='og:image'
            content='https://d1f2zer3rm8sjv.cloudfront.net/${this.props.book.image}'
          />
          <script type="application/ld+json">
            {this.props.schema_markup}
          </script>
        </Head>
        <NoSsr>
          {/* <ScrollButton /> */}
        </NoSsr>
        {/*----------------------Product Main Page div------------------------  */}
        <div className={`${styles.main_outterdiv}`}>
          <div data-pid={this.props.book.book_id} className={`${styles.product_topdiv}`}>
            <div className={`${styles.product_maindiv}`}>
              {/* ------------------product Left div ----------------------- */}
              <div
                className={`${styles.product_Left} col-lg-5 col-md-5 col-sm-6 col-12`}>
                <div
                  className={`${this.state.sticky_div == "product_img_sticky"
                    ? styles.product_img_sticky
                    : styles.product_img_normal
                    }`}>
                  <div className={`${styles.left_div_parent}`}>
                    <div className={`${styles.product_Left_innerdiv}`}>
                      <div className={`${styles.product_Left_imgthumb} col-2`}>
                        {" "}

                        {this.state.imagesData.map((srcobj, index) => {
                          return this.state.error_url_object.id ==
                            srcobj?.id ? null : (
                            <div
                              key={index}
                              className={`${styles.product_img_single_div} `}
                              style={{}}>
                              <img
                                alt=''
                                onMouseEnter={() => this.setImgsrc(srcobj)}
                                key={srcobj.id}
                                className={`${styles.image_thumb} ${srcobj.id == 3
                                  ? styles.subimges_rotatediv
                                  : ""
                                  }`}
                                style={{
                                  padding: "5px",
                                  border:
                                    srcobj == this.state.mainImagSrc
                                      ? "2px solid #2157AD"
                                      : null,
                                }}
                                src={srcobj.url}
                               
                                onError={i => (i.target.style.display = "none")}
                              />
                               {
                                  this.setState({video_img:srcobj.url})
                                }
                              <div>
                                {this.state.falseImgDiv
                                  ? this.state.error_url_object.id == srcobj.id
                                    ? "match"
                                    : null
                                  : null}
                              </div>
                            </div>
                          );
                        })}

                        {this.props.new_book_data?.vendor_image?.map((srcobj, index) => {
                          return (
                            <div
                              key={index}
                              className={`${styles.product_img_single_div} `}
                              style={{}}>
                              <img
                                alt=''
                                onMouseEnter={() => this.setvendorImgsrc(srcobj, index)}
                                key={srcobj.id}
                                className={`${styles.image_thumb} 
                                  }`}
                                style={{
                                  padding: "5px",
                                  border:
                                    srcobj == this.state.mainImagSrc.url
                                      ? "2px solid #2157AD"
                                      : null,
                                }}
                                src={srcobj}
                                onError={i => (i.target.style.display = "none")}
                              />
                            
                              <div>
                              </div>
                            </div>
                          );
                        })}
                         {/* video related  */}
                        {/* <div
                              className={`${styles.product_img_single_div} `}
                              style={{}}>
                              <img
                                alt=''
                                className={`${styles.image_thumb} `}
                                style={{
                                  padding: "5px",
                                  
                                }}
                                src={this.state.video_img}
                               
                              />
                              
                              
                            </div> */}
    <Button style={{height:"60px", width:"60px"}}  onClick={()=> {
                                  this.setState({video_popup:true})
                                }}>
<PlayCircleOutlineIcon/>
                                </Button>
                      </div>
                         {/* video related  */}

                      <div
                        className={` ${styles.product_Left_image_div} row col-9 col-sm-9 col-md-9 col-lg-9`}>
                        <div
                          className={`${styles.main_image_div} col text-center`}>
                          <div className=' ' style={{}}>
                            <MediaQuery minWidth={576}>
                              {this.state.bookType == "newbook" ?
                                <center>
                                  <ReactImageMagnify {...{
                                    smallImage: {
                                      alt: 'Book Thumb',
                                      src: this.state.onerror
                                        ? "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png"
                                        : this.state.mainImagSrc.url,
                                      height: 300,
                                      width: 240,
                                      onError: () => {
                                        this.setState({
                                          onerror: true,
                                        });
                                      }
                                    },
                                    largeImage: {
                                      src: this.state.onerror
                                        ? "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png"
                                        : this.state.mainImagSrc.url,
                                      width: 1200,

                                      height: 2200
                                    },
                                    enlargedImageContainerDimensions: {
                                      width: "375%",
                                      height: "140%",
                                      zIndex: 1050
                                    },
                                    enlargedImageContainerStyle: {
                                      zIndex: 1050
                                    },
                                    enlargedImageStyle: {
                                      zIndex: 1050
                                    },
                                  }} />
                                </center> :
                                <Image
                                  alt='product '
                                  width={240}
                                  height={300}
                                  src={
                                    this.state.onerror
                                      ? "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png"
                                      : this.state.mainImagSrc.url
                                  }
                                  priority
                                  onError={() => {
                                    this.setState({
                                      onerror: true,
                                    });
                                  }}
                                />}

                            </MediaQuery>
                            <MediaQuery maxWidth={575}>
                              <Image
                                alt='product '
                                width={240}
                                height={300}
                                src={
                                  this.state.onerror
                                    ? "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png"
                                    : this.state.mainImagSrc.url
                                }
                                onClick={() => { this.handleImages() }}
                                onError={() => {
                                  this.setState({
                                    onerror: true,
                                  });
                                }}
                              />
                            </MediaQuery>


                            {this.state.selectedConditon.qty > 0 ||
                              this.props.new_book_data.newBookQty > 0 ? null : (
                              <div className={`${styles.book_outofstock}`}>
                                Out of Stock
                              </div>
                            )}
                          </div>
                        </div>
                        <div
                          className={`${styles.share_btn_div} col-12 col-sm-3 col-md-3 col-lg-3 `}>
                          {" "}
                          <div>
                            {this.state.bookType == "newbook" ? (
                              <div
                                className={`${styles.product_assured} `}></div>
                            ) : (
                              <div className={`${styles.product_assured} `}>
                                <Image
                                  alt='use book'
                                  className={``}
                                  // layout='responsive'
                                  height={50}
                                  width={170}
                                  src={usedbook_img}
                                />
                              </div>
                            )}
                          </div>
                          <div className={`${styles.icons_div}`}>
                            <div className={`${styles.shareicon}`}>
                              <Popup
                                trigger={
                                  <div
                                    style={{ cursor: "pointer" }}
                                    className='share_btndiv'>
                                    <ShareOutlinedIcon
                                      style={{
                                        color: "#2258AE",
                                        marginTop: "1.2rem",
                                        fontSize: "2rem",
                                      }}
                                    />
                                  </div>
                                }
                                position='left center'
                                on='hover'>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                  }}>
                                  <FacebookShareButton
                                    style={{ padding: "5px", border: "none" }}
                                    url={"www.mypustak.com" + this.props.asPath}
                                    quote={
                                      "MyPustak is  socially responsible online books store providing Quality assured used for Free. You can also donate books and help readers  "
                                    }
                                    hashtag={"#mypustak"}>
                                    <FacebookIcon
                                      round={true}
                                      size={30}
                                      style={{
                                        color: "#0b71ee",
                                        fontSize: "2rem",
                                        border: "none",
                                      }}
                                    />
                                  </FacebookShareButton>

                                  <WhatsappShareButton
                                    style={{ padding: "5px" }}
                                    url={"www.mypustak.com" + this.props.asPath}
                                    title={"Buy Online MyPustak.com"}
                                    separator={" :"}>
                                    <WhatsAppIcon
                                      round={true}
                                      size={30}
                                      style={{
                                        color: "green",
                                        fontSize: "2rem",
                                      }}
                                    />
                                  </WhatsappShareButton>

                                  <TwitterShareButton
                                    style={{ padding: "5px" }}
                                    url={"www.mypustak.com" + this.props.asPath}
                                    title={"mypustak.com"}>
                                    <TwitterIcon round={true} size={30} />
                                  </TwitterShareButton>
                                </div>
                              </Popup>
                            </div>
                            <div>
                              {this.props.new_book_data.newBookQty > 0 ||
                                this.state.selectedConditon.qty > 0 ? (
                                <div className={`${styles.wishlistDiv}`}>
                                  {this.state.showWishlist ? (
                                    this.state.wishlistLoader ? (
                                      <CircularProgress
                                        size={23}
                                        style={{ color: "red" }}
                                        thickness={5.5}
                                      />
                                    ) : (
                                      <FavoriteIcon
                                        onClick={this.Add_to_Wishlist}
                                        style={{
                                          cursor: "pointer",
                                          color: "red",
                                          fontSize: "2rem",
                                        }}
                                      />
                                    )
                                  ) : this.state.wishlistLoader ? (
                                    <CircularProgress
                                      size={23}
                                      style={{ color: "red" }}
                                      thickness={5.5}
                                    />
                                  ) : (
                                    <FavoriteBorderIcon
                                      onClick={this.Add_to_Wishlist}
                                      style={{
                                        cursor: "pointer",
                                        color: "red",
                                        // marginTop: "1.2rem",
                                        fontSize: "2rem",
                                      }}
                                    />
                                  )}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='left_btn_div '>
                      <MediaQuery minWidth={576}>
                        <div
                          className='product_img_bottom '
                          style={{ padding: "1rem" }}>
                          {this.state.bookType == "newbook" ? (
                            this.props.new_book_data.newBookQty > 0 ? (
                              <div
                                className='product_img_bottom_inner  d-flex justify-content-between  mt-4'
                                style={{ columnGap: "1rem" }}>
                                <Button
                                  data-pid={this.props.book.book_id}
                                  onClick={this.buynow_newbook}
                                  className={`${styles.productBuyNowdDiv} ${this.cartbtn_text() == "Go To Cart" ? "alreadyAddedToCart" : ""}`}
                                  onMouseEnter={() => {
                                    this.setState({
                                      buynowhover: true,
                                    });
                                  }}
                                  onMouseLeave={() => {
                                    this.setState({
                                      buynowhover: false,
                                    });
                                  }}
                                  style={{
                                    outline: "none",
                                    background: this.state.buynowhover
                                      ? "#222"
                                      : "#f35631",
                                    color: this.state.buynowhover
                                      ? "#fff"
                                      : "#fff",
                                    width: "14.5rem",
                                  }}
                                  disabled={this.state.Buy_cartLoader}
                                  value={
                                    this.state.Buy_cartLoader
                                      ? `Moving to Cart`
                                      : `Buy Now`
                                  }
                                  startIcon={
                                    <Image
                                      alt='buy now'
                                      src={sendicon}
                                      style={{ fontSize: "2rem" }}
                                    />
                                  }>
                                  <div className={`${styles.BuyNowText}`}>
                                    {this.state.Buy_cartLoader ? (
                                      `Moving to Cart`
                                    ) : (
                                      <div style={{}}>Buy Now </div>
                                    )}
                                  </div>
                                </Button>
                            
                          
                                <Button
                                  data-pid={this.props.book.book_id}
                                  className={`${styles.productAddtoCarddiv} ${this.cartbtn_text() == "Go To Cart" ? "alreadyAddedToCart" : ""}`}
                                  onMouseEnter={() => {
                                    this.setState({
                                      addtocarthover: true,
                                    });
                                  }}
                                  onMouseLeave={() => {
                                    this.setState({
                                      addtocarthover: false,
                                    });
                                  }}
                                  style={{
                                    outline: "none",
                                    width: "14.5rem",
                                    color: this.state.addtocarthover
                                      ? "#2248ae"
                                      : "#fff",
                                    border: this.state.addtocarthover
                                      ? "2px solid #2248ae"
                                      : "2px solid #fff",
                                  }}
                                  fullWidth
                                  value={
                                    this.state.Add_cartLoader
                                      ? `Adding`
                                      : this.state.already_incart
                                        ? `Go to Cart`
                                        : `Add to Cart`
                                  }
                                  onClick={e => {
                                    this.state.already_incart
                                      ? this.goToCart()
                                      : this.state.bookType == "newbook"
                                        ? this.AddNewBookToCart(e)
                                        : this.AddOldBookToCart(e);
                                  }}>
                                  <div className={`${styles.addtoCartText}`}>
                                    {this.state.Add_cartLoader ? (
                                      // `Adding`
                                      <CircularProgress
                                        size={30}
                                        style={{
                                          color: this.state.addtocarthover
                                            ? "#2248ae"
                                            : "white",
                                        }}
                                      />
                                    ) : (
                                      <div style={{}}>
                                        <span>
                                          {" "}
                                          <ShoppingCartIcon
                                            style={{
                                              height: "2rem",
                                              animation: this.state
                                                .addtocarthover
                                                ? "cartanimation2 1.2s"
                                                : null,
                                              animationIterationCount: "1",
                                            }}
                                          />
                                        </span>
                                        {/* Add to Cart77 */}
                                        {this.cartbtn_text()}
                                      </div>
                                    )}
                                  </div>
                                  {/* Add To Cart */}
                                </Button>
                              </div>
                            ) : (
                              <div
                                className='product_img_bottom_inner  d-flex justify-content-between  mt-4'
                                style={{ columnGap: "1rem" }}>
                                <Button
                                  onClick={this.Notify}
                                  className={styles.productNotifyMeDiv}
                                  color='error'
                                  variant='contained'
                                  style={{ outline: "none", width: "95%" }}
                                  startIcon={
                                    <Image
                                      alt='send'
                                      src={sendicon}
                                      style={{ fontSize: "2rem" }}
                                    />
                                  }>
                                  <div className={`${styles.BuyNowText}`}>
                                    Notify Me
                                  </div>
                                </Button>
                              </div>
                            )
                          ) : this.state.selectedConditon.qty > 0 ? (
                            <div
                              className='product_img_bottom_inner d-flex justify-content-between  mt-4'
                              style={{ columnGap: "1rem" }}>
                              <Button
                                onClick={this.buynow}
                                className={`${styles.productBuyNowdDiv} ${this.cartbtn_text() == "Go To Cart" ? "alreadyAddedToCart" : ""}`}
                                disabled={this.state.Buy_cartLoader}
                                onMouseEnter={() => {
                                  this.setState({
                                    buynowhover: true,
                                  });
                                }}
                                onMouseLeave={() => {
                                  this.setState({
                                    buynowhover: false,
                                  });
                                }}
                                style={{
                                  outline: "none",
                                  background: this.state.buynowhover
                                    ? "#d9320b"
                                    : "#f35631",
                                  color: this.state.buynowhover
                                    ? "#fff"
                                    : "#fff",
                                  width: "14.5rem",
                                }}
                                value={
                                  this.state.Buy_cartLoader
                                    ? `Moving to Cart`
                                    : `Buy Now2`
                                }
                                startIcon={
                                  <Image
                                    className={`${styles.buynowimage}`}
                                    alt='buy now'
                                    src={sendicon}
                                    style={{
                                      fontSize: "1.5rem",
                                      transform: this.state.buynowhover
                                        ? "rotate(30deg)"
                                        : null,
                                      transition: "transform .2s ease-in-out",
                                    }}
                                  />
                                }>
                                <div className={`${styles.BuyNowText}`}>
                                  {this.state.Buy_cartLoader ? (
                                    `Moving to Cart`
                                  ) : (
                                    <div style={{}}>Buy Now</div>
                                  )}
                                </div>
                              </Button>
                              <Button
                                data-pid={this.props.book.book_id}
                                className={`${styles.productAddtoCarddiv} ${this.cartbtn_text() == "Go To Cart" ? "alreadyAddedToCart" : ""}`}
                                fullWidth
                                onMouseEnter={() => {
                                  this.setState({
                                    addtocarthover: true,
                                  });
                                }}
                                onMouseLeave={() => {
                                  this.setState({
                                    addtocarthover: false,
                                  });
                                }}
                                style={{
                                  outline: "none",
                                  width: "14.5rem",
                                  color: this.state.addtocarthover
                                    ? "#2248ae"
                                    : "#fff",
                                  border: this.state.addtocarthover
                                    ? "2px solid #2248ae"
                                    : "2px solid #fff",
                                }}
                                value={
                                  this.state.Add_cartLoader
                                    ? `Adding`
                                    : `Add to Cart`
                                }
                                onClick={e => {
                                  this.state.already_incart
                                    ? this.goToCart()
                                    : this.state.bookType == "newbook"
                                      ? this.AddNewBookToCart(e)
                                      : this.AddOldBookToCart(e);
                                }}>
                                <div className={`${styles.addtoCartText}`}>
                                  {this.state.Add_cartLoader ? (
                                    // `Adding`
                                    <CircularProgress
                                      size={30}
                                      style={{
                                        color: this.state.addtocarthover
                                          ? "#2248ae"
                                          : "white",
                                      }}
                                    />
                                  ) : (
                                    <div style={{}}>
                                      <span>
                                        {" "}
                                        <ShoppingCartIcon
                                          style={{
                                            height: "2rem",
                                            animation: this.state.addtocarthover
                                              ? "cartanimation2 1.2s"
                                              : null,
                                            animationIterationCount: "1",
                                          }}
                                        />
                                      </span>

                                      {this.cartbtn_text()}
                                    </div>
                                  )}
                                </div>
                                {/* Add To Cart */}
                              </Button>
                            </div>
                          ) : (
                            <div className="">
                              <div className='product_img_bottom_inner d-flex justify-content-between px-3 mt-4'>
                                <Button
                                  onClick={this.Notify}
                                  className={styles.productNotifyMeDiv}
                                  style={{ outline: "none", width: "90%" }}
                                  color='error'
                                  variant='contained'
                                  startIcon={
                                    <Image
                                      alt='send'
                                      src={sendicon}
                                      style={{ fontSize: "2rem" }}
                                    />
                                  }>
                                  <div className={`${styles.BuyNowText}`}>
                                    Notify Me
                                  </div>
                                </Button>
                              </div>
                              <div style={{ fontSize: "0.9rem", textAlign: "center", marginTop: '0.5rem' }}>Get notified when this book comes back in stock.</div>

                            </div>
                          )}
                        </div>
                      </MediaQuery>
                    </div>
                  </div>
                </div>
              </div>
              {/* ------------------End Product left div ----------------------- */}

              {/* -----------------Product Right Div ---------------------------- */}
              <div
                className={`${styles.product_right}  col-lg-7 col-md-7 col-sm-6 col-12`}>
                <div
                  className='product_right_inner px-2  '
                  style={{ marginBottom: "1rem" }}>
                  <div className={`${styles.breadcrumDiv}`}>
                    <NextBreadcrumbs />
                  </div>
                  <div className='product_right_title_price '>
                    <div
                      className={`${styles.product_right_title_price_inner} pb-3 pt-2 mb-3`}>
                      <h6 className={`${styles.product_title_inner}`}>
                        {title.replace(
                          /(\w)(\w*)/g,
                          (_, firstChar, rest) =>
                            firstChar.toUpperCase() + rest.toLowerCase()
                        )}{" "}
                        <span className={`${styles.languageBindingFont}`}>
                          {" "}
                          ({language},{binding})
                        </span>
                      </h6>
                      <div
                        style={{ fontSize: "0.8rem", display: "flex" }}
                        className='mb-3 '>
                        <span>
                          {this.props.book.author == "NA" ||
                            this.props.book.author == "" ||
                            this.props.book.author == " " ||
                            this.props.book.author == "None" ||
                            this.props.book.author == null ? null : (
                            <span>
                              By{" "}
                              <Link
                                href='/author/[author_name]?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="'
                                as={
                                  `/author/books-` +
                                  this.props.book.author.split(" ").join("-")
                                }
                                className='text-primary'
                                legacyBehavior>
                                {this.props.book.author.replace(
                                  /(\w)(\w*)/g,
                                  (_, firstChar, rest) =>
                                    firstChar.toUpperCase() + rest.toLowerCase()
                                )}
                              </Link>{" "}
                              (Author) &nbsp;{" "}
                            </span>
                          )}
                          {this.props.book.publication == "NA" ||
                            this.props.book.publication == " " ||
                            this.props.book.publication == null ||
                            this.props.book.publication == "None" ? null : (
                            <span>
                              By &nbsp;
                              <Link
                                href='/publication/[publication_name]?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="'
                                as={`/publication/books-${selectedConditon.publication
                                  ? selectedConditon.publication
                                    .split(" ")
                                    .join("-")
                                  : null
                                  }`}
                                className='text-primary'
                                legacyBehavior>
                                {this.props.book.publication.replace(
                                  /(\w)(\w*)/g,
                                  (_, firstChar, rest) =>
                                    firstChar.toUpperCase() + rest.toLowerCase()
                                )}
                              </Link>
                              &nbsp; (Publication)
                            </span>
                          )}
                        </span>
                        <div className={`${styles.product_assured} `} style={{}}>
                          <Image
                            alt='use book'
                            className={``}
                            layout='responsive'
                            src={assured}
                          // style={{ padding: "0.5rem", margin: "0.5rem", background: "black" }}
                          />
                          {/* here */}
                        </div>
                      </div>
                      <div
                        className={`${styles.product_title_price} d-flex justify-content-start  align-items-center`}>
                        <div className={`product_price`}>
                          {this.state.bookType == "newbook" ? (
                            this.state.offertype == "discount" ? (
                              <span>
                                <span className={`${styles.font15}`}>
                                  ₹{this.DicountedPrice(this.props.book.MRP)}
                                </span>{" "}
                                <s className={`${styles.decoration_overline}`}>
                                  ₹{this.props.book.MRP}
                                </s>{" "}
                                &nbsp;
                                <span className={`${styles.savedPercent}`}>
                                  ₹
                                  {Math.ceil(
                                    this.props.book.MRP -
                                    this.DicountedPrice(this.props.book.MRP)
                                  )}{" "}
                                  <span className={`${styles.colorGray}`}>
                                    {" "}
                                    saved!{" "}
                                  </span>
                                </span>
                              </span>
                            ) : (
                              <span>
                                <span className={`${styles.font15}`}>
                                  ₹{this.props.book.MRP}
                                </span>{" "}
                                &nbsp;
                                <span className={`${styles.savedPercent}`}>
                                  Effective price ₹
                                  {this.CashbackPrice(
                                    parseInt(this.props.new_book_data.MRP)
                                  )}
                                  !
                                </span>
                              </span>
                            )
                          ) : (
                            <span className={`${styles.payonly}`}>
                              <span
                                className={`${styles.font15} ${styles.colorGray} `}>
                                <span className={`${styles.font08} `}>
                                  {" "}
                                  Pay Only Shipping & Handling &nbsp;
                                </span>{" "}
                              </span>{" "}
                              <span>
                                {this.props.SelectCond.length ? (
                                  <span style={{ fontSize: "1.5rem" }}>
                                    ₹ {this.calculateBookDetails().price}
                                  </span>
                                ) : (
                                  ""
                                )}
                                <s className={`${styles.decoration_overline}`}>
                                  ₹{selectedConditon.MRP}
                                </s>{" "}
                                &nbsp;
                                <span className={`${styles.savedPercent}`}>
                                  Free &nbsp;
                                  <HelpIcon
                                    onClick={() => {
                                      this.setState({
                                        openwhyfreeinfo: true,
                                      });
                                    }}
                                    fontSize='small'
                                    className={`${styles.helpIcon}`}
                                  />
                                </span>
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* product codition Div  */}
                  {this.state.selectedConditon.qty ||
                    this.props.newbook_condition.length > 0 ? (
                    <div className={`${styles.product_right_condition}`}>
                      <div
                        className={`${styles.product_right_condition_inner} row g-0`}>
                        <div
                          className={` ${styles.product_book_condition} col-12`} style={{ textAlign: 'center' }}>
                          <span style={{}}>Book Condition</span>
                        </div>

                        <div className={`${styles.condition_div} col-8`}>
                          {this.state.bookType == "usedbook" ||
                            this.props.newbook_condition.length > 0 ? (
                            <div className={`${styles.Selection_book_cond}`}>
                              <div
                                className={`${styles.book_condition_button} row`}>
                                {book_conditions_obj.BrandNew ? (
                                  <button
                                    className={
                                      this.state.SelectCond === "BrandNew"
                                        ? `${styles.contained_btn}  `
                                        : `${styles.outlined_btn} `
                                    }
                                    onClick={e =>
                                      this.onChangedCondition(e, "BrandNew")
                                    }>
                                    <div>
                                      <div>
                                        <span className='text-dark  d-flex justify-content-evenly '>
                                          Brand New{" "}
                                          <Tooltip
                                            title='Book from donors'
                                            arrow>
                                            <AutoStoriesIcon
                                              style={{ fontSize: 15 }}
                                              color='warning'
                                            />
                                          </Tooltip>
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <span>
                                          {" "}
                                          ₹&nbsp;
                                          {Math.ceil(
                                            book_conditions_obj.BrandNew
                                              .shipping
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                ) : null}

                                {book_conditions_obj.AlmostNew ? (
                                  <button
                                    onClick={e =>
                                      this.onChangedCondition(e, "AlmostNew")
                                    }
                                    className={
                                      this.state.SelectCond === "AlmostNew"
                                        ? `${styles.contained_btn} `
                                        : `${styles.outlined_btn} `
                                    }
                                    size='small'>
                                    <div>
                                      <div>
                                        <span className='text-dark  d-flex justify-content-evenly '>
                                          <span className={`${styles.font08}`}>
                                            As Good As New
                                          </span>
                                          <Tooltip
                                            title='Book from donors'
                                            arrow>
                                            <AutoStoriesIcon
                                              style={{ fontSize: 15 }}
                                              color='warning'
                                            />
                                          </Tooltip>
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <span>
                                          ₹&nbsp;
                                          {Math.ceil(
                                            book_conditions_obj.AlmostNew
                                              .shipping
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                ) : null}

                                {book_conditions_obj.VeryGood ? (
                                  <button
                                    className={
                                      this.state.SelectCond === "VeryGood"
                                        ? `${styles.contained_btn} `
                                        : `${styles.outlined_btn} `
                                    }
                                    size='small'
                                    onClick={e =>
                                      this.onChangedCondition(e, "VeryGood")
                                    }>
                                    <div>
                                      <div>
                                        {" "}
                                        <span className='text-dark  d-flex justify-content-evenly '>
                                          Very Good
                                          <Tooltip
                                            title='Book from donors'
                                            arrow>
                                            <AutoStoriesIcon
                                              style={{ fontSize: 15 }}
                                              color='warning'
                                            />
                                          </Tooltip>
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <span>
                                          ₹&nbsp;
                                          {Math.ceil(
                                            book_conditions_obj.VeryGood
                                              .shipping
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                ) : null}
                                {book_conditions_obj.AverageButInReadableCondition ? (
                                  <button
                                    className={
                                      this.state.SelectCond ===
                                        "AverageButInReadableCondition"
                                        ? `${styles.contained_btn} `
                                        : `${styles.outlined_btn} `
                                    }
                                    size='small'
                                    onClick={e =>
                                      this.onChangedCondition(
                                        e,
                                        "AverageButInReadableCondition"
                                      )
                                    }>
                                    <div>
                                      <div>
                                        {" "}
                                        <span className='text-dark  d-flex justify-content-evenly '>
                                          <span style={{ fontSize: "0.8rem" }}>
                                            Good & Readable
                                          </span>
                                          <Tooltip
                                            title='Book from donors'
                                            arrow>
                                            <AutoStoriesIcon
                                              style={{ fontSize: 15 }}
                                              color='warning'
                                            />
                                          </Tooltip>
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <span>
                                          ₹&nbsp;
                                          {Math.ceil(
                                            book_conditions_obj
                                              .AverageButInReadableCondition
                                              .shipping
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                ) : null}

                                {this.props.newbook_condition == "BrandNewN" ? (
                                  <button
                                    className={
                                      this.state.SelectCond === "BrandNewN"
                                        ? `${styles.contained_btn}  `
                                        : `${styles.outlined_btn} `
                                    }
                                    onClick={e =>
                                      this.onChangedCondition(e, "BrandNewN")
                                    }>
                                    <div>
                                      <div>
                                        <span className='text-dark  d-flex justify-content-evenly '>
                                          <span
                                            style={{ justifySelf: "center" }}>
                                            Brand New{" "}
                                          </span>
                                          <Tooltip
                                            title='Book from suppliers'
                                            arrow>
                                            <AutoStoriesIcon
                                              style={{ fontSize: 15 }}
                                              color='primary'
                                            />
                                          </Tooltip>
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <s className='text-dark font-weight-bold '>
                                          {" "}
                                          ₹&nbsp;
                                          {Math.ceil(
                                            this.props.new_book_data.price
                                          )}
                                        </s>
                                        {this.state.offertype == "discount" ? (
                                          <span className=' font-weight-bold'>
                                            {" "}
                                            ₹
                                            {this.DicountedPrice(
                                              this.props.book.MRP
                                            )}
                                          </span>
                                        ) : (
                                          <span className='font-weight-bold'>
                                            {" "}
                                            ₹
                                            {this.CashbackPrice(
                                              this.props.book.MRP
                                            )}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </button>
                                ) : null}

                                {this.props.newbook_condition ==
                                  "AlmostNewN" ? (
                                  <button
                                    onClick={e =>
                                      this.onChangedCondition(e, "AlmostNewN")
                                    }
                                    className={
                                      this.state.SelectCond === "AlmostNewN"
                                        ? `${styles.contained_btn} `
                                        : `${styles.outlined_btn} `
                                    }
                                    size='small'>
                                    <div>
                                      <div>
                                        <span className='text-dark  d-flex justify-content-evenly '>
                                          As Good As New
                                          <Tooltip
                                            title='Book from suppliers'
                                            arrow>
                                            <AutoStoriesIcon
                                              style={{ fontSize: 15 }}
                                              color='primary'
                                            />
                                          </Tooltip>
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <span>
                                          ₹&nbsp;
                                          {Math.ceil(
                                            this.props.new_book_data.price
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                ) : null}

                                {this.props.newbook_condition == "VeryGoodN" ? (
                                  <button
                                    className={
                                      this.state.SelectCond === "VeryGoodN"
                                        ? `${styles.contained_btn} `
                                        : `${styles.outlined_btn} `
                                    }
                                    size='small'
                                    onClick={e =>
                                      this.onChangedCondition(e, "VeryGoodN")
                                    }>
                                    <div>
                                      <div>
                                        {" "}
                                        <span className='text-dark  d-flex justify-content-evenly '>
                                          Very Good
                                          <Tooltip
                                            title='Book from suppliers'
                                            arrow>
                                            <AutoStoriesIcon
                                              style={{ fontSize: 15 }}
                                              color='primary'
                                            />
                                          </Tooltip>
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <span>
                                          ₹&nbsp;
                                          {Math.ceil(
                                            this.props.new_book_data.price
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                ) : null}
                                {this.props.newbook_condition ==
                                  "AverageButInReadableConditionN" ? (
                                  <button
                                    // style={{ margin: "0rem 0.2rem" }}
                                    className={
                                      this.state.SelectCond ===
                                        "AverageButInReadableConditionN"
                                        ? `${styles.contained_btn} `
                                        : `${styles.outlined_btn} `
                                    }
                                    size='small'
                                    onClick={e =>
                                      this.onChangedCondition(
                                        e,
                                        "AverageButInReadableConditionN"
                                      )
                                    }>
                                    <div>
                                      <div>
                                        {" "}
                                        <span className='text-dark  d-flex justify-content-evenly '>
                                          <span className={`${styles.font08}`}>
                                            Good & Readable
                                          </span>
                                          <Tooltip
                                            title='Book from suppliers'
                                            arrow>
                                            <AutoStoriesIcon
                                              style={{ fontSize: 15 }}
                                              color='primary'
                                            />
                                          </Tooltip>
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <span>
                                          ₹&nbsp;
                                          {Math.ceil(
                                            this.props.new_book_data.price
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          ) : this.state.bookType == "usedbook" ? (
                            <div className={`${styles.Selection_book_cond}`}>
                              <div
                                className={`${styles.book_condition_button} row`}>
                                {book_conditions_obj.BrandNew ? (
                                  <button
                                    // style={{ margin: "0rem 0.2rem" }}
                                    className={
                                      this.state.SelectCond === "BrandNew"
                                        ? `${styles.contained_btn}  `
                                        : `${styles.outlined_btn} `
                                    }
                                    onClick={e =>
                                      this.onChangedCondition(e, "BrandNew")
                                    }>
                                    <div>
                                      <div>
                                        <span className='text-dark '>
                                          BrandNew{" "}
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <span>
                                          {" "}
                                          ₹&nbsp;
                                          {Math.ceil(
                                            book_conditions_obj.BrandNew
                                              .shipping
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                ) : null}

                                {book_conditions_obj.AlmostNew ? (
                                  <button
                                    onClick={e =>
                                      this.onChangedCondition(e, "AlmostNew")
                                    }
                                    className={
                                      this.state.SelectCond === "AlmostNew"
                                        ? `${styles.contained_btn} `
                                        : `${styles.outlined_btn} `
                                    }
                                    size='small'>
                                    <div>
                                      <div>
                                        <span className='text-dark '>
                                          As Good As New
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <span>
                                          ₹&nbsp;
                                          {Math.ceil(
                                            book_conditions_obj.AlmostNew
                                              .shipping
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                ) : null}

                                {book_conditions_obj.VeryGood ? (
                                  <button
                                    className={
                                      this.state.SelectCond === "VeryGood"
                                        ? `${styles.contained_btn} `
                                        : `${styles.outlined_btn} `
                                    }
                                    size='small'
                                    onClick={e =>
                                      this.onChangedCondition(e, "VeryGood")
                                    }>
                                    <div>
                                      <div>
                                        {" "}
                                        <span className='text-dark '>
                                          Very Good
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <span>
                                          ₹&nbsp;
                                          {Math.ceil(
                                            book_conditions_obj.VeryGood
                                              .shipping
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                ) : null}
                                {book_conditions_obj.AverageButInReadableCondition ? (
                                  <button
                                    className={
                                      this.state.SelectCond ===
                                        "AverageButInReadableCondition"
                                        ? `${styles.contained_btn} `
                                        : `${styles.outlined_btn} `
                                    }
                                    size='small'
                                    onClick={e =>
                                      this.onChangedCondition(
                                        e,
                                        "AverageButInReadableCondition"
                                      )
                                    }>
                                    <div>
                                      <div>
                                        {" "}
                                        <span className='text-dark '>
                                          Good & Readable
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <span>
                                          ₹&nbsp;
                                          {Math.ceil(
                                            book_conditions_obj
                                              .AverageButInReadableCondition
                                              .shipping
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          ) : (
                            <div className={`${styles.Selection_book_cond}`}>
                              <div
                                className={`${styles.book_condition_button} row`}>
                                {this.props.newbook_condition == "BrandNewN" ? (
                                  <button
                                    className={
                                      this.state.SelectCond === "BrandNewN"
                                        ? `${styles.contained_btn}  `
                                        : `${styles.outlined_btn} `
                                    }
                                    onClick={e =>
                                      this.onChangedCondition(e, "BrandNewN")
                                    }>
                                    <div>
                                      <div>
                                        <span className='text-dark '>
                                          BrandNew{" "}
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <span>
                                          {" "}
                                          ₹&nbsp;
                                          {Math.ceil(
                                            this.props.new_book_data.price
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                ) : null}

                                {this.props.newbook_condition ==
                                  "AlmostNewN" ? (
                                  <button
                                    onClick={e =>
                                      this.onChangedCondition(e, "AlmostNewN")
                                    }
                                    className={
                                      this.state.SelectCond === "AlmostNewN"
                                        ? `${styles.contained_btn} `
                                        : `${styles.outlined_btn} `
                                    }
                                    size='small'>
                                    <div>
                                      <div>
                                        <span className='text-dark '>
                                          As Good As New
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <span>
                                          ₹&nbsp;
                                          {Math.ceil(
                                            this.props.new_book_data.price
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                ) : null}

                                {this.props.newbook_condition == "VeryGoodN" ? (
                                  <button
                                    className={
                                      this.state.SelectCond === "VeryGoodN"
                                        ? `${styles.contained_btn} `
                                        : `${styles.outlined_btn} `
                                    }
                                    size='small'
                                    onClick={e =>
                                      this.onChangedCondition(e, "VeryGoodN")
                                    }>
                                    <div>
                                      <div>
                                        {" "}
                                        <span className='text-dark '>
                                          Very Good
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <span>
                                          ₹&nbsp;
                                          {Math.ceil(
                                            this.props.new_book_data.price
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                ) : null}
                                {this.props.newbook_condition ==
                                  "AverageButInReadableConditionN" ? (
                                  <button
                                    className={
                                      this.state.SelectCond ===
                                        "AverageButInReadableConditionN"
                                        ? `${styles.contained_btn} `
                                        : `${styles.outlined_btn} `
                                    }
                                    size='small'
                                    onClick={e =>
                                      this.onChangedCondition(
                                        e,
                                        "AverageButInReadableConditionN"
                                      )
                                    }>
                                    <div>
                                      <div>
                                        {" "}
                                        <span className='text-dark '>
                                          Good & Readable
                                        </span>
                                      </div>
                                      <div className='subtext_cond'>
                                        {/* InStock */}
                                        &nbsp;
                                        <span>
                                          ₹&nbsp;
                                          {Math.ceil(
                                            this.props.new_book_data.price
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </button>
                                ) : null}
                              </div>
                            </div>
                          )}
                        </div>
                        {/* View more Button for multiple books Start */}
                        {false ?
                          <Button
                            className={` ${styles.product_book_condition} col-2 `}
                            variant="outlined"
                            onClick={() => this.get_instocks_book(this.props.response.books_details.book_id)}>
                            View More {this.props.response.books_details.total_qty}
                          </Button> : null}
                        {/* View more Button for multiple books End */}

                      </div>
                    </div>
                  ) : (
                    <div className='  d-flex justify-content-center '>
                      <span
                        color='error'
                        className={`${styles.font15} text-danger `}>
                        Out of Stock
                      </span>
                    </div>
                  )}
                  {this.state.bookType == "newbook" ? (
                    <div className={`${styles.product_right_condition}`}>
                      <div
                        className={`${styles.product_right_condition_inner} row g-0`}>
                        <div
                          className={` ${styles.product_book_condition} col-2`}>
                          <span>Offers</span>
                        </div>
                        <div className={`${styles.offer_choose_div}  col-lg-8 col-sm-8`}>
                          <div className={`${styles.Selection_book_cond}`}>
                            <div
                              className={`${styles.book_condition_button} d-flex`}>
                              {this.props.book.discount_percent ? (
                                <button
                                  className={
                                    this.state.offertype === "discount"
                                      ? `${styles.offercontained_btn}`
                                      : `${styles.offeroutlined_btn} `
                                  }
                                  onClick={e =>
                                    this.onOfferChanged(e, "discount")
                                  }>
                                  <div>
                                    <div>
                                      <span>
                                        Flat {this.props.book.discount_percent}%
                                        off !{" "}
                                      </span>
                                    </div>
                                    <div className='subtext_cond'>
                                      {/* InStock */}
                                    </div>
                                  </div>
                                </button>
                              ) : null}

                              {this.props.book.cashback_percent ? (
                                <button
                                  className={
                                    this.state.offertype === "cashback"
                                      ? `${styles.offercontained_btn}`
                                      : `${styles.offeroutlined_btn} `
                                  }
                                  onClick={e =>
                                    this.onOfferChanged(e, "cashback")
                                  }>
                                  <div>
                                    <div>
                                      <span>
                                        Earn BookCoins of worth ₹
                                        {Math.round(
                                          book.MRP -
                                          this.CashbackPrice(book.MRP)
                                        )}
                                        !{" "}
                                      </span>
                                    </div>
                                    <div className='subtext_cond'>
                                      {/* InStock */}
                                    </div>
                                  </div>
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {/* product price details  */}
                  {this.state.bookType == "newbook" ? (
                    this.props.new_book_data.newBookQty > 0 ? (
                      <div className='product_right_price_details border  mt-1'>
                        <div
                          className={`${styles.product_price_details_inner}`}>
                          <div className='row  m-2'>
                            <div className={` ${styles.handeling_mrp} col-6`}>
                              <span>MRP</span>
                            </div>
                            <div className='col-6'>
                              ₹ <s>{this.props.book.MRP}</s>
                              {this.state.offertype == "discount" ? (
                                <span className='text-success font-weight-bold'>
                                  {" "}
                                  ₹{this.DicountedPrice(this.props.book.MRP)}
                                </span>
                              ) : (
                                <span className='text-success font-weight-bold'>
                                  {" "}
                                  ₹{this.CashbackPrice(this.props.book.MRP)}
                                </span>
                              )}
                              {this.state.offertype == "discount" ? (
                                <span
                                  className={` ${styles.font08} text-success font-weight-bold`}>
                                  ({this.props.book.discount_percent}% Off)
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <div className='row m-2 pb-2'>
                            <div className='col-6 text-success font-weight-bold'>
                              Total Amount
                            </div>
                            <div className='col-6'>
                              ₹
                              {this.state.offertype == "discount" ? (
                                <span className={``}>
                                  {" "}
                                  {parseInt(
                                    this.DicountedPrice(
                                      parseInt(this.props.new_book_data.MRP)
                                    )
                                  )}
                                </span>
                              ) : (
                                <span>
                                  {" "}
                                  {this.props.new_book_data.MRP}
                                  <span
                                    className={`${styles.font08} text-success font-weight-bold`}>
                                    {" "}
                                    (Effective price ₹
                                    {this.CashbackPrice(
                                      parseInt(this.props.new_book_data.MRP)
                                    )}
                                    )
                                  </span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className='text-center border border-success p-3'>
                          <span>
                            <VerifiedUserIcon className='text-success' />
                          </span>
                          &nbsp;
                          <span className={`${styles.product_price_des}`}>
                            Safe And Secure Payment. 100% Authentic And Quality
                            Assured Books.
                          </span>
                        </div>
                      </div>
                    ) : null
                  ) : this.state.selectedConditon.qty > 0 ? (
                    <div className='product_right_price_details  mt-1 border'>
                      <div className={`${styles.product_price_details_inner}`}>
                        <div className='row  m-2'>
                          <div className={` ${styles.handeling_mrp} col-6`}>
                            <span>MRP</span>
                          </div>
                          <div className='col-6'>
                            ₹ <s>{selectedConditon.MRP}</s>{" "}
                            <span className='text-success font-weight-bold'>
                              Free{" "}
                              <HelpIcon
                                onClick={() => {
                                  this.setState({
                                    openwhyfreeinfo: true,
                                  });
                                }}
                                fontSize='small'
                                className={`${styles.helpIcon}`}
                              />
                            </span>
                          </div>
                        </div>
                        <div className='row  m-2'>
                          <div className={`${styles.handeling_charge} col-6`}>
                            Pay Only Shipping & Handling <span></span>
                          </div>
                          <div className='col-6'>
                            ₹{" "}
                            {this.props.SelectCond.length
                              ? this.calculateBookDetails().price
                              : ""}
                          </div>
                        </div>
                        <div className='row m-2 pb-2'>
                          <div className='col-6 text-success font-weight-bold'>
                            Total Amount
                          </div>
                          <div className='col-6'>
                            ₹
                            <span className={``}>
                              {" "}
                              {this.props.SelectCond.length
                                ? this.calculateBookDetails().price
                                : ""}
                            </span>
                          </div>
                        </div>

                        <div className='text-center p-3'>
                          <span>
                            <VerifiedUserIcon className='text-success' />
                          </span>
                          &nbsp;
                          <span className={`${styles.product_price_des}`}>
                            Safe And Secure Payment. 100% Authentic And Quality
                            Assured Books.
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {/* product Delivery Checking Div  */}
                  {this.state.selectedConditon.qty > 0 ||
                    this.props.new_book_data.newBookQty > 0 ? (
                    <div
                      className='product_right_delavery_check '
                      style={{ marginTop: "1rem" }}>
                      <div className='product_right_delavery_check_inner '>
                        <div
                          className={`${styles.product_delivery_details_inner}`}>
                          <div className={`${styles.delivery_div} `}>
                            <div className={`${styles.delevery_title} `}>
                              <span>Estimated Delivery</span>
                            </div>
                            <div className='d-flex align-items-center'>
                              <div className={`${styles.deliveryPincodeDiv} `}>
                                <TextField
                                  id='standard-basic'
                                  placeholder='Enter Delivery Pincode'
                                  variant='standard'
                                  value={enteredPincode}
                                  onChange={this.getEstDeliveryDate}
                                  helperText={pinodeErrMsg}
                                  type='tel'
                                  error={pinodeErrMsg.length ? true : false}
                                  inputProps={{ maxLength: "6" }}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position='start'>
                                        <LocationOnIcon color='primary' />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                                <div
                                  className={`${styles.delevery_check_result}  mt-2 h6 text-primary`}>
                                  {show_est_day_loader ? (
                                    <CircularProgress size='1rem' />
                                  ) : est_day_str.length ? (
                                    `Estimated Delivered in ${est_day_str}`
                                  ) : (
                                    `Check Estimated Delivery date`
                                  )}
                                </div>
                              </div>
                              <Button
                                style={{
                                  textTransform: "capitalize",
                                  color: "",
                                  borderColor: "primary",
                                }}
                                className='text-primary'
                                variant='outlined'
                                onClick={() => {
                                  this.ApiEstimate_delivery(
                                    enteredPincode,
                                    this.props.book.weight
                                  );
                                }}>
                                Check
                              </Button>
                            </div>
                          </div>
                          <div style={{ padding: "5px", paddingTop: "0" }} >
                            <div >
                              <hr style={{ margin: "0.3rem" }} />
                            </div>
                            <h6 className={`${styles.delevery_title} `}   >
                              <span style={{ fontSize: "0.85rem", cursor: "pointer" }} onClick={this.handleRefundPolicy} >Return Refund Replacement Policy</span>
                              <span style={{}}> &nbsp;<HelpIcon fontSize='small' className={`${styles.helpIcon}`} onClick={this.handleRefundPolicy} /></span>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {/* product Details */}
                  <div className='product_right_details mt-2'>
                    <div className={`${styles.product_Detals_div_inner} p-2`}>
                      <div>
                        <h5 style={{ fontSize: "1rem" }} className='mx-3'>
                          Book Details
                        </h5>
                        <div className='row m-2' style={{ fontSize: "0.9rem" }}>
                          {binding ? (
                            <div className='col-md-6 px-2 py-1 '>
                              <div className='row '>
                                <div className='col-6 '>Binding :</div>
                                <div className='col-6 '>
                                  {selectedConditon.binding}
                                </div>
                              </div>
                            </div>
                          ) : null}

                          {publication_date ? (
                            <div className='col-md-6 px-2 py-1 '>
                              <div className='row'>
                                <div className='col-6 '>Publication Date : </div>
                                <div className='col-6 '>
                                  {selectedConditon.publication_date}
                                </div>
                              </div>
                            </div>
                          ) : null}

                          {isbn ? (
                            <div className='col-md-6 px-2 py-1'>
                              <div className='row '>
                                <div className='col-6 '>ISBN :</div>
                                <div className='col-6 '>
                                  {selectedConditon.isbn}
                                </div>
                              </div>
                            </div>
                          ) : null}
                          {language ? (
                            <div className='col-md-6 px-2 py-1 '>
                              <div className='row'>
                                <div className='col-6 '>Language :</div>
                                <div className='col-6 '>
                                  {selectedConditon.language}
                                </div>
                              </div>
                            </div>
                          ) : null}

                          {rack_no && this.state.selectedConditon.qty > 0 ? (
                            <div className='col-md-6 px-2 py-1 '>
                              <div className='row '>
                                <div className='col-6 '>Rack No. :</div>
                                <div className='col-6 '>
                                  {selectedConditon.rack_no}
                                </div>
                              </div>
                            </div>
                          ) : null}

                          {no_of_pages ? (
                            <div className='col-md-6 px-2 py-1 '>
                              <div className='row'>
                                <div className=' col-6 '>Pages :</div>
                                <div className='col-6 '>
                                  {selectedConditon.no_of_pages}
                                </div>
                              </div>
                            </div>
                          ) : null}

                          {publication ? (
                            <div className='col-md-6 px-2 py-1 '>
                              <div className='row'>
                                <div className='col-6 '>Publisher :</div>
                                <div className='col-6 '>
                                  {selectedConditon.publication}
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div>
                        {selectedConditon.book_desc?.length ? (
                          <>
                            {selectedConditon.book_desc.length > 2 ? (
                              <h5 className='mx-3'>Description</h5>
                            ) : null}
                            {selectedConditon.book_desc.length > 2 ? (
                              <div className='m-3'>
                                <p
                                  className={`${styles.description}`}
                                  style={{ fontSize: "0.9rem" }}
                                  dangerouslySetInnerHTML={{
                                    __html: this.ResizeDescription(
                                      selectedConditon.book_desc
                                    ),
                                  }}></p>
                                {selectedConditon.book_desc.length > 500 ? (
                                  <p
                                    className='text-center text-primary cursor-pointer style'
                                    onClick={this.readmorebtn}>
                                    {this.state.readmore ? `` : `Read More`}
                                  </p>
                                ) : null}
                              </div>
                            ) : null}
                          </>
                        ) : null}
                      </div>
                    </div>

                  </div>


                  {/* Book Review Start*/}
                  <div className={`mt-2`}>
                    <div className={`${styles.book_review_div}`}>
                      <div className={`${styles.book_review_heading} p-2 `}>
                        <h5 style={{ fontSize: "1rem", margin: 0, padding: 0 }} className=''>
                          Ratings and Reviews
                        </h5>

                        <Button variant="outlined"
                          onClick={() => {
                            if (this.props.userComponentStatus == 2) {
                              window.location.replace(`/write-review?${this.props.book.book_id}`);
                            }
                            else {
                              let BackUrl = `write-review?${this.props.book.book_id}`;
                              // localStorage.setItem('BackUrl', BackUrl);
                              window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
                            }
                          }}
                          style={{ textTransform: "capitalize" }}
                        >
                          Rate Product
                        </Button>

                      </div>
                      {Object.keys(this.state.review_counts).length == 0 || this.state.review_counts.total_count == 0 ? null
                        :
                        <div className="p-2">
                          <RatingGraph
                            five_rating={this.state.review_counts.total_five}
                            four_rating={this.state.review_counts.total_four}
                            three_rating={this.state.review_counts.total_three}
                            two_rating={this.state.review_counts.total_two}
                            one_rating={this.state.review_counts.total_one}
                            total_rating={this.state.review_counts.total_count}
                            total_reviews={this.state.review_counts.total_review_count}
                          />
                          <div style={{ borderTop: "1px solid #ddd" }}>
                            {this.state.review_data.length > 0 ?
                              this.state.review_data.slice(0, 3).map((review, index) => {
                                console.log(review, "get_book_review_product")
                                return (
                                  review.status == 1 && (review.description != "" || review.review_title != "") ?
                                    <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                                      <div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                            <span style={{ display: "flex", alignItems: "center", fontSize: "0.75rem", backgroundColor: review.rating >= 3 ? "green" : review.rating == 2 ? "orange" : "red", color: "#fff", padding: "0.2rem 0.5rem", borderRadius: "10px" }}>{review.rating} <StarIcon color="#fff" fontSize="15" /></span>
                                            <span style={{ fontSize: '0.9rem' }}>{review.review_title}</span>
                                          </div>
                                          <span style={{ fontSize: '0.9rem' }}>{review.description}</span>
                                        </div>
                                        <span style={{ fontSize: '0.8rem', color: "#999" }}><Person2Icon style={{ fontSize: "1.1rem" }} />&nbsp;{review.name}</span>
                                        <div>
                                        </div>
                                      </div>
                                      {/* <div style={{display:'flex',alignItems:"center",gap:"0.5rem"}}>
     
                                        <IconButton style={{ fontSize: "1.25rem" }}>
                                          <ThumbUpIcon fontSize="20" color="#ddd" />

                                        </IconButton>
                                        <IconButton style={{ fontSize: "1.25rem" }}>
                                          <ThumbDownIcon fontSize="20" color="#ddd" />
                                        </IconButton>
                                </div>*/}
                                    </div> : null
                                )
                              }) : <div>
                                {/* <span>No Ratings Or Review</span> */}
                              </div>}
                          </div>
                        </div>
                      }
                      {this.state.review_data.length > 3 ?
                        <div
                          style={{ borderTop: "1px solid lightgray", cursor: "pointer" }}
                          className="p-2 pb-0 d-flex justify-content-between"
                          onClick={() => {
                            window.location.replace(`/product/ReviewAll?${this.props.book.book_id}`)
                            // window.open(`/product/ReviewAll?${this.props.book.book_id}`)
                          }} >
                          <h5 style={{ fontSize: "1rem", margin: 0, padding: 0 }}>View  All Review ({this.state.review_data.length - 3})</h5>
                          <h5><ArrowForwardIosIcon style={{ fontSize: "1.1rem" }} /></h5>
                        </div> : null}
                    </div>
                  </div>
                  {/* Book Review End*/}

                  {/* Question Answer Start */}
                  <div className="mt-2">
                    <div className={`${styles.book_review_div}`}>
                      {this.state.question_loader ? null :
                        this.state.question_data_counts == 0 ?
                          <div className={`${styles.question_heading} p-2`}>
                            <h5 style={{ fontSize: "1rem", margin: 0, padding: 0 }} className=''>
                              Have doubts regarding this product?
                            </h5>
                            <Button variant="outlined"
                              onClick={() => {
                                if (this.props.userComponentStatus == 2) {
                                  this.setState({
                                    openQuestionDialog: true
                                  })
                                } else {
                                  let BackUrl = `product/${this.props.book.slug}?${this.props.book.book_id}`;
                                  // localStorage.setItem('BackUrl', BackUrl);
                                  window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
                                  // this.props.enqueueSnackbar("Please login to post a question", {
                                  //   variant: "warning",
                                  // });
                                }
                              }}
                              style={{ textTransform: "capitalize" }}
                            >
                              Ask Your Question
                            </Button>
                          </div> :
                          <div>
                            <div style={{ alignItems: "center", justifyContent: "space-between", display: "flex" }} className="p-2">
                              <span>Question & Answers</span>
                              <Button variant="outlined"
                                onClick={() => {
                                  if (this.props.userComponentStatus == 2) {
                                    this.setState({
                                      openQuestionDialog: true
                                    })
                                  } else {
                                    let BackUrl = `product/${this.props.book.slug}?${this.props.book.book_id}`;
                                    // localStorage.setItem('BackUrl', BackUrl);
                                    window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
                                    // this.props.enqueueSnackbar("Please login to post a question", {
                                    //   variant: "warning",
                                    // });
                                  }
                                }}
                                style={{ textTransform: "capitalize" }}
                              >
                                Ask Your Question
                              </Button>
                            </div>
                            <div className="">
                              {this.state.question_data.map((question, index) => (
                                <div key={index} className="p-2" style={{ display: "flex", flexDirection: "column", fontSize: "0.9rem", gap: "0.5rem", borderTop: "1px solid #ddd" }}>
                                  <b>Q : {question.question}</b>
                                  <span style={{ display: "flex" }} > <b> A&nbsp;: </b> &nbsp;<span dangerouslySetInnerHTML={{ __html: question.answer }}></span></span>
                                </div>
                              ))}
                            </div>
                            {this.state.question_data_counts > 5 ?
                              <div onClick={() => {
                                window.location.replace(`/question-answer?${this.props.book.book_id}`);
                              }} className="p-2" style={{ cursor: "pointer", borderTop: "1px solid #ddd", display: "flex", alignItems: "center", fontSize: "0.9rem", color: "#2258ae", padding: "0.1rem" }}>
                                View {this.state.question_data_counts} Questions <ArrowForwardIcon style={{ fontSize: '0.9rem' }} />
                              </div> : null
                            }
                          </div>
                      }
                    </div>

                  </div>
                </div>
              </div>
              {/*------------------------- End Product Right -------------*/}
            </div>

            {/* ------------------------- Fix add to cart button in mobile only show --------------------- */}

            {/* ---------------------End  add to cart button ---------------------------- */}
          </div>
          {/* -----------------Similar book div ------------------------ */}
          <div className=''>
            {this.props.unbxd_recommendations.map((d, i) => (
              <div
                key={i}
                // style={{ marginTop: d.recommendations.length ? "1rem" : "0", width: "98%" }}
                className='mt-3'>
                {d.recommendations.length ?
                  <Recommended
                    value={d.recommendations}
                    title={d.widgetTitle}
                    redirection={d.widgetTitle}
                    attribute={d.widgetPlacementId}
                  /> : null}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1rem" }}>
            {/* <BookSugesstionUnbxdbyFilter
              value={[this.props.book.category]}
              title='Similar Books'
              attribute={"category"}
              redirection={
                this.props.book.category_arr.length == 3
                  ? "/category/" +
                  this.props.book.category_arr[0] +
                  "/" +
                  this.props.book.category_arr[1] +
                  "/" +
                  this.props.book.category_arr[2] +
                  "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                  : this.props.book.category_arr.length == 2
                    ? "/category/" +
                    this.props.book.category_arr[0] +
                    "/" +
                    this.props.book.category_arr[1] +
                    "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                    : this.props.book.category_arr.length == 1
                      ? "/category/" +
                      this.props.book.category_arr[0] +
                      "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                      : null
              }
            /> */}
            <BookSuggestionSearch
              value={[this.props.book.category]}
              title='Similar Books'
              attribute={"category"}
              redirection={
                this.props.book.category_arr.length == 3
                  ? "/category/" +
                  this.props.book.category_arr[0] +
                  "/" +
                  this.props.book.category_arr[1] +
                  "/" +
                  this.props.book.category_arr[2] +
                  "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                  : this.props.book.category_arr.length == 2
                    ? "/category/" +
                    this.props.book.category_arr[0] +
                    "/" +
                    this.props.book.category_arr[1] +
                    "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                    : this.props.book.category_arr.length == 1
                      ? "/category/" +
                      this.props.book.category_arr[0] +
                      "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                      : null
              }
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            {/* <BookSugesstionUnbxdbyFilter
              value={[this.props.book.author]}
              title='Similar Author'
              attribute={"author"}
              redirection={
                this.props.book.author
                  ? "/author/books-" +
                  this.props.book.author.split(" ").join("-") +
                  "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                  : null
              }
            /> */}
            <BookSuggestionSearch
              value={this.props.book.author}
              title='Similar Author'
              attribute={"author"}
              redirection={
                this.props.book.author
                  ? "/author/books-" +
                  this.props.book.author.split(" ").join("-") +
                  "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                  : null
              }
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            {/* <BookSugesstionUnbxdbyFilter
              value={[this.props.book.publication]}
              title='Similar Publication'
              attribute={"publication"}
              redirection={
                this.props.book.publication
                  ? "/publication/books-" +
                  this.props.book.publication.split(" ").join("-") +
                  "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                  : null
              }
            /> */}
            <BookSuggestionSearch
              value={this.props.book.publication}
              title='Similar Publication'
              attribute={"publication"}
              redirection={
                this.props.book.publication
                  ? "/publication/books-" +
                  this.props.book.publication.split(" ").join("-") +
                  "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                  : null
              }
            />
          </div>
          {/* -----------------End Similar book div ------------------------ */}
          {/*------------------------Quality Satisfaction Div -------------------  */}
          <div className=' ' style={{ marginTop: "1rem" }}>
            <SatisfactionBanner />
          </div>
          {/* <div className='bg-white p-1 ' style={{ marginTop: "1rem" }}>
            <ReturnPolicy />
          </div> */}
          {/* ---------------------Quality Satisfaction End Div------------ */}
        </div>
        <div className={`${styles.btn_sticky}`}>
          <MediaQuery maxWidth={577}>
            <div>
              <div className='product_img_bottom ' style={{ padding: "1rem" }}>
                {this.state.bookType == "newbook" ? (
                  this.props.new_book_data.newBookQty > 0 ? (
                    <div
                      className='product_img_bottom_inner d-flex justify-content-between  mt-1'
                      style={{ columnGap: "1rem" }}>
                      <Button
                        data-pid={this.props.book.book_id}
                        onClick={this.buynow_newbook}
                        className={`${styles.productBuyNowdDiv} ${this.cartbtn_text() == "Go To Cart" ? "alreadyAddedToCart" : ""}`}
                        onMouseEnter={() => {
                          this.setState({
                            buynowhover: true,
                          });
                        }}
                        onMouseLeave={() => {
                          this.setState({
                            buynowhover: false,
                          });
                        }}
                        style={{
                          outline: "none",
                          background: this.state.buynowhover
                            ? "#ddd"
                            : "#f35631",
                          color: this.state.buynowhover ? "#fff" : "#fff",
                          width: "14.5rem",
                        }}
                        // variant='contained'
                        disabled={this.state.Buy_cartLoader}
                        value={
                          this.state.Buy_cartLoader
                            ? `Moving to Cart`
                            : `Buy Now3`
                        }
                        startIcon={
                          <Image
                            alt='buy now'
                            src={sendicon}
                            style={{ fontSize: "2rem" }}
                          />
                        }>
                        <div className={`${styles.BuyNowText}`}>
                          {this.state.Buy_cartLoader ? (
                            <span style={{ color: "#fff" }}>
                              Moving to Cart
                            </span>
                          ) : (
                            <div style={{ color: "#fff" }}>Buy Now</div>
                          )}
                        </div>
                      </Button>
                      <Button
                        data-pid={this.props.book.book_id}
                        className={`${styles.productAddtoCarddiv} ${this.cartbtn_text() == "Go To Cart" ? "alreadyAddedToCart" : ""}`}
                        onMouseEnter={() => {
                          this.setState({
                            addtocarthover: true,
                          });
                        }}
                        onMouseLeave={() => {
                          this.setState({
                            addtocarthover: false,
                          });
                        }}
                        style={{
                          outline: "none",
                          width: "14.5rem",
                          color: this.state.addtocarthover ? "#2248ae" : "#fff",
                          border: this.state.addtocarthover
                            ? "2px solid #2248ae"
                            : "2px solid #fff",
                        }}
                        fullWidth
                        value={
                          this.state.Add_cartLoader
                            ? `Adding`
                            : this.state.already_incart
                              ? `Go to Cart`
                              : `Add to Cart`
                        }
                        onClick={e => {
                          this.state.already_incart
                            ? this.goToCart()
                            : this.state.bookType == "newbook"
                              ? this.AddNewBookToCart(e)
                              : this.AddOldBookToCart(e);
                        }}>
                        <div className={`${styles.addtoCartText}`}>
                          {this.state.Add_cartLoader ? (
                            <CircularProgress
                              size={20}
                              style={{
                                color: this.state.addtocarthover
                                  ? "#2248ae"
                                  : "white",
                              }}
                            />
                          ) : (
                            <div style={{}}>
                              <span>
                                {" "}
                                <ShoppingCartIcon
                                  style={{
                                    height: "2rem",
                                    animation: this.state.addtocarthover
                                      ? "cartanimation2 1.2s"
                                      : null,
                                    animationIterationCount: "1",
                                  }}
                                />
                              </span>
                              {/* Add to Cart */}
                              {this.cartbtn_text()}
                            </div>
                          )}
                        </div>
                        {/* Add To Cart */}
                      </Button>
                    </div>
                  ) : (
                    <div
                      className='product_img_bottom_inner d-flex justify-content-between  mt-1'
                      style={{ columnGap: "1rem" }}>
                      <Button
                        data-pid={this.props.book.book_id}
                        onClick={this.Notify}
                        className={styles.productNotifyMeDiv}
                        style={{ outline: "none", width: "90%" }}
                        color='error'
                        variant='contained'
                        startIcon={
                          <Image
                            alt='send'
                            src={sendicon}
                            style={{ fontSize: "2rem" }}
                          />
                        }>
                        <div className={`${styles.BuyNowText}`}>Notify Me</div>
                      </Button>
                    </div>
                  )
                ) : this.state.selectedConditon.qty > 0 ? (
                  <div
                    className='product_img_bottom_inner d-flex justify-content-between px-1 mt-1'
                    style={{ columnGap: "1rem" }}>
                    <Button
                      onClick={this.buynow}
                      className={`${styles.productBuyNowdDiv} ${this.cartbtn_text() == "Go To Cart" ? "alreadyAddedToCart" : ""}`}
                      onMouseEnter={() => {
                        this.setState({
                          buynowhover: true,
                        });
                      }}
                      onMouseLeave={() => {
                        this.setState({
                          buynowhover: false,
                        });
                      }}
                      style={{
                        outline: "none",
                        background: this.state.buynowhover ? "#ddd" : "#f35631",
                        color: this.state.buynowhover ? "#fff" : "#fff",
                        width: "14.5rem",
                      }}
                      // color='success'
                      // variant='contained'
                      disabled={this.state.Buy_cartLoader}
                      value={
                        this.state.Buy_cartLoader
                          ? `Moving to Cart`
                          : `Buy Now4`
                      }
                      startIcon={
                        <Image
                          alt='buy now'
                          src={sendicon}
                          style={{ fontSize: "2rem" }}
                        />
                      }>
                      <div className={`${styles.BuyNowText}`}>
                        {this.state.Buy_cartLoader ? (
                          <span style={{ color: "#fff" }}>Moving to Cart</span>
                        ) : (
                          <span style={{ color: "#fff" }}>Buy Now</span>
                        )}
                      </div>
                    </Button>
                    <Button
                      data-pid={this.props.book.book_id}
                      className={`${styles.productAddtoCarddiv} ${this.cartbtn_text() == "Go To Cart" ? "alreadyAddedToCart" : ""}`}
                      onMouseEnter={() => {
                        this.setState({
                          addtocarthover: true,
                        });
                      }}
                      onMouseLeave={() => {
                        this.setState({
                          addtocarthover: false,
                        });
                      }}
                      style={{
                        outline: "none",
                        width: "14.5rem",
                        color: this.state.addtocarthover ? "#2248ae" : "#fff",
                        border: this.state.addtocarthover
                          ? "2px solid #2248ae"
                          : "2px solid #fff",
                      }}
                      fullWidth
                      value={
                        this.state.Add_cartLoader ? `Adding` : `Add to Cart`
                      }
                      onClick={e => {
                        this.state.already_incart
                          ? this.goToCart()
                          : this.state.bookType == "newbook"
                            ? this.AddNewBookToCart(e)
                            : this.AddOldBookToCart(e);
                      }}>
                      <div className={`${styles.addtoCartText}`}>
                        {this.state.Add_cartLoader ? (
                          <CircularProgress
                            size={30}
                            style={{
                              color: this.state.addtocarthover
                                ? "#2248ae"
                                : "white",
                            }}
                          />
                        ) : (
                          <div style={{}}>
                            <span>
                              {" "}
                              <ShoppingCartIcon
                                style={{
                                  height: "2rem",
                                  animation: this.state.addtocarthover
                                    ? "cartanimation2 1.2s"
                                    : null,
                                  animationIterationCount: "1",
                                }}
                              />
                            </span>
                            {this.cartbtn_text()}

                            {/* Add to Cart=== */}
                          </div>
                        )}
                      </div>
                      {/* Add To Cart */}
                    </Button>
                  </div>
                ) : (
                  <div className='product_img_bottom_inner d-flex justify-content-between px-1 mt-1'>
                    <Button
                      onClick={this.Notify}
                      className={styles.productNotifyMeDiv}
                      style={{ outline: "none", width: "95%" }}
                      color='error'
                      variant='contained'
                      startIcon={
                        <Image
                          alt='send'
                          src={sendicon}
                          style={{ fontSize: "2rem" }}
                        />
                      }>
                      <div className={`${styles.BuyNowText}`}>Notify Me</div>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </MediaQuery>
        </div>
        {/* ----------------------End product main div -------------------------------- */}
        <Dialog
          open={this.state.openwhyfreeinfo}
          // closeOnDocumentClick
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          onClose={() => this.setState({ openwhyfreeinfo: false })}>
          <DialogTitle>
            Why do we say Books are Free?
            <IconButton
              onClick={() => {
                this.setState({ openwhyfreeinfo: false });
              }}
              style={{ position: "absolute", right: 0, top: 0 }}>
              <CloseIcon fontSize='small' />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <span style={{ fontSize: "0.88rem" }}>
              We are not charging for Books based on their actual cost or MRP.
              We receive these books free from Donors, and we want them to be
              Free.
              <br />
              However, we collect shipping and handling charges on every book we
              deliver.
              <br />
              To cater to Allied expenditure:
              <ul>
                <li>For books collection expenses</li>
                <li>Shipping cost we pay to the logistics partner</li>
                <li>Book Storage and Maintenance</li>
                <li>Technology we develop</li>
                <li>Employees and Team salaries</li>
                <li>
                  Sustainable profit to the organization allows us to serve more
                  readers nationwide and create a more significant social
                  impact.
                </li>
              </ul>
            </span>
          </DialogContent>
        </Dialog>

 {/* for video_popup */}
        <Dialog
          open={this.state.video_popup}
          // closeOnDocumentClick
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          onClose={() => this.setState({ openwhyfreeinfo: false })}>
          <DialogTitle>
    {/* Product name */}
            <IconButton
              onClick={() => {
                this.setState({ video_popup: false });
              }}
              style={{ position: "absolute", right: 0, top: 0 }}>
              <CloseIcon fontSize='small' />
            </IconButton>
          </DialogTitle>
          <DialogContent>
        
            <iframe width="560" height="315" src="https://www.youtube.com/embed/1zcjpB5FFgY?si=H8p0r1U_4et45W-T" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
       
          </DialogContent>
        </Dialog>
{/*  for video_popup */}
        <Dialog
          open={this.state.openQuestionDialog}
          maxWidth={"md"}
          // closeOnDocumentClick
          fullWidth
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        // onClose={() => this.setState({ openQuestionDialog: false })}
        >

          <IconButton
            onClick={() => {
              if (this.state.questionSuccess) {
                this.setState({ openQuestionDialog: false, questionSuccess: false, inputQuestion: "" });
              } else {
                this.setState({ openQuestionDialog: false, inputQuestion: "" });
              }
            }}
            style={{ position: "absolute", right: 0, top: 0 }}>
            <CloseIcon fontSize='small' />
          </IconButton>
          <DialogContent style={{ padding: 0 }}>
            {this.state.questionSuccess ?
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
                <CheckCircleIcon style={{ fontSize: "80px" }} color="success" />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
                  <span>Question Posted Successfully!</span>
                  <span>Q: {this.state.inputQuestion}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1rem" }}>
                  <span>
                    We will notify you when it gets answered
                  </span>
                  <Button
                    onClick={() => {
                      this.setState({ openQuestionDialog: false, questionSuccess: false, inputQuestion: "" });
                    }}
                    style={{ textTransform: "capitalize", width: "75%", marginTop: "1rem", marginLeft: "1rem", marginRight: "1rem" }}
                    // disabled={this.state.rating_click>0?this.state.save_review_loader?true:false:true} 
                    variant='contained'>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      Continue Shopping
                    </span>
                  </Button>
                </div>
              </div> :
              <div className={`${styles.questionDialogMainDiv}`}>
                <div className={`${styles.questionDialogLeftDiv}`}>
                  <ul style={{ fontSize: "0.95rem" }}>
                    <li style={{ marginBottom: "1rem" }}>
                      Be specific, ask questions only about the product.
                    </li>
                    <li style={{ marginBottom: "1rem" }}>
                      Ensure you have gone through the product specifications before posting your question.
                    </li>
                    <li style={{ marginBottom: "1rem" }}>
                      Reach out to MyPustak customer care for queries related to offers, orders, delivery etc.
                    </li>
                  </ul>
                </div>
                <div className={`${styles.questionDialogRightDiv}`}>
                  <div style={{ borderBottom: "1px solid #ddd", padding: "0 1rem", fontSize: "0.9rem" }}>
                    <h4>Ask your question</h4>
                  </div>
                  <div style={{ borderBottom: "1px solid #ddd" }}>
                    <textarea
                      onChange={(e) => {
                        this.setState({
                          inputQuestion: e.target.value
                        })
                      }}
                      value={this.state.inputQuestion}
                      className={styles.textAreaQuestion}
                      style={{ padding: "1rem", width: "100%", height: "15rem", border: 0, outline: 0, fontSize: "1rem", marginTop: "0.2rem" }} placeholder='Type your question here....'>
                    </textarea>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "flex-end" }}>
                    <Button
                      disabled={this.state.inputQuestion.length < 5 || this.state.saveLoader}
                      onClick={this.submitQuestion}
                      style={{ textTransform: "capitalize", width: "25%", marginTop: "1rem", marginLeft: "1rem", marginRight: "1rem", height: "2rem" }}
                      // disabled={this.state.rating_click>0?this.state.save_review_loader?true:false:true} 
                      variant='contained'>
                      {this.state.saveLoader ?
                        <CircularProgress size={18} /> :
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          Submit
                          {/* {this.state.save_review_loader?<CircularProgress style={{marginRight:"1rem"}} size={18}/>:null} */}
                        </span>}
                    </Button>
                  </div>
                </div>
              </div>
            }
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.notifyopen}
          closeOnDocumentClick
          onClose={() => this.setState({ notifyopen: false })}
          contentStyle={{}}>
          {/* Notify Dialog */}
          <DialogContent>
            <IconButton
              onClick={() => {
                this.setState({
                  notifyopen: "false",
                });
              }}
              style={{ position: "absolute", right: 0, top: 0 }}>
              <CloseIcon fontSize='small' />
            </IconButton>
            <div>
              <form onSubmit={this.notifyopenModal}>
                <div
                  style={{
                    textAlign: "center",
                    alignItems: "center",
                    marginTop: "0.8rem",
                  }}>
                  <TextField
                    type='email'
                    label='Enter Your Registered Email'
                    onChange={this.onChangedNotifyMail}
                    name='sendEmail'
                    value={this.state.sendEmail}
                    fullWidth
                    required
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    // color='primary'
                    style={{
                      backgroundColor: "#2258ae",
                      marginTop: "1rem",
                      textTransform: "capitalize",
                    }}>
                    Notify
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>



        {/* ==========================books details ============================= */}
        <Dialog
          open={this.state.multiplebook_dialog}
          onClose={() => this.setState({ multiplebook_dialog: false })}
          maxWidth="80vw"
          contentStyle={{}}>
          {/* Notify Dialog */}
          <DialogTitle>Available Books</DialogTitle>
          <DialogContent style={{ minWidth: "50vw" }}>
            {this.state.multiplebook_loader ? <div><center><CircularProgress /> </center></div> : <div>
              {this.state.available_books.map((avaible_book, index) => (
                <div
                  className=' d-flex border m-1 p-2'
                  key={index}>
                  <img
                    style={{ width: "4rem", height: "5rem" }}
                    src={`https://d1f2zer3rm8sjv.cloudfront.net/${avaible_book.image}`}
                    id='cartbookimg'
                    alt='book image'
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://d1f2zer3rm8sjv.cloudfront.net/medium/book_default.jpeg";
                    }}
                  />
                  <div style={{ fontSize: "0.9rem", padding: "1rem", paddingTop: "0rem", width: "25rem" }}>
                    <div>
                      {avaible_book.title}
                    </div>
                    <div>
                      <div>
                        By {avaible_book.author}&nbsp; (Author) |  By {avaible_book.publication}&nbsp; (Publication)
                      </div>
                      <div>
                        Shipping & Handling charges : {avaible_book.shipping}
                      </div>
                      <div>
                        Book Condition : {avaible_book.book_condition}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => this.addmultiple_tocart(avaible_book)}
                      size='small'
                      style={{
                        width: "7.225rem",
                        height: "1.875rem",
                        outline: "none",
                        textTransform: "capitalize",
                        background: this.check_book_incart(avaible_book.book_inv_id)
                          ? "linear-gradient(90deg, #ff6600 0%, #e05a00 100%)"
                          : "linear-gradient(90deg, #2157ad 0%, #6190da 100%)",
                      }}
                      disabled={avaible_book.book_inv_id == this.state.multiple_add_loader ? true : false}>
                      {/* {this.check_book_added_tocart(avaible_book.book_inv_id)?`Already`:`Add To Cart`} */}
                      {avaible_book.book_inv_id == this.state.multiple_add_loader ? <CircularProgress size={16} style={{ color: "#fff" }} /> : this.multiplecartbtn_text(avaible_book.book_inv_id)}
                    </Button>
                  </div>
                  <hr />
                </div>
              ))}
            </div>}

          </DialogContent>
        </Dialog>

        {/* ----------------------Return Refund Replacement Policy -------------------------------- */}
        <Dialog
          open={this.state.openRefundReturnDialog}
          // open={true}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          onClose={this.closeHandleRefundPolicy}
          maxWidth="90vw"
        >
          <DialogTitle>
            <IconButton
              onClick={this.closeHandleRefundPolicy}
              style={{ position: "absolute", right: 0, top: 0 }}>
              <CloseIcon fontSize='large' />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{ margin: "0", padding: 0 }} >
            <MediaQuery minWidth={576}>
              <div style={{ maxWidth: "35vw", minHeight: "30vh", maxHeight: "55vh" }}>
                <ReturnPolicyDialog />
              </div>
            </MediaQuery>
            <MediaQuery maxWidth={577}>
              <div style={{ maxWidth: "75vw", minHeight: "30vh", maxHeight: "45vh", }}>
                <ReturnPolicyDialog />
              </div>
            </MediaQuery>
          </DialogContent>
        </Dialog>
        {/* ----------------------Product Image Dialog For Mobile Screen -------------------------------- */}
        <Dialog
          open={this.state.openImageDialog}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          onClose={this.closeImageDialog}
          fullScreen
          scroll="paper"
          maxWidth="90vw"
        >
          <DialogTitle>
            <IconButton
              onClick={this.closeImageDialog}
              style={{ position: "absolute", left: 0, top: 0 }}>
              <CloseIcon fontSize='large' />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{ margin: "0", padding: "1rem", height: "95vh", width: "100vw", paddingTop: "0rem", }} >
            <div style={{}}>
              <Carousel
                responsive={{
                  mobile: {
                    breakpoint: { max: 599, min: 0 },
                    items: 1,
                  },
                }}
                swipeable={true}
                draggable={true}
                showDots={true}
                ssr={false}
                infinite={false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                transitionDuration={500}
                containerClass='carousel-container'
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass='custom-dot-list-style'
                itemClass='carousel-item-padding-40-px'>
                {this.state.allImagesForMobileDialog.map((image, index) => {
                  return (
                    <div key={index}
                      style={{ height: "85vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <div style={{ maxHeight: "60vh", maxWidth: "90vw" }}>
                        <img src={image} style={{ width: '100%', height: '100%' }} class="d-block w-100 h-100" alt="..." onError={i => (i.target.style.display = "none")} />
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </DialogContent>
        </Dialog>
        {/* <style jsx>
          {`
          `}
        </style> */}
      </React.Fragment >
    );
  }
}
const mapStateToProps = state => ({
  FromMycart: state.cartReduc.MyCart,
  userToken: state.accountR.token,
  getuserdetails: state.userdetailsR.getuserdetails,
  CartSessionData: state.cartReduc.CartSessionData,
  userComponentStatus: state.accountR.userComponentStatus,
  wishlist_msg: state.cartReduc.wishlist_msg,
  list_wishlist: state.cartReduc.list_wishlist,
  incart_check: state.cartReduc.incart_check,
  review_by_book: state.productReducer.review_by_book,
});
export default connect(mapStateToProps, {
  getBook,
  AddToCart,
  CartopenModal,
  ToBeAddedToCart,
  userdetails,
  setNewPricing,
  CartSession,
  updateBookImage,
  AddToCartLogin,
  getEstDeliveryDate,
  sendBookNotification,
  getBooksSuggestionsByPage,
  Adding_Wishlist,
  login_backdropToggle,
  Update_wishlist,
  fetch_wishlist_detail_otherpage,
  GetWishlistCount,
  check_book_incart,
  get_instock_book,
  get_book_review_product,
  check_if_ordered,
  save_question,
  get_question_product,
})(withSnackbar(Page));
