import React, { useEffect, useState } from "react";
import {
  Configure,
  connectInfiniteHits,
  connectStateResults,
  InstantSearch,
} from "react-instantsearch";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import {
  CLUSTERHOST,
  INSTANTSEARCHAPIKEY,
  INSTANTSEARCHSCHEMA,
} from "../../helper/helpers";
import BookCardSkeleton from "../bookcard/BookCardSkeleton";
// import CustomRefinementList from '../instantsearchcustomcomponents/RefinementList';
import CustomSortBy from "../instantsearchcustomcomponents/SortBy";

import MediaQuery from "react-responsive";
import BookCard from "../bookcard/BookCard";
import CustomHomeHits from "../instantsearchcustomcomponents/CustomHomeHits";

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
  //   additionalSearchParameters: {
  //     'q': 'N',
  //     'query_by': 'is_out_of_stack',
  //     'page': 1,
  //     'sort_by': 'book_id:desc',
  //     'filter_by': "&& is_out_of_stack:['n']&& book_type:[0, 2]",
  //     'facet_by': 'author,publication,category,language,keywords,book_type,binding,book_condition,subject,class',
  //     'max_facet_values': 30,
  //     'num_typos': 2,
  //     'typo_tokens_threshold': 10,
  //     'per_page': 10
  // },i
  additionalSearchParameters: {
    query_by: "parentCategory",
    page: 1,
    sort_by: "num_is_out_of_stack:asc,iDate:desc",
    filter_by: "isOutOfStock:['n']",
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
//       </div>
//     ) : (
//       <div></div>
//     )
// );

const ArrangeData = ({
  hits,
  hasPrevious,
  refinePrevious,
  hasMore,
  refineNext,
}) => {
  return hits.length == 0 ? null : (
    <div style={{ padding: 0 }}>
      <div
        style={{ overflowX: "hidden", borderLeft: "1px solid #ddd" }}
        className="row row-cols-2 bg-white row-cols-sm-3 row-cols-md-3 row-cols-lg-5 g-0"
      >
        {hits.map((aD) => (
          <div key={aD.book_id} className="col">
            <BookCard
              Booktitle={aD.title}
              book={aD}
              price={aD.price}
              categories={
                aD.author != "na"
                  ? aD.author
                  : aD.publication != "na"
                  ? aD.publication
                  : null
              }
              image={aD.thumb}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
// const CustomHits = connectInfiniteHits(ArrangeData);

function BookSuggestionSearch(props) {

  console.log(props.attribute , "props.attribute")
  return (
    <div>
      <InstantSearch
        indexName={INSTANTSEARCHSCHEMA}
        searchClient={searchClient}
      >
        <MediaQuery minWidth={992}>
          {
            props.value == "na" ||
            props.value == "NA" ||
            props.value == null ? null : (
              <Configure
                filters={`${props.attribute == "parent_category"?"parentCategory":props.attribute}:${props.value} && isOutOfStock:n`}
                hitsPerPage={5}
              />
            )
            // null
          }
        </MediaQuery>
        <MediaQuery maxWidth={991}>
          <Configure
            filters={`${props.attribute == "parent_category"?"parentCategory":props.attribute}:${props.value} && isOutOfStock:n`}
            // filters="is_out_of_stack:n"
            hitsPerPage={6}
          />
        </MediaQuery>
        <MediaQuery maxWidth={575}>
          <Configure
            // filters="is_out_of_stack:n"
            filters={`${props.attribute == "parent_category"?"parentCategory":props.attribute}:${props.value} && isOutOfStock:n`}
            hitsPerPage={4}
          />
        </MediaQuery>

        {props.value == "na" ||
        props.value == "NA" ||
        props.value == null ? null : (
          // <Results>
          <div>
            <div className="titleDiv">
              <span className="title">{props.title}</span>{" "}
              {props.redirection ? (
                <span
                  className="viewmore"
                  onClick={() => {
                    if (props.redirection) {
                      window.location.assign(props.redirection);
                    }
                  }}
                >
                  View More
                </span>
              ) : null}
            </div>

            <div className="row g-0">
              <div style={{ display: "none", margin: "1rem 0rem 0.5rem 1rem" }}>
                {/* <CustomRefinementList defaultRefinement={"n"} attribute={"is_out_of_stack"} /> */}
              </div>
              <div style={{ display: "none" }}>
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

              {/* <CustomHits />
               */}
               <CustomHomeHits/>
            </div>
            </div>
          // </Results>
        )}
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

export default BookSuggestionSearch;
