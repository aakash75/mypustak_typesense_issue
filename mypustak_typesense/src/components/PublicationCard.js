import React, { useState } from 'react'
import styleBookCard from "../styles/BookCard.module.css";
import Image from "next/legacy/image";
import publisherIcon from "../assets/authorIcon.svg";

function PublicationCard(props) {
    const propimage = props.image;
    const src = propimage.includes("https://d1f2zer3rm8sjv")?propimage:`https://d1f2zer3rm8sjv.cloudfront.net/${propimage}`;
    const [pubHover, setpubHover] = useState(false)
  return (
      <div>
          
                <div 
                onMouseEnter={() => {
                  setpubHover(true)
                }}
                onMouseLeave={() => {
                  setpubHover(false)
                }}
                onClick={() => {
                    let slug = props.book.title.split(" ").join("-");
                    const url = `${slug}`;
                    const encodedUrl = encodeURIComponent(url);
                    window.open(`/publication/books-${encodedUrl}`);
                  }}
                style={{alignItems:"center",display:"flex",flexDirection:"column",margin:"0.5rem 0",gap:"0.5rem",cursor:"pointer"}}>
                  <div  style={{padding:"2rem",border:"1px solid #555",borderRadius:"50%",width:"10rem",height:"10rem",transform:pubHover?"scale(1.04) translate(0px)":null,transition:"0.25s",zIndex:10}}>
                      <Image
                      title={props.Booktitle}
                          alt='use boo'
                          className={``}
                          height={100}
                          width={100}
                          
                          layout='responsive'
                          src={publisherIcon}
                      />
                  </div>

                  <span
                      onClick={() => {
                      let slug = props.book.title.split(" ").join("-");
                      const url = `${slug}-${props.book.isbn}`;
                      const encodedUrl = encodeURIComponent(url);
                      window.open(`/product/${encodedUrl}?${props.book.bookId?props.book.bookId:props.book.book_id}`);
                      // location.reload();
                      }}
                      title={props.Booktitle}
                      // className={`${styleBookCard.bookTitle}`}
                      style={{textAlign:"center"}}
                      >
                      {props.Booktitle.length > 30
                      ? props.Booktitle.replace(
                          /(\w)(\w*)/g,
                          (_, firstChar, rest) =>
                          firstChar.toUpperCase() + rest.toLowerCase()
                      )
                          .substring(0, 30)
                          .concat("...")
                      : props.Booktitle.replace(
                          /(\w)(\w*)/g,
                          (_, firstChar, rest) =>
                          firstChar.toUpperCase() + rest.toLowerCase()
                      )}
                  </span>
                </div>
      </div>
  );
}

export default PublicationCard