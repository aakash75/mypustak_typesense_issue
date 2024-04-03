/* eslint-disable */
import Head from "next/head";
import React, { Component, useState } from "react";
import { connect } from "react-redux";
import ErrorIcon from '@mui/icons-material/Error';
import MediaQuery from "react-responsive";
import { getBook } from "../../redux/actions/getBookDetailsAction";
import styles from "../../styles/Product.module.css";
import Image from "next/legacy/image";
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import { AuthInstance } from "../../helper/api_url";
import sendicon from "../../assets/sendicon.png";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import assured from "../../assets/assured.svg";
import usedbook_img from "../../assets/usedbook.svg";
import newbook_img from "../../assets/newBookTag.svg";
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
import { CircularProgress } from "@mui/material";
import {
  AddToCart,
  CartopenModal,
  CartSession,
  removeAllCart,
  ToBeAddedToCart,
  AddToCartLogin,
  getEstDeliveryDate,
  Adding_Wishlist,
  Update_wishlist,
} from "../../redux/actions/cartAction";
import {
  userdetails,
  login_backdropToggle,
} from "../../redux/actions/accountAction";
import { setNewPricing } from "../../redux/actions/productAction";
import { fetch_wishlist_detail_otherpage } from "../../redux/actions/accountAction";
import { GetWishlistCount } from "../../redux/actions/wishlistAction";
import {
  openTheChilCategory,
  unmountProductState,
} from "../../redux/actions/maincategoryAction";
import { getSeoData } from "../../redux/actions/seodataAction";
import { updateBookImage } from "../../redux/actions/updateBookImgAction";
import { url } from "../../helper/api_url";
import { sendBookNotification } from "../../redux/actions/bookNotifyAction";
import { toggleGlobalLoader } from "../../redux/actions/homeAction";
import { getBooksSuggestionsByPage } from "../../redux/actions/productsuggestionaction";

import { EmailValidation } from "../../helper/validations";
import { encryptor } from "../../helper/crypto";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  NoSsr,
} from "@mui/material";
import NextBreadcrumbs from "../../components/Breadcrumbs/NextBreadcrumbs";
import SatisfactionBanner from "../../components/satisfactionBanner/SatisfactionBanner";
import BookSuggestionSearch from "../../components/booksuggestion/BookSuggestionSearch";

