import {
  CREATE_SUBSCRIPTION,
  FETCH_SUB_SUCCESS,
  FETCH_SUB_FAIL,
  GENERATEd_SUB_PAYMENT_ID,
  FETCH_USER_DETAILS,
  FETCH_SUBSCRIBER,
  FETCH_SUBSCRIBER_FAILED,
  SEARCH_SUBSCRIBER,
} from "../constants/types"

const initialState = {
  subscription_details: null,
  payment_id_obj: {},
  user_details: "",
  fetch_subscriber: [],
  subscriber_count: {}
};

export default function getOnlineCourseData (state = initialState, action) {
  switch (action.type) {
    case FETCH_SUB_SUCCESS:
      // console.log(action.payload);
      // alert("o")

      return {
        ...state,
        subscription_details: action.payload,
      }
    case CREATE_SUBSCRIPTION:
      return {
        ...state,
        subscription_details: action.payload,
      }
    case CREATE_SUBSCRIPTION:
      return {
        ...state,
        payment: action.payload,
      }
    case GENERATEd_SUB_PAYMENT_ID:
      return {
        ...state,
        payment_id_obj: action.payload,
      }
    case FETCH_USER_DETAILS:
      return {
        user_details: action.payload,
      }
    case FETCH_SUBSCRIBER:
      if (action.payload.page > 0) {
        console.log(action.payload, 'action.payload.sub_count');

        return {
          ...state,
          fetch_subscriber: [...state.fetch_subscriber, ...action.payload.data],
          subscriber_count: action.payload.sub_count
        }
      } else {
        return {
          ...state,
          fetch_subscriber: action.payload.data,
          subscriber_count: action.payload.sub_count
        }
      }

    case SEARCH_SUBSCRIBER:
      //   alert("hi5")
      return {
        ...state,
        fetch_subscriber: action.payload.data,
      }
    default:
      return state
  }
}
