import { NoSsr } from "@mui/material";
import React from "react";
import City from "../../../components/city/City";
function Page() {
  return (
    <div>
      <NoSsr>
        <City />
      </NoSsr>
    </div>
  );
}

export default Page;
