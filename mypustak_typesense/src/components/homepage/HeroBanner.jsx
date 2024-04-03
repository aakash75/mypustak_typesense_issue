"use client"
import Image from "next/legacy/image";
import React from "react";
import Carousel from "react-multi-carousel";
import MediaQuery from "react-responsive";
import "react-multi-carousel/lib/styles.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { bucket } from "../../helper/aws";
import styles from "../../styles/CustomCarousel.module.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
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
        right: "3px",
        outline: "0",
        transition: "all 0.5s",
        borderRadius: "4px",
        // background: "hsla(0,0%,100%,.6)",
        // boxShadow: "0 0 4px 0 rgba(0,0,0,.3)",
        zIndex: "50",
        cursor: "pointer",
        border: "0",
        // background: "hsla(0,0%,100%,.6)",
        // background: "#fff",
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
        left: "3px",
        outline: "0",
        transition: "all 0.5s",
        borderRadius: "4px",
        // background: "#fff",
        // background: "hsla(0,0%,100%,.6)",
        // boxShadow: "0 0 4px 0 rgba(0,0,0,.3)",
        zIndex: "50",
        cursor: "pointer",
        // border: "0",
        // background: "white",
        padding: "1rem 0.2rem",

        // minWidth: "43px",
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
const src = `${bucket}uploads/homebanner/`;
function HeroBanner(props) {

console.log(props.banners.data , "banner 123")
  return (
    <div >
      <div className='mainbannerdiv'>
        {/* <Image src="/> */}


        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          showDots={false}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          ssr={false}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass='carousel-container'
          removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={this.props.deviceType}
          dotListClass='custom-dot-list-style'
          itemClass='carousel-item-padding-40-px'>
          {props.banners.data?.map((banner, index) => {
            if (true) {
              return (
                <div key ={index}>
                  55
                  </div>
              );
            }
          })}
          <h1>dfjdj</h1>
        </Carousel>
      </div>
      <style jsx>
        {`
          .mainbannerdiv {
            width: 100%;
            height:100%;
            
            // width:1265px;
            // width:946px; //md
            // width:752px; //sm
            // width: 559px;//xs
            // width:79.063rem;
            // height: 246px;
            // height:239px; //md
            // height:215px; //sm
            // height:167px; //xs
            // min-height: 14.75rem;
            // max-height: 14.75rem;
            // border:1px solid #000;
            // box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </div>
  );
}

export default HeroBanner;
