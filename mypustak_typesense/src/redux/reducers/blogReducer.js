// import { USERWISHLIST, SETRELOADWISHLIST, WISHLISTCOUNT } from "../constants/types";
import { GETACTIVEBLOG, GETACTIVECATEGORY, GETACTIVETAGS, GETCATEGORYDATA, GETBLOGDETAILS, GET_TAG_BY_SLUG, 
    GET_POST_BY_USER,USER_POST_BY_SLUG ,GET_CATEGORIES,GET_BLOG_BY_ID,GET_USER_DETAILS} from "../constants/types";

const initialState = {
    getActiveBlogs: null,
    activeBlogCount: 0,
    getActiveCategorys: null,
    activeCategoryCount: 0,
    getActiveTags: null,
    activeTagCount: 0,
    categoryData: null,
    blogDetalis: null,
    tag_by_name: null,
    getPostByUser:null,
    userPostBySlug:null,
    categoriesData:null,
    getBlogById:null,
    userDetails:null,
}

export default function getActiveBlogData(state = initialState, action) {
    switch (action.type) {
        case GETACTIVEBLOG:
            console.log(action.payload, '02232');
            return {
                ...state,
                getActiveBlogs: action.payload.data,
                activeBlogCount: action.payload.total_data_count,
            };
        case GETACTIVECATEGORY:
            // console.log(action.payload,'02232');
            return {
                ...state,
                getActiveCategorys: action.payload,
                activeCategoryCount: action.payload.total_data_count,
            };
        case GETACTIVETAGS:
            // console.log(action.payload, '02232');
            return {
                ...state,
                getActiveTags: action.payload.data,
                activeTagCount: action.payload.total_data_count,
            };
        case GETCATEGORYDATA:
            // console.log(action.payload, '02232');
            return {
                ...state,
                categoryData: action.payload,
            };
        case GETBLOGDETAILS:
            // console.log(action.payload, '02232reducer');
            return {
                ...state,
                blogDetalis: action.payload,
            };

        case GET_TAG_BY_SLUG:
            // console.log(action.payload, '02232reducer');
            return {
                ...state,
                tag_by_name: action.payload,
            };
        case GET_POST_BY_USER:
            // console.log(action.payload, '02232reducer');
            return {
                ...state,
                getPostByUser: action.payload,
            };
             case USER_POST_BY_SLUG:
            // console.log(action.payload, '02232reducer');
            return {
                ...state,
                userPostBySlug: action.payload,
            };
            case GET_CATEGORIES:
            // console.log(action.payload, '02232reducer');
            return {
                ...state,
                categoriesData: action.payload,
            };
            case GET_BLOG_BY_ID:
            // console.log(action.payload, '02232reducer');
            return {
                ...state,
                getBlogById: action.payload,
            };
            case GET_USER_DETAILS:
            console.log(action.payload, '02232reducer');
            return {
                ...state,
                userDetails: action.payload,
            };
        default:
            return state;
    }
}























// export default function getWishlistData(state = initialState, action) {
//     switch (action.type) {
//         case USERWISHLIST:
//             return {
//                 ...state,
//                 userwishlistBook: action.payload.book,
//                 userwishlistInv: action.payload.book_inventory,
//             };
//         case SETRELOADWISHLIST:
//             return {
//                 ...state,
//                 ReloadWishlist: !state.ReloadWishlist,
//             };

//         case WISHLISTCOUNT:
//             return {
//                 ...state,
//                 Total_wish_count: action.payload.Total_count,
//                 inStock_Wish_count: action.payload.inStock_count,
//                 outStock_wish_count: action.payload.out_of_stock_count
//             };

//         default:
//             return state;
//     }
// }
