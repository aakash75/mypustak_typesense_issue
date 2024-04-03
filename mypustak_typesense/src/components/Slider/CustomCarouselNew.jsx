"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import './Carousel.css';
import { bucket } from "../../helper/aws";
import Slider from "react-slick";
import MediaQuery from "react-responsive";
import SliderWrapper from "./_SlickSliderStyle";
import BannerMobile from "../../assets/BannerMobile.jpg";
import BannerLaptop from "../../assets/BannerLaptop.jpg";
import home1 from "../../assets/home1.jpeg";
import home2 from "../../assets/home2.jpeg";

import styles from "../../styles/CustomCarousel.module.css";
import Image from "next/legacy/image";
import { Diversity1Sharp } from "@mui/icons-material";

const desktopimages = [home1, home2];

const Carousel = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const src = `${bucket}uploads/homebanner/`;

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          marginRight: "-100px",
          background: "green",
        }}
        onClick={onClick}
      />
    );
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    // adaptiveHeight: true,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };
  useEffect(() => {
    //  if(!props.autoSlide) return
    const slideInterval = setInterval(nextSlide, 3000);
    return () => clearInterval;
  }, []);

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

  const { display_item, height, banners } = props;
  console.log(props.banners.data, "banners.data");
  const Home_banner = props.banners.data.filter(
    (data) => data.banner_position === 1
  );
  // console.log(props.banners.data, "props.banners.data Home_banner");
  // console.log(Home_banner, "Home_banner");
  return (
    // <div style ={{ border:"10px solid green" }}>
    <>
      <div
      // className='overflow-hidden relative'
      >
        <div>
          <div className="">
            <SliderWrapper>
              <Slider {...settings}>
                {props.banners.data.map((banner, index) => {
                  return banner.banner_position == 1 ? (
                    <React.Fragment key={index}>
                      {/* for mobile */}
                      <div className="sm:hidden  min-h-[200px]  p-1 ">
                        <Image
                          alt={banner.banner_image}
                          placeholder="blur"
                          blurDataURL={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image_mobile}`}
                          src={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image_mobile}`}
                          className="rounded-md w-full"
                          sizes="100vw"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          // width={300}
                          width={412}
                          height={291}
                          // src={BannerMobile}
                          // className="rounded-md h-[200px]"
                          // sizes="100vw"
                          // style={{
                          //     width: '100%',
                          //     height: '200px',
                          // }}
                          // width={0}
                          // height={0}
                          // // height={58.5}
                          // objectFit="contain"
                          // layout={"fill"}
                          // style={{
                          //   width: "100%",
                          //   height: "100px",
                          // }}
                          // width={0}
                          // height={0}
                        />
                      </div>

                      {/* for desktop */}
                      <div className="hidden sm:block  p-1 ">
                        <Image
                          alt={banner.banner_image}
                          placeholder="blur"
                          blurDataURL={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image}`}
                          src={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image}`}
                          // src={BannerLaptop}
                          className="rounded-md min-h-[250px]"
                          sizes="100vw"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          width={300}
                          height={58.5}
                        />
                      </div>
                    </React.Fragment>
                  ) : null;
                })}
              </Slider>
            </SliderWrapper>
          </div>
        </div>
        {/* 
                <div className="absolute inset-0 flex items-center justify-between p-2">
                    <Button onClick={prevSlide} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                        <ChevronLeftIcon size={40} />
                    </Button>
                    <Button onClick={nextSlide} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                        <ChevronRightIcon size={40} />
                    </Button>
                </div> */}

        <style jsx>{``}</style>
      </div>
    </>
  );
};

export default Carousel;
