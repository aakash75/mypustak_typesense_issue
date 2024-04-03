import { Skeleton } from "@mui/material";
import React from "react";
function SkeletonProudDonor() {
  return (
    <>
      <div className="col-lg-4 col-sm-6 col-xs-12 my-3 ">
        <div className="row m-1 border border-gray m-0 p-2 shadow-sm rounded d-flex">
          <div className="col-4">
            <Skeleton variant="rounded" animation="wave" height={"90%"} />
          </div>
          <div className={"row col-7 pt-3 pl-2 "}>
            <Skeleton variant="text" animation="wave" className="col-12" />
            <Skeleton variant="text" animation="wave" className="col-12" />
            <Skeleton variant="text" animation="wave" className="col-12" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SkeletonProudDonor;
