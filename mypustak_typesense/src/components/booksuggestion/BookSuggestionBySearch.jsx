import React, { useEffect, useState } from "react";
// import {
//   Configure,
//   connectAutoComplete,
//   connectInfiniteHits,
//   connectSearchBox,
//   connectStateResults,
//   connectStats,
//   InstantSearch,
// } from "react-instantsearch";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import {
  CLUSTERHOST,
  INSTANTSEARCHAPIKEY,
  INSTANTSEARCHSCHEMA,
} from "../../helper/helpers";
import BookCardSkeleton from "../bookcard/BookCardSkeleton";
import CustomSortBy from "../instantsearchcustomcomponents/SortBy";
import SearchIcon from "@mui/icons-material/Search";
import CallMadeIcon from "@mui/icons-material/CallMade";
import MediaQuery from "react-responsive";
import BookCard from "../bookcard/BookCard";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDetectClickOutside } from "react-detect-click-outside";
import { Button } from "@mui/material";


import { Configure, InstantSearch, useInstantSearch, useSearchBox } from 'react-instantsearch';
import CustomHomeHits from "../instantsearchcustomcomponents/CustomHomeHits";
import SearchboxBS from "./SearchboxBS";

const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
  // server: {
  //   nodes: [
  //     {
  //       host: "usay3xpekim1nrhdp-1.a1.typesense.net",
  //       port: '443',
  //       protocol: 'https',
  //     },
  //   ],
  //   apiKey: "XwgcfcpwAj8nO9GnvR0XiaD6N48or9Bz",
  // },
  // server: {
  //   nodes: [
  //     {
  //       host: "kqz2649c7eu1fgn5p-1.a1.typesense.net",
  //       port: '443',
  //       protocol: 'https',
  //     },
  //   ],
  //   apiKey: "KbfAnvyUqKuPfSQMlA5NWxQIEBM7SyfR",
  // },
  // upgraded cluster
  server: {
    nodes: [
      {
        host: CLUSTERHOST,
        port: "443",
        protocol: "https",
      },
    ],
    apiKey: INSTANTSEARCHAPIKEY,
  },
  additionalSearchParameters: {
    query_by: "title,author,publication,isbn",
    sort_by: "num_is_out_of_stack:asc,iDate:desc",
    filter_by: "isOutOfStock:['n']",
    facet_by:
      "author,publication,category,language,keywords,bookType,binding,bookCondition,subject,class",
    num_typos: 2,
    typo_tokens_threshold: 10,
    page: 1,
    per_page: 10,
  },
  connectionTimeoutSeconds: 10,
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

// function CustomSearchBox({ hits, currentRefinement, refine, value }) {

