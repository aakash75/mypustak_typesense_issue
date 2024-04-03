import { withSnackbar } from "notistack";
import React from "react";
import { connect } from "react-redux";
import styles from "../../styles/OfferStrip.module.css";
import Link from "next/link";

function OfferStrip(props) {
  return (
    <div>
      <div>
        {props.offerhomepage.coupon_title ? (
          <div className={styles.offerHead}>
            {/* {props.offerhomepage.coupon_for==2?
               */}
            {props.offerhomepage.coupon_for==2?

             <span>
             {props.offerhomepage.coupon_title}&nbsp; 
             <Link
               href={"/offerpage"}
               style={{ color: "white", textDecoration: "underline" }}>
               Know more
                </Link>
             
           </span>:
            <span>
              {props.offerhomepage.coupon_title} use code{" "}
              <b>{props.offerhomepage.coupon_code}</b> to get extra{" "}
              {props.offerhomepage.discount_value}
              {props.offerhomepage.discount_type == 1 ? "Flat ₹" : null}
              {props.offerhomepage.discount_type == 2 ? "%" : null} off.{" "}
              <Link
                href={"/offerpage"}
                style={{ color: "white", textDecoration: "underline" }}>
                Know more
              </Link>
              
            </span>}
          </div>
        ) : null}
      </div>

    </div>
  );
}

const mapStateToProps = state => {
  return {
    offerhomepage: state.offerpageReducer.offerhomepage,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOffers: () => dispatch(getOffers()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(OfferStrip));
