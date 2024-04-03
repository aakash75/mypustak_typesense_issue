import React from "react";
import { Skeleton, } from "@mui/material";
function SkeletonCart() {
    return (
        <div
            className='mx-0 px-3  py-3  mt-1 bg-white '
            id='cartBookdataD'
            style={{ marginTop: "-18px" }}
        >
            <div className='row'>
                {false ? null : (
                    <div
                        style={{
                            marginTop: "0.4rem",
                            width: "6.313rem",
                            height: "5.838rem",
                        }}
                        className='col-2 col-sm-2 col-md-2 col-lg-2'>
                        <Skeleton style={{ width: "6rem", height: "12rem", marginTop: "-3rem" }} animation="wave" />
                    </div>
                )}
                <div
                    className='col-9 col-sm-8 col-md-9 col-lg-10 '
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent:
                                "space-between",
                        }}>
                        <div>
                            <Skeleton style={{ width: "50%", marginTop: "1rem", height: "2rem" }} animation="wave" />
                            <Skeleton style={{ width: "18rem", height: "2rem" }} animation="wave" />
                            <Skeleton style={{ width: "15rem", height: "2rem" }} animation="wave" />
                        </div>
                        <Skeleton style={{ marginLeft: "-6rem", width: "6rem", height: "2.5rem", }} animation="wave" />

                    </div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
                id='Bookinfo2'>
                <div
                    className='d-flex align-items-center'
                    style={{
                        marginRight: "0.5rem",
                        marginTop: "1rem"
                    }}>
                    <div className=' d-lg-block '>
                        <Skeleton style={{ width: "6rem", height: "2.8rem", marginRight: '0.5rem' }} animation="wave" />

                    </div>
                    <div className='d-none d-sm-block d-md-block d-lg-block '>
                        <Skeleton style={{ width: "6rem", height: "2.8rem", marginRight: '0.5rem' }} animation="wave" />
                    </div>
                    <div className='d-none d-sm-block d-md-block d-lg-block '>
                        <Skeleton style={{ width: "6rem", height: "2.8rem", marginRight: '0.5rem' }} animation="wave" />
                    </div>
                </div>
            </div>
            {/* end of leftdetail */}
        </div>
    );
}

export default SkeletonCart;
