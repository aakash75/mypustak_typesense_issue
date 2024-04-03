"use client"
import React, { Component } from "react";
import Image from "next/legacy/image";
import styles from "../../styles/walletpage.module.css";
import dynamic from "next/dynamic";
import bookcoinimg from "../../assets/BookiCon.svg";
import TextField from "@mui/material/TextField";
import MediaQuery from "react-responsive";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import cashBackCoinimg from "../../assets/CashBackiCon.svg";
import { connect } from "react-redux";
import { encryptor } from "../../helper/crypto";
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  WalletRecarge,
  SetWallet,
  SendWalletRechargeMail,
  getWalletOffer,
  showConfettiAction
} from "../../redux/actions/walletAction";
import {
  InputAdornment,
  Dialog,
  DialogContent,
  CircularProgress,
  NoSsr,
} from "@mui/material";
import NextBreadcrumbs from "../Breadcrumbs/NextBreadcrumbs";
import { Get_Rp_Id } from "../../redux/actions/donationActions";
const WalletProceedToPay = dynamic(() => import("./WalletProceedToPay"));
import Head from "next/head";
import { Button } from "@mui/material";
import { getaddress } from "../../redux/actions/accountAction";
import { fetchUserAddress } from "../../redux/actions/manageAddressAction";
const AddUserAddress = dynamic(() =>
  import("../../components/manage_address/AddNewAddress")
);
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomConfetti from "../Confetti/CustomConfetti"
import { SnackbarContent, useSnackbar } from "notistack";
import {
  Snackbar,
} from "@mui/material";
import Link from "next/link";
class Wallet extends Component {
  state = {
    output: "",
    walletAmt: "",
    OpenWalletPayBtn: false,
    COUNT: 1,
    WalletLoader: true,
    WalletErr: "",
    userEmail: "",
    bookcoin_dialog: false,
    back_to_cart: false,
    isRechargeWalletValidation: false,
    openNewAddressDialog: false,
    queryamt: "",
    offerApplied: {},
    isCashbackPopup: false,
    cashBackAmount: ""
  };
  componentDidMount() {
    // this.props.showConfettiAction()
    const token = localStorage.getItem("user_info");
    if (!token) {
      let BackUrl = "mypustak-wallet";
      window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
    } else {
      this.props.fetchUserAddress();
      this.props.getaddress();
      this.props.SetWallet("");
      this.props.getWalletOffer()
      this.initializeRazorpay()

      // let { back_to_cart } = Router.query;
      // console.log(Router.query, "back_to_cart");
      // if (back_to_cart) {
      //   this.setState({ back_to_cart: true });
      // }
      // console.log(Router.query.amt, "Router.query");
      // this.setState({
      //   queryamt: Router.query.amt,
      // });
      // if (Router.query.amt) {
      //   this.setState({
      //     walletAmt: Router.query.amt,
      //   });
      // }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.queryamt !== prevState.queryamt) {
      if (window?.location?.search?.amt) {
        this.setState({
          walletAmt: window?.location?.search?.amt,
        });
      }
    }
    if (this.props.userComponentStatus !== prevProps.userComponentStatus) {
      const token = localStorage.getItem("user_info");
      if (!token) {
        let BackUrl = "mypustak-wallet";
        window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
      }
      // this.props.showConfettiAction()
    }
  }
  openbookCoin = () => {
    this.setState({ bookcoin_dialog: true });
  };
  addwalletamnt = amount => {
    let offerSelected = this.props.walletRechargeOffers.filter((i) => { return amount >= i.min_value })[0]
    this.setState({ walletAmt: amount, WalletErr: "", offerApplied: offerSelected ? offerSelected : {} });
  };
  closeDialog = () => {
    this.setState({
      OpenWalletPayBtn: false,
      bookcoin_dialog: false,
      walletAmt: "",
      offerApplied: {}
    });
  };

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

