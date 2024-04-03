"use client"
import React, { Component } from 'react'
import NoteBook from '../../components/noteBook/NoteBook'
// import styles from "../../styles/NoteBook.module.css";
import Image from "next/legacy/image";
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from "@mui/icons-material/Close";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import usedbook_img from "../../assets/usedbook.svg";

import HelpIcon from "@mui/icons-material/Help";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Person2Icon from '@mui/icons-material/Person2';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    TwitterIcon,
} from "react-share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InfoIcon from '@mui/icons-material/Info';
import { fetch_notebook } from '../../redux/actions/notebookAction';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import LocationOnIcon from "@mui/icons-material/LocationOn";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { url } from '../../helper/api_url';
import sendicon from "../../assets/sendicon.png";

import { Button, CircularProgress, DialogActions, InputAdornment, TextField } from '@mui/material';
import RatingGraph from "../../components/userReview/RatingGraph";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { EmailValidation } from "../../helper/validations";
import { encryptor } from "../../helper/crypto";
import styles from "../../styles/Product.module.css";
import MediaQuery from "react-responsive";

import { AddToCart, AddToCartLogin, CartSession, CartopenModal, ToBeAddedToCart, getEstDeliveryDate } from '../../redux/actions/cartAction';
import Head from 'next/head';
import SatisfactionBanner from '../../components/satisfactionBanner/SatisfactionBanner';
import NextBreadcrumbs from '../../components/Breadcrumbs/NextBreadcrumbs';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Fullfilled_strip from '../../components/Fullfilled_strip';
import moment from 'moment';
import { get_book_review_product, get_question_product, save_question } from '../../redux/actions/productAction';
import NoteBookDesc from '../../components/noteBook/NoteBookDesc';
import Link from 'next/link';
import Popup from 'reactjs-popup';
import ReturnPolicyDialog from "../../components/return_policy/ReturnPolicyDialog";
import ReactImageMagnify from 'react-image-magnify';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// export async function getServerSideProps({
//     res,
//     req,
//     query,
//     store,
//     isServer,
//     resolvedUrl,
// }) {

//     console.log(
//         req.url,
//         "###################################Test############################",
//         resolvedUrl
//     );

//     const seo_url = "https://www.mypustak.com/mypustak-notebook"
//     console.log(seo_url, "seo_url/*/*/*/*")
//     const seobody = {
//         url: seo_url
//     };
//     const seo_res = await fetch(`https://api.mypustak.com/api/v1/seo_tags/seo-data`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(seobody)

//     })
//     const seo_data = await seo_res.json()
//     console.log(seo_data, "seo_data")

//     let title_tag = ""
//     let meta_description = ""
//     if (seo_data.title_tag) {
//         title_tag = seo_data.title_tag
//         meta_description = seo_data.meta_desc

//     }
//     else {
//         title_tag = 'Mypustak Notebook books online |used books online India !'
//         meta_description = 'Only online free books used bookstore . Delivering in all pincodes in India. Providing fast delivery. 100% Quality assured. Engineering, medical, government jobs, novels, olympiad, school, children, university and many more books available.'
//     }
//     if (seo_data.redirect_url) {

//         console.log(seo_data.redirect_url, "seo_data.redirect_url")
//         res.setHeader("Location", seo_data.redirect_url);
//         res.statusCode = 301;
//         res.end();
//     }
//     let schema_markup = null;
//     if (seo_data.schema_markup) {
//         schema_markup = seo_data.schema_markup
//     }
//     // console.log(Object.keys(query)[1],"serverside query");
//     let product_id = Object.keys(query)[0]
//     console.log(product_id, "product_id");
//     if (product_id) {
//         console.log("product id")
//     }
//     else {
//         product_id = 83846575
//     }
//     // let order_id = Object.keys(query)[0]
//     // const user_data = JSON.parse(localStorage.getItem("user_info"));

//     // let user_id = user_data.id
//     let result = await fetch(
//         `${url}/api/v2/notebook/fetch_notebook/${product_id}`
//     );
//     let response = await result.json();
//     // this.setState({
//     //   save_review_book:response.books_details
//     // })
//     let note_book_details = response.data
//     console.log(note_book_details.images, "notebook_data");
//     let quantity_arr = []
//     quantity_arr[0] = response.data.min_order_qty
//     quantity_arr[1] = response.data.min_order_qty + (response.data.qty_group_by * 1)
//     quantity_arr[2] = response.data.min_order_qty + (response.data.qty_group_by * 2)
//     quantity_arr[3] = response.data.min_order_qty + (response.data.qty_group_by * 3)
//     quantity_arr[4] = response.data.min_order_qty + (response.data.qty_group_by * 4)
//     quantity_arr[5] = response.data.min_order_qty + (response.data.qty_group_by * 5)

//     let discount_percent = 0
//     note_book_details.qty_discount.map(discount => {
//         // console.log(response.data.min_order_qty ,discount.min_qty , discount.max_qty  ,"componentDidUpdate235"  )

//         if (response.data.default_selected_qty >= discount.min_qty && response.data.min_order_qty <= discount.max_qty) {
//             discount_percent = discount.discount_percent
//         }
//     })
//     return {
//         props: {
//             title_tag, meta_description,
//             og_url: 'https://www.mypustak.com/free-books',
//             note_book_details: note_book_details,
//             quantity_arr: quantity_arr,
//             discount_percent: discount_percent,
//         },
//     };
// }

class MyPustakNoteBook extends Component {
   
    // constructor(props) {
    //     super(props);
    //     // Now you can access props using this.props
    //     console.log(this.props, "bookData25585");
    // }
    
