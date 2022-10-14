import {useState, useEffect} from "react";




export default function IndAnswer({answer}) {



  return(
    <div>
      <span>{answer.body}</span>
      <div>
      {answer.answerer_name === 'Seller' ? <span>by {answer.answerer_name}, currentDate    |</span> : <span>by {answer.answerer_name}, currentDate    |</span>}
      <span>   Helpful? Yes ({answer.helpfulness})    |</span>
      <span>   Report</span>
      </div>


    </div>
  )

}