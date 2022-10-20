import {useState, useEffect} from "react";
import ReviewListEntry from "./reviewListEntry.jsx";
import WriteRview from "./writeReview.jsx";



let contro = 0;
let num = 2;
export default function ReviewList(props) {
  const [list,setList] = useState(props.reviews.slice(0,num));
  const [loading, setLoading] = useState(props.reviews.length >2);
  const [loadReviews,setLoadReviews] = useState('MORE REVIEWS')
  const [write,setWrite] = useState(false)
  console.log(props.sortReviewsByStar)

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

    if(props.reviews.length > num){
      num += 2;
      setList(props.reviews.slice(0,num))
      if(props.reviews.length <= num){
        setLoadReviews('NO MORE REVIEWS');
        loading?setLoading(false):setLoading(true);
      }
    }
  }

  const writeReview = ()=>{
    setWrite(true)
  }
  sortRelevant()

  return (
    <div style={{width:'70%',float:'left'}}>
      <h5>{props.reviews.length} reviews,sorted by
      <select id='state' onChange={change}>
      <option value="Relevant">Relevant</option>
      <option value="Helpful">Helpful</option>
      <option value="Newest">Newest</option>
      </select>
      </h5>
      <div>
      {props.sortReviewsByStar.length>1?
        props.sortReviewsByStar.map((review,key)=>{
          return <ReviewListEntry key={key} review={review} usefulClick={props.usefulClick} addReview={props.addReview} report={props.report}/>
        })
        :list.map((review,key)=>{
        return <ReviewListEntry key={key} review={review} usefulClick={props.usefulClick} addReview={props.addReview} report={props.report}/>
      })}
      </div>
      {loading?<button onClick={onClick}>{loadReviews}</button>:null}
      <button onClick={writeReview}>ADD A REVIEWS +</button>
      {write?<WriteRview addReview={props.addReview} setWrite={setWrite} product_id={props.product_id}/>:null}
       </div>
  )
}