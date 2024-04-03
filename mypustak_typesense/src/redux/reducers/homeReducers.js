import {
  SEARCH,
  GETSEARCH,
  FETCHSEARCH,
  MAKESEARCHBLANK,
  SEARCH_ERROR,
  SETCATEGORY,
  LOADER_SEARCH,
  NO_DATA_fOUND_SEARCH,
  GETSEARCHFILTERDATA,
  FILTER_LOADER_SEARCH,
  LOADING_SEARCH_SUGGESTION,
  SEARCH_SUGGESTION_FETCHED,
  ERROR_SEARCH_SUGGESTION,
  NO_SEARCH_SUGGESTION,
  TOOGLE_GLOBAL_LOADER,
  TOOGLE_GLOBAL_MESSAGE,
  CLEAR_SEARCH_SUGGESTION,
  SHOW_AUTOSUGGEST_DIALOG
} from "../constants/types";
const initialState = {
  searchTyped: "",
  SearchResult: [],
  ClickedCategory: "",
  ActivateSuccPopup: false,
  ShowSearchLoader: false,
  NoSearchDataFound: false,
  Search_FilterToBeApplid: {},
  Search_FilterApplied_Again: {},
  SearchFilterLoader: false,
  showSearchError: false,
  searchSuggestions: [],
  noSearchSuggestions: false,
  showGlobalLoader: false,
  SearchLoadingMore: false,
  global_message: "",
  show_global_message: false,
  searching_value: null,
  suggestionBooksFound: 0,
  loadingSearchSuggestion: false,
  show_autosuggest_dialog:false,
};
export default function homeReducers(state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        searchTyped: action.payload,
      };
    case MAKESEARCHBLANK:
      // alert("in Hreduc")
      // console.log(action.payload);
      return {
        ...state,
        searchTyped: [],
        ShowSearchLoader: false,
      };
    case GETSEARCH:
      if (action.payload.page == 1 && !action.payload.searchResultData.length) {
        return {
          ...state,
          SearchResult: [],
          ShowSearchLoader: false,
          NoSearchDataFound: true,
          loadingSearchSuggestion: false,
        };
      } else if (
        action.payload.page == 1 &&
        action.payload.searchResultData.length
      ) {
        // console.log({GETSEARCH:action.payload.facet_counts});
        let Filter = {};

        action.payload.facet_counts.map(facet => {
          // facet_author,facet_publication,facet_category,facet_language,facet_keywords,facet_bookType,facet_binding,facet_book_condition,facet_subject
          // console.log({ facet }, facet.field_name);
          if (
            facet.field_name == "language" ||
            facet.field_name == "facet_language"
          ) {
            let language = [];
            const BengaliLangArr = ["Bengali ", "Bangla", "Bengali"];
            facet.counts.map(data => {
              // console.log(data)
              if (BengaliLangArr.includes(data.value)) {
                if (!language.includes("Bengali")) {
                  language.push("Bengali");
                }
              } else {
                if (!language.includes(data.value.toLowerCase())) {
                  language.push(data.value.trim().toLowerCase());
                }
              }
            });
            Filter.language = language;
          }

          if (
            facet.field_name == "author" ||
            facet.field_name == "facet_author"
          ) {
            let author = [];
            const RemoveAuthor = [
              "NA",
              "N.A",
              "Na",
              "na",
              "None",
              "NONE",
              "none",
              "Nil",
              "nil",
              "",
            ];
            facet.counts.map(data => {
              // console.log(data);
              let author_name = data.value;
              if (!RemoveAuthor.includes(author_name.trim())) {
                author.push(author_name.trim());
              }
            });
            author = author.sort((a, b) => (a[0] > b[0] ? 1 : -1));
            // console.log({ facet_author: author });

            Filter.author = author;
          }

          if (
            facet.field_name == "publication" ||
            facet.field_name == "facet_publication"
          ) {
            let publication = [];
            const RemovePublication = [
              "NA",
              "N.A",
              "Na",
              "na",
              "None",
              "NONE",
              "none",
              "Nil",
              "nil",
              "",
            ];

            facet.counts.map(data => {
              // console.log(data);
              let pub_name = data.value;
              if (!RemovePublication.includes(pub_name.trim())) {
                publication.push(data.value.trim());
              }
            });
            publication = publication.sort((a, b) => (a[0] > b[0] ? 1 : -1));
            Filter.publication = publication;
          }

          if (
            facet.field_name == "category" ||
            facet.field_name == "facet_category"
          ) {
            let category = [];
            facet.counts.map(data => {
              // console.log(data);
              category.push(data.value.trim());
            });
            Filter.category = category;
          }

          if (
            facet.field_name == "keywords" ||
            facet.field_name == "facet_keywords"
          ) {
            let keyword = [];
            facet.counts.map(data => {
              // console.log(data);
              if (data.value != "null") {
                keyword.push(data.value.trim());
              }
            });
            Filter.keyword = keyword;
          }

          if (
            facet.field_name == "book_type" ||
            facet.field_name == "facet_book_type"
          ) {
            let bookType = [];
            facet.counts.map(data => {
              // console.log(data);
              bookType.push(Number(data.value));
            });
            Filter.bookType = bookType;
          }

          if (
            facet.field_name == "binding" ||
            facet.field_name == "facet_binding"
          ) {
            let binding = [];
            facet.counts.map(data => {
              // console.log(data);
              let binding_type = data.value.trim();
              // console.log({ binding_type });
              const mustbeBinding = ["paperback", "hardback"];
              if (!binding.includes(binding_type)) {
                if (mustbeBinding.includes(binding_type.trim())) {
                  binding.push(binding_type.trim());
                }
              }
            });
            Filter.binding = binding;
          }

          if (
            facet.field_name == "book_condition" ||
            facet.field_name == "facet_book_condition"
          ) {
            let book_condition = [];
            const mustBeConditions = [
              "verygood",
              "averagebutinreadablecondition",
              "almostnew",
              "brandnew",
            ];
            facet.counts.map(data => {
              let cond_arr = data.value.split(":");
              let cond = cond_arr[1]
                .replace(/"/g, "")
                .replace(/}/g, "")
                .replace(/'/g, "")
                .replace(/ /g, "");
              // console.log(cond[1].replace(/"/g, '').replace(/}/g, ''), 'book_condition');
              // console.log({ cond });
              if (mustBeConditions.includes(cond.trim())) {
                book_condition.push(cond.trim());
              }
            });
            // console.log({ book_condition });

            Filter.book_condition = book_condition;
          }

          if (
            facet.field_name == "subject" ||
            facet.field_name == "facet_subject"
          ) {
            let subject = [];
            facet.counts.map(data => {
              // console.log(data);
              if (data.value != "None" && data.value != "D") {
                // console.log(data.value, 'subject---');

                subject.push(data.value.trim());
              }
            });
            Filter.subject = subject;
          }

          if (
            facet.field_name == "class" ||
            facet.field_name == "facet_class"
          ) {
            let classes = [];
            facet.counts.map(data => {
              //    console.log(data);
              if (data.length) {
                classes.push(data.value.trim());
              }
            });
            Filter.classes = classes;
          }
        });
        return {
          ...state,
          SearchResult: action.payload.searchResultData,
          ShowSearchLoader: false,
          NoSearchDataFound: false,
          Search_FilterToBeApplid: Filter,
          Search_FilterApplied_Again: {},
          searching_value: action.payload.searchValue,
          loadingSearchSuggestion: false,
        };
      } else {
        return {
          ...state,
          // SearchResult:action.payload,
          ShowSearchLoader: false,
          NoSearchDataFound: true,
          loadingSearchSuggestion: false,
        };
      }

    case FETCHSEARCH:
      if (action.payload.searchResultData.length && action.payload.page != 1) {
        return {
          ...state,
          SearchResult: state.SearchResult.concat(
            action.payload.searchResultData
          ),
          ShowSearchLoader: false,
          NoSearchDataFound: false,
          SearchLoadingMore: false,
        };
      } else {
        return {
          ...state,
          // SearchResult:action.payload,
          ShowSearchLoader: false,
          SearchLoadingMore: false,
          // NoSearchDataFound:true,
        };
      }

    case SETCATEGORY:
      return {
        ...state,
        ClickedCategory: action.payload,
      };

    case LOADER_SEARCH:
      return {
        ...state,
        ShowSearchLoader: true,
        SearchResult: [],
      };
    case FILTER_LOADER_SEARCH:
      return {
        ...state,
        // ShowSearchLoader:true,
        SearchFilterLoader: action.payload.FilterLoder,
        SearchResult: action.payload.page == 1 ? [] : state.SearchResult,
        SearchLoadingMore: action.payload.LoadingMore,
      };
    case GETSEARCHFILTERDATA:
      // console.log(action.payload,"onClick");

      if (action.payload.pg == 1 && action.payload.filterData.length == 0) {
        // alert('no')
        return {
          ...state,
          NoSearchDataFound: true,
          SearchFilterLoader: false,
          ShowSearchLoader: false,

          SearchResult: [],
        };
      } else {
        let Re_Filter = {};

        action.payload.facet_counts.map(facet => {
          // facet_author,facet_publication,facet_category,facet_language,facet_keywords,facet_bookType,facet_binding,facet_book_condition,facet_subject
          // console.log({facet},facet.field_name);
          if (
            facet.field_name == "language" ||
            facet.field_name == "facet_language"
          ) {
            let language = [];
            const BengaliLangArr = ["Bengali ", "Bangla", "Bengali"];
            facet.counts.map(data => {
              // console.log(data)
              if (BengaliLangArr.includes(data.value)) {
                if (!language.includes("Bengali")) {
                  language.push("Bengali");
                }
              } else {
                if (!language.includes(data.value.toLowerCase())) {
                  language.push(data.value.trim().toLowerCase());
                }
              }
            });
            Re_Filter.language = language;
          }

          if (
            facet.field_name == "author" ||
            facet.field_name == "facet_author"
          ) {
            let author = [];
            const RemoveAuthor = [
              "NA",
              "N.A",
              "Na",
              "na",
              "None",
              "NONE",
              "none",
              "Nil",
              "nil",
              "",
            ];
            facet.counts.map(data => {
              // console.log(data);
              let author_name = data.value;
              if (!RemoveAuthor.includes(author_name.trim())) {
                author.push(author_name);
              }
            });
            author = author.sort((a, b) => (a[0] > b[0] ? 1 : -1));
            // console.log({ facet_author: author });

            Re_Filter.author = author;
          }

          if (
            facet.field_name == "publication" ||
            facet.field_name == "facet_publication"
          ) {
            let publication = [];
            const RemovePublication = [
              "NA",
              "N.A",
              "Na",
              "na",
              "None",
              "NONE",
              "none",
              "Nil",
              "nil",
              "",
            ];

            facet.counts.map(data => {
              // console.log(data);
              let pub_name = data.value;
              if (!RemovePublication.includes(pub_name.trim())) {
                publication.push(pub_name.trim());
              }
            });
            publication = publication.sort((a, b) => (a[0] > b[0] ? 1 : -1));
            Re_Filter.publication = publication;
          }

          if (
            facet.field_name == "category" ||
            facet.field_name == "facet_category"
          ) {
            let category = [];
            facet.counts.map(data => {
              // console.log(data);
              category.push(data.value.trim());
            });
            Re_Filter.category = category;
          }

          if (
            facet.field_name == "keywords" ||
            facet.field_name == "facet_keywords"
          ) {
            let keyword = [];
            facet.counts.map(data => {
              // console.log(data);
              if (data.value != "null") {
                keyword.push(data.value.trim());
              }
            });
            Re_Filter.keyword = keyword;
          }

          if (
            facet.field_name == "book_type" ||
            facet.field_name == "facet_book_type"
          ) {
            let bookType = [];
            facet.counts.map(data => {
              // console.log(data);
              bookType.push(Number(data.value));
            });
            Re_Filter.bookType = bookType;
          }

          if (
            facet.field_name == "binding" ||
            facet.field_name == "facet_binding"
          ) {
            let binding = [];

            facet.counts.map(data => {
              // console.log(data);
              let binding_type = data.value.trim();
              // console.log({ binding_type });
              const mustbeBinding = ["paperback", "hardback"];
              if (!binding.includes(binding_type)) {
                if (mustbeBinding.includes(binding_type.trim())) {
                  binding.push(binding_type.trim());
                }
              }
            });
            Re_Filter.binding = binding;
          }

          if (
            facet.field_name == "book_condition" ||
            facet.field_name == "facet_book_condition"
          ) {
            let book_condition = [];
            const mustBeConditions = [
              "verygood",
              "averagebutinreadablecondition",
              "almostnew",
              "brandnew",
            ];
            facet.counts.map(data => {
              let cond_arr = data.value.split(":");
              let cond = cond_arr[1]
                .replace(/"/g, "")
                .replace(/}/g, "")
                .replace(/'/g, "")
                .replace(/ /g, "");
              // console.log(cond[1].replace(/"/g, '').replace(/}/g, ''), 'book_condition');
              // console.log({ cond });
              if (mustBeConditions.includes(cond.trim())) {
                book_condition.push(cond.trim());
              }
            });
            Re_Filter.book_condition = book_condition;
          }

          if (
            facet.field_name == "subject" ||
            facet.field_name == "facet_subject"
          ) {
            let subject = [];
            facet.counts.map(data => {
              // console.log(data);
              if (data.value != "None" && data.value != "D") {
                // console.log(data.value,"subject---");

                subject.push(data.value.trim());
              }
            });
            Re_Filter.subject = subject;
          }

          if (
            facet.field_name == "class" ||
            facet.field_name == "facet_class"
          ) {
            let classes = [];
            facet.counts.map(data => {
              //    console.log(data);
              if (data.length) {
                classes.push(data.value);
              }
            });
            Re_Filter.classes = classes;
          }
        });

        return {
          ...state,
          SearchResult: action.payload.filterData,
          SearchFilterLoader: false,
          NoSearchDataFound: false,
          ShowSearchLoader: false,
          Search_FilterApplied_Again: Re_Filter,
        };
      }

    case SEARCH_ERROR:
      return {
        ...state,
        showSearchError: !state.showSearchError,
        ShowSearchLoader: false,
        SearchFilterLoader: false,
        SearchLoadingMore: false,
        showGlobalLoader: false,
      };
    case LOADING_SEARCH_SUGGESTION:
      return {
        ...state,
        searchSuggestions: {},
        loadingSearchSuggestion: true,
      };
    case SEARCH_SUGGESTION_FETCHED:
      return {
        ...state,
        searchSuggestions: action.payload.searchTitleSuggestion,
        noSearchSuggestions: false,
        suggestionBooksFound: action.payload.found,
        loadingSearchSuggestion: false,
      };
    case NO_SEARCH_SUGGESTION:
      return {
        ...state,
        searchSuggestions: [],
        noSearchSuggestions: true,
      };
    case TOOGLE_GLOBAL_LOADER:
      return {
        ...state,
        showGlobalLoader: action.payload,
      };
    case TOOGLE_GLOBAL_MESSAGE:
      return {
        ...state,
        show_global_message: !state.show_global_message,
        global_message: action.payload,
      };
    case CLEAR_SEARCH_SUGGESTION:
      return {
        ...state,
        searchSuggestions: [],
        noSearchSuggestions: true,
      };
    case ERROR_SEARCH_SUGGESTION:
      return {
        ...state,
        loadingSearchSuggestion: false,
      };

    case SHOW_AUTOSUGGEST_DIALOG:
    return{
      ...state,
      show_autosuggest_dialog:action.payload
    }
    default:
      return state;
  }
}
