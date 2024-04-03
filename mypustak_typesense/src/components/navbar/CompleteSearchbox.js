import algoliasearch from 'algoliasearch/lite';
import {
  Highlight,
  InstantSearch,
  SearchBox,
  DynamicWidgets,
  Snippet,
  RefinementList,
  InstantSearchSSRProvider,
  ClearRefinements,
  CurrentRefinements
} from 'react-instantsearch';


import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";


import CustomSearchboxnew from './CustomSearchboxnew';
import { CLUSTERHOST, INSTANTSEARCHAPIKEY, INSTANTSEARCHSCHEMA } from '../../helper/helpers';
import CompleteSearchinput from './CompleteSearchinput';
// import LoadingIndicator from '../../components/custom_widget/LoadingIndicator';
// import CustomSearchbox from '../../components/custom_widget/CustomSearchbox';

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
        query_by: "title,author,publication,isbn",
        sort_by: "num_is_out_of_stack:asc,iDate:desc",
        filter_by: "isOutOfStock:['n', 'y']&& bookType:[0, 2]",
        // "include_fields":'title,author,imageUrl,bookCondition',
        "max_facet_values": 30,
        "num_typos": 2,
        "typo_tokens_threshold": 10,
        "per_page": 12,
        // "filter_by":"bookCondition:[BrandNew]&& isOutOfStock:N"
    },
    connectionTimeoutSeconds: 10,
  });
  const searchClient = typesenseInstantsearchAdapter.searchClient;
  

function CompleteSearchbox({serverState}) {

  return (
    <div >
      
      {/* <InstantSearchSSRProvider {...serverState}> */}
      
      <InstantSearch
        indexName={INSTANTSEARCHSCHEMA}
        searchClient={searchClient}
        // routing={routing}
        // insights={true}
      >

      <CompleteSearchinput delay ={350}/>


        {/* <CurrentRefinements/> */}
        <div className="container" style ={{display:'flex' ,flexWrap:'wrap',padding:"1rem"}}>
      {/* <div style ={{width:"20vw" , border:'1px solid black'}}>
        <CustomRefinementList  attribute="bookCondition" searchable ={false} label ="Book Condition" />
        <CustomRefinementList  attribute="agedGroup" searchable ={false} label ="Age Group"/>
        <CustomRefinementList  attribute="author" searchable ={true} label = "Author"/>
      </div> */}
     
      </div>
      </InstantSearch>
      {/* </InstantSearchSSRProvider> */}



      <style jsx>
      {`
          .Refinement_label{
            background-color: #f2f3f5;
            cursor: pointer;
            color: #2248ae;
          }
        `}
      </style>
    </div>
  );
}

function Hit({ hit }) {
  return (
    <div>
        {hit}
    </div>
  );
}

export default CompleteSearchbox;
