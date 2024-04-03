import {
  ADDTOCART,
  POPUPCART,
  closePOPUPCART,
  REMOVECART,
  CARTSESSION,
  SAVELATER,
  REMOVEALLCART,
  REDIRECTWALLETTOCART,
  TOBEADDEDTOCART,
  REMOVETOBEADDEDTOCART,
  REMOVECARTLOGOUT,
  MOBILECARTREDIRECT,
  SHOWRZPAYERR,
  ADDCARTPRICE,
  SENDADDRESSId,
  ORDERDETAILS,
  SETORDERID,
  WALLETRAZORPAY,
  UPDATEORDERSUCC,
  PAYPALLERROR,
  OUTOFSTOCK,
  CANCELORDER,
  UPDATECART,
  DEDUCTCASHBACK,
  OFFERBOOK,
  ORDEROFFERBOOK,
  COUPON,
  REDEEMCOUPON,
  RESETCOUPON,
  UNMOUNTPRODUCT,
  ADDTOCARTATLOGIN,
  FETCHING_CART,
  FETCHING_CART_ERR,
  ADDRESS_SLIDER,
  UPDATE_CART_FROM_LOCALSTORAGE,
  UPDATEEXISTINGCARTPRODUCT,
  RESET_OUT_OF_STOCK_BOOKS,
  ADDWISHLIST,
  FETCH_WISHLOADER,
  FETCHING_WISHLIST,
  UPDATE_WISHLIST,
  ADDINGCART_WISHLIST,
  MOVE_CART_LOADER,
  REMOVE_WISHLIST,
  DELETE_WISHLIST,
  DELETE_ALL,
  IS_OFFER_BOOK,
  UPDATE_WISHLIST_CONDITION,
  APPLY_COUPONCODE,
  FETCHING_CART_PER_PAGE,
  CARTSESSION_PER_PAGE,
  FETCHING_CART_ERR_PER_PAGE,
  CHECK_BOOK_INCART,
  SETBOOKFORPOPUPMSG,
  ClEARBOOKFORPOPUPMSG,
  FREEBIE_DATA,
  FREEBIE_LOADER
} from "../constants/types.js";
// import config from "react-global-configuration";
import axios from "axios";
import { AuthInstance, url } from "../../helper/api_url";

import { encryptor } from "../../helper/crypto.js";

import {
  AddToLocalstorage,
  readCartLocalStorage,
  removeCartBookFromLocalStorage,
} from "../../helper/helpers.js";

export const AddToCart = (cart) => (dispatch) => {
  AddToLocalstorage(cart);
  dispatch({
    type: ADDTOCART,
    payload: cart,
  });
};

export const MobileCartRedirect = () => (dispatch) => {
  // alert("cartAcc")
  dispatch({
    type: MOBILECARTREDIRECT,
    // payload:data
  });
};

export const ToBeAddedToCart = (data) => (dispatch) => {
  // alert("cartAcc")
  dispatch({
    type: TOBEADDEDTOCART,
    payload: data,
  });
};

export const orderUpdateSucc = () => (dispatch) => {
  // alert("cartAcc")
  dispatch({
    type: UPDATEORDERSUCC,
    // payload:data
  });
};

export const RemoveToBeAddedToCart = (data) => (dispatch) => {
  // alert("cartAcc")
  dispatch({
    type: TOBEADDEDTOCART,
    // payload:data
  });
};
export const CartopenModal = () => (dispatch) => {
  // alert("cartAcc")
  dispatch({
    type: POPUPCART,
    payload: true,
  });
};

export const AddressDialog = () => (dispatch) => {
  // alert("h")
  dispatch({
    type: ADDRESS_SLIDER,
    payload: true,
  });
};

export const removeAllCart = () => (dispatch) => {
  // alert("rmAcc")
  sessionStorage.clear();
  dispatch({
    type: REMOVEALLCART,
  });
};

