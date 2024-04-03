import {
  ORDERDETAILSINTIALDATA,
  ORDERDETAILSINTIAL,
  GETLENGTH,
  GETORDERD,
  CANCELORDER,
  SETRELOADLORDER,
  CONVERTORDER,
  VIEWORDERDETAILS,
  MAKECANCELMSGBLANK,
  CONVERTORDERSENDREQ,
  UPDATEPAYMENT,
  FETCH_ORDER_BY_ID_ERROR,
  FETCH_ORDER_BY_ID,
  LOADING_USER_ORDERS,
  GETUPDATEDORDERD,
  NEWGETUPDATEDORDERD,
  NEWGETORDERD
} from "../constants/types";
import { AuthInstance, url } from "../../helper/api_url";

import axios from "axios";
import { AltRoute, ConstructionOutlined } from "@mui/icons-material";
export const orderdetailslength = () => dispatch => {
  let page = 1
  dispatch({
    type: ORDERDETAILSINTIAL,
    payload: {
      length: "",
      loading: true,
      error: "",
      initialResponce: "",
      getorderdetailsLength: "",
    },
  });
  return new Promise((resolve, reject) => {
    AuthInstance.get(`${url}/api/v1/get/user_orders/customer_user_order_length`,)
      .then(res => {
        console.log(res, "res------------------")
        dispatch({
          type: ORDERDETAILSINTIAL,
          payload: {
            loading: false,
            error: "",
            initialResponce: "200",
            length: res.data.length,
          },
        });
        // AuthInstance.get(
        //   `${url}/api/v1/get/user_orders/customer_user_order/${1}/`,
        // ).then((res) => {
        //   dispatch({
        //     type: GETORDERD,
        //     payload: { data: res.data.data, page: page },
        //   });
        // }).catch((err) => {
        //   dispatch({
        //     type: GETORDERD,
        //     payload: { data: [], page: page },
        //   });
        // })
        resolve(res.data);
      })
      .catch(err => {
        console.log(err, "err------------------")
        dispatch({
          type: ORDERDETAILSINTIAL,
          payload: {
            loading: false,
            error: err,
            initialResponce: "400",
            length: "",
          },
        });
        reject(err);
      });
  });
};
export const orderdetails = (page, clickIndexid) => dispatch => {
  dispatch({
    type: LOADING_USER_ORDERS,
    payload: { loading: true, page },
  });
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/v1/get/user_orders/customer_user_order/${page}/`,
      {
        // headers: {
        // 	Authorization: details
        // }
      }
    )
      .then(res => {
        if (clickIndexid == 0 || clickIndexid) {
          // alert(`index : ${clickIndexid}, page: ${page}`)
          dispatch({
            type: GETUPDATEDORDERD,
            payload: { data: res.data.data, page: page, clickIndexid: clickIndexid },
          });
          resolve(res.data.data);

        } else {
          // alert("else")
          dispatch({
            type: GETORDERD,
            payload: { data: res.data.data, statuses: res.data, page: page },
          });
          resolve(res.data.data);
        }

      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: LOADING_USER_ORDERS,
          payload: { error: true, loading: false, page },
        });
        reject(err);
      });
  });
};


export const orderdetailsbystatus = (page, clickIndexid, body) => dispatch => {
  dispatch({
    type: LOADING_USER_ORDERS,
    payload: { loading: true, page },
  });
  return new Promise((resolve, reject) => {
    AuthInstance.post(
      `${url}/api/v1/get/user_orders/filter_user_order_v2/${page}/`, body
    )
      .then(res => {
        if (clickIndexid == 0 || clickIndexid) {
          // alert(`index : ${clickIndexid}, page: ${page}`)
          dispatch({
            type: GETUPDATEDORDERD,
            payload: { data: res.data.data, page: page, clickIndexid: clickIndexid },
          });
          resolve(res.data.data);

        } else {
          // alert("else")
          dispatch({
            type: GETORDERD,
            payload: { data: res.data.data, page: page },
          });
          resolve(res.data.data);
        }

      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: LOADING_USER_ORDERS,
          payload: { error: true, loading: false, page },
        });
        reject(true);
      });
  });
};

export const ViewOrderDetails = Order_id => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/v1/get/user_orders/ViewOrderDetails/${Order_id}`
    )
      .then(res => {
        dispatch({
          type: VIEWORDERDETAILS,
          payload: res.data,
        });
        resolve(res)
      })
      .catch(err => {
        console.log(err, Order_id);
        reject(err)
      });
  })

};

