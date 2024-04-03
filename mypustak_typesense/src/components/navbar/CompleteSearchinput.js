import React, { useState, useRef, useEffect } from 'react';
import { useInstantSearch, useSearchBox } from 'react-instantsearch';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MediaQuery from "react-responsive";
import { Drawer, IconButton, InputBase, Paper } from "@mui/material";
import { Autocomplete } from './Autocomplete';
// import { Autocomplete } from './Autocomplete1';
// import {
//     CustomAutocomplete,
//     CustomAutocompleteMobile,
//     CustomClearRefinementsMob,
//   } from "./CustomSearchBox";
function CompleteSearchinput(props) {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);
  const [value , setvalue] = useState(null);
  const [showautocomp , setshowautocomp] = useState(false)
  const [showmobautocomp , setshowmobautocomp] = useState(false)
  const [SearchDrawer , setSearchDrawer] = useState(false)
  const [showTrend , setshowTrend] = useState(false)



  const timerId = null;
  const isSearchStalled = status === 'stalled';

  function setQuery(newQuery) {
    setInputValue(newQuery);

    refine(newQuery);
  }

  useEffect(() =>{
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("value");
    // this.setState({
    //   value: name,
    // });
    setvalue(name);
  

  },[])

 const setvaluefun = v => {
    this.setState({
      value: v,
    });
  };

  const onChangeDebounced = event => {
    const { delay } = props;
    const value = event.currentTarget.value.replace(/[^\w\s]/gi, "");
  
    clearTimeout(timerId);
    // Change "this.timerId" to "timerId" here
    timerId = setTimeout(() => refine(value), delay);
  
    if (value.length > 0) {
      setshowautocomp(true); // Use state setter functions
    } else {
      setshowautocomp(false); // Use state setter functions
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
 const closeshowauto = () => {
    // this.setState({
    //   showautocomp: false,
    // });
    setshowautocomp(false)
  };
  return (
    <div>
      <form
        action=""
        role="search"
        noValidate
        // onSubmit={(event) => {
        //   event.preventDefault();
        //   event.stopPropagation();

        //   if (inputRef.current) {
        //     inputRef.current.blur();
        //   }
        // }}
        onSubmit={e => {
            e.preventDefault();
            window.location.assign(
              `/search?value=${value}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
            );
          }}
          style={{ display: "flex", alignItems: "center" }}>

        {/* onReset={(event) => {
          event.preventDefault();
          event.stopPropagation();

          setQuery('');

          if (inputRef.current) {
            inputRef.current.focus();
          }
        }} */}
      {/* > */}
      <MediaQuery minWidth={577}>
            <input
            onClick={() => {
              setshowTrend(true)
            }}
              value={value}
              className='searchInput'
              placeholder='Search for books by title, author, Publication or ISBN '
              onChange={onChangeDebounced}
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
                // this.setState({
                //   SearchDrawer: true,
                // });

                setSearchDrawer(true)
              }}
              name='searchnbutton'
              aria-label='searcharia'
              type='submit'
              style={{ color: "#fff", fontSize: "1.6rem" }}
            />
          </MediaQuery>
        </form>

        {/* <input
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="Search for products"
          spellCheck={false}
          maxLength={512}
          type="search"
          value={inputValue}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
          }}
          autoFocus
        /> */}
        {/* <button type="submit">Submit</button>
        <button
          type="reset"
          hidden={inputValue.length === 0 || isSearchStalled}
        >
          Reset
        </button>
        <span hidden={!isSearchStalled}>Searching…</span>
      </form> */}



    <Drawer
          anchor='right'
          style={{ width: "100%", height: "100%" }}
          open={SearchDrawer}
          // classes={{
          //   paper: classes.drawerPaper,
          // }}
          sx={{ width: "100vw", height: "100vh" }}
          onClose={() => {
            // this.setState({
            //   SearchDrawer: false,
            // });
            setSearchDrawer(false);
          }}>
          <Paper sx={{ width: "100vw" }}>
            <Paper
              component='form'
              onSubmit={e => {
                e.preventDefault();
                // this.setState({
                //   showmobautocomp: false,
                //   showautocomp: false,
                // });
                setshowautocomp(false);
                setshowmobautocomp(false);
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
                  setSearchDrawer(false)
                //   this.setState({
                //     SearchDrawer: false,
                //   });
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
                onChange={onChangeDebounced}
              />
              {/* {props.currentRefinement?.length > 0 ? (
                <CustomClearRefinementsMob
                  setvalue={this.setvalue}
                  clearsQuery
                />
              ) : null} */}
            </Paper>
            {/* <MediaQuery maxWidth={576}> */}
            {/* <CustomAutocomplete
            className='d-none'
            //   currentRefinement={this.props.currentRefinement}
            // showautocomp={showautocomp}
            showautocomp={true}

            closeshowauto={closeshowauto}
          /> */}
            {/* </MediaQuery> */}
          </Paper>
        </Drawer>

        <Autocomplete   // showautocomp={showautocomp}
            />


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

export default CompleteSearchinput;