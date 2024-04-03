import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ShareLocationTwoToneIcon from "@mui/icons-material/ShareLocationTwoTone";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
export const profileComponents = [
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
