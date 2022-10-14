import {useState, useEffect} from "react";
import IndQuestion from './IndQuestion.jsx'




export default function QuestionList(props) {

  console.log(props.questionList)



  return (
    <div>
      {props.questionList.map((singleQuestion) => {
        return <IndQuestion key={Math.random() } question={singleQuestion}/>
      })}
    </div>
  )
}