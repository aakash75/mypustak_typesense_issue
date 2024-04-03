// import {LOGIN,SIGNUP,LOGINFAILS,LOGOUT,SIGNEDUP,SHOWLOADER,GETADDRESS,ADD_ADDRESS} from './types'
import {
  GETORDERLIST,
  UPDATEORDERBYID,
  REFUNDORDERBYID,
  ORDERLISTLOADING,
  FETCHSHIPPINGADDRESS,
  SHIPPINGADDRESSLOADING,
  UPDATESHIPPINGADDRESS,
  UPDATEORDERSTATUS,
  SERACHORDERLIST,
  FILTERORDER,
  CLEAR_ORDERLIST,
  GETCOURIERDETAILS,
  SENDOURIERDETAILS,
  GET_ORDER_NOTES,
  GET_ORDERNOTE_LOADER,
  INSERT_ORDER_NOTES,
  LOADING_ORDER_EXCEL,
  ORDER_EXCEL_UPLOADED,
  BACKOFFICEROLE,
  ACCESSLOADER,
  MERGEORDER,
  GETMERGEORDER,
  MERGINGLOADER,
  UPDATE_ORDER_TRACKING,
  LOADING_UPDATE_ORDER_TRACKING,
  GETSTATUSVERIFY,
  SERACHORDERLISTSTATUS,
  STATUSLOADER,
  ORDERRTO,
  RTOVERIFIED,
  VERIFIEDRTO,
  INSTOCKRTO,
  RESENTMAIL,
  GET_ESCALATE_LIST,
  CANCILORDER,
  GETZONES,
  CLEAR_GETZONES,
  GET_DISPUTED_LIST,
  FLAG_USER,
  FILTER_NOT_TXNORDER,
  REFUNDORDER,
  VIEW_GATEWAY_PAYMENT,
  TRACK_ORDER,
  ADDRESSVERIFICATION,
} from "../constants/types";
import axios from "axios";
// import config from "react-global-configuration";
import { AuthInstance, url } from "../../helper/api_url";
import { isError } from "lodash";

export const getOrdersList =
  ({ page, token, search, searchValue }) =>
    dispatch => {
      dispatch({
        type: ORDERLISTLOADING,
        payload: {},
      });

      let header = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      let URL = "";
      if (searchValue) {
        URL = `${url}/api/v1/fetch_order_details/fetch-order-details/${searchValue}`;

        AuthInstance.get(URL)
          .then(res => {
            if (res.status === 200) {
              dispatch({
                type: SERACHORDERLIST,
                payload: { data: res.data },
              });
            }
          })
          .catch(err => console.log(err));
      } else {
        URL = `${url}/api/v1/order_details_api/fetch-order/${page + 1}/`;

        AuthInstance.get(URL)
          .then(res => {
            if (res.status === 200) {
              if (search) {
                dispatch({
                  type: SERACHORDERLIST,
                  payload: { data: res.data },
                });
              } else {
                dispatch({
                  type: GETORDERLIST,
                  payload: { data: res.data, page },
                });
              }
            }
            console.log(res.data, "getOrdersList");
          })
          .catch(err => console.log(err));
      }
    };

export const updateOrder = (order, token) => dispatch => {
  // console.log(order, 'order');

  // alert("Updateordr")
  // dispatch({
  //   type: ORDERLISTLOADING,
  //   payload: {},
  // });

  let header = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  let body = order;
  // return new Promise((resolve, reject) => {

  return new Promise((resolve, reject) => {
    AuthInstance.patch(
      `${url}/api/v1/order_details_api/update-order/${order.order_id}`,
      body
    )
      .then(res => {
        if (res.data.status === 200) {
          // alert("updated");
          dispatch({
            type: UPDATEORDERBYID,
            payload: { order },
          });
        }
        resolve(res.data);
      })
      .catch(err => {
        console.log({ err });
        reject(err.response.data);
      });
  });
};

