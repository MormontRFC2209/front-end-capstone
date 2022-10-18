import {useState, useEffect} from "react";
import axios from 'axios';
import ReviewList from "./reviewList/reviewList.jsx";
import BreakDown from './reviewBreakDown/breakDown.jsx';


export default function RANDR(props) {
  const [reviews,setReviews]=useState([]);
  const [characteristics,setCharacteristics]=useState({})


  useEffect(() => {
    if(props.productId > 0){
      axios.get("/info", {params: {route: '/reviews/', apiParams: {product_id:props.productId}}})
      .then((response) => {
        setReviews(response.data.results);
        console.log(response)
      })
      axios.get("/info", {params: {route: '/reviews/meta', apiParams: {product_id:props.productId}}})
      .then((response) => {
        console.log('test',response)
        setCharacteristics(response.data.characteristics)
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
    <div style={{display:'flex'}}>
    {reviews.length>0?<BreakDown reviews={reviews}/>:null}
    {reviews.length>0?<ReviewList characteristics={characteristics} product_id={props.productId} reviews={reviews} usefulClick={usefulClick} addReview={addReview} report={report}/>:null}
    </div>
    </>
  )
}