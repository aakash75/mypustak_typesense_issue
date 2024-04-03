import React, { Component } from "react";
import { connect } from "react-redux";
import {
  SetPickup,
  Get_Rp_Id,
  fetch_donor_pickupdates,
} from "../../../redux/actions/donationActions";
import {
  updateDonation,
  getDonationById,
} from "../../../redux/actions/BackenddonationActions";
import Link from "next/link";
import axios from "axios";
import { AuthInstance, url } from "../../../helper/api_url";
import ReactGA from "react-ga";
import Head from "next/head";
// import { withStyles } from "@material-ui/core/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import { withSnackbar } from "notistack";

import DialogContent from "@mui/material/DialogContent";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import Snackbar from "@mui/material/Snackbar";
import { Skeleton } from "@mui/material";

// const styles = theme => ({
//   root: {
//     width: "100%",
//   },
//   button: {
//     marginRight: theme.spacing(1),
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
// });
class DonationThanks extends Component {
  state = {
    successSnack: false,
    paid_donation_id: "",
    min_new_date: "",
    paid_new_date: new Date(),
    pay_wt: "",
    razr_payid: "",
    open_payDialog: false,
    UserDonationId: "",
    activeStep: 1,
    steps: [
      "Donation Form Filled",
      "Pack Your Books",
      "Inform Us To Arrange Pickup",
    ],
    self_pickup_steps: [
      "Donation Form Filled",
      "Pack Your Books",
      "Inform Us once dispatched the books",
    ],
    SkeletonLoader: false,
  };