  cashfreePayment = ({ passToCashfree, cashfreeRes }) => {
    var WalletOrderId = `WALLETORDERID_${this.state.walletAmt}`;
    let user = JSON.parse(localStorage.getItem("user_info"));

    this.setState({ showPWait: true, generatingOrderId: true });

    let data = {};
    data.orderId = WalletOrderId;
    data.orderAmount = passToCashfree;
    data.customerName = this.props.UserEmail;
    data.customerPhone = user.phone;
    data.customerEmail = user.email;
    data.returnUrl = "";
    // data.notifyUrl = "http://127.0.0.1:8000/common/cashfree/";
    data.notifyUrl = `https://data.mypustak.com/api/v1/post/get_razorpayid/cashfree_verification`;
    data.appId = "264572037bbcd2407554141f175462"; // PROD 264572037bbcd2407554141f175462 TEST 833005ef95eda971610224230338
    // appId="264572037bbcd2407554141f175462" # PROD 264572037bbcd2407554141f175462 TEST 833005ef95eda971610224230338
    // secretKey="ad8aad3db8766215ff51cf032cc8b052461bd3be" # PROD be8f4792f30b1270c5786bcab289ffa5a6ac0e51 TEST
    data.paymentToken = cashfreeRes.signature;
    let callback = async event => {
      let eventName = event.name;
      switch (eventName) {
        case "PAYMENT_REQUEST":
          let response = event.response;
          this.setState({ showPWait: true, generatingOrderId: true });
          break;
        case "PAYMENT_RESPONSE":
          let payment_response = event.response;
          if (payment_response.txStatus == "SUCCESS") {
            this.setState({
              WaitPlacingOrder: true,
              confirmOrder: true,
            });
            var today = new Date();
            const user = this.props.getuserdetails;
            var date =
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate();
            var time =
              today.getHours() +
              ":" +
              today.getMinutes() +
              ":" +
              today.getSeconds();
            var dateTime = date + " " + time;
            const SendData = {
              user_id: `${user.id}`,
              user_email: `${user.email}`,
              transaction_id: `${payment_response.referenceId}`,
              deposit: passToCashfree,
              withdrawl: "0",
              payvia: "cashfree",
              time: `${dateTime}`,
              comment: "Added To wallet",
              deducted_bookcoins: 0,
              added_bookcoins: 0,
              added_by: `${user.email}`,
              order_id: 0,
              verify_rzp: 0,
            };
            const body = { body: encryptor(SendData) };

            AuthInstance.post(
              `${config.get(
                "apiDomain"
              )}/api/v1/wallet-recharge-withdrawal/add-wallet/web`,
              body
            )
              .then(res => {
                // console.log(res,"Done ");
                const details = `Token ${localStorage.getItem("user")}`;
                this.props.SetWallet(details);
                const SendBody = {
                  user_email: `${user.email}`,
                  transaction_id: `${payment_response.referenceId}`,
                  amount: passToCashfree,
                  deducted_cashback: 0,
                  added_cashback: 0,
                };
                const token = ``;
                this.props.SendWalletRechargeMail(token, SendBody);
                this.setState({ SuccessWalletAdded: true, openAlert: true });
                // if(this.props.redirectWallettoCart){
                console.log("In Redirect Back");
                this.setState({ redirectBackCart: true });
                if (this.props.back_to_cart) {
                  window.location.replace("/view-cart");
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
          if (payment_response.txStatus == "FAILED") {
            // alert("Failed")
            // console.log('Failed');
            this.setState({ showPWait: true, generatingOrderId: false });
            this.tiggerCheck("");
          }
          if (payment_response.txStatus == "CANCELLED") {
            this.setState({
              showPWait: true,
              generatingOrderId: false,
              confirmOrder: false,
            });
          }
          break;
        default:
        // console.log(event.message);
      }
    };
    const CashFree = window.CashFree;
    let config = {};
    config.layout = { view: "popup", width: "6price" };
    config.mode = "PROD"; //use PROD when you go live
    let response = CashFree.init(config);
    // console.log({ response });

    if (response.status == "OK") {
      let response = CashFree.makePayment(data, callback);
    }
  };
  closeNewAddressDialog = () => {
    this.setState({ openNewAddressDialog: false });
  };
  setNewAddressDialog = value => {
    this.setState({ openNewAddressDialog: value });
  };
  calculatePrice = (offer) => {
    let totalValue = Number(0)
    if (offer.discount_type == 1) {
      totalValue = totalValue + Number(offer.discount_value)
    } else {
      totalValue = totalValue + (offer.min_value / 100) * Number(offer.discount_value)
    }
    return totalValue
  }
  getcashback = () => {
    let offer = this.state.offerApplied
    if (Object.keys(offer).length) {
      let totalValue = 0
      if (offer.discount_type == 1) {
        totalValue = Number(offer.discount_value)
      } else {
        totalValue = totalValue + (this.state.walletAmt / 100) * Number(offer.discount_value)
      }
      return parseInt(totalValue)
    } else {
      return 0
    }

  }
  openCashbackSnackbar = (cashback, isOpen) => {
    this.setState({ cashBackAmount: cashback, isCashbackPopup: isOpen })
  }
  render() {
    var WalletOrderId = `WALLETORDERID_${this.state.walletAmt}`;
    const WalletSubmit = e => {
      e.preventDefault();
      this.initializeRazorpay()

      // checking amout and error
      if (this.state.WalletErr === "" && this.state.walletAmt.length !== 0) {
        //    if user address length is grater then 0
        if (this.props.getadd.length > 0) {
          if (this.state.walletAmt <= 10000 - this.props.walletbalance) {
            this.setState({ isRechargeWalletValidation: true });
          } else {
            this.setState({ isRechargeWalletValidation: false });
          }
          this.setState({ OpenWalletPayBtn: true });
          const SendDataRzpzy = {
            data: {
              ref_id: WalletOrderId,
              amount: Math.round(this.state.walletAmt) * 100,
            },
          };
          const WalletData = {
            WalletOrderId,
            RechargeAmout: Math.round(this.state.walletAmt) * 100,
            selectedCode: Object.keys(this.state.offerApplied).length ? this.state.offerApplied.coupon_code : ""
          };
          this.props.Get_Rp_Id(SendDataRzpzy);
          this.props.WalletRecarge(WalletData);
          this.setState({ COUNT: 2 });
        } else {
          this.setState({ openNewAddressDialog: true });
        }
      } else {
        this.setState({ WalletErr: "Enter Amount" });
      }
    };
    const WalletSubmitAfterAddVerify = () => {
      if (this.state.WalletErr === "" && this.state.walletAmt.length !== 0) {
        if (this.props.getadd.length > 0) {
          if (this.state.walletAmt <= 10000 - this.props.walletbalance) {
            this.setState({ isRechargeWalletValidation: true });
          } else {
            this.setState({ isRechargeWalletValidation: false });
          }
          this.setState({ OpenWalletPayBtn: true });
          const SendDataRzpzy = {
            data: {
              ref_id: WalletOrderId,
              amount: Math.round(this.state.walletAmt) * 100,
            },
          };
          const WalletData = {
            WalletOrderId,
            RechargeAmout: Math.round(this.state.walletAmt) * 100,
            selectedCode: Object.keys(this.state.offerApplied).length ? this.state.offerApplied.coupon_code : ""
          };
          this.props.Get_Rp_Id(SendDataRzpzy);
          this.props.WalletRecarge(WalletData);
          this.setState({ COUNT: 2 });
        } else {
          this.setState({ openNewAddressDialog: true });
        }
      } else {
        this.setState({ WalletErr: "Enter Amount" });
      }
    };
    if (this.props.RAZORPAY !== 0 && this.state.COUNT === 2) {
      this.setState({ COUNT: 3 });
      this.setState({ WalletLoader: false });
    }
    const isValidAmount = (amount, minimum = 0, maximum = Infinity) => {
      if (typeof amount !== 'number' || isNaN(amount)) {
        return false;
      }

      if (typeof minimum !== 'number' || typeof maximum !== 'number') {
        return false
        // throw new Error("Minimum and maximum values must be of type number.");
      }

      if (amount < minimum || amount > maximum) {
        return false;
      }

      return true;
    }
    const onChange = e => {

      this.setState({ walletAmt: e.target.value });

      if (isNaN(e.target.value)) {
        this.setState({ WalletErr: "Enter digits", offerApplied: {}, walletAmt: "" });
      } else if (e.target.value <= 0) {
        this.setState({ WalletErr: "Enter Amount more than 0", offerApplied: {}, walletAmt: "" });
      } else {
        let amount = e.target.value
        let offerSelected = this.props.walletRechargeOffers.filter((i) => { return amount >= i.min_value })[0]
        this.setState({ walletAmt: amount, WalletErr: "", offerApplied: offerSelected ? offerSelected : {} });
      }
    };
    const { back_to_cart } = this.state;
    const suggestAmounts = [50, 100, 500, 1000, 2000];
    return (
      <div className='m-2 maindiv'>
        <Head>
          <script
            type='text/javascript'
            src='https://checkout.razorpay.com/v1/checkout.js' async></script>
        </Head>
        <NoSsr>
          <CustomConfetti />
          <NextBreadcrumbs />
        </NoSsr>
        <div
          id='recharge_wallet'
          className=' row d-flex justify-content-around p-1  '>
          <div
            className={`${styles.side_div}  ${styles.TopDetailsDiv} col-lg-4 col-md-5 col-sm-5 bg-white col-12 shadow px-0  mb-lg-0`}>
            <div className={styles.availbal + " py-3 shadow-sm text-center"}>
              Total Available Balance
            </div>
            <div className='d-flex  justify-content-center flex-column align-items-center  py-4'>
              <table className={`${styles.amountDetailsTable} `}>
                <tr className={`${styles.amountDetailsTableRow}`}>
                  <td className={`${styles.amountDetailsTableCell}`}>
                    <AccountBalanceWalletIcon
                      fontSize='17'
                      style={{ color: "#2e65bd", marginRight: "0.5rem" }}
                    />
                  </td>
                  <td className={`${styles.amountDetailsTableCell}`}>
                    Wallet Balance
                  </td>
                  <td className={`${styles.amountDetailsTableCell}`}> : </td>
                  <td
                    className={`${styles.amountDetailsTableCell} ${styles.startFromCenter}`}>
                    <p className='text-success font-weight-bold m-0'>
                      {this.props.walletbalance ? this.props.walletbalance : 0}
                    </p>
                  </td>
                </tr>
                <tr className={`${styles.amountDetailsTableRow} `}>
                  <td className={`${styles.amountDetailsTableCell}`}>
                    <span>
                      <Image
                        width={20}
                        height={20}
                        src={bookcoinimg}
                        onClick={this.openbookCoin}
                        style={{ cursor: "pointer", marginLeft: "3px" }}
                        alt=''
                      />
                    </span>
                  </td>
                  <td className={`${styles.amountDetailsTableCell} `}>
                    Book Coin Earned
                  </td>
                  <td className={`${styles.amountDetailsTableCell}`}> : </td>
                  <td
                    className={`${styles.amountDetailsTableCell} ${styles.startFromCenter}`}>
                    <p className='text-success font-weight-bold m-0'>
                      {this.props.bookcoins ? this.props.bookcoins : 0}
                    </p>
                  </td>
                </tr>
                <tr className={`${styles.amountDetailsTableRow}`}>
                  <td className={`${styles.amountDetailsTableCell}`}>
                    <span>
                      <Image
                        width={20}
                        height={20}
                        src={cashBackCoinimg}
                        onClick={this.openbookCoin}
                        style={{ cursor: "pointer", marginLeft: "3px" }}
                        alt=''
                      />
                    </span>
                  </td>
                  <td className={`${styles.amountDetailsTableCell}`}>
                    <span style={{ marginRight: "0.5rem" }}>
                      Cashback Earned
                    </span>
                  </td>
                  <td className={`${styles.amountDetailsTableCell}`}>
                    {" "}
                    <span style={{ marginRight: "0.5rem" }}>:</span>{" "}
                  </td>
                  <td
                    className={`${styles.amountDetailsTableCell} ${styles.startFromCenter}`}>
                    <span className='text-success font-weight-bold m-0'>
                      {this.props.cashback ? this.props.cashback : 0}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className=' bg-white  col-lg-6 col-md-6 col-sm-6 col-xs-12 shadow px-0'>
            <div className='py-2  text-center shadow-sm text'>
              <p>Add Money to Mypustak Wallet</p>
            </div>
            <div className={`${styles.walletUpperDiv} ${styles.newwalletUpperDiv}`} style={{ minHeight: this.props.walletRechargeOffers.length ? "7rem" : "0" }}>
              {this.props.walletRechargeOffers.map((offer, index) => (
                <div
                  key={index}
                  className={styles.walletOfferDiv}
                  style={{ border: Object.keys(this.state.offerApplied).length ? this.state.offerApplied.coupon_code == offer.coupon_code ? "2px solid #0d6efd" : "0" : "0" }}
                  onClick={() => { this.addwalletamnt(Number(offer.min_value)) }}
                >
                  <span className={styles.Stick}>
                    <span style={{ fontSize: "1rem", fontWeight: 600, margin: "-5px 0" }}>{offer.discount_type == 1 ? `₹${offer.discount_value}` : `${offer.discount_value}%`}</span>
                    <span style={{ fontSize: "0.65rem", margin: "0" }}>Cashback</span>
                  </span>
                  <span style={{}} className={styles.offerValueText}><b>Add  &nbsp;₹ {offer.min_value}</b> </span>
                  <span style={{}} className={styles.offerValueOfferText} ><b>Get ₹{offer.min_value} + ₹{this.calculatePrice(offer)}
                    (Cashback)
                  </b>
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.leftImgDiv}>
              <div className={styles.rightImgDiv}>
                <div className={styles.main_form + "  p-2 p-lg-4"}>
                  <form onSubmit={WalletSubmit}>
                    <div className={styles.inputDiv}>
                      {/* for web TextField */}
                      <MediaQuery minWidth={992}>
                        <FormControl style={{ width: "53%", marginLeft: "1rem" }}  >
                          <TextField
                            style={{
                              fontSize: "1.5rem",
                              width: "100%",
                              fontWeight: "bold",
                            }}
                            variant="standard"
                            error={this.state.WalletErr.length ? true : false}
                            name='amount'
                            className='pl-2 border-0 px-1 ml-1 py-2'
                            // type={"number"}
                            placeholder='Enter Amount'
                            value={this.state.walletAmt}
                            onChange={onChange}
                            required
                            // margin="dense"
                            size='small'
                            helperText={this.state.WalletErr}
                            InputProps={{
                              maxLength: 5,
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <CurrencyRupeeIcon
                                    style={{ color: "black", fontSize: "1.2rem" }}
                                  />
                                </InputAdornment>
                              ),
                            }}

                          />
                          <FormHelperText style={{ color: "green", minHeight: "2rem" }} id="outlined-weight-helper-text">{Object.keys(this.state.offerApplied).length ? `Offer Applied, you will earn ₹${this.getcashback()} as Cashback ` : ""}</FormHelperText>
                        </FormControl>
                        <Button
                          type='submit'
                          variant='contained'
                          color='primary'
                          style={{
                            textTransform: "capitalize",
                            minHeight: "2.3rem",
                            minWidth: "7rem",
                          }}>
                          Add Money to Wallet
                        </Button>
                      </MediaQuery>
                      {/* for Mobile TextField */}
                      <MediaQuery maxWidth={991}>
                        <FormControl style={{ width: "85%" }}  >
                          <TextField
                            style={{
                              fontSize: "1.5rem",
                              width: "100%",
                              fontWeight: "bold",
                            }}
                            error={this.state.WalletErr.length ? true : false}
                            name='amount'
                            className='pl-2 border-0 px-1 ml-1 py-2'
                            type={"number"}
                            placeholder='Enter Amount'
                            value={this.state.walletAmt}
                            onChange={onChange}
                            required
                            fullWidth
                            size='small'
                            variant="standard"
                            helperText={this.state.WalletErr}
                            InputProps={{
                              maxLength: 5,
                              startAdornment: (
                                <InputAdornment position='start'>

                                  <CurrencyRupeeIcon
                                    style={{ color: "black", fontSize: "1.2rem" }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <FormHelperText style={{ color: "green", fontSize: "0.8rem", textAlign: "center", marginBottom: "0.2rem" }} id="outlined-weight-helper-text">{Object.keys(this.state.offerApplied).length ? `Offer Applied, you will get ₹${this.getcashback()} In Cashback ` : ""}</FormHelperText>
                        </FormControl>
                        <Button
                          type='submit'
                          variant='contained'
                          color='primary'
                          style={{
                            textTransform: "capitalize",
                            minHeight: "2.3rem",
                            minWidth: "7rem",
                          }}>
                          Add Money to Wallet
                        </Button>
                      </MediaQuery>
                    </div>
                  </form>
                  <MediaQuery minWidth={992}>
                    <div
                      className={
                        " d-flex justify-content-around mt-4 flex-wrap"
                      }>
                      {suggestAmounts.map((price, index) => {
                        return (
                          <button
                            key={index}
                            variant='outlined'
                            className={`${styles.walletAmountButtons}`}
                            onClick={() => this.addwalletamnt(price)}>
                            ₹ {price}
                          </button>
                        );
                      })}
                    </div>
                  </MediaQuery>
                  {/* for Mobile View */}
                  <MediaQuery maxWidth={991}>
                    <div className=' d-flex justify-content-center mt-4'>
                      {suggestAmounts.slice(0, 3).map((price, index) => {
                        return (
                          <button
                            key={index}
                            variant='contained'
                            className={`${styles.walletAmountButtons}`}
                            onClick={() => this.addwalletamnt(price)}>
                            ₹ {price}
                          </button>
                        );
                      })}
                    </div>
                    <div className=' d-flex justify-content-center '>
                      {suggestAmounts.slice(3, 5).map((price, index) => {
                        return (
                          <button
                            key={index}
                            variant='contained'
                            className={`${styles.walletAmountButtons}`}
                            onClick={() => this.addwalletamnt(price)}>
                            ₹ {price}
                          </button>
                        );
                      })}
                    </div>
                  </MediaQuery>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dialog
          open={this.state.OpenWalletPayBtn}
          onClose={this.closeDialog}
          aria-labelledby='form-dialog-title'
          scroll={"body"}
          style={{ zIndex: "3000" }}>
          {this.state.isRechargeWalletValidation ? (
            <DialogContent>
              <div style={{ minWidth: "10%" }}>
                {this.state.WalletLoader ? <CircularProgress /> : null}
                {this.props.RAZORPAY !== 0 ? (
                  <WalletProceedToPay
                    closePopup={() => {
                      this.setState({ OpenWalletPayBtn: false, walletAmt: "" });
                    }}
                    back_to_cart={back_to_cart}
                    CloseDialogHand={this.closeDialog}
                    openCashbackSnackbar={this.openCashbackSnackbar}
                  />
                ) : null}
              </div>
            </DialogContent>
          ) : (
            <div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#e65100",
                  marginBottom: "-1.5rem",
                  marginTop: "0.3rem",
                }}>
                Alert!
              </div>
              <DialogContent>
                <div style={{ minWidth: "10%", padding: "0.8rem" }}>
                  {this.props.walletbalance > 0 ? (
                    <ul>
                      <li>
                        Max Wallet Recharge Limit is &nbsp;
                        <span style={{ color: "#007bff", fontWeight: "bold" }}>
                          ₹ 10000
                        </span>
                      </li>
                      <li>
                        {" "}
                        Please Recharge Amount By &nbsp;
                        <span style={{ color: "#007bff", fontWeight: "bold" }}>
                          ₹ {10000 - this.props.walletbalance}
                        </span>
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <li>
                        You Reached Max Wallet Recharge Limit
                        <span style={{ color: "#007bff", fontWeight: "bold" }}>
                          ₹ 10000
                        </span>
                      </li>
                    </ul>
                  )}
                </div>
                <div className='d-flex justify-content-end'>
                  <Button
                    color='primary'
                    variant='contained'
                    onClick={this.closeDialog}>
                    Ok
                  </Button>
                </div>
              </DialogContent>
            </div>
          )}
        </Dialog>

        <Dialog
          open={this.state.bookcoin_dialog}
          onClose={this.closeDialog}
          aria-labelledby='form-dialog-title'
          scroll={"body"}
          style={{ zIndex: "3000" }}>
          <DialogContent>
            <div style={{ minWidth: "10%", padding: "1rem" }}>
              <ul>
                <li>Book Coin Only redeem on Used Book Purchase</li>
                <li>1 Book Coin value equal to 1 INR</li>
              </ul>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.openNewAddressDialog}
          onClose={this.closeNewAddressDialog}>
          <IconButton
            aria-label='close'
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}>
            <CloseIcon
              color='#000'
              style={{ color: "#000", zIndex: 100 }}
              onClick={this.closeNewAddressDialog}
            />
          </IconButton>
          <DialogContent>
            <AddUserAddress
              isSAddNewDialog={this.setNewAddressDialog}
              afterAddingAddress={WalletSubmitAfterAddVerify}
            />
          </DialogContent>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.isCashbackPopup}
          style={{ zIndex: "4000" }}
          autoHideDuration={7000}
          onClose={() => { this.setState({ cashBackAmount: "", isCashbackPopup: false }) }}>
          <SnackbarContent style={{ backgroundColor: "green", color: "white" }}>
            {
              <div style={{ textAlign: "center", padding: "0.6rem" }}>
                You Earned &nbsp;₹&nbsp;{this.state.cashBackAmount} Cashback .
                <Link href='/wallet/passbook' legacyBehavior>
                  <a style={{ textDecoration: "none", color: "white" }}>
                    <span style={{ width: "fit-content", marginLeft: "5px", borderRadius: "5px", border: "1px solid white", padding: "3px 5px" }}> View PassBook </span>
                  </a>
                </Link>

                <span>
                  <CloseIcon
                    onClick={() => { this.setState({ cashBackAmount: "", isCashbackPopup: false }) }}
                    fontSize='small'
                    style={{ marginLeft: "0.5rem" }}
                  />
                </span>
              </div>
            }
          </SnackbarContent>
        </Snackbar>
        <style jsx>
          {`

          `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  walletbalance: state.walletR.walletbalance,
  RAZORPAY: state.donationR.rp_id,
  cashback: state.walletR.cashback,
  bookcoins: state.walletR.bookcoins,
  getuserdetails: state.userdetailsR.getuserdetails,
  userComponentStatus: state.accountR.userComponentStatus,
  getadd: state.accountR.getadd,
  walletRechargeOffers: state.walletR.walletRechargeOffers,
});
export default connect(mapStateToProps, {
  Get_Rp_Id,
  WalletRecarge,
  SetWallet,
  SendWalletRechargeMail,
  getaddress,
  fetchUserAddress,
  getWalletOffer, showConfettiAction
})(Wallet);
