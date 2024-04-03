// import React from "react";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// // import {
// //   connectCurrentRefinements,
// //   connectInfiniteHits,
// //   connectSearchBox,
// //   connectStats,
// // } from "react-instantsearch";
// import CancelIcon from "@mui/icons-material/Cancel";
// import MediaQuery from "react-responsive";
// import Paper from "@mui/material/Paper";
// import InputBase from "@mui/material/InputBase";
// // import Divider from '@mui/material/Divider';
// import IconButton from "@mui/material/IconButton";
// // import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from "@mui/icons-material/Search";
// // import DirectionsIcon from '@mui/icons-material/Directions';
// import { connectAutoComplete } from "react-instantsearch";
// import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
// import { Drawer, TextField } from "@mui/material";
// import CallMadeIcon from "@mui/icons-material/CallMade";
// import { Button } from "@mui/material";
// import { useEffect } from "react";
// import Router from "next/router";
// import InfiniteScroll from "react-infinite-scroll-component";
// import BookCard from "../bookcard/BookCard";
// import BookCardSkeleton from "../bookcard/BookCardSkeleton";
// import { useState } from "react";
// import { useDetectClickOutside } from "react-detect-click-outside";

// const Stats = ({ nbHits }) => (
//   <span style={{ textTransform: "capitalize" }}>Show all {nbHits} results</span>
// );
// // export const CustomStats = connectStats(Stats);
// const Autocomplete = ({
//   searchResults,
//   found,
//   hits,
//   currentRefinement,
//   refine,
//   clearsQuery,
//   showautocomp,
//   closeshowauto,
// }) => {
//   const ref = useDetectClickOutside({ onTriggered: closeshowauto });
//   const hasResults = searchResults && searchResults.nbHits !== 0;
//   const nbHits = searchResults && searchResults.nbHits;

//   return (
//     <div ref={ref}>
//       {/* <input
//            type="search"
//            value={currentRefinement}
//            onChange={event => refine(event.currentTarget.value)}
//          /> */}
//       {showautocomp > 0 ? (
//         <div
//           className='d-none d-sm-block d-md-block d-lg-block'
//           style={{
//             position: "absolute",
//             zIndex: 100,
//             borderRadius: "5px",
//             backgroundColor: "#fff",
//             width: "27.5rem",
//           }}>
//           {hits.map(hit => (
//             <div key={hit.book_id}>
//               <div
//                 onClick={() => {
//                   window.location.assign(`/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
//                 }}
//                 style={{ alignItems: "center", margin: 0, padding: 0 }}
//                 className='searchDiv d-flex justify-content-between'>
//                 <SearchIcon
//                   className='col-2'
//                   fontSize='small'
//                   style={{
//                     justifySelf: "flex-start",
//                     fontSize: "1.1rem",
//                     flex: "0.1",
//                     margin: 0,
//                     padding: 0,
//                   }}
//                 />
//                 <p
//                   className='col-8'
//                   style={{
//                     margin: "0rem 0",
//                     padding: "0.5rem 0rem",
//                     textTransform: "capitalize",
//                     fontSize: "0.8rem",
//                     flex: "0.8",
//                   }}
//                   key={hit.book_id}>
//                   {hit.title.length > 75
//                     ? hit.title.substring(0, 75).concat("...")
//                     : hit.title}
//                   ,{hit.author}
//                 </p>
//                 <CallMadeIcon
//                   className='col-2'
//                   fontSize='small'
//                   style={{ fontSize: "1.1rem", flex: "0.1" }}
//                 />
//               </div>
//             </div>
//           ))}
//           <Button
//             size='small'
//             fullWidth
//             variant='outlined'
//             onClick={() => {
//               window.location.assign(`/search?value=${currentRefinement}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
//             }}>
//             <CustomStats />
//           </Button>
//         </div>
//       ) : null}

