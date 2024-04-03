// import React, { Component } from 'react'
// import { LOGIN,SIGNUP } from "../action/types";
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
    NEWGETORDERD,
    NEWGETUPDATEDORDERD,
} from '../constants/types';
const initialState = {
    initialResponce: "",
    getorderdetailsLength: 0,
    getorderdetails: [],
    newGetorderdetails: [],
    token: null,
    ErrMsg: [],
    CancelOrderHit: [],
    ReloadOrders: false,
    convertOrderState: "",
    singleOrderDetails: [],
    LoaderConvOrder: true,
    GoToThanksState: false,
    OrderDetails: {},
    LoadingUserOrder: false,
    NomoreUserOrderData: false
};

export default function getOrders (state = initialState, action) {
    switch (action.type) {
        case GETORDERD:
            // console.log(action.payload, "123666")
            console.log(action.payload.status)
            if (action.payload.page == 1) {
                return {
                    ...state,
                    newGetorderdetails: action.payload.data,
                    LoadingUserOrder: false,
                    NomoreUserOrderData: action.payload.data.length == 5 ? false : true

                }
            }
            else {
                if (action.payload.data.length == 5) {

                    return {
                        ...state,
                        newGetorderdetails: [...state.newGetorderdetails, ...action.payload.data],
                        LoadingUserOrder: false
                    }
                } else {
                    return {
                        ...state,
                        newGetorderdetails: [...state.newGetorderdetails, ...action.payload.data],
                        NomoreUserOrderData: true
                    }
                }
            }
        case GETUPDATEDORDERD:
            const mainData = state.newGetorderdetails
            let clickData = mainData[action.payload.clickIndexid]
            let commingdata = action.payload.data.filter((order) => {
                return order.order_id == clickData.order_id
            })[0]
            //*************************** */
            for (let a in mainData) {
                if (mainData[a].order_id == clickData.order_id) {
                    mainData[a] = commingdata;
                }
            }
            //************************ */
            // alert(`${clickData.order_id} orderid`)
            // alert(`${commingdata.order_id} orderid`)
            return {
                ...state,
                newGetorderdetails: mainData,
                NomoreUserOrderData: action.payload.data.length == 5 ? false : true
            }

        case CANCELORDER:
            // alert('true')
            return {
                ...state,
                CancelOrderHit: action.payload,
                // ReloadOrders: !state.ReloadOrders,

            }
        case CONVERTORDER:
            // alert('true')
            return {
                ...state,
                convertOrderState: action.payload,
                LoaderConvOrder: false,

            }
        case VIEWORDERDETAILS:
            // alert('true')
            return {
                ...state,
                singleOrderDetails: action.payload.output,

            }
        case SETRELOADLORDER:
            // alert('false')
            return {
                ...state,
                ReloadOrders: false,

            }
        case MAKECANCELMSGBLANK:
            // alert('true')
            return {
                ...state,
                // convertOrderState:action.payload,
                CancelOrderHit: [],
            }

        case FETCH_ORDER_BY_ID:
            return {
                ...state,
                OrderDetails: action.payload
            }

        case FETCH_ORDER_BY_ID_ERROR:
            return {
                ...state,
                OrderDetails: {}
            }
        case LOADING_USER_ORDERS:
            return {
                ...state,
                LoadingUserOrder: action.payload.loading,
                ErrMsg: action.payload.error ? true : false
            }

        case ORDERDETAILSINTIAL:
            return {
                ...state,
                initialResponce: action.payload.responce,
                getorderdetailsLength: action.payload.length,
                ErrMsg: action.payload.error,
                LoadingUserOrder: action.payload.loading
            }

        case ORDERDETAILSINTIALDATA:
            return {
                ...state,
                initialResponce: action.payload.responce,
                getorderdetailsLength: action.payload.length,
                ErrMsg: action.payload.error,
                LoadingUserOrder: action.payload.loading,
                newGetorderdetails: action.payload.data
            }
        case GETLENGTH:
            return {
                ...state,
                newGetorderdetails: action.payload.length,
                LoadingUserOrder: false,
                ErrMsg: false
            }
        case NEWGETORDERD:
            // console.log(action.payload, "123666")
            // alert("new red")
            console.log(action.payload.status)
            if (action.payload.page == 1) {
                return {
                    ...state,
                    newGetorderdetails: action.payload.data,
                    LoadingUserOrder: false,
                    NomoreUserOrderData: action.payload.data.length == 5 ? false : true

                }
            }
            else {
                if (action.payload.data.length == 5) {

                    return {
                        ...state,
                        newGetorderdetails: [...state.newGetorderdetails, ...action.payload.data],
                        LoadingUserOrder: false
                    }
                } else {
                    return {
                        ...state,
                        newGetorderdetails: [...state.newGetorderdetails, ...action.payload.data],
                        NomoreUserOrderData: true
                    }
                }
            }
        case NEWGETUPDATEDORDERD:
            // alert("update red")
            console.log(state.newGetorderdetails, "prevData................")
            const newmainData = state.newGetorderdetails
            let newclickData = newmainData[action.payload.clickIndexid]
            let newcommingdata = action.payload.data.filter((order) => {
                return order.order_id == newclickData.order_id
            })[0]
            for (let a in newmainData) {
                if (newmainData[a].order_id == newclickData.order_id) {
                    newmainData[a] = newcommingdata;
                }
            }
            console.log(newmainData, "newData")
            return {
                ...state,
                newGetorderdetails: newmainData,
                NomoreUserOrderData: action.payload.data.length == 5 ? false : true
            }

        default:
            return state;
    }
}
