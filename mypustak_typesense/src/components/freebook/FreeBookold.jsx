import React, { useRef, useState } from "react";
import styles from "../../styles/FreeBook.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
// import { connectStateResults } from "react-instantsearch";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import MobileDetect from "mobile-detect";
import { useRouter } from "next/router";
import qs from "qs";
// import { connectNumericMenu } from "react-instantsearch";
import { connectNumericMenu } from 'instantsearch.js/es/connectors';
// import { connectInfiniteHits } from "react-instantsearch";
import { connectInfiniteHits } from 'instantsearch.js/es/connectors';
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { InstantSearch } from "react-instantsearch";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import BookCard from "../bookcard/BookCard";
import { history } from 'instantsearch.js/es/lib/routers';
// import { connectRange } from "react-instantsearch";

import {
  Button,
  Drawer,
  IconButton,
  // TextField,
  NoSsr,
} from "@mui/material";
import NextBreadcrumbs from "../Breadcrumbs/NextBreadcrumbs";
import CustomClearRefinements from "../instantsearchcustomcomponents/ClearRefinements";
import CustomRefinementList from "../instantsearchcustomcomponents/RefinementList";
import CustomSortBy from "../instantsearchcustomcomponents/SortBy";
import BookCardSkeleton from "../bookcard/BookCardSkeleton";
import {
  CLUSTERHOST,
  INSTANTSEARCHAPIKEY,
  INSTANTSEARCHSCHEMA,
} from "../../helper/helpers";
import CustomSortByMobile from "../instantsearchcustomcomponents/SortByMobile";
import Loader from "../loader/Loader";
import CustomRefinementListMobile from "../instantsearchcustomcomponents/RefinementListMobile";
const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
 
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
    cacheSearchResultsForSeconds:0 
  },
  // additionalSearchParameters: {
  //   q: "N",
  //   query_by: "is_out_of_stack",
  //   page: 1,
  //   facet_by:
  //     "author,publication,category,language,keywords,book_type,binding,book_condition,subject,class",
  //   max_facet_values: 30,
  //   num_typos: 2,
  //   typo_tokens_threshold: 10,
  //   per_page: 12,
  // },

    additionalSearchParameters: {
      "q"         : "buddha",
      "query_by"  : "embedding",
  },
  connectionTimeoutSeconds: 10,
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

// const Results = connectStateResults(
//   // ({ searchState, searchResults, children, error, isSearchStalled }) =>
//   ({ searchResults, children, isSearchStalled }) =>

//     searchResults && searchResults.nbHits !== 0 ? (
//       children
//     ) : isSearchStalled ? (
//       <Loader />
//     ) : (
//       <center
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "88vh",
//           zIndex: "100",
//           backgroundColor: "#fff",
//           position: "absolute",
//           marginTop: "-1rem",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             marginBottom: "8rem",
//           }}
//         >
//           <span style={{ fontSize: "1.5rem" }}>Oops!No books found please</span>
//         {  console.log(searchResults , "searchResults")}
//           <Button
//             onClick={() => {
//               window.location.replace(window.location.pathname);
//             }}
//             style={{
//               textTransform: "capitalize",
//               fontSize: "1.5rem",
//               marginLeft: "0.5rem",
//             }}
//             variant="outlined"
//           >
//             Reload
//             <ReplayIcon
//               sx={{ fontSize: "3rem", color: "#2258ae", cursor: "pointer" }}
//             />
//           </Button>
//         </div>
//       </center>
//     )
// );

