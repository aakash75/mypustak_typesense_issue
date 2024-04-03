import { Skeleton } from "@mui/material";
// import Image from 'next/image';
import React, { useState } from "react";
import styles from "../../styles/BookCardSkeleton.module.css";

// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

function BookCardSkeleton(props) {
  const [AddedtoCart, setAddedtoCart] = useState(false);

  return (
    <div className="" style={{ overflow: "hidden" }}>
      <div className={styles.mainBookDiv}>
        <div className={styles.containerDiv}>
          {/* <NewBookRibbon style={{position:'absolute',zIndex:5,left:"50px",top:"-5px"}}/> */}
          <div className={styles.bookImage}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={"13.0rem"}
              height={"15rem"}
            />
          </div>
          <div className={styles.textDiv}>
            <Skeleton
              variant="text"
              animation="wave"
              width={"9.984rem"}
              sx={{ padding: 0 }}
            />
            <Skeleton variant="text" animation="wave" width={"13.9rem"} />
            <Skeleton variant="text" animation="wave" width={"4.984rem"} />
          </div>
          <div className={styles.buttonDiv}>
            <Skeleton
              variant="text"
              animation="wave"
              width={"13.9rem"}
              height={"3rem"}
            />
          </div>
          {/* <div className='bookCoinsDiv' >
        <Image alt="bookcoinsicon" src={MyPustakLogo_2} /> <span className='bookcoinsSpan'> Earn book coin worth ₹177</span>
        </div> */}
        </div>
      </div>

      <style jsx>
        {`
          * {
            font-family: Roboto;
          }
          .prices {
            margin-bottom: 5px;
            background-color: #fff;
          }
          .button {
            cursor: pointer;
            border: none;
            color: #fff;
            background-color: #fff;
            height: 1.875rem;
            width: 6.875rem;
            font-family: Roboto;
            font-weight: 400;
            font-size: 0.75rem;
            // line-height: 14px;
            background: linear-gradient(90deg, #2157ad 0%, #6190da 100%);
            border-radius: 4.18446px;
            margin-bottom: 3px;
          }
          .textDiv {
            background-color: #fff;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            max-width: 9.984rem;
            min-width: 9.984rem;
            margin-top: 5px;
          }
          .bookImage {
            background-color: #fff;
            min-width: 9.984rem;
            padding: 0 0.7rem;
            max-height: fit-content;
            min-height: fit-content;
          }
          .bookCoinsDiv {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            min-width: 9.984rem;
            max-width: 10.984rem;
          }
          .buttonDiv {
            // padding:0 0.7rem;
            max-width: 9.984rem;
            background-color: #fff;
            min-width: 9.984rem;
            display: flex;
            justify-content: flex-start;
          }
          .containerDiv {
            // border:1px solid red;
            cursor: pointer;
            min-width: 14.0045vw;
            min-height: 100%;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .mainBookDiv:hover {
            // transform: scale(1.02);
            box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.6);
            transition: 0.5s;
          }
          .bookcoinsSpan {
            font-weight: 300;
            font-size: 0.75rem;
            color: #098041;
            margin-top: 3px;
          }
          .otherpriceSpan {
            font-weight: 400;
            font-size: 0.875rem;
            color: #5f6365;
            background-color: #fff;
          }
          .priceSpan {
            background-color: #fff;
            font-weight: 500;
            font-size: 1rem;
            color: #098041;
          }
          .bookTitle {
            background-color: #fff;
            font-weight: 400;
            font-size: 0.8rem;
            line-height: 1rem;
            color: #484848;
            margin-top: 5px;
            margin-bottom: 5px;
          }
          .categories {
            margin-top: 2px;
            font-weight: 400;
            background-color: #fff;
            font-size: 0.625rem;
            line-height: 0.75rem;
            color: rgba(0, 0, 0, 0.6);
            margin-bottom: 5px;
          }
          .mainBookDiv {
            background-color: #fff;
            position: relative;
            min-width: 16.1vw;
            min-height: 21.063rem;
            max-height: fit-content;
            // height:50.148vh;
            padding: 0.625rem 0.875rem;
            box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
            // border:1px solid #000
            border-right: 0.5px solid #ddd;
            border-bottom: 0.5px solid #ddd;
          }
          @media screen and (max-width: 991px) {
            .bookImage {
              padding: 0;
            }
            .buttonDiv {
              padding: 0;
            }
            .textDiv {
              padding: 0;
            }
          }

          @media only screen and (max-width: 850px) and (min-width: 710px) {
            .bookImage {
              padding: 0 0.5rem;
            }
            .buttonDiv {
              padding: 0 0.5rem;
            }
            .textDiv {
              // padding:0 0.5rem;
            }
          }

          @media only screen and (max-width: 710px) and (min-width: 576px) {
            .bookImage {
              padding: 0 0.7rem;
            }
            .buttonDiv {
              padding: 0 0.7rem;
            }
            .textDiv {
              // padding:0 0.7rem;
            }
          }
          @media only screen and (max-width: 575px) and (min-width: 380px) {
            .bookImage {
              padding: 0 0px;
            }
            .buttonDiv {
              max-width: 100%;
              min-width: 100%;
              padding: 0 0px;
            }
            .textDiv {
              max-width: 100%;
              min-width: 100%;
              padding: 0 0px;
            }
            .bookCoinsDiv {
              max-width: 100%;
              min-width: 100%;
            }
          }

          @media only screen and (max-width: 380px) {
            .bookImage {
              padding: 0 20px;
            }
            .buttonDiv {
              max-width: 100%;
              min-width: 100%;
              padding: 0 0px;
            }
            .textDiv {
              max-width: 100%;
              min-width: 100%;
              padding: 0 0px;
            }
            .bookCoinsDiv {
              max-width: 100%;
              min-width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}

export default BookCardSkeleton;
