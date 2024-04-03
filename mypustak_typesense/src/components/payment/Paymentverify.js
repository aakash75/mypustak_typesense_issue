"use client"
import React, { Component } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import {
  capture_rzp_failed,
  cashfree_verify_payment,
} from "../../redux/actions/BackendorderAction";
import { CircularProgress } from "@mui/material";
class Paymentverify extends Component {
  state = {
    id: null,
    verify_loader: true,
  };
  componentDidMount() {
   
    if (window.location.search) {
      let id = window.location.search.split("=")[1];
      this.setState({ id: id });
      this.verify_cashfree(id);
    }
  }
  verify_cashfree = order_id => {
    // alert("hir");
    let body = { order_id: order_id };
    this.props
      .cashfree_verify_payment(body)
      .then(res => {
        let data = res.data;
        let order_details = {
          order: {},
          user_id: data.user_id,
          phone_no: data.phone_no,
          order_id: data.order_id,
          ordervalue: data.order_value,
        };
        localStorage.setItem("order_details", JSON.stringify(order_details));

        window.location.replace(`thank-you?id=${order_id}`);
      })
      .catch(error => {
        this.setState({ verify_loader: false });
      });
  };
  captureFailedRzp = () => {
    this.props
      .capture_rzp_failed()
      .then(res => { })
      .catch(error => { });
  };
  render() {
    return (
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
        </Head>
        <div>
          <div className='main_div_payment'>
            {this.state.verify_loader ? (
              <div>
                <h5>
                  {" "}
                  Please Do Not Close The Window.Your Order Is Being Placed...
                </h5>
                <CircularProgress />
              </div>
            ) : (
              <div>
                <h4 style={{ color: "red" }}>Payment Failed !</h4>
                <p>
                  <b>Dont worry your money is safe with us!</b>
                  <br />
                  If money was debited from your account, it will be refunded
                  automatically in 5-7 bank working days
                </p>
              </div>
            )}
          </div>
        </div>
        <style jsx>{`
          .main_div_payment {
            display: flex;
            justify-content: center;
            min-height: 80vh;
            text-align: center;
            font-size: 1.2rem;
            margin-top: 1rem;
            background: white;
            align-items: center;
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  capture_rzp_failed,
  cashfree_verify_payment,
})(Paymentverify);
