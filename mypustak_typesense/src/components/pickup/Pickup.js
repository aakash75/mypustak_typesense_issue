"use client"
import React, { useState } from "react";
import styles from "../../styles/PickUp.module.css"
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from '@mui/lab/TabContext';
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import Image from "next/legacy/image";
import MediaQuery from "react-responsive";
import free_pickup_img1 from "../../assets/free_pickup_img1.png";
import free_pickup_img2 from "../../assets/free_pickup_img2.png";
import free_pickup_img3 from "../../assets/free_pickup_img3.png";
import free_pickup_img4 from "../../assets/free_pickup_img4.png";
import self_ship_img1 from "../../assets/self_ship_img1.png";
import self_ship_img2 from "../../assets/self_ship_img2.png";
import self_ship_img3 from "../../assets/self_ship_img3.png";
import self_ship_img4 from "../../assets/self_ship_img4.png";
import paid_pickup_img1 from "../../assets/paid_pickup_img1.svg";
import paid_pickup_img2 from "../../assets/paid_pickup_img2.svg";
import paid_pickup_img3 from "../../assets/paid_pickup_img3.svg";
import paid_pickup_img4 from "../../assets/paid_pickup_img4.svg";
import HelpIcon from "@mui/icons-material/Help";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import  { useRouter } from "next/navigation";
import { Avatar, Button } from "@mui/material";
// import { minHeight } from "@mui/system";
import Link from "next/link";

import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { LinkOff } from "@mui/icons-material";

