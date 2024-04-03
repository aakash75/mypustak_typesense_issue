import { Button, Link, Skeleton } from '@mui/material'
import Image from "next/legacy/image"
import React from 'react'

function OrderedBooks(props) {

    console.log(props.ordered_books)
    return (
        <div className=''>
            {props.ordered_books.length ?
                props.ordered_books.length > 5 ?
                    <>                    <div className='bg-white'>
                        {props.ordered_books.slice(0, 5).map((data, index) => {
                            return (
                                <div key={index} className='row border border-gray shadow-sm d-flex justify-content-between ' style={{ margin: "0px", padding: "0px", marginBottom: "0.3rem" }}>
                                    <div className='col-12 col-lg-8 ' style={{ marginBottom: "1rem", }}>
                                        <div className='row'>


                                            <div
                                                // style={{ marginTop: '0.4rem', border: "2px solid red", width: "8.313rem", height: "7.838rem" }}
                                                className='col-4 col-md-2  col-sm-2 col-lg-2 pt-3 text-center pr-3  '>
                                                {/* <Image src={data.thumb} /> */}
                                                {/* <img alt='' style={{ width: '100%', height: '100%' }} src={`https://mypustak-6.s3.amazonaws.com/books/${data.thumb}`} /> */}
                                                <Image alt='' height={90} width={75} src={`https://d1f2zer3rm8sjv.cloudfront.net/${data.thumb}`} />
                                            </div>
                                            <div className='col-8 col-lg-8 ' style={{ fontSize: "0.9rem" }}>
                                                <div className='pt-3 text-capitalize' style={{ marginBottom: "0.5rem" }}>{data.title.replace(
                                                    /(\w)(\w*)/g,
                                                    (_, firstChar, rest) =>
                                                        firstChar.toUpperCase() + rest.toLowerCase()
                                                )}</div>
                                                <div className='p' style={{}}>Total Amount : <b style={{ color: "#098041" }}>₹{data.new_price +parseInt(data.deiveryCost) + parseInt(data.min_order_charge)} +parseInt(data.cod_charge) -parseInt(data.cod_discount)</b></div>
                                                <div className='opacity-75' style={{ color: "#098041" }}>{data.payment_type}</div>
                                                {/* <div className='p' style={{}}>Ordered On:{props.order_detail.actual_date_upload}</div> */}
                                                {/* <p className='p' >ORDER : {props.order_detail.order_id}</p> */}
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            );
                        })}


                    </div>
                        <div className='text-center   pb-5 ' style={{ marginTop: "1rem" }}>
                            {/* <Link href={`/customer/customer_order/${props.orderid}`} style={{ textDecoration: "none" }}> */}
                            <Link href={`/customer/customer_order`} style={{ textDecoration: "none" }}>

                                <a className='classA '>
                                    <Button className='text-capitalize' variant='contained' color="primary">View More</Button>
                                </a>
                            </Link>
                        </div>
                    </>

                    :
                    props.ordered_books.map((data, index) => (
                        <div key={index} className='row border bg-white border-gray shadow-sm d-flex justify-content-between mt-2 py-2'>
                            <div className='col-12 col-lg-8 row '>
                                <div style={{ marginTop: '0.4rem', width: "6.313rem", height: "6rem" }}
                                    className='col-2 col-lg-2 '>
                                    {/* <Image src={data.thumb} /> */}
                                    <img alt='' style={{ width: '100%', height: '100%' }} src={`https://d1f2zer3rm8sjv.cloudfront.net/${data.thumb}`} />
                                </div>
                                <div className='col-8 col-lg-8 '>
                                    <p className='pt-1 text-capitalize' style={{ marginBottom: "0.5rem" }}>{data.title.replace(
                                        /(\w)(\w*)/g,
                                        (_, firstChar, rest) =>
                                            firstChar.toUpperCase() + rest.toLowerCase()
                                    )}</p>
                                    <p className='p' style={{ marginBottom: "0.5rem" }}>Total Amount : <b style={{ color: "#098041" }}>₹{data.new_price +parseInt(data.deiveryCost) + parseInt(data.cod_charge) -parseInt(data.cod_discount) +parseInt(data.min_order_charge)}</b></p>
                                    <p className='opacity-75' style={{ marginBottom: "0.5rem", color: "#098041" }}>{data.payment_type}</p>
                                    {/* <p className='p' style={{ marginBottom: "0.5rem" }}>Ordered On:{props.order_detail.actual_date_upload}</p> */}
                                    {/* <p className='p' >ORDER : {props.order_detail.order_id}</p> */}
                                </div>
                            </div>

                        </div>
                    ))
                :
                <div className='row border border-gray shadow-sm d-flex justify-content-between mt-3 py-3'>
                    <div className='col-12 col-lg-8 row '>
                        <div style={{ marginTop: '0.4rem', width: "8.313rem", height: "8.838rem" }}
                            className='col-4 col-lg-2 '>
                            <Skeleton animation="wave" variant="rectangular" style={{ width: "100%", height: "6rem" }} />
                        </div>
                        <div className='col-8 col-lg-8 '>
                            <Skeleton animation="wave" fullwidth style={{ height: "4.5rem", width: "100%" }} />
                            <Skeleton animation="wave" fullwidth />
                            <Skeleton animation="wave" fullwidth />
                        </div>
                    </div>

                </div>
            }
            <style jsx>
                {`
                .classA{
                    text-decoration: none;
                }
                `}
            </style>
        </div>
    );
}

export default OrderedBooks