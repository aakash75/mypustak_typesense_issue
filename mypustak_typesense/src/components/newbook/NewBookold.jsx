import React, { useRef, useState } from "react";
import styles from "../../styles/NewBook.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Configure, connectStateResults } from "react-instantsearch";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import MobileDetect from "mobile-detect";
import qs from "qs";
import { connectInfiniteHits } from "react-instantsearch";
import ReplayIcon from "@mui/icons-material/Replay";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import MediaQuery from "react-responsive";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { InstantSearch } from "react-instantsearch";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import BookCard from "../bookcard/BookCard";
import Loader from "../loader/Loader";
import CustomClearRefinements from "../instantsearchcustomcomponents/ClearRefinements";
import CustomRefinementList from "../instantsearchcustomcomponents/RefinementList";
import CustomSortBy from "../instantsearchcustomcomponents/SortBy";
import CustomNumericMenu from "../instantsearchcustomcomponents/NumericMenu";
import BookCardSkeleton from "../bookcard/BookCardSkeleton";
import { Button, Drawer, NoSsr } from "@mui/material";
import NextBreadcrumbs from "../Breadcrumbs/NextBreadcrumbs";
import {
  CLUSTERHOST,
  INSTANTSEARCHAPIKEY,
  INSTANTSEARCHSCHEMA,
} from "../../helper/helpers";
import CustomSortByMobile from "../instantsearchcustomcomponents/SortByMobile";
import { useRouter } from "next/router";
import CustomRangeInput from "../instantsearchcustomcomponents/PriceRangeInput";
import CustomRefinementListMobile from "../instantsearchcustomcomponents/RefinementListMobile";
import CustomNumericMenuMobile from "../instantsearchcustomcomponents/NemeriMenuMobile";