export const RemoveCart = (Cart_id, bookInvId, data, token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const header = {
      headers: { Authorization: `JWT ${token}` },
    };

    token
      ? axios
        .patch(`${url}/common/deleteCart/${Cart_id}/`, data, header)
        .then((res) => {
          if ("is_deleted" in data) {
            removeCartBookFromLocalStorage(bookInvId);
          }
          dispatch({
            type: REMOVECART,
            payload: bookInvId,
          });

          resolve(true);
        })
        .catch((err) => {
          console.log(err, "RemoveCart");
          resolve(false);
        })
      : AuthInstance.patch(`${url}/common/deleteCart/${Cart_id}/`, data)
        .then((res) => {
          if ("is_deleted" in data) {
            removeCartBookFromLocalStorage(bookInvId);
          }
          dispatch({
            type: REMOVECART,
            payload: bookInvId,
          });

          resolve(true);
        })
        .catch((err) => {
          console.log(err, "RemoveCart");
          resolve(false);
        });
  });
};
export const UpdateCartItem =
  (Cart_id, bookInvId, data, token) => (dispatch) => {
    return new Promise((resolve, reject) => {
      const header = {
        headers: { Authorization: `JWT ${token}` },
      };

      token
        ? axios
          .patch(`${url}/common/deleteCart/${Cart_id}/`, data, header)
          .then((res) => {
            // if ("is_deleted" in data) {
            //   removeCartBookFromLocalStorage(bookInvId);
            // }
            // dispatch({
            //   type: REMOVECART,
            //   payload: bookInvId,
            // });

            resolve(true);
          })
          .catch((err) => {
            console.log(err, "RemoveCart");
            resolve(false);
          })
        : AuthInstance.patch(`${url}/common/deleteCart/${Cart_id}/`, data)
          .then((res) => {
            // if ("is_deleted" in data) {
            //   removeCartBookFromLocalStorage(bookInvId);
            // }
            // dispatch({
            //   type: REMOVECART,
            //   payload: bookInvId,
            // });

            resolve(true);
          })
          .catch((err) => {
            console.log(err, "RemoveCart");
            resolve(false);
          });
    });
  };
