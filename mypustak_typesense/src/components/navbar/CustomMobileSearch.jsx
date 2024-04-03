"use client";
import React, { useState } from "react";
import { Paper, IconButton, InputBase } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import styles from "../../styles/CustomMobileSearch.module.css";
import { Autocomplete } from "./Autocomplete";
import CustomClearRefinementsMob from "../instantsearchcustomcomponents/CustomClearRefinementsMob";
import { connect } from "react-redux";
import { toggle_autosuggest_div } from "@/redux/actions/homeAction";
import { GetTrackingUrl } from "@/redux/actions/trackingurlaction";
import { Autocompletemobile } from "./Autocompletemobile";
import { useInstantSearch, useSearchBox } from "react-instantsearch";

const CustomMobileSearch = (props) => {
  const { query, refine } = useSearchBox(props);

  const [value, setvalue] = useState(null);

  const [showautocomp, setshowautocomp] = useState(false);
  const [showmobautocomp, setshowmobautocomp] = useState(false);
  let timerId = null;
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
  console.log(open, "open");
  return (
    <div>
      <div className={`${styles.drawer} bg-white`}>
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

        <paper>
          dkjbn
          <Autocomplete
            //   currentRefinement={this.props.currentRefinement}
            showautocomp={props.show_autosuggest_dialog}
            closeshowautofun={props.toggle_autosuggest_div}
          />
        </paper>
      </div>
    </div>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(CustomMobileSearch);
