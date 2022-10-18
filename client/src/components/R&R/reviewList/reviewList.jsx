import {useState, useEffect} from "react";
import ReviewListEntry from "./reviewListEntry.jsx";




export default function ReviewList({reviews}) {
  const [count,setCount]=useState(2);
  const listArr = reviews.length > 2 ? reviews.slice(0,count):reviews.slice(0);

  return (
    <div>
      {console.log(listArr)}
      <h5>{reviews.length} reviews,sorted by
      <select id='state' onChange={function(e){
          e.preventDefault();
          // setState(e.target.value);
          }}>
      <option value="Relevant">Relevant</option>
      <option value="Helpful">Helpful</option>
      <option value="Newest">Newest</option>
      </select>
      </h5>
      {listArr.map((review,key)=>{
        return <ReviewListEntry key={key} review={review}/>
      })}
       </div>
  )
}