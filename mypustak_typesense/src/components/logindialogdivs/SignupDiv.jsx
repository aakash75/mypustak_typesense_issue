/* eslint-disable */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import MediaQuery from "react-responsive";

function SignupDiv(props) {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <div>
      <MediaQuery minWidth={767}>
        <div className="loginDialogRightDiv">
          <form
            onSubmit={props.signupuser}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              error={props.EmailErr}
              size="small"
              sx={{
                // animation:EmailErr?'shake 0.2s ease-in-out 0s 2':null,
                width: "18rem",
                fontSize: "0.5rem",
              }}
              label="Enter your email address"
              onChange={(e) => {
                props.setEmailid(e.target.value);
                props.setEmailErr(false);
              }}
              value={props.Emailid}
              variant="standard"
              helperText={props.EmailErr ? "Enter valid email" : null}
            />
            <TextField
              autoFocus
              error={props.MobileErr}
              inputProps={{ maxLength: 10 }}
              type={"tel"}
              onChange={(e) => {
                props.setMobile(e.target.value);
                props.setMobileErr(false);
              }}
              helperText={props.MobileErr ? "Enter valid mobile number" : null}
              sx={{
                width: "18rem",
                fontSize: "0.5rem",
              }}
              variant="standard"
              label="Enter your mobile number"
            />
            <TextField
              type={showPassword ? "text" : "password"}
              error={props.PasswordErr}
              onChange={(e) => {
                props.setPassword(e.target.value);
                props.setPasswordErr(false);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => {
                      setshowPassword(!showPassword);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                ),
              }}
              helperText={
                props.MobileErr
                  ? "Password should atleast be of 6 characters"
                  : null
              }
              sx={{
                // animation:EmailErr?'shake 0.2s ease-in-out 0s 2':null,
                width: "18rem",
                fontSize: "0.5rem",
              }}
              variant="standard"
              label="Enter password"
            />
            <button type="submit" className="loginButton">
              {props.signupLoader ? (
                <i className="fa fa-circle-o-notch fa-spin" />
              ) : (
                "Sign Up"
              )}
            </button>
            <span style={{ fontSize: "14px", color: "rgba(0,0,0,0.6)" }}>
              or
            </span>
          </form>
          <span style={{ fontSize: "14px", color: "rgba(0,0,0,0.6)" }}>
            Existing User?{" "}
            <span
              className="login"
              onClick={() => {
                props.setSignuptoggle(false);
                props.setLogintoggle(false);
                props.setPasswordErr(false);
                props.setMobileErr(false);
                props.setEmailErr(false);
                props.setEmailid("");
                props.setPassword("");
              }}
            >
              Login
            </span>
          </span>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={767}>
        <div
          style={{ paddingBottom: "3.5rem" }}
          className="loginDialogRightDiv"
        >
          <form
            onSubmit={props.signupuser}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              error={props.EmailErr}
              size="small"
              sx={{
                // animation:EmailErr?'shake 0.2s ease-in-out 0s 2':null,
                width: "18rem",
                fontSize: "0.5rem",
              }}
              label="Enter your email address"
              onChange={(e) => {
                props.setEmailid(e.target.value);
                props.setEmailErr(false);
              }}
              value={props.Emailid}
              variant="standard"
              helperText={props.EmailErr ? "Enter valid email" : null}
            />
            <TextField
              autoFocus
              error={props.MobileErr}
              inputProps={{ maxLength: 10 }}
              type={"tel"}
              onChange={(e) => {
                props.setMobile(e.target.value);
                props.setMobileErr(false);
              }}
              helperText={props.MobileErr ? "Enter valid mobile number" : null}
              sx={{
                width: "18rem",
                fontSize: "0.5rem",
              }}
              variant="standard"
              label="Enter your mobile number"
            />
            <TextField
              type={showPassword ? "text" : "password"}
              error={props.PasswordErr}
              onChange={(e) => {
                props.setPassword(e.target.value);
                props.setPasswordErr(false);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => {
                      setshowPassword(!showPassword);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                ),
              }}
              helperText={
                props.MobileErr
                  ? "Password should atleast be of 6 characters"
                  : null
              }
              sx={{
                // animation:EmailErr?'shake 0.2s ease-in-out 0s 2':null,
                width: "18rem",
                fontSize: "0.5rem",
              }}
              variant="standard"
              label="Enter password"
            />
            <button type="submit" className="loginButton">
              {props.signupLoader ? (
                <i className="fa fa-circle-o-notch fa-spin" />
              ) : (
                "Sign Up"
              )}
            </button>
            <span style={{ fontSize: "14px", color: "rgba(0,0,0,0.6)" }}>
              or
            </span>
          </form>
          <span style={{ fontSize: "14px", color: "rgba(0,0,0,0.6)" }}>
            Existing User?{" "}
            <span
              className="login"
              onClick={() => {
                props.setSignuptoggle(false);
                props.setLogintoggle(false);
                props.setPasswordErr(false);
                props.setMobileErr(false);
                props.setEmailErr(false);
                props.setEmailid("");
                props.setPassword("");
              }}
            >
              Login
            </span>
          </span>
        </div>
      </MediaQuery>
      <style jsx>
        {`
          .login {
            cursor: pointer;
          }
          .login:hover {
            color: #2248ae;
          }
          .loginButton {
            width: 9.563rem;
            height: 2.188rem;
            border: none;
            color: #fff;
            margin-top: 15px;
            background: linear-gradient(90deg, #2157ad 0%, #6190da 100%);
            border-radius: 2px;
          }
          .loginDialogRightDiv {
            display: flex;
            margin-left: 45px;
            flex-direction: column;
            // animation-name: in;
            height: 100%;
            margin-top: 15px;
            align-items: center;
            // justify-content:space-between;
            // animation-duration: 2000ms;
          }
        `}
      </style>
    </div>
  );
}

export default SignupDiv;
