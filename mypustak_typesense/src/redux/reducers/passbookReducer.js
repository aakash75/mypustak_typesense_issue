// import React, { Component } from 'react'
// import { LOGIN,SIGNUP } from "../action/types";
import { PASSDETAILS } from '../constants/types';
const initialState = {
    passdetails: [

    ],
    // userId:undefined,
    token: null,
    // userId:6059,
    DataLength: false,
    ErrMsg: [],
    // donation_req_id:'123456',
    // app_books_weight:'',
    // email:'mukul.meri@gmail.com',
    // name:'abc xyz'
};

export default function getPassbookData (state = initialState, action) {
    switch (action.type) {
        case PASSDETAILS:
            // alert('redu')
            let data = state.passdetails
            let totaldata = data.concat(action.payload)
            console.log(data, "k")
            console.log(action.payload, "kk")
            console.log(totaldata, "kkk")
            return {
                ...state,
                passdetails: action.page == 1 ? action.payload : totaldata,

            }
        default:
            return state;
    }
}
