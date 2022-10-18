import {useState, useEffect} from "react";


export default function ReviewListEntry({review}) {
  const options = { weekday: undefined, year: 'numeric', month: 'long', day: 'numeric' };
  let date = new Date(review.date).toLocaleDateString(undefined,options);

  return (
    <>
    <h5>RATINGS  STAR{review.rating}</h5>
    <div>{review.reviewer_name},{date}</div>
    <div>{review.summary}</div>
    <div>{review.body}</div>
    {review.recommend ? <div>☑️ I recommend this product</div> : null}
    <div>Was this review helpful? <button>Yes</button>{review.helpfulness} | <button>Report</button></div>
    </>
  )
}



// body
// :
// "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
// date
// :
// "2022-04-14T00:00:00.000Z"
// helpfulness
// :
// 5
// photos
// :
// [{…}]
// rating
// :
// 3
// recommend
// :
// true
// response
// :
// null
// review_id
// :
// 1176350
// reviewer_name
// :
// "qiqi"
// summary
// :
// "kkkkkkkk"