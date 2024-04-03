"use client"
import React, { useEffect, useState } from "react";
import helpline from "../../assets/helpline.svg";
import NextBreadcrumbs from "../../components/Breadcrumbs/NextBreadcrumbs";
import Image from "next/legacy/image";
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
import contact_us_img from "../../assets/contact_us.svg";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import {
  createContactUsAction,
  uploadQuerryImages,
} from "../../redux/actions/contactUsAction";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Link from "next/link";
import { getFaqCategoryData } from "../../redux/actions/faqAction";
import Head from "next/head";
function Page(props) {
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
  const [orderIdQuery, setOrderIdQuery] = useState("");
  const [bookIdQuery, setbookIdQuery] = useState("");

  // const [FaqcategoryLoader, setFaqcategoryData] = useState([])
  const getQueryValue = () => {

  }
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    const bookId = urlParams.get('bookId');
    const bookTitle = urlParams.get('title');
    if (Number(orderId) && Number(bookId)) {
      setSubject("Others")
      setOtherSubject(`${bookTitle ? bookTitle : bookId} (Order Id ${orderId} )`)
    } else if (orderId) {
      setSubject("Others")
      setOtherSubject(`Order Issue With Order Id ${orderId}`)
    }
    getQueryValue()
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
      setMobile(userInfo.phone);
    }
    props
      .getFaqCategoryData()
    //   .then(res => {
    //     setFaqcategoryLoader(false);
    //   })
    //   .catch(err => {
    //     setFaqcategoryLoader(true);
    //   });
  }, []);
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
  const fileHand = e => {
    setFileErr(false);
    let filePath = e.target.value;
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.svg)$/i;
    if (!allowedExtensions.exec(filePath)) {
      setFileErr(true);
    }
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
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
    } else if (!subject) {
      // alert("subject")
      props.enqueueSnackbar(`Please Choose A Querry Subject`, {
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "warning",
        persist: false,
      });
    } else if (subject == "Others" && !otherSubject) {
      // alert("other subject")
      setOtherSubjectErr(true);
      return;
    } else if (!message) {
      // alert("massage")
      setMessageErr(true);
      return;
    } else if (file) {
      // alert("file")
      console.log(file.name, "filenamwe");
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.svg)$/i;
      if (!allowedExtensions.exec(file.name)) {
        // alert("not match")
        setFileErr(true);
        return;
      } else {
        // alert("submiting match")
        submitingDataHand();
      }
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
      subject: subject == "Others" ? otherSubject : subject,
      body: message,
      whatsAppNo: whatsApp,
      mobileNo: mobile,
    };
    props
      .createContactUsAction(body)
      .then(res => {
        if (file) {
          props.uploadQuerryImages(data, res.created_id).then(res => {
            setName("");
            setEmail("");
            setWhatsApp("");
            setSubject("");
            setOtherSubject("");
            setMessage("");
            setMobile("");
            setFile();
            setSendingMessage(false);
            const currentUrl = window.location.href;
            const urlWithoutParams = currentUrl.split('?')[0];
            window.history.replaceState(null, '', urlWithoutParams);
            props.enqueueSnackbar(`message SuccessFully Send`, {
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              variant: "success",
              persist: false,
            });
          });
        } else {
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
          const currentUrl = window.location.href;
          const urlWithoutParams = currentUrl.split('?')[0];
          window.history.replaceState(null, '', urlWithoutParams);
          props.enqueueSnackbar(`message SuccessFully Send`, {
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            variant: "success",
            persist: false,
          });
        }
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
      {/* seo code moved to layout.jsx in same folder  */}
      {/* <Head>
        <title> {props.title_tag}</title>
        <meta
          name='Description'
          property='og:description'
          content={props.meta_description}
        />
        <meta name="title" content={props.title_tag} />
        <meta name="description" content={props.meta_description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={props.og_url} />
        <meta property="og:title" content={props.title_tag} />
        <meta property="og:description" content={props.meta_description} />
        <meta property="og:image" content='https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png' />

      </Head> */}
      <NoSsr>
        <NextBreadcrumbs />
      </NoSsr>
      <div className='  row mx-2 my-2'>
        <div className=' col-12 col-md-6 order-1 order-md-0'>
          <h6 className='text-center py-3 bg-color text-white mb-0 mt-3 mt-md-0'>
            <b>Contact Us</b>
          </h6>

          <div className='div-shadow mt-3 px-3 bg-white  '>
            <h6 className='text-center py-3 mb-0 text-color'>
              <WhereToVoteIcon />
              &emsp;<b>Address</b>
            </h6>
            <hr className='  mt-0 mb-1' />
            <div
              className='lh-sm pb-3 details-color'
              style={{ fontSize: "0.9rem" }}>
              <span>EDUCATEXLABS PRIVATE LIMITED</span>
              <br />
              <span>3908/3980, EAST BERABERI , SIKHER BAGAN</span>
              <br />
              <span> GOPALPUR RAJARHAT</span>
              <br />
              <span>KOLKATA , PARGANAS NORTH-700136</span>
              <br />
              <span>WEST BENGAL</span>
              <br />
              <span>CIN : U80900WB2021PTC242967</span>
              <br />
              <span>HELPLINE: 033-41804333 (WhatsApp & call)</span>
              <br />
            </div>
          </div>

          <div className='div-shadow text-center py-3 mt-3 px-3  bg-white'>
            <h6 className='text-color'>
              <PhoneAndroidIcon />
              &emsp;<b>Helpline</b>
            </h6>
            <hr className='  mt-0 mb-1' />
            <p className='details-color'>033-41804333 (WhatsApp & call)</p>
            <Image alt='helpline' src={helpline} />
          </div>
        </div>

        <div className='col-12 col-md-6 '>
          <h6 className='text-center py-3 bg-color  text-white mb-0 '>
            <b>Mail Your Query</b>
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
                        className='w-100 mt-3'
                        variant='outlined'
                        // required
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
                        className='w-100 mt-3'
                        variant='outlined'
                        // required
                        error={emailErr}
                        helperText={emailErr ? "Enter Your Correct Email  " : ""}
                      />
                    </div>
                    <div className='col-12 col-lg-12 mt-1'>
                      <TextField
                        label='Enter your Mobile No'
                        // type={"number"}
                        value={mobile}
                        onChange={mobileHand}
                        className='w-100 mt-3'
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
                        // type={"number"}
                        value={whatsApp}
                        onChange={whatsAppHand}
                        className='w-100 mt-3'
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

                    <FormControl
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
                    </FormControl>

                    {subject == "Others" ? (
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
                    ) : null}
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
                    <input type='file' onChange={fileHand} />
                    <span
                      style={{
                        color: fileErr ? "red" : "gray",
                        fontSize: "0.8rem",
                      }}>
                      {fileErr
                        ? "Please Upload Image Having Type .jpeg/.jpg/.png/.svg only."
                        : "Type .jpeg/.jpg/.png/ only."}
                    </span>
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

      <div className=' row  bg-white mb-5 mt-3 pt-3 ' style={{ marginBottom: "20rem", marginRight: "1.2rem", marginLeft: "1.2rem" }}>
        <div className='col-12 col-md-6  '>
          <Image alt='contact' src={contact_us_img} />
        </div>
        <div className='col-12 col-md-6 mb-5 ,'>
          {console.log(props.facCategory, "props...........")}
          <h6 className='text-center py-2 bg-color text-white mb-0 mt-3 mt-md-0'>
            <b>Frequently Asked Question</b>
          </h6>
          {FaqcategoryLoader ? (
            <div style={{ textAlign: "center", marginTop: "0.6rem" }}>
              <Skeleton
                fullWidth
                animation='wave'
                style={{ height: "3.7rem", marginTop: "-1rem" }}
              />
              <Skeleton
                fullWidth
                animation='wave'
                style={{ height: "3.7rem", marginTop: "-1rem" }}
              />
              <Skeleton
                fullWidth
                animation='wave'
                style={{ height: "3.7rem", marginTop: "-1rem" }}
              />
              <Skeleton
                fullWidth
                animation='wave'
                style={{ height: "3.7rem", marginTop: "-1rem" }}
              />
              <Skeleton
                fullWidth
                animation='wave'
                style={{ height: "3.7rem", marginTop: "-1rem" }}
              />
              <Skeleton
                fullWidth
                animation='wave'
                style={{ height: "3.7rem", marginTop: "-1rem" }}
              />
              <Skeleton
                fullWidth
                animation='wave'
                style={{ height: "3.7rem", marginTop: "-1rem" }}
              />
            </div>
          ) : (
            <div >
              {props.facCategory.map((content, index) => (
                <div key={index}>
                  <Link href={`/faq?id=${content.faqcat_id}`} prefetch={false} legacyBehavior>
                    <a style={{ textDecoration: "none" }}>
                      <Button
                        style={{ background: "white", color: "#484848", textTransform: "capitalize", width: "99%" }}
                        className='m-1'
                        fullWidth
                        variant='outlined'
                        color='primary'>
                        {content.category + " related questions"}
                      </Button>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .div-shadow {
            box-shadow: 0px 0px 6px 0px #00000040;
          }
          .submitButton{
            min-height:2rem;
            max-height:2.3rem;
          }
        `}
      </style>
    </div>
  );
}



// export async function getServerSideProps(context) {
  
//   const body = {
//     url: 'https://www.mypustak.com/contact-us'
//   };
//   const seo_res = await fetch(`https://api.mypustak.com/api/v1/seo_tags/seo-data`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)

//   })
//   const seo_data = await seo_res.json()

//   let title_tag = ""
//   let meta_description = ""
//   if (seo_data.title_tag) {
//     title_tag = seo_data.title_tag
//     meta_description = seo_data.meta_desc

//   }
//   else {
//     title_tag = 'free books online |used books online India !'
//     meta_description = 'Only online free books used bookstore . Delivering in all pincodes in India. Providing fast delivery. 100% Quality assured. Engineering, medical, government jobs, novels, olympiad, school, children, university and many more books available.'
//   }
//   console.log(title_tag, "||", meta_description)



//   return {
//     props: {
//       title_tag, meta_description,
//       og_url: 'https://www.mypustak.com/free-books'
//     }
//   }
// }


const mapStateToProps = state => ({
  facCategory: state.faqR.facCategory,
});

const mapDispatchToProps = dispatch => {
  return {
    createContactUsAction: body => dispatch(createContactUsAction(body)),
    uploadQuerryImages: (data, id) => dispatch(uploadQuerryImages(data, id)),
    getFaqCategoryData: () => dispatch(getFaqCategoryData()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Page));
