import React, { PureComponent } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import { connect } from 'react-redux';
import { addAddressAction } from '../../redux/actions/accountAction'
import axios from "axios";
import { url } from "../../helper/api_url"
import { withSnackbar } from "notistack";
import { fetchUserAddress } from "../../redux/actions/manageAddressAction"
class AddNewAddress extends PureComponent {
    state = {
        fullname: "",
        landmark: "",
        phone_no: "",
        alt_phone_no: "",
        pincode: "",
        address1: "",
        city_name: "",
        state_name: "",
        title: "Home",
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
        PinCodeOkk: "",
        showError: false,
        pincodevalid: false,
    };
    handleClose = () => {
        this.setState({ showError: false });
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
            if (this.state.title.length == 0) {
                this.setState({
                    errors: { ...errors, title: "Please Select Address Type" },
                    showError: true,
                });
            }
            this.openWarningAlert("Please Select Address Type")
            return;
        }
        const {
            pincode,
            phone_no,
            alt_phone_no,
            fullname,
            state,
            landmark,
            address1,
            address_id,
            is_primary,
            city_name,

            state_name,
            title,
        } = this.state;
        // alert(3)
        if (isNaN(pincode)) {
            this.setState({ errors: { ...errors, pincode: "Enter Valid Pincode" } });
            this.openWarningAlert("Enter Valid Pincode")
            return;
        }
        // alert(4)
        if (pincode.length != 6) {
            this.setState({
                errors: { ...errors, pincode: "Enter 6 digits Pincode" },
            });
            this.openWarningAlert("Enter 6 digits Pincode")
            return;
        }
        // alert(5)
        if (phone_no.length !== 10) {
            this.setState({
                errors: { ...errors, phone_no: "Mobile Number must be 10 digits" },
            });
            this.openWarningAlert("Mobile Number must be 10 digits")
            return;
        }
        if (title.length == 0) {
            // alert("title")
            this.setState({
                errors: { ...errors, title: "Please Select Address Type" },
                showError: true,
            });
            this.openWarningAlert("Please Select Address Type")
            return;

        }
        const address = {
            data: {
                title,
                rec_name: fullname,
                address: address1,
                landmark: landmark,
                phone_no: phone_no,
                alt_phone_no: alt_phone_no,
                pincode: pincode,
                city_name: city_name,
                state_name: state_name,
                country_name: "IND",
                is_primary: "N",
            },
        };
        // alert("done")
        console.log(address, 'address')
        this.PassAdressToApi(address);

    };

    PassAdressToApi = address => {
        // alert("second")
        const token = `Token ${this.props.userToken}`;
        this.props
            .addAddressAction(token, address)
            .then((res) => {
                // alert("res in")
                this.props.fetchUserAddress();
                this.props.isSAddNewDialog(false)
                this.props.enqueueSnackbar('Address Added Successfully', { variant: "success" })
                this.setState({
                    fullname: "",
                    landmark: "",
                    phone_no: "",
                    pincode: "",
                    alt_phone_no: "",
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
                });

                this.props.CloseAddUserAddress();

            }).catch((err) => {
                console.log({ err });
            });
    };
    openWarningAlert = (message) => {
        this.props.enqueueSnackbar(`${message}`, {
            anchorOrigin: {
                vertical: "top",
                horizontal: "center",
            },
            variant: "warning",
            persist: false,
        });
    }
    onChangeRadio = title => {
        let errors = this.state.errors;
        this.setState({
            title: title,
            errors: { ...errors, title: "" },
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.value.length === 6 && e.target.name == "pincode") {
            axios
                .get(`${url}/pincode/pin_check/${e.target.value}/`)
                .then(res => {
                    if (res.data.length === 0) {
                        this.setState({ errors: { pincode: "Enter Correct Pincode" } });
                    } else {
                        this.setState({
                            city_name: res.data[0].districtname,
                            state_name: res.data[0].statename,
                        });
                        this.setState({ errors: { pincode: "" } });
                    }
                })
                .catch(err => {
                    this.setState({ city_name: "", state_name: "" });
                });
        }
    };

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
                // console.log({mobile});

                errors.alt_phone_no = alt_phone_no ? "" : "enter valid number";
                break;
            case "phone_no":
                let phone_no = this.validateMobile(value);
                // console.log({mobile});

                errors.phone_no = phone_no ? "" : "enter valid number";

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
                    if (isNaN(pincode)) {
                        errors.pincode = "Enter Valid pincode";
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
                                errors.pincode = "Please enter Valid pincode";
                                this.props.enqueueSnackbar('Please enter valid pincode', { variant: 'error' })
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
        console.log(this.props, 'allprops')
        const {
            fullname,
            landmark,
            phone_no,
            alt_phone_no,
            address1,
            city_name,
            state_name,
            pincode,
            title,
            errors,
            is_primary,
        } = this.state;
        return (
            <div>
                <form className="container-fluid row p-0 " onSubmit={this.onSubmit}>
                    <div className="col-12 px-5 pt-4 ">
                        <TextField
                            error={errors.fullname ? true : false}
                            name='fullname'
                            label='Full Name'
                            // placeholder="Full Name"
                            variant="standard"
                            value={fullname}
                            onChange={this.onChangeHandler}
                            inputProps={{ maxLength: 40 }}
                            fullWidth
                            helperText={errors.fullname}
                            required
                        />
                        <br />
                        <br />
                        <TextField
                            name='pincode'
                            label='Pincode'
                            variant="standard"
                            value={pincode}
                            onChange={this.onChangeHandler}
                            error={errors.pincode.length ? true : false}
                            inputProps={{ maxLength: 6 }}
                            fullWidth
                            type={"text"}
                            inputmode="numeric"
                            maxlength="6"
                            helperText={errors.pincode}
                            required
                        />

                        <br />
                        <br />
                        <TextField
                            name='address1'
                            label='Address (Area and Street)'
                            value={address1}
                            multiline
                            rows={4}
                            onChange={this.onChangeHandler}
                            error={errors.address1.length ? true : false}
                            inputProps={{ maxLength: 230 }}
                            helperText={errors.address1}
                            fullWidth
                            variant='outlined'
                            required
                        />
                        <br />
                        <br />
                        <TextField
                            name='landmark'
                            label='Landmark'
                            value={landmark}
                            onChange={this.onChangeHandler}
                            error={errors.landmark.length ? true : false}
                            inputProps={{ maxLength: 80 }}
                            fullWidth
                            helperText={errors.landmark}
                            variant="standard"
                            required
                        />
                        <br />
                        <br />
                        <TextField
                            label="Mobile Number"
                            name='phone_no'
                            value={phone_no}
                            onChange={this.onChangeHandler}
                            error={errors.phone_no.length ? true : false}
                            inputProps={{ maxLength: 10 }}
                            helperText={errors.phone_no}
                            required
                            fullWidth
                            variant="standard"
                        />
                        <br />
                        <br />
                        <TextField
                            name='alt_phone_no'
                            label="Whatsapp Number"
                            value={alt_phone_no}
                            onChange={this.onChangeHandler}
                            error={errors.alt_phone_no.length ? true : false}
                            inputProps={{ maxLength: 10 }}
                            style={{ marginBottom: '0.5rem' }}
                            variant="standard"
                            helperText={errors.alt_phone_no}
                            fullWidth
                        />
                        <span style={{ fontSize: "0.8rem", display: 'flex', alignItems: 'center' }}>
                            <label>
                                <input checked={alt_phone_no.length && phone_no.length ? alt_phone_no == phone_no ? true : false : false} type={"checkbox"} onClick={() => { this.sameNumberHand() }} />
                            </label>
                            &nbsp;Same As Mobile Number</span>
                        <br />
                        <TextField
                            name='city_name'
                            value={city_name}
                            onChange={this.onChangeHandler}
                            error={errors.city_name.length ? true : false}
                            inputProps={{ maxLength: 40 }}
                            helperText={errors.state}
                            required
                            label="City/District/Town"
                            variant="standard"
                            fullWidth
                        />
                        <br />
                        <br />
                        <TextField
                            name='state_name'
                            label='State'
                            value={state_name}
                            onChange={this.onChangeHandler}
                            error={errors.state_name.length ? true : false}
                            helperText={errors.city}
                            inputProps={{ maxLength: 40 }}
                            margin='dense'
                            required
                            disabled={this.state.pincodevalid}
                            variant="standard"
                            fullWidth
                        />
                    </div>
                    <div className="col-12 row mt-4 mx-auto ">
                        <div className="col-12 col-sm-12">
                            <p className="text-center mb-0">Select Address Type</p>
                        </div>
                        <div className="col-12 col-sm-12 d-flex justify-content-center">
                            <Button
                                variant={title === "Home" ? 'contained' : "outlined"}
                                color='primary'
                                className='m-1 rounded-pill text-capitalize'
                                onClick={() => this.onChangeRadio("Home")}
                                style={{ outline: "none", background: title === "Home" ? "#2a61b8" : null }}
                            >Home</Button>
                            <Button
                                variant={title === "Office" ? 'contained' : "outlined"}
                                onClick={() => this.onChangeRadio("Office")}
                                color='primary'
                                className='m-1 rounded-pill text-capitalize'
                                style={{ outline: "none", background: title === "Office" ? "#2a61b8" : null }}
                            >Office</Button>
                        </div>
                    </div>
                    <div className="col-10 mx-auto" style={{ position: "sticky", bottom: '0', backgroundColor: '#fff' }}>
                        <DialogActions>
                            <Button
                                type="submit"
                                className="btn bg text-white w-100 mx-auto my-1 text-capitalize"
                            >
                                Add Address
                            </Button>
                        </DialogActions>
                    </div>

                </form>

            </div>
        )
    }
}
const mapStateToProps = state => ({
    userToken: state.accountR.token,
})
export default connect(mapStateToProps, {
    fetchUserAddress,
    addAddressAction,
})(withSnackbar(AddNewAddress));