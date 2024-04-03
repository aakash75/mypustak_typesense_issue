// import {LOGIN,SIGNUP,LOGINFAILS,LOGOUT,SIGNEDUP,SHOWLOADER,GETADDRESS,ADD_ADDRESS} from './types'
import {
  GETDONATIONLIST,
  UPDATEDONATIONBYID,
  DONATIONLISTLOADING,
  FETCHDONATIONBYID,
  UPDATEDONATION,
  SERACHDONATIONLIST,
  ADD_DONATIONID,
  GETPAIDDONATIONS,
  GETPROCESSDONATIONS,
  INSERT_DONATION_NOTES,
  GET_DONATION_NOTES,
  GET_DONATIONNOTE_LOADER,
  GETFOLLOWUPDONATIONS,
  GETPICKUPEXCEPTIONDONATIONS,
  GETDONATIONS_FILTER_BY_STATE,
  FETCH_FEDEX_RATE,
  FETCH_FEDEX_PINCODE_SERVICE,
  FETCH_FEDEX_RATE_ERROR,
  FETCH_FEDEX_PINCODE_SERVICE_ERROR,
  GETDONATIONS_FILTER_BY_STATUS,
  DONATION_DETAILS,
  FETCH_DONATION_TRACKING,
  FETCH_WALLET_REF,
  SENTDONATION_MAIL,
  FILTER_NOT_TXNDONATION,
  QUEUE_NO,
  TRACKING_ALERT,
  PICKUP_ALERT,
  DONATIONREFUNDORDER,
  ROUTEMAP,
  NEWBOOKINGFORPICKUP,
  SELECTBOOKINGCOURIER,
} from "../constants/types";
import axios from "axios";
// import config from "react-global-configuration";
import { AuthInstance, url } from "../../helper/api_url";

import { reject } from "lodash";

