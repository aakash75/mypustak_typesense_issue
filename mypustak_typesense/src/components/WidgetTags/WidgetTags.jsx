import React, { useEffect, useState } from "react";
import Tag from "@/components/Tag/Tag";
import WidgetHeading1 from "@/components/WidgetHeading1/WidgetHeading1";
import { TagType, TaxonomyType } from "@/data/types";
import { connect } from "react-redux";
import { getActiveTagsData } from "../../redux/actions/blogAction";
// const tagsDemo = DEMO_TAGS.filter((_, i) => i < 9);

const WidgetTags = (props) => {
  let className = "bg-neutral-100 dark:bg-neutral-800";

  useEffect(() => {
    props.getActiveTagsData({ pageNo: 1, NoOfRecords: 10 });
    console.log(props.tagsData, "111411");
  }, []);
  return (
    <div className={`nc-WidgetTags rounded-3xl overflow-hidden ${className}`}>
      <WidgetHeading1
        title="💡 More tags"
        viewAll={{ label: "View all", href: "/blog/tag" }}
      />
      <div className="flex flex-wrap p-4 xl:p-5">
        {props.tagsData?.slice(0, 10).map((tag) => (
          <Tag className="mr-2 mb-2" key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tagsData: state.blogState.getActiveTags,
});

export default connect(mapStateToProps, {
  getActiveTagsData,
})(WidgetTags);