//       {currentRefinement.length > 0 ? (
//         <div
//           className='d-block d-sm-none d-md-none d-lg-none'
//           style={{
//             position: "absolute",
//             zIndex: 100,
//             borderRadius: "5px",
//             backgroundColor: "#fff",
//             width: "100%",
//           }}>
//           {hits.map(hit => (
//             <div
//               key={hit.book_id}
//               onClick={() => {
//                 window.location.assign(`/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
//               }}
//               style={{ alignItems: "center", margin: 0, padding: 0 }}
//               className='searchDiv d-flex justify-content-between'>
//               <SearchIcon
//                 className='col-2'
//                 fontSize='small'
//                 style={{
//                   justifySelf: "flex-start",
//                   fontSize: "1.1rem",
//                   flex: "0.1",
//                   margin: 0,
//                   padding: 0,
//                 }}
//               />
//               <p
//                 className='col-8'
//                 style={{
//                   margin: "0rem 0",
//                   padding: "0.5rem 0rem",
//                   flex: "0.8",
//                   textTransform: "capitalize",
//                   fontSize: "0.8rem",
//                 }}
//                 key={hit.book_id}>
//                 {hit.title.length > 75
//                   ? hit.title.substring(0, 75).concat("...")
//                   : hit.title}
//                 ,{hit.author}
//               </p>
//               <CallMadeIcon
//                 className='col-2'
//                 fontSize='small'
//                 style={{ fontSize: "1.1rem", flex: "0.1" }}
//               />
//             </div>
//           ))}
//           <Button
//             onClick={() => {
//               window.location.assign(`/search?value=${currentRefinement}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
              
//             }}
//             size='small'
//             fullWidth
//             variant='outlined'>
//             <CustomStats />
//           </Button>
//         </div>
//       ) : null}
//       <style jsx>
//         {`
//           .searchDiv:hover {
//             background-color: #f2f3f5;
//             cursor: pointer;
//             color: #2248ae;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// // export const CustomAutocomplete = connectAutoComplete(Autocomplete);



// const ClearRefinements = ({ items, refine, clearsQuery, setvalue }) => (
//   <IconButton
//     type='button'
//     sx={{ p: "10px" }}
//     onClick={() => {
//       refine(items);
//       setvalue("");
//     }}
//     aria-label='search'>
//     <CancelIcon style={{ color: "#777" }} />
//   </IconButton>
// );

// // export const CustomClearRefinementsMob =
// //   connectCurrentRefinements(ClearRefinements);

// const AutocompleteMobile = ({
//   searchResults,
//   found,
//   hits,
//   currentRefinement,
//   refine,
//   clearsQuery,
//   showmobautocomp,
//   closemobshowauto,
// }) => {
//   const ref = useDetectClickOutside({ onTriggered: closemobshowauto });
//   const hasResults = searchResults && searchResults.nbHits !== 0;
//   const nbHits = searchResults && searchResults.nbHits;
//   return (
//     <div ref={ref}>
//       {/* <input
//            type="search"
//            value={currentRefinement}
//            onChange={event => refine(event.currentTarget.value)}
//          /> */}
//       {showmobautocomp > 0 ? (
//         <div
//           className='d-none d-lg-block'
//           style={{
//             position: "absolute",
//             zIndex: 100,
//             borderRadius: "5px",
//             backgroundColor: "#fff",
//             // width: "27.5rem",
//             width: "100vw",
//           }}>
//           {hits.map(hit => (
//             <div
//               key={hit.book_id}
//               onClick={() => {
//                 window.location.assign(`/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
//               }}
//               style={{ alignItems: "center", margin: 0, padding: 0 }}
//               className='searchDiv d-flex justify-content-between'>
//               <SearchIcon
//                 className='col-2'
//                 fontSize='small'
//                 style={{
//                   justifySelf: "flex-start",
//                   fontSize: "1.1rem",
//                   flex: "0.1",
//                   margin: 0,
//                   padding: 0,
//                 }}
//               />
//               <p
//                 className='col-8'
//                 style={{
//                   margin: "0rem 0",
//                   padding: "0.5rem 0rem",
//                   flex: "0.8",
//                   textTransform: "capitalize",
//                   fontSize: "0.8rem",
//                 }}
//                 key={hit.book_id}>
//                 {hit.title.length > 75
//                   ? hit.title.substring(0, 75).concat("...")
//                   : hit.title}
//                 ,{hit.author}
//               </p>
//               <CallMadeIcon
//                 className='col-2'
//                 fontSize='small'
//                 style={{ fontSize: "1.1rem", flex: "0.1" }}
//               />
//             </div>
//           ))}
//           <Button
//             size='small'
//             fullWidth
//             variant='outlined'
//             onClick={() => {
//               window.location.assign(`/search?value=${currentRefinement}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
//             }}>
//             {/* <CustomStats /> */}
//           </Button>
//         </div>
//       ) : null}