export const getDonationsList =
  ({ page, token, search, searchValue, is_freesort }) =>
    dispatch => {
      dispatch({
        type: DONATIONLISTLOADING,
        payload: {},
      });

      let URL = "";
      if (searchValue) {
        URL = `${config.get(
          "apiDomain"
        )}/api/v1/fetch_donation_details/fetch-donation-details/${searchValue}`;
        return new Promise((resolve, reject) => {
          AuthInstance.get(URL)
            .then(res => {
              dispatch({
                type: SERACHDONATIONLIST,
                payload: { data: res.data.data, count: res.data.count },
              });
              resolve(res);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        });
      } else {
        URL = `${url}/api/v1/donation-form-status/fetch-donation-reqeust/${page + 1
          }/${is_freesort}/`;
        return new Promise((resolve, reject) => {
          AuthInstance.get(URL)
            .then(res => {
              if (res.status === 200) {
                if (search) {
                  dispatch({
                    type: SERACHDONATIONLIST,
                    payload: { data: res.data.data, count: res.data.count },
                  });
                } else {
                  dispatch({
                    type: GETDONATIONLIST,
                    payload: { data: res.data.data, page, count: res.data.count },
                  });
                }
              }
              resolve(res);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        });
      }
    };

export const updateDonationById =
  ({
    donation_req_ids,
    new_status,
    token,
    paidFilter,
    processFilter,
    followUpFilter,
    PickupExceptFilter,
    stateFilter,
    donationFetchedByStatus,
    page,
  }) =>
    dispatch => {
      console.log(donation_req_ids, "req");

      dispatch({
        type: DONATIONLISTLOADING,
        payload: {},
      });

      let body = {
        donation_ids: donation_req_ids,
        status: new_status,
      };
      console.log(body, ".............body");
      return new Promise((resolve, reject) => {
        // alert("click")
        // AuthInstance.patch(
        //   `${config.get(
        //     "apiDomain"
        //   )}/api/v1/donation-form-status/update-donation-status/${donation_req_id}`,
        //   body
        // )
        AuthInstance.patch(
          `${url}/api/v1/donation-form-status/updatemultipledonationstatus`,
          body
        )
          .then(res => {
            console.log(res);

            if (res.data.status === 200) {
              dispatch({
                type: UPDATEDONATIONBYID,
                payload: {
                  donation_req_ids,
                  new_status,
                  paidFilter,
                  processFilter,
                  followUpFilter,
                  PickupExceptFilter,
                  stateFilter,
                  donationFetchedByStatus,
                  page,
                },
              });
              resolve(res.data);
            }
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    };

export const updateDonation =
  ({ donation, token, pass_to_reducer = true }) =>
    dispatch => {
      // alert("enter action")
      if (pass_to_reducer) {
        dispatch({
          type: DONATIONLISTLOADING,
          payload: {},
        });
      }

      let body = donation;

      return new Promise((resolve, reject) => {
        // alert("returning")
        AuthInstance.patch(
          `${url}/api/v1/donation-form-status/update-donation-request/${donation.donation_req_id}`,
          body
        )
          .then(res => {
            if (res.data.status === 200) {
              if (pass_to_reducer) {
                console.log(res.data, "resDATA");
                dispatch({
                  type: UPDATEDONATION,
                  payload: { data: res.data },
                });
              }
              // alert(`Donation ${donation.donation_req_id} updated successfully.`);
            }

            resolve(true);
          })
          .catch(err => {
            console.log(err, "Update Err", body);
            // alert(`Donation ${donation.donation_req_id} updated failed.`);
            dispatch({
              type: UPDATEDONATION,
              payload: { data: {} },
            });

            resolve(false);
          });
      });
    };

export const updatePickupid =
  ({ updatePickup, token }) =>
    dispatch => {
      // alert("uPi")
      dispatch({
        type: DONATIONLISTLOADING,
        payload: {},
      });

      let body = updatePickup;
      // alert("UP")
      return new Promise((resolve, reject) => {
        AuthInstance.patch(
          `${url}/api/v1/donation-form-status/update-donation-request/${updatePickup.donation_req_id}`,
          body
        )
          .then(res => {
            if (res.data.status === 200) {
              dispatch({
                type: UPDATEDONATION,
                payload: { data: res.data },
              });
              // alert(`Donation ${updatePickup.donation_req_id} updated successfully.`)
              alert(`Pickup ${updatePickup.volunteer_id} updated successfully.`);
              resolve(true);
            } else {
              dispatch({
                type: UPDATEDONATION,
                payload: { data: res.data },
              });
              alert("pickupid already exist");
            }
          })
          .catch(err => {
            console.log(err, "Update Err", body);
            alert(`Donation ${updatePickup.donation_req_id} updated failed.`);
            dispatch({
              type: UPDATEDONATION,
              payload: { data: {} },
            });
          });
      });
    };

export const getDonationById =
  ({ donation_req_id, token }) =>
    dispatch => {
      dispatch({
        type: DONATIONLISTLOADING,
        payload: {},
      });

      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/v1/donation-form-status/fetch-donation-reqeust-by-id/${donation_req_id}/`
        )
          .then(res => {
            if (res.status === 200) {
              console.log(res.data, "donationadaf");
              dispatch({
                type: FETCHDONATIONBYID,
                payload: { data: res.data.data },
              });
              resolve(res.data.data);
            }

          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    };

export const addDonationTrackingId =
  (donation_req_id, tracking_no, token) => dispatch => {
    console.log("reqq", donation_req_id, tracking_no, token, "oo");

    let body = {
      tracking_no: tracking_no,
    };
    axios
      .patch(
        `${config.get(
          "apiDomain"
        )}/api/v1/addDonationRequest/add-donaton-request/${donation_req_id}`,
        body
      )
      .then(res => {
        dispatch({
          type: ADD_DONATIONID,
          payload: {},
        });
        if (res.data.status === 200) {
          alert(`${res.data.message}`);
        }
      })
      .catch(err => console.log(err));
  };

export const getPaidDonations =
  ({ token, page }) =>
    dispatch => {
      if (page == 0) {
        page = 1;
      }
      // alert(page)
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/v1/donation-form-status/filter-paid-donation-request/${page}`
        )
          .then(res => {
            console.log(res.data.donationList, "getPaidDonations", page);

            dispatch({
              type: GETPAIDDONATIONS,
              payload: {
                data: res.data.donationList,
                page,
                count: res.data.count,
              },
            });
            resolve(res);
          })
          .catch(err => {
            alert(`Something went wrong`);
            console.log(err);
            reject(err);
          });
      });
    };

export const getProcessDonations =
  ({ token, page }) =>
    dispatch => {
      if (page == 0) {
        page = 1;
      }
      // alert(page)
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/v1/donation-form-status/filter-process-donation-request/${page}`
        )
          .then(res => {
            console.log(res.data.donationList, "getProcessDonations", page);

            dispatch({
              type: GETPROCESSDONATIONS,
              payload: { data: res.data.donationList, page },
            });
            resolve(data);
          })
          .catch(err => {
            alert(`Something went wrong`);
            console.log(err);
          });
        reject(err);
      });
    };

export const insertdonationnotes =
  (adddonationnote, adddonationnotetype, orderBy, token) => dispatch => {
    // alert("hii2")
    // dispatch({
    //     type: SHIPPINGADDRESSLOADING,
    //     payload: {  }
    //   });

    console.log(adddonationnotetype, "type1");
    let body = {
      donationnote: adddonationnote,
      donationnotetype: adddonationnotetype,
      donationid: orderBy,
    };
    AuthInstance.post(
      `${config.get(
        "apiDomain"
      )}/api/v1/donation-form-status/insertdonationnotes/${orderBy}/`,
      body
    )
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: INSERT_DONATION_NOTES,
            payload: {},
          });
          console.log(res, "notes");
          AuthInstance.get(
            `${config.get(
              "apiDomain"
            )}/api/v1/donation-form-status/fetchdonationnotes/${orderBy}/`
          )
            .then(res => {
              if (res.status === 200) {
                dispatch({
                  type: GET_DONATION_NOTES,
                  payload: { orderBy, data: res.data.data },
                });
                console.log(res, "notes");
              }
            })
            .catch(err => {
              console.log(err);
              dispatch({
                type: GET_DONATIONNOTE_LOADER,
                payload: "",
              });
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

export const getdonationnotes = (order_id, token) => dispatch => {
  // alert("hii55")
  dispatch({
    type: GET_DONATIONNOTE_LOADER,
    payload: {},
  });

  AuthInstance.get(
    `${config.get(
      "apiDomain"
    )}/api/v1/donation-form-status/fetchdonationnotes/${order_id}/`
  )
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: GET_DONATION_NOTES,
          payload: { order_id, data: res.data.data },
        });
        console.log(res, "notes");
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_DONATIONNOTE_LOADER,
        payload: "",
      });
    });
};

export const getfollowupDonations =
  ({ token, page }) =>
    dispatch => {
      if (page == 0) {
        page = 1;
      }
      // alert(page)
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/v1/donation-form-status/filter-followup-donation-request/${page}`
        )
          .then(res => {
            console.log(res.data.donationList, "getFollowupDonations", page);

            dispatch({
              type: GETFOLLOWUPDONATIONS,
              payload: { data: res.data.donationList, page },
            });
            resolve(res);
          })
          .catch(err => {
            alert(`Something went wrong`);
            console.log(err);
            reject(err);
          });
      });
    };

export const getPickupExceptupDonations =
  ({ token, page }) =>
    dispatch => {
      if (page == 0) {
        page = 1;
      }
      // alert(page)
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/v1/donation-form-status/filter-pickupexception-donation-request/${page}`
        )
          .then(res => {
            console.log(res.data.donationList, "getFollowupDonations", page);

            dispatch({
              type: GETPICKUPEXCEPTIONDONATIONS,
              payload: { data: res.data.donationList, page },
            });
            resolve(res);
          })
          .catch(err => {
            alert(`Something went wrong`);
            console.log(err);
            reject(err);
          });
      });
    };

export const getDonationByState =
  ({ token, page, state }) =>
    dispatch => {
      dispatch({ type: DONATIONLISTLOADING });
      // if (page ) {
      page = page + 1;
      // }
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/v1/donation-form-status/filter-donation-bystate/${page}/${state}`
        )
          .then(res => {
            // console.log(res);
            dispatch({
              type: GETDONATIONS_FILTER_BY_STATE,
              payload: { page, data: res.data.data, count: res.data.count },
            });
            resolve(res);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    };

export const create_booking =
  ({ token, body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${config.get("apiDomain")}/api/fedex_booking/create_shipment`,
          body
        )
          .then(res => {
            console.log({ res }, "create_booking");
            resolve(res);
          })
          .catch(err => {
            console.log({ err });
            resolve(false);
            if (err.response) {
              alert(err.response.data.msg);
            }
          });
      });
    };

export const getFedexBookingPrice =
  ({ token, body, pass_to_reducer = true }) =>
    dispatch => {
      if (pass_to_reducer) {
        dispatch({
          type: DONATIONLISTLOADING,
          payload: {},
        });
      }

      // dispatch({
      // 	type: DONATIONLISTLOADING,
      // 	payload: {}
      // });
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${config.get("apiDomain")}/api/fedex_booking/fedex_rate`,
          body
        )
          .then(res => {
            console.log({ res }, "getFedexBookingPrice");
            dispatch({ type: FETCH_FEDEX_RATE, payload: res.data });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });
            dispatch({ type: FETCH_FEDEX_RATE_ERROR });
            resolve(false);
            if (err.response) {
              alert(err.response.data.msg);
            }
          });
      });
    };

