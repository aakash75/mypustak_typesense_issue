import React, { useEffect, useState } from 'react'



const CategoryTree = ({ categories ,clicked_category}) => {


const accessNested = (obj, keys) => {
  let current = obj;
 
    if (current.hasOwnProperty(keys)) {
      current = current[keys];
    } else {
      return undefined; // Key not found, return an appropriate value or handle the error
    }
  
  return current;
}
let breadcrumb = []
let level2 = []
let level1 = []

// const ClickfirstLevel =(value) =>{
//   let new_leve1 = level1
//   let cat_str = ""
//   // let new_category_value = value.replaceAll("&" , "_")
//   console.log(new_leve1 , "new_leve1 27")
//   if (new_leve1.includes(value)){
//     // alert("Already in category")
//     let index = new_leve1.indexOf(value);
//     if (index !== -1) {
//       // alert("Already in category")
//       index = index 
//       new_leve1.splice(index , 1);
//     }
//     else{
//       new_leve1.push(new_category_value);
//     }
//     // cat_breadcrumb = array.filter(item => item !== categoryvalue);
//   }
//   console.log(new_leve1 , "new_leve1")
//   new_leve1.forEach(function(data,index) {
 
//     if(data){
//       if(cat_str){
//       cat_str = cat_str + ">"+ data

//       }
//       else{

//         cat_str =  data
//       }

//     }
//   })
//   let new_category_value = cat_str.replaceAll("&" , "_")
//   // alert(new_category_value +" 26")
//   clicked_category("category",new_category_value)

// }


const ClickfirstLevel =(value) =>{
  let new_category_value = value.replaceAll("&" , "_")
  level1 = [new_category_value]
  // alert(new_category_value +" 26")
  clicked_category("category",new_category_value)

}
const secondlevel = (value) =>{
  // alert("second "+value)
  let cat_breadcrumb = [...level1, ...level2];
  let categoryvalue = value;
  let cat_str = ""
  if (cat_breadcrumb.includes(categoryvalue)){
    // alert("Already in category")
    let index = cat_breadcrumb.indexOf(categoryvalue);
    if (index !== -1) {
      // alert("Already in category")
      index = index - 1
      cat_breadcrumb.splice(index+1);
    }
    else{
      cat_breadcrumb.push(categoryvalue);
    }
    // cat_breadcrumb = array.filter(item => item !== categoryvalue);
  }

  console.log(cat_breadcrumb , "category 45")
  cat_breadcrumb.forEach(function(data,index) {
 
    if(data){
      if(cat_str){
      cat_str = cat_str + ">"+ data

      }
      else{

        cat_str =  data
      }

    }
  })
  if (cat_breadcrumb.includes(categoryvalue)) {
    // alert("Already have a category 61");
  }

  console.log( level2  , "breadcrumb 24",level1 , cat_str)
  console.log(cat_breadcrumb , "cat_breadcrumb")
  let new_category_value = cat_str.replaceAll("&" , "_")
  clicked_category("category",new_category_value)
}
const categoryClick = (clickedCategory,categoryvalue) =>{
  let cat_breadcrumb = [...level1  ,...level2];
  let cat_str = ""


  cat_breadcrumb.forEach(function(data,index) {
    if(data){
      if(cat_str){
      cat_str = cat_str + ">"+ data

      }
      else{

        cat_str =  data
      }

    }
  })
  if (cat_breadcrumb.includes(categoryvalue)) {
    // alert("Already have a category");
  }
  else{

    if(cat_str){
  
      cat_str = cat_str + ">"+ categoryvalue
    }
    else{
      cat_str =  categoryvalue
    }
  }
  // console.log( level2  , "breadcrumb 24",level1 , cat_str)
  // console.log(cat_breadcrumb , "cat_breadcrumb")
  let new_category_value = cat_str.replaceAll("&" , "_")
  clicked_category(clickedCategory,new_category_value)
}

const newfunction = (obj) =>{
  let result = accessNested(obj , "child")
  if(result){
    console.log(result.values , result.level , "category 181818")
    let data ={}
    data["value"] = result.values[0]['name']

    data["level"] = result.level
    breadcrumb.push(data)
    level2.push( data["value"] )

    // categories_map(result.values)
    newfunction(result)
  }
  else{
    console.log("no data found" , "category 2323")
  }
  console.log(breadcrumb , "breadcrumb 11 category")
  return (<div>
   { 
   breadcrumb.map((data,index) =>(
      // console.log(data.value, "category 3939")
      <div key ={index} style ={{marginLeft:`${data.level*8}px` , fontSize:"0.8rem",  color:"#2244ae" ,cursor:"pointer"}} onClick = {() =>secondlevel(data.value)}>
        
        - {data.value.length <25? data.value:data.value.substring(0,25).concat('...')}
      </div>
    ))}
  </div>)
}

const categories_map = (datamap) =>{
  let category_array = [];
  datamap.map((data) =>(
    category_array.push(data.name)
  ))
  level1 = category_array
  console.log(category_array ,"level1")

  return (
    category_array.map((data,index) =>(
      <div key ={index} style ={{fontSize:"0.8rem" , color:"#2244ae",cursor:"pointer"}} onClick={() =>ClickfirstLevel(data)}>
        
          -- {data}
    
      </div>
    ))
  )
}
  const renderCategory = (category) => {
    return (
      <div key={category.position}>

 
          {Object.keys(category.breadcrumb ).length? (
                // <CategoryTree categories={category.breadcrumb.values} />
                // console.log(category.breadcrumb.values , "category 1333")
                <>
            {    categories_map(category.breadcrumb.values)}
            {newfunction(category.breadcrumb)}
              
              </>):null}

          {category.values.map((value , index) => (
       
            <div key={value.name} style={{fontSize:"0.8rem",cursor:"pointer" , paddingLeft:`${level2.length?"30px":"12px"}`}} onClick={() =>categoryClick("category",value.name)}>
             + {value.name.length <20? value.name:value.name.substring(0,20).concat('...')} ({value.count})
            
            </div>
          ))}
      
      </div>
    );
  };

  return (
    <div>
      {categories.map((category) => renderCategory(category))}
    </div>
  );
};

export default CategoryTree;
