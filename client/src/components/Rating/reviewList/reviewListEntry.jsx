import {useState, useEffect} from "react";
import RatingStars from '../ratingStars/singleRatingStars.jsx';
import Image from './imageExpand.jsx'


export default function ReviewListEntry(props) {
  const [helpfulCount,setHelpfulCount]=useState(0)
  const options = { weekday: undefined, year: 'numeric', month: 'long', day: 'numeric' };
  let date = new Date(props.review.date).toLocaleDateString(undefined,options);
  const [usefulClick,setUsefulClick]=useState(false)
  const [reportClick,setReportClick]=useState('Report')
  const [usefulStyle,setUsefulStyle]=useState('')
  const [bodyText,setBodyText]=useState(props.review.body.slice(0,70))
  const [readmoreChoice,setreadmoreChoice]= useState('...readmore')
  const [readmoreState,setReadmoreState]=useState(props.review.body.length>70)
  // const [summary,setSummary] = useState('')


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

  const moreText = ()=>{
    setBodyText(props.review.body)
    setReadmoreState(false)
  }

  return (
    <div className='singleReviewList'>
    <div className='reviewListTitle'>
      <div className='singleReviewListTitle'>
        <h3>{props.summary} </h3>
        <RatingStars rating={props.review.rating}/>
      </div>
      <div><small>{props.name},{date}</small></div>
    </div >
    <div className='singleReviewListBody'>
      <div className='singleReviewListBodyText'>
      {bodyText}<br/>{readmoreState?<small style={{fontWeight:'bold',cursor:'pointer'}} onClick={moreText}>{readmoreChoice}</small>:null}
      </div>
    <div style={{display:'flex',
    flexWrap: 'wrap'}}>
    {props.review.photos.length>0?props.review.photos.map((image,index)=>{
      return (
        <Image key={image.id} src={image.url}/>
        )
    }):null}
        </div>
      </div>
    {props.review.recommend ? <div style={{marginBottom:'1vh'}}>☑️ I recommend this product</div> : null}
    {!!props.review.response ? <div>response from seller: {props.review.response}</div> : null}
    <div style={{marginBottom:'1vh',fontSize:'12px'}}>Helpful?<button className={`button-thumbsUp ${usefulStyle}`}onClick={onHelpful} disabled={usefulClick}>{props.review.helpfulness+helpfulCount}</button>| <a className='report-style'onClick={onReport}>  {reportClick}</a></div>
    </div>
  )
}
