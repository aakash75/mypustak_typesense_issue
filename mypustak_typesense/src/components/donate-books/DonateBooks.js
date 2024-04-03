"use client"
import { Button } from "@mui/material";
import Image from "next/legacy/image";
import React, { useRef } from "react";
import donors from "../../assets/donors.png";
import double_arr_scroll from "../../assets/double_arr_scroll.svg";
import styles from "../../styles/DonateBooks.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import donate_box from "../../assets/donate_box.png";
import donate_search_book from "../../assets/donate_search_book.png";
import { useRouter } from "next/navigation";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";

function DonateBooks(props) {
  const animatecard = useRef(null);
  const router = useRouter()
  console.log(props.donate_books);
  const gotodiv = () => {
    let scrollToY = 0;
    scrollToY = animatecard.current.offsetTop - 100;
    window.scrollTo(0, scrollToY);
  };
  return (
    <div className='container-fluid'>
      <div className='maindiv_landing  pt-1  '>
        <div className={` ${styles.donationTopRight}  `}>
          <div className={`${styles.donationTopleft} `}>
            <div className=' landing_upper  d-flex flex-column justify-content-center align-items-center'>
              <div className='Title '>
                <h5 className={`${styles.Headings}  donation_quote text-capitalize py-2 text text-center`}>
                  <b>
                    Giving Away Books Is Not Just About Making A Donation.
                    <br /> It Is About Making Difference
                  </b>
                </h5>
                <div className='text-center pb-3'>
                  <Button
                    onClick={e => {
                      e.preventDefault();
                      router.push(`/donate-books/city`);
                    }}
                    className='text-capitalize btn py-1 px-5 bg-color text-white border border-primary '
                    variant='contained'>
                    Donate Books
                  </Button>
                </div>
              </div>
              <div className='donor-image'>
                <Image 
                //   placeholder="blur"
                //  blurDataURL={donors}
                  src={donors} alt='donor_img' title="Donate Books" height={0}  width={0}/>
              </div>
              <div className='arrowdiv mt-3' onClick={gotodiv}>
                <Image
                  className={styles.arrow}
                  src={double_arr_scroll}
                  alt='arrow_img'
                  title="Donate Books"
                  height={0} width={0}
                />
              </div>
            </div>
          </div>
        </div>

        <div className=' middle-info ' id='animatecard' ref={animatecard}>
          {props.donate_books.map(data => (
            <div key={data.key}>
              <div
                className={` ${styles.Headings}  py-2 mb-3 text-center h5 text-white`}
                style={{ backgroundColor: "#2258AE" }}>
                {data.heading}
              </div>
              <div
                className='row my-3 text-center mx-2'
                style={{ fontSize: "0.7rem" }}>
                <div className='bg-white col-12 col-sm-6 col-lg-3 border border-gray align-center '>
                  <div
                    style={{
                      padding: "0.9rem",
                      display:"flex",
                      justifyContent:"center"
                    }}
                    >
                    <Image
                      src={data.image1}
                      height={0}
                      //   placeholder="blur"
                      // blurDataURL={data.image1}
                      className=""
                      width={0}
                      alt='do_img1'
                      
                      title={data.title1}
                    />
                  </div>
                  <div className={`${styles.textColor} ${styles.imgTitle}`}>{data.title1}</div>
                </div>
                <div className='bg-white col-12 col-sm-6 col-lg-3 border border-gray'>
                  <div
                    style={{
                      height: "13rem",
                      display: "flex",
                      justifyContent: "center"
                    }}>
                    <Image src={data.image2}
                      //   placeholder="blur"
                      // blurDataURL={data.image2}
                      height={0}
                      width={0}
                      alt='do_img2'
                      className=""
                      title={data.title2}
                    />
                  </div>
                  <div className={`${styles.textColor} ${styles.imgTitle}`}>{data.title2}</div>
                </div>
                <div className='bg-white col-12 col-sm-6 col-lg-3 border border-gray'>
                  <div
                    style={{
                      padding: "0.9rem",
                      display: "flex",
                      justifyContent: "center"
                    }}>
                    <Image
                      src={data.image3}
                      //   placeholder="blur"
                      // blurDataURL={data.image3}
                      height={0}
                      width={0}
                      alt='do_img3'
                      className=""
                      title={data.title3}
                    />
                  </div>
                  <div className={`${styles.textColor} ${styles.imgTitle}`}>{data.title3}</div>
                </div>
                <div className='bg-white col-12 col-sm-6 col-lg-3 border border-gray'>
                  <div
                    style={{
                      height: "13rem",
                      padding: "0.9rem",
                      display: "flex",
                      justifyContent: "center"
                    }}>
                    <Image
                      src={data.image4}
                      //   placeholder="blur"
                      // blurDataURL={data.image4}
                      height={180}
                      width={300}
                      alt='do_img4'
                      className=""
                      title={data.title4}

                    />
                  </div>
                  <div className={`${styles.textColor} ${styles.imgTitle}`}>{data.title4}</div>
                </div>
              </div>
              <div
                className={` ${styles.Headings} my-3 text-center  `}
                style={{ color: "#2258AE" }}>
                <b>{data.lowerHeading}</b>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='row'>
        <div className='col-12 col-lg-6 '>
          <div className={`bg-white ${styles.knowdiv} shadow-sm border border-gray mx-2`}>
            <div className='text-center  py-2'>
              <h5 className={`${styles.Headings} m-0`} style={{ color: "#343345" }}>
                <b>Why to donate?</b>
              </h5>
            </div>
            <hr className=' mx-auto my-0' />
            <div className=' px-sm-5 px-3 py-3 ' style={{ minHeight: "19rem" }} >
              <h6 className='text-center mt-1 mb-3'>
                <b>
                  &quot;Knowledge increases by sharing, but not saving&quot;
                </b>
              </h6>
              <p className={`para-color ${styles.whytoDonateArrowDiv} `}>
                <span>
                  <ArrowForwardIcon className='arrow-color' />
                </span>
                <span>
                  Books are uniquely portable magic that carries your attached feelings forward.
                </span>
              </p>
              <p className={`para-color ${styles.whytoDonateArrowDiv} `}>
                <span>
                  <ArrowForwardIcon className='arrow-color' />
                </span>
                <span>
                  Your books can help someone in the same way they did for you.
                </span>
              </p>
              <p className={`para-color ${styles.whytoDonateArrowDiv} `}>
                <span>
                  <ArrowForwardIcon className='arrow-color' />
                </span>
                <span>
                  We are committed to carrying your emotions with your
                  books and making them grow older!
                </span>
              </p>
              <p className={`para-color ${styles.whytoDonateArrowDiv} `}>
                <span>
                  <ArrowForwardIcon className='arrow-color' />
                </span>
                <span>
                  Let&apos;s become a cause for change & make a difference.
                </span>
              </p>
              <h6 className='text-center'>
                <b>Let&apos;s Educate Together & Rise Together!</b>
              </h6>
            </div>
            <div className='text-center  py-5 flex justify-center  '>
              <Image 
              //   placeholder="blur"
              //  blurDataURL={donate_box}
                src={donate_box} alt='box_img'
                title="Why to donate?"
              />
            </div>
          </div>
        </div>
        <div className='col-12 col-lg-6 '>
          <div className={`bg-white ${styles.knowdiv}  shadow-sm border border-gray mx-2`}>
            <div className='text-center  py-2'>
              <h5 className={` ${styles.Headings} m-0`} style={{ color: "#343345" }}>
                <b
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  Did You Know ?{" "}
                  <TipsAndUpdatesRoundedIcon style={{ color: "#FBB01E" }} />
                </b>
              </h5>{" "}
            </div>
            <hr className=' mx-auto my-0' />
            <div className='  px-sm-5 px-3 py-3 ' style={{ minHeight: "20rem" }}>
              <p className={`para-color ${styles.whytoDonateArrowDiv} `}>
                <span>
                  <ArrowForwardIcon className='arrow-color' />
                </span>
                <span>
                  By donating (30 books), you will help to reduce 85kg of carbon-footprint
                </span>
              </p>
              <p className={`para-color ${styles.whytoDonateArrowDiv} `}>
                <span>
                  <ArrowForwardIcon className='arrow-color' />
                </span>
                <span>
                  A ton of recycled paper saves 17 Trees
                </span>

              </p>
              <p className={`para-color ${styles.whytoDonateArrowDiv} `}>
                <span>
                  <ArrowForwardIcon className='arrow-color' />
                </span>
                <span>
                  In 1993, U.S. paper recovery saved more than 90,000,000 cubic yards of landfill space. It&apos;s our turn in India.
                </span>
              </p>
              <p className={`para-color ${styles.whytoDonateArrowDiv} `}>
                <span >
                  <ArrowForwardIcon className='arrow-color ' />
                </span>
                <span className="">
                  Some people cannot access books. They can get books at FREE OF COST anywhere across India.
                </span>
              </p>
            </div>
            <div className='text-center flex justify-center ' >
              <Image
                //   placeholder="blur" 
                // blurDataURL={donate_search_book}
                src={donate_search_book}
                width={300}
                height={240}
                alt='book_img'
                title="Did You Know ?"
              />
            </div>
          </div>
        </div>
      </div>

      <div className='text-center   my-4'>
        <Button
          onClick={e => {
            e.preventDefault();
            router.push(`/donate-books/city`);
          }}
          style={{ minWidth: "23rem" }}
          className=' mb-5 text-capitalize btn py-2  bg-color  text-white border border-primary '
          variant='contained'>
          Donate Your Loved Books
        </Button>
      </div>

      <style jsx>{`

      `}</style>
    </div>
  );
}

export default DonateBooks;
