import {useState, useEffect} from "react";
import IndQuestion from './Question/IndQuestion.jsx'




export default function QuestionList(props) {


  console.log(props)

  return (
    <div>
      {props.questionList.map((singleQuestion) => {
        console.log('hello')
        return <IndQuestion key={Math.random()} question={singleQuestion}/>
      })}
    </div>
  )
}