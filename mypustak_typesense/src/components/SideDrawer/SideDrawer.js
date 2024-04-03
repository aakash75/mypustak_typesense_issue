import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "../../styles/SideDrawer.module.css";
import new_book from "../../assets/newBookIcon.svg";
import used_book from "../../assets/usedbook.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { removeCartBookFromLocalStorage } from "../../helper/helpers";
import {
  login_backdropToggle,
  setComponentStatus,
} from "../../redux/actions/accountAction";
import {
  CartopenModal,
  check_book_incart,
  RemoveCart,
  removeFromCartLogout,
  updateCartlocalStorage,
} from "../../redux/actions/cartAction";
import { CartSession } from "../../redux/actions/cartAction";
import {
  Snackbar,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  SwipeableDrawer,
} from "@mui/material";
import Image from "next/legacy/image";
class SideDrawer extends Component {
  state = {
    openDialog: false,
    bookinvetry: " ",
    cartid: " ",
    componentMounted: false,
    del_cart_loader: false,
    del_cart_err: false,
    ErrorMessage: "",
    cart_loader: false,
  };
  componentDidMount() {
    this.setState({ componentMounted: true });
    this.props.setComponentStatus(1);
    if (false) {
      this.props.updateCartlocalStorage();
    }
    if (true) {
      this.setState({ cart_loader: true });

      this.props
        .CartSession()
        .then((res) => {
          this.setState({ cart_loader: false });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ cart_loader: false });
        });
      this.props.SaveLate;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.show !== this.props.show) {
      if (this.props.show) {
        this.setState({ cart_loader: true });

        this.props
          .CartSession()
          .then((res) => {
            this.setState({ cart_loader: false });
          })
          .catch((err) => {
            console.log(err);
            this.setState({ cart_loader: false });
          });
      }
    }
  }

  RemoveFromCart = async (bookInvId, Cart_id) => {
    this.setState({ del_cart_loader: true });
    removeCartBookFromLocalStorage(bookInvId);
    let res;
    if (this.props.userComponentStatus != 2) {
      res = await this.props.removeFromCartLogout(bookInvId);

      this.setState({ del_cart_loader: false });
    } else {
      // alert('Y');
      const data = { is_deleted: "Y" };

      res = await this.props.RemoveCart(Cart_id, bookInvId, data);
      if (!res) {
        this.setState({
          del_cart_err: true,
          ErrorMessage:
            "Book Not Deleted From Cart Please Refresh The Page Or Conatct Mypustak Support",
        });
      }
      this.props.check_book_incart();
    }
    this.closeDialog();
    this.setState({ del_cart_loader: false });
  };
  CheckLogin = () => {
    this.props.CartopenModal();

    if (this.props.userToken === null) {
      window.location.replace("/account/Loginpage?ret=/view-cart");
      // }
    } else {
      window.location.replace("/view-cart");
    }
  };
  closeSideDrawer = () => {
    this.props.CartopenModal();
  };

  closeDialog = () => {
    this.setState({ openDialog: false });
  };

  ConfRemoveFromCart = (bookInvId, Cart_id) => {
    this.setState({
      bookinvetry: bookInvId,
      cartid: Cart_id,
      openDialog: true,
    });
  };

  rerendercond = (condition) => {
    if (condition == "AverageButInReadableCondition") {
      return "Readable";
    } else {
      return condition;
    }
  };

  handleClose = () => {
    this.setState({ del_cart_err: false });
  };
  render() {
    // console.log(this.props.show,"cart")
    const { cartDetails } = this.props;
    console.log(cartDetails, "CartDeatils,");
    const { del_cart_loader, ErrorMessage } = this.state;
    let drawerClasses = "side-Drawer";
    var ShipCost = 0;
    // console.log(this.props.show, 'show');

    if (this.props.show) {
      // alert(this.props.show)
      drawerClasses = "side-Drawer open";
    }

    cartDetails.map((cart) => (ShipCost += Number(cart.bookShippingCost)));
    return (
      <React.Fragment>
        <div>
          <SwipeableDrawer
            anchor="right"
            open={this.props.show}
            swipeAreaWidth={0}
            onClose={this.closeSideDrawer}
            style={{ border: "1px solid blue", zIndex: "3000" }}
            onOpen={() => {}}
          >
            <div className={`${styles.Maincartbody}`}>
              <div
                className={`${styles.cartHeader}`}
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#fff",
                  zIndex: 500,
                }}
              >
                <div className={`${styles.cartTitle}` + " pb-2 "}>
                  <div
                    className={`${styles.cartheadericon}` + " pt-2 text-color"}
                  >
                    <span className={`${styles.icon}`}>
                      <ShoppingCartIcon style={{ fontSize: "30px" }} />
                    </span>{" "}
                    {cartDetails.length < 1 ? (
                      <span>{cartDetails.length} Book</span>
                    ) : (
                      <span>{cartDetails.length} Books</span>
                    )}
                  </div>
                  <div
                    className={`${styles.drawercloseicon}` + " pt-2"}
                    onClick={this.closeSideDrawer}
                  >
                    <CloseIcon style={{ height: "26px" }} />
                  </div>
                </div>
              </div>
              <Divider />

              <div
                id="BgCartPopupScroll"
                className={`${styles.cartbookDetailsScroll}`}
                style={{ marginBottom: "1rem" }}
              >
                {this.state.cart_loader ? (
                  <center style={{ marginTop: "2rem" }}>
                    <CircularProgress size="2.5rem" />
                  </center>
                ) : (
                  cartDetails
                    .map((cart) => (
                      <div
                        className={`${styles.CartBody}`}
                        key={cart.bookInvId}
                      >
                        <React.Fragment>
                          <div id="ribbonn">
                            <span
                              id={
                                cart.bookInvId.toString().indexOf("NB") > -1
                                  ? cart.bookInvId != "NB1441502"
                                    ? "ribbonnSpanNew"
                                    : ""
                                  : "ribbonnspan_old"
                              }
                            >
                              {cart.bookInvId.toString().indexOf("NB") > -1 &&
                              cart.bookInvId != "NB1441502"
                                ? ``
                                : ``}
                            </span>
                          </div>

                          <img
                            alt="book"
                            src={`https://d1f2zer3rm8sjv.cloudfront.net/${cart.bookThumb}`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";

                              // "https://mypustak-6.s3.amazonaws.com/books/medium/book_default.jpeg"
                            }}
                            style={{}}
                          />
                        </React.Fragment>
                        <div id="BgCartBookData">
                          <div className={`${styles.CartBookName}` + " mb-2"}>
                            <span id="" style={{ textTransform: "capitalize" }}>
                              {cart.bookName}
                            </span>
                          </div>
                          <div id="BgCartBookCondPrice">
                            <div id="BgCartBookprice">
                              <div id="mrptag" className="d-flex ">
                                <div>
                                  <span id="mrp" className="text-success">
                                    MRP:&nbsp;
                                    {cart.bookInvId ? (
                                      cart.bookInvId.toString().indexOf("KOL") >
                                      -1 ? (
                                        <span id="orgprice">
                                          <span
                                            style={{
                                              fontWeight: "normal",
                                              textDecoration: "line-through",
                                            }}
                                          >
                                            {" "}
                                            &#8377;{Math.round(cart.bookPrice)}
                                          </span>{" "}
                                          &nbsp;
                                          <b>
                                            &#8377;
                                            {Math.round(
                                              cart.bookShippingCost
                                            )}{" "}
                                            &nbsp;
                                          </b>
                                          {cart.bookInvId ==
                                          "NB1441502" ? null : (
                                            <>
                                              <span className="pl-2"></span>
                                            </>
                                          )}
                                        </span>
                                      ) : cart.bookInvId
                                          .toString()
                                          .indexOf("NB") > -1 ? (
                                        <span id="orgprice">
                                          <span
                                            style={
                                              cart.offertype === "discount"
                                                ? {
                                                    textDecoration:
                                                      "line-through",
                                                  }
                                                : { fontWeight: "normal" }
                                            }
                                          >
                                            {" "}
                                            &#8377;{Math.round(cart.bookPrice)}
                                          </span>{" "}
                                          &nbsp;
                                          <b>
                                            &#8377;
                                            {Math.round(
                                              cart.bookShippingCost
                                            )}{" "}
                                            &nbsp;
                                          </b>
                                          {cart.bookInvId ==
                                          "NB1441502" ? null : (
                                            <>
                                              <span className="pl-2"></span>
                                            </>
                                          )}
                                        </span>
                                      ) : (
                                        // <span id="orgprice"> &#8377;<strike>{Math.round(cart.bookPrice ) }</strike> </span>
                                        <span id="orgprice">
                                          {" "}
                                          &#8377;
                                          <strike>
                                            {Math.round(cart.bookPrice)}
                                          </strike>
                                          <span style={{ color: "green" }}>
                                            &nbsp; (Free)&nbsp;
                                          </span>
                                        </span>
                                      )
                                    ) : null}
                                  </span>
                                </div>
                                <div style={{ width: "4rem" }}>
                                  {cart.bookInvId.toString().indexOf("KOL") >
                                  -1 ? null : cart.bookInvId
                                      .toString()
                                      .indexOf("NB") > -1 ? (
                                    <Image src={new_book} alt="" />
                                  ) : (
                                    <Image src={used_book} alt="" />
                                  )}
                                </div>
                                <div
                                  style={{ position: "absolute", right: 20 }}
                                  className={`${styles.deletecartitem}`}
                                >
                                  <CloseIcon
                                    style={{ fontSize: "17px" }}
                                    className=""
                                    data-pid={cart.bookId}
                                    onClick={() =>
                                      this.ConfRemoveFromCart(
                                        cart.bookInvId,
                                        cart.Cart_id
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div id="bookcond">
                                {cart.bookInvId ? (
                                  cart.bookInvId.toString().indexOf("KOL") >
                                  -1 ? (
                                    <span className="text-success">
                                      Free Delivery
                                    </span>
                                  ) : cart.bookInvId.toString().indexOf("NB") >
                                    -1 ? (
                                    cart.delivery_cost ? (
                                      <div>
                                        Delivery cost : &#8377;
                                        {cart.delivery_cost}
                                      </div>
                                    ) : null
                                  ) : (
                                    `Book Condition :`
                                  )
                                ) : null}
                                {this.rerendercond(cart.bookCond)}
                                <label id="newprice" />
                              </div>

                              <div id="shippingCost">
                                {" "}
                                <span id="BgCartBookshipping">
                                  {cart.bookInvId ? (
                                    cart.bookInvId.toString().indexOf("KOL") >
                                    -1 ? (
                                      <div>
                                        <div>
                                          <span>Quantity:{cart.bookQty}</span>
                                        </div>
                                        <div
                                          className={`${styles.cartbookprice}`}
                                        >
                                          <div
                                            className={`${styles.cartbookpricetype}`}
                                          >
                                            Total Amount&nbsp;
                                          </div>
                                          <div
                                            className={
                                              `${styles.bookpriceprint}` +
                                              " ml-5 "
                                            }
                                          >
                                            &#8377;
                                            {Math.round(cart.bookShippingCost) +
                                              cart.delivery_cost}
                                          </div>
                                        </div>
                                      </div>
                                    ) : cart.bookInvId
                                        .toString()
                                        .indexOf("NB") > -1 ? (
                                      <div
                                        className={`${styles.cartbookprice}`}
                                      >
                                        <div
                                          className={`${styles.cartbookpricetype}`}
                                        >
                                          Total Amount&nbsp;
                                        </div>
                                        <div
                                          className={
                                            `${styles.bookpriceprint}` +
                                            " ml-5 "
                                          }
                                        >
                                          &#8377;
                                          {Math.round(cart.bookShippingCost) +
                                            cart.delivery_cost}
                                        </div>
                                      </div>
                                    ) : (
                                      <div
                                        className={
                                          `${styles.cartbookprice}` + ""
                                        }
                                      >
                                        <div
                                          className={`${styles.cartbookpricetype}`}
                                        >
                                          Shipping Handling Charge
                                        </div>
                                        <div
                                          className={
                                            `${styles.bookpriceprint}` +
                                            " ml-5 "
                                          }
                                        >
                                          &nbsp; &#8377;
                                          {Math.round(cart.bookShippingCost)}
                                        </div>
                                      </div>
                                    )
                                  ) : null}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                    .reverse()
                )}

                {cartDetails.length == 0 ? (
                  <div className={`${styles.cartmsg}`}>
                    Looks Like Your Cart is Empty
                    <div>Keep Shopping</div>
                  </div>
                ) : null}
              </div>
              {cartDetails.length == 0 ? null : (
                <div className="" style={{}}>
                  <div
                    className={`${styles.checkoutdiv}`}
                    onClick={() => this.CheckLogin()}
                  >
                    <div className={`${styles.checkoutbtn}`}>
                      {" "}
                      Proceed to cart
                    </div>
                    <div className={`${styles.checkoutamount}`}>
                      {" "}
                      &#8377;{ShipCost}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </SwipeableDrawer>

          <Dialog
            open={this.state.openDialog}
            onClose={this.closeDialog}
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
                style={{
                  justifyContent: "center",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                <Button
                  style={{ textTransform: "capitalize" }}
                  onClick={() => this.closeDialog()}
                  variant="outlined"
                  color="primary"
                >
                  No
                </Button>
                <Button
                  style={{ textTransform: "capitalize", minWidth: "6.8rem" }}
                  disabled={del_cart_loader}
                  onClick={() =>
                    this.RemoveFromCart(
                      this.state.bookinvetry,
                      this.state.cartid
                    )
                  }
                  variant="contained"
                  color="primary"
                >
                  {del_cart_loader ? `Removing` : `Yes`}
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

          <style jsx>{``}</style>

          {/* Snackbar */}
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={this.state.del_cart_err}
            // autoHideDuration={4000}
            onClose={this.handleClose}
            message={`${ErrorMessage}`}
          />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  userToken: state.accountR.token,
  ErrMsg: state.accountR.ErrMsg,
  cartDetails: state.cartReduc.MyCart,
  PopupCart: state.cartReduc.PopupCart,
  ItemsInCart: state.cartReduc.cartLength,

  ClickedCategory: state.homeR.ClickedCategory,

  CartSessionData: state.cartReduc.CartSessionData,
  ToBeAddedToCartState: state.cartReduc.ToBeAddedToCartState,
  cartRedirectMobile: state.cartReduc.cartRedirectMobile,
  userComponentStatus: state.accountR.userComponentStatus,
});

export default connect(mapStateToProps, {
  removeFromCartLogout,
  RemoveCart,
  login_backdropToggle,
  CartopenModal,
  CartSession,
  updateCartlocalStorage,
  setComponentStatus,
  check_book_incart,
})(SideDrawer);
