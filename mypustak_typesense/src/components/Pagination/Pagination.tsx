import { CustomLink } from "@/data/types";
import React, { FC,  } from "react";
import twFocusClass from "@/utils/twFocusClass";
import Link from "next/link";
import { getPost, getUserPost } from "@/Redux/Features/User/getUserPostSlice";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "@/Redux/Features/Blog/GetBlogsSlice";

const DEMO_PAGINATION: CustomLink[] = [
  {
    label: "1",
    href: "/",
  },
  {
    label: "2",
    href: "/",
  },
  {
    label: "3",
    href: "/",
  },
  {
    label: "4",
    href: "/",
  }, {
    label: "5",
    href: "/",
  },

];


export interface PaginationProps {
  className?: string;
  pageNo?:number;
  onclick?: () => void;
}

const Pagination: FC<PaginationProps> = ({ className = "", pageNo,onclick }) => {
  // const dispatch = useDispatch();
  // const blogState = useSelector(getPost);

  


  const renderItem = (pag: CustomLink, index: number) => {


    if (index+1 === pageNo) {
      // RETURN ACTIVE PAGINATION
      return (
        
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {pag.label}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <div key={index} onClick={() => onclick(index) } >
        <Link
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
          href=""
        >
          {pag.label}
        </Link>
      </div>
    );
  };

  return (
    <nav
      className={`nc-Pagination  inline-flex space-x-1 rtl:space-x-reverse text-base font-medium ${className}`}
    >
      {DEMO_PAGINATION.map(renderItem)}
    </nav>
  );
};

export default Pagination;