const ArrangeData = ({
  hits,
  // hasPrevious,
  // refinePrevious,
  hasMore,
  refineNext,
}) => {
  const [datalength, setdatalength] = useState(1);

  const loadData = () => {
    if (hasMore) {
      refineNext();
      setdatalength(datalength + 1);
    }
  };

  return hits.length == 0 ? null : (
    <div>
      <InfiniteScroll
        next={loadData}
        dataLength={datalength}
        scrollThreshold="90%"
        hasMore={hasMore}
        loader={
          <div
            style={{
              // marginLeft: "50%",
              // width: "70%",

              marginBottom: "10%",
            }}
          >
            {true ? (
              <div>
                <div className="row g-0">
                  <div className="col-6 col-sm-12 col-md-6 col-lg-3">
                    <BookCardSkeleton />
                  </div>
                  <div className="col-6 col-sm-12 col-md-6 col-lg-3">
                    <BookCardSkeleton />
                  </div>
                  <div className="col-6 col-sm-12 col-md-6 col-lg-3">
                    <BookCardSkeleton />
                  </div>

                  <div className="col-6 col-sm-12 col-md-6 col-lg-3">
                    <BookCardSkeleton />
                  </div>
                </div>
                <center>
                  <i className="p" style={{ textAlign: "center" }}>
                    Hang on! Loading Books
                  </i>
                </center>
              </div>
            ) : null}
          </div>
        }
      >
        <div
          style={{
            overflowX: "hidden",
            borderLeft: "1px solid #ddd",
            borderRight: "1px solid #ddd",
          }}
          className="row g-0"
        >
          {hits.map((aD) => (
            <div key={aD.book_id} className="col-6 col-sm-12 col-md-6 col-lg-3">
              <BookCard
                Booktitle={aD.title}
                book={aD}
                price={aD.price}
                categories={aD.author}
                image={aD.thumb}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
const CustomHits = connectInfiniteHits(ArrangeData);

const CNumericMenu = ({ items, refine }) => (
  <div>
    {items.map((item) => (
      <div
        key={item.value}
        style={{
          width: "max-content",
          display: "flex",
          alignItems: "baseline",
        }}
        onClick={(event) => {
          event.preventDefault();
          refine(item.value);
        }}
      >
        <input
          checked={item.isRefined}
          style={{ marginRight: "5px" }}
          type={"radio"}
        />
        <span
          style={{
            textTransform: "capitalize",
            fontSize: "0.75rem",
            cursor: "pointer",
            fontWeight: item.isRefined ? "bold" : "",
          }}
        >
          {item.label}
        </span>
      </div>
    ))}
  </div>
);
const CustomNumericMenu = connectNumericMenu(CNumericMenu);

// const RangeSlider = ({ min, max, currentRefinement, canRefine, refine }) => {
//   React.useEffect(() => {
//     if (canRefine) {
//       setMin(currentRefinement.min);
//       setMax(currentRefinement.max);
//     }
//   }, [currentRefinement.min, currentRefinement.max]);
//   const [Min, setMin] = useState(0);
//   const [Max, setMax] = useState(833);
//   const onChange = ({ values: [min, max] }) => {
//     if (currentRefinement.min !== min || currentRefinement.max !== max) {
//       refine({ min, max });
//     }
//   };

//   const onValuesUpdated = ({ values: [min, max] }) => {
//     setMin(min);
//     setMax(max);
//   };
//   return (
//     <Rheostat
//       min={min}
//       max={max}
//       values={[currentRefinement.min, currentRefinement.max]}
//       onChange={onChange}
//       onValuesUpdated={onValuesUpdated}>
//       <div
//         className='rheostat-marker rheostat-marker--large'
//         style={{ left: 0 }}>
//         <div className='rheostat-value'>{Min}</div>
//       </div>
//       <div
//         className='rheostat-marker rheostat-marker--large'
//         style={{ right: 0 }}>
//         <div className='rheostat-value'>{Max}</div>
//       </div>
//     </Rheostat>
//   );
// };

// const CustomRangeSlider = connectRange(RangeSlider);

const DEBOUNCE_TIME = 0;

function getCategorySlug(name) {
  const encodedName = name;

  return encodedName.split(" ").map(encodeURIComponent).join("+");
}
function getCategoryName(slug) {
  const decodedSlug = slug;

  return decodedSlug.split("+").map(decodeURIComponent).join(" ");
}
const createURL_function = (state) => {
  console.log(state, "statesttate");
  alert("joi")
  const isDefaultRoute =
    !state.query &&
    state.page === 1 &&
    state.sortBy &&
    state.refinementList &&
    state.refinementList.author.length === 0 &&
    state.refinementList.publication.length === 0 &&
    state.refinementList.binding.length === 0 &&
    state.refinementList.language.length === 0 &&
    state.refinementList.book_condition.length === 0 &&
    state.refinementList.aged_group.length === 0 &&
    state.menu &&
    !state.menu.categories;

  if (isDefaultRoute) {
    return "";
  }

  const categoryPath = state.menu.categories
    ? `${getCategorySlug(state.menu.categories)}/`
    : "";
  const queryParameters = {};

  if (state.page !== 1) {
    queryParameters.page = state.page;
  }

  if (state.sortBy !== 1) {
    queryParameters.sortBy = state.sortBy;
  } else {
    queryParameters.sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,i_date:desc`;
  }

  if (state.refinementList.author) {
    queryParameters.author =
      state.refinementList.author.map(encodeURIComponent);
  }
  if (state.refinementList.publication) {
    queryParameters.publication =
      state.refinementList.publication.map(encodeURIComponent);
  }
  if (state.refinementList.binding) {
    queryParameters.binding =
      state.refinementList.binding.map(encodeURIComponent);
  }

  if (state.refinementList.language) {
    queryParameters.language =
      state.refinementList.language.map(encodeURIComponent);
  }

  if (state.refinementList.book_condition) {
    queryParameters.book_condition =
      state.refinementList.book_condition.map(encodeURIComponent);
  }
  if (state.refinementList.aged_group) {
    queryParameters.aged_group =
      state.refinementList.aged_group.map(encodeURIComponent);
  }

  const queryString = qs.stringify(queryParameters, {
    addQueryPrefix: true,
    arrayFormat: "repeat",
  });

  return `/free-books/${categoryPath}${queryString}`;
};

const searchStateToUrl = (searchState) =>
  searchState ? createURL(searchState) : "";

const urlToSearchState = (location) => {
  const pathnameMatches = location.pathname;
  console.log(location.asPath.split("?")[1], "pathnameMatches");
  const category = getCategoryName(
    (pathnameMatches && pathnameMatches[1]) || ""
  );
  const {
    query = "",
    page = 1,
    sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,i_date:desc`,
    author = [],
    publication = [],
    binding = [],
    language = [],
    book_condition = [],
    aged_group = [],
  } = qs.parse(
    // location.query.slice(1)
    location.asPath.split("?")[1]
  );

  // `qs` does not return an array when there's a single value.
  const allAuthors = Array.isArray(author) ? author : [author].filter(Boolean);
  const allPublication = Array.isArray(publication)
    ? publication
    : [publication].filter(Boolean);
  const allbinding = Array.isArray(binding)
    ? binding
    : [binding].filter(Boolean);
  const allLanguage = Array.isArray(language)
    ? language
    : [language].filter(Boolean);
  const allBook_condition = Array.isArray(book_condition)
    ? book_condition
    : [book_condition].filter(Boolean);
  const allAged_group = Array.isArray(aged_group)
    ? aged_group
    : [aged_group].filter(Boolean);
  console.log(
    allAuthors.map(decodeURIComponent)[0],
    "allAuthors.map(decodeURIComponent)"
  );
  return {
    query: decodeURIComponent(query),
    page,
    sortBy: sortBy,
    menu: {
      categories: decodeURIComponent(category),
    },
    refinementList: {
      author: allAuthors.map(decodeURIComponent)[0]
        ? allAuthors.map(decodeURIComponent)[0].split(",")
        : allAuthors.map(decodeURIComponent),
      publication: allPublication.map(decodeURIComponent)[0]
        ? allPublication.map(decodeURIComponent)[0].split(",")
        : allPublication.map(decodeURIComponent),
      binding: allbinding.map(decodeURIComponent)[0]
        ? allbinding.map(decodeURIComponent)[0].split(",")
        : allbinding.map(decodeURIComponent),
      language: allLanguage.map(decodeURIComponent)[0]
        ? allLanguage.map(decodeURIComponent)[0].split(",")
        : allLanguage.map(decodeURIComponent),
      book_condition: allBook_condition.map(decodeURIComponent)[0]
        ? allBook_condition.map(decodeURIComponent)[0].split(",")
        : allBook_condition.map(decodeURIComponent),
      aged_group: allAged_group.map(decodeURIComponent)[0]
        ? allAged_group.map(decodeURIComponent)[0].split(",")
        : allAged_group.map(decodeURIComponent),
    },
  };
};

function FreeBook({ hits }, props) {
  console.log(props.url);
  console.log("--------------------------------------------");
  const [FilterDrawer, setFilterDrawer] = useState(false);
  const [SortbyDrawer, setSortbyDrawer] = useState(false);
  const [showfilter, setshowfilter] = useState(false);
  const [urltopush, seturltopush] = useState("");
  const router = useRouter();
  console.log(router.basePath, "basepath");
  const [searchState, setSearchState] = useState(urlToSearchState(router));
  const debouncedSetStateRef = useRef(null);
  console.log(hits, "HITS");
  const setitems = (data) => {
    if (data) {
      setshowfilter(true);
    }
  };
  const onSearchStateChange = (updatedSearchState) => {
    clearTimeout(debouncedSetStateRef.current);

    debouncedSetStateRef.current = setTimeout(() => {
      // alert(updatedSearchState)
      // console.log(updatedSearchState,searchStateToUrl(updatedSearchState),'updatedSearchState');
      // console.log(updatedSearchState.refinementList.author.map(encodeURIComponent),"updatedSearchState1");
      // let slugvar=slug
      // if(updatedSearchState.refinementList.author){
      //   slugvar = slugvar.concat("&author="+updatedSearchState.refinementList.author.map(decodeURIComponent))
      //   setslug(slugvar)
      // }
      // if(updatedSearchState.refinementList.publication){
      //   // alert(updatedSearchState.refinementList.publication.map(decodeURIComponent))
      //   slugvar = slugvar.concat("&publication="+updatedSearchState.refinementList.publication.map(decodeURIComponent))

      //   setslug(slugvar)
      // }
      // alert(slugvar)
      //   router.push(slugvar)
      let userAgent;
      let deviceType;
      userAgent = navigator.userAgent;
      var md = new MobileDetect(userAgent);
      if (md.tablet()) {
        deviceType = "tablet";
      } else if (md.mobile()) {
        deviceType = "mobile";
      } else {
        deviceType = "desktop";
      }
      console.log(deviceType, "devicetype");

      let author = "";
      let publication = "";
      let binding = "";
      let language = "";
      let book_condition = "";
      let aged_group = "";
      let sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,i_date:desc`;
      // sortBy.split('/')
      console.log(
        updatedSearchState.sortBy,
        "sortbysortbysortbysortbysortbysortbysortbysortby"
      );
      if (updatedSearchState.sortBy) {
        sortBy = "&sortBy=" + updatedSearchState.sortBy;
      }
      if (updatedSearchState.refinementList.author) {
        author =
          "&author=" +
          updatedSearchState.refinementList.author.map(decodeURIComponent);
      }
      if (updatedSearchState.refinementList.publication) {
        publication =
          "&publication=" +
          updatedSearchState.refinementList.publication.map(decodeURIComponent);
      }
      if (updatedSearchState.refinementList.binding) {
        binding =
          "&binding=" +
          updatedSearchState.refinementList.binding.map(decodeURIComponent);
      }
      if (updatedSearchState.refinementList.language) {
        language =
          "&language=" +
          updatedSearchState.refinementList.language.map(decodeURIComponent);
      }

      if (updatedSearchState.refinementList.book_condition) {
        book_condition =
          "&book_condition=" +
          updatedSearchState.refinementList.book_condition.map(
            decodeURIComponent
          );
      }
      if (updatedSearchState.refinementList.aged_group) {
        aged_group =
          "&aged_group=" +
          updatedSearchState.refinementList.aged_group.map(decodeURIComponent);
      }
      let urlvar =
        "?" +
        sortBy +
        author +
        publication +
        binding +
        language +
        book_condition +
        aged_group;
      seturltopush(urlvar);
      console.log(window.screen.width, "window.screen.width");
      if (updatedSearchState.sortBy) {
      }
      if (window.screen.width > 576) {
        router.push(
          "?" +
            sortBy +
            author +
            publication +
            binding +
            language +
            book_condition +
            aged_group,
          undefined,
          { scroll: false }
        );
      }
    }, DEBOUNCE_TIME);

    setSearchState(updatedSearchState);
  };


  
  React.useEffect(() => {
    setSearchState(urlToSearchState(router));
  }, [router]);
  const [stats, setstats] = useState("");
  return (
    <div className="container-fluid">
      <NoSsr>
        <NextBreadcrumbs />
      </NoSsr>
      <InstantSearch
        indexName={INSTANTSEARCHSCHEMA}
        searchClient={searchClient}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
        // onStateChange={({ uiState, setUiState }) => {
        //   createURL
        //      }}
        // createURL={createURL}
        routing={{
          router: history({
            // …
            createURL({ qsModule, routeState, location }) {
              createURL_function
            }
          }),
        }}
        
  // routing={true}
      >
        {/* <InfiniteHits hitComponent={CustomHits}/> */}
        <div
          className="row g-0"
          style={{ marginTop: "1rem", justifyContent: "center" }}
        >
          <div
            className={`${styles.filterDiv} bg-white col-3 d-none d-sm-block d-md-block d-lg-block align-items-center`}
            style={{
              maxWidth: "14.563rem",
              minWidth: "14.563rem",
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
              height: "fit-content",
            }}
          >
            <div
              className=""
              style={{
                background: " linear-gradient(90deg, #2157AD 0%, #6190DA 100%)",
                height: "2.063rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  margin: "0.5rem 0rem 0.5rem 1rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FilterAltOutlinedIcon
                  fontSize="small"
                  style={{ color: "#fff" }}
                />
                <h3 style={{ margin: 0, fontSize: "1rem", color: "#fff" }}>
                  Filters
                </h3>
              </div>
            </div>

            <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
              <CustomClearRefinements />
            </div>

            <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
              <h5 className={`${styles.Refineheader}`}>Authors</h5>
              <CustomRefinementList
                // setitems={setitems}
                searchable={true}
                // transformItems={items =>
                //   items.map(item => ({
                //     ...item,
                //     label:
                //       item.label == "na" || item.label == " "
                //         ? "Others"
                //         : item.label,
                //   }))
                // }
                attribute="author"
              />
            </div>
            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className={`${styles.Refineheader}`}>Binding</h5>
              <CustomRefinementList attribute="binding" />
            </div>

            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className={`${styles.Refineheader}`}>Language</h5>
              <CustomRefinementList attribute="language" />
            </div>
            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className={`${styles.Refineheader}`}>Age Group</h5>
              <CustomRefinementList
                // transformItems={items =>
                //   items.map(item => ({
                //     ...item,
                //     label: item.label == "0" ? "All Age" : item.label == "1" ? "0-2 years":
                //     item.label == "2" ? "3-5 years":item.label == "3" ? "6-9 years":
                //     item.label == "4" ? "10-12 years":item.label == "5" ? "13-18 years":item.label
                //   }))
                // }
                attribute="aged_group"
              />
            </div>
            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className={`${styles.Refineheader}`}>Publication</h5>
              <CustomRefinementList
                searchable={true}
                // transformItems={items =>
                //   items.map(item => ({
                //     ...item,
                //     label:
                //       item.label == "na" || item.label == " "
                //         ? "Others"
                //         : item.label,
                //   }))
                // }
                attribute="publication"
              />
            </div>

            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className={`${styles.Refineheader}`}>Book Condition</h5>
              <CustomRefinementList attribute="book_condition" />
            </div>
            <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
              {/* <h5 className='Refineheader'>Shiping and Handling</h5> */}
              {/* <CustomRangeSlider
      attribute={"new_pricing"}/>
              <CustomRangeInput attribute="new_pricing" /> */}
              {/* <CustomRangeInput attribute="new_pricing" />
              <CustomNumericMenu
                attribute='new_pricing'
                items={[
                  { label: "Less than ₹99", start: 0, end: 99 },
                  { label: "Less than ₹499", start: 100, end: 500 },
                  { label: "More than ₹500", start: 500 },
                ]}
              /> */}
            </div>
          </div>

          {/* <Results> */}
            <div className="bg-white col-12 col-sm-6 col-md-8 col-lg-9">
              <div
                className="border d-none d-sm-block d-md-block d-lg-block"
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 5000,
                  backgroundColor: "#fff",
                  // marginLeft: "4px",
                  padding: "2px 0",
                }}
              >
                <div className="">
                  <CustomSortBy
                    defaultRefinement={`${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,i_date:desc`}
                    items={[
                      
                      {
                        value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`,
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
                </div>
              </div>

              <div
                style={{
                  position: "sticky",
                  top: 50,
                  zIndex: 100,
                  backgroundColor: "#fff",
                  padding: "0.5rem 0",
                }}
                className="d-block d-sm-none d-md-none d-lg-none d-flex"
              >
                <Button
                  size="small"
                  style={{
                    padding: 0,
                    width: "50%",
                    textTransform: "capitalize",
                  }}
                  variant=""
                  onClick={() => {
                    setSortbyDrawer(true);
                  }}
                >
                  <FilterListIcon style={{ color: "#444" }} /> Sort By
                </Button>
                <Drawer
                  anchor="bottom"
                  open={SortbyDrawer}
                  // BackdropProps={{
                  //   style: {
                  //     backgroundColor: "#000",
                  //     opacity: "0.85",
                  //   },
                  // }}
                  onClose={() => {
                    // window.location.reload()
                    // setSortbyDrawer(false);
                    if (urltopush) {
                      router.push(urltopush, undefined, { scroll: false });
                    } else {
                      window.location.reload();
                    }
                  }}
                >
                  <CustomSortByMobile
                    setSortbyDrawer={setSortbyDrawer}
                    urltopush={urltopush}
                    defaultRefinement={`${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,i_date:desc`}
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
                  <div style={{ position: "sticky", bottom: 0 }}>
                    <Button
                      onClick={() => {
                        // window.location.reload()
                        if (urltopush) {
                          router.push(urltopush, undefined, { scroll: false });
                        } else {
                          window.location.reload();
                        }
                        // setFilterDrawer(false);
                      }}
                      fullWidth
                      variant="contained"
                      style={{
                        justifySelf: "flex-end",
                        textTransform: "capitalize",
                        background:
                          "linear-gradient(90deg, #2157ad 0%, #6190da 100%)",
                      }}
                    >
                      Apply SortBy
                    </Button>
                  </div>
                </Drawer>
                <div style={{ borderLeft: "1px solid #000" }}></div>
                <Button
                  size="small"
                  style={{
                    padding: 0,
                    width: "50%",
                    textTransform: "capitalize",
                  }}
                  variant=""
                  onClick={() => {
                    setFilterDrawer(true);
                  }}
                >
                  <FilterAltIcon style={{ color: "#444" }} /> Filters
                </Button>
                <Drawer
                  anchor="right"
                  open={FilterDrawer}
                  // BackdropProps={{
                  //   style: {
                  //     backgroundColor: "#fff",
                  //     opacity: "0.9",
                  //   },
                  // }}
                  onClose={() => {
                    // window.location.reload()
                    if (urltopush) {
                      router.push(urltopush, undefined, { scroll: false });
                    } else {
                      window.location.reload();
                      setFilterDrawer(false);
                    }
                  }}
                  PaperProps={{
                    sx: { width: "75%" },
                  }}
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(90deg, #2157AD 0%, #6190DA 100%)",
                      height: "2.063rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      {/* <FilterAltOutlinedIcon fontSize='small' style={{color:'#fff'}}/><h3 style={{margin:0,fontSize:"1rem",color:'#fff'}}>Filters</h3> */}
                      <div
                        style={{
                          margin: "0.5rem 0rem 0.5rem 1rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FilterAltOutlinedIcon
                          fontSize="small"
                          style={{ color: "#fff" }}
                        />
                        <h3
                          style={{
                            margin: 0,
                            fontSize: "1rem",
                            color: "#fff",
                          }}
                        >
                          Filters
                        </h3>
                      </div>
                    </div>
                  </div>
                  <IconButton
                    onClick={() => {
                      // window.location.reload()
                      if (urltopush) {
                        router.push(urltopush, undefined, { scroll: false });
                      } else {
                        window.location.reload();
                        setFilterDrawer(false);
                      }
                    }}
                    style={{
                      background: "#fff",
                      padding: "0.35rem",
                      borderRadius: "50%",
                      position: "absolute",
                      zIndex: 1000,
                      top: 0,
                      right: 10,
                      opacity: 0.8,
                    }}
                  >
                    <CloseIcon fontSize="small" style={{ color: "#000" }} />
                  </IconButton>
                  <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                    <CustomClearRefinements />
                  </div>
                  <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                    <h5 className={`${styles.Refineheader}`}>Authors</h5>
                    <CustomRefinementListMobile
                      searchable={true}
                      // transformItems={items =>
                      //   items.map(item => ({
                      //     ...item,
                      //     label:
                      //       item.label == "na" || item.label == " "
                      //         ? "Others"
                      //         : item.label,
                      //   }))
                      // }
                      attribute="author"
                    />
                  </div>
                  <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                    <h5 className={`${styles.Refineheader}`}>Binding</h5>
                    <CustomRefinementListMobile attribute="binding" />
                  </div>

                  <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                    <h5 className={`${styles.Refineheader}`}>Language</h5>
                    <CustomRefinementListMobile attribute="language" />
                  </div>
                  <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                    <h5 className={`${styles.Refineheader}`}>Age Group</h5>
                    <CustomRefinementListMobile
                      // transformItems={items =>
                      //   items.map(item => ({
                      //     ...item,
                      //     label: item.label == "0" ? "All Age" : item.label == "1" ? "0-2 years":
                      //     item.label == "2" ? "3-5 years":item.label == "3" ? "6-9 years":
                      //     item.label == "4" ? "10-12 years":item.label == "5" ? "13-18 years":item.label
                      //   }))
                      // }
                      attribute="aged_group"
                    />
                  </div>
                  {/* <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className="Refineheader">Stock</h5>
              <CustomRefinementListMobile defaultRefinement={'n'} 
              transformItems={items =>
                items.map(item => ({
                  ...item,
                  label: item.label=='N'||item.label=='n'?"In Stock":'Out Of Stock',
                }))
              }
              attribute="is_out_of_stack" />
            </div> */}

                  <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                    <h5 className={`${styles.Refineheader}`}>Publication</h5>
                    <CustomRefinementListMobile
                      searchable={true}
                      // transformItems={items =>
                      //   items.map(item => ({
                      //     ...item,
                      //     label:
                      //       item.label == "na" || item.label == " "
                      //         ? "Others"
                      //         : item.label,
                      //   }))
                      // }
                      attribute="publication"
                    />
                  </div>

                  <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                    <h5 className={`${styles.Refineheader}`}>Book Condition</h5>
                    <CustomRefinementListMobile attribute="book_condition" />
                  </div>

                  <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                    <h5 className={`${styles.Refineheader}`}>Category</h5>
                    <CustomRefinementListMobile attribute="category" />
                  </div>
                  <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                    {/* <h5 className='Refineheader'>Shiping and Handling</h5> */}
                    {/* <CustomRangeSlider
      attribute={"new_pricing"}/>
              <CustomRangeInput attribute="new_pricing" /> */}
                    {/* <CustomRangeInput attribute="new_pricing" />
                    <CustomNumericMenuMobile
                      attribute='new_pricing'
                      items={[
                        { label: "Less than ₹99", start: 0, end: 99 },
                        { label: "Less than ₹499", start: 100, end: 500 },
                        { label: "More than ₹500", start: 500 },
                      ]}
                    /> */}
                  </div>
                  <div style={{ position: "sticky", bottom: 0 }}>
                    <Button
                      onClick={() => {
                        // window.location.reload()
                        router.push(urltopush, undefined, { scroll: false });
                        // setFilterDrawer(false);
                      }}
                      fullWidth
                      variant="contained"
                      style={{
                        justifySelf: "flex-end",
                        textTransform: "capitalize",
                        background:
                          "linear-gradient(90deg, #2157ad 0%, #6190da 100%)",
                      }}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </Drawer>
              </div>
              <div style={{ borderTop: "1px solid #ddd" }}>
                <CustomHits />
              </div>
            </div>
          {/* </Results> */}
        </div>
        {/* <InfiniteHits/> */}
      </InstantSearch>
      <style jsx>{``}</style>
    </div>
  );
}

export default FreeBook;
