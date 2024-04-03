"use client"
import React, { Component } from "react";
import Head from "next/head";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { connect } from "react-redux";
import { capture_rzp_failed } from "../../redux/actions/BackendorderAction";
class paymentconfirmation extends Component {
  state = {
    id: null,
  };
  componentDidMount() {
    let path = window.location.pathname;
    console.log(path, "path---");
    this.setState({ id: path.id });
    this.captureFailedRzp();
  }
  captureFailedRzp = () => {
    this.props
      .capture_rzp_failed()
      ?.then(res => { })
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
            <div>
              <h3>
                Thank you for your payment{" "}
                <span>
                  <CheckCircleIcon
                    className="checkIcon"
                    style={{
                      color: "#0dc143",
                      fontSize: "2.5rem",
                      height: "2.5rem",
                    }}
                  />
                </span>
              </h3>
              <h5>
                We received your payment for order id <b>{this.state.id}</b> ,we
                will update your payment details within 2 working hrs
              </h5>
            </div>
          </div>
        </div>

        <style jsx>{`
          .main_div_payment {
            min-height: 30vh;
            text-align: center;
            font-size: 1.2rem;
            margin-top: 1rem;
          }
          .checkIcon{

          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { capture_rzp_failed })(
  paymentconfirmation
);