//       {currentRefinement.length > 0 ? (
//         <div
//           className='d-block d-lg-none'
//           style={{
//             position: "absolute",
//             zIndex: 100,
//             borderRadius: "5px",

//             backgroundColor: "#fff",
//             width: "100vw",
//             // width: "100%",
//           }}>
//           {hits.map(hit => (
//             <div
//               key={hit.book_id}
//               onClick={() => {
//                 window.location.assign(`/search?value=${hit.title}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);                
//               }}
//               style={{
//                 alignItems: "center",
//                 margin: 0,
//                 padding: "0.25rem",
//                 borderTop: "1px solid #ddd",
//               }}
//               className='searchDiv d-flex justify-content-between'>
//               <SearchIcon
//                 className='col-2'
//                 style={{
//                   justifySelf: "flex-start",
//                   fontSize: "1.1rem",
//                   flex: "0.1",
//                   margin: 0,
//                   padding: 0,
//                 }}
//               />
//               <p
//                 className='col-8'
//                 style={{
//                   margin: "0rem 0",
//                   padding: "0.5rem 0rem",
//                   flex: "0.8",
//                   textTransform: "capitalize",
//                   fontSize: "0.8rem",
//                 }}
//                 key={hit.book_id}>
//                 {hit.title.length > 75
//                   ? hit.title.substring(0, 75).concat("...")
//                   : hit.title}
//                 ,{hit.author}
//               </p>
//               <CallMadeIcon
//                 className='col-2'
//                 fontSize='small'
//                 style={{ fontSize: "1.1rem", flex: "0.1" }}
//               />
//             </div>
//           ))}
//           <Button
//             onClick={() => {
//               window.location.assign(`/search?value=${currentRefinement}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`);
//             }}
//             size='small'
//             fullWidth
//             variant='outlined'>
//             {/* <CustomStats /> */}
//           </Button>
//         </div>
//       ) : null}
//       <style jsx>
//         {`
//           .searchDiv:hover {
//             background-color: #f2f3f5;
//             cursor: pointer;
//             color: #2248ae;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// // export const CustomAutocompleteMobile = connectAutoComplete(AutocompleteMobile);

// const ArrangeData = ({
//   hits,
//   hasPrevious,
//   refinePrevious,
//   hasMore,
//   refineNext,
// }) => {
//   const [datalength, setdatalength] = useState(1);
//   let inStockData = [];
//   let outofstockData = [];
//   let skeletonCount = [];
//   for (let i = 0; i <= 20; i++) {
//     skeletonCount[i] = i;
//   }
//   let allData = [];
//   const loadData = () => {
//     refineNext();
//     if (hasMore) {
//       setdatalength(datalength + 1);
//     }
//   };
//   hits.map(hit => {
//     if (hit.is_out_of_stack == "n") {
//       inStockData.push(hit);
//     } else {
//       outofstockData.push(hit);
//     }
//     allData = inStockData.concat(outofstockData);
//   });
//   return hits.length == 0 ? (
//     <div>
//       <div
//         style={{ borderLeft: "1px solid #ddd", borderRight: "1px solid #ddd" }}
//         className='row g-0'>
//         {skeletonCount.map(s => {
//           return (
//             <div key={s} className='col-6 col-sm-4 col-md-4 col-lg-3'>
//               <BookCardSkeleton />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   ) : (
//     <div>
//       {/* <input
//           type="search"
//           value={currentRefinement}
//           onChange={event => refine(event.currentTarget.value)}
//         /> */}
//       <InfiniteScroll
//         className ="search-page"
//         next={loadData}
//         dataLength={datalength}
//         scrollThreshold='30%'
//         hasMore={hasMore}>
//         <div
//           style={{
//             borderLeft: "1px solid #ddd",
//             borderRight: "1px solid #ddd",
//           }}
//           className='row g-0'>
//           {allData.map(aD => (
//             <div key={aD.book_id} className='col-6 col-sm-4 col-md-4 col-lg-3'>
//               <BookCard
//                 Booktitle={aD.title}
//                 book={aD}
//                 price={aD.price}
//                 categories={aD.author != "na" ? aD.author : aD.publication}
//                 image={aD.thumb}
//               />
//             </div>
//             // <p key={aD.book_id}>{aD.title},{aD.is_out_of_stack}</p>
//           ))}
//         </div>
//       </InfiniteScroll>
//       {/* <button disabled={!hasMore} onClick={refineNext}>
//           Show more
//         </button> */}
//       <style jsx>
//         {`
//           @media screen and (max-width: 768px) {
//             .filters {
//               display: none;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// // export const CustomSearchHits = connectInfiniteHits(ArrangeData);
// function CustomSearchBox({
//   hits,
//   currentRefinement,
//   refine,
//   value,
//   sdraw,
//   settingsdraw,
// }) {
//   useEffect(() => {
//     const queryParams = new URLSearchParams(window.location.search);
//     const dsearch = queryParams.get("dsearch");
//     if (dsearch) {
//       setSearchDrawer(true);
//     }
//   }, []);
//   let timerId = null;
//   const [showautocomp, setshowautocomp] = useState(false);
//   const [showmobautocomp, setshowmobautocomp] = useState(false);
//   const [svalue, setsvalue] = useState(currentRefinement);

