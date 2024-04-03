"use client"
import React, { Component } from "react";
import { Button, TextField, Skeleton } from "@mui/material";
import styles from "../../styles/Myprofile.module.css"
import {
  Getaddress,
  userdetails,
  Editaddress,
  AfterLoginRedirect,
  login_backdropToggle,
  Upload_profile,
} from "../../redux/actions/accountAction";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import { CartopenModal } from "../../redux/actions/cartAction";
import {
  fetch_user_detail,
  update_user_detail,
} from "../../redux/actions/accountAction";
import { connect } from "react-redux";
import { validateMobile } from "../../helper/validations";
import { withSnackbar } from "notistack";
export class PersonalDetails extends Component {
  state = {
    userDistinct: [],
    first_name: "lll",
    fname: "",
    tastingstate: "tesrt",
    last_name: "",
    email: "",
    phone: "",
    edit_firstname: true,
    edit_lastname: true,
    edit_email: true,
    edit_phone: true,
    showmsg: false,
    image:
      "https://d239pyg5al708u.cloudfront.net/uploads/avatar/funny-png-avatar-2.png",
    uploadedFile: "",
    phone_error: "",
    messagetoshow: "",
    imgUploadingMsg: "",
    showImgUploading: false,
    updating_Loader: false,
  };
  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("user_info"));
    const token = localStorage.getItem("user_info");
    if (!token) {
      let BackUrl = "/customer/Myprofile";
      window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
    } else {
      this.setData();
    }
    window.scrollTo(0, 0);
  }
  setData = async () => {
    let user = JSON.parse(localStorage.getItem("user_info"));
    let res = await this.props.fetch_user_detail(user.id);
    if (res) {
      this.setState({
        image: `https://d239pyg5al708u.cloudfront.net/uploads/avatar/${this.props.userDistinct.avatar}`,
      });
      let userid = this.props.userDistinct.id;
      let email = this.props.userDistinct.email;
      let phone = this.props.userDistinct.mobile;
      let fname = this.props.userDistinct.first_name;
      let lname = this.props.userDistinct.last_name;
      console.log(
        {
          user: userid,
          email: email,
          phone: phone,
          fname: fname,
          lname: lname,
        },
        "mountobj"
      );
      this.setState({
        first_name: fname,
        email: email,
        phone: phone,
        last_name: lname,
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.getuserdetails !== this.props.getuserdetails) {
      let email = this.props.userDistinct.email;
      let phone = this.props.userDistinct.mobile;
      let fname = this.props.userDistinct.first_name;
      let lname = this.props.userDistinct.last_name;
      console.log(
        { email: email, phone: phone, fname: fname, lname: lname },
        "objupdate"
      );
      this.setState({
        first_name: fname,
        email: email,
        phone: phone,
        last_name: lname,
      });
      let user = JSON.parse(localStorage.getItem("user_info"));
      this.props.fetch_user_detail(user.id);
    }
    if (this.props.userComponentStatus !== prevProps.userComponentStatus) {
      if (this.props.userComponentStatus == 1) {
        let BackUrl = "customer/Myprofile";
        window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
      } else if (this.props.userComponentStatus == 2) {

      }
    }
    if (prevProps.userDistinct !== this.props.userDistinct) {
      this.setState({
        userDistinct: this.props.userDistinct,
        last_name: this.props.userDistinct.last_name,
      });
      if (this.props.userDistinct.avatar) {
        this.setState({
          image: `https://d239pyg5al708u.cloudfront.net/uploads/avatar/${this.props.userDistinct.avatar}`,
        });
      }
    }
  }

  onImageChange = event => {
    event.preventDefault();

    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img),
      });

      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = event => {
        this.props.Upload_profile(img).then(res => {
        });
      };
    }
  };

  UploadImageFile = e => {
    e.preventDefault();
    const file = e.target.files[0];
    const acceptedImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (file) {
      if (!acceptedImageTypes.includes(file["type"])) {
        this.setState({
          showmsg: true,
          imgUploadingMsg: `Upload Correct Format`,
        });
        this.props.enqueueSnackbar(`Upload Correct Format (jpeg,jpg,png,svg)`, {
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          variant: "warning",
          persist: false,
        });
        return;
      }
    }
    this.setState({
      image: URL.createObjectURL(file),
    });
    this.setState({ uploadedFile: file });
    this.setState({ showImgUploading: true });
    const data = new FormData();
    data.append("file", file);
    const user_id = JSON.parse(localStorage.getItem("user_info")).id;
    let body = data;
    this.props
      .Upload_profile(body, user_id)
      .then(res => {
        this.setState({
          showmsg: true,
          imgUploadingMsg: `Image Updated Successfully`,
          showImgUploading: false,
        });
        this.props.enqueueSnackbar(`Profile Updated Successfully`, {
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          variant: "success",
          persist: false,
        });
      })
      .catch(err => {
        this.setState({
          showImgUploading: false,
          showmsg: true,
          imgUploadingMsg: `Image Image Not Uploaded`,
        });
        this.props.enqueueSnackbar(`Profile Image Not Uploaded`, {
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          variant: "error",
          persist: false,
        });
      });
  };
  SendUploadedFile = e => {
    e.preventDefault();
    this.setState({ showImgUploading: true });
    const data = new FormData();
    data.append("file", this.state.uploadedFile);
    const user_id = this.props.getuserdetails.id;

    let body = data;
    this.props
      .Upload_profile(body, user_id)
      .then(res => {
        this.setState({
          showmsg: true,
          messagetoshow: `Profile Updated Successfully`,
          showImgUploading: false,
        });
      })
      .catch(err => {
        this.setState({
          showImgUploading: false,
          showmsg: true,
          messagetoshow: `Profile Image Not Uploaded`,
        });
      });
  };
  upload_pic = () => {
    this.props.Upload_profile();
  };
  handleClose = () => {
    this.setState({ showmsg: false, messagetoshow: `` });
  };
  edit_firstname_onclick = () => {
    this.setState({ edit_firstname: false });
  };

  edit_lastname_onclick = () => {
    this.setState({ edit_lastname: false });
  };
  edit_email_onclick = () => {
    this.setState({ edit_email: false });
  };
  edit_phone_onclick = () => {
    this.setState({ edit_phone: false });
  };
  first_name_change = e => {
    e.preventDefault();
    let first_name = e.target.value;
    let userDistinct = this.state.userDistinct;
    userDistinct.first_name = first_name;
    this.setState({ userDistinct, first_name: first_name });
  };
  last_name_change = e => {
    e.preventDefault();
    let last_name = e.target.value;
    let userDistinct = this.state.userDistinct;
    userDistinct.last_name = last_name;
    this.setState({ userDistinct, last_name: last_name });
  };
  mobile_change = e => {
    e.preventDefault();
    let mobile = e.target.value;
    let userDistinct = this.state.userDistinct;
    userDistinct.mobile = mobile;
    this.setState({ userDistinct, phone: mobile, phone_error: "" });
  };
  updatedata = async e => {
    e.preventDefault();
    // alert('ok')
    this.setState({ updating_Loader: true });
    let body = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone: this.state.phone,
    };

    if (!validateMobile(Number(body.phone))) {
      this.setState({ phone_error: "Enter Correct Phone Number" });
      return;
    }

    const token = `Token ${localStorage.getItem("user")}`;
    const userid = this.props.getuserdetails.id;

    let res = await this.props.update_user_detail(body, userid);
    if (res) {
      this.props.enqueueSnackbar(`Profile Updated Successfully`, {
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
        persist: false,
      });
      let response = await this.props.fetch_user_detail(userid);
      if (response) {
        this.setState({
          showmsg: true,
          edit_firstname: true,
          edit_lastname: true,
          edit_email: true,
          edit_phone: true,
          messagetoshow: `Profile Updated Successfully`,
        });
      }
    }
    this.setState({ updating_Loader: false });
  };

  render() {
    // alert("okk")
    console.log("llllllllllllllllllllllllllllllllllllllllll");
    const { first_name, last_name, email, phone, phone_error } = this.state;
    console.log("okk112");
    console.log(
      this.state.fname,
      first_name,
      last_name,
      this.state.email,
      this.state.phone,
      "getuserdetails"
    );
    return (
      <div>
        <h4
          className={` ${styles.inputTitle} bg-color p-2 text-white px-4`}
          style={{ marginBottom: "1rem" }}>
          Enter your personal details
        </h4>
        <form className='container-fluid row mx-auto bg-white p-lg-4 p-3 border shadow'>
          <div className='col-12 col-sm-5 col-lg-3 d-flex flex-column align-items-center'>
            <div className='d-flex justify-content-center'>
              {Object.keys(this.props.userDistinct).length ? (
                <img
                  alt=''
                  src={this.state.image}
                  className='rounded-circle p-3'
                  width={"75%"}
                />
              ) : (
                <Skeleton
                  animation='wave'
                  className='rounded-circle p-3'
                  width={"8rem"}
                  height='8rem'
                />
              )}
            </div>
            <div className={`${styles.imageInputdiv}`}>
              <input
                type='file'
                name='profile_image'
                className='d-none'
                id='files'
                onChange={this.UploadImageFile}
              />
              <label
                htmlFor='files'
                className={` ${styles.importimage} btn btn-outline-primary`}>
                <FileUploadOutlinedIcon />
                Choose File
              </label>
              {this.state.imgUploadingMsg ? (
                this.state.imgUploadingMsg == "Image Updated Successfully" ? (
                  <p style={{ fontSize: "0.7rem" }} className='text-success'>
                    {this.state.imgUploadingMsg}
                  </p>
                ) : (
                  <p style={{ fontSize: "0.7rem" }} className='text-danger'>
                    {this.state.imgUploadingMsg}
                  </p>
                )
              ) : (
                <p style={{ fontSize: "0.7rem" }} className='text-danger'>
                  *format accepted (jpeg,jpg,png,svg)
                </p>
              )}
            </div>
          </div>

          <div className='col-12 col-sm-7 col-lg-9'>
            <div className='row'>
              <div className='col-12 col-lg-6'>
                <TextField
                  label='Enter your first name'
                  id='first_name'
                  name='first_name'
                  type={"text"}
                  value={first_name || ""}
                  onChange={this.first_name_change}
                  className='w-100 mt-3'
                  variant='outlined'
                />
              </div>
              <div className='col-12 col-lg-6'>
                <TextField
                  label='Enter your last name'
                  id='last_name'
                  name='last_name'
                  value={last_name || ""}
                  type={"text"}
                  className='w-100 mt-3'
                  variant='outlined'
                  onChange={this.last_name_change}
                />
                <br />
              </div>
              <div className='col-12 col-lg-6'>
                <TextField
                  label='Enter your email'
                  className='w-100 mt-3'
                  id='email'
                  name='email'
                  value={email || ""}
                  type={"email"}
                  variant='outlined'
                  InputProps={{
                    readOnly: this.state.edit_email,
                  }}
                  disabled={true}
                />
                <br />
              </div>
              <div className='col-12 col-lg-6'>
                <TextField
                  label='Enter your mobile number'
                  className='w-100 mt-3'
                  type='tel'
                  id='mobile'
                  name='mobile'
                  value={phone}
                  variant='outlined'
                  inputProps={{ maxLength: 10 }}
                  onChange={this.mobile_change}
                  disabled={true}
                  helperText={phone_error}
                  error={phone_error.length ? true : false}
                />
                <br />
              </div>
            </div>

            <div className='d-flex justify-content-center'>
              {this.state.updating_Loader ? (
                <Button
                  variant='contained'
                  color='primary'
                  style={{ textTransform: "capitalize" }}
                  className='my-4 px-3 py-2 w-50'>
                  Updating
                </Button>
              ) : (
                <Button
                  type='submit'
                  style={{ width: "8rem", textTransform: "capitalize" }}
                  variant='contained'
                  color='primary'
                  onClick={this.updatedata}
                  className='my-4 px-3 py-2 w-50'>
                  Update
                </Button>
              )}
            </div>
          </div>
        </form>
        <style jsx>
          {`

          `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getuserdetails: state.userdetailsR.getuserdetails,
  userToken: state.accountR.token,
  editadd: state.accountR.editadd,
  UpdatedUserAdd: state.accountR.getuseradd,
  AddedAddress: state.accountR.added_address,
  PopupCart: state.cartReduc.PopupCart,
  LoginBackdrop: state.accountR.LoginBackdrop,
  userDistinct: state.userdetailsR.userDistinct,
  userComponentStatus: state.accountR.userComponentStatus,
});

export default connect(mapStateToProps, {
  Getaddress,
  userdetails,
  Editaddress,
  AfterLoginRedirect,
  CartopenModal,
  login_backdropToggle,
  fetch_user_detail,
  update_user_detail,
  Upload_profile,
})(withSnackbar(PersonalDetails));
