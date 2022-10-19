import {useState, useEffect} from "react";
import RatingStars from '../ratingStars/singleRatingStars.jsx';


export default function ReviewListEntry(props) {
  const options = { weekday: undefined, year: 'numeric', month: 'long', day: 'numeric' };
  let date = new Date(props.review.date).toLocaleDateString(undefined,options);
  console.log(props);
  const onClick = ()=>{

  }

  return (
    <>
    <h5>RATINGS  STAR{props.review.rating}<RatingStars rating={props.review.rating}/></h5>
    <div>{props.review.reviewer_name},{date}</div>
    <div>{props.review.summary}</div>
    <div>{props.review.body}</div>
    {props.review.recommend ? <div>☑️ I recommend this product</div> : null}
    <div>Was this review helpful? <button onClick={onClick}>Yes</button>{props.review.helpfulness} | <button>Report</button></div>
    </>
  )
}
