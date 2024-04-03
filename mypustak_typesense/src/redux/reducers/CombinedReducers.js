import { combineReducers } from "redux";
import loginReducer from "./loginReducers";
import compExamReducers from "./compExamReducers";
import wishlistReducer from "./wishlistReducer";
import CartReducers from "./cartReducers";
import accountReducer from "./accountReducer";
import donationBReducer from "./backendDonationReducer";
import seodataReducer from "./seodataReducer";
import productsuggestionreducer from "./productsuggestionreducer";
import ProuddonarReducer from "./ProuddonarReducer";
import maincategoryReducer from "./maincategoryReducer";
import homeReducers from "./homeReducers";
import transactionReducer from "./transactionReducer";
import FaqReducer from "./faqReducer";
import donationReducer from "./donationReducer";
import walletReducer from "./walletReducer";
import passbookReducer from "./passbookReducer";
import LoginReducer from "./LoginReducer";
import orderReducer from "./orderReducer";
import backendOrderReducer from "./backendOrderReducer";
import OnlinecourseReducer from "./OnlinecourseReducer";
import coursesReducer from "./coursesReducer";
import offerpageReducer from "./offerpageReducer";
import categoryReducer from "./categoryReducer"
import userReviewReducer from "./userReviewReducer";
import productReducer from "./productReducers";
import unboxReducer from "./unboxReducer";
import blogReducer from "./blogReducer"
export default combineReducers({
  loginReducer: loginReducer,
  productsuggestionreducer: productsuggestionreducer,
  ProuddonarR: ProuddonarReducer,
  compExam: compExamReducers,
  transactionReducer: transactionReducer,
  wishlistR: wishlistReducer,
  cartReduc: CartReducers,
  accountR: accountReducer,
  userdetailsR: accountReducer,
  seodata: seodataReducer,
  maincategoryReducer: maincategoryReducer,
  homeR: homeReducers,
  faqR: FaqReducer,
  walletR: walletReducer,
  PassbookR: passbookReducer,
  donationR: donationReducer,
  walletR: walletReducer,
  LoginReducer: LoginReducer,
  orderBR: backendOrderReducer,
  orderdetailsR: orderReducer,
  OnlinecourseReducer: OnlinecourseReducer,
  coursesReducer: coursesReducer,
  offerpageReducer: offerpageReducer,
  donationBR: donationBReducer,
  categoryReducer: categoryReducer,
  userReviewReducer:userReviewReducer,
  productReducer:productReducer,
  unboxReducer:unboxReducer,
  blogState: blogReducer,
});
