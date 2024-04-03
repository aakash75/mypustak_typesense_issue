import React from 'react'
// import { connectNumericMenu } from 'react-instantsearch';
// import { connectNumericMenu } from 'instantsearch.js/es/connectors';

import { useNumericMenu } from 'react-instantsearch';


// function NumericMenu({ items, refine, createURL }) {
function CustomNumericMenu(props) {
  
  const { items, refine, createURL } = useNumericMenu(props);

  
  // const { items, refine } = useNumericMenu(props);
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
            <input id={`${item.value+item.label}`} checked={item.isRefined} style={{marginRight:'5px'}} type={'radio'}/>
          <label
          htmlFor={`${item.value+item.label}`}
            href={createURL(item.value)}
            style={{ textTransform:'capitalize',fontSize:'0.75rem',cursor:'pointer',fontWeight: item.isRefined ? 'bold' : '' }}
          >
            {item.label}
          </label>
        </div>
      ))}
    </div>
  )
}
// const CustomNumericMenu = connectNumericMenu(NumericMenu);
export default CustomNumericMenu