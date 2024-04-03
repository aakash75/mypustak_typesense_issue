import { TRACKORDER } from "../constants/types"
import axios from 'axios'
import {url} from '../../helper/api_url'


export const GetTrackingUrl =(body)=>dispatch=>{
    
    dispatch({
        type:TRACKORDER,
        payload:{}
    })

    return new Promise((resolve, reject) => {
        axios.post(`${url}/api/v1/post/get_ordertrack_url`, body
        ).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    });
} 
