import React, { Component } from "react";

import {
  SetWallet,
  SendWalletRechargeMail,
  showConfettiAction
} from "../../redux/actions/walletAction";
import { Get_Rp_Id } from "../../redux/actions/donationActions";
import { connect } from "react-redux";

import { url, AuthInstance } from "../../helper/api_url";
import {
  RedirectWalletToCart,
  OrderDetails,
} from "../../redux/actions/cartAction";

import { encryptor } from "../../helper/crypto";
class WalletProceedToPay extends Component {
  state = {
    count: 1,
    SuccessWalletAdded: false,
    openAlert: false,
    redirectBackCart: false,
  };
  closePopup = () => {
    this.props.closePopup();
  };
  getRZPID = data => {
    console.log(`${data} ttt`);
  };
  // ***********************RAZORPAY PART********************************
  options = {
    // "key": "rzp_live_pvrJGzjDkVei3G", //Paste your API key here before clicking on the Pay Button.
    // "key": "rzp_test_jxY6Dww4U2KiSA",
    key: "rzp_live_cNDMU35KKMCp6t", //Paste your API key here before clicking on the Pay Button.

    amount: this.props.RechargeAmt,
    name: `Mypustak.com`,
    description: `Recharge`,
    "Order Id": `${this.props.RAZORPAY}`, //Razorpay Order id
    currency: "INR",

    handler: response => {
      var razorpay_payment_id = response.razorpay_payment_id;
      const razorpay_order_id = response.razorpay_order_id;
      const razorpay_signature = response.razorpay_signature;
      // console.log(response);
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + " " + time;
      //{"user_id":"1","user_email":"a","transaction_id":"sdfd","deposit":"dfs","withdrawl":"sdf","payvia":"sdf","comment":"sdf","time":"2019-03-08 16:33:41","added_by":"sdf"}
      const SendData = {
        user_id: `${this.props.UserId}`,
        user_email: `${this.props.UserEmail}`,
        transaction_id: `${razorpay_payment_id}`,
        deposit: this.props.RechargeAmt / 100,
        withdrawl: "0",
        payvia: "razorpay",
        time: `${dateTime}`,
        comment: "Added To wallet",
        deducted_bookcoins: 0,
        added_bookcoins: 0,
        added_by: `${this.props.UserEmail}`,
        order_id: 0,
        verify_rzp: 1,
        coupon_code: this.props.selectedCode
      };
      const body = { body: encryptor(SendData) };

      AuthInstance.post(
        `${url}/api/v1/wallet-recharge-withdrawal/add-wallet/web`,
        body
      )
        .then(res => {
          console.log(res, "Done ");
          if (res.data.cashback) {
            this.props.openCashbackSnackbar(res.data.cashback, true)
            this.props.showConfettiAction()
          }
          const details = `Token ${localStorage.getItem("user")}`;
          this.props.SetWallet(details);
          const SendBody = {
            user_email: `${this.props.UserEmail}`,
            transaction_id: razorpay_payment_id,
            amount: this.props.RechargeAmt / 100,
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
        .catch(err => console.log(err, SendData));
    },

    prefill: {
      contact: `${this.props.Selectedphone_no}`,
      email: `${this.props.UserEmail}`,
    },

    notes: {
      "Order Id": this.props.WalletOrderId, //"order_id": "your_order_id",
      address: "customer address to be entered here",
      user_id: `${this.props.UserId}`,
      user_email: `${this.props.UserEmail}`,
    },
    theme: {
      color: "#2248ae",
      emi_mode: true,
    },

    external: {
      wallets: ["mobikwik", "jiomoney"],
      handler: function (data) {
        // console.log(this, data)
      },
    },
  };

  componentDidMount() {
    this.setState({ SuccessWalletAdded: false });
    // this.props.GetOrderId(data)
    this.rzp1 = new window.Razorpay(this.options);
    this.setState({ redirectBackCart: false });
    this.rzp1.open();
    this.props.CloseDialogHand();
    // this.props.showConfettiAction()
  }
  closeProcedToPay() {
    this.props.closeProcedToPay();
  }
  handleClose = () => {
    this.setState({ openAlert: false });
  };
  render() {
    if (this.props.back_to_cart) {
      // alert("okk  ")
    }
    const { SelectedAddress } = this.props;
    return (
      <div>
        {this.state.SuccessWalletAdded === false ? null : ( // </Button> //   Add to Wallet &#8377; {this.props.RechargeAmt / 100} //   onClick={() => this.rzp1.open()}> //   color='primary' //   variant='contained' // <Button
          <p style={{ color: "#38ACEC", textAlign: "center" }}>
            Amount Added to Wallet Successfull
          </p>
        )}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  userToken: state.accountR.token,
  UserId: state.userdetailsR.getuserdetails.id,
  TotalPrice: state.cartReduc.TotalPrice,
  UserEmail: state.userdetailsR.getuserdetails.email,
  RechargeAmt: state.walletR.RechargeAmout,
  WalletOrderId: state.walletR.WalletOrderId,
  Selectedphone_no: state.accountR.getuserdetails.phone,
  redirectWallettoCart: state.cartReduc.redirectWallettoCartState,
  selectedCode: state.walletR.selectedCode,
});

export default connect(mapStateToProps, {
  OrderDetails,
  Get_Rp_Id,
  RedirectWalletToCart,
  SetWallet,
  SendWalletRechargeMail,
  showConfettiAction
})(WalletProceedToPay);
