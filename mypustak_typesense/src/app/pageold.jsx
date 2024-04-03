import dynamic from "next/dynamic";
import "../styles/globals.css";
const HeroBanner = dynamic(() => import("../components/homepage/HeroBanner"));
const Banners = dynamic(() => import("../components/banners/Banners"));

const HomePage = dynamic(() => import("../components/homepage/HomePage"));
export async function ServerSideData(context) {
  let url = "https://api.mypustak.com";
  // console.log(context.query.m, "context.params.id");
  const data = await fetch(`${url}/api/v1/get/category/competitive-exams/1/`);
  let bannersdata = [];
  // if (context.query.m == "preview") {
  if (false) {
    bannersdata = await fetch(
      `${url}/api/v2/banners/get_home_banner_admin/HOME`
    );
  } else {
    bannersdata = await fetch(`${url}/api/v2/banners/get_home_banner/HOME`);
  }
  const suggestiondata = await fetch(
    `${url}/api/v2/book_suggestions/getsuggestionlength/HOME`
  );
  const body = {
    url: "https://www.mypustak.com/",
  };
  const seo_res = await fetch(`${url}/api/v1/seo_tags/seo-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const seo_data = await seo_res.json();
  // const books = await data.json();
  const books = {};
  const banners = await bannersdata.json();
  let title_tag = "";
  let meta_description = "";

  // console.log(seo_data, "seo_data");
  if (seo_data.title_tag) {
    title_tag = seo_data.title_tag;
    meta_description = seo_data.meta_desc;
  } else {
    title_tag = "Books Online India, Buy Online Book In India –mypustak.com";
    meta_description =
      "The socially responsible online books store providing Quality assured used and new books for Free.You can also donate books and help readers | MyPustak- Best books online at your doorstep";
  }

  let schema_markup = null;
  if (seo_data.schema_markup) {
    schema_markup = seo_data.schema_markup;
  }
  console.log(title_tag, "||", meta_description);

  const suggestionlength = await suggestiondata.json();

  return {
    props: {
      books,
      banners,
      suggestionlength,
      title_tag,
      meta_description,
      schema_markup,
    },
  };
}

export default async function Page(props) {
  const bannerData = await ServerSideData();

  console.log(bannerData, "2552411bannerData");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {bannerData && <HomePage bannerData={bannerData} />}
    </main>
  );
}
