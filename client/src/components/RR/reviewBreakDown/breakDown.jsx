import {useState, useEffect} from "react";
import AveRating from '../ratingStars/aveRating.jsx';
import Characteristics from './characteristics.jsx'

let aveRating = 0;
export default function BreakDown(props) {

    let sum = 0;
    props.reviews.map(review=>{
      sum+= review.rating;
    })
    aveRating = sum/(props.reviews.length);

  return (
    <div style={{flex:'2'}}>
    <h1 style={{float: 'left'}}>{aveRating}</h1>
    <AveRating reviews={props.reviews} aveRating={aveRating}/>
    <Characteristics metaData={props.metaData}/>
    </div>
  )
}