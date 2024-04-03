"use client"
import React, { useEffect, useState } from 'react'
import {
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    CircularProgress,
    Skeleton,
    NoSsr
} from "@mui/material";
import { createContactUsAction } from "../../redux/actions/contactUsAction"
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
function Bulkorder(props) {
    const [name, setName] = useState("");
    const [nameErr, setNameErr] = useState(false);
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState(false);
    const [whatsApp, setWhatsApp] = useState("");
    const [whatsAppErr, setWhatsAppErr] = useState(false);
    const [mobile, setMobile] = useState("");
    const [mobileErr, setMobileErr] = useState(false);
    const [subject, setSubject] = useState("");
    const [otherSubject, setOtherSubject] = useState("");
    const [otherSubjectErr, setOtherSubjectErr] = useState(false);
    const [message, setMessage] = useState("");
    const [messageErr, setMessageErr] = useState(false);
    const [sendingMessage, setSendingMessage] = useState("");
    const [file, setFile] = useState();
    const [fileErr, setFileErr] = useState(false);
    const [FaqcategoryLoader, setFaqcategoryLoader] = useState(true);
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("user_info"));
        if (userInfo) {
            setEmail(userInfo.email);
            setName(userInfo.name);
            setMobile(userInfo.phone);
        }
        // props
        //     .getFaqCategoryData()
        //     .then(res => {
        //         setFaqcategoryLoader(false);
        //     })
        //     .catch(err => {
        //         setFaqcategoryLoader(true);
        //     });
    }, []);
    const formValiadtionHand = e => {
        e.preventDefault();
        // alert("enter")
        if (name == " " || name == null || name.length < 3) {
            // alert("name")
            setNameErr(true);
            return;
        } else if (!email) {
            // alert("email")
            setEmailErr(true);
            return;
        } else if (!email.includes("@")) {
            // alert("email@")
            setEmailErr(true);
            return;
        } else if (!(mobile.length == 10)) {
            // alert("mobile")
            setMobileErr(true);
            return;
        } else if (!(whatsApp.length == 10)) {
            // alert("whatsapp")
            setWhatsAppErr(true);
            return;
        } else if (!message) {
            // alert("massage")
            setMessageErr(true);
            return;
        } else {
            // alert("submiting")
            submitingDataHand();
        }
    };
    const submitingDataHand = () => {
        // alert('submit')
        setSendingMessage(true);
        const data = new FormData();
        data.append("file", file);
        let body = {
            userName: name,
            userMail: email,
            subject: "bulkOrder",
            body: message,
            whatsAppNo: whatsApp,
            mobileNo: mobile,
        };
        props
            .createContactUsAction(body)
            .then(res => {
                // if File Atachment not Uploaded
                setName("");
                setEmail("");
                setWhatsApp("");
                setSubject("");
                setOtherSubject("");
                setMessage("");
                setMobile("");
                setFile();
                setSendingMessage(false);
                props.enqueueSnackbar(`message SuccessFully Send`, {
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                    variant: "success",
                    persist: false,
                });
            })
            .catch(err => {
                console.log(err);
                setSendingMessage(false);
                props.enqueueSnackbar(``, {
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                    variant: "error",
                    persist: false,
                });
            });
    };
    const nameHand = e => {
        setNameErr(false);
        setName(e.target.value);
    };
    const emailHand = e => {
        setEmailErr(false);
        setEmail(e.target.value);
    };
    const whatsAppHand = e => {
        setWhatsAppErr(false);
        setWhatsApp(e.target.value);
    };
    const mobileHand = e => {
        setMobileErr(false);
        setMobile(e.target.value);
    };
    const subjectHand = e => {
        setSubject(e.target.value);
        setOtherSubject("");
    };
    const otherSubjectHand = e => {
        setOtherSubjectErr(false);
        setOtherSubject(e.target.value);
    };
    const messageHand = e => {
        setMessageErr(false);
        setMessage(e.target.value);
    };
    const sameNumberHand = () => {
        if (whatsApp == mobile) {
            setWhatsApp("")

        } else {
            setWhatsApp(mobile)
            setWhatsAppErr(false)
        }
    }
    return (
        <div>
            <div className='row '>
                <div className='col-lg-3 d-block '></div>
                <div className='col-12 col-lg-6 '>
                    <h6 className='text-center py-3 bg-color  text-white mb-0 '>
                        <b>Bulk Order For NoteBook </b>
                    </h6>

                    <div className='div-shadow mt-3 bg-white '>
                        <form className=' p-2 row ' onSubmit={formValiadtionHand}>
                            <div className='  row mx-auto col-12 col-lg-9' style={{ width: "95%" }}>
                                {sendingMessage ?
                                    <center className="" style={{ minHeight: '32rem', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center' }}>
                                        <CircularProgress />
                                        {/* <i>Rest assured your query will soon be resolved</i> */}
                                        <i>Your query is being submitted</i>
                                    </center> :
                                    <div>
                                        <div className='col-12 col-lg-12 mt-1'>
                                            <TextField
                                                label='Enter your  Name'
                                                type={"text"}
                                                value={name}
                                                onChange={nameHand}
                                                className='w-100 mt-2'
                                                variant='outlined'
                                                required
                                                error={nameErr}
                                                helperText={nameErr ? "Enter Your Name Before Submit" : ""}
                                            />
                                        </div>
                                        <div className='col-12 col-lg-12 mt-1'>
                                            <TextField
                                                label='Enter your Email ID'
                                                type={"text"}
                                                value={email}
                                                onChange={emailHand}
                                                className='w-100 mt-2'
                                                variant='outlined'
                                                required
                                                error={emailErr}
                                                helperText={emailErr ? "Enter Your Correct Email  " : ""}
                                            />
                                        </div>
                                        <div className='col-12 col-lg-12 mt-1'>
                                            <TextField
                                                label='Enter your Mobile No'
                                                type={"number"}
                                                value={mobile}
                                                onChange={mobileHand}
                                                className='w-100 mt-2'
                                                variant='outlined'
                                                error={mobileErr}
                                                helperText={
                                                    mobileErr ? "Mobile Number Must Be 10 Digits" : ""
                                                }
                                            />
                                        </div>
                                        <div className='col-12 col-lg-12 mt-1'>
                                            <TextField
                                                label='Enter your Whatsapp No'
                                                type={"number"}
                                                value={whatsApp}
                                                onChange={whatsAppHand}
                                                className='w-100 mt-2'
                                                variant='outlined'
                                                error={whatsAppErr}
                                                helperText={
                                                    whatsAppErr ? "Whatsapp Number Must Be 10 Digits" : ""
                                                }
                                            />
                                            <span style={{ fontSize: "0.8rem" }}>
                                                <label>
                                                    <input checked={whatsApp.length && mobile.length ? whatsApp == mobile ? true : false : false} type={"checkbox"} onClick={() => { sameNumberHand() }} />
                                                </label>
                                                &nbsp;Same As Mobile Number</span>
                                        </div>

                                        {/* <FormControl
                                            className='col-12 col-lg-12 '
                                            style={{ marginTop: "1.5rem" }}>
                                            <InputLabel id='demo-multiple-name-label'>
                                                Select Subject
                                            </InputLabel>
                                            <Select
                                                variant='standard'
                                                required
                                                value={subject}
                                                onChange={subjectHand}>
                                                <MenuItem value='Payment'>Payment Related Query </MenuItem>
                                                <MenuItem value='Order'>Order Related Query</MenuItem>
                                                <MenuItem value='Refund'>Refund Related Query </MenuItem>
                                                <MenuItem value='Others'>Others </MenuItem>
                                            </Select>
                                        </FormControl> */}

                                        {/* {subject == "Others" ? (
                                            <>
                                                <div className='col-12 col-lg-12 mt-1'>
                                                    <TextField
                                                        label='Others Subject'
                                                        type={"text"}
                                                        value={otherSubject}
                                                        onChange={otherSubjectHand}
                                                        className='w-100 mt-3'
                                                        variant='outlined'
                                                        error={otherSubjectErr}
                                                        helperText={
                                                            otherSubjectErr ? "Write Your Other Query " : ""
                                                        }
                                                    />
                                                </div>
                                            </>
                                        ) : null} */}
                                        <div className='col-12 col-lg-12 mt-1'>
                                            <TextField
                                                label='Your Message'
                                                type={"text"}
                                                value={message}
                                                onChange={messageHand}
                                                className='w-100 mt-3'
                                                variant='outlined'
                                                multiline
                                                rows={4}
                                                error={messageErr}
                                                helperText={
                                                    messageErr ? "Explain Your Query Details Here" : ""
                                                }
                                            />
                                        </div>

                                    </div>}
                                {sendingMessage ? (
                                    <button
                                        type='reset'
                                        className='my-3 bg-color py-2 text-white border-0 submitButton'
                                    >
                                        <CircularProgress size={20} style={{ color: 'white' }}
                                        />
                                    </button>
                                ) : (
                                    <button
                                        type='submit'
                                        className='my-3 bg-color py-2 text-white border-0 submitButton'
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    facCategory: state.faqR.facCategory,
});

const mapDispatchToProps = dispatch => {
    return {
        createContactUsAction: body => dispatch(createContactUsAction(body)),
        uploadQuerryImages: (data, id) => dispatch(uploadQuerryImages(data, id)),
        // getFaqCategoryData: () => dispatch(getFaqCategoryData()),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withSnackbar(Bulkorder));


// export default Bulkorder