function Pickup(props) {
  const [value, setValue] = useState("1");
  const [selectedCity, setSelectedCity] = useState("");
  const router =  useRouter()

  // React.useEffect(() => {
  //   let city = Router.asPath.split("?");
  //   console.log(city[1], "city-");
  //   setSelectedCity(city[1]);
  // }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='mx-lg-5 mx-md-3 mx-sm-2 mt-1 mx-1'>
      <h5 className={`text-center text-color mb-1 ${styles.pickupTitle}`}>
        Available Pickup Methods
      </h5>
      <Box>
        <TabContext value={value}>
          <Box>
            <TabList
              variant='fullWidth'
              indicatorColor='primary'
              className=' bg-white'
              onChange={handleChange}
              aria-label='lab API tabs example'>
              <Tab
                style={
                  value == 1
                    ? {
                      backgroundColor: "#2255ae",
                      color: "white",
                      fontSize: "0.8rem",
                      textTransform: "capitalize",
                      padding: "0px",
                      outline: "none",
                    }
                    : {
                      fontSize: "0.8rem",
                      textTransform: "capitalize",
                      padding: "0px",
                      outline: "none",
                    }
                }
                className='tabTitle'
                label={
                  <>
                    <b>Free Pickup</b>
                  </>
                }
                value='1'
              />
              <Tab
                className='tabTitle'
                style={
                  value == 2
                    ? {
                      backgroundColor: "#2255ae",
                      color: "white",
                      fontSize: "0.8rem",
                      textTransform: "capitalize",
                      padding: "0px",
                      outline: "none",
                    }
                    : {
                      fontSize: "0.8rem",
                      textTransform: "capitalize",
                      padding: "0px",
                      outline: "none",
                    }
                }
                label={
                  <>
                    <b>Self Ship</b>
                  </>
                }
                value='2'
              />
              <Tab
                className='tabTitle'
                style={
                  value == 3
                    ? {
                      backgroundColor: "#2255ae",
                      color: "white",
                      textTransform: "capitalize",
                      fontSize: "0.8rem",
                      padding: "0px",
                      outline: "none",
                    }
                    : {
                      fontSize: "0.8rem",
                      textTransform: "capitalize",
                      padding: "0px",
                      outline: "none",
                    }
                }
                label={
                  <>
                    <b>Pay For Pickup</b>
                  </>
                }
                value='3'
              />
            </TabList>
          </Box>
          <TabPanel
            value='1'
            className=' bg-white  p-0 bg-white '
            style={{ fontSize: "0.9rem", border: "1px solid lightgray" }}>
            <center className={`${styles.topTitle}`}>
              {" "}
              <span className=''>
                All the logistics charges for book collection will be taken care
                of by MyPustak.
              </span>
            </center>
            <div className=' row g-0  no-gutters p-0 m-0'>
              <div className={`${styles.borderStep1} col-lg-6 col-md-6 col-sm-6  col-12 g-1`}>
                <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
                  <b>STEP : 1</b>
                </div>
                <div className='row g-0  '>
                  <div className='col-3 col-sm-4   d-flex  align-items-center'>
                    <div className={`${styles.imgMainDiv}`}>
                      <Image
                        alt='pick up img1'
                        height={70}
                        width={150}
                        className=''
                        src={free_pickup_img1}
                      />
                    </div>
                  </div>
                  <div className='col-9 col-sm-8 pl-2 pl-md-0  '>
                    <ul className='details-color mt-1'>
                      <li>
                        Fill out the Book{" "}
                        <Link
                          style={{ textDecoration: "none" }}
                          href={props.userComponentStatus == 1 ? '/account/Loginpage?ret=/donate-books/DonationForm' :
                            `/donate-books/DonationForm?${selectedCity}`}
                          legacyBehavior>
                          Donation Form
                          {/* <Link  href="" legacyBehavior>
                           
                          </Link> */}
                        </Link>{" "}
                      </li>
                      <li>
                        Share a few images of books @(03341804333-WhatsApp)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={`${styles.borderStep2}   col-lg-6 col-md-6 col-sm-6  col-12 g-1`}>
                <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
                  <b>STEP : 2</b>
                </div>
                <div className='row g-0 no-gutters  '>
                  <div className='col-3 col-sm-4  d-flex  align-items-center '>
                    <div className={`${styles.imgMainDiv}`}>
                      <Image
                        alt='pick up img2'
                        height={70}
                        width={150}
                        src={free_pickup_img2}
                      />
                    </div>
                  </div>
                  <div className='col-9 col-sm-8   pl-2 pl-md-0  '>
                    {selectedCity == "kol" ? (
                      <ul className='details-color mt-1'>
                        <li>
                          We will contact you one day before the pickup date
                        </li>
                      </ul>
                    ) : (
                      <ul className='details-color mt-1'>
                        <li>Pack books in cartons ,Share packed box images</li>
                        <li>
                          We will arrange Logistics pickup and send tracking
                          slips
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='row g-0 no-gutters p-0 m-0'>
              <div className={`${styles.borderStep3}     col-lg-6 col-md-6 col-sm-6  col-12`}>
                <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
                  <b>STEP : 3</b>
                </div>
                <div className='row g-0 no-gutters  '>
                  <div className='col-3 col-sm-4 d-flex  align-items-center  '>
                    <div className={`${styles.imgMainDiv}`}>
                      <Image
                        alt='pick up img3   '
                        className=''
                        height={70}
                        width={150}
                        src={free_pickup_img3}
                      />
                    </div>
                  </div>
                  <div className='col-9 col-sm-8 pl-2 pl-md-0 '>
                    <ul
                      className='details-color mt-1'
                    >
                      {selectedCity == "kol" ? (
                        <li>we arrange doorstep pickpup every week twice</li>
                      ) : (
                        <li>
                          Download tracking slip , Print and paste on box{" "}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className={`${styles.borderStep4} col-lg-6 col-md-6 col-sm-6  col-12`}>
                <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
                  <b>STEP : 4</b>
                </div>
                <div className='row g-0 no-gutters  '>
                  <div className='col-3 col-sm-4  d-flex  align-items-center '>
                    <div
                      className={`${styles.imgMainDiv}`}
                      style={{ marginLeft: "-1.2rem" }}>
                      <Image
                        alt='pick up img4'
                        className=' '
                        height={70}
                        width={150}
                        src={free_pickup_img4}
                      />
                    </div>
                  </div>
                  <div className='col-9 col-sm-8  pl-2 pl-md-0'>
                    <ul
                      className='details-color mt-1'
                    >
                      <li>Handover boxes at your doorstep.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className={`row g-0 mt-1 text-center px-2 ${styles.marginBottomM} `}>
              <div className='col-12 px-3 p-2' style={{ fontSize: "0.8rem" }}>
                <span className='text-color'>
                  &emsp;We arrange Free pickups on a First come, First serve
                  basis.
                </span>
                <br />
              </div>
            </div>
            <div
              className={` col-12 bg-white text-center border border-gary p-3 ${styles.button_div}`}
            >
              <MediaQuery minWidth={992}>
                <Button
                  // fullWidth
                  style={{
                    background: "#2255ae",
                    height: "4rem",
                    width: "20rem",
                    outline: "none",
                  }}
                  className='bg-color text-white py-2'
                  onClick={e => {
                    e.preventDefault();
                    if (props.userComponentStatus == 1) {
                      let BackUrl = "donate-books/DonationForm";
                      // localStorage.setItem("BackUrl", BackUrl)
                      window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
                    }
                    else {
                      router.push(`/donate-books/DonationForm?${selectedCity}`);
                    }
                  }}>
                  Next
                </Button>
              </MediaQuery>
              <MediaQuery maxWidth={991} minWidth={577}>
                <Button
                  // fullWidth
                  style={{
                    background: "#2255ae",
                    height: "4rem",
                    width: "20rem",
                    outline: "none",
                  }}
                  className='bg-color text-white py-2'
                  onClick={e => {
                    e.preventDefault();
                    if (props.userComponentStatus == 1) {
                      let BackUrl = "donate-books/DonationForm";
                      // localStorage.setItem("BackUrl", BackUrl)
                      window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
                    }
                    else {
                      router.push(`/donate-books/DonationForm?${selectedCity}`);
                    }
                  }}>
                  Next
                </Button>
              </MediaQuery>
              <MediaQuery maxWidth={576}>
                <div
                  className='border shadow bg-white pt-2'
                  style={{
                    position: "fixed",
                    bottom: "0rem",
                    left: "0px",
                    zIndex: "1045",
                    width: "100vw",
                    padding: "1.5rem",
                  }}>
                  <Button
                    // fullWidth
                    style={{
                      background: "#2255ae",
                      height: "4rem",
                      outline: "none",
                    }}
                    fullWidth
                    className='bg-color text-white py-2'
                    onClick={e => {
                      e.preventDefault();
                      if (props.userComponentStatus == 1) {
                        let BackUrl = "donate-books/DonationForm";
                        // localStorage.setItem("BackUrl", BackUrl)
                        window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
                      } else {
                        router.push(`/donate-books/DonationForm?${selectedCity}`);
                      }
                    }}>
                    Next
                  </Button>
                </div>
              </MediaQuery>
            </div>
          </TabPanel>

          <TabPanel
            value='2'
            className=' bg-white p-0 '
            style={{ fontSize: "0.9rem", border: "1px solid lightgray" }}>
            <div className=' row g-0 no-gutters p-0 m-0'>
              <center
                className={`${styles.topTitle}`} >
                {" "}
                <span>
                  All logistics-related expenses are to be taken care of by Book
                  Donors only.
                </span>
              </center>
              <div className={`${styles.borderStep1} p-1 col-lg-6 col-md-6 col-sm-6  col-12`}>
                <div style={{ textAlign: "center", marginTop: "0.3rem" }}>
                  <b>STEP : 1</b>
                </div>
                <div className='row g-0 no-gutters '>
                  <div className='col-3 col-sm-4  d-flex  align-items-center '>
                    <div className={`${styles.imgMainDiv}`}>
                      <Image
                        alt='self shif img1'
                        width={140}
                        height={80}
                        src={self_ship_img1}
                      />
                    </div>
                  </div>
                  <div className='col-9 col-sm-8  pl-2 pl-md-0'>
                    <ul className='details-color mt-1'>
                      <li>
                        Fill out the book{" "}
                        <Link
                          style={{ textDecoration: "none" }}
                          href={props.userComponentStatus == 1 ? '/account/Loginpage?ret=/donate-books/DonationForm' :
                            `/donate-books/DonationForm?${selectedCity}`}
                          legacyBehavior>
                          donation form
                          {/* <Link  legacyBehavior>
                           
                          </Link> */}
                        </Link>{" "}
                      </li>
                      <li>
                        Note the donation form number for future reference
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={`${styles.borderStep2}  p-1 col-lg-6 col-md-6 col-sm-6  col-12`}>
                <div style={{ textAlign: "center", marginTop: "0.3rem" }}>
                  <b>STEP : 2</b>
                </div>
                <div className='row g-0 no-gutters '>
                  <div className='col-3 col-sm-4  d-flex  align-items-center '>
                    <div className={`${styles.imgMainDiv}`}>
                      <Image
                        alt='self shif img2'
                        width={90}
                        height={80}
                        src={self_ship_img2}
                      />
                    </div>
                  </div>
                  <div className='col-9 col-sm-8  pl-2 pl-md-0 '>
                    <ul className='details-color mt-1'>
                      <li>Pack your books </li>
                      <li>Write the donation form id on each packet</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='row g-0 no-gutters p-0 m-0'>
              <div className={`${styles.borderStep3} p-1 col-lg-6 col-md-6 col-sm-6  col-12`}>
                <div style={{ textAlign: "center", marginTop: "0.3rem" }}>
                  <b>STEP : 3</b>
                </div>
                <div className='row g-0 no-gutters '>
                  <div className='col-3 col-sm-4  d-flex  align-items-center  '>
                    <div className={`${styles.imgMainDiv}`}>
                      <Image
                        alt='self shif img3'
                        width={160}
                        height={100}
                        src={self_ship_img3}
                      />
                    </div>
                  </div>
                  <div className='col-9 col-sm-8  pl-2 pl-md-0'>
                    <ul className='details-color mt-1'>
                      <li>Share shipment details after dispatch</li>
                      <li>
                        Like The number of boxes/tracking number /courier
                        company name.
                      </li>
                      <li>It helps to track your package during transit. </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={`${styles.borderStep4} p-1 col-lg-6 col-md-6 col-sm-6  col-12`}>
                <div style={{ textAlign: "center", marginTop: "0.3rem" }}>
                  <b>STEP : 4</b>
                </div>
                <div className='row g-0 no-gutters '>
                  <div className='col-3 col-sm-4  d-flex  align-items-center '>
                    <div
                      className={`${styles.imgMainDiv}`}
                      style={{ marginTop: "-1rem", marginLeft: "2rem" }}>
                      <Image
                        alt='self shif img4'
                        width={60}
                        height={90}
                        src={self_ship_img4}
                      />
                    </div>
                  </div>
                  <div className='col-9 col-sm-8  pl-2 pl-md-0'>
                    <ul className='details-color mt-1'>
                      <li>
                        We will notify you once we receive the package at our
                        office address.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='row g-0 my-1 px-2 text-center  '>
              <div
                className={`col-12 px-3 ${styles.marginBottomM} `}
                style={{ fontSize: "0.7rem", padding: "0rem " }}>
                <span className='text-color '>
                  You can ship the books with availble facility in your area .
                  You can use Indiapost , delhivery ,DTDC tci express for heavy
                  shipment or any faclity as per your suitablilty
                </span>
                <br />
              </div>
            </div>
            <div className={` col-12 bg-white text-center border border-gary p-3 ${styles.button_div}`}>
              <MediaQuery minWidth={992}>
                <Button
                  // fullWidth
                  style={{
                    background: "#2255ae",
                    height: "4rem",
                    width: "20rem",
                    outline: "none",
                  }}
                  className='bg-color text-white py-2'
                  onClick={e => {
                    e.preventDefault();
                    if (props.userComponentStatus == 1) {
                      let BackUrl = "donate-books/DonationForm";
                      // localStorage.setItem("BackUrl", BackUrl)
                      window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
                    }
                    else {
                      router.push(`/donate-books/DonationForm?${selectedCity}`);
                    }
                  }}>
                  Next
                </Button>
              </MediaQuery>
              <MediaQuery maxWidth={991} minWidth={577}>
                <Button
                  // fullWidth
                  style={{
                    background: "#2255ae",
                    height: "4rem",
                    width: "20rem",
                    outline: "none",
                  }}
                  className='bg-color text-white py-2'
                  onClick={e => {
                    e.preventDefault();
                    if (props.userComponentStatus == 1) {
                      let BackUrl = "donate-books/DonationForm";
                      // localStorage.setItem("BackUrl", BackUrl)
                      window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
                    }
                    else {
                      router.push(`/donate-books/DonationForm?${selectedCity}`);
                    }
                  }}>
                  Next
                </Button>
              </MediaQuery>
              <MediaQuery maxWidth={576}>
                <div
                  className='border shadow bg-white pt-2 '
                  style={{
                    position: "fixed",
                    bottom: "0rem",
                    left: "0px",
                    zIndex: "1045",
                    width: "100vw",
                    padding: "1.5rem",
                    outline: "none",
                  }}>
                  <Button
                    fullWidth
                    style={{ background: "#2255ae", height: "4rem" }}
                    className='bg-color text-white py-2'
                    onClick={e => {
                      e.preventDefault();
                      if (props.userComponentStatus == 1) {
                        let BackUrl = "donate-books/DonationForm";
                        // localStorage.setItem("BackUrl", BackUrl)
                        window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
                      }
                      else {
                        router.push(`/donate-books/DonationForm?${selectedCity}`);
                      }
                    }}>
                    Next
                  </Button>
                </div>
              </MediaQuery>
            </div>
          </TabPanel>

          <TabPanel
            value='3'
            className=' bg-white p-0 '
            style={{ fontSize: "0.9rem", border: "1px solid lightgray" }}>
            <div className=' row g-0 no-gutters p-0 m-0'>
              <center className={`${styles.topTitle}`}>
                {" "}
                <span>
                  Pay subsidised standard pickup charges for books pickup
                  &nbsp;&nbsp;
                  <OverlayTrigger
                    overlay={
                      <Tooltip id='tooltip-disabled'>
                        <span style={{ fontSize: "0.8rem" }}>
                          Our Pickup Changes For Doorstep Subsidies For&nbsp;{" "}
                          <b> ₹ 20/kg </b> With Min. Of &#8377;300/Pickup
                        </span>
                      </Tooltip>
                    }>
                    <span className='d-inline-block'>
                      <span id='QuestionMark'>
                        <HelpIcon
                          style={{
                            height: "26px",
                            fontSize: "1rem",
                            cursor: "pointer",
                            color: "gray",
                          }}
                        />
                      </span>
                    </span>
                  </OverlayTrigger>
                </span>
              </center>
              <div className={`${styles.borderStep1} p-1 col-lg-6 col-md-6 col-sm-6  col-12`}>
                <div style={{ textAlign: "center", marginTop: "0.2rem" }}>
                  {/* <Avatar sx={{ bgcolor: "#2255ae" }}>1</Avatar> */}
                  <b>STEP : 1</b>
                </div>
                <div className='row g-0 no-gutters '>
                  <div className='col-3 col-sm-4  d-flex  align-items-center'>
                    <div className={`${styles.imgMainDiv}`}>
                      <Image
                        alt='paid pick img 1'
                        width={160}
                        height={100}
                        src={paid_pickup_img1}
                      />
                    </div>
                  </div>
                  <div className='col-9 col-sm-8  pl-2 pl-md-0'>
                    <ul className='details-color mt-1'>
                      <li>
                        Pay subsidised standard pickup charges at the time of
                        filling the{" "}
                        <Link
                          style={{ textDecoration: "none" }}
                          href={props.userComponentStatus == 1 ? '/account/Loginpage?ret=/donate-books/DonationForm' :
                            `/donate-books/DonationForm?${selectedCity}`}
                          legacyBehavior>
                          donation form
                          {/* <Link  href="" legacyBehavior>
                            
                          </Link> */}
                        </Link>{" "}
                      </li>
                      <li>
                        Share fee images of books at our helpine 0334180433
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={`${styles.borderStep2}  p-1 col-lg-6 col-md-6 col-sm-6  col-12`}>
                <div style={{ textAlign: "center", marginTop: "0.2rem" }}>
                  {/* <Avatar sx={{ bgcolor: "#2255ae" }}>1</Avatar> */}
                  <b>STEP : 2</b>
                </div>
                <div className='row g-0 no-gutters'>
                  <div className='col-3 col-sm-4  d-flex  align-items-center '>
                    <div className={`${styles.imgMainDiv}`}>
                      <Image
                        alt='paid pick img 2'
                        width={160}
                        height={100}
                        src={paid_pickup_img2}
                      />
                    </div>
                  </div>
                  <div className='col-9 col-sm-8  pl-2 pl-md-0'>
                    <ul className='details-color mt-1'>
                      <li>Pack your books and share packed box images</li>
                      <li>
                        So that we can arrange courier booking and send tracking
                        slips
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className=' row g-0 no-gutters p-0 m-0'>
              <div className={`${styles.borderStep3} p-1 col-lg-6 col-md-6 col-sm-6  col-12`}>
                <div style={{ textAlign: "center", marginTop: "0.2rem" }}>
                  {/* <Avatar sx={{ bgcolor: "#2255ae" }}>1</Avatar> */}
                  <b>STEP : 3</b>
                </div>
                <div className='row g-0 no-gutters'>
                  <div className='col-3 col-sm-4  d-flex  align-items-center '>
                    <div className={`${styles.imgMainDiv}`}>
                      <Image
                        alt='paid pick img 3'
                        width={160}
                        height={100}
                        src={paid_pickup_img3}
                      />
                    </div>
                  </div>
                  <div className='col-9 col-sm-8  pl-2 pl-md-0'>
                    <ul className='details-color mt-1'>
                      <li>Take print out</li>
                      <li>Paste tracking slip on your box</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={`${styles.borderStep4} p-1 col-lg-6 col-md-6 col-sm-6  col-12`}>
                <div style={{ textAlign: "center", marginTop: "0.2rem" }}>
                  {/* <Avatar sx={{ bgcolor: "#2255ae" }}>1</Avatar> */}
                  <b>STEP : 4</b>
                </div>
                <div className='row g-0 no-gutters'>
                  <div className='col-3 col-sm-4  d-flex  align-items-center '>
                    <div className={`${styles.imgMainDiv}`}>
                      <Image
                        alt='paid pick img 4'
                        width={160}
                        height={100}
                        src={paid_pickup_img4}
                      />
                    </div>
                  </div>
                  <div className='col-9 col-sm-8  pl-2 pl-md-0'>
                    <ul className='details-color mt-1'>
                      <li>Handover boxes to pickup person</li>
                      <li>Who arrives at your doorstep.</li>
                    </ul>
                  </div>
                </div>
                <p> </p>
              </div>
            </div>

            <div className={`row g-0 px-5 ${styles.marginBottomM}  `}>
              <div
                className='col-12 text-center  px-4'
                style={{ fontSize: "0.7rem", padding: "0.3rem 1rem" }}>
                <span className='text-color'>
                  Paid pickups are arranged on priority basis keeping book donor
                  urgency in mind via our logistics partner only .
                </span>
                <br />
              </div>
            </div>
            <div className={` col-12 bg-white text-center border border-gary p-3 ${styles.button_div}`}>
              <MediaQuery minWidth={992}>
                <Button
                  // fullWidth
                  style={{
                    background: "#2255ae",
                    height: "4rem",
                    width: "20rem",
                    outline: "none",
                  }}
                  className='bg-color text-white py-2'
                  onClick={e => {
                    e.preventDefault();
                    if (props.userComponentStatus == 1) {
                      let BackUrl = "donate-books/DonationForm";
                      // localStorage.setItem("BackUrl", BackUrl)
                      window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
                    }
                    else {
                      router.push(`/donate-books/DonationForm?${selectedCity}`);
                    }
                  }}>
                  Next
                </Button>
              </MediaQuery>
              <MediaQuery maxWidth={991} minWidth={577}>
                <Button
                  // fullWidth
                  style={{
                    background: "#2255ae",
                    height: "4rem",
                    width: "20rem",
                    outline: "none",
                  }}
                  className='bg-color text-white py-2'
                  onClick={e => {
                    e.preventDefault();
                    if (props.userComponentStatus == 1) {
                      let BackUrl = "donate-books/DonationForm";
                      // localStorage.setItem("BackUrl", BackUrl)
                      window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
                    }
                    else {
                      router.push(`/donate-books/DonationForm?${selectedCity}`);
                    }
                  }}>
                  Next
                </Button>
              </MediaQuery>
              <MediaQuery maxWidth={576}>
                <div
                  className='border shadow pt-2 bg-white'
                  style={{
                    position: "fixed",
                    bottom: "0rem",
                    left: "0px",
                    zIndex: "1045",
                    width: "100vw",
                    padding: "1.5rem",
                    outline: "none",
                  }}>
                  <Button
                    fullWidth
                    style={{ background: "#2255ae", height: "4rem" }}
                    className='bg-color text-white py-2'
                    onClick={e => {
                      e.preventDefault();
                      if (props.userComponentStatus == 1) {
                        let BackUrl = "donate-books/DonationForm";
                        // localStorage.setItem("BackUrl", BackUrl)
                        window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
                      }
                      else {
                        router.push(`/donate-books/DonationForm?${selectedCity}`);
                      }
                    }}>
                    Next
                  </Button>
                </div>
              </MediaQuery>
            </div>
          </TabPanel>
        </TabContext>
      </Box>
      {/* <div style={{ margin: "2rem" }}></div> */}
      <style jsx>
        {`
        `}
      </style>
    </div>
  );
}

const mapStateToProps = state => ({
  userComponentStatus: state.accountR.userComponentStatus,
});

export default connect(mapStateToProps, {
})(withSnackbar(Pickup));
