"use client"
import React, { useEffect } from "react";
import { connect } from "react-redux";
import SectionHero from "@/components/SectionHero/SectionHero";
import Vector1 from "@/images/Vector1.png";
import home_banner_1 from "@/assets/New-Banner-Blog-1-min.png"
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import Image from "next/image";
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts";
import SectionAds from "@/components/Sections/SectionAds";
import SectionLatestPosts from "@/components/Sections/SectionLatestPosts";
// import { getBlog, getBlogs } from "@/Redux/Features/Blog/GetBlogsSlice";
// import { getActiveCategory, activeCategory } from "@/Redux/Features/Blog/ActiveCategorySlice";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useRouter } from "next/navigation";
import { getActiveBlogData, getActiveCategoryData, getActiveTagsData } from "../../../redux/actions/blogAction"


const PageHomeDemo3 = (props) => {
  const dispatch = useDispatch();
  // const categoryState = useSelector(activeCategory);
  // const blogState = useSelector(getBlog);
  const router = useRouter()

  useEffect(() => {
  
    props.getActiveBlogData({ pageNo: 1, NoOfRecords: 10 })
    props.getActiveCategoryData({ pageNo: 1, NoOfRecords: 10 })
    props.getActiveTagsData({ pageNo: 1, NoOfRecords: 10 })

  }, []);

  // useEffect(() => {
  //   dispatch(getActiveCategory({ pageNo: 1, NoOfRecords: 10}));
  // }, []);
  const handlePageChange = () => {
    router.push("/dashboard/submit-post/")
  }
  console.log( props.tagsData,"245366");
  return (
    <div className="nc-PageHomeDemo3 relative ">
      <div className="container relative">
        <div > 
            <SectionHero
          rightImg={home_banner_1}

          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
          heading={
            <span>
              Fuel your mind daily ! <br /> <span className="lg:text-4xl md:text-2xl text-xl">MyPustak blog</span>
              {/* heading */}
              {/* <br /> but not from {` `} */}
              <span className="relative pr-3">
                <Image
                  className="w-full absolute top-1/2 -start-1 transform -translate-y-1/2"
                  src={Vector1}
                  alt=""
                />
                {/* <span className="relative">heart</span> */}
              </span>
            </span>
          }
          // btnText="Getting started"
          // subHeading="Let stay at home and share with everyone the most beautiful stories in your hometown 🎈"
          subHeading="Where knowledge brews fresh every day 🎈"
        /></div>
   
        {/* trending topics */}
       <SectionGridCategoryBox
          headingCenter={false}
          categoryCardType="card2"
          className="pb-16 lg:pb-28"
          categories={props?.categoryData}
        />
      

           <SectionSliderPosts
           className="py-16 lg:py-28"
           postCardName="card10"
           heading="Latest articles"
          subHeading={`Over ${props?.blogCount} articles about all categories books`}
           posts={props?.blogState?.filter((_, i) => i < 8)}
         />
        
        <SectionAds className="pb-24 lg:pb-24" />

        
        <SectionLatestPosts
          post={props?.blogState}
          categories={props?.categoryData?.data}
          tagsData={props?.tagsData}
          postCardName="card7"
          gridClass="sm:grid-cols-2"
          className="pb-16 lg:pb-28 "
        />

        <SectionSubscribe2 className="pb-16 lg:pb-28" /> 
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
});

const mapDispatchToProps = dispatch => {
  return {
    getActiveBlogData: () => dispatch(getActiveBlogData({ pageNo: 1, NoOfRecords: 10 })),
    getActiveCategoryData: () => dispatch(getActiveCategoryData({ pageNo: 1, NoOfRecords: 10 })),
    getActiveTagsData: () => dispatch(getActiveTagsData({ pageNo: 1, NoOfRecords: 10 })),
    
  };
};
export default connect(mapStateToProps, 
  mapDispatchToProps
)(PageHomeDemo3);