export const UpdateCart = (Cart_obj) => (dispatch) => {
  return new Promise((resolve, reject) => {
    AuthInstance.patch(
      `${url}/common/updateCart/${Cart_obj.Cart_id}/`,
      Cart_obj
    )
      .then((res) => {
        // console.log(res, 'UpdateCart');

        dispatch({
          type: UPDATECART,
          payload: Cart_obj.bookInvId,
        });
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const CartcloseModal = () => (dispatch) => {
  // alert("cartAcc")
  dispatch({
    type: closePOPUPCART,
    payload: false,
  });
};

export const removeFromCartLogout = (bookInvId) => (dispatch) => {
  new Promise((resolve, reject) => {
    // alert("cartAcc")
    dispatch({
      type: REMOVECARTLOGOUT,
      payload: bookInvId,
    });

    resolve(true);
  });
};
export const AddPriceCart = (data) => (dispatch) => {
  // console.log(data,"data fro razorpay btn");

  dispatch({
    type: ADDCARTPRICE,
    payload: data,
  });
};

export const DeductCashback = (priceDeducted) => (dispatch) => {
  // console.log(priceDeducted, 'cashback to be deducted');

  dispatch({
    type: DEDUCTCASHBACK,
    payload: priceDeducted,
  });
};

export const SendAddressId = (data) => (dispatch) => {
  // alert(data);

  dispatch({
    type: SENDADDRESSId,
    payload: data,
  });
};

export const OrderDetails = (data, token, walletRazorpay) => (dispatch) => {
  return new Promise((resolve, reject) => {
    console.log("adding Order", data);

    const order_data_body = { body: encryptor(data) };

    AuthInstance.post(`${url}/api/v1/post/order_details/v2`, order_data_body)
      .then((res) => {
        dispatch({
          type: ORDERDETAILS,
          payload: res.data,
        });

        resolve(res.data);
        // ForWalletRzpNoCashback()
        // if(walletRazorpay)
        // {
        //     ForWalletRzpNoCashback()
        // }
      })
      .catch((err) => {
        // console.log(err, data, err.status);
        // if (err.response.status == 406) {
        console.log(err.response.data);

        dispatch({
          type: OUTOFSTOCK,
          payload: err.response.data,
        });
        // }
        resolve(false);
      });
  });
};

const ForWalletRzpNoCashback = () => {
  alert("ForWalletRzpNoCashback");
};

export const SetOrderId = () => (dispatch) => {
  // alert("cartAcc")
  dispatch({
    type: SETORDERID,
  });
};
// console.log(NewTotalPaymet,TotalPayment,this.props.walletbalance);
export const walletRazorpay = (data) => (dispatch) => {
  // console.log(data);

  dispatch({
    type: WALLETRAZORPAY,
    payload: data,
  });
};

export const RedirectWalletToCart = () => (dispatch) => {
  // alert("cartAcc")
  dispatch({
    type: REDIRECTWALLETTOCART,
    // payload:TR
  });
};

export const CartSession = (token) => (dispatch) => {
  dispatch({
    type: FETCHING_CART,
    payload: {},
  });
  // alert(token);
  console.log('Cart Session---------------------------------------------------------');
  const header = {
    headers: { Authorization: `JWT ${token}` },
  };
  return new Promise((resolve, reject) => {
    token
      ? axios
        // .get(`${url}/common/cart_items/`, header)
        .get(`${url}/common/cart_itemsV2`, header)
        .then((res) => {
          // alert("action")
          console.log(res.data.items, "363 cart_itemsV2");
          dispatch({
            type: CARTSESSION,
            payload: res.data.items,
          });
          // console.log(res, '368 CartSession');
          resolve(res.data.items);
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: FETCHING_CART_ERR,
            payload: {},
          });
          reject(err);
        })
      : // : AuthInstance.get(`${url}/common/cart_items/`)
      AuthInstance.get(`${url}/common/cart_itemsV2`)
        .then((res) => {
          // alert("action")
          dispatch({
            type: CARTSESSION,
            payload: res.data.items,
          });
          console.log(res.data.items, "387 cart_itemsV2 else");
          // console.log(res, 'CartSession');
          resolve(res.data.items);
        })
        .catch((err) => {
          console.log(err , "error 396");
          dispatch({
            type: FETCHING_CART_ERR,
            payload: {},
          });
          reject(err);
        });
  });
};

export const CartSessionPerPage = (token, pg) => (dispatch) => {
  dispatch({
    type: FETCHING_CART_PER_PAGE,
    payload: {},
  });
  // alert(token);
  // console.log('Cart Session---------------------------------------------------------');
  const header = {
    headers: { Authorization: `JWT ${token}` },
  };
  return new Promise((resolve, reject) => {
    token
      ? axios
        .get(`${url}/common/cart_items_per_page/${pg}`, header)
        .then((res) => {
          // alert("action")
          dispatch({
            type: CARTSESSION_PER_PAGE,
            payload: res.data.items,
          });
          // console.log(res, 'CartSession');
          resolve(res.data.items);
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: FETCHING_CART_ERR_PER_PAGE,
            payload: {},
          });
          reject(err);
        })
      : AuthInstance.get(`${url}/common/cart_items_per_page/${pg}`)
        .then((res) => {
          // alert("action")
          dispatch({
            type: CARTSESSION_PER_PAGE,
            payload: res.data.items,
          });
          console.log(res.data.items, "CartSession");
          resolve(res.data.items);
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: FETCHING_CART_ERR_PER_PAGE,
            payload: {},
          });
          reject(err);
        });
  });
};

export const SaveLater = (token) => (dispatch) => {
  dispatch({
    type: FETCHING_CART,
    payload: {},
  });
  // console.log('Cart Session---------------------------------------------------------');
  const header = {
    headers: { Authorization: `JWT ${token}` },
  };
  return new Promise((resolve, reject) => {
    token
      ? axios
        .get(`${url}/common/save_later/`, header)
        .then((res) => {
          dispatch({
            type: SAVELATER,
            payload: res.data.items,
          });
          // console.log(res, 'CartSession');
          resolve(true);
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: FETCHING_CART_ERR,
            payload: {},
          });
          resolve(false);
        })
      : AuthInstance.get(`${url}/common/save_later/`)
        .then((res) => {
          dispatch({
            type: SAVELATER,
            payload: res.data.items,
          });
          // console.log(res, 'CartSession');
          resolve(true);
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: FETCHING_CART_ERR,
            payload: {},
          });
          resolve(false);
        });
  });
};

export const ShowRzPayErr = () => (dispatch) => {
  // alert("cartAcc")
  dispatch({
    type: SHOWRZPAYERR,
    // payload:TR
  });
};

export const PapyPalError = (token, body, orderId) => (dispatch) => {
  axios
    .patch(
      `${config.get(
        "apiDomain"
      )}/api/v1/patch/add_paymentid_ordertable/update-paypal-error/${orderId}`,
      body,
      {
        // headers: {
        // 	Authorization: `Token ${token}`,
        // 	'Content-Type': 'application/json'
        // }
      }
    )
    .then((res) => {
      console.log("Updated Paypal Error");
    })
    .catch((err) => console.log(err));
};

