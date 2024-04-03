import React, { FC } from "react";
import Avatar from "@/components/Avatar/Avatar";
import { PostDataType, BlogDataType } from "@/data/types";
import Link from "next/link";

export interface PostCardMetaV2Props {
  // meta: Pick<BlogDataType, "date" | "author" | "title" | "href">;
  hiddenAvatar?: boolean;
  className?: string;
  titleClassName?: string;
  avatarSize?: string;
  post: BlogDataType;
}

const PostCardMetaV2: FC<PostCardMetaV2Props> = ({
  // meta,
  hiddenAvatar = false,
  className = "leading-none text-xs",
  titleClassName = "text-base",
  avatarSize = "h-9 w-9 text-base",
  post
}) => {
  // const { date, author, title } = meta;
  const {
    article_title,
    article_thumb,
    article_excerpt,
    article_main_thumb,
    article_content,
    postType,
    article_slug
  } = post;
  return (
    <div
      className={`nc-PostCardMetaV2 inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${className}`}
    >
      <div className="relative flex items-center space-x-2 rtl:space-x-reverse">
   
        <div className="">
          <h2 className={`block font-semibold ${titleClassName}`}>
            <Link href={`/blog/${article_slug}`} className="line-clamp-1 pl-2.5">
              {article_title}
            </Link>
          </h2>

          <Link href={`/blog/${article_slug}`} className="flex mt-1.5">
            <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
            
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
              ·
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 font-normal">
      
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCardMetaV2;
