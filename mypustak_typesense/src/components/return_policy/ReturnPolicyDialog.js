/* eslint-disable */
import React from 'react'
import ReactPlayer from "react-player";
import styled from "../../styles/DonateBooks.module.css"
import double_arr_scroll from '../../assets/double_arr_scroll.svg'
import Image from "next/legacy/image"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useRouter } from 'next/navigation';
function ReturnPolicy() {
    const Router = useRouter()
    const gotodiv = () => {
        let scrollToY = 0
        scrollToY = 500
        window.scrollTo(0, scrollToY)
    }
    const openWhatsapp = () => {
        Router.push("https://api.whatsapp.com/send?phone=913341804333&text=Welcome%20to%20MyPustak%20-%20I%20need%20a%20help")
    }
    const openReturnPolicyPage = () => {
        Router.push("/pages/return-policy")
        // alert(window.screen.width)

    }
    return (
        <div className='mt-2 mx-2  bg-white'>
            <div className='row  mx-auto gap-2'>
                <div className='col-12  d-flex justify-content-center'>
                    <ReactPlayer
                        playing={true}
                        controls={true}
                        loop={true}
                        volume={1}
                        height={window.screen.width < 500 ? "9.3rem" : "12rem"}
                        width={window.screen.width < 500 ? "100%" : "90%"}
                        url="https://www.youtube.com/watch?v=1zcjpB5FFgY" />
                </div>
                <div className='col-12  '>
                    <div className='lh-1 pt-4 details-color'>
                        <p>If you are not entirely satisfied with your purchase, we're here to help.</p>
                        <p className='text-color' ><b>Seven days Replacement / Return / Refund Policy :</b></p>
                        <p>Replacement Refund Return claims can only be entertained within seven days of the product delivery and only if the product gets delivered in defective/damaged condition or different from the ordered item, as stated on the product details page while ordering the product.
                        </p>
                        <p>Note:- Please keep the product intact with all the accessories received, with the product if you want to apply for the Return / Replacement / Refund. <span style={{ color: "#2258ae", cursor: "pointer" }} onClick={openReturnPolicyPage} >Read More</span> </p>
                    </div>
                </div>

            </div>
            <style jsx>
                {
                    `
                    p{
                       line-height:1.1rem;
                    }
                    .arrowdiv_about {
                        position: relative;
                        top: -3vh;
                        cursor: pointer;
                        text-align:center;
                    }
                    `
                }
            </style>
        </div>
    )
}

export default ReturnPolicy