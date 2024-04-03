import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { Skeleton } from '@mui/material';
function SkeletonAddress() {
  return (
    <div className="pt-3 border shadow-sm my-3 col-11 col-sm-12 mx-auto">
      <Skeleton width="25%" height="15%" className="rounded-pill" />
      <div className="pt-2 pl-3">
        <span>
          <Skeleton width="20%" />
        </span>

        <span>
          <Skeleton width="15%" />
        </span>

        <span>
          <Skeleton width="15%" />
        </span>

        <span>
          <Skeleton width="15%" />
        </span>

        <span>
          <Skeleton width="15%" />
        </span>
      </div>
      <div className="d-flex justify-content-lg-end justify-content-around mr-5 pb-2">
        <button className="btn text-primary mr-5">
          <BorderColorOutlinedIcon /> Edit
        </button>
        <button className="btn text-primary">
          <DeleteOutlineOutlinedIcon /> Delete
        </button>
      </div>
    </div>
  );
}

export default SkeletonAddress;
