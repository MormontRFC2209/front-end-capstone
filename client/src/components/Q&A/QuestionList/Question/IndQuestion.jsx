import {useState, useEffect} from "react";
import IndAnswer from './IndAnswer.jsx';
import useModal from '../../../../components/subComponents/modalHook.jsx';
import AnswerModal from '../../Modal/AnswerModal.jsx'



export default function IndQuestion({question, id}) {
  var rawAnswerArray = [];
  var renderedAnswers;

  console.log(id)

  const {isShowing, toggle} = useModal();


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
      <h3>Q: {question.question_body}</h3><h3>Helpful?</h3><h3>Yes</h3><h3>({question.question_helpfulness})</h3><h3 onClick={toggle} className="link">Add Answer</h3>
      {answerList.length > 0 ? <div>A:</div> : null}
      <AnswerModal
        isShowing={isShowing}
        hide={toggle}
        id={question.question_id}
      />
      <div>
      {answerList.map((singleAnswer) => {
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