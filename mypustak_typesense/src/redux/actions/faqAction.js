import { FAQ, FAQ_FETCH_ALL_CATEGORY_DATA } from '../constants/types'
import axios from 'axios'
// import config from 'react-global-configuration'
import { AuthInstance, url } from "../../helper/api_url";


export const getfaq = () => dispatch => {
    // alert("getaddress")
    return new Promise((resolve, reject) => {

        axios.get(`${url}/api/v1/get/faq`
        ).then(res => {
            dispatch({
                type: FAQ,
                payload: res.data
            })
            resolve(res.data)

        })
            .catch(err => {
                console.log(err);
                resolve(err)

            })

    })
};
export const getFaqCategoryData = () => (dispatch) => {
    // alert("action call")
    return new Promise((resolve, reject) => {
        AuthInstance
            .get(`${url}/api/v1/faq/fetch-faq-category`)
            .then((res) => {
                dispatch({
                    type: FAQ_FETCH_ALL_CATEGORY_DATA,
                    payload: res.data
                });
                console.log(res.data, "response1,..................")
                resolve(res.data)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            });
    })
}