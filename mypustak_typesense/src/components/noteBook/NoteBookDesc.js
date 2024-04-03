import React, { useEffect } from 'react'
import styles from "../../styles/Product.module.css";
import ReactHTMLParser from  "react-html-parser";
function NoteBookDesc({description}) {
    useEffect(() => {
    console.log(description,"description");
    }, [])
    
    if(!description){
        return null
    }
  return (
    <div className={`${styles.description}`}>

        {ReactHTMLParser(description)}
        
    </div>
  )
  {/* <p
      className={`${styles.description}`}
      style ={{fontSize:"0.9rem"}}
      dangerouslySetInnerHTML={{
      __html: 
          description
      ,
  }}></p> */}
}

export default NoteBookDesc