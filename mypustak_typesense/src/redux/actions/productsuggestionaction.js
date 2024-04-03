import axios from 'axios'
import {url} from '../../helper/api_url'
import {
    GETBOOKSUGGESTIONBYPAGE,GETBOOKSUGGESTIONBYPAGELENGTH
} from '../constants/types' 
    
export const getBooksSuggestionsByPage = (page_name,pageno) => async(dispatch)=>{
    // alert('action')
    return new Promise((resolve,reject) => {
        axios.get(`${url}/api/v2/book_suggestions/get_suggestion_by_page/${page_name}/${pageno}`)
        .then(res => {
            console.log(res,"action");
            dispatch({
              type:GETBOOKSUGGESTIONBYPAGE,
              payload: res.data
            })
            resolve(res)
        })
        .catch(err => {
            console.log(err,"actionerr")
            reject(err)
        })
    })
}

export const getBooksSuggestionsByPageLength = (page_name) => async(dispatch)=>{
    return new Promise((resolve,reject) => {
        axios.get(`${url}/api/v2/book_suggestions/getsuggestionlength/${page_name}`)
        .then(res => {
            dispatch({
              type:GETBOOKSUGGESTIONBYPAGELENGTH,
              payload: res.data
            })
            resolve(res)
        })
        .catch(err => {
            console.log(err)
            reject(err)
        })
    })
}