export const CancelOrder = (orderid, token) => dispatch => {
  // console.log(orderid, token);
  // http://103.217.220.149:80/api/v1/post/cancel_order
  // http://103.217.220.149:80/api/v1/post/cancel_order
  return new Promise((resolve, reject) => {
    AuthInstance.post(
      `${url}/api/v1/post/cancel_order`,
      orderid
      // {
      //   headers: {
      //     Authorization: token,
      //   },
      // }
    )
      .then(res => {
        // console.log(res)
        dispatch({
          type: CANCELORDER,
          payload: res.data,
        });
        resolve(true);
      })
      .catch(err => {
        // console.log(err, orderid, token)
        reject(err);
      });
  });
};

export const ConvertOrder = (orderid, token) => dispatch => {
  // dispatch({
  //     type:CONVERTORDERSENDREQ,
  //     })
  // console.log(orderid,token)
  // http://103.217.220.149:80/api/v1/convert_cod_order_to_prepaid_order/convert-cod-order-to-prepaid-order526202
  AuthInstance.get(
    `${url}/api/v1/convert_cod_order_to_prepaid_order/convert-cod-order-to-prepaid-order/${orderid}`
    // {
    //   headers: {
    //     Authorization: token,
    //   },
    // }
  )
    .then(res => {
      // console.log(res)

      dispatch({
        type: CONVERTORDER,
        payload: res.data.prepaid_order_payment_value,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const SetReloadOrder = () => dispatch => {
  // alert("logout")
  dispatch({
    type: SETRELOADLORDER,
    // payload:res.data
  });
};

export const MakeCancelOrderBlank = () => dispatch => {
  // alert("logout")
  dispatch({
    type: MAKECANCELMSGBLANK,
    // payload:res.data
  });
};

export const UpdatePayment = (userToken, SendData) => dispatch => {
  axios
    .patch(
      `${url}/api/v1/patch/add_paymentid_ordertable/update-order/${this.props.OrderId}`,
      SendData,
      {
        headers: {
          Authorization: `Token ${userToken}`,
          // ''
        },
      }
    )
    .then(res => {
      // console.log('Updated Order');
      this.setState({ GotOThankYou: true });
      dispatch({
        type: CONVERTORDER,
        payload: res.data.prepaid_order_payment_value,
      });
    })
    .catch(err => console.log(err, SendData));
};

export const orderDetailsById =
  ({ orderid }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/v1/order_details_api/fetch-order-by-id/${orderid}`
        )
          .then(res => {
            dispatch({ type: FETCH_ORDER_BY_ID, payload: res.data });
            resolve(res.data);
          })
          .catch(err => {
            dispatch({ type: FETCH_ORDER_BY_ID_ERROR });
            reject(err);
          });
      });
    };

export const ConvertCODtoPrepaid =
  ({ body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.patch(
          `${url}/api/v1/patch/add_paymentid_ordertable/update-convert-order/${body.order_id}`,
          body
        )
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    };

export const updateCustomerOrder = (order, token) => dispatch => {
  // console.log(order, 'order');

  // alert("Updateordr")
  // dispatch({
  // 	type: ORDERLISTLOADING,
  // 	payload: {}
  // });

  let header = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  let body = order;
  // return new Promise((resolve, reject) => {

  return new Promise((resolve, reject) => {
    // AuthInstance.patch(
    //   `${url}/api/v1/order_details_api/update-order/${order.order_id}`,
    //   body
    // )
    AuthInstance.post(
      `${url}/api/v1/order_details_api/update_error_order_grpid/${order.order_id}`,
      body
    )
      .then(res => {
        if (res.data.status === 200) {
          // 	alert('updated');
          // 	dispatch({
          // 		type: UPDATEORDERBYID,
          // 		payload: { order }
          // 	});
        }
        resolve(true);
      })
      .catch(err => {
        console.log(err);
        reject(true);
      });
  });
};

// export const orderDetailsById = ({ orderid }) => (dispatch) => {

// 	return new Promise((resolve, reject) => {
// 		AuthInstance.get(
//       `${config.get(
//         "apiDomain"
//       )}/api/v1/get/user_orders/customer_user_order/${page}/`
//     )
//       .then((res) => {
//         dispatch({ type: FETCH_ORDER_BY_ID, payload: res.data })
//         resolve(res.data)
//       })
//       .catch((err) => {
//         dispatch({ type: FETCH_ORDER_BY_ID_ERROR })
//         reject(err)
//       })
// 	});
// };

export const updateDeliveryAddress =
  (orderId, body) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/v1/order_details_api/update_delivery_address/${orderId}`, body
        )
          .then(res => {
            // dispatch({ type: FETCH_ORDER_BY_ID, payload: res.data });
            resolve(res.data);
          })
          .catch(err => {
            // dispatch({ type: FETCH_ORDER_BY_ID_ERROR });
            reject(err);
          });
      });
    };

export const newOrderdetails = (page, clickIndexid) => dispatch => {
  dispatch({
    type: LOADING_USER_ORDERS,
    payload: { loading: true, page },
  });
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/v1/get/user_orders/new_customer_user_order/${page}/`,
      {
        // headers: {
        // 	Authorization: details
        // }
      }
    )
      .then(res => {
        if (clickIndexid == 0 || clickIndexid) {
          // alert(`index : ${clickIndexid}, page: ${page}`)
          dispatch({
            type: NEWGETUPDATEDORDERD,
            payload: { data: res.data.data, page: page, clickIndexid: clickIndexid },
          });
          resolve(res.data.data);

        } else {
          // alert("else")
          dispatch({
            type: NEWGETORDERD,
            payload: { data: res.data.data, statuses: res.data, page: page },
          });
          resolve(res.data.data);
        }

      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: LOADING_USER_ORDERS,
          payload: { error: true, loading: false, page },
        });
        reject(err);
      });
  });
};



export const ViewOrderDetails_groupid = Order_id => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/v1/get/user_orders/ViewOrderDetails_by_orderno/${Order_id}`
    )
      .then(res => {
        dispatch({
          type: VIEWORDERDETAILS,
          payload: res.data,
        });
        resolve(res)
      })
      .catch(err => {
        console.log(err, Order_id);
        reject(err)
      });
  })

};

export const orderDetailsBygrpId =
  ({ orderid }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/v1/order_details_api/fetch-order-by-gid/${orderid}`
        )
          .then(res => {
            dispatch({ type: FETCH_ORDER_BY_ID, payload: res.data });
            resolve(res.data);
          })
          .catch(err => {
            dispatch({ type: FETCH_ORDER_BY_ID_ERROR });
            reject(err);
          });
      });
    };



    export const CancelOrdergid = (orderid, token) => dispatch => {
      // console.log(orderid, token);
      // http://103.217.220.149:80/api/v1/post/cancel_order
      // http://103.217.220.149:80/api/v1/post/cancel_order
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/v1/post/cancel_order/cancil_gid`,
          orderid
          // {
          //   headers: {
          //     Authorization: token,
          //   },
          // }
        )
          .then(res => {
            // console.log(res)
            dispatch({
              type: CANCELORDER,
              payload: res.data,
            });
            resolve(true);
          })
          .catch(err => {
            // console.log(err, orderid, token)
            reject(err);
          });
      });
    };
    

    export const ConvertCODtoPrepaid_gid =
    ({ body }) =>
      dispatch => {
        return new Promise((resolve, reject) => {
          AuthInstance.patch(
            `${url}/api/v1/patch/add_paymentid_ordertable/convert_cod_to_prepaid_gid`,
            body
          )
            .then(res => {
              resolve(res);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        });
      };

export const cancil_request_action = (order, token) => (dispatch) => {
  let header = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  let body = order;

  return new Promise((resolve, reject) => {
    AuthInstance.post(
      `${url}/api/v1/order_details_api/cancil_request_bygid`,
      body
    )
      .then((res) => {
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(true);
      });
  });
};