export const OutOfStock = (token, body) => (dispatch) => {
  return new Promise((resolve, reject) => {
    AuthInstance.post(`${url}/api/v1/outOfStock/`, body, {
    })
      .then((res) => {
        dispatch({
          type: OUTOFSTOCK,
          payload: res.data,
        });
        resolve(res);
      })
      .catch((err) => {
        console.log(err, body, "err outOfStock");
        reject(err);
      });
  });
};

export const cancelOrder =
  ({ token, OrderId }) =>
    (dispatch) => {
      // console.log(OrderId, 'orderId');

      // let header = {
      // 	headers: {
      // 		Authorization: `Token ${token}`
      // 	}
      // };

      let body = {
        order_id: OrderId,
        status: 2,
      };
      return new Promise((resolve, reject) => {
        AuthInstance.patch(
          `${config.get(
            "apiDomain"
          )}/api/v1/order_details_api/update-order/${OrderId}`,
          body
        )
          .then((res) => {
            dispatch({
              type: CANCELORDER,
              payload: {},
            });
            // console.log(res.data.message, 'cancelOrder');
            resolve(res);
          })
          .catch((err) => {
            console.log(err, "cancelOrder");
            reject(err);
          });
      });
    };

export const offeredbook =
  ({ id }) =>
    (dispatch) => {
      //   alert("action")
      // let header = {
      // 	headers: {
      // 		Authorization: `${token}`
      // 	}
      // };
      // console.log(token, 'toke');
      let body = {
        id,
      };
      // console.log(ordervalue, 'ov');
      return new Promise((resolve, reject) => {
        AuthInstance.post(`${url}/common/offerbook/`, body)
          .then((res) => {
            // console.log(res, 'fetc');
            if (res.data.data.length) {
              dispatch({
                type: OFFERBOOK,
                payload: res.data.data[0],
              });
            } else {
              dispatch({
                type: OFFERBOOK,
                payload: [],
              });
            }
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    };

export const orderOfferBook =
  ({ token, orderid, id }) =>
    (dispatch) => {
      // alert("action")
      return new Promise((resolve, reject) => {
        let header = {
          headers: {
            Authorization: `${token}`,
          },
        };
        // console.log(token, 'toke');
        let body = {
          orderid,
          id,
        };
        // console.log(orderid, 'ov');
        AuthInstance.post(`${url}/common/insertOfferBook/`, body)
          .then((res) => {
            // alert("sucess insert")
            // console.log(res, 'fetc');
            dispatch({
              type: ORDEROFFERBOOK,
              payload: "",
            });
            resolve(true);
          })
          .catch((err) => {
            console.log(err);
            reject(false);
          });
      });
    };

export const couponApply =
  ({ token, coupon, userid }) =>
    (dispatch) => {
      // alert("coupon")
      let header = {
        headers: {
          Authorization: `${token}`,
        },
      };
      // console.log(header, 'head');

      let body = {
        coupon,
        userid,
      };
      return new Promise((resolve, reject) => {
        axios
          .post(`${url}/common/newcoupon/`, body)
          .then((res) => {
            // alert("sucess insert")
            // console.log(res, 'fetc');
            dispatch({
              type: COUPON,
              payload: {
                data: res.data,
                result: res.data,
              },
            });
            resolve(res.data);
          })
          .catch((err) => {
            // console.log(err.response.data, 'chherr');
            dispatch({
              type: COUPON,
              payload: {
                data: { data: 0, response: `Invalid coupon` },
                result: { result: `` },
              },
            });
            reject(err);
          });
      });
    };

export const redeemCouponAction =
  ({ couponamount }) =>
    (dispatch) => {
      dispatch({
        type: REDEEMCOUPON,
        payload: couponamount,
      });
    };

export const resetCoupon = () => (dispatch) => {
  dispatch({
    type: RESETCOUPON,
    payload: "",
  });
};

export const AddBookWhenLogin =
  ({ token, sendCartSession }) =>
    (dispatch) => {
      // console.log(`Token ${token} AddBookWhenLogin`, sendCartSession);

      AuthInstance.post(`${url}/common/addtocart/`, sendCartSession, {
        // headers: {
        // 	Authorization: `Token ${token}`
        // }
      })
        .then((res) => {
          // console.log(res.status, 'AddBookWhenLogin');
          // RefreshCart();
        })
        .catch((err) => {
          console.log(err.response.status, "AddBookWhenLogin");
          console.log(sendCartSession);
        });
    };

export const clearCartSession =
  ({ user_id, token }) =>
    (dispatch) => {
      let headers = {
        headers: {
          Authorization: `${token}`,
        },
      };

      return new Promise((resolve, reject) => {
        AuthInstance.patch(`${url}/common/ClearCartsession/${user_id}`, null)
          .then((res) => {
            // console.log(res,"clearCartSession");
            // window.sw
            resolve(true);
          })
          .catch((err) => {
            console.log(err, "clearCartSession");
            resolve(false);
          });
      });
    };

export const AddToCartLogin =
  ({ sendCartSession }) =>
    (dispatch) => {
      console.log(sendCartSession);
      // console.log(`Token ${token} AddBookWhenLogin`, sendCartSession);
      const cartSession_body = { cs: encryptor(sendCartSession) };
      return new Promise((resolve, reject) => {
        AuthInstance.post(`${url}/common/addtocart/`, cartSession_body)
          .then((res) => {
            // console.log(res.status, 'AddBookWhenLogin');
            // dispatch()
            dispatch(check_book_incart())
              .then((res) => {
                resolve(true);
              })
              .catch((err) => {
                reject(err);
              });
            // RefreshCart();
          })
          .catch((err) => {
            // console.log(err.response.status, 'AddToCartLogin');
            console.log(sendCartSession);
            reject(err);
          });
      });
    };

export const updatePaymentIdOrder =
  ({ body, token }) =>
    (dispatch) => {
      let header = {
        headers: {
          Authorization: token,
        },
      };
      // alert("Update payment");
      return new Promise((resolve, reject) => {
        AuthInstance.patch(
          `${url}/api/v1/patch/add_paymentid_ordertable/update-order/${body.OrderId}`,
          body
          // header
        )
          .then((res) => {
            // alert("update payment then");
            // console.log({ res });
            resolve(true);
          })
          .catch((err) => {
            // alert("err");
            console.log({ err });
            reject(err);
          });
      });
    };

export const walletOrder =
  ({ body, token }) =>
    (dispatch) => {
      let header = {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      };
      const enc_body = { body: encryptor(body) };

      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/v1/wallet-recharge-withdrawal/add-wallet/web`,
          enc_body
        )
          .then((res) => {
            // console.log('Wallet Transaction Done ');
            // this.setState({ SuccessWalletAdded: true });
            // this.setState({ GotOThankYou: true });
            resolve(true);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    };

export const updateCartlocalStorage = () => (dispatch) => {
  let all_cart_from_local = [];
  let lcart_data = readCartLocalStorage();
  // console.log({ lcart_data });
  if (lcart_data != []) {
    all_cart_from_local = lcart_data;
  }

  dispatch({
    type: UPDATE_CART_FROM_LOCALSTORAGE,
    payload: {
      MyCart: all_cart_from_local,
      cartLength: all_cart_from_local.length,
    },
  });
};

export const getEstDeliveryDate =
  ({ pincode, wt }) =>
    (dispatch) => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "https://apiv2.shiprocket.in/v1/external/auth/login?email=office@mypustak.com&password=Don@te98"
          )
          .then((res) => {
            const RSheader = {
              headers: {
                Authorization: `Bearer ${res.data.token}`,
              },
            };
            const orderType = 0; // For Cod pass 1 else prepaid pass 0
            axios
              .get(
                `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=700136&delivery_postcode=${pincode}&cod=${orderType}&weight=${0.5}`,
                RSheader
              )
              .then((res) => {
                // console.log({ res });
                if (res.data.status == 404) {
                  reject({ msg: res.data.message, showErr: 1 });
                }
                const fetchedData = res.data.data.available_courier_companies;
                if (fetchedData) {
                  let sortedData = fetchedData.sort((a, b) => a.rate - b.rate);
                  // console.log({ sortedData });
                  resolve(sortedData[0]);
                } else {
                  reject({ msg: "", showErr: 0 });
                }
              })
              .catch((err) => {
                reject({ msg: err, showErr: 0 });
              });
          })
          .catch((err) => {
            // console.log({err},"GetRecketShip");
            reject({ msg: err, showErr: 0 });
          });
      });
    };

export const UpdateAlreadyAddedProduct = (productDetails) => (dispatch) => {
  AddToLocalstorage(productDetails);

  dispatch({
    type: UPDATEEXISTINGCARTPRODUCT,
    payload: productDetails,
  });
};

export const ResetOutStockList = () => {
  return {
    type: RESET_OUT_OF_STOCK_BOOKS,
  };
};

export const Adding_Wishlist = (wish_data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    AuthInstance.post(`${url}/api/wishlisting/AddingWishlist`, wish_data)
      .then((res) => {
        console.log(res.data, "566699");
        dispatch({
          type: ADDWISHLIST,
          payload: { data: res.data, book_id: wish_data.book_id },
        });
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const Adding_Wishlist_fromcart = (wish_data) => (dispatch) => {
  // alert("2")
  return new Promise((resolve, reject) => {
    AuthInstance.post(
      `${url}/api/wishlisting/AddingWishlist_fromcart`,
      wish_data
    )
      .then((res) => {
        console.log(res.data, "566699");
        dispatch({
          type: ADDWISHLIST,
          payload: { data: res.data, book_id: wish_data.book_id },
        });
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const fetching_Wishlist =
  ({ body }) =>
    (dispatch) => {
      console.log(body, "12565", body.page);
      dispatch({
        type: FETCH_WISHLOADER,
        payload: "",
      });
      return new Promise((resolve, reject) => {
        axios
          .post(`${url}/api/wishlisting/Fetching_Wishlist/${body.page}`, body)
          .then((res) => {
            console.log(res.data.data, "555");
            dispatch({
              type: FETCHING_WISHLIST,
              payload: { data: res.data.data, page: body.page },
            });
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    };

export const Update_wishlist =
  ({ body, token }) =>
    (dispatch) => {
      dispatch({
        type: REMOVE_WISHLIST,
        payload: "",
      });
      return new Promise((resolve, reject) => {
        AuthInstance.patch(
          `${url}/api/wishlisting/update_wishlist/${body.wishlist_id}`,
          body
        )
          .then((res) => {
            dispatch({
              type: DELETE_WISHLIST,
              payload: { id: body.wishlist_id },
            });
            resolve(true);
          })
          .catch((err) => {
            console.log({ err });
            reject(err);
          });
      });
    };

export const AddingCart_Wishlist = (Mycart) => (dispatch) => {
  // alert("AddingCart_Wishlist")
  dispatch({
    type: MOVE_CART_LOADER,
    payload: "",
  });
  return new Promise((resolve, reject) => {
    AuthInstance.post(`${url}/api/wishlisting/AddingCart_fromWishlist`, Mycart)
      .then((res) => {
        // console.log(res.data,"566699")
        dispatch({
          type: ADDINGCART_WISHLIST,
          payload: { data: res.data, id: Mycart.wishlist_id },
        });
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const delete_wishlist =
  ({ body }) =>
    (dispatch) => {
      // dispatch({
      // 	type:REMOVE_WISHLIST,
      // 	payload:""
      // })
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/wishlisting/delete_all_outofStock_wishlist`,
          body
        )
          .then((res) => {
            // alert("kkk")
            dispatch({
              type: DELETE_ALL,
              payload: { id: body.id },
            });
            resolve(true);
          })
          .catch((err) => {
            console.log({ err });
            reject(err);
          });
      });
    };

export const move_all_tocart = (user_id) => (dispatch) => {
  // dispatch({
  // 	type:REMOVE_WISHLIST,
  // 	payload:""
  // })
  // alert(user_id)
  return new Promise((resolve, reject) => {
    AuthInstance.post(`${url}/api/wishlisting/move_all_tocart/${user_id}`)
      .then((res) => {
        // alert("kkk")
        // dispatch({
        // 	type:DELETE_ALL,
        // 	payload:{id: body.id}
        // })
        resolve(true);
      })
      .catch((err) => {
        console.log({ err });
        reject(err);
      });
  });
};

export const check_payment_id = (body) => (dispatch) => {
  return new Promise((resolve, reject) => {
    AuthInstance.post(`${url}/api/verify_payments/check_payment_id`, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log({ err });
        reject(err);
      });
  });
};

