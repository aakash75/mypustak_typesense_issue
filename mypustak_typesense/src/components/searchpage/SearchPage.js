import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/SearchPage.module.css"

import dynamic from "next/dynamic";
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
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
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
  usePrevious,
} from "../../helper/helpers";
const BookCard = dynamic(() => import("../bookcard/BookCard"), { ssr: false });
import BookCardSkeleton from "../bookcard/BookCardSkeleton";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CustomClearRefinements from "../instantsearchcustomcomponents/ClearRefinements";
import CustomRefinementList from "../instantsearchcustomcomponents/RefinementList";
import CustomSortBy from "../instantsearchcustomcomponents/SortBy";
import Loader from "../loader/Loader";
import CustomNumericMenu from "../instantsearchcustomcomponents/NumericMenu";
import CustomSortByMobile from "../instantsearchcustomcomponents/SortByMobile";
import CustomRangeInput from "../instantsearchcustomcomponents/PriceRangeInput";
import CustomRefinementListMobile from "../instantsearchcustomcomponents/RefinementListMobile";
import CustomNumericMenuMobile from "../instantsearchcustomcomponents/NemeriMenuMobile";
import MobileDetect from "mobile-detect";
import { useRouter } from "next/navigation";

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
    sort_by: "num_is_out_of_stack:asc",
    filter_by: "&& is_out_of_stack:['n', 'y']&& book_type:[0, 2]",
    facet_by:
      "author,publication,category,language,keywords,book_type,binding,book_condition,subject,class",
    num_typos: 5,
    typo_tokens_threshold: 10,
    page: 1,
    per_page: 16,
  },
  connectionTimeoutSeconds: 10,
});
const searchClient = typesenseInstantsearchAdapter.searchClient;


function CustomSearchBox({ hits, currentRefinement, refine, value }) {

  useEffect(() => {
    if (value) {
      if (value.length > 0) {
        refine(value);
      }
    }
  }, [value]);

  return (
    <div>

    </div>
  );
}
const SearchBox = connectSearchBox(CustomSearchBox);

const Results = connectStateResults(
  ({ searchState, searchResults, children, error, isSearchStalled }) =>
    searchResults && searchResults.nbHits !== 0 ? (
      children
    ) : isSearchStalled ? (
      <Loader />
    ) : (
      <center
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "88vh",
          zIndex: "100",
          backgroundColor: "#fff",
          position: "absolute",
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
            Oops!No results found for <b>{searchState.query}</b>
          </span>
          <p style={{ fontSize: "1.6rem", color: "#555" }}>
            Please check the spelling or try searching for something else
          </p>
        </div>
      </center>
    )
);

