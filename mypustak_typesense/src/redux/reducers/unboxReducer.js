/* eslint-disable import/no-anonymous-default-export */
import { UNBOX_AUTHOR, UNBOX_AUTOCOMPLETE, UNBOX_PUBLICATION, UNBOX_SEARCH, CLEAR_AUTOSUGGEST, UNBOX_FILTER_APPLIED, TOOGLE_GLOBAL_SEARCHLOADER, UNBOX_RECOMMENDATIONS } from "../constants/types";

const initialState = {
  Unbxd_AutoSuggest: [],
  Unbxd_AutoSuggest_author: [],
  Unbxd_AutoSuggest_pub: [],
  Unbxd_data: [],
  Unbxd_products: [],
  unbxd_query_pass: '',
  is_unbxd_filter: false,
  price_range: {},
  unbxd_recommendations: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UNBOX_SEARCH:

      // console.log(action.payload,"reducer_data 19" , action.payload.response.stats);
      let page;
      try {
        page = parseInt(action?.payload?.response?.searchMetaData?.queryParams?.page) || 1;
      } catch (error) {
        console.error("An error occurred:", error);
        page = 1; // Default to 1 in case of an error
      }
      if (page == 1) {
        if ('stats' in action.payload.response) {

          return {
            ...state,
            Unbxd_data: action.payload.response,
            Unbxd_products: action.payload.response.response.products,
            price_range: action.payload.response.stats.price
          }

        }
        else {

          return {
            ...state,
            Unbxd_data: action?.payload?.response,
            Unbxd_products: action.payload.response?.response?.products,
          }
        }
      }
      else {
        return {
          ...state,
          Unbxd_data: action.payload.response,
          Unbxd_products: [...state.Unbxd_products, ...action.payload.response.response.products],

        };
      }
    case UNBOX_AUTOCOMPLETE:
      // alert("UNBOX_AUTOCOMPLETE")
      console.log(action.payload.response.searchMetaData.queryParams.q, "reducer 36")
      return {
        ...state,
        Unbxd_AutoSuggest: action.payload.response.response,
        unbxd_query_pass: action.payload.response.searchMetaData.queryParams.q
      };
    case UNBOX_AUTHOR:
      return {
        ...state,
        Unbxd_AutoSuggest_author: action.payload.response.response,
        unbxd_query_pass: action.payload.response.searchMetaData.queryParams.q
      };
    case UNBOX_PUBLICATION:
      console.log(action.payload.response, "props.Unbxd Action")
      return {
        ...state,
        Unbxd_AutoSuggest_pub: action.payload.response.response,
        unbxd_query_pass: action.payload.response.searchMetaData.queryParams.q
      };


    case CLEAR_AUTOSUGGEST:
      // console.log(action.payload.response,"props.Unbxd Action")
      return {
        ...state,
        Unbxd_AutoSuggest: [],
        Unbxd_AutoSuggest_author: [],
        Unbxd_AutoSuggest_pub: [],
        Unbxd_data: [],
        Unbxd_products: [],
        unbxd_query_pass: '',
        search_global_loader: true,

      };

    case UNBOX_FILTER_APPLIED:
      // console.log(action.payload.response,"props.Unbxd Action")
      return {
        ...state,
        is_unbxd_filter: action.payload
      };

    case TOOGLE_GLOBAL_SEARCHLOADER:
      return {
        ...state,
        search_global_loader: action.payload
      }
    case UNBOX_RECOMMENDATIONS:
      return {
        ...state,
        unbxd_recommendations: action.payload
      }
    default:
      return state;
  }
}
