"use client"

/* eslint-disable */
import React, { Component } from "react"
import Aboutnav from '../../../../components/navbar/Aboutnav'
import Head from "next/head"
import DonateBooks from "../../../../styles/DonateBooks.module.css"
import styles from "../../../../styles/History.module.css"
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
            <div className= {`${styles.Title}`}>
              <div className={`${styles.history_title1}`}>OUR STORY</div>
              <div className={`${styles.history_title2}`}> kitaabon ki Asli Duniya </div>
              <div className={`${styles.history_title3}`}>
                “An effort made for the happiness of others, lifts us above
                ourselves.”
              </div>
            </div>

            <div className={`${styles.arrowdiv_about}`}>
              <img alt=""
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
              <div className={`${styles.begin_title}`}>… And How it All Began</div>
              <div className="beginDiv_row first_div row">
                <div
                  className={`${styles.left_begin_content} col-lg-7`}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className={`${styles.content_story}`}>
                  A few years ago, MyPustak was founded in Kolkata to fill the gap between individuals who already own books (have-ones) and those who need books (have-nots). That soon became India's leading Socially Responsible Online Book Store to provide quality assured Pre-Owned Books for free to Readers of India.

                    <div
                      className={`${styles.commonText}`}
                      style={{ padding: "1rem 0rem" }}
                    >
                      The platform achieved this by providing books of every category, educational books, novels, children's books, self-help, or any genre, to readers for free everywhere across the country. In these years, with respect, we have given our best efforts to welcome every book Donor and guide their books to readers across the nation.
                    </div>
                  </div>
                </div>
                <div className={`${styles.right_begin_img} col-lg-5`} style={{}}>
                  <img alt=""
                    src="https://d239pyg5al708u.cloudfront.net/uploads/banner/STORY+1.png"
                    className={`${styles.story_image1}`}
                  />
                </div>
              </div>
            </div>
            {/* end begins  */}

            <div className={`${styles.ourstory_begins_div}`}>
              <div className={`${styles.begin_title} ${styles.alter_tiltle}`}> Idea Plantation</div>
              <div className={`beginDiv_row ${styles.second_div} row`}>
                <div className={`${styles.left_begin_content} col-lg-8`}>
                  <div className={`${styles.content_story} ${styles.Idea_div_content}`}>
                    {/* <div className="image_layer"> */}On a regular day, a
                    major problem of the society came into the mind of the
                    Founder that 80% of India’s Readers are residing in small
                    towns and so they do not have adequate resources to complete
                    their studies.
                    <div className={`${styles.commonText}`}>
                      {" "}
                      Books are an important partner in the journey of
                      education, but it costs around 33% of total education
                      costs to an individual.
                    </div>
                    <div
                      className={`${styles.commonText}`}
                      style={{ padding: "1rem 0rem" }}
                    >
                      <div className={`${styles.commonText}`}>
                        So, why not create an ecosystem for those having books and
                        those who desire to have books?
                      </div>{" "}
                      When new books get printed with high prices in the market
                      at the same time the same books lie in the bookshelves of
                      various people around many places without any use. So the
                      gap between Readers and books can be filled by joining the
                      hands of the book Donors, technology and book readers.
                    </div>
                    <div
                      className={`${styles.commonText}`}
                      style={{ padding: "1rem 0rem" }}
                    >
                      <div className={`${styles.commonText}`}>
                        {" "}
                        So did The MyPustak! Believing knowledge is not for
                        saving but it should be for sharing, the journey began.
                      </div>
                      An online platform was created which not only just connect
                      the Donors and Readers across India but also, be with them
                      throughout the journey of all those reading years and help
                      them with all available best resources to make these books
                      present at the right place using our Art of technology,
                      India wide chain of logistics facility and pool of
                      volunteers and Donors community countrywide.
                      <div className={`${styles.commonText}`}>
                        People are now able to get books at FREE OF COST. And
                        this is how MyPustak planted the seed of Books, which
                        later becomes the bridge connecting the book Donors and
                        book readers.
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
                <div className={`${styles.right_begin_img} col-lg-4`}>
                  <img alt="" src="https://d239pyg5al708u.cloudfront.net/uploads/banner/story+2.png" className={`${styles.root_image}`} />
                </div>
              </div>
            </div>
            {/* end of idea */}

            <div className={`${styles.ourstory_begins_div}`}>
              <div className={`${styles.begin_title}  ${styles.alter_title2}`}>
                {" "}
                Penetrating The Roots
              </div>
              <div className={`beginDiv_row ${styles.third_div} row`}>
                <div className={`${styles.left_begin_content} col-lg-8`}>
                  <div className={`${styles.content_story}`}>
                  We love technology and have a firm belief that technology can solve some genuine problems. So we started creating an online platform where Donors and Readers come in one place.
                    <div
                      className={`${styles.commonText}`}
                      style={{ padding: "1rem 0rem" }}
                    >
                      But soon, we realized there was much more to do behind the screen. So from day one, we have made our Mantra to "keep the entire model as transparent as possible for Donors and 100% quality assurance for Readers".
