import React from "react";
import styles from "../../styles/CategoryNavbar.module.css";
import NavBarComponent from "./NavBarComponent";
import AllCategory from "./AllCategory";
import SocialShare from "./SocialShare";
const CategoryNavbarNew = () => {
  return (
    <div>
      <div className=" shadow d-flex  d-sm-flex d-xl-flex text-sm bg-white min-h-16 box-border  px-4 pt-1 mb-2" >
        <div
          className={`${styles.category_maindiv} d-flex justify-start sm:justify-between md: justify-between min-w-full overflow-x-scroll   sm:overflow-x-auto sm:max-w-screen-sm `}
        >
          <AllCategory />
          <div>
            <NavBarComponent />
          </div>
          <div>
            <SocialShare />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavbarNew;
