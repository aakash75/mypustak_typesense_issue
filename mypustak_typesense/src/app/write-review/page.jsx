/* eslint-disable */
"use client"
import React, { Component } from 'react'
import styles from "../../styles/WriteReview.module.css";
import { withSnackbar } from "notistack";
import { check_if_ordered, get_book_review_product_already_reviewed, save_book_review } from '../../redux/actions/productAction';
import { connect } from 'react-redux';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import MediaQuery from "react-responsive";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Button, CircularProgress } from '@mui/material';
import { url } from '../../helper/api_url';

// export async function getServerSideProps({
//   res,
//   req,
//   query,
//   store,
//   isServer,
//   resolvedUrl,
// }){
//   console.log(Object.keys(query)[1],"serverside query");
//     let book_id = Object.keys(query)[0]
//     // let order_id = Object.keys(query)[0]
//     // const user_data = JSON.parse(localStorage.getItem("user_info"));

//     // let user_id = user_data.id
//     let result = ""
//     let books_details=[]
//     if(book_id.length==8){
//       result = await fetch(
//         `${url}/api/v2/notebook/fetch_notebook/${book_id}`
//       );
//       let response = await result.json();
//       console.log(response,"savereview book");
//       books_details=response.data
//     }
//     else{
//       result = await fetch(
//         `${url}/api/v1/get/product/v2/new/${book_id}/${0}`
//       );
//       let response = await result.json();
//       console.log(response,"savereview book");
//       books_details=response.books_details
//     }
//     // this.setState({
//     //   save_review_book:response.books_details
//     // })

//     // let already_reviewed = await fetch(
//     //   `${url}/api/v2/bookreview/fetch_book_review_by_user_already_reviewed/${book_id}/${order_id}/${user_id}`
//     // );
//     // let already_reviewed_res = await already_reviewed.json();
//     // console.log(already_reviewed_res,"already_reviewed_res")
    


//     return {
//       props: {
//         books_details:books_details
//       },
//     };
// }
export class Page extends Component {
  state={
    rating:null,
    rating_click:null,
    book_description:"",
    review_title:"",
    showQuestions:false,
    save_review_loader:false,
    save_review_book:{},
    review_order_id:"",
    reviewLoader:true,
  }
  // componentDidMount() {
  //   this.setSaveReviewBook()
  //  }
  // componentDidUpdate(prevProps, prevState) {
  //   this.setSaveReviewBook()
  // } 

