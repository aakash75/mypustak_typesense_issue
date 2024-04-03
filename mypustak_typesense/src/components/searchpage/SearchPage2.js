import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/SearchPage.module.css"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dynamic from "next/dynamic";
import MediaQuery from "react-responsive";
import SearchStyles from "../../styles/SearchPage.module.css"


import InfiniteScroll from "react-infinite-scroll-component";
import {
  Configure,
  connectAutoComplete,
  connectSearchBox,
  connectStateResults,
  connectStats,
  Hits,
} from "react-instantsearch";
import { connectInfiniteHits } from "react-instantsearch";
import qs from "qs";
import SearchIcon from "@mui/icons-material/Search";
import CallMadeIcon from "@mui/icons-material/CallMade";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useDetectClickOutside } from "react-detect-click-outside";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import Router, { useRouter } from "next/router";
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { connect } from "react-redux";
import { GetTrackingUrl } from "../../redux/actions/trackingurlaction";
import {
  CheckUserExistance,
  LoginCheck,
  setComponentStatus,
  signupCheck,
} from "../../redux/actions/loginactions";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { InstantSearch } from "react-instantsearch";
import { fetch_wishlist_detail_otherpage } from "../../redux/actions/loginactions";
import {
  CLUSTERHOST,
  INSTANTSEARCHAPIKEY,
  INSTANTSEARCHSCHEMA,
  logout,
  Unbxd,
  usePrevious,
} from "../../helper/helpers";
const BookCard = dynamic(() => import("../bookcard/BookCard"), { ssr: false });
import BookCardSkeleton from "../bookcard/BookCardSkeleton";

import Loader from "../loader/Loader";
import MobileDetect from "mobile-detect";
import { unbox_Search, unbxd_filter_search,filter_applied_action } from "../../redux/actions/unboxAction";
import UnbxdFilter from "../UnbxdFilter";
import AuthorCard from "../AuthorCard";
import PublicationCard from "../PublicationCard";
import BookCardUnbxd from "../bookcard/BookCardUnbxd";




