"use client";
import GetcategoryID from "../../helper/GetCategoryId";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Category.module.css";
import { connect } from "react-redux";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import qs from "qs";
import CloseIcon from "@mui/icons-material/Close";
import { getSeoData } from "../../redux/actions/seodataAction";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { openTheChilCategory } from "../../redux/actions/maincategoryAction";
import {
    CLUSTERHOST,
    INSTANTSEARCHAPIKEY,
    INSTANTSEARCHSCHEMA,
    update_url_search,
} from "../../helper/helpers";
import BookCardSkeleton from "../../components/bookcard/BookCardSkeleton";
import {
    Configure,
    connectInfiniteHits,
    connectStateResults,
    InstantSearch,
} from "react-instantsearch";
import CustomClearRefinements from "../../components/instantsearchcustomcomponents/ClearRefinements";
import CustomRefinementList from "../../components/instantsearchcustomcomponents/RefinementList";
import CustomSortBy from "../../components/instantsearchcustomcomponents/SortBy";
import { Button, Drawer, IconButton } from "@mui/material";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import CustomNumericMenu from "../../components/instantsearchcustomcomponents/NumericMenu";
import InfiniteScroll from "react-infinite-scroll-component";
import BookCard from "../../components/bookcard/BookCard";
import CustomSortByMobile from "../../components/instantsearchcustomcomponents/SortByMobile";
import CustomRangeInput from "../../components/instantsearchcustomcomponents/PriceRangeInput";
import { useRouter } from "next/navigation";
import MobileDetect from "mobile-detect";
import CustomRefinementListMobile from "../../components/instantsearchcustomcomponents/RefinementListMobile";
import Head from "next/head";
import dynamic from "next/dynamic";
import CustomCategoryHits from "../../components/instantsearchcustomcomponents/CustomCategoryHits";
import { history } from "instantsearch.js/es/lib/routers";
import CustomFilterDrawer from "../../components/FilterDrawer.js/CustomFilterDrawer";
import CustomBottomDrawer from "../../components/FilterDrawer.js/CustomBottomDrawer";

