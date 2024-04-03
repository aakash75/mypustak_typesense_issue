
// import 'bootstrap/dist/css/bootstrap.css'
// import "../styles/globals.css";
// import dynamic from "next/dynamic";
// import withRedux from "next-redux-wrapper";
// import { initStore } from "../redux/store";
// import { ThemeProvider, IconButton, Backdrop } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { theme } from "../styles/theme";
// import Head from "next/head";
// import SignalWifiBadIcon from "@mui/icons-material/SignalWifiBad";
// import WLoginNavbar from "../components/navbar/WLoginNavbar";
// import { SnackbarProvider, useSnackbar } from "notistack";
// const MainFooterOldSite = dynamic(() =>
//     import("../components/Footer/MainFooterOldSite")
// );
// import useScrollDirection from "../components/hooks/UseScrollDirection";
// import { useState } from "react";
// import { useEffect } from "react";
// import axios from 'axios'
// const CategoryNavbar = dynamic(() =>
//     import("../components/CategoryNavbar/CategoryNavbar")
// );
// const BottomNavbar = dynamic(
//     () => import("../components/navbar/BottomNavbar"),
//     {
//         ssr: false,
//     }
// );

// import { useRouter } from "next/router";

// import CustomLoaderWithoutText from "../components/CustomLoader/CustomLoaderWithoutText";
// import OfferStrip from "../components/offerstrip/OfferStrip";
// import { Unbxd } from '../helper/helpers';

// export default withRedux(initStore, { debug: false })(function MyApp({
//     Component,
//     pageProps,
// }) {
//     const router = useRouter();

//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         import('bootstrap/dist/js/bootstrap');
//     }, []);
//     useEffect(() => {
//         const handleStart = url => url !== router.asPath && setLoading(true);
//         const handleComplete = url => url === router.asPath && setLoading(false);

//         router.events.on("routeChangeStart", handleStart);
//         router.events.on("routeChangeComplete", handleComplete);
//         router.events.on("routeChangeError", handleComplete);

//         return () => {
//             router.events.off("routeChangeStart", handleStart);
//             router.events.off("routeChangeComplete", handleComplete);
//             router.events.off("routeChangeError", handleComplete);
//         };
//     });
//     const [drawer, setdrawer] = useState(false);
//     const [isproductpage, setIsproductpage] = useState(false);

//     useEffect(() => {



//         let urls = [
//             "/pages/about-us/OurCommitment",
//             "/pages/about-us/history",
//             "/Onlinecourse",
//             "/pages/about-us/Impact",
//             "/pages/about-us/free-book-theory",
//             "/pages/about-us",
//         ];
//         setNavbarHidesUrls(urls);
//         const queryParams = new URLSearchParams(window.location.search);
//         console.log(window.location.pathname, "path");

//         let checkproductpage = window.location.pathname.split("/")[1];
//         console.log(checkproductpage, "checkproductpage");

//         if (checkproductpage == "product") {
//             setIsproductpage(true);
//         } else {
//             setIsproductpage(false);
//         }
//         console.log(window.location.pathname, "window.location.pathname");
//         setWindowpath(window.location.pathname);
//     }, []);





//     if (typeof window !== "undefined") {
//         useEffect(() => {
//             const queryParams = new URLSearchParams(window.location.search);
//             setWindowpath(window.location.pathname);
//         }, [new URLSearchParams(window.location.search)]);
//     }
//     const scrollDirection = useScrollDirection();
//     const [windowPath, setWindowpath] = useState("");
//     const [navbarHidesUrls, setNavbarHidesUrls] = useState([]);
//     const CheckingUrl = () => {
//         if (navbarHidesUrls.includes(windowPath)) {
//             return true;
//         } else {
//             return false;
//         }
//     };
//     const [network, setnetwork] = useState(true);
//     if (typeof window !== "undefined") {
//         useEffect(() => {
//             if (window.navigator.onLine) {
//                 setnetwork("true");
//             } else {
//                 setnetwork(false);
//             }
//         }, [window.navigator.onLine]);
//     }

//     if (typeof window !== "undefined") {
//         window.addEventListener("offline", e => {
//             setnetwork(false);
//         });
//         window.addEventListener("online", e => {
//             setnetwork(true);
//             window.location.reload();
//         });
//     }

//     function SnackbarCloseButton({ snackbarKey }) {
//         const { closeSnackbar } = useSnackbar();

//         return (
//             <IconButton onClick={() => closeSnackbar(snackbarKey)}>
//                 <CloseIcon style={{ color: "white" }} />
//             </IconButton>
//         );
//     }
//     return (
//         <SnackbarProvider
//             autoHideDuration='3000'
//             action={snackbarKey => <SnackbarCloseButton snackbarKey={snackbarKey} />}
//             preventDuplicate={true}
//             anchorOrigin={{ vertical: "top", horizontal: "center" }}>
//             <Head>
//                 <meta name='viewport' content='width=device-width, initial-scale=1.0' />
//             </Head>

//             {network ? (
//                 <ThemeProvider theme={theme}>
//                     <OfferStrip />
//                     {
//                         <div className='sticky-top' style={{ zIndex: "1005" }}>
//                             {CheckingUrl() || windowPath == "/checkout" ? null : (
//                                 <div>
//                                     <WLoginNavbar drawer={drawer} setdrawer={setdrawer} />
//                                 </div>
//                             )}
//                             {CheckingUrl() ||
//                                 windowPath == "/checkout" ? null : scrollDirection ==
//                                     "down" ? null : (
//                                 <CategoryNavbar drawer={drawer} setdrawer={setdrawer} />
//                             )}
//                         </div>
//                     }
//                     <div>
//                         {CheckingUrl() ||
//                             windowPath == "/checkout" ? null : scrollDirection == "down" ? (
//                                 <CategoryNavbar drawer={drawer} setdrawer={setdrawer} />
//                             ) : null}
//                     </div>
//                     <div className='parentDiv'>
//                         <div>
//                             <div
//                                 className='center'
//                             >
//                                 <div style={{ minHeight: "80vh " }}>
//                                     {loading ? (
//                                         <div>
//                                             <Backdrop
//                                                 sx={{
//                                                     backgroundColor: "#fff",
//                                                     zIndex: "1000",
//                                                     opacity: 0.5,
//                                                 }}
//                                                 style={{ opacity: "0.98" }}
//                                                 open={true}
//                                             >
//                                                 <CustomLoaderWithoutText size='60px' />
//                                             </Backdrop>
//                                         </div>
//                                     ) : (
//                                         <Component {...pageProps} />
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <BottomNavbar />
//                     {windowPath == "/view-cart" ? null : <MainFooterOldSite />}
//                     <div id='modal-root'></div>

//                     <style jsx>
//                         {`
//               @media screen and (min-width: 1470px) {
//                 .parentDiv {

//                   display: flex;
//                   justify-content: center;
//                 }
//                 .center {
//                   max-width: 1500px;
//                   min-width: 1500px;
//                   // border:1px solid red;
//                 }
//               }
//             `}
//                     </style>
//                 </ThemeProvider>
//             ) : (
//                 <div
//                     style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         minHeight: "100%",
//                     }}>
//                     <div
//                         style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                         }}>
//                         <SignalWifiBadIcon color='error' style={{ fontSize: "18rem" }} />
//                         <span style={{ fontSize: "2rem" }}>
//                             You seem to be not connected to the Internet! please check your
//                             connection.
//                         </span>
//                     </div>
//                 </div>
//             )}
//         </SnackbarProvider>
//     );
// });
