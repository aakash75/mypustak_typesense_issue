import axios from "axios";
import { UNBOX_SEARCH, UNBOX_AUTOCOMPLETE, UNBOX_AUTHOR, UNBOX_PUBLICATION, UNBOX_FILTER_APPLIED, TOOGLE_GLOBAL_SEARCHLOADER, UNBOX_RECOMMENDATIONS } from "../constants/types";
import { AuthInstance, url } from "../../helper/api_url";
import { Unbxd } from "../../helper/helpers";


export const unbox_Search = (query, body) => dispatch => {

  return new Promise((resolve, reject) => {
    dispatch({
      type: TOOGLE_GLOBAL_SEARCHLOADER,
      payload: true,
    });
    axios
      .post(`${url}/api/v1/unbox/hit_search/${query}`, body)
      .then(res => {
        console.log(res.data, "autoReducer action");
        if (body.rows == 4) {
          dispatch({
            type: UNBOX_AUTOCOMPLETE,
            payload: res.data,
          });
        }

        else {
          dispatch({
            type: UNBOX_SEARCH,
            payload: res.data,
          });

          dispatch({
            type: TOOGLE_GLOBAL_SEARCHLOADER,
            payload: false,
          });
        }
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        // resolve(true);
        dispatch({
          type: TOOGLE_GLOBAL_SEARCHLOADER,
          payload: false,
        });
        reject(err)
      });
  });
};


export const unbox_Autosuggest = (query, body) => dispatch => {
  // dispatch({
  //   type: UNBOX_AUTOCOMPLETE,
  //   payload:'',
  // })
  console.log(query, "debounce");
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/v1/unbox/hit_autosuggest/${query}`, body)
      .then(res => {
        console.log(res.data);
        if (body.type == "book") {
          console.log(body.type, "body.type");
          dispatch({
            type: UNBOX_AUTOCOMPLETE,
            payload: res.data,
          });
        }
        else if (body.type == "author") {
          console.log(body.type, "body.type");

          dispatch({
            type: UNBOX_AUTHOR,
            payload: res.data,
          });
        }
        else if (body.type == "publication") {
          console.log(body.type, "body.type");

          dispatch({
            type: UNBOX_PUBLICATION,
            payload: res.data,
          });
        }
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        // resolve(true);
        reject(err)
      });
  });
};



export const unbxd_category_search = (query, body) => dispatch => {

  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/v1/unbox/category_api/${query}`, body)
      .then(res => {
        console.log(res.data);
        dispatch({
          type: UNBOX_SEARCH,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        // resolve(true);
        reject(err)
      });
  });
};


export const unbxd_filter_search = (query, body) => dispatch => {

  return new Promise((resolve, reject) => {
    dispatch({
      type: TOOGLE_GLOBAL_SEARCHLOADER,
      payload: true,
    });
    // alert("Search");
    console.log(body)
    axios.post(`${url}/api/v1/unbox/search_filter_api/${query}`, body)
      .then(res => {
        console.log(res.data);
        dispatch({
          type: UNBOX_SEARCH,
          payload: res.data,
        });
        dispatch({
          type: TOOGLE_GLOBAL_SEARCHLOADER,
          payload: false,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        // resolve(true);
        dispatch({
          type: TOOGLE_GLOBAL_SEARCHLOADER,
          payload: false,
        });
        reject(err)
      });
  });
};


export const unbxd_filter_category = (query, body) => dispatch => {

  return new Promise((resolve, reject) => {
    axios.post(`${url}/api/v1/unbox/filter_api/${query}`, body)
      .then(res => {
        console.log(res.data);
        dispatch({
          type: UNBOX_SEARCH,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        // resolve(true);
        reject(err)
      });
  });
};


export const UpdateUnbxdSearch = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}/api/v1/unbox/UpdateUnbxdSearch`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        reject(err)
      });
  });
}


export const AddNewUnbxdSearch = () => dispatch => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}/api/v1/unbox/AddNewUnbxdSearch`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log(err);
        reject(err)
      });
  });
}


export const filter_applied_action = (appiled_filter) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UNBOX_FILTER_APPLIED,
      payload: appiled_filter,
    });
  });
}


export const get_unbxd_recommended = (body) => dispatch => {

  return new Promise((resolve, reject) => {
    axios.post(`${url}/api/v1/unbox/unbxd_recs`, body)
      .then(res => {
        console.log(res, "6666666");
        console.log(res.data?.message?.response?.widgets, "6666666");
        if (res.status == 200) {
          dispatch({
            type: UNBOX_RECOMMENDATIONS,
            payload: res.data?.message?.response?.widgets,
          });
          resolve(true);
        } else {
          reject(true)
        }
      })
      .catch(err => {
        console.log(err);
        reject(true)
      });
  });
};