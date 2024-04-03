"use client";

import React, { FC, useState } from "react";
import PostActionDropdown from "@/components/PostActionDropdown/PostActionDropdown";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import { SOCIALS_DATA } from "@/components/SocialsShare/SocialsShare";
import NcDropDown from "@/components/NcDropDown/NcDropDown";
import NcBookmark from "@/components/NcBookmark/NcBookmark";
import SocialsShareNew from "../../../components/SocialsShare/SocialsShareNew"
export interface SingleMetaAction2Props {
  className?: string;
}

const SingleMetaAction2: FC<SingleMetaAction2Props> = ({ className = "" }) => {
  
  return (
    <div className={`nc-SingleMetaAction2 ${className}`}>
      <div className="flex flex-row space-x-2.5 rtl:space-x-reverse items-center">

        
        <div >
          <SocialsShareNew /> 
   
         </div>
        <PostActionDropdown
          containerClassName="h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          iconClass="h-5 w-5"
        />
      <div></div>
      </div>
    </div>
  );
};

export default SingleMetaAction2;
