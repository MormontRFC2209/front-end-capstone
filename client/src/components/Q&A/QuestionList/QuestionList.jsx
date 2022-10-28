import {useState, useEffect} from "react";
import IndQuestion from './Question/IndQuestion.jsx'
import '../QANDA.css';





export default function QuestionList(props) {

  console.log(props.id)


  return (
    <div className="QuestionBox">
      {props.questionList.map((singleQuestion) => {

        return <IndQuestion key={Math.random()} question={singleQuestion} id={props.id} trackingFunction={props.trackingFunction} />
      })}
    </div>
  )
}