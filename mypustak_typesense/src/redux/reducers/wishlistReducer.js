import { USERWISHLIST, SETRELOADWISHLIST, WISHLISTCOUNT } from "../constants/types";
const initialState = {
  userwishlistBook: [],
  userwishlistInv: [],
  ReloadWishlist: false,
  Total_wish_count: "",
  inStock_Wish_count: "",
  outStock_wish_count: "",

};

export default function getWishlistData (state = initialState, action) {
  switch (action.type) {
    case USERWISHLIST:
      return {
        ...state,
        userwishlistBook: action.payload.book,
        userwishlistInv: action.payload.book_inventory,
      };
    case SETRELOADWISHLIST:
      return {
        ...state,
        ReloadWishlist: !state.ReloadWishlist,
      };

    case WISHLISTCOUNT:
      return {
        ...state,
        Total_wish_count: action.payload.Total_count,
        inStock_Wish_count: action.payload.inStock_count,
        outStock_wish_count: action.payload.out_of_stock_count
      };

    default:
      return state;
  }
}
