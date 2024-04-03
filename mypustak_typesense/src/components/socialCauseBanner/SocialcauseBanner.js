import { Button, Link } from "@mui/material";
import Image from "next/legacy/image";
import React from "react";
import Social_Cause from "../../assets/Social_Cause.webp";
import styles from "../../styles/SocialCause.module.css";
import MediaQuery from "react-responsive";

function SocialcauseBanner() {
  return (
    <React.Fragment>
      <div
        className={
          styles.main_div +
          " row  bg-white mx-2 mx-sm-3 border p-sm-3 p-0 py-1 py-sm-3 p-lg-5"
        }>
        <div className='col-12 col-sm-4 col-lg-3'>
          <Image alt='' src={Social_Cause} 
          height={250} width={320}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
           />
        </div>
        <div
          className='col-12 col-sm-7 col-lg-8 mt-3 text-sm-left text-center'
          style={{ fontSize: "0.9rem" }}>
          <h6 className={styles.h1}>We are Working For a Social Cause</h6>
          <p className={styles.p + "  "}>
            Mypustak aims to provide free books to people who cannot afford them
            at costly prices to unfold knowledge throughout the country.
            {/* Be a part of the MyPustak movement by donating books and helping the needy */}
          </p>
          <p className={styles.p}>
            Be a part of Mypustak movement by donating books and helping the
            needy{" "}
          </p>
          <MediaQuery minWidth={767}>
            <div className='d-flex justify-content-center flex-wrap py-3'>
              <Link href='/donate-books' prefetch={false}>
                <button
                  style={{ borderRadius: "0" }}
                  className={styles.donateBook}>
                  Donate Books
                </button>
              </Link>
              <Link href='/proud-donors' prefetch={false}>
                <button
                  style={{ borderRadius: "0" }}
                  className={styles.proudDoner}>
                  Our Proud Donors
                </button>
              </Link>
            </div>
          </MediaQuery>

          <MediaQuery maxWidth={767}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
              className='py-3'>
              <Link href='/donate-books' prefetch={false}>
                <Button
                  variant='contained'
                  style={{
                    borderRadius: "0",
                    marginBottom: "0.5rem",
                    textTransform: "capitalize",
                    minWidth: "12rem",
                    background:
                      "linear-gradient(90deg, #2157ad 0%, #6190da 100%)",
                    color: "#fff",
                  }}
                  className={""}>
                  Donate Books
                </Button>
              </Link>
              <Link href='/proud-donors' prefetch={false}>
                <Button
                  variant='outlined'
                  className={""}
                  style={{
                    borderRadius: "0",
                    textTransform: "capitalize",
                    minWidth: "12rem",
                    color: "#2248ae",
                    borderColor: "#2248ae",
                  }}>
                  Our Proud Donors
                </Button>
              </Link>
            </div>
          </MediaQuery>
        </div>
      </div>
      <style jsx>
        {`
          .DonateBookBtn {
            background: linear-gradient(90deg, #2157ad 0%, #6190da 100%);
            border-radius: 5px;
          }
        `}
      </style>
    </React.Fragment>
  );
}

export default SocialcauseBanner;