function CustomSearchBox(props) {
  
  const { query, refine } = useSearchBox(props);
  const {value} = props;
  const [showautocomp, setshowautocomp] = useState(false);
  const closeshowauto = () => {
    setshowautocomp(false);
  };
  useEffect(() => {
    if (value) {
      if (value.length > 0) {
        refine(value);
      }
    }
  }, [value]);

  return (
    <div>
      <style jsx>
        {`
          .searchInput {
            width: 28.063rem;
            height: 2rem;
            border-radius: 8px 0px 0px 8px;
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
            border-radius: 0px 7px 7px 0px;
            margin-left: -8px;
          }
          .searchButton:hover {
            background: #ff5e1f;
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
// const SearchBox = connectSearchBox(CustomSearchBox);

// const Results = connectStateResults(
//   ({ searchState, searchResults, children, error, isSearchStalled }) =>
//     searchResults && searchResults.nbHits !== 0 ? (
//       children
//     ) : isSearchStalled ? (
//       <div className="row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-5 g-0">
//         <div className="col">
//           <BookCardSkeleton />
//         </div>
//         <div className="col">
//           <BookCardSkeleton />
//         </div>
//         <div className="col">
//           <BookCardSkeleton />
//         </div>
//         <div className="col">
//           <BookCardSkeleton />
//         </div>
//         <div className="col">
//           <BookCardSkeleton />
//         </div>
//         <div className="col">
//           <BookCardSkeleton />
//         </div>
//         <div className="col">
//           <BookCardSkeleton />
//         </div>
//         <div className="col">
//           <BookCardSkeleton />
//         </div>
//         <div className="col">
//           <BookCardSkeleton />
//         </div>
//         <div className="col">
//           <BookCardSkeleton />
//         </div>
//         {/* <div className='col-6 col-sm-4 col-md-4 col-lg-2'>
//               <BookCardSkeleton/>
//         </div>
//         <div className='col-6 col-sm-4 col-md-4 col-lg-2'>
//               <BookCardSkeleton/>
//         </div>
//         <div className='col-6 col-sm-4 col-md-4 col-lg-2'>
//               <BookCardSkeleton/>
//         </div> */}
//       </div>
//     ) : (
//       <div></div>
//     )
// );

// const ArrangeData = ({
//   hits,
//   hasPrevious,
//   refinePrevious,
//   hasMore,
//   refineNext,
// }) => {
//   const [datalength, setdatalength] = useState(1);
//   const [hitsState, sethitsState] = useState([]);
//   useEffect(() => {
//     sethitsState([]), sethitsState(hits);
//   }, [hits]);

//   let inStockData = [];
//   let outofstockData = [];
//   let skeletonCount = [];
//   for (let i = 0; i <= 12; i++) {
//     skeletonCount[i] = i;
//   }
//   let allData = [];
//   const loadData = () => {
//     refineNext();
//     if (hasMore) {
//       setdatalength(datalength + 1);
//     }
//   };
//   hitsState.map((hit) => {
//     if (hit.is_out_of_stack == "n") {
//       inStockData.push(hit);
//     } else {
//       outofstockData.push(hit);
//     }
//     allData = inStockData.concat(outofstockData);
//   });
//   return hitsState.length == 0 ? (
//     <div>
//       <div style={{ borderLeft: "1px solid #ddd" }} className="row g-0">
//         {skeletonCount.map((s) => {
//           return (
//             <div key={s} className="col-6 col-sm-4 col-md-4 col-lg-2 ">
//               <BookCardSkeleton />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   ) : (
//     <div style={{ padding: 0 }}>
//       <div
//         style={{
//           overflowX: "hidden",
//           borderLeft: "1px solid #ddd",
//           borderRight: "1px solid #ddd",
//         }}
//         className="row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-5 g-0"
//       >
//         {allData.map((aD) => (
//           <div key={aD.book_id} className="col">
//             <BookCard
//               Booktitle={aD.title}
//               book={aD}
//               price={aD.price}
//               categories={aD.author != "na" ? aD.author : aD.publication}
//               image={aD.thumb}
//             />
//           </div>
//           // <p key={aD.book_id}>{aD.title},{aD.is_out_of_stack}</p>
//         ))}
//       </div>
//     </div>
//   );
// };
// const CustomHits = connectInfiniteHits(ArrangeData);

function BookSuggestionBySearch(props) {


  return (
    <div>
      <InstantSearch
        indexName={INSTANTSEARCHSCHEMA}
        searchClient={searchClient}
      >
        <MediaQuery minWidth={992}>
          <Configure hitsPerPage={5} />
        </MediaQuery>
        <MediaQuery maxWidth={991}>
          <Configure hitsPerPage={6} />
        </MediaQuery>
        <MediaQuery maxWidth={575}>
          <Configure hitsPerPage={4} />
        </MediaQuery>
        {/* <Results> */}
          <div className="titleDiv">
            <h2 className="title">{props.title}</h2>{" "}
            <span
              className="viewmore"
              onClick={() => {
                window.location.assign(
                  "/search?value=" +
                    props.query +
                    "&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc&author=&publication=&binding=&language=&book_condition=&aged_group="
                );
              }}
            >
              View More
            </span>
          </div>
          <div className="row g-0">
            <div style={{ display: "none" }}>
              {/* <SearchBox value={props.query} /> */}
              <SearchboxBS value={props.query}/>

              <CustomSortBy
                defaultRefinement={`${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`}
                items={[
                  {
                    value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`,
                    label: "Newest First",
                  },
                  {
                    value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:asc`,
                    label: "Oldest First",
                  },
                  {
                    value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,price:asc`,
                    label: "Price -- Low to High",
                  },
                  {
                    value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,price:desc`,
                    label: "Price -- High to Low",
                  },
                ]}
              />
            </div>

            {/* <CustomHits /> */}
            <CustomHomeHits/>
          </div>
        {/* </Results> */}
      </InstantSearch>
      <style jsx>
        {`
          .title {
            font-weight: 500;
            font-size: 1.05rem;
            // line-height: 23px;
            // color: #2258ae;
            color: black;
            margin-left: 1.5rem;
          }
          .bookDiv {
            // min-width: 79.313rem;
            // max-width: 79.313rem;
            max-height: fit-content;
          }
          .viewmore {
            font-weight: 500;
            font-size: 1.05rem;
            margin-right: 1.5rem;
            color: #2258ae;
            cursor: pointer;
            opacity: 0.95;
          }
          .viewmore:hover {
            opacity: 1;
            // transition:0.5s;
            font-size: 1.07rem;
          }
          .titleDiv {
            display: flex;
            align-items: center;
            // border: 0.5px solid #ddd;
            background-color: #fff;
            // min-width:${props.page == "HOME" ? "79.313rem" : "74.313rem"};
            // max-width:${props.page == "HOME" ? "79.313rem" : "74.313rem"};;
            min-width: 100%;
            min-height: 3.125rem;
            justify-content: space-between;
            max-height: 3.125rem;
            margin-bottom: 0.3rem;
          }
          @media only screen and (max-width: 576px) {
            .title {
              margin-left: 0.5rem;
              font-size: 0.9rem;
            }
            .viewmore {
              margin-right: 0.5rem;
              font-size: 0.9rem;
            }
            .viewmore:hover {
              opacity: 1;
              // transition:0.5s;
              font-size: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
}

export default BookSuggestionBySearch;
