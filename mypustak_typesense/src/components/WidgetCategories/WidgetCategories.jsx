import React, { useEffect } from "react";
import CardCategory1 from "@/components/CardCategory1/CardCategory1";
import WidgetHeading1 from "@/components/WidgetHeading1/WidgetHeading1";
import { connect } from "react-redux";
import { getActiveCategoryData } from "../../redux/actions/blogAction";

const WidgetCategories = (props) => {
  let className = "bg-neutral-100 dark:bg-neutral-800";

  useEffect(() => {
    props.getActiveCategoryData({ pageNo: 1, NoOfRecords: 10 });
  }, []);
  console.log(props.categoryData, "category2255555");

  const limitedCategories = props.categoryData?.data?.filter((_, i) => i < 5);

  return (
    <div
      className={`nc-WidgetCategories rounded-3xl overflow-hidden ${className}`}
    >
      <WidgetHeading1
        title="✨ Latest topic"
        viewAll={{ label: "View all", href: "/blog/category" }}
      />
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
          {limitedCategories?.map((category) => (
            <CardCategory1
              className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              key={category.id}
              categoriesData={category}
              size="normal"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categoryData: state.blogState.getActiveCategorys,
});

export default connect(mapStateToProps, {
  getActiveCategoryData,
})(WidgetCategories);
