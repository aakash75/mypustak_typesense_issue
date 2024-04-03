import React, { useState, useEffect } from "react";
import Logo from "@/components/Logo/Logo";
import MenuBar from "@/components/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "@/components/Navigation/Navigation";
import {TypeAnimation} from "react-type-animation";
import { connect, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
const MainNav2Logged = (props) => {
    const router = useRouter();
  const [token, setToken] = useState(false); // Assuming you manage token with state
  useEffect(() => {

    if (props?.userComponentStatus !== 2) { // Check if userComponentStatus is not 2
      console.log("userComponentStatus",props?.userComponentStatus)
      if (props?.userComponentStatus === 1 || props?.userComponentStatus === 0) {
        const getCookieArr = document.cookie.split("; ");
        let Cookie_details = getCookieArr.filter(e => e.startsWith("I="));
        if (Cookie_details.length === 0) {
          // router.push(`/account/Loginpage?ret=${BackUrl}`);
          setToken(false)
        }else{
          setToken(true)
        }
      }
    }
  }, []);


  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between">
        <div className="flex items-center lg:hidden flex-1">
          <MenuBar />
        </div>

        <div className="lg:flex-1 flex flex-col items-center">
          <Logo />
          <TypeAnimation
            sequence={[
              "Read |",
              500,
              "Read | Learn |", //  Continuing previous Text
              500,
              "Read | Learn | Thrive",
              500,
              "Read | Learn |",
              500,
              "Read |",
              500,
              "",
              500,
            ]}
            className="font-extrabold text-sm pt-1 bg-gradient-to-r from-violet-800 to-indigo-800 bg-clip-text text-transparent"
            repeat={Infinity}
          />
        </div>

        <div className="flex-[8] hidden lg:flex justify-start mx-4">
          <Navigation />
        </div>

        <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
          {/* <SearchModal /> */}
          {/* <NotifyDropdown /> */}
         {token && <AvatarDropdown />} 
        </div>
      </div>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="px-4">{renderContent()}</div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    userComponentStatus: state.accountR.userComponentStatus,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(MainNav2Logged);
