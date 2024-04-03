import {
  GETWALLETD,
  WALLETRECHARGE,
  SENDWALLETD_RECHARGEMAIL,
  LOADING_WALLET_SIGNATURE,
  GET_WALLET_SIGNATURE,
  WALLETRECHARGEOFFERS,
  SHOWCONFETTI
} from "../constants/types";
import axios from "axios";
import { AuthInstance, url } from "../../helper/api_url";
import { encryptor } from "../../helper/crypto";

// GET WALLET DETAILS
export const Getwalletd = details => dispatch => {
  // console.log(details)
  // alert("getwallet")
  AuthInstance.get(
    `${url}/api/v1/get/user_walletbal`
    // {
    //     headers: {
    //           'Authorization': details
    //         }}
  ).then(res => {
    dispatch({
      type: GETWALLETD,
      payload: res.data,
    });
  });
};

export const WalletRecarge = data => dispatch => {
  // alert("inEd")
  dispatch({
    type: WALLETRECHARGE,
    payload: data,
  });
};

export const SetWallet = details => dispatch => {
  // console.log(details)
  // alert("getwallet")
  // console.log("Gettng Wallet 1");

  AuthInstance.get(
    `${url}/api/v1/calculate_wallet_balance/calculate-wallet-balance`
    // {
    //     headers: {
    //           'Authorization': details
    //         }}
  )
    .then(res => {
      // console.log("Setting Wallet");

      AuthInstance.get(`${url}/api/v1/get/user_walletbal`)
        .then(res => {
          // console.log("Gettng Wallet");

          dispatch({
            type: GETWALLETD,
            payload: res.data,
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

export const SendWalletRechargeMail = (token, sendData) => dispatch => {
  // console.log("Recharge mail send",token)
  // alert("getwallet")
  let header = {
    headers: {
      Authorization: token,
    },
  };
  AuthInstance.post(`${url}/common/walletRechargeEmail/`, sendData)
    .then(res => {
      console.log(res.data);

      dispatch({
        type: SENDWALLETD_RECHARGEMAIL,
        payload: {},
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const Get_CashFree_Signature_Wallet =
  ({ token, body }) =>
    dispatch => {
      dispatch({
        type: LOADING_WALLET_SIGNATURE,
        payload: {},
      });
      let header = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      const body_data = { encrypted_data: encryptor(body) };

      return new Promise((resolve, reject) => {
        // AuthInstance.post(
        //   `${url}/api/v1/post/get_razorpayid/cashfree`,
        //   body_data
        // )
        // alert("signature");
        AuthInstance.post(
          `${url}/api/v1/post/get_razorpayid/cashfree_generate_v2`,
          body_data
        )
          .then(res => {
            // console.log(res.data,"cashfree wallet");

            dispatch({
              type: GET_WALLET_SIGNATURE,
              payload: res.data.output,
            });
            resolve({ signature: res.data.output });
          })
          .catch(err => {
            console.log({ err }, "Get_CashFree_Signature_Wallet");

            reject(true);
          });
      });
    };

export const getWalletOffer = () => dispatch => {
  AuthInstance.get(`${url}/api/v1/coupon_code/fetch_wallet_coupon_detail`)
    .then(res => {
      dispatch({
        type: WALLETRECHARGEOFFERS,
        payload: res.data.data,
      });
      console.log(res.data, "1223");
    })
    .catch(err => {
      console.log(err, "res error");
    });
};
export const showConfettiAction = () => dispatch => {
  dispatch({
    type: SHOWCONFETTI,
    payload: true,
  });
};
export const closeConfettiAction = () => dispatch => {
  dispatch({
    type: SHOWCONFETTI,
    payload: false,
  });
};