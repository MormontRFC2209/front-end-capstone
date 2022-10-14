import {useState, useEffect} from "react";
import ReviewListEntry from "./reviewListEntry.jsx";



let num = 2;
export default function ReviewList({reviews}) {

  const sortRelevant = ()=>{
    reviews.sort((a,b)=> {
      if((b.helpfulness - a.helpfulness) !== 0){
        return b.helpfulness - a.helpfulness
      }
      if((b.helpfulness - a.helpfulness) === 0){
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    });
  }

  const change = (e) =>{
    e.preventDefault();
    num = 2;
    if(e.target.value  === 'Relevant' ){
      sortRelevant();
      setList(reviews.slice(0,num))
    }
    if(e.target.value  === 'Helpful' ){
      reviews.sort((a,b)=>b.helpfulness - a.helpfulness);
      setList(reviews.slice(0,num))
    }
    if(e.target.value  === 'Newest' ){
      reviews.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime());
      setList(reviews.slice(0,num))
    }

  }
  const onClick = ()=>{
    console.log(num);
    if(reviews.length <= num){
      alert('no more reviews')
    }
    if(reviews.length > num){
      num += 2;
    }
    setList(reviews.slice(0,num))
  }
  sortRelevant()
  const [list,setList] = useState(reviews.slice(0,num));

  return (
    <div>
      {console.log(reviews)}
      <h5>{reviews.length} reviews,sorted by
      <select id='state' onChange={change}>
      <option value="Relevant">Relevant</option>
      <option value="Helpful">Helpful</option>
      <option value="Newest">Newest</option>
      </select>
      </h5>
      {list.map((review,key)=>{
        return <ReviewListEntry key={key} review={review}/>
      })}
      <button onClick={onClick}>Add more reviews</button>
       </div>
  )
}