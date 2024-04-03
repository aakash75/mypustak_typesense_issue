import React, { useEffect, useState } from 'react'
import { unbox_Search } from '../../redux/actions/unboxAction'
import { connect } from 'react-redux'
import styles from "../../styles/BookSuggestion.module.css"
import { withSnackbar } from 'notistack'
import BookCard from '../bookcard/BookCard'

function BookSuggestionUnbxdbyQuery(props) {
    const [products, setproducts] = useState([])
    useEffect(() => {
        let body = {
            uid:Unbxd.readCookie(Unbxd.cookies.userId),
            page:0,
            rows:5,
        }
        props.unbox_Search(props.query,body).then(res => {
            console.log(res.response.products,"searchRes");
            setproducts(res.response.products)
        })
    },[])
    
  return (
    <div>
    {products?
    <div style={{padding:0}}>
    <div className={styles.titleDiv}>
            <span className={styles.title}>{props.title}</span>{" "}
            <span className={styles.viewmore}
            onClick={() => {
                window.location.assign("/search?value=" + props.query);
              }}
            >View More</span>
          </div>
      
      <div style={{overflowX:'hidden',borderLeft:'1px solid #ddd'}} 
      className='row row-cols-2 bg-white row-cols-sm-3 row-cols-md-3 row-cols-lg-5 g-0'>
        {products.map(aD => (
        <div key={aD.book_id} className='col'>
          <BookCard Booktitle={aD.title} book={aD} price={aD.price} 
          categories={aD.author!="na"?aD.author:aD.publication!="na"?aD.publication:null} image={aD.imageUrl[0]}/>
        </div>
        ))}
      </div>
      
    </div>:null
    }
    </div>
  )
}


const mapStateToProps = state => {
    return {
    Unbxd_products: state.unboxReducer.Unbxd_products,

    };
  };

export default connect(mapStateToProps, {
    unbox_Search
})(withSnackbar(BookSuggestionUnbxdbyQuery));