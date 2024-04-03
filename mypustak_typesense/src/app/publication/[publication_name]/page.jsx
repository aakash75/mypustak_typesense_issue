"use client"
import React, { useState, useEffect, useRef } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import styles from "../../../styles/Publication.module.css";
import { Configure,  } from "react-instantsearch";
// import { connectInfiniteHits } from "react-instantsearch";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import qs from "qs";

import CloseIcon from "@mui/icons-material/Close";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { getSeoData } from "../../../redux/actions/seodataAction";
import { connect } from "react-redux";
import Head from "next/head";
import { InstantSearch } from "react-instantsearch";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
// import BookCard from "../../components/bookcard/BookCard";
import CustomClearRefinements from "../../../components/instantsearchcustomcomponents/ClearRefinements";
import CustomRefinementList from "../../../components/instantsearchcustomcomponents/RefinementList";
import CustomSortBy from "../../../components/instantsearchcustomcomponents/SortBy";
import CustomNumericMenu from "../../../components/instantsearchcustomcomponents/NumericMenu";
import BookCardSkeleton from "../../../components/bookcard/BookCardSkeleton";
import {
  CLUSTERHOST,
  INSTANTSEARCHAPIKEY,
  INSTANTSEARCHSCHEMA,
} from "../../../helper/helpers";
import { Button, Drawer, IconButton } from "@mui/material";
import CustomSortByMobile from "../../../components/instantsearchcustomcomponents/SortByMobile";
import Loader from "../../../components/loader/Loader";
import CustomRangeInput from "../../../components/instantsearchcustomcomponents/PriceRangeInput";
import { useRouter } from "next/navigation";
import CustomRefinementListMobile from "../../../components/instantsearchcustomcomponents/RefinementListMobile";
import CustomNumericMenuMobile from "../../../components/instantsearchcustomcomponents/NemeriMenuMobile";
import MobileDetect from "mobile-detect";
import { useSnackbar } from "notistack";
import CustomCategoryHits from "../../../components/instantsearchcustomcomponents/CustomCategoryHits";
import CustomFilterDrawer from "../../../components/FilterDrawer.js/CustomFilterDrawer";
import { history } from 'instantsearch.js/es/lib/routers';
import CustomBottomDrawer from "../../../components/FilterDrawer.js/CustomBottomDrawer";

// export async function getServerSideProps({req, query, store, isServer, asPath }) {
//   let publicationname = query.publication_name
//     .split("-")
//     .join(" ")
//     .replace("books", "");
//   console.log("publicationname..................", query);
//   let og_url = "https://www.mypustak.com/publication/"+query.publication_name
//   console.log(og_url , "og_url")
//   const body = {
// 		url: og_url
// 	};
//   const seo_res = await fetch(`https://api.mypustak.com/api/v1/seo_tags/seo-data`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)

//   })
//   const seo_data = await seo_res.json()

//   if(seo_data.redirect_url){
    
//     console.log(seo_data.redirect_url , "seo_data.redirect_url")
//     res.setHeader("Location",seo_data.redirect_url);
//     res.statusCode = 301;
//     res.end();
//   }
//   let title_tag = ""
//   let meta_description = ""
//   if(seo_data.title_tag){
//     title_tag = seo_data.title_tag
//     meta_description = seo_data.meta_desc
    
//   }
//   else{
//     title_tag = 'publication'+ query.publication_name+  '|used books online India !'
//     meta_description = 'publication'+ query.publication_name+ 'Only online free books used bookstore'
//   }
//   console.log(title_tag ,"||", meta_description)



//   return { props: { query,
//                     publicationname, 
//                     title_tag,
//                     meta_description,
//                     og_url:og_url } };
// }

