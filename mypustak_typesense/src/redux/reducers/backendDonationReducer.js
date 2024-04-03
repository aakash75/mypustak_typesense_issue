// import { LOGIN,SIGNUP,SIGNEDUP ,LOGINFAILS,LOGOUT,SHOWLOADER,GETADDRESS,ADD_ADDRESS } from '../types';
import {
  GETDONATIONLIST,
  UPDATEDONATIONBYID,
  DONATIONLISTLOADING,
  FETCHDONATIONBYID,
  UPDATEDONATION,
  SERACHDONATIONLIST,
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
  TRACKING_ALERT,
  PICKUP_ALERT,
  DONATIONREFUNDORDER,
  ROUTEMAP,
  NEWBOOKINGFORPICKUP,
  SELECTBOOKINGCOURIER,
} from "../constants/types";

const initialState = {
  insertdonationnote: false,
  donationnoteloader: false,
  isRouteMapDataCome: false,
  donationnotes: {},
  donationList: [],
  currentDonation: {},
  loading: false,
  paidDonationList: {},
  processDonationList: {},
  followupDonationList: {},
  pickupExceptionDonationList: {},
  donationFetchedByState: {},
  fedex_rate_response: {},
  fedex_service_response: {},
  donationFetchedByStatus: {},
  donation_details_data: {},
  donar_tracking_detail: {},
  donation_tracking_detail: [],
  wallet_ref: [],
  route_mapdata: [],
  pickupRecemondationData: {},
  totalCount: 0,
};

