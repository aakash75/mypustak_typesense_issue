"use client";

import Heading2 from "@/components/Heading/Heading2";
import { Route } from "@/routers/types";
import Link from "next/link";
import { connect, useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { helpers } from "../../../../helper/helpers";


const subPages: { href: Route; pageName: string; emoij: string }[] = [
  {
    href: "/blog/dashboard",
    emoij: "⏳",
    pageName: "Dash board",
  },
  {
    href: "/blog/dashboard/posts",
    emoij: "📕",
    pageName: "Posts",
  },
  {
    href: "/blog/dashboard/edit-profile",

    emoij: "🛠",
    pageName: "Edit profile",
  },
  {
    href: "/blog/dashboard/view-category",

    emoij: "🏚",
    pageName: "View category",
  },
  {
    href: "/blog/dashboard/subscription",
    emoij: "📃",
    pageName: "Subscription",
  },
  {
    href: "/blog/dashboard/billing-address",

    emoij: "✈",
    pageName: "Billing address",
  },
  {
    href: "/blog/dashboard/submit-post",

    emoij: "✍",
    pageName: "Submit post",
  },
];

const Layout = ({ children ,userComponentStatus }: { children: ReactNode,userComponentStatus: number }) => {
  const pathname = usePathname();
  const router = useRouter();
 let BackUrl = "/blog/dashboard";
  interface LocalStorage {
    removeItem(key: string): void;
  }
  const localStorage: LocalStorage = {
    removeItem(key: string): void {
      window?.localStorage?.removeItem(key);
      document.cookie = "I=;expires = Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    },
  }

  
  useEffect(() => {
     
    if (userComponentStatus !== 2) { // Check if userComponentStatus is not 2
      console.log("userComponentStatus",userComponentStatus)
      if (userComponentStatus === 1 || userComponentStatus === 0) {
        const getCookieArr = document.cookie.split("; ");
        let Cookie_details = getCookieArr.filter(e => e.startsWith("I="));
        if (Cookie_details.length === 0) {
          router.push(`/account/Loginpage?ret=${BackUrl}`);
        }
      }
    }
  }, [userComponentStatus, router]); // Add userComponentStatus and router to the dependency array

  
  const handleSignOut = () => {
 
    // localStorage.removeItem("I");
    document.cookie = "I=;expires = Thu, 01 Jan 1970 00:00:00 UTC;path=/";
router.push(`/account/Loginpage?ret=${BackUrl}`);
  }


  return (
    <div className={`nc-PageDashboard`}>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-24">
        <Heading2 emoji="">Dash board</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          View your dashboard, manage your posts, subscription, edit and
          profile.
        </span>
      </header>
      <ToastContainer />
      <div className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
        {/* SIDEBAR */}

        <div className="flex-shrink-0 max-w-xl xl:w-80 xl:pe-8">
          <ul className="text-base space-y-1 text-neutral-700 dark:text-neutral-400">
            {subPages.map(({ href, pageName, emoij }, index) => {
              return (
                <li key={index}>
                  <Link
                    className={`px-6 py-3 font-medium rounded-full flex items-center ${pathname === href
                      ? "bg-neutral-100  dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                      : "hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                      }`}
                    href={href}
                  >
                    <span className="w-8 me-2 text-lg">{emoij}</span>
                    <span> {pageName}</span>
                  </Link>
                </li>
              );
            })}

            <li className=" border-t border-neutral-200 dark:border-neutral-700" />
            <li>
              <button
                className={`flex items-center px-6 py-3 font-medium text-red-500`}
                onClick={handleSignOut}
              >
                <span className="w-8 me-2 text-lg ">💡</span>
                Sign out
              </button>
            </li>
          </ul>
        </div>

        <div className="border-t border-neutral-500 dark:border-neutral-300 md:hidden"></div>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { accountR: { userComponentStatus: any; }; }) => {
  return {
    userComponentStatus: state.accountR.userComponentStatus,
  };
};

// Connect Layout component to Redux store using mapStateToProps
export default connect(mapStateToProps)(Layout);