export const updateShippingAddress = (order, token) => dispatch => {
  dispatch({
    type: SHIPPINGADDRESSLOADING,
    payload: {},
  });

  let header = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  let body = order;
  console.log(order.id, "12369696", order);
  return new Promise((resolve, reject) => {
    AuthInstance.patch(
      `${url}/api/v1/order_details_api/update-address/${order.id}`,
      body
    )
      .then(res => {
        if (res.data.status === 200) {
          dispatch({
            type: UPDATESHIPPINGADDRESS,
            payload: { order },
          });
          resolve(true);
        }
      })
      .catch(err => {
        console.log(err, "update");
        reject(err);
      });
  });
};

export const getShippingAddressInfo = (order_id, token) => dispatch => {
  dispatch({
    type: SHIPPINGADDRESSLOADING,
    payload: {},
  });

  let header = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/v1/order_details_api/fetch-order-address-by-orderid/${order_id}/`
    )
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: FETCHSHIPPINGADDRESS,
            payload: { order_id, data: res.data.data },
          });
          resolve(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};
export const getFilterOrders =
  ({ token, page, status, date, exclude }) =>
    dispatch => {
      dispatch({
        type: ORDERLISTLOADING,
        payload: {},
      });

      // {{ Nurl/api/v1/order_details_api/filter-fetch-order/1/0 }}
      console.log({ token, page, status });

      // let URL = `https://data.mypustak.com/api/v1/order_details_api/filter-fetch-order/${page}/${status}/${date}`;
      // axios.get(URL,header)
      // .then(res =>{
      //   if(res.status == 200){
      //     dispatch({
      //       type: FILTERORDER,
      //       payload: { data: res.data }
      //     })
      //   }
      // })
      // .catch(err=>{
      //   console.log(err,"getFilterOrders");

      // })

      AuthInstance.get(
        `${url}/api/v1/order_details_api/filter-fetch-order/${page + 1
        }/${status}/${date}/${exclude}`
      )
        .then(res => {
          if (res.status === 200) {
            if (page === 0) {
              dispatch({
                type: FILTERORDER,
                payload: { data: res.data, page },
              });
            } else {
              dispatch({
                type: GETORDERLIST,
                payload: { data: res.data, page },
              });
            }

            console.log(res.data, "filter");
          }
        })
        .catch(err => console.log(err));
    };

export const getCourierDetails =
  ({ order_id, token }) =>
    dispatch => {
      let header = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      AuthInstance.get(
        `${url}/api/v1/SendMailtoCourier/get/getDetails/${order_id}`
      )
        .then(res => {
          console.log(res.data.details, "getCourierDetails");
          dispatch({
            type: GETCOURIERDETAILS,
            payload: res.data.details,
          });
        })
        .catch(err => {
          alert("Error Please check the data passed or the connection");
          console.log(err, "getCourierDetails");
        });
    };

export const SendCourierMail =
  ({ body, token }) =>
    dispatch => {
      axios
        .post(`${url}/common/courierPatnerEmail/`, body)
        .then(res => {
          console.log(res, "SendCourierMail");
          alert("Mail Send");
        })
        .catch(err => {
          alert("Mail Not Send");
          console.log(err, "SendCourierMail");
        });
    };

export const getordernotes = (order_id, token) => dispatch => {
  dispatch({
    type: GET_ORDERNOTE_LOADER,
    payload: {},
  });

  AuthInstance.get(
    `${url}/api/v1/order_details_api/fetchordernotes/${order_id}/`
  )
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: GET_ORDER_NOTES,
          payload: { order_id, data: res.data.data },
        });
        console.log(res, "notes");
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ORDERNOTE_LOADER,
        payload: "",
      });
    });
};

