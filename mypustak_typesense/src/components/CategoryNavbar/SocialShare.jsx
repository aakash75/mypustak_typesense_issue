import React from 'react'
import styles from "../../styles/CategoryNavbar.module.css";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import note_book from "../../assets/notebook_icon.jpeg"
import CategoriesDrawer from "../Drawers/CategoriesDrawer2";
import playstore from "../../assets/playstore.webp";
import whatsapp from "../../assets/whatsapp.png";
import Image from "next/legacy/image";
import { connect } from "react-redux";
import freeBookImg from "../../assets/FreeBookCatIcon.svg";
import NewBookImage from "../../assets/NewBookCatIcon.svg";
import DonateBookImage from "../../assets/DonateBookCaticon.svg";
import ProudDonorImage from "../../assets/ProudDonorCatIcon.svg";
import IitJeeImage from "../../assets/IitJeeCatIcon.svg";
import { fetch_wishlist_detail_otherpage } from "../../redux/actions/loginactions";
import Link from 'next/link';
const rightnavComponent = [

    {
        key: 7,
        title: "Download App",
        url: "https://play.google.com/store/apps/details?id=com.mypustak",
        icon: "",
        mobile: "d-none d-md-block",
        Image: playstore,
    },
    {
        key: 8,
        title: "Chat with us",
        url: "https://api.whatsapp.com/send?phone=913341804333&text=Welcome%20to%20MyPustak%20-%20I%20need%20a%20help",
        icon: "",
        mobile: "d-none d-md-block",
        Image: whatsapp,
    },
];
const SocialShare = () => {
  return (
    <div>
          <div className='d-none d-sm-flex'>
              <div className={styles.navmainDiv} >
                  {rightnavComponent.map((data, index) => (
                      <Link
                      key={index}
                          href={data.url ? data.url : "/" + data.page}
                          // onClick={() => {
                          //   data.url
                          // }}
                          style={{ textDecoration: "none" }}
                          className={styles.map_div}
                          id={"nav" + index}
                          onMouseDown={() => {
                              setmouseDown(index);
                          }}
                        //   legacyBehavior
                          >
                          <div style={{ cursor: "pointer" }}  >
                              <div
                                  className={styles.imageDiv}
                                  // style={{width:"3rem",height:"3rem",flex:2}}
                                  style={{ margin: "auto" }}
                              >
                                  <Image
                                      width={15}
                                      height={15}
                                      // style={{borderRadius:"50%"}}
                                      layout='responsive'
                                      alt='whatsapp_icon'
                                      src={data.Image}
                                  />
                              </div>
                              <span
                                  className={styles.anchor_title}
                              // style={{textDecoration:"none",color:"#2248ae",fontSize:"0.9rem"}}
                              >
                                  {data.title}
                              </span>
                          </div>

                      </Link>
                  ))}
              </div>
          </div>
    </div>
  )
}

export default SocialShare