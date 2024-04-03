"use client"
import React, { useEffect, useState } from "react";
import styles from "../../styles/City.module.css"
import delhi from "../../assets/delhi_img.png";
import mumbai from "../../assets/mumbai_img.png";
import kolkata from "../../assets/kolkata_img.png";
import chennai from "../../assets/chennai_img.png";
import noida from "../../assets/noida_img.png";
import pune from "../../assets/pune_img.png";
import india from "../../assets/india_img.png";
import bengalore from "../../assets/bengalore_img.png";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";


import { style } from "@mui/system";
const _ = require("lodash");
function City() {
  const list_city = [
    { city_img: delhi, city_name: "Delhi" },
    { city_img: mumbai, city_name: "Mumbai" },
    { city_img: chennai, city_name: "Chennai" },
    { city_img: noida, city_name: "Noida" },
    { city_img: bengalore, city_name: "Bangalore" },
    { city_img: pune, city_name: "Pune" },
    { city_img: kolkata, city_name: "Kolkata" },
    { city_img: india, city_name: "India" },
  ];
  const [showcity, SetshowCity] = useState([]);
 const router = useRouter()
  React.useEffect(() => {
    makeTimer();
  }, []);
  const makeTimer = () => {
    setInterval(() => {
      let new_city = _.shuffle(list_city)[0];
      SetshowCity(new_city);
    }, 2000);
  };
  return (
    <div className={`pb-5 mx-md-5 mx-lg-4 ${styles.maindiv}`}>
      <div className={`container-fluid col-lg-9 p-2  bg-white shadow-sm pb-5 pt-5 mb-5 ${styles.subdiv}  `}>
        <div className=' text-center pb-1  mt-1 mb-2'>
          <h4 className=' mb-1 font-weight-bold'>
            Select Your City For Books Pickup
          </h4>
        </div>
        <div className={`row mx-xs-2 mx-lg-4 ${styles.select_div}`}>
          <div
            className='col-6 px-0 py-0 '
            style={{ justifyContent: "center" }}>
            <div
              className={`${styles.citymainDiv} ${styles.divHover}  d-flex align-items-center`}
              role='button'
              onClick={e => {
                e.preventDefault();
                router.push(`/donate-books/pickup?kol`);
              }}>
              <div
                className='mr-5'
                style={{ width: "6.5rem", height: "5.75rem" }}>
                <Image
                  placeholder='blur'
                  // blurDataURL={kolkata}
                  src={kolkata}
                  alt='kolkata-img'
                />
              </div>
              <div className='d-flex justify-content-center align-items-center px-md-2'>
                <h5 style={{ padding: "0.1rem", fontWeight: "bold" }}>
                  Kolkata
                </h5>
              </div>
            </div>
          </div>

          <div
            className='col-6 px-0 py-0 '
            style={{ justifyContent: "center" }}>
            <div
              className={`${styles.citymainDiv} ${styles.divHover}  d-flex align-items-center`}
              role='button'
              onClick={e => {
                e.preventDefault();
                router.push(`/donate-books/pickup?roi`);
              }}>
              <div
                className='mr-5'
                style={{ width: "6rem", height: "5.75rem" }}>
                <Image
                  placeholder='blur'
                  // blurDataURL={india}
                  src={india}
                  alt='kolkata-img'
                />
              </div>
              <div className='d-flex justify-content-center align-items-center px-md-2'>
                <h5 style={{ padding: "0.1rem", fontWeight: "bold" }}>
                  Rest of India
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className=' text-center pb-3 pt-3  m-3  mb-2'>
          <h5 className='mb-0 font-weight-bold' style={{ color: "#5A5A5A" }}>
            We Have Door Step Free / Pay Pickup Facility at 17000+ pincodes in
            India
          </h5>
          {showcity["city_img"] ? (
            <div
              className='d-flex align-items-center'
              style={{ justifyContent: "center", marginTop: "1rem" }}>
              <div className={`${styles.avatar} ${styles.fadeInImage}`}>
                <Image
                  className={`${styles.fadeInImage}`}
                  src={showcity["city_img"]}
                  alt='kolkata-img'
                  height={"100%"}
                  width={"100%"}
                />
              </div>
              <div style={{ width: "5rem", color: "gray", textAlign: "left" }}>
                {showcity["city_name"]}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <style jsx>{`

      `}</style>
    </div>
  );
}

export default City;
