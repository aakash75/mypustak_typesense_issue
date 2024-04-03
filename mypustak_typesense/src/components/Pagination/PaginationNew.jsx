import React from 'react'
import Pagination from '@mui/material/Pagination';
const PaginationNew = ({ totalItems, itemsPerPage, onclick }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handleChange = (event, value) => {
    onclick(value);
  };
  return (
    <div style={{ display:"flex",justifyContent:"center"}}>
       
      <Pagination variant="outlined" color="primary" size='large' onChange={handleChange} count={totalPages} />
    

    </div>
  )
}

export default PaginationNew