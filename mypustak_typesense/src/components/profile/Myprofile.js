"use client"
import { Avatar } from "@mui/material";
import stylesMyprofile from "../../styles/Myprofile.module.css"
import React, { useEffect } from "react";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShareLocationTwoToneIcon from "@mui/icons-material/ShareLocationTwoTone";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import styles from "../../styles/Sidebar.module.css";
import { useState } from "react";
import { connect } from "react-redux";
import { fetch_user_detail } from "../../redux/actions/accountAction";
import { useRouter } from 'next/navigation'
const profile = [
  {
    key: 1,
    name: "My Orders",
    icons: <InventoryOutlinedIcon style={{ color: "#356dc4" }} />,
    page: "customer/customer_order"
  },
  {
    key: 2,
    name: "My Donations",
    icons: <VolunteerActivismOutlinedIcon style={{ color: "#356dc4" }} />,
    page: "donor/donor_donation_request",
  },
  {
    key: 3,
    name: "My Wishlist",
    icons: <ListOutlinedIcon style={{ color: "#356dc4" }} />,
    page: "customer/wishlist",
  },
];

const account = [
  {
    key: 1,
    name: "My Profile",
    icons: <PersonOutlineIcon style={{ color: "#356dc4" }} />,
    page: "customer/Myprofile",
  },
  {
    key: 2,
    name: "Manage Address",
    icons: <ShareLocationTwoToneIcon style={{ color: "#356dc4" }} />,
    page: "customer/manage_address",
  },
  {
    key: 3,
    name: "My Wallet",
    icons: <AccountBalanceWalletOutlinedIcon style={{ color: "#356dc4" }} />,
    page: "mypustak-wallet",
  },
  {
    key: 4,
    name: "My Passbook",
    icons: <ReceiptLongOutlinedIcon style={{ color: "#356dc4" }} />,
    page: "wallet/passbook",
  },
];

function Myprofile(props) {
  const router = useRouter()
  const [key, setkey] = useState('')
  const [path, setpath] = useState('')

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user_info"))
    props.fetch_user_detail(user.id)
    setpath(window.location.pathname)
  }, [])
  const [imageerr, setimageerr] = useState(false)
  return (
    <div className={styles.main_div + " bg-white shadow "}>
      <div className="d-flex p-4 border shadow-sm ">
        {props.userDistinct.avatar && !imageerr ?
          <div>
            <img alt="profile photo" onError={() => {
              setimageerr(true)
            }} style={{ width: '2.5rem', height: '2.8rem', borderRadius: '50%' }} src={`https://d239pyg5al708u.cloudfront.net/uploads/avatar/${props.userDistinct.avatar}`} />
          </div> : <Avatar></Avatar>

        }

        <div className=" ml-4">
          <p className={styles.first_div_para}>Hello,</p>
          <h5 className="fs-5">
            <strong>{props.getuserdetails.name ? props.getuserdetails.name : 'Reader'}</strong>
          </h5>
        </div>
      </div>
      <div className="pt-2 border">
        {profile.map((data) => (
          <div key={data.key}
            style={{ backgroundColor: path == `/${data.page}` ? "#2258ae1a" : null, color: path == `/${data.page}` ? "#2248AE" : null }}
            className={`px-4 py-2 ${stylesMyprofile.myaccountdiv}`}
            role="button"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/${data.page}`);
            }}>
            {data.icons}
            <span className={styles.name}> {data.name}</span>
          </div>
        ))}
        <p className="px-4 mt-5 mb-3 ml-1">
          <b>My Account</b>
        </p>
        {account.map((data) => (
          <div key={data.key}
            style={{ backgroundColor: path == `/${data.page}` ? "#2258ae1a" : null, color: path == `/${data.page}` ? "#2248AE" : null }}
            className={`px-4 py-2 ${stylesMyprofile.myaccountdiv}`}
            role="button"
            onClick={(e) => {
              e.preventDefault();
              setkey(data.key)
              router.push(`/${data.page}`);
            }}>
            {data.icons}
            <span className={styles.name}> {data.name}</span>
          </div>
        ))}
      </div>
      <style jsx>
        {`

        `}
      </style>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    getuserdetails: state.loginReducer.getuserdetails,
    userComponentStatus: state.loginReducer.userComponentStatus,
    SuggestionData: state.productsuggestionreducer.SuggestionData,
    PopupCart: state.cartReduc.PopupCart,
    userToken: state.accountR.token,
    userDistinct: state.userdetailsR.userDistinct,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetch_user_detail: (id) => dispatch(fetch_user_detail(id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Myprofile);
