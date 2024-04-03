import { Sidebar } from "@/app/blog/(blog)/Sidebar";
import SingleContent from "@/app/blog/(blog)/SingleContent";
import SingleContentNew from "@/app/blog/(blog)/SingleContentNew";
import SingleRelatedPosts from "@/app/blog/(blog)/SingleRelatedPosts";
import React, { ReactNode } from "react";
// 

const layout = ({ children }: { children: ReactNode }) => {
    console.log("sdcsz")
    return (
        <div className={`relative`}>
            {children}

            <div className="container flex flex-col my-10 lg:flex-row ">
                <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
                    <SingleContentNew />
                </div>
                <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3">
                    <Sidebar />
                </div>
            </div>

          
            <SingleRelatedPosts />
        </div>
    );
};

export default layout;
