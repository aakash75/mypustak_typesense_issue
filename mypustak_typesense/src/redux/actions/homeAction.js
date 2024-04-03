import {
  SEARCH,
  GETSEARCH,
  FETCHSEARCH,
  MAKESEARCHBLANK,
  SEARCH_ERROR,
  SETCATEGORY,
  LOADER_SEARCH,
  GETSEARCHFILTERDATA,
  SAVETHEFILTERCLICKEDCATEGORY,
  FILTER_LOADER_SEARCH,
  LOADING_SEARCH_SUGGESTION,
  SEARCH_SUGGESTION_FETCHED,
  ERROR_SEARCH_SUGGESTION,
  NO_SEARCH_SUGGESTION,
  TOOGLE_GLOBAL_LOADER,
  TOOGLE_GLOBAL_MESSAGE,
  CLEAR_SEARCH_SUGGESTION,
  SHOW_AUTOSUGGEST_DIALOG
} from "../constants/types";
import axios from "axios";
// import config from "react-global-configuration";
import { AuthInstance, url } from "../../helper/api_url";



export const doSearch =
  (searchValue, body, getSuggestion = true) =>
    dispatch => {
      // alert(`in homeAc ${getSuggestion}`);

      dispatch({
        type: SEARCH,
        payload: searchValue,
      });
      if (getSuggestion && body != {}) {
        dispatch(fetchSearchSuggData({ searchtyped: searchValue.trim(), body }));
      }
    };

export const EnterSearchValue = searchValue => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: SEARCH,
      payload: searchValue,
    });
    resolve(true);
  });
};

export const makeSearchBlank = () => dispatch => {
  // alert("in homeAc");

  return new Promise((resolve, reject) => {
    dispatch({
      type: MAKESEARCHBLANK,
    });
    resolve(true);
  });
};

export const GetSearchResult = (searchValue, start, body) => dispatch => {
  // console.log(searchValue, 'GetSearchResult');

  // console.log(start, 'search page');
  console.log(body, "123456");
  body["query_by"] = "details";
  // let body = {
  // 	query_by: 'details',
  // 	stock_filter_by: [ 'N', 'Y' ],
  // 	bookType_filter_by: [ 0, 2 ],
  // 	sort_by: 'num_is_out_of_stack:asc,book_type:asc'
  // };
  if (start == 1) {
    dispatch({
      type: LOADER_SEARCH,
    });
  }
  // alert("in homeAc");
  return new Promise((resolve, reject) => {
    axios
      .post(
        `https://data.mypustak.com/search/get/SearchBooksCollection/${searchValue}/${start}/1`,
        body
      )
      // .post(
      //   // `https://api.mypustak.in/search/get/SearchBooksCollection/${searchValue}/${start}/1`,
      //   body
      // )

      .then(res => {
        // console.log({ res }, 'GetSearchResult');
        if (start == 1) {
          dispatch({
            type: GETSEARCH,
            payload: {
              searchResultData: res.data.data.hits,
              page: start,
              facet_counts: res.data.data.facet_counts,
              searchValue,
            },
          });
        } else {
          // dispatch({
          //     type:FETCHSEARCH,
          //     payload:{searchResultData:res.data.data.hits,page:start}
          //     // payload:res.data.data.hits
          // })
        }
        resolve(res.data);
      })
      .catch(err => {
        console.log({ err }, err, "GetSearchResult");

        dispatch({
          type: SEARCH_ERROR,
          payload: {},
        });
        resolve(true);
      });
  });
};

export const fetchBooksAcc =
  ({
    lang,
    binding,
    book_type,
    book_cond,
    subject,
    classes,
    category,
    code,
    pg,
    Loadmore,
    time,
    author,
    publication,
    q,
    show_book_Stock,
  }) =>
    dispatch => {
      if (pg == 1) {
        dispatch({
          type: LOADER_SEARCH,
        });
      }
      let body = {
        query_by: "details",
        lang_filter_by: lang,
        bind_filter_by: binding,
        bookType_filter_by: book_type,
        subject_filter_by: subject,
        classes_filter_by: classes,
        Latest_filter_by: time,
        cond_filter_by: book_cond,
        author_filter_by: author,
        publication_filter_by: publication,
        stock_filter_by: show_book_Stock,
        // sort_by: 'num_is_out_of_stack:asc,book_id:desc,'
        sort_by: "num_is_out_of_stack:asc,book_type:asc",
      };
      // console.log(pg, 'search page', { body }, 'onClick');

      axios
        .post(
          `https://data.mypustak.com/search/get/SearchBooksCollection/${q}/${pg}/1`,
          // `https://api.mypustak.in/search/get/SearchBooksCollection/${q}/${pg}/1`,

          body
        )
        .then(res => {
          // console.log({ res }, 'GetSearchResult');

          dispatch({
            type: FETCHSEARCH,
            payload: { searchResultData: res.data.data.hits, page: pg },
          });
        })
        .catch(err => {
          console.log({ err }, "GetSearchResult");
          dispatch({
            type: SEARCH_ERROR,
            payload: {},
          });
        });
    };

