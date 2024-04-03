
import {
  GETMAINCATEGORY,
  GETMAINCATEGORYFLTER,
  GETMAINCATEGORYFLTERLOAD,
  GETCHILDCATEGORY,
  GETFIRSTCATEGORY,
  GETLOADER,
  NODATAFOUND,
  LOADING_GETCHILDCATEGORY,
  SAVETHECLICKEDCATEGORY,
  GETFILTERDATA,
  GETMAINCATEGORY_LOADER,
} from "../constants/types";

import { FilterOption } from "../../helper/FilterOption";
const initialState = {
  maincategory: [],

  FilteredData: [],
  FilterToBeApplid: {},
  category_filter_next_options: {},
  loadingCategoryData: false,
  FilterOn: false,
  loadmorebtn: true,
  NoDataFound: false,
  allChildCategoryData: {},
  ShowChildCategoryLoader: false,
  clickedMainCategory: "",
  clickedMainCategory_code: "",
  currentPage: 1,
  ShowMainCategoryLoader: false,
  FilterClickedLoader: false,
  found_books: null,
  hasMore: true,
};

export default function maincategoryReducer(state = initialState, action) {
  switch (action.type) {
    case NODATAFOUND:
      return {
        ...state,
        maincategory: [],
        // ShowFilterLoader:!state.ShowFilterLoader,
        loadmorebtn: false,
        NoDataFound: true,
      };
    case GETLOADER:
      //  ('Ok')
      if (action.payload.Loadmore) {
        if (action.payload.pg == 1) {
          return {
            ...state,
            loadingCategoryData: action.payload.Loadmore,
            maincategory: [],
            FilteredData: [],
            // FilterToBeApplid: {}
          };
        } else {
          return {
            ...state,
            loadingCategoryData: action.payload.Loadmore,
          };
        }
      } else {
        return {
          ...state,
          loadingCategoryData: action.payload.Loadmore,
          FilterClickedLoader: action.payload.FilterLoder,
        };
      }
    case GETMAINCATEGORY:
      let Filter = {};

      action.payload.facet_counts.map(facet => {
        // facet_author,facet_publication,facet_category,facet_language,facet_keywords,facet_bookType,facet_binding,facet_book_condition,facet_subject
        // console.log({facet},facet.field_name);
        if (
          facet.field_name == "language" ||
          facet.field_name == "facet_language"
        ) {
          let language = [];
          facet.counts.map(data => {
            // console.log(data);
            language.push(data.value);
          });
          Filter.language = language;
        }

        if (
          facet.field_name == "author" ||
          facet.field_name == "facet_author"
        ) {
          let author = [];
          facet.counts.map(data => {
            //    console.log(data);
            author.push(data.value);
          });
          Filter.author = author;
        }

        if (
          facet.field_name == "publication" ||
          facet.field_name == "facet_publication"
        ) {
          let publication = [];
          facet.counts.map(data => {
            //    console.log(data);
            publication.push(data.value);
          });
          Filter.publication = publication;
        }

        if (
          facet.field_name == "category" ||
          facet.field_name == "facet_category"
        ) {
          let category = [];
          facet.counts.map(data => {
            //    console.log(data);
            category.push(data.value);
          });
          Filter.category = category;
        }

        if (
          facet.field_name == "keywords" ||
          facet.field_name == "facet_keywords"
        ) {
          let keyword = [];
          facet.counts.map(data => {
            //    console.log(data);
            keyword.push(data.value);
          });
          Filter.keyword = keyword;
        }

        if (
          facet.field_name == "book_type" ||
          facet.field_name == "facet_book_type"
        ) {
          let bookType = [];
          facet.counts.map(data => {
            //    console.log(data);
            bookType.push(data.value);
          });
          Filter.bookType = bookType;
        }

        if (
          facet.field_name == "binding" ||
          facet.field_name == "facet_binding"
        ) {
          let binding = [];
          facet.counts.map(data => {
            //    console.log(data);
            binding.push(data.value);
          });
          Filter.binding = binding;
        }

        if (
          facet.field_name == "book_condition" ||
          facet.field_name == "facet_book_condition"
        ) {
          let book_condition = [];
          facet.counts.map(data => {
            let cond = data.value.book_condition.split(":");
            //    console.log(cond,"book_condition");
            book_condition.push(data.value);
          });
          Filter.book_condition = book_condition;
        }

        if (
          facet.field_name == "subject" ||
          facet.field_name == "facet_subject"
        ) {
          let subject = [];
          facet.counts.map(data => {
            //    console.log(data);
            subject.push(data.value);
          });
          Filter.subject = subject;
        }

        if (facet.field_name == "class" || facet.field_name == "facet_class") {
          let classes = [];
          facet.counts.map(data => {
            //    console.log(data);
            //    if(data.length){
            classes.push(data.value);
            // }
          });
          Filter.classes = classes;
        }
      });
      // Filter.
      // alert("GETMAINCATEGORY")
      // console.log(Filter,"Filter");

      if (action.payload.Books.length == 12) {
        return {
          ...state,
          maincategory: state.maincategory.concat(action.payload.Books),
          FilteredData: state.FilteredData.concat(action.payload.Books),
          FilterToBeApplid: Filter,
          FilterOn: false,
          loadmorebtn: true,
          NoDataFound: false,
        };
      } else {
        return {
          ...state,
          maincategory: state.maincategory.concat(action.payload.Books),
          FilteredData: state.FilteredData.concat(action.payload.Books),
          FilterToBeApplid: Filter,
          FilterOn: false,
          loadmorebtn: false,
          NoDataFound: false,
        };
      }

    case GETFIRSTCATEGORY: {
      // Add bracket to scope the Filter variable in GETFIRSTCATEGORY case
      // let resfilterData = FilterOption(action.payload.facet_counts)
      // console.log({resfilterData});

      let Filter = {};

      // console.log(`MainCategory###`,action.payload.Filter)
      if (action.payload.hits.length == 12) {
        return {
          ...state,
          maincategory: action.payload.hits,
          FilteredData: action.payload.hits,
          FilterToBeApplid: action.payload.Filter,
          FilterOn: false,
          loadmorebtn: true,
          NoDataFound: false,
          ShowMainCategoryLoader: false,
          found_books: action.payload.found_books,
        };
      } else {
        return {
          ...state,
          maincategory: action.payload.hits,
          FilteredData: action.payload.hits,
          FilterToBeApplid: action.payload.Filter,
          FilterOn: false,
          loadmorebtn: false,
          NoDataFound: false,
          ShowMainCategoryLoader: false,
        };
      }
    }

    case GETMAINCATEGORYFLTER:
      // alert("GETMAINCATEGORYFLTER")
      if (action.payload.Books.length == 12) {
        return {
          ...state,
          maincategory: action.payload.Books,
          loadingCategoryData: false,
          FilterOn: true,
          loadmorebtn: true,
          NoDataFound: false,
        };
      } else {
        return {
          ...state,
          maincategory: action.payload.Books,
          loadingCategoryData: false,
          FilterOn: true,
          loadmorebtn: false,
          NoDataFound: false,
        };
      }

    case GETMAINCATEGORYFLTERLOAD:
      // alert("GETMAINCATEGORYFLTERLOAD")
      if (action.payload.Books.length == 12) {
        return {
          ...state,
          maincategory: state.maincategory.concat(action.payload.Books),
          loadingCategoryData: false,
          FilterOn: true,
          loadmorebtn: true,
          NoDataFound: false,
        };
      } else {
        return {
          ...state,
          maincategory: state.maincategory.concat(action.payload.Books),
          loadingCategoryData: false,
          FilterOn: true,
          loadmorebtn: false,
          NoDataFound: false,
        };
      }

    case LOADING_GETCHILDCATEGORY:
      return {
        ...state,
        ShowChildCategoryLoader: !state.ShowChildCategoryLoader,
      };

    case GETCHILDCATEGORY:
      // console.log(action.payload,"GETCHILDCATEGORY");

      return {
        ...state,
        allChildCategoryData: action.payload,
        ShowChildCategoryLoader: false,
      };

    case SAVETHECLICKEDCATEGORY:
      // alert("12")
      return {
        ...state,
        clickedMainCategory: action.payload.category,
        clickedMainCategory_code: action.payload.code,
        currentPage: action.payload.pg,
      };

    case GETFILTERDATA:
      // alert("22")

      if (action.payload.hits.length) {
        if (action.payload.pg == 1) {
          // alert("if1")

          return {
            ...state,
            maincategory: action.payload.hits,
            FilteredData: action.payload.hits,
            loadingCategoryData: false,
            FilterClickedLoader: false,
            FilterOn: false,
            category_filter_next_options: action.payload.Filter,
            // loadmorebtn:true,
          };
        } else {
          //    alert("load else")
          return {
            ...state,
            maincategory: state.maincategory.concat(action.payload.hits),
            FilteredData: state.maincategory.concat(action.payload.hits),
            loadingCategoryData: false,
            FilterClickedLoader: false,
            FilterOn: false,
            // loadmorebtn:true,
          };
        }
      } else {
        // alert("else 1")
        if (action.payload.pg == 1) {
          return {
            ...state,
            maincategory: [],
            FilteredData: [],
            loadingCategoryData: false,
            FilterOn: false,
            FilterClickedLoader: false,
          };
        } else {
          // alert("else else 2")
          return {
            ...state,
            maincategory: state.maincategory,
            FilteredData: state.maincategory,
            loadingCategoryData: false,
            FilterOn: false,
            // hasMore:false,
            FilterClickedLoader: false,
          };
        }
      }

    case GETMAINCATEGORY_LOADER:
      return {
        ...state,
        ShowMainCategoryLoader: true,
        maincategory: [],
        FilteredData: [],
      };

    default:
      return state;
  }
}
