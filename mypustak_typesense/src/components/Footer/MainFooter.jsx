/* eslint-disable */
"use client";
import React, { Component } from "react";
import handleViewport from "react-in-viewport";
import Head from "next/head";
import Link from "next/link";
import faceb from "../../assets/faceb.svg";
import Igram from "../../assets/Igram.svg";
import Quora from "../../assets/quora.svg";
import tweet from "../../assets/tweet.svg";
import payop from "../../assets/payoptions.svg";
import smlogo from "../../assets/mypustak_100_px.svg";
import Divider from "@mui/material/Divider";
import Image from "next/legacy/image";

class MainFooterBlock extends Component {
  onClick = (page) => {
    window.open(page);
  };
  render() {
    return (
      <footer className="mainfooter d-none d-md-block d-sm-block d-lg-block">
        {/* <Head> */}
        {/* <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossOrigin="anonymous"
          /> */}
        {/* </Head> */}

        <div className="footermain_div">
          <div className="row">
            <div className="columns col-lg-3 col-md-6  col-12">
              <div className="heading_div">
                {" "}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div
                    style={{
                      cursor: "pointer",
                      border: "1px solid white",
                      padding: "1px 4px",
                      background: "white",
                      borderRadius: "30px",
                    }}
                  >
                    <Link
                      aria-label="logo"
                      href="/"
                      prefetch={false}
                      legacyBehavior
                    >
                      {/* <Link aria-label='logo' href='/' legacyBehavior> */}
                      <Image
                        alt="MyPustak.com"
                        src={smlogo}
                        onClick={() => {
                          Router.push("/");
                        }}
                      />
                      {/* </Link> */}
                    </Link>
                  </div>
                </div>
                <div
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: "0.3rem",
                  }}
                >
                  India's Online Free Books Store
                </div>
                <div className="social_icon_div">
                  <div
                    className="each_social_icon"
                    onClick={() =>
                      this.onClick("https://www.facebook.com/mypustak")
                    }
                  >
                    <Image
                      alt="MyPustak Facebook"
                      title="MyPustak Facebook"
                      style={{ cursor: "pointer" }}
                      src={faceb}
                    />
                  </div>

                  <div
                    className="each_social_icon"
                    onClick={() => this.onClick("https://twitter.com/mypustak")}
                  >
                    <Image
                      alt="MyPustak Twitter"
                      title="MyPustak Twitter"
                      style={{ cursor: "pointer" }}
                      src={tweet}
                      // src="https://d239pyg5al708u.cloudfront.net/uploads/banner/twitter.png"
                    />
                  </div>
                  <div
                    className="each_social_icon"
                    onClick={() =>
                      this.onClick("https://www.quora.com/topic/MyPustak")
                    }
                  >
                    <Image
                      alt="MyPustak Quora"
                      style={{ cursor: "pointer" }}
                      // src="https://d239pyg5al708u.cloudfront.net/uploads/banner/insta.png"
                      src={Quora}
                      title="MyPustak Quora"
                    />
                  </div>
                  <div
                    className="each_social_icon"
                    onClick={() =>
                      this.onClick(
                        "https://www.instagram.com/mypustakofficial/"
                      )
                    }
                  >
                    <Image
                      alt="MyPustak Instagram"
                      style={{ cursor: "pointer" }}
                      // src="https://d239pyg5al708u.cloudfront.net/uploads/banner/quora.png"
                      src={Igram}
                      title="MyPustak Instagram"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="columns col-lg-2 col-md-6 p-sm-3 p-lg-0 p-md-0 col-12">
              <div
                className="list_style"
                style={{ padding: "0rem 0rem", textAlign: "center" }}
              >
                MyPustak is committed to providing free books to everyone across
                every possible part of India. We want to be the cause of
                literacy. To guide donors' books to the reader's destiny is our
                business. We want to assure you. You are just one click away
                from your books!
              </div>
            </div>

            <div className="columns col-lg-2 col-md-4 col-sm-4 col-12">
              <div className="heading_div">About</div>
              <div className="list_style">
                <ul>
                  <li onClick={() => this.onClick("/pages/about-us")}>
                    About Us
                  </li>

                  <li onClick={() => this.onClick("/pages/about-us/history")}>
                    Our Story
                  </li>

                  <li onClick={() => this.onClick("/pages/about-us/Impact")}>
                    Our Impact
                  </li>

                  <li
                    onClick={() =>
                      this.onClick("/pages/about-us/OurCommitment")
                    }
                  >
                    Our Commitment
                  </li>

