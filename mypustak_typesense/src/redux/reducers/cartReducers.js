import {
  ADDTOCART,
  POPUPCART,
  closePOPUPCART,
  REMOVEALLCART,
  REMOVECARTLOGOUT,
  SHOWRZPAYERR,
  REMOVECART,
  ADDCARTPRICE,
  SENDADDRESSId,
  ORDERDETAILS,
  CARTSESSION,
  SAVELATER,
  TOBEADDEDTOCART,
  REMOVETOBEADDEDTOCART,
  MOBILECARTREDIRECT,
  SETORDERID,
  WALLETRAZORPAY,
  REDIRECTWALLETTOCART,
  UPDATEORDERSUCC,
  UPDATECART,
  OUTOFSTOCK,
  DEDUCTCASHBACK,
  OFFERBOOK,
  COUPON,
  REDEEMCOUPON,
  RESETCOUPON,
  ADDTOCARTATLOGIN,
  FETCHING_CART,
  FETCHING_CART_ERR_PER_PAGE,
  FETCHING_CART_PER_PAGE,
  FETCHING_CART_ERR,
  ADDRESS_SLIDER,
  UPDATE_CART_FROM_LOCALSTORAGE,
  UPDATEEXISTINGCARTPRODUCT,
  RESET_OUT_OF_STOCK_BOOKS,
  FETCHING_WISHLIST,
  FETCH_WISHLOADER,
  ADDWISHLIST,
  ADDINGCART_WISHLIST,
  MOVE_CART_LOADER,
  REMOVE_WISHLIST,
  DELETE_WISHLIST,
  FETCHWISHLIST_DATA,
  DELETE_ALL,
  CARTLEN,
  IS_OFFER_BOOK,
  UPDATE_WISHLIST_CONDITION,
  APPLY_COUPONCODE,
  CARTSESSION_PER_PAGE,
  CHECK_BOOK_INCART,
  SETBOOKFORPOPUPMSG,
  ClEARBOOKFORPOPUPMSG,
  FREEBIE_DATA,
  FREEBIE_LOADER
} from "../constants/types";
import { AddToLocalstorage } from "../../helper/helpers";
const initialState = {
  incart_check: [],
  coupon_code_amt: 0,
  MyCart: [],
  MyCart_per_page: [],
  SaveLaterData: [],
  // CartLength:
  Address_slider: false,
  PopupCart: false,
  cartLength: 0,
  CartPrice: [],
  AddresId: 0,
  OrderId: 0,
  TotalPrice: 0,
  walletRazorpayState: [],
  redirectWallettoCartState: false,
  CartSessionData: [],
  ToBeAddedToCartState: [],
  cartRedirectMobile: false,
  RzPayErr: false,
  GetLoginData: [],
  orderSuccess: false,
  OutOfStockBooks: [],
  deductCashback: 0,
  offerBook: [],
  couponR: "",
  couponResult: [],
  couponResponse: [],
  redeemcoupon: [],
  appliedcoupon: false,
  fetching_cart: false,
  fetching_cart_per_page: false,
  is_coupon_valid: 0,
  MyWishlist: [],
  fetch_wishlist: [],
  wishlist_msg: "",
  move_cart_msg: "",
  ShowLoader: false,
  move_cart_loader: false,
  delete_loader: false,
  list_wishlist: [],
  is_offerbook_applied: true,
  incart_check: [],
  open_add_to_cart_popup: false,
  book_add_to_cart_popup: false,
  freebie_data: {},
  freebie_loader:false
};

