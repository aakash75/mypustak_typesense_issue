import React from "react";
import { InstantSearch } from "react-instantsearch";
import { Configure } from "react-instantsearch";
import DebouncedSearchBox from "./CustomSearchboxnew";
import DebouncedSearchBox_mobile from "./CustomSearchBoxV2";

import {
  CLUSTERHOST,
  INSTANTSEARCHAPIKEY,
  INSTANTSEARCHSCHEMA,
  logout,
} from "../../helper/helpers";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import MediaQuery from "react-responsive";
const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
  server: {
    nodes: [
      {
        host: CLUSTERHOST,
        port: "443",
        protocol: "https",
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60,
    apiKey: INSTANTSEARCHAPIKEY,
  },

  additionalSearchParameters: {
    q: "*",
    query_by: "isbn,title,author,,embedding,publication",
    // "query_by_weights":"120 , 100 , 120 , 70, 71, 10, 30, 10",

    prioritize_token_position: true,
    // "include_fields":"title,author,imageUrl,bookCondition,isOutOfStock,agedGroup,language,categorySuggestion,isbn",
    max_facet_values: 30,
    num_typos: "2",
    min_len_1typo: 2,
    split_join_tokens: "always",
    typo_tokens_threshold: 10,
    per_page: 50,
    // "filter_by":"isOutOfStock:N",
    sort_by: "num_is_out_of_stack:asc",
    pre_segmented_query: true,
    drop_tokens_threshold: 0,
    // text_match_type: "max_weight"
  },
  connectionTimeoutSeconds: 10,
});
const searchClient = typesenseInstantsearchAdapter.searchClient;
const GlobalSearchBar = () => {
  return (
    <div>
      <div className="midDiv">
        <InstantSearch
          indexName={INSTANTSEARCHSCHEMA}
          searchClient={searchClient}
        >
          {/* for Desktop input text */}

          <DebouncedSearchBox delay={350} />

          <Configure hitsPerPage={6} />
        </InstantSearch>
      </div>
    </div>
  );
};

export default GlobalSearchBar;
