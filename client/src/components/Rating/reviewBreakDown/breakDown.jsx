import {useState, useEffect} from "react";
import AveRating from '../ratingStars/aveRating.jsx';
import ProductBreakDown from './productBreakDown.jsx'
import StarRateBar from './starRateBar.jsx'

let aveRating = 0;
let scordSum = 0;
let ratingSum = 0;
let sortList = {}
let order = 0;
export default function BreakDown(props) {
    let ratings = props.metaData.ratings;
    for(var k in ratings){
      scordSum+=Number(k) * Number(ratings[k])
      ratingSum+=Number(ratings[k])
    }
    aveRating = (scordSum/ratingSum).toFixed(2);


    let total = Number(props.metaData.recommended.false) + Number(props.metaData.recommended.true);
    let recommendNum = props.metaData.recommended.true/total;
    let recommendRate = Number(recommendNum*100).toFixed(0) + '%';


  return (
    <>
    <div style={{width:'30%',float:'left'}}>
    <h1 style={{display: 'inline-block'}}>{aveRating}</h1>
    <AveRating reviews={props.reviews} aveRating={aveRating}/>
    <div style={{marginTop:'5px'}}>
    <h5 style={{display: 'block'}}>{recommendRate} of reviews recommend this product</h5>
    </div >
    {[5,4,3,2,1].map((star,key)=>{
      // console.log(props.reviews)
       let currentList = props.reviews.filter(review=>review.rating===star)
      return (
        <StarRateBar
        star={star}
        key={key}
        ratings={props.metaData.ratings[star]}
        ratingSum={ratingSum}
        reviews={currentList}
        setSortByStar={props.setSortByStar}
        />
      )
    })}
    <ProductBreakDown metaData={props.metaData}/>
    </div>
    </>
  )
}