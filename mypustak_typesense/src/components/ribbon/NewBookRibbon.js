import React from 'react'
import BookIcon from '@mui/icons-material/Book';
function NewBookRibbon(props) {
  return (
    <div>
        <div className='mainRibbon' style={props.style}>
            <span className='ribbonIcon'><BookIcon style={{color:'#E0EEF8'}}/></span>
            <span className='ribbonText'>NEW BOOK</span>
        </div>
        <style jsx>
            {`
            .mainRibbon{
                width: 102px;
                box-sizing: border-box;
                height: 25px;
                background: #2157AD;
            }
            .mainRibbon{
                border-radius-top-left:25px
            }
            .ribbonText{
                line-height: 14px;
                color: #FFFFFF;
                font-family: 'Roboto';
                font-style: italic;
                font-weight: 900;
                width: 64px;
                height: 14px;
                font-size: 12px;
            }
            .ribbonIcon{
                border-radius:50px;
                width: 25px;
                height: 25px;
                left: 2px;
                top: 2px;
                background: #2157AD;
            }
            
            `}
        </style>
    </div>
  )
}

export default NewBookRibbon