Since all those years, our passionate team members have given their best efforts to keep the organization's Mantra growing and prospering.
                      <div className={`${styles.commonText}`}>
                        Since all those years our entire passionate team members
                        are giving their best efforts to keep the organization
                        mantra grow and prosper.
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${styles.right_begin_img} col-lg-4`}>
                  <img alt=""
                    src="https://d239pyg5al708u.cloudfront.net/uploads/banner/STORY+3.png"
                    className={`${styles.root_image}`}
                  />
                </div>
              </div>
            </div>

            {/* End  */}

            <div className={`${styles.ourstory_begins_div}`}>
              <div className={`${styles.begin_title}`}> The Journey </div>
              <div className={`beginDiv_row ${styles.fourth_div} row`}>
                <div className={`${styles.left_begin_content} col-lg-12`}>
                  <div className={`${styles.content_story}`}>
                  The best gift we receive almost every day is our Proud Donors' appreciation, their firm support, and applause for our work and the effort we are giving. In addition, the genuine smile and satisfaction on the Readers' faces that we receive every time in the form of social media reviews and emails in our inbox. It helps us keep fuelled up to work tirelessly for this noble project.
                    <div
                      className={`${styles.commonText}`}
                      style={{ padding: "1rem 0rem" }}
                    >
                      Each day MyPustak is getting connected with unique and Proud Donors. People from different states join with MyPustak, carried forward to the Reader's door across India.
                    </div>
                    <div
                      className={`${styles.commonText}`}
                      style={{ padding: "1rem 0rem", paddingTop: "0rem" }}
                    >
                      We started the journey by providing and serving various Readers residing in Kolkata, our base city. Now we are reaching with Free-Books to 100% pin codes of India where Readers want to get their books, be it Andaman, Nicobar, or some remote village in Jammu Kashmir. MyPustak is always here to educate you with books you like to read.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* end */}

            <div className={`${styles.ourstory_begins_div}`}>
              <div className={`${styles.begin_title}`}> Miles To Go </div>
              <div className="beginDiv_row fifth_div row">
                <div className={`${styles.left_begin_content} col-lg-7`}>
                  <div className={`${styles.content_story}`}>
                  We are on a mission to create an ecosystem where no Reader in the country is left to complete their education due to the affordability issue and unavailability of books.<br/> 
                  No books could get wasted by lying idly on the bookshelves since books are made to spread knowledge but not to get dusted in the bookshelves for years and end up for recycling.
                    <div
                      className={`${styles.commonText}`}
                      style={{ padding: "1rem 0rem", paddingTop: "0rem" }}
                    >
                      The only dream that MyPustak has seen till now is of the day when each student or Reader of India won't have to think about the procurement of the book before wanting it.
                    </div>
                  </div>
                </div>

                <div className={`${styles.right_begin_img} col-lg-5`}>
                  <img alt=""
                    className={`${styles.mile_image}`}
                    src="https://d239pyg5al708u.cloudfront.net/uploads/banner/story+4.png"
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.last_word_story}`}>
            We want to assure the Readers of India that &quot;You are just one click away from your books!&quot;
            </div>
          </div>


        </div>

        <style jsx>
          {`
            @import url("https://fonts.googleapis.com/css2?family=Kameronanddisplay=swap");
          `}
        </style>
      </div>
    )
  }
}



// export async function getServerSideProps(context) {

//   const body = {
// 		url: 'https://www.mypustak.com/pages/about-us/history'
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
