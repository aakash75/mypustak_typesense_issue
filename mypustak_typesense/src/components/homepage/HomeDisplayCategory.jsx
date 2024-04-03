"use client";
import React, { useEffect, useState } from "react";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MediaQuery from "react-responsive";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import BookCard from "../bookcard/BookCard";
import AbcIcon from "@mui/icons-material/Abc";

import BookCardSkeleton from "../bookcard/BookCardSkeleton";
import { url } from "../../helper/api_url";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import {
  Configure,
  connectInfiniteHits,
  connectStateResults,
  InstantSearch,
} from "react-instantsearch";
import {
  CLUSTERHOST,
  INSTANTSEARCHAPIKEY,
  INSTANTSEARCHSCHEMA,
  Unbxd,
} from "../../helper/helpers";
import CustomRefinementList from "../instantsearchcustomcomponents/RefinementList";
import CustomSortBy from "../instantsearchcustomcomponents/SortBy";
import { Button } from "@mui/material";
import { unbxd_category_search } from "../../redux/actions/unboxAction";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import CustomInfinite from "../instantsearchcustomcomponents/CustomInfinite";
import CustomHomeHits from "../instantsearchcustomcomponents/CustomHomeHits";
import { useRouter } from "next/navigation";
import styles from "../../styles/HomeDisplayCategory.module.css";

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
  },
  additionalSearchParameters: {
    q: "N",
    query_by: "isOutOfStock",
    page: 1,
    sort_by: "num_is_out_of_stack:asc,iDate:desc",
    filter_by: "&& bookType:[2]",
    facet_by:
      "author,publication,category,language,keywords,book_type,binding,bookCondition,subject,class",
    max_facet_values: 30,
    num_typos: 2,
    typo_tokens_threshold: 10,
    per_page: 10,
  },
  connectionTimeoutSeconds: 10,
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

