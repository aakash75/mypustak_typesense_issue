import React, { useRef, useState } from "react";
import styles from "../../styles/FreeBook.module.css";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import MobileDetect from "mobile-detect";
import { useRouter } from "next/navigation";
import qs from "qs";
import { connectNumericMenu } from "instantsearch.js/es/connectors";
// import { connectInfiniteHits } from "react-instantsearch";
import { connectInfiniteHits } from "instantsearch.js/es/connectors";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { InfiniteHits, InstantSearch, Configure } from "react-instantsearch";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import BookCard from "../bookcard/BookCard";
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
import { history } from "instantsearch.js/es/lib/routers";
import {
  CLUSTERHOST,
  INSTANTSEARCHAPIKEY,
  INSTANTSEARCHSCHEMA,
} from "../../helper/helpers";
import CustomSortByMobile from "../instantsearchcustomcomponents/SortByMobile";
import Loader from "../loader/Loader";
import CustomRefinementListMobile from "../instantsearchcustomcomponents/RefinementListMobile";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomInfinite from "../instantsearchcustomcomponents/CustomInfinite";
import { simple } from "instantsearch.js/es/lib/stateMappings";
import CustomFilterDrawer from "../FilterDrawer.js/CustomFilterDrawer";
import Backdrop from "../FilterDrawer.js/Backdrop";
import CustomBottomDrawer from "../FilterDrawer.js/CustomBottomDrawer";
import CustomNumericMenu from "../instantsearchcustomcomponents/NumericMenu";
import CustomRangeInput from "../instantsearchcustomcomponents/PriceRangeInput";