export async function getServerSideProps({
  query,
  store,
  isServer,
  asPath,
  res,
  resolvedUrl,
}) {
  console.log(
    { query, store, isServer },
    "###################################Test############################",
    resolvedUrl
  );
  let queryString = resolvedUrl.split("?")[0];
  let bookid = Object.keys(query)[0];

  let url_query_arr = [];
  url_query_arr.push(queryString);
  url_query_arr.push(bookid);
  console.log(url_query_arr, "url_query_arr");
  let url_query;
  if (url_query_arr.length > 1) {
    url_query = url_query_arr[1];
  } else {
    url_query = url_query_arr[0];
  }
  let book_id, tb_no;
  if (url_query_arr.length > 1) {
    if (url_query.indexOf("&") > 0) {
      book_id = url_query.split("&")[0];
      tb_no = url_query.split("&")[1].split("=")[1];
    } else {
      book_id = url_query;
      tb_no = 0;
    }
  } else {
    book_id = query.slug;
    tb_no = 1;
  }
  let error = "";
  let SplitmultipleAuthor = "",
    multipleAuthor = "";
  let condition_obj = {},
    selectedConditon = {},
    SelectCond = "",
    defaultImgSrc = "",
    is_out_of_stack = "",
    nodata = false,
    table_type; //book_inv_id rack_no back_image front_image crop_img
  let new_book_data = {};
  let default_book_data = {};
  let slug = query.slug;
  if (book_id) {
    slug = book_id.replace("?", "");
  }
  let result = await // this.props.getBook()
    // this.props.getBook(query.slug, book_id, tb_no)
    fetch(`${url}/api/v1/get/product/v2/new/${slug}/${tb_no}`);
  // console.log(`${url}/api/v1/get/product/v2/new/${slug}/${tb_no}`,"${url}/api/v1/get/product/v2/new/${slug}/${tb_no}");
  let response = await result.json();

  if (response) {
    console.log(response, "***********************************");
    multipleAuthor = response.books_details.author;
    is_out_of_stack = response.is_out_of_stack;
    table_type = response.table_type;
    if (multipleAuthor) {
      SplitmultipleAuthor = multipleAuthor.split(",");
    }

    const bookdetails = response.books_details,
      bookConditions = response.old_book;

    let data;
    let bestCond = "";
    const AvailableConditions = Object.keys(bookConditions);
    console.log(AvailableConditions, "AvailableConditions");
    let bookInventory;
    // if (is_out_of_stack)
    let book_length = Object.getOwnPropertyNames(
      response.new_books_details
    ).length;
    let new_book_length = Object.getOwnPropertyNames(
      response.books_details
    ).length;
    console.log(book_length, "book_lenght");
    let old_book_length = Object.getOwnPropertyNames(response.old_book).length;
    if (new_book_length || old_book_length) {
      if (new_book_length) {
        console.log("New Book");
        selectedConditon = response.new_books_details;
        new_book_data = response.new_books_details;
        defaultImgSrc = `https://d1f2zer3rm8sjv.cloudfront.net/${response.new_books_details.image}`;
      }
      if (old_book_length) {
        console.log(
          "=============================IN OLD BOOK",
          AvailableConditions
        );
        // selectedConditon = response.old_book
        AvailableConditions.map(condition => {
          bookInventory = bookConditions[condition];

          const {
            author,
            binding,
            book_desc,
            isbn,
            language,
            no_of_pages,
            publication,
            slug,
            title,
            total_qty,
            rack_no,
            book_inv_id,
            crop_img,
            front_image,
            shipping,
            publication_date,
            edition,
            image,
            barcode,
            is_study_material,
            MRP,
            price_is_updated,
            book_id,
            category,
          } = bookInventory;

          console.log(bookInventory, "bookInventory");
          data = {
            qty: total_qty,
            rack_no: rack_no,
            book_inv_id: book_inv_id,
            crop_img: `https://d239pyg5al708u.cloudfront.net/uploads/books/medium/cropped_image/${crop_img}`,
            front_image: `https://d239pyg5al708u.cloudfront.net/uploads/books/medium/front_image/${front_image}`,
            shipping: shipping,
            publication_date: publication_date,
            edition: edition,
            image: `https://d1f2zer3rm8sjv.cloudfront.net/${image}`,
            author,
            binding,
            book_desc,
            isbn,
            language,
            no_of_pages,
            publication,
            slug,
            title,
            barcode,
            is_study_material,
            MRP,
            price_is_updated,
            book_id,
            category,
          };
          condition_obj[[condition]] = data;
        });

        if (AvailableConditions.includes("BrandNew")) {
          bestCond = "BrandNew";

          selectedConditon = condition_obj["BrandNew"];
          (SelectCond = bestCond),
            (defaultImgSrc = condition_obj["BrandNew"].image);
        } else if (AvailableConditions.includes("AlmostNew")) {
          bestCond = "AlmostNew";

          selectedConditon = condition_obj["AlmostNew"];
          (SelectCond = bestCond),
            (defaultImgSrc = condition_obj["AlmostNew"].image);
        } else if (AvailableConditions.includes("VeryGood")) {
          bestCond = "VeryGood";

          selectedConditon = condition_obj["VeryGood"];
          (SelectCond = bestCond),
            (defaultImgSrc = condition_obj["VeryGood"].image);
        } else if (
          AvailableConditions.includes("AverageButInReadableCondition")
        ) {
          bestCond = "AverageButInReadableCondition";

          selectedConditon = condition_obj["AverageButInReadableCondition"];
          (SelectCond = bestCond),
            (defaultImgSrc =
              condition_obj["AverageButInReadableCondition"].image);
        }

        console.log("Afer condn");
      }
    }
    // OUT OF STOCK, stored the data of book_details variable coming from API response
    // This data is showed when new book and old book is out of stock or not present
    else if (book_length) {
      selectedConditon = response.books_details;
      default_book_data = response.books_details;
      defaultImgSrc = `https://d1f2zer3rm8sjv.cloudfront.net/${response.books_details.image}`;
    }
    else {
      nodata = true
    }
    console.log(is_out_of_stack, "Selected");
  }
  return {
    props: {
      query,
      SplitmultipleAuthor,
      condition_obj,
      selectedConditon,
      SelectCond,
      defaultImgSrc,
      error,
      is_out_of_stack,
      new_book_data,
      book: response.books_details,
      bookCondition: response.old_book,
      new_books_details: response.new_books_details,
      response,
      nodata,
    },
  };
}
class ProductPage extends Component {
  state = {
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
    SelectCond: this.props.SelectCond,
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
    onerror: false,
    addtocarthover: false,
    buynowhover: false,
    imagesData: [
      {
        id: 1,
        url: `https://d1f2zer3rm8sjv.cloudfront.net/${this.props.book.image}`,
      },
      {
        id: 2,
        url: `https://d239pyg5al708u.cloudfront.net/uploads/books/medium/front_image/${this.props.book.front_image}`,
      },
      {
        id: 3,
        url: `https://d239pyg5al708u.cloudfront.net/uploads/books/medium/back_image/${this.props.book.back_image}`,
      },
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
  };

  componentDidMount() {
    // console.log(this.props.)
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
    if (this.props.nodata) {
      // alert(this.props.nodata)
    }
    else {
      const { thumb } = this.props.book;
      this.setState({
        ErrorOccuredBookImg: false,
        //   SelectCond: "",
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
      console.log(this.props.is_out_of_stack, "book1");

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
        // this.setStateQtyToshow(bookConditions);
        // this.setBookConditionToState(bookConditions);
      } else {
      }

      if (this.props.userComponentStatus == 2) {
        const user_data = JSON.parse(localStorage.getItem("user_info"));
        // console.log(user_data.pincode, 'pincode')
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
      // console.log()
      this.fetchSimilarBooks();

      this.fetchSimilarBooks();

      this.props.list_wishlist.map(data => {
        if (data.book_id == this.props.book.book_id) {
          // alert("inn")
          console.log(data.book_id, "858585", this.props.book.book_id);
          this.setState({
            showWishlist: true,
            wishlistid: data.wishlist_id,
          });
        }
      });
      if (this.props.FromMycart) {
        this.props.FromMycart.map(cart =>
          // alert("runn")
          // (`${cart.bookInvId}`===`${BOOK_INV_ID}`)?  msgg="already in cart": null
          `${cart.bookInvId}` === `${this.state.selectedConditon.book_inv_id}`
            ? this.setState({ already_incart: true })
            : this.setState({ already_incart: false })
        );
      }

    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.list_wishlist !== this.props.list_wishlist) {
      this.props.list_wishlist.map(data => {
        if (data.book_id == this.props.book.book_id) {
          // alert("inn")
          console.log(data.id, "858585", this.props.book.book_id);
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
    if (this.props.FromMycart !== prevProps.FromMycart) {
      if (this.props.FromMycart) {
        this.props.FromMycart.map(cart =>
          // (`${cart.bookInvId}`===`${BOOK_INV_ID}`)?  msgg="already in cart": null
          `${cart.bookInvId}` === `${this.state.selectedConditon.book_inv_id}`
            ? this.setState({ already_incart: true })
            : this.setState({ already_incart: false })
        );
      }
    }

    if (this.props.userComponentStatus !== prevProps.userComponentStatus) {
      if (this.props.userComponentStatus == 2) {
        const user_data = JSON.parse(localStorage.getItem("user_info"));
        this.props.FromMycart.map(cart =>
          `${cart.bookInvId}` ===
            `${this.props.selectedConditon.newbook_inv_id}`
            ? this.setState({
              offertype: cart.offertype,
            })
            : null
        );
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
    // alert('fetch')
    let res = await this.props.getBooksSuggestionsByPage("PRODUCT", 1);
    console.log(res, "reserr");
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
    // alert(email);
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
    // alert("ch")
    this.setState({ productData: !this.state.productData });
  };
  changeBookType = booktype => {
    this.setState({
      bookType: booktype,
      mainImagSrc:
        booktype == "newbook"
          ? `https://d239pyg5al708u.cloudfront.net/uploads/books/${this.props.new_book_data.image}`
          : `https://d239pyg5al708u.cloudfront.net/uploads/books/${this.props.selectedConditon.image}`,
    });
  };

  onChangedCondition = (e, change_cond) => {
    this.setState({ change_cond: change_cond, SelectCond: change_cond });
    const conditions = this.state.book_conditions_obj;
    this.setState({
      selectedConditon: conditions[change_cond],
      defaultImgSrc: conditions[change_cond].image,
    });

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
    console.log(
      e.target.name,
      e.target.value,
      e.target.checked,
      "onOfferChanged",
      e
    );
    const { selectedConditon } = this.props;
    var msgg = "";
    let discount_price = 0;
    let cashback_price = 0;
    let cart_id = "";

    this.props.FromMycart.map(cart =>
      // (`${cart.bookInvId}`===`${BOOK_INV_ID}`)?  msgg="already in cart": null

      `${cart.bookInvId}` === `${selectedConditon.newbook_inv_id}`
        ? ((msgg = "already in cart"), (cart_id = cart.Cart_id))
        : null
    );
    console.log(this.props.FromMycart, "this.props.FromMycart");
    if (this.state.offertype == checkvalue) {
      this.setState({ offertype: "" });
    } else {
      this.setState({ offertype: checkvalue });
      if (checkvalue == "discount") {
        // alert(msgg);
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
            // console.log(res.status, sendCartSession, 'cartSession');

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
    console.log(book, "SELECTEDCONDITION");
    const { defaultImgSrc } = this.state;
    const book_thumb = defaultImgSrc.replace(
      "https://d1f2zer3rm8sjv.cloudfront.net/",
      ""
    );
    const selectedBookConditionDetails =
      this.state.book_conditions_obj[selectedCondition];
    const { book_inv_id, rack_no, shipping } = selectedBookConditionDetails;
    let discount_price = 0;
    let cashback_price = 0;
    let current_date = Math.floor(Date.now() / 1000);
    const MyWishlist = {
      book_id: book.book_id,
      user_id: this.props.getuserdetails.id,
      selected_condition: selectedCondition,
      book_inv_id: book.book_inv_id,
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
          this.props.
            enqueueSnackbar(
              <div>
                <span>Successfully Removed From Your Wishlist &nbsp;&nbsp;</span>
                <Link href='/customer/wishlist' legacyBehavior>
                  <a style={{ textDecoration: "none" }}>
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
                  </a>
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
        // showWishlist: true,
        AddingWishlist_loader: false,
        wishlistLoader: false,
        wishlist_msg: "Please Login For Wishlisting a book",
      });
      this.props.enqueueSnackbar("Please Login For Wishlisting a book", { variant: "warning" });
      this.props.login_backdropToggle();
    }
  };

  Add_to_NewBook_Wishlish = e => {
    // alert(this.props.book.newbook_inv_id);
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
    // const { book_inv_id, rack_no, shipping } = selectedBookConditionDetails;
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

    // alert(book.newbook_inv_id)

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
    const { selectedConditon } = this.props;
    var msgg = "";
    let discount_price = 0;
    let cashback_price = 0;
    let cart_id = "";

    this.props.FromMycart.map(cart =>
      `${cart.bookInvId}` === `${selectedConditon.newbook_inv_id}`
        ? ((msgg = "already in cart"), (cart_id = cart.Cart_id))
        : null
    );
    console.log(this.props.FromMycart, "this.props.FromMycart---------------");
    if (this.state.offertype == "discount") {
      // alert(msgg);
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
        this.setState({ Add_cartLoader: true });
        this.props
          .AddToCartLogin({ sendCartSession })
          .then(res => {
            // console.log(res.status,sendCartSession,"cartSession");
            this.RefreshCart();
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
        this.props.CartopenModal();
      }
    } else {
      this.setState({ AlreadyinCartMsgNewBook: "Already In cart" });

      this.props.CartopenModal();
    }
  };

  buynow_newbook = e => {
    e.preventDefault();
    // alert("buynow_newbook");
    const { selectedConditon } = this.props;
    var msgg = "";
    let discount_price = 0;
    let cashback_price = 0;
    let cart_id = "";

    this.props.FromMycart.map(cart =>
      `${cart.bookInvId}` === `${selectedConditon.newbook_inv_id}`
        ? ((msgg = "already in cart"), (cart_id = cart.Cart_id))
        : null
    );
    console.log(this.props.FromMycart, "this.props.FromMycart---------------");
    if (this.state.offertype == "discount") {
      // alert(msgg);
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
      // console.log({sendCartSession});

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
    // let discountedPrice = price - price * this.state.selectedConditon.discount_percent / 100;
    let discountedPrice =
      price - (price * this.props.new_book_data.discount_percent) / 100;

    // this.setState({discountedPrice:discountedPrice})
    // console.log(price,this.props.book.discount_price,"DicountedPrice",discountedPrice,Math.round(discountedPrice));

    return Math.round(discountedPrice);
  };

  CashbackPrice = price => {
    let cashbackedPrice =
      price - (price * this.props.new_book_data.cashback_percent) / 100;
    // console.log({price},this.state.selectedConditon);

    // this.setState({discountedPrice:discountedPrice})
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
      // this.props.CartopenModal();

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
    // alert('Okk');
    this.props.updateBookImage(book_id);
  };

  calculateBookDetails = () => {
    const bookdetails = this.props.book;
    const bookConditionDetails = this.props.bookCondition;
    const selectedBookCondition = this.state.SelectCond;
    console.log(this.props.book, "book");
    console.log(this.props.bookCondition, "bookCondition");
    console.log(this.state.SelectCond, "SelectConddd");

    let bookDeatils = {
      price: 0,
    };
    let makeAPIReq = false;
    const conditionKeys = Object.keys(bookConditionDetails);
    if (!conditionKeys.includes("is_soldout")) {
      // AlmostNew AverageButInReadableCondition BrandNew VeryGood
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
        // console.log({ selectedBookCondition });
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
    // const bookConditions = this.props.bookCondition;
    let qty_obj = {};
    let qty;

    Object.keys(bookConditions).map(condition => {
      qty = bookConditions[condition].total_qty;
      qty_obj[[condition]] = qty;
    });
    this.setState({ book_qty_obj: qty_obj });
  };
  setBookConditionToState = bookConditions => {
    const bookdetails = this.props.book;
    let condition_obj = this.props.condition_obj; //book_inv_id rack_no back_image front_image crop_img
    let data;
    let bestCond = "";
    const AvailableConditions = Object.keys(bookConditions);
    let bookInventory;
    // console.log({condition_obj});

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
        // console.log({ verygoodRes }, "test")
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

    // console.log(VGsendData, 'VGsendData');
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

    // var ARCalbookInvId = BOOK_INV_ID[0];
    // console.log(ARColAPrice,ARColBPrice,ARColCprice,ARColDprice,ARColFPrice,ARNewPriceingModel,`new Pricing Model -> ${ARNewPriceingModel}`,ARCalbookInvId,IS_PRICEUPDATED);

    // SHIPPING = IS_PRICEUPDATED == 'N' ? Math.round(parseInt(ARNewPriceingModel)) : SHIPPING;
    // SHIPPINGCOST = IS_PRICEUPDATED == 'N' ? Math.round(ARNewPriceingModel) : SHIPPING;
    // ARNewPriceingModel = this.addPercentToPrice(ARNewPriceingModel, 5)
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
      // console.log("in less than  0.95");
      BDColCprice = Number(BDCalBookWt * 150); //
    } else if (BDCalBookWt >= 0.95) {
      // console.log("in Greater than 0.95");
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
    // BDNewPriceingModel = this.addxPercentToPrice(BDNewPriceingModel,5)

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
    // alert("carttext");
    let msg = "Add to Cart";
    const selectedCondition = this.state.SelectCond;
    const selectedBookConditionDetails =
      this.state.book_conditions_obj[selectedCondition];

    let book_inv_id = selectedBookConditionDetails
      ? selectedBookConditionDetails.book_inv_id
      : this.props.selectedConditon.newbook_inv_id;

    console.log(this.props.FromMycart, "msgg");
    this.props.FromMycart.map(cart => {
      if (cart.bookInvId == book_inv_id) {
        msg = "Go To Cart";
      }
    });
    return msg;

    // console.log(msg, "msggg", book_inv_id);
  };
  AddOldBookToCart = e => {
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
    console.log(
      this.state.book_conditions_obj,
      "this.state.book_conditions_obj===================="
    );
    console.log(
      selectedBookConditionDetails,
      "selectedBookConditionDetails====================================="
    );
    const { shipping, book_id, title, MRP, image } =
      selectedBookConditionDetails;
    this.setState({ Add_cartLoader: true });
    const book = this.props.book;
    var msgg = "";
    let book_inv_id = selectedBookConditionDetails.book_inv_id
      ? selectedBookConditionDetails.book_inv_id
      : selectedBookConditionDetails.newbook_inv_id;
    let rack_no = selectedBookConditionDetails.rack_no
      ? selectedBookConditionDetails.rack_no
      : "";
    this.props.FromMycart.map(cart =>
      // alert("runn")
      // (`${cart.bookInvId}`===`${BOOK_INV_ID}`)?  msgg="already in cart": null
      cart.bookInvId === book_inv_id ? (msgg = "already in cart") : null
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
            this.RefreshCart();

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
    }
  };

  buynow = e => {
    e.preventDefault();
    // console.log(e.target.SelectCond.value);
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
    // let BOOK_INV_ID, DonorName, TOTALQUANTITY, RACK_NO;
    const { book_inv_id, rack_no, shipping, book_id, title, MRP, image } =
      selectedBookConditionDetails;
    this.setState({ Buy_cartLoader: true });
    const book = this.props.book;
    var msgg = "";

    this.props.FromMycart.map(cart =>
      // alert("runn")
      // (`${cart.bookInvId}`===`${BOOK_INV_ID}`)?  msgg="already in cart": null
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
    // console.log({ MyCart }, "P3")
  };
  imgErr = object => {
    // console.log(object, 'falseImgDiv')
    this.setState({ falseImgDiv: true, error_url_object: object });
  };
  getEstDeliveryDate = e => {
    // if (e.target.value) {
    const value = e.target.value.trim();
    // const isvalid = !isNaN(value);
    let errormsg = !isNaN(value) ? "" : `Must be numeric`;
    this.setState({ enteredPincode: e.target.value, pinodeErrMsg: errormsg });
    if (errormsg.length) return;
    if (value.length == 6) {
      // console.log(this.props.book);
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
        // this.setState({})
        // alert('ok')
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
      //   alert("hhhhh");
      this.setState({ sticky_div: "product_img_normal" });
    } else {
      this.setState({ sticky_div: "product_img_sticky" });

      //   this.setState({ slidemenu: "none" });
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
      .then(res => {
        // console.log({ res });
      })
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
    // }
  };

  render() {
    console.log(this.props.book, "book");

    let VeryGood = [];
    let AlmostNew = [];
    let AverageButInReadableCondition = [];
    let BrandNew = [];
    let SHIPPINGCOST = "";
    let DonorName = "";
    let TOTALQUANTITY = "";
    let TOTALQUANTITYV_G = "";
    let TOTALQUANTITYB_D = "";
    let TOTALQUANTITYA_N = "";
    let TOTALQUANTITY_R;
    let RACK_NO = "";
    let BOOK_INV_ID = "";
    // let sideDrawer;
    let backdrop;

    const { book, bookCondition, error, study_material_obj } = this.props;

    const {
      book_conditions_obj,
      book_qty_obj,
      defaultImgSrc,
      selectedConditon,
      enteredPincode,
      pinodeErrMsg,
      est_day_str,
      error_msg,
      show_est_day_loader,
      no_of_conditions,
      openStudyMaterialDialog,
      study_material_barcode,
    } = this.state;

    let GetPoductData = "";
    var bottomDatta = GetPoductData;
    if (this.state.productData === true) {
      var bottomDatta = GetPoductData;
    } else {
      var bottomDatta = GetPoductReview;
    }
    try {
      GetPoductData = book.book_desc;
    } catch (error) {
      // console.log(error, 'GetPoductData');
    }
    const { parent_cate } = this.state;
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
  render() {
    let VeryGood = [];
    let AlmostNew = [];
    let AverageButInReadableCondition = [];
    let BrandNew = [];
    let SHIPPINGCOST = "";
    let DonorName = "";
    let TOTALQUANTITY = "";
    let TOTALQUANTITYV_G = "";
    let TOTALQUANTITYB_D = "";
    let TOTALQUANTITYA_N = "";
    let TOTALQUANTITY_R;
    let RACK_NO = "";
    let BOOK_INV_ID = "";
    // let sideDrawer;
    let backdrop;

    const { book, bookCondition, error, study_material_obj } = this.props;

    const {
      book_conditions_obj,
      book_qty_obj,
      defaultImgSrc,
      selectedConditon,
      enteredPincode,
      pinodeErrMsg,
      est_day_str,
      error_msg,
      show_est_day_loader,
      no_of_conditions,
      openStudyMaterialDialog,
      study_material_barcode,
    } = this.state;

    let GetPoductData = "";
    var bottomDatta = GetPoductData;
    if (this.state.productData === true) {
      var bottomDatta = GetPoductData;
    } else {
      var bottomDatta = GetPoductReview;
    }
    try {
      GetPoductData = book.book_desc;
    } catch (error) {
      // console.log(error, 'GetPoductData');
    }

    const render_data = (data, data_name) => {
      if (data_name == "title" && data) {
        return data;
      }

      return "";
    };
    // console.log('defaultImgSrc',defaultImgSrc)
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
    // console.log(this.props, 'props')
    // console.log(book_conditions_obj, 'book_conditions_obj')
    return this.props.nodata ?
      <center >
        <ErrorIcon style={{ fontSize: '9rem', marginTop: '2rem' }} color="error" />
        {/* <span style={{fontSize:'9rem',marginTop:'2rem'}}>&#128546;</span> */}
        <span style={{ display: 'flex', justifyContent: 'center', alignItems: "center", fontSize: '1.7rem' }}>Sorry! This book is currently not available :(</span>
        <span style={{ fontSize: '1.25rem' }}>
          Please go to
          {" "}
          <Button variant="outlined" style={{ textTransform: "capitalize" }}
            onClick={() => {
              window.location.replace("/")
            }}
          >Home</Button>
        </span>
      </center> :
      <React.Fragment>
        <Head>
          <title> {book.title}</title>
          <meta name='og_title' property='og:title' content={book.title} />
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
          <meta
            property='og:image'
            content='https://d1f2zer3rm8sjv.cloudfront.net/${thumb}'
          />
        </Head>

        {/*----------------------Product Main Page div------------------------  */}
        <div className='main_outterdiv'>
          <div className='product_topdiv'>
            <div className='product_maindiv'>
              {/* ------------------product Left div ----------------------- */}
              <div className='product_Left  col-lg-5 col-md-5 col-sm-6 col-12'>
                <div className={this.state.sticky_div}>
                  <div className='left_div_parent'>
                    <div className='product_Left_innerdiv'>
                      <div className='product_Left_imgthumb col-2'>
                        {" "}
                        {this.state.imagesData.map((srcobj, index) => {
                          return this.state.error_url_object.id ==
                            srcobj.id ? null : (
                            <div
                              key={index}
                              className={`${styles.product_img_single_div} `}
                              style={{}}>
                              <img
                                alt=''
                                onMouseEnter={() => this.setImgsrc(srcobj)}
                                key={srcobj.id}
                                className={`image_thumb ${srcobj.id == 3
                                  ? styles.subimges_rotatediv
                                  : ""
                                  }`}
                                style={{
                                  // height: "100%",
                                  // width: "5vw",
                                  padding: "5px",
                                  border:
                                    srcobj == this.state.mainImagSrc
                                      ? "2px solid #2157AD"
                                      : null,
                                }}
                                src={srcobj.url}
                                // onError={() => {
                                //   this.imgErr(srcobj);
                                // }}
                                onError={i => (i.target.style.display = "none")}
                              // onError={() => {set}}
                              />
                              <div>
                                {this.state.falseImgDiv
                                  ? this.state.error_url_object.id == srcobj.id
                                    ? "match"
                                    : null
                                  : null}
                                {/* // {this.state.falseImgDiv ? "uiijiji" : 'oooooo'} */}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className=' product_Left_image_div row col-9 col-sm-9 col-md-9 col-lg-9'>
                        <div className='main_image_div col text-center'>
                          <div className=' '>
                            <Image
                              alt='product '
                              width={240}
                              height={300}
                              src={this.state.onerror ? "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png" : this.state.mainImagSrc.url}
                              priority
                              onError={() => {
                                this.setState({
                                  onerror: true
                                })
                              }}
                            />
                            {this.state.selectedConditon.qty > 0 ||
                              this.props.new_book_data.newBookQty > 0 ? null : (
                              <div className='book_outofstock'>
                                Out of Stock
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='share_btn_div col-12 col-sm-3 col-md-3 col-lg-3 '>
                          {" "}
                          <div>
                            {this.state.bookType == "newbook" ? (
                              <div className={`${styles.product_assured} `}>
                                <Image
                                  alt='new book'
                                  className={``}
                                  height={50}
                                  width={170}
                                  src={newbook_img}
                                />
                              </div>
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
                          <div className='icons_div'>
                            <div className='shareicon'>
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
                                <div
                                  style={{
                                    marginTop: "1.2rem",
                                    minHeight: "2.1rem",
                                    minWidth: "2.5rem",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}>
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
                                  onClick={this.buynow_newbook}
                                  className={styles.productBuyNowdDiv}
                                  onMouseEnter={() => {
                                    this.setState({
                                      buynowhover: true
                                    })
                                  }}
                                  onMouseLeave={() => {
                                    this.setState({
                                      buynowhover: false
                                    })
                                  }}
                                  style={{
                                    outline: "none",
                                    background: this.state.buynowhover ? '#222' : "#f35631",
                                    color: this.state.buynowhover ? '#fff' : "#fff",
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
                                      <div style={{}}>Buy Now</div>
                                    )}
                                  </div>
                                </Button>
                                <Button
                                  className={styles.productAddtoCarddiv}
                                  // variant='outlined'
                                  onMouseEnter={() => {
                                    this.setState({
                                      addtocarthover: true
                                    })
                                  }}
                                  onMouseLeave={() => {
                                    this.setState({
                                      addtocarthover: false
                                    })
                                  }}
                                  style={{
                                    outline: "none", width: "14.5rem", color: this.state.addtocarthover ? '#2248ae' : '#fff',
                                    border: this.state.addtocarthover ? '2px solid #2248ae' : '2px solid #fff'
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
                                    this.state.bookType == "newbook"
                                      ? this.AddNewBookToCart(e)
                                      : this.AddOldBookToCart(e);
                                  }}>
                                  <div className={`${styles.addtoCartText}`}>
                                    {this.state.Add_cartLoader ? (
                                      // `Adding`
                                      <CircularProgress
                                        size={30}
                                        style={{ color: this.state.addtocarthover ? "#2248ae" : "white" }}
                                      />
                                    ) : (
                                      <div style={{}}>
                                        <span>
                                          {" "}
                                          <ShoppingCartIcon
                                            style={{ height: "2rem", animation: this.state.addtocarthover ? 'cartanimation2 1.2s' : null, animationIterationCount: '1' }}
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
                                className={styles.productBuyNowdDiv}
                                // color='success'
                                // variant='contained'
                                disabled={this.state.Buy_cartLoader}
                                onMouseEnter={() => {
                                  this.setState({
                                    buynowhover: true
                                  })
                                }}
                                onMouseLeave={() => {
                                  this.setState({
                                    buynowhover: false
                                  })
                                }}
                                style={{
                                  outline: "none",

                                  background: this.state.buynowhover ? '#d9320b' : "#f35631",
                                  color: this.state.buynowhover ? '#fff' : "#fff",
                                  width: "14.5rem",
                                }}
                                value={
                                  this.state.Buy_cartLoader
                                    ? `Moving to Cart`
                                    : `Buy Now2`
                                }
                                startIcon={
                                  <Image
                                    className="buynowimage"
                                    alt='buy now'

                                    src={sendicon}
                                    style={{
                                      fontSize: "1.5rem", transform: this.state.buynowhover ? 'rotate(30deg)' : null,
                                      transition: 'transform .2s ease-in-out',
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
                                className={styles.productAddtoCarddiv}
                                fullWidth
                                onMouseEnter={() => {
                                  this.setState({
                                    addtocarthover: true
                                  })
                                }}
                                onMouseLeave={() => {
                                  this.setState({
                                    addtocarthover: false
                                  })
                                }}
                                style={{
                                  outline: "none", width: "14.5rem", color: this.state.addtocarthover ? '#2248ae' : '#fff',
                                  border: this.state.addtocarthover ? '2px solid #2248ae' : '2px solid #fff'
                                }}
                                value={
                                  this.state.Add_cartLoader
                                    ? `Adding`
                                    : `Add to Cart`
                                }
                                onClick={e => {
                                  this.state.bookType == "newbook"
                                    ? this.AddNewBookToCart(e)
                                    : this.AddOldBookToCart(e);
                                }}>
                                <div className={`${styles.addtoCartText}`}>
                                  {this.state.Add_cartLoader ? (
                                    // `Adding`
                                    <CircularProgress
                                      size={30}
                                      style={{ color: this.state.addtocarthover ? "#2248ae" : "white" }}
                                    />
                                  ) : (
                                    <div style={{}}>
                                      <span>
                                        {" "}
                                        <ShoppingCartIcon
                                          style={{ height: "2rem", animation: this.state.addtocarthover ? 'cartanimation2 1.2s' : null, animationIterationCount: '1' }}
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
                          )}
                        </div>
                      </MediaQuery>
                    </div>
                  </div>
                </div>
              </div>
              {/* ------------------End Product left div ----------------------- */}

              {/* -----------------Product Right Div ---------------------------- */}
              <div className='product_right  col-lg-7 col-md-7 col-sm-6 col-12'>
                <div
                  className='product_right_inner px-2  '
                  style={{ marginBottom: "1rem" }}>
                  <div className='breadcrumDiv '>
                    <NoSsr>
                      <NextBreadcrumbs />
                    </NoSsr>
                  </div>
                  <div className='product_right_title_price '>
                    <div
                      className={`${styles.product_right_title_price_inner} pb-3 pt-2 mb-3`}>
                      <h6
                        style={{ marginBottom: "2px", fontSize: "1.2rem" }}
                        className={`${styles.product_title_inner}`}>
                        {title.replace(
                          /(\w)(\w*)/g,
                          (_, firstChar, rest) =>
                            firstChar.toUpperCase() + rest.toLowerCase()
                        )}{" "}
                        <span style={{ fontSize: "0.9rem" }}>
                          {" "}
                          ({language},{binding})
                        </span>
                      </h6>
                      <div
                        style={{ fontSize: "0.8rem", display: "flex" }}
                        className='mb-3 '>
                        <span>
                          {this.props.book.author == "NA" ? null : (
                            <span>
                              By{" "}
                              <Link
                                href='/author/[author_name]'
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
                                href='/publication/[publication_name]'
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
                        <div className={`${styles.product_assured} `}>
                          <Image
                            alt='use book'
                            className={``}
                            layout='responsive'
                            src={assured}
                          />
                        </div>
                      </div>
                      <div
                        className={`${styles.product_title_price} d-flex justify-content-start  align-items-center`}>
                        <div className={`product_price`}>
                          {this.state.bookType == "newbook" ? (
                            this.state.offertype == "discount" ? (
                              <span>
                                <span style={{ fontSize: "1.5rem" }}>
                                  ₹{this.DicountedPrice(this.props.book.MRP)}
                                </span>{" "}
                                <s className={`${styles.decoration_overline}`}>
                                  ₹{this.props.book.MRP}
                                </s>{" "}
                                &nbsp;
                                <span className='savedPercent'>
                                  ₹
                                  {Math.ceil(
                                    this.props.book.MRP -
                                    this.DicountedPrice(this.props.book.MRP)
                                  )}{" "}
                                  <span style={{ color: "gray" }}>
                                    {" "}
                                    saved!{" "}
                                  </span>
                                </span>
                              </span>
                            ) : (
                              <span>
                                <span style={{ fontSize: "1.5rem" }}>
                                  ₹{this.props.book.MRP}
                                </span>{" "}
                                &nbsp;
                                <span className='savedPercent'>
                                  Effective price ₹
                                  {this.CashbackPrice(
                                    parseInt(this.props.new_book_data.MRP)
                                  )}
                                  !
                                </span>
                              </span>
                            )
                          ) : (
                            <span className='payonly'>
                              <span
                                style={{
                                  fontSize: "1.5rem",
                                  alignItems: "center",
                                }}>
                                <span
                                  style={{
                                    fontSize: "0.8rem",
                                    color: "gray",
                                  }}>
                                  {" "}
                                  Pay Only Shipping & Handling &nbsp;
                                </span>{" "}
                              </span>{" "}
                              <span>
                                {this.props.SelectCond.length ? (
                                  <span style={{ fontSize: "1.4rem" }}>
                                    ₹ {this.calculateBookDetails().price}
                                  </span>
                                ) : (
                                  ""
                                )}
                                <s className={`${styles.decoration_overline}`}>
                                  ₹{selectedConditon.MRP}
                                </s>{" "}
                                &nbsp;
                                <span className='savedPercent'>
                                  Free &nbsp;
                                  <HelpIcon
                                    onClick={() => {
                                      this.setState({
                                        openwhyfreeinfo: true,
                                      });
                                    }}
                                    fontSize='small'
                                    style={{ color: "#777", cursor: "pointer" }}
                                  />
                                </span>
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.state.is_booktype_show ? (
                    <div
                      className='product_right_condition '
                      style={{ marginBottom: "1rem" }}>
                      <div
                        className={`${styles.product_right_condition_inner} px-1`}>
                        <div className={` ${styles.product_book_condition}`}>
                          <span>Select Book Type</span>
                        </div>
                        <div>
                          <div className={`${styles.Selection_book_cond}`}>
                            <div className={`${styles.book_condition_button}`}>
                              <button
                                style={{ margin: "0rem 0.2rem" }}
                                className={
                                  this.state.bookType === "usedbook"
                                    ? `${styles.contained_btn}`
                                    : `${styles.outlined_btn} `
                                }
                                onClick={() => this.changeBookType("usedbook")}>
                                <div>
                                  <div>
                                    <span>Used Book</span>
                                  </div>
                                </div>
                              </button>
                              <button
                                style={{ margin: "0rem 0.2rem" }}
                                className={
                                  this.state.bookType === "newbook"
                                    ? `${styles.contained_btn}`
                                    : `${styles.outlined_btn} `
                                }
                                onClick={() => this.changeBookType("newbook")}>
                                <div>
                                  <div>
                                    <span>New Book</span>
                                  </div>
                                  <div className='subtext_cond'>
                                    {/* InStock */}
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* product codition Div  */}
                  {this.state.bookType == "newbook" ? (
                    // this.props.new_book_data.newBookQty > 0 ? (
                    true ? (
                      <div className='product_right_condition '>
                        <div
                          className={`${styles.product_right_condition_inner} px-4`}>
                          <div className={` ${styles.product_book_condition}`}>
                            <span>Offers</span>
                          </div>
                          <div className='offer_choose_div'>
                            <div className={`${styles.Selection_book_cond}`}>
                              <div
                                className={`${styles.book_condition_button} d-flex`}>
                                {this.props.book.discount_percent ? (
                                  <button
                                    // style={{ margin: "0rem 0.2rem" }}
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
                                          Flat{" "}
                                          {this.props.book.discount_percent}%
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
                                    // style={{ margin: "0rem 0.2rem" }}
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
                    ) : (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}>
                        <span
                          color='error'
                          style={{ fontSize: "1.5rem", color: "red" }}>
                          Out of Stock
                        </span>
                      </div>
                    )
                  ) : this.state.selectedConditon.qty > 0 ? (
                    <div className='product_right_condition '>
                      <div
                        className={`${styles.product_right_condition_inner}`}>
                        <div className={` ${styles.product_book_condition}`}>
                          <span style={{ marginRight: "0.5rem" }}>
                            Book Condition
                          </span>
                        </div>

                        <div className='condition_div'>
                          {this.state.bookType == "usedbook" ? (
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
                                        <span style={{ color: "black" }}>
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
                                        <span style={{ color: "black" }}>
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
                                        <span style={{ color: "black" }}>
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
                                        <span style={{ color: "black" }}>
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
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <span
                        color='error'
                        style={{ fontSize: "1.5rem", color: "red" }}>
                        Out of Stock
                      </span>
                    </div>
                  )}
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
                                  style={{ fontSize: "0.86rem" }}
                                  className='text-success font-weight-bold'>
                                  {" "}
                                  ({this.props.book.discount_percent}% Off)
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <div className='row m-2 pb-2'>
                            <div className='col-6 text-success font-weight-bold'>
                              Total Amount old
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
                                    className='text-success font-weight-bold'
                                    style={{ fontSize: "0.86rem" }}>
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

                        <div
                          className='text-center'
                          style={{ padding: "1rem" }}>
                          <span>
                            <VerifiedUserIcon style={{ color: "#038D22" }} />
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
                              Free <HelpIcon
                                onClick={() => {
                                  this.setState({
                                    openwhyfreeinfo: true,
                                  });
                                }}
                                fontSize='small'
                                style={{ color: "#777", cursor: "pointer" }}
                              />
                            </span>
                          </div>
                        </div>
                        <div className='row  m-2'>
                          <div className={`${styles.handeling_charge} col-6`}>
                            Pay Only Shipping & Handling{" "}
                            <span>
                            </span>
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

                        <div
                          className='text-center'
                          style={{ padding: "1rem" }}>
                          <span>
                            <VerifiedUserIcon style={{ color: "#038D22" }} />
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
                          <div
                            // className={`d-flex align-items-center delevery_input p-4`}
                            className='delivery_div'>
                            <div className={`${styles.delevery_title} `}>
                              <span>Estimated Delivery</span>
                            </div>
                            <div className='d-flex align-items-center'>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  margin: "0 1rem",
                                }}>
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
                                        <LocationOnIcon
                                          color='primary'
                                          style={{ height: "26px" }}
                                        />
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
                                <div className='col-6 '>Publication Date :</div>
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
                              <div style={{ margin: "1rem 1rem" }}>
                                <p
                                  // ref="description"
                                  className='description'
                                  dangerouslySetInnerHTML={{
                                    __html: this.ResizeDescription(
                                      selectedConditon.book_desc
                                    ),
                                  }}></p>
                                {selectedConditon.book_desc.length > 500 ? (
                                  <p
                                    className='text-center text-primary style'
                                    style={{ cursor: "pointer" }}
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
                </div>
              </div>
              {/*------------------------- End Product Right -------------*/}
            </div>

            {/* ------------------------- Fix add to cart button in mobile only show --------------------- */}

            {/* ---------------------End  add to cart button ---------------------------- */}
          </div>
          {/* -----------------Similar book div ------------------------ */}
          <div className='similar_bookdiv'>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <BookSuggestionSearch
              value={[this.props.book.category]}
              title='Similar Books'
              attribute={"category"}

              redirection={this.props.book.category_arr.length == 3 ?
                '/category/' + this.props.book.category_arr[0] + "/" + this.props.book.category_arr[1] + "/" + this.props.book.category_arr[2] + "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=" :
                this.props.book.category_arr.length == 2 ?
                  '/category/' + this.props.book.category_arr[0] + "/" + this.props.book.category_arr[1] + "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=" :
                  this.props.book.category_arr.length == 1 ?
                    '/category/' + this.props.book.category_arr[0] + "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=" :
                    null
              }
            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <BookSuggestionSearch
              value={this.props.book.author}
              title='Similar Author'
              attribute={"author"}
              redirection={this.props.book.author ?
                "/author/books-" + this.props.book.author.split(" ").join("-") + "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=" : null}

            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <BookSuggestionSearch
              value={this.props.book.publication}
              title='Similar Publication'
              attribute={"publication"}
              redirection={this.props.book.publication ? "/publication/books-" + this.props.book.publication.split(" ").join("-") + "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=" : null}
            />
          </div>
          {/* -----------------End Similar book div ------------------------ */}

          {/*------------------------Quality Satisfaction Div -------------------  */}
          <div className=' ' style={{ marginTop: "1rem" }}>
            <SatisfactionBanner />
          </div>

          {/* ---------------------Quality Satisfaction End Div------------ */}
        </div>
        <div className='btn_sticky'>
          <MediaQuery maxWidth={577}>
            <div>
              <div className='product_img_bottom ' style={{ padding: "1rem" }}>
                {this.state.bookType == "newbook" ? (
                  this.props.new_book_data.newBookQty > 0 ? (
                    <div
                      className='product_img_bottom_inner d-flex justify-content-between  mt-1'
                      style={{ columnGap: "1rem" }}>
                      <Button
                        onClick={this.buynow_newbook}
                        className={styles.productBuyNowdDiv}
                        // color='success'
                        onMouseEnter={() => {
                          this.setState({
                            buynowhover: true
                          })
                        }}
                        onMouseLeave={() => {
                          this.setState({
                            buynowhover: false
                          })
                        }}
                        style={{
                          outline: "none",
                          background: this.state.buynowhover ? '#ddd' : "#f35631",
                          color: this.state.buynowhover ? '#fff' : "#fff",
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
                        className={styles.productAddtoCarddiv}
                        onMouseEnter={() => {
                          this.setState({
                            addtocarthover: true
                          })
                        }}
                        onMouseLeave={() => {
                          this.setState({
                            addtocarthover: false
                          })
                        }}
                        style={{
                          outline: "none", width: "14.5rem", color: this.state.addtocarthover ? '#2248ae' : '#fff',
                          border: this.state.addtocarthover ? '2px solid #2248ae' : '2px solid #fff'
                        }}
                        // color='primary'
                        fullWidth
                        // disabled={this.state.Add_cartLoader}
                        value={
                          this.state.Add_cartLoader
                            ? `Adding`
                            : this.state.already_incart
                              ? `Go to Cart`
                              : `Add to Cart`
                        }
                        onClick={e => {
                          this.state.bookType == "newbook"
                            ? this.AddNewBookToCart(e)
                            : this.AddOldBookToCart(e);
                        }}>
                        <div className={`${styles.addtoCartText}`}>
                          {this.state.Add_cartLoader ? (
                            // `Addingmob2`
                            <CircularProgress
                              size={20}
                              style={{ color: this.state.addtocarthover ? "#2248ae" : "white" }}
                            />
                          ) : (
                            <div style={{}}>
                              <span >
                                {" "}
                                <ShoppingCartIcon
                                  style={{ height: "2rem", animation: this.state.addtocarthover ? 'cartanimation2 1.2s' : null, animationIterationCount: '1' }}
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
                      className={styles.productBuyNowdDiv}
                      onMouseEnter={() => {
                        this.setState({
                          buynowhover: true
                        })
                      }}
                      onMouseLeave={() => {
                        this.setState({
                          buynowhover: false
                        })
                      }}
                      style={{
                        outline: "none",
                        background: this.state.buynowhover ? '#ddd' : "#f35631",
                        color: this.state.buynowhover ? '#fff' : "#fff",
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
                      className={styles.productAddtoCarddiv}
                      onMouseEnter={() => {
                        this.setState({
                          addtocarthover: true
                        })
                      }}
                      onMouseLeave={() => {
                        this.setState({
                          addtocarthover: false
                        })
                      }}
                      style={{
                        outline: "none", width: "14.5rem", color: this.state.addtocarthover ? '#2248ae' : '#fff',
                        border: this.state.addtocarthover ? '2px solid #2248ae' : '2px solid #fff'
                      }}
                      // color='primary'
                      fullWidth
                      // disabled={this.state.Add_cartLoader}
                      value={
                        this.state.Add_cartLoader ? `Adding` : `Add to Cart`
                      }
                      onClick={e => {
                        this.state.bookType == "newbook"
                          ? this.AddNewBookToCart(e)
                          : this.AddOldBookToCart(e);
                      }}>
                      <div className={`${styles.addtoCartText}`}>
                        {this.state.Add_cartLoader ? (
                          // `Addingmob`
                          <CircularProgress
                            size={30}
                            style={{ color: this.state.addtocarthover ? "#2248ae" : "white" }}
                          />
                        ) : (
                          <div style={{}}>
                            <span>
                              {" "}
                              <ShoppingCartIcon
                                style={{ height: "2rem", animation: this.state.addtocarthover ? 'cartanimation2 1.2s' : null, animationIterationCount: '1' }}
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
        <Dialog
          open={this.state.notifyopen}
          closeOnDocumentClick
          onClose={() => this.setState({ notifyopen: false })}
          contentStyle={
            {
              // width: "auto",
            }
          }>
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
              {/* <label>{this.state.data}</label> */}
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
        <style jsx>
          {`
          // Styles jsx
          .main_outterdiv {
            //   border: 1px solid red;
            // margin-top: 1rem;
            // padding: 0.5rem;
            margin: 1rem;
          }
          .breadcrumDiv {
            margin-left: -3rem;
          }
          .product_maindiv {
            display: flex;
            background: white;
          }
          .image_thumb {
            width: 3.5rem;
            padding-top: 0.5rem;
          }
          .product_topdiv {
            //   border: 2px solid red;
          }
          .product_Left {
            border: 1px solid lightgrey;
            // border-right: 0;

            //   border: 1px solid green;
          }
          .product_Left_maindiv {
            //   border: 2px solid purple;
            //   min-height: 20rem;
          }
          .left_div_parent {
            // border: 2px solid lightblue;
            min-height: 28rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .product_right {
            // border: 1px solid lightgrey;
          }
          .payonly {
            display: flex;
          }
          .product_Left_innerdiv {
            display: flex;
            margin: 0;
            padding: 0;
          }
          .product_Left_imgthumb {
            //   border: 1px solid blue;
            margin: 0;
            padding: 0;
          }
          .product_Left_image_div {
            display: flex;
            //   border: 1px solid red;
            padding: 0;
            margin: 0;
          }

          .main_image_div {
            //   border: 1px solid blue;
            height: 15rem;
            width: 3rem;
          }
          .product_image_size {
            //   border: 2px solid yellow;
            // max-width: 25vw;
            // width: 22vw;
            // height: 57vh;
            width: 15rem;
            height: 20rem;
            padding-top: 0.5rem;
            // max-height: 30rem;
          }
          .share_btn_div {
            // border: 1px solid black;
            min-height: 20rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          }

          .product_img_normal {
            //   border: 3px solid green;
            padding-top: 0.9rem;

            //   position: -webkit-sticky;
            //   position: sticky;

            //   top: 7.1rem;
          }
          .book_outofstock {
            // border: 1px solid red;
            text-align: center;
            // width: 15rem;
            width: 100%;
            padding: 0.5rem;
            font-size: 1.5rem;
            color: red;
            position: relative;
            background: white;
            bottom: 11rem;
            opacity: 0.9;
          }
          
          .btn_sticky {
            // position: -webkit-sticky;
            z-index: 1050;
            width: 100vw;
            font-size: 0.8rem;
            position: fixed;
            bottom: 0rem;
            box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
              rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
            background: white;
          }
          .product_img_sticky {
            //   border: 2px solid purple;
            // padding-top: 0.5rem;

            position: -webkit-sticky;
            position: sticky;

            top: 5rem;
          }

          .savedPercent {
            font-size: 0.95rem;
            // animation: blink-animation 0.9s steps(5, start) 5;
            // transition: 0.5s;
            // color:gray;
          }
          // .savedPercent:hover{
          //     animation:shake 0.8s 1;
          // }

          .simillar_books_div {
            //   display: none;
          }

          @keyframes blink-animation {
            to {
              visibility: hidden;
            }
          }
          @-webkit-keyframes blink-animation {
            to {
              visibility: hidden;
            }
          }
          .heart {
            z-index: 2;
            position: absolute;
            right: 20px;
            top: 5px;
            width: 80px;
            height: 80px;
            /* background-size: 2900%; */
            background-position: 0px 0px;

            left: 50%;
            top: 50%;
            // border: 1px solid red;
            transform: translate(-60%, -37%);
            cursor: pointer;
            animation: fave-heart 0.8s steps(28) 1;
          }
          @keyframes heart-burst {
            from {
              background-position: left;
            }
            to {
              background-position: right;
            }
          }
          @keyframes fave-heart {
            0% {
              background-position: 0px 0px;
            }
            100% {
              background-position: 0px 0px;
            }
          }

          .delivery_div {
            display: flex;
            align-items: center;
            padding: 5px;
          }
          .buynowimage{
           animation: shake 0.5s;
           animation-iteration-count: infinite;
          }
           @keyframes cartanimation2 {
            18% { transform: scale(140%) rotate(-5deg); }
            40% { transform: scale(100%) rotate(-0deg); }
            // 20% { transform:  rotate(3deg); }
            // 30% { transform:  rotate(0deg); }
            // 40% { transform:  rotate(0deg); }
            // 50% { transform:  rotate(0deg); }
            // 60% { transform: translateX(-12px) rotate(0deg);}
            // 70% { transform: translateX(-24px) rotate(0deg);}
            // 80% { transform: translateX(-36px) rotate(0deg);}
            // 90% { transform: translateX(-48px)rotate(0deg);}
            // 100% {opacity:0;}
          }
          @keyframes cartanimation {
            0% { transform: rotate(0deg); }
            10% { transform:  rotate(-3deg); }
            20% { transform:  rotate(3deg); }
            30% { transform:  rotate(0deg); }
            40% { transform:  rotate(0deg); }
            50% { transform:  rotate(0deg); }
            60% { transform: translateX(-12px) rotate(0deg);}
            70% { transform: translateX(-24px) rotate(0deg);}
            80% { transform: translateX(-36px) rotate(0deg);}
            90% { transform: translateX(-48px)rotate(0deg);}
            // 100% {opacity:0;}
          }
          @keyframes shake {
            
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -1px) rotate(-1deg); }
            20% { transform: translate(-2px, 0px) rotate(1deg); }
            30% { transform: translate(2px, 1px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 1px) rotate(-1deg); }
            60% { transform: translate(-2px, 1px) rotate(0deg); }
            70% { transform: translate(2px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -1px) rotate(-1deg); }
          }
          @keyframes animName {
            0%{
                transform: rotate(0deg);
              }
            100%{
                transform: rotate(360deg);
              }
            }
          @media screen and (max-width: 992px) {
            .left_div_parent {
              min-height: 5rem;
            }
            .main_image_div {
              //   border: 1px solid blue;
              height: 5rem;
            }
            .product_image_size {
              //   border: 2px solid yellow;
              // max-width: 25vw;
              width: 14rem;
              height: 19rem;
              padding-top: 0.5rem;
              // max-height: 30rem;
            }
            .share_btn_div {
              //   border: 1px solid black;
              min-height: 15rem;
              display: flex;
              flex-direction: column;
              align-items: end;
              justify-content: space-between;
            }
          }

          @media screen and (max-width: 768px) {
            .product_image_size {
              //   border: 2px solid yellow;
              // max-width: 25vw;
              width: 10rem;
              height: 15rem;
              padding-top: 0.5rem;
              // max-height: 30rem;
            }
          }
          @media screen and (max-width: 576px) {
            .delivery_div {
              display: flex;
              flex-direction: column;
            }
            .main_outterdiv {
              //   border: 1px solid red;
              margin-top: 1rem;
              padding: 0rem;
              margin-left: 0.5rem;
              margin-right: 0.5rem;
              margin-bottom: 5rem;
            }

            .product_maindiv {
              display: flex;
              flex-direction: column;
              background: white;
            }
            .left_div_parent {
              // border: 2px solid lightblue;
              min-height: 20rem;
            }
            .product_image_size {
              // border: 2px solid yellow;
              // width: 40vw;
              // height: 35vh;
              width: 12rem;
              height: 17rem;
            }
            .product_right {
              padding: 0px;
            }
            .payonly {
              display: flex;
              flex-direction: column;
            }
            .product_right_condition {
              display: flex;
              flex-direction: column;
            }
            .offer_choose_div {
              display: flex;
            }
            .condition_div {
              display: flex;
              width: 100%;
              margin: 0px;
              // border: 1px solid red;
            }
            .share_btn_div {
              //   border: 1px solid black;
              min-height: 17rem;
              display: flex;
              flex-direction: row;
              align-items: end;
              justify-content: space-between;
            }

            .shareicon {
              margin-right: 1rem;
            }
            .icons_div {
              display: flex;
            }
          }
        `}
        </style>
      </React.Fragment>;
  }
}
const mapStateToProps = state => ({
  WrongSlug: state.compExam.WrongSlug,
  FromMycart: state.cartReduc.MyCart,
  userToken: state.accountR.token,

  getuserdetails: state.userdetailsR.getuserdetails,
  PopupCart: state.cartReduc.PopupCart,
  CartSessionData: state.cartReduc.CartSessionData,
  SeoData: state.seodata.seodata,
  SuggestionData: state.productsuggestionreducer.SuggestionData,
  userComponentStatus: state.accountR.userComponentStatus,
  wishlist_msg: state.cartReduc.wishlist_msg,
  list_wishlist: state.cartReduc.list_wishlist,
});
export default connect(mapStateToProps, {
  getBook,
  AddToCart,
  CartopenModal,
  ToBeAddedToCart,
  userdetails,
  setNewPricing,
  CartSession,
  removeAllCart,
  openTheChilCategory,
  unmountProductState,
  getSeoData,
  updateBookImage,
  AddToCartLogin,
  toggleGlobalLoader,
  getEstDeliveryDate,
  sendBookNotification,
  getBooksSuggestionsByPage,
  Adding_Wishlist,
  login_backdropToggle,
  Update_wishlist,
  fetch_wishlist_detail_otherpage,
  GetWishlistCount,
})(withSnackbar(ProductPage));
