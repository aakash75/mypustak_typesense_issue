"use client"
import React, { Component } from "react"
import Aboutnav from "../../../../components/navbar/Aboutnav"
import Head from "next/head"
import DonateBooks from "../../../../styles/DonateBooks.module.css"
import styles from "../../../../styles/FreeBookTheory.module.css"
import Link from "next/link";

class FreeBookTheory extends Component {
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
        {/* seo code moved to layout .jsx file in same folder  */}
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
              <div className={`${styles.history_title1}`}> FREE BOOK THEORY</div>
              <div className={`${styles.history_title2}`}>
                {" "}
                &quot; All good that we do is just for you. &quot;
              </div>
            </div>

            <div className={`${styles.arrowdiv_about}`}>
              <img
                alt=""
                src="https://d239pyg5al708u.cloudfront.net/uploads/icons/data_image_svg%2Bxml%3B%E2%80%A6_(1).svg"
                className={`${DonateBooks.arrow}`}
                onClick={this.gotodiv}
                style={{ width: "3rem", color: "white" }}
              />
            </div>
          </div>

          <div
            className={`${styles.ourstory_content}`}
            id="animatecard"
            ref={this.animatecard}
          >
            <div className={`${styles.ourstory_begins_div}`}>
              <div
                className={`${styles.begin_title}`}
                style={{ fontSize: "1.5rem", color: "#007bff" }}
              >
                We love to work throughout the journey, from collecting books, <br />
                maintaining them for a long time, and delivering them to needy readers again.

              </div>

              <div className={`${styles.begin_title}`} style={{ paddingTop: "2rem" }}>
                Our Avid Readers
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img alt=""
                  src="https://d239pyg5al708u.cloudfront.net/uploads/banner/avid+readers+(1).png"
                  className={`${styles.title_avid_img}`}
                />
              </div>
              <div className="beginDiv_row first_div row">
                <div className={`${styles.avid_title_content} col-12`}>
                Knowledge is a powerful weapon that everyone should have to change the world, <br />
                following that the books at MyPustak are available for every citizen of India.
                </div>
                <div className={`${styles.begin_title} col-12`}>
                  How to get books and be benefited?
                </div>
                <div className={`${styles.left_begin_content} col-lg-7`}>
                  <div className={`${styles.content_story}`}>
                    <div
                      className={`${styles.commonText}`}
                      style={{ padding: "1rem 0rem" }}
                    >
                      <div></div>
                      To avail this opportunity of FREE BOOKS from MyPustak, you need to follow the following three steps:

