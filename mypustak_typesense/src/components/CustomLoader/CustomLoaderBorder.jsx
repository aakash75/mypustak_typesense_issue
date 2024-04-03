"use client"
import React, { Component } from "react";
const textArray= ["You are just one click away from your books!",
"India's largest online free book store","MyPustak is committed to providing books to everyone"]
class CustomLoaderBorder extends Component {
  state = {
    random_number:""
  }
  componentDidMount() {
    let randnum = Math.floor(Math.random() * textArray.length)
    this.setState({
      random_number:randnum
    })
  }
  render() {
    const { border, size } = this.props;
    return (
      <div>
        <center>
          {" "}
          <div className='loader'>
            <img src='https://d239pyg5al708u.cloudfront.net/uploads/icons/mypustak_logo.svg' alt="mypustak" />
          </div>
          <i>{textArray[this.state.random_number]}</i>
        </center>
        <div></div>
        <style jsx>{`
          .loader {
            border: ${border ? border : "5px"} solid #2248ae;
            /* Light grey */
            border-top: ${border ? border : "5px"} solid #ddd;
            /* Dark Green */
            border-radius: 50%;
            width: ${size ? size : "70px"};
            height: ${size ? size : "70px"};
            padding: 4px;
            text-align: center;

            animation: spinloader 1.5s linear infinite;
          }
          .loader img {
            height: 100%;
            width: 100%;
            animation: spinlogo 1.5s linear infinite;
          }
          @keyframes spinloader {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes spinlogo {
            0% {
              transform: rotate(360deg);
            }
              }
              100% {
                transform: rotate(0deg);
              }
          }
        `}</style>
      </div>
    );
  }
}
export default CustomLoaderBorder;
