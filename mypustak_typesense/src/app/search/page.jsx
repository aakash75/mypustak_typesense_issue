"use client";
import React from "react";
import SearchBooks from "../../components/searchpage/SearchBooks";

export default function page(props) {
  console.log(props.searchParams, "64664");
  // alert(`${props?.searchParams?.value}========  `);
  return (
    <React.Fragment>
      <SearchBooks searchValue={props.searchParams.value} />
    </React.Fragment>
  );
}