export const check_cashfree_payment_id = (order_id) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const body = {
      appId: "264572037bbcd2407554141f175462",
      secretKey: "be8f4792f30b1270c5786bcab289ffa5a6ac0e51",
      orderId: order_id,
    };
    // const header = {
    // 	headers: {

    // 	}
    // };
    axios.defaults.headers.common = {};
    fetch(
      `https://api.cashfree.com/api/v1/order/info/status`,
      { method: "POST" },
      body
    )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log({ err });
        reject(err);
      });
  });
};

export const check_success = (order_id) => (dispatch) => {
  AuthInstance.get(`${url}/api/verify_payments/check/${order_id}`)
    .then((res) => {
      // resolve(res.data);
    })
    .catch((err) => {
      console.log({ err });
    });
};

export const offerbook_applied = (is_applied) => (dispatch) => {
  // alert(is_applied);
  return new Promise((resolve, reject) => {
    dispatch({
      type: IS_OFFER_BOOK,
      payload: is_applied,
    });
  });
};

export const cartpagelength = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(`${url}/common/cart_page_length/`)
      .then((res) => {
        // alert("action")

        console.log(res.data, "res...................................");
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const check_book_incart = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(`${url}/common/check_book_incart`)
      .then((res) => {
        // alert("action")
        dispatch({
          type: CHECK_BOOK_INCART,
          payload: res.data,
        });
        console.log(res.data, "check_book_incart");
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const update_wishlist_condition = (mywishlist) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UPDATE_WISHLIST_CONDITION,
      payload: mywishlist,
    });
    resolve(true);
  });
};

