import React, { Component } from "react";
import { getEstDeliveryDate } from "../../redux/actions/cartAction";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import moment from "moment";

export class DeliveryDate extends Component {
  state = {
    est_day_str: "",
  };
  componentDidMount() {
    this.ApiEstimate_delivery(this.props.pincode);
  }
  ApiEstimate_delivery = (pincode, wt = 0.5, replace_pincode = false) => {
    console.log(pincode, wt, replace_pincode, "api1");
    // alert(this.props.booked_date);
    // console.log(this.props);
    const local_est_date = localStorage.getItem("est_pincodes");
    const order_bookdate = this.props.booked_date;
    // const estimate_days = parseInt(local_est_date)* 4 * 24 * 60 * 60*1000

    const order_bookdateate = new Date(order_bookdate * 1000);
    let est_day_str = "";
    if (local_est_date) {
      const local_est_date_data = JSON.parse(local_est_date);
      const local_est_pincode = local_est_date_data.pincode;
      if (local_est_pincode && !replace_pincode) {
        // let est_day_str = `${Number(local_est_date_data.edd)}-${
        //       Number(local_est_date_data.edd) + 3
        //     } Days ${moment().add(3, 'd').format("DD-MMM")}`
        est_day_str = `${moment
          .unix(this.props.booked_date)
          .add(local_est_date_data.edd, "d")
          .format("DD MMM")} - ${moment
          .unix(this.props.booked_date)
          .add(local_est_date_data.edd + 3, "d")
          .format("DD MMM")}`;
    
        this.setState({ est_day_str, show_est_day_loader: false });
        this.setState(state => {
          return { enteredPincode: local_est_date_data.pincode };
        });

        return;
      }
      this.setState({ est_day_str, show_est_day_loader: false });
    } else {
      this.setState({ est_day_str, show_est_day_loader: false });
      // console.log('NO est pincode');
      this.setEstimateDeliverydate(pincode, wt, true);
      return;
    }

    this.setEstimateDeliverydate(pincode, wt, replace_pincode);
  };

  setEstimateDeliverydate = (pincode, wt, replace_pincode) => {
    this.props
      .getEstDeliveryDate({ pincode, wt })
      .then(res => {
        console.log(res, "RESRESRES");
        // this.setState({})
        // alert('ok')
        if (res.estimated_delivery_days) {
          if (replace_pincode) {
            let est_day_str = `${moment()
              .add(res.estimated_delivery_days, "d")
              .format("DD MMM")} - ${moment()
              .add(Number(res.estimated_delivery_days) + 3, "d")
              .format("DD MMM")}`;
            this.setState({ est_day_str, show_est_day_loader: false });
            // this.setState({ est_day_str, show_est_day_loader: false });
            const pincode_details = JSON.stringify({
              pincode: pincode,
              edd: Number(res.estimated_delivery_days),
            });
            localStorage.setItem("est_pincodes", pincode_details);
          }
        } else {
          this.setState({ est_day_str: "", show_est_day_loader: false });
        }
      })
      .catch(err => {
        // console.log({ err });
        // alert("wrong")
        this.setState({
          est_day_str: "",
          Show_Error_msg: true,
          error_msg: err.showErr
            ? err.msg
            : "Error occured while fetching estimated delivery time",
          show_est_day_loader: false,
        });
      });
  };
  render() {
    return (
      <div>
        <span>Estimated Delivered in {this.state.est_day_str}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  getEstDeliveryDate,
})(withSnackbar(DeliveryDate));
