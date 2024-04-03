import { NoSsr } from "@mui/material";
import dynamic from "next/dynamic";
import cartpage from "./CartPage";

function index() {
  // return <NoSSRComponentViewCart />;
  <NoSsr>
    <cartpage />
  </NoSsr>;
}
export default index;
