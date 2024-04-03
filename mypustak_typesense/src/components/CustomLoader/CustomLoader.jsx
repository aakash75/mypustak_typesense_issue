"use client"
import React, { Component } from "react";
const textArray= ["You are just one click away from your books!",
"India's largest online free book store","MyPustak is committed to providing books to everyone"]
class CustomLoader extends Component {
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
            <img src='https://mypustak-5.s3.ap-south-1.amazonaws.com/uploads/icons/mypustak_logo.svg' alt="mypustak " />
          </div>
          <i>{textArray[this.state.random_number]}</i>
        </center>
        <div></div>

        <style jsx>{`
          .loader {
            border: ${border ? border : "0px"} solid #2248ae;
            /* Light grey */

            border-top: ${border ? border : "0px"} solid #f3f3f3;

            /* Dark Green */
            border-radius: 50%;
            width: ${size ? size : "70px"};
            height: ${size ? size : "70px"};
            // padding: 4px;
            text-align: center;

            animation: spinloader 2.1s linear infinite;
          }

          .loader img {
            height: 68%;
            width: 68%;
            animation: spinlogo 2s linear infinite;
          }

          @keyframes spinloader {
            0% {
              transform: rotateY(15deg);
            }

            100% {
              transform: rotateY(360deg);
            }
          }

          @keyframes spinlogo {
            0% {
              transform: rotateY(360deg);
            }

              }

              100% {
                transform: rotateY(15deg);
              }
          }
        `}</style>
      </div>
    );
  }
}

export default CustomLoader;
