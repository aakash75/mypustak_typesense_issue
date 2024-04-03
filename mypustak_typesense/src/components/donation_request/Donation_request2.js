import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DatePicker from "react-datepicker";
import { Button, Table } from "react-bootstrap";
import Snackbar from "@mui/material/Snackbar";
import { updateDonation } from "../../redux/actions/BackenddonationActions";
import {
  GetDonationHistory,
  Get_Rp_Id,
  fetch_donor_pickupdates,
} from "../../redux/actions/donationActions";
import { connect } from "react-redux";
// import MuiAlert from "@mui/material/Alert";
import { Typography } from "@mui/material";

// function Alert(props) {
//   return <MuiAlert elevation={6} variant='filled' {...props} />;
// }
function TabContainer({ children, dir }) {
  return (
    <Typography component='div' dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}
class Donation_request2 extends Component {
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

  componentDidMount() {
    // if (localStorage.getItem("user") === null) {
    //   // alert("RED")
    //   window.location.href = "/"
    // } else {
    //   const token = `Token ${localStorage.getItem("user")}`
    // if (this.props.userComponentStatus == 2) {
    //   // localStorage.removeItem("BackUrl")
    // } else if (this.props.userComponentStatus == 1) {
    //   let BackUrl = "donor/donor_donation_request";
    //   // localStorage.setItem("BackUrl", BackUrl)
    //   Router.push(`/account/Loginpage?ret=/${BackUrl}`);
    // }
    const token = localStorage.getItem("user_info");
    if (!token) {
      let BackUrl = "/donor/donor_donation_request";
      window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
    }
    this.setState({ loader: true });
    this.props.GetDonationHistory("");
    // .then(res => {
    //   this.setState({ loader: false });
    // })
    // .catch(err => {
    //   console.log(err);
    //   this.setState({ loader: false });
    // });
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
          // console.log(kolkata_free_pickup.start_date ,kolkata_free_pickup.start_date < current_timestamp,'start_date');
          // console.log(kolkata_free_pickup.end_date ,current_timestamp < kolkata_free_pickup.end_date,'end_date');

          if (kolkata_free_pickup.min_dates == 0) {
            this.setState({ only_kolkata_pickup: true });
          }
          // this.setState({start_date:kolkata_free_pickup.start_date*1000,end_date:kolkata_free_pickup.end_date*1000})
        }
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps) {
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
  }

  paiddate = (date, day) => {
    // alert(date)
    // alert(day)
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

    // alert(d)
    // return d
  };
  render() {
    const isWeekday = date => {
      const day = date.getDay();
      return day !== 0;
    };
    console.log(this.props);
    const { showMsg, message } = this.state;
    return (
      <div>
        <div className='donation_maindiv'>
          <div className='pagetitle'>My Donations</div>

          <div className='donation_body'>
            <AppBar
              position='static'
              color='default'
              style={{ outline: "none", zIndex: 100 }}>
              <Tabs
                // value={this.state.ordersTabValue}
                // onChange={this.handleChangeOrdersTabs}
                indicatorColor='primary'
                textColor='primary'
                variant='fullWidth'
                style={{ outline: "none" }}
                centered>
                <Tab label='Donation Requests' />
                <Tab label='Donated Books' />
              </Tabs>
            </AppBar>
          </div>
        </div>

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

        {/* <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.successSnack}
          style={{ zIndex: "4000" }}
          autoHideDuration={3000}
          onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity='success'>
            <center>Payment Sucessfull</center>
          </Alert>
        </Snackbar> */}

        <style jsx>
          {`
               
                  .donation_maindiv {
                    background: white;
                    padding: 1%;
                    margin: 1%;
                    margin-top: 0%;
                    border-radius: 5px;
                  }
                  .pagetitle {
                    text-align: center;
                    font-weight: bold;
                    font-size: 1.2rem;
                  }
                  .donation_body {
                    margin-top: 2%;
                  }
                  .bookrow{
                    justify-content:center;
                  }
                  .eachbook{
                    border:1px solid lightgrey;
                    padding: 0.5% 1%;
                    margin:1% ;
                    border-radius:5px;
                    
                  }
                  .eachbook_img{
                    display:flex:
                    justify-content:center;
                    align-item:center;
                    // border:1px solid blue;
                    max-height:35vh;
                  }
                     .eachbook_img img{
                       align-item:center;
                       margin-left:10%;
                       width:10vw;
                       height:30vh;
                     }
                     .each_booktitle{
                       text-align:center;
                       font-size:0.8rem;
                       font-weight:bold;
                       padding:1% 0%;
                     }
                     .each_bookstatus{
                        padding:1% 0%;
                        font-size:0.7rem;
                        text-align:center;
                        font-weight:bold;
                     }
    
                `}
        </style>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  donationHistory: state.donationR.donationHistoryS,
  userComponentStatus: state.accountR.userComponentStatus,
  userId: state.accountR.getuserdetails.id,
  getuserdetails: state.accountR.getuserdetails,
});
export default connect(mapStateToProps, {
  GetDonationHistory,
  Get_Rp_Id,
  fetch_donor_pickupdates,
  updateDonation,
})(Donation_request2);
