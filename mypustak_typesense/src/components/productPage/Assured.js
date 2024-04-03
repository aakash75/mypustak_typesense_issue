import { border } from '@mui/system'
import Image from "next/legacy/image"

import React from 'react'
import asssued_img from '../../assets/assuredLogo.png'

function Assured() {
    return (
        <React.Fragment>
            <div className='assured_maindiv'>
                <div className='rounded_div'>
                    {/* <div className='image'>

                    </div> */}
                    <Image alt='assured' className='image' src={asssued_img} />

                </div>
                <div className='rectangle_div'>

                </div>

            </div>

            <style jsx>
                {`
                .assured_maindiv{
                    height: 37px;
                    width: 122.60784149169922px;
                    left: 630.39208984375px;
                    top: 10.5px;
                    border-radius: 0px;
                    border:1px solid blue;
                    display:flex;
                    align-items: center;
                    
                }
                .rounded_div{
                    height: 37px;
                    width: 37px;
                    left: 2.17578125px;
                    top: 0px;
                    border-radius: 0px;
                    background: linear-gradient(90deg, #2157AD 0%, #6190DA 100%),
                    linear-gradient(0deg, #484848, #484848),
                    linear-gradient(0deg, #FFFFFF, #FFFFFF);
                    border: 2px solid;
                    // position: absolute;
width: 37px;
height: 37px;
left: -14.82px;
top: 1.5px;

background: #FFFFFF;

                    // border-image-source: linear-gradient(90deg, #2157AD 0%, #6190DA 100%),
                    // linear-gradient(0deg, #484848, #484848);
                    // border:1px solid green;
                }
                .image{
               

                    // position: absolute;
                    // width: 37px;
                    // height: 23.22px;
                    left: 0px;
                    top: 4.35px;

                    background-image: url('https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png');
                    filter: drop-shadow(0px 0.72549px 1.45098px rgba(0, 0, 0, 0.25));
                }
                .rectangle_div{
                    height: 20.313724517822266px;
                    width: 94.31372833251953px;
                    left: 28.296875px;
                    top: 7.98046875px;
                    border-radius: 14.50980281829834px;
                    border:1px solid black;
                    

                }

                `}
            </style>

        </React.Fragment>
    )
}

export default Assured
