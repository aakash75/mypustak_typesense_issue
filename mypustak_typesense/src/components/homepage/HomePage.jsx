


"use client"
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import { fetch_wishlist_detail_otherpage } from "../../redux/actions/accountAction";

// import "../../styles/globals.css";
import "../../styles/globals.css"
import { useEffect, useState } from "react";
import HeroBanner from "../../components/homepage/HeroBanner";
import Recommended from "../../components/homepage/Recommended";
import Banners from "../../components/banners/Banners";
import HomeDisplayCategory from "../../components/homepage/HomeDisplayCategory";
import ShopByCategories from "../../components/homepage/ShopByCategories"
import SocialcauseBanner from "../../components/socialCauseBanner/SocialcauseBanner"
import { Unbxd } from "../../helper/helpers"
import { parse } from 'cookie';
import {
  getBooksSuggestionsByPage,
  getBooksSuggestionsByPageLength,
} from "../../redux/actions/productsuggestionaction";

import SatisfactionBanner from "../../components/satisfactionBanner/SatisfactionBanner"
import DownloadBanner from "../../components/download_Banner/DownloadBanner"
import UserReview from "../../components/userReview/UserReview";
import DeliveryBanner from "../../components/deliveryBanner/DeliveryBanner"
import { url } from "../../helper/api_url";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
import BookCardSkeleton from "../../components/bookcard/BookCardSkeleton";
import FooterSitemap from "../../components/Footer/FooterSitemap";
import BookSuggestionSearch from "../../components/booksuggestion/BookSuggestionSearch"
import BookSuggestionBySearch from "../../components/booksuggestion/BookSuggestionBySearch"
import { get3randomreview } from "../../redux/actions/userReviewAction";
import { getSeoData } from "../../redux/actions/seodataAction";
// import HomeDisplayCategoryUnbxd from "../components/homepage/HomeDisplayCategoryUnbxd";
// import BookSuggestionUnbxdbyQuery from "../components/booksuggestion/BookSuggestionUnbxdbyQuery";
// import BookSugesstionUnbxdbyFilter from "../components/booksuggestion/BookSugesstionUnbxdbyFilter";
import AddToCartSnack from "../../components/bookcard/AddToCartSnack";

