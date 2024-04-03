"use client";

import React, { FC } from "react";
import { PostDataType, BlogDataType } from "@/data/types";
import GallerySlider from "./GallerySlider";
import MediaVideo from "./MediaVideo";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import MediaAudio from "./MediaAudio";
import Link from "next/link";
import Image from "next/image";

export interface PostFeaturedMediaProps {
  className?: string;
  post: BlogDataType;
  isHover?: boolean;
}

const PostFeaturedMedia: FC<PostFeaturedMediaProps> = ({
  className = "w-full h-full",
  post,
  isHover = false,
}) => {
  // const { featuredImage, postType, videoUrl, galleryImgs, audioUrl, id, href } =
  //   post;
  const {
    article_title,
    article_thumb,
    article_excerpt,
    article_main_thumb,
    article_content,
    postType,
    article_slug
  } = post;

  // const isPostMedia = () => postType === "video" || postType === "audio";
  const isPostMedia = () => postType === "standard" || postType === "audio";

  const renderGallerySlider = () => {
    if (!article_thumb) return null;
    
    return (
      <GallerySlider
        href={`/blog/${article_slug}`}
        className="absolute inset-0 z-10"
        galleryClass="absolute inset-0"
        ratioClass="absolute inset-0"
      />
    );
  };

  const renderContent = () => {
    // GALLERY
    if (postType === "standard") {
      return renderGallerySlider();
    }

    // ICON
    return isPostMedia() ? (
      <span className="absolute inset-0 flex items-center justify-center ">
        <PostTypeFeaturedIcon
          className="hover:scale-105 transform cursor-pointer transition-transform"
          postType={postType}
        />
      </span>
    ) : null;
  };

  return (
    <div className={`nc-PostFeaturedMedia relative ${className}`}>
      {postType !== "standard" && (
        <Image
          alt="featured"
          // fill
             placeholder="blur"
   blurDataURL={article_thumb}
          height={600}
          width={600}
          className="object-cover min-h-80 max-h-80"
          src={article_thumb}
          sizes="(max-width: 600px) 480px, 800px"
        />
      )}
      {renderContent()}
      {postType !== "standard" && (
        <Link
          href={`/blog/${article_slug}`}
          className={`block absolute inset-0 ${
            !postType || postType === "standard"
              ? "bg-black/20 transition-opacity opacity-0 group-hover:opacity-100"
              : ""
          }`}
        />
      )}
    </div>
  );
};

export default PostFeaturedMedia;
