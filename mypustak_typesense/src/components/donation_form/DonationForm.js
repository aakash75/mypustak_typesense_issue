"use client"
import React, { Component } from "react";
import styles from "../../styles/DonationForm.module.css"
import { TabContext, TabList, TabPanel } from "@mui/lab";
import dynamic from "next/dynamic";
import { usePathname ,useSearchParams} from 'next/navigation'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  NoSsr,
  Tab,
  TextField,
} from "@mui/material";
import Form from "react-bootstrap/Form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MediaQuery from "react-responsive";
import { AuthInstance, url } from "../../helper/api_url";
import torn_page from "../../assets/torn_page.svg";
import poor_binding from "../../assets/poor_binding.svg";
import moisture_damage from "../../assets/moisture_damage.svg";
import smoke_damage from "../../assets/smoke_damage.svg";
import missing_page from "../../assets/missing_page.svg";
import rough_book from "../../assets/rough_book.svg";
import stained_book from "../../assets/stained_book.svg";
import pirated_book from "../../assets/pirated_book.svg";
import axios from "axios";
import magazine from "../../assets/magazine.svg";
import newspaper from "../../assets/newspaper.svg";
import corrected_book from "../../assets/corrected_book.svg";
import course_book from "../../assets/course_book.svg";
import audio_book from "../../assets/audio_book.svg";
import porn_material from "../../assets/porn_material.svg";
import too_old_book from "../../assets/too_old_book.svg";
import Image from "next/legacy/image";
import {
  fetch_user_detail,
} from "../../redux/actions/accountAction";
import {
  AddDonation,
  ChangeLogin,
  DonationMailData,
  fetch_donor_pickupdates,
} from "../../redux/actions/donationActions";
import { updateDonation } from "../../redux/actions/BackenddonationActions";
import { encryptor } from "../../helper/crypto";
import { connect } from "react-redux";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Input, InputLabel } from "@mui/material";
const DonationPickup = dynamic(() => import("./DonationPickup"));

import { withSnackbar } from "notistack";

import Head from "next/head";
import { style } from "@mui/system";
const book_types = [
  {
    key: 1,
    image: torn_page,
    title: "Torn Pages",
  },
  {
    key: 2,
    image: poor_binding,
    title: "Extremely poor binding",
  },
  {
    key: 3,
    image: moisture_damage,
    title: "Water, Moisture Or Mould Damage",
  },
  {
    key: 4,
    image: smoke_damage,
    title: "Burnt or smoke damaged",
  },
  {
    key: 5,
    image: missing_page,
    title: "Missing Pages",
  },
  {
    key: 6,
    image: rough_book,
    title: "Books with rough work",
  },
  {
    key: 7,
    image: stained_book,
    title: "Stained",
  },
  {
    key: 8,
    image: pirated_book,
    title: "Pirated Books",
  },
  {
    key: 9,
    image: magazine,
    title: "Magazines",
  },
  {
    key: 10,
    image: newspaper,
    title: "News papers",
  },
  {
    key: 11,
    image: corrected_book,
    title: "Corrected Or Uncorrected Proof Copies Of Books",
  },
  {
    key: 12,
    image: course_book,
    title: "Course Materials of College",
  },
  {
    key: 13,
    image: audio_book,
    title: "Audio Books on CD",
  },
  {
    key: 14,
    image: porn_material,
    title: "Porn Material",
  },
  {
    key: 15,
    image: too_old_book,
    title: "Too old or out of syllabus textbooks.",
  },
];

const statesArray = [
  { value: " ", label: "--Select State--" },
  { value: "ANDAMAN & NICOBAR ISLANDS", label: "ANDAMAN & NICOBAR ISLANDS" },
  { value: "ANDHRA PRADESH", label: "ANDHRA PRADESH" },
  { value: "ARUNACHAL PRADESH", label: "ARUNACHAL PRADESH" },
  { value: "ASSAM", label: "ASSAM" },
  { value: "BIHAR", label: "BIHAR" },
  { value: "CHANDIGARH", label: "CHANDIGARH" },
  { value: "CHATTISGARH", label: "CHATTISGARH" },
  {
    value: "DADRA & NAGAR HAVELI",
    label: "DADRA & NAGAR HAVELI",
  },
  {
    value: "DAMAN & DIU",
    label: "DAMAN & DIU",
  },
  { value: "DELHI", label: "DELHI" },
  { value: "GOA", label: "GOA" },
  { value: "GUJARAT", label: "GUJARAT" },
  { value: "HARYANA", label: "HARYANA" },
  { value: "HIMACHAL PRADESH", label: "HIMACHAL PRADESH" },
  { value: "JAMMU & KASHMIR", label: "JAMMU & KASHMIR" },
  { value: "JHARKHAND", label: "JHARKHAND" },
  { value: "KARNATAKA", label: "KARNATAKA" },
  { value: "KERALA", label: "KERALA" },
  { value: "LADAKH", label: "LADAKH" },
  { value: "LAKSHADWEEP", label: "LAKSHADWEEP" },
  { value: "MADHYA PRADESH", label: "MADHYA PRADESH" },
  { value: "MAHARASHTRA", label: "MAHARASHTRA" },
  { value: "MANIPUR", label: "MANIPUR" },
  { value: "MEGHALAYA", label: "MEGHALAYA" },
  { value: "MIZORAM", label: "MIZORAM" },
  { value: "NAGALAND", label: "NAGALAND" },
  { value: "ODISHA", label: "ODISHA" },
  { value: "PONDICHERRY", label: "PONDICHERRY" },
  { value: "PUNJAB", label: "PUNJAB" },
  { value: "RAJASTHAN", label: "RAJASTHAN" },
  { value: "SIKKIM", label: "SIKKIM" },
  { value: "TAMIL NADU", label: "TAMIL NADU" },
  { value: "TELANGANA", label: "TELANGANA" },
  { value: "TRIPURA", label: "TRIPURA" },
  { value: "UTTARAKHAND", label: "UTTARAKHAND" },
  { value: "UTTAR PRADESH", label: "UTTAR PRADESH" },
  { value: "WEST BENGAL", label: "WEST BENGAL" },
];

