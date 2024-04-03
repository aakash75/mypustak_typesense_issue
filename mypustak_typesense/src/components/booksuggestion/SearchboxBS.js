import { Configure, InstantSearch, useInstantSearch, useSearchBox } from 'react-instantsearch';
import React, { Component, useEffect, useState } from 'react';


function SearchboxBS(props) {
  
    const { query, refine } = useSearchBox(props);
    const {value} = props;
    const [showautocomp, setshowautocomp] = useState(false);
    const closeshowauto = () => {
      setshowautocomp(false);
    };
    useEffect(() => {
        // alert(value)
      if (value) {
        if (value.length > 0) {
          refine(value);
        }
      }
    }, [value]);
    


    return (
      <div>
        <style jsx>
          {`
            .searchInput {
              width: 28.063rem;
              height: 2rem;
              border-radius: 8px 0px 0px 8px;
              border: none;
              focus: none;
            }
            textarea:focus,
            input:focus {
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
            @media screen and (max-width: 768px) {
              .searchInput {
                width: 14rem;
              }
              .searchButton {
                width: 2rem;
              }
            }
          `}
        </style>
      </div>
    );
  }

export default SearchboxBS;