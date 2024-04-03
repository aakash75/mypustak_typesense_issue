import axios from 'axios'
import { AuthInstance, url } from '../../helper/api_url'
import { encryptor } from "../../helper/crypto.js";

import {
  LOGINBACKDROP,
  LOGIN,
  SIGNUP,
  LOGINFAILS,
  LOGOUT,
  SIGNEDUP,
  LOGIN_TOGGLE,
  SHOWLOADER,
  GETADDRESS,
  GETUSERD,
  EDITUSER_ADD,
  EDITADDRESS,
  ADD_ADDRESS,
  SAVEDINFO,
  GETSELECTEDADDRESS,
  CLEARALL,
  AFTERLOGINREDIRECT,
  CLEARAFTERLOGINREDIRECT,
  CLEARALLUSERSTATUS,
  CLEARLOGINERR,
  ACTIVATESUCCESSPOPUP,
  ACTIVATESUCCESSPOPUPOTHER,
  SETSELECTEDADDRESSBLANK,
  NAVURL,
  LOADING_ADD_ADDRESS,
  LOADING_ADDRESS,
  LOADING_ADD_ADDRESS_FALSE,
  BACKOFFICEROLE,
  FETCH_USERS_DETAIL,
  UPDATE_USER_DETAIL,
  OTP_SUCCESS_REQUEST,
  OTP_FALIURE_REQUEST,
  OTP_SUCCESS_VERIFY,
  OTP_FALIURE_VERIFY,
  CARTSESSION,
  FETCHING_CART_ERR,
  USING_MIDDLEWARE,
  LOGIN_DONE_MSG,
  UPDATE_USER_COMPONENT,
  UPLOAD_PROFILE,
  FETCHWISHLIST_DATA,
  CHECK_LOGIN_USERMSG,
  CARTLEN,
} from "../constants/types";

export const LoginCheck =
  (body, save_to_localstorage = null) =>
    dispatch => {
      const encrypt_data = { body: encryptor(body) };
      return new Promise((resolve, reject) => {
        axios
          .post(`${url}/core/api/token`, encrypt_data, null)
          .then(res => {
            if (res.status === 200) {
              let checkurl = window.location.href.search("backoffice");
              let quora_check_url = window.location.href.search("contentlogin");
              let vendor_admin = window.location.href.search("selleradmin/login");
              if (checkurl > 0 || vendor_admin >= 0) {
                localStorage.setItem("useremail", res.data.email);
              } else if (quora_check_url > 0) {
                localStorage.setItem("useremail", res.data.email);
              }

              dispatch({
                type: LOGIN,
                payload: res.data,
              });
              dispatch({
                type: USING_MIDDLEWARE,
                payload: 0,
              });
              removeCookie().then(remove_res => {
                let fourteenDaysMs = 60 * 60 * 24 * 14 * 1000;
                setCookie(res.data, fourteenDaysMs).then(cookie_res => {
                  // dispatch(getAllDetails(res.data));
                });
              });
              if (quora_check_url) {
                axios
                  .get(`${url}/core/user_details/`, {
                    headers: {
                      Authorization: `JWT ${res.data.access}`,
                    },
                  })
                  .then(response => {
                    let user_data = JSON.stringify(response.data);
                    localStorage.setItem("user_info", user_data);
                    resolve(res.data);
                    dispatch({
                      type: GETUSERD,
                      payload: res.data,
                    });

                    dispatch({
                      type: CARTLEN,
                      payload: res.data.cartlen,
                    });

                    // console.log('localstorage ---');
                  })
                  .catch(error => {
                    console.log({ error });
                    reject(error);
                  });
              } else {
                resolve(res.data);
              }
            }
          })
          .catch(err => {
            console.log({ err }, "ErrorLogin");
            let errMsg =
              "Login failure due to some error.Please contact Mypustak support";
            if (err.response.status == 400) {
              errMsg = err.response.data.msg;
            }
            dispatch({
              type: LOGINFAILS,
              payload: errMsg,
            });

            reject(err);
          });
      });
    };


const setCookie = (data, timeTo) => {
  return new Promise((resolve, reject) => {
    let date = new Date(Date.now() + timeTo);
    let strinifyData = JSON.stringify(data);

    document.cookie = `I=${strinifyData};expires=${date};path=/`;
    resolve(data);
  });
};

const removeCookie = () => {
  return new Promise((resolve, reject) => {
    document.cookie = `I=;Max-Age=-99999999;`;
    resolve(true);
  });
};