class DonationForm extends Component {
  constructor(props) {
    super(props);
    this.animatecard = React.createRef();
    this.getScrollHeight = React.createRef();
  }

  state = {
    selected_city: "",
    check_whatsapp: false,
    value: "1",
    min_new_date: "",
    new_date: new Date(),
    open_condition: false,
    open_snackbar: false,
    show: "hide",
    currentStep: 0,
    stepsArray: ["Donor Details", "Book Details", "review"],
    select_book_category: [],
    select_known_option: [],
    first_name: "",
    last_name: "",
    mobile: "",
    whatsapp_no: "",
    address: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    totalbook: "",
    total_carton: "",
    total_weight: "",
    date: "",
    Timestamp: "",
    state: "",
    city: "",
    errors: {
      first_name: "",
      last_name: "",
      mobile: "",
      whatsapp_no: "",
      address: "",
      pincode: "",
      landmark: "",
      city: "",
      state: "",
      totalbook: "",
      total_carton: "",
      total_weight: "",
      date: "",
    },
    errormsg: "",
    captcha: "",
    only_kolkata_pickup: false,
    updateForm: false,
    pincodevalid: false,
    SubmitLoader: false,
  };
  componentDidMount() {
    // window.addEventListener("scroll", this.handleScroll)

    // let select_city = Router.asPath.split("?");
    // console.log(select_city, "Select city");
    // this.setState({ selected_city: select_city[1] });
    // if (select_city[1] == "kol") {
    //   this.setState({ total_weight: 20, total_carton: 1 });
    // }

    if (this.props.userComponentStatus == 2) {
      // localStorage.removeItem("BackUrl")
      this.props
        .fetch_donor_pickupdates()
        .then(res => {
          if (this.props.free_pickup.min_dates) {
            let date = this.props.free_pickup.min_dates;
            let d = new Date(date);
            // alert(d)
            // this.setState({min_new_date:d,new_date:d})
          }

          const { kolkata_free_pickup } = this.props;
          if (Object.keys(kolkata_free_pickup).length) {
            if (kolkata_free_pickup.min_dates == 0) {
              this.setState({ only_kolkata_pickup: false });
            }
            // this.setState({start_date:kolkata_free_pickup.start_date*1000,end_date:kolkata_free_pickup.end_date*1000})
          }
        })
        .catch(err => console.log(err));
    } else if (this.props.userComponentStatus == 1) {
      let BackUrl = "donate-books/DonationForm";
      // localStorage.setItem("BackUrl", BackUrl)
      window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
    }

    const userid = this.props.getuserdetails.id;
    this.props.fetch_user_detail(userid);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.getuserdetails !== this.props.getuserdetails) {
      const userid = this.props.getuserdetails.id;
      this.props.fetch_user_detail(userid);
    }

    // alert("2")
    if (this.props.userComponentStatus !== prevProps.userComponentStatus) {
      if (this.props.userComponentStatus == 1) {
        // alert("h2")

        let BackUrl = "/donate-books/DonationForm";

        // localStorage.setItem("BackUrl", BackUrl)
        window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
      } else if (this.props.userComponentStatus == 2) {
        // localStorage.removeItem("BackUrl")
        this.props
          .fetch_donor_pickupdates()
          .then(res => {
            if (this.props.free_pickup.min_dates) {
              let date = this.props.free_pickup.min_dates;
              let d = new Date(date);
              // alert(d)
              // this.setState({min_new_date:d,new_date:d})
            }

            const { kolkata_free_pickup } = this.props;
            if (Object.keys(kolkata_free_pickup).length) {
              if (kolkata_free_pickup.min_dates == 0) {
                this.setState({ only_kolkata_pickup: false });
              }
              // this.setState({start_date:kolkata_free_pickup.start_date*1000,end_date:kolkata_free_pickup.end_date*1000})
            }
          })
          .catch(err => console.log(err));
      }
    }

    if (prevProps.userDistinct !== this.props.userDistinct) {
      // alert("hi")
      // console.log(this.props.userDistinct, "----7897891")
      this.setState({
        first_name: this.props.userDistinct.first_name,
        last_name: this.props.userDistinct.last_name,
        mobile: this.props.getuserdetails.phone,
      });
    }

