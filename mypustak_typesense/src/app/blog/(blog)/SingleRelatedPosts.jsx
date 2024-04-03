'use client'
import React, { useEffect } from "react";
import Heading from "@/components/Heading/Heading";
import Card11 from "@/components/Card11/Card11";
import { DEMO_POSTS } from "@/data/posts";
import { getActiveBlogData } from "../../../redux/actions/blogAction"
import { connect } from "react-redux";
const SingleRelatedPosts = (props) => {
  
  useEffect(() => {
    props.getActiveBlogData({ pageNo: 1, NoOfRecords: 4 })
  }, []);
  return (
    <div className="relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-28 mt-16 lg:mt-28">
      <div className="container">
        <div>
          <Heading className="mb-10 text-neutral-900 dark:text-neutral-50" desc="">
            Latest posts
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {props.blogState?.map((post) => (
              <Card11 key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  blogState: state.blogState.getActiveBlogs,
});

export default connect(mapStateToProps,
  {
    getActiveBlogData
  }
)(SingleRelatedPosts);

