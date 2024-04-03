import React from 'react'
import { connectSortBy } from 'react-instantsearch';

function SortBy({ items, refine, createURL }) {
  return (
    <div style={{fontSize:'0.89rem',fontWeight:'bold',padding:"0.2rem 0.2rem"}}>
      <span style={{marginRight:'1rem'}}>Sort By</span>
      {items.map(item => (
          <span
            key={item.value}
            style={{ cursor:'pointer',color: item.isRefined ? '#2248AE' : '',marginRight:"1rem",borderBottom: item.isRefined ? '2px solid #2248AE' : '' }}
            onClick={event => {
              event.preventDefault();
              refine(item.value);
            }}
          >
            {item.label}
          </span>
      ))}
    </div>
  )
}
const CustomSortBy = connectSortBy(SortBy);

export default CustomSortBy