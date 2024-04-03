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
import CustomSortBy from "../instantsearchcustomcomponents/SortBy";
import Carousel from "react-multi-carousel";
import MediaQuery from "react-responsive";
import BookCard from "../bookcard/BookCard";
import RecommendBook from "../bookcard/RecommendBookold";
import MobileDetect from "mobile-detect";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import AddToCartSnack from "../bookcard/AddToCartSnack";
import "react-multi-carousel/lib/styles.css";
import { useInstantSearch } from 'react-instantsearch';

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
    sort_by: "num_is_out_of_stack:asc,i_date:desc",
    filter_by: "is_out_of_stack:['n']",
    facet_by:
      "author,publication,category,language,keywords,book_type,binding,book_condition,subject,class",
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
const CustomRightArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return (
    <div
      style={{
        position: "absolute",
        right: "0",
        outline: "0",
        transition: "all 0.5s",
        borderRadius: "4px",
        background: "whitesmoke",
        zIndex: "50",
        cursor: "pointer",
        border: "0",
        padding: "1rem 0.2rem",

        minHeight: "43px",
        opacity: "1",
      }}
      onClick={() => onClick()}
    >
      <ChevronRightIcon
        style={{
          color: "black",
          display: "block",
          height: "26px",
          textAlign: "center",
          zIndex: "2",
          position: "relative",
        }}
      />
    </div>
  );
};

const CustomLeftArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        outline: "0",
        transition: "all 0.5s",
        borderRadius: "4px",
        background: "whitesmoke",
        zIndex: "50",
        cursor: "pointer",
        border: "0",
        padding: "1rem 0.2rem",
        minHeight: "43px",
        opacity: "1",
      }}
      onClick={() => onClick()}
    >
      <ChevronLeftIcon
        style={{
          color: "black",
          display: "block",
          height: "26px",
          textAlign: "center",
          zIndex: "2",
          position: "relative",
        }}
      />
    </div>
  );
};
const sliderresponsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1000 },
    items: 6,
    // slidesToSlide: 3
  },
  tablet: {
    breakpoint: { max: 999, min: 600 },
    items: 4,
    // slidesToSlide: 3
  },
  tablet: {
    breakpoint: { max: 600, min: 500 },
    items: 3,
    // slidesToSlide: 3
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 2,
    // slidesToSlide: 3
  },
};
function Recommended(props) {
  const [deviceType, setDeviceType] = useState("");
  useEffect(() => {
    let userAgent = navigator.userAgent;
    const md = new MobileDetect(userAgent);
    if (md.tablet()) {
      setDeviceType("tablet");
    } else if (md.mobile()) {
      setDeviceType("mobile");
    } else {
      setDeviceType("desktop");
    }
  }, []);
  return (
    <div style={{}}>
      <div>
        <div className="titleDiv">
          <span className="title">
            {props.title
              ? props.title.charAt(0).toUpperCase() +
                props.title.slice(1).toLowerCase()
              : props.title}
          </span>{" "}
          {props.redirection && props.value.length > 5 ? (
            <span
              className="viewmore"
              onClick={() => {
                // window.location.assign(
                //   `/Recommendations/${
                //     props.redirection
                //       ? props.redirection.split(" ").join("-")
                //       : ""
                //   }?${props.redirection}`
                // );
                window.location.assign(`/recommendations?${props.redirection}`);
              }}
            >
              View More
            </span>
          ) : null}
        </div>
        <Carousel
          responsive={sliderresponsive}
          ssr
          infinite={false}
          containerClass="carousel-container bg-white"
          customLeftArrow={<CustomLeftArrow />}
          deviceType={deviceType}
          itemClass="carousel-container"
          customRightArrow={<CustomRightArrow />}
        >
          {console.log(props.value, 55555555)}
          {props.value.map((book, index) => {
            let newBook = {
              ...book,
              cashback_per: book.cashbackPercent,
              discount_per: book.discountPercent,
            };
            delete newBook.cashbackPercent;
            delete newBook.discountPercent;
            return (
              <div key={index}>
                <RecommendBook
                  book={newBook}
                  Booktitle={book.title}
                  price={book.price}
                  categories={
                    book.author != "na" ? book.author : book.publication
                  }
                  image={book.imageUrl[0]}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <style jsx>
        {`
          .carousel-item {
            border: 2px solid green;
          }
          .title {
            font-weight: 500;
            font-size: 1.05rem;
            line-height: 23px;
            color: #2258ae;
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
            min-height: 2.125rem;
            justify-content: space-between;
            max-height: 3.125rem;
            margin-bottom: 0.3rem;
          }
          .carousel-container {
            padding: 0rem 1rem;
          }
          @media screen and (max-width: 991px) {
            .carousel-container {
              padding: 0rem 0.3rem;
            }
          }
          @media only screen and (max-width: 576px) {
            .title {
              margin-left: 0.5rem;
              font-size: 0.9rem;
            }
            .react-multi-carousel-track {
              padding: 0rem 0.3rem;
              border: 2px solid green;
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

export default Recommended;
