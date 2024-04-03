import React from 'react'
// import { connectNumericMenu } from 'react-instantsearch';
import { connectNumericMenu } from 'instantsearch.js/es/connectors';


function NumericMenuMobile({ items, refine, createURL }) {
  return (
    <div>
      {items.map(item => (
        <div key={item.value}
        style={{width:"max-content",display:'flex',alignItems:'baseline',}}
        onClick={event => {
          event.preventDefault();
          refine(item.value);
        }}
        >
            <input checked={item.isRefined} style={{marginRight:'5px'}} type={'radio'}/>
          <span
            href={createURL(item.value)}
            style={{ textTransform:'capitalize',fontSize:'0.88rem',cursor:'pointer',fontWeight: item.isRefined ? 'bold' : '' }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
const CustomNumericMenuMobile = connectNumericMenu(NumericMenuMobile);
export default CustomNumericMenuMobile