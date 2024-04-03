import { Button } from "@mui/material";
import Image from "next/legacy/image";
// import React from "react";
import deliveryontime from "../../assets/deliveryontime.webp";
import deliveryproduct from "../../assets/deliveryproduct.webp";
// import { url } from "../../helper/api_url";
import styles from "../../styles/DeliveryBanner.module.css";

function DeliveryBanner() {
  const OpenUrl = () => {
    window.open("/pages/about-us")
  }
  return (
    <div className={styles.main_div + " row mx-2 justify-content-around bg-white  m-2 m-sm-3 my-sm-3"}>
      {/* <div className={styles.main_div + " row justify-content-around  m-2 m-sm-3 my-sm-5"}> */}
      <div className="col-12 col-sm-6 col-lg-4 pt-4">
        <h5 className={styles.h5} style={{ fontSize: '1.1rem' }}>
          <b >We deliver 100% Pincodes in India</b>
        </h5>
        <p className={styles.first_sub_div_para}>
          We deliver Books from Kashmir to Kanyakumari and every corner of the country.
        </p>
        <Image alt="" src={deliveryontime} height={200} width={350}  />
      </div>
      <div className="col-12 col-sm-6 col-lg-3 pt-4">
        <Image alt="" src={deliveryproduct} height={150}  width={340}/>
        <div className={styles.second_sub_div}>
          <p className={styles.second_sub_div_para}>
            {/* We Dont deliver a product */}
            We  deliver more than a Product
          </p>
          <h5 className={styles.second_sub_div_h5 + " pb-2"}>
            {/* <b>We Deliver an Experience</b> */}
            <b>An Experience and bring a smile to faces</b>
          </h5>

          <Button
            onClick={OpenUrl}
            variant="outlined"

            style={{ textTransform: 'capitalize' }}
            className={
              styles.second_sub_div_button +
              " w-75 p-2 mx-auto d-none d-lg-block mb-3"
            }
          >
            Know more about us
          </Button>
          <Button
            onClick={OpenUrl}
            variant="outlined"
            style={{ textTransform: 'capitalize' }}

            className={
              styles.second_sub_div_button +
              " w-75 mx-auto p-2 d-block d-lg-none mb-3"
            }
          >
            Know more about us
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeliveryBanner;
