"use client"
import React, { Component } from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import Checkout from "../../components/checkout/Checkoutpage";
import {
    Getaddress,
} from "../../redux/actions/accountAction";
import CheckoutNavbar from "../../components/CheckoutNavbar/CheckoutNavbar";
import { fetch_min_order_value } from "../../redux/actions/cartAction";
class Page extends Component {
    state = {
        address: [],
        primary_Address: [],
        cod_charge_api: '',
        min_prepaid_order_value: '',
        min_cod_order_value: '',
    };

    componentDidMount() {
        // alert("cdm");

        if (this.props.ItemsInCart.length == 0) {
            window.location.replace(`/view-cart`);
        } else {
            this.props.Getaddress();
        }
    }
    render() {
        return (
            <div>
                <div className='sticky-top' style={{ zIndex: 999 }}>
                    <CheckoutNavbar />
                </div>
                <Checkout />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    ItemsInCart: state.cartReduc.cartLength,
});

export default connect(mapStateToProps, {
    fetch_min_order_value,
    Getaddress,
})(withSnackbar(Page));
