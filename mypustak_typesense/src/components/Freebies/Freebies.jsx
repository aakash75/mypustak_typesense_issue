"use client"
import React, { useState } from "react";
import styles from "../../styles/Freebies.module.css";
import Image from "next/image";
import RedeemIcon from "@mui/icons-material/Redeem";
import { fetch_freebie_data } from "../../redux/actions/cartAction";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckedAnimation from "../../components/animations/CheckedAnimation";
import { useDispatch } from "react-redux";
const data = {
  id: 1,
  title: "Grab Mypustak Notebook",
  // offering_msg:`Add ${data.offering}`,
  Applied_msg: "congratulation! ",
  product_name: "MyPustak Notebook - Single Line, 172 Pages, 240 Mm X 180 Mm",
  thumb:
    "https://mypustak-6.s3.amazonaws.com/books/notebook/83846575_12_22?1706010615535",
  valid_from: "1704949666",
  valid_to: "1704956153",
  mrp: 54,
  freebies_amt: 0,
  min_cart_value_range: 100,
  max_cart_value_range: 700,
  min_cart_value: 300,
};

function Freebies(props) {
  const dispatch = useDispatch();
  const [onerror, setonerror] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    let body = {
      cart_value: props.cartvalue,
    };
    dispatch(fetch_freebie_data(body))
      .then((res) => {
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, []);

  console.log(props.freebie_data, "freebie_data");
  return (
    <div>
      {props.freebie_loader ? (
     

        <div className="d-flex">
          <div
            className={` bg-white p-2 mb-2 shadow ${styles.freebies_maindiv_skeleton}`}
          >
            <div className="">
              <div
                className="placeholder"
                style={{ height: "3rem", width: "3rem" }}
              ></div>
            </div>

            <div className={`${styles.rightcontent}`}>
              <div>
                {" "}
                <Skeleton animation="wave" style={{ margin: 0, padding: 0 }} />
              </div>
              <div>
                <Skeleton animation="wave" style={{ margin: 0, padding: 0 }} />
              </div>
            </div>
          </div>
        </div>
      ) : props.freebie_data?.product_name ? (
        <div className={`${styles.parent_div}`}>
          <div
            className={`cursor-pointer bg-white shadow ${styles.freebies_maindiv} `}
          >
            <Image
              title={props.freebie_data?.product_name}
              priority={true}
              // placeholder="blur"
              blurDataURL={props.freebie_data?.thumb}
              alt={props.freebie_data?.title}
              onError={() => {
                setonerror(true);
              }}
              src={
                onerror
                  ? "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png"
                  : `https://d1f2zer3rm8sjv.cloudfront.net/${props.freebie_data?.thumb}`
              }
              //   fill={true}
              //   layout="responsive"
              width={45}
              height={45}
              className=""
              style={{
                borderRadius: "5px",
              }}
            />

            <div className={`${styles.rightcontent}`}>
              <div className={`${styles.rightcontentText}`}>
                {props.freebie_data?.title}

                <span>
                  {" "}
                  <b> Worth &#8377;{props.freebie_data?.mrp} </b> {}{" "}
                </span>
                <span style={{ color: "#2248ae" }}>Absolutely FREE</span>
              </div>
              <div className={styles.content_text}>
                {props.freebie_data?.product_description}
              </div>
            </div>
          </div>
          <div
            className={` bg-white shadow   ${styles.rightmostcontent}`}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0",
            }}
          >
            <div className={`${styles.rightMostContentInnerDiv}`}>
              <div>
                {props.freebie_data?.min_cart_value <= props.cartvalue ? (
                  <div
                    className="d-flex"
                    style={{ gap: "0.1rem", alignItems: "center" }}
                  >
                    <span style={{ marginRight: "0.5rem" }}>
                      <CelebrationIcon style={{ color: "#2248ae" }} />
                    </span>
                    <span>
                      Hooray! <b style={{}}>FREEBIE </b> Unlocked!{" "}
                      <span style={{ fontSize: "0.6rem", color: "green" }}>
                        Offer Applied{" "}
                      </span>{" "}
                      &nbsp;
                    </span>
                    <span>
                      {" "}
                      <CheckedAnimation />
                    </span>
                  </div>
                ) : (
                  <div className={`${styles.offerNotApplied}`}>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.2rem",
                        alignItems: "center",
                      }}
                    >
                      <RedeemIcon style={{ color: "#2248ae" }} />
                      <div style={{ fontSize: "0.7rem" }}>
                        Shop For{" "}
                        <b>
                          &#8377;
                          {props.freebie_data?.min_cart_value - props.cartvalue}
                        </b>{" "}
                        more to unlock this{" "}
                        <b style={{ color: "green" }}>FREEBIE</b>
                        <br />
                      </div>
                    </div>
                    <div style={{ textAlign: "end", fontSize: "0.7rem" }}>
                      <span> Limited Time Offer !</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// export default Freebies;

const mapStateToProps = (state) => ({
  cartDetails: state.cartReduc.MyCart,
  freebie_data: state.cartReduc.freebie_data,
  freebie_loader: state.cartReduc.freebie_loader,

});

export default connect(mapStateToProps, {
  fetch_freebie_data,
})(withSnackbar(Freebies));
