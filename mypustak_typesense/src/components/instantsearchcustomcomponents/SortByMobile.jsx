import { Button, IconButton } from '@mui/material';
import React from 'react'
import CloseIcon from "@mui/icons-material/Close";

// import { connectSortBy } from 'react-instantsearch';
import { useSortBy } from 'react-instantsearch';
import { useRouter, } from "next/navigation";
// function SortByMobile({ items, refine,isRefined, createURL,setSortbyDrawer,urltopush }) {
function CustomSortByMobile(props) {

  const { currentRefinement, options, refine } = useSortBy(props);
  const {items} = props
  console.log(props , "props14")
  const router = useRouter()
  return (
    <div style={{fontSize:'0.89rem',display:'flex',flexDirection:'column',marginBottom:'0.5rem'}}>
      {/* <CustomStats/> */}
      
      {/* <div style={{borderBottom:'1px solid #ddd',color:'#666',padding:'0.5rem',paddingLeft:'1rem',marginBottom:'0.5rem',fontSize:'1.1rem' , display:'flex', }}>
        <div>
        Sort By
        </div>
        <div>
        <IconButton
                                     
            onClick ={props.onClose}
            style={{
            background: "#fff",
            // padding: "0.35rem",
            borderRadius: "50%",
            position: "absolute",
            zIndex: 1000,
            top: 0,
            right: 10,
            opacity: 0.8,
            padding:'0.5rem',
            marginTop:"0.5rem"
            }}
        >
            <CloseIcon fontSize="" style={{ color: "#000" }} />
        </IconButton>
        </div>
      </div> */}
      {items.map((item,index) => (
        <div
        key={index}
        onClick={event => {
          event.preventDefault();
          refine(item.value);
          // alert(item.isRefined)
          // setTimeout(() => {
          //   router.push(urltopush,undefined,{scroll:false})
          // }, 1000);
          // if(item.isRefined){
          // }
          // console.log(urltopush,'urltopush');
          // Router.push(urltopush,undefined,{scroll:false})
          // if(urltopush){
          // }
          // else{
          //   window.location.reload()
          //   setFilterDrawer(false);
          // }
          // dont remove!!! waiting for url change
          // if(item.isRefined){
          // }
          // setTimeout(() => {
          //   window.location.reload()
          // },1000)
          // setSortbyDrawer(false)
        }}
        style={{marginLeft:'1rem',marginRight:'1rem',padding:'0.28rem 0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <span style={{fontSize:'1rem'}}>{item.label}</span>
          <input 
          onChange={event => {
                event.preventDefault();
                // alert("ji")
                refine(item.value);
                // alert('hi')
                // if(item.isRefined){
                //   window.location.reload()
                // }
              // dont remove!!! waiting for url change
                // setTimeout(() => {
                //   window.location.reload()
                // },1000)
                // setSortbyDrawer(false)
              }}
          checked={item.value == currentRefinement? true:false} 
          type={"radio"}/>
        </div>
          // <Button 
          //   size='small'
          //   key={item.value}
          //   href={createURL(item.value)}
          //   variant={item.isRefined ? 'contained':'outlined'}
          //   style={{ width:'10rem',textTransform:'capitalize',margin:'0.2rem 0',cursor:'pointer',color: item.isRefined ? '#fff' : '',marginRight:"1rem",border: item.isRefined ? '2px solid #2248AE' : '' }}
          //   onClick={event => {
          //     event.preventDefault();
          //     refine(item.value);
          //     // setSortbyDrawer(false)
          //   }}
          // >
          //   {item.label}
          // </Button> 
      ))}
    </div>
  )
}
// const CustomSortByMobile = connectSortBy(SortByMobile);

export default CustomSortByMobile