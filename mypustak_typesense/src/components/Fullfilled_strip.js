import React, { Component } from 'react';
import styles from "../styles/Fullfilled_strip.module.css";
import Image from "next/legacy/image";


export default class Fullfilled_strip extends Component {
  render() {
    return (
      <div> 
        <div className={styles.tag}>
            <span style ={styles.image_tag}>
                <Image
                alt='MyPustak.com'
                height={25}
                width={25}
                src='https://d239pyg5al708u.cloudfront.net/uploads/icons/mypustak_logo.svg'  
                />
            </span>
            <span style ={{fontWeight:'bold' , fontSize:'0.9rem'}}>&nbsp; Fulfilled</span>
        </div>
      </div>
    );
  }
}
