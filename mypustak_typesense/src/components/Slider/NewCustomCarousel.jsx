"use client"
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
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
function NewCustomCarousel(props) {
  useEffect(() => {
    console.log(props.banners.data, "props.banner.data");
  }, [])

  const [loaded, setloaded] = useState(false);
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
          ssr={true}
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass='carousel-container'
          removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={this.props.deviceType}
          dotListClass='custom-dot-list-style'
          itemClass='carousel-item-padding-40-px'>
          {props.banners.data.map((banner, index) => {
            if (banner.banner_position == 1) {
              return (
               //  <div key={index} onClick={() => {
               //    window.location.assign(banner.banner_button_url)
               //  }} style={{ cursor: 'pointer' }} className=''>
               //    <MediaQuery minWidth={992}>
               //      <Image
               //        placeholder="blur"
               //        blurDataURL={`${src}${banner.banner_image}`}
               //        src={`${src}${banner.banner_image}`}
               //        onError={i => (i.target.style.display = "none")}
               //        height={246}
               //        width={1470}
               //        title={banner.banner_button_text}
               //        priority
               //        alt=""
               //      />
               //    </MediaQuery>
               //    <MediaQuery minWidth={768} maxWidth={991}>
               //      <Image
               //        placeholder="blur"
               //        blurDataURL={`${src}${banner.banner_image_tab}`}
               //        src={`${src}${banner.banner_image}`}
               //        onError={i => (i.target.style.display = "none")}
               //        height={246}
               //        title={banner.banner_button_text}
               //        width={1470}
               //        priority
               //        alt=""
               //      />
               //    </MediaQuery>
               //    <MediaQuery minWidth={576} maxWidth={767}>
               //      <Image
               //        placeholder="blur"
               //        blurDataURL={`${src}${banner.banner_image_medium}`}
               //        src={`${src}${banner.banner_image}`}
               //        onError={i => (i.target.style.display = "none")}
               //        height={246}
               //        title={banner.banner_button_text}
               //        width={1470}
               //        priority
               //        alt=""
               //      />
               //    </MediaQuery>
               //    <MediaQuery maxWidth={575}>
               //      <Image
               //        placeholder="blur"
               //        blurDataURL={`${src}${banner.banner_image_mobile}`}
               //        src={`${src}${banner.banner_image}`}
               //        // src = "https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:720:450:0/gravity:sm/plain/https%3A%2F%2Fs3-ap-south-1.amazonaws.com%2Fbookscape-s3-bucket%2F5BCEF885F9mob_folk_tales_and_fairy_tales.png"
               //        onError={i => (i.target.style.display = "none")}
               //        height={'100%'}
               //        width={559}
               //        title={banner.banner_button_text}
               //        priority
               //        alt=""
               //      />
               //    </MediaQuery>

               //    {/* <Image 
               //      placeholder="blur"
               //      blurDataURL={window.screen.width>1200?`${src}${banner.banner_image}`:
               //      window.screen.width>768?`${src}${banner.banner_image_tab}`:
               //      window.screen.width>576?`${src}${banner.banner_image_medium}`:
               //      `${src}${banner.banner_image_mobile}`
               //    } 
               //      onError={i => (i.target.style.display = "none")}  
               //      alt="banner image" src={window.screen.width>1200?`${src}${banner.banner_image}`:
               //      window.screen.width>768?`${src}${banner.banner_image_tab}`:
               //      window.screen.width>576?`${src}${banner.banner_image_medium}`:
               //      `${src}${banner.banner_image_mobile}`
               //    }  
                    
               //      height={window.screen.width>1200?246:window.screen.width>768?239:window.screen.width>576?215:167} 
               //      width={window.screen.width>1200?1470:window.screen.width>768?946:window.screen.width>576?752:559} 
               //      /> */}



               //    {/* <img
               //        alt=''
               //        onLoad={() => {
               //          setloaded(true);
               //        }}
               //        onError={i => i.target.style.display='none'}
               //        src={`${src}${banner.banner_image}`}
               //        style={{
               //          minHeight: "100%",
               //          maxHeight: "100%",
               //          width: "100%",
               //          height: "100%",
               //        }}
               //      /> */}
               //    {/* <b style={{fontSize:'8rem'}}>HERO BANNERRRRRR</b> */}
               //  </div>
               <>
                          <>
                  <div className={`px-2 my-2 rounded-md bg-gray-200 ${styles.display_575}`} style ={{borderRadius:"5px" , height:"246px"}}>
                      <Image 
                        alt = {banner.banner_image}
                        placeholder="blur"
                        blurDataURL={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image_mobile}`} 
                        src={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image_mobile}`} 
                        // src = "https://d34a0mln2492j4.cloudfront.net/unsigned/resize:fit:720:450:0/gravity:sm/plain/https%3A%2F%2Fs3-ap-south-1.amazonaws.com%2Fbookscape-s3-bucket%2F5BCEF885F9mob_folk_tales_and_fairy_tales.png"
                        className='rounded-md'   
                        sizes="100vw"
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        // width={300}
                        width={559}
                        height={200} />
                  </div>
                  <div className={`px-2 my-2 rounded-md bg-gray-200 ${styles.display_576}`} style ={{borderRadius:"5px", height:"246px"}}>
                  <Image 
                        alt = {banner.banner_image}
                        placeholder="blur"
                        blurDataURL={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image}`} 
                        src={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image}`} 
                        className='rounded-md'   
                        sizes="100vw"
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        width={300}
                        height={200} />
                  </div>

                  <div className={`px-2 my-2 rounded-md bg-gray-200 ${styles.display_768}`} style ={{borderRadius:"5px", height:"246px"}}>
                  <Image 
                        alt = {banner.banner_image}
                        placeholder="blur"
                        blurDataURL={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image_tab}`} 
                        src={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image}`} 
                        className='rounded-md'   
                        sizes="100vw"
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        width={300}
                        height={200} />
                  </div>
                  <div className={`px-2 my-2 rounded-md bg-gray-200 ${styles.display_576_767}`} style ={{borderRadius:"5px", height:"246px"}}>
                  <Image 
                        alt = {banner.banner_image}
                        placeholder="blur"
                        blurDataURL={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image_medium}`} 
                        src={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image}`} 
                        className='rounded-md'   
                        sizes="100vw"
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        width={300}
                        height={200} />
                  </div>

                  <div className={`px-2 my-2 rounded-md bg-gray-200 ${styles.display_992}`} style ={{borderRadius:"5px", height:"246px"}}>
                  <Image 
                        alt = {banner.banner_image}
                        placeholder="blur"
                        blurDataURL={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image}`} 
                        src={`https://d239pyg5al708u.cloudfront.net/uploads/homebanner/${banner.banner_image}`} 
                        className='rounded-md'   
                        sizes="100vw"
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        width={300}
                        height={200} />
                  </div>
                 
                  </>
               </>
              );
            }
          })}
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

export default NewCustomCarousel;
