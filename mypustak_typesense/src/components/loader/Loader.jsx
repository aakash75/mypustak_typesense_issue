import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CustomLoader from '../CustomLoader/CustomLoader'
import CustomLoaderBorder from '../CustomLoader/CustomLoaderBorder'

function Loader() {
  return (
    <div>
        <Backdrop
        
        sx={{  backgroundColor: '#fff',zIndex:'1000',opacity:0.5 }}
        style={{opacity:'0.98'}}
        open={true}
        // onClick={handleClose}
        >
            <CustomLoaderBorder size="60px"/>
        </Backdrop>
    </div>
  )
}

export default Loader