export const setCategory = category => {
  // alert("category")
  return {
    type: SETCATEGORY,
    payload: category,
  };
};

export const SearchFilterClicked =
  ({ body, page }) =>
    dispatch => {
      // alert('o')
      // if (!body.Loadmore) {
      dispatch({
        type: FILTER_LOADER_SEARCH,
        payload: {
          LoadingMore: body.Loadmore,
          FilterLoder: body.filterClicked,
          page,
        },
      });
      // }

      let q = body.searchValue;
      body.query_by = "details";
      // body.sort_by = 'num_is_out_of_stack:asc,book_type:asc';
      // console.log({ body, page }, 'NaN', 'onClick---', q, decodeURI(q));

      axios
        .post(
          `https://data.mypustak.com/search/get/SearchBooksCollection/${q}/${page}/1`,
          // `https://api.mypustak.in/search/get/SearchBooksCollection/${q}/${pg}/1`,

          body
        )
        .then(res => {
          // console.log({ res }, '------------------- onClick-----------------', page, res.data.data);

          if (page == 1) {
            dispatch({
              type: GETSEARCHFILTERDATA,
              payload: {
                filterData: res.data.data.hits,
                pg: page,
                facet_counts: res.data.data.facet_counts,
              },
            });
          } else {
            dispatch({
              type: FETCHSEARCH,
              payload: { searchResultData: res.data.data.hits, page },
            });
          }
          // dispatch({
          //     type: SAVETHEFILTERCLICKEDCATEGORY,
          //     payload: {category,code,pg},
          //     })
        })
        .catch(err => {
          console.log({ err });
          dispatch({
            type: SEARCH_ERROR,
            payload: {},
          });
        });
    };
//
export const Set_Search_Error = () => dispatch => {
  dispatch({
    type: SEARCH_ERROR,
    payload: {},
  });
};

export const fetchSearchSuggData =
  ({ searchtyped, body }) =>
    dispatch => {
      // console.log(start, 'search page');
      if (!searchtyped) {
        dispatch({
          type: NO_SEARCH_SUGGESTION,
        });

        return;
      }

      dispatch({
        type: LOADING_SEARCH_SUGGESTION,
      });
      const start = 1;
      // alert("in homeAc");
      // return new Promise((resolve, reject) => {
      axios
        .post(
          `https://data.mypustak.com/search/get/SearchBooksCollection/${searchtyped}/${start}/0`,
          // `https://api.mypustak.in/search/get/SearchBooksCollection/${searchtyped}/${start}/0`,

          body
        )
        .then(res => {
          // console.log({ res }, 'GetSearchResult');

          const searchResultData = res.data.data.hits;
          if (searchResultData) {
            const searchTitleSuggestion = [];
            let count = 0;
            for (let searchObj in searchResultData) {
              if (count > 8) {
                break;
              }
              let title = searchResultData[searchObj].document.title;
              if (title.length > 70) {
                title = title.substr(0, 70) + "...";
              } else {
                title = title;
              }
              // console.log(title,"852258")
              searchTitleSuggestion.push({ key: searchObj, value: title });
              count++;
            }
            dispatch({
              type: SEARCH_SUGGESTION_FETCHED,
              payload: {
                searchTitleSuggestion: searchTitleSuggestion,
                page: start,
                facet_counts: res.data.data.facet_counts,
                found: res.data.data.found,
              },
            });
          } else {
            dispatch({ type: NO_SEARCH_SUGGESTION });
          }
          // resolve(res.data);
        })
        .catch(err => {
          // console.log({ err }, err, 'GetSearchResult');

          dispatch({
            type: ERROR_SEARCH_SUGGESTION,
            payload: {},
          });
          // resolve(true);
        });
      // });
    };

export const toggleGlobalLoader = show => dispatch => {
  dispatch({ type: TOOGLE_GLOBAL_LOADER, payload: show });
};

export const setGlobalMessage = message => dispatch => {
  dispatch({
    type: TOOGLE_GLOBAL_MESSAGE,
    payload: message,
  });
};

export const clearSearchSuggestion = () => dispatch => {
  dispatch({ type: CLEAR_SEARCH_SUGGESTION });
};

export const search_deltbybookid = body => dispatch => {
  // alert("hit")
  return new Promise((resolve, reject) => {
    AuthInstance.post(
      `${url}/search/delete_book_byid`,
      body
    )
      .then(res => {
        console.log(res.data, "1234");
        // dispatch({
        // 	type: FETCH_QUORA_DETAILS,
        // 	payload:{ data:res.data.data,page}
        // });
        resolve(true);
      })
      .catch(err => {
        console.log({ err });

        resolve(err);
      });
  });
};


export const toggle_autosuggest_div =(autosuggest_state) =>
    dispatch => {
      // alert(`in homeAc ${getSuggestion}`);

      dispatch({
        type: SHOW_AUTOSUGGEST_DIALOG,
        payload: autosuggest_state,
      });
     
    };

