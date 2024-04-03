// import { LOGIN,SIGNUP,SIGNEDUP ,LOGINFAILS,LOGOUT,SHOWLOADER,GETADDRESS,ADD_ADDRESS } from '../types';
// import {FAQ} from '../types';
import {
  GETCATEGORY,
  GETNCERTFILTER,
  GETNCERTFILTERLOAD,
  GETLOADERFORNCERT,
  NODATAFOUND,
  SAVETHECLICKEDCATEGORYNCERT,
  GETFIRSTNCERTCATEGORY,
  GETNCERTFILTERCLICKEDLOADER,
} from "../constants/types";

const initialState = {
  ncertCategory: [],
  FilteredData: [],
  FilterToBeApplid: [],
  ShowNcetLoader: false,
  FilterOn: false,
  loadmorebtn: true,
  NoDataFound: false,
  currentNcertPage: 1,
  curentNcertCategory: "",
  ncertCode: "28",
  ncertFilterClickedLoader: false,
  ncert_filter_next_options: {},
  found_books: null,
};

export default function getCategoryData (state = initialState, action) {
  switch (action.type) {
    case NODATAFOUND:
      return {
        ...state,
        ncertCategory: [],
        ShowFilterLoader: !state.ShowFilterLoader,
        loadmorebtn: false,
        NoDataFound: true,
      };

    case GETLOADERFORNCERT:
      return {
        ...state,
        ShowNcetLoader: true,
      };

    case GETNCERTFILTERCLICKEDLOADER:
      return {
        ...state,
        ncertFilterClickedLoader: action.payload,
        ShowNcetLoader: false,
      };

    case GETCATEGORY:
      // alert(action.payload.found_books)
      if (action.payload.filterData.length == 12) {
        if (action.payload.page != 1) {
          return {
            ...state,
            ncertCategory: state.ncertCategory.concat(
              action.payload.filterData
            ),
            FilteredData: state.FilteredData.concat(action.payload.filterData),
            FilterToBeApplid: Object.keys(state.FilterToBeApplid).length
              ? state.FilterToBeApplid
              : action.payload.Filter,
            FilterOn: false,
            loadmorebtn: true,
            ShowNcetLoader: false,
            ncertFilterClickedLoader: false,
            found_books: action.payload.found_books,
          };
        } else {
          // alert("ncert red else")

          if (action.payload.filterClicked) {
            return {
              ...state,
              ncertCategory: action.payload.filterData,
              FilteredData: action.payload.filterData,
              FilterOn: false,
              loadmorebtn: true,
              ShowNcetLoader: false,
              ncertFilterClickedLoader: false,
              ncert_filter_next_options: action.payload.Filter,
            };
          }
          return {
            ...state,
            ncertCategory: action.payload.filterData,
            FilteredData: action.payload.filterData,
            FilterToBeApplid: Object.keys(state.FilterToBeApplid).length
              ? state.FilterToBeApplid
              : action.payload.Filter,
            FilterOn: false,
            loadmorebtn: true,
            ShowNcetLoader: false,
            ncertFilterClickedLoader: false,
            found_books: action.payload.found_books,
          };
        }
      } else {
        if (action.payload.page != 1) {
          return {
            ...state,
            ncertCategory: state.ncertCategory.concat(
              action.payload.filterData
            ),
            FilteredData: state.FilteredData.concat(action.payload.filterData),
            FilterToBeApplid: Object.keys(state.FilterToBeApplid).length
              ? state.FilterToBeApplid
              : action.payload.Filter,
            FilterOn: false,
            loadmorebtn: false,
            ShowNcetLoader: false,
            ncertFilterClickedLoader: false,
          };
        } else {
          if (action.payload.filterClicked) {
            return {
              ...state,
              ncertCategory: action.payload.filterData,
              FilteredData: action.payload.filterData,
              FilterOn: false,
              loadmorebtn: true,
              ShowNcetLoader: false,
              ncertFilterClickedLoader: false,
              ncert_filter_next_options: action.payload.Filter,
            };
          }
          return {
            ...state,
            ncertCategory: action.payload.filterData,
            FilteredData: action.payload.filterData,
            FilterToBeApplid: state.FilterToBeApplid.length
              ? state.FilterToBeApplid
              : action.payload.Filter,
            FilterOn: false,
            loadmorebtn: false,
            ShowNcetLoader: false,
            ncertFilterClickedLoader: false,
            found_books: action.payload.found_books,
          };
        }
      }

    case GETNCERTFILTER:
      // alert("ff")
      if (action.payload.Books.length == 12) {
        return {
          ...state,
          ncertCategory: action.payload.Books,
          ShowNcetLoader: false,
          FilterOn: true,
          loadmorebtn: true,
          NoDataFound: false,
        };
      } else {
        return {
          ...state,
          ncertCategory: action.payload.Books,
          ShowNcetLoader: false,
          FilterOn: true,
          loadmorebtn: false,
          NoDataFound: false,
        };
      }

    case GETNCERTFILTERLOAD:
      if (action.payload.Books.length == 12) {
        return {
          ...state,
          ncertCategory: state.ncertCategory.concat(action.payload.Books),
          ShowNcetLoader: false,
          FilterOn: true,
          loadmorebtn: true,
          NoDataFound: false,
        };
      } else {
        return {
          ...state,
          ncertCategory: state.ncertCategory.concat(action.payload.Books),
          ShowNcetLoader: false,
          FilterOn: true,
          loadmorebtn: false,
        };
      }

    case SAVETHECLICKEDCATEGORYNCERT:
      return {
        ...state,
        // curentNcertCategory: action.payload.category,
        currentNcertPage: action.payload.pg,
        ncertCode: action.payload.code,
      };
    case GETFIRSTNCERTCATEGORY:
      let Filter = {};

      action.payload.filterData.facet_counts.map(facet => {
        // facet_author,facet_publication,facet_category,facet_language,facet_keywords,facet_bookType,facet_binding,facet_book_condition,facet_subject
        console.log({ facet }, facet.field_name);
        if (
          facet.field_name == "language" ||
          facet.field_name == "facet_language"
        ) {
          let language = [];
          facet.counts.map(data => {
            console.log(data);
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
            console.log(data);
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
            console.log(data);
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
            console.log(data);
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
            console.log(data);
            if (data.value != "null") {
              keyword.push(data.value);
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
            console.log(data);
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
            console.log(data);
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
            let cond_arr = data.value.split(":");
            let cond = cond_arr[1]
              .replace(/"/g, "")
              .replace(/}/g, "")
              .replace(/'/g, "")
              .replace(/ /g, "");
            console.log(
              cond[1].replace(/"/g, "").replace(/}/g, ""),
              "book_condition"
            );
            console.log(data);
            book_condition.push(cond);
          });
          Filter.book_condition = book_condition;
        }

        if (
          facet.field_name == "subject" ||
          facet.field_name == "facet_subject"
        ) {
          let subject = [];
          facet.counts.map(data => {
            console.log(data);
            if (data.value != "None" || data.value != "D") {
              subject.push(data.value);
            }
          });
          Filter.subject = subject;
        }

        if (facet.field_name == "class" || facet.field_name == "facet_class") {
          let classes = [];
          facet.counts.map(data => {
            console.log(data);
            if (data.length) {
              classes.push(data.value);
            }
          });
          Filter.classes = classes;
        }
      });

      if (action.payload.filterData.hits.length == 12) {
        return {
          ...state,
          ncertCategory: state.ncertCategory.concat(
            action.payload.filterData.hits
          ),
          FilteredData: state.FilteredData.concat(
            action.payload.filterData.hits
          ),
          FilterToBeApplid: Filter,
          FilterOn: false,
          loadmorebtn: true,
          ShowNcetLoader: false,
        };
      } else {
        return {
          ...state,
          ncertCategory: state.ncertCategory.concat(
            action.payload.filterData.hits
          ),
          FilteredData: state.FilteredData.concat(
            action.payload.filterData.hits
          ),
          FilterToBeApplid: Filter,
          FilterOn: false,
          loadmorebtn: false,
          ShowNcetLoader: false,
        };
      }

    default:
      return state;
  }
}
