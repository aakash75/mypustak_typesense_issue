import Image from "next/legacy/image";
import React from "react";
import icon1 from "../../assets/icon1.webp";
import icon2 from "../../assets/icon2.webp";
import icon3 from "../../assets/icon3.webp";
import icon4 from "../../assets/icon4.webp";
import MediaQuery from "react-responsive";
// import styles from '../../styles/SocialCause.module.css'
import styles from "../../styles/SatisfactionBanner.module.css";

function SatisfactionBanner() {
  return (
    <div className={styles.main_div + " row   bg-white m-0 border p-sm-3 p-0 py-1 py-sm-3 p-lg-5"}>
      {/* <div className={styles.main_div + "border m-2 my-sm-5 mx-sm-3 bg-white row p-0 py-1 py-sm-3 p-lg-5"}> */}
      <div className="col-12  ">
        <h5 className={styles.sub_div1 + " px-5 pt-2 text-center"}>
          <strong>
            Your Satisfaction Is Our Priority So Every Book Goes Through
          </strong>
        </h5>
      </div>
      <hr className="w-75 mx-auto" />
      <MediaQuery minWidth={577}>
        <div className="row col-12 col-lg-9 mx-auto text-center lh-1 lh-s-sm align-items-center">
          <div className="col-6 col-sm-3 p-1 p-sm-2">
            <Image
              alt=""
              src={icon1}
              className="px-3 px-sm-2
              pb-3 pb-sm-2"
              width={180}
              height={139}
            />
            <h6 style={{ color: "#2258AE" }} className="pt-4 pt-sm-0">
              <b>Donors Commitment</b>
            </h6>
            <p style={{ color: "#484848CC" }}>
              Donor ensures the quality of books as per Book Condition Guidelines.
            </p>
          </div>
          <div className="col-6 col-sm-3 p-1 p-sm-2">
            <Image
              alt=""
              src={icon2}
              className="px-3 px-sm-2
              pb-3 pb-sm-2 mb-xs-3"
              width={180}
              height={139}
            />
            <h6 style={{ color: "#2258AE" }}>
              <b>Our Team</b>
            </h6>
            <p style={{ color: "#484848CC" }}>
              Our Quality Control Team checks the quality of every single book thrice.
            </p>
          </div>
          <div className="col-6 col-sm-3 p-1 p-sm-2">
            <Image
              alt=""
              src={icon3}
              width={180}
              height={139}
              className="px-3 px-sm-2
              pb-3 pb-sm-2"
            />
            <h6 style={{ color: "#2258AE" }} className="pt-1">
              <b>Before Shipping</b>
            </h6>
            <p style={{ color: "#484848CC" }}>
              We re-verify the books & quality before packing every shipment.
            </p>
          </div>
          <div className="col-6 col-sm-3 p-1 p-sm-2">
            <Image
              alt=""
              src={icon4}
              width={180}
              height={139}
              className="px-3 px-sm-2
              pb-3 pb-sm-2"
            />
            <h6 style={{ color: "#2258AE" }}>
              <b>Perfect Packing</b>
            </h6>
            <p style={{ color: "#484848CC" }}>

              Best packing methods used to ensure that no books should damage during transit.
            </p>
          </div>
        </div>
      </MediaQuery>

      <MediaQuery maxWidth={576}>
        <div className="row col-12 col-lg-9 mx-auto text-center align-items-start lh-1 lh-s-sm">
          <div className="col-6 col-sm-3 p-1 p-sm-2 ">

            <Image
              alt=""
              src={icon1}
              // className="px-3 px-sm-2
              // pb-3 pb-sm-2"
              className=""
              width={185}
              height={145}
            />
            <h6 style={{ color: "#2258AE" }} className="headtext pt-sm-0">
              <b>Donors Commitment</b>
            </h6>
            <p className="subtext" style={{ color: "#484848CC" }}>
              Donor ensures quality of books as per Book Condition Guidelines.
            </p>
          </div>
          <div className="col-6 col-sm-3 p-1 p-sm-2 ">
            <Image
              alt=""
              src={icon2}
              // className="px-3 px-sm-2
              // pb-3 pb-sm-2 mb-xs-3"
              className=" "
              width={185}
              height={145}
            />
            <h6 className="headtext" style={{ color: "#2258AE" }}>
              <b>Our Team</b>
            </h6>
            <p className="subtext" style={{ color: "#484848CC" }}>
              Our Quality Control Team checks the quality of every single book
              thrice.
            </p>
          </div>
          <div className="col-6 col-sm-3 p-1 p-sm-2">
            <Image
              alt=""
              src={icon3}
              width={185}
              height={145}
              className="px-sm-2
              pb-sm-2"
            />
            <h6 className="headtext" style={{ color: "#2258AE" }} >
              <b>Before Shipping</b>
            </h6>
            <p className="subtext" style={{ color: "#484848CC" }}>
              We re-verify the books & quality before packing every shipment.
            </p>
          </div>
          <div className="col-6 col-sm-3 p-1 p-sm-2">
            <Image
              alt=""
              src={icon4}
              width={185}
              height={145}
            // className="px-3 px-sm-2
            // pb-3 pb-sm-2"
            />
            <h6 className="headtext" style={{ color: "#2258AE" }}>
              <b>Perfect Packing</b>
            </h6>
            <p className="subtext" style={{ color: "#484848CC" }}>
              Best packing method is used to ensure that no books should damage
              during transit.
            </p>
          </div>
        </div>
      </MediaQuery>

      <style jsx>
        {`
        .headtext{
          font-size:0.92rem;
        }
        .subtext{
          font-size:0.8rem;
        }
        `}
      </style>
    </div>
  );
}

export default SatisfactionBanner;
