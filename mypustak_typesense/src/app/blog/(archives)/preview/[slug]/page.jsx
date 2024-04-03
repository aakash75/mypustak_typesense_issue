"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import SingleHeader from "@/app/blog/(blog)/SingleHeader";
import { userPostBySlug } from "@/redux/actions/blogAction";
const PageSingleTemplate3 = (props) => {
  const dispatch = useDispatch();

  const param = useParams();
  const slug = param.slug;
  const body = {
    slug: slug,
  };
  useEffect(() => {
    props.userPostBySlug(body);
  }, [slug]);

  console.log("Prabhas blog state: ", props?.postBySlug);

  return (
    <header className="relative pt-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black">
      {/* SINGLE HEADER */}
      <div className="dark container relative z-10">
        <div className="max-w-screen-md">
          <SingleHeader
            hiddenDesc
            blogTitle={props?.postBySlug?.data?.article_title}
            categoryData={props?.postBySlug?.data?.category_data}
          />
        </div>
      </div>

      {/* FEATURED IMAGE */}
      <div className="mt-8 md:mt-0 md:absolute md:top-0 md:end-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3">
        <div className="hidden md:block absolute top-0 start-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r rtl:bg-gradient-to-l"></div>
     
        <Image
          className="block w-full h-full object-cover"
             placeholder="blur"
   blurDataURL="https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png"
          src={props?.postBySlug?.data?.article_main_thumb}
          alt="Article Main thumbnail"
          width={1635}
          height={774}
          
          
          sizes="(max-width: 1024px) 100vw, 1240px"
        />
    
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  postBySlug: state.blogState.userPostBySlug,
});
export default connect(mapStateToProps, { userPostBySlug })(
  PageSingleTemplate3
);
