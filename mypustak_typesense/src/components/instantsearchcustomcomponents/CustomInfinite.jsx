import React, { useState } from "react";
import { useInfiniteHits } from "react-instantsearch";
import { useInstantSearch } from "react-instantsearch";
import ReplayIcon from "@mui/icons-material/Replay";
import BookCard from "../bookcard/BookCardNew";
import BookCardSkeleton from "../bookcard/BookCardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../loader/Loader";
import { Button } from "@mui/material";

function CustomInfinite(props) {
  const { hits, sendEvent, showPrevious, showMore, isFirstPage, isLastPage } =
    useInfiniteHits(props);
  const { status, results } = useInstantSearch();
  const [datalength, setdatalength] = useState(1);

  const loadData = () => {
    showMore();
    setdatalength(datalength + 1);
  };

  // console.log(status, "status datashow")
  // console.log(results , "results datashow")
  // console.log(isFirstPage , "result datashow")
  return (
    // <div>
    //   <button onClick={showPrevious} disabled={isFirstPage}>
    //     Show previous results
    //   </button>
    //   <ol>
    //     {hits.map((hit) => (
    //       <li
    //         key={hit.objectID}
    //         onClick={() => sendEvent('click', hit, 'Hit Clicked')}
    //         onAuxClick={() => sendEvent('click', hit, 'Hit Clicked')}
    //       >
    //         <div style={{ wordBreak: 'break-all' }}>
    //           {JSON.stringify(hit).slice(0, 100)}…
    //         </div>
    //       </li>
    //     ))}
    //   </ol>
    //   <button onClick={showMore} disabled={isLastPage}>
    //     Show more results
    //   </button>
    // </div>
    //     <div>
    //  {(status === 'loading' || status === 'stalled') && results.nbHits ==0 ?
    //  <div>
    //   <Loader/>
    //   </div>
    //  :  <InfiniteScroll
    //       next={loadData}
    //       dataLength={datalength}
    //       scrollThreshold="80%"
    //       hasMore={!isLastPage}
    //       loader={
    //         <div
    //           style={{
    //             // marginLeft: "50%",
    //             // width: "70%",

    //             marginBottom: "10%",
    //           }}
    //         >
    //           {status === 'loading' || status === 'stalled'  ? (
    //             <div>
    //               <div className="row g-0">
    //                 <div className="col-6 col-sm-12 col-md-6 col-lg-3">
    //                   <BookCardSkeleton />
    //                 </div>
    //                 <div className="col-6 col-sm-12 col-md-6 col-lg-3">
    //                   <BookCardSkeleton />
    //                 </div>
    //                 <div className="col-6 col-sm-12 col-md-6 col-lg-3">
    //                   <BookCardSkeleton />
    //                 </div>

    //                 <div className="col-6 col-sm-12 col-md-6 col-lg-3">
    //                   <BookCardSkeleton />
    //                 </div>
    //               </div>
    //               <center>
    //                 <i className="p" style={{ textAlign: "center" }}>
    //                   Hang on! Loading Books
    //                 </i>
    //               </center>
    //             </div>
    //           ) : null}
    //         </div>
    //       }
    //     >
    //       <div
    //         style={{
    //           overflowX: "hidden",
    //           borderLeft: "1px solid #ddd",
    //           borderRight: "1px solid #ddd",
    //         }}
    //         className="row g-0"
    //       >
    //         {hits.map((aD) => (
    //           <div key={aD.bookId} className="col-6 col-sm-12 col-md-6 col-lg-3">
    //             <BookCard
    //               Booktitle={aD.title}
    //               book={aD}
    //               price={aD.price}
    //               categories={aD.author}
    //               image={aD.thumb}
    //             />
    //           </div>
    //         ))}
    //       </div>
    //     </InfiniteScroll>}
    //   </div>

    <div>
      {results && results.nbHits !== 0 ? (
        <div>
          {(status === "loading" || status === "stalled") &&
          results.page == 0 ? (
            <Loader />
          ) : null}
          <InfiniteScroll
            next={loadData}
            dataLength={datalength}
            scrollThreshold="80%"
            hasMore={!isLastPage}
            loader={
              <div
                style={{
                  // marginLeft: "50%",
                  // width: "70%",

                  marginBottom: "10%",
                }}
              >
                {status === "loading" || status === "stalled" ? (
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
                        Hang on! Loading Books
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
              {hits.map((aD) => (
                <div
                  key={aD.bookId}
                  className="col-6 col-sm-12 col-md-6 col-lg-3"
                >
                  <BookCard
                    Booktitle={aD.title}
                    book={aD}
                    price={aD.price}
                    categories={aD.author}
                    image={aD.thumb}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
          :
        </div>
      ) : (
        <div>
          {status === "loading" || status === "stalled" ? (
            <div>
              <Loader />
            </div>
          ) : (
            <div style={{ marginTop: "5rem" }}>
              <center
              // style={{
              //   display: "flex",
              //   alignItems: "center",
              //   justifyContent: "center",
              //   minHeight: "88vh",
              //   zIndex: "100",
              //   backgroundColor: "#fff",
              //   position: "absolute",
              //   marginTop: "-1rem",
              // }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "8rem",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>
                    Oops!No books found please
                  </span>

                  <Button
                    onClick={() => {
                      window.location.replace(window.location.pathname);
                    }}
                    style={{
                      textTransform: "capitalize",
                      fontSize: "1.5rem",
                      marginLeft: "0.5rem",
                    }}
                    variant="outlined"
                  >
                    Reload
                    <ReplayIcon
                      sx={{
                        fontSize: "3rem",
                        color: "#2258ae",
                        cursor: "pointer",
                      }}
                    />
                  </Button>
                </div>
              </center>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomInfinite;
