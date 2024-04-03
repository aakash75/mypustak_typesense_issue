import React from "react";
// import  Sidebar from "../Sidebar"
// import SingleContent from "../Sidebar";
// import { Sidebar } from "../../../Sidebar";
// import SingleContent from "../../../SingleContent";
import SingleRelatedPosts from "../SingleRelatedPosts";
import Head from "next/head";
import SingleContentDemo from "../SingleContentDemo";
import SingleContent from "../SingleContent";
import { Sidebar } from "../Sidebar";

export async function generateMetadata({ params }) {
  let og_url = "https://www.mypustak.com/blog/" + params.slug[0];

  const body = {
    url: og_url,
  };
  const seo_res = await fetch(
    `https://api.mypustak.com/api/v1/seo_tags/seo-data`,
    {
      // const seo_res = await fetch(`http://43.204.148.175/api/v1/seo_tags/seo-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const seo_data = await seo_res.json();
  console.log(seo_data, "seo_data");
  if (seo_data.redirect_url) {
    console.log(seo_data.redirect_url, "seo_data.redirect_url");
    res.setHeader("Location", seo_data.redirect_url);
    res.statusCode = 301;
    res.end();
  }
  let title_tag = "";
  let meta_description = "";
  if (seo_data.title_tag) {
    title_tag = seo_data.title_tag;
    meta_description = seo_data.meta_desc;
    // console.log(seo_data,"seo_data");
  } else {
    // console.log(params.slug[0], "params2122");

    title_tag = "Blog ! " + params.slug[0] + " |used books online India !";
    meta_description =
      "Blog ! " + params.slug[0] + " | Only online free books used bookstore";
  }
  console.log(title_tag, "||", meta_description);

  return {
    title: title_tag,
    description: meta_description,
    openGraph: {
      description: meta_description,
      type: "website",
      url: og_url,
      title: title_tag,
      images: [
        "https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png",
      ],
    },
  };
}

const Layout = ({ children }) => {
  console.log("sdcsz");
  return (
    <div className="relative">
      {/* Add JSON-LD to your page */}
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}
      <div className="relative" >
  {children}
      </div>
    

      <div className="container flex flex-col my-10 lg:flex-row ">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
          {/* sklmn */}
          <SingleContent />
          {/* <SingleContentDemo /> */}
        </div>
        <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3">
          <Sidebar />
        </div>
      </div>

      <SingleRelatedPosts />
    </div>
  );
};

export default Layout;
