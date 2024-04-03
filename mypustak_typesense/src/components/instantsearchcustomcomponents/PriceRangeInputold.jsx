import { Button } from '@mui/material'
import React, { useState } from 'react'
import { connectRange } from 'react-instantsearch'

function PriceRangeInput({ currentRefinement, min, max, precision, refine }) {
    const [minstate, setminstate] = useState(min)
    const [maxstate, setmaxstate] = useState(max)
  return (
    <div>

    <form onSubmit={(e) => {
        e.preventDefault()
        refine({
          ...currentRefinement,
          min: minstate,
          max:maxstate,
        })
      }} style={{margin:'0.3rem 0.8rem 0.5rem 0rem',border:'1px solid #ddd',padding:'0.5rem 0.2rem',textAlign:'center',display:'flex',alignItems:"center",justifyContent:'space-between'}}>
        <input
          type='number'
          min={min}
          max={max}
          style={{width:'28%',height:'1.75rem',fontSize:'0.8rem',marginLeft:'0.2rem'}}
  
          step={1 / Math.pow(10, precision)}
          value={minstate || ""}
          onChange={event =>
            setminstate(event.currentTarget.value)
            
          }
        />
        {" - "}
        <input
          type='number'
          min={min}
          max={max}
          style={{width:'28%',height:'1.75rem',fontSize:'0.8rem'}}
          step={1 / Math.pow(10, precision)}
          value={maxstate || ""}
          onChange={event =>
            setmaxstate(event.currentTarget.value)
            
          }
        />
        <Button type='submit' style={{textTransform:"capitalize",margin:'0.3rem 0.5rem',fontSize:'0.8rem',minWidth:'1.2rem'}} variant="contained" size='small' >Go</Button>
      </form>
    </div>
  )
}
const CustomRangeInput = connectRange(PriceRangeInput);

export default CustomRangeInput