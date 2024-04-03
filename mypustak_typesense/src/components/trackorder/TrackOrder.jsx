/* eslint-disable */
"use client"
import React, { Component } from "react";
import styles from "../../styles/TrackOrder.module.css";
import { connect } from "react-redux";
import Stepper from "../Stepper/Stepper";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import {
  get_delhivery_booking_details,
  create_ndr,
} from "../../redux/actions/BackendorderAction";
class TrackOrder extends Component {
  state = {
    courier_name: "",
    response_data: [],
    stepsArray: [
      "Order Placed",
      "Confirmed",
      "Ready To Ship",
      "In Transit",
      "Out For Delivery",
      "Delivered",
    ],
    currentStep: 2,
    awb: "",
    loading: true,
    order_id: "",
    est_delivery_date: "",
    open_form: false,
    ndr_type: "",
    address: "",
    phone_no: "",
    phone_error: false,
    open_confirm_form: false,
    ndr_msg: "",
    open_msg: false,
    error: false,
  };

  componentDidMount = () => {
    const href_url = window.location.href;
    const awb = href_url.split("?awb=")[1].split('&')[0];
    const order_id = href_url.split("order_id=")[1];
    console.log({ awb }, "AWBAAWB");
    this.setState({ awb });
    console.log(
      this.props.get_delhivery_booking_details(awb, order_id),
      "location"
    );
    if (awb) {
      this.props
        .get_delhivery_booking_details(awb, order_id)
        .then((res) => {
          this.setState({ loading: false });
          const error = res.data.Error;
          if (error) {
            if (error == "No such waybill or Order Id found delivery") {
            }
          }

          let result_data = "";
          try {
            result_data = res.data.ShipmentData[0].Shipment;
            const Scans = result_data.Scans;
            console.log(Scans, "scan data");
            console.log(result_data, "scan result_data");

            for (let i = 0; i < Scans.length; i++) {
              // console.log(Scans[i].ScanDetail.Scan, 'data');
              if (Scans[i].ScanDetail.Scan == "In Transit") {
                this.setState({ currentStep: 3 });
                // console.log("");

                break;
              }
            }
            let Consignee = result_data.Consignee;
            let address = res.data.address,
              photo_no = res.data.phone;
            this.setState({
              response_data: result_data,
              est_delivery_date: res.data.est_delivery_date,
              courier_name: result_data["CourierName"],
              address,
              photo_no,
            });
            if (result_data.ReferenceNo) {
              this.setState({ order_id: result_data.ReferenceNo });
            }
            if (result_data.Status.Status == "Dispatched") {
              this.setState({ currentStep: 4 });
            }
            if (result_data.Status.Status == "Delivered") {
              this.setState({ currentStep: 5 });
            }

            if (result_data.Status.Status == "RTO") {
              const current_stepsArray = this.state.stepsArray;
              current_stepsArray[5] = "Returned";
              this.setState({ currentStep: 5, stepsArray: current_stepsArray });
            }
          } catch (error) {}
        })
        .catch((err) => {
          console.log({ err }, "scan err");
          this.setState({ error: true });
        });
    } else {
    }
  };

  renderstepsArray = (order_status) => {
    let stepsArray = [];

    if (order_status == 2) {
      stepsArray = ["Order Placed", "Canceled"];
      this.setState({ stepsArray });

      return stepsArray;
    } else if (order_status == 3) {
      stepsArray = ["Order Placed", "Refunded"];
      this.setState({ stepsArray });

      return stepsArray;
    } else if (order_status == 4) {
      stepsArray = ["Order Placed", "Failed"];
      this.setState({ stepsArray });

      return stepsArray;
    } else if (order_status == 11 || order_status == 13 || order_status == 14) {
      stepsArray = [
        "Order Placed",
        "Confirmed",
        "Ready To Ship",
        "Out For Delivery",
        "Delivered",
        "RTO",
        "RTO-Recived",
        "RTO Completed",
      ];
      this.setState({ stepsArray });
      return stepsArray;
    } else if (order_status == 8) {
      stepsArray = ["Order Placed", "Confirmed", "Hold"];
      this.setState({ stepsArray });

      return stepsArray;
    }
    stepsArray = [
      "Order Placed",
      "Confirmed",
      "Ready To Ship",
      "In Transit",
      "Out For Delivery",
      "Delivered",
    ];
    this.setState({ stepsArray });

    return stepsArray;
  };

  getStataus = () => {
    const { response_data } = this.state;

    try {
      if (response_data.Status) {
        return response_data.Status.Status;
      } else {
        return "";
      }
    } catch (error) {
      return "";
    }
  };

  getStatausTime = () => {
    const { response_data } = this.state;

    try {
      if (response_data.Status) {
        let date = response_data.Status.StatusDateTime;
        // console.log({date});
        if (date) {
          let time_date = moment(date).format("dddd, MMM Do YY, h:mm a");
          return time_date;
        }
        // console.log({time_date});
      } else {
        return "";
      }
    } catch (error) {
      console.log({ error });

      return "";
    }
  };

