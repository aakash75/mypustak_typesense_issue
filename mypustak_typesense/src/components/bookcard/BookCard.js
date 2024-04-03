import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MediaQuery from "react-responsive";
import { SnackbarContent, useSnackbar } from "notistack";
import { sendBookNotification } from "../../redux/actions/bookNotifyAction";

// import SendIcon from '@mui/icons-material/Send';
import ReactGA from "react-ga";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import assured from "../../assets/assured.svg";
import usedbook_img from "../../assets/usedbook.svg";
import newbook_img from "../../assets/newBookTag.svg";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MobileDetect from "mobile-detect";

import DialogContent from "@mui/material/DialogContent";
import styles from "../../styles/Product.module.css";
import styleBookCard from "../../styles/BookCard.module.css";
import { CloseOutlined } from "@mui/icons-material";
import Link from "next/link";
import { connect } from "react-redux";
import { AuthInstance, url } from "../../helper/api_url";
import {
  AddToCart,
  AddToCartLogin,
  CartopenModal,
  CartSession,
  ToBeAddedToCart,
  Adding_Wishlist,
  Update_wishlist,
  check_book_incart,
} from "../../redux/actions/cartAction";
import {
  fetch_wishlist_detail_otherpage,
  login_backdropToggle,
} from "../../redux/actions/accountAction";
import { encryptor } from "../../helper/crypto";
import { CircularProgress } from "@mui/material";
import {
  Card,
  IconButton,
  Snackbar,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import { EmailValidation } from "../../helper/validations";
import Slide, { SlideProps } from "@mui/material/Slide";
import { GetWishlistCount } from "../../redux/actions/wishlistAction";
import { useRouter } from "next/navigation";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

function BookCard_old(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const propimage = props.image;

  const src = propimage.includes("https://d1f2zer3rm8sjv")
    ? propimage
    : `https://d1f2zer3rm8sjv.cloudfront.net/${propimage}`;
  const [AddedtoCart, setAddedtoCart] = useState(false);
  const [SelectedCondition, setSelectedCondition] = useState("");
  const [offertype, setoffertype] = useState("discount");
  const [loaded, setloaded] = useState(false);
  const [BookType, setBookType] = useState("old");
  const [OldBookData, setOldBookData] = useState({});
  const [NewBookData, setNewBookData] = useState({});
  const [BookDetail, setBookDetail] = useState({});
  const [ConditionData, setConditionData] = useState({});
  const [Add_cartLoader, setAdd_cartLoader] = useState(false);
  const [defaultImgSrc, setdefaultImgSrc] = useState("");
  const [incart, setincart] = useState([]);
  const [clicked, setClicked] = useState("");
  const [wishlist_id, setWishlist_id] = useState("");
  const [currentUrlPath, setCurrentUrlPath] = useState("");
  const [showWishlist, setshowWishlist] = useState(false);
  const [showWishlistmsg, setshowWishlistmsg] = useState("Hello World");
  const [sendEmail, setsendEmail] = useState("");
  const [onerror, setonerror] = useState(false);
  const [wishListLoader, setWishListLoader] = useState(false);
  const [MyCart, setMyCart] = useState({});
  const [DialogAddtoCart, setDialogAddtoCart] = useState(false);
  const router = useRouter();
  useEffect(() => {
    let path = window.location.pathname;

    setCurrentUrlPath(path);
    let incart = [];
    props.incart_check.map((m) => {
      console.log(m.bookId, "incart_checkk");
      incart.push(m.bookId);
    });
    setincart(incart);
  }, []);

  useEffect(() => {
    let incart = [];
    console.log(props.incart_check, "local props.incart_check");
    props.incart_check.map((m) => {
      console.log(m.bookId, "incart_checkk");
      incart.push(m.bookId);
    });
    setincart(incart);
  }, [props.incart_check]);
  useEffect(() => {
    props.list_wishlist.map((data) => {
      if (data.book_id == props.book.book_id) {
        setClicked("click_wishlist");
        setWishlist_id(data.wishlist_id);
      } else {
      }
    });
  }, [props.list_wishlist]);
  const [open, setopen] = useState(false);
  const [newbooksnackbar, setnewbooksnackbar] = useState(false);
  const [addtocartloading, setaddtocartloading] = useState(false);
  const DicountedPrice = (price) => {
    const discount_per = props.book.discount_per;
    // const discount_per=20;
    let discountedPrice = price - (price * discount_per) / 100;
    return Math.round(discountedPrice);
  };

  const notifyopenModal = (e) => {
    e.preventDefault();
    const email = sendEmail;
    setnotifydialogloading(true);

    if (EmailValidation(email)) {
      setNotifydata("Enter valid email");
      return;
    }
    const passdata = {
      email: email,
      slug: `${props.book.slug}`,
    };
    const body = { body: encryptor(passdata) };
    props
      .sendBookNotification(body)
      .then((res) => {
        setnotifydialogloading(false);
        setnotifyopen(false);
        enqueueSnackbar(`${res.message}`, { variant: "success" });
      })
      .catch((err) => {
        setnotifydialogloading(false);
        setnotifyopen(false);

        enqueueSnackbar(`${err.response.data.message}`, { variant: "error" });
      });
  };

  const notifycloseModal = () => {
    this.setState({ notifyopen: false });
  };
  const [notifyloading, setnotifyloading] = useState(false);
  const [notifydialogloading, setnotifydialogloading] = useState(false);
  const [Notifydata, setNotifydata] = useState("");
  const [notifyopen, setnotifyopen] = useState(false);
  const Notify = (e) => {
    const email = props.getuserdetails.email;
    e.preventDefault();
    // alert(email)
    if (!email) {
      setnotifyopen(true);
    }
    if (EmailValidation(email)) {
      setNotifydata("Enter valid email");
      return;
    }
    setnotifyloading(true);
    const passdata = {
      email: email,
      slug: `${props.book.slug}`,
    };
    const body = { body: encryptor(passdata) };
    props
      .sendBookNotification(body)
      .then((res) => {
        setnotifyopen(false);

        setnotifyloading(false);
        enqueueSnackbar(`${res.message}`, { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(`${err.response.data.message}`, { variant: "error" });
        setnotifyloading(false);
        setnotifyopen(false);
      });
  };
  const handleClose = () => {
    setopen(false);
    setnewbooksnackbar(false);
    setshowWishlist(false);
  };
  const calculateBookDetails = () => {
    const bookdetails = BookDetail;
    const bookConditionDetails = OldBookData;
    const selectedBookCondition = SelectedCondition;
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
          const VgBookres = updateVeryGoodBookPrice(
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
          const ABRBookres = updateAvgBRCondBookPrice(
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
          const ANBookres = updateAlmostNewBookPrice(
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
          const BNBookres = updateBrandNewBookPrice(
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

  const onChangedCondition = (e, change_cond) => {
    setSelectedCondition(change_cond);
    setConditionData(OldBookData[change_cond]);
  };

  const onClick_book = () => {
    // alert('Book   '+ props.book.isbn)
    console.log(props.book, " props.book");
    let slug = props.book.title.split(" ").join("-");
    const url = `${slug}-${props.book.isbn ? props.book.isbn : ""}`;
    const encodedUrl = encodeURIComponent(url);

    // if (window.Unbxd && typeof window.Unbxd.track === 'function') {

    //   setTimeout(function () {
    //     window.Unbxd.conf['immediate'] = {};
    //     Unbxd.conf.immediate['click'] = false
    //     Unbxd.conf.immediate['cart'] = false
    //   }, 1000)

    // } else {
    //   console.error('unbxdAnalytics.js is not loaded!');
    // }
    window.location.assign(
      `/product/${encodedUrl}?${props.book.book_id}`,
      undefined,
      { shallow: false }
    );
  };
  const updateVeryGoodBookPrice = (book, inventroy, makeAPIReq = true) => {
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
  const updateAlmostNewBookPrice = (book, inventroy, makeAPIReq = true) => {
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

  const updateAvgBRCondBookPrice = (book, inventroy, makeAPIReq = true) => {
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

  const updateBrandNewBookPrice = (book, inventroy, makeAPIReq = true) => {
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

  const AddOldBookToCart = (condition, olbook) => {
    // alert("old books");
    // e.preventDefault();
    // console.log(e.target.SelectCond.value);
    console.log(olbook, "COND");
    setAdd_cartLoader(true);
    setaddtocartloading(true);
    const { getuserdetails } = props;
    const selectedCondition = condition;
    const defaultImgSrc = defaultImgSrc;
    // const selectedCondition = "VeryGood"
    // console.log({defaultImgSrc:defaultImgSrc.replace('https://mypustak-6.s3.amazonaws.com/books/','')});
    // const book_thumb = defaultImgSrc.replace(
    //   "https://mypustak-6.s3.amazonaws.com/books/",
    //   ""
    // );
    console.log(SelectedCondition, "SelectedCondition");
    const selectedBookConditionDetails = OldBookData[selectedCondition];
    // return;
    console.log(OldBookData[selectedCondition], "selectedBookConditionDetails");
    // let BOOK_INV_ID, DonorName, TOTALQUANTITY, RACK_NO;
    // const { book_inv_id, rack_no, shipping, bookId, title, MRP, image } =
    //   selectedBookConditionDetails;
    // this.setState({ Add_cartLoader: true });
    const book = props.book;
    var msgg = "";

    props.FromMycart.map((cart) =>
      // (`${cart.bookInvId}`===`${BOOK_INV_ID}`)?  msgg="already in cart": null
      `${cart.bookInvId}` === `${olbook.book_inv_id}`
        ? (msgg = "already in cart")
        : null
    );

    const MyCart = {
      bookId: olbook.book_id,
      bookName: olbook.title,
      bookSlug: olbook.slug,
      bookPrice: Math.round(olbook.MRP),
      bookShippingCost: Math.round(olbook.shipping),
      // bookShippingCost:Math.round(SHIPPING),
      bookThumb: defaultImgSrc
        ? defaultImgSrc != "null"
          ? defaultImgSrc
          : olbook.image
        : olbook.image,
      bookQty: 1,
      bookDonor: "",
      bookQty: 1,
      bookCond: condition,
      bookRackNo: olbook.rack_no,
      bookInvId: olbook.book_inv_id,
      delivery_cost: 0,
      cashbackedPrice: 0,
      discountedPrice: 0,
      cashback_per: 0,
      discount_per: 0,
      offertype: null,
      discount: 0,
      cashback: 0,
      book_thumb: defaultImgSrc,

      // bookDonner
    };

    setMyCart(MyCart);

    const sendCartSession = {
      book_id: olbook.book_id,
      book_inv_id: olbook.book_inv_id,
      cashbackedPrice: 0,
      discountedPrice: 0,
      cashback_per: 0,
      discount_per: 0,
      offertype: null,
      book_thumb: defaultImgSrc ? defaultImgSrc : olbook.thumb,
    };

    if (msgg === "") {
      if (props.userComponentStatus == 2) {
        props
          .AddToCartLogin({ sendCartSession })
          .then((res) => {
            setopen(true);

            // RefreshCart();
            setaddtocartloading(false);
            setAdd_cartLoader(false);
            setAddedtoCart(false);

            let obj = {
              pid: `${sendCartSession.book_id}`,
              qty: `1`,
            };

            // if (window.Unbxd && typeof window.Unbxd.track === 'function') {
            //   window.Unbxd.track('addToCart', obj);
            // } else {
            //   console.error('unbxdAnalytics.js is not loaded!');
            // }
          })
          .catch((err) => {
            console.log({ err });

            setAdd_cartLoader(false);
            setaddtocartloading(false);
          });
      } else {
        props.AddToCart(MyCart);
        props.ToBeAddedToCart({
          book_id: book.book_id,
          book_inv_id: book.book_inv_id,
          cashbackedPrice: 0,
          discountedPrice: 0,
          cashback_per: 0,
          discount_per: 0,
          offertype: null,
        });
        let obj = {
          pid: `${sendCartSession.book_id}`,
          qty: `1`,
        };

        // if (window.Unbxd && typeof window.Unbxd.track === 'function') {
        //   window.Unbxd.track('addToCart', obj);
        // } else {
        //   console.error('unbxdAnalytics.js is not loaded!');
        // }
        // thisprops.CartopenModal();
        setAddedtoCart(false);
        setaddtocartloading(false);
        setopen(true);
        setAdd_cartLoader(false);
      }
    } else {
    }
    // console.log({ MyCaxrt }, "P3")
  };

  const AddNewBookToCart = (e) => {
    e.preventDefault();
    // this.props.CartopenModal()
    setAdd_cartLoader(true);
    const selectedConditon = BookDetail;
    var msgg = "";
    let discount_price = 0;
    let cashback_price = 0;
    let cart_id = "";
    console.log(props.FromMycart, "props.FromMycart");
    props.FromMycart.map((cart) =>
      // (`${cart.bookInvId}`===`${BOOK_INV_ID}`)?  msgg="already in cart": null

      `${cart.bookInvId}` === `${selectedConditon.newbook_inv_id}`
        ? ((msgg = "already in cart"), (cart_id = cart.Cart_id))
        : null
    );

    if (offertype == "discount") {
      // alert(msgg);
      discount_price = DicountedPrice(Math.round(selectedConditon.price));
      cashback_price = 0;
    } else if (offertype == "cashback") {
      discount_price = 0;
      cashback_price = CashbackPrice(Math.round(selectedConditon.price));
      // alert(typeof (cashback_price))
    } else {
    }

    if (msgg.length) {
      // alert(msgg);
      // If book is already in cart Update the book offers
      const sendCartSession = {
        cashbackedPrice: cashback_price,
        discountedPrice: discount_price,
        cashback_per: selectedConditon.cashback_percent
          ? selectedConditon.cashback_percent
          : 0,
        discount_per: selectedConditon.discount_percent
          ? selectedConditon.discount_percent
          : 0,
        offertype: offertype.length > 1 ? offertype : null,
        "content-type": "application/json",
      };
      console.log(sendCartSession, "cartSession");

      AuthInstance.patch(
        `${url}/common/updateCart/${cart_id}/`,
        sendCartSession
      )
        .then((res) => {
          console.log(res.status, sendCartSession, "cartSession");
          setaddtocartloading(false);
          setAddedtoCart(false);
          const token = `Token ${localStorage.getItem("user")}`;
          // props.CartSession(token);
          // props.check_book_incart()
        })
        .catch((err) => {
          console.log(err);
          // console.log(sendCartSession);
        });
    }
    if (msgg === "") {
      // this.setState({ newBookAddtoCart: true });

      const MyCart = {
        bookId: selectedConditon.book_id,
        bookName: selectedConditon.title,
        bookSlug: selectedConditon.slug,

        bookPrice: Math.round(selectedConditon.price),
        bookShippingCost: offertype
          ? offertype == "discount"
            ? discount_price
            : Math.round(selectedConditon.price)
          : Math.round(selectedConditon.price),
        bookThumb: selectedConditon.image,
        bookQty: 1,

        bookOffer: offertype,
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
        offertype: offertype.length > 1 ? offertype : null,
      };
      setMyCart(MyCart);
      // console.log({ MyCart }, "bookAnew book", selectedConditon);
      // alert("nhioh");
      ReactGA.plugin.execute("ec", "addProduct", {
        id: MyCart.bookId,
        name: MyCart.bookName,
        sku: MyCart.bookInvId,
        category: MyCart.bookSlug,
        price: MyCart.bookPrice,
        quantity: MyCart.bookQty,
      });

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
        offertype: offertype.length > 1 ? offertype : null,
        "content-type": "application/json",
      };
      // console.log({sendCartSession});

      //  Add to Cart Session
      const cartSession_body = { cs: encryptor(sendCartSession) };

      if (props.userComponentStatus == 2) {
        // this.setState({ Add_cartLoader: true });
        AuthInstance.post(`${url}/common/addtocart/`, cartSession_body)
          .then((res) => {
            // console.log(res.status,sendCartSession,"cartSession");
            setnewbooksnackbar(true);
            setaddtocartloading(false);

            setAddedtoCart(false);
            setAdd_cartLoader(false);
            RefreshCart();
            // this.setState({ Add_cartLoader: false });
          })
          .catch((err) => {
            enqueueSnackbar(
              "Book Not Added To Cart Due To Some Error .Please Refresh The Page.",
              { variant: "error" }
            );
            console.log(err);
            props.AddToCart(MyCart);
          });
        //  Refreshing Cart after response
      } else {
        props.AddToCart(MyCart);
        props.ToBeAddedToCart({
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
          offertype: offertype.length > 1 ? offertype : null,
        });
        setAddedtoCart(false);
        setAdd_cartLoader(false);
        setopen(true);
        setaddtocartloading(false);

        // props.CartopenModal();
      }
    } else {
      // this.setState({ AlreadyinCartMsgNewBook: "Already In cart" });
      // props.CartopenModal();
    }
  };

  const RefreshCart = async () => {
    const token = localStorage.getItem("user");
    const details = `Token ${token}`;
    console.log(props.MyCart, props.CartSessionData, "CARTREDUC");
    // let res = await props.CartSession(details);
    let res = await props.check_book_incart();
    // console.log(res, "res")
    if (res) {
      // this.setState({ Add_cartLoader: false });
      // props.CartopenModal();

      return true;
    } else {
      return false;
    }
  };
  const clickWishlist = () => {
    if (props.userComponentStatus == 2) {
      if (!clicked) {
        setClicked("click_wishlist");
        setWishListLoader(true);
        let current_date = Math.floor(Date.now() / 1000);
        let user = JSON.parse(localStorage.getItem("user_info"));
        const wish_data = {
          book_id: props.book.book_id,
          user_id: user.id,
          book_inv_id: 0,
          book_thumb: props.book.thumb,
          i_date: current_date,
          is_move_incart: 0,
          is_deleted: 0,
          qty: 1,
          cashbacked_price: 0,
          discounted_price: 0,
          cashback_per: props.book.cashback_per ? props.book.cashback_per : 0,
          discount_per: props.book.discount_per ? props.book.discount_per : 0,
          offertype: null,
          user_pay: 0,
        };

        props.Adding_Wishlist(wish_data).then((res) => {
          setWishListLoader(false);
          enqueueSnackbar(
            <div style={{}}>
              <span>{res.message} &nbsp;&nbsp;</span>
              {res.message == "Book Already Present In Cart" ? (
                <Link href="/view-cart" legacyBehavior>
                  <a style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      style={{ color: "white", border: "2px solid white" }}
                    >
                      <span className={`${styleBookCard.viewList}`}>
                        {" "}
                        View Cart{" "}
                      </span>
                    </Button>
                  </a>
                </Link>
              ) : (
                <Link href="/customer/wishlist" legacyBehavior>
                  <a style={{ textDecoration: "none" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      style={{
                        color: "white",
                        border: "2px solid white",
                        outline: "none",
                      }}
                    >
                      <span className={`${styleBookCard.viewList}`}>
                        {" "}
                        View Wishlist{" "}
                      </span>
                    </Button>
                  </a>
                </Link>
              )}
            </div>,
            { variant: "success" }
          );
          props.GetWishlistCount();
          console.log(props.wishlist_msg, "props.wishlist_msg");
          props.fetch_wishlist_detail_otherpage();
          if (props.wishlist_msg == "Book Already Present In Cart") {
            setClicked("");
          } else {
            setClicked("");
          }
        });
      } else {
        setWishListLoader(true);
        setClicked("");
        const data = {
          wishlist_id: wishlist_id,
          is_deleted: 1,
        };
        const body = data;
        props.Update_wishlist({ body: body }).then((res) => {
          setWishListLoader(false);
          props.GetWishlistCount();
          enqueueSnackbar(
            <div>
              <span>Successfully Removed From Your Wishlist &nbsp;&nbsp;</span>
              <Link href="/customer/wishlist" legacyBehavior>
                <a style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    style={{
                      color: "white",
                      border: "2px solid white",
                      outline: "none",
                    }}
                  >
                    <span className={`${styleBookCard.viewList}`}>
                      {" "}
                      View Wishlist{" "}
                    </span>
                  </Button>
                </a>
              </Link>
            </div>,
            { variant: "success" }
          );
        });
      }
    } else {
      enqueueSnackbar(
        <div>
          <span>Please Login For Wishlisting a book</span>&nbsp;&nbsp;
          <Link
            href={`/account/Loginpage?ret=${currentUrlPath}`}
            legacyBehavior
          >
            <a style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="small"
                style={{
                  color: "white",
                  border: "2px solid white",
                  outline: "none",
                }}
              >
                <span className={`${styleBookCard.viewList}`}> Login </span>
              </Button>
            </a>
          </Link>
        </div>,
        { variant: "warning" }
      );
      props.login_backdropToggle();
    }
  };
  const openCartDialog = async () => {
    setaddtocartloading(true);
    let result = await fetch(
      `${url}/api/v1/get/product/v2/new/${props.book.book_id}/${0}`
    );
    let response = await result.json();
    setOldBookData(response.old_book);
    const AvailableConditionsNewBook = Object.keys(
      response.new_books_details
    )[0];

    setNewBookData(
      AvailableConditionsNewBook
        ? response.new_books_details[AvailableConditionsNewBook]
        : response.new_books_details
    );
    setBookDetail(response.books_details);
    if (Object.keys(response.old_book).length > 0) {
      setBookType("old");
      if (Object.keys(response.old_book).length > 1) {
        setAddedtoCart(true);
        // return;
        let condition = Object.keys(response.old_book)[0];
        console.log(
          response.old_book[condition],
          Object.keys(response.old_book)[0],
          "Object.keys(response.old_book)[0]"
        );
        setSelectedCondition(Object.keys(response.old_book)[0]);
        setConditionData(response.old_book[condition]);
        return;
      }
      setaddtocartloading(true);
      let condition = Object.keys(response.old_book)[0];
      console.log(
        response.old_book[condition],
        Object.keys(response.old_book)[0],
        "Object.keys(response.old_book)[0]"
      );
      setSelectedCondition(Object.keys(response.old_book)[0]);
      setConditionData(response.old_book[condition]);
      AddOldBookToCart(condition, response.old_book[condition]);
    } else if (Object.keys(response.new_books_details).length > 0) {
      setBookType("new");
      setAddedtoCart(true);
    } else if (
      Object.keys(response.old_book).length &&
      Object.keys(response.new_books_details).length
    ) {
      console.log(response, "response");
      console.log(
        Object.keys(response.new_books_details),
        "Object.keys(response.new_books_details)"
      );
      console.log(
        Object.keys(response.old_book),
        "Object.keys(response.old_book)"
      );
      let condition = Object.keys(response.old_book)[0];
      setAddedtoCart(true);
      setConditionData(response.old_book[condition]);
      alert("both book");
      setBookType("both");
    } else {
      console.log(response, "response");
      alert("out of stock");
    }
    console.log(response.new_books_details, response.old_book, "RESPONSE");
  };

  // to redirect to Loginpage if user is not logged in
  const goToCart = () => {
    if (props.userComponentStatus == 2) {
      router.push("/view-cart");
    } else {
      router.push("/account/Loginpage?ret=/view-cart");
    }
  };

  const CashbackPrice = (price) => {
    let cashbackedPrice = price - (price * props.book.cashback_per) / 100;
    // console.log({price},this.state.selectedConditon);

    // this.setState({discountedPrice:discountedPrice})
    return Math.round(cashbackedPrice);
  };

  const onOfferChanged = (e, checkvalue) => {
    // e.preventDefault();
    // alert(checkvalue);
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

    this.props.FromMycart.map((cart) =>
      // alert("runn") Add_cartLoader
      // (`${cart.bookInvId}`===`${BOOK_INV_ID}`)?  msgg="already in cart": null

      `${cart.bookInvId}` === `${selectedConditon.newbook_inv_id}`
        ? ((msgg = "already in cart"), (cart_id = cart.Cart_id))
        : null
    );

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
        // If book is already in cart Update the book offers
        // alert("Already in cartvvv");
        // alert(selectedConditon.price);
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
          `${config.get("apiDomain")}/common/updateCart/${cart_id}/`,
          sendCartSession
        )
          .then((res) => {
            const token = `Token ${localStorage.getItem("user")}`;
            // props.CartSession(token);
            // props.check_book_incart()
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  function validateSpecalCharTitle(inputText) {
    // Define a regular expression pattern to match allowed characters
    const allowedPattern = /[\w\s.,;:!?'"()]/g;

    // Use the replace() method with the allowed pattern to remove disallowed characters
    const validatedText = inputText.replace(allowedPattern, "");

    return validatedText;
  }

  return (
    <div data-pid={props.book.book_id}>
      <div className={`${styleBookCard.mainBookDiv}`}>
        {props.book.is_most_loved ? (
          <div className={styleBookCard.walletOfferDiv}>
            <span className={styleBookCard.Stick2}>Most Loved</span>
          </div>
        ) : null}
        <div
          className={`${styleBookCard.containerDiv}`}
          style={{
            marginTop: "0.7rem",
          }}
        >
          {props.book.book_type ? (
            props.book.book_type != 0 ? (
              <div className={`${styles.bookTypeTag}`}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {props.book.is_out_of_stack == "y" ||
                  props.book.isOutOfStock == "Y" ? (
                    <span
                      style={{
                        position: "absolute",
                        top: 80,
                        zIndex: "100",
                        padding: "0.5rem 0",
                        background: "white",
                        color: "red",
                        width: "10.674rem",
                        textAlign: "center",
                      }}
                    >
                      Out of Stock
                    </span>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className={`${styles.bookTypeTag}`}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {props.book.is_out_of_stack == "y" ||
                  props.book.isOutOfStock == "Y" ? (
                    <span
                      style={{
                        position: "absolute",
                        top: 80,
                        zIndex: "100",
                        padding: "0.5rem 1rem",
                        background: "white",
                        color: "red",
                        width: "10.674rem",
                        textAlign: "center",
                      }}
                    >
                      Out of Stock
                    </span>
                  ) : null}
                </div>
              </div>
            )
          ) : (
            <div className={`${styles.bookTypeTag}`}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {props.book.is_out_of_stack == "y" ||
                props.book.isOutOfStock == "Y" ? (
                  <span
                    style={{
                      position: "absolute",
                      top: 80,
                      zIndex: "100",
                      padding: "0.5rem 1rem",
                      background: "white",
                      color: "red",
                      width: "10.674rem",
                      textAlign: "center",
                    }}
                  >
                    Out of Stock
                  </span>
                ) : null}
              </div>
            </div>
          )}

          <MediaQuery minWidth={577}>
            <div
              style={{
                opacity: props.book.is_out_of_stack == "y" ? 0.5 : null,
                position: "relative",
              }}
              className={`${styleBookCard.bookImage}`}
            >
              <Image
                title={props.book.title}
                priority={true}
                placeholder="blur"
                blurDataURL={src}
                alt={props.book.title}
                onClick={() => {
                  let slug = props.book.title.split(" ").join("-");
                  const url = `${slug}-${props.book.isbn}`;
                  const encodedUrl = encodeURIComponent(url);
                  window.open(`/product/${encodedUrl}?${props.book.book_id}`);
                }}
                onError={() => {
                  setonerror(true);
                }}
                src={
                  onerror
                    ? "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png"
                    : src
                }
                height={"10.27rem"}
                layout={"responsive"}
                width={"8.674rem"}
                className=""
                style={{ boxShadow: "2px 2px 3px #000" }}
              />
              {currentUrlPath == "/" ? null : (
                <div
                  className="round-circle d-flex justify-content-center align-items-center"
                  style={{
                    height: "3.5rem",
                    width: "3.5rem",
                    position: "absolute",
                    top: "-2rem",
                    right: "-1rem",
                    borderRadius: "50%",
                  }}
                >
                  {wishListLoader ? (
                    <CircularProgress size={20} style={{ color: "red" }} />
                  ) : (
                    <div
                      className={`${styles.heartdiv}   ${
                        clicked == "click_wishlist"
                          ? styles.click_wishlist
                          : null
                      }`}
                      onClick={clickWishlist}
                    ></div>
                  )}
                </div>
              )}
            </div>
          </MediaQuery>

          <MediaQuery maxWidth={576}>
            <div>
              <div
                style={{
                  opacity: props.book.is_out_of_stack == "y" ? 0.5 : null,
                  position: "relative",
                }}
                className={`${styleBookCard.bookImage}`}
                onClick={() => {
                  onClick_book();
                  // let slug = props.book.title.split(" ").join("-");
                  // const url = `${slug}-${props.book.isbn}`;
                  // const encodedUrl = encodeURIComponent(url);
                  // window.location.assign(
                  //   `/product/${encodedUrl}?${props.book.book_id}`,
                  //   undefined,
                  //   { shallow: false }
                  // );
                }}
              >
                <Image
                  onClick={() => {
                    onClick_book();
                    // let slug = props.book.title.split(" ").join("-");

                    // const url = `${slug}-${props.book.isbn}`;
                    // const encodedUrl = encodeURIComponent(url);
                    // window.location.assign(
                    //   `/product/${encodedUrl}?${props.book.book_id}`
                    // );
                  }}
                  priority={true}
                  placeholder="blur"
                  blurDataURL={src}
                  alt="book image"
                  onError={() => {
                    setonerror(true);
                  }}
                  src={
                    onerror
                      ? "https://mypustak-6.s3.amazonaws.com/books/dumy+book.png"
                      : src
                  }
                  height={"10.27rem"}
                  layout={"responsive"}
                  width={"8.674rem"}
                  style={{ boxShadow: "2px 2px 3px #000" }}
                />
              </div>
              {currentUrlPath == "/" ? null : (
                <div
                  className="round-circle d-flex justify-content-center align-items-center"
                  style={{
                    height: "3.5rem",
                    width: "3.5rem",
                    position: "absolute",
                    top: "-0.75rem",
                    right: "1.5rem",
                    borderRadius: "50%",
                  }}
                >
                  {wishListLoader ? (
                    <CircularProgress size={20} style={{ color: "red" }} />
                  ) : (
                    <div
                      className={`${styles.heartdiv}   ${
                        clicked == "click_wishlist"
                          ? styles.click_wishlist
                          : null
                      }`}
                      onClick={clickWishlist}
                    ></div>
                  )}
                </div>
              )}
            </div>
          </MediaQuery>
          <div
            style={{ opacity: props.book.is_out_of_stack == "y" ? 0.5 : null }}
            className={`${styleBookCard.textDiv}`}
          >
            <MediaQuery minWidth={577}>
              <span
                onClick={() => {
                  let slug = props.book.title.split(" ").join("-");
                  const url = `${slug}-${props.book.isbn}`;
                  const encodedUrl = encodeURIComponent(url);
                  window.open(`/product/${encodedUrl}?${props.book.book_id}`);
                  // location.reload();
                }}
                title={props.Booktitle}
                className={`${styleBookCard.bookTitle}`}
              >
                {props.Booktitle.length > 30
                  ? props.Booktitle.replace(
                      /(\w)(\w*)/g,
                      (_, firstChar, rest) =>
                        firstChar.toUpperCase() + rest.toLowerCase()
                    )
                      .substring(0, 30)
                      .concat("...")
                  : props.Booktitle.replace(
                      /(\w)(\w*)/g,
                      (_, firstChar, rest) =>
                        firstChar.toUpperCase() + rest.toLowerCase()
                    )}
              </span>
            </MediaQuery>

            <MediaQuery maxWidth={576}>
              <span
                onClick={() => {
                  onClick_book();
                  // let slug = props.book.title.split(" ").join("-");
                  // const url = `${slug}-${props.book.isbn}`;
                  // const encodedUrl = encodeURIComponent(url);
                  // window.location.assign(
                  //   `/product/${encodedUrl}?${props.book.book_id}`,
                  //   undefined,
                  //   { shallow: false }
                  // );
                  // location.reload();
                }}
                title={props.Booktitle}
                className={`${styleBookCard.bookTitle}`}
              >
                {props.Booktitle.length > 30
                  ? props.Booktitle.replace(
                      /(\w)(\w*)/g,
                      (_, firstChar, rest) =>
                        firstChar.toUpperCase() + rest.toLowerCase()
                    )
                      .substring(0, 30)
                      .concat("...")
                  : props.Booktitle.replace(
                      /(\w)(\w*)/g,
                      (_, firstChar, rest) =>
                        firstChar.toUpperCase() + rest.toLowerCase()
                    )}
              </span>
            </MediaQuery>
            {props.book.author == "na" ||
            props.book.author == "NA" ||
            props.book.author == " " ||
            props.book.author == "" ? (
              <span
                title={props.book.publication}
                className={`${styleBookCard.categories}`}
                onClick={() => {
                  window.location.assign(
                    `/publication/books-` +
                      props.book.publication.split(" ").join("-") +
                      "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                  );
                }}
                style={{ textTransform: "capitalize" }}
              >
                By{" "}
                {props.book.publication.length > 15
                  ? props.book.publication.substring(0, 15).concat("...")
                  : props.book.publication}
              </span>
            ) : (
              <span
                title={props.book.author}
                className={`${styleBookCard.categories}`}
                onClick={() => {
                  window.location.assign(
                    `/author/books-` +
                      props.book.author.split(" ").join("-") +
                      "?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                  );
                }}
                style={{ textTransform: "capitalize" }}
              >
                By{" "}
                {props.book?.author?.length > 15
                  ? props.book.author.substring(0, 15).concat("...")
                  : props.book.author}
              </span>
            )}
            {props.book.book_type ? (
              props.book.book_type != 0 ? (
                <span className={`${styleBookCard.prices}`}>
                  <span className={`${styleBookCard.priceSpan}`}>
                    ₹{DicountedPrice(props.price)}
                  </span>{" "}
                  <s className={`${styleBookCard.otherpriceSpan}`}>
                    ₹{props.price}
                  </s>{" "}
                  <span style={{ fontSize: "0.75rem", color: "#098041" }}>
                    ({props.book.discount_per}% Off)
                  </span>
                </span>
              ) : (
                <span className={`${styleBookCard.prices}`}>
                  <s className={`${styleBookCard.otherpriceSpan}`}>
                    ₹{props.price}
                  </s>{" "}
                  <span className={`${styleBookCard.priceSpan}`}>Free*</span>
                </span>
              )
            ) : (
              <span className={`${styleBookCard.prices}`}>
                <s className={`${styleBookCard.otherpriceSpan}`}>
                  ₹{props.price}
                </s>{" "}
                <span className={`${styleBookCard.priceSpan}`}>Free*</span>
              </span>
            )}
          </div>
          <MediaQuery minWidth={577}>
            <div className={`${styleBookCard.buttonDiv}`}>
              {props.book.is_out_of_stack == "n" ||
              props.book.is_out_of_stack == "N" ||
              props.book.isOutOfStock == "N" ? (
                <Button
                  data-pid={props.book.book_id}
                  variant="contained"
                  size="small"
                  style={{
                    width: "7.225rem",
                    height: "1.875rem",
                    position: "absolute",
                    bottom: 15,
                    outline: "none",
                    textTransform: "capitalize",
                    background: incart.includes(props.book.book_id)
                      ? "linear-gradient(90deg, #ff6600 0%, #e05a00 100%)"
                      : "linear-gradient(90deg, #2157ad 0%, #6190da 100%)",
                  }}
                  disabled={
                    addtocartloading || props.book.is_out_of_stack == "y"
                  }
                  className={`button ${
                    incart.includes(parseInt(props.book.book_id))
                      ? "alreadyAddedToCart"
                      : ""
                  }`}
                  onClick={
                    addtocartloading
                      ? null
                      : incart.includes(props.book.book_id)
                      ? () => {
                          goToCart();
                        }
                      : openCartDialog
                  }
                >
                  {addtocartloading ? (
                    <CircularProgress size={16} style={{ color: "#fff" }} />
                  ) : incart.includes(props.book.book_id) ? (
                    <TaskAltIcon fontSize="small" />
                  ) : (
                    <ShoppingCartOutlinedIcon fontSize="small" />
                  )}{" "}
                  {addtocartloading
                    ? null
                    : incart
                    ? incart.includes(props.book.book_id)
                      ? "Go to Cart"
                      : "Add to Cart"
                    : null}{" "}
                </Button>
              ) : (
                <Button
                  // disabled={props.book.is_out_of_stack == "y"}
                  data-pid={props.book.book_id}
                  variant="contained"
                  size="small"
                  style={{
                    width: "7.225rem",
                    height: "1.875rem",
                    position: "absolute",
                    bottom: 15,
                    borderRadius: 0,
                    textTransform: "capitalize",
                    outline: "none",
                    background:
                      "linear-gradient(90deg, #f94449 0%, #ff2c2c 100%)",
                  }}
                  className="button"
                  onClick={Notify}
                >
                  {notifyloading ? (
                    <CircularProgress size={16} style={{ color: "#fff" }} />
                  ) : (
                    <NotificationsActiveIcon fontSize="small" />
                  )}{" "}
                  {addtocartloading ? null : "Notify Me"}{" "}
                </Button>
              )}
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={576}>
            <div className={`${styleBookCard.buttonDiv}`}>
              {props.book.is_out_of_stack == "n" ||
              props.book.is_out_of_stack == "N" ||
              props.book.isOutOfStock == "N" ? (
                <Button
                  data-pid={props.book.book_id}
                  variant="contained"
                  size="small"
                  style={{
                    width: "9.325rem",
                    height: "1.875rem",
                    position: "absolute",
                    bottom: 15,
                    borderRadius: 0,
                    // marginBottom:10,
                    textTransform: "capitalize",
                    outline: "none",
                    background: incart.includes(props.book.book_id)
                      ? "linear-gradient(90deg, #ff6600 0%, #e05a00 100%)"
                      : "linear-gradient(90deg, #2157ad 0%, #6190da 100%)",
                  }}
                  disabled={props.book.is_out_of_stack == "y"}
                  className={`button ${
                    incart.includes(parseInt(props.book.book_id))
                      ? "alreadyAddedToCart"
                      : ""
                  }`}
                  onClick={
                    addtocartloading
                      ? null
                      : incart.includes(props.book.book_id)
                      ? () => {
                          goToCart();
                        }
                      : openCartDialog
                  }
                >
                  {addtocartloading ? (
                    <CircularProgress size={16} style={{ color: "#fff" }} />
                  ) : incart.includes(props.book.book_id) ? (
                    <TaskAltIcon fontSize="small" />
                  ) : (
                    <ShoppingCartOutlinedIcon fontSize="small" />
                  )}{" "}
                  {addtocartloading
                    ? null
                    : incart
                    ? incart.includes(props.book.book_id)
                      ? "Go to Cart"
                      : "Add to Cart"
                    : null}{" "}
                </Button>
              ) : (
                <Button
                  data-pid={props.book.book_id}
                  variant="contained"
                  size="small"
                  style={{
                    outline: "none",
                    width: "9.225rem",
                    height: "1.875rem",
                    position: "absolute",
                    bottom: 15,
                    textTransform: "capitalize",
                    background:
                      "linear-gradient(90deg, #f94449 0%, #ff2c2c 100%)",
                  }}
                  className="button"
                  onClick={Notify}
                >
                  {notifyloading ? (
                    <CircularProgress size={16} style={{ color: "#fff" }} />
                  ) : (
                    <NotificationsActiveIcon fontSize="small" />
                  )}{" "}
                  {addtocartloading ? null : "Notify Me"}{" "}
                </Button>
              )}
            </div>
          </MediaQuery>
        </div>
      </div>
      <MediaQuery minWidth={577}>
        <Dialog
          open={AddedtoCart}
          keepMounted
          // onClose={handleClose}
          maxWidth="md"
          fullWidth
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              maxWidth: "100%",
              overflowX: "hidden",
            }}
          >
            <div className="row g-0" style={{}}>
              <div className="col-4" style={{}}>
                <MediaQuery minWidth={758}>
                  <div
                    style={{
                      height: "21rem",
                      width: "18rem",
                      padding: "2rem 2rem 2rem 2rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                        // "https://mypustak-6.s3.amazonaws.com/books/medium/book_default.jpeg"
                      }}
                      alt="book image"
                      src={src}
                      style={{
                        height: "100%",
                        width: "100%",
                        boxShadow: "2px 2px 3px #000",
                      }}
                    />
                  </div>
                </MediaQuery>
                <MediaQuery maxWidth={757} minWidth={660}>
                  <div
                    style={{
                      height: "20rem",
                      width: "18rem",
                      padding: "2rem 6.5rem 2rem 0rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                        // "https://mypustak-6.s3.amazonaws.com/books/medium/book_default.jpeg"
                      }}
                      alt="book image"
                      src={src}
                      style={{
                        height: "100%",
                        width: "100%",
                        boxShadow: "2px 2px 3px #000",
                      }}
                    />
                  </div>
                </MediaQuery>
                <MediaQuery maxWidth={659}>
                  <div
                    style={{
                      height: "18rem",
                      width: "16rem",
                      padding: "2rem 6.2rem 2rem 0rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                        // "https://mypustak-6.s3.amazonaws.com/books/medium/book_default.jpeg"
                      }}
                      alt="book image"
                      src={src}
                      style={{
                        height: "100%",
                        width: "100%",
                        boxShadow: "2px 2px 3px #000",
                      }}
                    />
                  </div>
                </MediaQuery>
              </div>
              {Object.keys(NewBookData).length > 0 ? (
                <div
                  className="col-8"
                  style={{ paddingTop: "1.5rem", paddingLeft: "3.5rem" }}
                >
                  <IconButton
                    onClick={() => {
                      setaddtocartloading(false);
                      setAddedtoCart(false);
                    }}
                    style={{
                      position: "absolute",
                      right: "0rem",
                      top: 0,
                      margin: 0,
                    }}
                  >
                    <CloseOutlined
                      style={{ margin: 0, padding: 0 }}
                      fontSize="small"
                    />
                  </IconButton>
                  <span style={{ fontSize: "1.22rem" }}>
                    {NewBookData.title.length > 65
                      ? NewBookData.title
                          .substring(0, 65)
                          .concat("...")
                          .replace(
                            /(\w)(\w*)/g,
                            (_, firstChar, rest) =>
                              firstChar.toUpperCase() + rest.toLowerCase()
                          )
                      : NewBookData.title.replace(
                          /(\w)(\w*)/g,
                          (_, firstChar, rest) =>
                            firstChar.toUpperCase() + rest.toLowerCase()
                        )}{" "}
                    <span
                      style={{ textTransform: "capitalize", fontSize: "1rem" }}
                    >
                      ({props.book.language}
                    </span>
                    ,
                    <span
                      style={{ textTransform: "capitalize", fontSize: "1rem" }}
                    >
                      {props.book.binding})
                    </span>
                  </span>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="mb-1"
                  >
                    <span>
                      {NewBookData.author == "NA" ||
                      NewBookData.author == "na" ||
                      NewBookData.author == " " ||
                      NewBookData.author == "" ? null : (
                        <span>
                          By{" "}
                          <Link
                            href="/author/[author_name]"
                            as={
                              `/author/books-` +
                              NewBookData.author.split(" ").join("-")
                            }
                            className="text-primary"
                            legacyBehavior
                          >
                            {NewBookData.author.replace(
                              /(\w)(\w*)/g,
                              (_, firstChar, rest) =>
                                firstChar.toUpperCase() + rest.toLowerCase()
                            )}
                          </Link>{" "}
                          (Author) &nbsp;{" "}
                        </span>
                      )}
                      {NewBookData.publication == "NA" ||
                      NewBookData.publication == "na" ||
                      NewBookData.publication == " " ||
                      NewBookData.publication == "" ? null : (
                        <span>
                          By &nbsp;
                          <Link
                            href="/publication/[publication_name]"
                            as={`/publication/books-${NewBookData.publication
                              .split(" ")
                              .join("-")}`}
                            className="text-primary"
                            legacyBehavior
                          >
                            {NewBookData.publication.replace(
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
                        alt="assured"
                        className={``}
                        layout="responsive"
                        src={assured}
                      />
                    </div>
                  </div>
                  <div
                    style={{ marginBottom: "5px" }}
                    className={`${styles.product_title_price} d-flex justify-content-start  align-items-center`}
                  >
                    {BookType == "new" ? (
                      offertype == "discount" ? (
                        <span style={{ width: "12rem" }}>
                          <span style={{ fontSize: "1.2rem" }}>
                            ₹{DicountedPrice(props.book.price)}
                          </span>{" "}
                          <s className={`${styles.decoration_overline}`}>
                            ₹{props.book.price}
                          </s>{" "}
                          &nbsp;
                          <span className="savedPercent">
                            ₹
                            {Math.ceil(
                              props.book.price -
                                DicountedPrice(props.book.price)
                            )}{" "}
                            saved!
                          </span>
                        </span>
                      ) : (
                        <span style={{ width: "12rem" }}>
                          <span style={{ fontSize: "1.2rem" }}>
                            ₹{props.book.price}
                          </span>{" "}
                          &nbsp;
                          <span
                            className="savedPercent"
                            style={{ fontSize: "0.9rem" }}
                          >
                            Effective price ₹
                            {CashbackPrice(parseInt(props.book.price))}!
                          </span>
                        </span>
                      )
                    ) : null}

                    {BookType == "new" ? (
                      <div className={`${styles.product_assured} `}>
                        <Image
                          alt="new book"
                          className={``}
                          layout="responsive"
                          src={newbook_img}
                        />
                      </div>
                    ) : (
                      <div className={`${styles.product_assured} `}>
                        <Image
                          alt="use boo"
                          className={``}
                          layout="responsive"
                          src={usedbook_img}
                        />
                      </div>
                    )}
                  </div>
                  {BookType == "new" ? (
                    <div
                      className="product_right_condition "
                      style={{
                        marginBottom: "5px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "1px solid #ddd",
                      }}
                    >
                      <div className={` ${styles.product_book_condition}`}>
                        <span>Offers</span>
                      </div>
                      <div
                        className={`${styles.product_right_condition_inner} px-2`}
                      >
                        <div style={{ marginLeft: "0.2rem" }}>
                          <div className={`${styles.Selection_book_cond}`}>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                              className={`${styles.book_condition_button}`}
                            >
                              {props.book.discount_per ? (
                                <button
                                  style={{
                                    margin: "0rem 0.2rem",
                                    outline: "none",
                                  }}
                                  className={
                                    offertype === "discount"
                                      ? `${styles.contained_btn}`
                                      : `${styles.outlined_btn} `
                                  }
                                  onClick={(e) => setoffertype("discount")}
                                >
                                  <div>
                                    <div>
                                      <span>
                                        Flat {props.book.discount_per}% off !{" "}
                                      </span>
                                    </div>
                                    <div className="subtext_cond">
                                      {/* InStock */}
                                    </div>
                                  </div>
                                </button>
                              ) : null}

                              {props.book.cashback_per ? (
                                <button
                                  style={{
                                    margin: "0rem 0.2rem",
                                    outline: "none",
                                  }}
                                  className={
                                    offertype === "cashback"
                                      ? `${styles.contained_btn}`
                                      : `${styles.outlined_btn} `
                                  }
                                  onClick={(e) => setoffertype("cashback")}
                                >
                                  <div>
                                    <div>
                                      <span>
                                        Earn BookCoins of worth ₹
                                        {Math.round(
                                          props.book.price -
                                            CashbackPrice(props.book.price)
                                        )}
                                        !{" "}
                                      </span>
                                    </div>
                                    <div className="subtext_cond">
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
                  <div>
                    <Button
                      data-pid={props.book.book_id}
                      style={{
                        marginTop: "1rem",
                        marginBottom: "1rem",
                        outline: "none",
                        color: DialogAddtoCart ? "#2248ae" : "#fff",
                      }}
                      className={styles.productAddtoCarddiv}
                      onMouseEnter={() => {
                        setDialogAddtoCart(true);
                      }}
                      onMouseLeave={() => {
                        setDialogAddtoCart(false);
                      }}
                      variant="outlined"
                      fullWidth
                      disabled={
                        Add_cartLoader || props.book.is_out_of_stack == "y"
                      }
                      value={Add_cartLoader ? `Adding` : `Add to Cart`}
                      onClick={(e) => {
                        AddNewBookToCart(e);
                      }}
                    >
                      <div className={`${styles.addtoCartText}`}>
                        {Add_cartLoader ? (
                          <CircularProgress
                            size={30}
                            style={{ color: "#fff" }}
                          />
                        ) : (
                          <div style={{}}>
                            <span>
                              {" "}
                              <ShoppingCartIcon style={{ height: "2rem" }} />
                            </span>
                            Add to Cart
                          </div>
                        )}
                      </div>
                      {/* Add To Cart */}
                    </Button>
                  </div>
                </div>
              ) : Object.keys(ConditionData).length > 0 ? (
                <div className="col-7" style={{ paddingTop: "1.5rem" }}>
                  <IconButton
                    onClick={() => {
                      setaddtocartloading(false);
                      setAddedtoCart(false);
                    }}
                    style={{
                      position: "absolute",
                      right: "0rem",
                      top: 0,
                      margin: 0,
                    }}
                  >
                    <CloseOutlined
                      style={{ margin: 0, padding: 0 }}
                      fontSize="small"
                    />
                  </IconButton>
                  <span style={{ fontSize: "1.22rem" }}>
                    {ConditionData.title
                      ? ConditionData.title.replace(
                          /(\w)(\w*)/g,
                          (_, firstChar, rest) =>
                            firstChar.toUpperCase() + rest.toLowerCase()
                        )
                      : null}{" "}
                    <span
                      style={{ textTransform: "capitalize", fontSize: "1rem" }}
                    >
                      ({props.book.language}
                    </span>
                    ,
                    <span
                      style={{ textTransform: "capitalize", fontSize: "1rem" }}
                    >
                      {props.book.binding})
                    </span>
                  </span>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                    className="mb-1"
                  >
                    <span>
                      {ConditionData.author == "NA" ||
                      ConditionData.author == "na" ||
                      ConditionData.author == " " ||
                      ConditionData.author == "" ? null : (
                        <span>
                          By{" "}
                          <Link
                            href="/author/[author_name]"
                            as={
                              `/author/books-` +
                              ConditionData.author.split(" ").join("-")
                            }
                            className="text-primary"
                            legacyBehavior
                          >
                            {ConditionData.author.replace(
                              /(\w)(\w*)/g,
                              (_, firstChar, rest) =>
                                firstChar.toUpperCase() + rest.toLowerCase()
                            )}
                          </Link>{" "}
                          (Author) &nbsp;{" "}
                        </span>
                      )}
                      {ConditionData.publication == "NA" ||
                      ConditionData.publication == null ||
                      ConditionData.publication == "na" ||
                      ConditionData.publication == " " ||
                      ConditionData.publication == "" ? null : (
                        <span>
                          By &nbsp;
                          <Link
                            href={
                              ConditionData.publication
                                ? "/publication/[publication_name]"
                                : ""
                            }
                            as={`/publication/books-${
                              ConditionData.publication
                                ? ConditionData.publication.split(" ").join("-")
                                : null
                            }`}
                            className="text-primary"
                            legacyBehavior
                          >
                            {ConditionData.publication
                              ? ConditionData.publication.replace(
                                  /(\w)(\w*)/g,
                                  (_, firstChar, rest) =>
                                    firstChar.toUpperCase() + rest.toLowerCase()
                                )
                              : null}
                          </Link>
                          &nbsp; (Publication)
                        </span>
                      )}
                    </span>
                    <div className={`${styles.product_assured} `}>
                      <Image
                        alt="assured"
                        className={``}
                        layout="responsive"
                        src={assured}
                      />
                    </div>
                  </div>
                  <div
                    style={{ marginBottom: "5px" }}
                    className={`${styles.product_title_price} d-flex justify-content-start  align-items-center`}
                  >
                    <span>
                      <span style={{ fontSize: "1.22rem" }}>
                        ₹{calculateBookDetails().price}
                      </span>{" "}
                      <s className={`${styles.decoration_overline}`}>
                        ₹{ConditionData.MRP}
                      </s>{" "}
                      &nbsp;
                      <span className="savedPercent">
                        ₹
                        {Math.ceil(
                          ConditionData.MRP - calculateBookDetails().price
                        )}{" "}
                        saved!
                      </span>
                    </span>

                    {BookType == "new" ? (
                      <div className={`${styles.product_assured} `}>
                        <Image
                          alt="new book"
                          className={``}
                          layout="responsive"
                          src={newbook_img}
                        />
                      </div>
                    ) : (
                      <div className={`${styles.product_assured} `}>
                        <Image
                          alt="use book"
                          className={``}
                          layout="responsive"
                          src={usedbook_img}
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className="product_right_condition "
                    style={{ marginBottom: "5px" }}
                  >
                    <div
                      style={{
                        border: "1px solid #ddd",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "110%",
                      }}
                    >
                      <div className={` ${styles.product_book_condition}`}>
                        <span>Book Condition</span>
                      </div>
                      <div
                        className={`${styles.product_right_condition_inner} px-2`}
                      >
                        <div style={{ marginLeft: "0.2rem" }}>
                          <div className={`${styles.Selection_book_cond}`}>
                            <div className={`${styles.book_condition_button}`}>
                              {/* {true ? ( */}
                              {OldBookData.BrandNew ? (
                                <button
                                  style={{
                                    margin: "0rem 0.2rem",
                                    outline: "none",
                                  }}
                                  className={
                                    SelectedCondition === "BrandNew"
                                      ? `${styles.contained_btn}`
                                      : `${styles.outlined_btn} `
                                  }
                                  onClick={(e) =>
                                    onChangedCondition(e, "BrandNew")
                                  }
                                >
                                  <div>
                                    <div>
                                      <span>BrandNew </span>
                                    </div>
                                    <div className="subtext_cond">
                                      {/* InStock */}
                                      &nbsp;
                                      <span> ₹&nbsp;</span>
                                    </div>
                                  </div>
                                </button>
                              ) : null}

                              {/* {true ? ( */}
                              {OldBookData.AlmostNew ? (
                                <button
                                  // color="primary"
                                  // className="Type_button"
                                  style={{ margin: "0rem 0.2rem" }}
                                  onClick={(e) =>
                                    onChangedCondition(e, "AlmostNew")
                                  }
                                  className={
                                    SelectedCondition === "AlmostNew"
                                      ? `${styles.contained_btn}`
                                      : `${styles.outlined_btn}`
                                  }
                                  size="small"
                                >
                                  <div>
                                    <div>
                                      <span>As Good As New</span>
                                    </div>
                                    <div className="subtext_cond">
                                      {/* InStock */}
                                      &nbsp;
                                      <span>₹&nbsp;</span>
                                    </div>
                                  </div>
                                </button>
                              ) : null}

                              {OldBookData.VeryGood ? (
                                <button
                                  style={{ margin: "0rem 0.2rem" }}
                                  className={
                                    SelectedCondition === "VeryGood"
                                      ? `${styles.contained_btn}`
                                      : `${styles.outlined_btn}`
                                  }
                                  size="small"
                                  onClick={(e) =>
                                    onChangedCondition(e, "VeryGood")
                                  }
                                >
                                  <div>
                                    <div>
                                      {" "}
                                      <span>Very Good</span>
                                    </div>
                                    <div className="subtext_cond">
                                      {/* InStock */}
                                      &nbsp;
                                      <span>
                                        ₹&nbsp;
                                        {Math.ceil(
                                          OldBookData.VeryGood.shipping
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </button>
                              ) : null}
                              {OldBookData.AverageButInReadableCondition ? (
                                <button
                                  style={{
                                    margin: "0rem 0.2rem",
                                    width: "max-content",
                                    marginTop: "0.5rem",
                                  }}
                                  className={
                                    SelectedCondition ===
                                    "AverageButInReadableCondition"
                                      ? `${styles.contained_btn}`
                                      : `${styles.outlined_btn}`
                                  }
                                  size="small"
                                  onClick={(e) =>
                                    onChangedCondition(
                                      e,
                                      "AverageButInReadableCondition"
                                    )
                                  }
                                >
                                  <div>
                                    <div style={{ width: "max-content" }}>
                                      {/* {" "} */}
                                      <span>Good And Readable</span>
                                    </div>
                                    <div className="subtext_cond">
                                      {/* InStock */}
                                      &nbsp;
                                      <span>
                                        ₹&nbsp;
                                        {Math.ceil(
                                          OldBookData
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
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      data-pid={props.book.book_id}
                      style={{ margin: "1rem 0" }}
                      className={styles.productAddtoCarddiv}
                      variant="outlined"
                      color="primary"
                      fullWidth
                      disabled={
                        Add_cartLoader || props.book.is_out_of_stack == "y"
                          ? true
                          : false
                      }
                      value={Add_cartLoader ? `Adding` : `Add to Cart`}
                      onClick={(e) => {
                        AddOldBookToCart(SelectedCondition, ConditionData);
                      }}
                    >
                      <div className={`${styles.addtoCartText}`}>
                        {Add_cartLoader ? (
                          <CircularProgress
                            size={30}
                            style={{ color: "#fff" }}
                          />
                        ) : (
                          <div style={{}}>
                            <span>
                              {" "}
                              <ShoppingCartIcon style={{ height: "2rem" }} />
                            </span>
                            Add to Cart
                          </div>
                        )}
                      </div>
                      {/* Add To Cart */}
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </DialogContent>
        </Dialog>
      </MediaQuery>

      <MediaQuery maxWidth={576}>
        <SwipeableDrawer
          anchor="bottom"
          open={AddedtoCart}
          onOpen={() => {}}
          onClose={() => {
            setaddtocartloading(false);
            setAddedtoCart(false);
          }}
          // onOpen={() => {
          //   setaddtocartloading(false);
          //   setAddedtoCart(false);
          // }}
          keepMounted
          // onClose={handleClose}
          // maxWidth='lg'
          // fullWidth
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              overflowX: "hidden",
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              className="g-0"
            >
              <div className="">
                <div
                  style={{
                    height: "20rem",
                    width: "16rem",
                    padding: "2rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                      // "https://mypustak-6.s3.amazonaws.com/books/medium/book_default.jpeg"
                    }}
                    alt="book image"
                    src={src}
                    style={{
                      height: "100%",
                      width: "100%",
                      boxShadow: "2px 2px 3px #000",
                    }}
                  />
                </div>
              </div>
              {Object.keys(NewBookData).length > 0 ? (
                <div
                  className=""
                  style={{ paddingTop: "0rem", maxWidth: "98%" }}
                >
                  <IconButton
                    onClick={() => {
                      setaddtocartloading(false);
                      setAddedtoCart(false);
                    }}
                    style={{
                      position: "absolute",
                      right: "-0",
                      top: 0,
                      margin: 0,
                      backgroundColor: "#000",
                      opacity: 0.8,
                    }}
                  >
                    <CloseOutlined
                      style={{ margin: 0, padding: 0, color: "#fff" }}
                      fontSize="small"
                    />
                  </IconButton>
                  <span style={{ fontSize: "1.25rem" }}>
                    {NewBookData.title
                      ? NewBookData.title.replace(
                          /(\w)(\w*)/g,
                          (_, firstChar, rest) =>
                            firstChar.toUpperCase() + rest.toLowerCase()
                        )
                      : null}{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      ({props.book.language}
                    </span>
                    ,
                    <span style={{ textTransform: "capitalize" }}>
                      {props.book.binding})
                    </span>
                  </span>
                  <div style={{ fontSize: "0.8rem" }} className="mb-1">
                    <span>
                      {NewBookData.author == "NA" ||
                      NewBookData.author == "na" ||
                      NewBookData.author == " " ||
                      NewBookData.author == "" ? null : (
                        <span>
                          By{" "}
                          <Link
                            href="/author/[author_name]"
                            as={
                              `/author/books-` +
                              NewBookData.author.split(" ").join("-")
                            }
                            className="text-primary"
                            legacyBehavior
                          >
                            {NewBookData.author.replace(
                              /(\w)(\w*)/g,
                              (_, firstChar, rest) =>
                                firstChar.toUpperCase() + rest.toLowerCase()
                            )}
                          </Link>{" "}
                          (Author) &nbsp;{" "}
                        </span>
                      )}
                      {NewBookData.publication == "NA" ||
                      NewBookData.publication == "na" ||
                      NewBookData.publication == " " ||
                      NewBookData.publication == "" ? null : (
                        <span>
                          By &nbsp;
                          <Link
                            href="/publication/[publication_name]"
                            as={`/publication/books-${NewBookData.publication
                              .split(" ")
                              .join("-")}`}
                            className="text-primary"
                            legacyBehavior
                          >
                            {NewBookData.publication.replace(
                              /(\w)(\w*)/g,
                              (_, firstChar, rest) =>
                                firstChar.toUpperCase() + rest.toLowerCase()
                            )}
                          </Link>
                          &nbsp; (Publication)
                        </span>
                      )}
                    </span>
                  </div>
                  <div
                    style={{ marginBottom: "5px", flexDirection: "column" }}
                    className={`${styles.product_title_price} d-flex justify-content-start`}
                  >
                    {BookType == "new" ? (
                      offertype == "discount" ? (
                        <span style={{ width: "12rem" }}>
                          <span style={{ fontSize: "1.2rem" }}>
                            ₹{DicountedPrice(props.book.price)}
                          </span>{" "}
                          <s className={`${styles.decoration_overline}`}>
                            ₹{props.book.price}
                          </s>{" "}
                          &nbsp;
                          <span className="savedPercent">
                            ₹
                            {Math.ceil(
                              props.book.price -
                                DicountedPrice(props.book.price)
                            )}{" "}
                            saved!
                          </span>
                        </span>
                      ) : (
                        <span style={{ width: "12rem" }}>
                          <span style={{ fontSize: "1.2rem" }}>
                            ₹{props.book.price}
                          </span>{" "}
                          &nbsp;
                          <span
                            className="savedPercent"
                            style={{ fontSize: "0.9rem" }}
                          >
                            Effective price ₹
                            {CashbackPrice(parseInt(props.book.price))}!
                          </span>
                        </span>
                      )
                    ) : null}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {BookType == "new" ? (
                        <div className={`${styles.product_assured_mob} `}>
                          <Image
                            alt="new book"
                            className={``}
                            layout="responsive"
                            src={newbook_img}
                          />
                        </div>
                      ) : (
                        <div className={`${styles.product_assured_mob} `}>
                          <Image
                            alt="use boo"
                            className={``}
                            layout="responsive"
                            src={usedbook_img}
                          />
                        </div>
                      )}
                      <div className={`${styles.product_assured_mob} `}>
                        <Image
                          alt="assured"
                          className={``}
                          layout="responsive"
                          src={assured}
                        />
                      </div>
                    </div>
                    {BookType == "new" ? (
                      <div
                        className="product_right_condition "
                        style={{ marginBottom: "5px" }}
                      >
                        <div
                          className={`${styles.product_right_condition_inner} px-2`}
                        >
                          <div className={` ${styles.product_book_condition}`}>
                            <span>Offers</span>
                          </div>

                          <div style={{ marginLeft: "0.2rem" }}>
                            <div className={`${styles.Selection_book_cond}`}>
                              <div
                                className={`${styles.book_condition_button}`}
                              >
                                {props.book.discount_per ? (
                                  <button
                                    style={{ margin: "0rem 0.2rem" }}
                                    className={
                                      offertype === "discount"
                                        ? `${styles.contained_btn}`
                                        : `${styles.outlined_btn} `
                                    }
                                    onClick={(e) => setoffertype("discount")}
                                  >
                                    <div>
                                      <div>
                                        <span>
                                          Flat {props.book.discount_per}% off !{" "}
                                        </span>
                                      </div>
                                      <div className="subtext_cond">
                                        {/* InStock */}
                                      </div>
                                    </div>
                                  </button>
                                ) : null}

                                {props.book.cashback_per ? (
                                  <button
                                    style={{ margin: "0rem 0.2rem" }}
                                    className={
                                      offertype === "cashback"
                                        ? `${styles.contained_btn}`
                                        : `${styles.outlined_btn} `
                                    }
                                    onClick={(e) => setoffertype("cashback")}
                                  >
                                    <div>
                                      <div>
                                        <span>
                                          Earn BookCoins of worth ₹
                                          {Math.round(
                                            props.book.price -
                                              CashbackPrice(props.book.price)
                                          )}
                                          !{" "}
                                        </span>
                                      </div>
                                      <div className="subtext_cond">
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
                  </div>
                  <div>
                    <Button
                      data-pid={props.book.book_id}
                      style={{ marginTop: "1rem", marginBottom: "1rem" }}
                      className={styles.productAddtoCarddivmob}
                      variant="outlined"
                      color="primary"
                      fullWidth
                      disabled={
                        Add_cartLoader || props.book.is_out_of_stack == "y"
                      }
                      value={Add_cartLoader ? `Adding` : `Add to Cart`}
                      onClick={(e) => {
                        AddNewBookToCart(e);
                      }}
                    >
                      <div className={`${styles.addtoCartText}`}>
                        {Add_cartLoader ? (
                          `Adding`
                        ) : (
                          <div style={{}}>
                            <span>
                              {" "}
                              <ShoppingCartIcon style={{ height: "2rem" }} />
                            </span>
                            Add to Cart
                          </div>
                        )}
                      </div>
                      {/* Add To Cart */}
                    </Button>
                  </div>
                </div>
              ) : Object.keys(ConditionData).length > 0 ? (
                <div className="" style={{}}>
                  <IconButton
                    onClick={() => {
                      setaddtocartloading(false);
                      setAddedtoCart(false);
                    }}
                    style={{
                      position: "absolute",
                      right: "0",
                      top: 0,
                      margin: 0,
                      backgroundColor: "#000",
                      opacity: "0.8",
                    }}
                  >
                    <CloseOutlined
                      style={{ margin: 0, padding: 0, color: "#fff" }}
                      fontSize="small"
                    />
                  </IconButton>
                  <span style={{ fontSize: "1.25rem" }}>
                    {ConditionData.title
                      ? ConditionData.title.replace(
                          /(\w)(\w*)/g,
                          (_, firstChar, rest) =>
                            firstChar.toUpperCase() + rest.toLowerCase()
                        )
                      : null}{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      ({props.book.language}
                    </span>
                    ,
                    <span style={{ textTransform: "capitalize" }}>
                      {props.book.binding})
                    </span>
                  </span>
                  <div style={{ fontSize: "0.8rem" }} className="mb-1">
                    <span>
                      {ConditionData.author == "NA" ||
                      ConditionData.author == "na" ||
                      ConditionData.author == " " ||
                      ConditionData.author == "" ? null : (
                        <span>
                          By{" "}
                          <Link
                            href="/author/[author_name]"
                            as={
                              `/author/books-` +
                              ConditionData.author.split(" ").join("-")
                            }
                            className="text-primary"
                            legacyBehavior
                          >
                            {ConditionData.author.replace(
                              /(\w)(\w*)/g,
                              (_, firstChar, rest) =>
                                firstChar.toUpperCase() + rest.toLowerCase()
                            )}
                          </Link>{" "}
                          (Author) &nbsp;{" "}
                        </span>
                      )}
                      {ConditionData.publication == "NA" ||
                      ConditionData.publication == null ||
                      ConditionData.publication == "na" ||
                      ConditionData.publication == " " ||
                      ConditionData.publication == "" ? null : (
                        <span>
                          By &nbsp;
                          <Link
                            href={
                              ConditionData.publication
                                ? "/publication/[publication_name]"
                                : ""
                            }
                            as={`/publication/books-${
                              ConditionData.publication
                                ? ConditionData.publication.split(" ").join("-")
                                : null
                            }`}
                            className="text-primary"
                            legacyBehavior
                          >
                            {ConditionData.publication
                              ? ConditionData.publication.replace(
                                  /(\w)(\w*)/g,
                                  (_, firstChar, rest) =>
                                    firstChar.toUpperCase() + rest.toLowerCase()
                                )
                              : null}
                          </Link>
                          &nbsp; (Publication)
                        </span>
                      )}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "5px",
                    }}
                    className={`${styles.product_title_price} justify-content-start `}
                  >
                    <span>
                      <span style={{ fontSize: "1.5rem" }}>
                        ₹{calculateBookDetails().price}
                      </span>{" "}
                      <s className={`${styles.decoration_overline}`}>
                        ₹{ConditionData.MRP}
                      </s>{" "}
                      &nbsp;
                      <span className="savedPercent">
                        ₹
                        {Math.ceil(
                          ConditionData.MRP - calculateBookDetails().price
                        )}{" "}
                        saved!
                      </span>
                    </span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {BookType == "new" ? (
                        <div className={`${styles.product_assured_mob} `}>
                          <Image
                            alt="new book"
                            className={``}
                            layout="responsive"
                            src={newbook_img}
                          />
                        </div>
                      ) : (
                        <div className={`${styles.product_assured_mob} `}>
                          <Image
                            alt="use book"
                            className={``}
                            layout="responsive"
                            src={usedbook_img}
                          />
                        </div>
                      )}
                      <div className={`${styles.product_assured_mob} `}>
                        <Image
                          alt="assured"
                          className={``}
                          layout="responsive"
                          src={assured}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="product_right_condition "
                    style={{ marginBottom: "5px" }}
                  >
                    <div
                      className={`${styles.product_right_condition_inner} px-2`}
                    >
                      <div className={` ${styles.product_book_condition}`}>
                        <span>Book Condition</span>
                      </div>

                      <div style={{ marginLeft: "0.2rem", width: "100%" }}>
                        <div className={`${styles.Selection_book_cond}`}>
                          <div className={`${styles.book_condition_button}`}>
                            {OldBookData.BrandNew ? (
                              <button
                                style={{ margin: "0rem 0.2rem", width: "50%" }}
                                className={
                                  SelectedCondition === "BrandNew"
                                    ? `${styles.contained_btn}`
                                    : `${styles.outlined_btn} `
                                }
                                onClick={(e) =>
                                  onChangedCondition(e, "BrandNew")
                                }
                              >
                                <div>
                                  <div>
                                    <span>BrandNew </span>
                                  </div>
                                  <div className="subtext_cond">
                                    {/* InStock */}
                                    &nbsp;
                                    <span>
                                      {" "}
                                      ₹&nbsp;
                                      {Math.ceil(OldBookData.BrandNew.shipping)}
                                    </span>
                                  </div>
                                </div>
                              </button>
                            ) : null}

                            {OldBookData.AlmostNew ? (
                              <button
                                style={{ margin: "0rem 0.2rem", width: "50%" }}
                                onClick={(e) =>
                                  onChangedCondition(e, "AlmostNew")
                                }
                                className={
                                  SelectedCondition === "AlmostNew"
                                    ? `${styles.contained_btn}`
                                    : `${styles.outlined_btn}`
                                }
                                size="small"
                              >
                                <div>
                                  <div>
                                    <span>As Good As New</span>
                                  </div>
                                  <div className="subtext_cond">
                                    {/* InStock */}
                                    &nbsp;
                                    <span>
                                      ₹&nbsp;
                                      {Math.ceil(
                                        OldBookData.AlmostNew.shipping
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </button>
                            ) : null}

                            {OldBookData.VeryGood ? (
                              <button
                                style={{ margin: "0rem 0.2rem", width: "50%" }}
                                className={
                                  SelectedCondition === "VeryGood"
                                    ? `${styles.contained_btn}`
                                    : `${styles.outlined_btn}`
                                }
                                size="small"
                                onClick={(e) =>
                                  onChangedCondition(e, "VeryGood")
                                }
                              >
                                <div>
                                  <div>
                                    {" "}
                                    <span>Very Good</span>
                                  </div>
                                  <div className="subtext_cond">
                                    {/* InStock */}
                                    &nbsp;
                                    <span>
                                      ₹&nbsp;
                                      {Math.ceil(OldBookData.VeryGood.shipping)}
                                    </span>
                                  </div>
                                </div>
                              </button>
                            ) : null}
                            {OldBookData.AverageButInReadableCondition ? (
                              <button
                                style={{ margin: "0rem 0.2rem", width: "50%" }}
                                className={
                                  SelectedCondition ===
                                  "AverageButInReadableCondition"
                                    ? `${styles.contained_btn}`
                                    : `${styles.outlined_btn}`
                                }
                                size="small"
                                onClick={(e) =>
                                  onChangedCondition(
                                    e,
                                    "AverageButInReadableCondition"
                                  )
                                }
                              >
                                <div>
                                  <div>
                                    {" "}
                                    <span>Good And Readable</span>
                                  </div>
                                  <div className="subtext_cond">
                                    {/* InStock */}
                                    &nbsp;
                                    <span>
                                      ₹&nbsp;
                                      {Math.ceil(
                                        OldBookData
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
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      data-pid={props.book.book_id}
                      style={{ margin: "0.5rem 0" }}
                      className={styles.productAddtoCarddivmob}
                      variant="outlined"
                      // startIcon={<ShoppingCartIcon style={{ fontSize: '2rem' }} />}
                      color="primary"
                      fullWidth
                      disabled={
                        Add_cartLoader || props.book.is_out_of_stack == "y"
                      }
                      value={Add_cartLoader ? `Adding` : `Add to Cart`}
                      onClick={(e) => {
                        AddOldBookToCart(SelectedCondition, ConditionData);
                      }}
                    >
                      <div className={`${styles.addtoCartText}`}>
                        {Add_cartLoader ? (
                          `Adding`
                        ) : (
                          <div style={{}}>
                            <span>
                              {" "}
                              <ShoppingCartIcon style={{ height: "2rem" }} />
                            </span>
                            Add to Cart
                          </div>
                        )}
                      </div>
                      {/* Add To Cart */}
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </DialogContent>
        </SwipeableDrawer>
      </MediaQuery>

      <MediaQuery minWidth={577}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={3000}
          TransitionComponent={SlideTransition}
          onClose={handleClose}
          sx={{ marginTop: "2.2rem" }}
        >
          <SnackbarContent
            style={{
              backgroundColor: "#fff",
              color: "#000",
              alignItems: "center",
            }}
          >
            <Card elevation={2}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span
                  // className='text-success'
                  style={{
                    fontSize: "0.76rem",
                    backgroundColor: "green",
                    color: "#fff",
                    padding: "0.2rem 1rem",
                    textAlign: "center",
                    marginTop: "0.5rem",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TaskAltIcon
                    style={{ fontSize: "1rem", marginRight: "0.2rem" }}
                    fontSize="small"
                  />
                  Book added to cart!
                </span>
              </div>

              <div
                style={{
                  padding: "0.5rem 1rem",
                  minWidth: "21rem",
                  maxWidth: "21rem",
                }}
                className="row"
              >
                <div
                  style={{
                    height: "6rem",
                    width: "5.5rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                      // "https://mypustak-6.s3.amazonaws.com/books/medium/book_default.jpeg"
                    }}
                    alt="book image"
                    src={src}
                    style={{
                      height: "100%",
                      width: "100%",
                      boxShadow: "2px 2px 3px #000",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    color: "#000",
                    fontSize: "0.9rem",
                    flexDirection: "column",
                  }}
                  className="col-7"
                >
                  <span>
                    {MyCart.bookName
                      ? MyCart.bookName.length > 55
                        ? MyCart.bookName
                            .replace(
                              /(\w)(\w*)/g,
                              (_, firstChar, rest) =>
                                firstChar.toUpperCase() + rest.toLowerCase()
                            )
                            .substring(0, 55)
                            .concat("...")
                        : MyCart.bookName.replace(
                            /(\w)(\w*)/g,
                            (_, firstChar, rest) =>
                              firstChar.toUpperCase() + rest.toLowerCase()
                          )
                      : null}
                  </span>
                  <span>{MyCart.bookCondition}</span>
                  <span style={{ fontSize: "0.9rem", color: "#555" }}>
                    ₹<s>{MyCart.bookPrice}</s>
                    <b className="text-success"> ₹{MyCart.bookShippingCost}</b>
                  </span>
                </div>
              </div>
            </Card>
          </SnackbarContent>
        </Snackbar>
      </MediaQuery>

      <MediaQuery maxWidth={576}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={open}
          autoHideDuration={3000}
          TransitionComponent={SlideTransition}
          onClose={handleClose}
          onTouchStart={handleClose}
          sx={{ marginBottom: "3.2rem" }}
        >
          <SnackbarContent style={{}}>
            <Card elevation={2}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span
                  // className='text-success'
                  style={{
                    fontSize: "0.76rem",
                    backgroundColor: "green",
                    color: "#fff",
                    minWidth: "100%",
                    padding: "0.2rem 0.3rem",
                    textAlign: "center",
                    marginBottom: "0.5rem",
                    // borderRadius: '5px',
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TaskAltIcon
                    style={{ fontSize: "1rem", marginRight: "0.2rem" }}
                    fontSize="small"
                  />
                  Book added to cart!
                </span>
              </div>
              <div
                style={{
                  padding: "0.3rem 0.6rem",
                  minWidth: "19.5rem",
                  maxWidth: "19.5rem",
                }}
                className="row"
              >
                <div
                  style={{
                    height: "4rem",
                    width: "4.5rem",
                    // padding: "2rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                      // "https://mypustak-6.s3.amazonaws.com/books/medium/book_default.jpeg"
                    }}
                    alt="book image"
                    src={src}
                    style={{
                      height: "100%",
                      width: "100%",
                      boxShadow: "2px 2px 3px #000",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    color: "#000",
                    fontSize: "0.8rem",
                    flexDirection: "column",
                  }}
                  className="col-7"
                >
                  <span>
                    {MyCart.bookName
                      ? MyCart.bookName.length > 37
                        ? MyCart.bookName
                            .replace(
                              /(\w)(\w*)/g,
                              (_, firstChar, rest) =>
                                firstChar.toUpperCase() + rest.toLowerCase()
                            )
                            .substring(0, 37)
                            .concat("...")
                        : MyCart.bookName.replace(
                            /(\w)(\w*)/g,
                            (_, firstChar, rest) =>
                              firstChar.toUpperCase() + rest.toLowerCase()
                          )
                      : null}
                  </span>
                  <span>{MyCart.bookCondition}</span>
                  <span style={{ fontSize: "0.8rem", color: "#555" }}>
                    ₹<s>{MyCart.bookPrice}</s>
                    <b className="text-success"> ₹{MyCart.bookShippingCost}</b>
                  </span>
                </div>
              </div>
            </Card>
          </SnackbarContent>
        </Snackbar>
      </MediaQuery>
      <MediaQuery minWidth={576}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={newbooksnackbar}
          TransitionComponent={SlideTransition}
          onClose={handleClose}
          autoHideDuration={3000}
          style={{ marginTop: "2.2rem" }}
        >
          <SnackbarContent style={{ backgroundColor: "#fff", color: "#000" }}>
            <Card elevation={2}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span
                  // className='text-success'
                  style={{
                    fontSize: "0.76rem",
                    backgroundColor: "green",
                    color: "#fff",
                    padding: "0.2rem 1rem",
                    textAlign: "center",
                    marginTop: "0.5rem",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TaskAltIcon
                    style={{ fontSize: "1rem", marginRight: "0.2rem" }}
                    fontSize="small"
                  />
                  Book added to cart!
                </span>
              </div>

              <div
                style={{
                  padding: "1rem",
                  minWidth: "21rem",
                  maxWidth: "21rem",
                }}
                className="row"
              >
                <div
                  style={{
                    height: "6rem",
                    width: "5.5rem",
                    // padding: "2rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                      // "https://mypustak-6.s3.amazonaws.com/books/medium/book_default.jpeg"
                    }}
                    alt="book image"
                    src={src}
                    style={{
                      height: "100%",
                      width: "100%",
                      boxShadow: "2px 2px 3px #000",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    color: "#000",
                    flexDirection: "column",
                    fontSize: "0.9rem",
                  }}
                  className="col-7"
                >
                  <span>
                    {MyCart.bookName
                      ? MyCart.bookName.length > 55
                        ? MyCart.bookName
                            .replace(
                              /(\w)(\w*)/g,
                              (_, firstChar, rest) =>
                                firstChar.toUpperCase() + rest.toLowerCase()
                            )
                            .substring(0, 55)
                            .concat("...")
                        : MyCart.bookName.replace(
                            /(\w)(\w*)/g,
                            (_, firstChar, rest) =>
                              firstChar.toUpperCase() + rest.toLowerCase()
                          )
                      : null}
                  </span>
                  {/* <span>{MyCart.bookName}</span> */}
                  <span style={{ color: "#555" }}>
                    <s>{MyCart.bookPrice}</s>{" "}
                    <span
                      style={{ fontWeight: "600" }}
                      className="text-success"
                    >
                      ₹{MyCart.discountedPrice}
                    </span>
                  </span>
                </div>
              </div>
            </Card>
          </SnackbarContent>
        </Snackbar>
      </MediaQuery>

      <MediaQuery maxWidth={576}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={newbooksnackbar}
          TransitionComponent={SlideTransition}
          onClose={handleClose}
          autoHideDuration={3000}
          style={{ marginTop: "2.2rem" }}
        >
          <SnackbarContent style={{ color: "#000" }}>
            <Card elevation={2}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span
                  // className='text-success'
                  style={{
                    fontSize: "0.76rem",
                    backgroundColor: "green",
                    color: "#fff",
                    minWidth: "100%",
                    padding: "0.2rem 0.3rem",
                    textAlign: "center",
                    marginBottom: "0.5rem",
                    // borderRadius: '5px',
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TaskAltIcon
                    style={{ fontSize: "1rem", marginRight: "0.2rem" }}
                    fontSize="small"
                  />
                  Book added to cart!
                </span>
              </div>

              <div
                style={{
                  padding: "0.3rem 0.6rem",
                  minWidth: "19.5rem",
                  maxWidth: "19.5rem",
                }}
                className="row"
              >
                <div
                  style={{
                    height: "4rem",
                    width: "4.5rem",
                    // padding: "2rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                      // "https://mypustak-6.s3.amazonaws.com/books/medium/book_default.jpeg"
                    }}
                    alt="book image"
                    src={src}
                    style={{
                      height: "100%",
                      width: "100%",
                      boxShadow: "2px 2px 3px #000",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    color: "#000",
                    flexDirection: "column",
                    fontSize: "0.8rem",
                  }}
                  className="col-7"
                >
                  <span>
                    {MyCart.bookName
                      ? MyCart.bookName.length > 37
                        ? MyCart.bookName
                            .replace(
                              /(\w)(\w*)/g,
                              (_, firstChar, rest) =>
                                firstChar.toUpperCase() + rest.toLowerCase()
                            )
                            .substring(0, 37)
                            .concat("...")
                        : MyCart.bookName.replace(
                            /(\w)(\w*)/g,
                            (_, firstChar, rest) =>
                              firstChar.toUpperCase() + rest.toLowerCase()
                          )
                      : null}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "#555" }}>
                    <s>{MyCart.bookPrice}</s>{" "}
                    <span
                      style={{ fontWeight: "600" }}
                      className="text-success"
                    >
                      ₹{MyCart.discountedPrice}
                    </span>
                  </span>
                </div>
              </div>
            </Card>
          </SnackbarContent>
        </Snackbar>
      </MediaQuery>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={showWishlist}
        style={{ zIndex: "4000" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <SnackbarContent style={{ backgroundColor: "green", color: "white" }}>
          {
            <div style={{ textAlign: "center", padding: "0.6rem" }}>
              {showWishlistmsg}
              {props.userComponentStatus == 2 ? (
                <Link href="/customer/wishlist" legacyBehavior>
                  <a style={{ textDecoration: "none", color: "white" }}>
                    {" "}
                    <span className={`${styleBookCard.viewList}`}>
                      {" "}
                      View Wishlist{" "}
                    </span>
                  </a>
                </Link>
              ) : (
                <Link
                  href={`/account/Loginpage?ret=${currentUrlPath}`}
                  legacyBehavior
                >
                  <a style={{ textDecoration: "none", color: "white" }}>
                    {" "}
                    <span className={`${styleBookCard.viewList}`}> Login </span>
                  </a>
                </Link>
              )}
              <span>
                <CloseIcon
                  onClick={handleClose}
                  fontSize="small"
                  style={{ marginLeft: "0.5rem" }}
                />
              </span>
            </div>
          }
        </SnackbarContent>
      </Snackbar>

      <Dialog
        open={notifyopen}
        closeOnDocumentClick
        onClose={() => setnotifyopen(false)}
        contentStyle={
          {
            // width: "auto",
          }
        }
      >
        {/* Notify Dialog */}
        <DialogContent>
          <IconButton
            onClick={() => {
              setnotifyopen(false);
            }}
            style={{ position: "absolute", right: 0, top: 0 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <div>
            {/* <label>{this.state.data}</label> */}
            <form onSubmit={notifyopenModal}>
              <div
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  marginTop: "0.8rem",
                }}
              >
                <TextField
                  type="email"
                  size="small"
                  label="Enter Your Registered Email id"
                  variant="standard"
                  onChange={(e) => {
                    setsendEmail(e.target.value);
                  }}
                  name="sendEmail"
                  value={sendEmail}
                  fullWidth
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  // color='primary'

                  style={{
                    backgroundColor: "#2258ae",
                    marginTop: "1rem",
                    textTransform: "capitalize",
                  }}
                >
                  {notifydialogloading ? (
                    <CircularProgress
                      size={18}
                      style={{ marginRight: "0.3rem", color: "#fff" }}
                    />
                  ) : (
                    <NotificationsActiveIcon
                      fontSize="small"
                      style={{ marginRight: "0.3rem" }}
                    />
                  )}
                  Notify
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <style jsx>
        {`
          * {
            font-family: Roboto;
          }
          .button {
            cursor: pointer;
            border: none;
            color: #fff;
            // background-color: #fff;
            height: 1.875rem;
            width: 6.875rem;
            font-family: Roboto;
            font-weight: 400;
            font-size: 0.75rem;
            // line-height: 14px;
            background: ${
              incart.includes(props.book.book_id)
                ? "linear-gradient(90deg, #ff6600 0%, #e05a00 100%);"
                : props.book.is_out_of_stack == "n"
                ? "linear-gradient(90deg, #2157ad 0%, #6190da 100%);"
                : "linear-gradient(90deg, #f94449 0%, #ff2c2c 100%);"
            }
            border-radius: 4.18446px;
            margin-bottom: 3px;
          }
          button:disabled,
          button[disabled] {
            // border: 1px solid #2248AE;
            background: linear-gradient(90deg, #ddd 0%, #ddd 100%);
            cursor: not-allowed;
            color: #777;
            border: none;
          }
        `}
      </style>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log(state.cartReduc, "state red............................");
  return {
    incart_check: state.cartReduc.incart_check,
    FromMycart: state.cartReduc.MyCart,
    userToken: state.accountR.token,
    getuserdetails: state.userdetailsR.getuserdetails,
    userComponentStatus: state.accountR.userComponentStatus,
    CartSessionData: state.cartReduc.CartSessionData,
    MyCart: state.cartReduc.MyCart,
    list_wishlist: state.cartReduc.list_wishlist,
    wishlist_msg: state.cartReduc.wishlist_msg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AddToCart: (MyCart) => dispatch(AddToCart(MyCart)),
    ToBeAddedToCart: (body) => dispatch(ToBeAddedToCart(body)),
    CartopenModal: () => dispatch(CartopenModal()),
    LoginCheck: (body) => dispatch(LoginCheck(body)),
    setComponentStatus: () => dispatch(setComponentStatus()),
    CartSession: (details) => dispatch(CartSession(details)),
    check_book_incart: () => dispatch(check_book_incart()),
    AddToCartLogin: (body) => dispatch(AddToCartLogin(body)),
    Adding_Wishlist: (wish_data) => dispatch(Adding_Wishlist(wish_data)),
    fetch_wishlist_detail_otherpage: () =>
      dispatch(fetch_wishlist_detail_otherpage()),
    Update_wishlist: (body) => dispatch(Update_wishlist(body)),
    login_backdropToggle: (body) => dispatch(login_backdropToggle()),
    sendBookNotification: (body) => dispatch(sendBookNotification(body)),
    GetWishlistCount: () => dispatch(GetWishlistCount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCard_old);
