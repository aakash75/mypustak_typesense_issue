import React, { useState, useRef, useEffect } from "react";
import { useInstantSearch, useSearchBox } from "react-instantsearch";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { connect } from "react-redux";

import MediaQuery from "react-responsive";
import { Drawer, IconButton, InputBase, Paper } from "@mui/material";
import { Autocomplete } from "./Autocomplete";
import { Autocompletemobile } from "./Autocompletemobile";
// import {
//     CustomAutocomplete,
//     CustomAutocompleteMobile,
//     CustomClearRefinementsMob,
//   } from "./CustomSearchBox";

import {
  Highlight,
  InstantSearch,
  SearchBox,
  DynamicWidgets,
  Snippet,
  RefinementList,
  InstantSearchSSRProvider,
  ClearRefinements,
  CurrentRefinements,
} from "react-instantsearch";

import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { CLUSTERHOST, INSTANTSEARCHAPIKEY } from "../../helper/helpers";
import { toggle_autosuggest_div } from "../../redux/actions/homeAction";
import { fa } from "gender-detection/genders/male";
import CustomClearRefinementsMob from "../instantsearchcustomcomponents/CustomClearRefinementsMob";

const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
  // upgraded cluster
  server: {
    nodes: [
      {
        host: CLUSTERHOST,
        port: "443",
        protocol: "https",
      },
    ],
    apiKey: INSTANTSEARCHAPIKEY,
    cacheSearchResultsForSeconds: 0,
  },
  // additionalSearchParameters: {
  //   q: "N",
  //   query_by: "is_out_of_stack",
  //   page: 1,
  //   facet_by:
  //     "author,publication,category,language,keywords,book_type,binding,book_condition,subject,class",
  //   max_facet_values: 30,
  //   num_typos: 2,
  //   typo_tokens_threshold: 10,
  //   per_page: 12,
  // },

  additionalSearchParameters: {
    query_by: "title,author,publication,isbn",
    sort_by: "num_is_out_of_stack:asc,iDate:desc",
    filter_by: "isOutOfStock:['n', 'y']&& bookType:[0, 2]",
    // "include_fields":'title,author,imageUrl,bookCondition',
    max_facet_values: 30,
    num_typos: 2,
    typo_tokens_threshold: 10,
    per_page: 12,
    // "filter_by":"bookCondition:[BrandNew]&& isOutOfStock:N"
  },
  connectionTimeoutSeconds: 10,
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