const NextBreadcrumbs = dynamic(
    () => import("../../components/Breadcrumbs/NextBreadcrumbs"),
    { ssr: false }
);

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
        query_by: "parentCategory",
        page: 1,
        sort_by: "num_is_out_of_stack:asc,uDate:desc",
        filter_by: "bookType:[0, 2]",
        facet_by:
            "author,publication,category,language,keywords,bookType,binding,bookCondition,subject,class",
        max_facet_values: 30,
        num_typos: 2,
        typo_tokens_threshold: 10,
        per_page: 12,
    },
    connectionTimeoutSeconds: 10,
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const ArrangeData = ({
    hits,
    hasPrevious,
    refinePrevious,
    hasMore,
    refineNext,
}) => {
    const [datalength, setdatalength] = useState(1);
    const [hitsState, sethitsState] = useState([]);
    useEffect(() => {
        sethitsState([]), sethitsState(hits);
    }, [hits]);

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
    hitsState.map((hit) => {
        if (hit.is_out_of_stack == "n") {
            inStockData.push(hit);
        } else {
            outofstockData.push(hit);
        }
        allData = inStockData.concat(outofstockData);
    });
    return hitsState.length == 0 ? null : (
        <div>
            <InfiniteScroll
                className="cat-page"
                next={loadData}
                dataLength={datalength}
                scrollThreshold="90%"
                hasMore={hasMore}
                loader={
                    <div
                        style={{
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
                                        Hang on! Loading content
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
// const CustomHits = connectInfiniteHits(ArrangeData);

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
    //   console.log(location.asPath.split('?')[1], "pathnameMatches");
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
    } = qs.parse();

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
function Page(props, { params, searchParams }) {

    const [FilterDrawer, setFilterDrawer] = useState(false);
    const [SortbyDrawer, setSortbyDrawer] = useState(false);
    const [urltopush, seturltopush] = useState("");

    const router = useRouter();
    const [searchState, setSearchState] = useState(urlToSearchState(router));
    const debouncedSetStateRef = useRef(null);
    const [drawerOpen, SetdrawerOpen] = useState(false);
    const [bottomdrawerOpen, SetbottomdrawerOpen] = useState(false);

    const bottomdrawerToggleClickHandler = () => {
        // this.setState({
        //   drawerOpen: !this.state.drawerOpen
        // })
        SetbottomdrawerOpen(!bottomdrawerOpen);
    };

    const onSearchStateChange = (updatedSearchState) => {
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
            let urlvar =
                props.category_url +
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
        }, DEBOUNCE_TIME);

        setSearchState(updatedSearchState);
    };

    const drawerToggleClickHandler = () => {
        SetdrawerOpen(!drawerOpen);
    };

    const routing = {
        router: history({
            createURL({ qsModule, routeState, location }) {
                const urlParts = location.href.match(/^(.*?)\/search/);
                const baseUrl = `${urlParts ? urlParts[1] : ""}/`;
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

                if (routeState.page !== 1) {
                    queryParameters.page = routeState.page;
                }

                if (routeState.sortBy !== 1) {
                    queryParameters.sortBy = routeState.sortBy;
                } else {
                    queryParameters.sortBy = `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,iDate:desc`;
                }

                if (routeState.author) {
                    queryParameters.author = routeState.author.map(encodeURIComponent);
                }
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
                        },
                    },
                };
            },
        },
    };

    return (
        <div>
            <NextBreadcrumbs />
            <InstantSearch
                indexName={INSTANTSEARCHSCHEMA}
                searchClient={searchClient}
                searchState={searchState}
                onSearchStateChange={onSearchStateChange}
            >
                <Configure filters={`parentCategory:${props.CATID}`} />
                <div
                    className="row g-0"
                    style={{ marginTop: "1rem", justifyContent: "center" }}
                >
                    <div
                        className={`bg-white ${styles.filterDiv} col-3 d-none d-sm-block d-md-block d-lg-block`}
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
                            <CustomRefinementList searchable={true} attribute="author" />
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
                            <h5 className={`${styles.Refineheader}`}>Book Condition</h5>
                            <CustomRefinementList attribute="bookCondition" />
                        </div>
                        <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                            <h5 className={`${styles.Refineheader}`}>Age Group</h5>
                            <CustomRefinementList attribute="agedGroup" />
                        </div>
                        <div style={{ margin: "1rem 0rem 0.5rem 1rem" }}>
                            <h5 className={`${styles.Refineheader}`}>Publication</h5>
                            <CustomRefinementList searchable={true} attribute="publication" />
                        </div>
                        <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}>
                            <h5 className={`${styles.Refineheader}`}>Price </h5>
                            {/* <CustomRangeInput attribute="new_pricing" /> */}
                            <CustomRangeInput attribute="price" />
                            <CustomNumericMenu
                                attribute="discountPercent"
                                items={[
                                    { label: "Less than ₹99", start: 0, end: 99 },
                                    { label: "Less than ₹499", start: 100, end: 500 },
                                    { label: "More than ₹500", start: 500 },
                                ]}
                            />
                        </div>
                    </div>
                    {/* <Results> */}
                    <div className="bg-white border col-12 col-sm-6 col-md-8 col-lg-9">
                        <div
                            className=""
                            style={{
                                position: "sticky",
                                top: 0,
                                zIndex: 100,
                                backgroundColor: "#fff",
                                padding: "2px 0",
                            }}
                        >
                            <div className="d-none d-sm-block d-md-block d-lg-block">
                                <CustomSortBy
                                    defaultRefinement={`${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,uDate:desc`}
                                    items={[
                                        {
                                            value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,uDate:desc`,
                                            label: "Newest First",
                                        },
                                        {
                                            value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,uDate:asc`,
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
                                //  onClick={() => {
                                //   setSortbyDrawer(true)
                                // }}
                                onClick={bottomdrawerToggleClickHandler}
                            >
                                <FilterListIcon style={{ color: "#444" }} /> Sort By
                            </Button>
                            <CustomBottomDrawer
                                show={bottomdrawerOpen}
                                anchor="right"
                                open={FilterDrawer}
                                style={{ zIndex: 1006 }}
                                onClose={() => { }}
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

                                    defaultRefinement={`${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,uDate:desc`}
                                    items={[
                                        {
                                            value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,uDate:desc`,
                                            label: "Newest First",
                                        },
                                        {
                                            value: `${INSTANTSEARCHSCHEMA}/sort/num_is_out_of_stack:asc,usDate:asc`,
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
                                size="small"
                                style={{
                                    padding: 0,
                                    width: "50%",
                                    textTransform: "capitalize",
                                }}
                                variant=""
                                //   onClick={() => {
                                //   setFilterDrawer(true)
                                // }}
                                onClick={drawerToggleClickHandler}
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
                    <div className="d-block d-sm-none d-md-none d-lg-none d-flex">
                        <CustomFilterDrawer
                            show={drawerOpen}
                            anchor="right"
                            open={FilterDrawer}
                            style={{ zIndex: 1006 }}
                            onClose={() => { }}
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
                            <div style={{ margin: "0.5rem 0rem 0.5rem 1rem" }}></div>
                            <div style={{ position: "sticky", bottom: 0 }}>
                                <Button
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
            <style jsx>{``}</style>
        </div>
    );
}

const mapStateToProps = (state) => ({
    SeoData: state.seodata.seodata,
});

export default connect(mapStateToProps, { openTheChilCategory, getSeoData })(
    Page
);
