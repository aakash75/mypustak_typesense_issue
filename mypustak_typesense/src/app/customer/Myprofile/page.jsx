"use client"
import React, { } from "react";
import dynamic from "next/dynamic";
const Faq = dynamic(() => import("../../../components/faq/Faq"));
const Myprofile = dynamic(() => import("../../../components/profile/Myprofile"));
import { NoSsr } from "@mui/material";
const PersonalDetails = dynamic(() => import("../../../components/personal_details/PersonalDetails"));
import { connect } from "react-redux"
import { fetch_user_detail } from "../../../redux/actions/accountAction"
import NextBreadcrumbs from "../../../components/Breadcrumbs/NextBreadcrumbs";
function Page(props) {
    return (
        <>
            <NoSsr>
                <NextBreadcrumbs />
            </NoSsr>
            <div className="mx-2 row mt-3">
                <div className="d-none d-sm-block col-sm-4 col-lg-3 ">
                    <Myprofile />
                </div>
                <div className="col-12 col-sm-8 col-lg-9 ">
                    <PersonalDetails />
                    <Faq />
                </div>
            </div>
        </>

    );
}
const mapStateToProps = (state) => ({
    getuserdetails: state.userdetailsR.getuserdetails,
    userComponentStatus: state.accountR.userComponentStatus,
    userToken: state.accountR.token,
})
export default connect(mapStateToProps, {
    fetch_user_detail,
})(Page)
// export default Page