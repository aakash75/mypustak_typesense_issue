"use client";
import React, { Fragment, useState } from "react";
import { Button, IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import './Carousel.css';
import { bucket } from "../../helper/aws";
import bannerImage from "../../assets/Artboard2.png";

import MediaQuery from "react-responsive";
import Slider from "react-slick";
import styles from "../../styles/CustomCarousel.module.css";
import Image from "next/legacy/image";
import { Diversity1Sharp } from "@mui/icons-material";
import SliderWrapper from "./_SlickSliderStyle";

const HomeBannerListNew = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const src = `${bucket}uploads/homebanner/`;

  //   useEffect(() =>{
  //    if(!props.autoSlide) return
  //    const slideInterval  = setInterval(next,autoSlideInterval)
  //    return () => clearInterval
  //   },[])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    appendDots: (dots) => <ul className="bg-red-50  ">{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };
  var settingsTab = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    appendDots: (dots) => <ul className="bg-red-50  ">{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };
  var settingsLap = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    // dotsClass:0,
    appendDots: (dots) => <ul className="bg-red-50  ">{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(2 - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
    // setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const nextSlide = () => {
    if (currentSlide === 2 - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
    //  setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };
  // let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let arr = props.banners;
  const { display_item, height, banners, mob_display_item } = props;
  console.log(banners, "banner image");
  return (
    // <div style ={{ border:"10px solid green" }}>
    <>
      <div className="mx-3 my-2">
        {console.log(banners, "546565666")}
        <div className="sm:hidden">
          <SliderWrapper>
            <Slider {...settings}>
              {props.banners.map((banner, index) => {
                return banner.banner_position == 2 ? (
                  <div key={index} className="">
                    <Image
                      alt={""}
                      placeholder="blur"
                      blurDataURL={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner?.banner_image_mobile}`}
                      // src={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image_mobile}`}
                      // src = "https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:720:450:0/gravity:sm/plain/https%3A%2F%2Fs3-ap-south-1.amazonaws.com%2Fbookscape-s3-bucket%2F5BCEF885F9mob_folk_tales_and_fairy_tales.png"
                      // src="https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:520:292:0/gravity:sm/plain/https%3A%2F%2Fs3-ap-south-1.amazonaws.com%2Fbookscape-s3-bucket%2F1DAB6DFE951-trendingtiles.jpg"
                      // src={bannerImage}
                      src={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner?.banner_image_mobile}`}
                      className="rounded-md "
                      sizes="100vw"
                      // style={{
                      //     width: '100%',
                      //     height: '100%',
                      // }}
                      // width={300}
                      width={200}
                      height={90}
                    />
                  </div>
                ) : null;
              })}
            </Slider>
          </SliderWrapper>
        </div>
        {/* tab view  */}
        <div className="hidden sm:block lg:hidden ">
          {" "}
          <SliderWrapper>
            <Slider {...settingsTab}>
              {props.banners.map((banner, index) => {
                return banner.banner_position == 2 ? (
                  <div key={index} className=" ">
                    {console.log(banner, "6444646464")}
                    <Image
                      alt={""}
                      placeholder="blur"
                      blurDataURL={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner?.banner_image_mobile}`}
                      // src={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner. banner_image}`}
                      // src = "https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:720:450:0/gravity:sm/plain/https%3A%2F%2Fs3-ap-south-1.amazonaws.com%2Fbookscape-s3-bucket%2F5BCEF885F9mob_folk_tales_and_fairy_tales.png"
                      // src="https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:520:292:0/gravity:sm/plain/https%3A%2F%2Fs3-ap-south-1.amazonaws.com%2Fbookscape-s3-bucket%2F1DAB6DFE951-trendingtiles.jpg"
                      // src={"https://d239pyg5al708u.cloudfront.net/uploads/homebanner/HOME_2_2_87_mobile.webp"}
                      src={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner?.banner_image_mobile}`}
                      className="rounded-md "
                      sizes="100vw"
                      // style={{
                      //     width: '100%',
                      //     height: '100%',
                      // }}
                      // width={300}
                      width={260}
                      height={106}
                    />
                  </div>
                ) : null;
              })}
            </Slider>
          </SliderWrapper>
        </div>
        {/* laptop view  */}
        <div className="hidden lg:block flex justify-center  ">
          {" "}
          <SliderWrapper>
            <Slider {...settingsLap}>
              {props.banners.map((banner, index) => {
                return banner.banner_position == 2 ? (
                  <div key={index} className="px-2 h-[100px]">
                    {/* <img 
                                        src="https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:520:292:0/gravity:sm/plain/https%3A%2F%2Fs3-ap-south-1.amazonaws.com%2Fbookscape-s3-bucket%2F1DAB6DFE951-trendingtiles.jpg"

                                    alt="" height={200} width={400} /> */}
                    <Image
                      alt={""}
                      placeholder="blur"
                      blurDataURL={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner?.banner_image_mobile}`}
                      // src={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image_extra_large}`}
                      // src = "https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:720:450:0/gravity:sm/plain/https%3A%2F%2Fs3-ap-south-1.amazonaws.com%2Fbookscape-s3-bucket%2F5BCEF885F9mob_folk_tales_and_fairy_tales.png"
                      // src="https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:520:292:0/gravity:sm/plain/https%3A%2F%2Fs3-ap-south-1.amazonaws.com%2Fbookscape-s3-bucket%2F1DAB6DFE951-trendingtiles.jpg"
                      // src={bannerImage}
                      src={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner?.banner_image_mobile}`}
                      className="rounded-md"
                      sizes="100vw"
                      style={{
                        width: "fit-content",

                        maxHeight: "14rem",
                      }}
                      fill={true}
                      // width={300}
                      // objectFit="contain"
                      // layout={"fill"}
                      width={302}
                      height={150}
                    />
                  </div>
                ) : null;
              })}
            </Slider>
          </SliderWrapper>
        </div>
      </div>
    </>
  );
};

export default HomeBannerListNew;
