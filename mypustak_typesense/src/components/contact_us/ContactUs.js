import React from "react";
import helpline from "../../assets/helpline.svg";
import Image from "next/legacy/image";
import { TextField, NoSsr } from "@mui/material";
import contact_us_img from "../../assets/contact_us.svg";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import NextBreadcrumbs from "../Breadcrumbs/NextBreadcrumbs";
function ContactUs(props) {
  return (
    <div>
      <NoSsr>
        <NextBreadcrumbs />
      </NoSsr>
      <div className='row mx-5 mx-xs-1 border border-success  my-5'>
        <div className='col-12 col-md-6 order-1 order-md-0'>
          <h6 className='text-center py-3 bg-color text-white mb-0 mt-3 mt-md-0'>
            <b>Contact Us</b>
          </h6>

          <div className='div-shadow mt-3 px-3 '>
            <h6 className='text-center py-3 mb-0 text-color'>
              <WhereToVoteIcon />
              &emsp;<b>Address</b>
            </h6>
            <hr className='  mt-0 mb-1' />
            <div
              className='lh-sm pb-3 details-color'
              style={{ fontSize: "0.9rem" }}>
              <span>EDUCATEXLABS PRIVATE LIMITED</span>
              <br />
              <span>3908/3980, EAST BERABERI , SIKHER BAGAN</span>
              <br />
              <span> GOPALPUR RAJARHAT</span>
              <br />
              <span>KOLKATA , PARGANAS NORTH-700136</span>
              <br />
              <span>WEST BENGAL</span>
              <br />
              <span>CIN : U80900WB2021PTC242967</span>
              <br />
              <span>HELPLINE: 033-41804333 (WhatsApp & call)</span>
              <br />
            </div>
          </div>

          <div className='div-shadow text-center py-3 mt-3 px-3'>
            <h6 className='text-color'>
              <PhoneAndroidIcon />
              &emsp;<b>Helpline</b>
            </h6>
            <hr className='  mt-0 mb-1' />
            <p className='details-color'>033-41804333 (WhatsApp & call)</p>
            <Image src={helpline} alt='helpline_img' />
          </div>
        </div>

        <div className='col-12 col-md-6 '>
          <h6 className='text-center py-3 bg-color  text-white mb-0 '>
            <b>Mail Your Query</b>
          </h6>
          <div className='div-shadow mt-3'>
            <form className=' p-2 row '>
              <div className=' w-75 row mx-auto col-12 col-lg-9'>
                <label className='col-12 col-lg-4 my-lg-3'>Your Name</label>
                <TextField
                  variant='standard'
                  className='col-12 col-lg-8 mb-2 my-lg-3'
                />
                <br />
                <label className='col-12 col-lg-4 my-lg-3'>Email ID</label>
                <TextField
                  variant='standard'
                  className='col-12 col-lg-8 mb-2 my-lg-3'
                />
                <br />
                <label className='col-12 col-lg-4 my-lg-3'>Whatsapp No.</label>
                <TextField
                  variant='standard'
                  className='col-12 col-lg-8 mb-2 my-lg-3'
                />
                <br />
                <label className='col-12 col-lg-4 my-lg-3'>Subject</label>
                <TextField
                  variant='standard'
                  className='col-12 col-lg-8 mb-2 my-lg-3'
                />
                <br />
                <label className='col-12 col-lg-4 my-lg-3'>Your Message</label>
                <textarea
                  className='col-12 col-lg-8 mb-2  my-lg-3'
                  style={{ resize: "none" }}
                  rows='4'
                />
                <br />
                {/* <TextField id="filled-multiline-static" className='col-8 my-3' multiline rows={4} variant="standard" /> */}
                <input type='file' />
                <input
                  type='submit'
                  value={"submit"}
                  className='my-3 bg-color py-2 text-white border-0'
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-center'>
        <Image src={contact_us_img} alt='contact_img' />
      </div>
      <style jsx>
        {`
          .div-shadow {
            box-shadow: 0px 0px 6px 0px #00000040;
          }
        `}
      </style>
    </div>
  );
}

export default ContactUs;
