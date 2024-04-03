import axios from "axios";
import { SEO_GET_DATA, ENTERSEODATA, SUBMITSEODATA } from "../constants/types";
import { AuthInstance, url } from "../../helper/api_url";

//Get Theatre Lists

export const getSeoData = urlP => dispatch => {
  // console.log(url, 'passurl');
  const body = {
    url: "https://www.mypustak.com" + urlP,
  };
  // alert(body.url + "88");
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/v1/seo_tags/seo-data`, body)
      .then(res => {
        // alert(`The seo Data are ${res.data.url}`);
        dispatch({
          type: SEO_GET_DATA,
          payload: res.data,
        });
        resolve(true);
      })
      .catch(err => {
        console.log("The error in action is ", err.response);
        resolve(true);
      });
  });
};

export const getSeoDetails = urlP => dispatch => {
  // console.log(url, 'passurl');
  const body = {
    url: urlP,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/v1/seo_tags/EnterSEOData`, body)
      .then(res => {
        console.log(res.data, "akash");
        //   alert(`The seo Data are ${res.data.url}`);
        dispatch({
          type: ENTERSEODATA,
          payload: res.data,
        });
        resolve(true);
      })
      .catch(err => {
        console.log("The error in action is ", err);
        resolve(true);
      });
  });
};

export const SubmitSeoDetails = (urlP, title, desc) => dispatch => {
  // console.log(url, 'passurl');
  const body = {
    url: urlP,
    title: title,
    desc: desc,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/api/v1/seo_tags/CreateSEOData`, body)
      .then(res => {
        console.log(res.data, "akash");
        //   alert(`The seo Data are ${res.data.url}`);
        dispatch({
          type: SUBMITSEODATA,
          payload: res.data,
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log("The error in action is ", err);
      });
  });
};
