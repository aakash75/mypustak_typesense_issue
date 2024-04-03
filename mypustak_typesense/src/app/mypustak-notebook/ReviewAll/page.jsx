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
import { setNewPricing, get_instock_book, get_book_review_product, check_if_ordered } from "../../../redux/actions/productAction";
import usedbook_img from "../../../assets/usedbook.svg";
import { loga } from 'gender-detection/genders/male'
import React, { PureComponent } from 'react'
import { url } from '../../../helper/api_url';
import styles from "../../../styles/Product.module.css";
import Image from "next/legacy/image";
import Link from "next/link";
import { Button } from "@mui/material";
import RatingGraph from "../../../components/userReview/RatingGraph";
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

//     console.log(
//         req.url,
//         "###################################Test############################",
//         resolvedUrl
//     );

//     const seo_url = "https://www.mypustak.com/mypustak-notebook"
//     console.log(seo_url, "seo_url/*/*/*/*")
//     const seobody = {
//         url: seo_url
//     };
//     const seo_res = await fetch(`https://api.mypustak.com/api/v1/seo_tags/seo-data`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(seobody)

//     })
//     const seo_data = await seo_res.json()
//     console.log(seo_data, "seo_data")

//     let title_tag = ""
//     let meta_description = ""
//     if (seo_data.title_tag) {
//         title_tag = seo_data.title_tag
//         meta_description = seo_data.meta_desc

//     }
//     else {
//         title_tag = 'Mypustak Notebook books online |used books online India !'
//         meta_description = 'Only online free books used bookstore . Delivering in all pincodes in India. Providing fast delivery. 100% Quality assured. Engineering, medical, government jobs, novels, olympiad, school, children, university and many more books available.'
//     }
//     if (seo_data.redirect_url) {

//         console.log(seo_data.redirect_url, "seo_data.redirect_url")
//         res.setHeader("Location", seo_data.redirect_url);
//         res.statusCode = 301;
//         res.end();
//     }
//     let schema_markup = null;
//     if (seo_data.schema_markup) {
//         schema_markup = seo_data.schema_markup
//     }
//     // console.log(Object.keys(query)[1],"serverside query");
//     let product_id = Object.keys(query)[0]
//     console.log(product_id, "product_id");
//     if (product_id) {
//         console.log("product id")
//     }
//     else {
//         product_id = 83846575
//     }
//     // let order_id = Object.keys(query)[0]
//     // const user_data = JSON.parse(localStorage.getItem("user_info"));

//     // let user_id = user_data.id
//     let result = await fetch(
//         `${url}/api/v2/notebook/fetch_notebook/${product_id}`
//     );
//     let response = await result.json();
//     // this.setState({
//     //   save_review_book:response.books_details
//     // })
//     let note_book_details = response.data
//     console.log(note_book_details.images, "notebook_data");
//     let quantity_arr = []
//     quantity_arr[0] = response.data.min_order_qty
//     quantity_arr[1] = response.data.min_order_qty + (response.data.qty_group_by * 1)
//     quantity_arr[2] = response.data.min_order_qty + (response.data.qty_group_by * 2)
//     quantity_arr[3] = response.data.min_order_qty + (response.data.qty_group_by * 3)
//     quantity_arr[4] = response.data.min_order_qty + (response.data.qty_group_by * 4)
//     quantity_arr[5] = response.data.min_order_qty + (response.data.qty_group_by * 5)

//     let discount_percent = 0
//     note_book_details.qty_discount.map(discount => {
//         if (response.data.min_order_qty >= discount.min_qty && response.data.min_order_qty <= discount.max_qty) {
//             discount_percent = discount.discount_percent
//         }
//     })
//     let review = await fetch(`${url}/api/v2/bookreview/fetch_book_review_by_product/${product_id}/${0}`);
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
//             book: note_book_details,
//         },
//     };
//     // return {
//     //     props: {
//     //         title_tag, meta_description,
//     //         og_url: 'https://www.mypustak.com/free-books',
//     //         note_book_details: note_book_details,
//     //         quantity_arr: quantity_arr,
//     //         discount_percent: discount_percent,
//     //     },
//     // };
// }
class Page extends PureComponent {
    state = {
        bookId: "",
        onerror: false,
        ImagSrc: this.props.book?.images[0]
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
    setImgsrc = srcobj => {
        this.setState({ ImagSrc: srcobj });
    };
    render() {
        const { review_counts, review_data } = this.props
        return (
            <div>
                {/* <MediaQuery minWidth={576}> */}
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
                                                <div className={`${styles.product_Left_imgthumb} col-3`}>
                                                    {this.props.book.images.map((srcobj, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className={`${styles.product_img_single_div} `}
                                                                style={{}}>
                                                                <img
                                                                    alt=''
                                                                    onMouseEnter={() => this.setImgsrc(srcobj)}
                                                                    key={srcobj.id}
                                                                    className={`${styles.image_thumb}`}
                                                                    style={{
                                                                        padding: "5px",
                                                                        borderRadius: "5px",
                                                                        border:
                                                                            srcobj == this.state.ImagSrc
                                                                                ? "2px solid #2157AD"
                                                                                : null,
                                                                    }}
                                                                    src={`https://mypustak-6.s3.amazonaws.com/books/${srcobj.media_url}?${Date.now()}`}
                                                                    onError={i => (i.target.style.display = "none")}
                                                                />
                                                                <div>
                                                                    {this.state.falseImgDiv
                                                                        ? this.state.error_url_object.id == srcobj.id
                                                                            ? "match"
                                                                            : null
                                                                        : null}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div
                                                    className={` ${styles.product_Left_image_div} row col-9 col-sm-9 col-md-9 col-lg-9   `}>
                                                    <div
                                                        className={`${styles.main_image_div} col text-center`}>
                                                        <div className=' '>
                                                            {this.props.book ?
                                                                <Image
                                                                    alt='product '
                                                                    width={280}
                                                                    height={350}
                                                                    src={this.state.onerror
                                                                        ? "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png" : `https://mypustak-6.s3.amazonaws.com/books/${this.state.ImagSrc.media_url}?${Date.now()}`}
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
                                                    {/* <div
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
                                                                                className='text-primary'>
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
                                                        </div> */}
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
                {/* </MediaQuery> */}
                {/* <MediaQuery maxWidth={575}>
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
                </MediaQuery > */}
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
})(withSnackbar(Page));