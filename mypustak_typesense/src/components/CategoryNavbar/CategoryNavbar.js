/* eslint-disable */
"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../../styles/CategoryNavbar.module.css";
import MediaQuery from "react-responsive";
import donate_books_34kb from "../../assets/donate_books_34kb.png"
import proud_donor_copy_37_kb from "../../assets/proud_donor_copy_37_kb.jpg"
import new_book_47_kb from "../../assets/new_books_47_kb.png"
import note_book from "../../assets/notebook_icon.jpeg"
import CategoriesDrawer from "../Drawers/CategoriesDrawer2";
import playstore from "../../assets/playstore.webp";
import whatsapp from "../../assets/whatsapp.png";
import Image from "next/legacy/image";
import { connect } from "react-redux";
import freeBookImg from "../../assets/FreeBookCatIcon.svg";
import NewBookImage from "../../assets/NewBookCatIcon.svg";
import DonateBookImage from "../../assets/DonateBookCaticon.svg";
import ProudDonorImage from "../../assets/ProudDonorCatIcon.svg";
import IitJeeImage from "../../assets/IitJeeCatIcon.svg";
import { fetch_wishlist_detail_otherpage } from "../../redux/actions/loginactions";
import { usePathname, useRouter } from "next/navigation";

const navComponent = [
  // {"key":1,"title":"All Categories","url":" ","icon":<FiMenu />},

  {
    key: 4,
    title: "Donate Books",
    url: "",
    icon: "",
    mobile: "",
    page: "donate-books",
    // Image: donate_books_34kb,
    Image: DonateBookImage,
    activeUrl: ["/donate-books",
      "/donate-books/city", "/donate-books/DonationForm"
    ]
  },

  {
    key: 5,
    title: "MyPustak Notebooks",
    url: "",
    icon: "",
    mobile: "",
    page: "mypustak-notebook?83846575",
    Image: note_book,
    activeUrl: ["/mypustak-notebook"]
  },
  {
    key: 2,
    title: "Free Books",
    page: "free-books?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
    icon: "",
    Image: freeBookImg,
    mobileOff: false,
    activeUrl: ["/free-books"]
  },
  {
    key: 3,
    title: "New Books",
    url: "",
    page: "get-books?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
    icon: "",
    mobile: "",
    mobile: "d-none d-md-block",
    // Image: new_book_47_kb,
    Image: NewBookImage,
    activeUrl: ["/get-books"]
  },

  {
    key: 6,
    title: "Proud Donors",
    url: "",
    icon: "",
    mobile: "",
    page: "proud-donors",
    // Image: proud_donor_copy_37_kb,
    Image: ProudDonorImage,
    activeUrl: ["/proud-donors"]
  },
  // {
  //   key: 6,
  //   title: "IIT-JEE",
  //   url: "",
  //   icon: <IoBulbOutline />,
  //   mobile: "",
  //   page: "Onlinecourse",
  //   Image: IitJeeImage,
  // },
  // {
  //   key: 7,
  //   title: "Download App",
  //   url: "https://play.google.com/store/apps/details?id=com.mypustak",
  //   icon: "",
  //   mobile: "d-none d-md-block",
  //   Image: playstore,
  // },
  // {
  //   key: 8,
  //   title: "Chat with us",
  //   url: "https://api.whatsapp.com/send?phone=913341804333&text=Welcome%20to%20MyPustak%20-%20I%20need%20a%20help",
  //   icon: "",
  //   mobile: "d-none d-md-block",
  //   Image: whatsapp,
  // },
];




const rightnavComponent = [

  {
    key: 7,
    title: "Download App",
    url: "https://play.google.com/store/apps/details?id=com.mypustak",
    icon: "",
    mobile: "d-none d-md-block",
    Image: playstore,
  },
  {
    key: 8,
    title: "Chat with us",
    url: "https://api.whatsapp.com/send?phone=913341804333&text=Welcome%20to%20MyPustak%20-%20I%20need%20a%20help",
    icon: "",
    mobile: "d-none d-md-block",
    Image: whatsapp,
  },
];



