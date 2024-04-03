// import {LOGIN,SIGNUP,LOGINFAILS,LOGOUT,SIGNEDUP,SHOWLOADER,GETADDRESS,ADD_ADDRESS} from './types'
import {
    GETMAINCATEGORY,
    GETMAINCATEGORYFLTER,
    GETMAINCATEGORYFLTERLOAD,
    GETFIRSTCATEGORY,
    GETLOADER,
    NODATAFOUND,
    LOADING_GETCHILDCATEGORY,
    LOADING_MAINCATEGORY,
    SAVETHECLICKEDCATEGORY,
    GETFILTERDATA,
    GETMAINCATEGORY_LOADER,
    UNMOUNTPRODUCT,
} from "../constants/types";
import axios from "axios";
import { FilterOption } from "../../helper/FilterOption";
// import Book from '../components/Home/GBook';
import { AuthInstance, url } from "../../helper/api_url";

export const getmaincategory =
    ({ CATID, page }) =>
        dispatch => {
            // alert(`${page}normal`)
            axios
                .get(`${url}/api/v1/get/category/${CATID}/${page}`)

                .then(res => {
                    if (page == 1) {
                        // console.log(res, "resdata")
                        dispatch({
                            type: GETFIRSTCATEGORY,
                            payload: res.data,
                        });
                    } else {
                        try {
                            dispatch({
                                type: GETMAINCATEGORY,
                                payload: res.data,
                            });
                        } catch {
                            console.log("data not found");
                        }
                    }
                })
                .catch(err => console.log(err));
        };

export const maincategoryfilter =
    ({ CATID, body, page, loadmore }) =>
        dispatch => {
            // console.log({body});
            // alert(loadmore)
            if (!loadmore) {
                dispatch({
                    type: GETLOADER,
                    payload: {},
                });
            }

            axios
                .post(`${url}/api/v1/filter/${CATID}/${page}`, body)
                .then(res => {
                    // alert(`${page}filter`)
                    // console.log("in onClickFilter And the Data are ", res.data.Books);

                    try {
                        if (res.data.Books.length) {
                            if (page == 1) {
                                dispatch({
                                    type: GETMAINCATEGORYFLTER,
                                    payload: res.data,
                                });
                            } else {
                                // alert("page2", page)

                                try {
                                    // alert("enter")
                                    dispatch({
                                        type: GETMAINCATEGORYFLTERLOAD,
                                        payload: res.data,
                                    });
                                } catch (error) {
                                    console.log("no data found");
                                }
                            }
                        } //if
                        else {
                            dispatch({
                                type: NODATAFOUND,
                                payload: {},
                            });
                        }
                    } catch (error) {
                        //try
                    }
                    // this.setState({ GetBookResult: res.data.Books,ShowFilterLoader:false });
                })
                .catch(err => {
                    console.log("nothing", err);
                    // this.setState({ShowFilterLoader:false})
                });
        };

