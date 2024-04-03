import { PASSDETAILS } from '../constants/types'
import axios from 'axios'
import { AuthInstance, url } from "../../helper/api_url"

// GET WALLET DETAILS
export const passbookd = (details, page) => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${url}/api/v1/wallet-recharge-withdrawal/fetch-wallet/${page}`,

    )
      .then((res) => {
        dispatch({
          type: PASSDETAILS,
          payload: res.data,
          page: page,
        })
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })

};
