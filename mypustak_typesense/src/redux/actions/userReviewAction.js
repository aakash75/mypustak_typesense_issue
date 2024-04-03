
import axios from "axios";
import { AuthInstance, url } from "../../helper/api_url";
import { GETREVIEW,GETREVIEWBYPRODUCT,ADDREVIEW } from "../constants/types";

export const  get3randomreview = () => (dispatch) => {
  // alert("getaddress")
  axios
    .get(`${url}/api/v2/user_review/getalluser_review`)
    .then((res) => {
      dispatch({
        type: GETREVIEW,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const  getreviewbyproduct = (body) => (dispatch) => {
    // alert("getaddress")
    axios
      .get(`${url}/api/v2/user_review/getuser_reviewbyproduct`,body)
      .then((res) => {
        dispatch({
          type: GETREVIEWBYPRODUCT,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };


  export const  add_review = (body) => (dispatch) => {
    // alert("getaddress")
    axios
      .post(`${AuthInstance}/api/v2/user_review/postuser_review`,body)
      .then((res) => {
        dispatch({
          type: ADDREVIEW,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err, details));
  };
