// new code
"use client";
import dynamic from "next/dynamic";
import { Viewport } from "next";
import { SnackbarProvider } from "notistack";
import { initStore } from "../redux/store";
import { Provider } from "react-redux";
import OfferStrip from "../components/offerstrip/OfferStrip";
import { GoogleAnalytics } from "@next/third-parties/google";
const MainFooter = dynamic(() => import("../components/Footer/MainFooter"), {
  ssr: false,
});
import { ThemeProvider, IconButton, Backdrop } from "@mui/material";

import Script from "next/script";
import CustomLoader from "../components/CustomLoader/CustomLoader";
import CategoryNavbar from "../components/CategoryNavbar/CategoryNavbar";
import CategoryNavbarNew from "../components/CategoryNavbar/CategoryNavbarNew";
import "../styles/globals.css";
import "./globals.css";
import styles from "../styles/CategoriesDrawer.module.css";
import "../styles/MainFooter.module.css";
import "bootstrap/dist/css/bootstrap.css";
import WLoginNavbar from "../components/navbar/WLoginNavbar";
import NewNavbar from "../components/navbar/NewNavbar";
// import FooterSitemap from "../components/Footer/FooterSitemap";
import { Suspense, useState } from "react";
import BottomNavbar from "@/components/navbar/BottomNavbar";
// import BootstrapClient from "@/components/BootstrapClient"
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";
import theme from "../styles/theme";
import ThemeRegistry from "@/styles/ThemeRegistry";
// import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  // display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  shrinkToFit: "no",

  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({ children, params }) {
  // const [navbarHidesUrls, setNavbarHidesUrls] = useState([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log("params------------------------------", params);
  let urls = [
    "/pages/about-us/OurCommitment",
    "/pages/about-us/history",
    "/Onlinecourse",
    "/pages/about-us/Impact",
    "/pages/about-us/free-book-theory",
    "/pages/about-us",
    "/checkout",
    "/blog",
  ];

  console.log("params------------------------------", pathname);
  const CheckingUrl = () => {
    // if (urls.includes(pathname)) {
    //   console.log("include");
    //   return true;
    // } else {
    //   return false;
    // }
    let startsWithPrefix = urls.some((prefix) => pathname.startsWith(prefix));

    if (startsWithPrefix) {
      console.log(
        "True condition: The string starts with one of the prefixes."
      );
      return true;
    } else {
      // console.log(
      //   "False condition: The string does not start with any of the prefixes."
      // );
      return false;
    }
  };

  return (
    <html lang="en" className={roboto.className}>
      <Head>
        <link rel="shortcut icon" href="/Mypustakfavicon.ico" />
      </Head>
      <SnackbarProvider maxSnack={3}>
        <Provider store={initStore()}>
          <ThemeRegistry options={{ key: "mui" }}>
            <body>
              {/* <Suspense
              fallback={
                <div>
                  <CustomLoader />
                </div>
              }
            > */}
              <GoogleAnalytics gaId="GTM-JPWF8" />
              <main>
                <OfferStrip />
                <div className="sticky-top" style={{ zIndex: "1010" }}>
                  {/* <WLoginNavbar /> */}
                  {/* {console.log(CheckingUrl())} */}
                  {CheckingUrl() ? null : <NewNavbar />}
            
                </div>
                {/* End sticky div */}
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
                <div>{children}</div>


                <BottomNavbar />
              </main>
              {/* </Suspense> */}
            </body>
          </ThemeRegistry>
        </Provider>
      </SnackbarProvider>

      {/* 
      <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></Script> */}
    </html>
  );
}
