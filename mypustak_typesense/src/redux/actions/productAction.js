import { SETNEWPRICICNG,REVIEW_PRODUCT,QUESTION_PRODUCT } from "../constants/types";
import axios from "axios";
import { AuthInstance, url } from "../../helper/api_url";

export const setNewPricing =
  ({ data }) =>
  (dispatch) => {
    console.log("New Pricing 1");
    let body = {
      data: data,
    };
    axios
      .post(`${url}/api/v1/new-pricing-model`, body)
      .then((res) => {
        console.log("New Pricing");
        if (res.data.status === 200) {
          dispatch({
            type: SETNEWPRICICNG,
            payload: {},
          });
        }
      })
      .catch((err) => console.log(err));
  };



  export const get_instock_book = (bookid) => dispatch => {
 
    return new Promise((resolve, reject) => {
      // fetch_employee_access api avaible in backoffice backen
      axios.get(
        `${url}/api/v1/get/product/get_all_instockbook/${bookid}`
      )
        .then((res) => {
          console.log(res.data, "res...................come")
          resolve(res.data.data)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  };
  

export const get_book_review = (page) => dispatch => {
    return new Promise((resolve, reject) => {
      axios.get(
        `${url}/api/v2/bookreview/fetch_book_review/${page}`
      )
        .then((res) => {
          console.log(res.data, "res...................book review")
          resolve(res.data)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  };

export const get_book_review_product = (book_id,page) => dispatch => {
  console.log(book_id,page,"book_id");
    return new Promise((resolve, reject) => {
      axios.get(
        `${url}/api/v2/bookreview/fetch_book_review_by_product/${book_id}/${page}`
      )
        .then((res) => {
          // alert("then bookreview")
          console.log(res.data, "res...................book review product")
          dispatch({
            type: REVIEW_PRODUCT,
            payload: res.data,
          });
          resolve(res.data)
        })
        .catch((err) => {
          // alert("catch bookreview")

          console.log(err,"book review product err")
          reject(err)
        })
    })
  };

  export const get_book_review_user = (user_id,page) => dispatch => {
    return new Promise((resolve, reject) => {
      axios.get(
        `${url}/api/v2/bookreview/fetch_book_review_by_user/${user_id}/${page}`
      )
        .then((res) => {
          console.log(res.data, "res...................book review product")
          resolve(res.data)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  };

  export const check_if_ordered = (user_id,book_id) => dispatch => {
    console.log(user_id,"check_if_ordered",book_id);
    return new Promise((resolve, reject) => {
      axios.get(
        `${url}/api/v2/bookreview/check_if_ordered/${user_id}/${book_id}`
      )
        .then((res) => {
          console.log(res.data, "res...................check_if_ordered")
          resolve(res.data)
        })
        .catch((err) => {
          console.log(err,"check_if_ordered")
          reject(err)
        })
    })
  };

  export const save_book_review = (body) => dispatch => {
    console.log(body,"save review body");
    return new Promise((resolve, reject) => {
      AuthInstance.post(
        `${url}/api/v2/bookreview/save_book_review`,body
      )
        .then((res) => {
          console.log(res.data, "res...................save review product")
          resolve(res.data)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  };


  export const get_book_review_product_already_reviewed = (book_id,order_id,user_id) => dispatch => {
      console.log(book_id,order_id,user_id,"book_id");
      return new Promise((resolve, reject) => {
        axios.get(
          `${url}/api/v2/bookreview/fetch_book_review_by_user_already_reviewed/${book_id}/${order_id}/${user_id}`
        )
          .then((res) => {
            // alert("then bookreview")
            console.log(res.data, "res...................get_book_review_product_already_reviewed")
            resolve(res.data)
            // dispatch({
            //   type: REVIEW_PRODUCT,
            //   payload: res.data,
            // });
          })
          .catch((err) => {
            // alert("catch bookreview")
  
            console.log(err,"book review product err")
            reject(err)
          })
      })
    };


    export const fetch_books_not_reviewed = (user_id) => dispatch => {
      return new Promise((resolve, reject) => {
        axios.get(
          `${url}/api/v2/bookreview/fetch_books_not_reviewed/${user_id}`
        )
          .then((res) => {
            // alert("then bookreview")
            console.log(res.data, "res...................get_book_review_product_already_reviewed")
            resolve(res.data)
            // dispatch({
            //   type: REVIEW_PRODUCT,
            //   payload: res.data,
            // });
          })
          .catch((err) => {
            // alert("catch bookreview")
  
            console.log(err,"book review product err")
            reject(err)
          })
      })
    };

    export const save_question = (body) => dispatch => {
      console.log(body,"save review body");
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/v2/question_answer/save_question_answer`,body
        )
          .then((res) => {
            console.log(res.data, "res...................save_question_answer")
            resolve(res.data)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    };

    export const get_question_product = (book_id,page,row) => dispatch => {
      console.log(book_id,page,"book_id");
        return new Promise((resolve, reject) => {
          axios.get(
            `${url}/api/v2/question_answer/fetch_question_answer_by_product/${page}/${row}/${book_id}`
          )
            .then((res) => {
              console.log(res.data, "res...................question answer product")
              dispatch({
                type: QUESTION_PRODUCT,
                payload: res.data,
              });
              resolve(res.data)
            })
            .catch((err) => {
              // alert("catch bookreview")
    
              console.log(err,"book review product err")
              reject(err)
            })
        })
      };