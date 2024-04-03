// import { LOGIN,SIGNUP,SIGNEDUP ,LOGINFAILS,LOGOUT,SHOWLOADER,GETADDRESS,ADD_ADDRESS } from '../types';
import {
  GETORDERLIST,
  UPDATEORDERBYID,
  ORDERLISTLOADING,
  FETCHSHIPPINGADDRESS,
  SHIPPINGADDRESSLOADING,
  UPDATESHIPPINGADDRESS,
  SERACHORDERLIST,
  SERACHORDERLISTSTATUS,
  CLEAR_ORDERLIST,
  FILTERORDER,
  GETCOURIERDETAILS,
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
  GETSTATUSVERIFY,
  STATUSLOADER,
  ORDERRTO,
  RTOVERIFIED,
  VERIFIEDRTO,
  LOADING_UPDATE_ORDER_TRACKING,
  UPDATE_ORDER_TRACKING,
  GET_ESCALATE_LIST,
  CANCILORDER,
  GET_DISPUTED_LIST,
  CREATE_MANUAL_TRANSACTION,
  FLAG_USER,
  FILTER_NOT_TXNORDER,
  RESENTMAIL,
  REFUNDORDER,
  VIEW_GATEWAY_PAYMENT,
  TRACK_ORDER,
} from "../constants/types";
const initialState = {
  gateway_detail: [],
  EscalateList: [],
  verfiedRtoList: [],
  orderListRto: [],
  orderListStatus: [],
  statusVerify: [],
  orderstatusloader: false,
  ordernoteloader: false,
  orderList: [],
  refundList: [],
  loading: false,
  shippingAddress: {},
  shippingAddressLoading: false,
  courierEmailDetails: {},
  ordernotes: {},
  insertordernote: false,
  Loading_order_Excel: false,
  useraccess: [],
  accessloader: false,
  getmergelist: [],
  mergingLoader: false,

  Loader_order_tracking: false,
  tracking_data: [],
};