//   const onChangeDebounced = event => {
//     // const { refine, delay } = this.props
//     const value = event.currentTarget.value;

//     clearTimeout(timerId);
//     timerId = setTimeout(() => refine(value), 4000);

//     // this.setState(() => ({
//     //   value,
//     // }))
//     setsvalue(value);
//   };
//   const closeshowauto = () => {
//     setshowautocomp(false);
//   };

//   const closemobshowauto = () => {
//     setshowmobautocomp(false);
//   };

//   useEffect(() => {
//     if (value) {
//       if (value.length > 0) {
//         refine(value);
//       }
//     }
//   }, [value]);
//   const classes = useStyles();
//   const [SearchDrawer, setSearchDrawer] = useState(false);
//   useEffect(() => {
//     setSearchDrawer(sdraw);
//   }, [sdraw]);

//   return (
//     <div>
//       <div>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//           }}>
//           <form
//             onSubmit={e => {
//               e.preventDefault();
//               window.location.assign(
//                 `/search?value=${currentRefinement}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
//               );
//             }}
//             style={{ display: "flex", alignItems: "center" }}>
//             <MediaQuery minWidth={577}>
//               <input
//                 className='searchInput'
//                 placeholder='Search for books by title, author, Publication or ISBN '
//                 value={svalue}
//                 // onChange={event => {
//                 //   if (event.currentTarget.value.length > 0) {
//                 //     setshowautocomp(true);
//                 //   } else {
//                 //     setshowautocomp(false);
//                 //   }
//                 //   refine(event.currentTarget.value);
//                 // }}
//                 onChange={onChangeDebounced}
//               />
//             </MediaQuery>
//             {/* <input
//                     className='searchInput d-block d-lg-none'
//                     placeholder='Search for books by title, author, Publication or ISBN '
//                     value={currentRefinement}
//                     onChange={event => {
//                       if (event.currentTarget.value.length > 0) {
//                         setshowautocomp(true);
//                         setSearchDrawer(true);
//                       } else {
//                         setshowautocomp(false);
//                       }
//                       refine(event.currentTarget.value);
//                     }}
//                   /> */}
//             <MediaQuery minWidth={577}>
//               <button
//                 aria-label='searchButton'
//                 type='submit'
//                 className='searchButton'>
//                 <SearchOutlinedIcon style={{ color: "#fff" }} />
//               </button>
//             </MediaQuery>
//             <MediaQuery maxWidth={576}>
//               <SearchOutlinedIcon
//                 className=''
//                 onClick={() => {
//                   // Router.push('?sdrawer')
//                   setSearchDrawer(true);
//                 }}
//                 name='searchnbutton'
//                 aria-label='searcharia'
//                 type='submit'
//                 style={{ color: "#fff", fontSize: "1.6rem" }}
//               />
//             </MediaQuery>
//           </form>

