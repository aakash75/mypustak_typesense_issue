import { TRACKORDER } from "../constants/types"
import axios from 'axios'
// import config from 'react-global-configuration'
import { AuthInstance, url } from "../../helper/api_url"

export const GetTrackingUrl = (body) => dispatch => {

    dispatch({
        type: TRACKORDER,
        payload: {}
    })

    return new Promise((resolve, reject) => {
        axios.post(`${url}/api/v1/post/get_ordertrack_url`, body
        ).then(res => {
            // console.log(res, "GetTrackingUrl");
            // window.open(res.data.output)
            resolve(res)
        }).catch(err => {
            // alert(`Error`)
            // console.log(err.response.data, "GetTrackingUrl");
            reject(err)
        })
    });
} 
