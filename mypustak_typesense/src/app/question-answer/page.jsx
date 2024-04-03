"use client"
import React, { Component } from 'react'
import { url } from '../../helper/api_url';
import styles from "../../styles/Question.module.css";
import { get_question_product } from '../../redux/actions/productAction';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

// export async function getServerSideProps({
//     res,
//     req,
//     query,
//     store,
//     isServer,
//     resolvedUrl,
//   }){
//     console.log(Object.keys(query)[1],"serverside query");
//       let book_id = Object.keys(query)[0]
//       // let order_id = Object.keys(query)[0]
//       // const user_data = JSON.parse(localStorage.getItem("user_info"));
  
//       // let user_id = user_data.id
//       let result = ""
//       let books_details=[]
//       if(book_id.length==8){
//         result = await fetch(
//           `${url}/api/v2/notebook/fetch_notebook/${book_id}`
//         );
//         let response = await result.json();
//         console.log(response,"savereview book");
//         books_details=response.data
//       }
//       else{
//         result = await fetch(
//           `${url}/api/v1/get/product/v2/new/${book_id}/${0}`
//         );
//         let response = await result.json();
//         console.log(response,"savereview book");
//         books_details=response.books_details
//       }
//       // this.setState({
//       //   save_review_book:response.books_details
//       // })
  
//       // let already_reviewed = await fetch(
//       //   `${url}/api/v2/bookreview/fetch_book_review_by_user_already_reviewed/${book_id}/${order_id}/${user_id}`
//       // );
//       // let already_reviewed_res = await already_reviewed.json();
//       // console.log(already_reviewed_res,"already_reviewed_res")
      
  
  
//       return {
//         props: {
//           books_details:books_details
//         },
//       };
//   }





// export class Page extends Component {
//   state={
//     question_data:[],
//     question_loader:false,
//     question_data_counts:"",
//   }
//   componentDidMount() {
//     let book_id = parseInt(Object.keys(window.location.pathname)[0])
//     console.log(this.props.get_question_product(book_id,0,10));
//     this.props.get_question_product(book_id,0,10).then(res => {
//       this.setState({
//         question_data:res.data,
//         question_loader:false,
//         question_data_counts:res.total_count
//       })
//     })
//     .catch(err => {
//       this.setState({
//         question_loader:false,
//       })
//     })
//    }
//   render() {
//     return (
//       <div>
//         <div className={styles.QAMainDIv}>
//           <div className={styles.QALeftDiv}>
//           <div className={styles.QAImage}>
//               <img
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     // border: "1px solid red",
//                   }}
//                    alt='Question'
//                   src={this.props.books_details.image?`https://d1f2zer3rm8sjv.cloudfront.net/${this.props.books_details.image}`:`https://d1f2zer3rm8sjv.cloudfront.net/${this.props.books_details.images[0].media_url}`}
//                   id='cartbookimg'
//                   onError={e => {
//                     e.target.onerror = null;
//                     e.target.src =
//                       "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
//                   }}
//                 />
//               </div>
//               <div style={{flex:9,display:'flex',flexDirection:"column",marginLeft:"0.2rem"}}>
//               <span style={{fontSize:"0.9rem"}}>
//               {this.props.books_details.title.replace(
//                             /(\w)(\w*)/g,
//                             (_, firstChar, rest) =>
//                               firstChar.toUpperCase() + rest.toLowerCase()
//                           )}
//               </span>
//               {this.props.books_details.author? this.props.books_details.author=="NA"||this.props.books_details.author=="na"||this.props.books_details.author=="Na"||this.props.books_details.author==""||this.props.books_details.author==" "?null:
//               <span style={{fontSize:"0.75rem"}}>By {this.props.books_details.author.replace(
//                             /(\w)(\w*)/g,
//                             (_, firstChar, rest) =>
//                               firstChar.toUpperCase() + rest.toLowerCase()
//                           )}</span>:null}
//               </div>
//           </div>
//           <div className={styles.QARightDiv}>
//             <div style={{display:"flex",borderBottom:"1px solid #ddd",flexDirection:"column"}}>
//             <h4 className='p-2' style={{}}>Question and Answers</h4>
//             <div className={`${styles.mob_book} p-2`}>
//             <div style={{width:"3.5rem",height:"4.75rem"}}>
//               <img
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     // border: "1px solid red",
//                   }}
//                     alt='Question'
//                   src={this.props.books_details.image?`https://d1f2zer3rm8sjv.cloudfront.net/${this.props.books_details.image}`:`https://d1f2zer3rm8sjv.cloudfront.net/${this.props.books_details.images[0].media_url}`}
//                   id='cartbookimg'
//                   onError={e => {
//                     e.target.onerror = null;
//                     e.target.src =
//                       "https://d1f2zer3rm8sjv.cloudfront.net/dumy+book.png";
//                   }}
//                 />
//             </div>
//             <div style={{flex:9,display:'flex',marginLeft:"0.2rem"}}>
//             <span style={{fontSize:"0.9rem"}}>
//             {this.props.books_details.title.replace(
//                           /(\w)(\w*)/g,
//                           (_, firstChar, rest) =>
//                             firstChar.toUpperCase() + rest.toLowerCase()
//                         )}
//             </span>
//             {this.props.books_details.author? 
//             this.props.books_details.author=="NA"||this.props.books_details.author=="na"||this.props.books_details.author=="Na"||this.props.books_details.author==""||this.props.books_details.author==" "?null:
//             <span style={{fontSize:"0.75rem"}}>By {this.props.books_details.author.replace(
//                           /(\w)(\w*)/g,
//                           (_, firstChar, rest) =>
//                             firstChar.toUpperCase() + rest.toLowerCase()
//                         )}</span>:null}
//             </div>
//             </div>
//             </div>
//             <div >
//               {this.state.question_data.map((question,index) => (
//                 <div key={index} className="p-2" style={{display:"flex",flexDirection:"column",fontSize:"0.9rem",gap:"0.5rem",borderBottom:"1px solid #ddd"}}>
//                   <b>Q: {question.question}</b>
//                   <span>A: {question.answer}</span>
//                   </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   userToken: state.accountR.token,
//   getuserdetails: state.userdetailsR.getuserdetails,
//   userComponentStatus: state.accountR.userComponentStatus,
// });
// export default connect(mapStateToProps, {
//   get_question_product
// })(withSnackbar(Page));


// import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page