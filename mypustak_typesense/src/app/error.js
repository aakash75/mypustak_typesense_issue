"use client";
import React from "react";
import Error from "next/error";
import Button from "@mui/material/Button";
import Link from "next/link";

const Page = ({ errorCode, stars }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <div style={{ zIndex: "3" }}>
      <div className="error_maindiv">
        <div className="title-error">404 Error !</div>
        <div className="subtext_error">
          Unfortunately the page you are looking for has been moved or deleted
        </div>
        <div className="error_btn">
          <Link href="/" legacyBehavior>
            <a style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  width: "10rem",
                  margin: "1rem 0rem",
                  background: "#265cb3",
                }}
              >
                Go To Home
              </Button>
            </a>
          </Link>
        </div>
      </div>
      <style jsx>
        {`
          .error_maindiv{
                    text-align:center;
                    padding:4rem 0;

          }
                .title-error{
                    font-size:5rem;
                    text-align:center;
                    color:#007bff;
                    font-weight:bold;
                     font-stretch: expanded;
                `}
      </style>
    </div>
  );
};

export default Page;
