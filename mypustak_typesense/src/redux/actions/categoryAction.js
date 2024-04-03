// import {LOGIN,SIGNUP,LOGINFAILS,LOGOUT,SIGNEDUP,SHOWLOADER,GETADDRESS,ADD_ADDRESS} from './types'
import { GETCATEGORY, GETNCERTFILTER, GETNCERTFILTERLOAD, GETLOADERFORNCERT, NODATAFOUND, SAVETHECLICKEDCATEGORYNCERT, GETFIRSTNCERTCATEGORY, GETLOADER, GETNCERTFILTERCLICKEDLOADER } from '../constants/types'
import axios from 'axios'
import config from 'react-global-configuration'
// import Book from '../components/Home/GBook';
import { url } from '../../helper/api_url';
import { FilterOption } from "../../helper/FilterOption";

export const getncertcategory = ({ category, code, pg }) => dispatch => {
    // alert(`${page}normal`)

    let body;

    if (isNaN(code)) {
        body = {
            "query_by": 'BISAC_CODES'
        }
    } else {
        body = {
            "query_by": 'category',
        }
    }
    axios
        .post(`https://data.mypustak.com/search/get/SearchBooksCollection/${code}/${pg}/0`, body)

        .then(res => {
            // console.log(res, "resdata")
            pg = pg + 1
            dispatch({
                type: GETCATEGORY,
                payload: { filterData: res.data.data }
            })

            dispatch({
                type: SAVETHECLICKEDCATEGORYNCERT,
                payload: { category, code, pg },
            })
        }

        )
        .catch(err => console.log(err)
        )
};

export const ncertfilter = ({ CATID, body, page, loadmore }) => dispatch => {
    // console.log({body});
    if (!loadmore) {
        dispatch({
            type: GETLOADERFORNCERT,
            payload: {},

        })

    }

    axios
        .post(`${url}/api/v1/filter/${CATID}/${page}`, body)
        .then(res => {
            // console.log("in onClickFilter And the Data are ", res.data.Books);

            try {
                if (res.data.Books.length) {
                    if (page == 1) {
                        dispatch({
                            type: GETNCERTFILTER,
                            payload: res.data,
                        })
                    }
                    else {
                        // alert("page2", page)

                        try {
                            // dispatch
                            // ({
                            //     type: GETNCERTFILTERLOAD,
                            //     payload: res.data,

                            // })
                        }
                        catch (error) {

                            // alert("error", page)

                            console.log(error)
                        }
                    }
                } //if

                else {
                    // alert("nothing")
                    // dispatch({
                    //     type:NODATAFOUND,
                    //     payload:{},
                    // })
                }
            } //try

            catch (error) {
                // alert(`${page}filter`, "ggg")

            }
            // this.setState({ GetBookResult: res.data.Books,ShowFilterLoader:false });
        })
        .catch(err => {
            console.log(err)
            // alert("llll")
            // this.setState({ShowFilterLoader:false})

        });
};


export const getFirstncertcategory = ({ category, code, pg }) => dispatch => {
    // console.log({category,code,pg },isNaN(code),"NaN");
    //  pg=pg

    dispatch({
        type: GETLOADERFORNCERT,
        payload: {},
    })
    let body;
    // if(isNaN(code)){
    //  body ={
    //     "query_by":'BISAC_CODES',

    //     }
    // }else{
    body = {
        "query_by": 'category',


    }
    // }

    axios
        .post(`https://data.mypustak.com/search/get/SearchBooksCollection/${code}/${pg}/0`, body)
        .then(res => {
            // console.log({res});

            dispatch({
                type: GETFIRSTNCERTCATEGORY,
                payload: { filterData: res.data.data, pg: 1 },
            })

            dispatch({
                type: SAVETHECLICKEDCATEGORYNCERT,
                payload: { category, code, pg },
            })
        })
        .catch(err => {

            console.log({ err });

        })


}
export const CategoryNcertFilterClicked = ({ body, page }) => dispatch => {

    // console.log("NaN", body, page);
    const code = body.code;
    const Loadmore = body.Loadmore;
    const filterClicked = body.filterClicked;
    //  pg=pg

    dispatch({
        type: GETLOADERFORNCERT,
        payload: {},
    })


    if (!Loadmore) {
        dispatch({
            type: GETNCERTFILTERCLICKEDLOADER,
            payload: true,
        })

    }

    if (isNaN(code)) {
        body.query_by = "BISAC_CODES"
    } else {
        body.query_by = "category"
    }
    // console.log(`${code}/${page}`,"page");
    let header = {
        headers: {}
    }
    axios
        .post(`https://data.mypustak.com/search/get/SearchBooksCollection/${code}/${page}/0`, body, header)
        .then(res => {
            // console.log({res});

            if (res.data.data.found && res.data.data.hits.length) {
                // alert("if action")
                FilterOption(res.data.data.facet_counts).then(Filterres => {
                    // console.log({FilterRes:res});

                    dispatch({
                        type: GETCATEGORY,
                        payload: {
                            filterData: res.data.data.hits,
                            page,
                            Filter: Filterres,
                            filterClicked,
                            found_books: res.data.data.found,
                        },
                    })

                    dispatch({
                        type: SAVETHECLICKEDCATEGORYNCERT,
                        payload: { code, page },
                    })
                })

            } else {
                //  alert("ncert else")
                dispatch({
                    type: GETCATEGORY,
                    payload: { filterData: [], page, Filter: [], filterClicked },
                })

                dispatch({
                    type: SAVETHECLICKEDCATEGORYNCERT,
                    payload: { code, page },
                })
            }


        })
        .catch(err => {
            // console.log(`${code}/${page}`,"page ERR");
            dispatch({
                type: GETNCERTFILTERCLICKEDLOADER,
                payload: false,
            })
            console.log({ err });

        })

}