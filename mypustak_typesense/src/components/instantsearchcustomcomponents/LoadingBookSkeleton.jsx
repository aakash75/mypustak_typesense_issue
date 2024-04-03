import { useInstantSearch } from 'react-instantsearch';
import BookCardSkeleton from '../bookcard/BookCardSkeleton';

function LoadingBookSkeleton() {
    const { status } = useInstantSearch();
  
    if (status === 'loading' || status === 'stalled') {
      (
        <div className='row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-5 g-0'>
        <div className='col'>
              <BookCardSkeleton/>
        </div>
        <div className='col'>
              <BookCardSkeleton/>
        </div>
        <div className='col'>
              <BookCardSkeleton/>
        </div>
        <div className='col'>
              <BookCardSkeleton/>
        </div>
        <div className='col'>
              <BookCardSkeleton/>
        </div>
        <div className='col'>
              <BookCardSkeleton/>
        </div>
        <div className='col'>
              <BookCardSkeleton/>
        </div>
        <div className='col'>
              <BookCardSkeleton/>
        </div>
        <div className='col'>
              <BookCardSkeleton/>
        </div>
        <div className='col'>
              <BookCardSkeleton/>
        </div>
        {/* <div className='col-6 col-sm-4 col-md-4 col-lg-2'>
              <BookCardSkeleton/>
        </div>
        <div className='col-6 col-sm-4 col-md-4 col-lg-2'>
              <BookCardSkeleton/>
        </div>
        <div className='col-6 col-sm-4 col-md-4 col-lg-2'>
              <BookCardSkeleton/>
        </div> */}
      </div>
      )
    }
    return null;
  }

export default LoadingBookSkeleton