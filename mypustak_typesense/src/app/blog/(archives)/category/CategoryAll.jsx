"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/NavItem/NavItem";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
// import {
//   getActiveCategory,
//   activeCategory,
// } from "@/Redux/Features/Blog/ActiveCategorySlice";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import Card11 from "@/components/Card11/Card11";
import CardCategory2 from "@/components/CardCategory2/CardCategory2";
import Tag from "@/components/Tag/Tag";
import CardAuthorBox2 from "@/components/CardAuthorBox2/CardAuthorBox2";
// import { useDispatch, useSelector } from "react-redux";
import PaginationNew from "@/components/Pagination/PaginationNew";
// import { tags as allTags, getTags } from "@/Redux/Features/Tags/TagSlice";
// import { getBlog, getBlogs } from "@/Redux/Features/Blog/GetBlogsSlice";

import {
  getActiveBlogData,
  getActiveCategoryData,
  getActiveTagsData,
} from "../../../../redux/actions/blogAction";
import { connect, useDispatch, useSelector } from "react-redux";
// const authors = DEMO_AUTHORS.filter((_, i) => i < 12);

const TABS = ["Blogs", "Categories", "Tags"];

const CategoryAll = (props) => {
  const dispatch = useDispatch();
  // const categoryData = useSelector(activeCategory);
  // const tagsState = useSelector(allTags);
  // const blogState = useSelector(getBlog);

  const [page, setPage] = useState(1);
  const [tabActive, setTabActive] = useState(props.activeTag);

  const handleClickTab = (item) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
    setPage(1);
  };

  const pageChange = (pageNo) => {
    setPage(pageNo);
  };

  const handlePagination = () => {
    if (tabActive === "Categories") {
      dispatch(getActiveCategoryData({ pageNo: page, NoOfRecords: 10 }));
    } else if (tabActive === "Tags") {
      dispatch(getActiveTagsData({ pageNo: page, NoOfRecords: 20 }));
    } else if (tabActive === "Blogs") {
      dispatch(getActiveBlogData({ pageNo: page, NoOfRecords: 10 }));
    } else {
      dispatch(getActiveBlogData({ pageNo: page, NoOfRecords: 10 }));
    }
  };

  useEffect(() => {
    dispatch(getActiveBlogData({ pageNo: 1, NoOfRecords: 10 }));
    dispatch(getActiveCategoryData({ pageNo: 1, NoOfRecords: 10 }));
    dispatch(getActiveTagsData({ pageNo: 1, NoOfRecords: 20 }));
  }, []);

  useEffect(() => {
    handlePagination();
  }, [page, tabActive]);

  return (
    <div className={`nc-PageSearch`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          <div className="flex flex-col sm:flex-row  sm:wrap-wrap  sm:items-center sm:justify-between sm:flex-wrap">
            <Nav
              containerClassName="w-full overflow-x-auto"
              className="sm:space-x-1 rtl:space-x-reverse flex  sm:flex-row flex-col"
            >
              {TABS.map((item, index) => (
                <NavItem
                  isActive={item === tabActive}
                  key={index}
                  onClick={() => handleClickTab(item)}
                >
                  {item}
                </NavItem>
              ))}
            </Nav>
            <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
            <div className="flex justify-end"></div>
          </div>

          {/* LOOP ITEMS */}
          {props?.blogState && tabActive === "Blogs" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10">
              {props?.blogState?.map((post, index) => (
                <Card11 key={index} post={post} />
              ))}
            </div>
          )}

          {/* LOOP ITEMS CATEGORIES */}
          {props?.categoryData?.data && tabActive === "Categories" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mt-8 lg:mt-10">
              {props?.categoryData?.data?.map((cat) => (
                <CardCategory2 key={cat.id} categoriesData={cat} />
              ))}
            </div>
          )}

          {/* LOOP ITEMS TAGS */}
          {tabActive === "Tags" && (
            <div className="flex flex-wrap mt-12 ">
              {props?.tagsData && (
                <div>
                  {props?.tagsData?.map((tag, index) => (
                    <Tag className="mb-3 mr-3" key={index} tag={tag} />
                  ))}
                </div>
              )}
            </div>
          )}
          {/* LOOP ITEMS AUTHORS */}
          {/* {tabActive === "Authors" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-8 mt-8 lg:mt-10">
              {authors.map((author) => (
                <CardAuthorBox2 key={author.id} author={author} />
              ))}
            </div>
          )} */}

          {/* Pagination  */}
          <div className="flex flex-col mt-6 lg:mt-6 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-center sm:items-center">
            {tabActive === "Tags" && (
              <center>
                <div>
                  {props?.tagsCount > 20 && (
                    <PaginationNew
                      totalItems={props?.tagsCount}
                      itemsPerPage={20}
                      onclick={pageChange}
                    />
                  )}
                </div>
              </center>
            )}
            {tabActive === "Categories" && (
              <center>
                <div>
                  {props?.categoryCount > 10 && (
                    <PaginationNew
                      totalItems={props?.categoryCount}
                      itemsPerPage={10}
                      onclick={pageChange}
                    />
                  )}
                </div>
              </center>
            )}
            {tabActive === "Blogs" && (
              <center>
                <div>
                  {props?.blogCount > 10 && (
                    <PaginationNew
                      totalItems={props?.blogCount}
                      itemsPerPage={10}
                      onclick={pageChange}
                    />
                  )}
                </div>
              </center>
            )}
          </div>
        </main>

        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridCategoryBox
            headingCenter={false}
            categoryCardType="card2"
            className="pb-16 lg:pb-28"
            categories={props?.categoryData}
          />
        </div>
        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  blogState: state.blogState.getActiveBlogs,
  blogCount: state.blogState.activeBlogCount,
  categoryData: state.blogState.getActiveCategorys,
  categoryCount: state.blogState.activeCategoryCount,
  tagsData: state.blogState.getActiveTags,
  tagsCount: state.blogState.activeTagCount,
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getActiveBlogData: () =>
//       dispatch(getActiveBlogData({ pageNo: 1, NoOfRecords: 10 })),
//     getActiveCategoryData: () =>
//       dispatch(getActiveCategoryData({ pageNo: 1, NoOfRecords: 10 })),
//     getActiveTagsData: () =>
//       dispatch(getActiveTagsData({ pageNo: 1, NoOfRecords: 10 })),
//   };
// };
export default connect(mapStateToProps, {
  getActiveBlogData,
  getActiveCategoryData,
  getActiveTagsData,
})(CategoryAll);
