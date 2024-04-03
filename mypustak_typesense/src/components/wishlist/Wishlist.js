"use client"
import { Button, CircularProgress } from "@mui/material";
import styles from "../../styles/Wishlist.module.css"
import Image from "next/legacy/image";
import React, { Component } from "react";
import newbook_img from "../../assets/newBookTag.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import MediaQuery from "react-responsive";
import CustomLoaderBorder from "../CustomLoader/CustomLoaderBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { connect } from "react-redux";
import moment from "moment";
import { withSnackbar } from "notistack";
import InboxIcon from "@mui/icons-material/Inbox";
import Link from "next/link";
import {
  CartopenModal,
  CartSession,
  fetching_Wishlist,
  Update_wishlist,
  AddingCart_Wishlist,
  delete_wishlist,
  move_all_tocart,
  check_book_incart,
} from "../../redux/actions/cartAction.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { bucketmp6 } from "../../helper/aws";
import { GetWishlistCount } from "../../redux/actions/wishlistAction";
class Wishlist extends Component {
  state = {
    page: 1,
    wishlist: [],
    fetch_loader: false,
    Add_cartLoader: false,
    showWishlist_Msg: false,
    remove_id: "",
    move_id: "",
    deleteall_snack: false,
    snack_msg: "",
    moveall_loader: false,
    showOutstockBtn: false,
    movetocartvariant: "text",
    outofstockvariant: "text",
    InitalLoader: true,
    ServerError: false,
    delbtnLoader: false,
    move_cart_loader: false,
    onerror: false,
    onErrorBookId: []
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.userComponentStatus == 2) {
      let user = JSON.parse(localStorage.getItem("user_info"));
      this.setState({ fetch_loader: true });
      let body = {
        user_id: user.id,
        page: 1,
      };
      this.props
        .fetching_Wishlist({ body })
        .then(res => {
          this.setState({ fetch_loader: false, InitalLoader: false });
        })
        .catch(err => {
          this.setState({ InitalLoader: false, ServerError: true });
        });

      this.getwishlistCount();
    } else if (this.props.userComponentStatus == 1) {
      let BackUrl = "customer/wishlist";
      window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.userComponentStatus !== prevProps.userComponentStatus) {
      if (this.props.userComponentStatus == 1) {
        let BackUrl = "customer/wishlist";
        // localStorage.setItem("BackUrl", BackUrl)
        window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
      } else if (this.props.userComponentStatus == 2) {
        let user = JSON.parse(localStorage.getItem("user_info"));
        // console.log(user,"1256", user.id)

        this.setState({ fetch_loader: true });
        let body = {
          user_id: user.id,
          page: 1,
        };
        this.props.fetching_Wishlist({ body }).then(res => {
          this.setState({ fetch_loader: false, InitalLoader: false });
        });
      }
    }
    if (prevProps.MyWishlist != this.props.MyWishlist) {
      this.setState({ showOutstockBtn: false });

      this.generate_new_wislist_obj(this.props.MyWishlist);
    }
  }

  getwishlistCount = () => {
    this.props.GetWishlistCount();
  };

  updateWishlist = wishlist_id => {
    this.setState({ delbtnLoader: true, move_id: wishlist_id });
    const body = {
      wishlist_id: wishlist_id,
      is_deleted: 1,
    };
    let user = JSON.parse(localStorage.getItem("user_info"));
    let user_id = user.id;
    this.props
      .Update_wishlist({ body: body })
      .then(res => {
        let body = {
          user_id: user_id,
          page: 1,
        };
        this.props.GetWishlistCount();
        this.props.enqueueSnackbar(`Book Successfully Removed from Wishlist`, {
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          variant: "success",
          persist: false,
        });
        this.setState({ delbtnLoader: false });
        this.props.fetching_Wishlist({ body }).then(res => {
          // setFetch_loader(false);
          this.setState({ fetch_loader: false });

          this.generate_new_wislist_obj(res.data.data.books);
        });
      })
      .catch(() => {
        // alert("wrong")
      });
  };
  generate_new_wislist_obj = MyWishlist => {
    if (MyWishlist) {
      let mainList = MyWishlist.map(lists => {
        let book_invt = lists.book_inv_id;
        if (lists.condition.length == 0) {
          // console.log(lists, "cond");
          this.setState({ showOutstockBtn: true });
        }

        lists.condition.map(data => {
          if (data.condition == "VeryGood") {
            data.cond_name = "Very Good";
          }
          if (data.condition == "AverageButInReadableCondition") {
            data.cond_name = "Good And Readable";
          }
          if (data.condition == "AlmostNew") {
            data.cond_name = "As Good As New";
          }
          if (data.condition == "BrandNew") {
            data.cond_name = "Brand New";
          }

          if (data.book_inv_id == book_invt) {
            lists.price = data.price;
            lists.selected_condition = data.condition;
          } else {
            lists.book_inv_id = lists.condition[0].book_inv_id;
            lists.rackno = lists.condition[0].rackno;
            lists.price = lists.condition[0].price;
            lists.selected_condition = lists.condition[0].condition;
          }
        });
      });
      this.setState({
        wishlist: MyWishlist,
      });
    }
  };

  select_the_condition = (selected_cond, index) => {
    const { wishlist } = this.state;
    let selected_book = wishlist[index];
    selected_book.book_inv_id = selected_cond.book_inv_id;
    selected_book.rackno = selected_cond.rack_no;
    selected_book.price = selected_cond.price;
    selected_book.selected_condition = selected_cond.condition;
    wishlist[index] = selected_book;
    this.setState({ wishlist });
  };
  RefreshCart = async () => {
    // let res = await this.props.CartSession("");

    let res = await this.props.check_book_incart()
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

  movein_cart = wishlist => {
    console.log(wishlist,"aba55")
    let current_date = Math.floor(Date.now() / 1000);
    let time = moment.unix(current_date).format("YYYY-MM-DD h:mm:ss");
    this.setState({ move_cart_loader: true });
    if (wishlist.book_type == 0) {
      const MyCart = {
        wishlist_id: wishlist.wishlist_id,
        user_id: this.props.getuserdetails.id,
        book_id: wishlist.book_id,
        book_inv_id: wishlist.book_inv_id,
        times: time,
        offertype:wishlist.offertype,
        cashbacked_price:wishlist.cashbacked_price,
        discounted_price:wishlist.discounted_price,
        discount_per:wishlist.discount_per,
        cashback_per:wishlist.cashback_per
      };
      this.setState({ move_id: wishlist.wishlist_id });
      let user = JSON.parse(localStorage.getItem("user_info"));
      let user_id = user.id;

      this.props
        .AddingCart_Wishlist(MyCart)
        .then(res => {
          this.props.enqueueSnackbar(`Succesfully Moved the book to cart`, {
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "success",
            persist: false,
          });
          let body = {
            user_id: user_id,
            page: 1,
          };
          this.props.GetWishlistCount();
          this.props.fetching_Wishlist({ body }).then(res => {
            // setFetch_loader(false);
            this.setState({ fetch_loader: false });
            this.generate_new_wislist_obj(res.data.data.books);
          });
          this.setState({
            showWishlist_Msg: true,
            move_id: "",
            move_cart_loader: false,
          });
          this.RefreshCart();
          this.props.GetWishlistCount();
        })
        .catch(err => {
          console.log(err);
          this.setState({ move_id: "" });
        });
    } else {
      this.setState({ move_id: wishlist.wishlist_id });
      const MyCart = {
        wishlist_id: wishlist.wishlist_id,
        user_id: this.props.getuserdetails.id,
        book_id: wishlist.book_id,
        book_inv_id: wishlist.book_inv_id,
        times: time,
        cashbackedPrice: wishlist.cashbacked_price,
        discountedPrice: wishlist.cashbacked_price,
        cashback_per: wishlist.cashback_per,
        discount_per: wishlist.discount_per,
      };
      this.props.AddingCart_Wishlist(MyCart).then(res => {
        this.props.enqueueSnackbar(`Sucessfully moved to Cart`, {
          variant: "success",
          persist: false,
        });
        this.props.GetWishlistCount();
        this.RefreshCart();
      });
    }
  };

  handleClose = () => {
    this.setState({ showWishlist_Msg: false, deleteall_snack: false });
  };
  delete_outof_stock = () => {
    let wishlistid = [];

    this.props.MyWishlist.map(data => {
      if (data.sold_out == "Y") {
        console.log(data.wishlist_id, "7777");
        wishlistid.push(data.wishlist_id);
      }
    });
    let body = {
      id: wishlistid,
    };
    let user = JSON.parse(localStorage.getItem("user_info"));
    let user_id = user.id;
    this.props.delete_wishlist({ body }).then(res => {
      this.setState({
        deleteall_snack: true,
        snack_msg: "Removed All Out Of Books",
      });
      let nbody = {
        user_id: user.id,
        page: 1,
      };
      this.props.fetching_Wishlist({ body: nbody }).then(res => {
        this.setState({ fetch_loader: false, moveall_loader: false });
      });
      this.props.GetWishlistCount();
    });
  };
  all_moveto_cart = () => {
    let user = JSON.parse(localStorage.getItem("user_info"));
    let user_id = user.id;
    this.setState({ moveall_loader: true });
    this.props.move_all_tocart(user_id).then(res => {
      this.setState({
        deleteall_snack: true,
        snack_msg: " All Books Moved To Cart Successfully",
      });
      this.setState({ fetch_loader: true });
      let body = {
        user_id: user.id,
        page: 1,
      };
      this.props.fetching_Wishlist({ body }).then(res => {
        this.setState({ fetch_loader: false, moveall_loader: false });
      });
      this.props.GetWishlistCount();
      this.RefreshCart();
    });
  };
  RedirectToNewTab = (slug, book_id) => {
    let Slug = slug.replace("/", "");
    let url = `/product/${Slug}-?${book_id}`;
    window.open(url);
  };

  handlePageClick = data => {
    let user = JSON.parse(localStorage.getItem("user_info"));
    console.log(user.id, "USER");
    let body = {
      user_id: user.id,
      page: this.state.page + 1,
    };
    let page = this.state.page + 1;
    this.props.fetching_Wishlist({ body });
    this.setState({ page: page });
  };
  uploadProfileError = e => {
    e.target.src = "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
  };
  render() {
    const { wishlist, showOutstockBtn, move_id } = this.state;
    const { MyWishlist } = this.props;
    console.log(MyWishlist,"2563351");
    return (
      <div className='container ' style={{ padding: "0px" }}>
        {/* **************Upper line************************* */}
        <div className='bg row  g-0 d-flex justify-content-between  p-md-2 px-3 shadow rounded'>
          <div className='text-white col-12 col-md-2 py-1 p-md-0 pt-md-2 '>
            <h5>My Wishlist</h5>
          </div>
          <div className=' col-10 d-none d-md-flex justify-content-end'>
            {this.props.inStock_Wish_count ? (
              this.state.moveall_loader ? (
                <Button
                  color='btn_white'
                  className='mr-3'
                  variant='outlined'
                  style={{
                    textTransform: "None",
                    width: "13.5rem",
                    minHeight: "2.4rem",
                  }}>
                  <CircularProgress size='1.2rem' style={{ color: "white" }} />
                </Button>
              ) : wishlist.length ? (
                <Button
                  color='btn_white'
                  className='mr-3'
                  variant='outlined'
                  style={{
                    textTransform: "capitalize",
                    color: "#fff",
                    width: "15rem",
                  }}
                  onClick={() => this.all_moveto_cart()}>
                  Move All Books to Cart ({this.props.inStock_Wish_count})
                </Button>
              ) : null
            ) : null}
            {this.props.outStock_wish_count ? (
              <Button
                variant='outlined'
                color='btn_white'
                size='small'
                onClick={() => this.delete_outof_stock()}
                style={{
                  textTransform: "capitalize",
                  color: "#fff",
                  marginLeft: "0.5rem",
                }}>
                <span>
                  <DeleteIcon />
                </span>{" "}
                Remove Out of Stock ({this.props.outStock_wish_count})
              </Button>
            ) : null}
          </div>
        </div>
        {/* *********** FOR MOBILE VIEW ******************** */}
        <div className='d-block d-md-none mt-3 d-flex justify-content-evenly text-nowrap'>
          {wishlist.length ?
            <Button
              color='btn_white'
              className='mr-3 bg '
              variant='outlined'
              style={{ textTransform: "None" }}
              onClick={() => this.all_moveto_cart()}
              
              >
              Move All Books to Cart 
              ({this.props.inStock_Wish_count})
            </Button> : null
          }
        </div>
        {/* **************Lower Main div************************* */}
        <InfiniteScroll
          dataLength={wishlist.length}
          scrollThreshold={"45%"}
          className='row infinitescroll'
          style={{
            display: "flex",
            minHeight: "40vh",
            margin: "0px",
          }}
          next={() => this.handlePageClick(this.state.page)}
          hasMore={true}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          loader={
            this.state.InitalLoader ? null : this.props.ShowLoader ? (
              <div
                style={{
                  // marginLeft: "50%",
                  width: "100%",
                  marginBottom: "10%",
                  marginTop: "3rem",
                }}>
                <center>
                  <CircularProgress thickness={4} />
                </center>
              </div>
            ) : null
          }>
          <div className='pt-3 mb-5 ' style={{ padding: "0px" }}>
            {this.state.InitalLoader ? (
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <CustomLoaderBorder size={"60px"} />
              </div>
            ) : this.state.ServerError ? (
              <div>
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
                      variant='contained'
                      color='primary'
                      style={{ width: "9rem", margin: "1rem 0rem" }}
                      onClick={() => {
                        window.location.reload();
                      }}>
                      {" "}
                      Reload
                    </Button>
                  </div>
                </div>
              </div>
            ) : wishlist.length ? (
              wishlist.map((data, index) => (
                <>
                  {/* tab view to mobile view */}
                  <MediaQuery maxWidth={767}>
                    {console.log(
                      wishlist,
                      "wishlist..............................."
                    )}
                    <div
                      key={data.wishlist_id}
                      className='row g-0 bg-white  border border-gray shadow-sm mb-2 rounded  pb-2  mx-0'>
                      <div
                        title={data.title}
                        style={{ paddingLeft: '0.3rem', marginRight: '0.3rem' }}
                        className='conatiner col-3 col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 '>
                        {data.sold_out == "Y" ? (
                          <div className={`${styles.outOfStockDiv}`}>Out Of Stock</div>
                        ) : null}
                        <Image
                          height={100}
                          width={80}
                          alt='book image '
                          onClick={() =>
                            this.RedirectToNewTab(data.slug, data.book_id)
                          }
                          src={this.state.onerror && this.state.onErrorBookId.includes(data.book_id) ? "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png" : `${bucketmp6}${data.thumb}`}
                          onErrorCapture={() => {
                            let newbookIds = this.state.onErrorBookId
                            newbookIds.push(data.book_id)
                            this.setState({
                              onerror: true,
                              onErrorBookId: newbookIds
                            })
                          }}
                          // className="w-100 h-100 "
                          style={{
                            cursor: "pointer",
                            margin: '0.5rem',
                            marginTop:
                              data.sold_out == "Y" ? "-1rem" : "0.4rem",
                          }}
                        />
                      </div>
                      <div
                        style={{ fontSize: "0.9rem" }}
                        className='col-8 col-xs-8 col-sm-8  col-md-9 col-xl-9 col-lg-9  px-0 mt-2 '>
                        <span
                          className={`${styles.wishTitle}`}
                          style={{}}
                          onClick={() =>
                            this.RedirectToNewTab(data.slug, data.book_id)
                          }>
                          {data.title.replace(
                            /(\w)(\w*)/g,
                            (_, firstChar, rest) =>
                              firstChar.toUpperCase() + rest.toLowerCase()
                          )}
                        </span>

                        {data.sold_out == "N" ? (
                          <div className='price_book'>
                            {wishlist.book_type == "0" ? (
                              <div
                                style={{ fontSize: "0.9rem" }}
                                className=' p '>
                                Shipping & Handling Charges
                                <span>&#8377;{data.price}</span>
                              </div>
                            ) : (
                              <div
                                style={{ fontSize: "0.9rem" }}
                                className=' p '>
                                {data.book_type == "0" ? "Shipping and Handling Charges" : "Price"}:<span> &#8377;{data.price}</span>
                              </div>
                            )}
                          </div>
                        ) : null}

                        {data.book_type == "0" || data.book_inv_id.toString().indexOf("KOL") > -1 ? null : (
                          <div style={{ width: "5.8rem", marginTop: "0.2rem" }}>
                            <Image
                              alt='new book'
                              className={``}
                              layout='responsive'
                              src={newbook_img}
                            />
                          </div>
                        )}

                        {data.condition.length ? (
                          <div
                            style={{ fontSize: "0.9rem" }}
                            className={`${styles.book_condition} p`}>
                            <span> Selected Book Condition :</span>
                            <span>
                              {data.condition.map(cond => (
                                <span
                                  style={{
                                    marginLeft: "0.3rem",
                                    cursor: "pointer",
                                  }}
                                  className={
                                    data.selected_condition == cond.condition
                                      ? `${styles.selected_box}`
                                      : `${styles.unselected_box}`
                                  }
                                  key={cond.book_inv_id}
                                  onClick={() =>
                                    this.select_the_condition(cond, index)
                                  }>
                                  {cond.cond_name}
                                </span>
                              ))}
                            </span>
                          </div>
                        ) : null}

                        {data.cashbacked_price || data.discounted_price ? (
                          <div className='offerDiv'>
                            {data.cashbacked_price ? (
                              <div className='offer_div'>
                                {" "}
                                CASHBACK &#8377;
                                {data.price - data.cashbacked_price}
                              </div>
                            ) : (
                              <div className='offer_div'>
                                FLATOFF &#8377;
                                {data.price - data.discounted_price}
                              </div>
                            )}
                          </div>
                        ) : null}
                        {/*  ********************* using p letter in div comes from global css to change text color************ */}
                      </div>
                      <div
                        className='d-flex justify-content-end '
                        style={{ float: "left" }}>
                        <div style={{ margin: "0.5rem" }} className=''>
                          {data.sold_out == "Y" ? null : this.state
                            .move_cart_loader &&
                            this.state.move_id == data.wishlist_id ? (
                            <Button
                              className='bg mr-2'
                              variant='contained'
                              style={{ width: "9.7rem" }}>
                              <CircularProgress
                                size='1rem'
                                style={{ color: "white" }}
                              />
                            </Button>
                          ) : (
                            <Button
                              variant='contained'
                              onClick={() => this.movein_cart(data, index)}
                              color='primary'
                              size='small'
                              style={{
                                textTransform: "capitalize",
                                backgroundColor: "#2255ae",
                                width: "9.7rem",
                              }}>
                              <span>
                                <ShoppingCartIcon />
                              </span>{" "}
                              Move To Cart
                            </Button>
                          )}
                          {this.state.delbtnLoader &&
                            this.state.move_id == data.wishlist_id ? (
                            <Button
                              variant='outlined'
                              color='primary'
                              size='small'
                              style={{
                                margin: "0rem 0.5rem",
                                textTransform: "capitalize",
                                color: "#2255ae",
                                minWidth: "5.9rem",
                              }}>
                              <CircularProgress size={18} />
                            </Button>
                          ) : (
                            <Button
                              variant='outlined'
                              onClick={() =>
                                this.updateWishlist(data.wishlist_id)
                              }
                              color='primary'
                              size='small'
                              style={{
                                margin: "0rem 0.5rem",
                                textTransform: "capitalize",
                                color: "#2255ae",
                                minWidth: "5.9rem",
                              }}>
                              <span>
                                <DeleteIcon />
                              </span>{" "}
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </MediaQuery>
                  {/* Desktop view */}
                  <MediaQuery minWidth={768}>
                    {console.log(
                      wishlist,
                      "wishlist...............................mm"
                    )}
                    <div>
                      <div
                        key={data.wishlist_id}
                        className='row g-0 bg-white  border border-gray shadow-sm mb-2 rounded p-1 pb-2  mx-0'>
                        <div
                          title={data.title}
                          style={{ paddingLeft: "1rem" }}
                          className=' col-3 col-lg-2 col-xl-2'>
                          {data.sold_out == "Y" ? (
                            <div className={`${styles.outOfStockDiv}`}>
                              <span>Out Of Stock</span>
                            </div>
                          ) : null}

                          <Image
                            height={100}
                            width={80}
                            alt='book image'
                            onClick={() =>
                              this.RedirectToNewTab(data.slug, data.book_id)
                            }
                            src={this.state.onerror && this.state.onErrorBookId.includes(data.book_id) ? "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png" : `${bucketmp6}${data.thumb}`}
                            onError={() => {
                              let newbookIds = this.state.onErrorBookId
                              newbookIds.push(data.book_id)
                              this.setState({
                                onerror: true,
                                onErrorBookId: newbookIds
                              })
                            }}
                            // className="w-100 h-100 "
                            style={{
                              cursor: "pointer",

                              marginTop:
                                data.sold_out == "Y" ? "-1.3rem" : null,
                            }}
                          />
                        </div>
                        <div
                          style={{ fontSize: "0.9rem" }}
                          className='  col-9 col-xl-10 col-lg-10 pl-3 pt-1'>
                          <span
                            className={`${styles.wishTitle}`}
                            style={{}}
                            onClick={() =>
                              this.RedirectToNewTab(data.slug, data.book_id)
                            }>
                            {data.title.replace(
                              /(\w)(\w*)/g,
                              (_, firstChar, rest) =>
                                firstChar.toUpperCase() + rest.toLowerCase()
                            )}
                          </span>

                          {data.sold_out == "N" ? (
                            <div className='price_book'>
                              {wishlist.book_type == "0" ? (
                                <div
                                  style={{ fontSize: "0.9rem" }}
                                  className=' p '>
                                  Shipping & Handling Charges
                                  <span>&#8377;{data.price}</span>
                                </div>
                              ) : (
                                <div
                                  style={{ fontSize: "0.9rem" }}
                                  className=' p '>
                                  {data.book_type == "0" ? "Shipping and Handling Charges" : "Price"}<span> &#8377;{data.price}</span>
                                </div>
                              )}
                            </div>
                          ) : null}

                          {data.book_type == "0" || data.book_inv_id.toString().indexOf("KOL") > -1 ? null : (
                            <div
                              style={{ width: "5.8rem", marginTop: "0.2rem" }}>
                              <Image
                                alt='new book'
                                className={``}
                                layout='responsive'
                                src={newbook_img}
                              />
                            </div>
                          )}

                          {data.condition.length ? (
                            <div
                              style={{ fontSize: "0.9rem" }}
                              className={`${styles.book_condition} p`}>
                              Selected Book Condition :
                              <span>
                                {data.condition.map(cond => (
                                  <span
                                    style={{
                                      marginLeft: "0.3rem",
                                      cursor: "pointer",
                                    }}
                                    className={
                                      data.selected_condition == cond.condition
                                        ? `${styles.selected_box}`
                                        : `${styles.unselected_box}`
                                    }
                                    key={cond.book_inv_id}
                                    onClick={() =>
                                      this.select_the_condition(cond, index)
                                    }>
                                    {cond.cond_name}
                                  </span>
                                ))}
                              </span>
                            </div>
                          ) : null}

                          {data.cashbacked_price || data.discounted_price ? (
                            <div className='offerDiv'>
                              {data.cashbacked_price ? (
                                <div className='offer_div'>
                                  {" "}
                                  CASHBACK &#8377;
                                  {data.price - data.cashbacked_price}
                                </div>
                              ) : (
                                <div className='offer_div'>
                                  FLATOFF &#8377;
                                  {data.price - data.discounted_price}
                                </div>
                              )}
                            </div>
                          ) : null}
                          {/*  ********************* using p letter in div comes from global css to change text color************ */}

                          <div
                            className='d-flex justify-content-between'
                            style={{
                              float: data.sold_out == "Y" ? null : "right",
                            }}>
                            <div
                              style={{
                                marginTop: "0.5rem",
                                textAlign: "right",
                              }}
                              className=''>
                              {data.sold_out == "Y" ? null : this.state
                                .move_cart_loader &&
                                this.state.move_id == data.wishlist_id ? (
                                <Button
                                  className='bg mr-2'
                                  variant='contained'
                                  style={{ width: "9.7rem" }}>
                                  <CircularProgress
                                    size='1.2rem'
                                    style={{ color: "white" }}
                                  />
                                </Button>
                              ) : (
                                <Button
                                  variant='contained'
                                  onClick={() => this.movein_cart(data, index)}
                                  color='primary'
                                  size='small'
                                  style={{
                                    textTransform: "capitalize",
                                    backgroundColor: "#2255ae",
                                    width: "9.7rem",
                                  }}>
                                  <span>
                                    <ShoppingCartIcon />
                                  </span>{" "}
                                  Move To Cart
                                </Button>
                              )}
                              {this.state.delbtnLoader &&
                                this.state.move_id == data.wishlist_id ? (
                                <Button
                                  variant='outlined'
                                  color='primary'
                                  size='small'
                                  style={{
                                    margin:
                                      data.sold_out == "Y"
                                        ? null
                                        : "0rem 0.5rem",
                                    textTransform: "capitalize",
                                    color: "#2255ae",
                                    minWidth: "5.9rem",
                                  }}>
                                  <CircularProgress size={18} />
                                </Button>
                              ) : (
                                <Button
                                  variant='outlined'
                                  onClick={() =>
                                    this.updateWishlist(data.wishlist_id)
                                  }
                                  color='primary'
                                  size='small'
                                  style={{
                                    margin:
                                      data.sold_out == "Y"
                                        ? null
                                        : "0rem 0.5rem",
                                    textTransform: "capitalize",
                                    color: "#2255ae",
                                    minWidth: "5.9rem",
                                  }}>
                                  <span>
                                    <DeleteIcon />
                                  </span>{" "}
                                  Remove
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MediaQuery>
                </>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "2rem 0rem" }}>
                <InboxIcon style={{ fontSize: "5rem" }} />

                <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  {" "}
                  Empty Wishlist
                </div>
                <p>There are no books added in your Wishlist.</p>
                <div>
                  <Link href='/' legacyBehavior>
                    <Button
                      variant='contained'
                      color='primary'
                      style={{
                        width: "9rem",
                        margin: "1rem 0rem",
                        textTransform: "capitalize",
                        backgroundColor: "#2255ae",
                      }}>
                      {" "}
                      Start Adding
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </InfiniteScroll>
        <style jsx>
          {`
          `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  book: state.compExam.book,
  getuserdetails: state.userdetailsR.getuserdetails,
  userComponentStatus: state.accountR.userComponentStatus,
  MyWishlist: state.cartReduc.MyWishlist,
  ShowLoader: state.cartReduc.ShowLoader,
  move_cart_loader: state.cartReduc.move_cart_loader,
  inStock_Wish_count: state.wishlistR.inStock_Wish_count,
  outStock_wish_count: state.wishlistR.outStock_wish_count,
});

const mapDispatchToProps = dispatch => {
  return {
    CartopenModal: () => dispatch(CartopenModal()),
    CartSession: () => dispatch(CartSession()),
    fetching_Wishlist: ({ body }) => dispatch(fetching_Wishlist({ body })),
    Update_wishlist: ({ body, token }) =>
      dispatch(Update_wishlist({ body, token })),
    AddingCart_Wishlist: Mycart => dispatch(AddingCart_Wishlist(Mycart)),
    delete_wishlist: ({ body }) => dispatch(delete_wishlist({ body })),
    move_all_tocart: user_id => dispatch(move_all_tocart(user_id)),
    GetWishlistCount: () => dispatch(GetWishlistCount()),
    check_book_incart: () => dispatch(check_book_incart())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Wishlist));