export const insertordernotes =
  (addordernote, addordernotetype, ordernote_orderid, token) => dispatch => {
    // dispatch({
    //     type: SHIPPINGADDRESSLOADING,
    //     payload: {  }
    //   });

    console.log(addordernotetype, "type1");
    let header = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    let body = {
      ordernote: addordernote,
      ordernotetype: addordernotetype,
      orderid: ordernote_orderid,
    };
    AuthInstance.post(
      `${url}/api/v1/order_details_api/insertordernotes/${ordernote_orderid}`,
      body
    )
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: INSERT_ORDER_NOTES,
            payload: {},
          });
          console.log(res, "notes");
          AuthInstance.get(
            `${url}/api/v1/order_details_api/fetchordernotes/${ordernote_orderid}/`
          )
            .then(res => {
              if (res.status === 200) {
                dispatch({
                  type: GET_ORDER_NOTES,
                  payload: { ordernote_orderid, data: res.data.data },
                });
                console.log(res, "notes");
              }
            })
            .catch(err => {
              console.log(err);
              dispatch({
                type: GET_ORDERNOTE_LOADER,
                payload: "",
              });
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

export const uploadOrderExcel =
  ({ token, body }) =>
    dispatch => {
      dispatch({
        type: LOADING_ORDER_EXCEL,
        payload: "",
      });

      AuthInstance.post(`${url}/api/v1/order_details_api/UploadOrderExcel`, body)
        .then(res => {
          console.log(res, "uploadOrderExcel");
          dispatch({
            type: ORDER_EXCEL_UPLOADED,
            payload: "",
          });
          alert("File uploaded");
        })
        .catch(err => {
          // alert("Mail Not Send")
          alert("File Not Uploaded");
          console.log(err, "uploadOrderExcel");
        });
    };

export const backofficeAccess = () => dispatch => {
  // alert("hitttt")

  dispatch({
    type: ACCESSLOADER,
    payload: "",
  });

  let body = {
    email: localStorage.getItem("useremail"),
  };
  AuthInstance.post(`${url}/common/backoffice_roles/`, body)
    .then(res => {
      // alert("respo")
      // console.log(res.data, "resback");
      dispatch({
        type: BACKOFFICEROLE,
        payload: res.data,
      });
    })
    .catch(err => {
      // alert('erro');
      console.log(err, "backofficeerror");
    });
};

export const mergeorder =
  ({ token, orderid, orderlist }) =>
    dispatch => {
      // alert("hit")
      dispatch({
        type: MERGINGLOADER,
        payload: "",
      });

      let body = {
        orderid: orderid,
        orderlist: orderlist,
      };
      AuthInstance.post(`${url}/api/v1/order_details_api/merge_order`, body)
        .then(res => {
          alert(res.data.message);
          console.log(res.data);
          dispatch({
            type: MERGEORDER,
            payload: res.data,
          });
        })
        .catch(err => console.log(err));
    };

export const getMergeorder =
  ({ token, orderid }) =>
    dispatch => {
      // alert("merge")
      let body = {
        orderid: orderid,
      };
      AuthInstance.post(`${url}/api/v1/order_details_api/merge_datalist`, body)
        .then(res => {
          console.log(res.data);
          dispatch({
            type: GETMERGEORDER,
            payload: res.data,
          });
        })
        .catch(err => console.log(err));
    };

export const update_tracking_order_status =
  ({ token }) =>
    dispatch => {
      dispatch({
        type: LOADING_UPDATE_ORDER_TRACKING,
        payload: "",
      });

      AuthInstance.get(
        `${url}/api/v1/order_details_api/Update_order_tracking_status`
      )
        .then(res => {
          dispatch({
            type: UPDATE_ORDER_TRACKING,
            payload: "",
          });
          alert("Orders Updated");
        })
        .catch(err => {
          dispatch({
            type: LOADING_UPDATE_ORDER_TRACKING,
            payload: "",
          });
          console.log({ err });

          alert(err);
        });
    };

export const getStatusVerify =
  ({ order_id }) =>
    dispatch => {
      dispatch({
        type: STATUSLOADER,
        payload: "",
      });

      // alert("merge")
      let body = {
        order_id: order_id,
      };

      console.log(localStorage.getItem("user"), "verify");
      console.log(body, "orderver");

      AuthInstance.post(
        `http://${url}/api/v1/order_details_api/status_verify`,
        body
      )
        .then(res => {
          console.log(res.data, "verify");
          dispatch({
            type: GETSTATUSVERIFY,
            payload: res.data.data,
          });
        })
        .catch(err => console.log(err));
    };

export const getOrdersListStatus =
  ({ page, token, search, searchValue }) =>
    dispatch => {
      dispatch({
        type: ORDERLISTLOADING,
        payload: {},
      });

      let URL = "";
      if (searchValue) {
        URL = `${url}/api/v1/fetch_order_details/fetch-order-status/${searchValue}`;

        AuthInstance.get(URL)
          .then(res => {
            if (res.status === 200) {
              dispatch({
                type: SERACHORDERLISTSTATUS,
                payload: { data: res.data },
              });
            }
          })
          .catch(err => console.log(err));
      } else {
        URL = `${url}/api/v1/order_details_api/fetch-order-status/${page + 1}/`;

        AuthInstance.get(URL)
          .then(res => {
            if (res.status === 200) {
              if (search) {
                dispatch({
                  type: SERACHORDERLISTSTATUS,
                  payload: { data: res.data },
                });
              } else {
                dispatch({
                  type: SERACHORDERLISTSTATUS,
                  payload: { data: res.data },
                });
              }
            }
            console.log(res.data, "getOrdersList");
          })
          .catch(err => console.log(err));
      }
    };

export const getRto =
  ({ page, token, search, searchValue }) =>
    dispatch => {
      // dispatch({
      //     type: ORDERLISTLOADING,
      //     payload: {  }
      //   });
      // alert(page,"tsts")

      let URL = "";
      if (searchValue) {
        URL = `${url}/api/v1/fetch_order_details/get_rto/${searchValue}`;

        AuthInstance.get(URL)
          .then(res => {
            if (res.status === 200) {
              dispatch({
                type: ORDERRTO,
                payload: { data: res.data },
              });
            }
          })
          .catch(err => console.log(err));
      } else {
        URL = `${url}/api/v1/order_details_api/get_Rto/${page + 1}/`;

        AuthInstance.get(URL)
          .then(res => {
            if (res.status === 200) {
              if (search) {
                dispatch({
                  type: ORDERRTO,
                  payload: { data: res.data },
                });
              } else {
                dispatch({
                  type: ORDERRTO,
                  payload: { data: res.data },
                });
              }
            }
            console.log(res.data, "getOrdersList");
          })
          .catch(err => console.log(err));
      }
    };

export const rto_verified =
  ({ orderid, rtonotes, token }) =>
    dispatch => {
      console.log(orderid, "12", rtonotes);
      // alert("hit")
      let body = {
        ordernotes: rtonotes,
      };
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/v1/order_details_api/rto_verified/${orderid}`,
          body
        )
          .then(res => {
            console.log(res.data, "mark");
            // alert(res.data.message)
            dispatch({
              type: RTOVERIFIED,
              payload: orderid,
            });

            resolve(true);
          })
          .catch(err => {
            console.log(err, "error");
            resolve(false);
          });
      });
    };

export const getverifiedRto =
  ({ page, token, search, searchValue }) =>
    dispatch => {
      // alert("2")
      // dispatch({
      //     type: ORDERLISTLOADING,
      //     payload: {  }
      //   });
      // alert("hit")

      let URL = "";
      if (searchValue) {
        URL = `${url}/api/v1/fetch_order_details/get_verifiedRto/${searchValue}`;

        AuthInstance.get(URL)
          .then(res => {
            if (res.status === 200) {
              dispatch({
                type: VERIFIEDRTO,
                payload: { data: res.data },
              });
            }
          })
          .catch(err => console.log(err));
      } else {
        // alert("hit2")
        URL = `${url}/api/v1/order_details_api/get_verifiedRto/${page + 1}/`;

        AuthInstance.get(URL)
          .then(res => {
            if (res.status === 200) {
              if (search) {
                dispatch({
                  type: VERIFIEDRTO,
                  payload: { data: res.data },
                });
              } else {
                dispatch({
                  type: VERIFIEDRTO,
                  payload: { data: res.data, page },
                });
              }
            }
            console.log(res.data, "getOrdersList");
          })
          .catch(err => console.log(err));
      }
    };

export const rto_instock =
  ({ orderid, token }) =>
    dispatch => {
      console.log(orderid, "12");
      // alert("hit")
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/v1/order_details_api/rto_book_instock/${orderid}`,
          null
        )
          .then(res => {
            console.log(res, "mark");
            alert(res.data.message);
            dispatch({
              type: INSTOCKRTO,
              payload: res.data,
            });
            resolve(true);
          })
          .catch(err => {
            console.log(err, "error");
          });
      });
    };

