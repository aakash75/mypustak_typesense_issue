"use client"
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import HelpIcon from "@mui/icons-material/Help";
import dynamic from "next/dynamic";
import StarIcon from '@mui/icons-material/Star';
import Person2Icon from '@mui/icons-material/Person2';
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import MediaQuery from "react-responsive";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { setNewPricing, get_instock_book, get_book_review_product, check_if_ordered } from "../../../../redux/actions/productAction";
import usedbook_img from "../../../../assets/usedbook.svg";
import Popup from "reactjs-popup";
import { loga } from 'gender-detection/genders/male'
import React, { PureComponent } from 'react'

import { url } from '../../../../helper/api_url';
import styles from "../../../../styles/Product.module.css";
import Image from "next/legacy/image";
import Link from "next/link";
import { Button } from "@mui/material";
import RatingGraph from "../../../../components/userReview/RatingGraph";
import { Skeleton } from '@mui/material';
function SkeletonMobile() {
    return (
        <div>
            <Skeleton variant="rectangular" animation="wave" width={"90%"} height={"8.277rem"} style={{ margin: "1rem" }} />
            <Skeleton variant="rectangular" animation="wave" width={"95%"} height={"5.277rem"} style={{ margin: "0.5rem" }} />
            <Skeleton variant="rectangular" animation="wave" width={"95%"} height={"5.277rem"} style={{ margin: "0.5rem" }} />
            <Skeleton variant="rectangular" animation="wave" width={"95%"} height={"5.277rem"} style={{ margin: "0.5rem" }} />
            <Skeleton variant="rectangular" animation="wave" width={"95%"} height={"5.277rem"} style={{ margin: "0.5rem" }} />
        </div>
    )
}
function SkeletonWeb() {
    return (
        <div style={{ display: "flex", gap: "0.5rem", padding: "2rem" }}>
            <Skeleton variant="rectangular" animation="wave" width={"40%"} height={"75vh"} style={{}} />
            <Skeleton variant="rectangular" animation="wave" width={"55%"} height={"100vh"} style={{}} />
        </div>
    )
}
// export async function getServerSideProps({
//     res,
//     req,
//     query,
//     store,
//     isServer,
//     resolvedUrl,
// }) {
//     let queryString = resolvedUrl.split("?")[0];
//     let bookid = Object.keys(query)[0];
//     let url_query_arr = [];
//     url_query_arr.push(queryString);
//     url_query_arr.push(bookid);
//     let url_query;
//     if (url_query_arr.length > 1) {
//         url_query = url_query_arr[1];
//     } else {
//         url_query = url_query_arr[0];
//     }
//     let book_id, tb_no;
//     if (url_query_arr.length > 1) {
//         if (url_query.indexOf("&") > 0) {
//             book_id = url_query.split("&")[0];
//             tb_no = url_query.split("&")[1].split("=")[1];
//         } else {
//             book_id = url_query;
//             tb_no = 0;
//         }
//     } else {
//         book_id = query.slug;
//         tb_no = 1;
//     }
//     let slug = query.slug;
//     if (book_id) {
//         slug = book_id.replace("?", "");
//     }
//     let result = await // this.props.getBook()
//         fetch(`${url}/api/v1/get/product/v2/new/${slug}/${tb_no}`);
//     console.log(result, "result.....");
//     console.log(result.status, "result1.....");
//     let response = null
//     if (result.status == 200) {
//         response = await result.json();
//     }
//     let NewResponce = null
//     if (response) {
//         NewResponce = response.books_details
//     }
//     let review = await fetch(`${url}/api/v2/bookreview/fetch_book_review_by_product/${slug}/${0}`);
//     let reviewResult = await review.json();
//     let dataa = []
//     let countt = {}
//     if (reviewResult) {
//         dataa = reviewResult.data
//         countt = reviewResult.counts
//     }
//     return {
//         props: {
//             review_data: dataa,
//             review_counts: countt,
//             book: NewResponce,
//         },
//     };
// }
class UserAllReview extends PureComponent {
    state = {
        bookId: "",
        // review_data: [],
        // review_counts: {},
    }
    async componentDidMount() {
        let book_id = window.location.search.replace("?", "")
        this.setState({ bookId: book_id })
        console.log(this.props.book, "book................");
    }
    redirectProductPage = (slug) => {
        window.location.replace(`/product/${this.props.book.slug}?${this.state.bookId}`)
    }
    render() {
        const { review_counts, review_data } = this.props
        return (
            <div>
                <MediaQuery minWidth={576}>
                    {this.props.book && review_counts && review_data ?
                        <div className={`${styles.main_outterdiv}`}>
                            <div className={`${styles.product_topdiv}`}>
                                <div className={`${styles.product_maindiv}`}>
                                    {/* ------------------product Left div ----------------------- */}
                                    <div
                                        style={{ borderRight: "0px" }}
                                        className={`${styles.product_Left} col-lg-4 col-md-4 col-sm-5 col-block`}>
                                        <div
                                            className={`${this.state.sticky_div == "product_img_sticky"
                                                ? styles.product_img_sticky
                                                : styles.product_img_normal
                                                }`}>
                                            <div className={`${styles.left_div_parent}`}>
                                                <div className={`${styles.product_Left_innerdiv}`}>
                                                    <div className={`${styles.product_Left_imgthumb} col-2`}>
                                                        <div
                                                            className={`${styles.product_img_single_div} `}
                                                            style={{}}>
                                                            <div>
                                                                {this.state.falseImgDiv
                                                                    ? this.state.error_url_object.id == srcobj.id
                                                                        ? "match"
                                                                        : null
                                                                    : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={` ${styles.product_Left_image_div} row col-9 col-sm-9 col-md-9 col-lg-9 `}>
                                                        <div
                                                            className={`${styles.main_image_div} col text-center`}>
                                                            <div className=' '>
                                                                {this.props.book ?
                                                                    <Image
                                                                        alt='product '
                                                                        width={280}
                                                                        height={350}
                                                                        src={`https://d1f2zer3rm8sjv.cloudfront.net/${this.props.book.image}`}
                                                                        priority
                                                                        style={{ cursor: "pointer" }}
                                                                        onError={() => {
                                                                            this.setState({
                                                                                onerror: true,
                                                                            });
                                                                        }}
                                                                        onClick={this.redirectProductPage}
                                                                    /> : null}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`${styles.share_btn_div} col-12 col-sm-3 col-md-3 col-lg-3 `}>
                                                            {" "}
                                                            <div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='product_right_title_price p-2 '>
                                                    <div
                                                        className={`${styles.product_right_title_price_inner}   `}>
                                                        {this.props.book ?
                                                            <h6 onClick={this.redirectProductPage} className={`${styles.product_title_inner}`} style={{ cursor: "pointer" }}>
                                                                {this.props.book.title.replace(
                                                                    /(\w)(\w*)/g,
                                                                    (_, firstChar, rest) =>
                                                                        firstChar.toUpperCase() + rest.toLowerCase()
                                                                )}{" "}
                                                                <span className={`${styles.languageBindingFont}`}>
                                                                    {" "}
                                                                    ({this.props.book.language},{this.props.book.binding})
                                                                </span>
                                                            </h6> : null}
                                                        <div
                                                            style={{ fontSize: "0.8rem", display: "flex" }}
                                                            className='mb-3 '>
                                                            {this.props.book ?
                                                                <span>
                                                                    {this.props.book.author == "NA" ? null : (
                                                                        <span>
                                                                            By{" "}
                                                                            <Link
                                                                                href='/author/[author_name]'
                                                                                as={
                                                                                    `/author/books-` +
                                                                                    this.props.book.author.split(" ").join("-")
                                                                                }
                                                                                className='text-primary'
                                                                                legacyBehavior>
                                                                                {this.props.book.author.replace(
                                                                                    /(\w)(\w*)/g,
                                                                                    (_, firstChar, rest) =>
                                                                                        firstChar.toUpperCase() + rest.toLowerCase()
                                                                                )}
                                                                            </Link>{" "}
                                                                            (Author) &nbsp;{" "}
                                                                        </span>
                                                                    )}
                                                                </span> : null}
                                                            <div className={`${styles.product_assured} `}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.product_right}  col-lg-8 col-md-8 col-sm-7 col-block`}>
                                        <div
                                            className='product_right_inner '
                                            style={{ marginBottom: "0rem" }}>
                                            <div className='product_right_title_price p-2 ' style={{ border: "1px solid lightgray", borderBottom: "0px" }} >
                                                <div
                                                    className={`${styles.product_right_title_price_inner}   `}>
                                                    {this.props.book ? <h6 onClick={this.redirectProductPage} className={`${styles.product_title_inner}`} style={{ cursor: "pointer", fontSize: "1.4rem" }} >
                                                        {this.props.book.title.replace(
                                                            /(\w)(\w*)/g,
                                                            (_, firstChar, rest) =>
                                                                firstChar.toUpperCase() + rest.toLowerCase()
                                                        )}{" "}
                                                        <span className={`${styles.languageBindingFont}`}>
                                                            {" "}
                                                            ({this.props.book.language},{this.props.book.binding})
                                                        </span>
                                                    </h6> : null}
                                                    <div
                                                        style={{ fontSize: "0.8rem", display: "flex" }}
                                                        className='mb-3 '>
                                                    </div>
                                                    <div
                                                        className={`${styles.product_title_price} d-flex justify-content-start  align-items-center`}>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Book Review Start*/}
                                            <div className={``}>
                                                <div className={`${styles.book_review_div}`} style={{ marginTop: "0px" }}>
                                                    {Object.keys(review_counts).length == 0 || review_counts.total_count == 0 ? <SkeletonMobile />
                                                        :
                                                        <div className="p-2">
                                                            <RatingGraph
                                                                five_rating={review_counts.total_five}
                                                                four_rating={review_counts.total_four}
                                                                three_rating={review_counts.total_three}
                                                                two_rating={review_counts.total_two}
                                                                one_rating={review_counts.total_one}
                                                                total_rating={review_counts.total_count}
                                                                total_reviews={review_counts.total_review_count}
                                                            />
                                                            <div style={{ borderTop: "1px solid #ddd" }}>
                                                                {review_data.length > 0 ?
                                                                    review_data.map(review => {
                                                                        console.log(review, "get_book_review_product")
                                                                        return (
                                                                            review.status == 1 && (review.description != "" || review.review_title != "") ?
                                                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", borderBottom: "1px solid lightgray", paddingBottom: "0.3rem" }}>
                                                                                    <div>
                                                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                                                                                <span style={{ display: "flex", alignItems: "center", fontSize: "0.75rem", backgroundColor: review.rating >= 3 ? "green" : review.rating == 2 ? "orange" : "red", color: "#fff", padding: "0.2rem 0.5rem", borderRadius: "10px" }}>{review.rating} <StarIcon color="#fff" fontSize="15" /></span>
                                                                                                <span style={{ fontSize: '0.9rem' }}>{review.review_title}</span>
                                                                                            </div>
                                                                                            <span style={{ fontSize: '0.9rem' }}>{review.description}</span>
                                                                                        </div>
                                                                                        <span style={{ fontSize: '0.8rem', color: "#999" }}><Person2Icon style={{ fontSize: "1.1rem" }} />&nbsp;{review.name}</span>
                                                                                        <div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div> : <SkeletonMobile />
                                                                        )
                                                                    }) : <div>
                                                                        <SkeletonMobile />
                                                                    </div>}
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : <SkeletonWeb />
                    }
                </MediaQuery>
                <MediaQuery maxWidth={575}>
                    <div className={``}>
                        {Object.keys(review_counts).length == 0 || review_counts.total_count == 0 ? <SkeletonMobile />
                            :
                            <div >
                                <div className={`${styles.book_review_div}`}>
                                    <div className="p-2">
                                        <RatingGraph
                                            five_rating={review_counts.total_five}
                                            four_rating={review_counts.total_four}
                                            three_rating={review_counts.total_three}
                                            two_rating={review_counts.total_two}
                                            one_rating={review_counts.total_one}
                                            total_rating={review_counts.total_count}
                                            total_reviews={review_counts.total_review_count}
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.book_review_div} p-2 `} >
                                    {review_data.length > 0 ?
                                        review_data.map(review => {
                                            return (
                                                review.status == 1 && (review.description != "" || review.review_title != "") ?
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", borderBottom: "1px solid lightgray", paddingBottom: "0.3rem" }}>
                                                        <div>
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                                                    <span style={{ display: "flex", alignItems: "center", fontSize: "0.75rem", backgroundColor: review.rating >= 3 ? "green" : review.rating == 2 ? "orange" : "red", color: "#fff", padding: "0.2rem 0.5rem", borderRadius: "10px" }}>{review.rating} <StarIcon color="#fff" fontSize="15" /></span>
                                                                    <span style={{ fontSize: '0.9rem' }}>{review.review_title}</span>
                                                                </div>
                                                                <span style={{ fontSize: '0.9rem' }}>{review.description}</span>
                                                            </div>
                                                            <span style={{ fontSize: '0.8rem', color: "#999" }}><Person2Icon style={{ fontSize: "1.1rem" }} />&nbsp;{review.name}</span>
                                                            <div>
                                                            </div>
                                                        </div>
                                                    </div> : <SkeletonMobile />
                                            )
                                        }) : <SkeletonMobile />}
                                </div>
                            </div>
                        }
                    </div>
                </MediaQuery >
            </div >
        );
    }
}
// export default UserAllReview
const mapStateToProps = state => ({
    review_by_book: state.productReducer.review_by_book,
});
export default connect(mapStateToProps, {
    get_book_review_product,
})(withSnackbar(UserAllReview));