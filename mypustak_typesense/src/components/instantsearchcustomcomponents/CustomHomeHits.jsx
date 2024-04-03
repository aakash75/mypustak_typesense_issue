import React, { useEffect, useState } from 'react';
import { useInfiniteHits } from 'react-instantsearch';
import { useInstantSearch } from 'react-instantsearch';

import BookCard from '../bookcard/BookCardNew';
import BookCardSkeleton from '../bookcard/BookCardSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';

function CustomHomeHits(props) {
  const { hits, sendEvent, showPrevious, showMore, isFirstPage, isLastPage } =
    useInfiniteHits(props);
    const { status } = useInstantSearch();


    const [datalength, setdatalength] = useState(1);
    const [hitsState, sethitsState] = useState([])

    useEffect(() => {
        sethitsState([]),
        sethitsState(hits)
      }, [hits])

    let allData = []
    let inStockData = []
    let outofstockData= []
    let skeletonCount = [];


    for(let i = 0; i <= 12; i++){
        skeletonCount[i] = i;
      }
    const loadData = () => {
     
          showMore()
          setdatalength(datalength + 1);
        
      };



    hitsState.map(hit => {
    if(hit.isOutOfStock=="n"){
        inStockData.push(hit)
    }
    else{
        outofstockData.push(hit)
    }
    allData = inStockData.concat(outofstockData)

    })
  return (
 

    status === 'loading' || status === 'stalled'?
        <div>
        <div style={{borderLeft:'1px solid #ddd',borderRight:'1px solid #ddd',}} className='row g-0'>
        {skeletonCount.map((s,index) => {
        return(
        <div key={index} className='col-6 col-sm-4 col-md-4 col-lg-2 '>
            <BookCardSkeleton/>
        </div>
        )
        })}
        </div>
        </div>:
        <div style={{padding:0}}>
                <div style={{overflowX:'hidden',borderLeft:'1px solid #ddd',}} 
                     className='row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-5 g-0'>

{allData.map(aD => (
      <div key={aD.book_id} className='col'>
        <BookCard Booktitle={aD.title} book={aD} price={aD.price} 

        categories={aD.author!="na"?aD.author:aD.publication} image={aD.thumb}/>
      </div>
      // <p key={aD.book_id}>{aD.title},{aD.is_out_of_stack}</p>
      ))}
            </div>
       
        </div>
  );
}

export default CustomHomeHits;