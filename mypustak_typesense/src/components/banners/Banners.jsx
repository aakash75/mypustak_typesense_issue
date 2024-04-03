"use client"
import React, { Component } from "react";

import "react-multi-carousel/lib/styles.css";

import Carousel from "react-multi-carousel";
import { connect } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";

import MobileDetect from "mobile-detect";
import Image from "next/legacy/image";

class ImageCarousel extends Component {
  static async getInitialProps({ req, store, query }) {
    let userAgent;
    let deviceType;
    if (req) {
      userAgent = req.headers["user-agent"];
    } else {
      userAgent = navigator.userAgent;
    }
    const md = new MobileDetect(userAgent);
    if (md.tablet()) {
      deviceType = "tablet";
    } else if (md.mobile()) {
      deviceType = "mobile";
    } else {
      deviceType = "desktop";
    }
    return { deviceType, res, query };
  }

  state = {
    fetched: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  openProductNewPage = () => {
    window.open(
      "https://mypustak.com/product/exotic-engineer-entrepreneur-by-jayanth-gurijala-jayanth-gurijala-9788190944175?53270"
    );
  };

  render() {
    const { classes } = this.props;

    const sliderresponsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        // slidesToSlide: 3
      },
      tablet: {
        breakpoint: { max: 991, min: 539 },
        items: 2,
        // slidesToSlide: 3
      },
      mobile: {
        breakpoint: { max: 538, min: 0 },
        items: 1,
        // slidesToSlide: 3
      },
    };

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
            background: "hsla(0,0%,100%,.6)",
            zIndex: "50",
            cursor: "pointer",
            border: "0",
            padding: "1rem 0.2rem",

