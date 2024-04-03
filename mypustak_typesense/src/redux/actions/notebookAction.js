import { url } from "../../helper/api_url";

export const fetch_notebook = (product_id) => dispatch => {
    console.log(book_id,page,"book_id");
      return new Promise((resolve, reject) => {
        axios.get(
          `${url}/api/v2/notebook/fetch_notebook/${product_id}`
        )
          .then((res) => {
            console.log(res.data, "res...................fetch_notebook_product")
            // dispatch({
            //   type: REVIEW_PRODUCT,
            //   payload: res.data,
            // });
            // resolve(res.data)
          })
          .catch((err) => {
            // alert("catch bookreview")
  
            console.log(err,"book review product err")
            reject(err)
          })
      })
    };