import { GETOFFERS,GETOFFERSHOME } from '../constants/types'
import axios from 'axios'
import { AuthInstance, url } from '../../helper/api_url'

export const getOffers = () =>
    dispatch => {
        return new Promise((resolve, reject) => {
            // alert("offer")
            AuthInstance.get(`${url}/api/v1/coupon_code/fetchcoupon_detail`).then((res) => {
                // alert("then in action")
                dispatch({
                    type: GETOFFERS,
                    payload: res.data,
                });
                // alert("ikk")
                resolve(res.data);
            })
                .catch((err) => {
                    // alert("erroe in action")
                    console.log(err);
                // alert("k")

                    reject(err)
                })
        })
    }


export const getOffersHomepage = () =>
    dispatch => {
        return new Promise((resolve, reject) => {
            // alert("offer")
            AuthInstance.get(`${url}/api/v1/coupon_code/fetchcoupon_detail_homepage`).then((res) => {
                // alert("then in action")
                dispatch({
                    type: GETOFFERSHOME,
                    payload: res.data,
                });
                resolve(res);
            })
                .catch((err) => {
                    // alert("erroe in action")
                    console.log(err);
                    reject(err)
                })
        })
    }