    state = {
        Buy_cartLoader: false,
        buynowhover: false,
        BulkOrderDialog: false,
        parentData:this.props,
        quantity_to_add: this.props?.bookData?.note_book_details?.default_selected_qty,
        onerror: false,
        Add_cartLoader: false,
        discount_percent: this.props?.bookData?.discount_percent,
        ImagSrc: this.props?.bookData.note_book_details.images[0],
        review_order_id: "",
        review_data: [],
        review_counts: {},
        enteredPincode: "",
        pinodeErrMsg: "",
        est_day_str: "",
        error_msg: "",
        show_est_day_loader: false,
        readmore: false,
        sticky_div: "product_img_normal",
        question_data: [],
        question_data_counts: 0,
        question_loader: true,
        questionSuccess: false,
        openQuestionDialog: false,
        inputQuestion: "",
        saveLoader: false,
        openRefundReturnDialog: false,
        openImageDialog: false,
        allImagesForMobileDialog: []
    }

   
    async componentDidMount() {
        console.log(this.state.quantity_to_add,"bookData25585");
        this.handleBackButtonPress()
        window.scrollTo(0, 0);
        window.addEventListener('popstate', this.handleBackButtonPress);
        window.addEventListener("scroll", this.handleScroll);
    
        let book_id = Object.keys(window.location.search)[0]
        // console.log(this.props.get_book_review_product(book_id, 0));



        if (this.props.userComponentStatus == 2) {


            this.props.get_book_review_product(this.props?.bookData?.note_book_details.product_code, 0).then(res => {
                console.log(res, "get_book_review_product");
                this.setState({
                    review_data: res.data,
                    review_counts: res.counts
                })
            })
                .catch(err => {
                    console.log(err, "review fetch err");
                })
            this.props.get_question_product(this.props?.bookData?.note_book_details.product_code, 0, 5).then(res => {
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
            const user_data = JSON.parse(localStorage.getItem("user_info"));
            this.setState({ enteredPincode: user_data.pincode })
            if (user_data && String(user_data.pincode).length == 6) {
                const pincode = user_data.pincode;
                const wt = Number(this.props?.bookData.note_book_details.wt) * Number(this.state.quantity_to_add)
                this.setState({ show_est_day_loader: true });
                this.ApiEstimate_delivery(pincode, wt, false);
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        window.addEventListener('popstate', this.handleBackButtonPress);
        if (this.state.quantity_to_add != prevState.quantity_to_add) {
            this.props?.bookData.note_book_details.qty_discount.map(discount => {

                // console.log(this.state.quantity_to_add  ,discount.min_qty , discount.max_qty  ,"componentDidUpdate235"  )
                if (this.state.quantity_to_add >= discount.min_qty && this.state.quantity_to_add <= discount.max_qty) {
                    // discount_percent=discount.discount_percent
                    this.setState({
                        discount_percent: discount.discount_percent
                    })
                }
            })
        }
        if (this.props.userComponentStatus !== prevProps.userComponentStatus) {
            if (this.props.userComponentStatus == 2) {
                // let book_id = Object.keys(Router.query)[0]
                let book_id = Object.keys(window.location.search)[0]
                this.props.get_book_review_product(this.props?.bookData?.note_book_details.product_code, 0).then(res => {
                    console.log(res, "get_book_review_product");
                    this.setState({
                        review_data: res.data,
                        review_counts: res.counts
                    })
                })
                    .catch(err => {
                        console.log(err, "review fetch err");
                    })
                this.props.get_question_product(this.props?.bookData?.note_book_details.product_code, 0, 5).then(res => {
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
                const user_data = JSON.parse(localStorage.getItem("user_info"));
                if (user_data) {
                    this.setState({ enteredPincode: user_data.pincode });

                    if (String(user_data.pincode).length == 6) {
                        const pincode = user_data.pincode;
                        const wt = Number(this.props?.bookData.note_book_details.wt) * Number(this.state.quantity_to_add)
                        this.setState({ show_est_day_loader: true });
                        this.ApiEstimate_delivery(pincode, wt, false);
                    }
                }
            }
        }
    }
    
    add_notebook_to_cart = () => {

        this.setState({
            Add_cartLoader: true
        })
        const {getuserdetails} = this.props
        const {  note_book_details } = this.props.bookData;
        const { quantity_to_add } = this.state
        // let discount_percent = 0
        let book_thumb = note_book_details.images[0].media_url
        // note_book_details.images[0].media_url
        // note_book_details.qty_discount.map(discount => {
        //   if(quantity_to_add>=discount.min_qty && quantity_to_add<=discount.max_qty){
        //     discount_percent=discount.discount_percent
        //   }
        // })
        const MyCart = {
            bookId: note_book_details.product_code,
            bookName: note_book_details.title,
            bookSlug: note_book_details.title.replace(" ", "-"),
            bookPrice: Math.round(note_book_details.mrp * this.state.quantity_to_add),
            bookShippingCost: Math.round((note_book_details.mrp - (note_book_details.mrp * (this.state.discount_percent / 100))) * this.state.quantity_to_add),
            bookThumb: book_thumb,
            bookQty: this.state.quantity_to_add,
            bookDonor: "",
            bookRackNo: "KOL/600/0/0",
            bookInvId: note_book_details.batch_no,
            delivery_cost: 0,
            cashbackedPrice: 0,
            discountedPrice: Math.round(note_book_details.mrp * (this.state.discount_percent / 100)),
            cashback_per: 0,
            discount_per: this.state.discount_percent,
            offertype: null,
            discount: 0,
            cashback: 0,
            book_thumb: book_thumb,

            // bookDonner
        };
        const sendCartSession = {
            book_id: note_book_details.product_code,
            book_inv_id: note_book_details.batch_no,
            cashbackedPrice: 0,
            discountedPrice: Math.round(note_book_details.mrp * (this.state.discount_percent / 100)),
            cashback_per: 0,
            discount_per: this.state.discount_percent,
            offertype: null,
            book_qty: this.state.quantity_to_add,
            book_thumb: book_thumb,

        };
       
        if (this.props.userComponentStatus == 2) {
            // if (true) {
        
            this.props.AddToCartLogin({ sendCartSession })
                .then(res => {
                    this.setState({ Add_cartLoader: false });
                    // this.RefreshCart();
                    this.props.CartopenModal();
                })
                .catch(err => {
                    console.log({ err });
                    // this.props.CartopenModal();
                    // this.props.AddToCart(MyCart);
                    this.setState({
                        Add_cartLoader: false,
                    })
                    //   Show_Error_msg: true,
                    //   error_msg:
                    //     "Book Not Added To Cart Due To Some Error .Please Refresh The Page.",
                    // });
                });
        } else {

            this.props.AddToCart(MyCart);
            this.props.ToBeAddedToCart({
                book_id: note_book_details.product_code,
                book_inv_id: note_book_details.batch_no,
                cashbackedPrice: 0,
                discountedPrice: Math.round(note_book_details.mrp * (this.state.discount_percent / 100)),
                cashback_per: 0,
                discount_per: this.state.discount_percent,
                offertype: null,
            });
            this.props.CartopenModal();
            this.setState({ Add_cartLoader: false });
        }
        // if (msgg === "") {
        // } else {
        //   // alert("Already Added")
        //   this.setState({
        //     AlreadyinCartMsgNewBook: "Already In cart",
        //     Add_cartLoader: false,
        //   });

        //   this.props.CartopenModal();
        //   // setTimeout(()=>{ this.setState({AlreadyinCartMsgNewBook:""})},3000)
        // }
        // alert("Add to Cart")
    }
    cartbtn_text = () => {
        let msg = "Add to Cart";

        return msg;
    };
    DicountedPrice = price => {
        let discountedPrice =
            price - (price * this.state.discount_percent) / 100;
        return Math.round(discountedPrice);
    };
    setImgsrc = srcobj => {
        this.setState({ ImagSrc: srcobj });
    };
  
    buynow_notebook = () => {
    //   alert("buyNow")
        this.setState({
            Buy_cartLoader: true
        })
        const {getuserdetails} = this.props
        const {  note_book_details } = this.props.bookData;
        const { quantity_to_add } = this.state
        // let discount_percent = 0
        let book_thumb = note_book_details.images[0].media_url
        // note_book_details.images[0].media_url
        // note_book_details.qty_discount.map(discount => {
        //   if(quantity_to_add>=discount.min_qty && quantity_to_add<=discount.max_qty){
        //     discount_percent=discount.discount_percent
        //   }
        // })
        const MyCart = {
            bookId: note_book_details.product_code,
            bookName: note_book_details.title,
            bookSlug: note_book_details.title.replace(" ", "-"),
            bookPrice: Math.round(note_book_details.mrp),
            bookShippingCost: Math.round(note_book_details.shipping_charge),
            bookThumb: book_thumb,
            bookQty: this.state.quantity_to_add,
            bookDonor: "",
            bookRackNo: "KOL/600/0/0",
            bookInvId: note_book_details.batch_no,
            delivery_cost: 0,
            cashbackedPrice: 0,
            discountedPrice: Math.round(note_book_details.mrp * (this.state.discount_percent / 100)),
            cashback_per: 0,
            discount_per: this.state.discount_percent,
            offertype: null,
            discount: 0,
            cashback: 0,
            book_thumb: book_thumb,

            // bookDonner
        };
        const sendCartSession = {
            book_id: note_book_details.product_code,
            book_inv_id: note_book_details.batch_no,
            cashbackedPrice: 0,
            discountedPrice: Math.round(note_book_details.mrp * (this.state.discount_percent / 100)),
            cashback_per: 0,
            discount_per: this.state.discount_percent,
            offertype: null,
            book_qty: this.state.quantity_to_add,
            book_thumb: book_thumb,

        };

        if (this.props.userComponentStatus == 2) {
            
            // if (true) {
      
            this.props.AddToCartLogin({ sendCartSession })
                .then((res) => {
                    this.setState({ Buy_cartLoader: false });
                    // this.RefreshCart();
                    // this.props.CartopenModal();
                    // Router.push(`/view-cart`);
                    window.location.replace(`/view-cart`)
                })
                .catch(err => {
                    console.log({ err });
                    // this.props.CartopenModal();
                    // this.props.AddToCart(MyCart);
                    this.setState({
                        Buy_cartLoader: false,
                    })
                    //   Show_Error_msg: true,
                    //   error_msg:
                    //     "Book Not Added To Cart Due To Some Error .Please Refresh The Page.",
                    // });
                });
        } else {
            this.props.AddToCart(MyCart)?.then((res)=>{
                window.location.replace(`/view-cart`)

            }).catch((err)=>{
                console.log(err);
                // this.setState({
                //       Show_Error_msg: true,
                //       error_msg:
                //         "Book Not Added To Cart Due To Some Error .Please Refresh The Page.",
                    
                // })
            })
            this.props.ToBeAddedToCart({
                book_id: note_book_details.product_code,
                book_inv_id: note_book_details.batch_no,
                cashbackedPrice: 0,
                discountedPrice: Math.round(note_book_details.mrp * (this.state.discount_percent / 100)),
                cashback_per: 0,
                discount_per: this.state.discount_percent,
                offertype: null,
            });
            // this.props.CartopenModal();
            this.setState({ Add_cartLoader: false });
            // Router.push(`/view-cart`)
        }
        // if (msgg === "") {
        // } else {
        //   // alert("Already Added")
        //   this.setState({
        //     AlreadyinCartMsgNewBook: "Already In cart",
        //     Add_cartLoader: false,
        //   });

        //   this.props.CartopenModal();
        //   // setTimeout(()=>{ this.setState({AlreadyinCartMsgNewBook:""})},3000)
        // }
        // alert("Add to Cart")
    }
 
    calculate_withoutgst = (gst_per) => {

        let total_value = this.DicountedPrice(this.props?.bookData?.note_book_details.mrp * this.state.quantity_to_add)
        let gst_percent = 1 + gst_per / 100

        const final_value = Math.ceil(total_value / gst_percent)
        return final_value
    }
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
    handleScroll = () => {
        let scroll = window.scrollY;
        if (scroll < 38) {
            this.setState({ sticky_div: "product_img_normal" });
        } else {
            this.setState({ sticky_div: "product_img_sticky" });
        }
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
    readmorebtn = () => {
        this.setState({ readmore: true });
    };

    submitQuestion = () => {
        if (this.props.userComponentStatus == 2) {
            this.setState({
                saveLoader: true
            })
            let body = {
                book_id: this.props?.bookData?.note_book_details.product_code,
                user_id: this.props?.bookData?.getuserdetails.id,
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
    getEstDeliveryDate = e => {
        const value = e.target.value.trim();
        let errormsg = !isNaN(value) ? "" : `Must be numeric`;
        this.setState({ enteredPincode: e.target.value, pinodeErrMsg: errormsg });
        if (errormsg.length) return;
        if (value.length == 6) {
            const wt = Number(this.props?.bookData?.note_book_details.wt) * Number(this.state.quantity_to_add)
            const pincode = value;
            this.setState({ show_est_day_loader: true });
            this.ApiEstimate_delivery(pincode, wt, true);
        }

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
    handleRefundPolicy = () => {
        this.setState({ openRefundReturnDialog: true })
    }
    closeHandleRefundPolicy = () => {
        this.setState({ openRefundReturnDialog: false })
    }
    closeImageDialog = () => {
        const currentURL = window.location.href;
        this.setState({ openImageDialog: false, allImagesForMobileDialog: [] })
        const updatedURL = currentURL.replace(/&full-image/g, '');
        window.history.pushState({}, '', updatedURL);
        this.setState({ openImageDialog: false, allImagesForMobileDialog: [] })
    }
    handleImages = () => {
        let allImages = []
        if (this.props?.bookData?.note_book_details && this.props?.bookData?.note_book_details.images && this.props?.bookData?.note_book_details.images.length) {
            console.log(this.props?.bookData?.note_book_details.images, "456321");
            this.props?.bookData?.note_book_details.images.map((image) => {
                if (image && image.media_url && image.is_deleted == 0) {
                    allImages.push(image.media_url)
                }
            })
        }
        let Url = window.location.href + "&full-image"
        // console.log(this.state.mainImagSrc.url, "3269")
        allImages.unshift(this.state.ImagSrc.media_url);
        const uniqueUrls = [...new Set(allImages)];
        console.log(uniqueUrls, "456321");
        window.history.pushState({}, '', Url);
        this.setState({ openImageDialog: true, allImagesForMobileDialog: uniqueUrls })
    }
    handleBackButtonPress = () => {
        if (window.location.search.includes('&full-image')) {
            let allImages = []
            if (this.props.note_book_details && this.props.note_book_details.images && this.props.note_book_details.images.length) {
                console.log(this.props.note_book_details.images, "456321");
                this.props.note_book_details.images.map((image) => {
                    if (image && image.media_url && image.is_deleted == 0) {
                        allImages.push(image.media_url)
                    }
                })
            }
            let Url = window.location.href + "&full-image"
            // console.log(this.state.mainImagSrc.url, "3269")
            allImages.unshift(this.state.ImagSrc.media_url);
            const uniqueUrls = [...new Set(allImages)];
            console.log(uniqueUrls, "456321");
            window.history.pushState({}, '', Url);
            this.setState({ openImageDialog: true, allImagesForMobileDialog: uniqueUrls })
        } else {
            this.setState({ openImageDialog: false, allImagesForMobileDialog: [] })
        }
    };
    
    render() {
        const { enteredPincode } = this.state;
        const { props } = this.props?.bookData;
        console.log(this.state.parentData?.bookData, "bookData25585");

        return (
            <React.Fragment>

                {/* the SEO code has been moved to the layout.jsx file in the same folder */}
                {/* <Head>
                    <title> {this.props.title_tag}</title>
                    <meta
                        name='Description'
                        property='og:description'
                        content={this.props.meta_description}
                    />
                    <meta name="title" content={this.props.title_tag} />
                    <meta name="description" content={this.props.meta_description} />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={this.props.og_url} />
                    <meta property="og:title" content={this.props.title_tag} />
                    <meta property="og:description" content={this.props.meta_description} />
                    <meta property="og:image" content='https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png' />

                </Head> */}
         
                <div className={`${styles.main_outterdiv}`}>
                    <div className={`${styles.product_topdiv}`}>
                        <div className={`${styles.product_maindiv}`}>
                            {/* Notebook left div start */}
                            <div className={`${styles.product_Left} col-lg-5 col-md-5 col-sm-6 col-12`}>
                                <div className={`${this.state.sticky_div == "product_img_sticky"
                                    ? styles.product_img_sticky
                                    : styles.product_img_normal
                                    }`}>
                                    <div className={`${styles.left_div_parent}`}>
                                        <div className={`${styles.product_Left_innerdiv}`}>
                                            <div className={`${styles.product_Left_imgthumb} col-2`}>
                                                {this.props?.bookData?.note_book_details.images.map((srcobj, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`${styles.product_img_single_div} `}
                                                            style={{}}>
                                                            <img
                                                                alt=''
                                                                onMouseEnter={() => this.setImgsrc(srcobj)}
                                                                key={srcobj.id}
                                                                className={`${styles.image_thumb}`}
                                                                style={{
                                                                    padding: "5px",
                                                                    borderRadius: "5px",
                                                                    border:
                                                                        srcobj == this.state.ImagSrc
                                                                            ? "2px solid #2157AD"
                                                                            : null,
                                                                }}
                                                                src={`https://mypustak-6.s3.amazonaws.com/books/${srcobj.media_url}?${Date.now()}`}
                                                                onError={i => (i.target.style.display = "none")}
                                                            />
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
                                            </div>
                                            <div className={` ${styles.product_Left_image_div} row col-9 col-sm-9 col-md-9 col-lg-9`}>
                                                <div className={`${styles.main_image_div} col text-center`}>
                                                    <div className=' ' style={{}}>
                                                        <MediaQuery minWidth={576}>
                                                            <center>
                                                                <ReactImageMagnify {...{
                                                                    smallImage: {
                                                                        alt: 'Book Thumb',
                                                                        src: this.state.onerror
                                                                            ? "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png"
                                                                            : `https://mypustak-6.s3.amazonaws.com/books/${this.state.ImagSrc.media_url}?${Date.now()}`,
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
                                                                            : `https://mypustak-6.s3.amazonaws.com/books/${this.state.ImagSrc.media_url}?${Date.now()}`,
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
                                                            </center>
                                                        </MediaQuery>
                                                        <MediaQuery maxWidth={575}>
                                                            <Image
                                                                alt='product '
                                                                width={240}
                                                                height={300}
                                                                src={
                                                                    this.state.onerror
                                                                        ? "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png"
                                                                        : `https://mypustak-6.s3.amazonaws.com/books/${this.state.ImagSrc.media_url}?${Date.now()}`
                                                                }
                                                                onClick={() => { this.handleImages() }}
                                                                onError={() => {
                                                                    this.setState({
                                                                        onerror: true,
                                                                    });
                                                                }}
                                                            />
                                                        </MediaQuery>
                                                    </div>
                                                    {/* <MediaQuery minWidth={576}>
                            <div>
                              <Image
                                alt='product '
                                width={350}
                                style={{ border: "1px solid #000" }}
                                height={380}
                                src={
                                  this.state.onerror
                                    ? "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png"
                                    : `https://mypustak-6.s3.amazonaws.com/books/${this.state.ImagSrc.media_url}?${Date.now()}`
                                  // `https://mypustak-6.s3.amazonaws.com/books/${this.props.note_book_details.images[0].media_url}`
                                }
                                priority
                                onError={() => {
                                  this.setState({
                                    onerror: true,
                                  });
                                }} />
                            </div>
                          </MediaQuery>
                          <MediaQuery maxWidth={575}>
                            <div>
                              <Image
                                alt='product '
                                width={240}
                                style={{ border: "1px solid #000" }}
                                height={300}
                                src={
                                  this.state.onerror
                                    ? "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png"
                                    : `https://mypustak-6.s3.amazonaws.com/books/${this.state.ImagSrc.media_url}?${Date.now()}`
                                  // `https://mypustak-6.s3.amazonaws.com/books/${this.props.note_book_details.images[0].media_url}`
                                }
                                priority
                                onError={() => {
                                  this.setState({
                                    onerror: true,
                                  });
                                }} />
                            </div>
                          </MediaQuery> */}
                                                </div>

                                            </div>
                                            {/* <div
                                    className={`${styles.share_btn_div} col-3 col-sm-3 col-md-3 col-lg-3 `}>
                                      <div>
                                      <div className={`${styles.product_assured} `}>
                                          
                                      </div>
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
                                              <div className={`${styles.wishlistDiv}`}>
                                                {
                                                  this.state.wishlistLoader ? (
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
                                          </div>
                                      </div>
                                    </div> */}
                                        </div>
                                        <div className='left_btn_div'>
                                            <MediaQuery minWidth={576}>
                                                <div className='product_img_bottom ' style={{ padding: "1rem", paddingTop: "0.2rem" }}>
                                                    <div className='product_img_bottom_inner  d-flex justify-content-between '
                                                        style={{ columnGap: "1rem" }}>
                                                        <Button
                                                            onClick={this.buynow_notebook}
                                                            className={styles.productBuyNowdDiv}
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
                                                                opacity: this.state.buynowhover ? 0.95 : null,
                                                                // border:this.state.buynowhover?"2px solid #f35631":null,
                                                                background:
                                                                    "#f35631",
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
                                                                    <div style={{}}>Buy Now</div>
                                                                )}
                                                            </div>
                                                        </Button>
                                                        <Button
                                                            className={styles.productAddtoCarddiv}
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
                                                                // this.state.already_incart
                                                                // ? this.goToCart()
                                                                // : this.state.bookType == "newbook"
                                                                // ? this.AddNewBookToCart(e)
                                                                // : this.AddOldBookToCart(e);
                                                                this.add_notebook_to_cart()
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
                                                </div>
                                            </MediaQuery>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Notebook left div end */}

                            {/* Note book right div start */}
                            <div className={`${styles.product_right}  col-lg-7 col-md-7 col-sm-6 col-12`}>
                                <div className='product_right_inner px-2  '
                                    style={{ marginBottom: "1rem" }}>
                                    <div className={`${styles.breadcrumDiv}`}>
                                        <NextBreadcrumbs />

                                    </div>
                                    <div className='product_right_title_price '>
                                        <div className={`${styles.product_right_title_price_inner} pb-3 pt-2 mb-3`}>

                                            <h6 className={`${styles.product_title_inner}`}>
                                                {this.props?.bookData?.note_book_details.title}
                                            </h6>
                                            <div className={`${styles.product_title_price} mt-2 d-flex justify-content-start  align-items-center`}>
                                                <div className={`product_price`}>
                                                    <span className={`${styles.font15}`}>

                                                        <span>{" "}₹{this.calculate_withoutgst(this.props?.bookData?.note_book_details.gst_percent)}</span>

                                                    </span>

                                                    {" "}

                                                    <span>
                                                        ( ₹{this.DicountedPrice(this.props?.bookData?.note_book_details.mrp * this.state.quantity_to_add)}<span> incl. GST</span> )

                                                    </span>
                                                    &nbsp;
                                                    <span className={`${styles.savedPercent} text-success`}>
                                                        ₹
                                                        {Math.ceil(
                                                            this.props?.bookData?.note_book_details.mrp * (this.state.discount_percent / 100) * this.state.quantity_to_add
                                                        )}{" "}
                                                        <span className={`${styles.colorGray} text-success`}>
                                                            {" "}
                                                            saved!{" "}
                                                        </span>
                                                    </span>

                                                </div>
                                            </div>
                                            <div className='mb-3 mt-3'>
                                                <table>
                                                    {/* <tr>
                                  <td>Pages</td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Size</td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Binding</td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>Ruling</td>
                                  <td></td>
                                </tr> */}
                                                    <div
                                                        className={styles.quatity_div}
                                                        style={{ display: "flex", alignItems: "baseline" }}
                                                    >
                                                        <div>
                                                            <h5>Quantity</h5>
                                                        </div>
                                                        {/* <td style={{padding:"0 10px"}}>{this.props.note_book_details.min_order_qty}</td> */}
                                                        <div style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
                                                            {
                                                                this.props?.bookData?.quantity_arr.map((q, index) => {
                                                                    return (
                                                                        <span
                                                                            key={index}
                                                                            onClick={() => {
                                                                                if (index == 5) {
                                                                                    this.setState({
                                                                                        BulkOrderDialog: true
                                                                                    })
                                                                                }
                                                                                this.setState({
                                                                                    quantity_to_add: q
                                                                                })
                                                                            }}
                                                                            className={styles.quantityEach}
                                                                            style={{
                                                                                background: this.state.quantity_to_add >= this.props?.bookData?.quantity_arr[5] && index == 5 ? "linear-gradient(90deg, #2157ad 0%, #6190da 100%)" : q == this.state.quantity_to_add ? "linear-gradient(90deg, #2157ad 0%, #6190da 100%)" : "#d7e2ff", color: this.state.quantity_to_add >= this.props?.bookData?.quantity_arr[5] && index == 5 ? "#d7e2ff" : q == this.state.quantity_to_add ? "#d7e2ff" : "gray",
                                                                                // border:q==this.state.quantity_to_add?"2px solid #2258ae":null
                                                                            }}
                                                                        >
                                                                            {q}{index == 5 ? "+" : null}
                                                                        </span>
                                                                    )
                                                                })
                                                            }
                                                        </div>

                                                    </div>
                                                    <center>

                                                        <div style={{ fontSize: "0.75rem", color: "gray", marginTop: '0.5rem', marginLeft: "2rem" }}>Add more save more</div>

                                                    </center>
                                                </table>
                                            </div>
                                            {this.props?.bookData?.note_book_details.instock_qty > 0 ?
                                                <div className='product_right_price_details border mb-3'>
                                                    <div className='row'>
                                                        <div className={`${styles.product_price_details_inner} col-md-8`}>
                                                            <div className='d-flex m-2'>
                                                                <div className={` ${styles.handeling_mrp}`} >
                                                                    <span>M.R.P. : &nbsp;</span>
                                                                </div>
                                                                <div className={` ${styles.handeling_mrp_value}`}>
                                                                    {/* ₹ {this.props.note_book_details.mrp} */}
                                                                    <s style={{ color: "#484848", size: "1rem" }}> ₹ {this.props?.bookData?.note_book_details.mrp * this.state.quantity_to_add}</s>
                                                                    <span style={{ fontSize: "0.8rem", color: "#2248ae" }}>&nbsp; ( For {this.state.quantity_to_add} Notebooks )</span>
                                                                    {/* <span className='text-success font-weight-bold'>
                                    {" "}
                                    ₹{this.DicountedPrice(this.props.note_book_details.mrp)}
                                  </span>
                                  <span
                                    className={` ${styles.font08} text-success font-weight-bold`}>
                                    ({this.state.discount_percent}% Off)
                                  </span> */}
                                                                </div>
                                                            </div>
                                                            <div className='d-flex m-2'>
                                                                <div className={` ${styles.handeling_mrp}`} >
                                                                    <span>Deal of the Day : &nbsp;</span>
                                                                </div>
                                                                <div className='' style={{ fontSize: "1.2rem", color: '#ff5e1f' }}>
                                                                    <div>
                                                                        <span>{" "}₹ {this.calculate_withoutgst(this.props?.bookData?.note_book_details.gst_percent)}</span> <span> excl. GST</span>
                                                                    </div>
                                                                    <div style={{ fontSize: '1rem' }}>
                                                                        ₹ {this.DicountedPrice(this.props?.bookData?.note_book_details.mrp * this.state.quantity_to_add)}<span> incl. GST</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className={` d-flex m-2`} >
                                                                <div className={` ${styles.handeling_mrp} font-weight-bold`}>
                                                                    You Save: &nbsp;
                                                                </div>
                                                                <div style={{ color: '#ff5e1f' }}>
                                                                    ₹<span className={``}>
                                                                        {" "}

                                                                        {Math.ceil(
                                                                            this.props?.bookData?.note_book_details.mrp * (this.state.discount_percent / 100) * this.state.quantity_to_add
                                                                        )} ( {this.state.discount_percent}% Off )

                                                                    </span>
                                                                    <br /><span style={{ color: "#484848", fontSize: "0.9rem" }}>Inclusive of all taxes</span>
                                                                </div>
                                                            </div>
                                                            {/* <div className='d-flex m-2'>
                                <div className='col-6 text-success font-weight-bold'>
                                Total Amount
                                </div>
                                <div className='col-6'>
                                ₹<span className={``}>
                                    {" "}
                                    {parseInt(
                                      this.DicountedPrice(this.props.note_book_details.mrp*this.state.quantity_to_add)
                                    )}
                                  </span>
                                </div>
                                </div> */}


                                                        </div>
                                                        <div className={`${styles.product_price_details_inner} col-md-4`}>
                                                            <div className='m-2'>
                                                                <Fullfilled_strip />
                                                            </div>
                                                            <div className='m-2' style={{ color: '#484848', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                                                <span><LocalShippingTwoToneIcon style={{ height: "25px" }} /></span>  Free Delivery Across India
                                                            </div>

                                                            <div className='m-2' style={{ color: '#484848', fontSize: '0.9rem', fontWeight: 'bold', textDecoration: "None" }}>
                                                                <Link href="/bulkorder" style={{ textDecoration: "none" }}>Contact For Bulk Order</Link>
                                                            </div>
                                                        </div>
                                                        {/* End of left part */}
                                                    </div>


                                                </div> : null
                                            }

                                            <div className='text-center border p-3'>
                                                <span>
                                                    <VerifiedUserIcon className='text-success' />
                                                </span>
                                                &nbsp;
                                                <span className={`${styles.product_price_des}`}>
                                                    Safe And Secure Payment. 100% Authentic And Premium Quality
                                                    Notebooks.
                                                </span>
                                                <div style={{ paddingTop: '0.5rem', marginTop: "0.5rem", color: 'gray', fontSize: "0.8rem", borderTop: "1px solid lightgray" }}>
                                                    Write in comfort and style with our notebook soft-touch cover and premium quality paper.
                                                </div>
                                            </div>

                                            {this.props?.bookData?.note_book_details.instock_qty > 0 ? (
                                                <div
                                                    className='product_right_delavery_check mb-3'
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
                                                                            // helperText={pinodeErrMsg}
                                                                            type='tel'
                                                                            // error={pinodeErrMsg.length ? true : false}
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
                                                                            {this.state.show_est_day_loader ? (
                                                                                <CircularProgress size='1rem' />
                                                                            ) : this.state.est_day_str ? (
                                                                                `Estimated Delivered in ${this.state.est_day_str}`
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
                                                                                Number(this.state.quantity_to_add) * Number(this.props?.bookData?.note_book_details.wt), true
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
                                                                <h6 className={`${styles.delevery_title} `}>
                                                                    <span style={{ fontSize: "0.85rem", cursor: "pointer" }} onClick={this.handleRefundPolicy}> Return Refund Replacement Policy </span>
                                                                    <span style={{ cursor: "pointer" }}> &nbsp;<HelpIcon fontSize='small' className={`${styles.helpIcon}`} onClick={this.handleRefundPolicy} /></span>
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
                                                            Product Details
                                                        </h5>
                                                        <div className='row m-2' style={{}}>
                                                            <div className='col-md-5 px-2 py-1 '>
                                                                {this.props?.bookData?.note_book_details.features.slice(0, this.props?.bookData?.note_book_details.features.length / 2).map((feature, index) => {
                                                                    return (
                                                                        <div className='d-flex ' key={index}>
                                                                            <div className={styles.details} style={{ textTransform: 'capitalize', minWidth: "8rem", textAlign: 'right' }}>{feature.feature_title} : &nbsp;</div>
                                                                            <div className={styles.details} style={{ textTransform: 'capitalize' }}>
                                                                                {feature.feature_value}
                                                                            </div>
                                                                        </div>

                                                                    )
                                                                })}
                                                            </div>
                                                            <div className='col-md-6 px-2 py-1'>
                                                                {this.props?.bookData?.note_book_details.features.slice(this.props?.bookData?.note_book_details.features.length / 2).map((feature, index) => {
                                                                    return (
                                                                        <div className="d-flex" key={index}>
                                                                            <div className={styles.details} style={{ textTransform: 'capitalize', minWidth: "8rem", textAlign: 'right' }}>{feature.feature_title} : &nbsp;</div>
                                                                            <div className={styles.details} style={{ textTransform: 'capitalize' }}>
                                                                                {feature.feature_value}
                                                                            </div>
                                                                        </div>

                                                                    )
                                                                })}
                                                            </div>
                                                        </div>


                                                        {/* description */}

                                                        <div>
                                                            {this.props?.bookData?.note_book_details.description?.length ? (
                                                                <>
                                                                    {this.props?.bookData?.note_book_details.description.length > 2 ? (
                                                                        <h5 className='mx-3'>Description</h5>
                                                                    ) : null}
                                                                    <div className='m-3'>
                                                                        <NoteBookDesc description={this.props?.bookData?.note_book_details.description} />
                                                                        {/* {this.props.note_book_details.description.length > 500 ? (
                                  <p
                                    className='text-center text-primary cursor-pointer style'
                                    onClick={this.readmorebtn}>
                                    {this.state.readmore ? `` : `Read More`}
                                  </p>
                                ) : null} */}
                                                                    </div>
                                                                    {/* {this.props.note_book_details.description.length > 2 ? (
                            ) : null} */}
                                                                </>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Book Review Start*/}
                                            <div className={`mt-2`}>
                                                <div className={`${styles.book_review_div}`}>
                                                    <div className={`${styles.book_review_heading}  p-2`}>
                                                        <h5 style={{ fontSize: "1rem", margin: 0, padding: 0 }} className=''>
                                                            Ratings and Reviews
                                                        </h5>

                                                        <Button variant="outlined"
                                                            onClick={() => {
                                                                if (this.props.userComponentStatus == 2) {
                                                                    window.location.replace(`/write-review?${this.props?.bookData?.note_book_details.product_code}`);
                                                                }
                                                                else {
                                                                    let BackUrl = `write-review?${this.props?.bookData?.note_book_details.product_code}`;
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
                                                        <div className="p-2" >
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
                                                                window.location.replace(`/mypustak-notebook/ReviewAll?${this.props?.bookData?.note_book_details.product_code}`)
                                                                // window.open(`/product/ReviewAll?${this.props.book.book_id}`)
                                                            }} >
                                                            <h5 style={{ fontSize: "1rem", margin: 0, padding: 0 }}>View  All Review ({this.state.review_data.length - 3})</h5>
                                                            <h5><ArrowForwardIosIcon style={{ fontSize: "1.1rem" }} /></h5>
                                                        </div> : null}
                                                </div>
                                            </div>

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
                                                                            let BackUrl = `mypustak-notebook?${this.props?.bookData?.note_book_details.product_code}`;
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
                                                                                let BackUrl = `mypustak-notebook?${this.props?.bookData?.note_book_details.product_code}`;
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
                                                                            <span style={{ display: "flex" }}><b>A :</b> &nbsp;  <span dangerouslySetInnerHTML={{ __html: question.answer }}></span></span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                {this.state.question_data_counts > 5 ?
                                                                    <div onClick={() => {
                                                                        window.location.replace(`/question-answer?${this.props?.bookData?.note_book_details.product_code}`);
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

                                </div>
                            </div>
                            {/* Note book right div end */}

                        </div>
                    </div>
                    <div className=' ' style={{ marginTop: "1rem" }}>
                        {/* <SatisfactionBanner /> */}
                    </div>
                    <div className={`${styles.btn_sticky}`}>
                        <MediaQuery maxWidth={577}>
                            <div>
                                <div className='product_img_bottom ' style={{ padding: "1rem" }}>
                                    <div className='product_img_bottom_inner d-flex justify-content-between  mt-1' style={{ columnGap: "1rem" }}>
                                        <Button
                                            onClick={this.buynow_notebook}
                                            className={styles.productBuyNowdDiv}
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
                                            className={styles.productAddtoCarddiv}
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
                                                // this.state.already_incart
                                                //   ? this.goToCart()
                                                //   : this.state.bookType == "newbook"
                                                //   ? this.AddNewBookToCart(e)
                                                //   : this.AddOldBookToCart(e);
                                                this.add_notebook_to_cart()
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
                                                        Add to Cart
                                                        {/* {this.cartbtn_text()} */}
                                                    </div>
                                                )}
                                            </div>
                                            {/* Add To Cart */}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </MediaQuery>
                    </div>
                    <Dialog
                        // fullWidth
                        // maxWidth="xs"
                        open={this.state.BulkOrderDialog}
                        // closeOnDocumentClick
                        aria-labelledby='alert-dialog-title'
                        aria-describedby='alert-dialog-description'
                        onClose={() => this.setState({ BulkOrderDialog: false })}>
                        <DialogTitle>
                            Bulk Orders
                            <IconButton
                                onClick={() => {
                                    this.setState({ BulkOrderDialog: false, quantity_to_add: this.props?.bookData?.quantity_arr[5] });
                                }}
                                style={{ position: "absolute", right: 0, top: 0 }}>
                                <CloseIcon fontSize='small' />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <div className={styles.bulkMainDiv}>
                                <div className={styles.bulkDiv}>
                                    <div className={styles.BulkQuantity}>
                                        <span>{this.state.quantity_to_add}</span>
                                    </div>
                                    <div className={styles.bulkArrowDiv}>
                                        <IconButton
                                            onClick={() => {
                                                this.setState({
                                                    quantity_to_add: this.state.quantity_to_add + this.props?.bookData?.note_book_details.qty_group_by
                                                })
                                            }}
                                            style={{ borderBottom: "1px solid #2258ae", borderRadius: 0, padding: "2px" }}>
                                            <KeyboardArrowUp />


                                        </IconButton>
                                        <IconButton
                                            disabled={this.state.quantity_to_add == this.props?.bookData?.quantity_arr[5] ? true : false}
                                            onClick={() => {
                                                this.setState({
                                                    quantity_to_add: this.state.quantity_to_add - this.props?.bookData?.note_book_details.qty_group_by
                                                })
                                            }}
                                            style={{ borderRadius: 0, padding: "2px" }}>
                                            <KeyboardArrowDown />
                                        </IconButton>
                                    </div>
                                </div>
                                <div style={{ flex: 10 }}>
                                    <span style={{ fontSize: "0.8rem" }}>
                                        <InfoIcon color='#fff' /> Multiples of {this.props?.bookData?.note_book_details.qty_group_by}
                                    </span>
                                </div>


                            </div>
                            <div style={{ marginTop: '1rem', fontSize: "0.9rem", fontWeight: 'bold' }}>
                                {parseInt(this.state.discount_percent) >= 25 ?
                                    <center style={{ color: '#2248ae' }}>Get Flat Discount {this.state.discount_percent}%</center> :
                                    <center >Get Flat Discount {this.state.discount_percent}%</center>}
                            </div>

                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant='contained'
                                fullWidth
                                style={{ textTransform: "capitalize" }}
                                onClick={() => {
                                    this.setState({
                                        BulkOrderDialog: false,
                                    })
                                }}

                            >
                                select quantity
                            </Button>
                        </DialogActions>
                    </Dialog>

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
                        <DialogContent style={{}} >
                            <div style={{}}>
                                {/* <Carousel
                  swipeable={true}
                  draggable={true}
                  showDots={true}
                  responsive={{
                    mobile: {
                      breakpoint: { max: 599, min: 0 },
                      items: 1,
                    },
                  }}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={1000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  <div style={{ background: "red" }}>Item 1</div>
                  <div>Item 2</div>
                  <div>Item 3</div>
                  <div>Item 4</div>
                </Carousel> */}
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
                                                    <img src={`https://mypustak-6.s3.amazonaws.com/books/${image}`} style={{ width: '100%', height: '100%' }} className="d-block w-100 h-100" alt="..." onError={i => (i.target.style.display = "none")} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Carousel>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>


            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    cart_session: state.cartReduc.MyCart,
    userToken: state.accountR.token,
    getuserdetails: state.userdetailsR.getuserdetails,
    userComponentStatus: state.accountR.userComponentStatus,
    review_by_book: state.productReducer.review_by_book

});
export default connect(mapStateToProps, {
    save_question, fetch_notebook, CartSession, CartopenModal, AddToCartLogin, AddToCart, ToBeAddedToCart, get_book_review_product, get_question_product, getEstDeliveryDate
// })(withSnackbar(MyPustakNoteBook));
}) (withSnackbar(MyPustakNoteBook));