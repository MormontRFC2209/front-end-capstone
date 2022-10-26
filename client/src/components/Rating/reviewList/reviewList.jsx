import {useState, useEffect} from "react";
import ReviewListEntry from "./reviewListEntry.jsx";
import WriteRview from "./writeReview.jsx";


let ratingSum = 0;
let num = 2;
export default function ReviewList(props) {
  const [list,setList] = useState(props.reviews.slice(0,num));
  const [loading, setLoading] = useState(props.reviews.length >2);
  const [loadReviews,setLoadReviews] = useState('MORE REVIEWS')
  let ratings = props.metaData.ratings;
  for(var k in ratings){
    ratingSum+=Number(ratings[k])
  }

  const sortRelevant = ()=>{
    const sortFunc = (a,b)=> {
      if((b.helpfulness - a.helpfulness) !== 0){
        return b.helpfulness - a.helpfulness
      }
      if((b.helpfulness - a.helpfulness) === 0){
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    }

    props.reviews.sort(sortFunc)

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

  const onSearch = (e)=>{
    if(e.target.value.length>=4){
     let result = props.reviews.filter(review=>review.summary.includes(e.target.value)||review.body.includes(e.target.value))
     setList(result)
    }
    if(e.target.value.length===0){
      props.sortReviewsByStar.length>0?setList(props.sortReviewsByStar):setList(props.reviews)
    }
  }

  sortRelevant()

  return (
    <div className='breakContainer reviewListContainer'>
      <h2>{props.ratingSum} reviews,sorted by
      <select id='state' onChange={change}>
      <option value="Relevant">Relevant</option>
      <option value="Helpful">Helpful</option>
      <option value="Newest">Newest</option>
      </select>
      </h2>
      <label >review search:
      <input onChange={onSearch} type='search'/></label>
      <div>
      {props.sortReviewsByStar.length>0?
        props.sortReviewsByStar.map((review,key)=>{
          return <ReviewListEntry key={key} review={review} usefulClick={props.usefulClick} addReview={props.addReview} report={props.report}/>
        })
        :list.map((review,key)=>{
        return <ReviewListEntry key={key} review={review} usefulClick={props.usefulClick} addReview={props.addReview} report={props.report}/>
      })}
      </div>
      {loading&&props.sortReviewsByStar.length===0?<button onClick={onClick}>{loadReviews}</button>:null}
       </div>
  )
}