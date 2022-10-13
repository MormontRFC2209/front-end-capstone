import {useState, useEffect} from "react";
import axios from 'axios';
import ReviewList from "./reviewList/reviewList.jsx";


export default function RANDR(props) {
  const [reviews,setReviews]=useState([]);


  useEffect(() => {
    axios.get("/info", {params: {route: '/reviews/', apiParams: {product_id:66643}}})
      .then((response) => {
        setReviews(response.data.results);
      })
  }, []);

  return (
    <>
    <h5>RATINGS  REVIEWS</h5>
    <ReviewList reviews={reviews}/>
    </>
  )
}