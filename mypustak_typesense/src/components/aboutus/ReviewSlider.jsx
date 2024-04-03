import React, { Component, lazy, Suspense } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { connect } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MobileDetect from "mobile-detect";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

class ReviewSlider extends Component {
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

  backdropClickHandler = () => {
    this.props.CartopenModal();
  };
  test = () => {
    // alert('okk');
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
            boxShadow: "0 0 4px 0 rgba(0,0,0,.3)",
            zIndex: "50",
            cursor: "pointer",
            border: "0",
            // background: "white",
            padding: "1rem 0.2rem",
            // minWidth: "43px",
            minHeight: "43px",
            opacity: "1",
          }}
          onClick={() => onClick()}>
          <ChevronRightIcon
            style={{
              color: "black",
              display: "block",

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
            boxShadow: "0 0 4px 0 rgba(0,0,0,.3)",
            zIndex: "50",
            cursor: "pointer",
            border: "0",
            // background: "white",
            padding: "1rem 0.2rem ",
            // minWidth: "43px",
            minHeight: "43px",
            opacity: "1",
          }}
          onClick={() => onClick()}>
          <ChevronLeftIcon
            style={{
              color: "black",
              display: "block",

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
          //   autoPlay
          containerClass='carousel-container'
          customLeftArrow={<CustomLeftArrow />}
          // removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          beforeChange={() => this.setState({ isMoving: true })}
          afterChange={() => this.setState({ isMoving: false })}
          // containerClass="first-carousel-container container"
          deviceType={this.props.deviceType}
          customRightArrow={<CustomRightArrow />}>
          <div className='' style={{ margin: "1rem" }}>
            <div className='helpcard_slider'>
              <div className='ReviewSlider_div'>
                <img
                  alt=''
                  src='https://d239pyg5al708u.cloudfront.net/uploads/banner/review_1.png'
                />
              </div>
            </div>
          </div>

          <div className='' style={{ margin: "1rem" }}>
            <div className='helpcard_slider'>
              <div className='ReviewSlider_div'>
                <img
                  alt=''
                  style={{}}
                  src='https://d239pyg5al708u.cloudfront.net/uploads/banner/review_2.png'
                />
              </div>
            </div>
          </div>

          <div className='' style={{ margin: "1rem" }}>
            <div className='helpcard_slider'>
              <div className='ReviewSlider_div'>
                <img
                  alt=''
                  style={{}}
                  src='https://d239pyg5al708u.cloudfront.net/uploads/banner/review_3.png'
                />
              </div>
            </div>
          </div>

          <div className='' style={{ margin: "1rem" }}>
            <div className='helpcard_slider'>
              <div className='ReviewSlider_div'>
                <img
                  alt=''
                  style={{}}
                  src='https://d239pyg5al708u.cloudfront.net/uploads/banner/review_4.png'
                />
              </div>
            </div>
          </div>

          <div className='' style={{ margin: "1rem" }}>
            <div className='helpcard_slider'>
              <div className='ReviewSlider_div'>
                <img
                  alt=''
                  style={{}}
                  src='https://d239pyg5al708u.cloudfront.net/uploads/banner/review_5.png'
                />
              </div>
            </div>
          </div>
        </Carousel>

        <style jsx>
          {`
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
              width: 60%;
              color: white;
              // text-align: center;
              padding: 1.5rem 2rem;
            }
            .main_title {
              font-weight: bold;
              font-size: 1.3rem;
            }
            .sub_text {
              font-size: 0.8rem;
            }

            .right {
              // border: 2px solid pink;
              height: 100%;
              width: 40%;
            }

            .helpcard_slider {
              display: flex;
              border: 1px solid rgb(241, 251, 255);
              box-shadow: 0 3px 6px 0 rgb(200, 231, 241);

              min-height: 6rem;
              padding: 1rem;
              /* padding: 5rem; */
              border-radius: 8px;
              -webkit-border-radius: 8px;
              -moz-border-radius: 8px;
              -ms-border-radius: 8px;
              -o-border-radius: 8px;
            }
            .ReviewSlider_div {
              /* border:1px solid red; */
              width: 100%;
            }
            .ReviewSlider_div img {
              max-width: 23rem;
            }
            @media screen and (max-width: 991px) {
              .carousel-container {
                padding: 0rem 0.3rem;
              }

              .banner_card {
                // border: 2px solid pink;
                height: 7rem;
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
              .ReviewSlider_div img {
                max-width: 12rem;
              }
            }

            @media screen and (max-width: 538px) {
              .ReviewSlider_div img {
                max-width: 12rem;
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
export default connect(mapStateToProps, {})(ReviewSlider);
