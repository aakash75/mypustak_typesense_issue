"use client";

import React, { FC, useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType, BlogDataType} from "@/data/types";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia";
import PostCardMetaV2 from "@/components/PostCardMeta/PostCardMetaV2";
import Link from "next/link";

export interface Card10Props {
  className?: string;
  post: BlogDataType;
}

const Card10: FC<Card10Props> = ({ className = "h-full", post }) => {
  // const { href, categories } = post;
  const {
    article_title,
    article_thumb,
    article_excerpt,
    article_main_thumb,
    article_content,
    postType,
    article_slug
  } = post

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-Card10 relative flex flex-col ${className} `}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link href={`/blog/${article_slug}`} className="absolute inset-0" />
      <div className="block group rounded-3xl flex-shrink-0 relative w-full aspect-w-9 aspect-h-7 sm:aspect-h-9 overflow-hidden z-0">
        <div>
          <PostFeaturedMedia post={post} isHover={isHover} />
        </div>

        <Link
          href={`/blog/${article_slug}`}
          className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"
        ></Link>
      </div>
   

      <div className="space-y-2.5 rtl:space-x-reverse mt-4">
        <PostCardMetaV2 post={post} />
      </div>
    </div>
  );
};

export default Card10;