function Home(props) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [is_suggestionhit, setIs_suggestionhit] = useState(false);
  useEffect(() => {
      console.log(props,"25225652");
    props.getBooksSuggestionsByPageLength("HOME");
  }, []);


  useEffect(() => {
    // Function to make the API call
    // const fetchData = async () => {
    //   props.getBooksSuggestionsByPageLength("HOME");
    // };



    // Function to handle the scroll event
    const handleScroll = () => {
      const currentPosition = window.scrollY;

      if (currentPosition >= 1100 && currentPosition > scrollPosition) {
        // Make the API call when scrolled approximately 200px from the top

        setIs_suggestionhit(true)
        setScrollPosition(currentPosition);
        if (!is_suggestionhit) {

          props.getBooksSuggestionsByPageLength("HOME");
        }
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);
  useEffect(() => {
    const url = "/";
    props
      .getSeoData(url)
      .then(res => {
        console.log(props.SeoData, "props.SeoData");
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  const [page, setpage] = useState(0);
  const [searchLoader, setsearchLoader] = useState(false);
  const [recommendationsLoader, setRecommendationsLoader] = useState(true);
  const [suggestionData, setsuggestionData] = useState([]);
  const [datalength, setdatalength] = useState(1);
  const [values, setvalues] = useState(["enid blyton", "r s agarwal"]);
  const [drawer, setdrawer] = useState(false);
  const fetchBooks = () => {
    setsearchLoader(true);
    console.log(props.SuggestionData.length, "LENGTH");
    props.get3randomreview();
    let newPage = page;
    newPage++;
    setpage(newPage);
    props.getBooksSuggestionsByPage("Home", newPage).then(res => {
      console.log(res.data, "suggestionDATA");
      setsearchLoader(false);
      res.data.data.map(r => {
        suggestionData.push(r);
      });
      if (datalength < Math.ceil(props.SuggestionDataLength.length / 4)) {
        setdatalength(datalength + 1);
      }
    });
  };

  return (

    <div>
      {/* <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title> {props.title_tag}</title>
        <meta
          name="description"
          property="og:description"
          content={props.meta_description}
        />
        <meta name="og:title" property="og:title" content={props.title_tag} />

        <meta
          name="og:image"
          property="og:image"
          content="https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png"
        />
        <meta
          name="og:url"
          property="og:url"
          content="https://www.mypustak.com/"
        />

        <script type="application/ld+json">{props.schema_markup}</script>
        <link rel="canonical" href="https://www.mypustak.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "WebSite",
              url: "https://www.mypustak.com",
              name: "MyPustak",
              description: `&{markup_description}`,
              publisher: {
                "@type": "Organization",
                name: "MyPustak",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.mypustak.com/logo.png",
                  width: 600,
                  height: 60,
                },
              },
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.mypustak.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              sameAs: [
                "https://www.facebook.com/mypustak/",
                "https://twitter.com/mypustak",
                "https://www.instagram.com/mypustak/",
              ],
              image: {
                "@type": "ImageObject",
                url: "https://www.mypustak.com/cover-image.jpg",
                width: 1200,
                height: 630,
              },
              keywords: "free books, education resources, online platform",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://www.mypustak.com",
              },
              application: {
                "@type": "SoftwareApplication",
                name: "MyPustak App",
                operatingSystem: "Android",
                applicationCategory: "Education",
                url: "https://play.google.com/store/apps/details?id=com.mypustak&hl=en_IN&gl=US",
              },
            }),
          }}
        />
      </Head> */}

      {/* Index Page */}
      <div style={{ overflowX: "hidden", maxWidth: "100%" }}>
        {/* --------------------Recomendation------------------ */}
        <InfiniteScroll
          // next={() => fetchBooks()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          dataLength={3}
          scrollThreshold="20%"
          hasMore={false}
          loader={
            <div>
              {recommendationsLoader ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/* <div className="row g-0">
                    <div className="col-6 col-sm-12 col-md-6 col-lg-2">
                      <BookCardSkeleton />
                    </div>
                    <div className="col-6 col-sm-12 col-md-6 col-lg-2">
                      <BookCardSkeleton />
                    </div>
                    <div className="col-6 col-sm-12 col-md-6 col-lg-2">
                      <BookCardSkeleton />
                    </div>

                    <div className="col-6 col-sm-12 col-md-6 col-lg-2">
                      <BookCardSkeleton />
                    </div>
                    <div className="col-6 col-sm-12 col-md-6 col-lg-2">
                      <BookCardSkeleton />
                    </div>
                    <div className="col-6 col-sm-12 col-md-6 col-lg-2">
                      <BookCardSkeleton />
                    </div>
                  </div> */}

                  <div>

                  </div>
                  <i className="p" style={{}}>
                    Hang on! Loading content
                  </i>
                </div>
              ) : null}
            </div>
          }
        >
          <AddToCartSnack />
        </InfiniteScroll>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          id="header"
        >
          <HomeDisplayCategory />
    
          <ShopByCategories categories={props.bannerData} />
        </div>
        <InfiniteScroll
          next={() => fetchBooks()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden"
            
          }}
          // dataLength={datalength}
          dataLength={true}
          scrollThreshold="20%"
          hasMore={true}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          loader={
            <div
              style={
                {
                  // marginLeft: "50%",
                  // width: "70%",
                  // marginBottom: "10%",
                  margin:0,
                  padding:0
                }
              }
            >
              {searchLoader ? (
     

        <div
        style={{
          overflowX: "hidden",
          borderLeft: "1px solid #ddd",
          borderRight: "1px solid #ddd",
          display:'flex'
        }}
        >
                          {[1,2,3,4,5].map((data,index) =>(
                <div key ={index} >

                  <BookCardSkeleton  key ={index}/>
                </div>
                  ))}
             
                 
                </div>
              ) : null}
            </div>
          }
        >
          {suggestionData.map((d, i) => (
            // <Book_Suggestion page='HOME' key={i} books={d} />

            <div
              key={i}
              style={{ marginTop: "1rem", width: "100%" }}
              className="mx-lg-2"
            >
              {d.query.query ? (
                <BookSuggestionBySearch
                  query={d.query["query"]}
                  title={d.title}
                />
              ) : (
                <BookSuggestionSearch
                  value={d.query["value"]}
                  title={d.title}
                  redirection={d.redirect_page_url}
                  attribute={d.query["attribute"]}
                />
              )}
            </div>
          ))}
        </InfiniteScroll>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <SocialcauseBanner />
        <div style={{}} className="satisfacdiv">
          <SatisfactionBanner />
        </div>
        <DownloadBanner />
        <UserReview userreviewData={props.userreviewData} />
        <DeliveryBanner />
      </div>
      <FooterSitemap />

      <style jsx>{`
        #header {
          // margin-top: 10px;
        }
        .satisfacdiv {
          margin: 1rem;
        }
        @media screen and (max-width: 700px) {
          #header {
            margin-top: 0px;
          }
        }
        @media screen and (max-width: 576px) {
          .satisfacdiv {
            margin: 0rem;
            margin-left: 0.6rem;
            margin-right: 0.6rem;
          }
        }
      `}</style>
      <div></div>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    SuggestionData: state.productsuggestionreducer.SuggestionData,
    SuggestionDataLength: state.productsuggestionreducer.SuggestionDataLength,
    userreviewData: state.userReviewReducer.userreviewData,
    SeoData: state.seodata.seodata,
    // unbxd_recommendations: state.unboxReducer.unbxd_recommendations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBooksSuggestionsByPage: (page_name, pageno) =>
      dispatch(getBooksSuggestionsByPage(page_name, pageno)),
    getBooksSuggestionsByPageLength: page_name =>
      dispatch(getBooksSuggestionsByPageLength(page_name)),
    fetch_wishlist_detail_otherpage: () =>
      dispatch(fetch_wishlist_detail_otherpage()),
    get3randomreview: () => dispatch(get3randomreview()),
    getSeoData: urlP => dispatch(getSeoData(urlP)),
    // get_unbxd_recommended: body => dispatch(get_unbxd_recommended(body))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
