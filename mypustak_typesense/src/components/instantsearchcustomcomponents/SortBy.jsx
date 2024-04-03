import React from 'react'
// import { connectSortBy } from 'react-instantsearch';
import { useSortBy } from 'react-instantsearch';

// function SortBy({ items, refine, createURL }) {

function CustomSortBy(props) {
  const { currentRefinement, options, refine,canRefine ,initialIndex} = useSortBy(props);

  const {items} = props

  console.log(  currentRefinement , "sortby current", canRefine)
  console.log( initialIndex , "sortby itemspppppppppppppp",)
    
  return (
    <div style={{fontSize:'0.89rem',padding:"0.2rem 0.2rem"}}>
      <span style={{marginRight:'1rem'}}>Sort By</span>
      {items.map(item => (
          <span
            key={item.value}
            // style={{ cursor:'pointer',color: item.isRefined ? '#2248AE' : '',marginRight:"1rem",borderBottom: item.isRefined ? '2px solid #2248AE' : '' }}
            style={{ cursor:'pointer',color: item.value == currentRefinement ? '#2248AE' : '',marginRight:"1rem",borderBottom: item.value == currentRefinement ? '2px solid #2248AE' : '' ,fontWeight: item.value == currentRefinement ? 'bold' : 'normal'}}
            
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
// const CustomSortBy = connectSortBy(SortBy);

export default CustomSortBy