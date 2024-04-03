"use client"
import React, { Fragment, useEffect, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import './Carousel.css';
import { bucket } from "../../helper/aws";

import MediaQuery from "react-responsive";

import styles from "../../styles/CustomCarousel.module.css";
import Image from "next/legacy/image";
import { Diversity1Sharp } from '@mui/icons-material';


const Carousel = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const src = `${bucket}uploads/homebanner/`;


  useEffect(() =>{
  //  if(!props.autoSlide) return
    const slideInterval = setInterval(nextSlide,3000)
   return () => clearInterval
  },[])

  const prevSlide = () => {
   if(currentSlide === 0 ){
      setCurrentSlide(2-1);
   }
   else{
      setCurrentSlide(currentSlide -   1);
   }
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const nextSlide = () => {
   if(currentSlide === 2-1){
      setCurrentSlide(0)
   }
   else{
      setCurrentSlide(currentSlide + 1);
   }
   //  setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

const {display_item,height,banners} = props;
  return (
   // <div style ={{ border:"10px solid green" }}> 
   <>
  
   <div 
   className='overflow-hidden relative' 

   >
      <div 
      className={`flex transition ease-out duration-500 `} 
         style={{ transform:`translateX(-${currentSlide *100}%)`}}
         // style={{ backgroundColor:"red", height:"50vh", border:"10px solid green", overflowY: "auto"}}
         >  
      <div style={{display:"flex", position:"relative"}}> 

         {
            props.banners.data.map((banner , index) =>{

               return(
               
                  banner.banner_position == 1? 
                  <>
                  <div className={`px-2 my-2 rounded-md ${styles.display_575}`} style ={{borderRadius:"5px", width:`${100/display_item}vw` , height:"246px"}}>
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
                  <div className={`px-2 my-2 rounded-md ${styles.display_576}`} style ={{borderRadius:"5px", width:`${100/display_item}vw`, height:"246px"}}>
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

                  <div className={`px-2 my-2 rounded-md ${styles.display_768}`} style ={{borderRadius:"5px", width:`${100/display_item}vw`, height:"246px"}}>
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
                  <div className={`px-2 my-2 rounded-md ${styles.display_576_767}`} style ={{borderRadius:"5px", width:`${100/display_item}vw`, height:"246px"}}>
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

                  <div className={`px-2 my-2 rounded-md ${styles.display_992}`} style ={{borderRadius:"5px", width:`${100/display_item}vw`, height:"246px"}}>
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

                  
                     :null
                
               )
            })
         }

      </div>

   
     

  
    </div>

    <div className="absolute inset-0 flex items-center justify-between p-2">
                <Button onClick={prevSlide} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                <ChevronLeftIcon size ={40}/>
                </Button>
                <Button onClick={nextSlide} className='p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white'>
                  <ChevronRightIcon size ={40}/>
                </Button>
            </div>
    </div>
    </>
    
  );
};

export default Carousel;
