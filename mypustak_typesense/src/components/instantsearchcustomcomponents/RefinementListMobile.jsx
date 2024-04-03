// import { Skeleton } from "@mui/material";
// // import { bind } from 'core-js/core/function';
// import React, { useEffect, useState } from "react";
// import {
//   connectRefinementList,
//   connectStateResults,
// } from "react-instantsearch";
// import { Highlight } from "react-instantsearch";
// import GetCategoryName from "../../helper/GetCategoryName";
// const Results = connectStateResults(
//   ({
//     searchState,
//     searchResults,
//     children,
//     error,
//     isSearchStalled,
//     attribute,
//     setnoresult,
//   }) =>
//     searchResults && searchResults.nbHits !== 0
//       ? children
//       : isSearchStalled
//       ? null
//       : null
// );

// function RefinementListMobile(
//   {
//     items,
//     isFromSearch,
//     refine,
//     searchForItems,
//     createURL,
//     searchable,
//     attribute,
//     defaultRefinement,
//   },
//   props
// ) {
//   // useEffect(() => {
//   //   props.setitems(items)
//   // }, [])
//   console.log(defaultRefinement, "defaultRefinement");
//   let Sorteditems = items.sort(function (a, b) {
//     if (a.firstname < b.firstname) {
//       return -1;
//     }
//     if (a.firstname > b.firstname) {
//       return 1;
//     }
//     return 0;
//   });
//   let skeletonCount = [];
//   for (let i = 0; i <= 10; i++) {
//     skeletonCount[i] = i;
//   }
//   const [slug, setslug] = useState({
//     author: [],
//     binding: [],
//     publication: [],
//   });
//   const [author, setauthor] = useState("");
//   const [binding, setbinding] = useState("");
//   const [publication, setpublication] = useState("");
//   const [attributestate, setattributestate] = useState([]);
//   return (
//     <Results attribute={attribute}>
//       <div>
//         {searchable ? (
//           <input
//             placeholder={
//               attribute == "author"
//                 ? "Search by Author name"
//                 : "Search by Publication name"
//             }
//             variant='standard'
//             onChange={event => searchForItems(event.currentTarget.value)}
//           />
//         ) : null}
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             marginTop: "0.5rem",
//           }}>
//           {items.length == 0 ? (
//             <div>
//               {skeletonCount.map(s => {
//                 return (
//                   <Skeleton
//                     key={s}
//                     variant='text'
//                     animation='wave'
//                     width={"9.984rem"}
//                   />
//                 );
//               })}
//             </div>
//           ) : attribute == "parent_category" && defaultRefinement ? (
//             defaultRefinement.map ? (
//               defaultRefinement.map((s, index) => {
//                 let defaultCat = GetCategoryName(parseInt(s));
//                 console.log(defaultCat.name, "ssssssssss");
//                 return (
//                   <span
//                     key={index}
//                     style={{
//                       textTransform: "capitalize",
//                       fontSize: "0.8rem",
//                       fontWeight: "600",
//                     }}>
//                     {/* {GetCategoryName(s).name} */}
//                     {defaultCat.name}
//                   </span>
//                 );
//               })
//             ) : null
//           ) : attribute == "parent_category" ? (
//             <div style={{ display: "flex", flexDirection: "column" }}>
//               <span
//                 style={{
//                   textTransform: "capitalize",
//                   fontSize: "0.8rem",
//                   fontWeight: "600",
//                   color: "#777",
//                 }}>
//                 {GetCategoryName(parseInt(items[0].label)).name}
//               </span>
//               {items[1] ? (
//                 <span
//                   style={{
//                     textTransform: "capitalize",
//                     fontSize: "0.8rem",
//                     fontWeight: "600",
//                     marginLeft: "0.5rem",
//                   }}>
//                   {GetCategoryName(parseInt(items[1].label)).name}
//                 </span>
//               ) : null}
//             </div>
//           ) : (
//             items.map((item, index) => {
//               console.log(item, "book_condition");
//               let category = "";
//               if (attribute == "category") {
//                 if (!isNaN(item.label)) {
//                   category = GetCategoryName(parseInt(item.label));
//                   console.log(
//                     category,
//                     parseInt(item.label),
//                     "categorycategorycategory"
//                   );
//                 }
//               }
//               // console.log((item.label.split("'")),"TYPE");
//               let bookcondition = item.label.split("'")
//               return(
//               <div style={{width:"max-content",display:'flex',alignItems:'center',margin:'0.15rem 0'}} key={item.value} 
//               onClick={event => {
//                 event.preventDefault();
                