   setSaveReviewBook = async () => {
    
   }
  componentDidMount() {
    // let order_id = Object.keys(Router.query)[0] 
    // let book_id = parseInt(Object.keys(Router.query)[0])
    let book_id = parseInt(Object.keys(window.location.search)[0])
    if (
      this.props.userComponentStatus == 1 ||
      this.props.userComponentStatus == 0
    ) {
      this.setState({ SkeletonLoader: false, initialLoader: false });
      const getCookieArr = document.cookie.split("; ");
      let Cookie_details = getCookieArr.filter(e => e.startsWith("I="));
      if (Cookie_details.length == 0) {
        this.RedirectLoginPage();
      }
    }
    if(this.props.userComponentStatus == 2){
      // this.setState({
      //   reviewLoader:true
      // })
      const user_data = JSON.parse(localStorage.getItem("user_info"));
      let user_id = user_data.id
      // alert(user_id)
      this.props.check_if_ordered(user_id,book_id).then(res => {
        console.log(res.data,"check_if_ordered in slug");
        let order_id = res.data
        this.setState({
          review_order_id:res.data,
        })
        console.log(order_id,book_id,user_id,"didMount");
        if(order_id){
          this.props.get_book_review_product_already_reviewed(book_id,order_id,user_id)
          this.props.get_book_review_product_already_reviewed(book_id,order_id,user_id)
          .then(res => {
            console.log(res.data,"get_book_review_product_already_reviewed");
            if(res.data.length>0){
              this.setState({
                rating_click:res.data[0].rating[0],
                book_description:res.data[0].description[0],
                review_title:res.data[0].review_title[0]
              })
            }
            this.setState({
              reviewLoader:false,
            })
          })
          .catch(err => {
            this.setState({
              reviewLoader:false,
            })
          })
        }
        else{
          this.setState({
            reviewLoader:false,
          })
        }
      })
      // let user_id = this.props.getuserdetails.id
    }

      // alert(user_id)

   }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props.userComponentStatus !== prevProps.userComponentStatus) {
      if(this.props.userComponentStatus == 2){
    // let book_id = parseInt(Object.keys(Router.query)[0])
        let book_id = parseInt(Object.keys(window.location.search)[0])

        const user_data = JSON.parse(localStorage.getItem("user_info"));
        let user_id = user_data.id
        // alert(user_id)
        this.props.check_if_ordered(user_id,book_id).then(res => {
          console.log(res.data,"check_if_ordered in slug");
          let order_id = res.data
          if(order_id){
            this.setState({
              review_order_id:res.data,
              
            })
            console.log(order_id,book_id,user_id,"didMount");
            this.props.get_book_review_product_already_reviewed(book_id,order_id,user_id)
            this.props.get_book_review_product_already_reviewed(book_id,order_id,user_id)
            .then(res => {
              console.log(res.data,"get_book_review_product_already_reviewed");
              if(res.data.length>0){
                this.setState({
                  rating_click:res.data[0].rating[0],
                  book_description:res.data[0].description[0],
                  review_title:res.data[0].review_title[0],
                })
              }
              this.setState({
                reviewLoader:false,
              })
            })
            .catch(err => {
              this.setState({
                reviewLoader:false,
              })
            })
          }
          else{
            this.setState({
              reviewLoader:false,
            })
          }
      
        })
        // let user_id = this.props.getuserdetails.id
      }
    }
  } 
  RedirectLoginPage = () => {
    // let book_id = Object.keys(Router.query)[0]
    let book_id = Object.keys(window.location.search)[0]

    let BackUrl = `write-review?${book_id}`;
    // localStorage.setItem('BackUrl', BackUrl);
    window.location.replace(`/account/Loginpage?ret=/${BackUrl}`);
  };
  submitReview = () => {
    this.setState({
      save_review_loader:true
    })
    // let order_id = Object.keys(Router.query)[0] 
    // let book_id = Object.keys(Router.query)[0]
    let book_id = Object.keys(window.location.search)[0]
    console.log(book_id);
    
    let body = {
      book_id:book_id,
      user_id:this.props.getuserdetails.id,
      order_id:this.state.review_order_id,
      title:this.state.review_title,
      description:this.state.book_description,
      rating:this.state.rating_click,
      customer_photo:null,
      i_date:Date.now(),
      u_date:Date.now(),
    }
    console.log(body,"submitReview")
    this.props.save_book_review(body)
    .then(res => {
      this.setState({
        save_review_loader:false
      })
      console.log(res,"save book review ");
      if(res.status == 201){
        window.location.replace("/review-books")
      }
      this.props.enqueueSnackbar(`${res.message}`, {
        variant: res.status==201?"success":"error",
      });
      
    })
    .catch(err => {
      this.setState({
        save_review_loader:false,
      })
      console.log(err,"save review err")
      this.props.enqueueSnackbar(`Something went wrong,while saving! Please try again`, {
        variant: "error",
      });
    })
  }
  render() {
    return (
      <div>
      {/* Top part write review Start */}
      <div className={`${styles.writeReview_top_div}`}>
        <h4 className={`${styles.writeReview_h1}`}>Ratings & Review</h4>
       
      </div>
      {/* Top part write review End */}

      {/* Bottom part write review Start */}
      
      <div className={`${styles.writeReview_bottom_div}`}>
      {/* Left part write review Start */}
        <div className={`${styles.writeReview_left_div}`}>
          <div className={`${styles.writeReview_left_div_head}`}>
            <h5>What makes a good review</h5>
            <div className={`${styles.toggleShow}`}>
            {this.state.showQuestions?<KeyboardArrowUpIcon
              onClick={() => {
                this.setState({
                  showQuestions:false
                })
              }}
            />:<KeyboardArrowDownIcon
            onClick={() => {
                this.setState({
                  showQuestions:true
                })
              }}
            />}
            </div>
          </div>
          <div className={`${styles.writeReview_left_div_body}`}>
            <div className={`${styles.writeReview_left_each_div_body}`}>
              <h5 style={{fontSize:"1.1rem"}}>Have you read the book?</h5>
              <div>
                <span style={{fontSize:"0.9rem"}}>Your review should be about your reading experience with the book.</span>
                
              </div>
            </div>
            <div className={`${styles.writeReview_left_each_div_body}`}>
              <h5 style={{fontSize:"1.1rem"}}>Why review a book?</h5>
              <div>
                <span style={{fontSize:"0.9rem"}}>Your valuable feedback will help fellow readers choose a book for themselves!</span>
                
              </div>
            </div>
            <div className={`${styles.writeReview_left_each_div_body}`}>
              <h5 style={{fontSize:"1.1rem"}}>How to review a product?</h5>
              <div>
                <span style={{fontSize:"0.9rem"}}>Your review should include facts about the book. An honest opinion is always appreciated.</span>
                
              </div>
            </div>
          </div>
          {this.state.showQuestions?
          <div className={`${styles.writeReview_left_div_body_mobile}`}>
            <div className={`${styles.writeReview_left_each_div_body}`}>
              <h5>Have you read the book?</h5>
              <div>
                <span>Your review should be about your reading experience with the book.</span>
                
              </div>
            </div>
            <div className={`${styles.writeReview_left_each_div_body}`}>
              <h5>Why review a book?</h5>
              <div>
                <span>Your valuable feedback will help fellow readers choose a book for themselves!</span>
                
              </div>
            </div>
            <div className={`${styles.writeReview_left_each_div_body}`}>
              <h5>How to review a product?</h5>
              <div>
                <span>Your review should include facts about the book. An honest opinion is always appreciated.</span>
                
              </div>
            </div>
          </div>:null
          }
        </div>
      {/* Left part write review End */}

      {/* Right part write review Start */}
      {
        this.state.reviewLoader?
        <div style={{backgroundColor:'#fff',flex:8,marginLeft:"0.5rem",display:"flex",flexDirection:"column",alignItems:'center',justifyContent:"center"}}>
        <CircularProgress/>
        </div>:
        this.state.review_order_id?
        <div className={`${styles.writeReview_right_div}`}>
          <div className={`${styles.right_top_div}`}>
            <div className={`${styles.writeReview_right_div_head}`}>
              <h5>Rate this product</h5>
              <div className={`${styles.star_div}`}>
                
                <div
                title='Very Bad'
                className={`${styles.star_div_each}`}
                onMouseEnter={() => {
                  this.setState({
                    rating:1
                  })
                }}
                onClick={() => {
                  this.setState({
                    rating_click:1
                  })
                }}
                onMouseLeave={() => {
                  this.setState({
                    rating:null
                  })
                }}
                >
                {this.state.rating>=1 || this.state.rating_click>=1?
                <StarIcon
                style={{
                color:"yellow",
                cursor:"pointer"
                }}

                />:
                <StarIcon
                style={{
                color:"#999",
                cursor:"pointer"
                }}
                />}
                </div>
                <div
                className={`${styles.star_div_each}`}
                onMouseEnter={() => {
                  this.setState({
                    rating:2
                  })
                
                }}
                onClick={() => {
                  this.setState({
                    rating_click:2
                  })
                }}
                onMouseLeave={() => {
                  this.setState({
                    rating:null
                  })
                }}
                >
              {this.state.rating>=2 || this.state.rating_click>=2?
                <StarIcon
                  style={{
                color:"yellow",
                cursor:"pointer"
                }}
                />:
                <StarIcon
                style={{
                color:"#999",
                cursor:"pointer"
                }}
                />
                }
                </div>
                <div
                className={`${styles.star_div_each}`}
                onMouseEnter={() => {
                  this.setState({
                    rating:3
                  })
                }}
                onClick={() => {
                  this.setState({
                    rating_click:3
                  })
                }}
                onMouseLeave={() => {
                  this.setState({
                    rating:null
                  })
                }}
                >
                {this.state.rating>=3 || this.state.rating_click>=3?
                <StarIcon
                  style={{
                color:"yellow",
                cursor:"pointer"
                }}
                />:
                <StarIcon
                style={{
                color:"#999",
                cursor:"pointer"
                }}
                />}
                </div>
                <div
                className={`${styles.star_div_each}`}
                onMouseEnter={() => {
                  this.setState({
                    rating:4
                  })
                }}
                onClick={() => {
                  this.setState({
                    rating_click:4
                  })
                }}
                onMouseLeave={() => {
                  this.setState({
                    rating:null
                  })
                }}
                >
                {this.state.rating>=4 || this.state.rating_click>=4?
                <StarIcon
                  style={{
                color:"yellow",
                cursor:"pointer"
                }}
                />:
                <StarIcon
                style={{
                color:"#999",
                cursor:"pointer"
                }}
                />}
                </div>
                <div
  className={`${styles.star_div_each}`}
                onMouseEnter={() => {
                  this.setState({
                    rating:5
                  })
                }}
                onClick={() => {
                  this.setState({
                    rating_click:5
                  })
                }}
                onMouseLeave={() => {
                  this.setState({
                    rating:null
                  })
                }}
                >
                {this.state.rating>=5|| this.state.rating_click>=5?
                <StarIcon
                  style={{
                color:"yellow",
                cursor:"pointer"
                }}
                />:
                <StarIcon
                style={{
                color:"#999",
                cursor:"pointer"
                }}
                />}
                </div>
                <span className={this.state.rating_click==1?"text-danger":this.state.rating_click==2?"text-warning":'text-success'} style={{fontSize:"0.9rem"}}>
                {this.state.rating_click==1?
                "Very Bad":
                this.state.rating_click==2?
                "Bad":
                this.state.rating_click==3?
                "Good":
                this.state.rating_click==4?
                "Very Good":
                this.state.rating_click==5?
                "Excellent":null
                }
                </span>
                {/* <StarBorderOutlinedIcon/>
                <StarBorderOutlinedIcon/>
                <StarBorderOutlinedIcon/>
                <StarBorderOutlinedIcon/> */}
              </div>
              
            </div>
            <div
            className={`${styles.book_div}`} 
            >

<div style={{width:"3rem",height:"4rem"}}>

<img
    style={{
      width: "100%",
      height: "100%",
      // border: "1px solid red",
    }}

    src={this.props.books_details.image?`https://d1f2zer3rm8sjv.cloudfront.net/${this.props.books_details.image}`:`https://d1f2zer3rm8sjv.cloudfront.net/${this.props.books_details.images[0].media_url}`}
    id='cartbookimg'
    onError={e => {
      e.target.onerror = null;
      e.target.src =
        "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
    }}
  />
</div>
<div style={{flex:9,display:'flex',flexDirection:"column",marginLeft:"0.2rem"}}>
<span style={{fontSize:"0.9rem"}}>
{this.props.books_details.title.replace(
              /(\w)(\w*)/g,
              (_, firstChar, rest) =>
                firstChar.toUpperCase() + rest.toLowerCase()
            )}
</span>
{this.props.books_details.author?
  this.props.books_details.author=="NA"||this.props.books_details.author=="na"||this.props.books_details.author=="Na"||this.props.books_details.author==""||this.props.books_details.author==" "?null:
<span style={{fontSize:"0.75rem"}}>By {this.props.books_details.author.replace(
              /(\w)(\w*)/g,
              (_, firstChar, rest) =>
                firstChar.toUpperCase() + rest.toLowerCase()
            )}</span>
            :null}
</div>

</div>
          </div>

          <div className={`${styles.writeReview_right_div_body}`}>
          <h5>Review this product</h5>
          <div className={`${styles.description_div}`}>
          <span style={{fontSize:"0.9rem"}}>Description</span>
            <textarea 
            onChange={(e) => {
              this.setState({
                book_description:e.target.value
              })
            }}
            value={this.state.book_description}
            style={{width:"100%",height:"10rem",border:0,outline:0,fontSize:"0.9rem",marginTop:"0.2rem"}} placeholder='Description....'>

            </textarea>
          </div>
          <div className={`${styles.description_div}`}>
          <span style={{fontSize:"0.9rem"}}>Title(optional)</span>
            <input 
            onChange={(e) => {
              this.setState({
                review_title:e.target.value
              })
            }}
            value={this.state.review_title}
            style={{width:"100%",border:0,outline:0,fontSize:"0.9rem",marginTop:"0.2rem"}} placeholder='Review Title....'>

            </input>
          </div>
          </div>
        <div className={`${styles.button_div}`}>
        <MediaQuery minWidth={577}>
          <Button 
          onClick={this.submitReview}
          style={{textTransform:"capitalize",width:"25%"}} disabled={this.state.rating_click>0?this.state.save_review_loader?true:false:true} variant='contained'>
            <span style={{display:'flex',alignItems:'center'}}>
            {this.state.save_review_loader?<CircularProgress style={{marginRight:"1rem"}} size={18}/>:null}
            Submit
            </span>
          </Button>
        </MediaQuery>
        <MediaQuery maxWidth={576}>
          <Button 
          onClick={this.submitReview}
          style={{textTransform:"capitalize",width:"100%"}} disabled={this.state.rating_click>0?this.state.save_review_loader?true:false:true} variant='contained'>
            <span style={{display:'flex',alignItems:'center'}}>
            {this.state.save_review_loader?<CircularProgress style={{marginRight:"1rem"}} size={18}/>:null}
            Submit
            </span>
          </Button>
        </MediaQuery>
        </div>
        </div>
      :
      <div className={`${styles.writeReview_not_purchased}`}>
      <span className={`${styles.not_puchased_head}`}>Haven't purchased this product or it is not delivered yet?</span>
      <span className={`${styles.not_puchased_body}`}>Sorry! You are not allowed to review this product since you haven't bought it on MyPustak.</span>
      </div>
      }
      </div>
      
      {/* Right part write review End */}
      {/* Bottom part write review End */}


      </div>
    );
  }
}

const mapStateToProps = state => ({
  userToken: state.accountR.token,
  getuserdetails: state.userdetailsR.getuserdetails,
  userComponentStatus: state.accountR.userComponentStatus,
});
export default connect(mapStateToProps, {
  save_book_review,get_book_review_product_already_reviewed,check_if_ordered
})(withSnackbar(Page));