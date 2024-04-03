import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { TaxonomyType, CategoryType } from "@/data/types";
import Link from "next/link";

export interface CardCategory1Props {
  className?: string;
  categoriesData: CategoryType;
  size?: "large" | "normal";
}

const CardCategory1: FC<CardCategory1Props> = ({
  className = "",
  size = "normal",
  categoriesData,
}) => {
  // const { count, name, href = "/", thumbnail } = taxonomy;
  const { category_thumb, category_title, category_rank, category_slug } = categoriesData;
    
  return (
    <Link
      href={`/blog/category/${category_slug}`}
      className={`nc-CardCategory1 flex items-center ${className}`}
    >
      <NcImage
        alt="category thumbnail"
        containerClassName={`relative flex-shrink-0 ${
          size === "large" ? "w-20 h-20" : "w-12 h-12"
        } rounded-lg me-4 overflow-hidden`}
        src={category_thumb || ""}
        fill
           placeholder="blur"
                  blurDataURL={category_thumb}
        className="object-cover"
        sizes="80px"
      />
      <div>
        <h2
          className={`${
            size === "large" ? "text-lg" : "text-base"
          } nc-card-title text-neutral-900 dark:text-neutral-100 text-sm sm:text-base font-medium sm:font-semibold`}
        >
          {category_title}
        </h2>
        {/* <span
          className={`${
            size === "large" ? "text-sm" : "text-xs"
          } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
        >
          {count} Articles
        </span> */}
      </div>
    </Link>
  );
};

export default CardCategory1;
