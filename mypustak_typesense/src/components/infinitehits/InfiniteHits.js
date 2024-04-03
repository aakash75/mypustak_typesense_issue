import React, { Component } from 'react';
import { connectInfiniteHits } from 'react-instantsearch';
import PropTypes from 'prop-types';
import BookCard from '../bookcard/BookCard';
import { connectHits } from 'react-instantsearch';

const ArrangeData = ({ hits, currentRefinement, refine }) => {
    let inStockData = []
    let outofstockData= []
    let allData=[]
    let bothData = []
    allData = allData.concat(hits)
    // if(allData.length>200){
    // }

    console.log(allData,"ALLDATA");
    console.log(hits,"HITS");
    allData.map(hit => {
        if(hit.is_out_of_stack=="n"){
          inStockData.push(hit)
        }
        else{
          outofstockData.push(hit)
        }
        
        bothData = inStockData.concat(outofstockData)
    })
    return(
    <div>
        {/* <input
          type="search"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
        /> */}
        <div style={{borderLeft:'1px solid #ddd',borderRight:'1px solid #ddd'}} className='row g-0'>
          {bothData.map(aD => (
            <div key={aD.book_id} className='col-6 col-sm-4 col-md-4 col-lg-2'>
              <BookCard Booktitle={aD.title} book={aD} price={aD.price} categories={aD.author} image={aD.thumb}/>
            </div>
            // <p key={aD.book_id}>{aD.title},{aD.is_out_of_stack}</p>
          ))}
        </div>
    </div>
  )}
  const CustomHits = connectHits(ArrangeData);

class InfiniteHits extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    hasMore: PropTypes.bool.isRequired,
    refineNext: PropTypes.func.isRequired,
  };

  sentinel = null;

  onSentinelIntersection = entries => {
    const { hasMore, refineNext } = this.props;

    entries.forEach(entry => {
      if (entry.isIntersecting && hasMore) {
        refineNext();
      }
    });
  };

  componentDidMount() {
    this.observer = new IntersectionObserver(this.onSentinelIntersection);

    this.observer.observe(this.sentinel);
  }

  componentWillUnmount() {
    this.observer.disconnect();
  }

  render() {
    const { hits } = this.props;

    return (
      <div className="ais-InfiniteHits">
        <ul className="ais-InfiniteHits-list">
          <CustomHits/>
          <li
            className="ais-InfiniteHits-sentinel"
            ref={c => (this.sentinel = c)}
          />
        </ul>
      </div>
    );
  }
}

export default connectInfiniteHits(InfiniteHits);




