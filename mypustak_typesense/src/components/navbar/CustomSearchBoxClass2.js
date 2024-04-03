import React, { Component } from "react";
// import { InstantSearch, Hits, connectSearchBox } from "react-instantsearch";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
// import {
//   CustomAutocomplete,
//   CustomAutocompleteMobile,
//   CustomClearRefinementsMob,
// } from "./CustomSearchBox";
import MediaQuery from "react-responsive";
import { Drawer, IconButton, InputBase, Paper } from "@mui/material";
// import CustomClearRefinements from "../instantsearchcustomcomponents/ClearRefinements";
import TrendingSearch from "../searchpage/TrendingSearch";
// import TrendingSearch2, { CustomTrendingSearch } from "../searchpage/TrendingSearch2";
import { unbox_Autosuggest, unbox_Search } from "../../redux/actions/unboxAction";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { Unbxd } from "../../helper/helpers";
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
    unbxd_search_data:[],
    search_loader:true
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

  SearchUnbxd = (value) => {
    let body = {
      uid:Unbxd.readCookie(Unbxd.cookies.userId),
      page:0,
      rows:5,
      type:"book"
    }

    let author_body = {
      uid:Unbxd.readCookie(Unbxd.cookies.userId),
      page:0,
      rows:4,
      type:"author"
    }

    let publication_body = {
      uid:Unbxd.readCookie(Unbxd.cookies.userId),
      page:0,
      rows:4,
      type:"publication"
    }
    this.setState({
      search_loader :true
    })  
    // console.log("debounce 77" , value)
    this.props.unbox_Autosuggest(value,body).then(res => {
      // console.log(res.data.response,"unbox");
      this.setState({
        search_loader :false
      })
    }).catch((err) =>{
      this.setState({
        search_loader :false
      })
    })
    this.props.unbox_Autosuggest(value,author_body)
    this.props.unbox_Autosuggest(value,publication_body)

    // let authorbody = {
    //   uid:Unbxd.readCookie(Unbxd.cookies.userId),
    //   page:0,
    //   rows:4,
    //   filter:"author_uFilter",
    // }
    // this.props.unbox_Search(value,authorbody).then(res => {

    // })
  }
  onChangeDebounced = event => {
    const { refine, delay } = this.props;
    const value = event.currentTarget.value
    console.log("debounced's value:", value)

    clearTimeout(this.timerId);
    
    if (value.length > 0) {
    console.log("debounced's value2:", value)
      
      this.timerId = setTimeout(() => this.SearchUnbxd(value), delay);
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

  setValue = (v) => {
    this.setState({
      value:v
    })
  }
  render() {
    const { classes } = this.props;
    const { value, SearchDrawer } = this.state;

    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if(value.length>0){
              window.location.assign(
                `/search?value=${encodeURIComponent(value)}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
              );
            }
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
                  showTrend:true
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
        {this.state.showTrend?
        <TrendingSearch
        setValue={this.setValue}
        value={this.state.value}
        showautocomp={this.state.showautocomp} closeshowauto={this.closeshowauto}
        search_loader = {this.state.search_loader}
        />:null
        }

          {/* <CustomAutocomplete
            className='d-none'
            //   currentRefinement={this.props.currentRefinement}
            showautocomp={this.state.showautocomp}
            closeshowauto={this.closeshowauto}
          /> */}
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
                if(value.length>0){
                window.location.assign(
                  `/search?value=${encodeURIComponent(value)}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
                );
                }
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
              onClick={() => {
                
              }}
                sx={{ ml: 1, flex: 1 }}
                autoFocus
                // type="search"
                id='Search'
                placeholder='Search for books by title, author, Publication or ISBN'
                inputProps={{ "aria-label": "search books" }}
                value={value}
                onChange={this.onChangeDebounced}
              />
              {/* {this.props.currentRefinement.length > 0 ? (
                <CustomClearRefinementsMob
                  setvalue={this.setvalue}
                  clearsQuery
                />
              ) : null} */}
            </Paper>

            <MediaQuery maxWidth={576}>
            {this.state.showTrend?
        <TrendingSearch
        setValue={this.setValue}
        value={this.state.value}
        showautocomp={this.state.showautocomp} closeshowauto={this.closeshowauto}   
        search_loader = {this.state.search_loader}/>:<div></div>
        }
              {/* <CustomAutocompleteMobile
                className=''
                // currentRefinement={currentRefinement}
                showmobautocomp={this.state.showmobautocomp}
                closemobshowauto={this.closemobshowauto}
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
}

// const DebouncedSearchBox = connectSearchBox(SearchBox);
const mapStateToProps = state => {
  return {
    getuserdetails: state.loginReducer.getuserdetails,
    
  };
};
export default connect(mapStateToProps, {unbox_Search,unbox_Autosuggest
})(withSnackbar(SearchBox));
