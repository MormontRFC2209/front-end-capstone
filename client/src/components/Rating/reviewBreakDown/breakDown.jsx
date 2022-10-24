import {useState, useEffect} from "react";
import AveRating from '../ratingStars/aveRating.jsx';
import ProductBreakDown from './productBreakDown.jsx'
import StarRateBar from './starRateBar.jsx'

export default function BreakDown(props) {
    let total = Number(props.metaData.recommended.false) + Number(props.metaData.recommended.true);
    let recommendNum = props.metaData.recommended.true/total;
    let recommendRate = Number(recommendNum*100).toFixed(0) + '%';

  return (
    <>
    <div style={{width:'30%',float:'left'}}>
    <h1 style={{display: 'inline-block'}}>{props.aveRate}</h1>
    <AveRating aveRating={props.aveRate}/>
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
        ratingSum={props.ratingTotal}
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