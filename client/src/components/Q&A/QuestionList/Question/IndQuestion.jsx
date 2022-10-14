import {useState, useEffect} from "react";
import IndAnswer from './IndAnswer.jsx'



export default function IndQuestion({question}) {
  var rawAnswerArray = [];

  for (var key in question.answers) {
    rawAnswerArray.push(question.answers[key])
  }

  var sortedAnswers = rawAnswerArray.sort((a,b) => (a.helpfulness > b.helpfulness) ? -1 : 1)
  var renderedAnswers = sortedAnswers.slice(2)


  const [accordian, setAccordian] = useState('See more answers')
  const [answerList, setAnswerList] = useState(renderedAnswers)

  const manipulateAnswerAccordian = () => {

    if(accordian === 'Collapse answers') {


      setAnswerList(renderedAnswers);
      setAccordian('More Answered Questions');
      return;
    }
    var storageArray = [];


    for(var i = 2; i < sortedAnswers.length; i++) {
      storageArray.push(sortedAnswers[i])
    }



    setAnswerList(answerList.concat(storageArray));
    setAccordian('Collapse answers')

  }




  return(
    <div>
      <h3>Q: {question.question_body}</h3><h3>Helpful?</h3><h3>Yes</h3><h3>({question.question_helpfulness})</h3><h3>Add Answer</h3>
      {answerList.length > 0 ? <div>A:</div> : null}
      <div>
      {answerList.map((singleAnswer) => {
        return <IndAnswer key={Math.random()} answer={singleAnswer}/>
      })}
      </div>
      {sortedAnswers.length > 2 ? <span onClick={(e) => {e.preventDefault; manipulateAnswerAccordian();}}>{accordian}</span> : null}
    </div>
  )
}