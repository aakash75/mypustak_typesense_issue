import React, { Component } from "react";
import styles from "../../styles/CustomarOrder.module.css"
import moment from "moment";
import MediaQuery from "react-responsive";
import Link from "next/link";
import Button from "@mui/material/Button";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { CircularProgress } from "@mui/material";

class ColapsibleOrders extends Component {
  state = {
    activeorderDialog: false,
    order_ID: "",
    index_ID: "",
  };
  render() {
    const {
      clickedId,
      data,
      handleCodPay,
      CancelOrder,
      CancelprepaidOrder,
      disableCodPay,
      Re_process_order,
      ActiveOrderLoader,
      indexID,
      Re_process_orderDialog,
      closeActiveDialog,
      activeorderDialog,
    } = this.props;
    const FilterStatus = [
      {
        value: 0,
        label: "Processing",
        color: "#0070e7",
        background: "#ddebf9",
      },
      { value: 1, label: "Complete", color: "green", background: "#dcf9db" },
      { value: 2, label: "Cancelled", color: "red", background: "#f5d4d4" },
      { value: 3, label: "Refunded", color: "#640909", background: "#f5d4d4" },
      { value: 4, label: "Failed", color: "red", background: "#f5d4d4" },
      { value: 5, label: "Shipping", color: "gray", background: "#e5dede" },
      {
        value: 6,
        label: "Shipment Booked",
        color: "#f34e00",
        background: "#ffe7ce",
      },
      {
        value: 7,
        label: "Ready to ship",
        color: "#f34e00",
        background: "#ffe7ce",
      },
      { value: 8, label: "Hold", color: "purple", background: "#d3b3d3" },
      { value: 9, label: "Merge", color: "purple", background: "#d3b3d3" },
      { value: 10, label: "In Transit", color: "grey", background: "#e5dede" },
      { value: 11, label: "RTO", color: "cyan", background: "#dbe3e3" },
      { value: 12, label: "Re-Ship", color: "red", background: "#f5d4d4" },
      { value: 13, label: " RTO-Recived", color: "red", background: "#f5d4d4" },
      {
        value: 14,
        label: "RTO-Completed",
        color: "cyan",
        background: "#dbe3e3",
      },
      {
        value: 15,
        label: "RTO-Initiated",
        color: "cyan",
        background: "#dbe3e3",
      },
      {
        value: 16,
        label: "Cancel Request",
        color: "red",
        background: "#f5d4d4",
      },
      {
        value: 17,
        label: "Ready To Dispatch",
        color: "#f34e00",
        background: "#ffe7ce",
      },
      {
        value: 18,
        label: "Refund Requested",
        color: "grey",
        background: "#e5dede",
      },
      {
        value: 21,
        label: "Cancelled",
        color: "red",
        background: "#f5d4d4",
      },
      { value: 22, label: "In Transit", color: "grey", background: "#e5dede" },
      {
        value: 23,
        label: "Order Created",
        color: "#0070e7",
        background: "#ddebf9",
      },
      // { value: 19, label: "Lost", color: "red", background: "#f5d4d4" },
    ];
    const returnPaymentMethod = payusing => {
      if (payusing == "cod") {
        return "Cash On Delivery";
      } else {
        return "Prepaid";
      }
    };

    return (
      <div>
        {/* For mobile screen only */}
        <MediaQuery maxWidth={576}>
          <div>
            <div
              className={`bg-white ${styles.orderMainDiv}`}>
              <div style={{ marginBottom: "-3px", fontSize: "16px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ width: "50%" }}>
                    <div
                      className='TopLeftDiv'
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}>
                      <div className={`${styles.orderson} ${styles.smallFont}`}>
                        <p className={`${styles.classP}`}>
                          <b>#{data.order_id}</b> (
                          {returnPaymentMethod(data.payusing)})
                        </p>
                        <p
                          className={`${styles.classP}`}
                          style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                          {" "}
                        </p>
                        <p className={`${styles.classP}`}>Total Books: {data.no_of_book}</p>
                        <p className={`${styles.classP}`}>
                          Total Amount:{" "}
                          <span
                            className=''
                            style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                            &#8377;{data.amount}
                          </span>
                        </p>
                      </div>
                    </div>
                    {data.status == "0" ? (
                      data.payusing == "cod" ? (
                        <Button
                          className={`${styles.button}`}
                          color='primary'
                          size='small'
                          style={{
                            width: "100px",
                            marginBottom: "0.5rem",
                            textTransform: "capitalize",
                          }}
                          onClick={() => CancelOrder(data.order_id, indexID)}>
                          Cancel order
                        </Button>
                      ) : (
                        <Button
                          className={`${styles.button}`}
                          color='primary'
                          size='small'
                          style={{
                            marginBottom: "0.5rem",
                            textTransform: "capitalize",
                          }}
                          onClick={() =>
                            CancelprepaidOrder(data.order_id, indexID)
                          }>
                          <span style={{ fontSize: "0.7rem" }}>
                            Cancel Request
                          </span>
                        </Button>
                      )
                    ) : null}
                  </div>
                  <div
                    style={{
                      width: "50%",
                      textAlign: "end",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                    }}>
                    {data.status == "16" ? (
                      <>
                        {false ? (
                          <Button
                            className={`${styles.button}`}
                            variant='contained'
                            color='primary'
                            size='small'
                            style={{
                              marginTop: "18px",
                              textTransform: "capitalize",
                              width: "6rem",
                            }}>
                            <CircularProgress
                              size={20}
                              style={{ color: "white" }}
                            />
                          </Button>
                        ) : (
                          <Button
                            className={`${styles.button}`}
                            variant='contained'
                            color='primary'
                            size='small'
                            style={{
                              textTransform: "capitalize",
                            }}
                            onClick={() =>
                              Re_process_orderDialog(data.order_id, indexID)
                            }>
                            <span style={{ fontSize: "0.7rem" }}>
                              Activate Order
                            </span>
                          </Button>
                        )}
                      </>
                    ) : null}
                    <div>
                      <p style={{ marginBottom: "0rem", fontSize: "0.7rem" }}>
                        ({moment.unix(data.i_date).format("lll")})
                      </p>

                      {(data.payusing === "cod" && data.status == "0") ||
                      (data.payusing === "cod" && data.status == 0) ? (
                        <>
                          <p
                            style={{
                              marginRight: "0rem",
                              textAlign: "end",
                              fontSize: "0.8rem",
                            }}
                            className={`${styles.payNowtopC}`}>
                            Pay Now And Save ₹ 50{" "}
                          </p>

                          {disableCodPay && clickedId == data.order_id ? (
                            <Button
                              className={`${styles.button}  ${styles.paynowbtn} `}
                              variant='contained'
                              color='primary'
                              size='small'
                              style={{
                                width: "100px",
                                height: "2rem",
                                textTransform: "capitalize",
                                height: "2rem",
                                marginTop: "0.2rem",
                                marginBottom: "0.5rem",
                              }}>
                              <CircularProgress
                                size={18}
                                style={{ color: "white" }}
                              />
                            </Button>
                          ) : (
                            <div>
                              <Button
                                className={`${styles.button}  ${styles.paynowbtn} `}
                                variant='contained'
                                color='primary'
                                size='small'
                                style={{
                                  width: "100px",
                                  height: "2rem",
                                  textTransform: "capitalize",
                                  marginTop: "0.2rem",
                                  marginBottom: "0.5rem",
                                }}
                                onClick={() => handleCodPay(data)}>
                                Pay Now
                              </Button>
                            </div>
                          )}
                          <p
                            className={`${styles.payNowtopC}`}
                            style={{ fontSize: "0.8rem", textAlign: "start" }}>
                            Convert COD To Prepaid{" "}
                          </p>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              {data.vendor_data.map((vendor, index) => {
                return (
                  <div
                    key={index}
                    className={`${styles.buttonandColWrap}` }  >
                    <div
                      className={`${styles.collapsibleDiv}`} >
                      <div className={`${styles.eachorder_div}`}  >
                        <div className={`${styles.eachorder_div_order}`} style={{}}>
                          {["0", "5", "6", "7", "10", "12", "17"].includes(
                            vendor.status
                          ) ? (
                            <>
                              <span
                              className={`${styles.shipDirectlyTextMob}`}>
                                <LocalShippingIcon /> Ships Directly From{" "}
                                {vendor.vendor_name}
                              </span>
                            </>
                          ) : null}
                        </div>
                        <div
                          className={`${styles.triggerDiv}`}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}>
                          <div>
                            <div className={`${styles.eachorder_div_order}`}>
                              <div className={`${styles.orderid}`}>
                                <span style={{ textTransform: "none" }}>
                                  Ref. Id :{" "}
                                </span>
                                <span>
                                  #{vendor.reference_id}-{vendor.vendor_id}
                                </span>
                              </div>
                            </div>
                            <div className={`${styles.noOfBooks}`}>
                              No. of Books: {vendor.total_book}
                            </div>
                          </div>
                          <div className={`${styles.eachorder_div_status}`}>
                            {FilterStatus.map(status => {
                              return status.value == vendor.status ? (
                                <span 
                                  style={{
                                    padding: "0.5rem",
                                    textAlign: "center",
                                    borderRadius: "0.5rem",
                                    color: status.color,
                                    background: status.background,
                                    fontSize: "0.6rem",
                                    fontWeight: "bold",
                                    textTransform: "capitalize",
                                  }}>
                                  {status.label}
                                </span>
                              ) : null;
                            })}
                          </div>
                          <div className={`${styles.viewDetails}`}>
                            <Link
                              prefetch={false}
                              href={`/customer/customer_order/[order_id]`}
                              as={`/customer/customer_order/${data.order_id}`}
                              legacyBehavior>
                              <a className={`${styles.viewDetails}`}>
                                <Button
                                  color='primary'
                                  style={{
                                    width: "6rem",
                                    margin: "0px",
                                    padding: "0.3rem",
                                    textTransform: "capitalize",
                                  }}>
                                  View Details
                                </Button>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                     
                    </div>
                    <div >
                    {/* {data.status==3?
                    <p style={{color:"#f58e8e",marginBottom:"0.2rem",fontSize:"0.8rem"}} >
                    {data.refund_status==2 && data.refund_amount && data.refund_method?
                      `₹${data.refund_amount} has been refunded to your ${data.refund_method == "wallet"
                      ? "Wallet"
                      :data.refund_method == "bank"?"Bank":"Source Account"}`
                      :null}
                      </p>
                      :null} */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </MediaQuery>
        {/* For desktop screen  */}
        <MediaQuery minWidth={577}>
          <div>
            <div
              className={`bg-white ${styles.orderMainDiv}`}>
              <div style={{ marginBottom: "-3px", fontSize: "16px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ width: "60%" }}>
                    <div
                      className='TopLeftDiv'
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}>
                      <div className={` ${styles.smallFont}`}>
                        <p className={`${styles.classP}`}>
                          Order ID: <b>#{data.order_id}</b>
                        </p>
                        <p className={`${styles.classP}`}>
                          Order on {moment.unix(data.i_date).format("lll")}
                        </p>
                        {data.status == "0" ? (
                          data.payusing == "cod" ? (
                            <Button
                              className={`${styles.button}`}
                              color='primary'
                              size='small'
                              style={{
                                width: "100px",
                                marginBottom: "0.5rem",
                                textTransform: "capitalize",
                                fontWeight: "bold",
                              }}
                              onClick={() =>
                                CancelOrder(data.order_id, indexID)
                              }>
                              Cancel Order
                            </Button>
                          ) : (
                            <Button
                              className={`${styles.button}`}
                              color='primary'
                              size='small'
                              style={{
                                textTransform: "capitalize",
                              }}
                              onClick={() =>
                                CancelprepaidOrder(data.order_id, indexID)
                              }>
                              <span style={{ fontSize: "0.7rem" }}>
                                Cancel Request
                              </span>
                            </Button>
                          )
                        ) : null}
                      </div>

                      <div className={`${styles.orderson} ${styles.smallFont}`}>
                        <p className={`${styles.classP}`}>
                          Total Amount:{" "}
                          <span
                            className=''
                            style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                            &#8377;{data.amount}
                          </span>
                        </p>
                        <p className={`${styles.classP}`} style={{ fontSize: "0.8rem" }}>
                          Payment Method :
                          <b> {returnPaymentMethod(data.payusing)}</b>
                        </p>
                        <p className={`${styles.classP}`}>Total Books: {data.no_of_book}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.topRightDiv}`}>
                    {data.status == "16" ? (
                      <>
                        {false ? (
                          <Button
                            className={`${styles.button}`}
                            variant='contained'
                            color='primary'
                            size='small'
                            style={{
                              marginTop: "18px",
                              textTransform: "capitalize",
                              width: "6rem",
                            }}>
                            <CircularProgress
                              size={20}
                              style={{ color: "white" }}
                            />
                          </Button>
                        ) : (
                          <Button
                            className={`${styles.button}`}
                            variant='contained'
                            color='primary'
                            size='small'
                            style={{
                              textTransform: "capitalize",
                            }}
                            onClick={() =>
                              Re_process_orderDialog(data.order_id, indexID)
                            }>
                            <span style={{ fontSize: "0.7rem" }}>
                              Activate Order
                            </span>
                          </Button>
                        )}
                      </>
                    ) : null}
                    <div>
                      {(data.payusing === "cod" && data.status == "0") ||
                      (data.payusing === "cod" && data.status == 0) ? (
                        <>
                          <p
                            style={{
                              marginRight: "0rem",
                              textAlign: "end",
                              fontSize: "0.9rem",
                            }}
                            className={`${styles.payNowtopC}`}>
                            Pay Now And Save <b>₹ 50</b>{" "}
                          </p>

                          {disableCodPay && clickedId == data.order_id ? (
                            <Button
                              className={`${styles.button}  ${styles.paynowbtn}`}
                              variant='contained'
                              color='primary'
                              size='small'
                              style={{
                                width: "100px",
                                textTransform: "capitalize",
                                height: "2rem",
                                marginTop: "0.2rem",
                                marginBottom: "0.5rem",
                              }}>
                              <CircularProgress
                                size={18}
                                style={{ color: "white" }}
                              />
                            </Button>
                          ) : (
                            <div>
                              <Button
                                className={`${styles.button}  ${styles.paynowbtn}`}
                                variant='contained'
                                color='primary'
                                size='small'
                                style={{
                                  width: "100px",
                                  height: "2rem",
                                  textTransform: "capitalize",
                                  marginTop: "0.2rem",
                                  marginBottom: "0.5rem",
                                }}
                                onClick={() => handleCodPay(data)}>
                                Pay Now
                              </Button>
                            </div>
                          )}
                          <p
                            className={`${styles.payNowtopC}`}
                            style={{ fontSize: "0.9rem", textAlign: "start" }}>
                            Convert Cash on Delivery To Prepaid{" "}
                          </p>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              {data.vendor_data.map((vendor, index) => {
                return (
                  <div
                    key={index}
                    className={`${styles.buttonandColWrap}`} >
                    <div
                      className={`${styles.collapsibleDiv}`}>
                      <div className={`${styles.eachorder_div}`}>
                        <div className={`${styles.eachorder_div_order}`} style={{}}>
                          {["0", "5", "6", "7", "10", "12", "17"].includes(
                            vendor.status
                          ) ? (
                            <>
                              <span
                                style={{
                                  textTransform: "none",
                                  fontSize: "0.8rem",
                                }}>
                                <LocalShippingIcon /> Ships Directly From{" "}
                                {vendor.vendor_name}
                              </span>
                            </>
                          ) : null}
                        </div>
                        <div
                          className={`${styles.triggerDiv}`}
                          // onClick={() => {
                          //   Router.push(
                          //     `/customer/customer_order/${data.order_id}`
                          //   );
                          // }}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}>
                          <div className={`${styles.eachorder_div_order}`}>
                            <div className={`${styles.orderid}`}>
                              <span style={{ textTransform: "none" }}>
                                Reference Id :{" "}
                              </span>
                              <span>
                                #{vendor.reference_id}-{vendor.vendor_id}
                              </span>
                            </div>
                          </div>
                          <div className={`${styles.noOfBooks}`}>
                            No. of Books: {vendor.total_book}
                          </div>
                          <div className={`${styles.eachorder_div_status}`}>
                            {FilterStatus.map(status => {
                              return status.value == vendor.status ? (
                                <span
                                  style={{
                                    padding: "0.5rem",
                                    borderRadius: "1rem",
                                    color: status.color,
                                    background: status.background,
                                    fontSize: "0.8rem",
                                    fontWeight: "bold",
                                    textTransform: "capitalize",
                                  }}>
                                  {status.label}
                                </span>
                              ) : null;
                            })}
                          </div>
                          <div className={`${styles.viewDetails}`}>
                            <Link
                              prefetch={false}
                              href={`/customer/customer_order/[order_id]`}
                              as={`/customer/customer_order/${data.order_id}`}
                              legacyBehavior>
                              <a className={`${styles.viewDetails}`}>
                                <Button
                                  color='primary'
                                  variant='outlined'
                                  style={{
                                    margin: "0px",
                                    padding: "0.3rem",
                                    textTransform: "capitalize",
                                  }}>
                                  View Detail
                                </Button>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* {data.status==3?
                    <p style={{color:"#f58e8e",marginBottom:"0.2rem",fontSize:"0.8rem"}} >
                    {data.refund_status==2 && data.refund_amount && data.refund_method?
                      `₹${data.refund_amount} has been refunded to your ${data.refund_method == "wallet"
                      ? "Wallet"
                      :data.refund_method == "bank"?"Bank":"Source Account"}`
                      :null}
                      </p>
                      :null} */}
                  </div>
                );
              })}
            </div>
          </div>
        </MediaQuery>

        <style jsx>
          {`
   
          `}
        </style>
      </div>
    );
  }
}

export default ColapsibleOrders;
