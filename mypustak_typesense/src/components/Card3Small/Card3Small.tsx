import React, { FC } from "react";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import { PostDataType, BlogDataType} from "@/data/types";
import Link from "next/link";
import Image from "next/image";
import NcImage from "@/components/NcImage/NcImage";
export interface Card3SmallProps {
  className?: string;
  post: BlogDataType;
  size?: "large" | "normal";
}

const Card3Small: FC<Card3SmallProps> = ({ 
  className = "h-full", post ,
   size = "normal",
}) => {
  const { article_title, article_thumb, article_slug } = post;
  const blogUrl = `/blog/${article_slug}`;
  console.log(post,"15633");
  
  return (
    <div
      className={`nc-Card3Small relative flex flex-row justify-between items-center ${className}`}
    >
      <Link href={blogUrl} className="absolute inset-0" title={article_title}></Link>
      <div className="relative space-y-2">
        {/* <PostCardMeta meta={{ ...post }} /> */}
        <h2 className="nc-card-title block text-sm sm:text-base font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100">
          <Link href={blogUrl} className="line-clamp-2" title={article_title}>
            {article_title}
          </Link>
        </h2>
      </div>

      <Link
        href={blogUrl}
        title={article_title}
        className={`block w-20 flex-shrink-0 relative rounded-lg overflow-hidden z-0 ms-4 group`}
      >
        <div className={`w-full h-0 aspect-w-1 aspect-h-1 min-h-[70px] min-w-[40px] rounded-lg`}>
          <Image
            alt="featured"
            sizes="100vw"
            className="object-contain  w-full h-full rounded-lg group-hover:scale-110 transform transition-transform duration-300"
            src={article_thumb}
            fill
              placeholder="blur"
                  blurDataURL={article_thumb}
            title={article_title}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card3Small;
