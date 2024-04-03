import {
  LOGINBACKDROP,
  LOGIN,
  SIGNUP,
  LOGINFAILS,
  LOGOUT,
  SIGNEDUP,
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
  FETCHING_CART,
  FETCHING_CART_ERR,
  USING_MIDDLEWARE,
  LOGIN_DONE_MSG,
  UPDATE_USER_COMPONENT,
  UPLOAD_PROFILE,
  FETCHWISHLIST_DATA,
  CHECK_LOGIN_USERMSG,
  CARTLEN,
  GETADDRESS_PERPAGE,
  GETSELECTEDADDRESS_PERPAGE,
  fETCH_COMMUNICATE_PREFERENCE
} from "../constants/types.js";
import axios from "axios";

import { SendAddressId } from "./cartAction";
import { removeAllCart } from "../actions/cartAction";

import { AuthInstance, url } from "../../helper/api_url";
import { encryptor } from "../../helper/crypto.js";
import { readCartLocalStorage } from "../../helper/helpers.js";
import { resolve } from "path";
// import
export const login_backdropToggle = () => dispatch => {
  // alert('logout');
  dispatch({
    type: LOGINBACKDROP,
    // payload:res.data
  });
};


export const LoginCheck =
  (body, save_to_localstorage = null) =>

    dispatch => {
      const encrypt_data = { body: encryptor(body) };
      return new Promise((resolve, reject) => {
        // console.log({body});
        axios
          // .post(`${config.get('apiDomain')}/core/get_token/`, details)
          .post(`${url}/core/api/token`, encrypt_data, null)
          .then(res => {
            if (res.status === 200) {
              // console.log(typeof res.data);
              // console.log(res.data, 'loginn');

              // if (typeof res.data !== 'string') {
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
                  // console.log('get details');
                  // dispatch(Getaddress());
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
            } else {
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

export const signupCheck = details => dispatch => {
  // console.log(details)
  // alert("signup")
  const encrypt_data = { details: encryptor(details) };
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/core/user_signup/`, encrypt_data)
      .then(res => {
        // console.log(res);

        dispatch({
          type: SIGNUP,
          payload: res.data,
        });
        let quora_check_url = window.location.href.search("quoralogin");

        removeCookie().then(remove_res => {
          let fourteenDaysMs = 60 * 60 * 24 * 14 * 1000;
          setCookie(res.data, fourteenDaysMs).then(cookie_res => {
            // console.log('get details');
            // dispatch(Getaddress());
            // dispatch(   (res.data)).then((res) =>{
            //   // resolve(res.data);
            // }).catch((err) =>{
            //   console.log(err , "error 162action")
            //   resolve(res.data);

            // })
            let token_data = res.data
            dispatch({
              type: LOGIN,
              payload: res.data,
            });
            dispatch({
              type: USING_MIDDLEWARE,
              payload: 0,
            });
            console.log(res, "1016signpflow");
            axios
              .get(`${url}/core/user_details/`, {
                headers: {
                  Authorization: `JWT ${token_data.access}`,
                },
              })
              .then(res => {
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
                resolve(true)
                // console.log('localstorage ---');
              })
              .catch(err => {
                console.log({ err }, "userdetails signpflow");
                reject(err)
              });

            // dispatch(getAllDetails(res.data))
            //   .then((res) => {
            //     console.log(res, "170", res.access)
            //     let token = `JWT ${res.access}`;
            //     dispatch(CartSession(res.access))
            //       .then((res) => {
            //         console.log("cartSession 174 ", res)
            //         resolve(res.data);
            //       })
            //       .catch((error) => {
            //         console.log(error, "178error")
            //         resolve(res.data);
            //       })

            //   })
            //   .catch((error) => {
            //     console.log(error, "175 signup")
            //   })


            // dispatch(getAllDetails_signup(res.data))
            //   .then((res) => {
            //     console.log(res, "170 signpflow", res.access)
            //     let token = `JWT ${res.access}`;
            //     dispatch(CartSession(res.access))
            //       .then((res) => {
            //         console.log("cartSession 174 signpflow", res)
            //         resolve(res.data);
            //       })
            //       .catch((error) => {
            //         console.log(error, "178error")
            //         resolve(res.data);
            //       })

            //   })
            //   .catch((error) => {
            //     console.log(error, "175 signup")
            //   })
          });
        });

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




// export const signupCheck = details => dispatch => {
//   // console.log(details)
//   // alert("signup")
//   return new Promise((resolve, reject) => {
//     axios
//       .post(`${url}/core/user_signup/`, details)
//       .then(res => {
//         // console.log(res);

//         dispatch({
//           type: SIGNUP,
//           payload: res.data,
//         });
//         let quora_check_url = window.location.href.search("quoralogin");

//         removeCookie().then(remove_res => {
//           let fourteenDaysMs = 60 * 60 * 24 * 14 * 1000;
//           setCookie(res.data, fourteenDaysMs).then(cookie_res => {
//             // console.log('get details');
//             // dispatch(Getaddress());
//             // dispatch(getAllDetails(res.data)).then((res) =>{
//             //   resolve(res.data);
//             // }).catch((err) =>{
//             //   console.log(err , "error 162action")
//             //   resolve(res.data);

//             // })

//             dispatch({
//               type: LOGIN,
//               payload: res.data,
//             });
//             dispatch({
//               type: USING_MIDDLEWARE,
//               payload: 0,
//             });

//             resolve(res.data)

//           });
//         });

//       })
//       // .catch(err=>console.log(err));
//       .catch(err => {
//         console.log({ err });
//         let errMsg =
//           "Signup failure due to some error.Please contact Mypustak support";
//         if (err.response.status == 409) {
//           errMsg = err.response.data.message;
//         }
//         if (err.response.status == 417) {
//           errMsg = err.response.data.message;
//         }
//         // if (err.response.status === 500) {
//         // alert("E500")

//         dispatch({
//           type: SIGNEDUP,
//           payload: { errMsg: errMsg, data: err.response.data },
//         });

//         reject(err.response.status);

//         // }
//       });
//   });
// };
export const logout = () => dispatch => {
  // alert("logout")
  // dispatch(removeAllCart());
  return new Promise((resolve, reject) => {
    dispatch({
      type: LOGOUT,
      // payload:res.data
    });
    sessionStorage.clear();
    document.cookie = `I=;Max-Age=-99999999;`;
    resolve(true);
    // removeCookie().then(res => {
    // 	resolve(true)
    // })
    // 	.catch(err => {
    // 		console.log({ err });
    // 		reject(err)

    // })
  });
};

export const ActivteSuccesPopup = () => dispatch => {
  // alert("a")
  dispatch({
    type: ACTIVATESUCCESSPOPUP,
    // payload:res.data
  });
};
export const ActivteSuccesPopupOther = () => dispatch => {
  // alert("a")
  dispatch({
    type: ACTIVATESUCCESSPOPUPOTHER,
    // payload:res.data
  });
};

export const clearAll = () => dispatch => {
  // alert("logout")
  dispatch({
    type: CLEARALL,
    // payload:res.data
  });
};
export const clearLoginErr = () => dispatch => {
  // alert("clear")
  dispatch({
    type: CLEARLOGINERR,
    // payload:res.data
  });
};
export const clearAllUserStatus = () => dispatch => {
  // alert("logout")
  dispatch({
    type: CLEARALLUSERSTATUS,
    // payload:res.data
  });
};

export const getSavedToken = info => dispatch => {
  // alert('info')
  // console.log(`Token `);
  const transport = axios.create({
    withCredentials: true,
  });

  AuthInstance.get(`${url}/core/user_details/`, {
    // headers: {
    // 	Authorization: `Token ${info}`
    // },
    // withCredentials: true
  })
    .then(res => {
      if (res.data.details === "Invalid token.") {
        // dispatch({
        // 	type: SAVEDINFO,
        // 	payload: info
        // });
      } else {
        // dispatch({
        // 	type: SAVEDINFO,
        // 	payload: info
        // });
      }
    })
    .catch(err => console.log(err));
};

export const AfterLoginRedirect = data => dispatch => {
  // alert("logout")
  dispatch({
    type: AFTERLOGINREDIRECT,
    payload: data,
  });
};
export const ClearAfterLoginRedirect = () => dispatch => {
  // alert("logout")
  dispatch({
    type: CLEARAFTERLOGINREDIRECT,
    // payload:data
  });
};

export const showLoader = () => dispatch => {
  // alert("logout")
  dispatch({
    type: SHOWLOADER,
    // payload:res.data
  });
};

// GET ADDRESS
export const Getaddress =
  (details, gettoken = null) =>
    dispatch => {
      // alert('getaddress');
      // alert("getaddress")

      dispatch({
        type: LOADING_ADDRESS,
        payload: {},
      });
      let header;
      if (gettoken) {
        header = {
          headers: {
            Authorization: `JWT ${gettoken}`,
          },
        };
      }

      gettoken
        ? axios.get(`${url}/api/v1/get/user_address`, header)
        : AuthInstance.get(`${url}/api/v1/get/user_address`)
          .then(res => {
            dispatch({
              type: GETADDRESS,
              payload: res.data,
            });

            const all_address = res.data.output;
            const primary_address = all_address.filter(
              address => address.is_primary == "Y"
            );

            if (primary_address.length) {
              // console.log({primary_address},primary_address.length);

              dispatch({
                type: GETSELECTEDADDRESS,
                payload: primary_address[0],
              });

              dispatch(SendAddressId(primary_address[0].address_id));
            }
          })
          .catch(err => {
            console.log({ err });
            dispatch({
              type: LOADING_ADDRESS,
              payload: {},
            });
          });
    };


export const GetAddress_per_page =
  (pg, gettoken = null) =>
    dispatch => {
      // alert('getaddress');
      // alert("getaddress")

      dispatch({
        type: LOADING_ADDRESS,
        payload: {},
      });
      let header;
      if (gettoken) {
        header = {
          headers: {
            Authorization: `JWT ${gettoken}`,
          },
        };
      }

      gettoken
        ? axios.get(`${url}/api/v1/get/user_address/GetAddress_per_page/${pg}`, header)
        : AuthInstance.get(`${url}/api/v1/get/user_address/GetAddress_per_page/${pg}`)
          .then(res => {
            dispatch({
              type: GETADDRESS_PERPAGE,
              payload: res.data,
            });

            const all_address = res.data.output;
            const primary_address = all_address.filter(
              address => address.is_primary == "Y"
            );

            if (primary_address.length) {
              // console.log({primary_address},primary_address.length);

              dispatch({
                type: GETSELECTEDADDRESS_PERPAGE,
                payload: primary_address[0],
              });

              dispatch(SendAddressId(primary_address[0].address_id));
            }
          })
          .catch(err => {
            console.log({ err });
            dispatch({
              type: LOADING_ADDRESS,
              payload: {},
            });
          });
    };






export const EdituserAddressAction = (token, address) => dispatch => {
  // console.log(address,token)
  // alert("addres")
  dispatch({
    type: LOADING_ADD_ADDRESS,
    payload: {},
  });
  const encrypt_data = { address: encryptor(address) };

  return new Promise((reslove, reject) => {
    AuthInstance.post(`${url}/api/v1/post/edit_address`, encrypt_data, {
      // headers: {
      // 	Authorization: token
      // }
    })
      .then(res => {
        dispatch({
          type: EDITUSER_ADD,
          payload: res.data,
        });
        reslove(true);
      })
      .catch(err => {
        console.log(err);
        reslove(false);
        dispatch({
          type: LOADING_ADD_ADDRESS,
          payload: {},
        });
      });
  });
};

export const Editaddress = data => dispatch => {
  // alert("inEd")
  dispatch({
    type: EDITADDRESS,
    payload: data,
  });
};

export const userdetails = () => dispatch => {
  // console.log('userdetails');
  // alert("okk")
  axios
    .get(
      `${url}/core/user_details/`
      // {
      // 	headers: {
      // 		Authorization: details
      // 	}
      // }
    )
    .then(res => {
      console.log(res, "resdeta");
      dispatch({
        type: GETUSERD,
        payload: res.data,
      });

      // console.log('localstorage ---');
    })
    .catch(err => {
      console.log({ err }, "userdetails");
    });
};

// ADD ADDRESS
export const reset_addAddress_loader = () => dispatch => {
  // console.log(address);

  dispatch({
    type: LOADING_ADD_ADDRESS_FALSE,
    payload: {},
  });
};
export const addAddressAction = (token, address) => dispatch => {
  // alert("hi")

  dispatch({
    type: LOADING_ADD_ADDRESS,
    payload: {},
  });

  return new Promise((reslove, reject) => {
    AuthInstance.post(`${url}/api/v1/post/address_form`, address, {
      // headers: {
      // 	Authorization: token
      // }
    })
      .then(res => {
        // alert("add")
        dispatch({
          type: ADD_ADDRESS,
          payload: res.data,
        });

        reslove(res);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const SelectedAddress = data => dispatch => {
  // alert(data);

  dispatch({
    type: GETSELECTEDADDRESS,
    payload: data,
  });
};

export const SetSelectedAddressBlank = () => dispatch => {
  // alert("logout")
  dispatch({
    type: SETSELECTEDADDRESSBLANK,
    // payload:res.data
  });
};
export const navurl = () => dispatch => {
  // alert("logout")
  dispatch({
    type: NAVURL,
    // payload:res.data
  });
};

// GET USERROLE
export const userRole = token => dispatch => {
  AuthInstance.get(`${url}/common/backoffice_roles/`, {
    // headers: {
    // 	Authorization: token
    // }
  })
    .then(res => {
      dispatch({
        type: BACKOFFICEROLE,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log({ err });
    });
};

export const fetch_user_detail = userid => dispatch => {
  // alert("fetch_user_detail" + userid)
  return new Promise((resolve, reject) => {
    AuthInstance.get(`${url}/core/fetch_user_details/${userid}`, {
      // headers: {
      // 	Authorization: token
      // }
    })
      .then(res => {
        console.log(res, "resuser_details");
        dispatch({
          type: FETCH_USERS_DETAIL,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const update_user_detail = (body, userid) => dispatch => {
  //  alert("hi")
  return new Promise((resolve, reject) => {
    const update_user_body = { body: encryptor(body) }
    AuthInstance.patch(`${url}/core/update_user_details/${userid}`, update_user_body, {
      // headers: {
      // 	Authorization: token
      // }
    })
      .then(res => {
        dispatch({
          type: UPDATE_USER_DETAIL,
          payload: res.data,
        });
        resolve(true);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const RequestOtp = body => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/core/api/otp/generate`, body)
      .then(res => {
        // console.log({ res }, 'otp');
        dispatch({ type: OTP_SUCCESS_REQUEST, payload: res.data });
        resolve(true);
      })
      .catch(err => {
        console.log({ err });
        dispatch({
          type: OTP_FALIURE_REQUEST,
          payload:
            "OTP not send due to some error.Please contact Mypustak support",
        });
        reject(err);
      });
  });
};

export const verifyOtp = body => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/core/api/otp/verify`, body)
      .then(res => {
        let resOtp = res.data.otp;
        if (resOtp) {
          // console.log({ res }, 'otp');
          dispatch({
            type: OTP_SUCCESS_VERIFY,
            payload: res.data,
          });
          dispatch({
            type: LOGIN,
            payload: res.data,
          });
          removeCookie().then(remove_res => {
            let fourteenDaysMs = 60 * 60 * 24 * 14 * 1000;
            setCookie(res.data, fourteenDaysMs).then(cookie_res => {
              // console.log('get details');
              // dispatch(Getaddress());
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
                  resolve(data)
                  // console.log('localstorage ---');
                }).catch((err) => {
                  reject(err);
                })
            }).catch((err) => {
              reject(err);
            })
          });
          // resolve(true);
        } else {
          dispatch({
            type: OTP_FALIURE_VERIFY,
            paylod: "Incorrect OTP. Please Enter Correct OTP.",
          });
          let err = {
            response: {
              data: {
                msg: "Incorrect OTP. Please Enter Correct OTP.",
              },
            },
          };
          reject(err);
        }
      })
      .catch(err => {
        console.log({ err });
        dispatch({ type: OTP_FALIURE_VERIFY, paylod: err.response.data });
        reject(err);
      });
  });
};

const setCookie = (data, timeTo) => {
  return new Promise((resolve, reject) => {
    let date = new Date(Date.now() + timeTo);
    let strinifyData = JSON.stringify(data);
    // console.log(`I=${strinifyData};expires=${date};`,exp);

    document.cookie = `I=${strinifyData};expires=${date};path=/`;
    resolve(data);
  });
};

const removeCookie = () => {
  return new Promise((resolve, reject) => {
    // console.log(`I=${strinifyData};expires=${date};`,exp);

    document.cookie = `I=;Max-Age=-99999999;`;
    resolve(true);
  });
};

// export default setCookie;
export const setUpData = () => dispatch => {
  return new Promise((resolve, reject) => {
    findCookie()
      .then(res => {
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
      .catch(err => { });
  });
};

const findCookie = () => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined") {
      const getCookieArr = document.cookie.split("; ");

      let Cookie_details = getCookieArr.filter(e => e.startsWith("I="));
      // console.log({ Cookie_details });
      if (Cookie_details) {
        let details = Cookie_details[0].replace("I=", "");
        let json_details = JSON.parse(details);
        resolve(json_details);
      } else {
        reject({ msg: "No cookie found" });
      }
      // let json_details = JSON.parse(details)
      // console.log(JSON.parse(details));
      // const token = json_details.access
    } else {
      reject({ msg: "On server side" });
    }
  });
};

export const refreshToken = refreshToken => dispatch => {
  return new Promise((resolve, reject) => {
    // console.log({ refreshToken });

    let body = { refresh: `${refreshToken}` };
    axios
      .post(`${url}/core/api/token/refresh`, body)
      .then(res => {
        // console.log('Login refresh LOGIN');

        dispatch({
          type: LOGIN,
          payload: res.data,
        });
        removeCookie().then(remove_res => {
          let fourteenDaysMs = 60 * 60 * 24 * 14 * 1000;
          setCookie(res.data, fourteenDaysMs).then(cookie_res => {
            // console.log('get details');
            // dispatch(Getaddress());
            dispatch(getAllDetails(res.data));
          });
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getRefreshAfterTime = (refreshToken, execute_after) => dispatch => {
  // console.log('getRefreshAfterTime', execute_after);

  setTimeout(() => {
    dispatch(refreshToken(res.refresh));
  }, 100);
};

export const findCookieExpiration = () => {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined") {
      const getCookieArr = document.cookie.split("; ");

      const cookieDetails = getCookieArr.filter(e => e.startsWith("I="));
      // console.log({ cookieDetails });
      if (cookieDetails) {
        const details = cookieDetails[0].replace("I=", "");
        const jsonDetails = JSON.parse(details);
        const accessToken = jsonDetails.access;
        const parsedTokeData = JSON.parse(atob(accessToken.split(".")[1]));
        const { exp } = parsedTokeData;
        const currentTime = Date.now() / 1000;
        console.log(currentTime, exp);

        resolve(exp);
      } else {
        reject({ msg: "No cookie found" });
      }
      // let jsonDetails = JSON.parse(details)
      // console.log(JSON.parse(details));
      // const token = jsonDetails.access
    } else {
      reject({ msg: "On server side" });
    }
  });
};

export const getaddress = details => dispatch => {
  // alert('getaddress');
  // alert("getaddress")

  dispatch({
    type: LOADING_ADDRESS,
    payload: {},
  });
  AuthInstance.get(`${url}/api/v1/get/user_address`, {
    // headers: {
    // 	Authorization: details
    // }
  })
    .then(res => {
      dispatch({
        type: GETADDRESS,
        payload: res.data,
      });

      const all_address = res.data.output;
      const primary_address = all_address.filter(
        address => address.is_primary == "Y"
      );
      console.log(primary_address, "primary_adress");
      if (primary_address.length) {
        // console.log({primary_address},primary_address.length);

        dispatch({
          type: GETSELECTEDADDRESS,
          payload: primary_address[0],
        });

        dispatch(SendAddressId(primary_address[0].address_id));
      }
    })
    .catch(err => {
      console.log({ err });
      dispatch({
        type: LOADING_ADDRESS,
        payload: {},
      });
    });
};


export const getAllDetails = data => dispatch => {
  console.log('LOGIN', 'getAllDeaitls signpflow');

  return new Promise((resolve, reject) => {
    // dispatch(userdetails)
    dispatch({
      type: LOGIN,
      payload: data,
    });
    dispatch({
      type: USING_MIDDLEWARE,
      payload: 0,
    });
    // alert("954")

    addPresetCartOnLogin(data.access).then((res) => {

      // alert("res")
      console.log(res, "1016signpflow");
      axios
        .get(`${url}/core/user_details/`, {
          headers: {
            Authorization: `JWT ${data.access}`,
          },
        })
        .then(res => {
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
          resolve(data)
          // console.log('localstorage ---');
        })
        .catch(err => {
          console.log({ err }, "userdetails signpflow");
          reject(err)
        });
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })


};



export const getAllDetails_signup = data => dispatch => {
  console.log('LOGIN', 'getAllDetails_signup signpflow');

  return new Promise((resolve, reject) => {
    // dispatch(userdetails)
    dispatch({
      type: LOGIN,
      payload: data,
    });
    dispatch({
      type: USING_MIDDLEWARE,
      payload: 0,
    });
    // alert("954")
    addPresetBulkCartOnLogin(data.access).then((res) => {

      // alert("res")
      console.log(res, "1016signpflow");
      axios
        .get(`${url}/core/user_details/`, {
          headers: {
            Authorization: `JWT ${data.access}`,
          },
        })
        .then(res => {
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
          resolve(data)
          // console.log('localstorage ---');
        })
        .catch(err => {
          console.log({ err }, "userdetails signpflow");
          reject(err)
        });
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })


};
const fetch_cart_details = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/common/cart_items/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then(res => {
        resolve(res);
        // console.log(res, 'CartSession');
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};
const addPresetCartOnLogin_old = token => dispatch => {
  return new Promise((resolve, reject) => {
    // console.log('in addPresetCartOnLogin');
    let current_local_cart = readCartLocalStorage();
    if (current_local_cart != []) {
      let book;
      for (let index in current_local_cart) {
        // console.log(book,current_local_cart[book], 'sendCartSession');
        // if()
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
            book_qty: book.bookQty,
          };
          console.log({ sendCartSession }, "in preset cart");

          if (!book.Cart_id) {
            const cartSession_body = { cs: encryptor(sendCartSession) };
            axios
              .post(`${url}/common/addtocart/`, cartSession_body, {
                headers: {
                  Authorization: `JWT ${token}`,
                },
              })
              .then(res => {
                console.log(res, 'addPresetCartOnLogin');
                // dispatch({
                // 	type: FETCHING_CART_ERR,
                // 	payload: {}
                // });
                // RefreshCart();

                axios.get(`${url}/common/cart_itemsV2`, {
                  headers: {
                    Authorization: `JWT ${token}`
                  },
                })
                  .then(res => {
                    dispatch(CartSession(token))

                    axios.get(`${url}/common/check_book_incart`, {
                      headers: {
                        Authorization: `JWT ${token}`,
                      },
                    }).then(res => {
                      console.log(res.data, "check book resss in preset");
                      resolve(true);

                    })


                  })

                resolve(true);
              })
              .catch(err => {
                console.log(err.response.status, 'addPresetCartOnLogin');
                // console.log(err, 'error 1');

                RetryAddToCart({ sendCartSession: cartSession_body, token })
                  .then(res => {
                    // resolve(true);
                  })
                  .catch(err => {
                    RetryAddToCart({ sendCartSession: cartSession_body, token })
                      .then(res => {
                        // resolve(true);


                        axios.get(`${url}/common/cart_itemsV2`, {
                          headers: {
                            Authorization: `JWT ${token}`
                          },
                        }).then(res => {
                          dispatch(CartSession(token))

                          axios.get(`${url}/common/check_book_incart`, {
                            headers: {
                              Authorization: `JWT ${token}`,
                            },
                          }).then(res => {
                            console.log(res.data, "check book resss in preset");
                            resolve(true);

                          })
                        })
                      })
                      .catch(err => {
                        RetryAddToCart({
                          sendCartSession: cartSession_body,
                          token,
                        })
                          .then(res => {
                            // resolve(true);
                            axios.get(`${url}/common/cart_itemsV2`, {
                              headers: {
                                Authorization: `JWT ${token}`
                              },
                            }).then(res => {
                              dispatch(CartSession(token))

                              axios.get(`${url}/common/check_book_incart`, {
                                headers: {
                                  Authorization: `JWT ${token}`,
                                },
                              }).then(res => {
                                console.log(res.data, "check book resss in preset");
                                resolve(true);

                              }).catch((err) => {
                                console.log(err, "err1117")
                                reject(err);
                              })
                            }).catch((err) => {
                              console.log(err, "err 1181")
                              reject(err)
                            })
                          })
                          .catch(err => {
                            reject(err);
                          });
                      });
                  })

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
    resolve(true);
  });
};

// const addPresetCartOnLogin = token  =>{
//   return new Promise((resolve, reject) => {
//     // console.log('in addPresetCartOnLogin');
//     // alert("addPresetCartOnLogin")
//     let current_local_cart = readCartLocalStorage();
//     if (current_local_cart != []) {
//       let book;
//       for (let index in current_local_cart) {
//         console.log(book,current_local_cart[book], 'sendCartSession');
//         // if()
//         book = current_local_cart[index];

//         // let key = sessionStorage.key(i);
//         try {
//           // let book = JSON.parse(sessionStorage.getItem(key));
//           // console.log(book, 'val', Array.isArray(book.bookInvId));

//           const sendCartSession = {
//             book_id: book.bookId,
//             book_inv_id: Array.isArray(book.bookInvId)
//               ? book.bookInvId[0]
//               : book.bookInvId,
//             cashbackedPrice: book.cashbackedPrice ? book.cashbackedPrice : 0,
//             discountedPrice: book.discountedPrice ? book.discountedPrice : 0,
//             cashback_per: book.cashback_per ? book.cashback_per : 0,
//             discount_per: book.discount_per ? book.discount_per : 0,
//             offertype: book.offertype ? book.offertype : null,
//             book_thumb: book.book_thumb,
//             book_qty:book.bookQty,
//           };
//           console.log({sendCartSession},"in preset cart");

//           if (!book.Cart_id) {
//             const cartSession_body = { cs: encryptor(sendCartSession) };

//             console.log(cartSession_body , "1243addPresetCartOnLogin")
//             axios
//               .post(`${url}/common/addtocart/`, cartSession_body, {
//                 headers: {
//                   Authorization: `JWT ${token}`,
//                 },
//               })
//               .then(res => {
//                 console.log(res, 'addPresetCartOnLogin');

//                 // resolve(true);
//               })
//               .catch(err => {
//                 console.log(err.response.status, 'err addPresetCartOnLogin');
//                 // console.log(err, 'error 1');

//                 RetryAddToCart({ sendCartSession: cartSession_body, token })
//                   .then(res => {
//                     // resolve(true);
//                   })
//                   .catch(err => {
//                     console.log(err, "err 1265")
//                     // reject(err)
//                   })

//               });
//           }
//         } catch (error) {
//           console.log(error, "error1268");
//           // reject(err)

//         }
//       }
//       resolve(true);
//       // this.props.CartSession(this.props.userToken);
//     } else {
//       console.log("no session addPresetCartOnLogin");
//       resolve(true);
//     }
//     resolve(true);
//   });
// };

const addPresetCartOnLogin = token => {
  return new Promise(async (resolve, reject) => {
    console.log('in addPresetCartOnLogin signpflow', token);

    let current_local_cart = await readCartLocalStorage();
    console.log(current_local_cart, "current_local_cart");
    if (current_local_cart != []) {
      let book;



      const forLoop = async () => {
        console.log('Before API Call signpflow');

        for (let index in current_local_cart) {
          // console.log(book,current_local_cart[book], 'sendCartSession');
          book = current_local_cart[index];
          console.log(book, "current book");
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
              book_qty: book.bookQty ? book.bookQty : null,
              book_thumb: book.book_thumb,
            };
            console.log(sendCartSession, "local sendcartSession");

            if (!book.Cart_id) {
              console.log("inside if signpflow");
              // const cartSession_body = { cs: encryptor(sendCartSession) };
              const cartSession_body = { sendCartSession };

              axios
                .post(`${url}/common/addtocart/`, cartSession_body, {
                  headers: {
                    Authorization: `JWT ${token}`,
                  },
                })
                .then(res => {
                  console.log(res, "1283 signpflow")

                })
                .catch(err => {
                  // console.log(err.response.status, 'addPresetCartOnLogin');
                  console.log(err, 'error 1119 signpflow');

                  RetryAddToCart({ sendCartSession: cartSession_body, token })

                    .then((res) => {
                      console.log(res, "1307 signpflow")
                    }).catch((err) => {
                      console.log(err, "error 1309 signpflow")
                    })
                });
            }

            // Inside the loop, after the axios.post or RetryAddToCart calls, check if it's the last iteration
            if (index === String(current_local_cart.length - 1)) {
              console.log("************1348 signpflow");

              // Resolve the promise here, after the last iteration
              resolve(true);
            }
          } catch (error) {
            console.log(error, "error 1345****************");
          }
        }



        console.log('After API Call signpflow');
      };


      // console.log(forLoop() , "1375signpflow")
      forLoop().then((res) => {
        console.log("**********1359 signpflow")
        resolve(true);
      });

      // if(forLoop())
      // {
      //   console.log("**********1359 signpflow")
      //   resolve(true);
      // }
      // let loop_addcart = await forLoop();
      // if (loop_addcart){
      //   console.log("**********1359 signpflow")
      //     resolve(true);
      // }

    } else {
      console.log("no session addPresetCartOnLogin");
      resolve(true);
    }
  });
};


const addPresetBulkCartOnLogin = token => {
  return new Promise(async (resolve, reject) => {
    console.log('in addPresetBulkCartOnLogin signpflow', token);

    let current_local_cart = await readCartLocalStorage();
    console.log(current_local_cart, "current_local_cart");
    if (current_local_cart != []) {
      let book;
      const forLoop = async () => {
        console.log('Before API Call signpflow');
        let add_cart_arr = []
        for (let index in current_local_cart) {
          // console.log(book,current_local_cart[book], 'sendCartSession');
          book = current_local_cart[index];
          console.log(book, "current book");
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
              book_qty: book.bookQty ? book.bookQty : null,
              book_thumb: book.book_thumb,
            };
            console.log(sendCartSession, "local sendcartSession");

            if (!book.Cart_id) {
              console.log("inside if signpflow");
              const cartSession_body = { cs: encryptor(sendCartSession) };
              // const cartSession_body = { sendCartSession };
              add_cart_arr.push(cartSession_body)



            }

            // Inside the loop, after the axios.post or RetryAddToCart calls, check if it's the last iteration
            // if (index === String(current_local_cart.length - 1)) {
            //   console.log("************1348 signpflow");

            //   // Resolve the promise here, after the last iteration
            //   resolve(true);
            // }
          } catch (error) {
            console.log(error, "error 1345****************");
          }
        }


        axios
          .post(`${url}/common/addtocart_tobulk`, add_cart_arr, {
            headers: {
              Authorization: `JWT ${token}`,
            },
          })
          .then(res => {
            console.log(res, "1283 signpflow")
            resolve(true);

          })
          .catch(err => {
            // console.log(err.response.status, 'addPresetCartOnLogin');
            console.log(err, 'error 1119 signpflow');

          });
        console.log(add_cart_arr, "signupflow 1489")

        console.log('After API Call signpflow');
      };


      // console.log(forLoop() , "1375signpflow")
      forLoop().then((res) => {
        console.log("**********1359 signpflow")

      });

      // if(forLoop())
      // {
      //   console.log("**********1359 signpflow")
      //   resolve(true);
      // }
      // let loop_addcart = await forLoop();
      // if (loop_addcart){
      //   console.log("**********1359 signpflow")
      //     resolve(true);
      // }

    } else {
      console.log("no session addPresetCartOnLogin");
      resolve(true);
    }
  });
};



export const usingMiddleWare = () => dispatch => {
  dispatch({
    type: USING_MIDDLEWARE,
    payload: 1,
  });
};

export const LoginSucces_msg = () => dispatch => {
  // alert("cartAcc")
  dispatch({
    type: LOGIN_DONE_MSG,
    payload: false,
  });
};

export const ForgetPassword = body => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/core/forgot_password`, body)
      .then(res => {
        resolve(true);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const RequestResetPassword = (body, token) => dispatch => {
  let headers = {
    headers: {
      Authorization: `JWT ${token}`,
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/core/reset_password`, body, headers)
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
export const Upload_profile = (body, userid, options) => dispatch => {
  // alert("upload")
  return new Promise((resolve, reject) => {
    AuthInstance.post(
      `${url}/common/profile_pic_upload/${userid}`,
      body,
      options
    ).then(res => {
      //   console.log(res, "upload")
      dispatch({
        type: UPLOAD_PROFILE,
        payload: "",
      });
      resolve(true);
    });
  }).catch(err => {
    console.log(err, "upload_error");

    reject(err);
  });
};

export const getUserAccess = body => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.post(`/core/api/post/token`, body)
      .then(res => {
        console.log({ res });

        removeCookie().then(remove_res => {
          let fourteenDaysMs = 60 * 60 * 24 * 14 * 1000;
          setCookie(res.data, fourteenDaysMs).then(cookie_res => {
            // console.log('get details');
            // dispatch(Getaddress());
            // dispatch(getAllDetails(res.data));
          });
        });
        resolve(res.data);
      })
      .catch(err => {
        let err_msg = err;
        console.log({ err });

        if (err) {
          if (err.response) {
            if (err.response.data) {
              if (err.response.data.msg) {
                err_msg = err.response.data.msg;
              }
            }
          }
        }
        reject(err_msg);
      });
  });
};

const RetryAddToCart = ({ sendCartSession, token }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/common/addtocart/`, sendCartSession, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then(res => {
        resolve(true);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const fetch_wishlist_detail = token => {
  let user = JSON.parse(localStorage.getItem("user_info"));
  let user_id = user.id;
  // console.log(user,"1256", user.id)
  // alert("hit")
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${config.get(
          "apiDomain"
        )}/api/wishlisting/fetch_wishlist_data/${user_id}`,
        {
          headers: {
            Authorization: `JWT ${token}`,
          },
        }
      )
      .then(res => {
        // alert("jjjj")

        resolve(res);
        // console.log(res, 'wishlist');
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const fetch_wishlist_detail_otherpage = () => dispatch => {
  let user = JSON.parse(localStorage.getItem("user_info"));
  if (user) {
    let user_id = user.id;
    // console.log(user,"1256", user.id)
    // alert("hit")
    return new Promise((resolve, reject) => {
      AuthInstance.post(`${url}/api/wishlisting/fetch_wishlist_data/${user_id}`)
        .then(res => {
          // alert("jjjj")
          dispatch({
            type: FETCHWISHLIST_DATA,
            payload: res.data,
          });
          resolve(res);
          // console.log(res, 'wishlist');
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
};
// export const setComponentStatus = (status) => (dispatch) => {

export const Upload_id_proof = (body, userid) => dispatch => {
  // alert("upload")
  return new Promise((resolve, reject) => {
    AuthInstance.post(`${url}/common/Id_proof_Upload/${userid}`, body)
      .then(res => {
        //   console.log(res, "upload")
        dispatch({
          type: UPLOAD_PROFILE,
          payload: "",
        });
        resolve(true);
      })
      .catch(err => {
        console.log(err, "upload_error");

        reject(err);
      });
  });
};

export const Upload_cv = (body, userid) => dispatch => {
  // alert("upload")
  return new Promise((resolve, reject) => {
    AuthInstance.post(`${url}/common/content_cv_Upload/${userid}`, body)
      .then(res => {
        //   console.log(res, "upload")
        dispatch({
          type: UPLOAD_PROFILE,
          payload: "",
        });
        resolve(true);
      })
      .catch(err => {
        console.log(err, "upload_error");
        reject(err);
      });
  });
};

export const Upload_signed_offer = (body, userid) => dispatch => {
  // alert("upload")
  return new Promise((resolve, reject) => {
    AuthInstance.post(`${url}/common/Upload_signed_offer/${userid}`, body)
      .then(res => {
        //   console.log(res, "upload")
        dispatch({
          type: UPLOAD_PROFILE,
          payload: "",
        });
        resolve(true);
      })
      .catch(err => {
        console.log(err, "upload_error");
        reject(err);
      });
  });
};

export const fetch_user_detail_content = (userid, token) => dispatch => {
  //  alert("fetch_user_detail")
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/core/fetch_user_details/${userid}`
      // {
      // 	// headers: {
      // 	// 	Authorization: token
      // 	// }
      // }
    )
      .then(res => {
        dispatch({
          type: FETCH_USERS_DETAIL,
          payload: res.data,
        });
        resolve(true);
      })
      .catch(err => {
        // console.log(err);
        reject(err);
      });
  });
};

export const check_user_existance = body => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.post(`${url}/core/check_user_existance`, body)
      .then(res => {
        dispatch({
          type: CHECK_LOGIN_USERMSG,
          payload: res.data,
        });
        resolve(true);
      })
      .catch(err => {
        console.log(err, "5555");
        reject(err);
      });
  });
};

export const get_razorpay_key = () => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(`${url}/api/verify_payments/get_payment_key`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        console.log(err, "5555");
        reject(err);
      });
  });
};

