import Image from "next/legacy/image";
import React from "react";
import downloadimage from "../../assets/downloadimage.webp";

// import loudspeaker from "../../assets/loudspeaker.webp";
import DownLoadMypustakBanner from "../../assets/DownLoadMypustakBanner.svg";
import styles from "../../styles/DownloadBanner.module.css";
import playstore from "../../assets/google-play-badge.png";

function DownloadBanner() {
  const openUrl = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.mypustak&pli=1"
    );
  };
  return (
    <div
      className={
        styles.main_div + " mx-sm-3 mx-2 bg-white row p-0 py-1 py-sm-3 p-lg-5  "
      }
      // className={styles.main_div + " m-2 m-sm-3 my-sm-5 row p-0 py-1 py-sm-3 p-lg-5  "}
      style={{ marginTop: "1rem" }}>
      <div className='col-12 col-sm-4 col-lg-4 d-flex justify-content-center'>
        <Image alt='' src={downloadimage} width={250} height={250} />
      </div>
      <div className='col-12 col-sm-6  col-lg-5 mt-2 mt-sm-0'>
        <h5 className={styles.download_h3}>Download the MyPustak app Now!</h5>
        <div
          className={styles.download_paras + " d-flex justify-content-between"}>
          <div>
            <p>Get access to the latest offers</p>
            <p>MyPustak features on your fingertip</p>
            <p>Enjoy a seamless shopping experience</p>
          </div>
          {/* *********THIS DIV IMAGE IS D_NONE IN BIGGER SCREEN ONLY FOR MOBILE ***** */}
          <div>
            <Image
              alt=''
              src={DownLoadMypustakBanner}
              width={88}
              height={69}
              className='d-sm-none'
            />
            {/* <img src={DownLoadMypustakBanner} /> */}
          </div>
        </div>
        {/* ************* Two types of buttons for diff display ************8  */}
        {/* <button onClick={openUrl} className={styles.download_button + " d-none w-75"}>
          <IoLogoGooglePlaystore /> Download the App Now
        </button> */}
        {/* <div style={{ display:'flex',justifyContent:"center",alignItems:'center',width: '9.5rem',height:'2.5rem' }}>
                <Image  alt="whatsapp_icon" src={playstore} style={{margin:'0.5rem'}} />
          </div> */}
        <a
          style={{
            display: "flex",
            marginTop: "2rem",
            justifyContent: "center",
          }}
          href='https://play.google.com/store/apps/details?id=com.mypustak&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
          {/* <img
            style={{ width: "11.5rem", height: "100%" }}
            alt='Get it on Google Play'
            src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'
          /> */}

          <Image
            className='fiction_img'
            alt='Get it on Google Play'
            src={playstore}
            priority
            height={70}
            width={200}
          />
        </a>
        {/* <button onClick={openUrl} style={{display:'flex',borderRadius:'0',alignItems:'center',justifyContent:'center'}} className={styles.download_button + " d-sm-none w-100"}>
        </button> */}
      </div>

      <div className='d-none d-sm-inline col-12 col-sm-2 col-lg-2 '>
        <Image alt='' src={DownLoadMypustakBanner} height={300} width={200}  className='' />
        {/* <img className="border border-success" src={DownLoadMypustakBanner} /> */}
      </div>
    </div>
  );
}

export default DownloadBanner;
