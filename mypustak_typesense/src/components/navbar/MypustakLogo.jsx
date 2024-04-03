import Image from "next/legacy/image";
import Link from 'next/link';
import React from 'react'
import styles from "../../styles/WLoginNavbar.module.css"
import smlogo from "../../assets/mypustak_100_px.svg";

const MypustakLogo = () => {


  return (
    <div className=" max-w-[130px] rounded-full p-1 bg-white">
    <div className={`${styles.logoMainDiv} relative`}>
   <Link href="/">
   
        <Image
          alt="MyPustak.com"
          src={smlogo}
          sizes="100vw"
          layout="fill"

          objectFit='contain'
          title='MyPustak.com'
          height={0}
          width={0}
          style={{
            width: "fit-content",
            maxHeight: "1rem",
            textAlign: "center",
          }}

        /></Link>
    </div>
    </div>
  )
}

export default MypustakLogo