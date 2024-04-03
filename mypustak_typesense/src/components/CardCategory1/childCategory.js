"use client"
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "../../styles/Category.module.css";
import { Configure, connectStateResults } from "react-instantsearch";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { connectInfiniteHits } from "react-instantsearch";
import ReplayIcon from "@mui/icons-material/Replay";
import qs from "qs";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { connect } from "react-redux";
import FilterListIcon from "@mui/icons-material/FilterList";
import { InstantSearch } from "react-instantsearch";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import BookCard from "../../components/bookcard/BookCard";
import { getSeoData } from "../../redux/actions/seodataAction";
import CustomClearRefinements from "../../components/instantsearchcustomcomponents/ClearRefinements";
import CustomRefinementList from "../../components/instantsearchcustomcomponents/RefinementList";
import CustomSortBy from "../../components/instantsearchcustomcomponents/SortBy";
import CustomNumericMenu from "../../components/instantsearchcustomcomponents/NumericMenu";
import BookCardSkeleton from "../../components/bookcard/BookCardSkeleton";
import GetcategoryID from "../../helper/GetCategoryId";
import { Button, Drawer, IconButton } from "@mui/material";
import {
    CLUSTERHOST,
    INSTANTSEARCHAPIKEY,
    INSTANTSEARCHSCHEMA,
} from "../../helper/helpers";
import Head from "next/head";
import CustomSortByMobile from "../../components/instantsearchcustomcomponents/SortByMobile";
import Loader from "../../components/loader/Loader";
import GetCategoryName from "../../helper/GetCategoryName";
import CustomRangeInput from "../../components/instantsearchcustomcomponents/PriceRangeInput";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import CustomRefinementListMobile from "../../components/instantsearchcustomcomponents/RefinementListMobile";
import CustomNumericMenuMobile from "../../components/instantsearchcustomcomponents/NemeriMenuMobile";
import MobileDetect from "mobile-detect";

import dynamic from 'next/dynamic'
import CustomCategoryHits from "../../components/instantsearchcustomcomponents/CustomCategoryHits";
import CustomFilterDrawer from "../../components/FilterDrawer.js/CustomFilterDrawer";
import CustomBottomDrawer from "../../components/FilterDrawer.js/CustomBottomDrawer";

const NextBreadcrumbs = dynamic(() => import("../../components/Breadcrumbs/NextBreadcrumbs"), { ssr: false });
let urlPath = ""
// export async function getServerSideProps({ query, store, isServer, asPath, res }) {
//     let seodata = {};
//     console.log(asPath, "aspath................");
//     let category_url =
//         `/category/` +
//         query.parent_category +
//         `/` +
//         query.sub_category +
//         `/` +
//         query.child_category +
//         `/`;
//     let sub_category_url =
//         `/category/` + query.parent_category + `/` + query.sub_category + `/`;
//     let first_category_url = `/category/` + query.parent_category + `/`;
//     let FIRSTCAT = GetcategoryID(first_category_url);
//     let SUBCAT = GetcategoryID(sub_category_url);
//     let CATID = GetcategoryID(category_url);
//     let og_url = "https://www.mypustak.com" + category_url
//     console.log(og_url, "og_url")
//     const body = {
//         url: og_url
//     };
//     const seo_res = await fetch(`https://api.mypustak.com/api/v1/seo_tags/seo-data`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)

//     })
//     const seo_data = await seo_res.json()
//     let title_tag = ""
//     let meta_description = ""

//     // 301 redirect to the new location
//     if (seo_data.redirect_url) {

//         console.log(seo_data.redirect_url, "seo_data.redirect_url")
//         res.setHeader("Location", seo_data.redirect_url);
//         res.statusCode = 301;
//         res.end();
//     }
//     if (seo_data.title_tag) {
//         title_tag = seo_data.title_tag
//         meta_description = seo_data.meta_desc

//     }
//     else {
//         title_tag = "Best " + query.parent_category + "|" + query.sub_category + "|" + query.child_category + '|used books online India !'
//         meta_description = "Best " + query.parent_category + "|" + query.sub_category + "|" + query.child_category + 'Only online free books used bookstore'
//     }
//     console.log(title_tag, "||", meta_description)

//     return {
//         props: {
//             query,
//             CATID,
//             category_url: category_url,
//             seodata: seodata,
//             SUBCAT,
//             FIRSTCAT,
//             title_tag, meta_description,
//             og_url: og_url
//         },
//     };
// }

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
        query_by: "parentCategory",
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
    // const location = window.location
    console.log(location, "location===");
    // console.log(location.get(), "location===1");
    // console.log(searchParams, "location===1");

    const pathnameMatches = location.pathname;
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
    } = location;
    // const query = ""
    // const page = 1
    // const sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`
    // const author = []
    // const publication = []
    // const binding = []
    // const language = []
    // const book_condition = []
    // const aged_group = []

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