const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
  // server: {
  //   nodes: [
  //     {
  //       host: "usay3xpekim1nrhdp-1.a1.typesense.net",
  //       port: "443",
  //       protocol: "https",
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
    q: "N",
    query_by: "is_out_of_stack",
    page: 1,
    sort_by: "num_is_out_of_stack:asc,i_date:desc",
    filter_by: "&& book_condition:[0, brandnew] && book_type:[0, 2]",
    facet_by:
      "author,publication,category,language,keywords,book_type,binding,book_condition,subject,class",
    max_facet_values: 30,
    num_typos: 2,
    typo_tokens_threshold: 10,
    per_page: 12,
  },
  connectionTimeoutSeconds: 10,
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const Results = connectStateResults(
  ({ searchState, searchResults, children, error, isSearchStalled }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : isSearchStalled ? (
      <Loader />
    ) : (
      // <div className='row g-0'>
      //   <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
      //     <BookCardSkeleton />
      //   </div>
      //   <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
      //     <BookCardSkeleton />
      //   </div>
      //   <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
      //     <BookCardSkeleton />
      //   </div>
      //   <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
      //     <BookCardSkeleton />
      //   </div>
      //   <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
      //     <BookCardSkeleton />
      //   </div>
      //   <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
      //     <BookCardSkeleton />
      //   </div>
      //   <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
      //     <BookCardSkeleton />
      //   </div>
      //   <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
      //     <BookCardSkeleton />
      //   </div>
      //   <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
      //     <BookCardSkeleton />
      //   </div>
      //   <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
      //     <BookCardSkeleton />
      //   </div>
      //   <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
      //     <BookCardSkeleton />
      //   </div>
      //   <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
      //     <BookCardSkeleton />
      //   </div>
      //   <div className='col-6 col-sm-12 col-md-6 col-lg-3'>
      //     <BookCardSkeleton />
      //   </div>
      // </div>
      <div style={{ marginTop: "5rem" }}>
        <center
        // style={{
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "center",
        //   minHeight: "88vh",
        //   zIndex: "100",
        //   backgroundColor: "#fff",
        //   position: "absolute",
        //   marginTop: "-1rem",
        // }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "8rem",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>
              Oops!No books found please
            </span>
            <Button
              onClick={() => {
                window.location.replace(window.location.pathname);
              }}
              style={{
                textTransform: "capitalize",
                fontSize: "1.5rem",
                marginLeft: "0.5rem",
              }}
              variant="outlined"
            >
              Reload
              <ReplayIcon
                sx={{ fontSize: "3rem", color: "#2258ae", cursor: "pointer" }}
              />
            </Button>
          </div>
        </center>
      </div>
    )
);
const ArrangeData = ({
  hits,
  hasPrevious,
  refinePrevious,
  hasMore,
  refineNext,
}) => {
  const [datalength, setdatalength] = useState(1);
  let inStockData = [];
  let outofstockData = [];
  let skeletonCount = [];
  for (let i = 0; i <= 20; i++) {
    skeletonCount[i] = i;
  }
  let allData = [];
  const loadData = () => {
    refineNext();
    if (hasMore) {
      setdatalength(datalength + 1);
    }
  };
  hits.map((hit) => {
    if (hit.is_out_of_stack == "n") {
      inStockData.push(hit);
    } else {
      outofstockData.push(hit);
    }
    allData = inStockData.concat(outofstockData);
  });
  return hits.length == 0 ? null : (
    <div>
      {/* <input
          type="search"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
        /> */}
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
          {allData.map((aD) => (
            <div key={aD.book_id} className="col-6 col-sm-12 col-md-6 col-lg-3">
              <BookCard
                Booktitle={aD.title}
                book={aD}
                price={aD.price}
                categories={aD.author != "na" ? aD.author : aD.publication}
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

const DEBOUNCE_TIME = 0;

function getCategorySlug(name) {
  const encodedName = name;

  return encodedName.split(" ").map(encodeURIComponent).join("+");
}
function getCategoryName(slug) {
  const decodedSlug = slug;

  return decodedSlug.split("+").map(decodeURIComponent).join(" ");
}
const createURL = (state) => {
  console.log(state, "statesttate");
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

function NewBook() {
  const [FilterDrawer, setFilterDrawer] = useState(false);
  const [SortbyDrawer, setSortbyDrawer] = useState(false);
  const [urltopush, seturltopush] = useState("");
  const router = useRouter();
  const [searchState, setSearchState] = useState(urlToSearchState(router));
  const debouncedSetStateRef = useRef(null);

  // React.useEffect(() => {

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

  // }, [])
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

      let author = "";
      let publication = "";
      let binding = "";
      let language = "";
      let book_condition = "";
      let aged_group = "";
      let sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,i_date:desc`;
      // let sortby = updatedSearchState.sortBy
      // sortby.split('/')
      console.log(
        updatedSearchState,
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

      // window.history.go(searchStateToUrl(updatedSearchState), updatedSearchState);
    }, DEBOUNCE_TIME);

    setSearchState(updatedSearchState);
  };
  return (
    <div>
      <NoSsr>
        <NextBreadcrumbs />
      </NoSsr>
      <InstantSearch
        indexName={INSTANTSEARCHSCHEMA}
        searchClient={searchClient}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
        createURL={createURL}
      >
        <Configure filters='book_condition:["brandnew","0"]' />
        {/* <InfiniteHits hitComponent={CustomHits}/> */}
        <div
          className=" row g-0"
          style={{ marginTop: "1rem", justifyContent: "center" }}
        >
          <div
            className={`${styles.filterDiv} bg-white ${styles.filters}  d-xs-none col-sm-3 col-md-3 col-lg-3`}
            style={{
              maxWidth: "14.563rem",
              minWidth: "14.563rem",
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
              height: "fit-content",
            }}
          >
            <div
              style={{
                background: "linear-gradient(90deg, #2157AD 0%, #6190DA 100%)",
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
                searchable={true}
                // transformItems={items =>
                //   items.map(item => ({
                //     ...item,
                //     label:
                //       item.label == "na" || item.label == ""
                //         ? "Others"
                //         : item.label,
                //   }))
                // }
                attribute="author"
              />
            </div>
            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className={`${styles.Refineheader}`}>Book Condition</h5>
              <CustomRefinementList
                defaultRefinement={{ book_condition: [`brandnew`] }}
                attribute="book_condition"
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

            {/* <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className="Refineheader">Stock</h5>
              <CustomRefinementList defaultRefinement={'n'} 
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

            {/* <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              <h5 className='Refineheader'>Category</h5>
              <CustomRefinementList attribute='category' searchable={true} />
            </div> */}
            <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
              <h5 className={`${styles.Refineheader}`}>Price </h5>
              {/* <CustomRangeSlider
      attribute={"new_pricing"}/>
              <CustomRangeInput attribute="new_pricing" /> */}
              <CustomRangeInput attribute="price" />
              <CustomNumericMenu
                attribute="price"
                items={[
                  { label: "Less than ₹99", start: 0, end: 99 },
                  { label: "Less than ₹499", start: 100, end: 500 },
                  { label: "More than ₹500", start: 500 },
                ]}
              />
            </div>
          </div>
          <MediaQuery maxWidth={576}>
            <div></div>
          </MediaQuery>
          <MediaQuery maxWidth={576}>
            <div></div>
          </MediaQuery>
          <Results>
            <div className="bg-white col-sm-6 col-md-8 col-lg-9">
              <div
                className="position-sticky top-60 border d-none d-md-block d-sm-block d-lg-block "
                style={{
                  zIndex: 100,
                  backgroundColor: "#fff",
                  // marginLeft: "4px",
                  padding: "2px 0",
                }}
              >
                <div className="">
                  <CustomSortBy
                    // defaultRefinement={`${INSTANTSEARCHSCHEMA}/sort/i_date:desc`}
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
                </div>
              </div>

              <MediaQuery maxWidth={576}>
                <div
                  style={{
                    position: "sticky",
                    top: 50,
                    zIndex: 100,
                    backgroundColor: "#fff",
                    padding: "0.5rem 0",
                  }}
                  className="d-flex"
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
                    onClose={() => {
                      if (urltopush) {
                        router.push(urltopush, undefined, { scroll: false });
                      } else {
                        window.location.reload();
                      }
                      // setSortbyDrawer(false);
                    }}
                  >
                    <CustomSortByMobile
                      // defaultRefinement={`${INSTANTSEARCHSCHEMA}/sort/i_date:desc`}
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
                          if (urltopush) {
                            router.push(urltopush, undefined, {
                              scroll: false,
                            });
                          } else {
                            window.location.reload();
                          }
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
                    PaperProps={{
                      sx: { width: "75%" },
                    }}
                    onClose={() => {
                      if (urltopush) {
                        // alert(urltopush)
                        window.location.assign(urltopush, undefined, {
                          scroll: false,
                        });
                      } else {
                        // alert(urltopush)
                        window.location.reload();
                        setFilterDrawer(false);
                      }
                    }}
                  >
                    <div></div>
                    <div
                      style={{
                        background:
                          "linear-gradient(90deg, #2157AD 0%, #6190DA 100%)",
                        height: "2.063rem",
                        width: "100%",
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
                        if (urltopush) {
                          window.location.assign(urltopush, undefined, {
                            scroll: false,
                          });
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
                        //       item.label == "na" || item.label == ""
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
              <h5 className="Refineheader">Out Of Stock</h5>
              <CustomRefinementListMobile defaultRefinement={'N'} 
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

                    <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                      <h5 className={`${styles.Refineheader}`}>Pricee </h5>
                      {/* <CustomRangeSlider
      attribute={"new_pricing"}/>
              <CustomRangeInput attribute="new_pricing" /> */}
                      <CustomRangeInput attribute="price" />
                      <CustomNumericMenuMobile
                        attribute="price"
                        items={[
                          { label: "Less than ₹99", start: 0, end: 99 },
                          { label: "Less than ₹499", start: 100, end: 500 },
                          { label: "More than ₹500", start: 500 },
                        ]}
                      />
                    </div>

                    <div style={{ position: "sticky", bottom: 0 }}>
                      <Button
                        onClick={() => {
                          window.location.assign(urltopush, undefined, {
                            scroll: false,
                          });
                          // setFilterDrawer(false)
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
              </MediaQuery>
              <div style={{ borderTop: "1px solid #ddd" }}>
                <CustomHits />
              </div>
            </div>
          </Results>
        </div>
        {/* <InfiniteHits/> */}
      </InstantSearch>
      <style jsx>{``}</style>
    </div>
  );
}

export default NewBook;
