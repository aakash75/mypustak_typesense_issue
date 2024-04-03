import React from 'react'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { connectInfiniteHits, connectSearchBox, connectStats } from 'react-instantsearch';
import { connectAutoComplete } from 'react-instantsearch';
import SearchIcon from '@mui/icons-material/Search';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import BookCard from '../bookcard/BookCard';
import BookCardSkeleton from '../bookcard/BookCardSkeleton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const Stats = ({ nbHits }) => <span style={{textTransform:'capitalize'}}>Show all {nbHits} results</span>;
const CustomStats = connectStats(Stats);
const Autocomplete = ({searchResults, found,hits, currentRefinement, refine }) =>{
  const hasResults = searchResults && searchResults.nbHits !== 0;
  const nbHits = searchResults && searchResults.nbHits;
  const Router=useRouter()
  return(
   
     <div>
         {/* <input
           type="search"
           value={currentRefinement}
           onChange={event => refine(event.currentTarget.value)}
         /> */}
         {currentRefinement.length>0?
         <div style={{position:'absolute',zIndex:100,borderRadius:'5px',backgroundColor:'#fff',width:"27.5rem"}}>
           {hits.map(hit => (
             <div key={hit.book_id} onClick={() => {
              Router.push(`/search?value=${hit.title}`)
             }} style={{alignItems:'center',margin:0,padding:0}} className='searchDiv row g-0'>
               <SearchIcon className='col-2' fontSize='small' style={{justifySelf:'flex-start',fontSize:'1.1rem',margin:0,padding:0}}/>
               <p className='col-8' style={{margin:'0rem 0',padding:'0.5rem 0rem',textTransform:'capitalize',fontSize:'0.8rem'}} key={hit.book_id}>{hit.title.length>75?hit.title.substring(0, 75).concat('...'):hit.title},{hit.author}</p>
             <CallMadeIcon className='col-2' fontSize='small' style={{fontSize:'1.1rem'}}/>
             </div>
           ))}
           <Button size='small' fullWidth variant='outlined' ><CustomStats/></Button>
         </div>:null
         }
         <style jsx>
          {`
          .searchDiv:hover{
            background-color: #f2f3f5;
            cursor:pointer;
          }`}
         </style>
     </div>
   );
}
  
  const CustomAutocomplete = connectAutoComplete(Autocomplete);

  const ArrangeData = ({ hits,hasPrevious,refinePrevious,hasMore,refineNext }) => {
    const [datalength, setdatalength] = useState(1)
    let inStockData = []
    let outofstockData= []
    let skeletonCount = [];
    for(let i = 0; i <= 20; i++){
      skeletonCount[i] = i;
    }
    let allData = []
    const loadData = () => {
      refineNext()
      if(hasMore){
        setdatalength(datalength+1)
      }
    }
    hits.map(hit => {
        if(hit.is_out_of_stack=="n"){
          inStockData.push(hit)
        }
        else{
          outofstockData.push(hit)
        }
        allData = inStockData.concat(outofstockData)

    })
    return(
      hits.length==0?<div>
        <div style={{borderLeft:'1px solid #ddd',borderRight:'1px solid #ddd'}} className='row g-0'>
        {skeletonCount.map(s => {
          return(
            <div key={s} className='col-6 col-sm-4 col-md-4 col-lg-3'>
              <BookCardSkeleton/>
            </div>
          )
        })}
        </div>
      </div>:
    <div>
        {/* <input
          type="search"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
        /> */}
        <InfiniteScroll
        className = "search-page"
        next={loadData}
        dataLength={datalength}
        scrollThreshold="30%"
        hasMore={hasMore}
        >
        <div style={{borderLeft:'1px solid #ddd',borderRight:'1px solid #ddd'}} className='row g-0'>
          {allData.map(aD => (
            <div key={aD.book_id} className='col-6 col-sm-4 col-md-4 col-lg-3'>
              <BookCard Booktitle={aD.title} book={aD} price={aD.price} 
              categories={aD.author!="na"?aD.author:aD.publication} image={aD.thumb}/>
            </div>
            // <p key={aD.book_id}>{aD.title},{aD.is_out_of_stack}</p>
          ))}
        </div>
        </InfiniteScroll>
        {/* <button disabled={!hasMore} onClick={refineNext}>
          Show more
        </button> */}
    </div>
  )}

 export const CustomSearchHits = connectInfiniteHits(ArrangeData);
function CustomSearchBox({hits, currentRefinement, refine,value }) {
  useEffect(() => {
    if(value){
      if(value.length>0){
        refine(value)
      }
    }
  }, [value])
  
  return (
      <div>
        <div>
          <div style={{display:"flex",flexDirection:"column",justifyContent:'center'}}>
              <div style={{display:"flex",alignItems:'center'}}>
              <input
                  className="searchInput"
                  placeholder="Search for books by title, author, Publication or ISBN "
                  value={currentRefinement}
                  onChange={(event) => refine(event.currentTarget.value)}
                  />
                  <button className="searchButton">
                  <SearchOutlinedIcon style={{ color: "#fff" }} />
                  </button>
              </div>
                  <CustomAutocomplete/>
                  
          </div>
          
        </div>
        <style jsx>
            {`
            
            .searchInput {
                width: 28.063rem;
                height: 2rem;
                border-radius: 8px 0px 0px 8px;
                border: none;
                focus:none;
              }
              textarea:focus, input:focus{
                outline: none;
            }            
              .searchButton {
                width: 4rem;
                height: 2rem;
                margin: 5px 0;
                border: none;
                background-color: #ff723b;
                box-shadow: 2px 1px 1px rgba(255, 255, 255, 0.1);
                border-radius: 0px 7px 7px 0px;
                margin-left: -8px;
              }
              .searchButton:hover {
                background: #ff5e1f;
              }
            `}
        </style>
      </div>
  )
}
const SearchBox = connectSearchBox(CustomSearchBox);
export default SearchBox