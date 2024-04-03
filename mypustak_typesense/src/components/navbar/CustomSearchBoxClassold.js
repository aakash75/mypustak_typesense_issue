import React, { Component } from "react";
import { InstantSearch, Hits, connectSearchBox } from "react-instantsearch";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import {
  CustomAutocomplete,
  CustomAutocompleteMobile,
  CustomClearRefinementsMob,
} from "./CustomSearchBox";
import MediaQuery from "react-responsive";
import { Drawer, IconButton, InputBase, Paper } from "@mui/material";
import CustomClearRefinements from "../instantsearchcustomcomponents/ClearRefinements";
import TrendingSearch from "../searchpage/TrendingSearch";
import TrendingSearch2, { CustomTrendingSearch } from "../searchpage/TrendingSearch2";
// import { withStyles } from '@mui/styles';
// import { withStyles } from "@material-ui/core/styles";

// const styles = theme => ({
//   drawerPaper: {
//     height: "100%",
//     width: "100vw",
//   },
// });
class SearchBox extends Component {
  timerId = null;

  state = {
    value: this.props.currentRefinement,
    showautocomp: false,
    SearchDrawer: false,
    showmobautocomp: false,
    showTrend:false,
  };
  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("value");
    this.setState({
      value: name,
    });
  }
  setvalue = v => {
    this.setState({
      value: v,
    });
  };

  onChangeDebounced = event => {
    const { refine, delay } = this.props;
    const value = event.currentTarget.value.replace(/[^\w\s]/gi, "");

    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => refine(value), delay);

    if (value.length > 0) {
      this.setState({
        showautocomp: true,
      });
    } else {
      this.setState({
        showautocomp: false,
      });
    }
    this.setState(() => ({
      value,
    }));
  };
  closeshowauto = () => {
    this.setState({
      showautocomp: false,
    });
  };

  render() {
    const { classes } = this.props;
    const { value, SearchDrawer } = this.state;

    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            window.location.assign(
              `/search?value=${value}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
            );
          }}
          style={{ display: "flex", alignItems: "center" }}>
          <MediaQuery minWidth={577}>
            <input
            onClick={() => {
              this.setState({
                showTrend:true
              })
            }}
              value={value}
              className='searchInput'
              placeholder='Search for books by title, author, Publication or ISBN '
              onChange={this.onChangeDebounced}
            />
          </MediaQuery>
          <MediaQuery minWidth={577}>
            <button
              aria-label='searchButton'
              type='submit'
              className='searchButton'>
              <SearchOutlinedIcon style={{ color: "#fff" }} />
            </button>
          </MediaQuery>
          <MediaQuery maxWidth={576}>
            <SearchOutlinedIcon
              className=''
              onClick={() => {
                // Router.push('?sdrawer')
                this.setState({
                  SearchDrawer: true,
                });
              }}
              name='searchnbutton'
              aria-label='searcharia'
              type='submit'
              style={{ color: "#fff", fontSize: "1.6rem" }}
            />
          </MediaQuery>
        </form>
        <MediaQuery minWidth={576}>
        {/* {this.state.showTrend?
        <TrendingSearch
        
        showautocomp={this.state.showautocomp} closeshowauto={this.closeshowauto}/>:null
        } */}

          <CustomAutocomplete
            className='d-none'
            //   currentRefinement={this.props.currentRefinement}
            showautocomp={this.state.showautocomp}
            closeshowauto={this.closeshowauto}
          />
        </MediaQuery>
        <Drawer
          anchor='right'
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
          }}>
          <Paper sx={{ width: "100vw" }}>
            <Paper
              component='form'
              onSubmit={e => {
                e.preventDefault();
                this.setState({
                  showmobautocomp: false,
                  showautocomp: false,
                });
                window.location.assign(
                  `/search?value=${value}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
                );
              }}
              sx={{
                p: "0.6rem 4px",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}>
              <IconButton
                onClick={() => {
                  // setSearchDrawer(false)
                  this.setState({
                    SearchDrawer: false,
                  });
                  // settingsdraw(false)
                }}
                sx={{ p: "10px" }}
                style={{ margin: "0 0.5rem" }}
                aria-label='menu'>
                <ArrowBackOutlinedIcon style={{ color: "#777" }} />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                autoFocus
                // type="search"
                id='Search'
                placeholder='Search for books by title, author, Publication or ISBN'
                inputProps={{ "aria-label": "search books" }}
                value={value}
                onChange={this.onChangeDebounced}
              />
              {this.props.currentRefinement.length > 0 ? (
                <CustomClearRefinementsMob
                  setvalue={this.setvalue}
                  clearsQuery
                />
              ) : null}
            </Paper>

            <MediaQuery maxWidth={576}>
              <CustomAutocompleteMobile
                className=''
                // currentRefinement={currentRefinement}
                showmobautocomp={this.state.showmobautocomp}
                closemobshowauto={this.closemobshowauto}
              />
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
}

const DebouncedSearchBox = connectSearchBox(SearchBox);
export default DebouncedSearchBox;
