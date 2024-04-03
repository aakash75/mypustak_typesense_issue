"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector, useDispatch, connect } from "react-redux";

// import {
//   getBlogSlug,
//   getBlogBySlug,
// } from "@/Redux/Features/Blog/GetBlogBySlugSlice";
import { getBlogDetails } from "../../../redux/actions/blogAction";

const SingleContentDemo = (props) => {
  // const blogState = useSelector(getBlogSlug);
  const dispatch = useDispatch();

  const param = useParams();

  const slug = param.slug[0];

  const htmlContent = props.blogState?.data?.article_content;

  console.log(props.blogState, "props.blogState");
  useEffect(() => {
    dispatch(getBlogDetails(slug));
  }, [slug]);

  return (
    <>
      {/* THIS IS THE DEMP CONTENT - YOU CAN USE MARKDOWN, JSON ...*/}
      {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}

      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  );
};
const mapStateToProps = (state) => ({
  blogState: state.blogState.blogDetalis,
});
export default connect(mapStateToProps, {
  getBlogDetails,
})(SingleContentDemo);
// export default SingleContentDemo;