export const getFedexPicodeService =
  ({ token, body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${config.get("apiDomain")}/api/fedex_booking/fedex_pincode_service`,
          body
        )
          .then(res => {
            console.log({ res }, "getFedexPicodeService");
            dispatch({ type: FETCH_FEDEX_PINCODE_SERVICE, payload: res.data });

            resolve(res);
          })
          .catch(err => {
            console.log({ err });
            dispatch({ type: FETCH_FEDEX_PINCODE_SERVICE_ERROR });

            resolve(false);
            if (err.response) {
              alert(err.response.data.msg);
            }
          });
      });
    };

export const FedexDonationPickup =
  ({ token, body }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${config.get("apiDomain")}/api/fedex_booking/generate_fedex_pickup`,
          body
        )
          .then(res => {
            console.log({ res });
            resolve(res.data);
          })
          .catch(err => {
            console.log({ err });

            reject(err);
          });
      });
    };

export const getShipRocketBookingPrice =
  ({ sr_token, body, token }) =>
    dispatch => {
      let SRheader = {
        headers: {
          Authorization: `Bearer ${sr_token}`,
        },
      };
      return new Promise((resolve, reject) => {
        let header = {
          headers: {
            Authorization: `Token ${token}`,
          },
        };
        AuthInstance.get(
          `${url}/api/v1/donation-form-status/fetch-donation-reqeust-by-id/${body.donation_req_id}/`
        )
          .then(res => {
            let doner_details = res.data.data;
            console.log({ doner_details });
            const { zipcode } = doner_details;
            axios
              .get(
                `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${zipcode}&delivery_postcode=700136&cod=0&weight=${body.wt}`,
                SRheader
              )
              .then(res => {
                if (res.data.status == "404") {
                  resolve({ sr_res: [] });
                }
                res.data.data.available_courier_companies.map(courier =>
                  console.log(courier.courier_name)
                );

                const DeliverycourierOption =
                  res.data.data.available_courier_companies.filter(
                    courier => courier.courier_name.indexOf("Delhivery") > -1
                  );
                if (DeliverycourierOption) {
                  const delhivery_options = DeliverycourierOption.sort(
                    (courierA, courierB) => {
                      return courierA.rate - courierB.rate;
                    }
                  );
                  resolve({ sr_res: delhivery_options });
                } else {
                  resolve({ sr_res: [] });
                }
              })
              .catch(err => {
                reject(err);
              });
          })
          .catch(err => {
            reject(err);
          });
      });
    };

