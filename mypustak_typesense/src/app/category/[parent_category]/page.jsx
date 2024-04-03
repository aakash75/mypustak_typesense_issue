import React from "react";
import { redirect, permanentRedirect } from "next/navigation";
import ParentCategory from "../../../components/CardCategory1/parentCategory";
import GetcategoryID from "@/helper/GetCategoryId";
export async function generateMetadata({ params, searchParams }) {
  let category_url = `/category/` + params.parent_category + `/`;

  let CATID = GetcategoryID(category_url);
  let og_url = "https://www.mypustak.com" + category_url;
  console.log(og_url, "og_url");
  const body = {
    url: og_url,
  };
  const seo_res = await fetch(
    `https://api.mypustak.com/api/v1/seo_tags/seo-data`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const seo_data = await seo_res.json();
  let title_tag = "";
  let meta_description = "";

  // 301 redirect to the new location
  if (seo_data.redirect_url) {
    console.log(seo_data.redirect_url, "seo_data.redirect_url");
    res.setHeader("Location", seo_data.redirect_url);
    res.statusCode = 301;
    res.end();
  }
  if (seo_data.title_tag) {
    title_tag = seo_data.title_tag;
    meta_description = seo_data.meta_desc;
  } else {
    title_tag = "Best " + params.parent_category + "|used books online India !";
    meta_description =
      "Best " +
      params.parent_category +
      "Only online free books used bookstore";
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
      image:
        "https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png",
    },
  };
}

export async function ServerSideData({ params, searchParams }) {
  console.log(
    "-================================= server side====================================="
  );
  let category_url = `/category/` + params.parent_category + `/`;

  let CATID = GetcategoryID(category_url).id;
  console.log(CATID, "4454554754");
  return {
    CATID,
  };
}
const page = async ({ params, searchParams }, props) => {
  const bookData = await ServerSideData({ params, searchParams });

  return (
    <div>
      {console.log(bookData, "4454554754111")}
      {/* <div>page</div> */}
      <ParentCategory CATID={bookData.CATID} />
    </div>
  );
};

export default page;
