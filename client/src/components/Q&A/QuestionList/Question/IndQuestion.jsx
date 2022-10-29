import {useState, useEffect} from "react";

import IndAnswer from './IndAnswer.jsx';
import useModal from '../../../../components/subComponents/modalHook.jsx';
import AnswerModal from '../../Modal/AnswerModal.jsx'
import axios from 'axios';
import '../../QANDA.css';



export default function IndQuestion({question, id, trackingFunction}) {
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

  console.log('raw answer ARRAY', rawAnswerArray)

  var sortedAnswers = rawAnswerArray.sort((a,b) => (a.helpfulness > b.helpfulness) ? -1 : 1)
  if(sortedAnswers.length <= 2) {
    renderedAnswers = sortedAnswers
  } else {
    renderedAnswers = sortedAnswers.slice(0, 2)
  }

  console.log('rendered',renderedAnswers)


  const [accordian, setAccordian] = useState('See more answers')
  const [answerList, setAnswerList] = useState(renderedAnswers)
  const [count, setCount] = useState(helpfulCount)
  const [helpfulClicked, sethelpfulClicked] = useState(false)
  const [reportedClicked, setReportedClicked] = useState('Report?')

  const addNewAnswer = (answer) => {
    sortedAnswers.push(answer);
  }

  const manipulateAnswerAccordian = () => {

    if(accordian === 'Collapse answers') {


      setAnswerList(renderedAnswers);
      setAccordian('See more answers');
      return;
    }
    var storageArray = [];


    for(var i = 2; i < sortedAnswers.length; i++) {
      console.log(sortedAnswers[i])
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
        setCount(helpfulCount);
        sethelpfulClicked(true);
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const reportQuestion = (event) => {
    event.preventDefault();
    if (reportedClicked === 'Reported') {
      return;
    }
    axios.put('/info', {route: '/qa/questions/'+answer.id+'/report', apiParams:{answer_id: answer.id}})
      .then((result) => {
        setReportedClicked('Reported');
      })
      .catch((error) => {
        console.log(error)
      })
  }




  return(
    <div className="QANDA" id="INDQUESTIONCONTAINER">
      <div className="QANDA" id="INDQUESTIONHEADER">
        <div id="QCONTAINER">
          <span onClick={trackingFunction}className="QANDA" id="Q-HEADER">Q:</span>
          <span onClick={trackingFunction}className="QANDA" id="QBODY">{question.question_body}</span>
        </div>
        <div id="USERACTIVITYCONTAINER">
          <span onClick={trackingFunction}className="QANDA" id="QHELPFUL">Helpful? </span>
          <span style ={{cursor: 'pointer'}} onClick={(e)=>{increaseHelpfulCount(e); trackingFunction(e);} }className="QANDA" id="QYES">Yes ({count})    |</span>
          <span style ={{cursor: 'pointer'}} onClick={(e)=>{increaseHelpfulCount(e); trackingFunction(e);} }className="QANDA" id="QREPORT">{reportedClicked}    |</span>
          <span style ={{cursor: 'pointer'}} data-testid="addanswer" onClick={(e)=>{toggle(); trackingFunction(e);}} className="QANDA" id="QADDANSWER"> Add Answer</span>
        </div>


      </div>




      <AnswerModal
        isShowing={isShowing}
        hide={toggle}
        id={question.question_id}
        addAnswerFunction={addNewAnswer}
        trackingFunction={trackingFunction}
      />
      <div>
      {answerList.map((singleAnswer) => {

        if(singleAnswer.answerer_name === 'Seller') {
          return <IndAnswer key={Math.random()} answer={singleAnswer} seller={true} trackingFunction={trackingFunction}/>
        }
        return <IndAnswer key={Math.random()} answer={singleAnswer} seller={false} trackingFunction={trackingFunction}/>

      })}
      </div>
      {sortedAnswers.length > 2 ? <span className="QANDA" id="ANSWERACCORDIAN" onClick={(e) => {e.preventDefault(); manipulateAnswerAccordian(); trackingFunction(e)}}>{accordian}</span> : null}
    </div>
  )
}