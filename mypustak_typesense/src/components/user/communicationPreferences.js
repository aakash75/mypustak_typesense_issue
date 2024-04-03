"use client"
import { Avatar, Box, CircularProgress, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import stylesMyprofile from "../../styles/Myprofile.module.css"
import React, { useEffect } from "react";
import { withSnackbar } from "notistack";
import {
    Button,
    Drawer,
    IconButton,
    // TextField,
    NoSsr,
} from "@mui/material";
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
import { fetch_user_detail, fetch_communication_preferences, update_communication_preferences } from "../../redux/actions/accountAction";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { CheckBox } from "@mui/icons-material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsIcon from '@mui/icons-material/Sms';
import MediaQuery from "react-responsive";
const profile = [
    {
        key: 1,
        name: "email",
        icons: <EmailIcon color="primary" />,
        details: "Get notified via your MyPustak registered email id",
        active: 1
    },
    {
        key: 2,
        name: "whatsapp",
        icons: <WhatsAppIcon style={{ color: "green" }} />,
        details: "Get instant messages on your MyPustak registered WhatsApp number",
        active: 1
    },
    {
        key: 3,
        name: "Desktop Notifications",
        icons: <LaptopMacIcon />,
        details: "",
        active: 0
    },
    {
        key: 4,
        name: "In-App Notifications",
        icons: <PhoneIphoneIcon />,
        details: "Receive alerts ONLY on your MyPustak App ",
        active: 0
    },

    {
        key: 5,
        name: "SMS",
        icons: <SmsIcon />,
        details: "Get instant messages on your MyPustak registered phone number",
        active: 0
    },
];

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index) {
    console.log(index, "index");
    return {
        id: `simple-tab-${0}`,
        'aria-controls': `simple-tabpanel-${0}`,
    };
}
function Myprofile(props) {
    const [key, setkey] = useState('')
    const [path, setpath] = useState('')
    const [notificationType, setNotificationType] = useState('email')
    const [notificationTypeDetails, setNotificationTypeDetails] = useState('Get notified via your MyPustak registered email id')
    const [notificationOptions, setNotificationOptions] = useState([])
    const [skeletonLoader, setSkeletonLoader] = useState(true)
    const [value, setValue] = React.useState(0);
    const [UpdateButtonLoader, setUpdateButtonLoader] = React.useState(false);



    useEffect(async () => {
        const token = localStorage.getItem("user_info");
        if (!token) {
            let BackUrl = "/communication-preferences";
            window.location.replace(`/account/Loginpage?ret=${BackUrl}`);
        } else {

           await props.fetch_communication_preferences().then((res) => {
                let newOptions = res.filter((opt) => { return opt.type == "email" })
                setNotificationOptions(newOptions)
                setSkeletonLoader(false)
            }).catch((err) => {
                setNotificationOptions([])
                setSkeletonLoader(false)
            })
            let user = JSON.parse(localStorage.getItem("user_info"))
           await props.fetch_user_detail(user.id)
            setpath(window.location.pathname)
        }

    }, [])
    useEffect(() => {
        console.log(props.notification, "1346789");
    }, [props.notification])
    const [imageerr, setimageerr] = useState(false)
    const handleCheckbox = (type) => {
        let newStatus = type.status == 1 ? 0 : 1
        setNotificationOptions(
            notificationOptions.map((data) => {
                if (data.field == type.field) {
                    data.status = newStatus
                }
                return data
            })
        )
        // let body = {
        //     field_name: type.field,
        //     value: newStatus
        // }
        // console.log(body, "body");
        // props.update_communication_preferences(body).then((res) => {
        //     setNotificationOptions(
        //         notificationOptions.map((data) => {
        //             if (data.field == type.field) {
        //                 data.status = newStatus
        //             }
        //             return data
        //         })
        //     )

        // }).catch((err) => {
        //     console.log(err, "err123");
        // })


        console.log(type);
    }
    const isAllChecked = () => {
        let filter = notificationOptions.filter((data) => { return data.type == notificationType })
        let allowData = filter.filter((data) => { return data.status == 0 })
        console.log(filter, "filter...................");
        return allowData.length == filter.length
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
        let data = profile.filter((type) => { return type.key == newValue + 1 })[0]
        setNotificationType(data.name)
        setNotificationTypeDetails(data.details)
        let newOptions = props.notification.filter((opt) => { return opt.type == data.name })
        setNotificationOptions(newOptions)
    };
    const handleStatusUpdate = () => {
        setUpdateButtonLoader(true)
        let newNotification = notificationOptions.filter((notification) => { return !notification.is_disable })
        newNotification.map((notify) => {
            let body = {
                field_name: notify.field,
                value: notify.status
            }
            props.update_communication_preferences(body)
        })
        setTimeout(() => {
            setUpdateButtonLoader(false)
            props.enqueueSnackbar(`Your Notification Preferences Successfully Changed`, {
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                },
                variant: "success",
                persist: false,
            });
        }, 1000);
    }
    return (
        <div className="mx-0 mx-md-1 mx-lg-5   row mt-3">
            <div>
                <MediaQuery maxWidth={575} >
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="basic tabs example">
                                {profile.map((data, index) => (
                                    <Tab key={index} label={data.name} {...a11yProps(index)} disabled={data.active ? false : true} style={{ cursor: data.active ? "pointer" : "not-allowed", opacity: data.active ? 1 : 0.4 }} />
                                ))}
                            </Tabs>
                        </Box>
                    </Box>
                </MediaQuery>
            </div>
            <div className="d-none d-sm-block col-sm-4 col-lg-3 ">
                <div className={styles.main_div + " bg-white shadow "}>
                    <div className="d-flex p-4 border shadow-sm ">
                        <div className=" ml-4">
                            <p className={styles.first_div_para} style={{ color: "grey", fontWeight: "600", fontSize: "0.87rem" }}> <NotificationsIcon color="primary" /> Notification Preferences</p>
                        </div>
                    </div>
                    <div className="pt-2 border">
                        {profile.map((data) => (
                            <div key={data.key}
                                style={{ opacity: data.active ? 1 : 0.4, cursor: data.active ? "pointer" : "not-allowed", color: notificationType == data.name ? "#2248AE" : "rgba(72, 72, 72, 0.8)" }}
                                className={`px-4 py-2 ${stylesMyprofile.myaccountdiv}`}
                                role="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (data.active) {
                                        setNotificationType(data.name)
                                        setNotificationTypeDetails(data.details)
                                        let newOptions = props.notification.filter((opt) => { return opt.type == data.name })
                                        setNotificationOptions(newOptions)
                                    } else {

                                    }
                                }}
                            >
                                {data.icons} <span style={{ textTransform: "capitalize" }}> {data.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-8 col-lg-9 " style={{ position: "relative" }} >
                <div
                    className='container-fluid  mb-5 row mx-auto bg-white p-lg-4 p-3 border shadow'
                    style={{ minHeight: "18rem" }}>
                    <div>
                        <h5 className=' text-primary' style={{ textTransform: "capitalize" }}>
                            <b>{notificationType}</b>
                        </h5>
                        <p style={{ fontSize: "0.9rem" }}>{notificationTypeDetails}</p>
                    </div>
                    <div className='row  ml-1 '  >
                        <div className='col-md-6 d-flex flex-column ' style={{}} >
                            {skeletonLoader ?
                                <div>
                                    <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem", alignItems: "center" }}>
                                        <Skeleton width={"1.2rem"} height={"1.5rem"} />
                                        <div>
                                            <Skeleton width={"8rem"} height={"2rem"} />
                                            <Skeleton width={"12rem"} />
                                        </div>
                                    </div>
                                    <hr style={{ margin: "0.5rem 0rem" }} />
                                    <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem", alignItems: "center" }}>
                                        <Skeleton width={"1.2rem"} height={"1.5rem"} />
                                        <div>
                                            <Skeleton width={"8rem"} />
                                            <Skeleton width={"12rem"} />
                                        </div>
                                    </div>
                                    <hr style={{ margin: "0.5rem 0rem" }} />
                                    <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem", alignItems: "center" }}>
                                        <Skeleton width={"1.2rem"} height={"1.5rem"} />
                                        <div>
                                            <Skeleton width={"8rem"} />
                                            <Skeleton width={"12rem"} />
                                        </div>
                                    </div>
                                </div> : notificationOptions.length ? notificationOptions.map((type, index) => {
                                    return (
                                        <>
                                            <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem", alignItems: "center" }}>
                                                <div>
                                                    <input
                                                        className='form-check-input'
                                                        checked={type.status == 1 ? false : true}
                                                        onClick={() => { handleCheckbox(type) }}
                                                        type='checkbox'
                                                        style={{ fontSize: "1.1rem", cursor: "pointer" }}
                                                        id='flexCheckDefault5'
                                                        disabled={type.is_disable}
                                                    />
                                                </div>
                                                <div>
                                                    <div>{type.name}</div>
                                                    <div style={{ fontSize: "0.7rem" }}>{type.details}</div>
                                                </div>
                                            </div>
                                            <hr style={{ margin: "0.5rem 0rem" }} />
                                        </>
                                    );

                                }) : null

                            }
                            <div >
                                <center>
                                    {UpdateButtonLoader ?
                                        <Button
                                            size="big"
                                            style={{
                                                padding: "0.3rem",
                                                width: "70%",
                                                textTransform: "capitalize",
                                                minHeight: "2.1rem"
                                            }}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => { }}

                                        >
                                            <CircularProgress size={18} color="secondary" />
                                        </Button> :
                                        <Button
                                            size="big"
                                            style={{
                                                padding: "0.3rem",
                                                width: "70%",
                                                textTransform: "capitalize",
                                                minHeight: "2.1rem"
                                            }}
                                            variant="contained"
                                            color="primary"
                                            onClick={() => { handleStatusUpdate() }}

                                        >
                                            Save Your Preferences
                                        </Button>}
                                </center>
                            </div>

                        </div>
                        <div className='col-md-6 text-center '>

                        </div>

                    </div>
                </div>
                <MediaQuery minWidth={476} >
                    <NotificationsActiveIcon style={{ fontSize: "5rem", color: isAllChecked() ? "#356dc4" : "gray", position: "absolute", top: 0, right: 0, margin: "0.3rem 2rem" }} />
                </MediaQuery>
            </div>
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
        notification: state.accountR.notification,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetch_user_detail: (id) => dispatch(fetch_user_detail(id)),
        fetch_communication_preferences: () => dispatch(fetch_communication_preferences()),
        update_communication_preferences: (body) => dispatch(update_communication_preferences(body)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Myprofile));
