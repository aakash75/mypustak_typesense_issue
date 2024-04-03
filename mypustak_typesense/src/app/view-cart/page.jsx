import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
const NoSSRComponentViewCart = dynamic(() => import("../../components/cart/CartPage"), {
  ssr: false,
});
function Page() {
  return (
    <React.Fragment>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <title>
          {" "}
          Books Online India, Buy Online Book In India –mypustak.com
        </title>
        <meta
          name='og:title'
          property='og:title'
          content='Books Online India, Buy Online Book In India –mypustak.com'
        />
        <meta
          name='og:description'
          property='og:description'
          content='  Books are the hub of knowledge. Get the books online in India with us. We aimed to aid (help) the needy one with education and knowledge.'
        />
        <meta
          name='og:image'
          property='og:image'
          content='https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png'
        />
        <script
          type='text/javascript'
          src='https://checkout.razorpay.com/v1/checkout.js'
          async
        />

        <script
          src='https://www.cashfree.com/assets/cashfree.sdk.v1.2.js'
          type='text/javascript'
          async
        />
      </Head>
      <NoSSRComponentViewCart />
    </React.Fragment>
  );
}
export default Page;