export default function donation (state = initialState, action) {
  switch (action.type) {
    case GETDONATIONLIST:
      // alert(`${action.payload.count}`)
      if (state.donationList.length && action.payload.page > 0) {
        return {
          ...state,
          donationList: [...state.donationList, ...action.payload.data],
          loading: false,
          totalCount: action.payload.count,
        };
      } else {
        return {
          ...state,
          donationList: action.payload.data,
          totalCount: action.payload.count,
          loading: false,
        };
      }
    case SERACHDONATIONLIST:
      // console.log(action.payload.data, 'dafa;sldkfjasdfl;kajs;');
      return {
        ...state,
        donationList: [...action.payload.data],
        loading: false,
        totalCount: action.payload.count,
      };
    case DONATIONLISTLOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATEDONATIONBYID:
      if (
        !action.payload.paidFilter &&
        !action.payload.processFilter &&
        !action.payload.followUpFilter &&
        !action.payload.PickupExceptFilter &&
        !action.payload.stateFilter &&
        action.payload.donationFetchedByStatus == ""
      ) {
        let donationList = state.donationList;
        let updatedDonationList = donationList.map(donation => {
          if (donation.donation_req_id === action.payload.donation_req_id) {
            donation.status = action.payload.new_status;
          }
          return donation;
        });

        return {
          ...state,
          donationList: updatedDonationList,
          loading: false,
        };
      } else if (action.payload.processFilter) {
        let processDonationList = state.processDonationList;
        let updatedDonationList = processDonationList.map(donation => {
          if (donation.donation_req_id === action.payload.donation_req_id) {
            donation.status = action.payload.new_status;
          }
          return donation;
        });
        return {
          ...state,
          processDonationList: updatedDonationList,
          loading: false,
        };
      } else if (action.payload.followUpFilter) {
        let followupDonationList = state.followupDonationList;
        let updatedDonationList = followupDonationList.map(donation => {
          if (donation.donation_req_id === action.payload.donation_req_id) {
            donation.status = action.payload.new_status;
          }
          return donation;
        });
        return {
          ...state,
          followupDonationList: updatedDonationList,
          loading: false,
        };
      } else if (action.payload.PickupExceptFilter) {
        let pickupExceptionDonationList = state.pickupExceptionDonationList;
        let updatedDonationList = pickupExceptionDonationList.map(donation => {
          if (donation.donation_req_id === action.payload.donation_req_id) {
            donation.status = action.payload.new_status;
          }
          return donation;
        });
        return {
          ...state,
          pickupExceptionDonationList: updatedDonationList,
          loading: false,
        };
      } else if (action.payload.stateFilter) {
        let donationFetchedByState = state.donationFetchedByState;
        let updatedDonationList = donationFetchedByState.map(donation => {
          if (donation.donation_req_id === action.payload.donation_req_id) {
            donation.status = action.payload.new_status;
          }
          return donation;
        });
        return {
          ...state,
          donationFetchedByState: updatedDonationList,
          loading: false,
        };
      } else if (action.payload.donationFetchedByStatus !== "") {
        let donationFetchedByStatus = state.donationFetchedByStatus;
        let updatedDonationList = donationFetchedByStatus.map(donation => {
          if (donation.donation_req_id === action.payload.donation_req_id) {
            donation.status = action.payload.new_status;
          }
          return donation;
        });
        return {
          ...state,
          donationFetchedByStatus: updatedDonationList,
          loading: false,
        };
      } else {
        let paidDonationList = state.paidDonationList;
        let updatedDonationList = paidDonationList.map(donation => {
          if (donation.donation_req_id === action.payload.donation_req_id) {
            donation.status = action.payload.new_status;
          }
          return donation;
        });
        return {
          ...state,
          paidDonationList: updatedDonationList,
          loading: false,
        };
      }

    case FETCHDONATIONBYID:
      return {
        ...state,
        currentDonation: action.payload.data,
        loading: false,
      };
    case UPDATEDONATION:
      return {
        ...state,
        currentDonation: action.payload.data,
        loading: false,
      };

    case GETPAIDDONATIONS:
      // alert(action.payload.page)
      if (state.paidDonationList.length && action.payload.page > 1) {
        return {
          ...state,
          paidDonationList: [...state.paidDonationList, ...action.payload.data],
          loading: false,
          totalCount: action.payload.count,
        };
      } else {
        return {
          ...state,
          paidDonationList: action.payload.data,
          loading: false,
          totalCount: action.payload.count,
        };
      }

    case GETPROCESSDONATIONS:
      // alert(action.payload.page)
      if (state.processDonationList.length && action.payload.page > 1) {
        //  alert('ok')
        return {
          ...state,
          processDonationList: [
            ...state.processDonationList,
            ...action.payload.data,
          ],
          // processDonationList:state.processDonationList.concat(action.payload.data),

          loading: false,
        };
      } else {
        return {
          ...state,
          processDonationList: action.payload.data,
          loading: false,
        };
      }

    case GET_DONATIONNOTE_LOADER:
      return {
        ...state,
        donationnoteloader: !state.donationnoteloader,
      };

    case GET_DONATION_NOTES:
      return {
        ...state,
        donationnotes: action.payload.data,
        donationnoteloader: false,
      };

    case INSERT_DONATION_NOTES:
      return {
        ...state,
        insertdonationnote: true,
        donationnoteloader: false,
      };

    case GETFOLLOWUPDONATIONS:
      // alert(action.payload.page)
      if (state.followupDonationList.length && action.payload.page > 1) {
        //  alert('ok')
        return {
          ...state,
          followupDonationList: [
            ...state.followupDonationList,
            ...action.payload.data,
          ],
          // processDonationList:state.processDonationList.concat(action.payload.data),

          loading: false,
        };
      } else {
        return {
          ...state,
          followupDonationList: action.payload.data,
          loading: false,
        };
      }

    case GETPICKUPEXCEPTIONDONATIONS:
      // alert(action.payload.page)
      if (state.pickupExceptionDonationList.length && action.payload.page > 1) {
        //  alert('ok')
        return {
          ...state,
          pickupExceptionDonationList: [
            ...state.pickupExceptionDonationList,
            ...action.payload.data,
          ],
          // processDonationList:state.processDonationList.concat(action.payload.data),

          loading: false,
        };
      } else {
        return {
          ...state,
          pickupExceptionDonationList: action.payload.data,
          loading: false,
        };
      }

    case GETDONATIONS_FILTER_BY_STATE:
      if (state.donationFetchedByState.length && action.payload.page > 1) {
        return {
          ...state,
          donationFetchedByState: [
            ...state.donationFetchedByState,
            ...action.payload.data,
          ],
          loading: false,
          totalCount: action.payload.count,
        };
      } else {
        return {
          ...state,
          donationFetchedByState: action.payload.data,
          loading: false,
          totalCount: action.payload.count,
        };
      }

    case FETCH_FEDEX_RATE:
      return {
        ...state,
        fedex_rate_response: action.payload,
        loading: false,
      };

    case FETCH_FEDEX_RATE_ERROR:
      return {
        ...state,
        fedex_rate_response: {},
        loading: false,
      };

    case FETCH_FEDEX_PINCODE_SERVICE:
      return {
        ...state,
        fedex_service_response: action.payload,
      };

    case FETCH_FEDEX_PINCODE_SERVICE_ERROR:
      return {
        ...state,
        fedex_service_response: {},
        loading: false,
      };

    case GETDONATIONS_FILTER_BY_STATUS:
      if (state.donationFetchedByStatus.length && action.payload.page > 1) {
        return {
          ...state,
          donationFetchedByStatus: [
            ...state.donationFetchedByStatus,
            ...action.payload.data,
          ],
          loading: false,
          totalCount: action.payload.count,
        };
      } else {
        return {
          ...state,
          donationFetchedByStatus: action.payload.data,
          loading: false,
          totalCount: action.payload.count,
        };
      }

    case DONATION_DETAILS:
      console.log(action.payload, "don_detail11");
      return {
        ...state,
        donation_details_data: action.payload.donation_detail,
        donar_tracking_detail: action.payload.tracking_detail,
      };

    case FETCH_DONATION_TRACKING:
      // alert("jj")
      console.log(action.payload, "tracking");
      return {
        ...state,
        donation_tracking_detail: action.payload,
      };
    case SENTDONATION_MAIL:
      console.log(action.payload, "actionupadt");
      let donationList = state.donationList;
      let updatedDonationList = donationList.map(donation => {
        if (donation.donation_req_id === action.payload.donation_req_id) {
          donation.is_mail_sent = 1;
        }

        return donation;
      });
      console.log(updatedDonationList, "update222555");
      // alert("hh")
      return {
        ...state,
        donationList: updatedDonationList,
      };
    case FILTER_NOT_TXNDONATION:
      // alert(action.payload.page)
      if (state.donationList.length && action.payload.page > 1) {
        //  alert('ok')
        return {
          ...state,
          donationList: [...state.donationList, ...action.payload.data],
          // processDonationList:state.processDonationList.concat(action.payload.data),

          loading: false,
        };
      } else {
        return {
          ...state,
          donationList: action.payload.data,
          loading: false,
        };
      }

    case TRACKING_ALERT:
      //   alert("hh");
      console.log(action.payload, "actionupadt");
      let new_donation = state.currentDonation;
      console.log(new_donation, "123before");
      new_donation.tracking_slip_alert = 1;
      console.log(new_donation, "123after");

      //   console.log(
      //     state.currentDonation,
      //     state.currentDonation.donation_req_id,
      //     "123456"
      //   );
      // alert("hh")
      return {
        ...state,
        currentDonation: new_donation,
      };

    case PICKUP_ALERT:
      //   alert("hh");
      console.log(action.payload, "actionupadt");
      let pickup_donation = state.currentDonation;
      console.log(pickup_donation, "123before");
      pickup_donation.pickupid_alert = 1;
      console.log(pickup_donation, "123after");

      //   console.log(
      //     state.currentDonation,
      //     state.currentDonation.donation_req_id,
      //     "123456"
      //   );
      // alert("hh")
      return {
        ...state,
        currentDonation: pickup_donation,
      };

    case DONATIONREFUNDORDER:
      console.log(action.payload, "refffffund");

      let new_refunddonationList = state.donationList;
      let new_refundupdatedDonationList = new_refunddonationList.map(
        donation => {
          console.log(donation.donationid, "refund order1");
          if (donation.donation_id === action.payload.donation_id) {
            let new_refundOrder = donation;
            new_refundOrder.status = 0;
            // new_order.is_notification_sent = "Y";
            Object.assign(donation, new_refundOrder);
          }
          return donation;
        }
      );

      return {
        ...state,
        donationList: new_refundupdatedDonationList,
        loading: false,
      };

    case ROUTEMAP:
      // alert("reducer");
      // console.log(action.payload);
      return {
        ...state,
        route_mapdata: action.payload.data,
        isRouteMapDataCome: action.payload.istrue,
      };

    case NEWBOOKINGFORPICKUP:
      console.log(action.payload, "NEWBOOKINGFORPICKUP Reducer");
      // alert("Reducer call")
      return { ...state, pickupRecemondationData: action.payload };
    default:
      return state;
  }
}