export const ResendMail =
  ({ orderid }) =>
    dispatch => {
      console.log(orderid, "12");
      // alert("hit")
      // let header = {
      //   headers: {
      //     Authorization: `Token ${token}`
      //   }
      // };
      // alert("hhh");
      return new Promise((resolve, reject) => {
        axios
          .post(`${url}/common/ResentMail/${orderid}`, null)
          .then(res => {
            console.log(res, "mark");
            // alert(res.data.message)
            dispatch({
              type: RESENTMAIL,
              payload: orderid,
            });
            resolve(true);
          })
          .catch(err => {
            console.log(err, "error");
          });
      });
    };

export const get_escalate_list =
  ({ page }) =>
    dispatch => {
      // alert(page, "12");
      // alert("hit get_escalate_list")
      // let header = {
      //   headers: {
      //     Authorization: `Token ${token}`
      //   }
      // };
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${url}/api/v1/order_details_api/Escalate_filter/${page + 1}/1`,
            null
          )
          .then(res => {
            console.log(res, "mark");
            // alert(res.data.message)
            dispatch({
              type: GET_ESCALATE_LIST,
              payload: { data: res.data, page },
            });
            resolve(true);
          })
          .catch(err => {
            console.log(err, "error");
          });
      });
    };

export const cancilOrder_list =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${url}/api/v1/order_details_api/Update_status_order`, body)
          .then(res => {
            console.log(res, "mark");
            // alert(res.data.message)
            dispatch({
              type: CANCILORDER,
              payload: {
                orderidList: body.orderid,
                status: body.status,
              },
            });
            console.log(res, "resrses");
            resolve(true);
          })
          .catch(err => {
            console.log(err, "error");
          });
      });
    };