// create typesense Adapter for search query
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
    cacheSearchResultsForSeconds: 0,
  },
  additionalSearchParameters: {
    q: "*",
    filter_by: "isOutOfStock:N &&bookType:[2]",
    facet_filter_by: "isOutOfStock:N &&bookType:[2]",
    query_by: "title",
    page: 1,
    facet_by:
      "author,publication,category,language,keywords,book_type,binding,bookCondition,subject,class",
    max_facet_values: 30,
    num_typos: 2,
    typo_tokens_threshold: 10,
    per_page: 12,
    sort_by: "num_is_out_of_stack:asc,bookId:desc",
  },
  // additionalSearchParameters: {
  //     "q"         : "*",
  //     "query_by"  : "embedding",
  //     // "include_fields":'title,author,imageUrl,bookCondition,',
  //     "max_facet_values": 30,
  //     "num_typos": 2,
  //     "typo_tokens_threshold": 10,
  //     "per_page": 12,
  //     "filter_by":"bookCondition:[BrandNew]&& isOutOfStock:N"
  // },
  connectionTimeoutSeconds: 20,
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

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
  alert("hi");
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
    queryParameters.sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`;
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

const urlToSearchState = (location) => {
  const pathnameMatches = location.pathname;
  // console.log(location.asPath.split("?")[1], "pathnameMatches");
  const category = getCategoryName(
    (pathnameMatches && pathnameMatches[1]) || ""
  );
  const {
    query = "",
    page = 1,
    sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`,
    author = [],
    publication = [],
    binding = [],
    language = [],
    book_condition = [],
    aged_group = [],
  } = qs.parse(
    // location.query.slice(1)
    // location.asPath.split("?")[1]
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
const DEBOUNCE_TIME = 0;
function NewBook({ hits }, props) {
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

  const [drawerOpen, SetdrawerOpen] = useState(false);
  const [bottomdrawerOpen, SetbottomdrawerOpen] = useState(false);

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
      let sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`;
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

      if (updatedSearchState.refinementList.bookCondition) {
        book_condition =
          "&book_condition=" +
          updatedSearchState.refinementList.bookCondition.map(
            decodeURIComponent
          );
      }
      if (updatedSearchState.refinementList.agedGroup) {
        aged_group =
          "&aged_group=" +
          updatedSearchState.refinementList.agedGroup.map(decodeURIComponent);
      }
      let urlvar =
        "?" +
        sortBy +
        author +
        publication +
        binding +
        language +
        bookCondition +
        agedGroup;
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
            bookCondition +
            agedGroup,
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

  const routing = {
    router: history({
      createURL({ qsModule, routeState, location }) {
        const urlParts = location.href.match(/^(.*?)\/search/);
        const baseUrl = `${urlParts ? urlParts[1] : ""}/`;

        // const categoryPath = routeState.category
        //   ? `${getCategorySlug(routeState.category)}/`
        //   : '';
        console.log(routeState, "routeState543");
        const queryParameters = {};
        if (routeState == undefined) {
          return `/get-books`;
        }
        const isDefaultRoute =
          !routeState.query &&
          routeState.page === 1 &&
          routeState.sortBy &&
          routeState.refinementList &&
          routeState.refinementList.author.length === 0 &&
          routeState.refinementList.publication.length === 0 &&
          routeState.refinementList.binding.length === 0 &&
          routeState.refinementList.language.length === 0 &&
          routeState.refinementList.book_condition.length === 0 &&
          routeState.refinementList.aged_group.length === 0 &&
          routeState.menu &&
          !routeState.menu.categories;

        // if (routeState.page !== 1) {
        //   queryParameters.page = routeState.page;
        // }

        console.log(routeState, "routeState");
        if (routeState.sortBy !== 1) {
          queryParameters.sortBy = routeState.sortBy;
        } else {
          queryParameters.sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,i_date:desc`;
        }

        if (routeState.author) {
          queryParameters.author = routeState.author.map(encodeURIComponent);
        }
        // if (routeState.author) {
        //   queryParameters.author = routeState.author.map(encodeURIComponent);
        // }

        if (routeState.publication) {
          queryParameters.publication =
            routeState.publication.map(encodeURIComponent);
        }
        if (routeState.binding) {
          queryParameters.binding = routeState.binding.map(encodeURIComponent);
        }

        if (routeState.language) {
          queryParameters.language =
            routeState.language.map(encodeURIComponent);
        }

        if (routeState.bookCondition) {
          queryParameters.bookCondition =
            routeState.bookCondition.map(encodeURIComponent);
        }
        if (routeState.agedGroup) {
          queryParameters.agedGroup =
            routeState.agedGroup.map(encodeURIComponent);
        }

        // if (routeState.query) {
        //   queryParameters.query = encodeURIComponent(routeState.query);
        // }
        // if (routeState.page !== 1) {
        //   queryParameters.page = routeState.page;
        // }
        // if (routeState.author) {
        //   queryParameters.author = routeState.author.map(encodeURIComponent);
        // }

        const queryString = qsModule.stringify(queryParameters, {
          addQueryPrefix: true,
          arrayFormat: "comma",
          format: "RFC1738",
        });
        console.log(queryString, "queryString612");
        // return `/free-books/${categoryPath}${queryString}`;
        return `/get-books${queryString}`;
      },

      parseURL({ qsModule, location }) {
        const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);
        const category = getCategoryName(pathnameMatches?.[1] || "");
        const {
          query = "",
          page,
          author = [],
          binding = [],
          language = [],
          agedGroup = [],
          publication = [],
          bookCondition = [],
        } = qsModule.parse(location.search.slice(1));
        let newauthor = [];
        let newbinding = [];
        let newLanguage = [];
        let newAgedGroup = [];
        let newPublication = [];
        let newbookCondition = [];
        if (author.length) {
          newauthor = author.split(",");
        }
        if (binding.length) {
          newbinding = binding.split(",");
        }
        if (language.length) {
          newLanguage = language.split(",");
        }

        if (agedGroup.length) {
          newAgedGroup = agedGroup.split(",");
        }

        if (publication.length) {
          newPublication = publication.split(",");
        }
        if (bookCondition.length) {
          newbookCondition = bookCondition.split(",");
        }
        console.log(
          qsModule.parse(location.search.slice(1)),
          "indexUiState55 parsee"
        );
        // `qs` does not return an array when there's a single value.
        const allAuthors = Array.isArray(newauthor)
          ? newauthor
          : [newauthor].filter(Boolean);

        const allbinding = Array.isArray(newbinding)
          ? newbinding
          : [newbinding].filter(Boolean);
        const allLanguage = Array.isArray(newLanguage)
          ? newLanguage
          : [newLanguage].filter(Boolean);
        const allAgedGroup = Array.isArray(newAgedGroup)
          ? newAgedGroup
          : [newAgedGroup].filter(Boolean);
        const allPublication = Array.isArray(newPublication)
          ? newPublication
          : [newPublication].filter(Boolean);
        const allBookCondition = Array.isArray(newbookCondition)
          ? newbookCondition
          : [newbookCondition].filter(Boolean);
        return {
          query: decodeURIComponent(query),
          page,
          author: allAuthors.map(decodeURIComponent),
          binding: allbinding.map(decodeURIComponent),
          language: allLanguage.map(decodeURIComponent),
          agedGroup: allAgedGroup.map(decodeURIComponent),
          publication: allPublication.map(decodeURIComponent),
          bookCondition: allBookCondition.map(decodeURIComponent),
          // author: ['pegasus'],
          sortBy: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`,

          category,
        };
      },
    }),

    stateMapping: {
      // this make url from filters
      stateToRoute(uiState) {
        const indexUiState = uiState[INSTANTSEARCHSCHEMA] || {};
        if ("refinementList" in indexUiState) {
          console.log(
            indexUiState.refinementList,
            "indexUiState55",
            indexUiState
          );
          return {
            query: indexUiState.query,
            page: indexUiState.page,
            author:
              indexUiState.refinementList && indexUiState.refinementList.author,
            binding:
              indexUiState.refinementList &&
              indexUiState.refinementList.binding,
            language:
              indexUiState.refinementList &&
              indexUiState.refinementList.language,
            agedGroup:
              indexUiState.refinementList &&
              indexUiState.refinementList.agedGroup,
            publication:
              indexUiState.refinementList &&
              indexUiState.refinementList.publication,
            bookCondition:
              indexUiState.refinementList &&
              indexUiState.refinementList.bookCondition,
            category: indexUiState.menu?.categories,
            sortBy: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`,
          };
        }
      },

      routeToState(routeState) {
        console.log(routeState, "routeState686", routeState.author);
        let a = [routeState.author];
        console.log(a, "aaaaa15");
        return {
          books_collection: {
            query: routeState.query,
            page: routeState.page,
            menu: {
              categories: routeState.category,
            },

            refinementList: {
              author: routeState?.author,
              binding: routeState?.binding,
              language: routeState?.language,
              agedGroup: routeState?.agedGroup,
              publication: routeState?.publication,
              bookCondition: routeState?.bookCondition,
              sortBy: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`,

              //   author:[
              //     "pegasus",
              //     "others"
              // ]
              // author: ['pegasus','others']
            },
          },
        };
      },
    },
  };

  const drawerToggleClickHandler = () => {
    // this.setState({
    //   drawerOpen: !this.state.drawerOpen
    // })
    SetdrawerOpen(!drawerOpen);
  };

  const bottomdrawerToggleClickHandler = () => {
    // this.setState({
    //   drawerOpen: !this.state.drawerOpen
    // })
    SetbottomdrawerOpen(!bottomdrawerOpen);
  };
  let backdrop;
  if (drawerOpen) {
    backdrop = <Backdrop />;
  }

  return (
    <div className="container-fluid">
      <NoSsr>
        <NextBreadcrumbs />
      </NoSsr>

      <InstantSearch
        indexName={INSTANTSEARCHSCHEMA}
        searchClient={searchClient}
        // searchState={searchState}
        // onSearchStateChange={onSearchStateChange}

        // initialUiState={{
        //   books_collection: {
        //      sortBy: 'books_collection/sort/num_is_out_of_stack:asc,iDate:desc',
        //       },
        //     }}

        routing={routing}
      >
        <div
          className="row g-0"
          style={{ marginTop: "1rem", justifyContent: "center" }}
        >
          {/* LEFT FILTER DIV */}
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
              {/* <h5 className={`${styles.Refineheader}`}>Authors</h5> */}
              <CustomRefinementList
                searchable={true}
                attribute="author"
                label="Author"
              />
            </div>

            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              {/* <h5 className={`${styles.Refineheader}`}>Binding</h5> */}
              <CustomRefinementList attribute="binding" label="Binding" />
            </div>

            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              {/* <h5 className={`${styles.Refineheader}`}>Language</h5> */}
              <CustomRefinementList attribute="language" label="Language" />
            </div>

            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              {/* <h5 className={`${styles.Refineheader}`}>Age Group</h5> */}
              <CustomRefinementList attribute="agedGroup" label="Age Group" />
            </div>
            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              {/* <h5 className={`${styles.Refineheader}`}>Publication</h5> */}
              <CustomRefinementList
                searchable={true}
                attribute="publication"
                label="Publication"
              />
            </div>
            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
              {/* <h5 className={`${styles.Refineheader}`}>Book Condition</h5> */}
              <CustomRefinementList
                attribute="bookCondition"
                label="Book Condition"
              />
            </div>

            <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
              {/* <h5 className={`${styles.Refineheader}`}>Price </h5> */}
              <CustomRangeInput attribute="price" label="Price" />

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
          {/* END OF LEFT FILTER DIV */}

          <div className="bg-white col-12 col-sm-6 col-md-8 col-lg-9">
            <div
              className="border d-none d-sm-block d-md-block d-lg-block"
              style={{
                position: "sticky",
                top: 0,
                // zIndex: 1004,
                backgroundColor: "#fff",
                // marginLeft: "4px",
                padding: "2px 0",
              }}
            >
              <div className="">
                <CustomSortBy
                  // defaultRefinement={`${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`}

                  //  initialUiState={{
                  //   books_collection: {
                  //      sortBy: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`,
                  //       },
                  //     }}
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
            </div>

            {/* FOR ONLY MOBILE FILTER */}
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
                onClick={bottomdrawerToggleClickHandler}
                // onClick={() => {
                //     setSortbyDrawer(true);
                // }}
              >
                <FilterListIcon style={{ color: "#444" }} /> Sort By
              </Button>
              {/*   -----------------------------SORT BY DRAWER------------------------------------------------------- */}
              {/* <Drawer
                                anchor="bottom"
                                open={SortbyDrawer}
                                
                                onClose={() => {
                                    if (urltopush) {
                                    router.push(urltopush, undefined, { scroll: false });
                                    } else {
                                    window.location.reload();
                                    }
                                }}
                                > */}

              <CustomBottomDrawer
                show={bottomdrawerOpen}
                anchor="right"
                open={FilterDrawer}
                style={{ zIndex: 1006 }}
                // BackdropProps={{
                //   style: {
                //     backgroundColor: "#fff",
                //     opacity: "0.9",
                //   },
                // }}
                onClose={() => {
                  // window.location.reload()
                  // if (urltopush) {
                  // router.push(urltopush, undefined, { scroll: false });
                  // } else {
                  // window.location.reload();
                  // setFilterDrawer(false);
                  // }
                }}
                // PaperProps={{
                //     sx: { width: "75%" },
                // }}
              >
                <div
                  style={{
                    borderBottom: "1px solid #ddd",
                    color: "#666",
                    padding: "0.5rem",
                    paddingLeft: "1rem",
                    marginBottom: "0.5rem",
                    fontSize: "1.1rem",
                    display: "flex",
                  }}
                >
                  <div>Sort By</div>
                  <div>
                    <IconButton
                      onClick={bottomdrawerToggleClickHandler}
                      style={{
                        background: "#fff",
                        // padding: "0.35rem",
                        borderRadius: "50%",
                        position: "absolute",
                        zIndex: 1000,
                        top: 0,
                        right: 10,
                        opacity: 0.8,
                        padding: "0.5rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      <CloseIcon fontSize="" style={{ color: "#000" }} />
                    </IconButton>
                  </div>
                </div>
                <CustomSortByMobile
                  setSortbyDrawer={setSortbyDrawer}
                  urltopush={urltopush}
                  // onClose={bottomdrawerToggleClickHandler}

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
                <div style={{ position: "sticky", bottom: 0 }}>
                  <Button
                    // onClick={() => {
                    //     // window.location.reload()
                    //     if (urltopush) {
                    //     router.push(urltopush, undefined, { scroll: false });
                    //     } else {
                    //     window.location.reload();
                    //     }
                    //     // setFilterDrawer(false);
                    // }}
                    onClick={bottomdrawerToggleClickHandler}
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
              </CustomBottomDrawer>
              {/* </Drawer> */}
              <div style={{ borderLeft: "1px solid #000" }}>
                <Button
                  size="small"
                  style={{
                    padding: 0,
                    width: "50%",
                    textTransform: "capitalize",
                  }}
                  variant=""
                  // onClick={() => {
                  //     setFilterDrawer(true);
                  // }}

                  onClick={drawerToggleClickHandler}
                >
                  <FilterAltIcon style={{ color: "#444" }} /> Filters
                </Button>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #ddd" }}>
              <CustomInfinite />
            </div>
          </div>
          <div className="d-block d-sm-none d-md-none d-lg-none d-flex">
            <CustomFilterDrawer
              show={drawerOpen}
              anchor="right"
              open={FilterDrawer}
              style={{ zIndex: 1006 }}
              // BackdropProps={{
              //   style: {
              //     backgroundColor: "#fff",
              //     opacity: "0.9",
              //   },
              // }}
              onClose={() => {
                // window.location.reload()
                // if (urltopush) {
                // router.push(urltopush, undefined, { scroll: false });
                // } else {
                // window.location.reload();
                // setFilterDrawer(false);
                // }
              }}
              // PaperProps={{
              //     sx: { width: "75%" },
              // }}
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
                // onClick={() => {
                // // window.location.reload()
                // if (urltopush) {
                //     router.push(urltopush, undefined, { scroll: false });
                // } else {
                //     window.location.reload();
                //     setFilterDrawer(false);
                // }
                // }}
                onClick={drawerToggleClickHandler}
                style={{
                  background: "#fff",
                  padding: "0.35rem",
                  borderRadius: "50%",
                  position: "absolute",
                  zIndex: 1000,
                  top: 0,
                  right: 10,
                  marginTop: "0.5rem",
                  opacity: 0.8,
                }}
              >
                <CloseIcon fontSize="small" style={{ color: "#000" }} />
              </IconButton>
              <div style={{ overflow: "scroll", height: "88vh" }}>
                <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                  <CustomClearRefinements />
                </div>
                <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                  {/* <h5 className={`${styles.Refineheader}`}>Authors</h5> */}
                  <CustomRefinementListMobile
                    searchable={true}
                    attribute="author"
                    label="Author"
                  />
                </div>
                <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                  {/* <h5 className={`${styles.Refineheader}`}>Binding</h5> */}
                  <CustomRefinementListMobile
                    attribute="binding"
                    label="Binding"
                  />
                </div>

                <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                  {/* <h5 className={`${styles.Refineheader}`}>Language</h5> */}
                  <CustomRefinementListMobile
                    attribute="language"
                    label="Language"
                  />
                </div>
                <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                  {/* <h5 className={`${styles.Refineheader}`}>Age Group</h5> */}
                  <CustomRefinementListMobile
                    label="Age Group"
                    attribute="agedGroup"
                  />
                </div>

                <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                  {/* <h5 className={`${styles.Refineheader}`}>Publication</h5> */}
                  <CustomRefinementListMobile
                    searchable={true}
                    attribute="publication"
                    label="Publication"
                  />
                </div>

                <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                  {/* <h5 className={`${styles.Refineheader}`}>Book Condition</h5> */}
                  <CustomRefinementListMobile
                    attribute="bookCondition"
                    label="Book Condition"
                  />
                </div>

                {/* <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                                        <h5 className={`${styles.Refineheader}`}>Category</h5>
                                        <CustomRefinementListMobile attribute="category" />
                                    </div> */}
                <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}></div>
              </div>
              <div style={{ position: "sticky", bottom: 0 }}>
                <Button
                  // onClick={() => {
                  //     // window.location.reload()
                  //     router.push(urltopush, undefined, { scroll: false });
                  //     // setFilterDrawer(false);
                  // }}
                  onClick={drawerToggleClickHandler}
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
            </CustomFilterDrawer>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

export default NewBook;
