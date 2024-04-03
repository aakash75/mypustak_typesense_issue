"use client"
import React, { useEffect, useState } from "react";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import categorywebp from "../../assets/Vector.webp";
import Image from "next/legacy/image";
import { bucket } from "../../helper/aws";
import styles from "../../styles/ShopByCategories.module.css";


const categories = [
  { key: 1, image: categorywebp, span: "Government Exam" },
  { key: 2, image: categorywebp, span: "IIT" },
  { key: 3, image: categorywebp, span: "Government Exam" },
  { key: 4, image: categorywebp, span: "Government Exam" },
  { key: 5, image: categorywebp, span: "Government Exam" },
  { key: 6, image: categorywebp, span: "Government Exam" },
  { key: 7, image: categorywebp, span: "Government Exam" },
  { key: 8, image: categorywebp, span: "Government Exam" },
  { key: 9, image: categorywebp, span: "Government Exam" },
  { key: 10, image: categorywebp, span: "Government Exam" },
  { key: 11, image: categorywebp, span: "Government Exam" },
  { key: 12, image: categorywebp, span: "Government Exam" },
  { key: 13, image: categorywebp, span: "Government Exam" },
  { key: 14, image: categorywebp, span: "Government Exam" },
  { key: 15, image: categorywebp, span: "Government Exam" },
  { key: 16, image: categorywebp, span: "Government Exam" },
];
// const src = `${bucket}uploads/homebanner/`
const src = `https://d239pyg5al708u.cloudfront.net/uploads/homebanner/`;
function ShopByCategories(props) {

  const [mouseDown, setmouseDown] = useState("");
useEffect(()=>{
  console.log(props,"props252232");
},[])

  return (
    <div>
      <div className={styles.titleDiv}>
        <h2 className={styles.title}>Shop by categories </h2>
      </div>
      <div className={styles.mainDIv}>
        <div className='' style={{ display: "flex", flexWrap: "wrap" }}>
          {props.categories?.banners?.data?.map((cat, index) => {
            if (cat.banner_position == 3) {
              return (
                <div
                  key={index}
                  id={"cat" + index}
                  onMouseDown={() => {
                    setmouseDown(index);
                  }}
                  className={styles.categoryDiv}
                  // onClick={() => {
                  //     Router.push(cat.banner_button_url)
                  // }}
                >
                  <a
                    aria-label={`${cat.banner_button_text}`}
                    href={`${cat.banner_button_url}`}>
                    <div
                      style={{
                        width: "4.5rem",
                        height: "4.5rem",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}>
                      <Image
                        style={{}}
                        className=''
                        placeholder='blur'
                        blurDataURL={`${src}${cat.banner_image}`}
                        layout='responsive'
                        // width={"100%"}
                        width={100}
                        // height={"100%"}
                        height={100}
                        src={`${src}${cat.banner_image}`}
                        alt=''></Image>
                    </div>
                  </a>
                  {/* <div className='categoryimage'>
                                <Image unoptimized alt='categoryicon' loader={() => src} src={src} style={{borderRadius:'50px'}} width={"3.75rem"} height={"3.75rem"} layout="responsive"/>
                            </div> */}
                  <a
                    aria-label={`${cat.banner_button_text}`}
                    className={styles.categorySpan}
                    style={{ textDecoration: "none" }}
                    href={`${cat.banner_button_url}`}>
                    <span>{cat.banner_button_text}</span>
                  </a>
                </div>
              );
            }
          })}
        </div>
      </div>
      <style jsx>
        {`
          .categorySpan {
            width: 4.75rem;
            height: 2rem;
            color: #000;
            font-family: "Roboto";
            font-style: normal;
            font-weight: 500;
            font-size: 0.875rem;
            line-height: 1rem;
            text-align: center;
            margin-top: 1.325rem;
            margin-bottom: 3.125rem;
          }
          .categoryDiv {
            background-color: white;
            max-width: 12.5%;
            min-width: 12.5%;
            max-height: 1rem;
            // width:12.5%;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 11rem;
          }
          .categoryDiv:hover {
            transform: scale(1.02) translateY(-3px);
            // padding:1px 3px;
            transition: 0.15s;
            color: #2258ae;
          }
          #${"cat" + mouseDown}:active {
            animation: press 0.2s 1 linear;
          }
          @keyframes press {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(0.92);
            }
            to {
              transform: scale(1);
            }
          }
          .listCategories {
            display: flex;
          }
          .categoryimage {
            width: 4.5rem;
            height: 4.5rem;
            border-radius: 50px;
            padding: 0.5rem;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25),
              inset 0px 0px 10px rgba(0, 0, 0, 0.25);
          }
          .titleDiv {
            width: 96.72vw;
            background-color: #fff;
            height: 6.44vh;
            margin-top: 1rem;
            // margin-top:20px;
            // border:1px solid #ddd;
            max-width: 1500px;
            // border-bottom:1px solid #2258ae;
            // margin-bottom:0.3rem;
            display: flex;
            align-items: center;
          }
          .title {
            margin-left: 21px;
            margin-top: 15px;
            margin-bottom: 15px;
            text-align: center;
            font-family: "Roboto";
            font-style: normal;
            font-weight: 500;
            font-size: 1rem;
            line-height: 19px;
            /* identical to box height */
            color: #2258ae;
          }
          .mainDIv {
            background-color: #fff;
            // box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
            // border-radius: 5px;
            padding-top: 0.8rem;
            // margin-top:10px;
            margin-top: 0.2rem;
            max-width: 1500px;
            width: 96.72vw;
            // border:1px solid #ddd;
            height: max-content;
            // margin-bottom:20px;
          }

          @media (max-width: 576px) {
            .mainDIv {
              margin-top: 10px;
              margin-bottom: 10px;
            }

            .categoryDiv {
              max-width: 33.33%;
              min-width: 33.33%;
              min-height: 8.5rem;
            }
            .categoryDiv:hover {
              transform: none;
              // padding:1px 3px;
              transition: 0s;
              color: #2258ae;
            }
            .categoryimage {
              width: 8.5rem;
              height: 8.5rem;
            }
          }
          // Small devices (landscape phones, 576px and up)
          @media (min-width: 576px) {
            .categoryDiv {
              max-width: 16.66%;
              min-width: 16.66%;
            }
          }
          @media screen and (max-width: 991px) {
            .categorySpan {
              width: fit-content;
              margin-top: 0.55rem;
              margin-bottom: 0.75rem;
            }
          }

          // Medium devices (tablets, 768px and up)
          @media (min-width: 768px) {
            .categoryDiv {
              max-width: 16.66%;
              min-width: 16.66%;
              min-height: 11rem;
            }
            .categoryimage {
              width: 8.5rem;
              height: 8.5rem;
            }
          }

          // Large devices (desktops, 992px and up)
          @media (min-width: 992px) {
            .categoryDiv {
              max-width: 12.5%;
              min-width: 12.5%;
              min-height: 11rem;
            }
          }
        `}
      </style>
    </div>
  );
}

export default ShopByCategories;