function HomeDisplayCategory(props) {
  const [activecategory, setactivecategory] = useState(1);
  const [bookData, setbookData] = useState([]);
  const [parent, setparent] = useState(187);
  // console.log(books,"BOOKS");
  useEffect(() => {
    setparent(187);
  }, []);
  // useEffect(() => {
  //   let body = {
  //     uid:Unbxd.readCookie(Unbxd.cookies.userId),
  //     page:0,
  //     rows:12,
  //     }
  //   props.unbxd_category_search(`u_categoryPathId:${parent}`,body)
  // }, [parent])

  return (
    <div className="my-1">
      <div className="maindiv ">
        <div className={`${styles.categoriesTabs} overflow-auto text-nowrap `}>
          <div
            className="px-2 px-sm-0"
            style={{
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              onClick={async () => {
                setactivecategory(1);
                // const data = await fetch(`${url}api/v1/get/category/competitive-exams/1/`)
                // const bookdata = await data.json();
                // setbookData(bookdata)
                setparent(187);
              }}
              className={
                activecategory == 1
                  ? `${styles.categoriesSpan} ${styles.active}}`
                  : `${styles.categoriesSpan}`
              }
              sm={3}
            >
              <AutoStoriesOutlinedIcon
                fontSize="medium"
                style={{ backgroundColor: "#fff", marginRight: "3px" }}
              />
              Competitive exam{" "}
            </span>
            <hr
              className={
                activecategory == 1 ? `${styles.show}` : `${styles.dontShow}`
              }
            />
          </div>
          <div
            onClick={async () => {
              setactivecategory(2);
              // const data = await fetch(`${url}api/v1/get/category/fiction-non-fiction/1/`)
              // const bookdata = await data.json();
              // setbookData(bookdata)
              setparent(216);
            }}
            className="px-2 px-sm-0"
            style={{
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className={
                activecategory == 2
                  ? `${styles.categoriesSpan} ${styles.active}}`
                  : `${styles.categoriesSpan}`
              }
            >
              <TravelExploreOutlinedIcon
                fontSize="medium"
                style={{ backgroundColor: "#fff", marginRight: "3px" }}
              />
              Fiction & Non Fiction
            </span>
            <hr
              className={
                activecategory == 2 ? `${styles.show}` : `{styles.dontShow}`
              }
            />
          </div>
          <div
            onClick={async () => {
              setactivecategory(3);
              // const data = await fetch(`${url}api/v1/get/category/school-children-books/1/`)
              // const bookdata = await data.json();
              // setbookData(bookdata)
              setparent(252);
            }}
            className="px-2 px-sm-0"
            style={{
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className={
                activecategory == 3
                  ? `${styles.categoriesSpan} ${styles.active}}`
                  : `${styles.categoriesSpan}`
              }
            >
              <AbcIcon
                fontSize="medium"
                style={{ backgroundColor: "#fff", marginRight: "3px" }}
              />
              School & Children books
            </span>
            <hr
              className={
                activecategory == 3 ? `${styles.show}` : `{styles.dontShow}`
              }
            />
          </div>
          <div
            className="px-2 px-sm-0"
            style={{
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              onClick={async () => {
                setactivecategory(4);
                // const data = await fetch(`${url}api/v1/get/category/university-books/1/`)
                // const bookdata = await data.json();
                // setbookData(bookdata)
                setparent(303);
              }}
              className={
                activecategory == 4
                  ? `${styles.categoriesSpan} ${styles.active}}`
                  : `${styles.categoriesSpan}`
              }
            >
              <SchoolOutlinedIcon
                fontSize="medium"
                style={{ backgroundColor: "#fff", marginRight: "3px" }}
              />
              University books
            </span>
            <hr
              className={
                activecategory == 4 ? `${styles.show}` : `{styles.dontShow}`
              }
            />
          </div>
        </div>
        <div className="sm:min-h-[20rem] md:min-h-[40rem]">
          <InstantSearch
            indexName={INSTANTSEARCHSCHEMA}
            searchClient={searchClient}
          >
            <div className="booksDiv">
              {/* <MediaQuery minWidth={992}> */}
              {/* <Configure
        filters="is_out_of_stack:n"
        /> */}
              <div className={styles.display_992}>
                <Configure
                  filters={`parentCategory:${parent} && isOutOfStock:n`}
                />
              </div>
              {/* </MediaQuery> */}
              {/* <MediaQuery maxWidth={991}> */}
              <div className={styles.display_991}>
                <Configure
                  filters={`parentCategory:${parent} && isOutOfStock:n`}
                  hitsPerPage={9}
                />
              </div>
              {/* </MediaQuery> */}
              {/* <MediaQuery maxWidth={575}> */}
              <div className={styles.display_575}>
                <Configure
                  filters={`parentCategory:${parent} && isOutOfStock:n`}
                  hitsPerPage={10}
                />
              </div>
              {/* </MediaQuery> */}
              {/* <Results> */}
              <div className="row g-0">
                <div style={{ display: "none" }}>
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

                <CustomHomeHits />
              </div>
              <div
                className="bg-white"
                style={{
                  alignSelf: "flex-end",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Button
                  onClick={() => {
                    if (activecategory == 1) {
                      window.location.assign(
                        "/category/competitive-exams?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                      );
                    } else if (activecategory == 2) {
                      window.location.assign(
                        "/category/fiction-non-fiction?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                      );
                    } else if (activecategory == 3) {
                      window.location.assign(
                        "/category/school-children-books?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                      );
                    } else {
                      window.location.assign(
                        "/category/university-books?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group="
                      );
                    }
                  }}
                  variant="contained"
                  style={{
                    display: "flex",
                    margin: "0.4rem",
                    borderRadius: "0",
                    alignItems: "center",
                    color: "#fff",
                    backgroundColor: "#2258ae",
                    textTransform: "capitalize",
                    cursor: "pointer",
                    minHeight: "3rem",
                  }}
                >
                  View More <ArrowForwardIcon style={{ fontSize: "1.1rem" }} />
                </Button>
              </div>
              {/* </Results> */}
            </div>
          </InstantSearch>
        </div>
      </div>
    </div>
  );
}

// export async function getStaticProps(context) {
//   const res = await fetch('https://data.mypustak.com/api/v1/get/category/fiction-non-fiction/1/')
//   const books = await res.json()
//   console.log(books,"BOOKs")
//   return {
//     props: {books:books}, // will be passed to the page component as props
//   }
// }

const mapStateToProps = (state) => {
  return {
    Unbxd_AutoSuggest: state.unboxReducer.Unbxd_AutoSuggest,
    Unbxd_products: state.unboxReducer.Unbxd_products,
    Unbxd_data: state.unboxReducer.Unbxd_data,
  };
};
export default connect(mapStateToProps, { unbxd_category_search })(
  withSnackbar(HomeDisplayCategory)
);
