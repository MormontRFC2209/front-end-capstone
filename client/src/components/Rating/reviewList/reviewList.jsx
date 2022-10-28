import {useState, useEffect} from "react";
import ReviewListEntry from "./reviewListEntry.jsx";
import WriteRview from "./writeReview.jsx";


let ratingSum = 0;
let num = 2;
export default function ReviewList(props) {
  const [list,setList] = useState(props.reviews.slice(0,num));
  const [loading, setLoading] = useState(props.reviews.length >2);
  const [loadReviews,setLoadReviews] = useState('MORE REVIEWS');
  const [styleContro,setStyleContro] = useState(false)
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
      num = 2
      setLoadReviews('MORE REVIEWS');
      sortRelevant();
      setList(props.reviews.slice(0,num))
    }
    if(e.target.value  === 'Helpful' ){
        num = 2
        setLoadReviews('MORE REVIEWS');
        props.reviews.sort((a,b)=>b.helpfulness - a.helpfulness);
        setList(props.reviews.slice(0,num))
    }
    if(e.target.value  === 'Newest' ){
        num = 2
        setLoadReviews('MORE REVIEWS');
        props.reviews.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime());
        setList(props.reviews.slice(0,num))
    }

  }
  const onClick = (e)=>{

    if(props.reviews.length > num){
      // num += 2;
      setList(props.reviews)
      setLoadReviews('Scroll Down');
      // loading?setLoading(false):setLoading(true);
      // loading?setLoading(false):setLoading(true);
      if(props.reviews.length <= num){
        setLoadReviews('Scroll Down');
        loading?setLoading(false):setLoading(true);
      }
    }
  }

  const onSearch = (e)=>{
    if(e.target.value.length>=4){
     let result = props.reviews.filter(review=>toUpperCase(review.summary).toLowerCase().includes(e.target.value))
     setList(result)
    }
    if(e.target.value.length<=3){
      props.sortReviewsByStar.length>0?setList(props.sortReviewsByStar):setList(props.reviews)
    }
  }

  sortRelevant()

  const toUpperCase = (string) => {
    let newStr = string.split(" ");
    let str = '';
    for(var i = 0; i<newStr.length; i++){
    newStr[i] = newStr[i].slice(0,1).toUpperCase() + newStr[i].slice(1).toLowerCase()
      str+=newStr[i]+' ';
      }
     return str;
  }

  const expand =()=>{
    styleContro?setStyleContro(false):setStyleContro(true)
  }

  const style = {
    width:'200px',
    transform:'translate(60px) scale(1.5)'
  }

  return (
    <div className='breakContainer reviewListContainer'>
      <div className='reviewListTitle'>
        <div style={{display:'flex',alignItems:'center'}}>
          <h3>{props.ratingSum} reviews</h3>
          <div className='reviewSearch' style={styleContro?style:null}>
             <div className='reviewSearchIcon' onClick={expand}></div>
             <div className='reviewSearchIput'>
              <input onChange={onSearch} type='search' id='reviewSearch'/>
             </div>
          </div>
          </div>
        <div>
          <h3 style={{display:'inline-block',marginRight:'1vw'}}> sorted by </h3>
          <select id='state' onChange={change}>
          <option value="Relevant">Relevant</option>
          <option value="Helpful">Helpful</option>
          <option value="Newest">Newest</option>
          </select>
        </div>
      </div>
      <div className='reviewListBody'>
      {props.sortReviewsByStar.length>0?
        props.sortReviewsByStar.map((review,key)=>{
          return <ReviewListEntry key={key} review={review} usefulClick={props.usefulClick} addReview={props.addReview} report={props.report} summary={toUpperCase(review.summary)} name={toUpperCase(review.reviewer_name)}/>
        })
        :list.map((review,key)=>{
        return <ReviewListEntry key={key} review={review} usefulClick={props.usefulClick} addReview={props.addReview} report={props.report} summary={toUpperCase(review.summary)} name={toUpperCase(review.reviewer_name)}/>
      })}
      </div>
      <div className='reviewListButton'>
      {loading&&props.sortReviewsByStar.length===0?<button onClick={onClick}>{loadReviews}</button>:null}
      {props.sortReviewsByStar.length>0?<button>Scroll Down</button>:null}
      </div>
       </div>
  )
}