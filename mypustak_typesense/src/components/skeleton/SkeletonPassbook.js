import { Skeleton } from "@mui/material";
import React from "react";
export default function SkeletonPassbook() {
  return (
    <tbody>
      <tr className="">
        <td scope="row" className="pb-0">
          <div>
            <span>
              Paid Via:&nbsp;
              <span className="d-inline">
                <Skeleton width="40%" height="20%" />
              </span>
            </span>
            <span>
              Date:&nbsp;
              <span className="d-inline">
                <Skeleton width="40%" />
              </span>
            </span>
            <span>
              Order ID:&nbsp;
              <span className="d-inline">
                <Skeleton width="40%" />
              </span>
            </span>
          </div>
        </td>
        <td className="text-success text-center">
          &nbsp;
          <span className="d-inline">
            <Skeleton circle width="10%" />
          </span>
        </td>
        <td className="text-danger text-center">
          &nbsp;
          <span className="d-inline">
            <Skeleton circle width="10%" />
          </span>
        </td>
        <td className="text-black text-opacity-75 d-none d-md-block">
          &nbsp;
          <span className="d-inline">
            <Skeleton width="40%" />
          </span>
        </td>
      </tr>
      <tr className="d-md-none py-0">
        <td colSpan={3} className="py-0">
          <span className="d-block d-md-none w-75">
            Comment: &nbsp;
            <span className="d-inline">
              <Skeleton width="40%" />
            </span>
          </span>
        </td>
      </tr>
      <tr>
        <td colSpan={4}>
          <hr className="w-100" />
        </td>
      </tr>
    </tbody>
  );
}
