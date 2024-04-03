import {
  GET_COMPEXAM,
  GET_FRICTION,
  GET_BOOK,
  GET_BOOK_ERR,
  GETFIRSTSUBCATEGORY,
  UNMOUNTPRODUCT,
} from "../constants/types";

const initialState = {
  compExamBooks: [],
  // FrictionBooks:[],
  book: [],
  bookCondition: [],
  new_book_data: {},
  WrongSlug: false,
};
export default function getCompExamData (state = initialState, action) {
  switch (action.type) {
    case GET_COMPEXAM:
      // alert('redu')
      return {
        ...state,
        compExamBooks: state.compExamBooks.concat(action.payload),
      };

    case GETFIRSTSUBCATEGORY:
      // alert("subcate")
      return {
        ...state,
        compExamBooks: action.payload,
      };
    case GET_FRICTION:
      // alert('redu')
      return {
        ...state,
        FrictionBooks: action.payload,
      };
    case GET_BOOK:
      // alert('Get')
      console.log(action.payload, "details#####");

      return {
        ...state,
        book: action.payload.books_details,
        bookCondition: action.payload.old_book,
        new_book_data: action.payload.new_books_details,
        WrongSlug: false,
        // ...state,
        // book:action.payload.product_details,
        // bookCondition:action.payload.product_condition,
        // WrongSlug:false,
      };
    case GET_BOOK_ERR:
      return {
        ...state,
        WrongSlug: true,
      };

    case UNMOUNTPRODUCT:
      return {
        ...state,
        book: [],
      };
    default:
      return state;
  }
}
