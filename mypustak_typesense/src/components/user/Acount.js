"use client"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import ShareLocationTwoToneIcon from "@mui/icons-material/ShareLocationTwoTone";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import React, { useEffect } from "react";
import { logout } from "../../helper/helpers";
import { Card } from "@mui/material";
import { connect } from "react-redux";
import styles from "../../styles/AccountDtails.module.css"
import { useRouter } from "next/navigation";
const profileComponents = [
  {
    key: 1,
    name: " My Profile",
    icon: <PersonOutlineIcon style={{ color: "#356dc4" }} />,
    href: "",
    page: "/customer/Myprofile",
  },
  {
    key: 2,
    name: "My Orders",
    icon: <InventoryOutlinedIcon style={{ color: "#356dc4" }} />,
    href: "",
    page: "/customer/customer_order",
  },
  {
    key: 3,
    name: " My Wishlist",
    icon: <ListOutlinedIcon style={{ color: "#356dc4" }} />,
    href: "",
    page: "/customer/wishlist",
  },
  {
    key: 4,
    name: "Manage Address",
    icon: <ShareLocationTwoToneIcon style={{ color: "#356dc4" }} />,
    href: "",
    page: "/customer/manage_address",
  },
  {
    key: 5,
    name: "My Donations",
    icon: <VolunteerActivismOutlinedIcon style={{ color: "#356dc4" }} />,
    href: "",
    page: "/donor/donor_donation_request",
  },
  {
    key: 6,
    name: "My Wallet",
    icon: <AccountBalanceWalletOutlinedIcon style={{ color: "#356dc4" }} />,

    href: "",
    page: "/mypustak-wallet",
  },
  {
    key: 7,
    name: "My Passbook",
    icon: <ReceiptLongOutlinedIcon style={{ color: "#356dc4" }} />,
    href: "",
    page: "/wallet/passbook",
  },
  {
    key: 8,
    name: "Logout",
    icon: <PowerSettingsNewOutlinedIcon style={{ color: "red" }} />,
    href: "",
  },
];
function AccountDtails(props) {
  const Router = useRouter()
  useEffect(() => {
    if (screen.width > 576) {
      Router.push("/");
    } else {
      if (props.userComponentStatus !== 2) {
        Router.push(`/account/Loginpage?ret=/account`);
      }
    }
  }, []);
  const logoutUser = () => {
    logout()
      .then(res => { })
      .catch(err => {
        console.log({ err });
      });
  };
  return (
    <div className='container  mt-2 d-block d-sm-none d-md-none d-lg-none'>
      <div className='row mx-1 p-lg-4 p-2'>
        {profileComponents.map((data, index) => (
          <Card
            key={index}
            className='col-sm-12 py-3 my-1 bg-white'
            onClick={e => {
              e.preventDefault();
              data.name == "Logout"
                ? logoutUser()
                : window.location.assign(data.page);
            }}>
            <React.Fragment key={data.key}>
              <a
                href={data.page}
                style={{ textDecoration: "none" }}
                className={` ${styles.options} pt-3 pb-2 rounded`}>
                <React.Fragment>
                  {data.icon} &nbsp; {data.name}
                </React.Fragment>
              </a>
            </React.Fragment>
          </Card>
        ))}
      </div>
      <style jsx>
        {`

              .options {
                color: black;
              }
              .options:hover {
                color: #356dc4;
                font-weight: 700;
                background-color: #efefef;
                text-decoration: none;
              }
        
            `}
      </style>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    userComponentStatus: state.accountR.userComponentStatus,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountDtails);