export const fetch_user_access_new = (email) => dispatch => {
  let body = {
    email: email
  }
  return new Promise((resolve, reject) => {
    // fetch_employee_access api avaible in backoffice backend
    let hostUrl = "https://data.mypustak.com"
    AuthInstance.post(
      `${hostUrl}/api/v1/backoffice_roles/fetch_employee_access`, body
    )
      .then((res) => {
        console.log(res, "res...................come")
        resolve(res.data.data)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
};



export const CartSession = token => dispatch => {
  dispatch({
    type: FETCHING_CART,
    payload: {},
  });
  // alert(token);
  console.log('Cart Session signpflow---------------------------------------------------------');
  const header = {
    headers: { Authorization: `JWT ${token}` },
  };
  return new Promise((resolve, reject) => {
    token
      ? axios
        // .get(`${url}/common/cart_items/`, header)
        .get(`${url}/common/cart_itemsV2`, header)
        .then(res => {
          // alert("action")
          console.log(res.data.items, "cart_itemsV2 signpflow");
          dispatch({
            type: CARTSESSION,
            payload: res.data.items,
          });
          // console.log(res, 'CartSession');
          resolve(res.data.items);
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: FETCHING_CART_ERR,
            payload: {},
          });
          reject(err);
        })
      // : AuthInstance.get(`${url}/common/cart_items/`)
      : AuthInstance.get(`${url}/common/cart_itemsV2`)
        .then(res => {
          // alert("action")
          dispatch({
            type: CARTSESSION,
            payload: res.data.items,
          });
          console.log(res, 'CartSession signpflow1967');
          resolve(res.data.items);
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: FETCHING_CART_ERR,
            payload: {},
          });
          reject(err);
        });
  });
};

