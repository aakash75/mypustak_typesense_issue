import React, { Component } from "react";
import { connect } from "react-redux";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import {
  getOrdersList,
  updateOrder,
  getShippingAddressInfo,
  updateShippingAddress,
  UpdateaddressVerification,
} from "../../redux/actions/BackendorderAction";
import {
  EdituserAddressAction,
  Editaddress,
  Getaddress,
} from "../../redux/actions/accountAction";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { url } from "../../helper/api_url";
import { Radio } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
class Update_shipAddress extends Component {
  state = {
    address_id: this.props.editadd.user_address_id,
    order_id: this.props.editadd.order_id,
    id: this.props.editadd.id,
    fullname: this.props.editadd.rec_name,
    landmark: this.props.editadd.landmark,
    phone_no: this.props.editadd.phone_no,
    alt_phone_no: this.props.editadd.alt_phone_no,
    pincode: this.props.editadd.pincode,
    address1: this.props.editadd.address,
    city_name: this.props.editadd.city_name,
    state_name: this.props.editadd.state_name,
    title: this.props.editadd.title,
    errors: {},
    is_primary: this.props.editadd.is_primary,
    addaddressopen: false,
    PinCodeOkk: true,
    selectedAddress: {},
  };
  componentDidMount() {
    this.props.Getaddress("");
    if (this.props.uaddress) {
      this.setState({
        order_id: this.props.uaddress.order_id,
        fullname: this.props.uaddress.rec_name,
        landmark: this.props.uaddress.landmark,
        phone_no: this.props.uaddress.phone,
        pincode: this.props.uaddress.pincode,
        address1: this.props.uaddress.address,
        city_name: this.props.uaddress.city,
        state_name: this.props.uaddress.state,
      });
    }
  }

  EditDone = () => {
    // if (this.state.errors === {}) {
    // }
  };
  onChangeRadio = (title) => {
    this.setState({ title: title });
  };
  addaddresscloseModal = () => {
    this.setState({ addaddressopen: false });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      pincode,
      phone_no,
      fullname,
      state,
      landmark,
      address1,
      address_id,
      id,
      order_id,
      is_primary,
      city_name,
      errors,
      state_name,
      title,
    } = this.state;
    if (fullname === "") {
      this.setState({ errors: { fullname: "Enter your name" } });
      return;
    }
    if (address1 === "") {
      this.setState({ errors: { address1: "Enter your address" } });
      return;
    }
    if (landmark === "") {
      this.setState({ errors: { landmark: "Enter your landmark" } });
      return;
    }
    if (phone_no === "") {
      this.setState({ errors: { phone_no: "Enter number" } });
      return;
    } else {
    }

    if (isNaN(phone_no)) {
      this.setState({ errors: { phone_no: "Enter number" } });
      return;
    }

    if (phone_no.length !== 10) {
      this.setState({
        errors: { phone_no: "Enter 10 digits mobile no" },
      });
      return;
    }

    if (isNaN(pincode)) {
      // console.log("Enter Pincode")

      this.setState({ errors: { pincode: "Enter Pincode" } });
      return;
    }

    const address = {
      address_id: address_id,
      // id: id,
      order_id: order_id,
      // title,
      rec_name: fullname,
      address: address1,
      landmark: landmark,
      phone: phone_no,
      pincode: pincode,
      city_name: city_name,
      state_name: state_name,
      country_name: "IND",
      is_primary: is_primary,
      // errors,
    };