  return_scan_array = () => {
    // alert("jjj");
    const { response_data } = this.state;

    console.log(response_data, "scans");
    try {
      if (response_data.Scans) {
        function reverseArr(input) {
          let ret = new Array();
          for (let i = input.length - 1; i >= 0; i--) {
            ret.push(input[i]);
          }
          return ret;
        }
        let reverse_arr = [];

        if (
          this.state.courier_name == "Ecom Express" ||
          this.state.courier_name == "Xpressbees"
        ) {
          reverse_arr = response_data.Scans;
        } else {
          reverse_arr = reverseArr(response_data.Scans);
        }
        // let reverse_arr = response_data.Scans

        console.log(response_data.Scans, "Scans", reverse_arr);
        return reverse_arr;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };
  return_date_time = (data_time, type) => {
    if (data_time) {
      if (type == "date") return moment(data_time).format("D, MMM");
      if (type == "time") return moment(data_time).format("h:mm a");
    } else {
      return "";
    }
  };

  openNdrForm = (ndr_type) => {
    if (ndr_type == "RE-ATTEMPT") {
      this.setState({
        open_confirm_form: !this.state.open_confirm_form,
        ndr_type,
      });
    } else {
      this.setState({ open_form: !this.state.open_form, ndr_type });
    }
  };

  handleAddressChange = (e) => {
    // this.setState({ Address: e.target.value });
  };

  handlePhoneNumberChange = (e) => {
    this.setState({
      photo_no: e.target.value,
      phone_error: this.validateMobile(e.target.value),
    });
  };

  validateMobile = (mobile) => {
    if (!mobile) return true;
    if (mobile.length < 10) {
      return true;
    } else {
      const re =
        /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[0123456789]\d{9}|(\d[ -]?){10}\d$/g;
      return !re.test(mobile);
    }
  };

  submit_ndr = () => {
    // e.preventDefault()
    const { awb, ndr_type, address, phone_no, order_id } = this.state;
    let body;
    if (ndr_type == "EDIT_DETAILS") {
      body = {
        order_id: order_id,
        act: ndr_type,
        waybill: awb,
        action_data: {
          add: address,
          phone: phone_no,
        },
      };
    } else {
      body = {
        order_id: order_id,
        act: ndr_type,
        waybill: awb,
      };
    }

    this.props
      .create_ndr(body)
      .then((res) => {
        if (ndr_type == "EDIT_DETAILS") {
          this.openNdrForm("EDIT_DETAILS");
        } else {
          this.openNdrForm("RE-ATTEMPT");
        }
        this.setState({ ndr_msg: "Successful", open_msg: true });
      })
      .catch((error) => {
        this.setState({
          ndr_msg: "Sorry, not Successful due to some error",
          open_msg: true,
        });
      });
  };

  handleMsg = () => {
    this.setState({ ndr_msg: "", open_msg: false });
  };

  render() {
    // console.log(this.state.response_data, "scan 5556", est_delivery_date); 

    const {
      stepsArray,
      currentStep,
      awb,
      loading,
      order_id,
      est_delivery_date,
      address,
      photo_no,
      phone_error,
      open_confirm_form,
      ndr_msg,
      open_msg,
      error,
    } = this.state;

    return (
      <div style={{ background: "white", minHeight: "100vh" }}>
        <div className={`${styles.Maindiv_trackorder}`}>
          {loading ? (
            error ? (
              <h3 style={{ justifyContent: "center", display: "flex" }}>
                ERROR FETCHING DATA
              </h3>
            ) : (
              <div style={{ justifyContent: "center", display: "flex" }}>
                {" "}
                <CircularProgress />{" "}
              </div>
            )
          ) : (
            <div className={`${styles.main_border_div}`}>
              <div className={`${styles.header_div} ${styles.header_desktop}`}>
                <div>
                  <img
                    className={`${styles.logoimg}`}
                    src="https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png"
                  />
                </div>

                <div style={{ textAlign: "end" }}>
                  <div className={`${styles.heading_text} `}>ORDER ID</div>
                  <div className={`${styles.heading_txt_p} `}>{order_id}</div>
                </div>
                <div style={{ textAlign: "end" }}>
                  <div className={`${styles.heading_text} `}>AWB</div>
                  <div className={`${styles.heading_txt_p} `}>{awb}</div>
                </div>
              </div>

              <div className={`${styles.header_div} ${styles.header_mobile}`}>
                <div>
                  <img
                    className={`${styles.logoimg}`}
                    src="https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png"
                  />
                </div>
                <div>
                  <div style={{ textAlign: "end" }}>
                    <div className={`${styles.heading_text} `}>
                      ORDER ID{" "}
                      <span className={`${styles.heading_txt_p} `}>
                        {order_id}
                      </span>
                    </div>
                    {/* <div></div> */}
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <div className={`${styles.heading_text} `}>
                      AWB{" "}
                      <span className={`${styles.heading_txt_p} `}>{awb}</span>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>

              <div className={`${styles.tracking_div_box} `}>
                <div className={`${styles.tracking_title} `}>
                  <div>
                    {" "}
                    Expected Delivery: <span>{est_delivery_date}</span>
                  </div>
                </div>

                <div className={`${styles.current_status} `}>
                  <div style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                    {/* Delhivery */}
                    {this.state.courier_name}
                  </div>
                  <div>
                    <div className={`${styles.status} `}>
                      STATUS - {this.getStataus()}
                    </div>
                    <div>
                      {this.getStataus() == "RTO" ? (
                        <div style={{ display: "flex" }}>
                          <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            style={{ margin: "5px" }}
                            onClick={() => this.openNdrForm("RE-ATTEMPT")}
                          >
                            Re - attempt
                          </Button>
                          <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            style={{ margin: "5px" }}
                            onClick={() => this.openNdrForm("EDIT_DETAILS")}
                          >
                            Edit Address/Phone
                          </Button>
                        </div>
                      ) : null}
                    </div>
                    {/* <div
                      style={{
                        fontWeight: "bold",
                        color: "#007bff",
                        backgroundColor: "red",
                        textAlign: "center",
                        border:"2px solid red"
                      }}></div> */}
                  </div>
                  {this.getStatausTime() ? (
                    <div className={`${styles.time} `}>
                      <div>Time</div>
                      <div style={{ fontWeight: "bold" }}>
                        {this.getStatausTime()}
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* tracking line */}
                <div>
                  <div
                    className={`${styles.stepperContainerHorizontal} ${styles.stepperHorizontalshow} `}
                  >
                    <Stepper
                      steps={stepsArray}
                      direction="horizontal"
                      currentStep={currentStep}
                    />
                  </div>

                  <div
                    className={`${styles.stepperContainerVertical} ${styles.stepperVerticalshow} `}
                  >
                    <Stepper
                      steps={stepsArray}
                      direction="vertical"
                      currentStep={currentStep}
                    />
                  </div>
                </div>

                <div className={`${styles.detail_status_div}`}>
                  {this.return_scan_array().map((data) => (
                    <div
                      className={`${styles.each_status}`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      key={data.ScanDetail.StatusDateTime}
                    >
                      <div>
                        {this.return_date_time(
                          data.ScanDetail.StatusDateTime,
                          "date"
                        )}
                      </div>

                      <div>
                        <span style={{ color: "gray" }}>Location:</span>
                        <span>{data.ScanDetail.ScannedLocation}</span>
                        <div style={{ textAlign: "center" }}>
                          {this.return_date_time(
                            data.ScanDetail.StatusDateTime,
                            "time"
                          )}
                        </div>
                      </div>
                      <div style={{ width: "15rem" }}>
                        {data.ScanDetail.Instructions}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Dialog
                open={this.state.open_form}
                onClose={() => this.openNdrForm("")}
                aria-labelledby="form-dialog-title"
                scroll={"body"}
                size="lg"
              >
                <form>
                  <DialogTitle id="form-dialog-title">
                    Form To Edit Delivery Address
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      name="address"
                      margin="dense"
                      type="text"
                      label="Address"
                      onChange={this.handleAddressChange}
                      value={address}
                      fullWidth
                      required
                      multiline={true}
                      variant="standard"
                    />
                    <TextField
                      name="phone"
                      margin="dense"
                      type="text"
                      label={"Phone Number"}
                      onChange={this.handlePhoneNumberChange}
                      value={photo_no}
                      fullWidth
                      required
                      inputProps={{ maxLength: 10 }}
                      error={phone_error}
                      variant="standard"
                    />
                  </DialogContent>

                  <DialogActions>
                    <Button
                      onClick={() => this.openNdrForm("")}
                      color="default"
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="contained"
                      //   type="submit"
                      color="primary"
                      disabled={this.props.Loading_order_Excel}
                      onClick={() => this.submit_ndr("EDIT_DETAILS")}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>

              <Dialog
                open={open_confirm_form}
                onClose={() => this.openNdrForm("RE-ATTEMPT")}
                aria-labelledby="form-dialog-title"
                scroll={"body"}
                size="lg"
              >
                <DialogTitle id="form-dialog-title">
                  Do want to re-attempt for delivery?
                </DialogTitle>
                <DialogActions
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    onClick={() => this.openNdrForm("RE-ATTEMPT")}
                    color="default"
                  >
                    No
                  </Button>

                  <Button
                    variant="contained"
                    onClick={(e) => this.submit_ndr("RE-ATTEMPT")}
                    color="primary"
                    disabled={this.props.Loading_order_Excel}
                  >
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>

              <Snackbar
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={open_msg}
                autoHideDuration={3000}
                onClose={this.handleMsg}
                message={ndr_msg}
              />
            </div>
          )}
        </div>

        <style jsx>{``}</style>
      </div>
    );
  }
}

export default connect(null, { get_delhivery_booking_details, create_ndr })(
  TrackOrder
);