export const signupCheck = details => dispatch => {

  const encrypt_data = { details: encryptor(details) };
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/core/user_signup/`, encrypt_data)
      .then(res => {

        dispatch({
          type: SIGNUP,
          payload: res.data,
        });

        let quora_check_url = window.location.href.search("quoralogin");

        removeCookie().then(remove_res => {
          let fourteenDaysMs = 60 * 60 * 24 * 14 * 1000;
          setCookie(res.data, fourteenDaysMs).then(cookie_res => {
            dispatch({
              type: LOGIN,
              payload: res.data,
            });
            dispatch({
              type: USING_MIDDLEWARE,
              payload: 0,
            });
            // dispatch(getAllDetails(res.data));
            let data = res.data
            axios
              .get(`${url}/core/user_details/`, {
                headers: {
                  Authorization: `JWT ${data.access}`,
                },
              })
              .then(res => {
                console.log(res.data, "USERDATADATADTADTADTD------------------------------")
                dispatch({
                  type: GETUSERD,
                  payload: res.data,
                });

                dispatch({
                  type: CARTLEN,
                  payload: res.data.cartlen,
                });
                let user_data = JSON.stringify(res.data);
                localStorage.setItem("user_info", user_data);
                resolve(data);
                // console.log('localstorage ---');
              })
              .catch(err => {
                reject(err)
                console.log({ err }, "userdetails");
              });

          });
        });
        // if (quora_check_url) {
        // axios
        //     .get(`${config.get("apiDomain")}/core/user_details/`, {
        //     headers: {
        //         Authorization: `JWT ${res.data.access}`,
        //     },
        //     })
        //     .then(response => {
        //     let user_data = JSON.stringify(response.data);
        //     localStorage.setItem("user_info", user_data);
        //     resolve(res.data);

        //     // console.log('localstorage ---');
        //     })
        //     .catch(error => {
        //     console.log({ error });
        //     reject(error);
        //     });
        // } else {
        // }
        // resolve(res.data);
      })
      // .catch(err=>console.log(err));
      .catch(err => {
        console.log({ err });
        let errMsg =
          "Signup failure due to some error.Please contact Mypustak support";
        if (err.response.status == 409) {
          errMsg = err.response.data.message;
        }
        if (err.response.status == 417) {
          errMsg = err.response.data.message;
        }
        // if (err.response.status === 500) {
        // alert("E500")

        dispatch({
          type: SIGNEDUP,
          payload: { errMsg: errMsg, data: err.response.data },
        });

        reject(err.response.status);

        // }
      });
  });
};


export const logout = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: LOGOUT,
    });
    sessionStorage.clear();
    document.cookie = `I=;Max-Age=-99999999;`;
    resolve(true);
  });
};
export const refreshToken = (refreshToken) => (dispatch) => {
  return new Promise((resolve, reject) => {
    // console.log({ refreshToken });

    let body = { refresh: `${refreshToken}` };
    axios
      .post(`${url}/core/api/token/refresh`, body)
      .then((res) => {
        // console.log('Login refresh LOGIN');

        dispatch({
          type: LOGIN,
          payload: res.data,
        });
        removeCookie().then((remove_res) => {
          let fourteenDaysMs = 60 * 60 * 24 * 14 * 1000;
          setCookie(res.data, fourteenDaysMs).then((cookie_res) => {
            // console.log('get details');
            // dispatch(Getaddress());
            dispatch(getAllDetails(res.data));
          });
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getRefreshAfterTime = (refreshToken, execute_after) => dispatch => {
  // console.log('getRefreshAfterTime', execute_after);

  setTimeout(() => {
    dispatch(refreshToken(res.refresh));
  }, execute_after);
};

export const usingMiddleWare = () => dispatch => {
  dispatch({
    type: USING_MIDDLEWARE,
    payload: 1,
  });
};


export const ForgetPassword = body => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${config.get("apiDomain")}/core/forgot_password`, body)
      .then(res => {
        resolve(true);
      })
      .catch(err => {
        reject(err);
      });
  });
};


