import React, { Component } from "react"
import Link from "next/link"
class Aboutnav extends Component {
  state = {
    path: ""
  }
  componentDidMount() {
    const path = window.location.pathname.split("/")
    const lastPath = path[path.length - 1]
    console.log(lastPath, "////")
    this.setState({ path: lastPath })
  }
  render() {

    return (
      <div className="Main_aboutnav">
        <div className="aboutnav_content">
          <div className="nav_img">
            <img alt=""
              src={`https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo..png`}
            />
          </div>
          <div className="nav_list">
            <ul>
              <Link href="/" legacyBehavior>
             
                  <li style={{ marginRight: "-2rem" }} className={this.state.path == "" ? "currentpage" : "othersPage"} >Home</li>
              
              </Link>
              <Link href="/pages/about-us/history" legacyBehavior>
             
                  <li className={this.state.path == "history" ? "currentpage" : "othersPage"} >Our Story</li>
               
              </Link>

              <Link href="/pages/about-us/OurCommitment" legacyBehavior>
        
                  <li className={this.state.path == "OurCommitment" ? "currentpage" : "othersPage"}>Our Commitment</li>
              </Link>

              <Link href="/pages/about-us/Impact" legacyBehavior>
              
                  <li className={this.state.path == "Impact" ? "currentpage" : "othersPage"}>Our Impact</li>
              
              </Link>

              <Link href="/pages/about-us/free-book-theory" legacyBehavior>
             
                  <li className={this.state.path == "free-book-theory" ? "currentpage" : "othersPage"}>Free Book Theory</li>
               
              </Link>
            </ul>
          </div>
        </div>

        <style jsx>
          {`
              @import url("https://fonts.googleapis.com/css2?family=Kameron&display=swap");
              a {
                text-decoration: none;
                color: white;
              }
              .currentpage{
                font-weight: 900;
                border-radius: 10px;
                color: #2258ae;
                background: white;
                font-weight:900;
              }
              .aboutnav_content {
                display: flex;
                padding: 1rem;
                font-family: "Kameron", serif;
                justify-content: space-between;
              }
              .nav_img img {
                width: 80%;
              }
              .nav_list {
                font-family: "Kameron", serif;
              }
              .nav_list ul {
                display: flex;
                list-style: none;
                justify-content: space-evenly;
                align-items: center;
                //   border:1px solid red;
                width: 68vw;
                padding-right:2rem;
                margin-top: 3%;
                font-family: "Kameron", serif;
              }
              .nav_list ul li {
                font-size: 1.3rem;
                cursor: pointer;
                
                // border:1px solid red;
                width: 11rem;
                text-align: center;
                font-family: "Kameron", serif;
              }
              .nav_list ul li:hover {
                font-weight: bold;
              }
              @media screen and (max-width: 768px) {
                .nav_list {
                  display: none;
                }
                .nav_img {
                  padding-left: 25vw;
                }
              }
            `}
        </style>
      </div>
    );
  }
}

export default Aboutnav
