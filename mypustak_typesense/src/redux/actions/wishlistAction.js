import { USERWISHLIST, SETRELOADWISHLIST, WISHLISTCOUNT } from "../constants/types";
import axios from "axios";
import { url, AuthInstance } from "../../helper/api_url";

export const Uwishlist = (details) => (dispatch) => {
  axios
    .get(`${url}/api/v1/wishlist/fetch-wishlists`, {
      headers: {
        Authorization: details,
      },
    })
    .then((res) => {
      dispatch({
        type: USERWISHLIST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err, details));
};
export const SetWishlistReloader = () => (dispatch) => {
  dispatch({
    type: SETRELOADWISHLIST,
  });
};
export const GetWishlistCount = () => (dispatch) => {
  let user = JSON.parse(localStorage.getItem("user_info"));
  if (user) {
    let user_id = user.id;
    let body = { user_id: user_id }
    return new Promise((resolve, reject) => {
      AuthInstance.post(
        `${url}/api/wishlisting/fetch_wishlist_count`, body)
        .then((res) => {
          resolve(res)
          dispatch({
            type: WISHLISTCOUNT,
            payload: res.data
          });
        })
        .catch((err) => {
          reject(err)
          console.log(err)
        });
    })

  }

};