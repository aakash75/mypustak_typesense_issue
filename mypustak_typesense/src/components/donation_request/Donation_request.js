"use client"
import React, { Component } from "react";
import styles from "../../styles/DonarAccDonarReq.module.css";
import InboxIcon from "@mui/icons-material/Inbox";
import Link from "next/link";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { connect } from "react-redux";
import { AuthInstance, url } from "../../helper/api_url";
import Snackbar from "@mui/material/Snackbar";
import { updateDonation } from "../../redux/actions/BackenddonationActions";
import {
  GetDonationHistory,
  Get_Rp_Id,
  fetch_donor_pickupdates,
} from "../../redux/actions/donationActions";
import Table from "react-bootstrap/Table";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import Head from "next/head";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { NoSsr } from "@mui/material";
import NextBreadcrumbs from "../Breadcrumbs/NextBreadcrumbs";
import Image from "next/legacy/image";
function TabContainer({ children, dir }) {
  return (
    <Typography component='div' dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}
class DonarAccDonarReq extends Component {
  state = {
    successSnack: false,
    paid_donation_id: "",
    min_new_date: "",
    paid_new_date: new Date(),
    pay_wt: "",
    razr_payid: "",
    open_payDialog: false,
    loader: false,
    value: 0,
    ordersTabValue: 0,
    isdata: false,
    showMsg: false,
    message: "",
    page: 1,
    btnLoader: false,
    serverError: false,
    initialLoader: true,
    responceLength: "",
    emptySatet: "",
  };

  async componentDidMount() {
    if (this.props.userComponentStatus == 2) {
    } else if (this.props.userComponentStatus == 1) {
      let BackUrl = "donor/donor_donation_request";
      window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
    }
    let res = await this.props.GetDonationHistory(this.state.page);
    console.log(res, "resssssssss");
    this.setState({ emptySatet: "1" });
    if (res) {
      this.setState({ initialLoader: false, responceLength: res.length });
    }
    let paid_dates = this.paiddate(this.state.paid_new_date, 1);
    this.props
      .fetch_donor_pickupdates()
      .then(res => {
        if (this.props.free_pickup.min_dates) {
          let date = this.props.free_pickup.min_dates;
          let d = new Date(date);
          console.log(d, "12345", this.props.free_pickup.min_dates, date);
          this.setState({ min_new_date: d });
        }
        const { kolkata_free_pickup } = this.props;
        if (Object.keys(kolkata_free_pickup).length) {
          if (kolkata_free_pickup.min_dates == 0) {
            this.setState({ only_kolkata_pickup: true });
          }
        }
      })
      .catch(err => console.log(err));
  }
  componentDidUpdate(prevProps, prevState) {
    // alert("2")
    if (this.props.userComponentStatus !== prevProps.userComponentStatus) {
      if (this.props.userComponentStatus == 1) {
        let BackUrl = "donor/donor_donation_request";
        // localStorage.setItem("BackUrl", BackUrl)
        window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
      } else if (this.props.userComponentStatus == 2) {
        // localStorage.removeItem("BackUrl")
      }
    }
    if (this.state.emptySatet !== prevState.emptySatet) {
      this.props
        .GetDonationHistory(this.state.page)
        .then(res => {
          this.setState({ initialLoader: false, responceLength: res.length });
        })
        .catch(err => {
          this.setState({ initialLoader: false, responceLength: "" });
        });
    }
  }
  paiddate = (date, day) => {
    let da = date.getDay();
    // alert(da)
    if (da == 6) {
      let selectedday = date.setDate(date.getDate() + 2);
      let d = new Date(selectedday);
      // alert(d)
      return d;
    } else {
      let selectedday = date.setDate(date.getDate() + 1);
      let d = new Date(selectedday);
      // alert(d)
      return d;
    }
  };
  handleChangeOrdersTabs = (event, value) => {
    this.setState({ ordersTabValue: value });
  };
  handleChangeOrdersIndex = index => {
    this.setState({ ordersTabValue: index });
  };
  openTrackingUrl = tracking_no => {
    if (tracking_no) {
      let master_tracking_no = tracking_no.split(",")[0];
      let url = `https://www.fedex.com/apps/fedextrack/index.html?action=track&tracknumbers=${master_tracking_no}&locale=en_US&cntry_code=en`;
      window.open(url);
    } else {
      this.setState({
        showMsg: true,
        message: "No Tracking Number Was Found.Please Contact Mypustak Support",
      });
    }
  };

  handleClose = () => {
    this.setState({
      showMsg: false,
      message: "",
      open_payDialog: false,
      successSnack: false,
    });
  };

  paypickup = (wt, req_id) => {
    this.setState({
      open_payDialog: true,
      pay_wt: this.greater(wt),
      paid_donation_id: req_id,
    });
    let data = {
      data: {
        ref_id: `${this.props.userId}`,
        // "amount": `${this.greater(this.props.match.params.wt)}`,
        amount: this.greater(wt),
      },
    };
    this.props.Get_Rp_Id(data).then(res => {
      console.log(res.data.output.rp_id, "razpid");
      this.setState({
        razr_payid: res.data.output.rp_id,
        pay_wt: this.greater(wt),
      });
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
        contact: `${this.props.getuserdetails.phone}`,
        email: `${this.props.getuserdetails.email}`,
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
        handler: function (data) {
          // console.log(this, data)
          // alert(data)
        },
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
    // return (new_wt>val)?2:1
  }
  paidonChangeHandler_date = date => {
    this.setState({ paid_new_date: date });
  };

  pay_pickup = () => {
    let d = this.state.free_new_date.getTime() / 1000;
    let body = {
      donation_req_id: this.state.paid_donation_id,
      pickup_date_time: d,
    };
    this.props
      .updateDonation({ donation: body })
      .then(res => {
        // alert("hi")
        this.razorpay_open();
      })
      .catch(err => {
        console.log(err);
      });
  };
  LoadMoreHande = () => {
    let newPage = this.state.page + 1;
    this.setState({ page: newPage, btnLoader: true });
    this.props
      .GetDonationHistory(newPage)
      ?.then(res => {
        this.setState({ btnLoader: false, responceLength: res.length });
      })
      .catch(err => {
        this.setState({ btnLoader: false, responceLength: "" });
      });
  };
  render() {
    const isWeekday = date => {
      const day = date.getDay();
      return day !== 0;
    };
    const { showMsg, message } = this.state;
    var DOnatedBooks = [];
    console.log(this.props.donationHistory, "this.props.donationHistory");
    Object.keys(this.props.donationHistory).map(val => {
      var books = this.props.donationHistory[val].books;
      books.map(data => {
        // console.log(data,"2322")
        DOnatedBooks.push(data);
      });
    });
    const Chnage_iDate = date => {
      let convDate = new Date(date);
      return (
        convDate.getDate() +
        "-" +
        (convDate.getMonth() + 1) +
        "-" +
        convDate.getFullYear()
      );
    };

    const CheckStatus = status => {
      if (status === 1) {
        // return({ "status":"Pending","color":"black"})
        return { status: "Submitted", color: "black" };
      } else if (status === 2) {
        return "In Queue";
      } else if (status === 3) {
        return { status: "Processing", color: "#375ca9" };
      } else if (status === 4) {
        return { status: "Shipping", color: "#375ca9" };
      } else if (status === 5) {
        return { status: "Delivered/Dispatch", color: "#93aa3b" };
      } else if (status === 8) {
        return { status: "Not Shipping", color: "#ffc107" };
      } else if (status === 9) {
        return { status: "Follow up", color: "#375ca9" };
      } else if (status === 10) {
        return { status: "PickUp Exception", color: "#ffc107" };
      } else if (status === 11) {
        return { status: "Ready to book", color: "#375ca9" };
      } else if (status === 12) {
        return { status: "Hold by donor", color: "#e75c26" };
      } else if (status === 13) {
        // return ({"status":"Unpaid","color":"blue"})
        return { status: "pending", color: "blue" };
      } else {
      }
    };
    const ConvDate = date => {
      try {
        // alert(date)
        var cDate = new Date(date * 1000);
        return cDate.toDateString();
      } catch (error) {
        var covdate = new Date(date.getTime() / 1000);
        // alert(covdate)
        return date;
      }
    };

    if (this.state.isdata === false) {
      console.log(this.props.donationHistory,"222222");
      return (
        <React.Fragment>
          <Head>
            <script
              type='text/javascript'
              src='https://checkout.razorpay.com/v1/checkout.js' async></script>
          </Head>
          <NoSsr>
            <NextBreadcrumbs />
          </NoSsr>
          <React.Fragment>
            {this.props.isServerError ? (
              <div style={{ textAlign: "center", padding: "2rem 0rem" }}>
                <InboxIcon style={{ fontSize: "5rem" }} />

                <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  {" "}
                  Something Went Wrong!
                </div>
                <div style={{ fontSize: "0.9rem" }}>
                  {" "}
                  Seems to be network issue, Try Again
                </div>

                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    style={{ width: "9rem", margin: "1rem 0rem" }}
                    onClick={() => window.location.reload()}>
                    {" "}
                    Reload
                  </Button>
                </div>
              </div>
            ) : (
              <div className={`${styles.donation_maindiv}`}>
                {this.state.initialLoader ? (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "4rem",
                      background: "whitesmoke",
                    }}>
                    <CircularProgress size={50} />
                  </div>
                ) : (
                  <div>
                    <div className={`${styles.pagetitle}`}>My Donations</div>
                    <div className={`${styles.donation_body}`}>
                      <AppBar
                        position='static'
                        color='default'
                        style={{
                          outline: "none",
                          zIndex: 100,
                          background: "white",
                        }}>
                        <Tabs
                          value={this.state.ordersTabValue}
                          onChange={this.handleChangeOrdersTabs}
                          indicatorColor='primary'
                          textColor='primary'
                          variant='fullWidth'
                          style={{ outline: "none" }}
                          centered>
                          <Tab label='Donation Requests' />
                          <Tab label='Donated Books' />
                        </Tabs>
                      </AppBar>

                      <SwipeableViews
                        axis='x-reverse'
                        index={this.state.ordersTabValue}
                        onChangeIndex={this.handleChangeOrdersIndex}
                        style={{
                          border: "1px solid #d5d5d5",
                          background: "white",
                          // maxHeight: "80vh",
                        }}>
                        <TabContainer dir={"x-reverse"}>
                          {this.state.loader ? (
                            <center>
                              {" "}
                              <CircularProgress />
                            </center>
                          ) : this.props.donationHistory.length ? (
                            <Table id='donatetable1' responsive='lg'>
                              <thead>
                                <tr>
                                  <th>Id</th>
                                  <th>Expected PickUp Date</th>
                                  <th>Request Donation</th>
                                  <th>Queue No</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.props.donationHistory.map(
                                  (data, index) => (
                                    <tr key={data.req_id}>
                                      <td>{data.req_id}</td>
                                      <td>
                                        {ConvDate(data.pickup_date_time)}
                                        <p
                                          style={{
                                            fontSize: "0.8rem",
                                            color: "#375ca9",
                                            paddingTop: "0.5rem",
                                          }}>
                                          {[1, 2, 3, 4].includes(data.status)
                                            ? "We Will Contact You Before Pickup date"
                                            : null}
                                        </p>
                                      </td>
                                      <td>
                                        {data.no_of_book}
                                        {data.no_of_book > 1
                                          ? " Books"
                                          : " Book"}
                                      </td>
                                      {/* <td>{Chnage_iDate(data.i_date)}</td> */}
                                      <td>
                                        {data.queue_no &&
                                          [1, 2].includes(data.status)
                                          ? data.queue_no
                                          : "-"}
                                      </td>
                                      <td>
                                        <div>
                                          <p
                                            style={{
                                              color: CheckStatus(data.status)
                                                .color,
                                            }}>
                                            {CheckStatus(data.status).status}
                                          </p>

                                          {[3, 4].includes(data.status) &&
                                            data.tracking_no ? (
                                            <p>
                                              <Button
                                                variant='outlined'
                                                color='primary'
                                                size='small'
                                                onClick={() =>
                                                  this.openTrackingUrl(
                                                    data.tracking_no
                                                  )
                                                }>
                                                <span>
                                                  {" "}
                                                </span>
                                                Track
                                              </Button>
                                            </p>
                                          ) : null}
                                        </div>
                                      </td>

                                      <td>
                                        <p>
                                          {[1, 2, 3, 13].includes(
                                            data.status
                                          ) && data.is_paid == "N" ? (
                                            <React.Fragment>
                                              <center>
                                                <p
                                                  style={{
                                                    fontSize: "0.7rem",
                                                    maxWidth: "10rem",
                                                  }}>
                                                  Pay Pickup Charges For
                                                  Immediate Pickup
                                                </p>

                                                <Button
                                                  variant='outlined'
                                                  color='primary'
                                                  size='small'
                                                  onClick={() =>
                                                    this.paypickup(
                                                      data.app_books_weight,
                                                      data.req_id
                                                    )
                                                  }>
                                                  pay now
                                                </Button>
                                              </center>
                                            </React.Fragment>
                                          ) : (
                                            ""
                                          )}
                                        </p>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </Table>
                          ) : (
                            <div style={{ textAlign: "center" }}>
                              <div>You have No Donation Request</div>
                              <div>
                                <Link href='/donate-books' prefetch={false} legacyBehavior>
                                  <a href='/donate-books'>
                                    <Button
                                      variant='contained'
                                      color='primary'
                                      style={{
                                        width: "10rem",
                                        margin: "1rem 0rem",
                                      }}>
                                      Donate Now{" "}
                                    </Button>
                                  </a>
                                </Link>
                              </div>
                            </div>
                          )}
                        </TabContainer>
                        <TabContainer dir={"x"}>
                          {DOnatedBooks.length ? (
                            <div className={`row ${styles.bookrow} `}>
                              {DOnatedBooks.map(book => (
                                <div
                                  className={`${styles.eachbook} col-lg-2 col-md-3 col-sm-3 col-5`}
                                  key={book.title}>
                                  <div className=' '>
                                    <div className='' style={{}}>
                                      <div className={` ${styles.eachbook_img} `}>
                                        <Image
                                          alt="book image"
                                          src={`https://d1f2zer3rm8sjv.cloudfront.net/${book.thumb}`}
                                          height={140}
                                          width={140}
                                          layout='responsive'
                                        />
                                      </div>
                                      <div className={` ${styles.each_booktitle} `}>
                                        {book.title}
                                      </div>
                                    </div>
                                    <div className={` ${styles.each_bookstatus} `}>
                                      Status :- {book.status}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div style={{ textAlign: "center" }}>
                              We are not able to find any Information . Books
                              details will be updated on priority basis once
                              received to us
                              <p>
                                For more details kindly Write to us at
                                support@mypustak.com
                              </p>
                            </div>
                          )}
                        </TabContainer>
                      </SwipeableViews>
                      {this.state.responceLength == 10 ? (
                        <div
                          style={{ textAlign: "center", marginTop: "0.8rem" }}>
                          {this.state.btnLoader ? (
                            <Button
                              style={{ height: "2.4rem", width: "7.1rem" }}
                              color='primary'
                              variant='contained'>
                              <CircularProgress style={{ color: "white" }} size={19} />
                            </Button>
                          ) : (
                            <Button
                              style={{ height: "2.4rem", width: "7.1rem" }}
                              color='primary'
                              variant='contained'
                              onClick={() => {
                                this.LoadMoreHande();
                              }}>
                              Load More
                            </Button>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            )}

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
                        You Can Pay On Pick Up Cost For:- Immediate Pick Up
                        Making it more cheaper for the next user of your
                        valuable books.
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
                          // placeholderText="Select a date after 5 days ago"
                          inline
                        />
                        {/* onwards */}
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
                      onClick={this.razorpay_open}
                    >
                      OK, Let Me Make The Payment &#8377;{this.state.pay_wt}
                    </Button>
                  </div>
                </center>
              </DialogContent>
            </Dialog>

            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              open={showMsg}
              autoHideDuration={3000}
              onClose={this.handleClose}
              message={message}
            />
          </React.Fragment>
          <style jsx>
            {`

            `}
          </style>
        </React.Fragment>
      );
    }
  }
}
const mapStateToProps = state => ({
  donationHistory: state.donationR.donationHistoryS,
  isServerError: state.donationR.isServerError,
  userComponentStatus: state.accountR.userComponentStatus,
  userId: state.accountR.getuserdetails.id,
  getuserdetails: state.accountR.getuserdetails,
});
export default connect(mapStateToProps, {
  GetDonationHistory,
  Get_Rp_Id,
  fetch_donor_pickupdates,
  updateDonation,
})(DonarAccDonarReq);