                      <ol style={{ marginLeft: "0rem", padding: "1rem" }}>
                        <li>Signup yourself at
                            <Link style={{ textDecoration: 'none' }} href="/" prefetch={false} legacyBehavior>
                            MyPustak.com
                          </Link></li>
                        <li>
                        Search your books and order them by paying only for Shipping and Handling charges.
                        </li>
                        <li>
                        Receive your books within 4-7 working days at your doorstep.
                        </li>
                      </ol>
                      <div className={`${styles.commonText}`}>
                      No matter how much the donated book&apos;s original price is, you will receive the book at your doorstep in a well-maintained condition FREE OF COST.
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.right_begin_img} col-lg-5`}>
                  <img alt=""
                    src="https://d239pyg5al708u.cloudfront.net/uploads/banner/how+to+order.png"
                    className={`${styles.avid_reader_img}`}
                  />
                </div>
              </div>
            </div>
            {/* end begins  */}

            <div className={`${styles.ourstory_begins_div}`}>
              <div className={`${styles.begin_title}`}>
                {" "}
                Why do we take shipping and handling charges?
              </div>
              <div className={`beginDiv_row ${styles.second_div} row`}>
                <div className={`${styles.left_begin_content} col-lg-7`}>
                  <div className={`${styles.content_story} ${styles.shippingContent}`}>
                  We believe in our user&apos;s satisfaction more than anything.{" "}
                    <br />
                    We consider you our priority, so we provide you with Pre-loved books in the best possible condition. <br />
                    We are working 24*7 to get you quality-assured books on time.
                    <div style={{ padding: "1rem 0rem" }}></div>
                  </div>
                </div>
                <div className={`${styles.right_begin_img} col-lg-5`}>
                  <img alt=""
                    src="https://d239pyg5al708u.cloudfront.net/uploads/banner/why+shipping.png"
                    className={`${styles.shipping_handling_img}`}
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.ourstory_begins_div}`}>
              <div className={`beginDiv_row ${styles.second_div} row`}>
                <div className={`${styles.left_begin_content} col-lg-6`}>
                  <div className={`${styles.content_story}`}>
                    <div
                      className={`${styles.commonText} ${styles.heading2}  `}  >
                      {" "}
                      What is Shipping?
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img alt=""
                        className={`${styles.shipping_img}`}
                        src="https://d239pyg5al708u.cloudfront.net/uploads/banner/shipping.png"
                      />
                    </div>
                    <div className={`${styles.commonText}`}>
                    We have the best logistics working for us and you. The shipping part not only includes the shipment of books from MyPustak Warehouse to your home, but it also includes shipment for receiving the books from donors who can reside anywhere across India.
                    </div>
                    <div style={{ padding: "1rem 0rem" }}></div>
                  </div>
                </div>
                <div className={`${styles.left_begin_content} col-lg-6`}>
                  <div className={`${styles.content_story}`}>
                    <div
                      className={`${styles.commonText} ${styles.heading2}  `} >
                      {" "}
                      What is Handling?
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img alt=""
                        className={`${styles.handling_img}`}
                        src="https://d239pyg5al708u.cloudfront.net/uploads/banner/handling.png"
                      />
                    </div>
                    <div className={`${styles.commonText}`}>
                      The handling part covers the expenses on the quality
                      standards of services and books we deliver, development
                      and innovation in technology, storage infrastructures as
                      well as other allied expenditures.In this way, the
                      shipping and handling charge includes a lot of work that
                      goes on behind just two words.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* end of idea */}

            <div className={`${styles.begin_title}`} style={{ fontSize: "1.5rem" }}>
              {" "}
              The total allied cost is called Shipping and Handling. <br />
              The books are FREE, and we mean it!
            </div>
            <div className={`${styles.begin_title}`} style={{ paddingTop: "1rem" }}>
              Our Proud Donors
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <img alt=""
                className="donor_avid"
                src="https://d239pyg5al708u.cloudfront.net/uploads/banner/avid_donors-removebg-preview.png"
                style={{ width: "", margin: "1rem 0rem" }}
              />
            </div>
            <div
              className={`${styles.commonText}`}
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                paddingTop: "1rem",
              }}
            >
              {" "}
              Happiness doesn&apos;t result from what we get but from what we give.
            </div>
            <div className={`${styles.ourstory_begins_div}`}>
              <div className={`${styles.begin_title}`} style={{ paddingTop: "1rem" }}>
                Who can donate?
              </div>
              <div className={`beginDiv_row ${styles.third_div} row`}>
                <div className={`${styles.left_begin_content} col-lg-7`}>
                  <div className={`${styles.content_story}`}>
                    <div className={`${styles.commonText}`}>
                      {" "}
                      We should never hoard knowledge, We should always share it.
                    </div>
                    <div className={`${styles.commonText}`}>
                    MyPustak is very proud to onboard every book donor across India. We welcome you to this fantastic journey of giving life to your used books and guiding them to destiny.
                    </div>
                    <div
                      className={`${styles.commonText}`}
                      style={{ padding: "1rem 0rem" }}
                    >
                      How to place donation Request:
                      <ol style={{ padding: "1rem" }}>
                      <li>Signup yourself at <Link
                        href="/donate-books"
                        prefetch={false}
                        style={{textDecoration:'none'}}
                        legacyBehavior>MyPustak.com</Link></li>
                        <li>
                        Please fill out the Donation Form with the required information and submit it.
                        </li>
                        <li>
                        MyPustak will arrange the pick-up for you from your doorstep.
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className={`${styles.right_begin_img} col-lg-5`}>
                  <img alt=""
                    className={`${styles.how_Donate_img}`}
                    src="https://d239pyg5al708u.cloudfront.net/uploads/banner/how+to+donate.png"
                  />
                </div>
              </div>
            </div>

            {/* End  */}

            <div className={`${styles.normal_content}`}>
            Our mission is to create an ecosystem where no reader in our nation is left to complete education due to the affordability or scarcity of books. Moreover, No book should waste only by lying idle on the bookshelves, since books are made to spread knowledge but not to get dusted on the bookshelves for years and end up for recycling.
              <div
                className={`${styles.commonText}`}
                style={{ padding: "1rem 0rem", fontWeight: "bold" }}
              >
                The only dream that  Team MyPustak has seen till now is of the day when each student or reader of India won&apos;t have to think about the procurement of the book before buying it.
              </div>
            </div>

            <div className={`${styles.ourstory_begins_div}`}>
              <div className={`${styles.begin_title}`}>The available pick-up options:-</div>
              <div className={`beginDiv_row ${styles.fourth_div} row`}>
                <div className={`${styles.left_begin_content} col-lg-12`}>
                  <div className={`${styles.content_story}`}>
                    <div className={`${styles.avail_pick}`}>
                      <div>
                        <img alt=""
                          className={`${styles.paid_pick_img}`}
                          src="https://d239pyg5al708u.cloudfront.net/uploads/banner/paid+pickup+(1).png"
                        />
                        <div className={`${styles.pickup_text}`}>

                          <b>Paid pickup</b>
                          <br />
                          Donor pays the logistic cost of their book pickup
                          service.
                        </div>
                      </div>

                      <div>
                        <div>
                          <img alt=""
                            className={`${styles.freePick_img}`}
                            src="https://d239pyg5al708u.cloudfront.net/uploads/banner/free+pickup.png"
                          />
                        </div>
                        <div className={`${styles.pickup_text}`}>
                          <b> Free Pickup</b>
                          <br /> MyPustak pays the logistic cost for the book pickup service.
                        </div>
                      </div>

                      <div>
                        <div>
                          <img alt=""
                            className={`${styles.selfship_img}`}
                            src="https://d239pyg5al708u.cloudfront.net/uploads/banner/se%3Bf+ship.png"
                          />
                        </div>
                        <div className={`${styles.pickup_text}`}>
                          <b>Self Ship</b> <br />
                          You may also choose to deliver your books to our
                          address.
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${styles.commonText}`}
                      style={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      Why Paid Pickups?
                    </div>
                    <div
                      className={`${styles.commonText}`}
                      style={{ padding: "1rem 0rem", textAlign: "center" }}
                    >
                      We give our best efforts to arrange paid pickups within 72 hours of form filling.
                      <br /> Moreover, it helps the readers to get their books at reduced shipping and handling charges.
                    </div>
                    <div
                      className={`${styles.commonText}`}
                      style={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      Why Free Pickups?
                    </div>

                    <div
                      className={`${styles.commonText}`}
                      style={{ padding: "1rem 0rem", textAlign: "center" }}
                    >
                      Free Pickups are arranged on a ‘first come, first serve.’
                      <br />
                      basis with the same service with our best efforts to reach all our donors.
                    </div>
                    <div
                      className={`${styles.commonText}`}
                      style={{ padding: "1rem 0rem", textAlign: "center" }}
                    ></div>

                    <div
                      style={{
                        padding: "1rem 0rem",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img alt=""
                        className={`${styles.freebook_last}`}
                        src="https://d239pyg5al708u.cloudfront.net/uploads/banner/freebook+theory+(1).png"
                      />
                    </div>

                    <div className={`${styles.last_word_story}`}>
                    After receiving your donated books, our team segregates the books and makes only those books available to readers
                      <br />
                      that fulfills the Book Condition Guidelines, while the rest of the books will be sent for recycling.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* end */}
          </div>
        </div>

        <style jsx>
          {`
            @import url("https://fonts.googleapis.com/css2?family=Kameronanddisplay=swap");
          `}
        </style>
      </div>
    );
  }
}

// export async function getServerSideProps(context) {
  
//   const body = {
// 		url: 'https://www.mypustak.com/pages/about-us/free-book-theory'
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
export default FreeBookTheory