                  <li
                    onClick={() =>
                      this.onClick("/pages/about-us/free-book-theory")
                    }
                  >
                    Free Book Theory
                  </li>
                </ul>
              </div>
            </div>

            {/* ========== */}
            <div className="columns col-lg-2 col-md-4 col-sm-4 col-12">
              <div className="heading_div">Help</div>
              <div className="list_style">
                <ul>
                  <li onClick={() => this.onClick("/contact-us")}>
                    Contact Us
                  </li>

                  <li onClick={() => this.onClick("/pages/privacy-policy")}>
                    Privacy Policy
                  </li>

                  <li onClick={() => this.onClick("/pages/terms-conditions")}>
                    Terms & Conditions
                  </li>
                  <li
                    onClick={() =>
                      this.onClick("/pages/book-condition-guidelines")
                    }
                  >
                    Book Conditions Guidlines
                  </li>
                  <li onClick={() => this.onClick("/pages/return-policy")}>
                    Return Policy
                  </li>
                </ul>
              </div>
            </div>

            {/* ========== */}
            <div className="columns col-lg-2 col-md-4 col-sm-4 col-12">
              <div className="heading_div">Our Links</div>
              <div className="list_style">
                <ul>
                  {/* <li onClick={() => this.onClick("/Onlinecourse")}>IIT-JEE</li> */}
                  <li onClick={() => this.onClick("/offerpage")}>Offers</li>

                  <li onClick={() => this.onClick("/proud-donors")}>
                    Proud Donors
                  </li>

                  <li onClick={() => this.onClick("/donate-books")}>
                    Donate Books
                  </li>
                  <li onClick={() => this.onClick("/faq")}>
                    Frequently Asked Questions
                  </li>
                </ul>
              </div>
            </div>

            {/* ========== */}
          </div>

          <div className="pay_method">
            {/* <img alt="" src="https://d239pyg5al708u.cloudfront.net/uploads/banner/payoptions.png" /> */}
            <div
              style={{
                backgroundColor: "#ddd",
                padding: "0.2rem 0rem",
                height: "2.5rem",
                borderTopLeftRadius: "25px",
                borderBottomLeftRadius: "25px",
                display: "flex",
              }}
            >
              <Image alt="paymentoptions" src={payop} />
            </div>
          </div>

          <Divider style={{ background: "#878787", margin: "1rem 0rem" }} />
          <div className="copywrite">
            Copyright &copy; 2019-2023 MyPustak.com
          </div>
        </div>

        <style jsx>
          {`
            .row {
              margin: 0px;
            }
            .mainfooter {
              background: #172337;
              // margin-top: 2rem;
              color: white;
            }
            .footermain_div {
              margin-top:2rem;
              padding: 2rem 1rem;
              font-size: 0.77rem;
              text-align: center;
            }
            .columns {
              // text-align: left;
              // border: 1px solid white;
            }
            .list_style ul {
              padding: 0rem 2rem;
              list-style: none;
              text-align: initial;
            }
            .list_style ul li {
              padding-top: 3px;
              cursor: pointer;
            }
            .list_style ul li:hover {
              color: #007bff;
            }
            .footer_logo {
              display: flex;
              justify-content: center;
              width: 12vw;
            }
            .heading_div {
              // text-transform: uppercase;
              padding-bottom: 5px;
              color: #878787;
              text-align: initial;
              padding: 0rem 2rem;
            }
            .list_style ul {
              color: white;
            }
            .social_icon_div {
              // border: 1px solid red;
              display: flex;
              justify-content: space-evenly;
              flex-wrap: wrap;
              margin-top: 1rem;
            }
            .each_social_icon img {
              width: 2rem;
              cursor: pointer;
            }
            .pay_method {
              margin-top: 1rem;
              margin-right: 5rem;
              display: flex;
              justify-content: flex-end;
            }
            .pay_method div {
              width:20rem
              height:10rem
              // padding-left: 1rem;
            }
            .copywrite {
              text-align: center;
            }
            @media screen and (max-width: 991px) {
              .pay_method {
                margin-right: 0rem;
              }
            }
            @media screen and (max-width: 538px) {
              .footer_logo {
                width: 40vw;
              }
              .columns {
                padding: 0.5rem 0rem;
                text-align: center;
              }
              .list_style ul {
                text-align: center;
              }
              .heading_div {
                text-align: center;
              }
              .pay_method img {
                width: 20rem;
              }
            }
          `}
        </style>
      </footer>
    );
  }
}
const MainFooter = handleViewport(MainFooterBlock);

export default MainFooter;
