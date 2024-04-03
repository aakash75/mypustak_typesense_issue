"use client"

import { NoSsr } from "@mui/material";
import React, { } from "react";
import dynamic from "next/dynamic";
const Pickup = dynamic(() => import("../../../components/pickup/Pickup"));
function Page() {
  const [value, setValue] = React.useState("1");

  return (
    <div>
      <NoSsr>
        <Pickup />
      </NoSsr>
    </div>
  );
}

export default Page;