const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
  
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
    query_by: "publication",
    page: 1,
    sort_by: "num_is_out_of_stack:asc,iDate:desc",
    filter_by: "bookType:[0, 2]",
    facet_by:
      "author,publication,category,language,keywords,book_type,binding,bookCondition,subject,class",
    max_facet_values: 30,
    num_typos: 2,
    typo_tokens_threshold: 10,
    per_page: 12,
  },
  connectionTimeoutSeconds: 10,
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

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

const searchStateToUrl = searchState =>
  searchState ? createURL(searchState) : "";

const urlToSearchState = location => {
  const pathnameMatches = location.pathname;
//   console.log(location.asPath.split("?")[1], "pathnameMatches");
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

function Page(props) {
  const [FilterDrawer, setFilterDrawer] = useState(false);
  const [SortbyDrawer, setSortbyDrawer] = useState(false);
  const [urltopush, seturltopush] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const [drawerOpen , SetdrawerOpen] = useState(false);
  console.log(props,"whatisprops");
  const [searchState, setSearchState] = useState(urlToSearchState(router));
  const debouncedSetStateRef = useRef(null);
  const [bottomdrawerOpen , SetbottomdrawerOpen] = useState(false);
 // for Routing error
 let publication_name1 =  props.params.publication_name.split("-").join(" ").replace("books", "");
 let publication_name = publication_name1.split(",");
//   setOrAuther(authorname)
 console.log(props.params.publication_name, "publication255");
 console.log(publication_name, "publication...............");
//   console.log(orAuthor, "authorname...............1");

  //for Routing error
  const bottomdrawerToggleClickHandler = () => {
    // this.setState({
    //   drawerOpen: !this.state.drawerOpen
    // })
    SetbottomdrawerOpen(!bottomdrawerOpen);
  }
  const onSearchStateChange = updatedSearchState => {
    clearTimeout(debouncedSetStateRef.current);

    debouncedSetStateRef.current = setTimeout(() => {
      let author = "";
      let publication = "";
      let binding = "";
      let language = "";
      let book_condition = "";
      let aged_group = "";
      let sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,i_date:desc`;

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
    //   console.log(props.publicationname, "publicationname255");
    //   let publicationvar = props.publicationname.split(" ").join("-");
      let publicationvar = publication_name.split(" ").join("-");
      let urlvar =
        "/publication/books" +
        publicationvar +
        "/?" +
        sortBy +
        author +
        publication +
        binding +
        language +
        book_condition +
        aged_group;
      seturltopush(urlvar);
      if (deviceType != "mobile") {
        router.push(
          "/publication/books" +
            publicationvar +
            "/?" +
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

  const drawerToggleClickHandler = () => {
    // this.setState({
    //   drawerOpen: !this.state.drawerOpen
    // })
    SetdrawerOpen(!drawerOpen);
}


const routing = {
  router: history({
    createURL({ qsModule, routeState, location }) {
      const urlParts = location.href.match(/^(.*?)\/search/);
      const baseUrl = `${urlParts ? urlParts[1] : ''}/`;

      // const categoryPath = routeState.category
      //   ? `${getCategorySlug(routeState.category)}/`
      //   : '';
      console.log(routeState , "routeState543")
      const queryParameters = {};
      if(routeState == undefined){
        return `/publication/${publication_name}`;


      }
      const isDefaultRoute = !routeState.query &&
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

  console.log(routeState , "routeState")
  if (routeState.sortBy !== 1) {
    queryParameters.sortBy = routeState.sortBy;
  } else {
    queryParameters.sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,i_date:desc`;
  }

  if (routeState.author) {
    queryParameters.author =routeState.author.map(encodeURIComponent);
  }
  // if (routeState.author) {
  //   queryParameters.author = routeState.author.map(encodeURIComponent);
  // }

  if (routeState.publication) {
    queryParameters.publication =
      routeState.publication.map(encodeURIComponent);
  }
  if (routeState.binding) {
    queryParameters.binding =
      routeState.binding.map(encodeURIComponent);
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
        arrayFormat: 'comma',
        format: 'RFC1738',
      });
      console.log(queryString , "queryString612");
      console.log(publication_name , "publication_name025")
      // return `/free-books/${categoryPath}${queryString}`;
      // return `/free-books${queryString}`;
      return `/publication/${publication_name}${queryString}`
    },

    parseURL({ qsModule, location }) {
      const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);
      const category = getCategoryName(
        (pathnameMatches?.[1]) || ''
      );
      const { query = '', 
              page, 
              author = [],
              binding = [],
              language=[],
              agedGroup= [],
              publication = [],
              bookCondition = [] } = qsModule.parse(
        location.search.slice(1),
      );
      let newauthor = []
      let newbinding =[]
      let newLanguage = []
      let newAgedGroup = []
      let newPublication = []
      let newbookCondition = []
      if(author.length){
        newauthor = author.split(",")

      }
      if(binding.length){
        newbinding = binding.split(",")
      }
      if(language.length){
        newLanguage = language.split(",")
      }

      if(agedGroup.length){
        newAgedGroup = agedGroup.split(",")
      }

      if(publication.length){
        newPublication = publication.split(",")
      }
      if(bookCondition.length){
        newbookCondition = bookCondition.split(",")
      }
      console.log(qsModule.parse(
        location.search.slice(1),
      ) , "indexUiState55 parsee")
      // `qs` does not return an array when there's a single value.
      const allAuthors = Array.isArray(newauthor)
        ? newauthor
        : [newauthor].filter(Boolean);

      const allbinding = Array.isArray(newbinding)? newbinding : [newbinding].filter(Boolean);
      const allLanguage = Array.isArray(newLanguage)? newLanguage : [newLanguage].filter(Boolean);
      const allAgedGroup = Array.isArray(newAgedGroup)? newAgedGroup : [newAgedGroup].filter(Boolean);
      const allPublication = Array.isArray(newPublication)? newPublication : [newPublication].filter(Boolean);
      const allBookCondition = Array.isArray(newbookCondition)? newbookCondition : [newbookCondition].filter(Boolean);
      return {
        query: decodeURIComponent(query),
        page,
        author: allAuthors.map(decodeURIComponent),
        binding:allbinding.map(decodeURIComponent),
        language: allLanguage.map(decodeURIComponent),
        agedGroup: allAgedGroup.map(decodeURIComponent),
        publication: allPublication.map(decodeURIComponent),
        bookCondition: allBookCondition.map(decodeURIComponent),
        // author: ['pegasus'],
        sortBy:`${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`,


        category,
      };
    },
  }),

  stateMapping: {
    // this make url from filters
    stateToRoute(uiState) {
      const indexUiState = uiState[INSTANTSEARCHSCHEMA] || {};
        if( 'refinementList' in indexUiState ) {

          console.log(indexUiState.refinementList , "indexUiState55" , indexUiState)
          return {
            query: indexUiState.query,
            page: indexUiState.page,
            author: indexUiState.refinementList && indexUiState.refinementList.author,
            binding: indexUiState.refinementList && indexUiState.refinementList.binding,
            language: indexUiState.refinementList && indexUiState.refinementList.language,  
            agedGroup: indexUiState.refinementList && indexUiState.refinementList.agedGroup,
            publication: indexUiState.refinementList && indexUiState.refinementList.publication,
            bookCondition:indexUiState.refinementList && indexUiState.refinementList.bookCondition,
            category: indexUiState.menu?.categories,
            sortBy:`${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`
          };
        }
  
      
    },

    routeToState(routeState) {
      console.log(routeState,"routeState686" , routeState.author)
      let a = [routeState.author,]
      console.log(a, "aaaaa15")
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
            bookCondition:routeState?.bookCondition,
            sortBy:`${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`


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

  return (
    <React.Fragment>
      {/* <Head>
            <title> {props.title_tag}</title>
            <meta
              name='Description'
              property='og:description'
              content={props.meta_description}
            />
            <meta name="title" content={props.title_tag}/>
            <meta name="description" content={props.meta_description}/>

            <meta property="og:type" content="website"/>
            <meta property="og:url" content={props.og_url}/>
            <meta property="og:title" content={props.title_tag}/>
            <meta property="og:description" content={props.meta_description}/>
            <meta property="og:image" content='https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png'/>

          </Head> */}
      <div>
        <InstantSearch
          indexName={INSTANTSEARCHSCHEMA}
          searchClient={searchClient}
          // searchState={searchState}
          // onSearchStateChange={onSearchStateChange}
          // createURL={createURL}
          routing={routing}

          >
          <Configure filters={`publication:${publication_name}`} />

          {/* <InfiniteHits hitComponent={CustomHits}/> */}
          <div
            className='row g-0'
            style={{ marginTop: "1rem", justifyContent: "center" }}>
            <div
              className={`bg-white ${styles.filterDiv} col-3 d-none d-sm-block d-md-block d-lg-block`}
              style={{
                background: "#fff",
                maxWidth: "14.563rem",
                minWidth: "14.563rem",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
                height: "fit-content",
              }}>
              <div
                style={{
                  background:
                    "linear-gradient(90deg, #2157AD 0%, #6190DA 100%)",
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
                  // transformItems={items =>
                  //   items.map(item => ({
                  //     ...item,
                  //     label:
                  //       item.label == "na" || item.label == ""
                  //         ? "Others"
                  //         : item.label,
                  //   }))
                  // }
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
                  // transformItems={items =>
                  //   items.map(item => ({
                  //     ...item,
                  //     label:
                  //       item.label == "0"
                  //         ? "All Age"
                  //         : item.label == "1"
                  //         ? "0-2 years"
                  //         : item.label == "2"
                  //         ? "3-5 years"
                  //         : item.label == "3"
                  //         ? "6-9 years"
                  //         : item.label == "4"
                  //         ? "10-12 years"
                  //         : item.label == "5"
                  //         ? "13-18 years"
                  //         : item.label,
                  //   }))
                  // }
                  attribute='agedGroup'
                />
              </div>
              <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                <h5 className={`${styles.Refineheader}`}>Publication</h5>
                <CustomRefinementList
                  defaultRefinement={[publication_name]}
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
                  attribute='publication'
                />
              </div>

              {/* <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                <h5 className={`${styles.Refineheader}`}>Category</h5>
                <CustomRefinementList attribute='parentCategory' />
                <div style={{ marginLeft: "1rem", marginTop: "-0.3rem" }}>
                  <CustomRefinementList attribute='category' />
                </div>
              </div> */}
              <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                <h5 className={`${styles.Refineheader}`}>
                  Price/Shipping Handling{" "}
                </h5>
                <CustomRangeInput attribute='price' />
                <CustomNumericMenu
                  attribute='price'
                  items={[
                    { label: "Less than ₹99", start: 0, end: 99 },
                    { label: "Less than ₹499", start: 100, end: 500 },
                    { label: "More than ₹500", start: 500 },
                  ]}
                />
              </div>
            </div>
            {/* <Results> */}
              <div className='bg-white col-12 col-sm-6 col-md-8 col-lg-9'>
                <div
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    backgroundColor: "#fff",
                    marginLeft: "4px",
                    padding: "2px 0",
                  }}>
                  <div className='d-none d-sm-block d-md-block d-lg-block'>
                    <CustomSortBy
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
                    // onClick={() => {
                    //   setSortbyDrawer(true);
                    // }}
                    onClick={bottomdrawerToggleClickHandler}

                    >
                    <FilterListIcon style={{ color: "#444" }} /> Sort By
                  </Button>
                  <CustomBottomDrawer  show={bottomdrawerOpen}
                                    anchor="right"
                                    open={FilterDrawer}
                                    style ={{zIndex:1006}}
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
                                       <div style={{borderBottom:'1px solid #ddd',color:'#666',padding:'0.5rem',paddingLeft:'1rem',marginBottom:'0.5rem',fontSize:'1.1rem' , display:'flex', }}>
                                          <div>
                                          Sort By
                                          </div>
                                          <div>
                                          <IconButton
                                                                      
                                              onClick ={bottomdrawerToggleClickHandler}
                                              style={{
                                              background: "#fff",
                                              // padding: "0.35rem",
                                              borderRadius: "50%",
                                              position: "absolute",
                                              zIndex: 1000,
                                              top: 0,
                                              right: 10,
                                              opacity: 0.8,
                                              padding:'0.5rem',
                                              marginTop:"0.5rem"
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
                  <div style={{ borderLeft: "1px solid #000" }}></div>
                  <Button
                    size='small'
                    style={{
                      padding: 0,
                      width: "50%",
                      textTransform: "capitalize",
                    }}
                    variant=''
                    onClick ={drawerToggleClickHandler}

                    // onClick={() => {
                    //   setFilterDrawer(true);
                    // }}
                    >
                    <FilterAltIcon style={{ color: "#444" }} /> Filters
                  </Button>
             
                </div>
                <div style={{ borderTop: "1px solid #ddd" }}>
                  {/* <CustomHits /> */}
                  <CustomCategoryHits/>
                </div>
              </div>
            {/* </Results> */}
          </div>
          {/* <InfiniteHits/> */}
          <div   className="d-block d-sm-none d-md-none d-lg-none d-flex">
          <CustomFilterDrawer  show={drawerOpen}
                                    anchor="right"
                                    open={FilterDrawer}
                                    style ={{zIndex:1006}}
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
                                        onClick ={drawerToggleClickHandler}
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
                                    <div  style ={{overflow:'scroll', height:'88vh'}}>
                                    <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                                        <CustomClearRefinements />
                                    </div>
                                    <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                                        {/* <h5 className={`${styles.Refineheader}`}>Authors</h5> */}
                                        <CustomRefinementListMobile
                                        searchable={true}
                                        attribute="author"
                                        label = "Author"
                                        />
                                    </div>
                                    <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                                        {/* <h5 className={`${styles.Refineheader}`}>Binding</h5> */}
                                        <CustomRefinementListMobile attribute="binding" 
                                        label = "Binding"

                                         />
                                    </div>

                                    <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                                        {/* <h5 className={`${styles.Refineheader}`}>Language</h5> */}
                                        <CustomRefinementListMobile attribute="language"
                                        label = "Language"
                                        />
                                    </div>
                                    <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                                        {/* <h5 className={`${styles.Refineheader}`}>Age Group</h5> */}
                                        <CustomRefinementListMobile
                                        label = "Age Group"

                                        attribute="agedGroup"
                                        />
                                    </div>

                                    <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                                        {/* <h5 className={`${styles.Refineheader}`}>Publication</h5> */}
                                        <CustomRefinementListMobile
                                        searchable={true}
                                        attribute="publication"
                                        label = "Publication"

                                        />
                                    </div>

                                    <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                                        {/* <h5 className={`${styles.Refineheader}`}>Book Condition</h5> */}
                                        <CustomRefinementListMobile attribute="bookCondition"  label = "Book Condition"/>
                                    </div>

                                    {/* <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                                        <h5 className={`${styles.Refineheader}`}>Category</h5>
                                        <CustomRefinementListMobile attribute="category" />
                                    </div> */}
                                    <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                                    </div>
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
        </InstantSearch>
        <style jsx>{``}</style>
      </div>
    </React.Fragment>
  );
}
// export default Publication
const mapStateToProps = state => {
  return {
    SeoData: state.seodata.seodata,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSeoData: urlP => dispatch(getSeoData(urlP)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Page);
