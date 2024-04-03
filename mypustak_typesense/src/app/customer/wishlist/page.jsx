import React, { } from "react";
import dynamic from "next/dynamic";
const Myprofile = dynamic(() => import("../../../components/profile/Myprofile"));
import Wishlist from "../../../components/wishlist/Wishlist";
import Head from "next/head";
import NextBreadcrumbs from "../../../components/Breadcrumbs/NextBreadcrumbs";
import { NoSsr } from "@mui/material"
function Page() {
  return (
    <React.Fragment>
      {/* <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title> Books Online India, Buy Online Book In India –mypustak.com</title>
        <meta
          name="og:title"
          property="og:title"
          content="Books Online India, Buy Online Book In India –mypustak.com"
        />
        <meta
          name="og:description"
          property="og:description"
          content="  Books are the hub of knowledge. Get the books online in India with us. We aimed to aid (help) the needy one with education and knowledge."
        />
        <meta
          name="og:image"
          property="og:image"
          content="https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png"
        />
      </Head> */}
      <NoSsr>
        <NextBreadcrumbs />
      </NoSsr>
      <div>
        <div className='mx-2 row mt-3'>
          <div className='d-none d-sm-block col-sm-4 col-lg-3 '>
            <Myprofile />
          </div>
          <div className='col-12 col-sm-8 col-lg-9'>
            <Wishlist />
          </div>
        </div>
      </div>
    </React.Fragment>

  );
}

export default Page;
