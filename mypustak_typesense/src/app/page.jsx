import WLoginNavbar from "@/components/navbar/WLoginNavbar";
import HeroBanner from "@/components/homepage/HeroBanner";
import Banners from "@/components/banners/Banners";
import { NextRequest, NextResponse, userAgent } from "next/server";

import { GetServerSidePropsContext } from "next";
import CustomCarousel from "@/components/Slider/CustomCarousel";
import CustomCarouselNew from "@/components/Slider/CustomCarouselNew";
import HomeBannerList from "@/components/Slider/HomeBannerList";
import HomeBannerListNew from "@/components/Slider/HomeBannerListNew";
import HomePage from "@/components/homepage/HomePage";

import Image from "next/legacy/image";
// import InfiniteScroll from "react-infinite-scroll-component";
// import AddToCartSnack from "@/components/bookcard/AddToCartSnack";
// import BookCardSkeleton from "../components/bookcard/BookCardSkeleton";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({ params, searchParams }) {
  // read route params
  // const id = params.id

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json())

  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  let url = "https://api.mypustak.com";
  // let url = "http://127.0.0.1:8000";

  const body = {
    url: "https://www.mypustak.com/",
  };
  const seo_res = await fetch(`${url}/api/v1/seo_tags/seo-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    next: { revalidate: 3600 },
  });

  const seo_data = await seo_res.json();
  // const books = await data.json();
  let title_tag = "";
  let meta_description = "";
  console.log(seo_data, "seo_data");
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
  // twitter: {
  //   card: 'app',
  //     title: 'Next.js',
  //       description: 'The React Framework for the Web',
  //         siteId: '1467726470533754880',
  //           creator: '@nextjs',
  //             creatorId: '1467726470533754880',
  //               images: {
  //     url: 'https://nextjs.org/og.png',
  //       alt: 'Next.js Logo',
  //   },
  return {
    title: title_tag,
    description: meta_description,
    openGraph: {
      title: title_tag,
      description: meta_description,
      url: "https://www.mypustak.com/",
      images: [
        "https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png",
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export async function ServerSideData(context) {
  let url = "https://api.mypustak.com";
  // let url = "http://127.0.0.1:8000";
  // console.log(NextRequest, "NextRequest===============================");
  const data = await fetch(`${url}/api/v1/get/category/competitive-exams/1/`);
  let bannersdata = [];
  console.log(GetServerSidePropsContext, "GetServerSidePropsContext");
  // if (context.query.m == "preview") {
  if (false) {
    bannersdata = await fetch(
      `${url}/api/v2/banners/get_home_banner_admin/HOME`
    );
  } else {
    console.log(
      `${url}/api/v2/banners/get_home_banner/HOME`,
      "GetHomeBannerAdmin"
    );
    bannersdata = await fetch(`${url}/api/v2/banners/get_home_banner/HOME`, {
      cache: "no-store",
      next: { revalidate: 5 },
    });
    console.log(bannersdata, "444645644646");
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
  // console.log(banners, "banners55555555555555");
  let title_tag = "";
  let meta_description = "";

  console.log(seo_data, "seo_data");
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
    books,
    banners,
    suggestionlength,
    title_tag,
    meta_description,
    schema_markup,
  };
}
export default async function Home(props) {
  const server_call = await ServerSideData();
  const slides = [
    { image: "slide1.jpg", caption: "Slide 1" },
    { image: "slide2.jpg", caption: "Slide 2" },
    { image: "slide3.jpg", caption: "Slide 3" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MyPustak",
    description: server_call.meta_description,
    url: "https://www.mypustak.com/",
    logo: "https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png",
    image:
      "https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png",
    email: "support@mypustak.com",
    telephone: "033-41804333",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "EDUCATEXLABS PRIVATE LIMITED , 3908/3980, EAST BERABERI , SIKHER BAGAN",
      addressLocality: "GOPALPUR RAJARHAT KOLKATA ,",
      addressCountry: "India",
      postalCode: "700136",
    },
    sameAs: [
      "https://www.facebook.com/mypustak",
      "https://twitter.com/mypustak",
      "https://www.instagram.com/mypustakofficial/",
      "https://www.mypustak.com/",
    ],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.mypustak.com/search?value={search_term_string}&sortBy=books_collection%2Fsort%2Fnum_is_out_of_stack%3Aasc%2CiDate%3Adesc",
      },
      "query-input": "required name=search_term_string",
    },
    website: {
      "@type": "WebSite",
      url: "https://www.mypustak.com/",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://www.mypustak.com/search?value={search_term_string}&sortBy=books_collection%2Fsort%2Fnum_is_out_of_stack%3Aasc%2CiDate%3Adesc",
        },
        "query-input": "required name=search_term_string",
      },
    },
  };

  const { banners, suggestionlength } = server_call;
  // console.log(server_call, "================================================")
  // console.log(banners , "banners")

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero banner*/}

      <div className="md-rounded">
        {/* <CustomCarousel  banners={banners} display_item = {1} height ="246px"/> 
      <CustomCarousel  banners={banners} display_item = {1} height ="246px"/> 
       */}
        {/* <NewCustomCarousel banners={banners}/> */}

        {/* <CustomCarousel banners={banners} display_item={1} height="246px" /> */}
        <div className="overflow-x-hidden">
          <CustomCarouselNew
            banners={banners}
            display_item={1}
            height="246px"
          />
        </div>
      </div>

      {/*  banner list */}
      <div className="overflow-x-hidden">
        <HomeBannerListNew
          banners={banners?.data.filter((ban) => {
            return ban.banner_position == 2;
          })}
          display_item={3}
          mob_display_item={1}
          height="100%"
        />
      </div>

      {/* Home Pge Data */}
      <HomePage bannerData={server_call} />
    </div>
  );
}