export const getZones =
  ({ body, token }) =>
    dispatch => {
      dispatch({
        type: CLEAR_GETZONES,
      });
      return new Promise((resolve, reject) => {
        AuthInstance.post(`${url}/pincode/fetch_zone`, body)
          .then(res => {
            console.log({ res });

            dispatch({
              type: GETZONES,
              payload: res.data.zone,
            });
          })
          .catch(err => {
            console.log({ err });

            dispatch({
              type: GETZONES,
              payload: "NO DATA FOUND",
            });
          });
      });
    };

export const InStockOrderBooks =
  ({ order_id, token }) =>
    dispatch => {
      // dispatch({

      // })

      AuthInstance.post(
        `${url}/api/v1/order_details_api/update-order_book-insock/${order_id}`,
        null
      )
        .then(res => {
          // console.log({ res });
          // alert('B')
        })
        .catch(err => {
          console.log({ err });
          alert(`Book Not instocked Properly , ${err}`);
        });
    };

export const getCodFilterData =
  ({ payment_type, date, page, token }) =>
    dispatch => {
      dispatch({
        type: ORDERLISTLOADING,
        payload: {},
      });

      AuthInstance.get(
        `${url}/api/v1/order_details_api/filter-payment-order/${page + 1
        }/${payment_type}/${date}`
      )
        .then(res => {
          if (res.status === 200) {
            if (page === 0) {
              dispatch({
                type: FILTERORDER,
                payload: { data: res.data, page },
              });
            } else {
              dispatch({
                type: GETORDERLIST,
                payload: { data: res.data, page },
              });
            }

            console.log(res.data, "filter");
          }
        })
        .catch(err => console.log(err));
    };

export const sendOrderTrackingEmail = order_id => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(`${url}/api/send_email/order_tracking_mail/${order_id}`)
      .then(res => {
        console.log({ res });
        alert(res.data.message);
        resolve(true);
      })
      .catch(err => {
        console.log({ err });
        alert(err);
        reject(err);
      });
  });
};