const navComponentmob = [
  {
    key: 4,
    title: "Donate Books",
    url: "",
    icon: "",
    mobile: "",
    page: "donate-books",
    Image: DonateBookImage,
    activeUrl: ["/donate-books", "/donate-books/city", "/donate-books/DonationForm"]
  },
  {
    key: 5,
    title: "MyPustak Notebooks",
    url: "",
    icon: "",
    mobile: "",
    page: "mypustak-notebook?83846575",
    Image: note_book,
    activeUrl: ["/mypustak-notebook"]

  },

  {
    key: 2,
    title: "Free Books",
    page: "free-books?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
    icon: "",
    Image: freeBookImg,
    mobileOff: false,
    activeUrl: ["/free-books"]
  },
  {
    key: 3,
    title: "New Books",
    url: "",
    page: "get-books?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
    icon: "",
    mobile: "",
    mobile: "d-none d-md-block",
    Image: NewBookImage,
    activeUrl: ["/get-books"]
  },

  {
    key: 6,
    title: "Proud Donors",
    url: "",
    icon: "",
    mobile: "",
    page: "proud-donors",
    Image: ProudDonorImage,
    activeUrl: ["/proud-donors"]
  },
  // {
  //   key: 6,
  //   title: "IIT-JEE",
  //   url: "",
  //   icon: <IoBulbOutline />,
  //   mobile: "",
  //   page: "Onlinecourse",
  //   Image: IitJeeImage,
  // },
  {
    key: 7,
    title: "Download App",
    url: "https://play.google.com/store/apps/details?id=com.mypustak",
    icon: "",
    mobile: "d-none d-md-block",
    Image: playstore,
    activeUrl: []
  },
  {
    key: 8,
    title: "Chat with us",
    url: "https://api.whatsapp.com/send?phone=913341804333&text=Welcome%20to%20MyPustak%20-%20I%20need%20a%20help",
    icon: "",
    mobile: "d-none d-md-block",
    Image: whatsapp,
    activeUrl: []
  },
];

const navComponentmobile = [
  // {"key":1,"title":"All Categories","url":" ","icon":<FiMenu />},
  {
    key: 4,
    title: "Donate Books",
    url: "",
    icon: "",
    mobile: "",
    page: "donate-books",
    Image: DonateBookImage,
  },
  {
    key: 2,
    title: "Free Books",
    page: "free-books?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
    icon: "",
    Image: freeBookImg,
    mobileOff: false,
  },
  {
    key: 3,
    title: "New Books",
    url: "",
    page: "get-books?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
    icon: "",
    mobile: "",
    mobile: "d-none d-md-block",
    Image: NewBookImage,
  },

  {
    key: 5,
    title: "Proud Donors",
    url: "",
    icon: "",
    mobile: "",
    page: "proud-donors",
    Image: ProudDonorImage,
  },
  // {
  //   key: 6,
  //   title: "IIT-JEE",
  //   url: "",
  //   icon: <IoBulbOutline />,
  //   mobile: "",
  //   page: "Onlinecourse",
  //   Image: IitJeeImage,
  // },
  {
    key: 7,
    title: "Download App",
    url: "https://play.google.com/store/apps/details?id=com.mypustak",
    icon: "",
    mobile: "d-none d-md-block",
    Image: playstore,
  },
  {
    key: 8,
    title: "Chat with us",
    url: "https://api.whatsapp.com/send?phone=913341804333&text=Welcome%20to%20MyPustak%20-%20I%20need%20a%20help",
    icon: "",
    mobile: "d-none d-md-block",
    Image: whatsapp,
  },
];


