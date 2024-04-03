import React, { useState, useRef, useEffect } from 'react';
import { useInstantSearch, useSearchBox } from 'react-instantsearch';

function Searchpage_searchbox(props) {
  const { query, refine } = useSearchBox(props);
  const {value} = props;
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);

  const isSearchStalled = status === 'stalled';



  // useEffect(() => {
  //   console.log(query , "searchpage")
  //   if (query) {
  //     if (query.length > 0) {
  //       refine(query);
  //     }
  //   }
  // }, [query]);

  useEffect(() => {
        if (value) {
          if (value.length > 0) {
            refine(value);
          }
        }
      }, [value]);
  function setQuery(newQuery) {
    setInputValue(newQuery);

    refine(newQuery);
  }
        
  return (
    <div>
     
    </div>
  );
}

export default Searchpage_searchbox