            minHeight: "43px",
            opacity: "1",
          }}
          onClick={() => onClick()}>
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
            background: "hsla(0,0%,100%,.6)",
            zIndex: "50",
            cursor: "pointer",
            border: "0",
            padding: "1rem 0.2rem",
            minHeight: "43px",
            opacity: "1",
          }}
          onClick={() => onClick()}>
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

    return (
      <div>
        <Carousel
          responsive={sliderresponsive}
          ssr
          infinite={true}
          containerClass='carousel-container'
          customLeftArrow={<CustomLeftArrow />}
          deviceType={this.props.deviceType}
          customRightArrow={<CustomRightArrow />}>
          <div
            className='banner_card'
            style={{
              backgroundColor: "#fec84e",
               
              backgroundImage:
                "linear-gradient(to right, #7be8e4, rgb(145, 234, 228),#fff)",
            }}>
            <Link
              href='/category/[parent_category]/[sub_category]'
              as='/category/university-books/medical/'
              legacyBehavior>
                <div className='main_div_content'>
                  <div className='left'>
                    <Image
                      className='health_img'
                      alt='/category/fiction-non-fiction/'
                      src={`https://d239pyg5al708u.cloudfront.net/uploads/banner/B2.png`}
                      priority
                      height={300}
                      width={300}
                    />
                  </div>
                  <div className='right'>
                    <div
                      className='main_title medical_title'
                      style={{ color: "#000c45" }}>
                      Medical, Health & Science Books
                    </div>
                    <div
                      className='sub_text'
                      style={{
                        padding: "1rem 0rem",
                        position: "relative",
                        right: "0.75rem",
                        color: "#000c45",
                      }}>
                      Bio-Chemistry | Dermatology
                      <br />
                      Pharmacy | Pathology | Endocrinology
                    </div>
                    <div
                      style={{
                        width: "max-content",
                        height: "max-content",
                        padding: "0.1rem 0.4rem",
                        borderRadius: "5px",
                        fontWeight: "600",
                        backgroundColor: "#fff",
                        marginLeft: "5rem",
                        color: "#000c45",
                        fontSize: "0.8rem",
                      }}>
                      Order Now
                    </div>
                  </div>
                </div>
            </Link>
          </div>

          <div
            className='banner_card'
            style={{
              background: "#7F7FD5",
              background: "linear-gradient(to right, #FD9B58, #FD9B58, #FFf)",
            }}>
            <Link
              href='/category/[parent_category]'
              as='/category/fiction-non-fiction'
              legacyBehavior>
                <div className='main_div_content'>
                  <div className='left'>
                    {/* <img
                      className='fiction_img'
                      src='https://d239pyg5al708u.cloudfront.net/uploads/banner/B4.png'
                      // style={{ width: "12rem" }}
                    /> */}
                    <Image
                      className='fiction_img'
                      alt='/category/fiction-non-fiction/'
                      src='https://d239pyg5al708u.cloudfront.net/uploads/banner/B4.png'
                      priority
                      height={300}
                      width={300}
                    />
                  </div>
                  <div className='right'>
                    <div
                      className='main_title fiction_title'
                      style={{ color: "#5b1a05" }}>
                      Explore The Wide Range Of Fiction And Non Fiction Books
                    </div>
                    <div
                      className='sub_text'
                      // style={{
                      //   display: "flex",
                      //   // border: "1px solid black",
                      //   justifyContent: "space-between",
                      // }}
                    >
                      <div
                        className='sub_text'
                        style={{
                          padding: "1rem 0.5rem",
                          color: "#5b1a05",
                          position: "relative",
                          bottom: "1rem",
                          // fontSize: "0.7rem",
                        }}>
                        Science Fiction | Short Stories | Teens | Health |
                        History & Politics
                      </div>

                      {/* <img
                        src="https://d239pyg5al708u.cloudfront.net/uploads/banner/b4a.png"
                        style={{ width: "6rem", height: "6rem" }}
                      /> */}
                    </div>
                    <div
                      className='sub_text'
                      style={{
                        display: "flex",
                        // border: "1px solid black",
                        justifyContent: "space-between",
                      }}>
                      <div
                        className='order_now_4'
                        style={{
                          width: "max-content",
                          height: "max-content",
                          padding: "0.1rem 0.4rem",
                          color: "#5b1a05",
                          // border: "1px solid #5b1a05",
                          backgroundColor: "#fff",
                          fontWeight: "600",
                          borderRadius: "5px",
                          position: "relative",
                          bottom: "1.2rem",
                          marginLeft: "5rem",
                          fontSize: "0.8rem",
                        }}>
                        Order Now
                      </div>
                    </div>
                  </div>
                </div>
            </Link>
          </div>
          <div
            className='banner_card'
            style={{
              backgroundImage:
                "linear-gradient(to right, #7be8e4, rgb(145, 234, 228),#fff)",
            }}>
            <Link
              href='/category/[parent_category]/[sub_category]'
              as='/category/school-children-books/ncert?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group='
              legacyBehavior>
                <div className='main_div_content'>
                  <div className='left'>
                    {/* <img
                      className='ncert_img'
                      src='https://d239pyg5al708u.cloudfront.net/uploads/banner/B1A.png'

                      // style={{ width: "11rem" }}
                    /> */}
                    <Image
                      className='ncert_img'
                      alt='/category/school-children-books/ncert?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group='
                      src='https://d239pyg5al708u.cloudfront.net/uploads/banner/B1A.png'
                      priority
                      height={300}
                      width={310}
                    />
                  </div>
                  <div className='right'>
                    <div
                      className='main_title ncert_title'
                      style={{ color: "#000c45" }}>
                      NCERT Books For Class 1-12
                    </div>
                    <div
                      className='sub_text'
                      style={{ padding: "1rem 0rem", color: "#000c45" }}>
                      UPSC Sets Subject Wise
                      <br /> Hindi | English
                    </div>

                    <div
                      style={{
                        width: "max-content",
                        height: "max-content",
                        padding: "0.1rem 0.4rem",
                        backgroundColor: "#fff",
                        // border: "1px solid #000c45",
                        borderRadius: "5px",
                        fontWeight: "600",
                        margin: "1rem 3rem",
                        color: "#000c45",
                        fontSize: "0.8rem",
                        position: "relative",
                        bottom: "0.8rem",
                        left: "1.8rem",
                      }}>
                      Order Now
                    </div>
                  </div>
                </div>
            </Link>
          </div>
          <div
            className='banner_card'
            style={{
              background: "#7F7FD5",
              background: "linear-gradient(to right, #FD9B58, #FD9B58, #FFf)",
            }}>
            <div className='main_div_content' onClick={this.openProductNewPage}>
              <div className='left'>
                <Image
                  className='fiction_img'
                  alt=' Exotic Engineer Entrepreneur'
                  src='https://d239pyg5al708u.cloudfront.net/uploads/banner/B3B.png'
                  priority
                  height={400}
                  width={500}
                />
              </div>
              <div className='right'>
                <div
                  className='main_title exotic_title'
                  style={{ color: "#000" }}>
                  Exotic Engineer Entrepreneur
                  <div
                    style={{
                      textAlign: "end",
                      fontSize: "0.9rem",
                      fontWeight: "normal",
                      color: "#000",
                      position: "relative",
                      right: "1rem",
                    }}>
                    by Jayanth Gurijala
                  </div>
                </div>
                <div
                  className='sub_text'
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}>
                  <div
                    style={{
                      width: "max-content",
                      height: "max-content",
                      padding: "0.1rem 0.4rem",
                      backgroundColor: "#fff",
                      fontWeight: "600",
                      borderRadius: "5px",
                      color: "#000",
                      margin: "1rem 0rem",
                      fontSize: "0.8rem",
                      position: "relative",
                      left: "1rem",
                      bottom: "-2rem",
                    }}>
                    Order Now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel>

        <style jsx>
          {`
            a {
              text-decoration: none;
            }
            .custom_right_arrow {
              position: absolute;
              right: 0;
              outline: 0;
              transition: all 0.5s;
              border-radius: 35px;
              z-index: 1000;
              border: 0;
              background: red;
              min-width: 43px;
              min-height: 43px;
              opacity: 1;
            }
            .carousel-container {
              padding: 0rem 1rem;
            }
            .banner_card {
              // border: 2px solid pink;
              height: 10rem;
              margin: 0rem 1rem;
              border-radius: 5px;
              background: #5199e4;
              cursor: pointer;
              overflow: hidden;
              // background: linear-gradient(120deg, #81dbfb 0%, #0067c5 100%);
            }

            .main_div_content {
              // border: 1px solid red;
              height: 100%;
              display: flex;
            }
            .left {
              // border: 2px solid yellow;
              height: 100%;
              width: 40%;
              color: white;
              // padding: 1.5rem 0.5rem;
              display: flex;
              align-items: center;
            }
            .left img {
              // width: 10.5rem;
            }
            .medical_title {
              text-align: center;
              position: relative;
              right: 2.2rem;
              width: 20vw;
            }
            .exotic_title {
              text-align: center;
              position: relative;
              right: 1.8rem;
              width: 20vw;
            }
            .ncert_title {
              text-align: center;
              position: relative;
              right: 1.8rem;
              width: 20vw;
            }
            .fiction_title {
              text-align: center;
              position: relative;
              right: 2rem;
              width: 20vw;
            }
            .main_title {
              font-weight: bold;
              font-size: 0.9rem;
              color: white;
            }
            .sub_text {
              font-size: 0.8rem;
              color: white;
              text-align: center;
            }
            .apply_btn {
              background: white;
              border-radius: 15px;
              font-size: 0.8rem;
              height: fit-content;
              width: fit-content;
              padding: 3px 8px;
              color: #5199e4;
              margin-top: 10px;
            }
            .ncert_img {
              width: 9.5rem;
            }
            .engineer_extoic_img {
              width: 14rem;
              margin-left: -0.7rem;
            }
            .health_img {
              width: 9.5rem;
              margin-left: -0.6rem;
            }
            .fiction_img {
              width: 9rem;
              border-radius: 5px;
              margin-left: -0.5rem;
            }
            .right {
              // border: 2px solid pink;
              height: 100%;
              width: 60%;
              padding: 1.5rem 0.5rem;
            }

            @media screen and (max-width: 991px) {
              .carousel-container {
                padding: 0rem 0.3rem;
              }
              .banner_card {
                // border: 2px solid pink;
                height: 9rem;
                margin: 0rem 0.2rem;
                border-radius: 5px;
                background: #5199e4;
                // background: linear-gradient(120deg, #81dbfb 0%, #0067c5 100%);
              }

              .main_div_content {
                // border: 1px solid red;
                height: 100%;
                display: flex;
              }
              .left {
                // border: 2px solid yellow;
                height: 100%;
                width: 40%;
                color: white;
                // padding: 0.5rem 0.2rem;
              }
              .right {
                padding: 0.5rem 0.2rem;
              }

              .main_title {
                font-weight: bold;
                font-size: 0.9rem;
                text-align: center;
              }
              .sub_text {
                font-size: 0.8rem;
              }
              .apply_btn {
                background: white;
                border-radius: 15px;
                font-size: 0.8rem;
                width: fit-content;
                padding: 3px 8px;
                color: #5199e4;
                margin-top: 10px;
              }
              .right {
                // border: 2px solid pink;
                height: 100%;
                width: 60%;
              }
            }
            @media screen and (max-width: 538px) {
              .ncert_img {
                width: 8rem;
              }
              .engineer_extoic_img {
                width: 10rem;
              }
              .health_img {
                width: 8rem;
              }
              .fiction_img {
                width: 7.6rem;
              }
              .medical_title,
              .exotic_title,
              .ncert_title {
                width: 70vw;
                right: 4rem;
              }
              .fiction_title {
                width: 70vw;
                right: 2rem;
              }
              .order_now_4 {
                position: relative;
                bottom: 0rem;
              }
            }
          `}
        </style>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  PopupCart: state.cartReduc.PopupCart,
  LoginBackdrop: state.accountR.LoginBackdrop,
});
export default connect(mapStateToProps)(ImageCarousel);
