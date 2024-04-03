import React, { useEffect } from "react";
import Card3Small from "@/components/Card3Small/Card3Small";
import WidgetHeading1 from "@/components/WidgetHeading1/WidgetHeading1";
import { connect, useDispatch } from "react-redux";
import { getActiveBlogData } from "../../redux/actions/blogAction";
const WidgetPosts = (props) => {
  let className = "bg-neutral-100 dark:bg-neutral-800";

  useEffect(() => {
    // Your useEffect logic here
    props.getActiveBlogData({ pageNo: 1, NoOfRecords: 10 });
  }, []);

  const blogPosts = props.blogState?.filter((_, i) => i < 5);

  return (
    <div className={`nc-WidgetPosts rounded-3xl overflow-hidden ${className}`}>
      <WidgetHeading1
        title="🎯 Latest Posts"
        viewAll={{ label: "View all", href: "/blog/post" }}
      />
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
        {blogPosts?.map((post) => (
          <Card3Small
            className="p-4 xl:px-5 xl:py-6 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  blogState: state.blogState.getActiveBlogs,
});

export default connect(mapStateToProps, {
  getActiveBlogData,
})(WidgetPosts);
