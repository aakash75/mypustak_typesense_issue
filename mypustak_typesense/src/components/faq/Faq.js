"use client"
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { getFaqCategoryData } from "../../redux/actions/faqAction";
import { Skeleton } from "@mui/material";
function Faq(props) {
  const [categoryLoader, setcategoryLoader] = useState(true);
  const [LeftDivData, setLeftDivData] = useState([]);
  const [RightDivData, setRightDivData] = useState([]);

  useEffect(() => {
    props
      .getFaqCategoryData()
      .then(res => {
        console.log(res, "res..............");
        setcategoryLoader(false);
        devideData(res);
      })
      .catch(err => {
        // setcategoryLoader(true)
      });
  }, []);
  // let LeftDivData = []
  // let RightDivData = []
  const devideData = facCategory => {
    let Datalength = facCategory.length;
    let count =
      Datalength % 2 == 0
        ? Datalength / 2
        : parseInt(Datalength / 2) + (Datalength % 2);

    setLeftDivData(facCategory.slice(0, count));
    setRightDivData(facCategory.slice(count, Datalength));
  };
  return <>
    <div
      className='container-fluid  mb-5 row mx-auto bg-white p-lg-4 p-3 border shadow'
      style={{ marginTop: "1rem" }}>
      <h5 className='  text-primary text-center'>
        <b>Frequently Asked Questions</b>
      </h5>

      {categoryLoader ? (
        <div className='row border'>
          <div className='col-md-6 '>
            <Skeleton
              fullWidth
              animation='wave'
              style={{ height: "3.5rem", marginBottom: "-1rem" }}
            />
            <Skeleton
              fullWidth
              animation='wave'
              style={{ height: "3.5rem", marginBottom: "-1rem" }}
            />
            <Skeleton
              fullWidth
              animation='wave'
              style={{ height: "3.5rem" }}
            />
          </div>
          <div className='col-md-6 '>
            <Skeleton
              fullWidth
              animation='wave'
              style={{ height: "3.5rem", marginBottom: "-1rem" }}
            />
            <Skeleton
              fullWidth
              animation='wave'
              style={{ height: "3.5rem", marginBottom: "-1rem" }}
            />
            <Skeleton
              fullWidth
              animation='wave'
              style={{ height: "3.5rem" }}
            />
          </div>
        </div>
      ) : (
        <div className='row  ml-1 '>
          <div className='col-md-6 '>
            {LeftDivData.map((faq, index) => {
              return (
                <Link
                  key={index}
                  style={{ textDecoration: "none" }}
                  href={`/faq?id=${faq.faqcat_id}`}
                  prefetch={false}
                  >
                    <Button
                      style={{ textTransform: "capitalize" }}
                      className='my-1'
                      fullWidth
                      variant='outlined'
                      color='primary'>
                      {faq.category}
                    </Button>
                </Link>
              );
            })}
          </div>
          <div className='col-md-6 '>
            {RightDivData.map((faq, index) => {
              return (
                <Link
                  key={index}
                  style={{ textDecoration: "none" }}
                  href={`/faq?id=${faq.faqcat_id}`}
                  prefetch={false}
                  legacyBehavior>
                    <Button
                      style={{ textTransform: "capitalize" }}
                      className='my-1'
                      fullWidth
                      variant='outlined'
                      color='primary'>
                      {faq.category}
                    </Button>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  </>;
}
// export default Faq;
const mapStateToProps = state => ({
  facCategory: state.faqR.facCategory,
});
const mapDispatchToProps = dispatch => {
  return {
    getFaqCategoryData: () => dispatch(getFaqCategoryData()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Faq);