export const apply_couponcode = (amount) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: APPLY_COUPONCODE,
      payload: amount,
    });
    resolve(true);
  });
};

export const cod_verify_payment = (body) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/v1/post/get_razorpayid/Validate_COD_v2`, body)
      .then((res) => {
        console.log(res.data, "Validate_COD");
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err, "error");
        reject(err.response.data);
      });
  });
};

export const razorpay_verify_payment = (body) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${url}/api/v1/post/get_razorpayid/Validate_Razorpay_payments_v2`,
        body
      )
      .then((res) => {
        console.log(res.data, "Validate_Razorpay_payments");
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err, "error");
        reject(err.response.data);
      });
  });
};

// export const check_book_incart = () => dispatch => {
//   return new Promise((resolve, reject) => {
//     AuthInstance.get(`${url}/common/check_book_incart`)
//       .then(res => {
//         // alert("action")
//         dispatch({
//           type: CHECK_BOOK_INCART,
//           payload: res.data,
//         });
//         console.log(res.data, "check_book_incart");
//         resolve(res.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// };

export const wallet_verify_payment = (body) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${url}/api/v1/post/get_razorpayid/Validate_mypustakwallet_payments_v2`,
        body
      )
      .then((res) => {
        console.log(res.data, "Validate_mypustakwallet_payments");
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err, "error");
        reject(err.response.data);
      });
  });
};

export const fetch_min_order_value = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/api/v1/min_order_value/get`)
      .then((res) => {
        console.log(res.data, "fetch_min_order_value");
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err, "error");
        reject(err.response.data);
      });
  });
};

export const show_books_in_popup = (MyCart) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: SETBOOKFORPOPUPMSG,
      payload: MyCart,
    });
  });
};
export const clear_books_in_popup = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: ClEARBOOKFORPOPUPMSG,
      payload: {},
    });
  });
};

export const fetch_freebie_data = (body) => (dispatch) => {
  // alert(body);
  // let header = {
  // 	headers: {
  // 		Authorization: `${token}`
  // 	}
  // };
  // // console.log(token, 'toke');
  // let body = {
  //   id,
  // };
  // console.log(ordervalue, 'ov');
  dispatch({
        type: FREEBIE_LOADER,
        payload: true,
      })
  return new Promise((resolve, reject) => {
    AuthInstance.post(`${url}/api/freebies/v2/fetch_freebies`, body)
      .then((res) => {
        console.log(res.data.data, "fetc");
        if (true) {
          dispatch({
            type: FREEBIE_DATA,
            payload: res.data.data,
          });
              dispatch({
            type: FREEBIE_LOADER,
            payload: false,
          })
        } else {
          dispatch({
            type: FREEBIE_DATA,
            payload: [],
          });
        }
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
            dispatch({
            type: FREEBIE_LOADER,
            payload: false,
          })
        reject(err);
      });
  });
};
