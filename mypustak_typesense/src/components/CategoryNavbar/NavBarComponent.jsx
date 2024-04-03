import React from "react";
import styles from "../../styles/CategoryNavbar.module.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import note_book from "../../assets/notebook_icon.jpeg";
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
import PreLoved from "../../assets/PreLoved.svg";

import { fetch_wishlist_detail_otherpage } from "../../redux/actions/loginactions";
import Link from "next/link";

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
    activeUrl: [
      "/donate-books",
      "/donate-books/city",
      "/donate-books/DonationForm",
    ],
  },
  {
    key: 9,
    title: "Pre - Loved Books",
    url: "",
    icon: "",
    mobile: "",
    page: "pre-loved-books",
    // Image: proud_donor_copy_37_kb,
    Image: PreLoved,
    activeUrl: ["/pre-loved-books"],
  },

  {
    key: 2,
    title: "Free Books",
    page: "free-books?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
    icon: "",
    Image: freeBookImg,
    mobileOff: false,
    activeUrl: ["/free-books"],
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
    activeUrl: ["/get-books"],
  },
  {
    key: 5,
    title: "MyPustak Notebooks",
    url: "",
    icon: "",
    mobile: "",
    page: "mypustak-notebook?83846575",
    Image: note_book,
    activeUrl: ["/mypustak-notebook"],
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
    activeUrl: ["/proud-donors"],
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

// const leftnavComponent = [

//   {"key":1,"title":"All Categories","url":" ","icon":<FiMenu />},

// ];

const rightnavComponent = [
  {
    key: 7,
    title: "Download App",
    seo_title: "Download MyPustak App ",
    url: "https://play.google.com/store/apps/details?id=com.mypustak",
    icon: "",
    mobile: "d-none d-md-block",
    Image: playstore,
  },
  {
    key: 8,
    title: "Chat with us",
    seo_title: "MyPustak WhatsApp Support",
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
    activeUrl: [
      "/donate-books",
      "/donate-books/city",
      "/donate-books/DonationForm",
    ],
  },
  {
    key: 9,
    title: "Pre - Loved Books",
    url: "",
    icon: "",
    mobile: "",
    page: "pre-loved-books",
    // Image: proud_donor_copy_37_kb,
    Image: PreLoved,
    activeUrl: ["/pre-loved-books"],
  },

  {
    key: 2,
    title: "Free Books",
    page: "free-books?&sortBy=mp_books_v3/sort/num_is_out_of_stack:asc,i_date:desc&author=&publication=&binding=&language=&book_condition=&aged_group=",
    icon: "",
    Image: freeBookImg,
    mobileOff: false,
    activeUrl: ["/free-books"],
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
    activeUrl: ["/get-books"],
  },
  {
    key: 5,
    title: "MyPustak Notebooks",
    url: "",
    icon: "",
    mobile: "",
    page: "mypustak-notebook?83846575",
    Image: note_book,
    activeUrl: ["/mypustak-notebook"],
  },

  {
    key: 6,
    title: "Proud Donors",
    url: "",
    icon: "",
    mobile: "",
    page: "proud-donors",
    Image: ProudDonorImage,
    activeUrl: ["/proud-donors"],
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
    activeUrl: [],
  },
  {
    key: 8,
    title: "Chat with us",
    url: "https://api.whatsapp.com/send?phone=913341804333&text=Welcome%20to%20MyPustak%20-%20I%20need%20a%20help",
    icon: "",
    mobile: "d-none d-md-block",
    Image: whatsapp,
    activeUrl: [],
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
const NavBarComponent = () => {
  const [mouseDown, setmouseDown] = useState(null);
  const pathname = usePathname();
  return (
    <div>
      <div className="d-flex d-sm-none overflow-x-scroll max-w-screen-sm ">
        <div className={styles.navmainDiv}>
          {navComponentmob.map((data, index) => (
            <Link
              key={index}
              style={{ textDecoration: "none" }}
              href={data.url ? data.url : "/" + data.page}
              className={styles.map_div}
              id={"nav" + index}
              onMouseDown={() => {
                setmouseDown(index);
              }}
              // legacyBehavior
            >
              <div style={{ cursor: "pointer" }}>
                {/* {console.log(data, "4658468484")} */}
                <div
                  style={{
                    marginLeft: data.key == 5 ? "0.75rem" : null,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className={styles.imageDiv}
                    // style={{width:"3rem",height:"3rem",flex:2}}
                  >
                    <Image
                      width={"100%"}
                      height={"100%"}
                      layout="responsive"
                      alt="whatsapp_icon"
                      src={data.Image}
                    />
                  </div>
                  {data.key == 5 ? (
                    <b
                      className={styles.Newtext}
                      style={{ fontSize: "0.5rem", color: "red" }}
                    >
                      NEW
                    </b>
                  ) : null}
                </div>

                <span
                  className={styles.anchor_title}
                  style={{
                    color: data.activeUrl.includes(
                      typeof window !== "undefined"
                        ? window.location.pathname
                        : ""
                    )
                      ? "#3870c8"
                      : "",
                  }}
                  // style={{textDecoration:"none",color:"#2248ae",fontSize:"0.9rem"}}
                >
                  {data.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="d-none d-sm-flex   ">
        <div className={styles.navmainDiv} style={{}}>
          {navComponent.map((data, index) => (
            <Link
              key={index}
              style={{
                textDecoration: "none",
                borderBottom: data.activeUrl.includes(
                  typeof window !== "undefined" ? window.location.pathname : ""
                )
                  ? "3px solid lightgray"
                  : "",
              }}
              href={data.url ? data.url : "/" + data.page}
              // onClick={() => {

              //   Router.push(data.url ? data.url : "/" + data.page)
              // }}
              className={styles.map_div}
              id={"nav" + index}
              onMouseDown={() => {
                setmouseDown(index);
              }}
              // legacyBehavior
            >
              <div style={{ cursor: "pointer" }}>
                <div
                  style={{
                    marginLeft: data.key == 9 ? "1.5rem" : null,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className={styles.imageDiv}
                    // style={{width:"3rem",height:"3rem",flex:2}}
                  >
                    <Image
                      width={15}
                      height={15}
                      // style={{borderRadius:"50%"}}
                      layout="responsive"
                      alt="whatsapp_icon"
                      src={data.Image}
                    />
                  </div>
                  {/* {data.key == 5 ? <b className={styles.Newtext} style={{ fontSize: "0.5rem", color: 'red' }}>NEW</b> : null} */}
                  {data.key == 9 ? (
                    <b
                      className={styles.Newtext}
                      style={{ fontSize: "0.6rem", color: "#2248ae" }}
                    >
                      Best Deals
                    </b>
                  ) : null}
                </div>

                <span
                  className={styles.anchor_title}
                  // style={{textDecoration:"none",color:"#2248ae",fontSize:"0.9rem"}}
                  style={{
                    color: data.activeUrl.includes(
                      typeof window !== "undefined"
                        ? window.location.pathname
                        : ""
                    )
                      ? "#3870c8"
                      : "",
                  }}
                  // legacyBehavior
                >
                  {data.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBarComponent;