function CategoryNavbar(props) {
  const [Windowpath, setWindowpath] = useState("");
  const [mouseDown, setmouseDown] = useState(null)
  const pathname =usePathname()
  const [showNavBar, setShowNavBar]=useState(true)
  useEffect(() => {
    const show = pathname.split("/").includes("pages")
    const checkout = pathname.split("/").includes("checkout")
    if (show || checkout) {
      setShowNavBar(false)
    }
  }, [])
  if (typeof window !== "undefined") {
    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search);
      // console.log(Router.asPath, "window.location.pathname");
      // setWindowpath(Router.asPath);
    }, [window.location.pathname]);
  }
  useEffect(() => {
    if (props.userComponentStatus == 2) {
      // props.updateCartlocalStorage();
      // props.fetch_wishlist_detail_otherpage();
    }
  });

  return (

    <>
      {
        showNavBar &&
         <div className="row shadow-sm mx-0 mb-3 px-sm-0 px-2 py-1" style={{ background: "white" }}>
          <MediaQuery minWidth={577}>
            <div className={styles.nav_parentmainDiv}  >

              <div className={styles.navmainDiv}>
                <CategoriesDrawer
                  drawer={props.drawer}
                  setdrawer={props.setdrawer}
                />

              </div>
              <div className={styles.navmainDiv} style={{}}  >

                {navComponent.map((data, index) => (
                  <Link
                    style={{ textDecoration: "none", borderBottom: data.activeUrl.includes(typeof window !== "undefined" ? window.location.pathname : "") ? "3px solid lightgray" : "" }}
                    href={data.url ? data.url : "/" + data.page}
                    // onClick={() => {

                    //   Router.push(data.url ? data.url : "/" + data.page)
                    // }} 
                    className={styles.map_div}
                    id={"nav" + index}
                    onMouseDown={() => {
                      setmouseDown(index);
                    }}
                    legacyBehavior>
                    <div style={{ cursor: "pointer" }}>

                      <div style={{ marginLeft: data.key == 5 ? "0.75rem" : null, display: "flex", alignItems: "flex-start", justifyContent: "center", }}>
                        <div
                          className={styles.imageDiv}
                        // style={{width:"3rem",height:"3rem",flex:2}}
                        >

                          <Image
                            width={15}
                            height={15}
                            // style={{borderRadius:"50%"}}
                            layout='responsive'
                            alt='whatsapp_icon'
                            src={data.Image}
                          />
                        </div>
                        {data.key == 5 ? <b className={styles.Newtext} style={{ fontSize: "0.5rem", color: 'red' }}>NEW</b> : null}

                      </div>

                      <span
                        className={styles.anchor_title}
                        // style={{textDecoration:"none",color:"#2248ae",fontSize:"0.9rem"}}
                        style={{ color: data.activeUrl.includes(typeof window !== "undefined" ? window.location.pathname : "") ? "#3870c8" : "" }}
                        legacyBehavior>
                        {data.title}
                      </span>
                    </div>

                  </Link>
                ))}
              </div>
              <div className={styles.navmainDiv} >
                {rightnavComponent.map((data, index) => (
                  <Link
                    href={data.url ? data.url : "/" + data.page}
                    // onClick={() => {
                    //   data.url
                    // }}
                    style={{ textDecoration: "none" }}
                    className={styles.map_div}
                    id={"nav" + index}
                    onMouseDown={() => {
                      setmouseDown(index);
                    }}
                    legacyBehavior>
                    <div style={{ cursor: "pointer" }}  >
                      <div
                        className={styles.imageDiv}
                        // style={{width:"3rem",height:"3rem",flex:2}}
                        style={{ margin: "auto" }}
                      >
                        <Image
                          width={15}
                          height={15}
                          // style={{borderRadius:"50%"}}
                          layout='responsive'
                          alt='whatsapp_icon'
                          src={data.Image}
                        />
                      </div>
                      <span
                        className={styles.anchor_title}
                      // style={{textDecoration:"none",color:"#2248ae",fontSize:"0.9rem"}}
                      >
                        {data.title}
                      </span>
                    </div>

                  </Link>
                ))}
              </div>


            </div>
          </MediaQuery>
          <MediaQuery maxWidth={576}>
            <div className={styles.navmainDiv}  >
              {navComponentmob.map((data, index) => (
                <Link
                  style={{ textDecoration: "none" }}
                  href={data.url ? data.url : "/" + data.page}
                  className={styles.map_div}
                  id={"nav" + index}
                  onMouseDown={() => {
                    setmouseDown(index);
                  }}
                  legacyBehavior>
                  <div style={{ cursor: "pointer" }}>

                    {/* {console.log(data, "4658468484")} */}
                    <div style={{ marginLeft: data.key == 5 ? "0.75rem" : null, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                      <div
                        className={styles.imageDiv}
                      // style={{width:"3rem",height:"3rem",flex:2}}
                      >
                        <Image
                          width={"100%"}
                          height={"100%"}
                          layout='responsive'
                          alt='whatsapp_icon'
                          src={data.Image}
                        />
                      </div>
                      {data.key == 5 ? <b className={styles.Newtext} style={{ fontSize: "0.5rem", color: 'red' }}>NEW</b> : null}

                    </div>

                    <span
                      className={styles.anchor_title}
                      style={{ color: data.activeUrl.includes(typeof window !== "undefined" ? window.location.pathname : "") ? "#3870c8" : "" }}
                    // style={{textDecoration:"none",color:"#2248ae",fontSize:"0.9rem"}}
                    >
                      {data.title}
                    </span>
                  </div>

                </Link>
              ))}
            </div>
          </MediaQuery>
        </div>
      }
      
      <style jsx>
        {`
          .scrollmenu {
            // color: #2258ae;
            color: red;
            overflow: auto;
            white-space: nowrap;
          }
          .catnavitems {
            color: #3e3d3d;
          }
          .catnavitems:hover {
            color: #2258ae;
          }
          #${"nav" + mouseDown}:active {
            animation: press 0.2s 1 linear;
          }
          @keyframes press {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(0.92);
            }
            to {
              transform: scale(1);
            }
          }
          .scrollmenu::-webkit-scrollbar {
            display: none;
          }

          .scrollmenu a {
            // display: inline-block;
            // color: #2258ae;
            text-align: center;
            padding: 9px 1.5rem;
            text-decoration: none;
          }

          div.scrollmenu a:hover {
            background-color: white;
          }
          @media screen and (max-width: 576px) {
            .scrollmenu a {
              color: #000;

              padding: 9px 0.3rem;
            }
            div.scrollmenu a:hover {
              background-color: transparent;
            }
          }
        `}
      </style>
    </>
  );
}

const mapStateToProps = state => {
  return {
    FromMycart: state.cartReduc.MyCart,
    userToken: state.accountR.token,
    getuserdetails: state.userdetailsR.getuserdetails,
    userComponentStatus: state.accountR.userComponentStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetch_wishlist_detail_otherpage: () =>
      dispatch(fetch_wishlist_detail_otherpage()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryNavbar);
// export default CategoryNavbar;
