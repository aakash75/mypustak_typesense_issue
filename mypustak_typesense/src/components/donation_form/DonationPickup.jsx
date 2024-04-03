import React, { Component } from "react";
import {
  updateDonation,
  Fetch_queue_no,
} from "../../redux/actions/BackenddonationActions";
import moment from "moment";
import {
  Get_Rp_Id,
  ChangeLogin,
  DonationMailData,
  fetch_donor_pickupdates,
  AddDonation_formQueue,
} from "../../redux/actions/donationActions";
import { create_manual_Donationinvoice } from "../../redux/actions/transactionAction";
import { connect } from "react-redux";
// import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { AuthInstance, url } from "../../helper/api_url";
import Button from "@mui/material/Button";
// import Button from "@mui/material/Button";
import Head from "next/head";
import { redirect } from "next/navigation";
class DonationPickup extends Component {
  donation_req_id = this.props.donation_req_id;
  app_books_weight = this.props.app_books_weight;
  name = this.props.name;
  email = this.props.email;

  greater(wt) {
    const new_wt = 20 * wt;
    const val = 150;

    return new_wt > val ? new_wt : val;
    // return (new_wt>val)?2:1
  }

  state = {
    estimate: 0,
    queue_no: "",
    min_new_date: "",
    free_new_date: new Date(),
    paid_new_date: new Date(),
    razorpay_payment_id: "",
    RedirectToDonaThanks: false,
    SendRzPay: "",
    only_kolkata_pickup: false,
  };