export default function getOrder (state = initialState, action) {
  switch (action.type) {
    case GETORDERLIST:
      console.log("GETORFDR");

      if (action.payload.page > 0) {
        // alert("append")
        return {
          ...state,
          orderList: [...state.orderList, ...action.payload.data],
          loading: false,
        };
      } else {
        // alert("else")
        return {
          ...state,
          orderList: action.payload.data,
          loading: false,
        };
      }
    case SERACHORDERLIST:
      return {
        ...state,
        orderList: action.payload.data,
        loading: false,
      };
    case ORDERLISTLOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATEORDERBYID:
      let orderList = state.orderList;
      let updatedOrderList = orderList.map(order => {
        if (order.order_id === action.payload.order.order_id) {
          Object.assign(order, action.payload.order);
        }
        return order;
      });
      return {
        ...state,
        orderList: updatedOrderList,
        loading: false,
      };
    case FETCHSHIPPINGADDRESS:
      return {
        ...state,
        shippingAddress: action.payload.data,
        shippingAddressLoading: false,
      };
    case SHIPPINGADDRESSLOADING:
      return {
        ...state,
        shippingAddressLoading: true,
      };

    case UPDATESHIPPINGADDRESS:
      return {
        ...state,
        shippingAddressLoading: false,
      };
    case CLEAR_ORDERLIST:
      return {
        ...state,
        orderList: "",
      };
    case FILTERORDER:
      console.log(action.payload.data, "ReducerFilter");

      // return {
      //   ...state,
      //   orderList: action.payload.data,
      //   loading: false

      // }

      if (action.payload.page > 0) {
        // alert("append")
        return {
          ...state,
          orderList: [...state.orderList, ...action.payload.data],
          loading: false,
        };
      } else {
        // alert("else")
        return {
          ...state,
          orderList: action.payload.data,
          loading: false,
        };
      }

    case GETCOURIERDETAILS:
      return {
        ...state,
        courierEmailDetails: action.payload,
      };

    case GET_ORDERNOTE_LOADER:
      return {
        ...state,
        ordernoteloader: !state.ordernoteloader,
      };

    case GET_ORDER_NOTES:
      return {
        ...state,
        ordernotes: action.payload.data,
        ordernoteloader: false,
      };

    case INSERT_ORDER_NOTES:
      return {
        ...state,
        insertordernote: true,
        ordernoteloader: false,
      };

    case LOADING_ORDER_EXCEL:
      return {
        ...state,
        Loading_order_Excel: !state.Loading_order_Excel,
      };

    case ORDER_EXCEL_UPLOADED:
      return {
        ...state,
        Loading_order_Excel: false,
      };

    case BACKOFFICEROLE:
      return {
        ...state,
        useraccess: action.payload.data,
        accessloader: false,
      };

    case ACCESSLOADER:
      return {
        ...state,
        accessloader: true,
      };

    case GETMERGEORDER:
      return {
        ...state,
        getmergelist: action.payload.data,
      };

    case MERGEORDER:
      return {
        ...state,
        mergingLoader: false,
      };

    case MERGINGLOADER:
      return {
        ...state,
        mergingLoader: true,
      };
    case LOADING_UPDATE_ORDER_TRACKING:
      return {
        ...state,
        Loader_order_tracking: !state.Loader_order_tracking,
      };

    case UPDATE_ORDER_TRACKING:
      return {
        ...state,
        Loader_order_tracking: false,
      };

    case GETSTATUSVERIFY:
      return {
        ...state,
        statusVerify: [...state.statusVerify, ...action.payload],
        orderstatusloader: false,
      };

    case SERACHORDERLISTSTATUS:
      return {
        ...state,
        orderListStatus: action.payload.data,
        loading: false,
      };
    case STATUSLOADER:
      return {
        ...state,
        orderstatusloader: true,
      };

    case ORDERRTO:
      // alert("hit3")

      return {
        ...state,
        // [...state.orderList, ...action.payload.data]
        orderListRto: [...state.orderListRto, ...action.payload.data],
      };

    case RTOVERIFIED:
      // alert(action.payload)
      let rtoList = state.orderListRto;
      let orderid = action.payload;
      for (let a in rtoList) {
        // alert("for")
        // console.log(rtoList[a].order_id,"rtoList1",rtoList[a].rto_verified)
        if (rtoList[a].order_id == orderid) {
          // alert("if")
          rtoList[a].rto_verified = "Y";
        }
      }

      console.log(rtoList, "rtoList");
      return {
        ...state,
        orderListRto: rtoList,
      };

    case VERIFIEDRTO:
      // alert(action.payload.page)
      if (action.payload.page > 0) {
        // alert("hh")
        return {
          ...state,
          verfiedRtoList: [...state.verfiedRtoList, ...action.payload.data],
        };
      } else {
        return {
          ...state,
          verfiedRtoList: action.payload.data,
        };
      }

    case GET_ESCALATE_LIST:
      // alert("reducer esacalate")
      if (action.payload.page > 0) {
        // alert("append")
        return {
          ...state,
          orderList: [...state.orderList, ...action.payload.data],
          loading: false,
        };
      } else {
        return {
          ...state,
          orderList: action.payload.data,
        };
      }
    case CANCILORDER:
      // console.log(action.payload.orderidList,"statusss1", action.payload.status)
      let list = action.payload.orderidList;
      let status = action.payload.status;
      let norderList = state.orderList;
      let newList = [];
      for (let a in norderList) {
        // console.log(norderList[a].order_id,"statusss2")
        if (list.includes(norderList[a].order_id)) {
          // console.log(norderList[a].order_id,"statusss3")

          let alterlist = norderList[a];
          alterlist.status = status;
          newList.push(alterlist);
        } else {
          newList.push(norderList[a]);
        }
      }

      let updateStatus = norderList.find(ordList => ordList.order_id == 549398);
      console.log(updateStatus, "statusss");
      return {
        ...state,
        orderList: newList,
      };
    case GET_DISPUTED_LIST:
      // alert("reducer esacalate")
      if (action.payload.page > 0) {
        // alert("append")
        return {
          ...state,
          orderList: [...state.orderList, ...action.payload.data],
          loading: false,
        };
      } else {
        return {
          ...state,
          orderList: action.payload.data,
        };
      }

    case CREATE_MANUAL_TRANSACTION:
      let neworderList = state.orderList;
      let new_updatedOrderList = neworderList.map(order => {
        if (order.order_id === action.payload.order_id) {
          let new_order = order;
          new_order.txn_point1 = action.payload.order_id;
          Object.assign(order, new_order);
        }
        return order;
      });
      return {
        ...state,
        orderList: new_updatedOrderList,
        loading: false,
      };

    case FLAG_USER:
      // alert("flag")
      let newFlagorderList = state.orderList;
      let new_FlagupdatedOrderList = newFlagorderList.map(order => {
        if (order.user_id === action.payload.user_id) {
          let new_order = order;
          new_order.flag_user = action.payload.flag;
          Object.assign(order, new_order);
        }
        return order;
      });
      return {
        ...state,
        orderList: new_FlagupdatedOrderList,
        loading: false,
      };

    case FILTER_NOT_TXNORDER:
      console.log("GETORFDR");

      if (action.payload.page > 0) {
        // alert("append")
        return {
          ...state,
          orderList: [...state.orderList, ...action.payload.data],
          loading: false,
        };
      } else {
        // alert("else")
        return {
          ...state,
          orderList: action.payload.data,
          loading: false,
        };
      }

    case RESENTMAIL:
      //   console.log(action.payload, "resent");
      let new_resentorderList = state.orderList;
      let new_resentupdatedOrderList = new_resentorderList.map(order => {
        if (order.order_id === action.payload) {
          let new_order = order;
          new_order.is_notification_sent = "Y";
          Object.assign(order, new_order);
        }
        return order;
      });
      return {
        ...state,
        orderList: new_resentupdatedOrderList,
        loading: false,
      };

    case REFUNDORDER:
      console.log(action.payload, "refffffund");

      let new_refundorderList = state.orderList;
      let new_refundupdatedOrderList = new_refundorderList.map(order => {
        console.log(order.orderid, "refund order1");
        if (order.order_id === action.payload) {
          let new_refundOrder = order;
          new_refundOrder.status = 18;
          // new_order.is_notification_sent = "Y";
          Object.assign(order, new_refundOrder);
        }
        return order;
      });

      return {
        ...state,
        orderList: new_refundupdatedOrderList,
        loading: false,
      };

    case VIEW_GATEWAY_PAYMENT:
      // alert("hit3")

      return {
        ...state,
        // [...state.orderList, ...action.payload.data]
        gateway_detail: action.payload,
      };

    case TRACK_ORDER:
      return {
        ...state,
        tracking_data: action.payload,
      };

    default:
      return state;
  }
}
