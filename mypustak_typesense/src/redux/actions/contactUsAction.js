import axios from 'axios';
import { url } from '../../helper/api_url';

export const createContactUsAction = (body) => (dispatch) => {
    // alert("in")
    return new Promise((resolve, reject) => {
        axios.post(`${url}/api/contact_query/create_contact_query`, body).then((res) => {
            // alert("done in action")
            console.log(res)
            resolve(res.data)
        }).catch((err) => {
            // alert("err In Action")
            console.log(err)
            reject(err)
        })
    })
}

export const uploadQuerryImages = (data, id) => (dispatch) => {
    // alert("in")
    return new Promise((resolve, reject) => {
        axios.post(`${url}/api/contact_query/query_file_Upload/${id}`, data).then((res) => {
            // alert("done in action")
            console.log(res)
            resolve(res.data)
        }).catch((err) => {
            // alert("err In Action")
            console.log(err)
            reject(err)
        })
    })
}