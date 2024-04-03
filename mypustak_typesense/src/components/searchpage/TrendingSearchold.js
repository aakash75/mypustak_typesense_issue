import React from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside';
// import { connectAutoComplete } from 'react-instantsearch';
import { connectAutocomplete } from 'instantsearch.js/es/connectors';
import SearchIcon from "@mui/icons-material/Search";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { Button } from '@mui/material';
import { CustomStats } from '../navbar/CustomSearchBox';
import TrendingSearch from './TrendingSearch';
import styles from "../../styles/TrendingSearch.module.css";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const TrendingSearch2 = ({
    searchResults,
    found,
    hits,
    currentRefinement,
    refine,
    clearsQuery,
    showautocomp,
    closeshowauto,
  }) => {
    const ref = useDetectClickOutside({ onTriggered: closeshowauto });
    const hasResults = searchResults && searchResults.nbHits !== 0;
    const nbHits = searchResults && searchResults.nbHits;
  
    return (
      <div ref={ref}>
        {/* <input
             type="search"
             value={currentRefinement}
             onChange={event => refine(event.currentTarget.value)}
           /> */}
        
          {!showautocomp?
          <div
            className='d-none d-sm-block d-md-block d-lg-block'
            style={{
              position: "absolute",
              marginTop:"0.5rem",
              zIndex: 100,
              borderRadius: "5px",
              backgroundColor: "#fff",
              // width: "27.5rem",
            }}
            >
            {hits.map((hit,index) => (
              <div className='searchInput' key={hit.book_id}>
                <div
                  onClick={() => {
                    window.location.assign(`/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                  }}
                  style={{ alignItems:"center",margin: 0, padding: "0.15rem 1rem",gap:"1rem" }}
                  className='searchDiv d-flex '>
                  {/* <SearchIcon
                    className='col-2'
                    fontSize='small'
                    style={{
                      justifySelf: "flex-start",
                      fontSize: "1.1rem",
                      flex: "0.1",
                      margin: 0,
                      padding: 0,
                    }}
                  /> */}
                  <img src={`https://d1f2zer3rm8sjv.cloudfront.net/${hit.thumb}`}
                  style={{width:"2rem",height:"2.5rem"}}
                  alt='books'
                  />
                  <p
                    className='col-8'
                    style={{
                      margin: "0rem 0",
                      padding: "0.5rem 0rem",
                      textTransform: "capitalize",
                      fontSize: "0.8rem",
                      flex: "0.8",
                    }}
                    key={hit.book_id}>
                    {hit.title.length > 75
                      ? hit.title.substring(0, 75).concat("...")
                      : hit.title}
                    ,{hit.author}
                  </p>
                  {/* <CallMadeIcon
                    className='col-2'
                    fontSize='small'
                    style={{ fontSize: "1.1rem", flex: "0.1" }}
                  /> */}
                </div>
              </div>
            ))}
            <Button
              size='small'
              fullWidth
              variant='outlined'
              onClick={() => {
                window.location.assign(`/search?value=${currentRefinement}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
              }}>
              <CustomStats />
            </Button>
          </div>
          :
          <div style={{display:"flex",justifyContent:"center"}}>
          <div className='shadow' style={{display:"flex",position:"absolute",marginTop:"0.5rem",width:"70vw",minHeight:"80vh",backgroundColor:"#fff",zIndex:5,borderRadius:"0.5rem"}}>
          <div className='border' style={{flex:3}}>
              Categories
          </div>
          <div style={{flex:6,height:"100%",minHeight:"80vh",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
          <div>
            <div>
                <div  style={{display:"flex",cursor:"pointer",alignItems:"flex-end",justifyContent:"space-between",padding:"0 1rem"}}>
            <span style={{}}>
                    Results in Books
                </span>    
                <span className={styles.viewAll} style={{color:"#2258ae",fontSize:"0.85rem",display:"flex",alignItems:"center"}}>View All <ChevronRightIcon style={{fontSize:"1rem"}}/></span>
                </div>
          {hits.map(hit => (
              <div key={hit.book_id}>
                <div
                  onClick={() => {
                    window.location.assign(`/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                  }}
                  style={{ alignItems:"center",margin: 0, padding: "0.15rem 1rem",gap:"1rem" }}
                  className='searchDiv d-flex '>
                  {/* <SearchIcon
                    className='col-2'
                    fontSize='small'
                    style={{
                      justifySelf: "flex-start",
                      fontSize: "1.1rem",
                      flex: "0.1",
                      margin: 0,
                      padding: 0,
                    }}
                  /> */}
                  <img src={`https://d1f2zer3rm8sjv.cloudfront.net/${hit.thumb}`}
                  style={{width:"2rem",height:"2.5rem"}}
                  alt='books'
                  />
                  <p
                    className='col-8'
                    style={{
                      margin: "0rem 0",
                      padding: "0.5rem 0rem",
                      textTransform: "capitalize",
                      fontSize: "0.8rem",
                      flex: "0.8",
                    }}
                    key={hit.book_id}>
                    {hit.title.length > 75
                      ? hit.title.substring(0, 75).concat("...")
                      : hit.title}
                    ,{hit.author}
                  </p>
                  
                </div>
              </div>
            ))}
            </div>
            {hits.length>0?
            <div >
                <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",padding:"0 1rem"}}>
            <span style={{}}>
                    Results in Authors
                </span>    
                <span className={styles.viewAll} style={{color:"#2258ae",cursor:"pointer",fontSize:"0.85rem",display:"flex",alignItems:"center"}}>View All <ChevronRightIcon style={{fontSize:"1rem"}}/></span>
                </div>
                <div className='row'>
                {hits.map(hit => (
              <div className='col-6' key={hit.book_id}>
                <div
                  onClick={() => {
                    window.location.assign(`/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                  }}
                  style={{ alignItems:"center",margin: 0, padding: "0rem 1rem",gap:"1rem" }}
                  className='searchDiv d-flex '>
                  {/* <SearchIcon
                    className='col-2'
                    fontSize='small'
                    style={{
                      justifySelf: "flex-start",
                      fontSize: "1.1rem",
                      flex: "0.1",
                      margin: 0,
                      padding: 0,
                    }}
                  /> */}
                  {/* <img src={`https://d1f2zer3rm8sjv.cloudfront.net/${hit.thumb}`}
                  style={{width:"2.5rem",height:"3.25rem"}}
                  /> */}
                  <CallMadeIcon
                    className='col-2'
                    fontSize='small'
                    style={{ fontSize: "1.1rem", flex: "0.1" }}
                  />
                  <p
                    className='col-8'
                    style={{
                      margin: "0rem 0",
                      padding: "0.25rem 0rem",
                      textTransform: "capitalize",
                      fontSize: "0.8rem",
                      flex: "0.8",
                    }}
                    key={hit.book_id}>
                    {hit.author}
                  </p>
                  
                </div>
              </div>
            ))}
                </div>
            </div>:null
            }

            {hits.length>0?<div >
                <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",padding:"0 1rem"}}>
            <span style={{}}>
                    Results in Publication
                </span>    
                <span className={styles.viewAll} style={{color:"#2258ae",fontSize:"0.85rem",display:"flex",alignItems:"center",cursor:"pointer"}}>View All <ChevronRightIcon style={{fontSize:"1rem"}}/></span>
                </div>
                <div className='row'>
                {hits.map(hit => (
              <div className='col-6' key={hit.book_id}>
                <div
                  onClick={() => {
                    window.location.assign(`/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                  }}
                  style={{ alignItems:"center",margin: 0, padding: "0rem 1rem",gap:"1rem" }}
                  className='searchDiv d-flex  '>
                    <CallMadeIcon
                    className='col-2'
                    fontSize='small'
                    style={{ fontSize: "1.1rem", flex: "0.1" }}
                  />
                  <p
                    className='col-8'
                    style={{
                      margin: "0rem 0",
                      padding: "0.25rem 0rem",
                      textTransform: "capitalize",
                      fontSize: "0.8rem",
                      flex: "0.8",
                    }}
                    key={hit.book_id}>
                    {hit.publication}
                  </p>
                </div>
              </div>
            ))}
                </div>
            </div>:null}
          </div>
            {/* <Button
              size='small'
              fullWidth
              variant='outlined'
              onClick={() => {
                window.location.assign(`/search?value=${currentRefinement}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
              }}>
              <CustomStats />
            </Button> */}
          </div>
          <div className='border' style={{flex:3}}>
              Promotion
          </div>
          </div>
        </div>
          }
  
        {currentRefinement.length > 0 ? (
          <div
            className='d-block d-sm-none d-md-none d-lg-none'
            style={{
              position: "absolute",
              zIndex: 100,
              borderRadius: "5px",
              backgroundColor: "#fff",
              width: "100%",
            }}>
            {hits.map(hit => (
              <div
                key={hit.book_id}
                onClick={() => {
                  window.location.assign(`/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                }}
                style={{ alignItems: "center", margin: 0, padding: 0 }}
                className='searchDiv d-flex justify-content-between'>
                <SearchIcon
                  className='col-2'
                  fontSize='small'
                  style={{
                    justifySelf: "flex-start",
                    fontSize: "1.1rem",
                    flex: "0.1",
                    margin: 0,
                    padding: 0,
                  }}
                />
                <p
                  className='col-8'
                  style={{
                    margin: "0rem 0",
                    padding: "0.5rem 0rem",
                    flex: "0.8",
                    textTransform: "capitalize",
                    fontSize: "0.8rem",
                  }}
                  key={hit.book_id}>
                  {hit.title.length > 75
                    ? hit.title.substring(0, 75).concat("...")
                    : hit.title}
                  ,{hit.author}
                </p>
                <CallMadeIcon
                  className='col-2'
                  fontSize='small'
                  style={{ fontSize: "1.1rem", flex: "0.1" }}
                />
              </div>
            ))}
            <Button
              onClick={() => {
                window.location.assign(`/search?value=${currentRefinement}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                
              }}
              size='small'
              fullWidth
              variant='outlined'>
              Click2<CustomStats />
            </Button>
          </div>
        ) : null}
        <style jsx>
          {`
            .searchDiv:hover {
              background-color: #f2f3f5;
              cursor: pointer;
              color: #2248ae;
            }
            .drawerinput {
              width: 100%;
            }
            .searchInput {
              // max-width: 28.063rem;
              width: 28.063rem;
              // height: 2rem;
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
  };
  
export const CustomTrendingSearch = connectAutoComplete(TrendingSearch2);