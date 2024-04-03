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
    return (
        <div className='mt-3 mx-4  bg-white'>
            <div className='row  mx-auto'>
                <div className='col-12 col-lg-6 '>
                    <div>
                        <h5 className='text-center py-3 text-white' style={{ background: "#2258AE" }}>Return Refund Replacement Policy</h5>
                        <div className='lh-1 pt-4 details-color'>
                            <p>If you are not entirely satisfied with your purchase, we're here to help.</p>
                            <p className='text-color' ><b>Seven days Replacement / Return / Refund Policy :</b></p>
                            <p>Replacement Refund Return claims can only be entertained within seven days of the product delivery and only if the product gets delivered in defective/damaged condition or different from the ordered item, as stated on the product details page while ordering the product.
                            </p>
                            <p>Note:- Please keep the product intact with all the accessories received, with the product if you want to apply for the Return / Replacement / Refund.</p>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-lg-6 d-flex justify-content-center'>
                    <ReactPlayer url="https://www.youtube.com/watch?v=1zcjpB5FFgY" />
                </div>
            </div>
            <div className='row mx-auto mt-3'>
                <div className="arrowdiv_about">
                    <div className='arrowdiv mt-3' onClick={gotodiv} >
                        <Image className={styled.arrow} src={double_arr_scroll} alt='arrow_img' />
                    </div>
                </div>
            </div>
            <div className='row mx-auto mt-3'>
                <div className='col-12'>
                    <h5 className='text-center py-3 text-white mr-lg-4' style={{ background: "#2258AE" }}>Available Refund methods :</h5>
                    <div className='mt-4'>
                        <h6 className='text-color fw-bold'>1. Original Payment Method</h6>
                        <p className='details-color'>The refund will be credited to the original payment gateway used by you for placing the order.</p>
                        <h6 className='text-color fw-bold'>2. MyPustak wallet</h6>
                        <p className='details-color'>
                            <ul>
                                <li>
                                    The refund made to the MyPustak wallet can be used by you for placing future orders.
                                </li>
                                <li>
                                    In case of a return of any product, the refund will be credited to the MyPustak wallet or original payment method Within 5-7 working days once the product is returned and received at our hub.
                                </li>
                                <li>
                                    Refund time frame: 3-9 working days after the refund is approved for the complete order or partial part of it.
                                </li>
                                <li>
                                    For Cash on Delivery orders, refunds will be processed either to your Bank account (via National Electronic Funds Transfer (NEFT) or MyPustak Wallet.
                                </li>
                                <li>
                                    If you wish to receive the Pay on Delivery order's refund to your bank account, in that case, you need to update us on the details of your bank account.
                                </li>
                                <li>
                                    As soon as your refund is approved, your order status will reflect as "Refund Requested."
                                </li>
                                <li>
                                    In case the standard time frame, after your refund is approved from our end, has expired and you have not received the refund, you can contact us anytime on our helpline number (03341804333 WhatsApp or call)
                                </li>
                            </ul>
                            Refund time frame: 3-9 working days after refund approved for complete order or partial part of it.
                            For Cash on Delivery orders, refunds will be processed either to your Bank account (via National Electronic Funds Transfer (NEFT)) or MyPustak Wallet.
                            If you wish to receive the Pay on Delivery order's refund to your bank account, in that case, you need to update us on the details of your bank account as soon as your refund is approved, your order status will reflect as "refund request ".
                            In case if the standard time frame, after your refund is approved from our end has expired and you have not received the refund you can contact us anytime on our helpline number (03341804333).</p>
                        <p className='details-color'><span className='text-color fw-bold'>Note: </span>Refunds will not process in any third-party accounts.</p>
                        <h6 className='text-color fw-bold'>Partial refunds :</h6>
                        <p className='details-color'>
                            There are certain situations where we only grant partial refunds like. Any item not in its original condition is damaged or missing parts for reasons not due to our error.
                        </p>
                        <p className='details-color'>
                            Once your return is received and inspected, we will contact you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If your refund is approved, it will be credited automatically to your original method of payment within a certain amount of days, depending on the time taken by our payment gateway providers and banking channels.
                        </p>
                        <h6 className='text-color fw-bold'>Replacement :</h6>
                        <p className='details-color'>Replacement of any product will only be possible if we have delivered any wrong product or the books we have delivered are not as per the information mentioned on the product details page.
                            If the product delivered is the same as the product information mentioned on the product page at the time of placing the order replacement or return request will not be entertained.</p>
                        <p className='details-color'>How to apply for Return / Replacement / Refund.</p>
                        <p className='details-color'>1. The best way is to make an unboxing video once you receive the product and check the quality properly and other aspects of the order as soon as you receive the shipment. If you are not happy with the product, share us the unboxing video clearly showing the reasons at our WhatsApp helpline number (033-41804333) with your order id and short text to explain the issue you are facing.</p>
                        <p className='details-color'>2. As soon as we receive your query with the unboxing video we will come up with our best solution which may take 24-72 working hours.</p>
                        <p className='details-color'>3. Our policy lasts 7 days from the date of delivery or 15 days from your purchase date any query related to return refund or replacement will not be entertained if any case is not communicated to us within this time frame</p>
                        <p className='details-color'>
                            <span >Replacement: </span><br />
                            We only replace items if they are defective or damaged or not the same as mentioned on the product details page.</p>
                        <p className='details-color'>
                            <scan className='text-color fw-bold'>Contact Us: </scan><br />
                            If you have any questions on how to return/refund and replace you can contact us at our <span onClick={openWhatsapp} style={{ color: 'green', cursor: 'pointer' }}><WhatsAppIcon /></span>

                        </p>
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