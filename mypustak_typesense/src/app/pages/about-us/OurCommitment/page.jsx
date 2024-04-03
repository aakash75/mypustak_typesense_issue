/* eslint-disable */
"use client"
import React, { Component } from "react"
import Aboutnav from "../../../../components/navbar/Aboutnav"
import Head from "next/head"
import DonateBooks from "../../../../styles/DonateBooks.module.css"
import styles from "../../../../styles/OurCommitment.module.css"
class Page extends Component {
  constructor(props) {
    super(props)
    this.animatecard = React.createRef()
  }
  gotodiv = (animatecard) => {
    let scrollToY = 0
    scrollToY = this.animatecard.current.offsetTop - 50
    window.scrollTo(0, scrollToY)
  }
  render() {
    return (
      <div>
        {/* seo code moved to layout.jsx file in same folder  */}
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
        <div className= {`${styles.maindiv_history}`}>
          <div className=   {`${styles.history_upper}`}>
            <Aboutnav />
            <div className={`${styles.Title}`}>
              <div className={`${styles.history_title1}`}>OUR COMMITMENT</div>
            </div>

            <div className={`${styles.arrowdiv_about}`}>
              <img alt=""
                src="https://mypustak-5.s3.ap-south-1.amazonaws.com/uploads/icons/data_image_svg%2Bxml%3B%E2%80%A6_(1).svg"
                className={`${DonateBooks.arrow} ${styles.arrowDiv}`}
                onClick={this.gotodiv}
              />
            </div>
          </div>
          <div
            className={`${styles.ourstory_content}`}
            id="animatecard"
            ref={this.animatecard}
          >
            <div className={`${styles.ourstory_begins_div}`}>
              <div className={`${styles.begin_title}`}>Aim</div>
              <div className={`${styles.begin_title}`}>
                &quot;When, the why is clear, How is easy.&quot;
              </div>
              <div className="beginDiv_row first_div row">
                <div className={`${styles.left_begin_content} col-lg-8`}>
                  <div className={`${styles.content_story}`}>
                  Knowledge is the most powerful weapon that one can have. We aim to make India more powerful by sharing the gift of knowledge from those who have it with those who need it. We want to assure Indian Readers:
                    <div className={`${styles.alertText}`}>
                      &quot;You are just one click away from your books!&quot;
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.right_begin_img} col-lg-4`}
                  style={{ padding: "0rem" }}
                >
                  <img alt=""
                    src="https://mypustak-5.s3.ap-south-1.amazonaws.com/uploads/banner/aim-removebg-preview.png"
                    className={`${styles.aim_img}`}
                  />
                </div>
              </div>
            </div>
            {/* end begins  */}
            <div className={`${styles.ourstory_begins_div}`}>
              <div className={`${styles.begin_title}`}>Vision</div>
              <div className={`${styles.begin_title}`}>
                {" "}
                Vision with action makes a powerful reality
              </div>
              <div className={`beginDiv_row ${styles.second_div} row`}>
                <div className={`${styles.left_begin_content} col-lg-7`}>
                  <div className={`${styles.content_story}`}>
                  To provide the users with the experience that will bind them with MyPustak forever. We want their first choice for donating books, buying books, and gaining their trust.
                  </div>
                </div>
                <div className={`${styles.right_begin_img} col-lg-5`}>
                  <img alt="" src="https://mypustak-5.s3.ap-south-1.amazonaws.com/uploads/banner/vishion-removebg-preview.png" />
                </div>
              </div>
            </div>
            {/* end of idea */}
            <div className={`${styles.ourstory_begins_div}`}>
              <div className={`${styles.begin_title}`}>Mission</div>
              <div className={`${styles.begin_title}`}>
                Eyes on the stars, feet on the ground
              </div>
              <div className={`beginDiv_row ${styles.third_div} row`}>
                <div className={`${styles.left_begin_content} col-lg-7`}>
                  <div className={`${styles.content_story}`}>
                  Believing in the outcome rather than income is what we see. MyPustak is committed to providing books to everyone across every possible part of the country. We want to be the cause of literacy. To guide Donor's Books to the Reader's destiny is our business.
                  </div>
                </div>

                <div className={`${styles.right_begin_img} col-lg-5`}>
                  <img alt="" src="https://mypustak-5.s3.ap-south-1.amazonaws.com/uploads/banner/mission-removebg-preview.png" />
                </div>
              </div>
            </div>

            {/* End  */}
          </div>
        </div>

        <style jsx>
          {`
            @import url("https://fonts.googleapis.com/css2?family=Kameron&display=swap");
          `}
        </style>
      </div>
    )
  }
}


// export async function getServerSideProps(context) {
  
//   const body = {
// 		url: 'https://www.mypustak.com/pages/about-us/OurCommitment'
// 	};
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
export default Page
