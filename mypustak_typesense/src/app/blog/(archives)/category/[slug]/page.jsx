'use client'
import React, { useEffect, useState } from "react";
import ModalCategories from "../../ModalCategories";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import Card11 from "@/components/Card11/Card11";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import Image from "next/image";
import { useParams } from "next/navigation";

// import { categoryDetails, fetchCategoryDetails } from "@/Redux/Features/Category/CategoryDetailsSlice";
import { connect, useDispatch, useSelector } from "react-redux";
// import { getCategories, getCategory } from "@/Redux/Features/Blog/GetCategorySlice";
import { getActiveBlogData, getActiveCategoryData, getActiveTagsData, getCategoryData } from "../../../../../redux/actions/blogAction"
const PageTag = (props) => {
  const catState = props?.categoryDetails
  const categoryState = props?.categoryData
  const [noOfArticles, setNoOfArticles] = useState(12);

  useEffect(() => {
    props.getActiveCategoryData({ pageNo: 1, NoOfRecords: 10 })
  }, []);

  const params = useParams();
  const url = params?.slug
  const catName = decodeURI(url);

  console.log("catState", catName, params, props.categoryDetails, props.categoryData);
  console.log("catState2", catState, categoryState);

  useEffect(() => {
    props.getCategoryData({ pageNo: 1, NoOfRecords: noOfArticles, category_slug: catName.toLowerCase() })
  }, [catName, noOfArticles])

  const handleShowMore = () => {
    setNoOfArticles((prev) => prev + 12)
  }

  return (
    <div className={`nc-PageArchive`}>
      <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
        <div className="relative aspect-w-16 aspect-h-13 sm:aspect-h-9 max-h-[400px] lg:aspect-h-8 xl:aspect-h-5 rounded-3xl md:rounded-[40px] overflow-hidden z-0">
          <Image
            alt="archive"
            // fill
            height={60}
            width={100}
            //    placeholder="blur"
            // blurDataURL={props.categoryDetails?.category_data?.category_thumb}
            src={props.categoryDetails?.category_data?.category_thumb}
            className="object-cover w-full max-h-[700px] rounded-3xl md:rounded-[40px]"
            sizes="(max-width: 1280px) 100vw, 1536px"
          />
          <div className="absolute inset-0 text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
              {props?.categoryDetails?.category_data?.category_title}
            </h2>
            <span className="block mt-4 text-neutral-300">{props?.categoryDetails?.total_data_count} Articles</span>
          </div>
        </div>
      </div>

      <div className="container pt-10 pb-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <div>
          <div className="flex flex-col sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5 rtl:space-x-reverse">
              <ModalCategories categories={categoryState?.data} />
            </div>
            <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
         
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {catState?.data?.map((post) => (
              <Card11 key={post.id} post={post} />
            ))}
          </div>

          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-end sm:items-center">
            {!(noOfArticles >= catState?.total_data_count) &&
              <ButtonPrimary handleSubmit={handleShowMore}>  Show me more</ButtonPrimary>
            }
          </div>
        </div>

        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridCategoryBox
            categories={categoryState}
          />
        </div>

        <SectionSubscribe2 />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  blogState: state.blogState.getActiveBlogs,
  blogCount: state.blogState.activeBlogCount,
  categoryData: state.blogState.getActiveCategorys,
  categoryCount: state.blogState.activeCategoryCount,
  tagsData: state.blogState.getActiveTags,
  tagsCount: state.blogState.activeTagCount,
  categoryDetails: state.blogState.categoryData
});


export default connect(mapStateToProps,
  {
    getCategoryData, getActiveCategoryData
  }
)(PageTag);


