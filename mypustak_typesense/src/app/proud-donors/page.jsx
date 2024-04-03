import React from "react";
import dynamic from "next/dynamic";
const ProudDonor = dynamic(() => import("../../components/proud_donor/ProudDonor"));
import Head from "next/head";
const NextBreadcrumbs = dynamic(() => import("../../components/Breadcrumbs/NextBreadcrumbs"), { ssr: false });
function Page() {
  return (
    <div>
      {/* the SEO code has been moved to the layout.jsx file in the same folder */}
      {/* <Head>
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
      </Head> */}
      <NextBreadcrumbs />
      <ProudDonor />
    </div>
  );
}

export default Page;