function CustomSearchboxnew(props) {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);
  const [value, setvalue] = useState(null);
  const [showautocomp, setshowautocomp] = useState(false);
  const [showmobautocomp, setshowmobautocomp] = useState(false);
  const [SearchDrawer, setSearchDrawer] = useState(false);
  const [showTrend, setshowTrend] = useState(false);

  let timerId = null;
  const isSearchStalled = status === "stalled";

  function setQuery(newQuery) {
    setInputValue(newQuery);

    refine(newQuery);
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("value");
    // this.setState({
    //   value: name,
    // });
    setvalue(name);
  }, []);

  const setvaluefun = (v) => {
    this.setState({
      value: v,
    });
  };

  const onChangeDebounced = (event) => {
    const { delay } = props;
    // const value = event.currentTarget.value.replace(/[^\w\s]/gi, "");
    const value = event.currentTarget.value;

    clearTimeout(timerId);
    // Change "this.timerId" to "timerId" here
    timerId = setTimeout(() => refine(value), delay);

    if (value.length > 0) {
      setshowautocomp(true); // Use state setter functions
      props.toggle_autosuggest_div(true);
    } else {
      setshowautocomp(false); // Use state setter functions
      props.toggle_autosuggest_div(false);
    }
    setvalue(value); // Use state setter functions
  };

  //  const onChangeDebounced = event => {
  //     const { delay } = props;
  //     const value = event.currentTarget.value.replace(/[^\w\s]/gi, "");

  //     clearTimeout(timerId);
  //     this.timerId = setTimeout(() => refine(value), delay);

  //     if (value.length > 0) {
  //     //   this.setState({
  //     //     showautocomp: true,
  //     //   });

  //     } else {
  //       this.setState({
  //         showautocomp: false,
  //       });
  //     }
  //     this.setState(() => ({
  //       value,
  //     }));
  //   };
  //  const closeshowauto = () => {
  //     // this.setState({
  //     //   showautocomp: false,
  //     // });
  //     setshowautocomp(false)
  //   };

  const closeshowautofun = () => {
    // this.setState({
    //   showautocomp: false,
    // });
    setshowautocomp(false);
  };

  console.log(props.show_autosuggest_dialog, "props.show_autosuggest_dialog");
  return (
    <div>
      <form
        action=""
        role="search"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          window.location.assign(
            `/search?value=${value}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
          );
        }}
        style={{ display: "flex", alignItems: "center" }}
      >
        {/* for Desktop input text */}
        <MediaQuery minWidth={577}>
          <input
            onClick={() => {
              setshowTrend(true);
            }}
            value={value}
            className="searchInput"
            placeholder="Search for books by title, author, Publication or ISBN "
            onChange={onChangeDebounced}
          />
          <button
            aria-label="searchButton"
            type="submit"
            className="searchButton"
          >
            <SearchOutlinedIcon style={{ color: "#fff" }} />
          </button>
        </MediaQuery>

        {/* for mobile icon */}
        <MediaQuery maxWidth={576}>
          <SearchOutlinedIcon
            className=""
            onClick={() => {
              setSearchDrawer(true);
            }}
            name="searchnbutton"
            aria-label="searcharia"
            type="submit"
            style={{ color: "#fff", fontSize: "1.6rem" }}
          />
        </MediaQuery>
      </form>
      <MediaQuery minWidth={576}>
        <Autocomplete
          className="d-none"
          //   currentRefinement={this.props.currentRefinement}
          showautocomp={props.show_autosuggest_dialog}
          closeshowautofun={props.toggle_autosuggest_div}
        />
      </MediaQuery>

      <Drawer
        anchor="right"
        style={{ width: "100%", height: "100%" }}
        open={SearchDrawer}
        // classes={{
        //   paper: classes.drawerPaper,
        // }}
        sx={{ width: "100vw", height: "100vh" }}
        onClose={() => {
          this.setState({
            SearchDrawer: false,
          });
        }}
      >
        <Paper sx={{ width: "100vw" }}>
          <Paper
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              // this.setState({
              //   showmobautocomp: false,
              //   showautocomp: false,
              // });
              window.location.assign(
                `/search?value=${value}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
              );
            }}
            sx={{
              p: "0.6rem 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton
              onClick={() => {
                setSearchDrawer(false);
                // this.setState({
                //   SearchDrawer: false,
                // });
                // settingsdraw(false)
              }}
              sx={{ p: "10px" }}
              style={{ margin: "0 0.5rem" }}
              aria-label="menu"
            >
              <ArrowBackOutlinedIcon style={{ color: "#777" }} />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              autoFocus
              // type="search"
              id="Search"
              placeholder="Search for books by title, author, Publication or ISBN"
              inputProps={{ "aria-label": "search books" }}
              value={value}
              onChange={onChangeDebounced}
            />
            {/* {this.props.currentRefinement.length > 0 ? ( */}
            {true ? (
              <CustomClearRefinementsMob
                setvalue={setvalue}
                closeshowautofun={props.toggle_autosuggest_div}
                // closemobshowauto={this.closemobshowauto}

                clearsQuery
              />
            ) : null}
          </Paper>

          <MediaQuery maxWidth={576}>
            <Autocompletemobile
              className=""
              // currentRefinement={currentRefinement}
              showmobautocomp={props.show_autosuggest_dialog}
              // showmobautocomp={this.state.showmobautocomp}

              // closemobshowauto={this.closemobshowauto}
            />
            {/* dkkdk */}
            {/* <Autocomplete     
                  // className='d-none'
                        //   currentRefinement={this.props.currentRefinement}
                        // showautocomp={props.show_autosuggest_dialog}
                        showautocomp={true}
                        closeshowautofun={props.toggle_autosuggest_div}
                        /> */}
          </MediaQuery>
        </Paper>
      </Drawer>

      <style jsx>
        {`
          .drawerinput {
            width: 100%;
          }
          .searchInput {
            // max-width: 28.063rem;
            width: 28.063rem;

            height: 2rem;
            // border-radius: 8px 0px 0px 8px;
            border: none;
            focus: none;
          }

          textarea:focus,
          input:focus {
            outline: none;
          }
          .searchButton {
            width: 4rem;
            height: 2rem;
            margin: 5px 0;
            border: none;
            background-color: #ff723b;
            box-shadow: 2px 1px 1px rgba(255, 255, 255, 0.1);
            // border-radius: 0px 7px 7px 0px;
            margin-left: -8px;
          }
          .searchButton:hover {
            background: #ff5e1f;
          }
          @media screen and (max-width: 992px) {
            .searchInput {
              width: 22rem;
            }
          }
          @media screen and (max-width: 768px) {
            .searchInput {
              width: 14rem;
            }
            .searchButton {
              width: 2rem;
            }
          }
        `}
      </style>
    </div>
  );
}

// export default CustomSearchboxnew;

const mapStateToProps = (state) => {
  return {
    incart_check: state.cartReduc.incart_check,
    getuserdetails: state.loginReducer.getuserdetails,
    userComponentStatus: state.loginReducer.userComponentStatus,
    SuggestionData: state.productsuggestionreducer.SuggestionData,
    PopupCart: state.cartReduc.PopupCart,
    userToken: state.accountR.token,
    MyWishlist: state.cartReduc.MyWishlist,
    list_wishlist: state.cartReduc.list_wishlist,
    Total_wish_count: state.wishlistR.Total_wish_count,
    offerhomepage: state.offerpageReducer.offerhomepage,
    show_autosuggest_dialog: state.homeR.show_autosuggest_dialog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetTrackingUrl: (body) => dispatch(GetTrackingUrl(body)),
    toggle_autosuggest_div: (body) => dispatch(toggle_autosuggest_div(body)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomSearchboxnew);
// export default ;