export const GenerateShipRocketBooking =
  ({ sr_token, body }) =>
    dispatch => {
      let SRheader = {
        headers: {
          Authorization: `Bearer ${sr_token}`,
        },
      };
      return new Promise((resolve, reject) => {
        axios
          .post(
            `https://apiv2.shiprocket.in/v1/external/shipments/create/forward-shipment`,
            body,
            SRheader
          )
          .then(res => {
            console.log({ res }, "CustomcreatePOST ShipRocket");
            if (res.data.payload.awb_code) {
              alert(
                `POST created successfully for ${body.order_id} and Waybill No is - ${res.data.payload.awb_code}`
              );
            }
            resolve({
              label: res.data.payload.label_url,
              tracking: res.data.payload.awb_code,
            });
          })
          .catch(err => {
            reject(err);
          });
        // resolve({label:`${body.order_id}url`,tracking:`${body.order_id}awb`})
      });
    };

export const addShipRocketpickuplocation =
  ({ sr_token, body }) =>
    dispatch => {
      let SRheader = {
        headers: {
          Authorization: `Bearer ${sr_token}`,
        },
      };
      return new Promise((resolve, reject) => {
        axios
          .post(
            `https://apiv2.shiprocket.in/v1/external/settings/company/addpickup`,
            body,
            SRheader
          )
          .then(res => {
            console.log({ res }, "addShipRocketpickuplocation ShipRocket");
            // if (res.data.payload.awb_code) {
            // 	alert(
            // 		`POST created successfully for ${body.order_id} and Waybill No is - ${res.data
            // 			.payload.awb_code}`
            // 	);
            // }
            resolve(true);
          })
          .catch(err => {
            console.log({ err });

            if (err.response.status == 422) {
              let error = JSON.stringify(err.response.data);
              alert(error);
              resolve(true);
            }
            reject(err);
          });
      });
    };

