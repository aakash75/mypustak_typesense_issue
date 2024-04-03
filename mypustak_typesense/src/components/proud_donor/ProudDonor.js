"use client"
import { CircularProgress, TextField } from "@mui/material";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import  { useRouter } from "next/navigation";

import { bucket, url } from "../../helper/aws";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import Link from "next/link";
import MediaQuery from "react-responsive";

import Skeleton from "@mui/material/Skeleton";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
const gender = require("gender-detection");
import {
  donardetails,
  searchdonor,
  setResponseMsg,
  ClearSearch,
  getBannerImage,
} from "../../redux/actions/prouddonarAction";
import SkeletonProudDonor from "../skeleton/SkeletonProudDonor";
const src = `${bucket}uploads/homebanner/`;
function ProudDonor(props) {
  const [search_btn, setSearch_btn] = useState(false);
  const [SearchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [showArrow, setShowArrow] = useState(false);
  const [bannerImage, setbannerImage] = useState({});
  const [imageSkeleton, setimageSkeleton] = useState(true);
  const [isSearchResult, setisSearchResult] = useState(false);
  const router = useRouter()
  const handleScroll = event => {
    setShowArrow(window.scrollY > 500);
  };
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    let searchValue = window.location.search.replace("?", "");
    if (searchValue) {
      props.searchdonor(searchValue)?.then(res => {
        setisSearchResult(res.length ? false : true);
      });
      setIsLoading(false);
      setSearch_btn(true);
      setSearchValue(searchValue);
    } else {
      props.donardetails(1)
      ?.then(res => {
        setIsLoading(false);
      });
    }
    props
      .getBannerImage("PROUD_DONAR")
      .then(ress => {
        let topBanner = ress.filter(image => image.banner_position == 1)[0];
        setbannerImage(topBanner);
        setimageSkeleton(false);
      })
      .catch(err => {
        setimageSkeleton(true);
      });
  }, []);
  useEffect(() => {
    props.donardetails(1).then(res => {
      setIsLoading(false);
    });
  }, [SearchValue.length == 0]);
  const handlePageClick = pg => {
    if (!search_btn) {
      let page = pg + 1;

      props.donardetails(page);
      setPage(page + 1);
    }
  };
  const SearchSubmit = e => {
    e.preventDefault();
    setSearch_btn(true);
    props.searchdonor(SearchValue).then(res => {
      setisSearchResult(res.length ? false : true);
    });
  };
  const SearchValueHand = e => {
    setSearchValue(e.target.value);
    setisSearchResult(false);
  };
  const uploadProfileError = e => {
    e.target.src =
      "https://d239pyg5al708u.cloudfront.net/uploads/avatar/femaleavtarfinal.png";
  };
  const clearSearchhand = () => {
    router.push(`/proud-donors`);
    setSearchValue("");
    setisSearchResult(false);
  };
  return (
    <div className='mx-3'>
      <div className='row no-gutter pt-3'>
        <div className=' col-12  text-center'>
          {/* <h1>For Web</h1> */}
          <MediaQuery minWidth={993}>
            {imageSkeleton ? (
              <div className='d-flex justify-content-center'>
                <Skeleton
                  animation='wave'
                  height={"14rem"}
                  width={"78vw"}
                  style={{ marginTop: "-1rem" }}
                />{" "}
                :
              </div>
            ) : (
              <Link href={`${bannerImage.banner_button_url}`} legacyBehavior>
                <img
                  style={{
                    cursor: "pointer",
                    width: `${bannerImage.banner_width}px`,
                    height: `${bannerImage.banner_height}px`,
                  }}
                  alt='Proud Banner'
                  src={`${src}${bannerImage.banner_image}`}
                  onError={() => {
                    setimageSkeleton(true);
                  }}
                />
              </Link>
            )}
          </MediaQuery>
          {/* <h1>For tab</h1> */}
          <MediaQuery maxWidth={992} minWidth={577}>
            {imageSkeleton ? (
              <div className='d-flex justify-content-center'>
                <Skeleton
                  animation='wave'
                  height={"14rem"}
                  width={"78vw"}
                  style={{ marginTop: "-1rem" }}
                />{" "}
                :
              </div>
            ) : (
              <Link href={`${bannerImage.banner_button_url}`} legacyBehavior>
                <img
                  style={{
                    cursor: "pointer",
                    width: `${bannerImage.banner_tab_width * 0.0625}rem`,
                    height: `${bannerImage.banner_tab_height * 0.0625}rem`,
                  }}
                  alt='Proud Banner'
                  src={`${src}${bannerImage.banner_image_tab}`}
                  onError={() => {
                    setimageSkeleton(true);
                  }}
                />
              </Link>
            )}
          </MediaQuery>
          {/* <h1>For mobile</h1> */}
          <MediaQuery maxWidth={576}>
            {imageSkeleton ? (
              <div className='d-flex justify-content-center'>
                <Skeleton
                  animation='wave'
                  height={"50vh"}
                  width={"60vw"}
                  style={{ marginTop: "-6rem" }}
                />{" "}
                :
              </div>
            ) : (
              <Link href={`${bannerImage.banner_button_url}`} legacyBehavior>
                <img
                  style={{
                    cursor: "pointer",
                    width: `${bannerImage.banner_mobile_width}px`,
                    height: `${bannerImage.banner_mobile_height}px`,
                  }}
                  alt='Proud Banner'
                  src={`${src}${bannerImage.banner_image_mobile}`}
                  onError={() => {
                    setimageSkeleton(true);
                  }}
                />
              </Link>
            )}
          </MediaQuery>
        </div>
        <div className='col-12 col-md-8 col-lg-6 mx-auto text-center pt-3'>
          <form className='p-2' onSubmit={SearchSubmit}>
            <TextField
              id='donation_id'
              label='Search by Donation Id / Name '
              variant='standard'
              style={{ width: "17rem" }}
              value={SearchValue}
              onChange={e => {
                SearchValueHand(e);
              }}
              required
              InputProps={
                SearchValue
                  ? {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='Search'
                          onClick={e => clearSearchhand(e)}>
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                  : {}
              }
            />
            <button
              className='btn border bg mt-1 ml-3 text-white w-25 '
              type='submit'>
              Search
            </button>
          </form>
        </div>
      </div>

      {showArrow && (
        <a
          href='#'
          className='rounded-circle position-fixed bottom-0 end-0 m-2 '>
          <ArrowCircleUpIcon fontSize='large' />
        </a>
      )}
      {isSearchResult ? (
        <div className='text-center text-black  mt-4'>No Profiles Found</div>
      ) : null}

      {/* ****** Down Div ********* */}
      <InfiniteScroll
        onScroll={handleScroll}
        dataLength={props.getdonar.length}
        scrollThreshold={"80%"}
        className='row infinitescroll'
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "0px",
        }}
        next={() => handlePageClick(page)}
        hasMore={true}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        loader={
          <div
            style={{
              width: "70%",
              marginBottom: "10%",
            }}>
            {props.globalLoabal ? (
              <center>
                <CircularProgress thickness={4} />
              </center>
            ) : null}
          </div>
        }>
        <div
          className='row mt-5 d-flex justify-content-between'
          key={donardetails.user}>
          {isLoading ? (
            <>
              <SkeletonProudDonor />
              <SkeletonProudDonor />
              <SkeletonProudDonor />
              <SkeletonProudDonor />
              <SkeletonProudDonor />
              <SkeletonProudDonor />
            </>
          ) : (
            <>
              {props.getdonar.map((det, index) => (
                <div
                  key={index}
                  className='col-lg-4 col-md-4  col-sm-6 col-xs-12 my-1 '>
                  <div className='cardProfile bg-white border border-gray m-0 p-2  shadow-sm rounded d-flex'>
                    <div className=''>
                      {det.avatar == null ? (
                        <Image
                          height={80}
                          width={80}
                          alt='avatar'
                          src={
                            gender.detect(det.name) == "male"
                              ? "https://d239pyg5al708u.cloudfront.net/uploads/avatar/funny-png-avatar-2.png"
                              : "https://d239pyg5al708u.cloudfront.net/uploads/avatar/femaleavtarfinal.png"
                          }
                          style={{ width: "4.5rem", height: "4.5rem" }}
                          onError={e => uploadProfileError(e)}></Image>
                      ) : (
                        <Image
                          height={80}
                          width={80}
                          alt='avatar'
                          className='donaravatar'
                          style={{ width: "4.5rem", height: "4.5rem" }}
                          src={`https://d239pyg5al708u.cloudfront.net/uploads/avatar/thumbs/${det.avatar}`}
                          onError={e => uploadProfileError(e)}
                        />
                      )}
                    </div>
                    <div
                      className={"pt-3 pl-2 "}
                      style={{ fontSize: "0.8rem" }}>
                      <span className='details-color' id='info'>
                        {det.name}
                      </span>
                      <br />
                      <span className='details-color'>
                        {det.city} , {det.state}
                      </span>
                      <br />
                      <span className='text-success'>
                        Donated Books : {det.donations}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </InfiniteScroll>
      <style jsx>
        {`
          .cardProfile {
            min-height: 6.6rem;
          }
        `}
      </style>
    </div>
  );
}
const mapStateToProps = state => ({
  getdonar: state.ProuddonarR.getdonar,
  noResultFound: state.ProuddonarR.NoDonorFoundS,
  globalLoabal: state.ProuddonarR.globalLoabal,
});
const mapDispatchToProps = dispatch => {
  return {
    donardetails: pageNo => dispatch(donardetails(pageNo)),
    searchdonor: data => dispatch(searchdonor(data)),
    setResponseMsg: () => dispatch(setResponseMsg()),
    ClearSearch: () => dispatch(ClearSearch()),
    getBannerImage: BannerPage => dispatch(getBannerImage(BannerPage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProudDonor);