function SearchPage2(props) {
  const [viewallFilter, setviewallFilter] = useState(false)
  const [filterindex, setfilterindex] = useState(null)
  const [groupedFilters, setgroupedFilters] = useState({})
  const [FilterDrawer, setFilterDrawer] = useState(false);
  const [SortbyDrawer, setSortbyDrawer] = useState(false);
  const [initialLoader, setinitialLoader] = useState(true)
  const [value, setvalue] = useState("");
  const [shrinkedFilter, setshrinkedFilter] = useState([])
  const [priceFilterValue, setpriceFilterValue] = useState([])
  const [priceMin, setpriceMin] = useState("")
  const [priceMax, setpriceMax] = useState("")

  const [page, setpage] = useState(0)

  const handlefilterClick = (f) => {
    if (shrinkedFilter.includes(f.facetName)) {
      setshrinkedFilter((prevFilter) => prevFilter.filter((name) => name !== f.facetName));
    } else {
      setshrinkedFilter((prevFilter) => [...prevFilter, f.facetName]);
    }
  };

  // React.useEffect(() =>  {
  //   setTimeout(function() {
  //     if (window.innerWidth < 768) {

 
  //       // console.log(window);
  //       console.log(window.Unbxd , "window.Unbxd")

  //       console.log('This is a mobile device or a narrow viewport.');
  //       if(window.Unbxd){
  //         console.log("window.Unbxd  unbxdwindow" , window.Unbxd)
  //         if (!window.Unbxd.conf) {
  //           window.Unbxd.conf = {};
  //       }
  //       if (!window.Unbxd.conf.immediate) {
  //           window.Unbxd.conf.immediate = {};
  //       }
       
  //           window.Unbxd.conf['immediate'] = {};
  //           window.Unbxd.conf.immediate['click'] = false
  //           window.Unbxd.conf.immediate['cart'] = false
  
  
  //           console.log( window.Unbxd.conf['immediate'] , "unbxdwindow")
  //           }
  
  //           else{
  //             console.log( "unbxdwindow is not available")
  //           }
  //     }
  //   }, 2000);
  
 
  //     // Your mobile-only script logic
     

      


  // }, []);



  useEffect(() => {
    // Perform any necessary actions when shrinkedFilter updates
    console.log('shrinkedFilter updated:', shrinkedFilter);
  }, [shrinkedFilter]);
  const [sortBy, setsortBy] = useState('')

  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("value");

    console.log(Router.query.sortBy.split(","),"Router.query")
    if(Router.query.sortBy.split(",")[1]){
      setsortBy(Router.query.sortBy.split(",")[1])
    }
    let body = {
      uid:Unbxd.readCookie(Unbxd.cookies.userId),
      page:0,
      rows:12,
      type:"book",
      sortBy:Router.query.sortBy.split(",")[1]?.split(":")[0]=="i_date"?"iDate":Router.query.sortBy.split(",")[1]?.split(":")[0]=="new_pricing"?"price":"",
      arrangeBy:Router.query.sortBy.split(",")[1]?.split(":")[1]?Router.query.sortBy.split(",")[1]?.split(":")[1]:"",
    }

    let author_body = {
      uid:Unbxd.readCookie(Unbxd.cookies.userId),
      page:0,
      rows:12,
      type:"author"
    }

    let publication_body = {
      uid:Unbxd.readCookie(Unbxd.cookies.userId),
      page:0,
      rows:12,
      type:"publication",

    }
    console.log(props.isFilterApplied , "filterApplied")
    if(filterApplied.length == 0){
      if(Router.query.t=="publication"){
        props.unbox_Search(name,publication_body).then(res => {
          setinitialLoader(false)
        })
        .catch(err => {
          setinitialLoader(false)
        })
      }
      else if(Router.query.t=="author"){
        props.unbox_Search(name,author_body).then(res => {
          setinitialLoader(false)
        })
        .catch(err => {
          setinitialLoader(false)
        })
      }
      else {
        // setpriceMin(res.response.stats.price.min)
        // setpriceMax(res.response.stats.price.max)

        // setinitialLoader(false)
        console.log("search filter api 156",filterApplied , props.is_unbxd_filter)
        if(! props.is_unbxd_filter){
        console.log("hiting search filter api 11" ,filterApplied , props.is_unbxd_filter)

          props.unbox_Search(name,body).then(res => {
            console.log(res.response.stats,"unbox_Search");
            setpriceMin(res.response.stats.price.min)
            setpriceMax(res.response.stats.price.max)
  
            setinitialLoader(false)
          })
          .catch(err => {
            setinitialLoader(false)
          })
        }
        else{
          toggle_loader(false)
          // setinitialLoader(false)

        }
      }
    }


    console.log(props.Unbxd_AutoSuggest,"Unbxd_AutoSuggest");
    setvalue(name);
    let rtl = Router.query.ret;
    setqueryString = rtl;
    props.fetch_wishlist_detail_otherpage();
    if (props.userComponentStatus != 2) {
      // props.updateCartlocalStorage();
    }
    props.setComponentStatus(1);
  }, []);
  
  let [queryString, setqueryString] = useState("");
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const [filterApplied, setfilterApplied] = useState([])
  const debouncedSetStateRef = useRef(null);

  const checkFilterAplied = (filter,priceFilter) => {
    console.log(filter , "182 checkFilterAplied search filter api ")
    setfilterApplied(filter)
    setpriceFilterValue(priceFilter)
  }
  const toggle_loader = (loader_state) => {
    setinitialLoader(loader_state)
  }
  const handleSortBy = (sortBy,arrangeBy,routeBy) => {
    let author = Router.query.author
    let publication = Router.query.publication
    let binding = Router.query.binding
    let language = Router.query.language
    let book_condition = Router.query.book_condition
    let aged_group = Router.query.aged_group
    let availability = Router.query.availability ? Router.query?.availability.split(",") : ""
    let bookType = Router.query?.book_type ? Router.query?.book_type.split(",") : ""
    let price = Router.query?.price ? Router.query?.price : null

    // alert("215")
    props.filter_applied_action(true)

    // if(author.length >1|| publication.length >1 || language.length >1 || binding.length >1|| book_condition.length>1 ||bookType.length > 1 || availability.length >0 || aged_group.length > 1 )
    // {
    //   // alert('filter applied')
    //   props.filter_applied_action(true)
    // }
    // else{
    //   props.filter_applied_action(false)
    // }

    if(routeBy){
      
      Router.push(`?value=${encodeURIComponent(Router.query.value)}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,${routeBy}&author=${author}&publication=${publication}&binding=${binding}&language=${language}&book_condition=${book_condition}&aged_group=${aged_group}&book_type=${bookType}&availability=N${price?"&price="+price:""}`, undefined, {
        shallow: true,
        scroll: false,
      })
    }
    else{
      Router.push(`?value=${encodeURIComponent(Router.query.value)}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=${author}&publication=${publication}&binding=${binding}&language=${language}&book_condition=${book_condition}&aged_group=${aged_group}&book_type=${bookType}&availability=N${price?"&price="+price:""}`, undefined, {
        shallow: true,
        scroll: false,
      })
    }


  }


  return <>
    {
  initialLoader?
  <Loader />:
  // props.Unbxd_products.length>0?
  true?

  <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
      <div
          className='row g-0 '
          style={{ marginTop: "1rem", justifyContent: "center"}}>
          {/* Filter Div for Web Start*/}
            {Router.query.t=="author"||Router.query.t=="publication"?null:
            <div className={`${SearchStyles.filterDivNew}  col-sm-4 col-md-3  col-lg-2`}>
              <UnbxdFilter priceMin={priceMin} priceMax={priceMax} checkFilterAplied={checkFilterAplied} Unbxd_data={props.Unbxd_data} toggle_loader = {toggle_loader}/>
            </div>
            }
          {/* Filter Div for Web End*/}

            <div className=' col-12 col-sm-6 col-md-8 col-lg-9'>
          {/* Sort By for Web Start*/}
          <MediaQuery minWidth={577}>
          {props.Unbxd_products.length>0? Router.query.t=="publication"||Router.query.t=="author"?null:
              <div
                className=''
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 100,
                  backgroundColor: "#fff",
                  display:"flex",
                  gap:"1rem",
                  fontSize:"0.9rem",
                  padding: "0.5rem",
                  borderTop:"1px solid #ddd",
                  borderLeft:"1px solid #ddd",
                  borderRight:"1px solid #ddd"
                  
                }}>
                <b>
                SortBy
                </b>

                <b 
                onClick={() => {
                  handleSortBy()
                }}
                style={{cursor:"pointer",color:sortBy==""?"#2248ae":null,borderBottom:sortBy==""?"2px solid #2248ae":null}}>
                Relevance
                </b>

                <b 
                onClick={() => {
                  handleSortBy("iDate","desc","i_date:desc")
                }}
                style={{cursor:"pointer",color:sortBy=="i_date:desc"?"#2248ae":null,borderBottom:sortBy=="i_date:desc"?"2px solid #2248ae":null}}>
                Newest First
                </b>

                <b 
                onClick={() => {
                  handleSortBy("iDate","asc","i_date:asc")
                }}
                style={{cursor:"pointer",color:sortBy=="i_date:asc"?"#2248ae":null,borderBottom:sortBy=="i_date:asc"?"2px solid #2248ae":null}}>
                  Oldest First
                </b>

                <b 
                onClick={() => {
                  handleSortBy("price","desc","new_pricing:asc")
                }}
                style={{cursor:"pointer",color:sortBy=="new_pricing:asc"?"#2248ae":null,borderBottom:sortBy=="new_pricing:asc"?"2px solid #2248ae":null}}>
                Price -- Low to High
                </b>

                <b 
                onClick={() => {
                  handleSortBy("price","desc","new_pricing:desc")
                }}
                style={{cursor:"pointer",color:sortBy=="new_pricing:desc"?"#2248ae":null,borderBottom:sortBy=="new_pricing:desc"?"2px solid #2248ae":null}}>
                Price -- High to Low
                </b>

                
              </div>
          :null}
          </MediaQuery>
          {/* Sort By for Web End*/}
          {/* Mobile Filters and Sortby and drawer start*/}
              <MediaQuery maxWidth={576}>
              {Router.query.t=="publication"||Router.query.t=="author"?null:
                    <div
                      style={{
                        position: "sticky",
                        top: 50,
                        zIndex: 100,
                        backgroundColor: "#fff",
                      }}
                      className='d-flex'>
                      <Button size='small' style={{ padding: "5px", width: '50%', textTransform: 'capitalize' }} variant='' onClick={() => {
                        setSortbyDrawer(true)
                      }}><FilterListIcon style={{ color: '#444' }} /> Sort By</Button>
                      <Drawer
                        anchor='bottom'
                        open={SortbyDrawer}

                        onClose={() => {
                          // if(urltopush){
                          //   router.push(urltopush,undefined,{scroll:false})
                          // }else{
                          //   window.location.reload()

                          // }
                          setSortbyDrawer(false);
                        }}>
                        <div style={{ display:"flex",flexDirection:"column"}}>
                          
                            <b style={{padding:"0.5rem 0.5rem"}}>Sort By:</b>
                            
                            <span 
                          onClick={() => {
                            handleSortBy()
                          }}
                          style={{cursor:"pointer",padding:"0.5rem",color:sortBy==""?"#fff":"#000",backgroundColor:sortBy==""?"#2248ae":null,borderBottom:sortBy==""?"2px solid #2248ae":null}}>
                          Relevance
                          </span>

                          <span 
                          onClick={() => {
                            handleSortBy("iDate","desc","i_date:desc")
                          }}
                          style={{cursor:"pointer",padding:"0.5rem",color:sortBy=="i_date:desc"?"#fff":"#000",backgroundColor:sortBy=="i_date:desc"?"#2248ae":null,borderBottom:sortBy=="i_date:desc"?"2px solid #2248ae":null}}>
                          Newest First
                          </span>

                          <span 
                          onClick={() => {
                            handleSortBy("iDate","asc","i_date:asc")
                          }}
                          style={{cursor:"pointer",padding:"0.5rem",color:sortBy=="i_date:asc"?"#fff":"#000",backgroundColor:sortBy=="i_date:asc"?"#2248ae":null,borderBottom:sortBy=="i_date:asc"?"2px solid #2248ae":null}}>
                            Oldest First
                          </span>

                          <span 
                          onClick={() => {
                            handleSortBy("price","desc","new_pricing:asc")
                          }}
                          style={{cursor:"pointer",padding:"0.5rem",color:sortBy=="new_pricing:asc"?"#fff":'#000',backgroundColor:sortBy=="new_pricing:asc"?"#2248ae":null,borderBottom:sortBy=="new_pricing:asc"?"2px solid #2248ae":null}}>
                          Price -- Low to High
                          </span>

                          <span 
                          onClick={() => {
                            handleSortBy("price","desc","new_pricing:desc")
                          }}
                          style={{cursor:"pointer",padding:"0.5rem",color:sortBy=="new_pricing:desc"?"#fff":"#000",backgroundColor:sortBy=="new_pricing:desc"?"#2248ae":null,borderBottom:sortBy=="new_pricing:desc"?"2px solid #2248ae":null}}>
                          Price -- High to Low
                          </span>

                            
                          {/* <Button
                            onClick={() => {
                              
                              setSortbyDrawer(false);
                            }}
                            fullWidth
                            variant='contained'
                            style={{
                              justifySelf: "flex-end",
                              textTransform: "capitalize",
                              background:
                                "linear-gradient(90deg, #2157ad 0%, #6190da 100%)",
                            }}>
                            Apply SortBy
                          </Button> */}
                        </div>
                      </Drawer>
                      <div style={{ borderLeft: "1px solid #000" }}></div>
                      <Button size='small' style={{ padding: "5px", width: '50%', textTransform: 'capitalize', }} variant='' onClick={() => {
                        setFilterDrawer(true)
                      }}><FilterAltIcon style={{ color: '#444' }} /> Filters</Button>
                      <Drawer
                        anchor='right'
                        open={FilterDrawer}
                        PaperProps={{
                          sx: { width: "75%" },
                        }}

                        onClose={() => {
                          // if(urltopush){
                          //   // alert(urltopush)
                          //   window.location.assign(urltopush,undefined,{scroll:false})
                          // }else{
                          //   // alert(urltopush)
                          //   window.location.reload()
                          setFilterDrawer(false);
                          // }
                        }}>
                        <UnbxdFilter priceMin={priceMin} priceMax={priceMax} checkFilterAplied={checkFilterAplied} Unbxd_data={props.Unbxd_data} toggle_loader ={toggle_loader}/>
                      </Drawer>
                    </div>
              }
              </MediaQuery>
          {/* Mobile Filters and Sortby and drawer end*/}
              {/* Search div start */}
              <div  style={{ borderTop: "1px solid #ddd" }}>
                {/* <CustomSearchHits /> */}
           {   props.Unbxd_products.length>0?   <InfiniteScroll
              className="search-page"
                next={() => {
                  const queryParams = new URLSearchParams(window.location.search);
                  const name = queryParams.get("value");
                  let price = Router.query.price?Router.query.price.split(",").join(" TO "):null
                  if(filterApplied.length>0 || priceFilterValue.length>0){
                    let body= {
                      uid: Unbxd.readCookie(Unbxd.cookies.userId),
                      page:page+1,
                      rows: 12,
                      filter: filterApplied,
                      priceFilter:price,
                      type:Router.query.t?Router.query.t:"book",
                      
                      sortBy:Router.query.sortBy.split(",")[1]?.split(":")[0]=="i_date"?"iDate":Router.query.sortBy.split(",")[1]?.split(":")[0]=="new_pricing"?"price":"",
                      arrangeBy:Router.query.sortBy.split(",")[1]?.split(":")[1]?Router.query.sortBy.split(",")[1]?.split(":")[1]:"",
                    }
                    let category_filter =  Router.query?.category?.replaceAll("_","&")?.split(',')
                    if(category_filter)
                    {body["category-filter"] = category_filter}

                    setpage(page+1)

                    props.unbxd_filter_search(name,body)
                  }
                  else{
                    let body = {
                          uid:Unbxd.readCookie(Unbxd.cookies.userId),
                          page:page+1,
                          rows:12,
                          type:Router.query.t?Router.query.t:"book",
                          sortBy:Router.query.sortBy.split(",")[1]?.split(":")[0]=="i_date"?"iDate":Router.query.sortBy.split(",")[1]?.split(":")[0]=="new_pricing"?"price":"",
                          arrangeBy:Router.query.sortBy.split(",")[1]?.split(":")[1]?Router.query.sortBy.split(",")[1]?.split(":")[1]:"",
                        }
                        props.unbox_Search(name,body)
                        setpage(page+1)
                    
                  }
                }}
                dataLength={props.Unbxd_products.length}
                scrollThreshold='70%'
                hasMore={props.Unbxd_products.length<props.Unbxd_data.response.numberOfProducts?true:false}
                // hasMore={true}
                loader={
                  <div
                    style={{
                      // marginLeft: "50%",
                      // width: "70%",

                      marginBottom: "10%",
                    }}>
                    {true ? (
                      <div>
                        <div className='row g-0'>
                          <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
                            <BookCardSkeleton />
                          </div>
                          <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
                            <BookCardSkeleton />
                          </div>
                          <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
                            <BookCardSkeleton />
                          </div>

                          <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
                            <BookCardSkeleton />
                          </div>
                        </div>
                        <center>
                          <i className='p' style={{ textAlign: "center" }}>
                            Hang on! Loading content
                          </i>
                        </center>
                      </div>
                    ) : null}
                  </div>
                }>
                <div
                  style={{
                    overflowX: "hidden",
                    minWidth: "100%",
                    borderLeft: "1px solid #ddd",
                    borderRight: "1px solid #ddd",
                    backgroundColor:"#fff"
                  }}
                  className='row g-0'>
                  {props.Unbxd_products.filter((data) => {return data.type == "book"})?.map(aD => (
                    <div key={aD.bookId} className='col-6 col-xs-5 col-sm-12 col-md-6 col-lg-3'>
                      <BookCardUnbxd
                        Booktitle={aD.title}
                        book={aD}
                        price={aD.mrp}
                        categories={aD.author != "na" ? aD.author : aD.publication}
                        image={aD.imageUrl[0]}
                      />
                      {/* <span>{aD.title}</span> */}
                    </div>
                    // <p key={aD.book_id}>{aD.title},{aD.is_out_of_stack}</p>
                  ))}
                  {props.Unbxd_products.filter((data) => {return data.type == "author"})?.map(aD => (
                    <div key={aD.bookId} className='col-6 col-sm-12 col-md-6 col-lg-3'>
                      <AuthorCard
                        Booktitle={aD.title}
                        book={aD}
                        // price={aD.price}
                        // categories={aD.author != "na" ? aD.author : aD.publication}
                        image={aD.imageUrl[0]}
                      />
                      {/* <span>{aD.title}</span> */}
                    </div>
                    // <p key={aD.book_id}>{aD.title},{aD.is_out_of_stack}</p>
                  ))}

                  {props.Unbxd_products.filter((data) => {return data.type == "publication"})?.map(aD => (
                    <div key={aD.bookId} className='col-6 col-sm-12 col-md-6 col-lg-3'>
                      <PublicationCard
                        Booktitle={aD.title}
                        book={aD}
                        // price={aD.price}
                        // categories={aD.author != "na" ? aD.author : aD.publication}
                        image={aD.imageUrl[0]}
                      />
                      {/* <span>{aD.title}</span> */}
                    </div>
                    // <p key={aD.book_id}>{aD.title},{aD.is_out_of_stack}</p>
                  ))}
                </div>
              </InfiniteScroll>:<div>  
               <center
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "88vh",
                    zIndex: "100",
                    backgroundColor: "#fff",
                    // position: "absolute",
                    // marginTop: "rem",
                  }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "8rem",
                    }}>
                    <span style={{ fontSize: "1.8rem" }}>
                      Oops! No results found.
                    </span>
                    <p style={{ fontSize: "1.6rem", color: "#555" }}>
                      Please check the spelling or try searching for something else
                    </p>
                  </div>
                  </center></div>}
                
              </div>
              {/* Search div end */}
            </div>
      </div>
      </div>
      
    <style jsx>
      {`
    input::placeholder {
      font-size: 0.8rem;
      padding: 0.5rem;
    }        
      `}
    </style>
  </div>:null
  // <div>
  //   <div className='row g-0 '>

  //             <UnbxdFilter priceMin={priceMin} priceMax={priceMax} checkFilterAplied={checkFilterAplied} Unbxd_data={props.Unbxd_data} toggle_loader = {toggle_loader}/>
  //   </div>

  // <center
  // style={{
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   minHeight: "88vh",
  //   zIndex: "100",
  //   backgroundColor: "#fff",
  //   // position: "absolute",
  //   marginTop: "-1rem",
  // }}>
  // <div
  //   style={{
  //     display: "flex",
  //     flexDirection: "column",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     marginBottom: "8rem",
  //   }}>
  //   <span style={{ fontSize: "1.8rem" }}>
  //     Oops! No results found.
  //   </span>
  //   <p style={{ fontSize: "1.6rem", color: "#555" }}>
  //     Please check the spelling or try searching for something else
  //   </p>
  // </div>
  // </center>
  // </div>

    }
    <Dialog
        open={viewallFilter}
        keepMounted
        onClose={() => {setviewallFilter(false)}}
        maxWidth='md'
        fullWidth
        aria-describedby='alert-dialog-slide-description'>
        <DialogTitle style={{border:"1px solid #ddd",fontSize:"1rem",marginBottom:"0.5rem"}}>
          <span>{props.Unbxd_data?.facets?.text?.list[filterindex]?.displayName}</span>
        </DialogTitle>
        <DialogContent
          style={{
            // paddingTop: 0,
            // paddingBottom: 0,
            maxHeight:"30vh",
            maxWidth: "100%",
            overflowX: "hidden",
          }}>
          <div className='d-flex' style={{gap:"1rem"}}>
          {Object.entries(groupedFilters).map((v,index) => (
            <div key={index} className="d-flex" style={{maxHeight:"30vh",flexWrap:"wrap",flexDirection:"column",fontSize:"0.85rem",margin:"0.5rem 0"}}>
            <b>{v[0]}</b>
            <div className="d-flex" style={{flexDirection:'column'}}>
            {v[1].map((att,index) => (
            <div key ={index}  style={{display:"flex",alignItems:"center",gap:"0.25rem"}}>
            <input type="checkbox"/>
            <span style={{fontSize:"0.85rem",textTransform:"capitalize"}}>
            {att.replace(
                  /(\w)(\w*)/g,
                  (_, firstChar, rest) =>
                    firstChar.toUpperCase() + rest.toLowerCase()
                )}
            </span>
            </div>
            ))}
            </div>
            {/* {typeof(v)=="string"?
          <span className="d-flex" style={{gap:"0.25rem",alignItems:"center",textTransform:"capitalize"}}><input type="checkbox"/>{
            v.length>20?v.replace(
                  /(\w)(\w*)/g,
                  (_, firstChar, rest) =>
                    firstChar.toUpperCase() + rest.toLowerCase()
                ).substring(0, 20)
                  .concat("..."):
                  v.replace(
                  /(\w)(\w*)/g,
                  (_, firstChar, rest) =>
                    firstChar.toUpperCase() + rest.toLowerCase()
                )
                }</span>:null} */}
            </div>
          ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" style={{textTransform:"capitalize"}}>Apply Filters</Button>
        </DialogActions>
      </Dialog>
  </>;
}
const mapStateToProps = state => {
  return {
    getuserdetails: state.loginReducer.getuserdetails,
    cartDetails: state.cartReduc.MyCart,
    userComponentStatus: state.loginReducer.userComponentStatus,
    SuggestionData: state.productsuggestionreducer.SuggestionData,
    PopupCart: state.cartReduc.PopupCart,
    userToken: state.accountR.token,
    Unbxd_data: state.unboxReducer.Unbxd_data,
    Unbxd_AutoSuggest: state.unboxReducer.Unbxd_AutoSuggest,
    Unbxd_products:state.unboxReducer.Unbxd_products,
    is_unbxd_filter:state.unboxReducer.is_unbxd_filter,
    search_global_loader:state.unboxReducer.search_global_loader

  };
};

const mapDispatchToProps = dispatch => {
  return {
    GetTrackingUrl: body => dispatch(GetTrackingUrl(body)),
    CheckUserExistance: body => dispatch(CheckUserExistance(body)),
    signupCheck: body => dispatch(signupCheck(body)),
    LoginCheck: body => dispatch(LoginCheck(body)),
    fetch_wishlist_detail_otherpage: () =>
      dispatch(fetch_wishlist_detail_otherpage()),
    setComponentStatus: () => dispatch(setComponentStatus()),
    unbox_Search: (value,body) => dispatch(unbox_Search(value,body)),
    unbxd_filter_search: (value,body) => dispatch(unbxd_filter_search(value,body)),
    filter_applied_action: (appiled_filter) => dispatch(filter_applied_action(appiled_filter)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage2);
