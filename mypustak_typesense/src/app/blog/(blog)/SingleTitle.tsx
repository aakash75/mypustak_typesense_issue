import React, { FC } from "react";

export interface SingleTitleProps {
  title: string;
  className?: string;
  mainClass?: string;
}

const SingleTitle: FC<SingleTitleProps> = ({
  mainClass = "text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100",
  className = "",
  title,
}) => {
  console.log(title,"title");

  return (
 <div className="min-h-[150px]" >   <h1 className={className + " " + mainClass + " max-w-4xl text-white "} title={title}>
      {title}
    </h1></div>
  );
};

export default SingleTitle;
