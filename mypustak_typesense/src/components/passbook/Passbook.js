"use client"
import MediaQuery from "react-responsive";
import React, { Component } from "react";
import InboxIcon from "@mui/icons-material/Inbox";
import { passbookd } from "../../redux/actions/passbookAction"; 
import { connect } from "react-redux";
import { Getwalletd } from "../../redux/actions/walletAction";
import moment from "moment";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Link from "next/link";
import { Button, NoSsr } from "@mui/material";
import { CircularProgress } from "@mui/material";
import NextBreadcrumbs from "../Breadcrumbs/NextBreadcrumbs";
import cashBackCoinimg from "../../assets/CashBackiCon.svg";
import Image from "next/legacy/image";
import bookcoinimg from "../../assets/BookiCon.svg";
import styles from "../../styles/PassBook.module.css";
class Passbook extends Component {
  state = {
    datetime: this.props.passdetails.time,
    userToken: "",
    page: 1,
    initialLoader: true,
    ServerError: false,
    dataLength: "",
    pageLoader: false,
  };
  componentDidMount() {
    const token = localStorage.getItem("user_info");
    if (!token) {
      let BackUrl = "/wallet/passbook";
      window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
    }
    window.scrollTo(0, 0);
    const details = `Token ${this.props.userToken}`;
    this.props.Getwalletd(details);
    const details1 = `Token ${this.props.userToken}`;
    this.props
      .passbookd(details1, this.state.page)
      .then(res => {
        this.setState({ initialLoader: false, dataLength: res.length });
      })
      .catch(err => {
        this.setState({ initialLoader: false, ServerError: true });
      });
  }
  loadMoreHand = () => {
    let NewPage = this.state.page + 1;
    this.setState({ page: NewPage, pageLoader: true });
    this.props
      .passbookd("", NewPage)
      .then(res => {
        this.setState({ dataLength: res.length, pageLoader: false });
      })
      .catch(() => {
        this.setState({ ServerError: true, pageLoader: false });
      });
  };
  render() {
    const { passdetails } = this.props;
    return <>
      <NoSsr>
        <NextBreadcrumbs />
      </NoSsr>
      <div className='container  pt-2 pb-5 bg-white'>
        {this.state.ServerError ? (
          <div>
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
                  onClick={() => {
                    window.location.reload();
                  }}>
                  {" "}
                  Reload
                </Button>
              </div>
            </div>
          </div>
        ) : !this.state.initialLoader ? (
          <>
            <h5 className='text-center py-2 text-color'>
              <b>Wallet Transactions</b>
            </h5>
            <div
              style={{
                zIndex: 500,
              }}>
              <div className='d-md-flex d-none py-2 justify-content-evenly mb-3'>
                <div className='text-center '>
                  <span className='text-color'>
                    <AccountBalanceWalletIcon
                      style={{ fontSize: "1.3rem" }}
                    />{" "}
                    {/* Available Balance : */}
                    Wallet Balance :
                  </span>
                  <span className='text-success '>
                    &nbsp;
                    {this.props.walletbalance == 0 ? (
                      <>Zero</>
                    ) : (
                      <b>&#8377; {this.props.walletbalance}</b>
                    )}
                  </span>
                </div>
                <div className='text-center '>
                  <span className="d-flex justify-content-center align-items-center">
                    <span>
                      <Image
                        width={20}
                        height={20}
                        src={bookcoinimg}
                        onClick={this.openbookCoin}
                        style={{ cursor: "pointer", }}
                        alt=''
                      />{" "}
                    </span>&nbsp;
                    <span className="">
                      <span className='text-color'>
                        Book Coin :
                      </span>
                      <span className='text-success '>
                        &nbsp;
                        {this.props.bookcoins == 0 ? (
                          <>Zero</>
                        ) : (
                          <b>&#8377; {this.props.bookcoins}</b>
                        )}
                      </span>
                    </span>
                  </span>
                </div>
                <div className='text-center '>
                  <span className="d-flex justify-content-center align-items-center">
                    <span className="">
                      <Image
                        width={20}
                        height={20}
                        src={cashBackCoinimg}
                        style={{ cursor: "pointer", marginTop: "-1rem" }}
                        alt=''
                      />
                    </span>&nbsp;
                    <span className='text-color'>
                      Cashback :
                    </span>
                    <span className='text-success '>
                      &nbsp;
                      {this.props.cashback == 0 ? (
                        <>Zero</>
                      ) : (
                        <b>&#8377; {this.props.cashback}</b>
                      )}
                    </span>
                  </span>
                </div>
                <div style={{ position: "sticky", top: "180px" }}>
                  <div className='btndiv text-center'>
                    <Link href='/mypustak-wallet' legacyBehavior>
                      <Button
                        size='small'
                        variant='contained'
                        className='bg-color text-white'
                        style={{ textTransform: "capitalize" }}>
                        Add Balance
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <MediaQuery maxWidth={767}>
                <div style={{ display: "flex", justifyContent: "center" }}>
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
              </MediaQuery>
            </div>
            {/* For desktop view */}

            <div className='mx-2 mx-auto mx-md-0 d-none d-lg-flex'>
              <table className=' table table-borderless'>
                <thead className='text-white bg-color '>
                  <tr>
                    <th scope='col' className='text-left'>
                      Past transactions
                    </th>
                    <th scope='col' className='text-center'>
                      Wallet
                    </th>
                    <th scope='col' className='text-center'>
                      Book Coins
                    </th>
                    <th scope='col' className='text-center'>
                      Cashback
                    </th>
                    <th scope='col' className=' d-none d-md-block'>
                      Comment
                    </th>
                  </tr>
                </thead>
                {passdetails.length ? (
                  <>
                    {passdetails?.map(data => (
                      <tbody key={data.wallet_id}>
                        <tr className=''>
                          <td scope='row' className='pb-0'>
                            <div>
                              <span>
                                Pai Via:
                                <span className='text-black text-opacity-75'>
                                  <small>{data.payvia}</small>
                                </span>
                              </span>
                              <br />
                              <span>
                                Date:
                                <span className='text-black text-opacity-75'>
                                  <small>
                                    {moment(data.time).format("L,LT")}
                                  </small>
                                </span>
                              </span>
                              <br />
                              {data.transaction_id ? (
                                <>
                                  <span>
                                    Order ID:
                                    <span className='text-black text-opacity-75'>
                                      <small>{data.transaction_id}</small>
                                    </span>
                                  </span>
                                  <br />
                                </>
                              ) : null}
                            </div>
                          </td>
                          <td className=' text-center'>
                            {data.deposit > 0 ? (
                              <span className='text-success'>
                                {" "}
                                + &#8377;{data.deposit}
                              </span>
                            ) : data.withdrawl > 0 ? (
                              <span className='text-danger'>
                                {" "}
                                - &#8377;{data.withdrawl}
                              </span>
                            ) : (
                              <span className='text-success'>0</span>
                            )}
                          </td>
                          <td className='text-danger text-center'>
                            {data.added_cashback > "0" ? (
                              <span className='text-success'>
                                {" "}
                                + &#8377;{data.added_cashback}
                              </span>
                            ) : data.deducted_cashback > "0" ? (
                              <span className='text-danger'>
                                {" "}
                                - &#8377;{data.deducted_cashback}
                              </span>
                            ) : (
                              <span className='text-danegr'>0</span>
                            )}
                          </td>
                          <td className='text-danger text-center'>
                            {data.added_bookcoins > "0" ? (
                              <span className='text-success'>
                                {" "}
                                + &#8377;{data.added_bookcoins}
                              </span>
                            ) : data.deducted_bookcoins > "0" ? (
                              <span className='text-danger'>
                                {" "}
                                - &#8377;{data.deducted_bookcoins}
                              </span>
                            ) : (
                              <span className='text-danegr'>0</span>
                            )}
                          </td>
                          <td className='text-black text-opacity-75 d-none d-md-block text-center'>
                            <small>{data.comment}</small>
                          </td>
                        </tr>

                        <tr className='d-md-none   py-0'>
                          <td colSpan={3} className='py-0'>
                            <span className='d-block d-md-none w-75'>
                              Comment:{" "}
                              <span className='text-black text-opacity-75'>
                                {data.comment}
                              </span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={5} className='p-0'>
                            <hr className='w-100 m-0 mt-3' />
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div
                        style={{ textAlign: "center", padding: "2rem 0rem" }}>
                        <AccountBalanceWalletIcon
                          style={{ fontSize: "5rem" }}
                        />
                        <div
                          style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                          {" "}
                          You Have No Wallet Transaction
                        </div>
                        <div>
                          <Link href='/mypustak-wallet' legacyBehavior>
                            <Button
                              variant='contained'
                              color='primary'
                              style={{
                                width: "9rem",
                                margin: "1rem 0rem",
                                textTransform: "capitalize",
                              }}>
                              {" "}
                              Add Balance
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </table>
            </div>
            {/* For tablet & Mobile view */}
            {passdetails.length ? (
              <>
                {passdetails.map(data => (
                  <div
                    key={data.key}
                    className=' card   d-lg-none mb-2'
                    style={{ fontSize: "0.9rem" }}>
                    <div className='row p-2'>
                      <span className='col-12 col-sm-6 '>
                        <small>
                          <b>Pay Via</b>: {data.payvia} ,{" "}
                          <small>
                            <b>{moment(data.time).format("L,LT")}</b>
                          </small>{" "}
                        </small>
                      </span>
                      <br />

                      <span className='col-12 col-sm-6'>
                        <small>Order Id : {data.order_id}</small>
                      </span>
                      <br />
                      <span className='col-12 col-sm-6'>
                        <small>Payment Id : 12345678901234567890</small>
                      </span>
                      <br />

                      <span className='col-12 col-sm-6 para-color'>
                        <small className=''>Comment : {data.comment}</small>
                      </span>
                    </div>

                    <table className='table table-bordered text-center rounded mb-0'>
                      <thead className=''>
                        <tr className='' style={{ fontSize: "0.8rem" }}>
                          <th scope='col' className=''>
                            <small>
                              Wallet
                              {data.deposit > 0
                                ? " ( Deposit ) "
                                : data.withdrawl > 0
                                  ? " ( Withdrawal ) "
                                  : null}
                            </small>
                          </th>
                          <th scope='col' className=''>
                            <small>
                              Cashback
                              {data.added_cashback > 0
                                ? " ( Deposit ) "
                                : data.deducted_cashback > 0
                                  ? " ( Withdrawal ) "
                                  : null}
                            </small>
                          </th>
                          <th scope='col' className=''>
                            <small>
                              Bookcoin
                              {data.added_bookcoins > 0
                                ? " ( Deposit ) "
                                : data.deducted_bookcoins > 0
                                  ? " ( Withdrawal ) "
                                  : null}
                            </small>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className=''>
                            <b>
                              {" "}
                              {data.deposit > 0 ? (
                                <span className='text-success'>
                                  {" "}
                                  &#8377;{data.deposit}
                                </span>
                              ) : data.withdrawl > "0" ? (
                                <span className='text-danger'>
                                  {" "}
                                  &#8377;{data.withdrawl}
                                </span>
                              ) : (
                                <span className='text-success'>0</span>
                              )}
                            </b>
                          </td>
                          <td className=''>
                            <b>
                              {data.added_cashback > "0" ? (
                                <span className='text-success'>
                                  {" "}
                                  &#8377;{data.added_cashback}
                                </span>
                              ) : data.deducted_cashback > "0" ? (
                                <span className='text-danger'>
                                  {" "}
                                  &#8377;{data.deducted_cashback}
                                </span>
                              ) : (
                                <span className='text-danegr'>0</span>
                              )}
                            </b>
                          </td>
                          <td className=''>
                            <b>
                              {data.added_bookcoins > "0" ? (
                                <span className='text-success'>
                                  {" "}
                                  &#8377;{data.added_bookcoins}
                                </span>
                              ) : data.deducted_bookcoins > "0" ? (
                                <span className='text-danger'>
                                  {" "}
                                  &#8377;{data.deducted_bookcoins}
                                </span>
                              ) : (
                                <span className='text-danegr'>0</span>
                              )}
                            </b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </>
            ) : (
              <div style={{}} className='d-lg-none'>
                No Transaction Found
              </div>
            )}
            {this.state.dataLength == 10 ? (
              <div style={{ textAlign: "center" }}>
                {this.state.pageLoader ? (
                  <Button
                    style={{ minWidth: "6.8rem", height: "2.5rem" }}
                    color='primary'
                    variant='contained'>
                    {" "}
                    <CircularProgress style={{ color: "white" }} size={19} />{" "}
                  </Button>
                ) : (
                  <Button
                    color='primary'
                    variant='contained'
                    style={{ minWidth: "6.8rem", height: "2.5rem", textTransform: "capitalize" }}
                    onClick={() => {
                      this.loadMoreHand();
                    }}>
                    Load More
                  </Button>
                )}
              </div>
            ) : null}
            <style jsx>
              {`
                // .card-type {
                //   box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
                //   transition: 0.3s;
                // }
          
                .card-type td,
                th {
                  border: 1px solid #dddddd;
                  text-align: center;
                }
              `}
            </style>
          </>
        ) : (
          <div style={{ textAlign: "center", marginTop: "10rem", minHeight: "50vh" }}>
            <CircularProgress size={60} color='primary' />
          </div>
        )}
      </div>
    </>;
  }
}

const mapStateToProps = state => ({
  walletbalance: state.walletR.walletbalance,
  bookcoins: state.walletR.bookcoins,
  cashback: state.walletR.cashback,
  userToken: state.accountR.token,
  passdetails: state.PassbookR.passdetails,
});
export default connect(mapStateToProps, { Getwalletd, passbookd })(Passbook);
