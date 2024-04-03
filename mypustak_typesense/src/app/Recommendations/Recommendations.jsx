
import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import dynamic from 'next/dynamic';
import { parse } from 'cookie';
import { url } from "../helper/api_url";
import BookCardSkeleton from "../components/bookcard/BookCardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
const BookCard = dynamic(() => import("../components/bookcard/RecommendBookold"), { ssr: false });
const NextBreadcrumbs = dynamic(() => import("../components/Breadcrumbs/NextBreadcrumbs"), {
    ssr: false,
});
import Recommended from "../components/homepage/Recommended";
import AddToCartSnack from "../components/bookcard/AddToCartSnack";
export async function getServerSideProps({
    res,
    req,
    query,
    store,
    isServer,
    resolvedUrl,
}) {
    // let queryString = resolvedUrl.split("?")[0];
    let recommendationsTitle = Object.keys(query)[0];
    const getCookiesId = (userid) => {
        const cookies = req.headers.cookie || '';
        const parsedCookies = parse(cookies);
        let cookie_name = "unbxd." + userid
        const myCookieValue = parsedCookies[cookie_name] || '';
        return myCookieValue
    }
    let unbxd_body = {
        uid: getCookiesId("userId"),
        page_type: "HOME",
    }
    const unbxd_rec = await fetch(`${url}/api/v1/unbox/unbxd_recs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(unbxd_body)
    })
    let unbxd_recommendations = []
    if (unbxd_rec.status == 200) {
        let unbxd_rec_data = await unbxd_rec.json()
        unbxd_recommendations = unbxd_rec_data?.message?.response?.widgets
        // if (new_recommendations.lenght) {
        //     new_recommendations.map((rec) => {
        //         console.log(recommendationsTitle, "==", rec.widgetTitle);
        //         if (rec.widgetTitle == recommendationsTitle) {
        //             unbxd_recommendations = rec.recommendations
        //         }
        //     })
        // }
        // console.log(unbxd_recommendations, "unbxd_rec_data....")
    } else {
        console.log("error while fetching unbxd recommendations=---------------------------------------")
    }

    return {
        props: { Title: recommendationsTitle, recommendedBooks: unbxd_recommendations, }
    };
}
class Recommendations extends Component {
    state = {
        recommendedBooks: [],
        othersrecommendedBooks: []
    };
    componentDidMount() {
        console.log(this.props.Title, this.props.recommendedBooks, "44444")
        let others = []
        if (this.props.recommendedBooks.length) {
            this.props.recommendedBooks.map((rec) => {
                if (rec.widgetTitle.trim() == this.props.Title.trim()) {
                    console.log(rec.recommendations, "555");
                    this.setState({ recommendedBooks: rec.recommendations })
                } else {
                    others.push(rec)
                }
            })
        }
        this.setState({ othersrecommendedBooks: others })
    }


    render() {

        return (
            <div>
                <div style={{}} className="mb-2">
                    <NextBreadcrumbs />
                </div>
                <div className="mx-2">
                    <div
                        style={{
                            overflowX: "hidden",
                            minWidth: "100%",
                            borderLeft: "1px solid #ddd",
                            borderRight: "1px solid #ddd",
                        }}
                        className='row g-0'>
                        {this.state.recommendedBooks.map((book) => {
                            let newBook = {
                                ...book,
                                cashback_per: book.cashbackPercent,
                                discount_per: book.discountPercent,
                            };
                            delete newBook.cashbackPercent;
                            delete newBook.discountPercent;
                            return (
                                <div key={book.book_id} className='col-6 col-sm-4 col-md-3 col-lg-2'>
                                    <BookCard
                                        book={newBook}
                                        Booktitle={book.title}
                                        price={book.price}
                                        categories={
                                            book.author != "na" ? book.author : book.publication
                                        }
                                        image={book.imageUrl[0]}
                                    /></div>)
                        })}
                    </div>

                </div>
                {/* <InfiniteScroll
                    // next={() => fetchBooks()}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                    dataLength={3}
                    scrollThreshold='20%'
                    hasMore={false}
                    loader={
                        <div>
                            {false ? (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}>
                                    <div className='row g-0'>
                                        <div className='col-6 col-sm-12 col-md-6 col-lg-2'>
                                            <BookCardSkeleton />
                                        </div>
                                        <div className='col-6 col-sm-12 col-md-6 col-lg-2'>
                                            <BookCardSkeleton />
                                        </div>
                                        <div className='col-6 col-sm-12 col-md-6 col-lg-2'>
                                            <BookCardSkeleton />
                                        </div>

                                        <div className='col-6 col-sm-12 col-md-6 col-lg-2'>
                                            <BookCardSkeleton />
                                        </div>
                                        <div className='col-6 col-sm-12 col-md-6 col-lg-2'>
                                            <BookCardSkeleton />
                                        </div>
                                        <div className='col-6 col-sm-12 col-md-6 col-lg-2'>
                                            <BookCardSkeleton />
                                        </div>
                                    </div>
                                    <i className='p' style={{}}>
                                        Hang on! Loading content
                                    </i>
                                </div>
                            ) : null}
                        </div>
                    }>{console.log(this.state.othersrecommendedBooks, "22222")}
                    {this.state.othersrecommendedBooks.map((d, i) => (
                        <div
                            key={i}
                            style={{ marginTop: d.recommendations.length ? "1rem" : "0", width: "98%" }}
                            className='mx-lg-2'>
                            {d.recommendations.length ?
                                <Recommended
                                    value={d.recommendations}
                                    title={d.widgetTitle}
                                    redirection={d.widgetTitle}
                                    attribute={d.widgetPlacementId}
                                /> : null}
                        </div>
                    ))}
                    <AddToCartSnack />
                </InfiniteScroll> */}
            </div>)
    }
}
const mapStateToProps = state => ({

});
export default connect(mapStateToProps, {

})(withSnackbar(Recommendations));
