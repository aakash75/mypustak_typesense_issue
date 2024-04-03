"use client"
import React from "react";
import dynamic from "next/dynamic";
const CustomerOrder = dynamic(() => import("../../../components/customer_order/CustomerOrderNew"), { ssr: false });

function Page() {
    return (
        <div  >
            <CustomerOrder />
        </div>
    );
}
export default Page;