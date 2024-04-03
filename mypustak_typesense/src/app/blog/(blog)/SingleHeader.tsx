"use client";

import React, { FC } from "react";
import SingleTitle from "./SingleTitle";
import SingleMetaAction2 from "./SingleMetaAction2";
import Badge from "@/components/Badge/Badge";

export interface SingleHeaderProps {
  hiddenDesc?: boolean;
  titleMainClass?: string;
  className?: string;
  blogTitle?: string;
  categoryTitle?:string;
  categoryData?:any;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  titleMainClass,
  hiddenDesc = false,
  className = "",
  blogTitle = "",
  categoryTitle = "",
  categoryData
}) => {
  return (
    <>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
      

        <Badge
          className="!px-3"
          key={1}
          name={categoryData?.category_title}
          href={`/blog/category/${categoryData?.category_slug}`}
          color={'red'}
        />
          <SingleTitle
            mainClass={titleMainClass}
            title={blogTitle}
          />
          {!hiddenDesc && (
            <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perspiciatis tempora obcaecati error ipsum voluptatibus sed
              adipisci ut maiores nesciunt quam.
            </span>
          )}
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col sm:flex-row justify-end sm:items-end space-y-5 sm:space-y-0 sm:space-x-5 rtl:space-x-reverse">
            {/* Post written by */}
            {/* <PostMeta2
              size="large"
              className="leading-none flex-shrink-0"
              hiddenCategories
              avatarRounded="rounded-full shadow-inner"
            /> */}
            {/* Share and more */}
            <SingleMetaAction2 />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
