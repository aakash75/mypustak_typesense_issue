"use client"
import React, { Component } from 'react'
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Link from "next/link";
import Head from "next/head";
import styles from "../../../styles/AboutUs.module.css"
class page extends Component {
    state = {
        openmenu: false,
      };
      closemenu = () => {
        this.setState({ openmenu: !this.state.openmenu });
      };
      gotodiv = animatecard => {
        // alert("hi")
        let scrollToY = 650;
    
        window.scrollTo(0, scrollToY);
      };
      render() {
        return (
          <div className='About_maindiv'>
            {/* seo code moved to layout.jsx  */}
              {/* <Head>
                <title> {this.props.title_tag}</title>
                <meta
                  name='Description'
                  property='og:description'
                  content={this.props.meta_description}
                />
                <meta name="title" content={this.props.title_tag}/>
                <meta name="description" content={this.props.meta_description}/>
    
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={this.props.og_url}/>
                <meta property="og:title" content={this.props.title_tag}/>
                <meta property="og:description" content={this.props.meta_description}/>
                <meta property="og:image" content='https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo.png'/>
    
              </Head> */}
    
            <div className={`${styles.about_upper}`}>
              <div className={`${styles.about_upper_content}`}>
                <div className={`${styles.upper_content_menu}`}>
                  <ul className={`${styles.menulists}`}>
                    <li onClick={() => { window.location.replace("/") }}>Home</li>
                    <li onClick={this.closemenu}>
                      <span
                        className={`${styles.menu}`}>
                        {" "}
                        Menu
                      </span>
                      <span>
                        <MenuIcon />
                      </span>
                    </li>
                  </ul>
                </div>
                <div className={`${styles.upper_content_img}`}>
                  <div>
                    <img
                      alt=''
                      src={`https://d239pyg5al708u.cloudfront.net/uploads/icons/MyPustakLogo..png`}
                    />
                  </div>
                  <div className={`${styles.first_text}`}>
                    {" "}
                    An effort made for the happiness of others
                  </div>
                  <div className={`${styles.second_text}`}>
                    &quot;Let&apos;s Not Believe In Income, But Outcome&quot;
                  </div>
                </div>
    
                <div className={`${styles.arrowdiv_about}`}>
                  <img
                    alt=''
                    src='https://d239pyg5al708u.cloudfront.net/uploads/icons/data_image_svg%2Bxml%3B%E2%80%A6_(1).svg'
                    className={`${styles.arrow}`}
                    onClick={this.gotodiv}
                    style={{ width: "3rem", color: "white" }}
                  />
                </div>
              </div>
              {/* end of upper content */}
    
              <div className={`${styles.Lower_content}`}>
                <div
                  className={`${styles.lower_content_data_new}`}
                  style={{ margin: "0px" }}>
                  <div className={`${styles.image1}`}>
                    <Link href='/pages/about-us/history' legacyBehavior>
                        <div className={`${styles.overlayimage}`}>
                          <h1>Our Story</h1>
                        </div>
              
                    </Link>
                  </div>
                  <div className={`${styles.image2}`}>
                    <Link href='/pages/about-us/OurCommitment' legacyBehavior>
                
                        <div className={`${styles.overlayimage}`}>
                          <h1>Our Commitment</h1>
                        </div>
                  
                    </Link>
                  </div>
                </div>
                <div className={`${styles.lower_content_data_new}`} style={{ margin: "0px" }}>
                  <div className={`${styles.image3}`}>
                    <Link href='/pages/about-us/Impact' legacyBehavior>
                  
                        <div className={`${styles.overlayimage}`}>
                          <h1>Impact</h1>
                        </div>
                
                    </Link>
                  </div>
                  <div className={`${styles.image4}`}>
                    <Link href='/pages/about-us/free-book-theory' legacyBehavior>
                 
                        <div className={`${styles.overlayimage}`}>
                          <h1>Free Book Theory</h1>
                        </div>
                    
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <SwipeableDrawer
              anchor='right'
              open={this.state.openmenu}
              onClose={this.closemenu}
              style={{ border: "1px solid blue", zIndex: "3000" }}>
              <div className={`${styles.sidedrawer_div}`}>
                <ul>
                  <Link href='/pages/about-us/history' legacyBehavior>
                  
                      <li>Our Story</li>
           
                  </Link>
                  <Link href='/pages/about-us/Impact' legacyBehavior>
                 
                      <li>Our Impact</li>
                 
                  </Link>
                  <Link href='/pages/about-us/OurCommitment' legacyBehavior>
                   
                      <li>Our Commitment</li>
                 
                  </Link>
                  <Link href='/pages/about-us/free-book-theory' legacyBehavior>
                 
                      <li>Free Book Theory</li>
            
                  </Link>
                </ul>
              </div>
            </SwipeableDrawer>
    
            <style jsx>{`
              a {
                text-decoration: none;
              }
             
            `}</style>
          </div>
        );
      }
    }
    
    
    // export async function getServerSideProps(context) {

    //   const body = {
    //         url: 'https://www.mypustak.com/pages/about-us'
    //     };
    //   const seo_res = await fetch(`https://api.mypustak.com/api/v1/seo_tags/seo-data`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(body)
    
    //   })
    //   const seo_data = await seo_res.json()
    
    //   let title_tag = ""
    //   let meta_description = ""
    //   if(seo_data.title_tag){
    //     title_tag = seo_data.title_tag
    //     meta_description = seo_data.meta_desc
        
    //   }
    //   else{
    //     title_tag = 'free books online |used books online India !'
    //     meta_description = 'Only online free books used bookstore . Delivering in all pincodes in India. Providing fast delivery. 100% Quality assured. Engineering, medical, government jobs, novels, olympiad, school, children, university and many more books available.'
    //   }
    //   console.log(title_tag ,"||", meta_description)
    
    
    
    //   return {
    //     props: {
    //       title_tag,meta_description,
    //       og_url:'https://www.mypustak.com/free-books'
    //     }
    //   }
    // }
export default page

