import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader';
import { connect } from 'react-redux';
import styles from "../../styles/FreeBook.module.css"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { unbox_Search, unbxd_category_search } from '../../redux/actions/unboxAction';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dynamic from "next/dynamic";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetch_wishlist_detail_otherpage, setComponentStatus } from '../../redux/actions/accountAction';
import BookCardSkeleton from '../bookcard/BookCardSkeleton';
import BookCard from '../bookcard/BookCard';
import UnbxdFilter from '../UnbxdFilter';
import { Unbxd } from '../../helper/helpers';
import SearchStyles from "../../styles/SearchPage.module.css"
import MediaQuery from "react-responsive";
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Drawer } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
function NewBookUnbxd(props) {

  const [initialLoader, setinitialLoader] = useState(true)
  const [value, setvalue] = useState("");
  const [page, setpage] = useState(0)
  const [FilterDrawer, setFilterDrawer] = useState(false);
  const [SortbyDrawer, setSortbyDrawer] = useState(false);
  const [filterApplied, setfilterApplied] = useState("")
  React.useEffect(() => {
    // const queryParams = new URLSearchParams(window.location.search);
    // const name = queryParams.get("value");

    let body = {
      uid: Unbxd.readCookie(Unbxd.cookies.userId),
      page: 0,
      rows: 12,
      // filter:`${facetName}:${value}`
      // filter:"author_uFilter:Michael"
    }
    
    
    props.unbox_Search("mypnew", body).then(res => {
      setinitialLoader(false)
    })
      .catch(err => {
        setinitialLoader(false)
      })
    console.log(props.Unbxd_AutoSuggest, "Unbxd_AutoSuggest");
    setvalue(name);
    // let rtl = Router.query.ret;
    // setqueryString = rtl;
    props.fetch_wishlist_detail_otherpage();
    if (props.userComponentStatus != 2) {
      // props.updateCartlocalStorage();
    }
    props.setComponentStatus(1);
  }, []);

  const checkFilterAplied = (filter) => {
    setfilterApplied(filter)
  }
  return (
    <>
      {
        initialLoader ?
          <Loader /> :
          props.Unbxd_products.length > 0 ?
            <div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  className='row g-0 '
                  style={{ marginTop: "1rem", justifyContent: "center" }}>
                  {/* Filter Div for Web Start*/}
                  <div className={`${SearchStyles.filterDivNew}  col-sm-4 col-md-3  col-lg-2`}>
                    <UnbxdFilter checkFilterAplied={checkFilterAplied} Unbxd_data={props.Unbxd_data} />

                  </div>
                  {/* Filter Div for Web End*/}

                  <div className=' col-12 col-sm-6 col-md-8 col-lg-9'>
                    {/* Sort By for Web Start*/}
                    <MediaQuery minWidth={577}>
                      <div
                        className=''
                        style={{
                          position: "sticky",
                          top: 0,
                          zIndex: 100,
                          backgroundColor: "#fff",
                          borderTop: "1px solid #ddd",
                          borderLeft: "1px solid #ddd",
                          borderRight: "1px solid #ddd",
                          padding: "0.5rem"
                        }}>
                        SortBy
                        {/* <div className='d-none d-sm-block d-md-block d-lg-block'>
                        <CustomSortBy
                          defaultRefinement={`${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc`}
                          items={[
                            {
                              value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,i_date:desc`,
                              label: "Newest First",
                            },
                            {
                              value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,i_date:asc`,
                              label: "Oldest First",
                            },
                            {
                              value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,new_pricing:asc`,
                              label: "Price -- Low to High",
                            },
                            {
                              value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,new_pricing:desc`,
                              label: "Price -- High to Low",
                            },
                          ]}
                        />
                      </div> */}
                      </div>
                    </MediaQuery>
                    
                    {/* Sort By for Web End*/}
                    {/* Mobile Filters and Sortby and drawer start*/}
                    <MediaQuery maxWidth={576}>
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
                          <div style={{ position: "sticky", bottom: 0 }}>
                            <p><center>Sort By Filter is Here</center></p>
                            <Button
                              onClick={() => {
                                // if(urltopush){
                                //   router.push(urltopush,undefined,{scroll:false})
                                // }else{
                                //   window.location.reload()

                                // }
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
                            </Button>
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
                          <UnbxdFilter checkFilterAplied={checkFilterAplied} Unbxd_data={props.Unbxd_data} />
                        </Drawer>
                      </div>
                    </MediaQuery>
                    {/* Mobile Filters and Sortby and drawer end*/}
                    {/* Search div start */}
                    <div style={{ borderTop: "1px solid #ddd" }}>
                      {/* <CustomSearchHits /> */}
                      <InfiniteScroll
                        next={() => {
                          const queryParams = new URLSearchParams(window.location.search);
                          const name = queryParams.get("value");
                          let body = {
                            uid: Unbxd.readCookie(Unbxd.cookies.userId),
                            page: page + 1,
                            rows: 12,
                          }
                          props.unbxd_category_search("bookType:0", body)
                          setpage(page + 1)
                        }}
                        dataLength={props.Unbxd_products.length}
                        scrollThreshold='70%'
                        hasMore={props.Unbxd_products.length < props.Unbxd_data.response.numberOfProducts ? true : false}
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
                          }}
                          className='row g-0'>
                          {props.Unbxd_products?.map(aD => (
                            <div key={aD.bookId} className='col-6 col-sm-12 col-md-6 col-lg-3'>
                              <BookCard
                                Booktitle={aD.title}
                                book={aD}
                                price={aD.price}
                                categories={aD.author != "na" ? aD.author : aD.publication}
                                image={aD.imageUrl[0]}
                              />
                              {/* <span>{aD.title}</span> */}
                            </div>
                            // <p key={aD.book_id}>{aD.title},{aD.is_out_of_stack}</p>
                          ))}
                        </div>
                      </InfiniteScroll>

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
            </div> :
            <center
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "88vh",
                zIndex: "100",
                backgroundColor: "#fff",
                // position: "absolute",
                marginTop: "-1rem",
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
            </center>

      }

    </>
  );
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
    Unbxd_products: state.unboxReducer.Unbxd_products,

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
    unbxd_category_search: (value, body) => dispatch(unbxd_category_search(value, body)),
    unbox_Search : (value, body) => dispatch(unbox_Search(value, body)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewBookUnbxd);