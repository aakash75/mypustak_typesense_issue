"use client"
import React from "react";
import wallet_side from "../../assets/WalletMidBanner.svg";
import Image from "next/legacy/image";
import time_1 from "../../assets/time_1.webp";
import shield_1 from "../../assets/shield_1.webp";
import payment_1 from "../../assets/payment_1.webp";
import magnet_1 from "../../assets/magnet_1.webp";
import styles from "../../styles/walletpage.module.css";
import MediaQuery from "react-responsive";
import { Button } from "@mui/material";
import Link from "next/link";

function MywalletBanner() {
  const gotodiv = () => {
    let scrollToY = 0;
    scrollToY = 0;
    window.scrollTo(0, scrollToY);
  };
  return (
    <div
      style={{ marginBottom: "10rem" }}
      className={`${styles.bannerBackgroundimg}    bg-white  shadow   py-5 px-4     `}>
      <div className={`${styles.bannerRow} row mx-auto`}>
        <div className='col-12 col-sm-6 col-lg-6 mx-sm-0  col-md-6 ml-auto mr-2'>
          <h5 className={`${styles.BannerHeading} h5  `}>
            Why add money on my wallet ?
          </h5>
          <p className={`${styles.BannerParaGraph} p  `}>
            MyPustak wallet helps you perform cashless transactions, and You can
            also add money to your wallet from your bank account via UPI,
            internet banking, and credit/debit cards.
          </p>
          <p className={`${styles.BannerParaGraph} p  `}>
            You can use your MyPustak Wallet to perform the following actions:
            <ul>
              <li>
                Place your Prepaid order of books easily of your choice using{" "}
                <Link
                  href='/'
                  title='MyPustak.com'
                  style={{ textDecoration: "none" }}>
                  MyPustak
                </Link>{" "}
                website or Mobile application
              </li>
              <li>
                Free from making online Transactions again and again for placing
                any order.
              </li>
              <li>Faster and smoother order placing Experience.</li>
            </ul>
          </p>
          <div style={{ textAlign: "center" }}>
            <Button
              variant='contained'
              color='primary'
              style={{
                textTransform: "capitalize",
                background: "#376fc7",
                width: "80%",
              }}
              onClick={() => {
                gotodiv();
              }}>
              Add money Now
            </Button>
          </div>
        </div>
        <div className='col-12 col-sm-4 col-lg-4 col-md-5 mr-auto ml-2 text-center'>
          <Image src={wallet_side} width={300} height={300} alt='wallet' />
        </div>
      </div>
      {/* web View */}
      <MediaQuery minWidth={576}>
        <div className='row mx-lg-auto px-0' style={{ fontSize: "0.8rem" }}>
          <div className='col-12 col-sm-3 col-md-3'>
            <div className='d-sm-flex justify-content-sm-center '>
              <Image src={time_1} alt='time_img' />
              <span className=' d-sm-none'>Easy Payment Process</span>
            </div>
            <p className='d-none d-sm-block text-sm-center'>
              Easy Payment Process
            </p>
          </div>
          <div className='col-12 col-sm-3 col-md-3'>
            <div className='d-sm-flex justify-content-sm-center '>
              <Image src={shield_1} alt='shield_img' />
              <span className=' d-sm-none'>
                Wallet is money is more secured
              </span>
            </div>
            <p className='d-none d-sm-block text-sm-center'>
              Wallet balance is more secured{" "}

            </p>
          </div>
          <div className='col-12 col-sm-3 col-md-3'>
            <div className='d-sm-flex justify-content-sm-center '>
              <Image src={payment_1} alt='payment_img' />
              <span className=' d-sm-none'>No Payment gateway hassle</span>
            </div>
            <p className='d-none d-sm-block text-sm-center'>
              No Payment gateway hassle
            </p>
          </div>
          <div className='col-12 col-sm-3 col-md-3'>
            <div className='d-sm-flex justify-content-sm-center '>
              <Image src={magnet_1} alt='magnet_img' />
              <span className=' d-sm-none'>
                Wallet Payment doesnt incur extra charges
              </span>
            </div>
            <p className='d-none d-sm-block text-sm-center'>
              Wallet Payment doesnt incur extra charges
            </p>
          </div>
        </div>
      </MediaQuery>
      {/* Mobile View */}
      <MediaQuery maxWidth={575}>
        <div className=' mt-5'>
          <div className='row align-items-center'>
            <div className='col-5 text-center'>
              <Image src={time_1} alt='time_img' />
            </div>
            <div className='col-7 text-center'>
              <p
                style={{ marginBottom: "-1rem" }}
                className={styles.bannerBtnPara}>
                {" "}
                Easy Payment Process
              </p>
            </div>
          </div>
          <div className='row align-items-center'>
            <div className='col-5 text-center'>
              <Image src={shield_1} alt='shield_img' />
            </div>
            <div className='col-7 text-center'>
              <p
                style={{ marginBottom: "-1rem" }}
                className={styles.bannerBtnPara}>
                {" "}
                Wallet is money is more secured
              </p>
            </div>
          </div>
          <div className='row align-items-center'>
            <div className='col-5 text-center'>
              <Image src={payment_1} alt='payment_img' />
            </div>
            <div className='col-7 text-center'>
              <p
                style={{ marginBottom: "-1rem" }}
                className={styles.bannerBtnPara}>
                {" "}
                No Payment gateway hassle
              </p>
            </div>
          </div>
          <div className='row align-items-center'>
            <div className='col-5 text-center'>
              <Image src={magnet_1} alt='magnet_img' />
            </div>
            <div className='col-7 text-center'>
              <p
                style={{ marginBottom: "-1rem" }}
                className={styles.bannerBtnPara}>
                {" "}
                Wallet Payment doesnt incur extra charges
              </p>
            </div>
          </div>
        </div>
      </MediaQuery>
    </div>
  );
}

export default MywalletBanner;
