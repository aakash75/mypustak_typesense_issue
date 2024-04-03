import React, { useEffect ,useState} from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside';
// import { connectAutoComplete } from 'react-instantsearch';
// import SearchIcon from "@mui/icons-material/Search";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { Button, CircularProgress } from '@mui/material';
// import { CustomStats } from '../navbar/CustomSearchBox';
import styles from "../../styles/TrendingSearch.module.css";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { unbox_Search } from '../../redux/actions/unboxAction';
import MediaQuery from "react-responsive";
import Image from "next/legacy/image";


const TrendingSearch = ({
  searchResults,
  found,
  hits,
  currentRefinement,
  refine,
  clearsQuery,
  showautocomp,
  closeshowauto,
  Unbxd_AutoSuggest,
  Unbxd_AutoSuggest_pub,
  Unbxd_AutoSuggest_author,
  setValue,
  value,
  search_loader,
  unbxd_query_pass
}, props) => {

  const [imageError, setImageError] = useState(null)

  const ref = useDetectClickOutside({ onTriggered: closeshowauto });
  const hasResults = searchResults && searchResults.nbHits !== 0;
  const nbHits = searchResults && searchResults.nbHits;
  // useEffect(() => {


  // }, [])
  const getHighlightedText = (text, highlight,length) => {
    // alert('Highlight');
    let formattedText = text.replace(
      /(\w)(\w*)/g,
      (_, firstChar, rest) =>
        firstChar.toUpperCase() + rest.toLowerCase()
    );
    let finalText = ""
    if (formattedText.length > length) {
      finalText =  formattedText.substring(0, length).concat("...");
    } else {
      finalText = formattedText;
    }
    const parts = finalText.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> { parts.map((part, i) => 
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
            { part }
        </span>)
    } </span>;
}


const unbxd_tracking_api =(query , type,query_type,pid) =>{
  let payload = {}
  let click_payload ={}
  // alert(unbxd_query_pass)
  if(type == "IN_FIELD"){
    payload = {
      query: query,
      autosuggestParams: {
        autosuggest_type: 'IN_FIELD',
        autosuggest_suggestion: query,
        field_name: 'IN_FIELD',
        field_value: null,
        src_field: '',
        internal_query: unbxd_query_pass
      }
    }
  }
  else if(type == "POPULAR_PRODUCTS"){
     payload = {
      query:query,
      autosuggestParams: {
       autosuggest_type: "POPULAR_PRODUCTS",
       autosuggest_suggestion: query,
       pid: pid,
       unbxdprank: 1,
       internal_query: unbxd_query_pass
      }
    }

    click_payload = {
      query: query,
      autosuggestParams: {
          autosuggest_type: "POPULAR_PRODUCTS",
          autosuggest_suggestion: query,
          field_name: 'POPULAR_PRODUCTS',
          field_value: null,
          src_field: '',
          pid: pid,
          unbxdprank: 1,
          internal_query: unbxd_query_pass
      }
    }
  }
  else if(type == "KEYWORD_SUGGESTION"){
     payload = {
      query: query,
      autosuggestParams: {
        autosuggest_type: 'KEYWORD_SUGGESTION',
        autosuggest_suggestion: query,
        field_name: 'KEYWORD_SUGGESTION',
        field_value: null,
        src_field: '',
        internal_query: unbxd_query_pass
      }
    }
    
  }


  // alert("Tracking updates")
  // console.log(payload , "123456")
  // if (window.Unbxd && typeof window.Unbxd.track === 'function') {
  //   window.Unbxd.track('search', payload)
  //   setTimeout(function () {
  //     window.Unbxd.conf['immediate'] = {};
  //     window.Unbxd.conf.immediate['click'] = true;    
  //     // window.Unbxd.track('search', payload)
  //     window.Unbxd.track('click', click_payload)
  //   },500)

  // } else {
  //   console.error('unbxdAnalytics.js is not loaded!');
  // }
  // if(type =="POPULAR_PRODUCTS"){
  //   if( window.Unbxd && typeof window.Unbxd.track === 'function'){
  //     // alert("click")
  //     console.log(click_payload , "click_payload")
  //     window.Unbxd.track('click', click_payload)
  //   }
  // }


}

  return (
    <div >
      {/* <input
             type="search"
             value={currentRefinement}
             onChange={event => refine(event.currentTarget.value)}
           /> */}

      {!showautocomp ?
        <div
          className='d-none d-sm-block d-md-block d-lg-block'
          style={{
            position: "absolute",
            marginTop: "0.5rem",
            zIndex: 100,
            borderRadius: "5px",
            backgroundColor: "#fff",
            // width: "27.5rem",
          }}
        >
          {/* {hits.map(hit => (
              <div className='searchInput' key={hit.book_id}>
                <div
                  onClick={() => {
                    window.location.assign(`/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                  }}
                  style={{ alignItems:"center",margin: 0, padding: "0.15rem 1rem",gap:"1rem" }}
                  className='searchDiv d-flex '>
                  
                  <img src={`https://d1f2zer3rm8sjv.cloudfront.net/${hit.thumb}`}
                  style={{width:"2rem",height:"2.5rem"}}
                     alt='Trending image'
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
            ))} */}
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
        :
        search_loader ?
          <MediaQuery minWidth={577}>
            <div className='searchInput shadow'
              style={{
                position: "absolute",
                marginTop: "0.5rem",
                zIndex: 100,
                borderRadius: "5px",
                backgroundColor: "#fff",
                minHeight: "30vh"
              }}><center><CircularProgress size={30} /></center></div>
          </MediaQuery>
          :
          Unbxd_AutoSuggest?.products?.length > 0 ?

            <div className='' style={{ display: "flex" }}>
              <MediaQuery minWidth={577}>
                <div ref={ref} className='mainAutoSugg shadow' style={{ display: "flex", position: "absolute", marginTop: "0.5rem", backgroundColor: "#fff", zIndex: 5, borderRadius: "0.5rem",maxHeight:"80vh",overflowY:"scroll",overflowX:"hidden" }}>
                  {Unbxd_AutoSuggest?.products?.some(item => item.doctype === "KEYWORD_SUGGESTION") || Unbxd_AutoSuggest?.products?.some(item => item.doctype === "IN_FIELD") ?
                    <div style={{ flex: 3, borderRight: "1px solid #ddd", marginTop: "1rem", }}>
                      {Unbxd_AutoSuggest?.products?.some(item => item.doctype === "KEYWORD_SUGGESTION") ?
                        <div style={{ marginBottom: "0.5rem", borderBottom: "1px solid #ddd", }}>
                          <div style={{ display: "flex", cursor: "pointer", alignItems: "flex-end", justifyContent: "space-between", padding: "0 1rem" }}>
                            <span style={{}}>
                              Suggested Searches
                            </span>
                          </div>
                          {Unbxd_AutoSuggest?.products?.map(hit => (
                            <div key={hit.book_id}>
                              {hit.doctype == "KEYWORD_SUGGESTION" ?
                                <div
                                  onClick={() => {
                                    // alert("hi")
                                    unbxd_tracking_api(hit.autosuggest , "KEYWORD_SUGGESTION" , "book")
                                    window.location.assign(`/search?value=${hit.autosuggest}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                                  }}
                                  style={{ alignItems: "center", margin: 0, padding: "0rem 1rem", gap: "1rem" }}
                                  className='searchDiv d-flex '>
                                  <p style={{
                                    margin: "0rem 0",
                                    padding: "0.25rem 0rem",
                                    textTransform: "capitalize",
                                    fontSize: "0.8rem",
                                    flex: "0.8",
                                  }}>{getHighlightedText(hit.autosuggest,value,25)}</p>
                                </div> : null
                              }

                            </div>
                          ))}


                        </div> : null
                      }

                      {Unbxd_AutoSuggest?.products?.some(item => item.doctype === "IN_FIELD") ?
                        <div style={{}}>
                          <div style={{ display: "flex", cursor: "pointer", alignItems: "flex-end", justifyContent: "space-between", padding: "0 1rem" }}>
                            <span style={{}}>
                              Categories
                            </span>
                          </div>
                          {Unbxd_AutoSuggest?.products?.filter(item => item.doctype === "IN_FIELD").slice(0, 3).map(hit => (
                            <div key={hit.book_id}>
                              <div
                                onClick={() => {
                                  // handleCategoryClick(hit.autosuggest)
                                  unbxd_tracking_api(hit.autosuggest , "IN_FIELD" , "book")

                                  window.location.assign(`/search?value=${hit.autosuggest}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                                }}
                                style={{ flexDirection: "column", margin: 0, padding: "0rem 1rem" }}
                                className='searchDiv d-flex '>
                                <span style={{
                                  margin: "0rem 0",
                                  padding: "0.15rem 0rem",
                                  textTransform: "capitalize",
                                  fontSize: "0.8rem",
                                  flex: "0.8",
                                }}>{getHighlightedText(hit.autosuggest,value,25)}</span>
                                {/* <span style={{ fontSize: "0.7rem", color: "#777" }}>in {hit.categoryPath2_in[0]}</span> */}
                              </div>

                            </div>
                          ))}


                        </div> : null
                      }
                    </div> : null
                  }
                  <div className='searchInput' style={{ flex: 6, height: "100%", paddingBottom: "0.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                        <div style={{ display: "flex", cursor: "pointer", alignItems: "flex-end", justifyContent: "space-between", padding: "0 1rem" }}>
                          <span style={{}}>
                            Results in Books <span style={{color:"#999",fontSize:"0.8rem"}}>({Unbxd_AutoSuggest.numberOfProducts})</span>
                          </span>
                          <span
                            onClick={() => {
                              window.location.assign(
                                `/search?value=${value}&t=book&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
                              );
                            }}
                            className={styles.viewAll} style={{ color: "#2258ae", fontSize: "0.85rem", display: "flex", alignItems: "center" }}>View All <ChevronRightIcon style={{ fontSize: "1rem" }} /></span>
                        </div>
                        {Unbxd_AutoSuggest?.products?.map(hit => (
                          <div key={hit.book_id}>
                            {hit.doctype == "POPULAR_PRODUCTS" ?
                              <div
                                onClick={() => {
                                  unbxd_tracking_api(hit.title , "POPULAR_PRODUCTS","book",hit.uniqueId)

                                  window.location.assign(`/product/${hit.title.split(" ").join("-")}-${hit.isbn?hit.isbn:""}?${hit.uniqueId}`);
                                }}
                                style={{ alignItems: "center", margin: 0, padding: "0.15rem 1rem", gap: "1rem" }}
                                className='searchDiv d-flex '>

                                {/* <img alt={hit.title} src={`${hit.imageUrl[0]}`}
                                  style={{ width: "2rem", height: "2.5rem" }} /> */}
                                  <Image alt={hit.title} src={`${hit.imageUrl[0]}`}   width={32}
                              height={40} priority  
                              // onError={(e) => {
                              //   // Handle image load errors by replacing the src attribute with a placeholder URL
                              //   e.target.src = "https://d1f2zer3rm8sjv.cloudfront.net/dumy%20book.png";
                              // }}    
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
                                  {getHighlightedText(hit.title,value,75)}

                                </p>

                              </div> : null
                            }
                          </div>
                        ))}
                      </div>
                      {Unbxd_AutoSuggest_author?.products?.filter(item => item.doctype === "POPULAR_PRODUCTS").length > 0 ?
                        <div style={{ marginBottom: "0.5rem", paddingTop: "0.5rem", borderTop: '1px solid #ddd' }}>
                          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 1rem" }}>
                            <span style={{}}>
                              Results in Authors <span style={{color:"#999",fontSize:"0.8rem"}}>({Unbxd_AutoSuggest_author.numberOfProducts})</span>
                            </span>
                            <span
                              onClick={() => {
                                window.location.assign(
                                  `/search?value=${value}&t=author&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
                                );
                              }}
                              className={styles.viewAll} style={{ color: "#2258ae", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center" }}>View All <ChevronRightIcon style={{ fontSize: "1rem" }} /></span>
                          </div>
                          <div className='row'>
                            {Unbxd_AutoSuggest_author?.products?.filter(item => item.doctype === "POPULAR_PRODUCTS").map(hit => (
                              <div className='col-6' key={hit.book_id}>
                                <div
                                  style={{ alignItems: "center", margin: 0, padding: "0rem 1rem", gap: "1rem", display: "flex" }}
                                  className='searchDiv '>

                                  <CallMadeIcon
                                    className='col-2'
                                    fontSize='small'
                                    onClick={() => {
                                      setValue(hit.title)
                                    }}
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
                                    onClick={() => {
                                      unbxd_tracking_api(hit.title , "POPULAR_PRODUCTS", "author",hit.uniqueId)

                                      window.location.assign(`/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                                    }}
                                    title={hit.title.replace(
                                      /(\w)(\w*)/g,
                                      (_, firstChar, rest) =>
                                        firstChar.toUpperCase() + rest.toLowerCase()
                                    )}
                                    key={hit.uniqueId}>
                                    {getHighlightedText(hit.title,value,15)}
                                  </p>

                                </div>
                              </div>
                            ))}
                          </div>
                        </div> : null
                      }

                      {Unbxd_AutoSuggest_pub?.products?.filter(item => item.doctype === "POPULAR_PRODUCTS").length > 0 ?
                        <div style={{ marginBottom: "0.5rem", paddingTop: "0.5rem", borderTop: '1px solid #ddd' }}>
                          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 1rem" }}>
                            <span style={{}}>
                              Results in Publication <span style={{color:"#999",fontSize:"0.8rem"}}>({Unbxd_AutoSuggest_pub.numberOfProducts})</span>
                            </span>
                            <span
                              onClick={() => {
                           

                                window.location.assign(
                                  `/search?value=${value}&t=publication&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
                                );
                              }}
                              className={styles.viewAll} style={{ color: "#2258ae", fontSize: "0.85rem", display: "flex", alignItems: "center", cursor: "pointer" }}>View All <ChevronRightIcon style={{ fontSize: "1rem" }} /></span>
                          </div>
                          <div className='row'>
                            {Unbxd_AutoSuggest_pub?.products?.filter(item => item.doctype === "POPULAR_PRODUCTS").map(hit => (
                              <div className='col-6' key={hit.book_id}>
                                <div
                                  style={{ alignItems: "center", margin: 0, padding: "0rem 1rem", gap: "1rem", display: "flex" }}
                                  className='searchDiv  '>
                                  <CallMadeIcon
                                    className='col-2'
                                    fontSize='small'
                                    onClick={() => {
                                      setValue(hit.title)
                                    }}
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
                                    title={hit.title.replace(
                                      /(\w)(\w*)/g,
                                      (_, firstChar, rest) =>
                                        firstChar.toUpperCase() + rest.toLowerCase()
                                    )}
                                    onClick={() => {
                                      unbxd_tracking_api(hit.title , "POPULAR_PRODUCTS", "publication",hit.uniqueId)

                                      window.location.assign(`/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                                    }}
                                    key={hit.uniqueId}>
                                    {getHighlightedText(hit.title,value,15)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div> : null}
                    </div>

                  </div>
                  {/* <div className='border-left' style={{flex:3,textAlign:"center",borderLeft:"1px solid #ddd"}}>
                Promotion
            </div> */}
                </div>
              </MediaQuery>

              <MediaQuery maxWidth={576}>
                <div className=' ' style={{ width: "100%", display: "flex", position: "absolute", marginTop: "0.25rem", backgroundColor: "#fff", zIndex: 5, borderRadius: "0.5rem" }}>
                  {/* <div style={{flex:3,textAlign:"center",borderRight:"1px solid #ddd"}}>
                Categories
            </div> */}
                  <div style={{ flex: 12, height: "100%", paddingBottom: "0.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                        <div style={{ display: "flex", cursor: "pointer", alignItems: "flex-end", justifyContent: "space-between", padding: "0 1rem" }}>
                          <span style={{}}>
                            Results in Books <span style={{color:"#999",fontSize:"0.8rem"}}>({Unbxd_AutoSuggest.numberOfProducts})</span>
                          </span>
                          <span
                            onClick={() => {
                      

                              window.location.assign(
                                `/search?value=${value}&t=book&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
                              );
                            }}
                            className={styles.viewAll} style={{ color: "#2258ae", fontSize: "0.85rem", display: "flex", alignItems: "center" }}>View All <ChevronRightIcon style={{ fontSize: "1rem" }} /></span>
                        </div>
                        {Unbxd_AutoSuggest?.products?.map(hit => (
                          <div key={hit.book_id}>
                            {hit.doctype == "POPULAR_PRODUCTS" ?
                              <div
                              
                                onClick={() => {
                                  unbxd_tracking_api(value , "POPULAR_PRODUCTS",hit.uniqueId)

                                  window.location.assign(`/product/${hit.title.split(" ").join("-")}-${hit.isbn?hit.isbn:""}?${hit.uniqueId}`);

                                  // window.location.assign(`/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                                }}
                                style={{ alignItems: "center", margin: 0, padding: "0.15rem 1rem", gap: "1rem" }}
                                className='searchDiv d-flex '>

                                <img src={`${hit.imageUrl[0]}`}
                                  alt='Trending image'
                                  style={{ width: "2rem", height: "2.5rem" }} />
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
                                  {getHighlightedText(hit.title,value,75)}

                                </p>

                              </div> : null
                            }
                          </div>
                        ))}
                      </div>
                      {Unbxd_AutoSuggest_author?.products?.filter(item => item.doctype === "POPULAR_PRODUCTS").length > 0 ?
                        <div style={{ marginBottom: "0.5rem", paddingTop: "0.5rem", borderTop: '1px solid #ddd' }}>
                          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 1rem" }}>
                            <span style={{}}>
                              Results in Authors <span style={{color:"#999",fontSize:"0.8rem"}}>({Unbxd_AutoSuggest_author.numberOfProducts})</span>
                            </span>
                            <span
                              onClick={() => {
                              

                                window.location.assign(
                                  `/search?value=${value}&t=author&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
                                );
                              }}
                              className={styles.viewAll} style={{ color: "#2258ae", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center" }}>View All <ChevronRightIcon style={{ fontSize: "1rem" }} /></span>
                          </div>
                          <div className='row'>
                            {Unbxd_AutoSuggest_author?.products?.filter(item => item.doctype === "POPULAR_PRODUCTS").map(hit => (
                              <div className='col-6' key={hit.book_id}>
                                <div
                                  style={{ alignItems: "center", margin: 0, padding: "0rem 1rem", gap: "1rem", display: "flex" }}
                                  className='searchDiv '>

                                  <CallMadeIcon
                                    className='col-2'
                                    fontSize='small'
                                    onClick={() => {
                                      setValue(hit.title)
                                    }}
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
                                    onClick={() => {
                                      unbxd_tracking_api(hit.title , "POPULAR_PRODUCTS","author",hit.uniqueId)

                                      window.location.assign(`/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                                    }}
                                    title={hit.title.replace(
                                      /(\w)(\w*)/g,
                                      (_, firstChar, rest) =>
                                        firstChar.toUpperCase() + rest.toLowerCase()
                                    )}
                                    key={hit.uniqueId}>
                                    {getHighlightedText(hit.title,value,15)}
                                  </p>

                                </div>
                              </div>
                            ))}
                          </div>
                        </div> : null
                      }

                      {Unbxd_AutoSuggest_pub?.products?.filter(item => item.doctype === "POPULAR_PRODUCTS").length > 0 ?
                        <div style={{ marginBottom: "0.5rem", paddingTop: "0.5rem", borderTop: '1px solid #ddd' }}>
                          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 1rem" }}>
                            <span style={{}}>
                              Results in Publication <span style={{color:"#999",fontSize:"0.8rem"}}>({Unbxd_AutoSuggest_pub.numberOfProducts})</span>
                            </span>
                            <span
                              onClick={() => {

                                window.location.assign(
                                  `/search?value=${value}&t=publication&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
                                );
                              }}
                              className={styles.viewAll} style={{ color: "#2258ae", fontSize: "0.85rem", display: "flex", alignItems: "center", cursor: "pointer" }}>View All <ChevronRightIcon style={{ fontSize: "1rem" }} /></span>
                          </div>
                          <div className='row'>
                            {Unbxd_AutoSuggest_pub?.products?.filter(item => item.doctype === "POPULAR_PRODUCTS").map(hit => (
                              <div className='col-6' key={hit.book_id}>
                                <div
                                  style={{ alignItems: "center", margin: 0, padding: "0rem 1rem", gap: "1rem", display: "flex" }}
                                  className='searchDiv  '>
                                  <CallMadeIcon
                                    className='col-2'
                                    fontSize='small'
                                    onClick={() => {
                                      setValue(hit.title)
                                    }}
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
                                    title={hit.title.replace(
                                      /(\w)(\w*)/g,
                                      (_, firstChar, rest) =>
                                        firstChar.toUpperCase() + rest.toLowerCase()
                                    )}
                                    onClick={() => {
                                      unbxd_tracking_api(hit.title , "POPULAR_PRODUCTS","publication",hit.uniqueId)

                                      window.location.assign(`/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                                    }}
                                    key={hit.uniqueId}>
                                    {getHighlightedText(hit.title,value,15)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div> : null}

                      {Unbxd_AutoSuggest?.products?.some(item => item.doctype === "KEYWORD_SUGGESTION") || Unbxd_AutoSuggest?.products?.some(item => item.doctype === "IN_FIELD") ?
                        <div style={{ flex: 3, paddingTop: "0.5rem", borderTop: '1px solid #ddd' }}>
                          {Unbxd_AutoSuggest?.products?.some(item => item.doctype === "KEYWORD_SUGGESTION") ?
                            <div style={{ marginBottom: "0.5rem", borderBottom: "1px solid #ddd", }}>
                              <div style={{ display: "flex", cursor: "pointer", alignItems: "flex-end", justifyContent: "space-between", padding: "0 1rem" }}>
                                <span style={{}}>
                                  Suggested Searches
                                </span>
                              </div>
                              {Unbxd_AutoSuggest?.products?.map(hit => (
                                <div key={hit.book_id}>
                                  {hit.doctype == "KEYWORD_SUGGESTION" ?
                                    <div
                                      onClick={() => {
                                        alert("uhi")
                                        unbxd_tracking_api(hit.autosuggest , "KEYWORD_SUGGESTION","book")

                                        window.location.assign(`/search?value=${hit.autosuggest}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                                      }}
                                      style={{ alignItems: "center", margin: 0, padding: "0rem 1rem", gap: "1rem" }}
                                      className='searchDiv d-flex '>
                                      <p style={{
                                        margin: "0rem 0",
                                        padding: "0.25rem 0rem",
                                        textTransform: "capitalize",
                                        fontSize: "0.8rem",
                                        flex: "0.8",
                                      }}>{getHighlightedText(hit.autosuggest,value,25)}</p>
                                    </div> : null
                                  }

                                </div>
                              ))}


                            </div> : null
                          }

                          {Unbxd_AutoSuggest?.products?.some(item => item.doctype === "IN_FIELD") ?
                            <div style={{}}>
                              <div style={{ display: "flex", cursor: "pointer", alignItems: "flex-end", justifyContent: "space-between", padding: "0 1rem" }}>
                                <span style={{}}>
                                  Categories
                                </span>
                              </div>
                              {Unbxd_AutoSuggest?.products?.filter(item => item.doctype === "IN_FIELD").slice(0, 3).map(hit => (
                                <div key={hit.book_id}>
                                  <div
                                    onClick={() => {
                                      unbxd_tracking_api(hit.autosuggest , "IN_FIELD","book")

                                      window.location.assign(`/search?value=${hit.autosuggest}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
                                    }}
                                    style={{ flexDirection: "column", margin: 0, padding: "0rem 1rem" }}
                                    className='searchDiv d-flex '>
                                    <span style={{
                                      margin: "0rem 0",
                                      padding: "0.15rem 0rem",
                                      textTransform: "capitalize",
                                      fontSize: "0.8rem",
                                      flex: "0.8",
                                    }}>{getHighlightedText(hit.autosuggest,value,25)}</span>
                                    {/* <span style={{ fontSize: "0.7rem", color: "#777" }}>in {hit.categoryPath2_in[0]}</span> */}
                                  </div>

                                </div>
                              ))}


                            </div> : null
                          }
                        </div> : null
                      }
                    </div>

                  </div>
                  {/* <div className='border-left' style={{flex:3,textAlign:"center",borderLeft:"1px solid #ddd"}}>
                Promotion
            </div> */}
                </div>
              </MediaQuery>
            </div> : null

      }

      {/* {currentRefinement.length > 0 ? (
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
        ) : null} */}
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
            .mainAutoSugg {
              -ms-overflow-style: none;  /* Internet Explorer 10+ */
              scrollbar-width: none;  /* Firefox */
            }
            .mainAutoSugg::-webkit-scrollbar { 
                display: none;  /* Safari and Chrome */
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

const mapStateToProps = state => {
  return {
    Unbxd_AutoSuggest: state.unboxReducer.Unbxd_AutoSuggest,
    Unbxd_AutoSuggest_author: state.unboxReducer.Unbxd_AutoSuggest_author,
    Unbxd_AutoSuggest_pub: state.unboxReducer.Unbxd_AutoSuggest_pub,
    unbxd_query_pass:state.unboxReducer.unbxd_query_pass,
  };
};
export default connect(mapStateToProps, {
  unbox_Search
})(withSnackbar(TrendingSearch));
