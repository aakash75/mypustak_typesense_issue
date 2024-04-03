import React, { Component } from 'react'
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogActions from '@mui/material/DialogActions';
import {
  EdituserAddressAction,
  Editaddress,
  Getaddress,
} from '../../redux/actions/accountAction'
import { url } from '../../helper/api_url';
import axios from 'axios';
class EditAddress extends Component {
  state = {
    address_id: this.props.editadd.address_id,
    fullname: "",
    landmark: "",
    phone_no: "",
    alt_phone_no: "",
    pincode: "",
    address1: "",
    city_name: "",
    state_name: "BIHAR",
    title: "",
    errors: {
      fullname: "",
      landmark: "",
      phone_no: "",
      alt_phone_no: "",
      pincode: "",
      address1: "",
      city_name: "",
      state_name: "",
      title: "",
    },
    errormsg: "",
    is_primary: this.props.editadd.is_primary,
    addaddressopen: false,
    PinCodeOkk: true,
    pincodevalid: true,
  };

  componentDidMount() {
    this.setState({
      fullname: this.props.editadd.rec_name,
      landmark: this.props.editadd.landmark,
      phone_no: this.props.editadd.phone_no,
      alt_phone_no: this.props.editadd.alt_phone_no,
      pincode: `${this.props.editadd.pincode}`,
      address1: this.props.editadd.address,
      city_name: this.props.editadd.city_name,
      state_name: this.props.editadd.state_name,
      title: this.props.editadd.title,
      is_primary: this.props.editadd.is_primary,
    });
  }
  validateName = name => {
    if (!name) return true;
    const re = /^[a-zA-Z ]+(([',.-][a-zA-Z])?[a-zA-Z]*)*$/g;
    return re.test(name);
  };
  validateMobile = mobile => {
    if (!mobile) return true;
    if (mobile.length < 10) {
      return true;
    } else {
      const re =
        /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[0123456789]\d{9}|(\d[ -]?){10}\d$/g;
      return re.test(mobile);
    }
  };
  validatePincode = pincode => {
    if (!pincode) return true;
    const re = /^[0-9]/;
    return re.test(pincode);
  };

  EditDone = () => {
    if (this.state.errors === {}) {
    }
  };
  onChangeRadio = title => {
    this.setState({ title: title });
  };
  addaddresscloseModal = () => {
    this.setState({ addaddressopen: false });
  };

  onSubmit = e => {
    e.preventDefault();
    let errors = this.state.errors;
    let errormsg = "";
    let err_count = 0;
    Object.values(errors).forEach(value => {
      if (value.length) {
        err_count = 1;
        console.log(value, "777", value.length);

        return;
      }
    });
    if (err_count) {
      return;
    }
    const {
      pincode,
      phone_no,
      fullname,
      landmark,
      address1,
      address_id,
      is_primary,
      city_name,
      state_name,
      title,
      alt_phone_no
    } = this.state;

    if (isNaN(pincode)) {
      this.setState({ errors: { ...errors, pincode: "Enter Valid Pincode" } });
      return;
    }
    if (pincode.length !== 6) {
      // alert("hh")
      console.log(pincode, "hh", pincode.length);
      this.setState({
        errors: { ...errors, pincode: "Enter 6 digit Pincode" },
      });
      return;
    }
    if (phone_no.length !== 10) {
      this.setState({
        errors: { ...errors, phone_no: "Mobile Number must be 10 digits" },
      });
      return;
    }

    const address = {
      data: {
        address_id: address_id,
        title,
        rec_name: fullname,
        address: address1,
        landmark: landmark,
        phone_no: phone_no,
        pincode: pincode,
        city_name: city_name,
        state_name: state_name,
        country_name: "IND",
        is_primary: is_primary,
        alt_phone_no:alt_phone_no,
        // errors,
      },
    };

    if (this.state.PinCodeOkk === true) {
      this.PassAdressToApi(address);
    }
  };

  PassAdressToApi = address => {
    const token = `Token ${this.props.userToken}`;
    let res = this.props
      .EdituserAddressAction(token, address)
      .then(res => {
        this.setState({
          fullname: "",
          landmark: "",
          phone_no: "",
          pincode: "",
          address1: "",
          city_name: "",
          state_name: "",
          title: "",
          errors: {
            fullname: "",
            landmark: "",
            phone_no: "",
            alt_phone_no: "",
            pincode: "",
            address1: "",
            city_name: "",
            state_name: "",
            title: "",
          },
        });
        this.props.CloseEditAddress();
        this.props.Getaddress("");
        this.props.enqueueSnackbar('Address Edited Successfully', { variant: "success" })
      })
      .catch(err => {
        console.log({ err });
        this.props.enqueueSnackbar('Edit Address Failed', { variant: "error" })

      });

  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name == "pincode") {
      if (e.target.value.length === 6) {
        axios
          .get(
            `${config.get("apiDomain")}/pincode/pin_check/${e.target.value}/`
          )
          .then(res => {
            // console.log(res.data, this.state.pincode)
            if (res.data.length) {
              this.setState({
                city_name: res.data[0].districtname,
                state_name: res.data[0].statename,
              });
              // this.setState({errors:{pincode:""}});
              this.setState({ PinCodeOkk: true });
            }
          })
          .catch(err => {
            console.log(err);
            this.setState({ city_name: "", state_name: "" });
          });
      } else {
        this.setState({ PinCodeOkk: false });
      }
    }
  };

  onChangeHandler = e => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    let errors = this.state.errors;

    switch (name) {
      case "fullname":
        let fullname = this.validateName(value);
        errors.fullname = fullname ? "" : "enter valid name";
        break;

      case "address1":
        break;
      case "landmark":
        break;
      case "alt_phone_no":
        let alt_phone_no = this.validateMobile(value);
        errors.alt_phone_no = alt_phone_no ? "" : "Enter Valid Mobile Number";
        break;
      case "phone_no":
        let phone_no = this.validateMobile(value);
        errors.phone_no = phone_no ? "" : "Enter Valid Mobile Number";

        break;
      case "pincode":
        let pincode = this.validatePincode(value);
        this.setState({
          errormsg: "",
          open_snackbar: false,
        });
        if (pincode) {
          errors.pincode = "";
          if (value < 1) {
            // errors.pincode = "Enter pincode"
          } else {
            errors.pincode = "";
          }
          if (value.length == 6) {
            axios
              .get(
                `${url}/pincode/pin_check/${e.target.value
                }/`
              )
              .then(res => {
                // console.log({ res })

                if (res.data.length === 0) {
                  errors.pincode = "pincode is wrong";
                } else {
                  this.setState({
                    city_name: res.data[0].districtname,
                    state_name: res.data[0].statename,
                    pincodevalid: true,
                  });

                  errors.pincode = "";
                }
              })
              .catch(err => {
                this.setState({
                  city_name: "",
                  state_name: "",
                  pincodevalid: false,
                });
              });
          } else {
            // errors.pincode = "pincode must be 6 digit"
            this.setState({
              city_name: "",
              state_name: "",
              pincodevalid: false,
            });
          }
        } else {
          errors.pincode = "Enter valid pincode";
        }

        break;
      case "state_name":
        if (value < 1) {
          // errors.state = "please enter state"
        } else {
          errors.state = "";
        }
        break;
      case "city_name":
        break;

      default:
        break;
    }
    this.setState({ [name]: value });
    this.setState({ errors, [name]: value });
  };
  sameNumberHand = () => {
    if (this.state.alt_phone_no == this.state.phone_no) {
        this.setState({ alt_phone_no: "" })

    } else {
        this.setState({ alt_phone_no: this.state.phone_no })
    }
}
  render() {
    const {
      fullname,
      landmark,
      alt_phone_no,
      phone_no,
      address1,
      city_name,
      state_name,
      pincode,
      title,
      errors,
      is_primary,
    } = this.state;
    let PincodeErr = "";
    let PhoneErr = "";

    //   For Phone Number validation
    try {
      if (phone_no.length !== 10) {
        PhoneErr = "Please enter 10 digits mobile number";
      } else {
        PhoneErr = "";
      }
    } catch (error) { }
    return (
      <div>
        <form className="container-fluid row p-0 " onSubmit={this.onSubmit}>
          <div className="col-12 px-5 pt-4 ">
            <TextField
              label="Full Name"
              id="full_name"
              type={"text"}
              className=""
              variant="standard"
              fullWidth
              error={errors.fullname.length ? true : false}
              name='fullname'
              value={fullname}
              onChange={this.onChangeHandler}
              inputProps={{ maxLength: 40 }}
              // variant="outlined"
              helperText={errors.fullname}
              required
            />
            <br />
            <br />
            <TextField
              id="pincode"
              type={"text"}
              className=""
              variant="standard"
              inputmode="numeric"
              maxlength="6"
              fullWidth
              name='pincode'
              label='Pincode'
              value={pincode}
              onChange={this.onChangeHandler}
              error={errors.pincode.length ? true : false}
              inputProps={{ maxLength: 6 }}
              helperText={errors.pincode}
              required
            />

            <br />
            <br />
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              defaultValue=""
              fullWidth
              name='address1'
              label='Address (Area and Street)'
              value={address1}
              onChange={this.onChangeHandler}
              error={errors.address1.length ? true : false}
              inputProps={{ maxLength: 230 }}
              helperText={errors.address1}
              variant='outlined'
              required
            />
            <br />
            <br />
            <TextField
              label="Landmark"
              id="landmark"
              name="landmark"
              type={"text"}
              className=""
              variant="standard"
              fullWidth
              value={landmark}
              onChange={this.onChangeHandler}
              error={errors.landmark.length ? true : false}
              inputProps={{ maxLength: 80 }}
              helperText={errors.landmark}
              required
            />
            <br />
            <br />
            <TextField
              label="Mobile Number"
              type={"tel"}
              id="phone"
              className=""
              variant="standard"
              fullWidth
              name='phone_no'
              value={phone_no}
              onChange={this.onChangeHandler}
              error={errors.phone_no.length ? true : false}
              inputProps={{ maxLength: 10 }}
              helperText={errors.phone_no}
              required
            />
            <br />
            <br />
            <TextField
              label="Whatsapp Number"
              type={"tel"}
              id="phone"
              className=""
              variant="standard"
              fullWidth
              name='alt_phone_no'
              style={{marginBottom:'0.5rem'}}
              value={alt_phone_no}
              onChange={this.onChangeHandler}
              error={errors.alt_phone_no.length ? true : false}
              inputProps={{ maxLength: 10 }}
              helperText={errors.alt_phone_no}
            />
               <span style={{ fontSize: "0.8rem" }}>
                    <label>
                  <input checked={alt_phone_no.length && phone_no.length ? alt_phone_no == phone_no ? true : false : false} type={"checkbox"} onClick={() => { this.sameNumberHand() }} />
                </label>
              &nbsp;Same As Mobile Number</span>
                          
            <br />
            <TextField
              label="City/District/Town"
              id="city"
              type={"text"}
              className=""
              variant="standard"
              fullWidth
              name='city_name'
              value={city_name}
              onChange={this.onChangeHandler}
              error={errors.city_name.length ? true : false}
              inputProps={{ maxLength: 40 }}
              helperText={errors.state}
              required
            />
            <br />
            <br />
            <TextField
              id="state"
              name="state"
              type={"text"}
              className=""
              variant="standard"
              fullWidth
              label='State'
              value={state_name}
              onChange={this.onChangeHandler}
              error={errors.state_name.length ? true : false}
              helperText={errors.city}
              inputProps={{ maxLength: 40 }}
              required
              disabled={this.state.pincodevalid}
            />
          </div>
          <div className="col-12 row mt-4 mx-auto ">
            <div className="col-12 col-sm-12">
              <p className="text-center" style={{marginBottom:"0px"}}>Select Address Type</p>
            </div>
            <div className="col-12 col-sm-12 d-flex justify-content-center">
               <Button
             color='primary'
             className='text-capitalize m-1 rounded-pill '
             onClick={() => this.onChangeRadio("Home")}
             variant={title === "Home"?"contained":"outlined"}
             style={{outline:"none"}}
             >Home
             </Button>
             <Button
             color='primary'
             className='text-capitalize m-1 rounded-pill '
             onClick={() => this.onChangeRadio("Office")}
             variant={title === "Office"?"contained":"outlined"}
             style={{outline:"none"}}
             >Office
             </Button>
            
            </div>
          </div>
          <div className="col-10 mx-auto" style={{position:"sticky",bottom:'0',backgroundColor:'#fff'}}>
            <DialogActions >
              <Button
                type="submit"
                
                className="btn bg text-white w-100 mx-auto my-1 text-capitalize"
                
              >
                Save Address
              </Button>
            </DialogActions>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  getuseradd: state.accountR.getuseradd,
  userToken: state.accountR.token,
  ErrMsg: state.accountR.ErrMsg,
  editadd: state.accountR.editadd,
})
// export default EditAddress

export default connect(mapStateToProps, { EdituserAddressAction, Editaddress, Getaddress })(withSnackbar(EditAddress));