//           <Drawer
//             anchor='bottom'
//             style={{ width: "100%", height: "100%" }}
//             open={SearchDrawer}
//             // classes={{
//             //   paper: classes.drawerPaper,
//             // }}
//             onClose={() => {
//               setSearchDrawer(false);
//             }}>
//             <Paper
//               component='form'
//               onSubmit={e => {
//                 e.preventDefault();
//                 setshowmobautocomp(false);
//                 setshowautocomp(false);
//                 window.location.assign(
//                   `/search?value=${currentRefinement}&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group=`
//                 );
//               }}
//               sx={{
//                 p: "0.6rem 4px",
//                 display: "flex",
//                 alignItems: "center",
//                 width: "100%",
//               }}>
//               <IconButton
//                 onClick={() => {
//                   setSearchDrawer(false);
//                   settingsdraw(false);
//                 }}
//                 sx={{ p: "10px" }}
//                 style={{ margin: "0 0.5rem" }}
//                 aria-label='menu'>
//                 <ArrowBackOutlinedIcon style={{ color: "#777" }} />
//               </IconButton>
//               <InputBase
//                 sx={{ ml: 1, flex: 1 }}
//                 autoFocus
//                 // type="search"
//                 id='Search'
//                 placeholder='Search for books by title, author, Publication or ISBN'
//                 inputProps={{ "aria-label": "search books" }}
//                 value={currentRefinement}
//                 onChange={event => {
//                   if (event.currentTarget.value.length > 0) {
//                     setshowmobautocomp(true);
//                   } else {
//                     setshowmobautocomp(false);
//                   }
//                   refine(event.currentTarget.value);
//                 }}
//               />
//               {/* {currentRefinement.length > 0 ?
//                 <CustomClearRefinements clearsQuery /> : null
//               } */}
//             </Paper>
//             {/* <div style={{ display: "flex", flexDirection: "column" }}>
//               <form
//                 className='row'
//                 onSubmit={e => {
//                   e.preventDefault();
//                   window.location.replace(`/search?value=${currentRefinement}`);
//                 }}
//                 style={{ alignItems: "center" }}>
//                 <ArrowBackOutlinedIcon
//                   fontSize='small'
//                   className='col-2'
//                   onClick={() => {
//                     setSearchDrawer(false);
//                   }}
//                 />
//                 <div className='col-10 d-flex align-items-center'>
//                   <input
//                     className='drawerinput d-block d-lg-none'
//                     placeholder='Search for books by title, author, Publication or ISBN '
//                     value={currentRefinement}
//                     autoFocus
//                     onChange={event => {
//                       if (event.currentTarget.value.length > 0) {
//                         setshowautocomp(true);
//                       } else {
//                         setshowautocomp(false);
//                       }
//                       refine(event.currentTarget.value);
//                     }}
//                   />
//                   <button type='submit' className='searchButton'>
//                     <SearchOutlinedIcon style={{ color: "#fff" }} />
//                   </button>
//                 </div>
//               </form>
//               <CustomAutocomplete
//                 currentRefinement={currentRefinement}
//                 showautocomp={showautocomp}
//                 closeshowauto={closeshowauto}
//               />
//             </div> */}
//             <MediaQuery maxWidth={576}>
//               <CustomAutocompleteMobile
//                 className=''
//                 currentRefinement={currentRefinement}
//                 showmobautocomp={showmobautocomp}
//                 closemobshowauto={closemobshowauto}
//               />
//             </MediaQuery>
//           </Drawer>
//           <MediaQuery minWidth={577}>
//             <CustomAutocomplete
//               className='d-none'
//               currentRefinement={currentRefinement}
//               showautocomp={showautocomp}
//               closeshowauto={closeshowauto}
//             />
//           </MediaQuery>
//           {/* <CustomSearchHits/> */}
//         </div>
//       </div>
//       <style jsx>
//         {`
//           .drawerinput {
//             width: 100%;
//           }
//           .searchInput {
//             // max-width: 28.063rem;
//             width: 28.063rem;

//             height: 2rem;
//             // border-radius: 8px 0px 0px 8px;
//             border: none;
//             focus: none;
//           }

//           textarea:focus,
//           input:focus {
//             outline: none;
//           }
//           .searchButton {
//             width: 4rem;
//             height: 2rem;
//             margin: 5px 0;
//             border: none;
//             background-color: #ff723b;
//             box-shadow: 2px 1px 1px rgba(255, 255, 255, 0.1);
//             // border-radius: 0px 7px 7px 0px;
//             margin-left: -8px;
//           }
//           .searchButton:hover {
//             background: #ff5e1f;
//           }
//           @media screen and (max-width: 992px) {
//             .searchInput {
//               width: 22rem;
//             }
//           }
//           @media screen and (max-width: 768px) {
//             .searchInput {
//               width: 14rem;
//             }
//             .searchButton {
//               width: 2rem;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// }
// const SearchBox = connectSearchBox(CustomSearchBox);
// export default SearchBox;
