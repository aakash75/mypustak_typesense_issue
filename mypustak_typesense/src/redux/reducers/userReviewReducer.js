// import { LOGIN,SIGNUP,SIGNEDUP ,LOGINFAILS,LOGOUT,SHOWLOADER,GETADDRESS,ADD_ADDRESS } from '../types';
import { GETREVIEW,GETREVIEWBYPRODUCT,ADDREVIEW } from "../constants/types";

const initialState = {
  userreviewData:[],
  userreviewDatabyProduct:[],
};

export default function userReview (state = initialState, action) {
  switch (action.type) {
    case GETREVIEW:
      return {
        ...state,
        userreviewData: action.payload.data
      };
      case GETREVIEWBYPRODUCT:
        return {
          ...state,
          userreviewDatabyProduct: action.payload.data
        };

    default:
      return state;
  }
}
