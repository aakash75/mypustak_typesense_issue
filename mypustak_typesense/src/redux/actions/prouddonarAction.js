import {
  GETDONARDETAILS,
  GETDONORSEARCHED,
  SETRESPONSEMSG,
  CLEAR_PROUD_DONOR,
  GLOABALOADER
} from "../constants/types";
import axios from "axios";
import { url } from "../../helper/api_url";

export const donardetails = (pageNo) => async (dispatch) => {

  dispatch({
    type: GLOABALOADER,
  });
  return new Promise((resolve, reject) => {
    axios.get(`${url}/donation/donortable/page${pageNo}/`).then((res) => {
      dispatch({
        type: GETDONARDETAILS,
        payload: res.data,
      });
      resolve(res)
    }).catch((err) => {
      dispatch({
        type: GETDONARDETAILS,
        payload: []
      });
      reject(err)
    })
  })
};

export const searchdonor = (data) => (dispatch) => {
  dispatch({
    type: GLOABALOADER,
  });
  return new Promise((resolve, reject) => {
    axios.get(`${url}/api/v1/search_proud_donor/${data}`).then((res) => {
      dispatch({
        type: GETDONORSEARCHED,
        payload: res.data,
      });
      resolve(res.data)
    }).catch((err) => {
      console.log(err)
      dispatch({
        type: GETDONORSEARCHED,
        payload: [],
      });
      reject(err)
    })
  })

};

export const setResponseMsg = () => (dispatch) => {
  dispatch({
    type: SETRESPONSEMSG,
  });
};

export const ClearSearch = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROUD_DONOR,
  });
};
export const getBannerImage = (BannerPage) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}/api/v2/banners/get_home_banner/${BannerPage}`).then((res) => {
      // dispatch({
      //   type: GETDONORSEARCHED,
      //   payload: res.data,
      // });
      resolve(res.data.data)
    }).catch((err) => {
      console.log(err)
      // dispatch({
      //   type: GETDONORSEARCHED,
      //   payload: [],
      // });
      reject(err)
    })
  })

};
    //  fetch(`${url}/api/v2/banners/get_home_banner/PROUD_DONAR`);
    // const proudimg = await prouddata.json()
    // console.log(proudimg, "proudimg..................")