export const openTheChilCategory =
    ({ category, code, pg, body }) =>
        dispatch => {
            dispatch({
                type: LOADING_GETCHILDCATEGORY,
                payload: {},
            });

            dispatch({
                type: GETMAINCATEGORY_LOADER,
                payload: {},
            });

            console.log(body, "cate123456");

            let ParentCategoryArr = [
                187, 190, 191, 192, 193, 216, 217, 228, 238, 244, 252, 253, 266, 280, 288,
                303, 304, 315, 322, 329, 355,
            ];
            if (ParentCategoryArr.includes(code)) {
                body["category_url"] = category;
                body["query_by"] = "parent_category";
                body["sort_by"] = "num_is_out_of_stack:asc,book_type:asc";

                // body ={
                //     "category_url":category,
                //     "query_by": 'parent_category',
                //    "sort_by":'num_is_out_of_stack:asc,book_type:asc',
                //    }
            } else {
                if (isNaN(code)) {
                    body["category_url"] = category;
                    body["query_by"] = "BISAC_CODES";
                    body["sort_by"] = "num_is_out_of_stack:asc,book_type:asc";
                    // body ={
                    //     "category_url":category,
                    //     "query_by": 'BISAC_CODES',
                    //     "sort_by":'num_is_out_of_stack:asc,book_type:asc',

                    // }
                } else {
                    body["category_url"] = category;
                    body["query_by"] = "category";
                    body["sort_by"] = "num_is_out_of_stack:asc,book_type:asc";

                    // body ={
                    //         "category_url":category,
                    //         "query_by": 'category',
                    //         "sort_by":'num_is_out_of_stack:asc,book_type:asc',

                    //        }
                }
            }

            return new Promise((resolve, reject) => {
                axios
                    .all([
                        // axios
                        // .get(`http://localhost:8000/api/v1/get/category/bisac-code/${category}`),
                        axios.post(
                            `https://data.mypustak.com/search/get/SearchBooksCollection/${code}/${pg}/0`,
                            // `https://api.mypustak.in/search/get/SearchBooksCollection/${code}/${pg}/0`,

                            body
                        ),
                    ])

                    .then((Cat_child_res, Search_value_res) => {
                        // console.log(Cat_child_res[0].data,"SearchBooksCollection",Cat_child_res[0].data.data.facet_counts,code,`https://data.mypustak.com/search/get/SearchBooksCollection/${code}/${pg}/0`,body);
                        if (
                            Cat_child_res[0].data.data.found &&
                            Cat_child_res[0].data.data.hits
                        ) {
                            FilterOption(Cat_child_res[0].data.data.facet_counts)
                                .then(Filterres => {
                                    // console.log({ found: child_res[0].data.data.found})

                                    dispatch({
                                        type: GETFIRSTCATEGORY,
                                        payload: {
                                            hits: Cat_child_res[0].data.data.hits,
                                            Filter: Filterres,
                                            found_books: Cat_child_res[0].data.data.found,
                                        },
                                    });

                                    dispatch({
                                        type: SAVETHECLICKEDCATEGORY,
                                        payload: { category, code, pg },
                                    });
                                    resolve(true);
                                })
                                .catch(err => {
                                    console.log({ err }, "FilterOption");
                                });
                        }
                        resolve(true);
                    })
                    .catch(Cat_child_err => {
                        // console.log({ Cat_child_err:Cat_child_err.response.data })
                        dispatch({
                            type: LOADING_GETCHILDCATEGORY,
                            payload: {},
                        });

                        resolve(true);
                    });
            });
        };

export const MainCategoryFilterClicked =
    ({ body, page }) =>
        dispatch => {
            // console.log({ body, page }, "123456")

            dispatch({
                type: GETLOADER,
                payload: {
                    pg: page,
                    Loadmore: body.Loadmore,
                    FilterLoder: body.filterClicked,
                },
            });
            const code = body.code;
            let sort_by = body.sort_by;

            let ParentCategoryArr = [
                187, 190, 191, 192, 193, 216, 217, 228, 238, 244, 252, 253, 266, 280, 288,
                303, 304, 315, 322, 329, 352, 355,
            ];
            if (ParentCategoryArr.includes(code)) {
                body.query_by = "parentCategory";
                body.sort_by = sort_by;
            } else {
                if (isNaN(code)) {
                    body.query_by = "BISAC_CODES";
                    body.sort_by = sort_by;
                } else {
                    body.query_by = "category";
                    body.sort_by = sort_by;
                }
            }

            axios
                .post(
                    `https://data.mypustak.com/search/get/SearchBooksCollection/${code}/${page}/0`,
                    // `https://api.mypustak.in/search/get/SearchBooksCollection/${code}/${page}/0`,

                    body
                )
                .then(res => {
                    // console.log({ res }, "------------------- onClick-----------------");
                    let found = res.data.data.found;
                    if (found && page == 1) {
                        FilterOption(res.data.data.facet_counts)
                            .then(Filterres => {
                                // console.log({FilterRes:res});
                                // alert("action if")
                                dispatch({
                                    type: GETFILTERDATA,
                                    payload: {
                                        hits: res.data.data.hits,
                                        Filter: Filterres,
                                        pg: page,
                                    },
                                });

                                dispatch({
                                    type: SAVETHECLICKEDCATEGORY,
                                    payload: { category: body.category, code, pg: page },
                                });
                            })
                            .catch(err => {
                                console.log({ err }, "FilterOption");
                            });
                    } else {
                        // alert("action else")
                        dispatch({
                            type: GETFILTERDATA,
                            payload: {
                                hits: res.data.data.hits,
                                Filter: {},
                                pg: page,
                            },
                        });

                        dispatch({
                            type: SAVETHECLICKEDCATEGORY,
                            payload: { category: body.category, code, pg: page },
                        });
                    }
                })
                .catch(err => {
                    console.log({ err });
                    dispatch({
                        type: GETLOADER,
                        payload: {
                            pg: page,
                            Loadmore: false,
                            FilterLoder: body.filterClicked,
                        },
                    });
                });
        };

export const unmountProductState = () => dispatch => {
    //  alert("unmount2")

    dispatch({
        type: UNMOUNTPRODUCT,
        payload: "",
    });
};