    if (this.props.kolkata_free_pickup !== prevProps.kolkata_free_pickup) {
      const { kolkata_free_pickup } = this.props;
      if (Object.keys(kolkata_free_pickup).length) {
        const current_timestamp = new Date().getTime() / 1000;
        if (
          kolkata_free_pickup.start_date > current_timestamp &&
          current_timestamp < kolkata_free_pickup.end_date
        ) {
          this.setState({ only_kolkata_pickup: false });
        }
      }
    }
  }

  handleExpansionChange = () => {
    this.setState({ open_condition: !this.state.open_condition });
  };
  PassToPickup = {};

  submitDonation = e => {
    e.preventDefault();
    this.setState({ SubmitLoader: true });
    // console.log(this.props, "props.........................")

    // alert("submiting")
    let counter = 0;
    let errors = this.state.errors;
    let errormsg = "";
    Object.values(errors).forEach(value => {
      // console.log(value, "777")
      if (value.length) {
        counter = counter + 1;
        // alert('value')
        this.setState({ currentStep: 1, value: "2", SubmitLoader: false });
        return;
      }
    });
    // alert("enter")
    if (this.state.select_book_category.length === 0) {
      counter = counter + 1;
      errormsg = "Please Choose At Least One Most Suitable Book Category";
      this.props.enqueueSnackbar(`${errormsg}`, { variant: "warning" });
      this.setState({
        errormsg: errormsg,
        open_snackbar: true,
        SubmitLoader: false,
      });
      return;
    }
    if (counter == 0) {
      const donation = {
        data: {
          donor_name: ` ${this.state.first_name}` + ` ${this.state.last_name}`,
          address: this.state.address,
          state: this.state.state,
          source: this.state.select_known_option,
          category: this.state.select_book_category,
          city: this.state.city,
          mobile: this.state.mobile,
          whatsapp_no: this.state.whatsapp_no,
          landmark: this.state.landmark,
          country: "India",
          zipcode: this.state.pincode,
          no_of_book: this.state.totalbook,
          no_of_cartons: this.state.total_carton,
          app_books_weight: this.state.total_weight,
          // pickup_date: this.state.Timestamp,
          // "book_Condition":Codata
        },
      };
      this.PassToPickup = {
        donor_name: ` ${this.state.first_name}` + ` ${this.state.last_name}`,
        mobile: this.state.mobile,
        app_books_weight: this.state.total_weight,
        address: this.state.address,
        zipcode: this.state.pincode,
        city: this.state.city.toLowerCase(),
      };
      if (this.state.updateForm) {
        // alert("update")
        const update_data = donation.data;
        update_data.donation_req_id = this.props.donation_req_id;
        // alert("api")
        console.log(update_data, "update_data");
        this.props
          .updateDonation({
            donation: update_data,
            token: "",
            pass_to_reducer: false,
          })
          .then(res => {
            // alert("done")
            this.setState({ currentStep: 2, value: "3", SubmitLoader: false });
          })
          .catch(err => {
            this.props.enqueueSnackbar(
              "Sorry! Donation Form Not Able To be Submitted Please Contact Mypustak Support",
              {
                variant: "error",
              }
            );
            let errormsg =
              "Sorry! Donation Form Not Able To be Submitted Please Contact Mypustak Support";
            this.setState({
              errormsg: errormsg,
              open_snackbar: true,
              SubmitLoader: false,
            });
          });
      } else {
        let body = { body: encryptor(donation) };
        this.props
          .AddDonation(body)
          .then(res => {
            this.setState({ currentStep: 2, value: "3", SubmitLoader: false });
            this.props.DonationMailData(donation);
          })
          .catch(err => {
            this.props.enqueueSnackbar(
              "Sorry! Donation Form Not Able To be Submitted Please Contact Mypustak Support",
              {
                variant: "error",
              }
            );
            let errormsg =
              "Sorry! Donation Form Not Able To be Submitted Please Contact Mypustak Support";
            this.setState({
              errormsg: errormsg,
              open_snackbar: true,
              SubmitLoader: false,
            });
          });
      }
      console.log(donation, "777788");
    }
  };

  savedetail = e => {
    e.preventDefault();
    this.setState({
      open_condition: false,
    });
    let counter = 0;
    let errors = this.state.errors;
    if (isNaN(this.state.pincode)) {
      this.setState({ errors: { ...errors, pincode: "Enter Valid Pincode" } });
      return;
    }
    if (this.state.pincode.length !== 6) {
      this.setState({
        errors: { ...errors, pincode: "Enter 6 digit Pincode" },
        // errormsg: "please enter valid pincode",
        // open_snackbar: true,
      });
      return;
    }
    if (this.state.mobile.length !== 10) {
      this.setState({
        errors: { ...errors, mobile: "Mobile Number must be 10 digits" },
      });
      this.props.enqueueSnackbar("Mobile Number must be 10 digits", { variant: "error" });

      return;
    }

    if (this.state.whatsapp_no.length !== 10) {
      this.setState({
        errors: { ...errors, whatsapp_no: "Whatsapp Number must be 10 digits" },

      });
      this.props.enqueueSnackbar("Whatsapp Number must be 10 digits", { variant: "error" });

      return;
    }

    Object.values(errors).forEach(value => {
      // console.log(value, "777")
      if (value.length) {
        counter = counter + 1;
        // alert('value')

        this.setState({ currentStep: 0, value: "1" });
        return;
        // alert("g")
      }
    });
    this.setState({ SubmitLoader: true });
    // console.log(this.props, "props.........................")

    // alert("submiting")
    // let counter = 0;
    // let errors = this.state.errors;
    let errormsg = "";
    Object.values(errors).forEach(value => {
      // console.log(value, "777")
      if (value.length) {
        counter = counter + 1;
        // alert(value)
        this.props.enqueueSnackbar(`${value}`, { variant: "error" });
        return;
      }
    });
    // alert("enter")
    if (this.state.select_book_category.length === 0) {
      counter = counter + 1;
      errormsg = "Please Choose At Least One Most Suitable Book Category";
      this.props.enqueueSnackbar(`${errormsg}`, { variant: "warning" });
      this.setState({
        errormsg: errormsg,
        open_snackbar: true,
        SubmitLoader: false,
      });
      return;
    }
    // alert(counter)
    if (counter) {
      // alert("in eror")
      return
    }
    else {
      this.setState({ currentStep: 1, value: "2", SubmitLoader: false });

      const donation = {
        data: {
          donor_name: ` ${this.state.first_name}` + ` ${this.state.last_name}`,
          address: this.state.address,
          state: this.state.state,
          source: this.state.select_known_option,
          category: this.state.select_book_category,
          city: this.state.city,
          mobile: this.state.mobile,
          whatsapp_no: this.state.whatsapp_no,
          landmark: this.state.landmark,
          country: "India",
          zipcode: this.state.pincode,
          no_of_book: this.state.totalbook,
          no_of_cartons: this.state.total_carton,
          app_books_weight: this.state.total_weight,
          // pickup_date: this.state.Timestamp,
          // "book_Condition":Codata
        },
      };
      this.PassToPickup = {
        donor_name: ` ${this.state.first_name}` + ` ${this.state.last_name}`,
        mobile: this.state.mobile,
        app_books_weight: this.state.total_weight,
        address: this.state.address,
        zipcode: this.state.pincode,
        city: this.state.city.toLowerCase(),
      };
      if (this.state.updateForm) {
        // alert("update")
        const update_data = donation.data;
        update_data.donation_req_id = this.props.donation_req_id;
        // alert("api")
        console.log(update_data, "update donation body");
        this.props
          .updateDonation({
            donation: update_data,
            token: "",
            pass_to_reducer: false,
          })
          .then(res => {
            // alert("done")
            this.setState({
              currentStep: 2,
              value: "3",
              SubmitLoader: false,
            });
          })
          .catch(err => {
            this.props.enqueueSnackbar(
              "Sorry! Donation Form Not Able To be Submitted Please Contact Mypustak Support",
              {
                variant: "error",
              }
            );
            let errormsg =
              "Sorry! Donation Form Not Able To be Submitted Please Contact Mypustak Support";
            this.setState({
              errormsg: errormsg,
              open_snackbar: true,
              SubmitLoader: false,
            });
          });
      } else {
        console.log(donation, "add donation body");
        let body = { body: encryptor(donation) };
        this.props
          .AddDonation(body)
          .then(res => {
            this.setState({
              currentStep: 1,
              value: "2",
              SubmitLoader: false,
            });
            this.props.DonationMailData(donation);
          })
          .catch(err => {
            this.props.enqueueSnackbar(
              "Sorry! Donation Form Not Able To be Submitted Please Contact Mypustak Support",
              {
                variant: "error",
              }
            );
            let errormsg =
              "Sorry! Donation Form Not Able To be Submitted Please Contact Mypustak Support";
            this.setState({
              errormsg: errormsg,
              open_snackbar: true,
              SubmitLoader: false,
            });
          });
      }
      console.log(donation, "777788");
    }
    // if (counter == 0) {
    //   this.setState({ currentStep: , value: "2" });
    // }
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
  addcategory = cat => {
    // alert(cat)

    let categoryState = this.state.select_book_category;

    let check_category = this.is_catergory_present(cat);
    if (check_category) {
      let new_category_arr = this.remove_category(categoryState, cat);
      this.setState({ select_book_category: new_category_arr });
    } else {
      let category = [cat, ...categoryState];
      let NewCategoryState = [...new Set(category)];
      this.setState({ select_book_category: NewCategoryState });
    }
  };
  add_known_option = cat => {
    let categoryState = this.state.select_known_option;

    let check_category = this.is_known_option_present(cat);
    if (check_category) {
      let new_category_arr = this.remove_category(categoryState, cat);
      this.setState({ select_known_option: new_category_arr });
    } else {
      let category = [cat, ...categoryState];
      let NewCategoryState = [...new Set(category)];

      this.setState({ select_known_option: NewCategoryState });
    }
  };
  remove_category = (cat_arr, cat) => {
    return cat_arr.filter(element => element != cat);
  };
  checkfirst = () => {
    this.setState({ currentStep: 0 });
  };

  is_known_option_present = cat => {
    let bool = this.state.select_known_option.includes(cat);

    return bool;
  };
  check_same_no = () => {
    let checked = !this.state.check_whatsapp;
    if (checked) {
      this.setState({ whatsapp_no: this.state.mobile, check_whatsapp: true });
    } else {
      this.setState({ whatsapp_no: "", check_whatsapp: false });
    }
  };
  onChangeHandler = e => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    let errors = this.state.errors;
    switch (name) {
      case "first_name":
        let first_name = this.validateName(value);
        errors.first_name = first_name ? "" : "enter valid name";

        break;
      case "last_name":
        let last_name = this.validateName(value);
        errors.last_name = last_name ? "" : "enter valid last Name";

        break;
      case "mobile":
        let mobile = this.validateMobile(value);
        // console.log({mobile});

        errors.mobile = mobile ? "" : "enter valid number";

        break;
      case "whatsapp_no":
        let whatsapp_no = this.validateMobile(value);
        // console.log({mobile});

        errors.whatsapp_no = whatsapp_no ? "" : "enter valid number";

        break;
      case "address":
        if (value < 1) {
          errors.address = "Enter  Address";
        } else {
          errors.address = "";
        }
        break;
      case "landmark":
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
              .get(`${url}/pincode/pin_check/${e.target.value}/`)
              .then(res => {
                // console.log({ res })

                if (res.data.length === 0) {
                  errors.pincode = "pincode is wrong";
                } else {
                  this.setState({
                    city: res.data[0].districtname,
                    state: res.data[0].statename,
                    pincodevalid: true,
                  });

                  errors.pincode = "";
                }
              })
              .catch(err => {
                this.setState({ city: "", state: "", pincodevalid: false });
              });
          } else {
            // errors.pincode = "pincode must be 6 digit"
            this.setState({ city: "", state: "", pincodevalid: false });
          }
        } else {
          errors.pincode = "Enter valid pincode";
        }

        break;
      case "state":
        if (value < 1) {
          // errors.state = "please enter state"
        } else {
          errors.state = "";
        }
        break;
      case "city":
        break;
      case "totalbook":
        // alert("enter")
        errors.totalbook = "";
        let totalbook = this.validatePincode(value);
        if (value == "") {
          errors.totalbook = "";
        } else if (totalbook == false) {
          errors.totalbook = "enter correct number of total books";
        } else if (isNaN(value)) {
          errors.totalbook = "enter correct number of total books";
        } else if (value < 1) {
          errors.totalbook = "no. of book atleast be 1";
        } else if (value > 10000) {
          errors.totalbook = "no. of book not more than be 10000";
        } else {
          errors.totalbook = "";
        }
        break;
      case "total_carton":
        errors.total_carton = "";
        let total_carton = this.validatePincode(value);
        if (value == "") {
          errors.total_carton = "";
        } else if (total_carton == false) {
          errors.total_carton = "enter correct number of total cartons";
        } else if (isNaN(value)) {
          errors.total_carton = "enter correct number of total cartons";
        } else if (value < 1) {
          errors.total_carton = "carton and boxes atleast be 1";
        } else if (value > 1000) {
          errors.total_carton = "no. of book not more than be 1000";
        } else {
          errors.total_carton = "";
        }
        break;

      case "total_weight":
        errors.total_weight = "";
        let total_weight = this.validatePincode(value);
        if (value == "") {
          // errors.total_weight = "enter correct weight "
          errors.total_weight = "";
        } else if (total_weight == 0) {
          errors.total_weight = "enter correct weight ";
        } else if (isNaN(value)) {
          errors.total_weight = "enter correct weight ";
        } else if (value < 15) {
          errors.total_weight = "weight at least 15kg";
        } else if (value > 1000) {
          errors.total_weight = "weight not more than 1000kg";
        } else {
          errors.total_weight = "";
        }

        break;
      case "date":
        var ts = new Date(value).getTime() / 1000;

        this.setState({ Timestamp: ts });
        break;
      default:
        break;
    }
    this.setState({ [name]: value });
    this.setState({ errors, [name]: value });
  };

  is_catergory_present = cat => {
    let bool = this.state.select_book_category.includes(cat);
    // alert(bool)

    return bool;
  };
  EditFormAgain = () => {
    this.setState({ currentStep: 0, value: "1", updateForm: true });
  };

  render() {
    const {
      show,
      stepsArray,
      currentStep,
      date,
      total_weight,
      totalbook,
      total_carton,
      first_name,
      last_name,
      mobile,
      address,
      landmark,
      pincode,
      state,
      city,
      errors,
      select_book_category,
      only_kolkata_pickup,
      whatsapp_no,
    } = this.state;

    const isWeekday = date => {
      const day = date.getDay();
      return day !== 0 && day !== 6;
    };
    const is_catergory_present = cat => {
      // alert("hi")
      let bool = select_book_category.includes(cat);
      // console.log(bool, "7773")
      return bool;
    };
    console.log(this.state.selected_city, "select city");

    return (
      <>
        <Head>
          <script
            type='text/javascript'
            src='https://checkout.razorpay.com/v1/checkout.js'
            async
          />
        </Head>
        <div
          className='row g-0 no-gutters py-1 py-md-2 py-sm-2 px-0 '
          style={{
            justifyContent: "center",
            marginRight: "0",
            padding: "0px",
          }}>
          {this.state.value == 3 ? null : (
            <div className='col-12 col-lg-11 col-md-11 col-sm-11 px-0 '>
              <div className={` ${styles.TopPannelDiv}  mb-2 mx-3  `}>
                <Accordion
                  expanded={this.state.open_condition}
                  className=''>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    onClick={this.handleExpansionChange}>
                    <div
                      className={`${styles.TitleExpension}`}
                      style={{ textAlign: "center" }}>
                      Please Read Books Condition Guidelines, Before filling the
                      Donation Form
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    className='px-0 mb-3 '
                    style={{ background: "whitesmoke", padding: "0px" }}>
                    <div className='bg-white'>
                      <div className=' px-lg-5 px-md-4 px-sm-2 px-1 '>
                        <div className='  '>
                          <h5 className='text-center text-color bold m-0 my-3'>
                            <b>Book Condition Guidelines</b>
                          </h5>
                        </div>
                        <div className='border border-gray py-3 px-2 mt-3'>
                          <p
                            className='lh-sm details-color'
                            style={{ fontSize: "0.9rem" }}>
                            We request you to donate books that are in good
                            condition, the books which you will prefer for
                            yourself. The team puts great effort to make your
                            valuable books reach in the right hands. All these
                            efforts will not be fruitful if you don&apos;t
                            follow the book condition guidelines. If the books
                            match the guidelines we are committed to carry your
                            emotions forward with the books to the next reader
                            and make them grow older!
                          </p>
                          <p>
                            <b>
                              Following that MyPustak team requests you to avoid
                              sending books with
                            </b>
                          </p>
                          <div className='row'>
                            {book_types.map(data => (
                              <>
                                <div
                                  key={data.key}
                                  className='col-4 text-center'>
                                  <Image src={data.image} alt='bk_cond_img' />
                                  <p
                                    className='details-color lh-1'
                                    style={{ fontSize: "0.8rem" }}>
                                    {data.title}
                                  </p>
                                </div>
                              </>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          )}
          <div className='col-12 col-sm-11 col-lg-11 px-0 '>
            <div className={`${styles.FormDiv} mx-3  `}>
              <Box sx={{ width: "100%" }}>
                <TabContext value={this.state.value}>
                  <Box className=' bg-white pt-1'>
                    <TabList variant='fullWidth'>
                      <Tab
                        className=''
                        style={{ borderRight: "2px solid #ddd" }}
                        allowScrollButtonsMobile
                        label={
                          <>
                            <span className='d-flex align-items-center'>
                              <span className={`${styles.stepbadge}`}> 1 </span>
                              <b
                                className={`text-nowrap ${styles.TabTitle} text-capitalize`}
                                style={{ color: "#346bc3" }}>
                                {/* <TbCircle2 className='fs-4  ' />{" "} */}
                                Donor Details
                              </b>{" "}
                            </span>
                          </>
                        }
                        value='1'
                      />

                      <Tab
                        label={
                          <>
                            <span className='d-flex align-items-center'>
                              <span className={`${styles.stepbadge}`}> 2 </span>
                              <b
                                className={`text-nowrap ${styles.TabTitle} text-capitalize`}
                                style={{ color: "#346bc3" }}>
                                {/* <TbCircle2 className='fs-4  ' />{" "} */}
                                Review
                              </b>{" "}
                            </span>
                          </>
                        }
                        value='3'
                      />
                    </TabList>
                  </Box>

                  <TabPanel
                    value='1'
                    className=' p-2 bg-white  border border-gray'>
                    <form onSubmit={this.savedetail} className={`${styles.inputFieldform}`}>
                      <div className='row no-gutters'>
                        <label className='col-12 col-lg-6 col-md-6 col-sm-6 mt-md-2 mt-lg-2 mt-sm-2 mt-3 '>
                          <TextField
                            name='first_name'
                            error={errors.first_name.length ? true : false}
                            className='text-center w-100'
                            type='text'
                            id='standard-basic'
                            label='First Name'
                            value={first_name}
                            onChange={this.onChangeHandler}
                            variant='outlined'
                            helperText={errors.first_name}
                            inputProps={{
                              style: { padding: "0.8rem" },
                            }}
                            required
                          />
                        </label>
                        <label className='col-12 col-lg-6 col-md-6 col-sm-6 mt-md-2 mt-lg-2 mt-sm-2 mt-3'>
                          <TextField
                            error={errors.last_name.length ? true : false}
                            name='last_name'
                            className='text-center w-100'
                            onChange={this.onChangeHandler}
                            value={last_name}
                            type='text'
                            id='last_name'
                            label='Last Name'
                            variant='outlined'
                            required
                            helperText={errors.last_name}
                            inputProps={{
                              style: { padding: "0.8rem" },
                            }}
                          />
                        </label>
                      </div>

                      <div className='row no-gutters '>
                        <p className='col-12 col-lg-4 col-md-4 mt-md-2 mt-lg-2 mt-sm-2 mt-3 mb-1'>
                          <TextField
                            error={errors.pincode.length ? true : false}
                            name='pincode'
                            value={pincode}
                            onChange={this.onChangeHandler}
                            className='text-center w-100'
                            helperText={errors.pincode}
                            inputProps={{
                              maxLength: 6,
                              style: { padding: "0.8rem" },
                            }}
                            label='Pickup pincode'
                            type='tel'
                            variant='outlined'
                            required
                          />
                        </p>
                        <label className='col-12 col-lg-4 col-md-4 col-sm-6 mt-md-2 mt-lg-2 mt-sm-2 mt-3'>
                          <TextField
                            error={errors.mobile.length ? true : false}
                            name='mobile'
                            value={mobile}
                            onChange={this.onChangeHandler}
                            className=' w-100'
                            label='10 digit mobile number'
                            type='tel'
                            variant='outlined'
                            inputProps={{
                              maxLength: 10,
                              style: { padding: "0.8rem" },
                            }}
                            helperText={errors.mobile}
                            required
                          />
                        </label>
                        <div className='col-12 col-lg-4 col-md-4 col-sm-6 mt-md-2 mt-lg-2 mt-sm-2 mt-3 '>
                          <label className=' w-100'>
                            <TextField
                              error={errors.whatsapp_no.length ? true : false}
                              name='whatsapp_no'
                              className='text-center w-100'
                              value={whatsapp_no}
                              label='10-digit Whatsapp number'
                              type='tel'
                              variant='outlined'
                              onChange={this.onChangeHandler}
                              inputProps={{
                                maxLength: 10,
                                style: { padding: "0.8rem" },
                              }}
                              helperText={errors.whatsapp_no}
                              required
                            />
                          </label>
                          <div className='my-1'>
                            <div className='form-check '>
                              <input
                                className='form-check-input'
                                checked={this.state.check_whatsapp}
                                onClick={this.check_same_no}
                                type='checkbox'
                                value=''
                                id='flexCheckDefault5'
                              />
                              <label
                                className='form-check-label'
                                htmlFor='flexCheckDefault5'
                                style={{ fontSize: "0.8rem" }}>
                                same as mobile number
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='row no-gutters'>
                        <label className=''>
                          <TextField
                            name='address'
                            value={address}
                            className='text-center w-100 p-1'
                            label='Pickup address (Area & street)'
                            type='text'
                            variant='outlined'
                            onChange={this.onChangeHandler}
                            inputProps={{
                              maxLength: 230,
                              style: { padding: "0.8rem" },
                            }}
                            errors={errors.address}
                            helperText={errors.address}
                            required
                            multiline
                            rows={3}
                          />
                        </label>
                      </div>
                      <div className='row no-gutters p-1 mt-1'>
                        <label>
                          <TextField
                            error={errors.landmark.length ? true : false}
                            name='landmark'
                            value={landmark}
                            className='text-center w-100'
                            onChange={this.onChangeHandler}
                            inputProps={{
                              maxLength: 80,
                              style: { padding: "0.8rem" },
                            }}
                            label='Landmark '
                            type='text'
                            variant='outlined'
                            required
                            helperText={errors.landmark}
                          />
                        </label>
                      </div>

                      <div className='row no-gutters  '>
                        <p className='col-12 col-lg-6 col-sm-6 col-md-6 mt-sm-2 mt-3'>
                          <Form.Select
                            error={errors.state.length ? true : false}
                            id='state'
                            name='state'
                            value={state}
                            style={{
                              border: "none",
                              border: "1px solid lightgray",
                              outline: "none",
                              width: "100%",
                              height: "100%",
                              backgroundColor: "#fff"
                            }}
                            // variant='outlined'
                            onChange={e => {
                              this.state.pincodevalid
                                ? this.onChangeHandler
                                : this.setState({ state: e.target.value });
                            }}
                            helperText={errors.state}
                            // disabled={this.state.pincodevalid}
                            required>
                            {statesArray.map((states, index) => {
                              return (
                                <option key={index} value={states.value}>
                                  {states.label}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </p>
                        <p
                          className='col-12 col-lg-6  col-sm-6 col-md-6 mt-sm-2 mt-2'
                          style={{ marginTop: "-0.5rem" }}>
                          <TextField
                            name='city'
                            className='text-center w-100'
                            label='City/ District/ Town'
                            type='text'
                            // style={{height:'1rem'}}
                            variant='outlined'
                            value={city}
                            onChange={this.onChangeHandler}
                            InputLabelProps={{
                              style: {
                                fontSize: "0.95rem",
                                marginBottom: "4rem",
                              },
                            }}
                            inputProps={{
                              maxLength: 40,
                              style: {
                                padding: "0.8rem",
                                fontSize: "0.95rem",
                                height: "0.7rem",
                              },
                            }}
                            helperText={errors.city}
                            required
                          />
                        </p>
                      </div>

                      <div className='row no-gutters'>
                        <label className='col-6 col-lg-4 col-md-4 col-sm-6'>
                          <TextField
                            error={errors.totalbook.length ? true : false}
                            name='totalbook'
                            className='text-center w-100'
                            label='Approx No. of Books'
                            onChange={this.onChangeHandler}
                            type='tel'
                            variant='outlined'
                            helperText={errors.totalbook}
                            required
                            value={totalbook}
                            inputProps={{
                              style: { padding: "0.8rem" },
                            }}
                            InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                          />
                        </label>
                        {this.state.selected_city == "kol" ? null : (
                          <label className='col-6 col-lg-4 col-md-4 col-sm-6'>
                            <TextField
                              error={errors.total_carton.length ? true : false}
                              name='total_carton'
                              onChange={this.onChangeHandler}
                              className='text-center w-100'
                              label='No. of carton/Boxes'
                              type='text'
                              variant='outlined'
                              helperText={errors.total_carton}
                              required
                              value={total_carton}
                              inputProps={{
                                style: { padding: "0.8rem" },
                              }}
                              InputLabelProps={{
                                style: { fontSize: "0.8rem" },
                              }}
                            />
                          </label>
                        )}

                        {this.state.selected_city == "kol" ? null : (
                          <label className='col-6 col-lg-4 col-md-4 col-sm-6 mt-lg-0 mt-md-0 mt-sm-0 mt-3 '>
                            <FormControl fullWidth>
                              <InputLabel
                                htmlFor='adornment-password'
                                style={{ fontSize: "0.8rem" }}
                                error={
                                  errors.total_weight.length ? true : false
                                }>
                                Approx. Total Weight
                              </InputLabel>
                              <Input
                                //   error={errors.signup_password.length ? true : false}
                                id='total_weight'
                                name='total_weight'
                                label='Total Weight'
                                onChange={this.onChangeHandler}
                                margin='dense'
                                fullWidth
                                variant='outlined'
                                required
                                value={total_weight}
                                endAdornment={
                                  <InputAdornment position='end'>
                                    KG
                                  </InputAdornment>
                                }
                              />
                              <FormHelperText>
                                {errors.total_weight
                                  ? null
                                  : "minimum weight should be 15kg"}
                              </FormHelperText>
                              <FormHelperText style={{ color: "red" }}>
                                {errors.total_weight}
                              </FormHelperText>
                            </FormControl>
                          </label>
                        )}
                      </div>
                      <div className=''>
                        <div className={` ${styles.midLebel}  col-12 col-lg-12`}>
                          <p
                            style={{
                              textAlign: "center",
                              marginBottom: "0.5rem",
                            }}>
                            Select most suitable books categories
                          </p>
                        </div>
                        <div className='col-12 col-lg-12 mb-1'>
                          <p
                            className='text-danger mb-0'
                            style={{ fontSize: "0.7rem" }}>
                            (*We donot accept any books such as study material
                            given by institute which are used for internal
                            circulation purpose)
                          </p>
                        </div>
                      </div>
                      <div
                        className='row no-gutters'
                        style={{ fontSize: "0.8rem", padding: "0.4rem 1rem" }}>
                        <div className='col-12 col-lg-6'>
                          <div className='row mx-auto'>
                            <div className='form-check col-6'>
                              <input
                                className={`form-check-input ${styles.fontSize09} `}
                                checked={this.is_catergory_present(`NCERT`)}
                                onClick={() => this.addcategory(`NCERT`)}
                                type='checkbox'
                                value=''
                                id='flexCheckDefault1'
                              />
                              &nbsp;
                              <label
                                className={`form-check-label ${styles.fontSize09} `}
                                htmlFor='flexCheckDefault1'>
                                Ncert
                              </label>
                            </div>
                            <div className='form-check col-6'>
                              <input
                                className={`form-check-input ${styles.fontSize09} `}
                                checked={this.is_catergory_present(`School`)}
                                onClick={() => this.addcategory(`School`)}
                                type='checkbox'
                                value=''
                                id='flexCheckDefault2'
                              />
                              &nbsp;
                              <label
                                className={`form-check-label ${styles.fontSize09} `}
                                htmlFor='flexCheckDefault2'>
                                School
                              </label>
                            </div>
                          </div>
                          <div className='row mx-auto'>
                            <div className='form-check col-6'>
                              <input
                                className={`form-check-input ${styles.fontSize09} `}
                                checked={this.is_catergory_present(`MBA`)}
                                onClick={() => this.addcategory(`MBA`)}
                                type='checkbox'
                                value=''
                                id='flexCheckDefault3'
                              />
                              &nbsp;
                              <label
                                className={`form-check-label ${styles.fontSize09} `}
                                htmlFor='flexCheckDefault3'>
                                MBA
                              </label>
                            </div>
                            <div className='form-check col-6'>
                              <input
                                className={`form-check-input ${styles.fontSize09} `}
                                checked={this.is_catergory_present(
                                  `Spritual Books`
                                )}
                                onClick={() =>
                                  this.addcategory(`Spritual Books`)
                                }
                                type='checkbox'
                                value=''
                                id='flexCheckDefault4'
                              />
                              &nbsp;
                              <label
                                className={`form-check-label ${styles.fontSize09} `}
                                htmlFor='flexCheckDefault4'>
                                Spiritual books
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className='col-12 col-lg-6'>
                          <div className='row mx-auto'>
                            <div className='form-check col-6'>
                              <input
                                className={`form-check-input ${styles.fontSize09} `}
                                checked={this.is_catergory_present(
                                  `Entrance Exam`
                                )}
                                onClick={() =>
                                  this.addcategory(`Entrance Exam`)
                                }
                                type='checkbox'
                                value=''
                                id='flexCheckDefault5'
                              />
                              &nbsp;
                              <label
                                className={`form-check-label ${styles.fontSize09} `}
                                htmlFor='flexCheckDefault5'>
                                Entrance Exam
                              </label>
                            </div>
                            <div className='form-check col-6'>
                              <input
                                className={`form-check-input ${styles.fontSize09} `}
                                checked={this.is_catergory_present(`Children`)}
                                onClick={() => this.addcategory(`Children`)}
                                type='checkbox'
                                value=''
                                id='flexCheckDefault6'
                              />
                              &nbsp;
                              <label
                                className={`form-check-label ${styles.fontSize09} `}
                                htmlFor='flexCheckDefault6'>
                                Children
                              </label>
                            </div>
                          </div>
                          <div className='row mx-auto'>
                            <div className='form-check col-6'>
                              <input
                                className={`form-check-input ${styles.fontSize09} `}
                                checked={this.is_catergory_present(`Others`)}
                                onClick={() => this.addcategory(`Others`)}
                                type='checkbox'
                                value=''
                                id='flexCheckDefault7'
                              />
                              &nbsp;
                              <label
                                className={`form-check-label ${styles.fontSize09} `}
                                htmlFor='flexCheckDefault7'>
                                Others
                              </label>
                            </div>
                            <div className='form-check col-6'>
                              <input
                                className={`form-check-input ${styles.fontSize09} `}
                                checked={this.is_catergory_present(
                                  `Engineering`
                                )}
                                onClick={() => this.addcategory(`Engineering`)}
                                type='checkbox'
                                value=''
                                id='flexCheckDefault8'
                              />
                              &nbsp;
                              <label
                                className={`form-check-label ${styles.fontSize09} `}
                                htmlFor='flexCheckDefault8'>
                                Engineering
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='mb-2 '>
                        <MediaQuery maxWidth={576}>
                          <div
                            style={{
                              position: "top",
                              position: "fixed",
                              bottom: "0px",
                              left: "0px",
                              /* height: 9rem; */
                              background: "white",
                              zIndex: "1045",
                              padding: "1rem",
                              width: "100vw",
                            }}>
                            <Button
                              fullWidth
                              style={{ minHeight: "3.5rem", outline: "none" }}
                              type='submit'
                              className='bg text-white p-2 text-capitalize'>
                              Submit
                            </Button>
                          </div>
                        </MediaQuery>
                        {/* web search Button */}
                        <MediaQuery minWidth={577}>
                          <Button
                            style={{ outline: "none" }}
                            fullWidth
                            type='submit'
                            className='bg text-white p-2 text-capitalize'>
                            Submit
                          </Button>
                        </MediaQuery>
                      </div>
                    </form>
                  </TabPanel>

                  <TabPanel
                    value='2'
                    className='p-2 bg-white border border-gray'>
                    <div>
                      <NoSsr>
                        <p>
                          <div>
                            <DonationPickup
                              PassToPickup={this.PassToPickup}
                              OpenFromToEdit={this.EditFormAgain}
                            />
                          </div>
                        </p>
                      </NoSsr>
                    </div>
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </div>
          <style jsx>
            {`
            `}
          </style>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  pickup: state.donationR.pickup,
  userToken: state.accountR.token,
  userDistinct: state.userdetailsR.userDistinct,
  userComponentStatus: state.accountR.userComponentStatus,
  getuserdetails: state.userdetailsR.getuserdetails,
  free_pickup: state.donationR.free_pickup,
  paid_pickup: state.donationR.paid_pickup,
  kolkata_free_pickup: state.donationR.kolkata_free_pickup,
  donation_req_id: state.donationR.donation_req_id,
});

export default connect(mapStateToProps, {
  AddDonation,
  ChangeLogin,
  DonationMailData,
  fetch_user_detail,
  fetch_donor_pickupdates,
  updateDonation,
})(withSnackbar(DonationForm));
