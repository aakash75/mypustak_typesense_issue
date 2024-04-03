import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
// import { connectCurrentRefinements } from 'react-instantsearch';
import { useClearRefinements } from 'react-instantsearch';
import CancelIcon from "@mui/icons-material/Cancel";

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconButton } from '@mui/material';

function CustomClearRefinementsMob(props) {
   const { canRefine, refine } = useClearRefinements(props)
   const {setvalue,closeshowautofun} = props;
  return (
    <div>
    {/* <button className='clearButton' onClick={() => items.length?refine(items):window.scroll(120,120)} >
      {items.length?<ClearIcon fontSize='small'/>:<ArrowDownwardIcon fontSize='small'/>} {items.length?"Clear all Filters":"Apply Filters"}
    </button> */}
{/* 
{canRefine?<button disabled={!canRefine} onClick={refine} className='clearButton'>
      Clear refinements
    </button>:null} */}


<IconButton
    type='button'
    sx={{ p: "10px" }}
    onClick={() => {
      // refine()
      
      setvalue("");
      closeshowautofun(false)
    }}
    aria-label='search'>
    <CancelIcon style={{ color: "#777" }} />
  </IconButton>
    <style jsx>
      {`
      .clearButton{
        cursor:pointer;
        border:none;
        color:#fff;
        font-family:Roboto;
        font-weight: 400;
        font-size: 0.85rem;
        background:  linear-gradient(90deg, #2157AD 0%, #6190DA 100%);
        border-radius: 4.18446px;
        padding:5px 15px;
      }
      
      `}
    </style>
    </div>
  )
}
// const CustomClearRefinements = connectCurrentRefinements(ClearRefinements);
export default CustomClearRefinementsMob