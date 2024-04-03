// import { LOGIN,SIGNUP,SIGNEDUP ,LOGINFAILS,LOGOUT,SHOWLOADER,GETADDRESS,ADD_ADDRESS } from '../types';
import { FAQ, FAQ_FETCH_ALL_CATEGORY_DATA } from '../constants/types';
const initialState = {
    gfaq: [],
    faqCategory: [],
    emptystate: "emptyState"
};
export default  function getFaq (state = initialState, action) {
    switch (action.type) {
        case FAQ:
            // alert('redu')
            return {
                ...state,
                gfaq: action.payload.output,

            }

        case FAQ_FETCH_ALL_CATEGORY_DATA:
            // alert("reduc")
            console.log(action.payload, "reduc................")
            return { ...state, facCategory: action.payload }

        default:
            return state;
    }
}
