// import React from 'react'

// function AuthorsLanding() {
//   return (
//     <div>
//         {props.Unbxd_products.length>0?
//     <div>
      
//         <div style={{ display: "flex", flexDirection: "column" }}>
//         <div
//             className='row g-0 '
//             style={{ marginTop: "1rem", justifyContent: "center"}}>
//             {/* Filter Div for Web Start*/}
//             <div className="col-2 bg-white" style={{marginRight:"0.8rem"}}>
//             <div className="p-2" style={{borderBottom:"1px solid #ddd"}}>
//             <span>Filters</span>
//             </div>

//             <div  >
//             {props.Unbxd_data?.facets?.text?.list?.map((f,j) => (
//             <div key={j} className="p-2" style={{borderBottom:"1px solid #ddd"}}>
//             <div onClick={() => {
//               handlefilterClick(f)
//             }} className="d-flex" style={{cursor:"pointer",justifyContent:"space-between",alignItems:"center"}}>
//             <span className="my-1">{f.displayName}</span>
//             {shrinkedFilter.includes(f.facetName)?<KeyboardArrowDownIcon fontSize="small"/>:<KeyboardArrowUpIcon fontSize="small"/>}
//             </div>
//             {shrinkedFilter.includes(f.facetName)?null:
//             <div>
//             {f.values.map
//             ((v,index) => (
//               <div key={index} className="d-flex" style={{alignItems:"center",fontSize:"0.85rem"}}>
//               {typeof(v)=="string"?
//             <span className="d-flex" style={{gap:"0.25rem",alignItems:"center",textTransform:"capitalize"}}><input type="checkbox"/>{
//               v.length>20?v.replace(
//                     /(\w)(\w*)/g,
//                     (_, firstChar, rest) =>
//                       firstChar.toUpperCase() + rest.toLowerCase()
//                   ).substring(0, 20)
//                     .concat("..."):
//                     v.replace(
//                     /(\w)(\w*)/g,
//                     (_, firstChar, rest) =>
//                       firstChar.toUpperCase() + rest.toLowerCase()
//                   )
//                   }</span>:null}
//               </div>
//             ))}
//               {f.values.length>19?<span 
//               onClick={() => {
//                 const groupedFilters = {}
//                 f.values.map(v =>{
//                   if(typeof(v)=="string"){
//                     const firstLetter = v.toUpperCase().charAt(0)
//                     if(!groupedFilters[firstLetter]){
//                       groupedFilters[firstLetter] = []
//                     }
//                     groupedFilters[firstLetter].push(v);
//                   }
//                 })
//                 console.log(Object.entries(groupedFilters),"groupedFilters")
//                 setgroupedFilters(groupedFilters)
//                 setfilterindex(j)
//                 setviewallFilter(true)
//               }}
//               style={{fontSize:"0.85rem",color:"#2248ae",cursor:"pointer"}}>View All {f.values.length/2}</span>:null}
//             </div>
//             }
//             </div>
//             ))}
//             </div>
//             </div>
//             {/* Filter Div for Web End*/}

//               <div className=' col-12 col-sm-6 col-md-8 col-lg-9'>
//             {/* Sort By for Web Start*/}
//                 <div
//                   className=''
//                   style={{
//                     position: "sticky",
//                     top: 0,
//                     zIndex: 100,
//                     backgroundColor: "#fff",
//                     padding: "0.5rem",
//                     borderTop:"1px solid #ddd",
//                     borderLeft:"1px solid #ddd",
//                     borderRight:"1px solid #ddd"

//                   }}>
//                   SortBy
//                   {/* <div className='d-none d-sm-block d-md-block d-lg-block'>
//                     <CustomSortBy
//                       defaultRefinement={`${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc`}
//                       items={[
//                         {
//                           value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,i_date:desc`,
//                           label: "Newest First",
//                         },
//                         {
//                           value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,i_date:asc`,
//                           label: "Oldest First",
//                         },
//                         {
//                           value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,new_pricing:asc`,
//                           label: "Price -- Low to High",
//                         },
//                         {
//                           value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,new_pricing:desc`,
//                           label: "Price -- High to Low",
//                         },
//                       ]}
//                     />
//                   </div> */}
//                 </div>
//             {/* Sort By for Web End*/}
//             {/* Mobile Filters and Sortby and drawer start*/}
//                 <div
//                   style={{
//                     position: "sticky",
//                     top: 50,
//                     zIndex: 100,
//                     backgroundColor: "#fff",
//                     padding: "0.5rem 0",
//                   }}
//                   className='d-block d-sm-none d-md-none d-lg-none d-flex'>
                  