export const sendLabel =
  ({ body, token }) =>
    dispatch => {
      let header = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/v1/post/cp_recommendation/download_label`,
          body
        )
          .then(res => {
            console.log({ res }, "addShipRocketpickuplocation ShipRocket");

            resolve(true);
          })
          .catch(err => {
            reject(err);
          });
      });
    };

export const getDonationByStatus =
  ({ token, page, status }) =>
    dispatch => {
      dispatch({ type: DONATIONLISTLOADING });
      let header = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      page = page + 1;
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/v1/donation-form-status/filter-donation-by-status/${page}/${status}`
        )
          .then(res => {
            dispatch({
              type: GETDONATIONS_FILTER_BY_STATUS,
              payload: { page, data: res.data.data, count: res.data.count },
            });
            resolve(res);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    };

export const fetch_donation_details =
  ({ donation_id }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${url}/api/v1/donation-form-status/fetch_Donataion_details/${donation_id}`
          )
          .then(res => {
            console.log(res, "mark");
            // alert(res.data.message)
            dispatch({
              type: DONATION_DETAILS,
              payload: res.data.data,
            });
            resolve(true);
          })
          .catch(err => {
            console.log(err, "error");
          });
      });
    };

export const fetch_donation_tracking_detail =
  ({ donation_id }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${url}/api/v1/donation-form-status/fetch_donation_tracking/${donation_id}`
          )
          .then(res => {
            console.log(res, "mark");
            // alert(res.data.message)
            dispatch({
              type: FETCH_DONATION_TRACKING,
              payload: res.data.data,
            });
            resolve(true);
          })
          .catch(err => {
            console.log(err, "error");
          });
      });
    };

export const Sent_donationmail =
  ({ Data }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${config.get("apiDomain")}/common/donationEmail/`, Data)
          .then(res => {
            console.log(res, "mark");
            // alert(res.data.message)
            dispatch({
              type: SENTDONATION_MAIL,
              payload: { email: Data.email, donation_req_id: Data.donationId },
            });
            resolve(true);
          })
          .catch(err => {
            console.log(err, "error");
            reject(err);
          });
      });
    };

export const getDonation_Not_entertxn =
  ({ token, page }) =>
    dispatch => {
      if (page == 0) {
        page = 1;
      }
      return new Promise((resolve, reject) => {
        // alert(page)
        AuthInstance.get(
          `${url}/api/v1/donation-form-status/fetchdonation_notTxn_entry/${page}/`
        )
          // .get(`http://127.0.0.1:8000/api/v1/donation-form-status/fetch-donation-reqeust/1/`)
          .then(res => {
            console.log(res.data, "getFollowupDonations", page);

            dispatch({
              type: FILTER_NOT_TXNDONATION,
              payload: { data: res.data, page },
            });
            resolve(res);
          })
          .catch(err => {
            alert(`Something went wrong`);
            console.log(err);
            reject(err);
          });
      });
    };