  getSteps = () => {
    return ["Select campaign settings", "Create an ad group", "Create an ad"];
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return "Select campaign settings...";
      case 1:
        return "What is an ad group anyways?";
      case 2:
        return "This is the bit I really care about!";
      default:
        return "Unknown step";
    }
  };

  handleBack = () => {
    // alert("back")
    if (this.state.activeStep > 1) {
      this.setState({ activeStep: this.state.activeStep - 1 });
    }
  };

  handleNext = () => {
    // alert("next")
    this.setState({ activeStep: this.state.activeStep + 1 });
  };
  backToHome() {
    window.location = `/donate`;
  }
  componentDidMount() {
    this.setState({ SkeletonLoader: true });
    ReactGA.pageview(window.location.pathname + window.location.search);
    let userDId = localStorage.getItem("UserDonationId");
    this.setState({
      UserDonationId: localStorage.getItem("UserDonationId"),
      paid_donation_id: localStorage.getItem("UserDonationId"),
    });
    // alert(userDId, "did")
    // console.log("jjfjfjfjffjnfjfnjfjfjf")
    this.props
      .getDonationById({ donation_req_id: userDId })
      .then(res => {
        console.log(
          this.props.currentDonation,
          "donorinfo",
          this.props.currentDonation.app_books_weight
        );
        this.setState({
          pay_wt: this.props.currentDonation.app_books_weight,
        });
        if (res.donation_req_id) {
          this.setState({ SkeletonLoader: false });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ SkeletonLoader: true });
      });
    this.props.SetPickup();
    this.initializeRazorpay()

  }

  initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.UserDonationId !== prevState.UserDonationId) {
      this.props
        .getDonationById({ donation_req_id: this.state.UserDonationId })
        .then(res => {
          console.log(
            this.props.currentDonation,
            "donorinfo",
            this.props.currentDonation.app_books_weight
          );
          this.setState({
            pay_wt: this.props.currentDonation.app_books_weight,
          });
        })
        .catch(err => {
          console.log(err);
        });
      localStorage.setItem("UserDonationId", this.props.donation_req_id);
      // }

      const Data = {
        donationId: this.props.donation_req_id,

        email: this.props.UserEmail,
      };

      axios
        .post(`${url}/common/donationEmail/`, Data)
        .then(res => {
          // console.log(res, Data);
          window.location.reload();
        })
        .catch(err => console.log(err, Data));
    }
  }

  paypickup = () => {
    let wt = this.state.pay_wt;
    this.setState({
      open_payDialog: true,
      pay_wt: this.greater(wt),
      // pay_wt:1
    });
    let data = {
      data: {
        ref_id: `${this.props.currentDonation.user_id}`,
        // "amount": `${this.greater(this.props.match.params.wt)}`,
        amount: this.greater(wt),
      },
    };
    this.props.Get_Rp_Id(data).then(res => {
      // console.log(res.data.output.rp_id, "razpid");
      this.setState({
        razr_payid: res.data.output.rp_id,
        pay_wt: this.greater(wt),
      });
    });
  };
  handleClose = () => {
    this.setState({
      showMsg: false,
      message: "",
      open_payDialog: false,
      successSnack: false,
    });
  };

  razorpay_open = () => {
    const options = {
      // key: "rzp_live_pvrJGzjDkVei3G", //Paste your API key here before clicking on the Pay Button.
      key: "rzp_live_cNDMU35KKMCp6t", //Paste your API key here before clicking on the Pay Button.

      amount: `${this.state.pay_wt}00`,
      name: `Mypustak.com`,
      description: "Donation",
      "Order Id": `${this.state.razr_payid}`, //Razorpay Order id
      currency: "INR",

      handler: response => {
        const razorpay_payment_id = response.razorpay_payment_id;
        const razorpay_order_id = response.razorpay_order_id;
        const razorpay_signature = response.razorpay_signature;
        // console.log(razorpay_payment_id)
        // console.log(razorpay_order_id)
        // console.log(razorpay_signature)
        this.setState({ SendRzPay: razorpay_payment_id });
        const paid_pick_up_date = this.state.paid_new_date.getTime() / 1000;
        this.setState({ open_payDialog: false });
        const SendData = {
          payment_id: `${razorpay_payment_id}`,
          payment_url: `www.razorpay.com`,
          payvalue: this.state.pay_wt,
          is_paid_donation: "Y",
          pickup_date_time: paid_pick_up_date,
        };
        // http://103.217.220.149:80/api/v1/patch/add_paymentid_donationreqtable/update-donation/7213
        AuthInstance.patch(
          `${url}/api/v1/patch/add_paymentid_donationreqtable/update-donation/${this.state.paid_donation_id}`,
          SendData
        )
          .then(res => {
            this.setState({ loader: true, successSnack: true });
            this.z
            this.props
              .GetDonationHistory("")
              .then(res => {
                this.setState({ loader: false });
              })
              .catch(err => {
                console.log(err);
                this.setState({ loader: false });
              });
          })
          .catch(err => {
            console.log(err);
            this.setState({ open_payDialog: false });
          });
      },

      prefill: {
        // "method":"card,netbanking,wallet,emi,upi",
        contact: `${this.props.currentDonation.mobile}`,
        email: `${this.props.currentDonation.email_id}`,
      },

      notes: {
        "Order Id": `${this.state.paid_donation_id}`,
        address: "customer address to be entered here",
      },
      theme: {
        color: "#1c92d2",
        emi_mode: true,
      },

      external: {
        wallets: ["mobikwik", "jiomoney"],
        handler: function (data) { },
      },
    };

    this.rzp1 = new window.Razorpay(options);
    // this.razorpay_open()
    this.rzp1.open();
  };
  greater(wt) {
    const new_wt = 20 * wt;
    const val = 150;

    return new_wt > val ? new_wt : val;
  }
  paidonChangeHandler_date = date => {
    this.setState({ paid_new_date: date });
  };

  paiddate = (date, day) => {
    let da = date.getDay();
    if (da == 6) {
      let selectedday = date.setDate(date.getDate() + 2);
      let d = new Date(selectedday);
      return d;
    } else {
      let selectedday = date.setDate(date.getDate() + 1);
      let d = new Date(selectedday);
      return d;
    }
  };

  render() {
    const isWeekday = date => {
      const day = date.getDay();
      return day !== 0;
    };
    const id = this.props.donation_req_id;
    // console.log(this.props.UserEmail);
    console.log(
      this.props.donation_req_id,
      "donnorid",
      this.state.UserDonationId
    );

    return (
      <React.Fragment>
        <div>
          <Head>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1, shrink-to-fit=no'
            />
            <title>
              {" "}
              Books Online India, Buy Online Book In India –mypustak.com
            </title>
            <meta
              name='og:title'
              property='og:title'
              content='Books Online India, Buy Online Book In India –mypustak.com'
            />
            <meta
              name='og:description'
              property='og:description'
              content='  Books are the hub of knowledge. Get the books online in India with us. We aimed to aid (help) the needy one with education and knowledge.'
            />
            <meta
              name='og:image'
              property='og:image'
              content='https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png'
            />

            <script
              type='text/javascript'
              src='https://checkout.razorpay.com/v1/checkout.js' async></script>
          </Head>

          <React.Fragment>
            <div className='thanksbody m-2 bg-white p-2'>
              <div style={{}}>
                <div style={{}}>
                  <p id='l1_thanks' className='center'>
                    Thank You For Your Donation Request{" "}
                  </p>
                  <p className='center'>
                    <span id='part1'>Your Donation Request Id Is:</span>
                    <span id='part2'>
                      <b>
                        {this.props.donation_req_id == 0
                          ? this.state.UserDonationId
                          : this.props.donation_req_id}
                      </b>
                      <span style={{ fontSize: "0.9rem", color: "gray" }}>
                        {" "}
                        (Please Note For Future Reference)
                      </span>
                    </span>
                  </p>
                </div>
                {this.props.currentDonation.donation_type == 2 ? (
                  <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {this.state.self_pickup_steps.map(label => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                ) : (
                  <Stepper activeStep={this.state.activeStep} alternativeLabel>
                    {this.state.steps.map(label => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                )}
                <div>
                  {this.state.activeStep === this.state.steps.length ? (
                    <div>
                      <Typography className={classes.instructions}>
                        All steps completed
                      </Typography>
                      <Button onClick={handleReset}>Reset</Button>
                    </div>
                  ) : (
                    <div className=''>
                      {this.state.SkeletonLoader ? (
                        <div>
                          <Skeleton
                            animation='wave'
                            variant='rectangular'
                            style={{ height: "250px" }}
                          />
                        </div>
                      ) : (
                        <div className='row justify-content-center'>
                          {this.props.currentDonation.donation_type ==
                            2 ? null : (
                            <div className='col-md-6 col-sm-12'>
                              <Card
                                style={{
                                  padding: "1%",
                                  margin: "1%",
                                  height: "250px",
                                }}
                                variant='outlined'>
                                <center>
                                  <span style={{ marginRight: "3%" }}>
                                    Step
                                  </span>
                                  <Badge
                                    color='primary'
                                    badgeContent={2}></Badge>
                                  <p style={{ fontSize: "20px" }}>
                                    Please Keep Your Books Packed in
                                    Cartons/Boxes
                                  </p>
                                </center>
                                <div>
                                  <img
                                    style={{
                                      width: "40%",
                                      marginLeft: "3%",
                                      marginRight: "4%",
                                    }}
                                    src={`https://d239pyg5al708u.cloudfront.net/uploads/banner/openbox.jpg`}
                                    alt=''
                                  />

                                  <img
                                    style={{ width: "50%" }}
                                    src={`https://d239pyg5al708u.cloudfront.net/uploads/banner/closebox1.jpg`}
                                    alt=''
                                  />
                                </div>
                                <li style={{ marginTop: "1%" }}>
                                  Kindly Follow
                                  <span
                                    style={{
                                      margin: "0 0.2rem",
                                      textDecoration: "none",
                                    }}>
                                    <Link href='/pages/book-condition-guidelines' prefetch={false} legacyBehavior>
                                      Book Conditional Guidlines
                                    </Link>
                                  </span>
                                  While Packing Your Books
                                </li>
                              </Card>
                            </div>
                          )}
                          <div className='col-md-6 col-sm-12  '>
                            <Card
                              style={{
                                padding: "1%",
                                margin: "1%",
                                height: "280px",
                              }}
                              variant='outlined'>
                              <center>
                                <span style={{ marginRight: "3%" }}>Step</span>
                                <Badge color='primary' badgeContent={3}></Badge>
                                {this.props.currentDonation.donation_type ==
                                  2 ? (
                                  <p style={{ fontSize: "20px" }}>
                                    Kindly Inform Us Once You Dispatched The
                                    Books
                                  </p>
                                ) : (
                                  <p style={{ fontSize: "20px" }}>
                                    Kindly Inform Us Once Your Books Are Packed
                                  </p>
                                )}
                              </center>

                              <div>
                                {/* <p style ={{textAlign:"justify"}}> */}
                                <ul>
                                  <li style={{ marginTop: "4%" }}>
                                    Please <b>Whatsapp On 033-418-04333</b>
                                    <br />
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "#2248ae",
                                      }}>
                                      {/* (Mention Donation Id, Number of boxes and
                                  preferred Date of Pickup) */}
                                      (Mention Donation Id, Shipping Details ,
                                      Tracking Number , Number of Packet ,
                                      Courier Name)
                                    </span>
                                    <p
                                      style={{
                                        fontSize: "20px",
                                        marginTop: "3%",
                                      }}>
                                      <center
                                        style={{
                                          color: "#2248ae",
                                          fontWeight: "bold",
                                        }}>
                                        We are awaiting for your response!
                                      </center>
                                    </p>
                                    {this.props.currentDonation.donation_type ==
                                      2 ? (
                                      <p>
                                        <center>
                                          Address :<br />
                                          EDUCATEXLABS PRIVATE LIMITED
                                          3908/3980, EAST BERABERI , SIKHER
                                          BAGAN GOPALPUR RAJARHAT KOLKATA,
                                          PARGANAS NORTH-700136 WEST BENGAL
                                        </center>
                                      </p>
                                    ) : null}
                                  </li>
                                </ul>
                                {/* </p> */}
                              </div>
                            </Card>
                          </div>
                        </div>
                      )}

                      <img
                        id='handshake'
                        src={`https://d239pyg5al708u.cloudfront.net/uploads/icons/ThankYou.77288eb6.png`}
                        alt=''
                      />
                      <p style={{ textAlign: "center" }}>
                        Thank You For Joining Hands With MyPustak.com and
                        EducatingIndia
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <hr />
              <p style={{ fontSize: "110%", textAlign: "center" }}>
                You Can Track Your Donation Request Status From
                <Link href='/donor/donor_donation_request' prefetch={false} legacyBehavior>
                  <a style={{ textDecoration: "none" }}>
                    <span style={{ color: "#f35631" }}> Donation Account.</span>
                  </a>
                </Link>
              </p>
              {this.props.currentDonation.donation_type == 0 ? (
                <div style={{ textAlign: "center", margin: "1rem" }}>
                  <span style={{ margin: "0 1rem", fontWeight: "bold" }}>
                    Pay Pickup Charges For Immediate Pickup
                  </span>
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    onClick={() => this.paypickup()}>
                    pay now
                  </Button>
                </div>
              ) : null}

              <Link
                href='/'
                style={{ textDecoration: "none" }}
                prefetch={false}
                legacyBehavior>
                <button id='back'>Back To Home</button>
              </Link>
            </div>
          </React.Fragment>

          <Dialog
            open={this.state.open_payDialog}
            onClose={this.handleClose}
            aria-labelledby='form-dialog-title'
            scroll={"body"}
            style={{ zIndex: "3000" }}>
            <DialogContent>
              <center>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Paid Pick Up
                  </div>
                  <div style={{ minHeight: "10rem", padding: "1rem 0rem" }}>
                    <div>
                      You Can Pay On Pick Up Cost For:- Immediate Pick Up Making
                      it more cheaper for the next user of your valuable books.
                    </div>
                    <div>
                      <div
                        style={{
                          color: "#007bff",
                          margin: "1rem 0rem",
                          fontWeight: "bold",
                        }}>
                        Select Available Pick-Up Dates
                      </div>
                      <DatePicker
                        dateFormat='dd-MMMM-yyyy'
                        selected={this.state.paid_new_date}
                        onChange={this.paidonChangeHandler_date}
                        filterDate={isWeekday}
                        minDate={this.paiddate(new Date(), 1)}
                        inline
                      />
                    </div>
                  </div>

                  <div style={{ fontSize: "0.7rem" }}>
                    Select Date as per convenience
                  </div>

                  <Button
                    type='submit'
                    value='OK, Let Me Make The Payment.'
                    variant='contained'
                    color='primary'
                    onClick={this.razorpay_open}>
                    OK, Let Me Make The Payment
                  </Button>
                </div>
              </center>
            </DialogContent>
          </Dialog>
        </div>
        <style jsx>
          {`
            .thanksbody {
            }
            #handshake {
              width: 60px;
              height: 60px;
              display: block;
              margin-left: auto;
              margin-right: auto;
            }
            .center {
              text-align: center;
            }
            #l1_thanks {
              font-size: 150%;
              margin: 0%;
            }
            #l2_we {
              font-size: 130%;
              text-align: center;
            }

            #part1 {
              color: #696969;
            }
            #part2 {
            }
            #procced {
              color: white;
              background-color: #00baf2;
              margin-left: 42%;
              width: 10%;
              border: 0px #00baf2;
              padding: 0.3%;
              border-radius: 3px;
              margin-bottom: 1%;
            }
            #how {
              /* display: flex; */
              padding: 0%;
              margin: 0%;
              margin-left: 30%;
            }
            #back {
              color: white;
              background-color: #2248ae;
              margin-left: 41.5%;
              width: 17vw;
              font-size: 105%;
              padding: 0.5%;
              border: 0px #00baf2;
              border-radius: 3px;
            }
            #thankssubmit {
              width: 10%;
              margin-left: 3%;
              padding-top: 0%;
              background-color: rgb(0, 186, 242);
              color: white;
              border-bottom: 0px;
              border-radius: 3px;
            }
            @media screen and (max-width: 991px) and (min-width: 768px) {
              #thanksbody {
                padding: 0%;
                margin-top: 0%;
                padding-top: 0%;
              }
              #procced {
                width: 15vw;
                margin-left: 42%;
              }
              #thankssubmit {
                width: 12vw;
                padding-top: 0.5%;
              }
              #how {
                margin-left: 25%;
              }
            }
            @media screen and (max-width: 767px) and (min-width: 539px) {
              #thanksbody {
                padding: 0%;
                margin-top: 0%;
                padding-top: 0%;
              }
              #procced {
                width: 15vw;
                margin-left: 42%;
                font-size: 2.5vw;
              }
              #thankssubmit {
                width: 12vw;
                padding-top: 0.5%;
                font-size: 2.5vw;
                margin-left: 9%;
              }
              #back {
                width: 19vw;
                font-size: 2.5vw;
                margin-left: 40%;
              }
              #how {
                padding: 1%;
                margin: 0%;
                margin-left: 37%;
              }
            }
            @media screen and (max-width: 538px) {
              #thanksbody {
                /* padding: 3%; */
                margin-top: 25%;
                width: 96%;
                box-sizing: border-box;
                box-shadow: 0 1px 3px 0 #847676;
                margin-left: 2%;
                margin-bottom: 2%;
              }
              #procced {
                width: 27vw;
                margin-left: 37%;
                font-size: 3.5vw;
                padding: 2%;
              }
              #thankssubmit {
                width: 25vw;
                padding: 2%;
                font-size: 3.5vw;
              }
              #back {
                width: 28vw;
                font-size: 3.5vw;
                margin-left: 36%;
                padding: 2%;
                margin-top: 2%;
              }
              #how {
                padding: 1%;
                margin: 0%;
                margin-left: 37%;
              }
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  donation_req_id: state.donationR.donation_req_id,
  sendMailData: state.donationR.sendDonationMailData,
  UserEmail: state.userdetailsR.getuserdetails.email,
  currentDonation: state.donationBR.currentDonation,
});
export default connect(mapStateToProps, {
  SetPickup,
  Get_Rp_Id,
  fetch_donor_pickupdates,
  updateDonation,
  getDonationById,
})(withSnackbar(DonationThanks));
