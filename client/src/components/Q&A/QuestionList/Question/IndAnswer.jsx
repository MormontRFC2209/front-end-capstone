import {useState, useEffect} from "react";




export default function IndAnswer({answer, seller}) {

  return(
    <div>
      <span>{answer.body}</span>
      <div>
      {seller ? <span>BY {answer.answerer_name}, CURRENTDATE   |</span> : <span>by {answer.answerer_name}, currentDate    |</span>}
      <span>   Helpful? Yes ({answer.helpfulness})    |</span>
      <span>   Report</span>
      </div>


    </div>
  )

}