    if (this.state.PinCodeOkk === true) {
      this.PassAdressToApi(address);
    }
  };

  PassAdressToApi = (address) => {
    const token = `Token ${this.props.userToken}`;
    let res = this.props
      .UpdateaddressVerification(address)
      .then((res) => {
        this.setState({
          fullname: "",
          landmark: "",
          phone_no: "",
          pincode: "",
          address1: "",
          city_name: "",
          state_name: "",
          title: "",
          errors: {},
        });
        this.props.CloseEditAddress();
        this.props.Getaddress("");
        this.props.refreshAddress();
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  validatePhone(phone) {
    if (phone.length > 9) {
      const re = /^\d{10}$/;
      return re.test(phone);
    }
  }

  onChange = (e) => {
    this.setState({
      errors: { phone_no: "" },
    });
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name == "pincode") {
      if (e.target.value.length === 6) {
        axios
          .get(`${url}/pincode/pin_check/${e.target.value}/`)
          .then((res) => {
            if (res.data.length) {
              this.setState({
                city_name: res.data[0].districtname,
                state_name: res.data[0].statename,
              });
              this.setState({ PinCodeOkk: true });
            }
          })
          .catch((err) => {
            console.log(err);
            this.setState({ city_name: "", state_name: "" });
          });
      } else {
        this.setState({ PinCodeOkk: false });
      }
    }
  };
  selectedAddress = (add) => {
    this.setState({ selectedAddress: add });
  };
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
      selectedAddress,
    } = this.state;
    let PincodeErr = "";
    let PhoneErr = "";

    return (
      <div>
        <div className="Editform">
          {this.props.getadd
            .sort(function (a, b) {
              return b.address_id - a.address_id;
            })
            .map((data) => (
              <div
                key={data.address_id}
                className="row py-1 pt-2 border-bottom border-lightgray align-items-center "
                style={
                  selectedAddress
                    ? selectedAddress.address_id == data.address_id
                      ? {
                          background: "#eef3ff",
                          minHeight: "5rem",
                        }
                      : {
                          minHeight: "5rem",
                        }
                    : {
                        minHeight: "5rem",
                      }
                }
                onClick={() => setSelectedAddress(data)}
              >
                <div className="col-12 col-sm-12 row">
                  <div className="d-flex col-9 col-md-10 col-lg-10">
                    <div>
                      <input
                        className="form-check-input "
                        type="radio"
                        name=""
                        id=""
                        style={{ marginRight: "0.5rem" }}
                        checked={
                          selectedAddress
                            ? selectedAddress.address_id == data.address_id
                              ? true
                              : false
                            : null
                        }
                      />
                    </div>

                    <div>
                      <span className={`d-flex align-items-start`}>
                        <span>{data.rec_name}</span>
                        &nbsp;
                        <span style={{ fontSize: "0.8rem" }}>
                          ({data.phone_no})
                        </span>
                        {selectedAddress ? (
                          selectedAddress.address_id == data.address_id ? (
                            <CheckCircleOutlineOutlinedIcon
                              style={{ color: "green" }}
                            />
                          ) : null
                        ) : null}
                      </span>
                      <span className={` p`} style={{ fontSize: "0.8rem" }}>
                        {data.address}
                      </span>
                      <br />
                      <span className={`p`} style={{ fontSize: "0.8rem" }}>
                        {data.city_name} ({data.state_name}) {data.pincode}
                      </span>
                      {selectedAddress ? (
                        selectedAddress.address_id == data.address_id ? (
                          <div className="text-center mt-3"></div>
                        ) : null
                      ) : null}
                    </div>
                  </div>
                  <div className="col-1"></div>
                  <div className="col-1">
                    <Button
                      onClick={() => {
                        editAddressHand(data);
                      }}
                      variant="outlined"
                      size="small"
                    >
                      <EditIcon fontSize="small" className="text-primary" />{" "}
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}

          {/* <form onSubmit={this.onSubmit}>
            <div>
              <TextField
                name='Fullname'
                label='Fullname'
                value={fullname}
                onChange={this.onChange}
                errors={errors.fullname}
                inputProps={{ maxLength: 40 }}
                fullWidth
                margin='dense'
                required
              />
            </div>
            <div>
              <TextField
                name='address1'
                label='Address'
                value={address1}
                multiline
                rowsMax={3}
                onChange={this.onChange}
                errors={errors.name}
                inputProps={{ maxLength: 230 }}
                fullWidth
                margin='dense'
                required
              />
            </div>
            <div>
              <TextField
                name='landmark'
                label='Landmark'
                value={landmark}
                onChange={this.onChange}
                errors={errors.landmark}
                inputProps={{ maxLength: 80 }}
                fullWidth
                margin='dense'
                required
              />
            </div>
            <div style={{ display: "flex" }}>
              <TextField
                name='phone_no'
                label='Mobile Number'
                value={phone_no}
                onChange={this.onChange}
                error={errors.phone_no}
                inputProps={{ maxLength: 10 }}
                margin='dense'
                helperText={errors.phone_no}
                required
                style={{ marginRight: "1%" }}
              />

              <TextField
                name='alt_phone_no'
                label='Alernate Mobile'
                value={alt_phone_no}
                onChange={this.onChange}
                errors={errors.alt_phone_no}
                inputProps={{ maxLength: 10 }}
                margin='dense'
                helperText={PhoneErr}
                style={{ marginLeft: "1%" }}
              />
            </div>
            <div>
              <TextField
                name='pincode'
                label='Pincode'
                value={pincode}
                onChange={this.onChange}
                errors={errors.pincode}
                inputProps={{ maxLength: 6 }}
                fullWidth
                margin='dense'
                required
                helperText={
                  this.state.PinCodeOkk ? null : `Enter Correct Pincode`
                }
              />
            </div>

            <div style={{ display: "flex" }}>
              <TextField
                name='city'
                label='City'
                value={city_name}
                onChange={this.onChange}
                errors={errors.name}
                inputProps={{ maxLength: 40 }}
                margin='dense'
                required
                style={{ marginRight: "1%" }}
              />
              <TextField
                name='state'
                label='State'
                value={state_name}
                onChange={e => {
                  this.setState({ state_name: e.target.value });
                }}
                errors={errors.name}
                inputProps={{ maxLength: 40 }}
                margin='dense'
                required
                style={{ marginLeft: "1%" }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{}}>Address Type</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                }}>
                <div>
                  <span>
                    <Radio
                      value='Home'
                      name='title'
                      onChange={() => this.onChangeRadio("Home")}
                      checked={title === "Home"}
                    />
                  </span>
                  Home
                </div>
                <div>
                  <span>
                    <Radio
                      value='Office'
                      name='title'
                      onChange={() => this.onChangeRadio("Office")}
                      checked={title === "Office"}
                    />
                  </span>
                  Office
                </div>
              </div>
            </div>
            <div style={{ padding: "2% 1%" }}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth>
                Done
              </Button>
            </div>
          </form> */}
        </div>
        <style jsx>
          {`
            .Editform {
              font-size: 1rem;
            }
          `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getuseradd: state.accountR.getuseradd,
  userToken: state.accountR.token,
  ErrMsg: state.accountR.ErrMsg,
  editadd: state.accountR.editadd,
  getadd: state.accountR.getadd,
});

export default connect(mapStateToProps, {
  EdituserAddressAction,
  Editaddress,
  Getaddress,
  getOrdersList,
  updateOrder,
  getShippingAddressInfo,
  updateShippingAddress,
  UpdateaddressVerification,
})(Update_shipAddress);