export const after_signup_presetlogin = (data) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/core/user_details/`, {
        headers: {
          Authorization: `JWT ${data}`,
        },
      }).then(res => {
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
        resolve(true)
        // console.log('localstorage ---');
      })
      .catch(err => {
        console.log({ err }, "userdetails");


      });
  })
}

export const addPresetCartOnLogin_signup = token => {
  return new Promise((resolve, reject) => {
    // console.log('in addPresetCartOnLogin');
    // alert("addPresetCartOnLogin")
    let current_local_cart = readCartLocalStorage();
    if (current_local_cart != []) {
      let book;
      for (let index in current_local_cart) {
        console.log(book, current_local_cart[book], 'sendCartSession');
        // if()
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
            book_qty: book.bookQty,
          };
          console.log({ sendCartSession }, "in preset cart");

          if (!book.Cart_id) {
            const cartSession_body = { cs: encryptor(sendCartSession) };

            console.log(cartSession_body, "1243addPresetCartOnLogin")
            axios
              .post(`${url}/common/addtocart/`, cartSession_body, {
                headers: {
                  Authorization: `JWT ${token}`,
                },
              })
              .then(res => {
                console.log(res, 'addPresetCartOnLogin');

                // resolve(true);
              })
              .catch(err => {
                console.log(err.response.status, 'err addPresetCartOnLogin');
                // console.log(err, 'error 1');

                RetryAddToCart({ sendCartSession: cartSession_body, token })
                  .then(res => {
                    // resolve(true);
                  })
                  .catch(err => {
                    console.log(err, "err 1265")
                    // reject(err)
                  })

              });
          }
        } catch (error) {
          console.log(error, "error1268");
          // reject(err)

        }
      }
      resolve(true);
      // this.props.CartSession(this.props.userToken);
    } else {
      console.log("no session addPresetCartOnLogin");
      resolve(true);
    }
    resolve(true);
  });
};

export const fetch_communication_preferences = () => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(`${url}/api/v1/communication_preferences/fetch_communication_preferences`, {

    })
      .then(res => {
        console.log(res.data, "1234");
        dispatch({
          type: fETCH_COMMUNICATE_PREFERENCE,
          payload: res.data.data,
        });
        resolve(res.data.data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};
export const update_communication_preferences = body => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.post(`${url}/api/v1/communication_preferences/update_communication_preferences`, body)
      .then(res => {
        console.log(res, "1234");

        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};


// export const addPresetBulkCartOnLoginAction = token => dispatch => {
//   return new Promise(async (resolve, reject) => {
//     alert("addPresetBulkCartOnLoginAction")
//     console.log('in addPresetBulkCartOnLogin signpflow', token);

//     let current_local_cart = await readCartLocalStorage();
//     console.log(current_local_cart, "current_local_cart");
//     if (current_local_cart != []) {
//       let book;
//       const forLoop = async () => {
//         console.log('Before API Call signpflow');
//         let add_cart_arr = []
//         for (let index in current_local_cart) {
//           // console.log(book,current_local_cart[book], 'sendCartSession');
//           book = current_local_cart[index];
//           console.log(book, "current book");
//           // let key = sessionStorage.key(i);
//           try {
//             // let book = JSON.parse(sessionStorage.getItem(key));
//             // console.log(book, 'val', Array.isArray(book.bookInvId));
//             const sendCartSession = {
//               book_id: book.bookId,
//               book_inv_id: Array.isArray(book.bookInvId)
//                 ? book.bookInvId[0]
//                 : book.bookInvId,
//               cashbackedPrice: book.cashbackedPrice ? book.cashbackedPrice : 0,
//               discountedPrice: book.discountedPrice ? book.discountedPrice : 0,
//               cashback_per: book.cashback_per ? book.cashback_per : 0,
//               discount_per: book.discount_per ? book.discount_per : 0,
//               offertype: book.offertype ? book.offertype : null,
//               book_qty: book.bookQty ? book.bookQty : null,
//               book_thumb: book.book_thumb,
//             };
//             console.log(sendCartSession, "local sendcartSession");

//             if (!book.Cart_id) {
//               console.log("inside if signpflow");
//               const cartSession_body = { cs: encryptor(sendCartSession) };
//               // const cartSession_body = { sendCartSession };
//               add_cart_arr.push(cartSession_body)



//             }

//             // Inside the loop, after the axios.post or RetryAddToCart calls, check if it's the last iteration
//             // if (index === String(current_local_cart.length - 1)) {
//             //   console.log("************1348 signpflow");

//             //   // Resolve the promise here, after the last iteration
//             //   resolve(true);
//             // }
//           } catch (error) {
//             console.log(error, "error 1345****************");
//           }
//         }


//         axios
//           .post(`${url}/common/addtocart_tobulk`, add_cart_arr, {
//             headers: {
//               Authorization: `JWT ${token}`,
//             },
//           })
//           .then(res => {
//             console.log(res, "1283 signpflow")
//             resolve(true);

//           })
//           .catch(err => {
//             // console.log(err.response.status, 'addPresetCartOnLogin');
//             console.log(err, 'error 1119 signpflow');

//           });
//         console.log(add_cart_arr, "signupflow 1489")

//         console.log('After API Call signpflow');
//       };


//       // console.log(forLoop() , "1375signpflow")
//       forLoop().then((res) => {
//         console.log("**********1359 signpflow")
//         resolve(true);
//       });

//       // if(forLoop())
//       // {
//       //   console.log("**********1359 signpflow")
//       //   resolve(true);
//       // }
//       // let loop_addcart = await forLoop();
//       // if (loop_addcart){
//       //   console.log("**********1359 signpflow")
//       //     resolve(true);
//       // }

//     } else {
//       console.log("no session addPresetCartOnLogin");
//       resolve(true);
//     }
//   });
// };

// 2222222222222222222
export const addPresetBulkCartOnLoginAction = token => dispatch => {
  return new Promise((resolve, reject) => {
    let current_local_cart = readCartLocalStorage();
    console.log(current_local_cart, "current_local_cart");
    if (current_local_cart != []) {
      let book;
      console.log('Before API Call signpflow');
      let add_cart_arr = []
      for (let index in current_local_cart) {
        // console.log(book,current_local_cart[book], 'sendCartSession');
        book = current_local_cart[index];
        console.log(book, "current book");
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
            book_qty: book.bookQty ? book.bookQty : null,
            book_thumb: book.book_thumb,
          };
          console.log(sendCartSession, "local sendcartSession");

          if (!book.Cart_id) {
            console.log("inside if signpflow");
            const cartSession_body = { cs: encryptor(sendCartSession) };
            // const cartSession_body = { sendCartSession };
            add_cart_arr.push(cartSession_body)

          }
        } catch (error) {
          console.log(error, "error 1345****************");
        }
      }
      axios
        .post(`${url}/common/addtocart_tobulk`, add_cart_arr, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
        .then(res => {
          console.log(res, "2391 signpflow")
          resolve(true);
        })
        .catch(err => {
          // console.log(err.response.status, 'addPresetCartOnLogin');
          console.log(err, 'error 2397 signpflow');
          resolve(true)
        });


    }
  });
};