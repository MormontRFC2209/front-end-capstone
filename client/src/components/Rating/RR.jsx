import {useState, useEffect} from "react";
import axios from 'axios';
import ReviewList from "./reviewList/reviewList.jsx";
import BreakDown from './reviewBreakDown/breakDown.jsx';
// import AveRating from './ratingStars/aveRating.jsx';

let starList = []
export default function RANDR(props) {
  const [reviews,setReviews]=useState([]);
  const [metaData,setMetaData]=useState({})
  const [sortReviewsByStar,setSortReviewsByStar]=useState([])
  const [aveRate,setAveRate]=useState('')
  const [ratingTotal,setRatingTotal]=useState('')


  useEffect(() => {
    if(props.productId > 0){
      axios.get("/info", {params: {route: '/reviews/', apiParams: {product_id:props.productId}}})
      .then((response) => {
        setReviews(response.data.results)
      })
      axios.get("/info", {params: {route: '/reviews/meta', apiParams: {product_id:props.productId}}})
      .then((response) => {
        setMetaData(response.data)
        props.setReviews(response.data)
        let ave = 0;
        let scordSum = 0;
        let sum = 0;
        let ratings = response.data.ratings;
        for(var k in ratings){
          scordSum+=Number(k) * Number(ratings[k])
          sum+=Number(ratings[k])
        }
        ave = (scordSum/sum).toFixed(2);
        setAveRate(ave)
        setRatingTotal(sum)
      })
    }
  }, [props.productId]);

  const usefulClick = (review_id)=>{
    return axios.put('/info', {route: `/reviews/${review_id}/helpful`, apiParams:{review_id: review_id}})
  }

  const addReview = (newReview)=>{
    return axios.post('/info',newReview, {params: {route: '/reviews'}})
  }

  const report = (review_id)=>{
    return axios.put('/info', {route: `/reviews/${review_id}/report`, apiParams:{review_id: review_id}})
  }


  const setSortByStar = (star,toggle)=>{
    toggle?starList.push(star):starList.splice(starList.indexOf(star),1)
    let newList = []
    axios.get("/info", {params: {route: '/reviews/', apiParams: {product_id:props.productId}}})
    .then((response) => {
      starList.forEach(value=>{
        let currentList = response.data.results.filter(review=>review.rating===Number(value))
        currentList.forEach(review=>newList.push(review))
      })
      setSortReviewsByStar(newList)
    })

  }


  return (
    <>

    <h5>RATINGS  REVIEWS</h5>
    {/* <AveRating aveRating={'3.4'}/> */}
    <div style={{width:'80%',margin:'0 300px',position:'relative'}}>
    {(reviews.length>0 && Object.keys(metaData).length > 0)?<BreakDown reviews={reviews} metaData={metaData} setSortByStar={setSortByStar} aveRate={aveRate}/>:null}
    {(reviews.length>0 && Object.keys(metaData).length > 0)?<ReviewList metaData={metaData} product_id={props.productId} reviews={reviews} usefulClick={usefulClick} addReview={addReview} report={report} sortReviewsByStar={sortReviewsByStar} productName={props.productName} aveRate={aveRate} ratingTotal={ratingTotal}/>:null}
    </div>
    </>
  )
}