export const Fetch_queue_no =
  ({ donation_req_id }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.get(
          `${url}/api/v1/donation-form-status/fetchdonation_queueNo/${donation_req_id}`
        )
          .then(res => {
            if (res.status === 200) {
              console.log(res.data, "donationadaf");
              dispatch({
                type: QUEUE_NO,
                payload: res.data,
              });
              resolve(res.data);
            }
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    };

export const Update_avgrate_action = () => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${config.get(
        "apiDomain"
      )}/api/v1/donation-form-status/Update_donationform_rate`
    )
      .then(res => {
        if (res.status === 200) {
          console.log(res.data, "donationadaf");
          // dispatch({
          // 	type: QUEUE_NO,
          // 	payload: res.data
          // });
          resolve(res.data);
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const Donation_tracking_alert = donation_id => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${config.get(
        "apiDomain"
      )}/api/v1/donation-form-status/donationtracking_alert/${donation_id}`
    )
      .then(res => {
        if (res.status === 200) {
          console.log(res.data, "donationadaf");
          dispatch({
            type: TRACKING_ALERT,
            payload: donation_id,
          });
          resolve(res.data);
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const Donation_pickup_alert = donation_id => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${config.get(
        "apiDomain"
      )}/api/v1/donation-form-status/donationpickup_alert/${donation_id}`
    )
      .then(res => {
        if (res.status === 200) {
          console.log(res.data, "donationadaf");
          dispatch({
            type: PICKUP_ALERT,
            payload: donation_id,
          });
          resolve(true);
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};

export const DonationrefundOrder =
  ({ body, token }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/v1/donation-form-status/create_donationrefund_request`,
          body
        )
          .then(res => {
            dispatch({
              type: DONATIONREFUNDORDER,
              payload: body,
            });
            resolve(true);
          })
          .catch(err => {
            console.log(err, "Error");
            resolve(false);
          });
      });
    };

export const add_shyplite_address =
  ({ body, token }) =>
    dispatch => {
      return new Promise((resolve, reject) => {
        AuthInstance.post(
          `${url}/api/v1/post/cp_recommendation/Add_pickup_address_shyplite`,
          body
        )
          .then(res => {
            console.log(res.data.message);
            resolve(res.data.message);
          })
          .catch(err => {
            console.log(err, "Error");
            resolve(false);
          });
      });
    };

export const fetch_pickupexcel = () => dispatch => {
  // alert("wait");
  dispatch({
    type: ROUTEMAP,
    payload: { data: [], istrue: true },
  });

  return new Promise((resolve, reject) => {
    AuthInstance.get(
      `${config.get("apiDomain")}/api/v1/logistics_data/excel_fetch_api`
    )
      .then(res => {
        // console.log(res.data.message, "route+++");
        // alert("okk")
        dispatch({
          type: ROUTEMAP,
          payload: { data: res.data.message, istrue: false },
        });
        resolve(res.data);
      })
      .catch(err => {
        console.log(err, "Error");
        reject(err);
      });
  });
};

export const create_donation_declaration = body => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.post(
      `${config.get(
        "apiDomain"
      )}/api/v1/donation-form-status/generate_donation_declaration`,
      body
    )
      .then(res => {
        console.log(res.data, "route+++");

        resolve(res.data);
      })
      .catch(err => {
        console.log(err, "Error");
        reject(true);
      });
  });
};
export const ParingNewBookingAction = body => dispatch => {
  // alert("action call")
  return new Promise((resolve, reject) => {
    AuthInstance.post(
      `${config.get(
        "apiDomain"
      )}/api/v1/pickup_courier_booking/get_courier_pricing`,
      body
    )
      .then(res => {
        // console.log(res, "111111111111111")

        dispatch({
          type: NEWBOOKINGFORPICKUP,
          payload: res.data.message,
        });
        console.log(res.data.message, "response get it.........");
        resolve(res.message);
      })
      .catch(err => {
        alert("error in action");
        console.log(err, "error");
        reject(err);
      });
  });
};

export const selectedcourierpartner = body => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.post(
      `${config.get("apiDomain")}/api/v1/pickup_courier_booking/pickrr_booking`,
      body
    )
      .then(res => {
        console.log(res, "res from booking");
        alert("done");
        // alert("Courier Name " + res.data.message.courier)
        // alert("Tracikng ID " + res.data.message.tracking_id)
        resolve(res.data.message);
      })
      .catch(err => {
        alert("error");
        console.log(err, "Error");
        reject(err);
      });
  });
};

export const rocketbox_booking = body => dispatch => {
  return new Promise((resolve, reject) => {
    AuthInstance.post(
      `${config.get(
        "apiDomain"
      )}/api/v1/pickup_courier_booking/rocketbox_order_creation`,
      body
    )
      .then(res => {
        console.log(res, "res from booking");
        alert("done");
        // alert("Courier Name " + res.data.message.courier)
        // alert("Tracikng ID " + res.data.message.tracking_id)
        resolve(res.data.message);
      })
      .catch(err => {
        alert(JSON.stringify(err.request.response));

        console.log(err.request.response);
        reject(err);
      });
  });
};
