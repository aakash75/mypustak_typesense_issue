// import React, { Component } from 'react'
// import { LOGIN,SIGNUP } from "../action/types";
import { GETWALLETD, WALLETRECHARGE, WALLETRECHARGEOFFERS, SHOWCONFETTI } from "../constants/types";
const initialState = {
  walletbalance: [],
  // userId:undefined,
  token: null,
  // userId:6059,
  WalletOrderId: 0,
  RechargeAmout: 0,
  ErrMsg: [],
  bookcoins: 0,
  cashback: 0,
  walletRechargeOffers: [],
  selectedCode: "",
  showConfetti: false,
  // donation_req_id:'123456',
  // app_books_weight:'',
  // email:'mukul.meri@gmail.com',
  // name:'abc xyz'
};

export default function getWalletData (state = initialState, action) {
  switch (action.type) {
    case GETWALLETD:
      // alert('redu')
      return {
        ...state,
        walletbalance: action.payload.output,
        bookcoins: Number(action.payload.bookcoinTotal),
        cashback: Number(action.payload.cashback),
        razorpay_key: action.payload.razorpay_key,
      };
    case WALLETRECHARGE:
      // alert('redu')
      return {
        ...state,
        WalletOrderId: action.payload.WalletOrderId,
        RechargeAmout: action.payload.RechargeAmout,
        selectedCode: action.payload.selectedCode
      };
    case WALLETRECHARGEOFFERS:
      return {
        ...state,
        walletRechargeOffers: action.payload,
      };
    case SHOWCONFETTI:
      return {
        ...state,
        showConfetti: action.payload,
      };
    default:
      return state;
  }
}
