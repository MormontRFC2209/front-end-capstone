import {useState, useEffect} from "react";
import axios from 'axios';
import ReviewList from "./reviewList/reviewList.jsx";


export default function RANDR(props) {
  const [reviews,setReviews]=useState([]);


  useEffect(() => {
    if(props.productId > 0){
      axios.get("/info", {params: {route: '/reviews/', apiParams: {product_id:66653}}})
      .then((response) => {
        setReviews(response.data.results);
      })
    }
  }, [props.productId]);

  const usefulClick = ()=>{

  }

  const addReview = ()=>{

  }

  const report = ()=>{

  }


  return (
    <>
    <h5>RATINGS  REVIEWS</h5>
    {reviews.length>0?<ReviewList reviews={reviews} usefulClick={usefulClick} addReview={addReview} report={report}/>:null}
    </>
  )
}