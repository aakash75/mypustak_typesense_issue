"use client"
import React, { Component } from 'react'
import styles from "../../styles/WriteReview.module.css";
import { orderdetails } from '../../redux/actions/orderAction';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { fetch_books_not_reviewed } from '../../redux/actions/productAction';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import moment from 'moment';


export class Page extends Component {
    state = {
        NotReviewData:[],
        NotReviewLoader:true,
        rating:[],
        rating_click:[],
    }
    componentDidMount() {
        
        // this.props.orderdetails(0)
        const user_data = JSON.parse(localStorage.getItem("user_info"));
        let user_id = user_data.id
        
        this.props.fetch_books_not_reviewed(user_id)
        this.props.fetch_books_not_reviewed(user_id)
            .then(ress => {
                console.log(ress,"OrderData");
              this.setState({ NotReviewData: ress.data,NotReviewLoader:false });
            })
            .catch(errr => {
                console.log(errr,"OrderData err")
                this.setState({
                    NotReviewLoader:false
                })
            //   this.setState({ error_page: true });
            });
     }
    componentDidUpdate(prevProps, prevState) {
        if(this.state.rating != prevState.rating){

        }
    } 
  render() {
    return (
        <div className={`${styles.review_book_main}`}>
          <div className={`${styles.review_book_head}`}>
              <h4 style={{margin:0,padding:0}}>Review your purchased books</h4>
          </div>
          <div className={`${styles.review_book_body}`}>
          {
              this.state.NotReviewLoader?
              <div style={{display:'flex',alignItems:'center',justifyContent:"center",height:"20rem",justifySelf:"center",width:"100%"}}>
              <CircularProgress/>
              </div>:
              this.state.NotReviewData.length?
          this.state.NotReviewData.map(order => {
              return (
                  <div key={order.order_id} className={`${styles.map_main_div}`}>
                  <div className={`${styles.image_div}`}>
                  <div style={{width:"6.5rem",height:"8rem"}}>
                      <img
                          style={{
                          width: "100%",
                          height: "100%",
                          // border: "1px solid red",
                          }}
                          alt='books'
                          src={`https://d1f2zer3rm8sjv.cloudfront.net/${order.image}`}
                          id='cartbookimg'
                          onError={e => {
                          e.target.onerror = null;
                          e.target.src =
                              "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
                          }}
                      />
                  </div>
                  </div>
                  <div className={`${styles.data_div}`}>
                  <div style={{display:"flex",flexDirection:'column'}}>
                      <span style={{fontSize:"0.8rem"}}>{order.book_title.length>35?order.book_title.substring(0,35).concat("...").replace(
                  /(\w)(\w*)/g,
                  (_, firstChar, rest) =>
                      firstChar.toUpperCase() + rest.toLowerCase()
                  ):order.book_title.replace(
                  /(\w)(\w*)/g,
                  (_, firstChar, rest)=>
                      firstChar.toUpperCase() + rest.toLowerCase()
                  )}</span>
                      <span style={{fontSize:"0.8rem"}}>
                          Ordered On : {moment.unix(order.order_date).format("MMM Do YY")}
                      </span>
                  </div>
                  <div style={{justifySelf:'flex-end'}}>
                  
                  <Button 
                  onClick={() => {
                  window.location.replace(`/write-review?${order.book_id}`);
                  }}
                  style={{textTransform:"capitalize",marginTop:"0.5rem"}} 
                  size="small"
                  variant='outlined'>
                  <span style={{display:'flex',alignItems:'center',gap:"0.5rem",color:"#2248ae"}}>
                  {/* {this.state.save_review_loader?<CircularProgress style={{marginRight:"1rem"}} size={18}/>:null} */}
                  <StarIcon fontSize="small"/> Rate Product
                  </span>
                  </Button>
                  </div>
                  </div>

                  </div>
              );
          }):
          <div style={{display:'flex',alignItems:'center',justifyContent:"center",height:"20rem",justifySelf:"center",width:"100%"}}>
              <span style={{fontSize:"1.5rem"}}>Thanks! All Books Reviewed!</span>
          </div>
          }
          </div>
        </div>
    );
  }
}


const mapStateToProps = state => ({
    userToken: state.accountR.token,
    getorderdetails: state.orderdetailsR.getorderdetails,
  });
  export default connect(mapStateToProps, {
    fetch_books_not_reviewed
  })(withSnackbar(Page));