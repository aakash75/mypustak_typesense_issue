"use client"
import React from "react";
import dynamic from "next/dynamic";
const MywalletBanner = dynamic(() => import("../../../components/wallet/MywalletBanner"));
import Mywallet from "../../../components/wallet/Mywallet";
function Page() {
  return (
    <div >
      <Mywallet />
      <MywalletBanner />
    </div>
  );
}
export default Page;
