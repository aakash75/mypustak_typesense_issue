import React, { FC } from "react";
import imgAdsDef from "@/images/ads.png";
import home_banner_3 from "@/assets/bannner_2.png"
import Image, { StaticImageData } from "next/image";

export interface SectionAdsProps {
  className?: string;
  imgAds?: string | StaticImageData;
}

const SectionAds: FC<SectionAdsProps> = ({
  className = "",
  imgAds = imgAdsDef,
}) => {
  return (
    <a
      href="https://www.mypustak.com/"
      className={`nc-SectionAds block text-center mx-auto ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* <span className="text-xs text-neutral-500">- Advertisement -</span> */}
      {/* <Image className="mx-auto" src={imgAdsDef} alt="ads" /> */}
      {/* <div className="w-full border-4 rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
        <div>
          <Image src={home_banner_3} alt="ads" />

        </div>
      </div> */}
      <div className="w-full ">
        <div className=" w-full rounded-xl bg-gradient-to-r from-violet-600 via-blue-500 to-indigo-600 p-0.5">
            <Image src={home_banner_3} alt="ads" className="rounded-xl w-full"/>
        </div>
      </div>
    </a>
  );
};

export default SectionAds;
