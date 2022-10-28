import {useState, useEffect} from "react";
import axios from 'axios';
import ReviewList from "./reviewList/reviewList.jsx";
import BreakDown from './reviewBreakDown/breakDown.jsx';
import WriteRview from "./reviewList/writeReview.jsx";
import styles from './reviewList/review.css'
// import AveRating from './ratingStars/aveRating.jsx';

let starList = []
export default function RANDR(props) {
  const [reviews,setReviews]=useState([]);
  const [metaData,setMetaData]=useState({})
  const [sortReviewsByStar,setSortReviewsByStar]=useState([])
  const [loading, setLoading] = useState(true);
  const [write,setWrite] = useState(false)
  const [ratingSum,setRatingSum]=useState(0)


  useEffect(() => {
    if(props.productId > 0){
      axios.get("/info", {params: {route: '/reviews/', apiParams: {product_id:props.productId,count:100}}})
      .then((response) => {
        console.log(response.data)
        setReviews(response.data.results)
      })
      axios.get("/info", {params: {route: '/reviews/meta', apiParams: {product_id:props.productId,count:100}}})
      .then((response) => {
        // console.log('response.data',response.data)
        setMetaData(response.data)
        props.setReviews(response.data)
        let sum = 0;
        let ratings = response.data.ratings
        for(var k in ratings){
          sum+=Number(ratings[k])
        }
        setRatingSum(sum)
        setLoading(false);
      })
    }
  }, [props.productId]);

  if (loading) {
    return <div>Currently Loading...</div>
  }

  const writeReview = ()=>{
    setWrite(true)
  }

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
    // console.log('star',star,toggle)
    toggle?starList.push(star):starList.splice(starList.indexOf(star),1)
    let newList = []
    axios.get("/info", {params: {route: '/reviews/', apiParams: {product_id:props.productId,count:100}}})
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
    <div className='ratingTitle'>
    <h1>REVIEWS</h1>
    <button className='button-writeReview' onClick={writeReview}>WRITE A REVIEW</button>
    </div>
    <div className='ratingRoot'>
    <div className='ratingContainer'>
    {write?<WriteRview metaData={metaData} addReview={addReview} setWrite={setWrite} product_id={props.productId} productName={props.productName}/>:null}
    {(reviews.length>0 && Object.keys(metaData).length > 0)?<BreakDown reviews={reviews} metaData={metaData} setSortByStar={setSortByStar} />:null}
    {(reviews.length>0 && Object.keys(metaData).length > 0)?<ReviewList metaData={metaData} product_id={props.productId} reviews={reviews} usefulClick={usefulClick} addReview={addReview} report={report} sortReviewsByStar={sortReviewsByStar} productName={props.productName} ratingSum={ratingSum}/>:null}
    </div>
    </div>
    </>
  )
}