//                 refine(item.value);
//                 window.scroll(0,0)
//               }}>
//               <input htmlFor="refinelabel" checked={item.isRefined} style={{marginRight:'5px'}} type={'checkbox'}/>
//                 <label
//                 id="refinelabel"
//                   href={createURL(item.value)}
//                   style={{ textTransform:'capitalize',fontSize:'0.88rem',cursor:'pointer',fontWeight: item.isRefined ? 'bold' : '' }}
                  
//                 >
//                   {isFromSearch ? (
//                     <Highlight attribute="label" hit={item} />
//                   ) : (
//                     attribute=="book_condition"?item.label=="verygood"?"Very Good":item.label=="averagebutinreadablecondition"?"Average But Readable":item.label=="almostnew"?"Almost New":item.label=="brandnew"?"Brand New":item.label:
//                     attribute=="aged_group"?item.label=="0"?"All Age":item.label=="1"?"0-2 years":item.label=="2"?"3-5 years":item.label == "3" ? "6-9 years":item.label == "4" ? "10-12 years":item.label == "5" ? "13-18 years":item.label:
//                     attribute=="author"?item.label=="na"||item.label==""||item.label=="NA"||item.label==" "?"Others":item.label:
//                     attribute=="publication"?item.label=="na"||item.label==""||item.label=="NA"||item.label==" "?"Others":item.label: 
//                     item.label.length>25?item.label.substring(0, 25).concat('...') : attribute=='category'?category.name:item.label
//                   )}{' '}
//                   <span style={{fontSize:'0.63rem',color:'#555'}}>({item.count})</span>
//                 </label>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </Results>
//   );
// }
// const CustomRefinementListMobile = connectRefinementList(RefinementListMobile);

// export default CustomRefinementListMobile;




import React from 'react';
import { useRefinementList } from 'react-instantsearch';
import styles from "../../styles/SearchPage.module.css"

function CustomRefinementListMobile(props) {
  const {
    items,
    refine,
    searchForItems,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList(props);

const {searchable} = props;

const get_label_bookcondition=(label) =>{
  // alert(label)
   let label_dict = {
        "VeryGood": "Very Good",
        "AverageButInReadableCondition": "Average But Readable",
        "AlmostNew": "Almost New",
        "BrandNew": "Brand New"
    }
    
    let label_value = label_dict[label]
    // alert(lable_value)
    return label_value
  }
  return (
    <>
      {items.length ?<h5 className={`${styles.Refineheader}`}>{props.label}</h5>:null}
    
     { searchable ? ( <input
        type="search"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        maxLength={512}
        onChange={(event) => searchForItems(event.currentTarget.value)}
      />):null}
      <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "0.8rem",
          }}>
        {items.map((item) => (
          <div key={item.label}>
            <label>
              <input
                type="checkbox"
                style ={{ marginRight: "5px", cursor:"pointer" }}
                checked={item.isRefined}
                onChange={() => refine(item.value)}
              />
                 <span style={{
                      textTransform: "capitalize",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      marginRight:'5px',
                     fontWeight: item.isRefined ? "bold" : "",
                    }}>
                      {props.label == "Book Condition"?
                      // () =>get_label_bookcondition(item.label)
                      get_label_bookcondition(item.label)
                      :item.label.length > 20 ? (
                      item.label.substring(0, 20).concat("..."))
                      : item.label}
                      </span> 
              <span style={{ fontSize: "0.7rem", color: "#555" }}>({item.count})</span>
            </label>
          </div>
        ))}
      </div>
   
    </>
  );
}



export default CustomRefinementListMobile;