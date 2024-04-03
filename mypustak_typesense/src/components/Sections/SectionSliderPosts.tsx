"use client";

import React, { FC } from "react";
import Heading from "@/components/Heading/Heading";
import { BlogDataType } from "@/data/types";
import Card10 from "@/components/Card10/Card10";
import MySlider from "@/components/MySlider";

export interface SectionSliderPostsProps {
  className?: string;
  heading: string;
  subHeading?: string;
  posts: BlogDataType[];
  postCardName?: "card4" | "card7" | "card9" | "card10" | "card10V2" | "card11";
  perView?: 2 | 3 | 4;
}

const SectionSliderPosts: FC<SectionSliderPostsProps> = ({
  heading,
  subHeading,
  className = "",
  posts,
  postCardName = "card7",
  perView = 4,
}) => {
  let CardComponent = Card10;
 

  return (
    <div className={`nc-SectionSliderPosts ${className}`}>
      <Heading desc={subHeading} isCenter>
        {heading}
      </Heading>

        <MySlider
          data={posts}
          renderItem={(item, indx) => <CardComponent key={indx} post={item} />}
          itemPerRow={perView}
        />
    </div>
  );
};

export default SectionSliderPosts;
