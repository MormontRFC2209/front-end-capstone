import {useState, useEffect} from "react";




export default function IndAnswer({answer}) {


  const options = {weekday: undefined, year: 'numeric', month: 'long', day: 'numberic'};
  let date = new Date(answer.date.slice(11)).toLocaleDateString('en-US',options);


  return(
    <div>
      <span>this is an Answer </span>
      <div>
      {answer.answerer_name === 'Seller' ? <span>by {answer.answerer_name}, {date}    |</span> : <span>by {answer.answerer_name}, {date}    |</span>}
      <span>   Helpful? Yes ({answer.helpfulness})    |</span>
      <span>   Report</span>
      </div>


    </div>
  )

}