//                 </div>
//             {/* Mobile Filters and Sortby and drawer end*/}
//                 {/* Search div start */}
//                 <div style={{ borderTop: "1px solid #ddd" }}>
//                   {/* <CustomSearchHits /> */}
//                 <InfiniteScroll
//                   next={() => {
//                     const queryParams = new URLSearchParams(window.location.search);
//                     const name = queryParams.get("value");
//                     let body = {
//                           uid:Unbxd.readCookie(Unbxd.cookies.userId),
//                           page:page+1,
//                           rows:12,
//                         }
//                         props.unbox_Search(name,body)
//                         setpage(page+1)
//                   }}
//                   dataLength={props.Unbxd_products.length}
//                   scrollThreshold='70%'
//                   hasMore={props.Unbxd_products.length<props.Unbxd_data.response.numberOfProducts?true:false}
//                   // hasMore={true}
//                   loader={
//                     <div
//                       style={{
//                         // marginLeft: "50%",
//                         // width: "70%",

//                         marginBottom: "10%",
//                       }}>
//                       {true ? (
//                         <div>
//                           <div className='row g-0'>
//                             <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
//                               <BookCardSkeleton />
//                             </div>
//                             <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
//                               <BookCardSkeleton />
//                             </div>
//                             <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
//                               <BookCardSkeleton />
//                             </div>

//                             <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
//                               <BookCardSkeleton />
//                             </div>
//                           </div>
//                           <center>
//                             <i className='p' style={{ textAlign: "center" }}>
//                               Hang on! Loading content
//                             </i>
//                           </center>
//                         </div>
//                       ) : null}
//                     </div>
//                   }>
//                   <div
//                     style={{
//                       overflowX: "hidden",
//                       minWidth: "100%",
//                       borderLeft: "1px solid #ddd",
//                       borderRight: "1px solid #ddd",
//                     }}
//                     className='row g-0'>
//                     {props.Unbxd_products?.map(aD => (
//                       <div key={aD.bookId} className='col-6 col-sm-12 col-md-6 col-lg-3'>
//                         <BookCard
//                           Booktitle={aD.title}
//                           book={aD}
//                           price={aD.price}
//                           categories={aD.author != "na" ? aD.author : aD.publication}
//                           image={aD.imageUrl[0]}
//                         />
//                         {/* <span>{aD.title}</span> */}
//                       </div>
//                       // <p key={aD.book_id}>{aD.title},{aD.is_out_of_stack}</p>
//                     ))}
//                   </div>
//                 </InfiniteScroll>
                  
//                 </div>
//                 {/* Search div end */}
//               </div>
//         </div>
//         </div>
        
//       <style jsx>
//         {`
//       input::placeholder {
//         font-size: 0.8rem;
//         padding: 0.5rem;
//       }        
//         `}
//       </style>
//     </div>:
//     <center
//     style={{
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       minHeight: "88vh",
//       zIndex: "100",
//       backgroundColor: "#fff",
//       // position: "absolute",
//       marginTop: "-1rem",
//     }}>
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         marginBottom: "8rem",
//       }}>
//       <span style={{ fontSize: "1.8rem" }}>
//         Oops! No results found.
//       </span>
//       <p style={{ fontSize: "1.6rem", color: "#555" }}>
//         Please check the spelling or try searching for something else
//       </p>
//     </div>
//     </center>

//       }
//     </div>
//   )
// }

// const mapStateToProps = state => {
//   return {
//     getuserdetails: state.loginReducer.getuserdetails,
//     cartDetails: state.cartReduc.MyCart,
//     userComponentStatus: state.loginReducer.userComponentStatus,
//     SuggestionData: state.productsuggestionreducer.SuggestionData,
//     PopupCart: state.cartReduc.PopupCart,
//     userToken: state.accountR.token,
//     Unbxd_data: state.unboxReducer.Unbxd_data,
//     Unbxd_AutoSuggest: state.unboxReducer.Unbxd_AutoSuggest,
//     Unbxd_products:state.unboxReducer.Unbxd_products,

//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     GetTrackingUrl: body => dispatch(GetTrackingUrl(body)),
//     CheckUserExistance: body => dispatch(CheckUserExistance(body)),
//     signupCheck: body => dispatch(signupCheck(body)),
//     LoginCheck: body => dispatch(LoginCheck(body)),
//     fetch_wishlist_detail_otherpage: () =>
//       dispatch(fetch_wishlist_detail_otherpage()),
//     setComponentStatus: () => dispatch(setComponentStatus()),
//     unbox_Search: (value,body) => dispatch(unbox_Search(value,body)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AuthorsLanding);