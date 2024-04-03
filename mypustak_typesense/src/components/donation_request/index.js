import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(
    () => import("./Donation_request"),
    {
        ssr: false
    }
)

// import React from 'react'

function index() {
    return (
        <NoSSRComponent />
    )
}

export default index