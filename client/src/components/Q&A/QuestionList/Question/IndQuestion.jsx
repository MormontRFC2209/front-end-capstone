import {useState, useEffect} from "react";
import IndAnswer from './IndAnswer.jsx'



export default function IndQuestion({question}) {
  var rawAnswerArray = [];

  for (var key in question.answers) {
    rawAnswerArray.push(question.answers[key])
  }

  var sortedAnswers = rawAnswerArray.sort((a,b) => (a.helpfulness > b.helpfulness) ? -1 : 1)
  var renderedAnswers = sortedAnswers.slice(2)

  console.log('renderedAnswers',renderedAnswers)

  const [accordian, setAccordian] = useState('See more answers')
  const [answerList, setAnswerList] = useState(renderedAnswers)

  const manipulateAnswerAccordian = () => {

    if(accordian === 'Collapse answers') {


      setAnswerList(renderedAnswers);
      setAccordian('More Answered Questions');

      console.log('hello i would like to collapse');
      return;
    }
    var storageArray = [];

    console.log(sortedAnswers.length)

    for(var i = 2; i < sortedAnswers.length; i++) {
      console.log('hello')
      storageArray.push(sortedAnswers[i])
    }

    console.log('storageArray', storageArray)
    console.log('answerList', answerList)

    setAnswerList(answerList.concat(storageArray));

  }




  return(
    <div>
      <h3>Q: {question.question_body}</h3><h3>Helpful?</h3><h3>Yes</h3><h3>({question.question_helpfulness})</h3><h3>  Report</h3>
      <span>A: </span>
      <div>
      {answerList.map((singleAnswer) => {
        return <IndAnswer key={Math.random()} answer={singleAnswer}/>
      })}
      </div>
      {sortedAnswers.length > 2 ? <span onClick={(e) => {e.preventDefault; manipulateAnswerAccordian();}}>{accordian}</span> : null}
    </div>
  )
}