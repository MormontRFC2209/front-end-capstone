import {useState, useEffect} from "react";

import IndAnswer from './IndAnswer.jsx';
import useModal from '../../../../components/subComponents/modalHook.jsx';
import AnswerModal from '../../Modal/AnswerModal.jsx'
import axios from 'axios';



export default function IndQuestion({question, id}) {
  var rawAnswerArray = [];
  var renderedAnswers;




  var helpfulCount = question.question_helpfulness


  const {isShowing, toggle} = useModal();

  // axios.get("/info", {params: {route: '/qa/questions/'+ question.question_id+'/answers'}})
  //   .then((info) => {
  //     console.log(info)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })



  for (var key in question.answers) {
    rawAnswerArray.push(question.answers[key])
  }

  var sortedAnswers = rawAnswerArray.sort((a,b) => (a.helpfulness > b.helpfulness) ? -1 : 1)
  if(sortedAnswers.length < 2) {
    renderedAnswers = sortedAnswers
  } else {
    renderedAnswers = sortedAnswers.slice(2)
  }


  const [accordian, setAccordian] = useState('See more answers')
  const [answerList, setAnswerList] = useState(renderedAnswers)
  const [count, setCount] = useState(helpfulCount)
  const [helpfulClicked, sethelpfulClicked] = useState(false)

  const addNewAnswer = (answer) => {
    sortedAnswers.push(answer);
  }

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

  const increaseHelpfulCount = (event) => {
    event.preventDefault();
    if(helpfulClicked) {
      return;
    }
    axios.put('/info', {route: '/qa/questions/'+question.question_id+'/helpful', apiParams:{question_id: question.question_id}})
      .then((result) => {
        helpfulCount++
        console.log(helpfulCount);
        setCount(helpfulCount);
        sethelpfulClicked(true);
      })
      .catch((error) => {
        console.log(error)
      })
  }




  return(
    <div>

      <h3>Q: {question.question_body}</h3><h3 >Helpful? ({count})</h3><h3 onClick={increaseHelpfulCount}>Yes</h3><h3 onClick={toggle} className="link">Add Answer</h3>
      {answerList.length > 0 ? <div>A:</div> : null}
      <AnswerModal
        isShowing={isShowing}
        hide={toggle}
        id={question.question_id}
        addAnswerFunction={addNewAnswer}
      />
      <div>
      {answerList.map((singleAnswer) => {
        console.log(singleAnswer)
        if(singleAnswer.answerer_name === 'Seller') {
          return <IndAnswer key={Math.random()} answer={singleAnswer} seller={true}/>
        }
        return <IndAnswer key={Math.random()} answer={singleAnswer} seller={false}/>

      })}
      </div>
      {sortedAnswers.length > 2 ? <span onClick={(e) => {e.preventDefault; manipulateAnswerAccordian();}}>{accordian}</span> : null}
    </div>
  )
}