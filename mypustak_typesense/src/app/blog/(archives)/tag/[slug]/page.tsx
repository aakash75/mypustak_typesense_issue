"use client"
import React, { FC, useEffect, useState } from "react";
import ModalCategories from "../../ModalCategories";
import ModalTags from "../../ModalTags";
import { DEMO_POSTS } from "@/data/posts";
import { PostDataType } from "@/data/types";
import { DEMO_CATEGORIES, DEMO_TAGS } from "@/data/taxonomies";
import { DEMO_AUTHORS } from "@/data/authors";
import Pagination from "@/components/Pagination/Pagination";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ArchiveFilterListBox from "@/components/ArchiveFilterListBox/ArchiveFilterListBox";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import Card11 from "@/components/Card11/Card11";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import SectionSliderNewAuthors from "@/components/SectionSliderNewAthors/SectionSliderNewAuthors";
import Image from "next/image";
import { useParams } from "next/navigation";
// import { fetchTag, getTag } from "@/Redux/Features/Tags/getTagByNameSlice";
import { connect, useDispatch, useSelector } from "react-redux";
import { getActiveCategoryData, getActiveTagsData,getActiveBlogData,get_tag_by_slug } from "@/redux/actions/blogAction";
// import { getCategories, getCategory } from "@/Redux/Features/Blog/GetCategorySlice";
// import { tags as allTags, getTags } from "@/Redux/Features/Tags/TagSlice";


// Tag and category have same data type - we will use one demo data
const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 16);

const PageTag = (props) => {
  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];
  const [noOfArticles, setNoOfArticles] = useState<number>(12);
  const dispatch = useDispatch();
  // const tagState = useSelector(getTag);
  // const tagsState = useSelector(allTags);
  
  const params = useParams();
  // const categoryState = useSelector(getCategories);

  useEffect(() => {
   props.getActiveCategoryData({ pageNo: 1, NoOfRecords: 10 });
   props.getActiveTagsData({ pageNo: 1, NoOfRecords: 20 });
  const tagName = decodeURI(params?.slug);

   props.get_tag_by_slug( {pageNo: 1, NoOfRecords: noOfArticles, tag_name: tagName });

  }, []);

  // const tagName = decodeURI(params?.slug[0]);
  const tagName = decodeURI(params?.slug);

  // console.log("tagName22", tagName);

  useEffect(() => {
    props.get_tag_by_slug({ pageNo: 1, NoOfRecords: noOfArticles, tag_name: tagName });
  }, [tagName, noOfArticles])



  const handleShowMore = () => {
    setNoOfArticles((prev: number) => prev + 12)
  }
// console.log(props.tag_by_name , "tag_by_name")
  return (
    <div className={`nc-PageArchive`}>
      {/* Hero section of Tag details page */}
      {/* <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
        <div className="relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 rounded-3xl md:rounded-[40px] overflow-hidden z-0">
          <Image
            alt="archive"
            fill
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full rounded-3xl md:rounded-[40px]"
            sizes="(max-width: 1280px) 100vw, 1536px"
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
              {tagName}
            </h2>
            <span className="block mt-4 text-neutral-300">{tagState?.articles?.total_data_count} Articles</span>
          </div>
        </div>
      </div> */}
      {/* ====================== END HEADER ====================== */}

      <div className="container pt-10 pb-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <div>
          <div className="flex flex-col sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5 rtl:space-x-reverse">
              {/* Commented category modal */}
              {/* <ModalCategories categories={DEMO_CATEGORIES} /> */}
              <ModalTags tags={props?.tagsData} />
            </div>
            <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
            {/* commented most recent articles */}
            {/* <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div> */}
          </div>

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {props.tag_by_name?.data?.map((post: any) => (
              <Card11 key={post.id} post={post} />
            ))}
          </div>

          {/* PAGINATIONS */}
          {/* changes style sm:justify-between to sm:justify-end */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-end sm:items-center">
            {/* <Pagination /> */}
            {noOfArticles <= props?.tag_by_name?.total_data_count && <ButtonPrimary handleSubmit={handleShowMore}>Show me more</ButtonPrimary>}
            {/* <ButtonPrimary handleSubmit={handleShowMore}>Show less</ButtonPrimary> */}

          </div>
        </div>

        {/* MORE SECTIONS */}
        {/* === SECTION 5 === */}
        <div className="relative py-16">
          <BackgroundSection />
          {/* Trending Topics */}

          <SectionGridCategoryBox
            categories={props?.categoryData}
          />
          {/* <div className="text-center mx-auto mt-10 md:mt-16">
            <ButtonSecondary loading>Show me more</ButtonSecondary>
          </div> */}
        </div>

        {/* === SECTION 5 === */}
        {/* <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        /> */}

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
  tag_by_name:state.blogState.tag_by_name
});

export default connect(mapStateToProps, {
  getActiveBlogData,
  getActiveCategoryData,
  getActiveTagsData,
  get_tag_by_slug
})(PageTag);
// export default PageTag;
