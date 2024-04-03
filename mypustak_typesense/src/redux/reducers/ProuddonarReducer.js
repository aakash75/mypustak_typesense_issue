import {
  GETDONARDETAILS,
  GETDONORSEARCHED,
  SETRESPONSEMSG,
  CLEAR_PROUD_DONOR,
  GLOABALOADER
} from "../constants/types";
const initialState = {
  getdonar: [],
  NoDonorFoundS: false,
  globalLoabal: false,
  // donation_req_id:'123456',
  // app_books_weight:'',
  // email:'mukul.meri@gmail.com',
  // name:'abc xyz'
};

export default function getProudDonors (state = initialState, action) {
  switch (action.type) {
    case GETDONARDETAILS:
      // console.log(state.getdonar, "789654")
      if (state.getdonar.length < 3)
        return {
          ...state,
          getdonar: action.payload,
          NoDonorFoundS: false,
          globalLoabal: false
        };
      else {
        return {
          ...state,
          getdonar: [...state.getdonar, ...action.payload],
          NoDonorFoundS: false,
          globalLoabal: false
        };
      }
    case GETDONORSEARCHED:
      // alert('redu')

      return {
        ...state,
        getdonar: action.payload,
        NoDonorFoundS: false, globalLoabal: false
      };

    case SETRESPONSEMSG:
      // alert('redu')
      return {
        ...state,
        NoDonorFoundS: false,
      };
    case CLEAR_PROUD_DONOR:
      return {
        ...state,
        getdonar: [],
      };
    case GLOABALOADER:
      return {
        ...state, globalLoabal: true
      }
    default:
      return state;
  }
}