export const setComponentStatus = status => dispatch => {
  if (typeof window !== "undefined") {
    // decode jwt so that we know if and when it expires
    const getCookieArr = document.cookie.split("; ");
    // console.log({getCookieArr});

    const cookieDetails = getCookieArr.filter(e => e.startsWith("I="));
    // console.log({ cookieDetails });
    if (cookieDetails.length) {
      dispatch({
        type: UPDATE_USER_COMPONENT,
        payload: 2,
      });
    } else {
      dispatch({
        type: UPDATE_USER_COMPONENT,
        payload: 1,
      });
    }
  }
};

export const CheckUserExistance = body => dispatch => {
  return new Promise((resolve, reject) => {
    axios.post(
      `${url}/core/check_user_existance`,
      body
    )
      .then(res => {
        dispatch({
          type: CHECK_LOGIN_USERMSG,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getAllDetails = data => dispatch => {
  // console.log('LOGIN', 'getAllDeaitls');

  // dispatch(userdetails)
  dispatch({
    type: LOGIN,
    payload: data,
  });
  dispatch({
    type: USING_MIDDLEWARE,
    payload: 0,
  });
  addPresetCartOnLogin(data.access)
    .then(res => {
      // console.log('ok addPresetCartOnLogin');
      // fetch_wishlist_detail(data.access).then((res) =>{
      // 	// console.log(res.data,"888888999")
      // 	dispatch({
      // 		type:FETCHWISHLIST_DATA,
      // 		payload:res.data
      // 	})
      // })
      // .catch((err) => {
      // 	console.log(err)
      // });
      // 	fetch_cart_details(data.access)
      // 		.then((res) => {
      // 			// console.log(res,"888888aaaaa")
      // 			dispatch({
      // 				type: CARTSESSION,
      // 				payload: res.data.items
      // 			});
      // 			fetch_wishlist_detail(data.access).then((res) =>{
      // 				// console.log(res.data,"888888999")
      // 				dispatch({
      // 					type:FETCHWISHLIST_DATA,
      // 					payload:res.data
      // 				})
      // 			})
      // 			.catch((err) => {
      // 				console.log(err)
      // 			});
      // 		})
      // 		.catch((err) => {
      // 			dispatch({
      // 				type: FETCHING_CART_ERR,
      // 				payload: {}
      // 			});
      // 		});
      // })
    })
    .catch(err => {
      // fetch_cart_details(data.access)
      //   .then(res => {
      //     dispatch({
      //       type: CARTSESSION,
      //       payload: res.data.items,
      //     });
      //   })
      //   .catch(err => {
      //     dispatch({
      //       type: FETCHING_CART_ERR,
      //       payload: {},
      //     });
      //   });
    });
  // console.log('after addPresetCartOnLogin');

  axios
    .get(`${url}/core/user_details/`, {
      headers: {
        Authorization: `JWT ${data.access}`,
      },
    })
    .then(res => {
      console.log(res.data, "USERDATADATADTADTADTD------------------------------")
      dispatch({
        type: GETUSERD,
        payload: res.data,
      });

      dispatch({
        type: CARTLEN,
        payload: res.data.cartlen,
      });
      let user_data = JSON.stringify(res.data);
      localStorage.setItem("user_info", user_data);
      // console.log('localstorage ---');
    })
    .catch(err => {
      console.log({ err }, "userdetails");
    });
};

const addPresetCartOnLogin = (token) => {
  return new Promise((resolve, reject) => {
    // console.log('in addPresetCartOnLogin');
    let current_local_cart = readCartLocalStorage();
    if (current_local_cart != []) {
      let book;
      for (let index in current_local_cart) {
        // console.log(book,current_local_cart[book], 'sendCartSession');
        book = current_local_cart[index];

        // let key = sessionStorage.key(i);
        try {
          // let book = JSON.parse(sessionStorage.getItem(key));
          // console.log(book, 'val', Array.isArray(book.bookInvId));
          const sendCartSession = {
            book_id: book.bookId,
            book_inv_id: Array.isArray(book.bookInvId)
              ? book.bookInvId[0]
              : book.bookInvId,
            cashbackedPrice: book.cashbackedPrice ? book.cashbackedPrice : 0,
            discountedPrice: book.discountedPrice ? book.discountedPrice : 0,
            cashback_per: book.cashback_per ? book.cashback_per : 0,
            discount_per: book.discount_per ? book.discount_per : 0,
            offertype: book.offertype ? book.offertype : null,
            book_thumb: book.book_thumb,
          };
          // console.log({sendCartSession});

          if (!book.Cart_id) {
            const cartSession_body = { cs: encryptor(sendCartSession) };
            axios
              .post(`${url}/common/addtocart/`, cartSession_body, {
                headers: {
                  Authorization: `JWT ${token}`,
                },
              })
              .then((res) => {
                // console.log(res.status, 'addPresetCartOnLogin');
                // dispatch({
                // 	type: FETCHING_CART_ERR,
                // 	payload: {}
                // });
                // RefreshCart();
                resolve(true);
              })
              .catch((err) => {
                // console.log(err.response.status, 'addPresetCartOnLogin');
                // console.log(err, 'error 1');

                RetryAddToCart({ sendCartSession: cartSession_body, token })
                  .then((res) => {
                    // resolve(true);
                  })
                  .catch((err) => {
                    RetryAddToCart({ sendCartSession: cartSession_body, token })
                      .then((res) => {
                        // resolve(true);
                      })
                      .catch((err) => {
                        RetryAddToCart({
                          sendCartSession: cartSession_body,
                          token,
                        })
                          .then((res) => {
                            // resolve(true);
                          })
                          .catch((err) => {
                            reject(err);
                          });
                      });
                  });

                // axios
                // 	.post(`${config.get('apiDomain')}/common/addtocart/`, sendCartSession, {
                // 		headers: {
                // 			Authorization: `JWT ${token}`
                // 		}
                // 	})
                // 	.then((res) => {
                // 		resolve(true);
                // 	})
                // 	.catch((err) => {
                // 		axios
                // 			.post(`${config.get('apiDomain')}/common/addtocart/`, sendCartSession, {
                // 				headers: {
                // 					Authorization: `JWT ${token}`
                // 				}
                // 			})
                // 			.then((res) => {
                // 				resolve(true);
                // 			})
                // 			.catch((err) => {
                // 				reject(err);
                // 			});
                // 	});
                // addPresetCartOnLogin(token).then(res => {
                // 	resolve(true)
                // }).catch(err => {
                // 	console.log(err,"error 2");
                // 	reject(err);
                // })
              });
          }
        } catch (error) {
          console.log(error, "error");
        }
      }
      resolve(true);
      // this.props.CartSession(this.props.userToken);
    } else {
      console.log("no session addPresetCartOnLogin");
      resolve(true);
    }
  });
};

const fetch_cart_details = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/common/cart_items/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((res) => {
        resolve(res);
        // console.log(res, 'CartSession');
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};


export const userdetails = () => (dispatch) => {
  // console.log('userdetails');
  // alert("okk")
  axios.get(
    `${url}/core/user_details/`
    // {
    // 	headers: {
    // 		Authorization: details
    // 	}
    // }
  )
    .then((res) => {
      dispatch({
        type: GETUSERD,
        payload: res.data,
      });
      // console.log('localstorage ---');
    })
    .catch((err) => {
      console.log({ err }, "userdetails");
    });
};

export const fetch_wishlist_detail_otherpage = () => (dispatch) => {
  let user = JSON.parse(localStorage.getItem("user_info"));
  if (user) {
    let user_id = user.id;
    // console.log(user,"1256", user.id)
    // alert("hit")
    return new Promise((resolve, reject) => {
      AuthInstance.post(
        `${url}/api/wishlisting/fetch_wishlist_data/${user_id}`
      )
        .then((res) => {
          // alert("jjjj")
          dispatch({
            type: FETCHWISHLIST_DATA,
            payload: res.data,
          });
          resolve(res);
          // console.log(res, 'wishlist');
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }
};

export const setUpData = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    findCookie()
      .then((res) => {
        let accessToken = res.access;
        let parsedTokeData = JSON.parse(atob(accessToken.split(".")[1]));
        const { exp } = parsedTokeData;
        const currentTime = Date.now() / 1000;
        // console.log(currentTime,exp);

        if (currentTime > exp) {
          // console.log('Fetch new token');
          // dispatch(refreshToken(res.refresh)).then(res => {
          // 	console.log('refresh res',res);
          // 	resolve(true)
          // })
          // 	.catch(err => {
          // 	console.log('refresh err',err);
          // 	reject(true)
          // })
          // expired fetch new
        } else {
          // get user deatils
          // console.log('Fetch details');
          getRefreshAfterTime(res.refresh, (exp - currentTime) * 1000);
          resolve(true);
        }
        // then get user details
      })
      .catch((err) => { });
  });
};


export const login_signuptoggle = () => (dispatch) => {

  dispatch({
    type: LOGIN_TOGGLE,

  })
}

