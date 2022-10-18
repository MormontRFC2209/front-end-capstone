import {useState, useEffect} from "react";
import ReviewListEntry from "./reviewListEntry.jsx";



let num = 2;
export default function ReviewList(props) {

  const sortRelevant = ()=>{
    props.reviews.sort((a,b)=> {
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
    if(e.target.value  === 'Relevant' ){
      sortRelevant();
      setList(props.reviews.slice(0,num))
    }
    if(e.target.value  === 'Helpful' ){
      props.reviews.sort((a,b)=>b.helpfulness - a.helpfulness);
      setList(props.reviews.slice(0,num))
    }
    if(e.target.value  === 'Newest' ){
      props.reviews.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime());
      setList(props.reviews.slice(0,num))
    }

  }
  const onClick = ()=>{
    console.log(num);
    if(props.reviews.length > num){
      num += 2;
      setList(props.reviews.slice(0,num))
      if(props.reviews.length <= num){
        setLoadReviews('NO MORE REVIEWS');
        loading?setLoading(false):setLoading(true);
      }
    }
  }
  sortRelevant()
  const [list,setList] = useState(props.reviews.slice(0,num));
  const [loading, setLoading] = useState(false);
  const [loadReviews,setLoadReviews] = useState('MORE REVIEWS')

  return (
    <div>
      <h5>{props.reviews.length} reviews,sorted by
      <select id='state' onChange={change}>
      <option value="Relevant">Relevant</option>
      <option value="Helpful">Helpful</option>
      <option value="Newest">Newest</option>
      </select>
      </h5>
      {list.map((review,key)=>{
        return <ReviewListEntry key={key} review={review} usefulClick={props.usefulClick} addReview={props.addReview} report={props.report}/>
      })}
      <button onClick={onClick} disabled={loading}>{loadReviews}</button>
      <button>ADD A REVIEWS +</button>
       </div>
  )
}