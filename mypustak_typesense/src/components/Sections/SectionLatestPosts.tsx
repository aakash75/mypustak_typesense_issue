import React, { FC } from "react";
import Card3 from "@/components/Card3/Card3";
import Heading from "@/components/Heading/Heading";
import WidgetTags from "@/components/WidgetTags/WidgetTags";
import { PostDataType, BlogDataType, CategoryType, TagType } from "@/data/types";
import WidgetCategories from "@/components/WidgetCategories/WidgetCategories";
import WidgetAuthors from "@/components/WidgetAuthors/WidgetAuthors";
import WidgetPosts from "@/components/WidgetPosts/WidgetPosts";
import Pagination from "@/components/Pagination/Pagination";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Card4 from "@/components/Card4/Card4";
import Card7 from "@/components/Card7/Card7";
import Card9 from "@/components/Card9/Card9";
import Card10 from "@/components/Card10/Card10";
import Card11 from "@/components/Card11/Card11";
import Card14 from "@/components/Card14/Card14";
import Link from "next/link";

// THIS IS DEMO FOR MAIN DEMO
// OTHER DEMO WILL PASS PROPS
// const postsDemo: PostDataType[] = DEMO_POSTS.filter((_, i) => i > 7 && i < 15);
//
export interface SectionLatestPostsProps {
  post?: BlogDataType[];
  categories?: CategoryType[];
  tagsData?:TagType[];
  gridClass?: string;
  className?: string;
  heading?: string;
  postCardName?:
  | "card3"
  | "card4"
  | "card7"
  | "card9"
  | "card10"
  | "card11"
  | "card14";
}

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
  post,
  categories,
  tagsData,
  postCardName = "card3",
  heading = "Latest Articles 🎈",
  gridClass = "",
  className = "",
}) => {
  const renderCard = (post: BlogDataType, index: number) => {
    return (
  
      <Card7 key={index} className="" post={post} />
    );
   
  };

  console.log("LatestPost", post)
  return (
    <div className={`nc-SectionLatestPosts relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-14">
          <Heading>{heading}</Heading>
          <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
            {post ?.slice(0,8).map(renderCard)}
          </div>
          <div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 rtl:space-x-reverse sm:flex-row sm:justify-between sm:items-center">
            <Link href="/blog/post" >
              <span className="px-4 py-3 rounded-full bg-blue-600 text-white font-medium ">
                Show me more
             </span>
               </Link>
          </div>
        </div>
        <div className="w-full space-y-7 mt-24 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3 ">
          <WidgetTags  />
          <WidgetCategories  />
          {/* <WidgetAuthors /> */}
          <WidgetPosts  />
        </div>
      </div>
    </div>
  );
};

export default SectionLatestPosts;