  options = {
    // key: "rzp_live_pvrJGzjDkVei3G", //Paste your API key here before clicking on the Pay Button.
    key: "rzp_live_cNDMU35KKMCp6t", //Paste your API key here before clicking on the Pay Button.

    amount: `${this.greater(this.props.PassToPickup.app_books_weight)}00`,
    // amount: `100`,
    name: `Mypustak.com`,
    // description: "Donation",
    description: "Book pickup charges",

    "Order Id": `${this.props.RAZORPAY}`, //Razorpay Order id
    currency: "INR",

    handler: (response) => {
      const razorpay_payment_id = response.razorpay_payment_id;
      const razorpay_order_id = response.razorpay_order_id;
      const razorpay_signature = response.razorpay_signature;
      this.setState({ SendRzPay: razorpay_payment_id });
      const paid_pick_up_date = parseInt(
        this.state.paid_new_date.getTime() / 1000
      );

      const SendData = {
        payment_id: `${razorpay_payment_id}`,
        payment_url: `www.razorpay.com`,
        payvalue: this.greater(this.props.PassToPickup.app_books_weight),
        is_paid_donation: "Y",
        pickup_date_time: paid_pick_up_date,
        donation_type: 1,
      };
      // http://103.217.220.149:80/api/v1/patch/add_paymentid_donationreqtable/update-donation/7213
      AuthInstance.patch(
        `${url}/api/v1/patch/add_paymentid_donationreqtable/update-donation/${this.props.donation_req_id}`,
        SendData
      )
        .then((res) => {
          localStorage.setItem("UserDonationId", this.props.donation_req_id);
          this.setState({ RedirectToDonaThanks: true });
          this.props.create_manual_Donationinvoice(this.props.donation_req_id);
        })
        .catch((err) => console.log(err));
    },

    prefill: {
      // "method":"card,netbanking,wallet,emi,upi",
      contact: `${this.props.PassToPickup.mobile}`,
      email: `${this.props.UserEmail}`,
    },

    notes: {
      "Order Id": `${this.props.donation_req_id}`,
      address: "customer address to be entered here",
    },
    theme: {
      color: "#1c92d2",
      emi_mode: true,
    },

    external: {
      wallets: ["mobikwik", "jiomoney"],
      handler: function (data) {},
    },
  };
  data = {
    data: {
      ref_id: `${this.props.userId}`,
      // "amount": `${this.greater(this.props.match.params.wt)}`,
      amount: this.greater(this.props.PassToPickup.app_books_weight),
    },
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    // console.log(this.props.PassToPickup)
    this.props.Fetch_queue_no({ donation_req_id: this.props.donation_req_id });

    this.props
      .Fetch_queue_no({ donation_req_id: this.props.donation_req_id })
      .then((res) => {
        const que_no = this.props.queue_no;
        const avg_rate = this.props.avg_rate;
        let calculate = que_no / avg_rate;
        let estimate;
        if (calculate < 1) {
          estimate = 2;
        } else {
          estimate = calculate;
        }
        // alert(estimate)

        let days = Math.round(estimate) + this.props.extra_day;
        console.log(this.props.extra_day, "esttimate", estimate, days);
        let total_days = days * 24 * 60 * 60 * 1000;
        let new_date = new Date(new Date().getTime() + total_days);
        // let format_new_date = moment(new_date).format('DD,MMMM');
        let check_day = moment(new_date).day();
        if (check_day == 6) {
          days = days + 2;
          // alert(days)
        } else if (check_day == 0) {
          days = days + 1;
          // alert(days)
        }
        total_days = days * 24 * 60 * 60 * 1000;
        new_date = new Date(new Date().getTime() + total_days);
        let format_new_date = moment(new_date).format("DD MMMM,YYYY");
        console.log(check_day, "123checkday");
        //  console.log(new_date,"123date",format_new_date,days,total_days)
        this.setState({ estimate: format_new_date, free_new_date: new_date });

        console.log(this.props.queue_no, "queue1");
      })
      .catch((err) => {
        console.log(err);
      });
    this.props.Get_Rp_Id(this.data);

    if (this.props.donation_req_id !== 0) {
      localStorage.setItem("UserDonationId", this.props.donation_req_id);
    }
    let paid_dates = this.paiddate(this.state.paid_new_date, 2);

    this.setState({ paid_new_date: paid_dates });
    this.props
      .fetch_donor_pickupdates()
      .then((res) => {
        if (this.props.free_pickup.min_dates) {
          let date = this.props.free_pickup.min_dates;
          let d = new Date(date);
          console.log(
            d,
            "12345",
            this.props.free_pickup.min_dates,
            date,
            new Date()
          );
          this.setState({ min_new_date: d, free_new_date: new Date() });
        }

        const { kolkata_free_pickup } = this.props;
        if (Object.keys(kolkata_free_pickup).length) {
          if (kolkata_free_pickup.min_dates == 0) {
            this.setState({ only_kolkata_pickup: false });
          }
        }
      })
      .catch((err) => console.log(err));

    const { kolkata_free_pickup } = this.props;
    if (Object.keys(kolkata_free_pickup).length) {
      const current_timestamp = new Date().getTime() / 1000;
      if (
        kolkata_free_pickup.start_date > current_timestamp &&
        current_timestamp < kolkata_free_pickup.end_date
      ) {
        this.setState({ only_kolkata_pickup: false });
      }
    }
    this.initializeRazorpay();
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
  componentDidUpdate(prevProps) {
    if (this.props.kolkata_free_pickup !== prevProps.kolkata_free_pickup) {
      const { kolkata_free_pickup } = this.props;
      if (Object.keys(kolkata_free_pickup).length) {
        const current_timestamp = new Date().getTime() / 1000;
        if (
          kolkata_free_pickup.start_date > current_timestamp &&
          current_timestamp < kolkata_free_pickup.end_date
        ) {
          this.setState({ only_kolkata_pickup: false });
        }
      }
    }
  }

  onChangeHandler_date = (date) => {
    this.setState({ free_new_date: date });
  };
  paidonChangeHandler_date = (date) => {
    this.setState({ paid_new_date: date });
  };
  paiddate = (date, day) => {
    let da = date.getDay();
    // alert(da)
    if (da == 6) {
      let selectedday = date.setDate(date.getDate() + 2);
      let d = new Date(selectedday);
      return d;
    } else {
      let selectedday = date.setDate(date.getDate() + 2);
      let d = new Date(selectedday);
      return d;
    }
  };

  pay_pickup = (type) => {
    this.rzp1 = new window.Razorpay(this.options);

    const que_no = this.props.queue_no;
    const avg_rate = this.props.avg_rate;
    let calculate = que_no / avg_rate;
    let estimate;
    if (calculate < 1) {
      estimate = 2;
    } else {
      estimate = calculate;
    }
    // alert(estimate)
    let days = Math.round(estimate) + this.props.extra_day;
    let total_days = days * 24 * 60 * 60 * 1000;
    let new_date = new Date(new Date().getTime() + total_days);
    // let format_new_date = moment(new_date).format('DD,MMMM');
    let check_day = moment(new_date).day();
    if (check_day == 6) {
      days = days + 2;
      // alert(days)
    } else if (check_day == 0) {
      days = days + 2;
      // alert(days)
    }
    total_days = days * 24 * 60 * 60 * 1000;
    new_date = new Date(new Date().getTime() + total_days);
    let format_new_date = moment(new_date).format("DD MMMM,YYYY");
    this.setState({ estimate: format_new_date, free_new_date: new_date });
    if (type == 0) {
      let d = this.state.free_new_date.getTime() / 1000;
      if (!d) {
        alert("Please select pickup date");
        return;
      }
      let body = {
        // donation_req_id:14052,

        donation_req_id: this.props.donation_req_id,
        pickup_date_time: new_date.getTime() / 1000,
        status: 1,
        donation_type: 0,
      };

      let Queuebody = {
        donation_req_id: this.props.donation_req_id,
        submit_date: Number(new Date().getTime() / 1000),
        queue_no: this.props.queue_no,
      };
      // Update free pickup paytype
      this.props
        .updateDonation({ donation: body })
        .then((res) => {
          this.props
            .AddDonation_formQueue(Queuebody)
            .then((res) => {
              localStorage.setItem(
                "UserDonationId",
                this.props.donation_req_id
              );
              this.setState({ RedirectToDonaThanks: true });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type == 2) {
      let d = this.state.free_new_date.getTime() / 1000;
      if (!d) {
        alert("Please select pickup date");
        return;
      }
      let body = {
        // donation_req_id:14052,

        donation_req_id: this.props.donation_req_id,
        pickup_date_time: new_date.getTime() / 1000,
        status: 1,
        donation_type: 2,
      };

      let Queuebody = {
        donation_req_id: this.props.donation_req_id,
        submit_date: Number(new Date().getTime() / 1000),
        queue_no: this.props.queue_no,
      };
      // Update free pickup paytype
      this.props
        .updateDonation({ donation: body })
        .then((res) => {
          this.props
            .AddDonation_formQueue(Queuebody)
            .then((res) => {
              localStorage.setItem(
                "UserDonationId",
                this.props.donation_req_id
              );
              this.setState({ RedirectToDonaThanks: true });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // alert("else")
      let d = this.state.free_new_date.getTime() / 1000;

      let body = {
        donation_req_id: this.props.donation_req_id,
        pickup_date_time: d,
        status: 1,
        // donation_type: 1,
      };
      console.log(body);
      this.props
        .updateDonation({ donation: body })
        .then((res) => {
          // alert("hi")
          this.rzp1.open();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  onLoad() {}

  goToPreviousForm = () => {
    this.props.OpenFromToEdit();
  };

  calculate_time = () => {
    // alert("jjojo")
    const que_no = this.props.queue_no;
    const avg_rate = this.props.avg_rate;
    let calculate = que_no / avg_rate;
    let estimate;
    console.log(estimate, "estimate", this.props.extra_day);
    if (calculate < 1) {
      estimate = 2;
    } else {
      estimate = calculate;
    }
    // alert(estimate)
    let days = Math.round(estimate) + this.props.extra_day;
    console.log(days, "estimate_days");

    let total_days = days * 24 * 60 * 60 * 1000;
    let new_date = new Date(new Date().getTime() + total_days);
    // let format_new_date = moment(new_date).format('DD,MMMM');
    let check_day = moment(new_date).day();
    if (check_day == 6) {
      days = days + 2;
      // alert(days)
    } else if (check_day == 0) {
      days = days + 1;
      // alert(days)
    }
    total_days = days * 24 * 60 * 60 * 1000;
    new_date = new Date(new Date().getTime() + total_days);
    let format_new_date = moment(new_date).format("DD MMMM,YYYY");
    this.setState({ estimate: format_new_date, free_new_date: new_date });
  };

  render() {
    const isWeekday = (date) => {
      const day = date.getDay();
      return day !== 0;
    };

    const wt = this.props.ApproxWt;
    // const id = this.props.match.params.id
    // alert(this.razorpay_payment_id)
    const price = this.greater(wt);
    const name = this.name;
    const email = this.email;
    if (this.state.RedirectToDonaThanks) {
      const SendMailData = {
        donation_req_id: this.props.donation_req_id,
        email: this.props.UserEmail,
        address: this.props.PassToPickup.address,
        phone: this.props.PassToPickup.mobile,
        amount: this.state.SendRzPay
          ? this.greater(this.props.PassToPickup.app_books_weight)
          : 0,
        pincode: this.props.PassToPickup.pincode,
        pickupType: this.state.SendRzPay ? "Paid Pickup" : "Free Pickup",
      };
      this.props.DonationMailData(SendMailData);

      //  <Redirect to='/donate/thank-you'/>
      redirect.push("/donate/thank-you");
    }

    const { PassToPickup } = this.props;
    const { only_kolkata_pickup } = this.state;
    console.log({ only_kolkata_pickup, PassToPickup });

    const show_free_pickup = () => {
      // North 24 Parganas Howrah South 24 Parganas
      if (only_kolkata_pickup) {
        if (
          PassToPickup.city == "kolkata" ||
          PassToPickup.city == "north 24 parganas" ||
          PassToPickup.city == "south 24 parganas" ||
          PassToPickup.city == "howrah"
        ) {
          return true;
        } else {
          return true;
        }
      } else {
        return true;
      }
      PassToPickup.city == "kolkata" && only_kolkata_pickup;
    };
    return (
      <div>
        <Head>
          <script
            type="text/javascript"
            src="https://checkout.razorpay.com/v1/checkout.js"
            async
          />
        </Head>
        <div>
          <div className="maindivPickup">
            <div></div>
            <div>
              <div className="title">
                <div style={{ marginLeft: "-1rem" }}>
                  Thank You For Donation Request!
                </div>{" "}
              </div>
              <div className="reqid">
                Your Donation request id is{" "}
                <span>{this.props.donation_req_id}</span>
              </div>
              <div
                className="EditText"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItem: "center",
                }}
              >
                <span
                  style={{ color: "#0067c5", cursor: "pointer" }}
                  onClick={this.goToPreviousForm}
                >
                  Click Here{" "}
                </span>
                <span> To Edit Your Form </span>
              </div>
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "#0067c5",
                textAlign: "center",
              }}
            >
              {show_free_pickup() ? " Select your preferred Pickup Method" : ""}
            </div>
            <div
              className="row no-gutters p-0"
              style={{ padding: "0px", margin: "0px" }}
            >
              {/* <div className="col-lg-6 col-md-6 col-sm-6 paidPickupDiv"> */}

              {/*--------------------------------------Free Pickup Div ------------------------------  */}
              {show_free_pickup() ? (
                <div className="col-lg-4 col-md-4 col-sm-4 paidPickupDiv p-1">
                  <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
                    Free Pick Up
                  </div>
                  <div style={{ minHeight: "10rem", padding: "0.5rem 0rem" }}>
                    <div>
                      Free Pickups will be processed,
                      <br /> first come first serve basis as per queue number.
                      <p>We will contact you near to Pickup date.</p>
                    </div>

                    <div>
                      <div
                        className="freepickup"
                        style={{
                          color: "#007bff",
                          margin: "1rem 0rem",
                          fontWeight: "bold",
                        }}
                      >
                        {/* Available Pick Up Dates */}
                        Your Pickup Queue No is{" "}
                        {this.props.queue_no ? this.props.queue_no : "..."}
                        <br />
                        Your Estimated Pickup Date <br />
                        {this.props.queue_no && this.props.avg_rate
                          ? this.state.estimate
                          : null}
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    value="OK, I Would Like To Wait"
                    variant="contained"
                    color="primary"
                    className="text-capitalize"
                    // onClick={() => this.setState({ RedirectToDonaThanks: true })}
                    onClick={() => this.pay_pickup(0)}
                  >
                    OK, I Would Like To Wait
                  </Button>
                </div>
              ) : null}

              {/* ---------------------------------- End of Free pickup */}

              {/* ------------------------------- paid pick up div-------------------------------------- */}
              <div
                className={
                  show_free_pickup()
                    ? "col-lg-4 col-md-4 col-sm-4 paidPickupDiv  p-1"
                    : "col-lg-12 col-md-12 col-sm-12 paidPickupDiv p-1"
                }
                style={show_free_pickup() ? {} : {}}
              >
                <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Paid Pick Up
                </div>
                <div style={{ minHeight: "10rem", padding: "0.4rem 0rem" }}>
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
                      }}
                    >
                      Select Available Pick-Up Dates
                    </div>
                    {/* <DateRangeIcon/> */}

                    <DatePicker
                      dateFormat="dd-MMMM-yyyy"
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
                  type="submit"
                  value="OK, Let Me Make The Payment."
                  variant="contained"
                  color="primary"
                  className="text-capitalize"
                  // onClick={() => {
                  //   this.rzp1.open()
                  // }}
                  onClick={() => this.pay_pickup(1)}
                >
                  OK, Let Me Make The Payment &#8377;
                  {this.greater(this.props.PassToPickup.app_books_weight)}
                </Button>
              </div>
              {/* ------------------------------- Endof paid pick up div-------------------------------------- */}

              {/* ---------------------------------Start Self Ship-------------------------------------------- */}

              <div
                className={
                  show_free_pickup()
                    ? "col-lg-4 col-md-4 col-sm-4 FreePickupDiv p-1"
                    : "col-lg-4 col-md-4 col-sm-4 FreePickupDiv p-1"
                }
                style={show_free_pickup() ? {} : { border: "1px solid #fff" }}
              >
                <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Self Pick Up
                </div>
                <div style={{ padding: "0.4rem 0rem" }}>
                  <div>
                    You can ship or drop your books at our collection center in
                    Kolkata.
                  </div>
                </div>
                <div className="selfpickdiv" style={{ marginTop: "2rem" }}>
                  <p style={{ textAlign: "justify", marginLeft: "1.5rem" }}>
                    <p>Address : </p>
                    EDUCATEXLABS PRIVATE LIMITED
                    <br />
                    3908/3980, EAST BERABERI , SIKHER BAGAN
                    <br />
                    GOPALPUR RAJARHAT
                    <br />
                    KOLKATA, PARGANAS NORTH-700136
                    <br />
                    WEST BENGAL
                  </p>
                </div>

                <Button
                  className="text-capitalize"
                  type="submit"
                  value="OK, I Will Self Ship."
                  variant="contained"
                  color="primary"
                  // onClick={() => {
                  //   this.rzp1.open()
                  // }}
                  onClick={() => this.pay_pickup(2)}
                >
                  OK, I Will Self Ship
                </Button>
              </div>
              {/* ----------------------------------End of Self Ship-------------------------------------------- */}
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .title {
              font-weight: bold;
              color: #0067c5;
              font-size: 1.2rem;
            }
            .maindivPickup {
              // margin-bottom: 4rem;
              text-align: center;
            }
            .reqid {
              padding: 0.5rem;
            }
            .reqid > span {
              font-weight: bold;
            }
            .FreePickupDiv,
            .paidPickupDiv {
              margin-top: 2rem;
              font-size: 0.9rem;
              text-align: center;
            }
            .paidPickupDiv {
              border-right: 1px solid lightgray;
            }
            .freepickup {
              display: flex;
              min-height: 18rem;
              justify-content: center;
              align-items: center;
            }
            .selfpickdiv {
              min-height: 19rem;
            }
            @media only screen and (max-width: 576px) {
              .title {
                font-weight: bold;
                color: #0067c5;
                font-size: 1rem;
              }
              .reqid {
                padding: 0.8rem;
                font-size: 0.9rem;
              }
              .EditText {
                font-size: 0.9rem;
              }
              .FreePickupDiv,
              .paidPickupDiv {
                margin-top: 0.7rem;
                font-size: 0.8rem;
                text-align: center;
              }
            }
            @media only screen and (max-width: 538px) {
              .paidPickupDiv {
                margin-top: 1rem;
                border-right: 0px solid lightgray;
              }
              .FreePickupDiv {
                border-top: 1px solid lightgray;
              }
              .freepickup {
                display: flex;
                min-height: 3rem;
                justify-content: center;
                align-items: center;
              }
              .selfpickdiv {
                min-height: 1rem;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  donation_req_id: state.donationR.donation_req_id,
  // app_books_weight:state.donationR.app_books_weight,
  // pickup:state.donationR.pickup,
  userToken: state.accountR.token,
  name: state.donationR.name,
  UserEmail: state.userdetailsR.getuserdetails.email,
  pickup: state.donationR.pickup,
  userId: state.accountR.getuserdetails.id,
  RAZORPAY: state.donationR.rp_id,
  free_pickup: state.donationR.free_pickup,
  paid_pickup: state.donationR.paid_pickup,
  kolkata_free_pickup: state.donationR.kolkata_free_pickup,
  queue_no: state.donationR.queue_no,
  avg_rate: state.donationR.avg_rate,
  extra_day: state.donationR.extra_day,
});
// const mapStateToProps = state => ({
//   userId:state.accountR.userId
// })
//   export default PayHere
// export default connect(mapStateToProps)(PayHere)

export default connect(mapStateToProps, {
  ChangeLogin,
  Get_Rp_Id,
  DonationMailData,
  fetch_donor_pickupdates,
  updateDonation,
  create_manual_Donationinvoice,
  Fetch_queue_no,
  AddDonation_formQueue,
})(DonationPickup);