export const Getlabel = order_id => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/api/v1/order_details_api/get_tracking_label/${order_id}`)
      .then(res => {
        resolve(res.data.output);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const requestCaptureRzp = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/api/capture_payment_id/capture_rzp`)
      .then(res => {
        resolve(true);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const get_disputed_list =
  ({ page }) =>
    dispatch => {
      // alert(page, "12");
      // alert("hit get_escalate_list")
      // let header = {
      //   headers: {
      //     Authorization: `Token ${token}`
      //   }
      // };
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${url}/api/v1/order_details_api/Escalate_filter/${page + 1}/3`,
            null
          )
          .then(res => {
            console.log(res, "mark");
            // alert(res.data.message)
            dispatch({
              type: GET_DISPUTED_LIST,
              payload: { data: res.data, page },
            });
            resolve(true);
          })
          .catch(err => {
            console.log(err, "error");
          });
      });
    };

export const capture_rzp_failed = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/api/verify_payments/razorpay`)
      .then(res => {
        console.log(res.data, "mark");

        resolve(res.data);
      })
      .catch(err => {
        console.log(err, "error");
        reject(error.response.data);
      });
  });
};

export const capture_cashfree_failed = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/api/verify_payments/cashfree`)
      .then(res => {
        console.log(res.data, "mark");
        resolve(res.data);
      })
      .catch(err => {
        console.log(err, "error");
        reject(error.response.data);
      });
  });
};

export const Flag_user_Action =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(`${url}/api/v1/order_details_api/flag_user`, body)
          .then(res => {
            console.log({ res });

            dispatch({
              type: FLAG_USER,
              payload: { user_id: body.user_id, flag: body.flag },
            });
          })
          .catch(err => {
            console.log({ err });
          });
      });
    };

export const Get_notTxn_list =
  ({ page }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${url}/api/v1/order_details_api/fetchorder_Txn_notentered/${page + 1
            }/`,
            null
          )
          .then(res => {
            console.log(res, "mark");
            // alert(res.data.message)
            dispatch({
              type: FILTER_NOT_TXNORDER,
              payload: { data: res.data, page },
            });
            resolve(true);
          })
          .catch(err => {
            console.log(err, "error");
          });
      });
    };

export const get_delhivery_booking_details = awb => dispatch => {
  console.log({ awb }, "awdawd");
  // alert("action");
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://data.mypustak.com/api/delhivery_booking/delhivery_tracking/${awb}`
      )
      .then(res => {
        // alert("then");
        dispatch({
          type: TRACK_ORDER,
          payload: res.data,
        });
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const create_ndr = body => dispatch => {
  console.log({ body });
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/delhivery_booking/create_delhivery_ndr`, body, null)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const ResendMail_auto_mail = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/common/Sent_bulk_automail`, null)
      .then(res => {
        console.log(res, "mark");
        // alert(res.data.message)
        // dispatch({
        // 	type: RESENTMAIL,
        // 	payload: ''
        // });
        resolve(true);
      })
      .catch(err => {
        console.log(err, "error");
      });
  });
};

export const Raise_refund_order = body => dispatch => {
  return new Promise((resolve, reject) => {
    let isRefundSuccess = false;
    AuthInstance.post(
      `${url}/api/v1/order_details_api/create_wallet_refund`,
      body
    )
      .then(res => {
        isRefundSuccess = true;
        // alert("Refund Seccessfull")
        console.log(res, "mark");
        // alert(res.data.message)
        // dispatch({
        // 	type: RESENTMAIL,
        // 	payload: ''
        // });
        resolve({ res: res, isRefundSuccess: isRefundSuccess });
      })
      .catch(err => {
        // alert("err in action")
        console.log(err, "error");
        reject(err);
      });
  });
};
export const Raise_refund_order_all = body => dispatch => {
  return new Promise((resolve, reject) => {
    let isRefundSuccess = false;

    AuthInstance.post(
      `${url}/api/v1/order_details_api/create_order_refund`,
      body
    )
      .then(res => {
        // alert("Refund Seccessfull")
        isRefundSuccess = true;
        console.log(res, "mark");
        // alert(res.data.message)
        // dispatch({
        // 	type: RESENTMAIL,
        // 	payload: ''
        // });
        resolve({ res: res, isRefundSuccess: isRefundSuccess });
      })
      .catch(err => {
        // alert("err in action")
        console.log(err, "error");
        reject(err);
      });
  });
};