export default function cartReducers(state = initialState, action) {
  switch (action.type) {
    case ADDTOCART:
      // alert('redu')
      console.log(action.payload, "reducer");
      let book_data = action.payload;
      let current_cart = state.MyCart;

      var isKolPresent = book_data.bookInvId.toString().includes("KOL");
      if (isKolPresent) {
        console.log("reducer Notebook");
        for (let i in current_cart) {
          let bookInvId = book_data.bookInvId;
          console.log(i, "reducer book", current_cart[i]);
          if (current_cart[i].bookInvId == bookInvId) {
            // console.log(current_cart[i]);
            let new_data = { ...current_cart[i] };
            // new_data.bookQty = new_data.bookQty + book_data.bookQty
            // current_cart[i] = { ...current_cart[i], ...new_data };
            current_cart[i] = book_data;

            // current_cart[i] = new_data;
          } else {
            let bookInvId = book_data.bookInvId;
            current_cart[bookInvId] = book_data;
          }
        }
        console.log(current_cart, "current_cart reducer");
        if (current_cart.length == 0) {
          current_cart = [book_data];
        }

        return {
          ...state,

          incart_check: current_cart,
          MyCart: current_cart,
          cartLength: current_cart.length,
        };
      } else {
        console.log("reducer book");
        return {
          ...state,

          incart_check: state.incart_check.concat(action.payload),
          MyCart: state.MyCart.concat(action.payload),
          cartLength: state.cartLength + 1,
        };
      }
    case REMOVECART:
      // alert('redu')
      if (state.cartLength <= 0) {
        return {
          ...state,
          cartLength: 0,
        };
      } else {
        return {
          ...state,
          MyCart: state.MyCart.filter(
            (cart) => cart.bookInvId !== action.payload
          ),
          cartLength: state.cartLength - 1,
        };
      }

    case REMOVECARTLOGOUT:
      // alert('redu')
      // alert(state.cartLength)
      if (state.cartLength <= 0) {
        // alert("0");
        return {
          ...state,
          cartLength: 0,
        };
      } else {
        return {
          ...state,
          MyCart: state.MyCart.filter(
            (cart) => cart.bookInvId !== action.payload
          ),
          cartLength: state.cartLength - 1,
        };
      }
    case ADDCARTPRICE:
      return {
        ...state,
        CartPrice: action.payload,
        TotalPrice: action.payload.TotalPayment,
      };

    case DEDUCTCASHBACK:
      return {
        ...state,
        deductCashback: action.payload,
      };
    case POPUPCART:
      // alert(state.PopupCart)
      return {
        ...state,
        PopupCart: !state.PopupCart,
      };

    case ADDRESS_SLIDER:
      // console.log(state.Address_slider, '444');
      return {
        ...state,
        Address_slider: !state.Address_slider,
      };
    case UPDATEORDERSUCC:
      // alert('redu')
      return {
        ...state,
        orderSuccess: !state.orderSuccess,
      };

    // case SENDLOGINDATA:
    //     // alert('redu')
    //         return {
    //             ...state,
    //             PopupCart:action.payload
    //         }
    case MOBILECARTREDIRECT:
      // alert('redu')
      return {
        ...state,
        cartRedirectMobile: !state.cartRedirectMobile,
      };
    case CARTSESSION:
      localStorage.removeItem("items");
      // sessionBook;
      // console.log({ cart: action.payload }, "CARTSEE");
      let all_cart = [];
      action.payload.map((book) => {
        let MyCart;
        // console.log(book, 'Form Db');
        if (book != 0) {
          // console.log('in if l1');
          console.log(book, "reducer book in cart");
          if (book.book_inv_id.toString().indexOf("KOL") > -1) {
            MyCart = {
              Cart_id: book.cart_id,
              bookId: book.book_id,
              bookName: book.title,
              bookSlug: book.title.replace(" ", "-"),
              bookPrice: Math.round(book.price),
              bookShippingCost: Math.round(book.shipping_cost),
              bookThumb: book.thumb,
              bookQty: book.qty,
              bookInvId: book.book_inv_id,
              is_soldout: book.is_soldout,
              delivery_cost: 0,
              cashback_per: book.cashback_per,
              discount_per: book.discount_per,
              offertype: book.offertype,
              discount: book.discountedPrice,
              cashback: book.cashbackedPrice,
              vendorid: book.vendorid,
              weight: book.weight,
              seller_id: book.sellerid,
              delivery_type: book.delivery_type,
              bookRackNo: book.rack_no,
              condition_id: book.condition_id,
            };
          } else if (book.book_inv_id.toString().indexOf("NB") > -1) {
            // console.log('in if l2');
            // NEW BOOK
            MyCart = {
              Cart_id: book.cart_id,
              bookId: book.book_id,
              bookName: book.title,
              bookSlug: book.slug,
              bookPrice: Math.round(book.price),
              bookShippingCost: Math.round(book.shipping_cost * book.qty),
              bookThumb: book.thumb,
              bookQty: book.qty,
              bookInvId: book.book_inv_id,
              is_soldout: book.is_soldout,
              delivery_cost: book.delivery_cost,
              cashback_per: book.cashback_per,
              discount_per: book.discount_per,
              offertype: book.offertype,
              discount: book.discountedPrice,
              cashback: book.cashbackedPrice,
              vendorid: book.vendorid,
              weight: book.weight,
              seller_id: book.sellerid,
              delivery_type: book.delivery_type,
              bookRackNo: book.rack_no,
              condition_id: book.condition_id,

            };
          } else {
            // OLD BOOK
            MyCart = {
              Cart_id: book.cart_id,
              bookId: book.book_id,
              bookName: book.title,
              bookSlug: book.slug,
              bookPrice: Math.round(book.price),
              bookShippingCost: Math.round(book.shipping_cost),
              bookThumb: book.book_thumb
                ? book.book_thumb != "null"
                  ? book.book_thumb
                  : book.thumb
                : book.thumb,
              bookQty: 1,
              bookCond: book.condition,
              bookRackNo: book.rack_no,
              bookInvId: book.book_inv_id,
              is_soldout: book.is_soldout,
              delivery_cost: 0,
              cashback_per: 0,
              discount_per: 0,
              offertype: null,
              discount: 0,
              cashback: 0,
              vendorid: book.vendorid,
              weight: book.weight,
              condition_id: book.condition_id,
            };
          }
          // console.log(MyCart, "MYCART_REDUC");

          try {
            // console.log(book,"Form Db To Local")
            // sessionStorage.setItem(book.book_inv_id, JSON.stringify(MyCart));

            AddToLocalstorage(MyCart);
            all_cart.push(MyCart);
          } catch (error) {
            console.log({ error }, "cartsession");
          }
        }
      });

      //     try {
      //       // console.log(book,"Form Db To Local")
      //       // sessionStorage.setItem(book.book_inv_id, JSON.stringify(MyCart));
      //       AddToLocalstorage(MyCart);
      //       all_cart.push(MyCart);
      //     } catch (error) {
      //       console.log({ error }, "cartsession");
      //     }
      //   }
      // });

      // console.log({ all_cart });

      return {
        ...state,
        CartSessionData: action.payload,
        fetching_cart: false,
        MyCart: all_cart,
        cartLength: all_cart.length,
      };

    case CARTSESSION_PER_PAGE:
      localStorage.removeItem("items");
      // alert('CARTSESSION_PER_PAGE')
      // sessionBook;
      console.log({ cart: action.payload }, "CARTSESSION_PER_PAGE");
      let all_cart_per_page = [];
      action.payload.map((book) => {
        let MyCart;
        // console.log(book, 'Form Db');
        if (book != 0) {
          // console.log('in if l1');

          if (book.book_inv_id.toString().indexOf("NB") > -1) {
            // console.log('in if l2');
            // NEW BOOK
            MyCart = {
              Cart_id: book.cart_id,
              bookId: book.book_id,
              bookName: book.title,
              bookSlug: book.slug,
              bookPrice: Math.round(book.price),
              bookShippingCost: Math.round(book.shipping_cost * book.qty),
              bookThumb: book.thumb,
              bookQty: book.qty,
              bookInvId: book.book_inv_id,
              is_soldout: book.is_soldout,
              delivery_cost: book.delivery_cost,
              cashback_per: book.cashback_per,
              discount_per: book.discount_per,
              offertype: book.offertype,
              discount: book.discountedPrice,
              cashback: book.cashbackedPrice,
              vendorid: book.vendorid,
              weight: book.weight,
              seller_id: book.sellerid,
              delivery_type: book.delivery_type,
              bookRackNo: book.rack_no,
            };
          } else {
            // OLD BOOK
            MyCart = {
              Cart_id: book.cart_id,
              bookId: book.book_id,
              bookName: book.title,
              bookSlug: book.slug,
              bookPrice: Math.round(book.price),
              bookShippingCost: Math.round(book.shipping_cost),
              bookThumb: book.book_thumb
                ? book.book_thumb != "null"
                  ? book.book_thumb
                  : book.thumb
                : book.thumb,
              bookQty: 1,
              bookCond: book.condition,
              bookRackNo: book.rack_no,
              bookInvId: book.book_inv_id,
              is_soldout: book.is_soldout,
              delivery_cost: 0,
              cashback_per: 0,
              discount_per: 0,
              offertype: null,
              discount: 0,
              cashback: 0,
              vendorid: book.vendorid,
              weight: book.weight,
            };
          }
          // console.log(MyCart, "MYCART_REDUC");

          try {
            // console.log(book,"Form Db To Local")
            // sessionStorage.setItem(book.book_inv_id, JSON.stringify(MyCart));

            AddToLocalstorage(MyCart);
            all_cart_per_page.push(MyCart);
          } catch (error) {
            console.log({ error }, "cartsession");
          }
        }
      });

      //     try {
      //       // console.log(book,"Form Db To Local")
      //       // sessionStorage.setItem(book.book_inv_id, JSON.stringify(MyCart));
      //       AddToLocalstorage(MyCart);
      //       all_cart_per_page.push(MyCart);
      //     } catch (error) {
      //       console.log({ error }, "cartsession");
      //     }
      //   }
      // });

      // console.log({ all_cart_per_page });

      return {
        ...state,
        CartSessionData: action.payload,
        fetching_cart: false,
        MyCart_per_page: all_cart_per_page,
        cartLength: all_cart.length,
      };

    case SAVELATER:
      localStorage.removeItem("items");
      // sessionBook;
      console.log({ cart: action.payload }, "CARTSEE");
      let all_cartt = [];
      action.payload.map((book) => {
        let MyCart;
        // console.log(book, 'Form Db');
        if (book != 0) {
          // console.log('in if l1');

          if (book.book_inv_id.toString().indexOf("NB") > -1) {
            // console.log('in if l2');
            // NEW BOOK
            MyCart = {
              Cart_id: book.cart_id,
              bookId: book.book_id,
              bookName: book.title,
              bookSlug: book.slug,
              bookPrice: Math.round(book.price),
              bookShippingCost: Math.round(book.shipping_cost * book.qty),
              bookThumb: book.thumb,
              bookQty: book.qty,
              bookInvId: book.book_inv_id,
              is_soldout: book.is_soldout,
              delivery_cost: book.delivery_cost,
              cashback_per: book.cashback_per,
              discount_per: book.discount_per,
              offertype: book.offertype,
              discount: book.discountedPrice,
              cashback: book.cashbackedPrices,
              vendorid: book.vendorid,
              weight: book.weight,
              seller_id: book.sellerid,
              delivery_type: book.delivery_type,
            };
          } else {
            // OLD BOOK
            MyCart = {
              Cart_id: book.cart_id,
              bookId: book.book_id,
              bookName: book.title,
              bookSlug: book.slug,
              bookPrice: Math.round(book.price),
              bookShippingCost: Math.round(book.shipping_cost),
              bookThumb: book.book_thumb
                ? book.book_thumb != "null"
                  ? book.book_thumb
                  : book.thumb
                : book.thumb,
              bookQty: 1,
              bookCond: book.condition,
              bookRackNo: book.rack_no,
              bookInvId: book.book_inv_id,
              is_soldout: book.is_soldout,
              delivery_cost: 0,
              cashback_per: 0,
              discount_per: 0,
              offertype: null,
              discount: 0,
              cashback: 0,
              vendorid: book.vendorid,
              weight: book.weight,
            };
          }
          // console.log(MyCart, "MYCART_REDUCSAVELETE");

          try {
            // console.log(book,"Form Db To Local")
            // sessionStorage.setItem(book.book_inv_id, JSON.stringify(MyCart));

            AddToLocalstorage(MyCart);
            all_cartt.push(MyCart);
          } catch (error) {
            console.log({ error }, "cartsession");
          }
        }
      });

      //     try {
      //       // console.log(book,"Form Db To Local")
      //       // sessionStorage.setItem(book.book_inv_id, JSON.stringify(MyCart));
      //       AddToLocalstorage(MyCart);
      //       all_cartt.push(MyCart);
      //     } catch (error) {
      //       console.log({ error }, "cartsession");
      //     }
      //   }
      // });

      // console.log({ all_cartt });

      return {
        ...state,
        // SaveLaterData: action.payload,
        // fetching_cart: false,
        SaveLaterData: all_cartt,
        // cartLength: all_cart.length,
      };
    case SHOWRZPAYERR:
      return {
        ...state,
        RzPayErr: !state.RzPayErr,
      };
    case TOBEADDEDTOCART:
      return {
        ...state,
        ToBeAddedToCartState: state.ToBeAddedToCartState.concat(action.payload),
      };
    case REMOVETOBEADDEDTOCART:
      return {
        ...state,
        ToBeAddedToCartState: [],
      };
    case REMOVEALLCART:
      // alert('redu')
      return {
        ...state,
        MyCart: [],
        cartLength: 0,
        CartSessionData: [],
      };
    case SENDADDRESSId:
      // alert('redu')
      return {
        ...state,
        AddresId: action.payload,
      };
    case ORDERDETAILS:
      // alert("redu");
      return {
        ...state,
        OrderId: action.payload.order_id,
      };
    case SETORDERID:
      // alert('redu')
      return {
        ...state,
        OrderId: 0,
      };
    case closePOPUPCART:
      // alert('redu')
      return {
        ...state,
        PopupCart: action.payload,
      };
    case WALLETRAZORPAY:
      // alert('redu')
      return {
        ...state,
        walletRazorpayState: action.payload,
      };
    case REDIRECTWALLETTOCART:
      // alert('redu')
      return {
        ...state,
        redirectWallettoCartState: !state.redirectWallettoCartState,
      };
    case OUTOFSTOCK:
      // alert('redu')
      return {
        ...state,
        OutOfStockBooks: action.payload.bookOutOstack,
      };

    case OFFERBOOK:
      return {
        ...state,
        offerBook: action.payload,
      };

    case COUPON:
      // console.log(action.payload.data, 'chh');
      // console.log(action.payload.result.result, 'chh');
      // console.log(action.payload.data.response, 'chh response');

      if (action.payload.data.data == 1) {
        return {
          ...state,
          couponR: "  ",
          couponResult: action.payload.result.result,
          couponResponse: action.payload.data.response,
          is_coupon_valid: 1,
        };
      } else {
        return {
          ...state,
          couponR: "INVALID",
          couponResponse: action.payload.data.response,
          couponResult: [],
          is_coupon_valid: 0,
        };
      }
    case REDEEMCOUPON:
      // console.log(action.payload, 'reddem');
      return {
        ...state,
        redeemcoupon: action.payload,
        appliedcoupon: true,
      };

    case RESETCOUPON:
      return {
        ...state,
        redeemcoupon: [],
        appliedcoupon: false,
        couponR: "",
        is_coupon_valid: 0,
      };

    case FETCHING_CART:
      return {
        ...state,
        fetching_cart: true,
      };
    case FETCHING_CART_ERR:
      return {
        ...state,
        fetching_cart: false,
      };

    case FETCHING_CART_PER_PAGE:
      return {
        ...state,
        fetching_cart_per_page: true,
      };
    case FETCHING_CART_ERR_PER_PAGE:
      return {
        ...state,
        fetching_cart_per_page: false,
      };

    case UPDATE_CART_FROM_LOCALSTORAGE:
      //   let all_cart_from_local = []
      // for (var i = 0; i <= sessionStorage.length - 1; i++) {
      // 	let key = sessionStorage.key(i);
      // 	try {
      // 		if (sessionStorage.key(i) !== 'UserOrderId' && sessionStorage.key(i) !== 'TawkWindowName') {
      // let book = JSON.parse(sessionStorage.getItem(key));
      // all_cart_from_local.push(book)
      // 			// sessionStorage.removeItem(val.bookInvId);
      // 		}
      // 	} catch (error) {
      // 		console.log(error, 'CARTSESSION no '); 558733
      // 	}
      // }
      // let lcart_data = readCartLocalStorage()
      // console.log({ lcart_data });
      // if (lcart_data != {}) {
      // 	all_cart_from_local = lcart_data
      // }

      return {
        ...state,
        fetching_cart: false,
        incart_check: action.payload.MyCart,
        MyCart: action.payload.MyCart,
        cartLength: action.payload.cartLength,
      };

    case UPDATEEXISTINGCARTPRODUCT:
      const productToUpdate = action.payload;
      let currentCartProducts = state.MyCart;
      let newCartProducts = [];
      for (let i in currentCartProducts) {
        if (currentCartProducts[i].bookInvId == productToUpdate.bookInvId) {
          newCartProducts.push(productToUpdate);
        } else {
          newCartProducts.push(currentCartProducts[i]);
        }
      }
      // alert('o')
      return {
        ...state,
        MyCart: newCartProducts,
      };
    case RESET_OUT_OF_STOCK_BOOKS:
      return {
        ...state,
        OutOfStockBooks: [],
      };
    case ADDWISHLIST:
      // alert("5")
      // console.log(action.payload.data.message,"5666666",action.payload.book_id)

      return {
        ...state,
        wishlist_msg: action.payload.data.message,
      };
    case FETCH_WISHLOADER:
      return {
        ...state,
        ShowLoader: true,
      };
    case FETCHING_WISHLIST:
      // alert( action.payload.page)
      if (action.payload.page == 1) {
        return {
          ...state,
          MyWishlist: action.payload.data.books,
          ShowLoader: false,
        };
      } else {
        if (action.payload.data) {
          return {
            ...state,
            // MyWishlist:state.MyWishlist.concat(action.payload.data)
            MyWishlist: [...state.MyWishlist, ...action.payload.data.books],
            ShowLoader: false,
          };
        }
      }
    case MOVE_CART_LOADER:
      return {
        ...state,
        move_cart_loader: true,
      };
    case ADDINGCART_WISHLIST:
      let new_wishlist = state.MyWishlist;
      let new_list_wishlist = state.list_wishlist;
      // console.log(action.payload.data,"5555")
      let return_wishlist = new_wishlist.filter(
        (data) => data.wishlist_id !== action.payload.id
      );
      let return_list_wishlist = new_list_wishlist.filter(
        (data) => data.wishlist_id !== action.payload.id
      );
      // alert("hh")
      // console.log(return_wishlist,"8889898",new_wishlist)
      return {
        ...state,
        MyWishlist: return_wishlist,
        move_cart_msg: action.payload.data.message,
        list_wishlist: return_list_wishlist,
        move_cart_loader: false,
      };

    case REMOVE_WISHLIST:
      return {
        ...state,
        delete_loader: true,
      };
    case DELETE_WISHLIST:
      // alert("hi")
      // console.log(action.payload.id,"88787")
      let wishlist_new = state.MyWishlist;
      let list_wishlist_new = state.list_wishlist;
      let update_wishlist = wishlist_new.filter(
        (data) => data.wishlist_id !== action.payload.id
      );
      let update_list_wishlist = list_wishlist_new.filter(
        (data) => data.wishlist_id !== action.payload.id
      );
      return {
        ...state,
        MyWishlist: update_wishlist,
        list_wishlist: update_list_wishlist,
        delete_loader: false,
      };
    case FETCHWISHLIST_DATA:
      // alert("kk")
      // console.log(action.payload.data,"data8888 ")
      return {
        ...state,
        list_wishlist: action.payload.data,
      };
    case DELETE_ALL:
      // alert("hi")
      console.log(action.payload.id, "7878");
      let wishlist = state.MyWishlist;
      let id_array = action.payload.id;
      let new_list = id_array.map((data_id) => {
        let id = data_id;
        wishlist = wishlist.filter((data) => data.wishlist_id !== id);
      });
      console.log(state.MyWishlist, "45", wishlist);
      return {
        ...state,
        MyWishlist: wishlist,
        move_cart_msg: `Removed All Out Of Stock Books`,
      };

    case CARTLEN:
      return {
        ...state,
        cartLength: action.payload,
      };

    case IS_OFFER_BOOK:
      return {
        ...state,
        is_offerbook_applied: action.payload,
      };

    case UPDATE_WISHLIST_CONDITION:
      // alert("UPDATE_WISHLIST_CONDITION");
      return {
        ...state,
        MyWishlist: action.payload,
      };
    case APPLY_COUPONCODE:
      return {
        ...state,
        coupon_code_amt: action.payload,
      };
    case CHECK_BOOK_INCART:
      return {
        ...state,
        incart_check: action.payload.cartData,
      };
    case SETBOOKFORPOPUPMSG:
      return {
        ...state,
        book_add_to_cart_popup: action.payload,
        open_add_to_cart_popup: true,
      };
    case ClEARBOOKFORPOPUPMSG:
      return {
        ...state,
        book_add_to_cart_popup: {},
        open_add_to_cart_popup: false,
      };

    case FREEBIE_DATA:
      return {
        ...state,
        freebie_data: action.payload,
      };
          case FREEBIE_LOADER:
      return{
        ...state,
        freebie_loader:action.payload
      }
    default:
      return state;
  }
}