const ArrangeData = ({
  processingTimeMS,
  hits,
  hasPrevious,
  refinePrevious,
  hasMore,
  refineNext,
}) => {
  const [datalength, setdatalength] = useState(1);
  const loadData = () => {
    refineNext();
    if (hasMore) {
      setdatalength(datalength + 1);
    }
  };
  return (
    <div >
      <InfiniteScroll
      
        next={loadData}
        dataLength={datalength}
        scrollThreshold='90%'
        hasMore={hasMore}
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
          {hits.map(aD => (
            <div key={aD.book_id} className='col-6 col-sm-12 col-md-6 col-lg-3'>
              <BookCard
                Booktitle={aD.title}
                book={aD}
                price={aD.price}
                categories={aD.author != "na" ? aD.author : aD.publication}
                image={aD.thumb}
              />
            </div>
            // <p key={aD.book_id}>{aD.title},{aD.is_out_of_stack}</p>
          ))}
        </div>
      </InfiniteScroll>
      <style jsx>
        {`
          @media screen and (max-width: 768px) {
            .filters {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
};

const CustomSearchHits = connectInfiniteHits(ArrangeData);

const DEBOUNCE_TIME = 0;

function getCategorySlug(name) {
  const encodedName = name;

  return encodedName.split(" ").map(encodeURIComponent).join("+");
}
function getCategoryName(slug) {
  const decodedSlug = slug;

  return decodedSlug.split("+").map(decodeURIComponent).join(" ");
}
const createURL = state => {
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
    queryParameters.sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc`;
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

const searchStateToUrl = searchState =>
  searchState ? createURL(searchState) : "";

const urlToSearchState = location => {
  const pathnameMatches = location.pathname;
  console.log(location.asPath.split("?")[1], "pathnameMatches");
  const category = getCategoryName(
    (pathnameMatches && pathnameMatches[1]) || ""
  );
  const {
    query = "",
    page = 1,
    sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc`,
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

function SearchPage(props) {
  const [value, setvalue] = useState("");
  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("value");
    setvalue(name);
    let rtl = queryParams.get("ret");

    setqueryString = rtl;
    props.fetch_wishlist_detail_otherpage();
    if (props.userComponentStatus != 2) {
      // props.updateCartlocalStorage();
    }
    props.setComponentStatus(1);
  }, []);
  // useEffect(() => {

  // }, [])

  let [queryString, setqueryString] = useState("");
  const [hover, setHover] = useState(false);
  const [showTrackDialog, setshowTrackDialog] = useState(false);
  const [showLoginDialog, setshowLoginDialog] = useState(false);
  const [toTrackid, settoTrackid] = useState("");
  const [Emailid, setEmailid] = useState("");
  const [EmailErr, setEmailErr] = useState(false);
  const [Mobile, setMobile] = useState("");
  const [MobileErr, setMobileErr] = useState(false);
  const [Password, setPassword] = useState("");
  const [PasswordErr, setPasswordErr] = useState(false);
  const [Signuptoggle, setSignuptoggle] = useState(false);
  const [Logintoggle, setLogintoggle] = useState(false);
  const [checkUserLoader, setcheckUserLoader] = useState(false);
  const [signupLoader, setsignupLoader] = useState(false);
  const hoverStyle = {
    display: "block",

    padding: "0rem 1rem",
    paddingTop: "0.7rem",
    textDecoration: "none",
    cursor: "pointer",
  };

  const normalStyle = {
    display: "none",
    position: "absolute",
  };

  const onMouseEnter = () => {
    setHover(true);
  };

  const [FilterDrawer, setFilterDrawer] = useState(false);
  const [urltopush, seturltopush] = useState("");
  const [SortbyDrawer, setSortbyDrawer] = useState(false);
  const router = useRouter();
  const [searchState, setSearchState] = useState(urlToSearchState(router));
  const debouncedSetStateRef = useRef(null);

  const onSearchStateChange = updatedSearchState => {
    clearTimeout(debouncedSetStateRef.current);

    debouncedSetStateRef.current = setTimeout(() => {
      let author = "";
      let publication = "";
      let binding = "";
      let language = "";
      let book_condition = "";
      let aged_group = "";
      let sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc`;
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
      // let authorvar = props.authorname.split(" ").join("-")
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
        "/search/?value=" +
        value +
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
          "/search/?value=" +
          value +
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
      <InstantSearch
        indexName={INSTANTSEARCHSCHEMA}
        searchClient={searchClient}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
        createURL={createURL}>
        <Configure filters='' />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
          // className="combinedDiv"
          >
            <div style={{ display: "none" }} className={`${styles.mainNavDiv}`}>
              <div className={`${styles.midDiv} d-sm-flex`}>
                <SearchBox value={value} />
              </div>
            </div>
          </div>
          <div
            className='row g-0'
            style={{ marginTop: "1rem", justifyContent: "center" }}>
            <div
              className={` ${styles.filterDiv} bg-white col-3 d-none d-sm-block d-md-block d-lg-block align-items-center`}
              style={{
                maxWidth: "14.563rem",
                minWidth: "14.563rem",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
                height: "fit-content",
              }}>
              <div
                className=''
                style={{
                  background:
                    " linear-gradient(90deg, #2157AD 0%, #6190DA 100%)",
                  height: "2.063rem",
                  display: "flex",
                  alignItems: "center",
                }}>
                <div
                  style={{
                    margin: "0.5rem 0rem 0.5rem 1rem",
                    display: "flex",
                    alignItems: "center",
                  }}>
                  <FilterAltOutlinedIcon
                    fontSize='small'
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
                  attribute='author'
                />
              </div>
              <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                <h5 className={`${styles.Refineheader}`}>Binding</h5>
                <CustomRefinementList attribute='binding' />
              </div>

              <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                <h5 className={`${styles.Refineheader}`}>Language</h5>
                <CustomRefinementList attribute='language' />
              </div>
              <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                <h5 className={`${styles.Refineheader}`}>Age Group</h5>
                <CustomRefinementList
                  attribute='aged_group'
                />
              </div>
              {/* <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                <h5 className='Refineheader'>Book Type</h5>
                <CustomRefinementList
                  attribute='book_type'
                />
              </div> */}
              <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                <h5 className={`${styles.Refineheader}`}>Publication</h5>
                <CustomRefinementList
                  searchable={true}
                  attribute='publication'
                />
              </div>

              <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                <h5 className={`${styles.Refineheader}`}>Book Condition</h5>
                <CustomRefinementList attribute='book_condition' />
              </div>

              <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                <h5 className={`${styles.Refineheader}`}>Category</h5>
                <CustomRefinementList attribute='parent_category' />
                <div style={{ marginLeft: "1rem", marginTop: "-0.3rem" }}>
                  <CustomRefinementList attribute='category' />
                </div>
              </div>
              <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                <h5 className={`${styles.Refineheader}`}>Price/Shipping and Handling</h5>
                <CustomRangeInput attribute='new_pricing' />
                <CustomNumericMenu
                  attribute='new_pricing'
                  items={[
                    { label: "Less than ₹99", start: 0, end: 99 },
                    { label: "Less than ₹499", start: 100, end: 500 },
                    { label: "More than ₹500", start: 500 },
                  ]}
                />
              </div>
            </div>
            <Results>
              <div className='bg-white border col-12 col-sm-6 col-md-8 col-lg-9'>
                <div
                  className=''
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    backgroundColor: "#fff",
                    padding: "2px 0",
                  }}>
                  <div className='d-none d-sm-block d-md-block d-lg-block'>
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
                  className='d-block d-sm-none d-md-none d-lg-none d-flex'>
                  <Button
                    size='small'
                    style={{
                      padding: 0,
                      width: "50%",
                      textTransform: "capitalize",
                    }}
                    variant=''
                    onClick={() => {
                      setSortbyDrawer(true);
                    }}>
                    <FilterListIcon style={{ color: "#444" }} /> Sort By
                  </Button>
                  <Drawer
                    anchor='bottom'
                    open={SortbyDrawer}
                    onClose={() => {
                      if (urltopush) {
                        router.push(urltopush, undefined, { scroll: false });
                      } else {
                        window.location.reload();
                      }
                    }}>
                    <CustomSortByMobile
                      setSortbyDrawer={setSortbyDrawer}
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
                    <div style={{ position: "sticky", bottom: 0 }}>
                      <Button
                        onClick={() => {
                          // window.location.reload()
                          if (urltopush) {
                            router.push(urltopush, undefined, {
                              scroll: false,
                            });
                          } else {
                            window.location.reload();
                          }
                          // setFilterDrawer(false);
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
                  <Button
                    size='small'
                    style={{
                      padding: 0,
                      width: "50%",
                      textTransform: "capitalize",
                    }}
                    variant=''
                    onClick={() => {
                      setFilterDrawer(true);
                    }}>
                    <FilterAltIcon style={{ color: "#444" }} /> Filters
                  </Button>
                  <Drawer
                    anchor='right'
                    open={FilterDrawer}
                    onClose={() => {
                      if (urltopush) {
                        window.location.assign(urltopush, undefined, {
                          scroll: false,
                        });
                      } else {
                        window.location.reload();
                      }
                    }}
                    PaperProps={{
                      sx: { width: "75%" },
                    }}>
                    <div
                      style={{
                        background:
                          "linear-gradient(90deg, #2157AD 0%, #6190DA 100%)",
                        height: "2.063rem",
                        display: "flex",
                        alignItems: "center",
                      }}>
                      <div>
                        <div
                          style={{
                            margin: "0.5rem 0rem 0.5rem 1rem",
                            display: "flex",
                            alignItems: "center",
                          }}>
                          <FilterAltOutlinedIcon
                            fontSize='small'
                            style={{ color: "#fff" }}
                          />
                          <h3
                            style={{
                              margin: 0,
                              fontSize: "1rem",
                              color: "#fff",
                            }}>
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
                      }}>
                      <CloseIcon fontSize='small' style={{ color: "#000" }} />
                    </IconButton>
                    <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                      <CustomClearRefinements />
                    </div>
                    <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                      <h5 className={`${styles.Refineheader}`}>Authors</h5>
                      <CustomRefinementListMobile
                        searchable={true}
                        attribute='author'
                      />
                    </div>
                    <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                      <h5 className={`${styles.Refineheader}`}>Binding</h5>
                      <CustomRefinementListMobile attribute='binding' />
                    </div>

                    <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                      <h5 className={`${styles.Refineheader}`}>Language</h5>
                      <CustomRefinementListMobile attribute='language' />
                    </div>
                    <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                      <h5 className={`${styles.Refineheader}`}>Age Group</h5>
                      <CustomRefinementListMobile
                        attribute='aged_group'
                      />
                    </div>
                    {/* <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                      <h5 className='Refineheader'>Book Type</h5>
                      <CustomRefinementListMobile
                        attribute='book_type'
                      />
                    </div> */}
                    <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                      <h5 className={`${styles.Refineheader}`}>Publication</h5>
                      <CustomRefinementListMobile
                        searchable={true}
                        attribute='publication'
                      />
                    </div>

                    <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                      <h5 className={`${styles.Refineheader}`}>Book Condition</h5>
                      <CustomRefinementListMobile attribute='book_condition' />
                    </div>

                    <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                      <h5 className={`${styles.Refineheader}`}>Category</h5>
                      <CustomRefinementListMobile attribute='parent_category' />
                      <div style={{ marginLeft: "1rem", marginTop: "-0.3rem" }}>
                        <CustomRefinementListMobile attribute='category' />
                      </div>
                    </div>
                    <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                      <h5 className={`${styles.Refineheader}`}>
                        Price/Shipping and Handling
                      </h5>
                      <CustomRangeInput attribute='new_pricing' />
                      <CustomNumericMenuMobile
                        attribute='new_pricing'
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
                          if (urltopush) {
                            window.location.assign(urltopush, undefined, {
                              scroll: false,
                            });
                          } else {
                            window.location.reload();
                          }
                        }}
                        fullWidth
                        variant='contained'
                        style={{
                          justifySelf: "flex-end",
                          textTransform: "capitalize",
                          background:
                            "linear-gradient(90deg, #2157ad 0%, #6190da 100%)",
                        }}>
                        Apply Filters
                      </Button>
                    </div>
                  </Drawer>
                </div>
                <div className="search-page" style={{ borderTop: "1px solid #ddd" }}>
                  <CustomSearchHits />
                </div>
              </div>
            </Results>
          </div>
        </div>
      </InstantSearch>

      <style jsx>
        {`
      input::placeholder {
        font-size: 0.8rem;
        padding: 0.5rem;
      }        
        `}
      </style>
    </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
