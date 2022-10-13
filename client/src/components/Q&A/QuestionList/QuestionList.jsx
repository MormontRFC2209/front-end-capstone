import {useState, useEffect} from "react";




export default function QuestionList(props) {

  console.log(props.questionList)



  return (
    <div>
      {props.questionList.map((singleQuestion) => {
        return <h3 key={Math.random()}>This is a test question</h3>
      })}
    </div>
  )
}