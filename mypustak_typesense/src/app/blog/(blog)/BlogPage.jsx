"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { connect, useDispatch, useSelector } from "react-redux";
import SingleHeader from "./SingleHeader";
import { getBlogDetails } from "../../../redux/actions/blogAction";


const BlogPage = (props) => {
    const param = useParams();

    const slug = param.slug;

    useEffect(() => {
        props.getBlogDetails(slug);
    }, [slug]);

    console.log("state:", props?.blogState?.data?.article_title);

    return (
        <header className="relative   pt-16 z-10 md:py-20 lg:py-28 bg-neutral-900 dark:bg-black">
            {/* SINGLE HEADER */}
            <div className="dark container relative z-10   ">
                <div className="max-w-screen-md  ">
                    <SingleHeader
                        hiddenDesc
                        blogTitle={props?.blogState?.data?.article_title}
                        categoryData={props?.blogState?.data?.category_data}
                    />
                </div>
            </div>

            {/* FEATURED IMAGE */}
            <div className="mt-8 md:mt-0 md:absolute md:top-0 md:end-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3">
                <div className="hidden md:block absolute top-0  start-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r rtl:bg-gradient-to-l"></div>
                {/* <div className="hidden  absolute top-0 min-h-[600px] start-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r rtl:bg-gradient-to-l"></div> */}

                <Image
                    className=" w-full h-full  object-cover"
                    //            placeholder="blur"
                    //  blurDataURL={home1}
                    src={props.blogState?.data.article_main_thumb}
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
    blogState: state.blogState.blogDetalis,
});

export default connect(mapStateToProps, {
    getBlogDetails,
})(BlogPage);