export const refundOrder = body => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.post(
      `${url}/api/v1/order_details_api/create_order_refund`,
      body
    )
      .then(res => {
        dispatch({
          type: REFUNDORDER,
          payload: body.orderid,
        });
        resolve(true);
      })
      .catch(err => {
        console.log(err, "Error");
        resolve(false);
      });
  });
};

export const view_gateway_payment_detail = order_id => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/v1/post/get_razorpayid/fetchPaymentByOrderId/${order_id}`
    )
      .then(res => {
        console.log(res.data, "gateway ");
        dispatch({
          type: VIEW_GATEWAY_PAYMENT,
          payload: res.data.data,
        });
        resolve(true);
      })
      .catch(err => {
        console.log(err, "Error");
        resolve(false);
      });
  });
};

export const Get_creditnotes_not_created =
  ({ page }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${url}/api/v1/order_details_api/fetchorder_credit_notcreated/${page + 1
            }/`,
            null
          )
          .then(res => {
            console.log(res, "mark");
            // alert(res.data.message)
            dispatch({
              type: FILTER_NOT_TXNORDER,
              payload: { data: res.data, page },
            });
            resolve(true);
          })
          .catch(err => {
            console.log(err, "error");
          });
      });
    };
export const prepaid_to_codAction = (body, order_id) => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.patch(
      `${url}/api/v1/convert_cod_order_to_prepaid_order/ConvertPrepaidOrder_to_CodManuallyBackoffice/${order_id}`,
      body
    )
      .then(res => {
        console.log(res, ".........................res ");
        resolve(res.data.message);
      })
      .catch(err => {
        console.log(err.response.data.message, "Error");
        reject(err.response.data.message);
      });
  });
};
export const RestockOfReturnOrder = body => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.post(
      `${url}/api/v1/restock_return_order/RestockOfReturnOrder_bluk`,
      body
    )
      .then(res => {
        console.log(res, ".........................res ");
        resolve(res.data);
      })
      .catch(err => {
        console.log(err.response.data.message, "Error");
        reject(err);
      });
  });
};

export const cashfree_verify_payment = body => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${url}/api/v1/post/get_razorpayid/Validate_Cashfree_payments`,
        body
      )
      .then(res => {
        console.log(res.data, "mark");
        resolve(res.data);
      })
      .catch(err => {
        console.log(err, "error");
        reject(err.response.data);
      });
  });
};



export const UpdateaddressVerification = body => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.post(
      `${url}/common/UpdateaddressVerification/`,
      body
    )
      .then(res => {
        dispatch({
          type: ADDRESSVERIFICATION,
          payload: body.orderid,
        });
        resolve(true);
      })
      .catch(err => {
        console.log(err, "Error");
        resolve(false);
      });
  });
};
export const removeBookFromOrderAction = (orderId, order_book_id) => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/v1/order_details_api/remove_book_from_order/${orderId}/${order_book_id}`
    )
      .then(res => {
        console.log(res, "res.................res111");
        console.log(res.data, "res.................res123");
        if (res.status == 200) {
          // dispatch({
          //   type: REMOVEBOOKFROMORDER,
          //   payload: { orderId: orderId, order_book_id: order_book_id },
          // });
          resolve(res.data.data);
        } else {
          reject(res);
        }
      })
      .catch(err => {
        console.log(err, "res.................res");
        reject(err);
      });
  });
};
export const restoreRemoveBookFromOrderAction = (orderId, order_book_id) => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/v1/order_details_api/restore_remove_book_from_order/${orderId}/${order_book_id}`
    )
      .then(res => {
        console.log(res, "res.................res111");
        console.log(res.data, "res.................res123");
        if (res.status == 200) {
          resolve(res.data.data);
        } else {
          reject(res);
        }
      })
      .catch(err => {
        console.log(err, "res.................res");
        reject(err);
      });
  });
};


export const getShippingAddressInfo_groupno = (order_id, token) => dispatch => {
  dispatch({
    type: SHIPPINGADDRESSLOADING,
    payload: {},
  });

  let header = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/v1/order_details_api/fetch-order-address-by-groupid/${order_id}/`
    )
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: FETCHSHIPPINGADDRESS,
            payload: { order_id, data: res.data.data },
          });
          resolve(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};