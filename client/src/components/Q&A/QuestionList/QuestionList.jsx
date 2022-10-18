import {useState, useEffect} from "react";
import IndQuestion from './Question/IndQuestion.jsx'




export default function QuestionList(props) {




  return (
    <div>
      {props.questionList.map((singleQuestion) => {

        return <IndQuestion key={Math.random()} question={singleQuestion} />
      })}
    </div>
  )
}