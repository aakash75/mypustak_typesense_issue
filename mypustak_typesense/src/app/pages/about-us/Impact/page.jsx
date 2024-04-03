/* eslint-disable */
"use client"
import React, { Component } from "react"
import Aboutnav from "../../../../components/navbar/Aboutnav"
import Head from "next/head"
import styledDonateBooks from "../../../../styles/DonateBooks.module.css"
import styles from "../../../../styles/Impact.module.css"
class Page extends Component {
  constructor(props) {
    super(props)
    this.animatecard = React.createRef()
  }

  gotodiv = (animatecard) => {
    // alert("hi")
    let scrollToY = 0
    scrollToY = this.animatecard.current.offsetTop - 50
    window.scrollTo(0, scrollToY)
  }
  render() {
    return (
      <div>
        {/* seo code moved to layout.jsx file  */}
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
              <div className={`${styles.history_title1}`}>IMPACT</div>
              <div className={`${styles.history_title2}`}> &quot;We rise by lifting others&quot;</div>
            </div>

            <div className={`${styles.arrowdiv_about}`}>
              <img alt=""
                src="https://d239pyg5al708u.cloudfront.net/uploads/icons/data_image_svg%2Bxml%3B%E2%80%A6_(1).svg"
                className={`${styledDonateBooks.arrow}`}
                onClick={this.gotodiv}
                style={{ width: "3rem", color: "white", }}
              />
            </div>
          </div>

          <div
            className={`${styles.ourstory_content}`}
            id="animatecard"
            ref={this.animatecard}
          >
            <div className={`${styles.ourstory_begins_div}`}>
              <div className={`${styles.begin_title}`}> ENIVORMENTAL IMPACT</div>
              <div className={`${styles.begin_title}`}> “Let’s save our planet!”</div>
              <div className="beginDiv_row first_div row">
                <div className={`${styles.left_begin_content} col-lg-7`}>
                  <div className={`${styles.content_story} ${styles.first_content}`}>
                    <div
                      className={`${styles.commonText}`}>
                      One tree yields enough paper for 62.5 books.
                    </div>
                    Mypustak believes in the reincarnation of books.
                    <br /> We believe in making them immortal and making them live forever.
                    <br />
                    The books that would waste in someone&apos;s house have been reused and given a new life. The life span of books increases when we provide them to our Readers again. We save trees by saving books from getting wasted.
                    
                  </div>
                </div>
                <div className={` ${styles.right_begin_img} col-lg-5`}>
                  <img alt=""
                    src="https://d239pyg5al708u.cloudfront.net/uploads/banner/environmental_impact.png"
                    className={`${styles.save_planet_img}`}
                  />
                </div>
              </div>
            </div>
            {/* end begins  */}

            <div className={`${styles.ourstory_begins_div}`}>
              <div className={`${styles.begin_title}`}> SOCIAL IMPACT</div>
              <div className={`${styles.begin_title}`}>
                {" "}
                “We believe in taking care of each other”{" "}
              </div>
              <div className={`${styles.subheading_title}`}>
                {" "}
                MyPustak supports literacy.
                <br /> We want to be the reader's partner and their first choice.
                <br /> MyPustak is Socially Responsible India's online organization that provides quality-assured Free Books to Readers at their doorstep.
              </div>
              <div className={`beginDiv_row ${styles.second_div} row`}>
                <div className={`${styles.left_begin_content} col-lg-7`}>
                  <div className={`${styles.content_story}`}>
                    <ul style={{ paddingLeft: "1rem" }}>
                      <li className={`${styles.commonList}`} >
                      Some avid readers need more than one book to read. They want to read books from different authors and publications. For anyone, it is too costly to buy 3-4 books on the same subject. We are here to help them by providing free books of as many publications/authors as they want.
                      </li>
                      <li className={`${styles.commonList}`} >
                        {" "}
                        People living on the outskirts want to study but need the proper resources. MyPustak calls out to reach and help them in their education by giving FREE BOOKS at their doorstep.
                      </li>
                      
                      <li className={`${styles.commonList}`}>
                      Also, some people need more money to afford costly books. MyPustak is always here to extend hands to help them by providing quality, assured used books.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={`${styles.right_begin_img} col-lg-5`}>
                  <img alt=""
                    src="https://d239pyg5al708u.cloudfront.net/uploads/banner/social+impact.png"
                    className={`${styles.socialimg}`}
                  />
                </div>
              </div>
            </div>
            {/* end of idea */}

            <div className={`${styles.ourstory_begins_div}`}>
              <div className={`${styles.begin_title}`}> MyPustak Cares</div>
              <div className={`${styles.begin_title}`}> “When we care, we share”</div>
              <div className={`beginDiv_row ${styles.third_div} row`}>
                <div className={`${styles.left_begin_content} col-lg-6`}>
                  <div className={`${styles.content_story}`}>
                  MyPustak considers education as a powerful weapon.
                    <br /> We want to make our country more powerful than ever.
                    <br /> We care for our Donor&apos;s request and user&apos;s demand no
                    matter in which part of India they live, which is why we have become one of the leading Socially Responsible Organisations for FREE BOOKS in India.
                  </div>
                </div>

                <div className={`${styles.right_begin_img} col-lg-6`}>
                  <div style={{ display: "flex" }}>
                    <img alt=""
                      src="https://d239pyg5al708u.cloudfront.net/uploads/banner/we_care_iamge_1.png"
                      className={`${styles.care1_img}`}
                    />
                    <img alt=""
                      src="https://d239pyg5al708u.cloudfront.net/uploads/banner/we_care_image2.png"
                      className={`${styles.care2_img}`}
                    />
                  </div>
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
// 		url: 'https://www.mypustak.com/pages/about-us/Impact'
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
