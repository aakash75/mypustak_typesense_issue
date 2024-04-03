import React, { Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import Login from "../loginsignup/Login";
import Backdrop from "../Backdrop/Backdrop";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  login_backdropToggle,
  logout,
  setComponentStatus,
} from "../../redux/actions/accountAction";
import { removeAllCart } from "../../redux/actions/cartAction";
// import { logout as UserLogout } from '../../lib//helpers';
import { WhatsappIcon } from "react-share";

class OnlineCourseHoc extends Component {
  state = {
    display: false,
    showtheLoginScreen: false,
  };
  handleLogin = () => {
    this.props.login_backdropToggle();
  };
  handleToggle = () => {
    this.setState({ display: !this.state.display });
  };
  initial_state = () => {
    this.setState({ display: false });
  };
  Userlogout = () => {
    this.props.removeAllCart();
    sessionStorage.clear();
    this.props.logout();
    // localStorage.removeItem('user');
    sessionStorage.clear();
    localStorage.removeItem("user_info");
    document.cookie = "I=;expires = Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    window.location.href = "/Onlinecourse";
  };
  componentDidMount = () => {
    this.props.setComponentStatus(1);
    if (this.props.userComponentStatus == 2) {
      this.setState({ showtheLoginScreen: false });
    } else {
      this.setState({ showtheLoginScreen: true });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.userComponentStatus !== prevProps.userComponentStatus) {
      if (this.props.userComponentStatus == 2) {
        this.setState({ showtheLoginScreen: false });
      } else {
        this.setState({ showtheLoginScreen: true });
      }
    }
  }
  onClickWhatsapp = () => {
    const url = `https://api.whatsapp.com/send?phone=917439836074&text=Welcome to MyPustak - I need a help`;
    window.open(url);
  };
  render() {
    const { showtheLoginScreen } = this.props;
    return (
      <React.Fragment>
        <header className='courseheader'>
          <Login
            toggle={
              showtheLoginScreen ? showtheLoginScreen : this.props.LoginBackdrop
            }
          />
          <Backdrop
            show={this.props.PopupCart}
            click={this.backdropClickHandler}
          />
          <div className='online_header '>
            <div className='logo'>
              <Link href='/' legacyBehavior>
                <img
                  alt='mypustak'
                  src={`https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo..png`}
                />
              </Link>
            </div>
            <div className='online_header_list'>
              <Link href='/Onlinecourse/topic' legacyBehavior>
                <li> MyCourse </li>
              </Link>
              <Link
                as='/category/competitive-exams/engineering/iit/'
                href='/category/parent_category/sub_category/child_category/[index].js'
                legacyBehavior>
                <li> IIT Books </li>
              </Link>

              {/* <Link href ="category/competitive-exams/engineering/iit/">  */}
              {/* <Link > */}
              {this.props.userComponentStatus == 2 ? (
                <li onClick={() => this.Userlogout()}>Logout</li>
              ) : (
                <li onClick={() => this.handleLogin()}> Login </li>
              )}
              {/* </Link> */}

              {/* </Link> */}
            </div>
            <div className='sideicon' id='sideiconhoc'>
              <MoreVertIcon onClick={this.handleToggle} />
              <div
                className='popupdiv'
                style={{
                  position: "absolute",
                  right: "10px",
                  display: this.state.display ? "block" : "none",
                }}>
                <ul>
                  <li>
                    <Link href='/Onlinecourse/topic' legacyBehavior>
                      <a>My Courses </a>
                    </Link>
                  </li>

                  <Link
                    as='/category/competitive-exams/engineering/iit/'
                    href='/category/parent_category/sub_category/child_category/[index].js'
                    legacyBehavior>
                    <a>
                      <li>IIT Books</li>
                    </a>
                  </Link>
                  <a>
                    {this.props.userToken ? (
                      <li onClick={() => this.Userlogout()}>Logout</li>
                    ) : (
                      <li onClick={() => this.handleLogin()}> Login </li>
                    )}
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <div className='coursebody' onClick={this.initial_state}>
          {this.props.children}
        </div>
        <div className='whatsapp' onClick={this.onClickWhatsapp}>
          <WhatsappIcon round={true} size={50} />
        </div>
        <style jsx>
          {`
            .courseheader {
              // height: 8vh;
              background-color: white;
              border-bottom: 1px solid #e6e6e6;
              position: fixed;
              top: 0;
              width: 100vw;
              z-index: 10;
              font-family: RobotoDraft, "Helvetica Neue", Helvetica, Arial;
              display:none;
            }
            .online_header {
              padding: 5px;
              padding-left: 2%;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .online_header_list {
              display: flex;
              flex-direction: row;
              // border:1px solid red;
              margin-right: 5%;
            }

            .online_header_list li {
              list-style: none;
              display: flex;
              flex-direction: column;
              padding: 2%;
              margin-top: 3%;
              text-align: center;
              width: 100px;
              cursor: pointer;
              // border:1px solid blue;
            }
            .online_header_list li:hover {
              color: blue;
            }
            .online_header_list a {
              text-decoration: none;
              color: black;
            }
            .logo img {
              width: 60%;
            }
            .coursebody {
              padding-top: 8vh;
            }
            #sideiconhoc {
              display: none;
              margin-right: 10px;
            }
            .popupdiv {
              background-color: white;
              color: black;
              border-radius: 3px;
              -webkit-border-radius: 3px;
              -moz-border-radius: 3px;
              -ms-border-radius: 3px;
              -o-border-radius: 3px;
            }
            .popupdiv ul {
              color: black;
              list-style: none;
              margin: 0px;
              padding: 2%;
              width: 130px;
            }
            .popupdiv a {
              padding: 0px;
              color: black;
            }
            .popupdiv li {
              /* border: 1px solid blue; */
              padding: 2%;
            }
            .popupdiv li:hover {
              background-color: #e8e6e6;
              color: #2b509b;
            }
            .whatsapp {
              position: fixed;
              bottom: 60px;
              right: 1rem;
              z-index: 100;
              cursor: pointer;
            }
            @media only screen and (max-width: 991px) {
              .logo img {
                width: 80%;
              }
              .online_header_list {
                margin-right: 0%;
                display: none;
              }
              .online_header_list li {
                margin-right: 0%;
                width: 80px;
              }
              #sideiconhoc {
                display: block;
              }
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  LoginBackdrop: state.accountR.LoginBackdrop,
  userToken: state.accountR.token,
  userId: state.accountR.userId,
  userComponentStatus: state.accountR.userComponentStatus,
});
export default connect(mapStateToProps, {
  login_backdropToggle,
  removeAllCart,
  logout,
  setComponentStatus,
})(OnlineCourseHoc);