function SubCategory(props, { params, searchParams }) {
    const [FilterDrawer, setFilterDrawer] = useState(false);
    const [SortbyDrawer, setSortbyDrawer] = useState(false);
    const [urltopush, seturltopush] = useState("");
    const [drawerOpen, SetdrawerOpen] = useState(false);
    const router = useSearchParams();
    const [searchState, setSearchState] = useState(urlToSearchState(props.searchParams));
    const debouncedSetStateRef = useRef(null);
    const [bottomdrawerOpen, SetbottomdrawerOpen] = useState(false);

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
            let sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`;
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
                props.category_url +
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
                    props.category_url +
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

            // window.history.go(searchStateToUrl(updatedSearchState), updatedSearchState);
        }, DEBOUNCE_TIME);

        setSearchState(updatedSearchState);
    };

    const drawerToggleClickHandler = () => {
        // this.setState({
        //   drawerOpen: !this.state.drawerOpen
        // })
        SetdrawerOpen(!drawerOpen);
    }
    urlPath = props.urlPath
    return (
        <React.Fragment>
            <div>
                <InstantSearch
                    indexName={INSTANTSEARCHSCHEMA}
                    searchClient={searchClient}
                    searchState={searchState}
                    onSearchStateChange={onSearchStateChange}
                    createURL={createURL}>
                    <Configure filters={`category:${props.CATID}`} />

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
                                {/* <h5 className={`${styles.Refineheader}`}>Authors</h5> */}
                                <CustomRefinementList
                                    searchable={true}
                                    attribute='author'
                                    label="Author"
                                />
                            </div>
                            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                                {/* <h5 className={`${styles.Refineheader}`}>Binding</h5> */}
                                <CustomRefinementList attribute='binding' label="Binding" />
                            </div>
                            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                                {/* <h5 className={`${styles.Refineheader}`}>Language</h5> */}
                                <CustomRefinementList attribute='language' label="Language" />
                            </div>
                            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                                {/* <h5 className={`${styles.Refineheader}`}>Book Condition</h5> */}
                                <CustomRefinementList attribute='bookCondition' label="Book Condition" />
                            </div>
                            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                                {/* <h5 className={`${styles.Refineheader}`}>Age Group</h5> */}
                                <CustomRefinementList
                                    attribute='agedGroup'
                                    label='Age Group'
                                />
                            </div>
                            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                                {/* <h5 className={`${styles.Refineheader}`}>Publication</h5> */}
                                <CustomRefinementList
                                    searchable={true}
                                    attribute='publication'
                                    label="Publication"
                                />
                            </div>
                            <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                                <h5 className={`${styles.Refineheader}`}>Price </h5>
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
                        <div className='bg-white border col-12 col-sm-6 col-md-8 col-lg-9'>
                            <div
                                className=''
                                style={{
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 100,
                                    backgroundColor: "#fff",
                                    marginLeft: "0px",
                                    padding: "2px 0",
                                    minHeight: "fit-content",
                                }}>
                                <div
                                    style={{ padding: "0 0.5rem" }}
                                    className='d-none d-sm-block d-md-block d-lg-block'>
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
                                <CustomBottomDrawer show={bottomdrawerOpen}
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
                                    <div style={{ borderBottom: '1px solid #ddd', color: '#666', padding: '0.5rem', paddingLeft: '1rem', marginBottom: '0.5rem', fontSize: '1.1rem', display: 'flex', }}>
                                        <div>
                                            Sort By
                                        </div>
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
                                                    padding: '0.5rem',
                                                    marginTop: "0.5rem"
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
                                    onClick={drawerToggleClickHandler}

                                // onClick={() => {
                                //   setFilterDrawer(true);
                                // }}
                                >
                                    <FilterAltIcon style={{ color: "#444" }} /> Filters
                                </Button>

                            </div>
                            <div style={{ borderTop: "1px solid #ddd" }}>
                                {/* <CustomHits /> */}
                                <CustomCategoryHits />

                            </div>
                        </div>
                        {/* </Results> */}
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
                                    opacity: 0.8,
                                }}
                            >
                                <CloseIcon fontSize="small" style={{ color: "#000" }} />
                            </IconButton>
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
                                <CustomRefinementListMobile attribute="binding"
                                    label="Binding"

                                />
                            </div>

                            <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                                {/* <h5 className={`${styles.Refineheader}`}>Language</h5> */}
                                <CustomRefinementListMobile attribute="language"
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
                                <CustomRefinementListMobile attribute="bookCondition" label="Book Condition" />
                            </div>

                            {/* <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                                        <h5 className={`${styles.Refineheader}`}>Category</h5>
                                        <CustomRefinementListMobile attribute="category" />
                                    </div> */}
                            <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
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
                <style jsx>
                    {`

          `}
                </style>
            </div>
        </React.Fragment>
    );
}
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
export default connect(mapStateToProps, mapDispatchToProps)(SubCategory);
