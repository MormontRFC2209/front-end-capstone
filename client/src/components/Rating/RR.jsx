import {useState, useEffect} from "react";
import axios from 'axios';
import ReviewList from "./reviewList/reviewList.jsx";
import BreakDown from './reviewBreakDown/breakDown.jsx';

let starList = []
export default function RANDR(props) {
  const [reviews,setReviews]=useState([]);
  const [metaData,setMetaData]=useState({})
  const [sortReviewsByStar,setSortReviewsByStar]=useState([])


  useEffect(() => {
    if(props.productId > 0){
      axios.get("/info", {params: {route: '/reviews/', apiParams: {product_id:66649}}})
      .then((response) => {
        setReviews(response.data.results);
      })
      axios.get("/info", {params: {route: '/reviews/meta', apiParams: {product_id:66649}}})
      .then((response) => {
        setMetaData(response.data)
      })
    }
  }, [props.productId]);

  const usefulClick = ()=>{

  }

  const addReview = ()=>{

  }

  const report = ()=>{

  }


  const setSortByStar = (star,toggle)=>{
    toggle?starList.push(star):starList.splice(starList.indexOf(star),1)
    let newList = []
    axios.get("/info", {params: {route: '/reviews/', apiParams: {product_id:66649}}})
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
    {console.log(sortReviewsByStar)}
    <h5>RATINGS  REVIEWS</h5>
    <div style={{width:'80%',margin:'0 300px',position:'relative'}}>
    {(reviews.length>0 && Object.keys(metaData).length > 0)?<BreakDown reviews={reviews} metaData={metaData} setSortByStar={setSortByStar}/>:null}
    {(reviews.length>0 && Object.keys(metaData).length > 0)?<ReviewList metaData={metaData} product_id={props.productId} reviews={reviews} usefulClick={usefulClick} addReview={addReview} report={report} sortReviewsByStar={sortReviewsByStar}/>:null}
    </div>
    </>
  )
}