import {useState, useEffect} from "react";
import RatingStars from '../ratingStars/singleRatingStars.jsx';


export default function ReviewListEntry(props) {
  const [helpfulCount,setHelpfulCount]=useState(0)
  const options = { weekday: undefined, year: 'numeric', month: 'long', day: 'numeric' };
  let date = new Date(props.review.date).toLocaleDateString(undefined,options);
  const [usefulClick,setUsefulClick]=useState(false)
  const [reportClick,setReportClick]=useState('Report')
  const [usefulStyle,setUsefulStyle]=useState('')

  const onHelpful = (e)=>{
    e.preventDefault()
    props.usefulClick(props.review.review_id)
         .then((result) => {
          setHelpfulCount(1)
          setUsefulClick(true)
          setUsefulStyle('button-clicked')
        })
        .catch((error) => {
          console.log(error)
        })
    // e.target.setAttribute('aria-valid','clicked')
  }
  const onReport = (e)=>{
    e.preventDefault()
    props.report(props.review.review_id)
         .then((result) => {
          setReportClick('Reported')
        })
        .catch((error) => {
          console.log(error)
        })
  }

  return (
    <div>
    <div>
    <h1 style={{display:'inline-block'}}>{props.review.summary}</h1>
    <RatingStars rating={props.review.rating}/>
    <small style={{float:'right'}}>{props.review.reviewer_name},{date}</small>
    </div>
    <textarea rows="3" cols="100" readonly="readonly">{props.review.body}</textarea>
    {props.review.recommend ? <div>☑️ I recommend this product</div> : null}
    {!!props.review.response ? <div>response from seller: {props.review.response}</div> : null}
    <div style={{display:'flex',
    flexWrap: 'wrap'}}>
    {props.review.photos.length>0?props.review.photos.map((image,index)=>{
      return (
        <div key={image.id} style={{marginBottom:"10px",marginTop:"10px"}}>
          <img src={image.url} style={{width:'150px',height:'90px',marginRight:'5px',objectFit: 'cover'}}></img>
        </div>
        )
    }):null}
    </div>
    <div>Was this review helpful? <button className={`button-thumbsUp ${usefulStyle}`}onClick={onHelpful} disabled={usefulClick}>{props.review.helpfulness+helpfulCount}</button> | <a className='report-style'onClick={onReport}>{reportClick}</a></div>
    </div>
  )
}
